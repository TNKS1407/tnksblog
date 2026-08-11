---
title: 'シリコンチップ上のグラフ状態——室温フォトニック量子計算の一歩'
description: '合肥晟芯（Sizhen Chip）とUSTCが、シリコンフォトニクスチップ上で4光子16量子ビットのGHZ状態を生成し、Groverアルゴリズムを精度98.7%で実行したと報告した。冷凍機不要、標準CMOSプロセス。'
pubDate: 2026-08-12T06:04:00+09:00
---

量子コンピュータといえば、希釈冷凍機に詰め込んで絶対零度に近い温度まで冷やす超伝導方式が今のところ主流だ。でも、フォトンを量子ビットとして使う「フォトニック量子コンピュータ」は、原理的に室温で動く。その方向に面白い報告が出た。

## 測定型量子計算（MBQC）とグラフ状態

通常の量子回路モデルは、ゲートを順番に量子ビットへ適用して計算を進める。一方、**測定型量子計算（MBQC）** は構造が逆だ。まず大きな絡み合い状態——「グラフ状態」や「クラスター状態」——を用意しておき、それを適切な基底で測定することで計算を実行する。ゲート操作が「測定の選び方」によって実現される仕組みだ。

グラフ状態は、グラフのノードが量子ビット、エッジが2量子ビット間のエンタングルメントに対応した状態だ。特定のグラフ構造を持つリソース状態があれば、普遍的量子計算が実現できる。スケーラビリティの観点でも、大きなリソース状態を先に生成しておけるのは利点だと思う。

## 今回の発表

2026年8月10日、合肥晟芯技術（Sizhen Chip）とUSTCの研究チームが、プログラム可能なシリコンフォトニクスチップ上での多光子グラフ状態生成を報告した。

数字を整理するとこうなる。

- **4光子・16量子ビットのGHZ状態**をオンチップで安定生成
- そのうち **10量子ビットで真の多体エンタングルメント**をエンタングルメント・ウィットネスで確認
- Groverの探索アルゴリズムを **平均精度98.7%** で実行（従来のオンチップ記録を約22ポイント上回る）
- 製造プロセスはシリコン・オン・インシュレータ（SOI）標準プロセス

GHZ状態（Greenberger-Horne-Zeilinger状態）は、|00...0⟩と|11...1⟩の等重ね合わせで書かれる、多体エンタングルメントの代表的な形だ。今回は各フォトンを**高次元にエンコード**している点がミソで、フォトン1個で複数量子ビット分の情報を担うことで、4フォトンで16量子ビット相当を実現している。

## 冷凍機なし、というのがポイント

超伝導量子コンピュータの大きな制約の一つはコストと運用難度の高い冷凍システムだ。フォトニックアプローチはその点で根本的に違う。室温・標準CMOSプロセスで動くなら、スケールアップのコスト構造が変わりうる。

もちろん、フォトニック量子コンピュータ固有の難しさもある。光子源の確率的な動作、伝送損失、測定タイミングの制御、そして光子間の高い忠実度のエンタングルメントをいかに維持するか——これらは98.7%という数字だけでは語れない話だ。

今はまだプレプリントの段階で、独立した検証はこれからだと思う。それでも、「室温シリコンチップでMBQCのリソース状態が動く」という方向性は、しばらく目を離せない気がする。

— ランキン

## 出典

- [Sizhen Chip Demonstrates Multi-Qubit Photonic Quantum States on Silicon Chip – The Quantum Insider (2026-08-10)](https://thequantuminsider.com/2026/08/10/sizhen-chip-multi-qubit-photonic-quantum-states-silicon-chip/)（著者・企業の報告値で、独立検証・査読はこれから）
- [China Photonic Chip Hits 98.7% Grover Accuracy – TechTimes (2026-08-10)](https://www.techtimes.com/articles/323798/20260810/china-photonic-chip-hits-987-grover-accuracy-four-photons-carry-16-qubits-silicon.htm)
- [Guizhen Chip's On-Chip MBQC Breakthrough Opens a Real Path to Million-Qubit Optical Quantum Computing – Pandaily (2026-08-10)](https://pandaily.com/guizhen-chip-on-chip-mbqc-million-qubit-pathway-aug2026)
- [Chip-based photonic graph states – AAPPS Bulletin, Springer Nature](https://link.springer.com/article/10.1007/s43673-023-00082-7)（背景資料）
