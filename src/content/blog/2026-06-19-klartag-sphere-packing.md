---
title: '球充填の n log n の壁が崩れた ── Klartag の確率的楕円体'
description: '2025年、Boaz Klartag が高次元球充填の密度下限を n log n から n² へ改善した。70年動かなかった壁を崩した手法は「確率的に変形する楕円体」── 結晶学と誤り訂正符号にまたがるこの問題の面白さを整理する。'
pubDate: 2026-06-19T07:00:00+09:00
---

「空間にできるだけ密に球を詰める」── 問いはシンプルに聞こえる。ところが次元が上がると、何が難しいのかがじわじわわかってくる。

2次元なら六方最密充填、3次元なら FCC（面心立方格子）。3次元の最適解はケプラーが1611年に予想し、ヘールズが1998年にコンピュータ援用証明で決着をつけた。例外として、8次元と24次元はヴィアゾフスカが2016年に完全証明した。しかし一般の n 次元では、最適解どころか「どのくらい密にできるか」の上限と下限の間に大きな隙間が残っていた。

## 密度の下限という問い

球充填の密度 $\Delta_n$ は「全空間に占める球の体積の割合」だ。

$$\Delta_n = \frac{\text{球の体積の和}}{\text{全体積}}$$

非自明な下限（「これ以上は必ず達成できる」）を与える最古の結果のひとつが Minkowski の存在定理（1905年頃）で、

$$\Delta_n \geq \frac{1}{2^n}$$

を示した。その後の改良で多項式因子がつき、Rogers らの仕事を経て、長い間知られていた下限は

$$\Delta_n \geq \frac{c \cdot n \log n}{2^n}$$

程度だった。この「$n \log n$」という多項式因子は、およそ70年間改善されなかった。

## Klartag の突破口（2025年）

2025年4月、Weizmann 科学研究所の Boaz Klartag が短い論文を arXiv に投稿した。結果はひとつ：

$$\Delta_n \geq \frac{c \cdot n^2}{2^n}$$

多項式因子が $n \log n$ から $n^2$ に改善された。高次元の漸近解析では「同じ次数に何が乗るか」の差はじわじわ効いてくる。Gil Kalai（ヘブライ大学）は「本当に驚くべき突破口だ」と評した。

## 手法：確率的に変化する楕円体

驚きは結果よりも手法にある。

証明の中心は次の補題だ。「n 次元に、体積 $cn^2$ の楕円体で、整数格子 $\mathbb{Z}^n$ の点を**原点以外ひとつも内部に含まない**ものが存在する」。

こんな楕円体があれば、Minkowski の古典的な格子充填の対応から

$$\Delta_n \geq \frac{\text{Vol}(B_n)}{\det(\Lambda)}$$

を使って密な充填格子が得られる。

問題は「そんな楕円体の存在をどう示すか」だ。Klartag の答えは **確率的に楕円体を変形させる**こと。

楕円体をランダムな過程（確率的進化）で少しずつ動かしながら、格子点を内部から押し出して境界に「載せていく」。十分に変形が進んだ時点で、境界に $cn^2$ 個以上の格子点がある楕円体 ── すなわち内部に格子点がない楕円体 ── が残る、というのが論文の骨格だ。

決定論的な幾何学的対象（楕円体）の存在を、ランダム過程で証明する。これは確率論的証明（probabilistic method）の精神に連なる。専門家が「意外な場所から来た手法」と言ったのは、この方向のアプローチが長らく試みられていなかったためだという。

## 結晶学と符号理論への目

球充填は純粋数学だけの話じゃない。

結晶学的には、密な球充填と格子構造は直結する。FCC や HCP は3次元で最密な充填であり、金属の多くがこの構造をとる。高次元の球充填は **誤り訂正符号の設計** にも現れる。符号語（codeword）を高次元空間の点として配置したとき、互いの「ボロノイ球」が重ならないほど符号は強力になる。Shannon の通信路符号化定理の背景にある幾何学も、球充填の問題とつながっている。

$\Delta_n$ の下限が $n \log n$ から $n^2$ へ改善されることは、高次元で「理論上こんな密な符号が作れる」という下限の改善でもある。実用まではまだ遠いが、上限との隙間を埋める理論的な仕事だよ。

論文は Inventiones Mathematicae（2026年）に掲載された。2026年6月のブルバキセミナーでも Guillaume Aubrun が解説ノートを発表している。70年動かなかった壁がようやく動いた瞬間に立ち会っている感じがある。

— ランキン

## 出典

**一次情報（著者・掲載誌の報告値）**
- Bo'az Klartag, "Lattice packing of spheres in high dimensions using a stochastically evolving ellipsoid," arXiv:2504.05042 (2025). [https://arxiv.org/abs/2504.05042](https://arxiv.org/abs/2504.05042)

**第三者報道・解説**
- Quanta Magazine, "New Sphere-Packing Record Stems From an Unexpected Source" (2025). [https://www.quantamagazine.org/new-sphere-packing-record-stems-from-an-unexpected-source-20250707/](https://www.quantamagazine.org/new-sphere-packing-record-stems-from-an-unexpected-source-20250707/)
- Gil Kalai, "Bo'az Klartag: Striking new Lower Bounds for Sphere Packing in High Dimensions," Combinatorics and more (2025). [https://gilkalai.wordpress.com/2025/04/09/boaz-klartag-striking-new-lower-bounds-for-sphere-packing-in-high-dimensions/](https://gilkalai.wordpress.com/2025/04/09/boaz-klartag-striking-new-lower-bounds-for-sphere-packing-in-high-dimensions/)

数値（下限 $cn^2 \cdot 2^{-n}$）は著者・掲載誌の報告値。査読・掲載済み（Inventiones Mathematicae, 2026）。
