---
title: 'WiiリモコンのフォームにESP32-S3を詰めたOpenMote'
description: 'Hat & Hammerが開発したOpenMoteは、おなじみのWiiリモコンの形にESP32-S3・IR・BLE・IMUを詰め込んだオープンソースのプログラマブルリモコンだ。'
pubDate: 2026-09-28T07:00:00+09:00
---

Crowd Supplyでクラウドファンディングが始まったOpenMoteが、ちょっと変わった組み合わせで面白い。

Hat & Hammerというスタートアップが作ったこのデバイス、見た目はWiiリモコンとほぼ同じだ。でも中身はESP32-S3-WROOM-1を積んだマイコンボードで、Wi-Fi・Bluetooth LE・IRトランシーバ（送受信両対応）・6軸IMUを一枚のPCBに載せている。

IRというのが少し懐かしい感じもする。テレビのリモコンに使われているあれだ。NEC方式やSony SIRCS方式など、送信キャリアに38kHzの変調をかけてパルス幅でビットを表す仕組みが一般的だろう。ESP32-S3にはRMT（Remote Control Transceiver）というペリフェラルがあって、これを直接ハードウェアで扱えるので、変調・復調の実装が素直にできる。こういう低レベルの細部が設計に織り込まれているのを見ると、なんか好感が持てるな。

BLEと組み合わせると何が嬉しいかというと、IRが届かないスマートホームデバイスも、旧来の家電も一台で両方操作できるわけだ。Home Assistantとの連携はESPHomeファームウェアで最初から対応している。クラウドサービスに頼らずローカルで動かせるのも、今の時代には意味があると思う。

さらに6軸IMU（加速度計＋ジャイロ）を載せているので、Wiiリモコンがポインティングデバイスとして使われていたように、傾きや振りの動作にアクションを割り当てられる。単純なボタン押下じゃない、ジェスチャーベースの操作が組めるのが面白いかもしれないな。照明の明るさをリモコンを傾けた角度で変えるとか、そういう使い方が素直に実装できるだろう。

コードはArduino IDE・PlatformIO・ESP-IDFのどれでも書けるらしく、自由度はかなり高い。PCB図面や回路は出荷前にオープンソース化するとのことで、本体$99・ボード単体$59。クラウドファンディングは2026年10月29日まで、出荷は2027年2月の予定だ。

Wiimoteというフォームファクタを選んだのは正直うまいと思う。手に馴染む形で、ボタン配置も直感的だ。懐かしさとモダンなスマートホームを組み合わせるというコンセプトが、妙に素直にハマっている気がする。

— ランキン

## 出典

**公式・一次情報**
- OpenMote公式: https://openmote.io/
- Crowd Supply キャンペーン: https://www.crowdsupply.com/hat-and-hammer/openmote
  （仕様・価格はクラウドファンディングページ記載の著者・企業の報告値で、出荷前の段階）

**第三者報道（2026年9月）**
- CNX Software, Sep 19 2026: https://www.cnx-software.com/2026/09/19/openmote-an-esp32-s3-programmable-universal-remote-in-a-wiimote-shell/
- Hackster.io: https://www.hackster.io/news/your-old-wii-remote-can-now-control-your-smart-home-f230cfca2b5c
- LinuxGizmos: https://linuxgizmos.com/openmote-turns-a-wiimote-style-remote-into-an-esp32-s3-home-assistant-controller/
