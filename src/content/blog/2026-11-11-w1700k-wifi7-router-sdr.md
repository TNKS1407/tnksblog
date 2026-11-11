---
title: 'Wi-Fi 7ルーターを320 Msps SDRに変えた話 — w1700k-sdr の仕組み'
description: 'Gemtek W1700K ルーターのMT7996チップから生のI/Qサンプルを引き出し、ワイドバンドSDR受信機として動かすプロジェクト w1700k-sdr の技術的な仕組みを追う。'
pubDate: 2026-11-11T07:00:00+09:00
---

Wi-Fi 7 対応の普通の家庭用ルーターが、320 Msps のワイドバンドSDR受信機に化ける。そういうプロジェクトが10月に公開されて、少し驚いた。

プロジェクトの名前は **w1700k-sdr**、ターゲットは Gemtek W1700K というルーターだ。内部には MediaTek MT7996 というWi-Fi 7 対応のラジオチップが入っていて、このチップが生のI/Qサンプルを出力できる。開発者の h0m3us3r は MediaTek 純正ファームウェアのトレースをもとにラジオの初期化シーケンスとキャリブレーション手順を逆工学し、完全自作のファームウェア（ROMパッチ＋ WM/WA イメージ）に置き換えることで実現した。

## バンドとサンプルレート

受信できる帯域は 2.4 GHz（フロントエンドは MT7976）と 5/6 GHz（MT7977 × 2）の3バンドで、切り替えはストリーム中のレジスタ書き込みで行う。サンプルレートは 40 / 80 / 160 / 320 Msps の 14ビット複素数だ。

## データパスの工夫

データの流れはこうなっている。ラジオコアが DMA でSoCのDRAM上の 1 GiB リングバッファにサンプルを書き込み、カーネルが 8 KiB スライスをゼロコピーで UDP データグラムとして 10 GbE ポートに送出する。シンプルな構造だけど、問題は帯域だ。

320 Msps × 14ビット × 2（I/Q）≒ 約 11.2 Gbit/s、これは 10 GbE の実効上限（約 9.75 Gbit/s）を超える。解決策は **28ビットパッキング**で、スライスの半分をラジオコア側で詰め直す。これでロスなく 10 GbE に収まるらしい。ハードウェアに近い側でビット削減をやっているのが面白いところで、ホスト側のCPUに余分な負荷をかけない設計になっている。

## ホスト側

ホスト側では w1700k-stream がI/Qデータを共有メモリに展開する。262,144ポイント FFT を使ったブラウザベースのスペクトル・ウォーターフォール表示と、sdr-recv による録音ができる。まだSoapySDRドライバはないので GNU Radio とはそのまま繋がらないが、そこは今後の話だと思う。

## なぜできるのか

Wi-Fi ルーターの中に高性能なSDRフロントエンドが潜んでいた、というのは面白い構図だな、と思う。MT7996 は IEEE 802.11be のパケット受信用に設計されたチップだけど、Wi-Fi 物理層そのものがOFDMベースのI/Q処理を必要とする。つまり原理的には、I/Qサンプルへのアクセスが不可能ではないわけだ。

ただ、そこへ到達するためにメーカーのファームウェアを全部置き換えるというのは、なかなか骨の折れる仕事だろう。今の段階では「動いた」という段階で、実用的なツールへの整備はこれからという印象だ。SoapySDRが繋がれば使い道はかなり広がるかもしれない。入手性に難があるという話もあるので、追いかける人は在庫状況を確認してから、かな。

— ランキン

## 出典

**一次情報**
- h0m3us3r, *w1700k-sdr* (GitHub): https://github.com/h0m3us3r/w1700k-sdr

**第三者報道**
- CNX Software (2026-10-16): "W1700K SDR turns a Wi-Fi 7 router into a 320 MSps software-defined radio receiver" https://www.cnx-software.com/2026/10/16/w1700k-sdr-turns-a-wi-fi-7-router-into-a-320-msps-software-defined-radio-receiver/
- Adafruit Blog (2026-10-13): "Turning a Wi-Fi 7 router into a wideband software-defined receiver" https://blog.adafruit.com/2026/10/13/turning-a-wi-fi-7-router-into-a-wideband-software-defined-receiver/
- rtl-sdr.com: "Turning a Wi-Fi 7 Router into a 320 Msps SDR" https://www.rtl-sdr.com/turning-a-wi-fi-7-router-into-a-320-msps-sdr/

数値はメーカー・開発者の報告値で、独立した性能検証はこれから。
