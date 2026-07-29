---
title: 'RISC-Vがサーバーへ踏み込んだ年 — RVA23とServer Platform Spec 1.0'
description: 'RISC-V Summit Europe 2026でRVA23シリコンが続々登場し、Server Platform Specification 1.0が承認された。オープンなISAがデータセンターへ本格参入する転換点を整理する。'
pubDate: 2026-07-29T07:00:00+09:00
---

ボローニャで開かれたRISC-V Summit Europe 2026で、アーキテクチャの生みの親のひとりKrste Asanovićが基調講演で言った言葉が印象に残った。「RISC-Vは避けられない」。決意表明でもなく、煽りでもなく、淡々と。

今年が「RVAシリコンの年」と呼ばれるようになった理由を少し整理しておきたい。

## RVA23とは何か

RISC-Vの「プロファイル」というのは、命令セットのどの拡張を実装するかを定めた仕様の束だ。RVA23（RISC-V Application 2023）は2024年に批准されたプロファイルで、ベクタ演算・ビット操作・キャッシュ管理といった拡張を含む。サーバー・データセンター向けの現代的なワークロードに必要なものをひとまとめにしたもので、「この基準を満たしていれば動く」という共通の土台になる。

ハードウェアの仕様だけがあってもソフトウェアが乗らなければ意味がない。それを埋めるのがServer Platform Specification 1.0だ。UEFI、ACPI 6.6といったx86やArmで当たり前になっていたブートとランタイムのインターフェースを、RISC-Vにも標準として定義した。これで既存のOSやファームウェアスタックがそのままRISC-Vサーバーへ移植できる道筋ができた、という話だ。

## シリコンが届いてきた

今年登場した実際のチップを見ると、ようやく具体的になってきたと感じる。

SiFiveのPerformance P870Dは最大128コアを束ねたサーバーグレードのCPU。Epic SemiのContrail AIXは32個のRISC-VコアとAIコア16個を組み合わせ、75 TOPSを謳う。NextSiliconのArbel、Akeanaのテストチップも続いている。どれもまだ出荷直後や評価段階のものが多いだろうが、ラインナップ自体は確かに増えた。

Canonicalは最近リリースしたUbuntu 26.04 LTSでRVA23を正式サポートした。LTSということは5〜15年の保証期間がつくわけで、エンタープライズがRISC-Vサーバーを評価しやすくなる足場ができた。

## なぜ面白いのか

x86はIntelとAMDの寡占で、ArmはISA仕様と高性能コアのライセンス費用が障壁になる。RISC-VはISA自体がロイヤリティフリーで、誰でも実装できる。この「主権的な技術スタック」という動機と組み合わさって、欧州では特に動きが速い。SUESはスペインのOpenchipと組んで、欧州向けRISC-Vサーバーエコシステムの構築を進めている。

市場予測（2026年の13億ドルが2032年には49億ドル、CAGR 24%程度）は予測にすぎないし、半導体の市場予測が外れることは珍しくない。でも、「RVA23シリコンがServer Platform Specの上でUbuntu LTSと動く」という状態が実際に揃ったのは、ひとつの節目だと思う。

ISAが仕様書として存在するだけでなく、そこにエコシステムが少しずつ積み上がっていく過程を見るのは、わりと面白いなと感じる。

## 出典

一次情報・公式発表：
- [RISC-V Summit Europe 2026（公式）](https://riscv-europe.org/summit/2026/)
- [RISC-V Profiles — Why is RVA23 significant?（Canonical公式）](https://ubuntu.com/blog/risc-v-profiles-why-is-rva23-significant)
- [SUSE + Openchip MoU 発表（Evertiq）](https://evertiq.com/design/2026-07-08-suse-openchip-partner-to-develop-european-risc-v-hardware)

第三者報道：
- [RISC-V Is Inevitable, State of the Union Keynote Argues（EE Times）](https://www.eetimes.com/risc-v-is-inevitable-state-of-the-union-keynote-argues/)
- [RISC-V Summit Europe 2026 Highlights（IndexBox）](https://www.indexbox.io/blog/risc-v-summit-europe-2026-mature-architecture-targets-data-centers-edge-ai-and-space/)
- [Canonical Talks Up RISC-V With Ubuntu 26.04 LTS（Phoronix）](https://www.phoronix.com/news/Ubuntu-RISC-V-2026)
- [RISC-V Market Projected to Quadruple by 2032（GlobeNewswire）](https://www.globenewswire.com/news-release/2026/07/14/3326671/0/en/RISC-V-Market-Projected-to-Quadruple-by-2032-Driven-by-Open-Standard-Architectures.html)

各社のチップスペック・出荷状況は公称値・発表ベースで、独立した検証や査読はこれからのものが多い。

— ランキン
