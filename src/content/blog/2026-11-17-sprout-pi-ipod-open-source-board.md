---
title: 'Sprout Pi ── 古いiPodをオープンソース基板で蘇らせる'
description: 'London発のプロジェクトSproutが、iPodのシェル・スクリーン・クリックホイールをそのまま生かして中身だけ丸ごと入れ替えるオープンソース基板を開発している。RP2350かRaspberry Pi CMZeroを搭載し、Wi-Fi・Bluetooth・USB-C・最大2TBストレージを追加できる。'
pubDate: 2026-11-17T07:00:00+09:00
---

iPodが終売になってから何年も経つのに、あの円いクリックホイールをまだ使いたい人間が一定数いる。私もその一人だと思う。操作のフィードバックというか、あの触感は今のスマートフォンにはないものがある。

London の Certain Things というスタジオが作っている **Sprout** は、そういう人に向けたオープンソースの交換基板プロジェクトだ。

## 何をするものか

iPod mini（1・2世代）、iPod 3G・4G のシェル、スクリーン、クリックホイールをそのまま流用して、中の基板だけを Sprout に入れ替える。はんだ付けは不要で、コネクタを差し替えるだけらしい。外から見ればiPodがそのまま動いているように見えて、中身は現代のマイコンになっている、という構成だ。

バリアントは二種類ある：

- **Sprout Pico**：RP2350 ベース。ローカルに保存した音楽やポッドキャストを再生できる。シンプルで消費電力も低い。
- **Sprout Pi**：Raspberry Pi Compute Module Zero を追加搭載。Spotify・Apple Music のストリーミングや、カスタムアプリの実行が可能になる。

どちらも Wi-Fi・Bluetooth・USB-C を搭載し、ストレージは最大 2TB まで拡張できる。DAC もハイファイ対応のものが使われているようだ。

## オープンソースとしての設計

ハードウェアは CERN-OHL-S v2 で公開されている。回路図・基板レイアウト・BOM がすべて手に入る。ファームウェアは MPL-2.0、ドキュメントは CC BY 4.0 だ。

こういうプロジェクトが好きな理由の一つは、メーカーが製品を終了させても、ユーザーが修理・改造できる状態が維持されるからだと思う。iPodに限らず、特定の筐体やUIに思い入れのある人間が自分でメンテできる、というのは本来あるべき姿に近い気がする。

RP2350（Pico 2 のマイコン）が使われているのも興味深い。Cortex-M33 デュアルコアでクロックは最大 150 MHz、RISC-V コアとの切り替えも面白い特徴だ。音楽プレーヤー程度のUIと再生処理なら十分すぎる性能だろう。Pi バリアントで CM Zero を乗せることで Linux が動き、ストリーミングサービスのクライアントが動かせるようになる。二つの異なるアーキテクチャで機能を分けている設計はなかなか合理的だなと思う。

## 現状

CrowdSupply でプレオーダーが始まっているらしいが、まだ開発中の部分もある。Pi バリアントで対応する iPod の世代については情報源によって記述が揺れていて（3G・4G のみという情報と、mini も含むという情報がある）、実際に手元で確認するまでは断定できないかな。

技術的に面白いプロジェクトなのは確かなので、続報を追っていきたい。

— ランキン

## 出典

- Certain Things 公式 — [certainthings.studio/sprout](https://certainthings.studio/sprout/)（著者・企業の報告値）
- OMG! Ubuntu 2026-11-xx — [Sprout Pi lets old iPods run Linux apps and stream Spotify](https://www.omgubuntu.co.uk/2026/11/sprout-upgrades-ipod-modern-features)
- Hackster.io — [Give Your Old iPod Bluetooth, Wi-Fi, USB-C, and 2 TB of Storage](https://www.hackster.io/news/give-your-old-ipod-bluetooth-wi-fi-usb-c-and-2-tb-of-storage-7f7fb9deeb91)
- TechSpot — [A new mod brings Apple's classic iPods into 2026](https://www.techspot.com/news/114210-new-mod-brings-apple-classic-ipods-2026-bluetooth.html)

※ 仕様・互換性・発売時期は著者・プロジェクトの報告値であり、独立した検証はこれから。
