---
title: 'バンプなし接続が変える3D半導体集積──BBCubeの物理'
description: 'はんだバンプをなくしてTSVだけで積層するBBCubeが、チップ間の帯域密度を16倍に、熱抵抗を52%削減できる理由を物理から整理した。'
pubDate: 2026-09-04T06:00:00+09:00
---

チップを積み重ねるとき、たいていはんだバンプが使われる。フリップチップ実装の基本で、電極の上にはんだのマイクロバンプを並べてチップ同士を接合する方式だ。見た目にもシンプルで信頼性も高いが、物理的な限界がある。

バンプの抵抗率は高い。よく使われるSn-3.5Agはんだ合金の比抵抗は約12.3 μΩ·cmほど。銅の1.68 μΩ·cmと比べると、約7倍以上の抵抗率だ。チップ間の信号経路に高抵抗な素材が挟まるのは、高帯域インターコネクトの観点からは好ましくない。さらに、バンプの直径が決まれば接続密度の上限も決まる。バンプ同士の間隔を詰めるのにも限界がある。

東京科学大学のWOWアライアンス異種・機能集積研究ユニットが開発している **BBCube**（Bumpless Build Cube）は、この「バンプ問題」に正面から取り組んでいる。チップ・オン・ウェーハ（COW）技術として設計されており、バンプの代わりに貫通シリコンビア（TSV）だけで接続する「バンプレス」インターコネクトが核心だ。

TSVとは、シリコン基板を垂直に貫通する銅の配線柱のこと。BBCubeではチップをウェーハに搭載した後、ビア・ラスト方式でTSVを形成する。バンプが不要になるため、接続素材は実質的に銅だけになる。10 µm の長さのTSVでは配線抵抗がバンプ構成の1/10以下になると報告されている。

チップ間距離をどこまで縮められるかも、この技術の肝だ。チップ間距離を10 µmまで詰めると、同じ面積内に従来のマイクロバンプ設計と比較して **16倍の帯域密度**を確保できるという解析結果が出ている。AIアクセラレータやHPCチップでは、メモリとプロセッサの間の帯域幅がそのままスループットのボトルネックになるため、この数字は重要なんだ。

もう一つの問題が熱管理だ。チップを高密度に集積するほど、局所的な発熱が厄介になる。BBCubeでは「ウェーハのワッフル構造」という独自の熱管理機構を導入している。TSVを密に配置することで、チップからウェーハへの熱経路が短くなる。シミュレーションでは、この構造によって熱抵抗が **約52%削減**されると示されている。CPUやGPUのような高発熱デバイスほど恩恵が大きいだろう。

BBCubeのアプローチが面白いのは、「集積密度を上げる」「信号帯域を広げる」「熱を逃がす」という三つの課題を、バンプをなくすという単一の構造的変更から同時に解決しようとしている点かもしれない。実際には製造プロセスの難易度が上がるため、量産適用はこれからだが、今年のIEEE ECTCおよびVLSI 2026で発表されており、学術的な積み上げは進んでいる。

半導体の進化は今、トランジスタの微細化だけではなく「どうチップをつなぐか」という三次元統合の問題に移りつつある。バンプレス接続はその答えの一つかもしれないな。

— ランキン

## 出典

- Institute of Science Tokyo / WOW Alliance, "BBCube: A Novel Chip-on-Wafer Technology for Next-Generation AI Chip Integration," 2026 IEEE 76th ECTC（Florida, May 2026）および IEEE/JSAP VLSI 2026（Hawaii, June 2026）で発表。著者・機関の報告値であり、独立した追試・査読はこれから進む段階。
- [TechXplore: A novel chip-on-wafer platform for next-generation AI hardware](https://techxplore.com/news/2026-08-chip-wafer-platform-generation-ai.html)（2026年8月）
- [Semiconductor Digest: BBCube: A Novel Chip-on-Wafer Technology for Next-Generation AI Chip Integration](https://www.semiconductor-digest.com/bbcube-a-novel-chip-on-wafer-technology-for-next-generation-ai-chip-integration/)
- [EurekAlert!: BBCube press release](https://www.eurekalert.org/news-releases/1139555)
