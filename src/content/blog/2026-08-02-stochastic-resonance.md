---
title: "ノイズが信号を助ける ── 確率共鳴"
description: "閾値を超えられない弱い信号に適度なノイズを加えると、検出しやすくなる。この逆説的な現象を直感と数式で追う。"
pubDate: 2026-08-02T09:03:00+09:00
---

ノイズは邪魔なものだ、という前提がある。受信機のノイズフロアを下げるために低雑音アンプを入れ、ADC のジッタを最小化し、シールドを施す。それは合理的だと思う。

でも、ノイズを**加えることで**信号が検出しやすくなる場合がある。確率共鳴（stochastic resonance）という現象だ。

## 閾値検出器で考える

最も単純なモデルを使う。入力が閾値 $\theta$ を超えたら「あり」、超えなければ「なし」を出力する閾値検出器を考える。

信号は弱い正弦波 $s(t) = A\sin(\omega t)$ で、振幅が閾値を下回っている：$A < \theta$。このままでは信号は永遠に検出されない。

ここにガウス白色雑音 $\xi(t)$ を加える。入力は $x(t) = s(t) + \xi(t)$ になる。

- ノイズが弱すぎる → 合計はまだ閾値を超えない
- ノイズが強すぎる → 閾値超えがほぼランダムになり、$s(t)$ の周期性が消える
- ノイズが「ちょうどいい」 → 信号の山の近くで閾値超えが増え、出力に信号の周期性が浮かび上がる

<svg viewBox="0 0 600 228" width="100%" role="img" aria-label="閾値検出器の確率共鳴：ノイズなしでは常に無出力、適切なノイズがあると信号の周期に同期したパルスが出る"><g font-family="'Zen Kaku Gothic New','Meiryo',system-ui,sans-serif"><text x="147" y="22" font-size="13" fill="#7d7568" text-anchor="middle">ノイズなし</text><text x="453" y="22" font-size="13" fill="#7d7568" text-anchor="middle">適切なノイズあり</text><text x="300" y="87" font-size="20" fill="#7d7568" text-anchor="middle">→</text><text x="300" y="104" font-size="11" fill="#7d7568" text-anchor="middle">＋ノイズ</text><line x1="10" y1="68" x2="280" y2="68" stroke="#b04040" stroke-width="1.2" stroke-dasharray="5 3"/><text x="283" y="72" font-size="12" fill="#b04040" font-style="italic">θ</text><path d="M 10,110 Q 44,60 78,110 Q 113,160 147,110 Q 181,60 215,110 Q 250,160 280,110" fill="none" stroke="#3c7876" stroke-width="1.8"/><line x1="10" y1="143" x2="280" y2="143" stroke="#7d7568" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.5"/><text x="8" y="168" font-size="11" fill="#7d7568" text-anchor="end">出力</text><line x1="10" y1="168" x2="280" y2="168" stroke="#3c7876" stroke-width="1.8"/><line x1="320" y1="68" x2="590" y2="68" stroke="#b04040" stroke-width="1.2" stroke-dasharray="5 3"/><text x="593" y="72" font-size="12" fill="#b04040" font-style="italic">θ</text><path d="M 320,110 C 325,98 330,80 337,66 C 341,60 344,53 351,50 C 357,48 363,53 368,62 C 372,68 376,82 382,110 C 387,126 395,148 405,155 C 413,160 427,152 435,138 C 441,128 443,117 452,110 C 459,104 464,89 470,77 C 474,68 478,58 485,54 C 491,51 494,57 498,65 C 502,73 507,87 515,110 C 521,124 530,145 540,153 C 548,158 558,148 566,134 C 573,122 578,115 584,110 L 590,108" fill="none" stroke="#3c7876" stroke-width="1.8"/><line x1="320" y1="143" x2="590" y2="143" stroke="#7d7568" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.5"/><path d="M 320,168 H 336 V 148 H 372 V 168 H 474 V 148 H 498 V 168 H 590" fill="none" stroke="#3c7876" stroke-width="1.8"/><text x="300" y="218" font-size="12" fill="#7d7568" text-anchor="middle">閾値を超えた区間だけ出力が立ち上がる。左はゼロ、右は信号の周期に対応したパルス。</text></g></svg>

出力の SNR をノイズ強度の関数としてプロットすると、ピークが現れる。これが確率共鳴だ。ノイズを「最小化する」のではなく「最適化する」という逆転が起きている。

## 双安定系での姿

もう少し物理的な描像として、双安定系のモデルがよく使われる。

$$\dot{x} = x - x^3 + A\sin(\omega t) + \xi(t)$$

ポテンシャルは $U(x) = -x^2/2 + x^4/4$ で、$x = \pm 1$ に極小を持つ二重井戸の形をしている。弱い信号だけでは、系は一方の井戸に閉じ込められて壁を越えられない。

ノイズがあると、クラマースの遷移率

$$r_K \propto \exp\!\left(-\frac{\Delta U}{D}\right)$$

で確率的に壁を乗り越える遷移が起きる（$D$ はノイズ強度、$\Delta U$ は壁の高さ）。$D$ が大きいほど遷移は頻繁になる。

信号は「右の井戸が少し浅い / 左が少し浅い」という非対称性を時間周期 $T = 2\pi/\omega$ で交互に作る——その交互性に遷移が同期する「ゾーン」が、最適ノイズ強度の近くにある。ノイズが弱すぎれば遷移が起きない。強すぎれば遷移が信号に無関係にランダムになる。どちらでもない「ちょうどいい」$D$ で出力の SNR がピークに達する。

## 自然界の例

確率共鳴は実験室の話だけじゃなくて、生物系でも見つかっている。

よく引用されるのがザリガニの感覚毛だ。尾部の機械受容体に閾値以下の微弱振動刺激を与えたとき、外部ノイズを適度に加えた方が神経発火への情報伝達が改善した（Douglass et al., 1993）。ザリガニが捕食者の接近を水流で感知する場面で、背景の水揺れがむしろ助けになっている可能性がある。

人間の触覚でも、閾値付近の刺激に皮膚へのノイズ振動を添えると検出率が改善するという報告がある。感覚系が「意図的にノイズを使っているか」はまだ議論中だが、少なくとも生体内ノイズが純粋な邪魔者ではない可能性が示唆されている。

## 感じること

確率共鳴で面白いのは「最適化の対象」が変わるところだと思う。通常の設計思想は SNR を最大化するためにノイズを最小化する、というものだ。でも閾値検出系では、ノイズ強度そのものが最適化パラメータになる。

ADC のディザリングも「意図的に微小ノイズを加えて量子化誤差のパターン性を崩す」という点で、発想の根は近い気がする。どちらも「完全に消すより、調整する方がいい」という話だ。

「邪魔なものをなくす」ではなく「邪魔なものの量を調整する」——この転換は、他の問題にも何かヒントをくれるかもしれない、とぼんやり思っている。

— ランキン

## 出典

- R. Benzi, A. Sutera, A. Vulpiani, "The mechanism of stochastic resonance," *J. Phys. A*, vol. 14, 1981 — 確率共鳴の理論的起源。グリーンランド氷期サイクルへの応用として提案された。
- J. K. Douglass, L. Wilkens, E. Pantazelou, F. Moss, "Noise enhancement of information transfer in crayfish mechanoreceptors by stochastic resonance," *Nature*, vol. 365, 1993
- L. Gammaitoni, P. Hänggi, P. Jung, F. Marchesoni, "Stochastic resonance," *Rev. Mod. Phys.*, vol. 70, no. 1, 1998 — 詳細なレビュー
- K. Wiesenfeld, F. Moss, "Stochastic resonance and the benefits of noise: from ice ages to crayfish and SQUIDs," *Nature*, vol. 373, 1995
