---
title: 'ブラウザで動く GNU Radio — GNU Radio World が登場した'
description: 'C++/Qt の大型DSPツールキット GNU Radio がWebAssemblyでブラウザに乗った。インストール不要、RTL-SDRも繋がる。'
pubDate: 2026-09-12T07:00:00+09:00
---

GNU Radio を使ったことがある人ならわかると思うけど、あれのセットアップはなかなか面倒だ。依存関係が多く、Python バインディングも絡み、環境によってはビルドだけで半日消える。

そんな GNU Radio が、ブラウザで動くようになった。

## GNU Radio World

Marc Lichtman（pysdr.org の作者、GNU Radio の副会長）が公開した **GNU Radio World** は、GNU Radio Companion のフローグラフエディタとランタイムを丸ごと WebAssembly にコンパイルしてブラウザで動かす、という試みだ。

技術的な面白さは二重になっている。ひとつは、C++ で書かれた GNU Radio の DSP コアと Qt GUI シンク類を WebAssembly に変換していること。もうひとつは、各ブロックの WASM モジュールを使うときだけ遅延ロードする設計で、初回の取得量を最小限に抑えている点だ。将来的にはサードパーティの out-of-tree モジュールも同じ仕組みで追加できるかもしれないな。

## 実機も繋がる

単なるシミュレーターではなく、WebUSB 経由で RTL-SDR・PlutoSDR・HackRF と通信できる。ブラウザから直接スペクトラムアナライザーを立ち上げて、航空機の ADS-B 信号を受信してマップに表示する、というデモも用意されている。

既存の `.grc` ファイルはそのまま読み書きできるし、サンプルの IQ 録音も同梱しているので、ハードウェアがなくても試せるようになっている。

## 何が変わるか

「GNU Radio を試してみたい」という人のハードルが、インストール作業からブックマーク一個に下がる。教育の文脈ではかなり効いてくると思う。pysdr.org がそうだったように、Lichtman はツールのアクセシビリティを上げることに関心があるんだろう。

技術的にも、Qt という重い GUI フレームワークを WASM に持ち込んで実際に動作させたという点は単純に面白い。これがうまく動くなら、似たアーキテクチャの他のツールにも同じアプローチが使えるかもしれないな。

ライセンスは GPLv3。コードは GitHub で公開されている。

— ランキン

## 出典

**一次情報**
- [gnuradioworld.com](https://gnuradioworld.com/) — プロジェクト本体
- [GitHub: marcnewlin/gnuradio-web](https://github.com/marcnewlin/gnuradio-web) — ソースコード（実験的 WebAssembly ビルド）

**第三者報道**
- [GNU Radio World: Browser-Based GNU Radio Flowgraphs — rtl-sdr.com, 2026-09-10](https://www.rtl-sdr.com/gnu-radio-world-browser-based-gnu-radio-flowgraphs/) — 紹介記事

本記事の情報はプロジェクト公式サイト・著者の公開情報に基づく。
