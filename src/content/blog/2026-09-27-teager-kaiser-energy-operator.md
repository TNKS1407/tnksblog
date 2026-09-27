---
title: "3つのサンプルで瞬時周波数を掴む ── Teager-Kaiser エネルギー演算子"
description: "ẋ² − xẍ という簡素な式が、AM-FM 信号の瞬時振幅と瞬時周波数を同時に取り出せる理由を解きほぐす。"
pubDate: 2026-09-27T13:02:00+09:00
---

信号処理のツールボックスには、見た目の素朴さに反して深い意味を持つ演算子がたまにある。Teager-Kaiser エネルギー演算子（TKEO）もそのひとつだと思う。

## 定義

連続時間版の定義はこれだ：

$$\Psi[x(t)] = \dot{x}(t)^2 - x(t)\,\ddot{x}(t)$$

微分と掛け算だけ。シンプルすぎて、これが何かに使えるとは最初は思えない。

## 純粋な正弦波で試す

$$x(t) = A\cos(\omega t)$$

に代入する。$\dot{x} = -A\omega\sin(\omega t)$、$\ddot{x} = -A\omega^2\cos(\omega t)$ なので、

$$\Psi[x] = A^2\omega^2\sin^2(\omega t) + A^2\omega^2\cos^2(\omega t) = A^2\omega^2$$

時刻 $t$ によらない定数になった。$A$ と $\omega$ だけで決まる。

## 物理との対応

バネ・質量系の調和振動子を思い出すと、ハミルトニアンは

$$H = \frac{1}{2}m\dot{x}^2 + \frac{1}{2}kx^2 = \frac{1}{2}mA^2\omega^2$$

つまり $\Psi[x] = A^2\omega^2 = 2H/m$ だ。TKEO は振動の「エネルギー」を文字通り測っている。Teager が *energy operator* と名付けたのはそういう理由なんだと思う。

## AM-FM 信号への拡張

面白いのは、振幅と周波数が時間変化する信号

$$x(t) = A(t)\cos(\theta(t)), \qquad \omega(t) = \dot{\theta}(t)$$

でも、変化がゆっくりなら同じ関係が近似的に成り立つことだ：

$$\Psi[x(t)] \approx [A(t)\,\omega(t)]^2$$

$\dot{x}$ に同じ演算子を適用すると $\Psi[\dot{x}] \approx [A(t)\,\omega(t)^2]^2$ となるので、比をとれば

$$\hat{\omega}(t) = \sqrt{\frac{\Psi[\dot{x}(t)]}{\Psi[x(t)]}}, \qquad \hat{A}(t) = \frac{\sqrt{\Psi[x(t)]}}{\hat{\omega}(t)}$$

瞬時周波数と瞬時振幅が同時に出てくる。Fourier 変換もウィンドウも使わない。

## 離散版

実装で使うのはこちらだ：

$$\Psi[x(n)] = x(n)^2 - x(n-1)\,x(n+1)$$

$x(n) = A\cos(\omega n)$ を代入する。積和公式 $\cos A \cos B = \tfrac{1}{2}[\cos(A-B)+\cos(A+B)]$ を使うと

$$x(n-1)\,x(n+1) = \frac{A^2}{2}\bigl[\cos(2\omega) + \cos(2\omega n)\bigr]$$

$$x(n)^2 = \frac{A^2}{2}\bigl[1 + \cos(2\omega n)\bigr]$$

差をとれば

$$\Psi[x(n)] = \frac{A^2}{2}[1 - \cos(2\omega)] = A^2\sin^2(\omega)$$

$\omega \ll \pi$ のとき $\sin\omega \approx \omega$ なので $\Psi \approx A^2\omega^2$ となり、連続版と一致する。

**前後 1 点ずつ、合計 3 サンプルだけで計算が完結する**。FFT 不要、フィルタ長も決めなくていい。

## どこで使うか

- 音声の基本周波数（F0）のリアルタイム追跡
- 軸受振動から故障周波数を拾う機械診断
- EEG やバイタルの瞬時周波数解析
- 限られた計算資源での AM-FM 変調解析

Hilbert 変換ベースの瞬時周波数推定と比べると、TKEO は FFT を一切使わない分、リアルタイム処理や低消費電力の組み込み環境では有利なことがある。ただし、多成分信号やノイズが多い場面では弱くなるので、どちらを選ぶかは信号の性質による。

---

Teager が 1992 年に発表した演算子で、比較的新しいからか教科書のカバレッジが薄い印象がある。バネのエネルギーと信号処理が同じ式で繋がる、あの「ああそういうことか」という瞬間がなかなか気持ちいいと思う。

— ランキン
