---
title: 'HackRF Pro が来る：12年越しのSDR刷新で何が変わったか'
description: 'HackRF One の後継機 HackRF Pro が9月7日に出荷開始。ADC の柔軟な精度設定、CPLD から FPGA へのシフト、内蔵 TCXO など、変更点を信号処理の視点から整理した。'
pubDate: 2026-08-26T07:30:00+09:00
---

HackRF One が公開されたのは2014年。それから12年、Great Scott Gadgets がようやく後継機を出す。HackRF Pro、出荷は9月7日予定だ。

## 何が変わったのか

HackRF One の構成は、8ビット ADC + CPLD（組み合わせ論理寄りの小規模 PLD）+ 外部クロック想定、という設計だった。1 MHz〜6 GHz をカバーし、20 MHz 連続帯域を USB 2.0 で吐き出す。これが2014年当時の現実的な選択だったし、十分に機能してきた。

Pro での主な変更点を整理すると：

**ADC の柔軟な精度設定**  
固定8ビットから、サンプルレートと分解能を組み合わせて選べるようになった。低速では16ビット、最高速40 Msps では4ビット半精度になる。実測 ENOB は9〜11ビット程度とのことだ。

信号処理から見ると、8ビット ADC の理論 SNR 上限は約48 dB。16ビット（ENOB 10ビットとして）なら60 dBまで伸びる。スペクトルの観測や干渉測定をやる用途では違いが出るだろう。逆に FM 放送や ADS-B を受信するだけなら8ビットで十分だったし、今後もそうだ。

**CPLD から Lattice iCE40-UP5K FPGA へ**  
CPLD では組み合わせ論理と簡単な状態機械しか実装できないが、iCE40 はブロック RAM や DSP ブロックを持つ。カスタムファームウェアを書く人には選択肢が広がる変更だと思う。iCE40 はツールチェーンも OSS（yosys/nextpnr）で整っている。

**TCXO の内蔵**  
25 MHz TCXO を内蔵し、公称精度 0.5 ppm になった。0.5 ppm というのは、1 GHz を受信しているときの最大周波数誤差が500 Hz ということだ。NFM（帯域12.5 kHz）や AM なら問題ないけど、狭帯域デジタル信号の解調や航法信号の解析では誤差が無視できなくなってくる。HackRF One でそこが弱かったのは知られていたので、素直な改善だと思う。

**DC スパイクの除去**  
ダイレクトコンバージョン受信機には、LO リークによる DC 付近のスパイクが避けがたく出る。HackRF One では可視で、スペクトルを見るときに邪魔だった。Pro では設計改善でこれを消している。

**下限周波数が 1 MHz から 100 kHz に**  
MF 帯（AM ラジオは530〜1710 kHz）や LF 帯がカバーできるようになる。標準時刻電波（JJY は40/60 kHz）も範囲内に入ってきた。

## 誰向けか

HackRF One はすでに研究・教育・アマチュア無線・セキュリティ調査の広い用途で動いてきた。Pro はその用途を変えるわけじゃなく、性能面を底上げしたものだ。既存ユーザーに乗り換えの理由があるかは用途次第で、新規に買うなら素直に Pro を選ぶ理由がある、という感じかもしれない。

個人的に気になるのは16ビット精度時の実測 DNL と THD だ。ENOB の数字は ADC 単体の性能で、実際の RF 経路全体では変わってくる。実測レポートが出てきたら見てみたい。

— ランキン

## 出典

**一次情報（公式発表）**
- Great Scott Gadgets, "Meet HackRF Pro" (2025-06-26)  
  https://www.greatscottgadgets.com/2025/06-26-meet-hackrf-pro/
- HackRF Pro ドキュメント  
  https://hackrf.readthedocs.io/en/latest/hackrf_pro.html
- Great Scott Gadgets, HackRF Pro 製品ページ  
  https://greatscottgadgets.com/hackrf/pro/

**第三者報道**
- RTL-SDR.com, "HackRF Pro Pre-Order: Frequency Range and RF Performance Improvements, USB-C, TCXO Added"  
  https://www.rtl-sdr.com/hackrf-pro-pre-order-frequency-range-and-rf-performance-improvements-usb-c-tcxo-added/
- LinuxGizmos.com, "HackRF Pro SDR covers 100kHz to 6GHz with FPGA-based processing"  
  https://linuxgizmos.com/hackrf-pro-sdr-covers-100khz-to-6ghz-with-fpga-based-processing/
- Hackster.io, "Great Scott Gadgets Unveils the Bigger, Better, Wider-Range HackRF Pro"  
  https://www.hackster.io/news/great-scott-gadgets-unveils-the-bigger-better-wider-range-hackrf-pro-software-defined-radio-c97bc78841b1

※ スペック・出荷予定日は Great Scott Gadgets の公称値。9月7日出荷開始は現時点の情報であり、変更の可能性はある。
