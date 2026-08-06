---
title: '50ドルで3GHz対応SDRを作る：Tayloe検波器という選択'
description: 'アナログスイッチ一つでダウンコンバージョンとI/Q生成を同時に行うTayloe検波器を使い、FPGAなし・BOM50ドル以下で20MHz帯域のSDRを実現した設計の話。'
pubDate: 2026-08-06T07:00:00+09:00
---

SDRを自作しようとすると、まず帯域とコストの壁にぶつかる。

RTL-SDRは2千円台で買えるが、帯域が2.4 MHzしかなく、受信専用だ。HackRFは20 MHz帯域を持つが3〜4万円かかる。ADALM-PLUTOは20 MHzで送受信できて2万円前後——これが現実的な "安い広帯域SDR" の選択肢だった。

そこに、Hackaday Europe 2026 で Anders Nielsen が発表した設計が出てきた。部品代（BOM）で50ドル以下、20 MHz連続帯域、3 GHz対応、しかもFPGAなし。

回路の核にあるのが **Tayloe 検波器** だ。

## Tayloe 検波器とは

2001年に Dan Tayloe が考案したスイッチングミキサの一種で、アナログスイッチ一つで「ダウンコンバージョン」と「I/Q 生成」を同時にやってしまう。

仕組みはこうだ。RF 信号の入力に、LO の4倍の周波数で駆動される4:1 アナログスイッチを置く。1サイクルで4つのキャパシタに順番に RF を分配すると、I+、Q+、I-、Q- の4つのサンプルが出てくる。これを差動増幅でまとめると I/Q 信号ができあがる。

普通の直交ミキサは、90°位相シフタと2つの独立したミキサが必要になる。Tayloe 検波器はスイッチ一つでそれを代替する。しかも、サンプルホールド動作の性質から、抵抗型ミキサより理論上6 dBノイズフィギュアが優れている。HF 帯のアマチュア受信機では以前から使われてきた回路だけど、高周波への応用例はそこまで多くなかった。

## この設計の構成

今回の設計では TLV3253（コンパレータ兼アナログスイッチ）を Tayloe 検波器として使っている。

クロックは Si5351 クロックジェネレータ。同一 PLL から LO の4倍クロックを2チャンネル出力し、I 側と Q 側それぞれにわずかな位相オフセットをかけてスイッチを駆動する。Si5351 は通信用クロック IC として広く流通していて、安い。

検波器の出力は ADA4891 オペアンプでバッファされてから、HT9201 デュアル 10ビット/20 MHz ADC に入る。I/Q 両方を1チップでサンプリングできる。

そして USB 転送には **FX2LP** を使う。Cypress 製の USB 2.0 コントローラで、並列バスからデータを受け取って USB にストリーミングする。USB 2.0 の帯域は理論480 Mbit/s。20 MHz × 10ビット × 2チャンネルで400 Mbit/sだから、ギリギリ収まる計算だ。FX2LP のクローン品は1ドル台で入手できる。FPGA の代わりにこれを選んだのは、コスト面でも開発環境の複雑さの面でも合理的だと思う。

まとめると、

- TLV3253 → Tayloe 検波器（ダウンコンバージョン + I/Q 生成）
- Si5351 → 4倍クロック生成（LO）
- ADA4891 → バッファ
- HT9201 → デュアル ADC（20 MHz × 10ビット）
- FX2LP → USB 2.0 ストリーミング

この5段で構成されている。

## 気になる点

仮に性能数値が公称どおりなら、ADALM-PLUTO の1/3以下のコストで似たスペックのものが手に入る計算になる。数値は著者の自己報告で、独立した検証はこれからだと思うけど、回路の設計思想は筋が通っている。

Tayloe 検波器の上限周波数はスイッチの応答速度で決まる。TLV3253 が3 GHz近くまで動くかどうかは実測してみないとわからないし、その帯域でのノイズフィギュアが6 dBの理論値に近いかも気になる。

それでも、HF 受信機の古典的な回路を SDR の文脈で組み直して、USB 2.0 だけで完結させたのは面白いアプローチだと思う。FPGA 不要というのは、再現したい人へのハードルが下がるという意味でも重要だ。

設計は公開されているようなので、手元で試してみたい気もしている。

— ランキン

## 出典

**一次情報（公式発表・設計者のレポート）**
- Anders Nielsen, "Building a $50 SDR with 20 MHz Bandwidth," Hackaday (2026-03-22)  
  https://hackaday.com/2026/03/22/building-a-50-sdr-with-20-mhz-bandwidth/
- RTL-SDR.com, "Building a $50 BOM Software Defined Radio with a HT9201 20 MHz ADC and an FX2LP USB Controller Clone"  
  https://www.rtl-sdr.com/building-a-50-bom-software-defined-radio-with-a-ht9201-20-mhz-adc-and-an-fx2lp-usb-controller-clone/

**第三者報道・発表**
- Hackaday Europe 2026, "High Performance SDR On The Cheap" (2026-07-27)  
  https://hackaday.com/2026/07/27/hackaday-europe-2026-high-performance-sdr-on-the-cheap/
- YouTube: Anders Nielsen – High Performance SDR on the Cheap  
  https://www.youtube.com/watch?v=uKCpQ13NyUo

※ 性能数値は設計者の公称値。独立した検証はこれからと思われる。
