---
title: '1Mトークンに正直に向き合う ── MiniMax M3 と MSA'
description: '100万トークンのコンテキストを扱うには、注意機構の計算をどう減らすかが問題になる。MiniMax が選んだのは「圧縮しない、選ぶ」という方針だった。'
pubDate: 2026-06-15T07:00:00+09:00
---

コンテキスト長 1M トークンは、どのくらいしんどい数なのか。

Transformer のアテンション機構は、クエリと全キー・バリューのペアを計算するので、系列長 n に対して計算量が O(n²) で増える。1K トークンのころは問題なかったが、1M まで伸ばすと話が変わる。10¹² のオーダーの組み合わせで、メモリ帯域も計算コストも単純にはスケールしない。

## 二つの路線

長コンテキストへのアプローチには、大きく二方向あると思う。

**圧縮する** ── キー・バリューを低次元に押し込んで、扱うデータ量を減らす。DeepSeek の MLA（Multi-head Latent Attention）がこの路線で、KV を射影して小さくする。コンパクトだが、圧縮で何かが落ちる可能性がある。

**選ぶ** ── 全部見ようとせず、関係ありそうなブロックだけアテンションを計算する。6月1日にリリースされた MiniMax M3 の MSA（Multi-head Sparse Attention）がこっちで、KV は圧縮せず、ブロック単位で選択する。

## MSA の実装

MSA は、KV キャッシュをブロックに区切り、各クエリに対して関連度の高いブロックだけを選んでアテンションを計算する仕組みだ。

アクセスパターンは「KV ブロックが外ループ、そのブロックにヒットするクエリを集約する」形になる。メモリアクセスが連続になるうえ、各ブロックは1回だけ読まれる。これが性能に直結する。MiniMax によれば、既存のスパースアテンション実装（Flash-Sparse-Attention、flash-moba など）より 4倍以上速いらしい。

1M トークンのコンテキストでの結果として、

- プリフィルが M2 比 **9倍以上**
- デコードが **15倍以上**
- トークンあたり計算量が **1/20**

というのが公称値だ。

## 「選ぶ」ことの難しさ

一つ気になるのは、どのブロックを「関連度が高い」と判断するか、だ。外れれば重要な情報を見落とす。1M トークンの文書の冒頭に書かれた前提が「選ばれないブロック」に入ってしまったら、そこは見えなくなる。

MiniMax が Linear Attention や Sliding Window Attention を選ばなかった理由も、これと関係するんじゃないかな。「線形に近づける」実装は、大規模だと推論の劣化が出やすかったという。全部捨てる前に、ちゃんと選べるか ── そこが設計の核心だろう。

## ベンチマークの話

M3 は SWE-Bench Pro で 59.0%、OSWorld での Computer Use で 70.06% を出している。公称値では GPT-5.5 や Gemini 3.1 Pro を超えているとのことで、オープンウェイトとしては注目に値する。

ただし、これらは MiniMax と第三者報道の引用値であって、独立した再現実験がある訳ではない。"Frontier Claims, Unverified Benchmarks" と題した報道も出ていて、そのあたりは今後の検証待ちだと思う。

## オープンウェイトの意義

ウェイトと技術レポートが公開されれば、MSA がどこで破綻するか、他の実装と何が違うか ── を外から検証できるようになる。1M コンテキストを 1/20 の計算で扱えるアーキテクチャの選択と、そのトレードオフが見える状態になる、ということだ。

閉じたモデルがベンチマークで優れていると主張しても、それだけでは次に繋がらない。中身が開いてきたとき、この数字の意味もはっきりしてくるんじゃないかな。

— ランキン

---

## 出典

**一次情報（公式）**
- [MiniMax M3: Frontier Coding, 1M Context, Native Multimodality — All in One Model（MiniMax Research Blog）](https://www.minimax.io/blog/minimax-m3)

**第三者報道**
- [MiniMax teases upcoming M3 model with new sparse attention mechanism and 15.6X long-context response speed boost（VentureBeat）](https://venturebeat.com/technology/minimax-teases-upcoming-m3-model-with-new-sparse-attention-mechanism-and-15-6x-response-speed-boost)
- [MiniMax Releases MiniMax M3 with MSA Architecture Supporting 1M-Token Context, Native Multimodality, and Agentic Coding（MarkTechPost）](https://www.marktechpost.com/2026/06/01/minimax-releases-minimax-m3-with-msa-architecture-supporting-1m-token-context-native-multimodality-and-agentic-coding/)
- [MiniMax M3 Open-Weight Coding Model: Frontier Claims, Unverified Benchmarks（TechTimes）](https://www.techtimes.com/articles/317532/20260601/minimax-m3-open-weight-coding-model-frontier-claims-unverified-benchmarks.htm)

モデルの性能数値はすべて MiniMax および第三者報道の引用値で、独立した査読・再現実験は現時点では未完了。
