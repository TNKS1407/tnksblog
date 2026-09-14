---
title: 'Appleのハードウェアをゼロで蘇らせる——OSHintosh というプロジェクト'
description: 'Apple部品を一切使わず2層PCBだけでMacintosh 512kを再実装したオープンソースプロジェクト。ディスクレスでROMから起動し、LocalTalkでファイルを取得できる。'
pubDate: 2026-09-14T06:00:00+09:00
---

最近、なかなか面白いオープンソースハードウェアのプロジェクトを見かけた。その名も **OSHintosh**——DosFox1 という作者が GitHub 上に公開した、Macintosh 512k のロジックボードをゼロから再設計したものだ。

これの何が面白いかというと、Apple のハードウェアを「一切使っていない」点にある。CPU はモトローラ 68000 を使っているが、それは Apple のチップではない。RAM には 41256 の DIP チップ。電源は ATX 電源から供給する。映像出力には Raspberry Pi Pico を使ったスキャンコンバータが乗っている。Apple のパーツと呼べるものが基板上に存在しないのに、Mac として動く。

PCB は 2 層設計だ。これが地味にすごいと思う。現代の複雑な回路基板は 4 層・6 層が当たり前で、信号の引き回しや GND 層の確保を多層でやるのが普通だ。2 層でここまでまとめた設計は、1982 年の SCC Word Wide プロトタイプ以来の Mac 設計だと作者は言っている。JLCPCB に発注すれば 5 枚で約 30 ポンドで作れるというから、コストの面でも現実的だ。

ブートの仕組みも独特で、フロッピーも SCSI も持っていない。代わりに Big Mess o' Wires の ROM-inator をベースにしたディスクイメージを ROM に焼いて、そこから起動する。ディスクレスだが、LocalTalk ポートが実装されているので AppleTalk ネットワーク越しにファイルを引っ張ることができる。当時の Mac がネットワーク機能を持っていたことを活かした、うまい設計だと思う。

注意点は、フラッシュが必要なプログラマブル IC が 9 個あること。それと、マウスはクアドラチャ 9 ピン、キーボードは RJ コネクタの Mac オリジナル周辺機器が必要になる。完全に現代の環境だけで完結するわけではない。

オールドスクールなアーキテクチャをオープンソースハードウェアとして忠実に再実装する、という試みは、設計の学習素材としても価値が高いんじゃないかと思う。現代のマイコンや FPGA で「エミュレート」するのとは違って、当時の回路を現代の部品と設計ツールで再現するアプローチには独特の味がある。プロジェクトは GitHub で公開されているので、興味があれば基板ファイルから眺めてみるのもいいかもしれない。

— ランキン

## 出典

- DosFox1, "OSHintosh — Open Source Hardware Diskless 68000 Macintosh", GitHub: [https://github.com/DosFox1/OSHintosh](https://github.com/DosFox1/OSHintosh)
- "This Mac Is Open Source Hardware", Hackaday, 2026-09-12: [https://hackaday.com/2026/09/12/this-mac-is-open-source-hardware/](https://hackaday.com/2026/09/12/this-mac-is-open-source-hardware/)
