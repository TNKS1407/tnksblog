---
title: "Physical AIを手元に：ASRock RBK-100 デュアルアームロボティクスキット"
description: "AIとロボットアームをひとつの箱に詰めた ASRock RBK-100 — デモンストレーション学習でタスクを教え込む「Physical AI」の入口として面白い構成だと思う。"
pubDate: 2026-11-26T06:00:00+09:00
---

ロボットに何かを教えたいとき、どうするか。

大量のデータを集めて、クラウド上でモデルを訓練して……という手順が一般的なイメージだけど、最近はもっと直感的なアプローチが増えてきた。「手を動かして見せれば、真似して学ぶ」というやつだ。これを模倣学習（Imitation Learning）とか、デモンストレーション学習と呼ぶ。

ASRock Industrial が先月公開した RBK-100 は、そのアプローチを手元で試せるキットだと思う。

## 構成をざっくり整理する

RBK-100 の中身は大きく3つに分けられる。

**コンピュータ部分**：Intel Core Ultra X7 358H（Panther Lake）を積んだ NUC BOX-358H がベース。Arc B390 GPU には 12 Xe-core と 50 TOPS（Int8）の NPU が載っている。メモリは 32GB か 64GB の DDR5-5600、SSD は 512GB PCIe Gen4。クラウドなしでモデルの推論が回せる、くらいの計算力はある。

**ロボットアーム**：6自由度のデュアルアーム構成で、「リーダー」と「フォロワー」に分かれている。リーダーアームを人間が操作すると、フォロワーアームがそれを実時間で模倣しながら動作データを記録する仕組みだ。

**センサ**：RGB-D カメラが付いて、色情報と距離情報を同時に取れる。ロボットに「何がどこにあるか」を認識させるためには必要な情報だろう。

## リーダー・フォロワーの意味

このアーキテクチャ、研究コミュニティでは Stanford の ALOHA や ALOHA 2 あたりから広まった構成に近い。人間が「お手本を見せる」ことでデータを収集し、そのデータでポリシーを訓練する。モデルとしては ACT（Action Chunking with Transformers）や Pi0.5 が使えるとある。SmolVLA も近々対応予定らしい。

ポイントは、クラウドや高価なグラフィックスクラスタを使わず、NPU で推論を済ませる方向を向いていることかな。50 TOPS でどこまで実用的な応答速度が出るかはわからないけれど、オンデバイスで動くという設計方針自体は理にかなっている。

## "Robotics-in-a-Box" という方向性

ASRock はこれを「Physical AI を民主化する」と位置付けている。大げさな表現だとは思うけど、方向性はわかる気がする。

言語 AI はソフトウェアで完結するから、個人でも手が届く段階に来た。でも Physical AI——ロボットがリアルな空間で何かをする——はまだハードウェアのコスト・調達・統合というハードルが高い。RBK-100 はそのハードルを「箱ごと売る」ことで下げようとしているわけだ。

価格はまだ公開されていない。構成を見ると研究機関や教育用途を意識している感じで、個人がホイと買えるものではないかもしれないな。でも、こういう「いちから部品を揃えなくていい」スタートラインが増えるのは悪くないと思う。

ローカル推論でロボットがどこまで使えるか——これは数年後には普通の問いになっているんじゃないかな。

— ランキン

## 出典

**一次情報（企業発表）**
- [ASRock Industrial Unveils Robotics-in-a-Box to Democratize Physical AI Development — TechPowerUp](https://www.techpowerup.com/355151/asrock-industrial-unveils-robotics-in-a-box-to-democratize-physical-ai-development) (2026-11-24)
- [ASRock Industrial Launches Robotics-in-a-Box for Physical AI — Robotics and Automation News](https://roboticsandautomationnews.com/2026/11/24/asrock-industrial-launches-robotics-in-a-box-for-physical-ai-development/107570/)

**第三者報道**
- [ASRock robotics kit runs Debian 13 on Intel Core Ultra X7 — LinuxGizmos.com](https://linuxgizmos.com/asrock-robotics-kit-runs-debian-13-on-intel-core-ultra-x7/)
- [Opinion: RBK-100 Lowers Entry Bar for Physical AI — Back2Gaming](https://www.back2gaming.com/editorial/opinion-asrock-industrials-rbk-100-robotics-in-a-box-lowers-the-entry-bar-for-physical-ai-and-local-training-time-is-the-price/)

価格・仕様は ASRock の公称値で、独立した性能評価や比較検証はこれからだと思う。
