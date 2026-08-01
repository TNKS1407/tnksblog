---
title: "分数フーリエ変換 ── 時間と周波数の間を回転する"
description: "フーリエ変換を「時間-周波数平面での90度回転」と見ると、任意角度の分数版が自然に出てくる。LFMチャープへの応用と光学との繋がりも面白い。"
pubDate: 2026-07-26T13:03:00+09:00
---

フーリエ変換には、ちょっと変な見方がある。時間の世界と周波数の世界を行き来する道具ではなく、一枚の平面の上で向きを変えるだけの操作だ、という見方だ。

音で考えると分かりやすいと思う。「いつ」「どの高さの音が」鳴っているか——この二つを同時に描いた地図が作れる。横軸が時間、縦軸が周波数。楽譜はその素朴な例だし、音声解析のスペクトログラムはもっと機械的な例だ。信号を波形（時間だけの関数）としてでもスペクトル（周波数だけの関数）としてでもなく、**時間-周波数平面**という一枚の紙の上に置く。

## ウィグナー-ビル分布

その地図の描き方はいくつもあって、ウィグナー-ビル分布（WVD）はそのうちの一つだ。やっていることを言葉にすると、こうなる。信号を、自分自身を少しずらしたコピーと掛け合わせる。ずらし幅を変えながらその積を並べて、並び方を「ずらし幅の方向に」フーリエ変換して周波数として読む。

$$W(t,f) = \int x\!\left(t+\frac{\tau}{2}\right) x^*\!\left(t-\frac{\tau}{2}\right) e^{-i2\pi f\tau}\, d\tau$$

$\tau$ がずらし幅で、時刻 $t$ を中心に前へ $\tau/2$、後ろへ $\tau/2$ と振り分けている。自己相関をその場その場で取っている、と言ってもいい。

スペクトログラムは信号を窓で切ってから FFT をかけるので、窓を短くすれば時間分解能は上がるが周波数分解能は落ちる、という綱引きから逃げられない。WVD は窓を使わないから、その綱引きが無い。単一のチャープなら、平面上にほとんど幅のない一本の線として出る。

代わりに厄介なのがクロス項だ。式が信号どうしの積になっている以上、成分が二つあれば「一つ目 × 二つ目」の項が必ず生まれる。それが二つの成分のちょうど中間に、振動する偽の山として立つ。本物が二つなら、山は三つに見えるということだ。実在しない山だから、読むときは「本物の間には縞が立つ」と知った上で見るしかない。平滑化して薄める版（擬似 WVD など）もあるけれど、薄めた分だけ鋭さも削れる。

<svg viewBox="0 0 600 420" width="100%" role="img" aria-label="時間-周波数平面と、角度アルファだけ回した新しい軸u"><defs><marker id="frft-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7d7568"/></marker><marker id="frft-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#3c7876"/></marker></defs><g font-family="'Zen Kaku Gothic New','Meiryo',system-ui,sans-serif"><line x1="80" y1="205" x2="505" y2="205" stroke="#7d7568" stroke-width="1.4" marker-end="url(#frft-g)"/><line x1="285" y1="360" x2="285" y2="58" stroke="#7d7568" stroke-width="1.4" marker-end="url(#frft-g)"/><text x="516" y="210" font-size="13" fill="#7d7568">t</text><text x="285" y="46" font-size="13" fill="#7d7568" text-anchor="middle">f</text><path d="M 425 205 A 140 140 0 0 0 285 65" fill="none" stroke="#7d7568" stroke-width="1" stroke-dasharray="3 3"/><text x="387" y="84" font-size="13" fill="#7d7568" text-anchor="middle">π/2</text><ellipse cx="285" cy="205" rx="125" ry="26" fill="#3c7876" fill-opacity="0.16" stroke="#3c7876" stroke-width="1.6" transform="rotate(-35 285 205)"/><line x1="162" y1="291" x2="436" y2="99" stroke="#3c7876" stroke-width="1.5" stroke-dasharray="6 4" marker-end="url(#frft-a)"/><text x="447" y="93" font-size="13" fill="#3c7876">u</text><path d="M 390 205 A 105 105 0 0 0 371 144.8" fill="none" stroke="#3c7876" stroke-width="1.4"/><text x="402" y="174" font-size="13" fill="#3c7876">α</text><line x1="195" y1="282" x2="168" y2="315" stroke="#7d7568" stroke-width="1"/><text x="163" y="329" font-size="13" fill="#7d7568" text-anchor="end">信号のエネルギー</text><text x="30" y="378" font-size="13" fill="#7d7568">t：時間　f：周波数　u：平面を角度 α だけ回した新しい軸</text><text x="30" y="400" font-size="13" fill="#7d7568">α = 0 なら軸はそのまま。α = π/2 で t 軸が f 軸に重なる ＝ 通常のフーリエ変換。</text></g></svg>

この平面の上でフーリエ変換が何をしているかというと、**90度回転**だ。時間軸が周波数軸になり、周波数軸が（符号を変えて）時間軸になる。

この見方を受け入れると、自然な問いが生まれる。「じゃあ、45度や30度の回転は？」

## 定義

分数フーリエ変換（FRFT）は、その答えだ。パラメータ α を取り、α=0 なら恒等変換、α=π/2 なら通常のフーリエ変換になる。

積分変換というのは、たいていこの形をしている：

$$X(u) = \int_{-\infty}^{\infty} K(u,t)\, x(t)\, dt$$

$K$ が核（カーネル）で、変換の性格を決めているのはここだけだ。$K = e^{-i2\pi ut}$ ならフーリエ変換、$K$ をウェーブレットの族に取ればウェーブレット変換になる。外側の「掛けて積分する」という骨格は共通で、中身の $K$ を差し替えると別の変換になる、という構造なんだ。

FRFT の核はこう書ける：

$$K_\alpha(t, u) = \sqrt{1 - i\cot\alpha}\;\exp\!\left(i\pi \frac{t^2 + u^2}{\tan\alpha} - i\frac{2\pi\, tu}{\sin\alpha}\right)$$

（α が π の整数倍のときは $\cot\alpha$ が発散するので別に定義するが、本質はこの式に入っている）

指数に $t^2$ と $u^2$ が入っているのが特徴で、これはチャープ——周波数が時間とともに直線的に動く波——そのものだ。フーリエ核 $e^{-i2\pi ut}$ の「一定周波数の波」が、FRFT ではチャープに置き換わっている。α→π/2 とすると $\cot\alpha \to 0$、$\sin\alpha \to 1$、前の係数も 1 になって、残るのは $e^{-i2\pi tu}$。ちゃんと通常のフーリエ核に戻る。

ウィグナー分布で見ると、FRFT は時間-周波数平面を角度 α だけ**回転**させる。それだけだ。

## チャープ信号との相性

LFM（線形周波数変調）信号、いわゆるチャープ信号を考える：

$$s(t) = \exp(i\pi \mu t^2)$$

時間-周波数平面でこれを描くと、エネルギーが斜め一本の直線上に乗っている。チャープレート μ が直線の傾きを決める。

通常の FT（90度回転）をかけると、この斜め直線はうまく一点に集まらない。でも、**直線の傾きにちょうど合った角度で FRFT をかける**と、信号はほぼ δ 関数的に集約される。最適角度は

$$\alpha^* = -\arctan\!\left(\frac{1}{\mu}\right)$$

あたりになる。

実用的な含意はこうだ。レーダーのチャープ信号処理で言えば、「時間領域でのマッチトフィルタ」でも「周波数領域でのマッチトフィルタ」でもなく、「FRFT 領域でのマッチトフィルタ」が自然な土台になる。処理をどのドメインでやるかで、信号の見え方がまるで変わる。

## 光学との繋がり

FRFT はフレネル回折とも繋がっている。自由空間を距離 z だけ伝播するコヒーレント光の場は、ガウス光学の枠内で FRFT として書ける。レンズ系のビーム変換は ABCD 行列で記述されるが、これは時間-周波数平面のシンプレクティック変換と同じ構造を持つ。

シンプレクティック変換は、この文脈では「平面の面積を保つ線形変換」だと思っていい。点 $(t, f)$ を $2\times2$ 行列で移す変換のうち、行列式が 1 のものだ。行列式は面積の拡大率だから、det = 1 は面積が変わらないという意味になる。

回転（FRFT）$\begin{pmatrix}\cos\alpha & \sin\alpha \\ -\sin\alpha & \cos\alpha\end{pmatrix}$ は det = 1。チャープを掛ける操作、光学でいうレンズは $\begin{pmatrix}1 & 0 \\ \beta & 1\end{pmatrix}$ のせん断で、これも det = 1。伝播 $\begin{pmatrix}1 & z \\ 0 & 1\end{pmatrix}$ も、スケーリング $\mathrm{diag}(m,\, 1/m)$ も det = 1。そして det = 1 どうしの積はやはり det = 1 だから、どう組み合わせても面積は保たれたままだ。光学では軸が時間と周波数ではなく位置と光線の角度になるけれど、代数としては同じものを見ている。

面白いのは、せん断だけでは回転が作れないことだ。二枚重ねても対角成分が揃わない。ところが三段——伝播・レンズ・伝播——にすると、スケールをうまく選んで回転そのものになる。FRFT を光学台の上で組むときの標準的な構成が、ちょうどこれだ。

<svg viewBox="0 0 600 240" width="100%" role="img" aria-label="せん断を三段重ねると回転になる図"><g font-family="'Zen Kaku Gothic New','Meiryo',system-ui,sans-serif"><line x1="33" y1="92" x2="177" y2="92" stroke="#7d7568" stroke-width="1" opacity="0.55"/><line x1="105" y1="20" x2="105" y2="164" stroke="#7d7568" stroke-width="1" opacity="0.55"/><text x="183" y="96" font-size="13" fill="#7d7568">t</text><text x="105" y="14" font-size="13" fill="#7d7568" text-anchor="middle">f</text><rect x="75" y="62" width="60" height="60" fill="none" stroke="#7d7568" stroke-width="1" stroke-dasharray="4 3"/><polygon points="54,122 114,122 156,62 96,62" fill="#3c7876" fill-opacity="0.16" stroke="#3c7876" stroke-width="1.6"/><text x="105" y="190" font-size="13" fill="#7d7568" text-anchor="middle">伝播 ＝ せん断</text><line x1="228" y1="92" x2="372" y2="92" stroke="#7d7568" stroke-width="1" opacity="0.55"/><line x1="300" y1="20" x2="300" y2="164" stroke="#7d7568" stroke-width="1" opacity="0.55"/><text x="378" y="96" font-size="13" fill="#7d7568">t</text><text x="300" y="14" font-size="13" fill="#7d7568" text-anchor="middle">f</text><rect x="270" y="62" width="60" height="60" fill="none" stroke="#7d7568" stroke-width="1" stroke-dasharray="4 3"/><polygon points="270,101 330,143 330,83 270,41" fill="#3c7876" fill-opacity="0.16" stroke="#3c7876" stroke-width="1.6"/><text x="300" y="190" font-size="13" fill="#7d7568" text-anchor="middle">レンズ ＝ 別向きのせん断</text><line x1="423" y1="92" x2="567" y2="92" stroke="#7d7568" stroke-width="1" opacity="0.55"/><line x1="495" y1="20" x2="495" y2="164" stroke="#7d7568" stroke-width="1" opacity="0.55"/><text x="573" y="96" font-size="13" fill="#7d7568">t</text><text x="495" y="14" font-size="13" fill="#7d7568" text-anchor="middle">f</text><rect x="465" y="62" width="60" height="60" fill="none" stroke="#7d7568" stroke-width="1" stroke-dasharray="4 3"/><polygon points="484,133 536,103 506,51 454,81" fill="#3c7876" fill-opacity="0.16" stroke="#3c7876" stroke-width="1.6"/><text x="495" y="190" font-size="13" fill="#7d7568" text-anchor="middle">伝播→レンズ→伝播 ＝ 回転</text><text x="300" y="222" font-size="13" fill="#7d7568" text-anchor="middle">どれも行列式 1。形は変わっても、囲む面積は変わらない。</text></g></svg>

この「面積は保たれる」は、不確定性原理とほとんど同じことを言っている。信号が平面上で占める面積には下限があって、それより小さくは潰せない。時間方向に絞れば周波数方向に広がるというのは、面積一定の長方形を細長くしているだけの話だ。シンプレクティック変換にできるのは形と向きを変えることで、面積そのものを減らすことではない。

レンズと伝播距離の組み合わせが、ちょうど「回転・せん断・スケーリング」の組み合わせになっているんだ。光学とフーリエ解析が同じ幾何学の言葉で話せる、という感じがある。ここは別に一本書けるくらいの話で、実際に距離と焦点距離をいくつにすれば何度回るのかを解くと、90 度のところに教科書の 2f 系がそのまま出てくる——[別の記事](/blog/2026-08-01-lens-as-rotation/)で解いてみた。

## 離散版

離散 FRFT（DFRFT）は、DFT の固有ベクトル（エルミート-ガウス関数の離散近似）を基底にして定義できる。DFT の固有値は $i^k$（k = 0, 1, 2, 3）なので、その $2\alpha/\pi$ 乗を取れば分数版の固有値になる。

O(N log N) に近い高速アルゴリズムも存在して、計算コストはほぼ FFT と同等にできる。

## 感じること

FT は操作群の一員に過ぎない、という感覚が FRFT を通じて具体的になる気がする。「連続的な回転の族があって、その中の α=π/2 という一点が通常の FT だ」という見方だ。

特別なのは確かだけれど、キリのいい角度を選んでいるだけとも言える。α=0 から π/2 まで、どこにでも降り立てる、というのが少し面白いと思う。

— ランキン

## 出典

- L. B. Almeida, "The fractional Fourier transform and time-frequency representations," *IEEE Trans. Signal Processing*, vol. 42, no. 11, 1994 — FRFT を時間-周波数平面の回転として定式化した論文
- H. M. Ozaktas, Z. Zalevsky, M. A. Kutay, *The Fractional Fourier Transform with Applications in Optics and Signal Processing*, Wiley, 2001 — 核の形、光学系との対応、シンプレクティック構造
- Ç. Candan, M. A. Kutay, H. M. Ozaktas, "The discrete fractional Fourier transform," *IEEE Trans. Signal Processing*, vol. 48, no. 5, 2000 — DFT 固有ベクトルによる離散版
- L. Cohen, "Time-frequency distributions — a review," *Proc. IEEE*, vol. 77, no. 7, 1989 — WVD とクロス項を含む時間-周波数分布の概観
