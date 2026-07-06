---
title: '1.44MBにGUIデスクトップを詰め込む──HamsterOSの設計'
description: 'フロッピー1枚に32ビットGUI OSを収めた HamsterOS。アセンブリ・協調マルチタスク・VM86といった設計の選択を読む。'
pubDate: 2026-07-06T21:03:45+09:00
---

フロッピーディスクに入る容量は 1.44 MB。今の感覚で言えば、小さめの JPEG 画像一枚分、くらいだ。

その 1.44 MB の中に、32 ビットの GUI デスクトップ OS が丸ごと収まっている。それが **HamsterOS** だ。

ウィンドウマネージャー、テキストエディタ（HamsterWrite）、電卓、画像ビューア、ファイルブラウザ、ゲーム、SoundBlaster オーディオドライバ、ハードディスクへのインストーラー、Device Manager、VM86 DOS ランタイム── 全部入りで、1.44 MB に収まる。

開発しているのは John Swiderski（Mean Hamster Software）。2026 年 11 月のリリースを予定している。

## どうやって収めているか

使う言語から選んでいる、というのが答えに近い。HamsterOS はほぼアセンブリで書かれている。C コンパイラが生成するコードより手書きアセンブリのほうが小さくなる余地がある場面では、今でもアセンブリが最適解だ。

ブートフローは、削ぎ落とした FreeDOS をベースに、HAMLOAD という独自カーネルローダーが 32 ビットの HamsterOS カーネルを起動する、という構成になっている。FreeDOS は初期化の足がかりとして使い、すぐに自前のカーネルに制御を移す。

マルチタスクに**協調型**（cooperative multitasking）を採用しているのも面白い選択だ。各プログラムが自発的に OS へ制御を返す方式で、現代標準のプリエンプティブ型とは逆の方向にある。一見古臭いが、低速なフロッピードライブと少ない RAM が前提の環境では、コンテキストスイッチのコストが低く抑えられる。DOS アプリとの互換性も上がる。プリエンプティブが「優れている」という前提を、要件ごとに疑い直す必要があるかもしれない。

## VM86 モードという選択

DOS アプリの実行に 80386 の VM86 モードを使っているのも、なかなかコアな設計だと思う。

VM86（Virtual 8086 Mode）は、386 が保護モードのまま 8086 互換の仮想環境を動かせるという、1985 年から存在するアーキテクチャ機能だ。Windows 95 がDOS ゲームを動かすために使っていた方法と基本は同じ。その機能を、小さな独自 OS の中で今でも使っている。

往年の DOS ゲームやツールをそのままフロッピーで動かせる、という実用性が目的だが、386 アーキテクチャの隅まで使い切る、という姿勢にも見える。

## 制約が先にある設計

1.44 MB という制限は恣意的ではない。ターゲットは 386/486 時代の実機で、そのハードウェアにはフロッピードライブが付いている。媒体に合わせた形で動く OS を作る、という目的が最初にあって、設計がそこから導かれている。

現代の OS が積み上げてきた「あって当然」のレイヤーを全部外して、何が最小限として必要かを問い直す作業だ。アセンブリ、協調型マルチタスク、VM86、削ぎ落とした FreeDOS── どれも「今どきでない」選択に見えるが、要件に照らすと、すべて理由がある。

TB クラスのストレージが当たり前の 2026 年に、1.44 MB のフロッピーに収まるデスクトップ OS、というのはある種のジョークみたいだ。でも作っている当人は、真剣に動かすために書いている。その真剣さが、ちょっと面白いと思う。

— ランキン

## 出典

- Hackaday: [HamsterOS Crams Complete Graphical Desktop Onto 1.44 MB Floppy](https://hackaday.com/2026/06/29/hamsteros-crams-complete-graphical-desktop-onto-1-44-mb-floppy/) (2026-06-29)
- Tom's Hardware: [HamsterOS jams a 32-bit GUI operating system in a single 1.44 MB floppy disk](https://www.tomshardware.com/video-games/retro-gaming/hamsteros-jams-a-32-bit-gui-operating-system-in-a-1-44-mb-single-floppy-for-386-era-hardware-retro-os-should-make-for-easy-living-with-dos-machines-and-software)
- Mean Hamster Software: [HamsterOS 公式サイト](https://meanhamster.com/products/hamsteros)

※ 機能・リリース予定はいずれも開発者・メディアの報告値。正式リリース前のため変更の可能性がある。
