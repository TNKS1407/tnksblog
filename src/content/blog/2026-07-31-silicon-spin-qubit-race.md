---
title: 'シリコンスピン量子ビットという賭け — IBMと日立が同じ週に動いた'
description: 'HRLの18量子ビットSi-QPU論文、IBMによるHRL買収、日本のNEDOプロジェクト。2026年7月の一週間でシリコンスピン量子ビットを巡る産業競争が一気に可視化した。'
pubDate: 2026-07-31T09:00:00+09:00
---

7月22日から28日にかけての一週間で、シリコンスピン量子ビット（silicon spin qubit）に関わる大きな動きが三つ立て続けに起きた。単独なら「また量子コンピュータのニュースか」と流せるが、まとめて眺めると少し印象が変わる。

---

## 三つの出来事

**HRLが18量子ビットSi-QPUをNatureに発表**

カリフォルニアのHRL Laboratoriesが、18量子ビットのシリコンスピン量子プロセッサをNatureに公開した。200mm Si-Geウェーハ上に54個の量子ドットアレイを集積し、4K（ケルビン）で動作するカスタムRF-CMOSコントローラチップと一体化させた構成だ。

ポイントは「4K」という温度にある。超伝導量子ビットは15〜20ミリケルビンが必要で、配線ボトルネックに悩まされる（[先日の記事](../2026-07-27-wireless-millikelvin-interconnects)で触れた問題だ）。シリコンスピン量子ビットも量子ドット自体はミリケルビン域が必要だが、制御エレクトロニクスを4K段に置ける——つまり普通のCMOSチップを冷凍機の比較的"温かい"部分に収められる。これが配線問題への別解になりうる。

達成した誤り率は1量子ビットゲートが1.7×10⁻⁴、CNOTが3.5×10⁻³。室温エレクトロニクスを介さずに距離3と5の反復コードを自律実行したというのも、制御遅延の面で意味がある結果だろう。

**IBMがHRLを買収（7月23日）**

論文発表の翌日、IBMがHRLを買収すると発表した。IBMはすでに超伝導量子ビットで大規模なロードマップを持っているが、シリコンスピン経路を手に入れることで「Anderon Quantum Foundry」に別の製造オプションを加える形になる。

**日立がNEDOプロジェクトを発表（7月22日）**

日本では同日、日立・Intel K.K.・産業技術総合研究所（AIST）が、NEDO（新エネルギー・産業技術総合開発機構）の資金支援を受けたシリコンスピン量子コンピュータ開発プロジェクトを発表した。Intelの18Aプロセスを使って量子プロセッサチップを製造し、FY2028に100量子ビット、FY2030に1000量子ビットを目指す計画だ。

---

## なぜシリコンスピンなのか

シリコンスピン量子ビットの魅力は、半導体製造との親和性にある。超伝導量子ビットはジョセフソン接合が必要で、既存のCMOSラインとは根本的に違うプロセスが要る。一方、シリコンスピン量子ビットはシリコンウェーハ上に作られ、少なくとも原理上は既存の半導体ファウンドリの延長線上にある。

ただ、「原理上は作れる」と「安定して大量生産できる」の間には巨大なギャップがある。量子ドットのサイズばらつき・ゲート電圧の精密制御・コヒーレンス時間の均一性など、どれも桁違いの工程管理が必要だ。

今回のHRLのデモが面白いのは、そこを「4K CMOSコントローラを一体化する」という方向で回避しようとしている点だろう。室温との配線を減らし、フィードバックループの遅延を下げる。物理的な寸法管理の問題と制御アーキテクチャの問題を同時に攻めている感じがある。

---

今週の三つのニュースは、それぞれ別の主体が動いたように見えて、同じ問いに向かっている——「シリコンスピン量子ビットを、どうやって産業スケールに持っていくか？」

答えはまだ誰も持っていないが、賭けをした主体の数だけは増えた。この種の競争がどう収束するかは、5年後の結果で初めてわかるんだと思う。

— ランキン

## 出典

**一次情報**
- HRL Laboratories, Nature (2026年4月公開): [HRL Demonstrates Self-Running Silicon QPU – Quantum Computing Report](https://quantumcomputingreport.com/hrl-laboratories-demonstrates-self-running-silicon-qpu-in-nature-benchmark/)
- 日立プレスリリース (2026-07-22): [Hitachi Press Release PDF](https://www.hitachi.com/content/dam/hitachi/global/en/press/files/2026/07/260722a.pdf)
- [Hitachi Partners with Intel and AIST on NEDO Project – Quantum Computing Report](https://quantumcomputingreport.com/hitachi-partners-with-intel-and-aist-on-nedo-project-to-scale-silicon-quantum-processors/)

**第三者報道**（著者・企業の報告値で、独立検証・査読はこれから）
- [IBM acquires quantum computing research lab HRL – SiliconANGLE](https://siliconangle.com/2026/07/23/ibm-acquires-quantum-computing-research-lab-hrl/)
- [Silicon Spin Qubits Get Foundry Path: Hitachi Banks on Intel 18A Process – TechTimes](https://www.techtimes.com/articles/321867/20260728/silicon-spin-qubits-get-foundry-path-hitachi-banks-intel-18a-process.htm)
- [1000-Qubit System Targeted for FY2030 – TrendForce](https://www.trendforce.com/news/2026/07/27/news-intel-18a-gains-external-adopter-hitachi-for-silicon-quantum-chip-project-1000-qubit-system-targeted-for-fy2030/)
- [Underdog 'spin qubits' leap forward – Nature News](https://www.nature.com/articles/d41586-026-02357-z)
