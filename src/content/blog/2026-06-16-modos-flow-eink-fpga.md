---
title: 'FPGAで60Hzを実現したオープンソースE-inkモニター — Modos Flow'
description: '電子ペーパーの「遅さ」を差分駆動とFPGAで乗り越えた Modos Flow の仕組みを読む。'
pubDate: 2026-06-16T07:00:00+09:00
---

電子ペーパー（E-inkあるいはe-paper）は、目に優しくて消費電力が小さい。これは本当のことだと思う。一方で「遅い」というのも事実で、一般的なE-inkディスプレイのリフレッシュレートはせいぜい数Hz程度、フル画面の書き換えには200〜300ミリ秒かかることも珍しくない。だからPCのメインモニターとして使うには、ずっとストレスがあったんだ。

その壁を越えようとしているプロジェクトが **Modos Flow** だ。2026年5月末にCrowd Supplyでクラウドファンディングを開始した13.3インチのE-inkモニターで、最大60 Hzのリフレッシュレートを謳っている。

## なぜE-inkは遅いのか

E-inkパネルは電気泳動（electrophoresis）という現象を使っている。帯電したマイクロカプセルの中に白と黒の粒子が封じ込められていて、電界の向きで粒子を上下させることで明暗を作る仕組みだ。

この応答が本質的にゆっくりしているのは、粒子の物理的な移動に時間がかかるから。さらに伝統的な制御方式では「全画面を一度リセットしてから書き直す」というアプローチを取っていたため、リフレッシュのたびに黒いフラッシュが走って何百ミリ秒も待たされた。快適なUIには程遠かったんだ。

## 差分リフレッシュとFPGA

Modos Flowが使っているのは **差分（部分）リフレッシュ** の手法だ。前フレームと現フレームの差分を計算し、変化したピクセル領域だけを更新する。これを実現するために、コントローラーの中心にFPGAを置いている。

具体的にはAMD/Xilinx の **Spartan-6 LX16** と **STM32H750**（Arm Cortex-M7）の組み合わせ。FPGAがリアルタイムの差分計算とタイミング制御を、マイコンが上位の制御ロジックを担う構成だと思う。LCDなら一枚のフレームバッファを垂直同期に合わせて流すだけでいいが、E-inkでは各ピクセルの「前の状態」を記録しておかないと差分が計算できない。そのためのロジックをFPGAに持たせている、というわけだ。

60 Hzを出すには両方のUSB-Cポートを使う必要があり、1本だけなら40 Hzになる。これは単純に電力バジェットの制約だろうな。解像度は3200 × 2400（約320 PPI）で、13.3インチとしては高密度だ。

## オープンソースという設計思想

Modos Flowはファームウェアも基板設計もオープンソースで公開される予定だ。

これは単純に「いいこと」というだけじゃなくて、E-inkドライバー分野の構造的な問題に対する一つの答えかもしれない。E-inkパネルのタイミング制御は各メーカーの独自仕様が多く、ドライバーのソースが手に入らないと何もできないという状況がずっと続いていた。Modosがオープンにすることで、コミュニティが別のパネルに対応させたり、カスタムの駆動波形を試したりできるようになる。

FPGAを使っている点もそこに絡む。特定用途向けICより柔軟で、タイミングやシーケンスをソフトウェア的に変更できる。パネルが変わっても、FPGAの実装を書き直せばある程度対応できる、という設計だろうな。

## 使い道を考える

私が思い浮かべるのは、やはりコードや論文を読む用途かな。長時間画面を見る作業でLCDより目の疲れが少ないという報告はそれなりにある。60 Hzあれば、ターミナルやエディターは十分使えるはずだ。動画はちょっときつそうだけど、それはそもそもE-inkに求めることじゃない。

ただ、$619〜$719という価格と、出荷が2026年12月という点は現実的に考える必要がある。クラウドファンディングの製品は常にリスクがあるし、E-inkの高速制御技術はまだ成熟しきっていない。公称値通りの性能が製品で出るかどうかは、実機が届いてみないとわからない。

「FPGAで独自のE-inkコントローラーを作る」という挑戦自体は面白いと思う。ハードウェアもソフトウェアもオープンにしてコミュニティに育ててもらう、という姿勢も含めて、ちょっと応援したくなる話じゃないかな。

— ランキン

## 出典

**一次情報（公式・製品ページ）**

- Modos Tech, "Modos Flow," Crowd Supply, 2026-05-26  
  https://www.crowdsupply.com/modos-tech/modos-flow
- Modos Tech, "Modos Paper Monitor — A Technical Deep Dive Into Glider," Crowd Supply Updates  
  https://www.crowdsupply.com/modos-tech/modos-paper-monitor/updates/a-technical-deep-dive-into-glider

**第三者報道**

- CNX Software, "Modos Flow – An FPGA-based 13.3-inch USB-C touchscreen e-paper monitor (Crowdfunding)," 2026-05-27  
  https://www.cnx-software.com/2026/05/27/modos-flow-an-fpga-based-13-3-inch-usb-c-touchscreen-color-e-paper-monitor/
- Liliputing, "Modos Flow is a 13.3 inch E Ink monitor with a 60 Hz display, open source firmware, touch & stylus support (crowdfunding)"  
  https://liliputing.com/modos-flow-is-a-13-3-inch-e-ink-monitor-with-a-60-hz-display-open-source-firmware-touch-stylus-support-crowdfunding/
- TechTimes, "E-Paper Monitor Modos Flow Launches: Open-Source 60 Hz Beats Rivals on Crowd Supply," 2026-05-28  
  https://www.techtimes.com/articles/317344/20260528/e-paper-monitor-modos-flow-launches-open-source-60-hz-beats-rivals-crowd-supply.htm

*仕様・スペックはModosの公表値（クラウドファンディング段階）であり、出荷製品での性能検証はこれから。*
