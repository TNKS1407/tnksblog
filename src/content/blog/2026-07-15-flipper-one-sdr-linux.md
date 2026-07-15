---
title: 'SDRをポケットに：Flipper Oneというモジュラー・サイバーデッキ'
description: 'Flipper Zero の開発元が発表した次世代機 Flipper One は、Linux と M.2 拡張スロットを持つモジュラー・サイバーデッキだ。SDR モジュールを差すだけでポータブルな RF 信号解析機になる設計思想が面白い。'
pubDate: 2026-07-15T06:00:00+09:00
---

Flipper Zero はよく知られていると思う。NFC・IR・Sub-GHz・iButton を一台で扱えるペンテスト向けの小型デバイスで、発売からの累計出荷は百万台を超えた。その次の製品、Flipper One が 2026 年 5 月に公開された。

Flipper Zero が「小さくてかわいい多機能ツール」なら、Flipper One はもっと上位の概念に近い。Linux が動くモジュラー・サイバーデッキだ。

## プロセッサ構成

メインは Rockchip RK3576。Cortex-A72 × 4 と Cortex-A53 × 4 のオクタコア構成で、ARM Mali-G52 GPU と 6 TOPS の NPU を内蔵している。メモリは 8 GB LPDDR5 だ。

さらに RP2350（Raspberry Pi のデュアルコア Cortex-M33 マイコン）がサブプロセッサとして載っている。低レベル I/O 制御用で、Flipper Zero のデュアルプロセッサ構成の流れを汲んでいる。NPU が 6 TOPS というのは、ポケットサイズのデバイスとしては意外と大きな数字で、エッジ推論がそのまま走るのはなかなか面白いと思う。

## M.2 スロットが肝

設計の核は M.2 Key-B スロットだ。PCIe 2.1×1 / USB 3.1 / SATA3 / USB 2.0 / I²C などのインターフェースを束ねていて、SIM/eSIM にも対応している。

ここに差せるモジュールの幅が広い。SDR モジュールを入れれば、ポータブルな RF 信号アナライザになる。NVMe SSD を入れればストレージが増える。AI アクセラレータ、衛星モデム、5G ラジオ——ユースケースがデバイスの形を決める設計方針だ。

SDR の観点では、Flipper Zero でできたのは Sub-GHz 帯の送受信程度だった。Flipper One は M.2 経由で本格的な SDR モジュールを内蔵できる可能性がある。屋外でのスペクトル観測や信号録音が、ラップトップなしでできるかもしれない。ADALM-PLUTO 互換のようなモジュールが対応していれば、そのまま GNU Radio を走らせることもできそうだ。

## オープンソースとしての広がり

ハードウェアと設計ドキュメントはオープンソースで公開される予定で、RK3576 のメインライン Linux 対応も進められている。

Flipper Zero もオープンソースだったが、ハードウェアをフォークして改造した派生品はほとんど出なかった。Flipper One は M.2 によってモジュール設計が外に向いているぶん、コミュニティが独自モジュールを作りやすいのかもしれない。「本体は共通、拡張は自分で」という設計が機能するかどうかはこれからだろうけど、方向性は筋が通っていると思う。

## まだ開発途上

価格も発売日も未定で、公式発表は「コミュニティの協力が必要」という呼びかけだった。手元に来るまでどれくらいかかるかはわからない。

とはいえ、SDR と Linux と NPU がポケットサイズで動くプラットフォームは、フィールドでの信号処理の実験環境として一つの選択肢になりうる。モジュールが出揃ったら、また何か書けそうだな。

— ランキン

## 出典

**一次情報（公式発表・ドキュメント）**
- Flipper Devices, "Flipper One — we need your help," blog.flipper.net (2026-05-20)  
  https://blog.flipper.net/flipper-one-we-need-your-help/
- Flipper One 技術仕様（公式ドキュメント）https://docs.flipper.net/one/general/tech-specs
- Flipper One M.2 ポート仕様 https://docs.flipper.net/one/hardware/m2-port

**第三者報道**
- CNX Software, "Flipper One – A Rockchip RK3576-powered portable Arm Linux computer" (2026-05-21)  
  https://www.cnx-software.com/2026/05/21/flipper-one-a-rockchip-rk3576-powered-portable-arm-linux-computer-and-networking-multi-tool/
- RTL-SDR Blog, "Early Development Plans for Flipper One Announced"  
  https://www.rtl-sdr.com/early-development-plans-for-flipper-one-announced/

※ 掲載情報は著者・企業の公式発表ベースで、製品は開発途上。仕様・価格は変更になる可能性がある。
