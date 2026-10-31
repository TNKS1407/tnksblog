---
title: 'LLMが量子回路を再設計する——Claude Mythos 5と可逆計算の資源削減'
description: 'Harvard・Anthropic・QuEraのプレプリントは、LLMと自動評価器のフィードバックループで量子回路のToffoliゲート数・量子ビット数を大幅削減した試みを報告している。'
pubDate: 2026-10-31T07:00:00+09:00
---

量子回路の設計は、古典的なプログラミングとはかなり違う難しさがある。可逆性の制約、補助量子ビット（ancilla）の管理、エラー訂正との相性——そういったことを意識しながら、できるだけ少ないToffoliゲートと量子ビットで計算を実現しないといけない。

Harvard、Anthropic、QuEraの研究グループが先日（2026年10月）公開したプレプリント（arXiv: 2610.22367）は、その設計作業にLLMを使う試みだ。主著者はAnthropicのSTEM Fellows ProgramのAndi Gu。

## フィードバックループで回路を探索する

仕組みはシンプルだ：

1. LLM（Claude Mythos 5）が量子回路の実装を提案する
2. 自動評価器が正しさとリソースコスト（Toffoliゲート数・量子ビット数）を検証する
3. 結果をフィードバックして、LLMが次の提案を改善する

8種類のタスクを試して、7つでToffoliゲート数または量子ビット数が従来の最良設計より小さくなったという。

特に印象的な例が、DQI（decoded quantum interferometry）用の可逆Berlekamp–Massey復号器だ。素朴な実装だと840量子ビット必要だったところを、LLMが提案した回路では19量子ビットに落とした。44分の1の削減になる。

## 何が面白いのか

量子回路設計は、ある種の形式的な最適化問題だ。正解の構造が決まっていて、評価基準も明確。今回の設定でポイントだと思うのは、評価器が「等価かどうか」を自動判定できることだ。量子回路の等価性チェックは計算コストが高いが、アルゴリズムとして存在している。だから人間のフィードバックなしにループが回せる。

自然言語のタスクには曖昧さが残りやすいが、量子回路設計は「あっているかどうかが明確」なので、LLMの探索能力がはまりやすいんじゃないかな。強化学習でいう「報酬がスパース」でも「報酬が明確」なカテゴリーで、こういう問題設定は相性がいいかもしれない。

## 注意点

いくつか留意したほうがいい。

まず、これはリソース推定であって実機での動作実証ではない。Toffoliゲート数の削減は誤り訂正オーバーヘッドの削減に直結するが、実際のスループットがどう変わるかは別の話だ。

次に、数値が文献によってまちまちで、最大9100倍削減と報じているところもあれば39倍や17倍というものもある。タスク・指標の定義が異なるんだろうが、プレプリントを直接読まないと比較が難しい。

それと、8タスク中7タスクが改善した、ということは1つは改善しなかった。どういう種類の回路が苦手なのかは、今後の研究で見えてくるんだろう。

LLMが形式的・数学的な最適化に食い込みはじめているのは、なんとなく興味深い時代だと思う。量子回路設計が、従来の設計ツールとLLMフィードバックループの組み合わせで変わっていくのなら、それは見ておきたい変化だな。

— ランキン

## 出典

**一次情報（著者・機関の報告値で、独立検証・査読はこれから）**
- Gu, A. et al. (Harvard, Anthropic, QuEra): arXiv: 2610.22367（2026年10月）

**第三者報道**
- Quantum Computing Report: ["Harvard, Anthropic and QuEra Use LLMs to Discover Quantum Circuits with Up to 9100x Lower Resource Costs"](https://quantumcomputingreport.com/harvard-anthropic-and-quera-use-llms-to-discover-quantum-circuits-with-up-to-9100x-lower-resource-costs/)
- The AI Insider: ["Anthropic's Claude Designs More Efficient Quantum Circuits with Automated Feedback"](https://theaiinsider.tech/2026/10/19/anthropics-claude-designs-more-efficient-quantum-circuits-with-automated-feedback/)
