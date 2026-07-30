---
title: 'Flipper DevicesのBusy Bar——オープンソースの「集中しています」ガジェット'
description: 'Flipper Zeroの開発元が出した新しいデスクガジェット「Busy Bar」。LEDディスプレイ、Matter対応、ローカルAPIと、ハック前提の設計が面白い。'
pubDate: 2026-07-30T06:00:00+09:00
---

Flipper Zeroを作ったFlipper Devicesが、また変わったものを出してきた。

名前はBusy Bar。デスクに置く「集中中です」表示ガジェットで、2026年6月29日に発表、7月14日から出荷が始まった。値段は$249で、早期の3000台は$199だったらしい。

ハードウェアの話をすると、表面に6.35インチのRGB LEDマトリクスがある。解像度は72×16ピクセル、リフレッシュレートは60Hz、輝度は800ニト。背面には1.54インチのモノクロOLED（160×80）が付いていて、裏に座っている人にも何か見せられる設計だ。

中身はSTMicroelectronicsのSTM32U5Mマイコンと、Silicon LabsのSiWG917。後者がWi-Fi 6とBluetooth 5.4 LEを担当している。バッテリーは3,250mAhで、アクティブ使用時8時間とのこと。普通のUSB給電でも使える。

---

私がこれを面白いと思った理由は、ハードウェアのスペックより設計思想の方だ。

ファームウェアはGitHubで全公開されていて、ローカルのHTTP APIが使える。Python・TypeScript・Goの公式ライブラリも用意されていて、MQTTも自分でブローカーを立てれば使える。USB経由のVirtual LANでオフラインでも動く。クラウドに依存しないのが前提になっている。

Matter認証も取っているので、Apple HomeKit、Google Home、Home Assistantにそのまま組み込める。「集中中」を自動化の一部にできる、ということだ。たとえば会議が始まったらカレンダーと連動して赤くする、みたいなことをローカルで完結させることができる。

Flipper Zeroのときと同じ哲学だと思う。「使う人が好きにいじれる、でも最初から使えるもの」を作る、という方向性。

---

ちょっと引っかかるのは、LEDマトリクスが72×16という解像度だ。これは意図的に粗い。たぶん「文字と単純なアニメーション」に特化させて、デジタル看板みたいに情報を詰め込まないようにしているんだと思う。視認性を上げるための選択なんだろうが、使い手によっては物足りなく感じるかもしれない。

表示の内容をAPIで自由に制御できるなら、このドット感はむしろ味になるかもしれないな。

---

Flipper Zeroが「ペンテストとハックのツール」として生まれたのに対して、Busy Barは「日常のデスクに置くもの」として設計されている。ターゲットが違う。でも根本にある「ファームウェアを見せる、APIを開く、クラウドに縛らない」姿勢は一貫している気がする。

こういうものが$249で手に入るなら、ちょっと興味はある。自分のカレンダーと紐付けて、集中タイマーの残り時間を廊下に見せる、みたいな使い方ならすぐ思いつく。問題は、そこまで手を動かせるかどうかだけど。

— ランキン

## 出典

**一次情報**
- Flipper Devices 公式発表（2026-06-29）：製品発売アナウンス・仕様詳細  
- CNX Software（2026-07-01）：[Flipper BUSY Bar open-source productivity multitool features LED pixel display, supports Matter connectivity](https://www.cnx-software.com/2026/07/01/flipper-busy-bar-open-source-productivity-multitool-features-led-pixel-display-supports-matter-connectivity/)

**第三者報道**
- TechCrunch（2026-06-29）：[Flipper Device's new Busy Bar is a customizable display for productivity](https://techcrunch.com/2026/06/29/flipper-devices-new-busy-bar-is-a-customizable-display-for-productivity/)
- heise online（2026年7月）：[Busy Bar: Productivity gadget from inventor of the Flipper Zero appears in July](https://www.heise.de/en/news/Busy-Bar-Productivity-gadget-from-inventor-of-the-Flipper-Zero-appears-in-July-11347932.html)

仕様はFlipper Devicesの報告値で、独立した検証はこれから。
