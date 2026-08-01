---
title: "レンズがフーリエ変換するのは、90度だけ回しているから"
description: "伝播とレンズを三段に組むと位相平面の回転になる——では、距離と焦点距離をいくつにすれば何度回るのか。解くと 90 度のところに、教科書の 2f 系がそのまま現れる。"
pubDate: 2026-08-01T09:00:00+09:00
---

前に[分数フーリエ変換の記事](/blog/2026-07-26-fractional-fourier-transform/)を書いたとき、光学との対応のところで「ここは別に一本書けるくらいの話だと思う」と書いて、そのまま置いていった。読んでくれた人からもそこを掘ってほしいと言われたので、宿題を片付けることにする。

前回の要点だけ引き写しておく。光線を「光軸からの距離 $x$」と「光軸に対する傾き $\theta$」の二つで表して、それを軸にした平面——**位相平面**——を考える。信号処理の時間-周波数平面と同じ形の紙だ。

傾きが十分小さい範囲に限れば（これを**近軸**という。$\sin\theta$ を $\theta$ で済ませていい、くらいの意味だ）、光学系を通ったときの $(x, \theta)$ の移り方は線形になり、$2\times2$ の行列で書ける。この平面の上で、

- 自由空間を距離 $z$ 進むこと $P(z) = \begin{pmatrix} 1 & z \\ 0 & 1 \end{pmatrix}$ は、**せん断**
- 焦点距離 $f$ の薄レンズ $L(f) = \begin{pmatrix} 1 & 0 \\ -1/f & 1 \end{pmatrix}$ も、向きが 90 度違う**せん断**

で、どちらも行列式が 1 だから面積を保つ。せん断を二枚重ねても回転にはならないが、三段——伝播・レンズ・伝播——にすると回転が作れる。前回はそこまで書いた。

書かなかったのは、**では距離と焦点距離をいくつにすれば何度回るのか**、という肝心のところだ。今回はそれを解く。

## 三段を、掛けてみる

対称に組む。両側の伝播距離を同じ $z$ にして、真ん中に焦点距離 $f$ のレンズを置く。

$$P(z)\,L(f)\,P(z) = \begin{pmatrix} 1 - z/f & 2z - z^2/f \\ -1/f & 1 - z/f \end{pmatrix}$$

対角成分が両方 $1 - z/f$ で揃っている。回転行列 $\begin{pmatrix} \cos\alpha & \sin\alpha \\ -\sin\alpha & \cos\alpha \end{pmatrix}$ も対角が揃っているから、ここは噛み合いそうだ。せん断二枚だと対角が揃わなくて届かなかったのは、この一点だった。

あとは見比べる。ただし $x$ は長さ、$\theta$ は角度で単位が違うので、そのままでは「45 度回した」と言えない。$s$ という長さのスケールを一つ決めて、$x/s$ と $s\theta$ を軸に取る。この $s$ が、その光学系にとっての「位置と角度の換算レート」になる。

左下成分と対角を回転行列と突き合わせると、

$$\cos\alpha = 1 - \frac{z}{f}, \qquad \frac{1}{f} = \frac{\sin\alpha}{s^2}$$

この二本を $z$ と $f$ について解いて、

$$\boxed{\;z = s^2\tan\frac{\alpha}{2}, \qquad f = \frac{s^2}{\sin\alpha}\;}$$

これで全部だ。右上成分は使わずに決まってしまったので、勝手に合ってくれないと困る。$2z - z^2/f$ に代入すると、

$$2s^2\tan\frac{\alpha}{2} - s^2\tan^2\frac{\alpha}{2}\sin\alpha = s^2\left(\frac{2\sin(\alpha/2)}{\cos(\alpha/2)}\right)\left(1 - \sin^2\frac{\alpha}{2}\right) = s^2\sin\alpha$$

ちゃんと合う。三段の光学系が、位相平面をきっかり $\alpha$ だけ回す。

<svg viewBox="0 0 620 340" width="100%" role="img" aria-label="回転角αを変えると伝播距離zとレンズ焦点距離fがどう変わるかを、三本の光学台で比べた図。α=90度でz=fとなり2f系になる"><g font-family="'Zen Kaku Gothic New','Meiryo',system-ui,sans-serif" font-size="12"><text x="20" y="20" fill="#7d7568" font-size="12.5">同じ三段構成で、回した角度 α だけを変えたときの並び（s² = 1 として長さは実寸比）</text><g><line x1="80" y1="72" x2="250" y2="72" stroke="#7d7568" stroke-width="1" stroke-dasharray="4 4"/><line x1="80" y1="52" x2="80" y2="92" stroke="#3c7876" stroke-width="2"/><ellipse cx="134" cy="72" rx="6" ry="19" fill="none" stroke="#3c7876" stroke-width="2"/><line x1="188" y1="52" x2="188" y2="92" stroke="#3c7876" stroke-width="2"/><line x1="80" y1="40" x2="134" y2="40" stroke="#7d7568" stroke-width="1"/><line x1="134" y1="40" x2="188" y2="40" stroke="#7d7568" stroke-width="1"/><text x="107" y="35" fill="#7d7568" text-anchor="middle" font-size="11">z</text><text x="161" y="35" fill="#7d7568" text-anchor="middle" font-size="11">z</text><text x="20" y="76" fill="#a8722a" font-size="12.5">α=45°</text><text x="300" y="68" fill="#7d7568" font-size="11.5">z = tan22.5° = 0.41</text><text x="300" y="83" fill="#7d7568" font-size="11.5">f = 1/sin45° = 1.41　→　z &lt; f</text></g><g><rect x="14" y="108" width="592" height="52" fill="#3c7876" fill-opacity=".07" stroke="#3c7876" stroke-width="1" stroke-dasharray="4 3"/><line x1="80" y1="134" x2="340" y2="134" stroke="#7d7568" stroke-width="1" stroke-dasharray="4 4"/><line x1="80" y1="114" x2="80" y2="154" stroke="#3c7876" stroke-width="2"/><ellipse cx="210" cy="134" rx="6" ry="19" fill="none" stroke="#3c7876" stroke-width="2.4"/><line x1="340" y1="114" x2="340" y2="154" stroke="#3c7876" stroke-width="2"/><line x1="80" y1="102" x2="210" y2="102" stroke="#7d7568" stroke-width="1"/><line x1="210" y1="102" x2="340" y2="102" stroke="#7d7568" stroke-width="1"/><text x="145" y="97" fill="#7d7568" text-anchor="middle" font-size="11">z = f</text><text x="275" y="97" fill="#7d7568" text-anchor="middle" font-size="11">z = f</text><text x="20" y="138" fill="#a8722a" font-size="12.5">α=90°</text><text x="390" y="130" fill="#a8722a" font-size="11.5">z = tan45° = 1、f = 1</text><text x="390" y="145" fill="#a8722a" font-size="11.5">→　z = f ＝ いわゆる 2f 系</text></g><g><line x1="80" y1="200" x2="530" y2="200" stroke="#7d7568" stroke-width="1" stroke-dasharray="4 4"/><line x1="80" y1="180" x2="80" y2="220" stroke="#3c7876" stroke-width="2"/><ellipse cx="305" cy="200" rx="6" ry="19" fill="none" stroke="#3c7876" stroke-width="2"/><line x1="530" y1="180" x2="530" y2="220" stroke="#3c7876" stroke-width="2"/><line x1="80" y1="168" x2="305" y2="168" stroke="#7d7568" stroke-width="1"/><line x1="305" y1="168" x2="530" y2="168" stroke="#7d7568" stroke-width="1"/><text x="192" y="163" fill="#7d7568" text-anchor="middle" font-size="11">z</text><text x="417" y="163" fill="#7d7568" text-anchor="middle" font-size="11">z</text><text x="20" y="204" fill="#a8722a" font-size="12.5">α=120°</text><text x="300" y="238" fill="#7d7568" font-size="11.5" text-anchor="middle">z = tan60° = 1.73、f = 1/sin120° = 1.15　→　z &gt; f</text></g><line x1="20" y1="262" x2="600" y2="262" stroke="#7d7568" stroke-width="1" opacity=".4"/><text x="20" y="284" fill="#7d7568" font-size="11.5">縦線＝物体面と出力面、楕円＝レンズ。α を大きくするほどレンズは遠ざかり、距離 z が伸びていく。</text><text x="20" y="302" fill="#7d7568" font-size="11.5">ちょうど 90° 回すところで z と f が一致する——それが、フーリエ光学の教科書に最初に出てくる配置だ。</text><text x="20" y="320" fill="#7d7568" font-size="11.5">どの段でも行列式は 1。形は変わっても、位相平面上で囲む面積は変わらない。</text></g></svg>

## 90 度のところに、見慣れたものがある

$\alpha = \pi/2$ を入れてみる。$\tan(\pi/4) = 1$、$\sin(\pi/2) = 1$ だから、

$$z = s^2, \qquad f = s^2$$

$z = f$ になる。焦点距離だけ離して物体を置き、レンズを通し、また焦点距離だけ離して受ける。**2f 系**だ。フーリエ光学の教科書の最初に出てくる、あの配置がそのまま出てきた。

つまり「レンズは焦点距離のところでフーリエ変換をする」というのは、**回転がちょうど 90 度になる場合**なんだ。他の角度が禁じられているわけではなかった。$z$ と $f$ を上の式に従って選び直せば、45 度でも 120 度でも回る。そして中途半端な角度の回転こそが、分数フーリエ変換にほかならない。

私が長いこと「そういうものだ」として覚えていた性質は、連続的な族の中の一点を指していただけだった。レンズが特別なことをしているのではなく、90 度まで回すと変換に名前が付いている、というだけの話だったんだ。ここは気持ちがいいと思う。

言い換えると、こうも言える。物体とレンズと出力面の距離を中途半端にした系の出力は、物体の**分数**フーリエ変換だ。焦点からずれた面に出ているのは、ただの半端にボケた中間像ではなくて、ちゃんと名前と次数を持ったものだった。

## どんな光学系も、三つに分かれる

もう一段だけ足しておく。行列式 1 の $2\times2$ 実行列の集まりを $SL(2,\mathbb{R})$ という。損失のない近軸光学系は、全部この中にいる。

この群には**岩澤分解**という定理があって、任意の元が

$$M = (\text{回転}) \times (\text{スケーリング}) \times (\text{せん断})$$

の積に、一意に分解できる。光学の言葉に翻訳すると——どんな光学系も、**分数フーリエ変換と、倍率と、レンズ一枚ぶんの位相**の三つに必ず分けられる、ということになる。

レンズと空間をどれだけ複雑に並べても、やっていることはその三つの組み合わせしかない。系がごちゃごちゃして見えても、位相平面の上では「どれだけ回して、どれだけ伸ばして、どれだけ倒したか」の三つの数で言い尽くせる。設計の自由度が思ったより狭い、と読むこともできるし、逆に、三つ揃えれば何でも作れる、と読むこともできる。

## 同じ幾何を喋っている

光学で ABCD 行列と呼ばれているものと、信号処理で時間-周波数平面を回すと言っているものは、結局同じ群だった。片方の軸は位置と光線角度、もう片方は時間と周波数。名前が違うだけで、面積を保つ線形変換という骨格は共通している。

面積が保たれることの意味も、両側で対応している。光学では損失がないこと。信号処理では不確定性——時間方向に絞れば周波数方向に広がる、というあれだ。**面積は潰せない、向きを変えられるだけ**というのは、どちらの言葉でも同じ内容を指している。

宿題として残していたものを解いてみたら、覚えるしかないと思っていた事実が、二つの掛け算から落ちてきた。$\tan(\alpha/2)$ という半端な形が出てきて、$\alpha = 90°$ でちょうど 1 になってくれるあたりが、いちばんきれいなところだと思う。

— ランキン

## 出典

一次情報・原典：
- [A. W. Lohmann, "Image rotation, Wigner rotation, and the fractional Fourier transform," *JOSA A* 10, 2181 (1993)](https://doi.org/10.1364/JOSAA.10.002181) — 光学系の FRFT 実装と位相平面回転の対応
- H. M. Ozaktas, Z. Zalevsky, M. A. Kutay, *The Fractional Fourier Transform with Applications in Optics and Signal Processing*, Wiley (2001) — 光学系との対応、シンプレクティック構造、岩澤分解
- J. W. Goodman, *Introduction to Fourier Optics*, 3rd ed., Roberts &amp; Company (2005) — 2f 系とレンズのフーリエ変換性

本文の対応関係（$P(z)L(f)P(z)$ が $z = s^2\tan(\alpha/2)$, $f = s^2/\sin\alpha$ のとき回転行列に一致すること、および $\alpha=\pi/2$ で $z=f$ に落ちること）は、こちらで数値的に確かめてある。近軸近似・薄レンズ・無損失を前提にした話なので、収差や有限開口の効果はこの枠の外にある。
