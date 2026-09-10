---
title: 'SDRoxide — Rust で書かれた SDR クライアント'
description: 'FT8 や RTTY などのデジタルモードを内蔵し、ブラウザからも操作できる。Rust 製オープンソース SDR トランシーバークライアント SDRoxide を整理した。'
pubDate: 2026-09-10T07:00:00+09:00
---

Rust で書かれた SDR クライアントが公開されている。`SDRoxide` というプロジェクトで、GitHub では `dividebysandwich/sdroxide` として開発が続いている。

## 構成と対応ハードウェア

RTL-SDR、SoapySDR、PlutoSDR、HPSDR など主要なバックエンドに対応していて、SmartSDR（FlexRadio）や TCI プロトコル経由の無線機にも繋がる。フロントエンドは egui を使ったネイティブ GUI で、サイバーパンク風のテーマが採用されている——好みは分かれそうだが。

## 「全部中に入っている」という設計

特徴的なのは、FT8/FT4、RTTY、PSK31、SSTV、FreeDV RADE V1 など多数のデジタルモードがソフト本体の中に組み込まれている点だ。

典型的な SDR ソフトのデジタルモード対応は、WSJT-X や fldigi などの外部プログラムを仮想オーディオケーブルで繋ぐ構成になる。それ自体は悪くないのだが、OS のバージョンが変わったり、ドライバの更新後にデバイスが見えなくなったりして、突然何も鳴らなくなることがある。あの面倒さを経験した人は多いと思う。

SDRoxide はその構造を採らない。各モードのモデムが Rust のネイティブコードとしてプロセス内で動く。仮想オーディオケーブルも不要、外部デコーダも不要。FT8 を受信したければ、ソフトを起動してバンドを合わせるだけで済む。

## ブラウザから操作できる

もう一つ面白いのは UI の出し方だ。ネイティブバイナリとして動かすほかに、WebAssembly としてサーバーモードで立ち上げることができる。同じ UI をブラウザからアクセスできるので、ローカルの Linux マシンに SDRoxide を立てておいて、スマートフォンのブラウザで操作する使い方が普通にできる。これはリモート受信局を運用する場面でも有用だと思う。

## なぜ Rust で書くのか

パフォーマンス面もあるが、それより「バッファ管理のミスをコンパイル時に検出できる」という点が大きいんじゃないかと思う。SDR のリアルタイム処理はサンプルバッファを複数スレッドで回す構造になりやすく、少しのミスでクラッシュや再現性のない挙動が出やすい。C/C++ で書かれた長年のコードベースはそういうバグが積み重なりやすい。Rust の所有権モデルはその問題を構造的に回避するための仕組みだ。

## 現状

現時点では v0.5.0、Windows と Mac のテスターを募集中とのこと。まだ開発途上で、TCI サーバーモードや追加デジタルモードも予定に挙がっている。

「全モードが一つのバイナリに収まっていて、ブラウザからも使える」という方向性は面白い。SDR ソフトの依存関係管理が長年の悩みどころだったことを考えると、Rust 製の単一バイナリアプローチには実用的な理由がある。長く続くプロジェクトになるかもしれない。

— ランキン

## 出典

**一次情報（公式・著者報告）**
- SDRoxide GitHub リポジトリ: github.com/dividebysandwich/sdroxide
- SDRoxide 公式サイト: sdroxide.com
- SDRoxide ユーザーマニュアル: github.com/dividebysandwich/sdroxide/blob/main/docs/USER_MANUAL.md

**第三者報道**
- RTL-SDR.com, "SDROxide: A New SDR Client for HAMs and SWLs written in Rust"
- SDRoxide — Universal SDR transceiver, forged in Rust (Ham Radio Daily / scoop.it, 2026-08-13)

※ 機能一覧・バージョン情報は著者（dividebysandwich）の報告値に基づく。独立した検証はこれから。
