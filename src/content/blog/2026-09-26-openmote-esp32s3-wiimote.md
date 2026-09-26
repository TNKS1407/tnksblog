---
title: 'WiiリモコンにESP32-S3を詰めたら、スマートホームコントローラになった'
description: 'Hat & HammerのOpenMoteは、ESP32-S3・赤外線・BLE・IMUをWiiリモコン型ケースにまとめたオープンソースのユニバーサルリモコン。'
pubDate: 2026-09-26T07:00:00+09:00
---

Wiiリモコンの形をしたESP32-S3搭載ボード「OpenMote」が、Hat & HammerによってCrowd Supplyでクラウドファンディング中だ。見た目はほぼWiiリモコンなんだが、中身は完全に別物になっている。

## 何が入っているのか

主要な仕様をざっと並べると：

- ESP32-S3（WiFi + Bluetooth LE）
- 赤外線送受信モジュール
- 6軸IMU
- 内蔵マイクとスピーカー
- Qwiic / STEMMA QT コネクタ

一台でかなり多くの通信手段をカバーしているな。Wiiリモコンといえば「モーションセンサー付きのコントローラ」というイメージが強いけど、OpenMoteはそのイメージを現代のスマートホーム文脈に持ち込もうとしている感じがする。

## ソフトウェアと使い方

最初からESPHomeファームウェアがフラッシュされて出荷されるから、Home Assistantとの連携はコードなしで始められる。ボタンやモーションジェスチャーを照明・空調・メディアセンターへのコマンドとしてマップできる。

BLEのHIDプロファイルもサポートしているので、Android TVやSteam Deck、PCへゲームパッドや仮想キーボードとして接続することもできる。IMUが入っているからDolphinエミュレーターでも動かせるらしい。元々Wiiリモコン型なんだから、エミュレーター操作に使いたくなるのは当然だろうな。

プログラムはArduino IDE・PlatformIO・ESP-IDFのいずれでも書ける。出荷前にPCBとファームウェアの設計データをオープンソースとして公開する予定とのこと。「Open」と名前に入れるからには、そこは守ってほしいところだな。

## なぜ面白いと思ったか

WiFiリモコンや赤外線ブリッジの類は市場に山ほどある。ただ、IMUによるモーション入力と赤外線・BLE両対応をひとまとめにした物理コントローラというのはあまり見ない。

センサーとしても、コントローラとしても使える汎用のRFインターフェースデバイス、という見方もできるかもしれない。たとえば、IMUのデータをMQTTでHome Assistantに流しながら、同時に赤外線でエアコンを操作する、みたいな組み合わせは普通に実用的だと思う。

価格はボードのみ$59、完成品$99で、出荷は2027年2月末予定。クラウドファンディングは2026年10月29日まで。

開発機材というよりは「動く完成品が欲しい人向け」という印象だけど、オープンソース化されれば出発点としても使いやすそうだな。

— ランキン

## 出典

- CNX Software: [OpenMote - An ESP32-S3 programmable universal remote in a Wiimote shell](https://www.cnx-software.com/2026/09/19/openmote-an-esp32-s3-programmable-universal-remote-in-a-wiimote-shell/)
- Hackster.io: [Your Old Wii Remote Can Now Control Your Smart Home](https://www.hackster.io/news/your-old-wii-remote-can-now-control-your-smart-home-f230cfca2b5c)
