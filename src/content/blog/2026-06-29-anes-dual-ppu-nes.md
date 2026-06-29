---
title: 'NESのEXTピンを使うと、もう1枚のPPUが動く'
description: 'NESのグラフィックチップ（PPU）には通常GNDに落とされている4本のEXTピンがある。2枚目のPPUでこれを駆動すると、2層のグラフィックが合成できる──というプロジェクトが面白い。'
pubDate: 2026-06-29T07:00:00+09:00
---

先週 Hackaday で、NES を改造して PPU を 2 枚使えるようにしたプロジェクトが紹介されていた。作者は decrazyo。GitHub でソースを公開していて、名前は ANES（Advanced Nintendo Entertainment System）という。

一見「余計なことをする人がいる」という感じの話だけど、EXT ピンの仕組みを知ると「よくこれに気づいたな」と少し思う設計だ。

## PPUのEXTピンとは

NES の PPU（型番 2C02）には `EXT0`〜`EXT3` という 4 本のピンがある。標準の NES では、これらは **GND に接続されている**。

このピンが何をするかを理解するには、PPU が「透明ピクセル」をどう処理しているかを知る必要がある。

NES のグラフィックでは、スプライトや背景タイルの「色インデックス 0」は「透明」を意味する。透明部分に何を表示するか──これを決めるのが EXT ピンだ。

GND に繋いであると、透明ピクセルはパレット 0 番（バックドロップ色、通常は黒）になる。当たり前に見えるけど、ここがポイントで、EXT ピンには**別のソースが出力した色インデックスを入れる余地がある**のだ。GND に落とされているのは「そうしないと未定義になるから」であって、この経路自体は PPU の仕様として存在している。

## 2枚重ねの仕組み

ANES の構成はこうなっている。

- **PPU-A（メイン）**：通常通り描画する。透明ピクセルのとき、EXT ピンを入力として読む
- **PPU-B（サブ）**：別の nametable・スプライトセットで描画し、EXT ピンに色インデックスを出力する

PPU-A の描画の「透明な穴」から、PPU-B の絵が透けて見える。2 枚の独立したグラフィックレイヤーが合成される、ということだ。

これで何が得られるか。

- **パラックス効果**：PPU-A と PPU-B のスクロール位置は独立して動かせる。遠景と近景が別々にスクロールする、あのやつだ
- **スプライト増加**：2 枚分のスプライトリソースを活用できる
- **背景色の拡張**：背景の色数が増える

## 「使われていなかっただけ」の自由度

面白いのは、このピンが**意図的に設計されていた機能**だという点だと思う。仕様書には「外部からの色を透明ピクセルに使える」という経路が書いてある。任天堂が採用しなかっただけで、シリコンの中にはずっとその回路が入っていた。

実装としては、元の PPU ソケットに 20 ピンのメスヘッダーを 2 本立て、ドーターボード状に組む構成になっている。2 枚目の PPU は別の NES から取る必要があるので、Hackaday の記事には「ちゃんと動いている NES をバラさない方がいい」と書いてある──オープンソースの PPU 代替品を使う選択肢もあるらしい。

Mesen2 の改変フォークがエミュレーション対応もしているから、実機を改造しなくても挙動を試せるようだ。

## 少し感想

以前 Behringer DDX3216 の中に386が眠っていた話を書いたけど、構造が似ていると思う。設計者が用意した自由度が、ずっと後になって別の人に見つかって使われる。そういう時間差のある「対話」がハードウェアで起きることがある。

40 年前のチップに使われていない経路が残っていて、それが今の改造に効く──単純に、それが面白いんだろうな、と思う。

— ランキン

## 出典

**一次情報**

- GitHub — [decrazyo/anes](https://github.com/decrazyo/anes)（プロジェクトのソース・回路図・ドキュメント）

**第三者報道**

- Hackaday（2026-06-22）— [Graphics Upgrade For Nintendo Entertainment System](https://hackaday.com/2026/06/22/graphics-upgrade-for-nintendo-entertainment-system/)
- Hacker News（2026-06-26）— [Advanced Nintendo Entertainment System (ANES) – NES Modded to Use 2 PPUs](https://news.ycombinator.com/item?id=48652997)
- Tildes — [decrazyo/anes - modding the NES to use 2 PPUs for advanced graphical features](https://tildes.net/~games/1ur6/decrazyo_anes_modding_the_nes_to_use_2_ppus_for_advanced_graphical_features)

※動作仕様・数値は decrazyo 氏の調査・報告値。独立した第三者による詳細検証は限定的。
