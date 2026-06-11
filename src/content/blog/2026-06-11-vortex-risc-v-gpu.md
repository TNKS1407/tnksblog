---
title: 'フルオープンなGPUが来た ── Vortex 3.0とRISC-V拡張の話'
description: 'ジョージア工科大が開発するRISC-Vベースのオープンソース GPU「Vortex」が3.0になった。3Dグラフィクスパイプライン・Vulkan・テンソルコアまで揃った今、その意味を整理してみる。'
pubDate: 2026-06-11T08:00:00+09:00
---

GPUはずっと「ブラックボックス」だった。内部アーキテクチャは非公開、ISAは独自仕様、ドライバもプロプライエタリ。学術研究者がGPUの内部を改造しようとすると、不完全なシミュレーターかリバースエンジニアリングに頼るしかない状況が続いていた。

ジョージア工科大学が長年開発してきた **Vortex** がそこに風穴を開けている。6月9日にリリースされた Vortex 3.0 は、RISC-Vを拡張したアーキテクチャのフルスタック GPU だ。FPGA上で動く合成可能な RTL として公開されており、学術グループや小規模なチップスタートアップが実際に手を動かせる形になっている。

## 3.0 で何が増えたのか

Vortex 2.x までは GPGPU、つまり OpenCL で汎用並列計算ができる程度だった。3.0 で一気に広がった。

まず**固定機能 3D グラフィクスパイプライン**が追加された。ラスタライザ・テクスチャユニット・アウトプットマージャ ── 3D レンダリングに必要な固定ハードウェアが揃った。これに合わせて **vortexpipe** という Vulkan ドライバが実装されている（Mesa Gallium フレームワーク上）。

計算側の拡張も大きい。テンソルコアに相当する構造的スパース性のサポート、ワープグループ単位の行列積演算（warp group-level GEMM）が加わった。ML ワークロードを明確に視野に入れた設計だろう。

ハードウェアスケジューラとコマンドプロセッサも新設計になり、非同期バリア（async barrier）も追加されている。CUDA の cooperative groups に近い概念を、オープンなアーキテクチャで実現しようとしているわけだ。

そして ASIC 合成フロー。7nm・14nm の予測プロセスノード向けに、オープンな RTL をそのまま ASIC まで繋げるフローが整備された。ライセンス料なしに GPU の RTL を入手し、FPGA で動かして、ASIC まで検討できるというのは、数年前には考えにくかった話だ。

## RISC-V を拡張するという設計思想

Vortex が興味深いのは、GPU の ISA をゼロから作らずに RISC-V を拡張した点だと思う。RISC-V にはカスタム命令空間が設計上用意されていて、ここに SIMT（Single Instruction, Multiple Thread）実行に必要な命令を載せる。

この設計は二つの意味で合理的だ。一つは、既存の RISC-V ツールチェーンをそのまま流用できること。もう一つは、CPU/GPU の境界を曖昧にする研究がしやすくなること。同じ ISA ベースを持つ CPU と GPU が共存するシステムを実験したいなら、Vortex はちょうどいい足場になる。

## 何が変わるのか

実用 GPU として一般ユーザーが NVIDIA から乗り換えられるか、という話ではない。そこはまだ遠いと思う。

ただ研究者にとっては違う角度になる。テンソルコアの動作を確かめたい、新しいスケジューリング手法を試したい、スパース演算のハードウェアサポートを評価したい ── そういう実験が、シミュレーターではなく合成可能な RTL で、3D グラフィクスまで含めたフルスタックで試せる環境が整ったということだ。

「GPU の中身を知りたい」と思ったことがある人には、Vortex のリポジトリを一度見る価値はあると思う。

— ランキン

---

## 出典

**一次情報・公式**
- [Vortex GitHub リポジトリ（vortexgpgpu/vortex）](https://github.com/vortexgpgpu/vortex)
- [Vortex: Extending the RISC-V ISA for GPGPU and 3D-Graphics Research（arXiv:2110.10857）](https://arxiv.org/abs/2110.10857)

**第三者報道（2026-06-09〜10）**
- [Vortex 3.0 Released As Full-Stack, Open-Source RISC-V GPU Now With 3D Pipeline（Phoronix）](https://www.phoronix.com/news/Vortex-3.0-RISC-V-GPGPU)
- [Open-Source RISC-V GPU Vortex 3.0 Adds Full 3D Pipeline, Vulkan, ASIC Flows（TechTimes）](https://www.techtimes.com/articles/318156/20260610/open-source-risc-v-gpu-vortex-30-adds-full-3d-pipeline-vulkan-asic-flows.htm)

機能リストおよびアーキテクチャの詳細は上記報道と GitHub リリースノートに基づく。性能・安定性はワークロードや合成環境によって変わりうる。
