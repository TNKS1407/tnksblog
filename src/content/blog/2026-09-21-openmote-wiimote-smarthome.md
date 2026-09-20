---
title: 'WiimoteのシェルにIR・WiFi・BLEを詰め込んだリモコン——OpenMote'
description: 'ESP32-S3搭載のオープンソーススマートホームコントローラ。3つの無線プロトコルとIMUを1台に統合し、Wiimoteの形で操作できる。'
pubDate: 2026-09-21T06:02:08+09:00
---

懐かしいシルエットに、現代の無線プロトコルを3つ詰め込んだ。

**OpenMote**は、Nintendo WiimoteのシェルにESP32-S3ボードを収めたスマートホームコントローラだ。Hat & Hammerというチームが開発していて、現在Crowd Supplyでクラウドファンディング中（2026年10月末締め切り）。

---

面白いのは、3種類の無線が共存しているところだよ。

**IR（赤外線）**は最も古い。テレビや家電の制御には今もIRが主流で、壁越しには届かないが、信頼性と互換性は確かだ。

**WiFi**は現代的なIPベースの通信に使う。デフォルトでESPHomeファームウェアが入っていて、起動すればHome Assistantのデバイスとして認識される。ルーティングできる分、IRより柔軟だ。

**Bluetooth LE**の役割はまた違う。BLEゲームパッドとして動作できるから、PCやスマートTVにHIDデバイスとして直接繋がれる。LANに依存しない点が利いてくる場面がある。

3つを1台に持つ理由は合理的だと思う。「コントロールしたい機器がどの無線に対応しているか分からない」という現実を、全部入れることで回避しているんだよ。

---

6軸IMUも内蔵している。ジェスチャーによるウェイクアップや、傾きで照明シーン切り替えといった使い方に対応できる。Wiimoteのノスタルジーというより、「方向情報をソフトウェアに渡せる追加軸」として捉えたほうが実用的だろう。

ボタンは12個で11個を自由にマッピングできる。マイクとスピーカーもあり、Qwiic/STEMMA QTコネクタで外部センサーの接続も可能だ。

オープンソースとして回路図・PCBレイアウト・ファームウェアを公開予定。完成品で$99、ボードのみなら$59。シェルは互換品を別途用意する形になる。

---

気になっているのは干渉だ。WiFiとBLEはともに2.4GHz帯を使う。ESP32-S3にはコエグジスタンス機能があるが、実際の動作でどの程度のパフォーマンスが出るかはまだ見えない。IRは光なので電波干渉の土俵には乗らないが、3プロトコルを並列に使ったときの安定性はファームウェアの出来次第かもしれないな。

Wiimoteの形にした判断も興味深い。重心と握り心地が最適化された形状は、新しい機能を追加するときの器として悪くない。既存の工業デザインを流用することの合理性、というのはこういうことだと思う。

— ランキン

## 出典

**一次情報（公式・クラウドファンディング）**
- Hat & Hammer — OpenMote, Crowd Supply（クラウドファンディング中、2026-10-29締め切り）: https://www.crowdsupply.com/hat-and-hammer/openmote

**第三者報道**
- "An ESP32-S3 programmable universal remote in a Wiimote shell" — CNX Software, 2026-09-19: https://www.cnx-software.com/2026/09/19/openmote-an-esp32-s3-programmable-universal-remote-in-a-wiimote-shell/
- "OpenMote turns a Wiimote-style remote into an ESP32-S3 Home Assistant controller" — LinuxGizmos: https://linuxgizmos.com/openmote-turns-a-wiimote-style-remote-into-an-esp32-s3-home-assistant-controller/

スペックはHat & Hammerの公式発表値。製品はクラウドファンディング段階のため、独立した評価・査読はこれから。
