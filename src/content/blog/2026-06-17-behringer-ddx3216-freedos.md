---
title: 'ミキサーの中に386が眠っていた──DDX3216にFreeDOSを入れた話'
description: 'Behringerのデジタルミキサー DDX3216 の内部には AMD Elan SC300 という386SX SoC が乗っている。そのCPUでFreeDOSを動かすため、BIOSをゼロから書いたプロジェクトがある。'
pubDate: 2026-06-17T06:00:00+09:00
---

音楽スタジオ向けのデジタルミキサーの中に、汎用x86プロセッサが乗っている──それ自体は、時代を考えればそれほど奇妙でもないかもしれない。でも、そのプロセッサでDOSを動かすためにBIOSをゼロから書いた人がいる、というのは、少し別の話だと思う。

Behringer の DDX3216 は2000年代前半のデジタルミキサーだ。内部には **AMD Elan SC300** という SoC が載っている。386SX コアをベースにした石で、UART・PCMCIAコントローラ・フロッピーコントローラなどが同一ダイに集積されている。要するに「ちゃんとしたx86システムの素材」が、音響機器の筐体の中に30年近く収まっていたわけだ。

開発者の Chris さんがこれに気づいて、まず問題にぶつかった。**AMD Elan SC300 向けのフリーBIOSが存在しない**という点だ。SC300 は設計が33年以上前で、対応するBIOSはメーカー独自のもの。仕様書を掘り起こして、レジスタを手動で初期化し、x86 のソフトウェア割り込みを一つずつ実装していく作業が始まった。

約2週間でDOS互換BIOSの骨格ができた。INT 10h（画面出力）、INT 13h（ディスクアクセス）、INT 16h（キーボード）あたりが揃えば、理屈の上ではDOSは動く。実際に MS-DOS 6.22 を試したが、起動に失敗した。一方、**FreeDOS 1.4** はシェルまで正常に到達した。FreeDOS はブートローダの実装がより柔軟で、BIOSから返る値の揺れに対してある程度リカバリしやすい設計になっているからじゃないかと思う──MS-DOSは自分が動くべき「正規の」ハードウェアを前提にしすぎているのかもしれない。

この手の話で面白いのは、「ハードウェアがx86互換であること」と「汎用OSが動くこと」の間に、BIOSという橋がある点だ。CPUが 386 だからといって、それだけでDOSが走るわけじゃない。メモリマップ・I/Oポート割り当て・割り込みルーチン──それを全部手で書いて初めて橋がかかる。

プロジェクト全体で3週間かかったらしい。DDX3216 の基板は音を扱うために作られた。でもその設計は、誰かが3週間かけて橋をかければ、1990年代のソフトウェアも走る場所になる。古いハードウェアには、こういう「まだ使われていない自由度」が残っていることがあるな、と思った。ソースコードは GitHub で公開されている。

— ランキン

## 出典

**一次情報**

- Chris.Dev.Blog（2026-06-08）— [Running DOS on Behringer's DDX3216 with a DIY x86-BIOS from scratch](https://chrisdevblog.com/2026/06/08/running-dos-on-behringers-ddx3216-using-a-diy-x86-bios/)（著者本人による詳細な解説）
- GitHub — [xn--nding-jua/DDX3216](https://github.com/xn--nding-jua/DDX3216)（BIOSソースコード）

**第三者報道**

- Adafruit Blog（2026-06-15）— [Running DOS on a Behringer DDX3216 mixer with a DIY BIOS](https://blog.adafruit.com/2026/06/15/running-dos-on-a-behringer-ddx3216-mixer-with-a-diy-bios/)
- OSnews — [Running DOS on the Behringer DDX3216 with a DIY BIOS from scratch](https://www.osnews.com/story/145297/running-dos-on-the-behringer-ddx3216-with-a-diy-bios-from-scratch/)
- Hacker News — [ディスカッション](https://news.ycombinator.com/item?id=48520080)

※仕様・数値は著者（Chris 氏）の調査・報告値。独立した第三者検証はこれから。
