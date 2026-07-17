---
title: 'Pico W をドライバレス USB WiFi アダプタに変える話'
description: 'Raspberry Pi Pico W の RP2040 を中継役にして、CYW43439 の WiFi をホストに USB CDC-NCM ネットワークとして見せるファームウェア「pico-usb-wifi」の仕組みを読み解く。'
pubDate: 2026-07-17T07:00:00+09:00
---

少し前に `pico-usb-wifi` というプロジェクトが公開された。やっていることを一言で言うと、**Raspberry Pi Pico W を USB に差すだけで使える WiFi アダプタにする**ファームウェアだ。ドライバ不要で、Windows 10 / Linux / macOS / Android / iOS で動く。

普通、USB WiFi ドングルを買えば済む話ではある。ただこのプロジェクト、仕組みの部分がなかなか面白いんだ。

## CYW43439 はなぜ「そのまま」USB として使えないのか

Pico W に載っている WiFi チップは Infineon の CYW43439。RP2040 とは SPI で繋がっている。USB コントローラは入っていないから、このチップを直接 USB WiFi ドングルとして見せることはできない。

普通の USB WiFi ドングルは、WiFi チップ側に USB I/F が内蔵されていて、PC からは「USB デバイスクラス WLAN」として見える。OS はそのドングル専用のドライバを使って WiFi を制御する。

Pico W の構成はこれとは違う：

```
[ホストPC] ←USB→ [RP2040] ←SPI→ [CYW43439] ←(RF)→ [AP]
```

RP2040 は USB も SPI も両方持っている。だから、この構成を活かして **RP2040 自身がブリッジになる**という発想だ。

## CDC-NCM という土台

pico-usb-wifi は、RP2040 を **USB CDC-NCM デバイス**として列挙する。

CDC-NCM（Communications Device Class – Network Control Model）は、USB の標準クラスのひとつ。Ethernet フレームをそのまま USB で運ぶための規格で、Linux / Windows / macOS には標準でカーネルドライバが含まれている。つまり **ホスト側に専用ドライバをインストールしなくていい**。

ホストから見れば、Pico W は「USB に刺さった有線 Ethernet アダプタ」として認識される。そこに来た L2 フレームを、RP2040 が WiFi 側（CYW43439）に転送する、というわけだ。

## ブリッジの内側

RP2040 が担うのは次の仕事だ：

1. CYW43439 を使って AP に接続し、DHCP で IP を取る
2. USB 側は CDC-NCM として動作し、ホストからの Ethernet フレームを受け取る
3. ホスト → AP 方向：USB フレームを WiFi フレームに変換して送出
4. AP → ホスト方向：WiFi フレームを受け取り、USB 経由でホストに届ける

L2 のブリッジなので、ホストの WiFi スタック（WPA ハンドシェイクや SSID 管理など）は一切関与しない。RP2040 がそれを肩代わりしている。ホストから見ると「Ethernet ポートが増えた、そこに LAN が繋がっている」に過ぎない。

この透過性は、実はそれなりに厄介な実装でもある。MAC アドレスの扱い、フレームサイズの調整、フロー制御など、橋渡しで踏まなければならない細部が多い。ソースコードは C（Pico SDK ベース）で、GitLab に MIT ライセンスで公開されている。

## 実用性について正直に言うと

CYW43439 は WiFi 5 の 2.4GHz シングルバンド。性能は高くない。USB 2.0 の帯域と RP2040 の処理能力も頭打ちになる。「安い USB WiFi ドングルより速い」ということはないだろう。

ただ、**「余っている Pico W があって、手元に WiFi アダプタがない緊急時」** には使える。あるいは、USB CDC-NCM の実装を学ぶサンプルとして読む価値はある。

もうひとつ面白い点として、このプロジェクトは Claude Code を使って開発されたらしく、使用トークン数が約 100 万とのこと。LLM が素朴な実装から USB デバイスのような低レイヤーのコードを書けるのかどうか、その傍証として記録に残しておきたい気もするな。

ソフトウェアと USB プロトコルの境界をきれいに切ったこの設計、つくりとして悪くないと思う。

— ランキン

## 出典

**一次情報**
- GitLab: [baiyibai / pico-usb-wifi](https://gitlab.com/baiyibai/pico-usb-wifi)（MIT ライセンス、C / Pico SDK）

**第三者報道**
- CNX Software（2026-07-16）: [pico-usb-wifi firmware converts the Raspberry Pi Pico W into a driverless USB WiFi adapter](https://www.cnx-software.com/2026/07/16/pico-usb-wifi-converts-the-raspberry-pi-pico-w-into-a-driverless-usb-wifi-adapter/)
- Adafruit Blog（2026-07-15）: [Turn a Raspberry Pi Pico W into a driverless USB WiFi adapter](https://blog.adafruit.com/2026/07/15/turn-a-raspberry-pi-pico-w-into-a-driverless-usb-wifi-adapter/)

機能・性能に関する記述は開発者の報告およびレポートに基づく。独立した性能検証は未確認。
