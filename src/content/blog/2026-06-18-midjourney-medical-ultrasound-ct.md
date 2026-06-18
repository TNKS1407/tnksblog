---
title: '音と水で体の断面を見る — Midjourney Medical の超音波CT構想'
description: 'Midjourneyが新部門 Midjourney Medical を発表。約35万8,000個のトランスデューサで全身を水中スキャンし、放射線なしで3D断層画像を得る装置を開発中だという。信号処理の観点からこの仕組みを整理してみた。'
pubDate: 2026-06-18T06:00:00+09:00
---

Midjourney といえば画像生成AIの会社というイメージが大半だと思う。その会社が本日、新部門 **Midjourney Medical** を立ち上げ、全身超音波CTスキャナを開発すると発表した。放射線なし、1分スキャン、1回数ドル──という数字が並んでいるが、今日はその「仕組み」の部分を少し掘り下げてみたい。

## 構成の概要

装置は水槽に体を沈め、直径70cmのリングで取り囲む構造らしい。リングには Butterfly Network の半導体チップを使ったトランスデューサが並んでいて、1チップあたり8,960素子、40モジュールで合計約35万8,000素子になる。各素子が音波を送信し、全素子からのエコーを同時に記録する。

X線CTとの比較でいうと、X線は直進する（投影＝シャドウ）のに対し、超音波は反射・屈折・散乱をすべて含む。情報量は豊かな反面、逆問題がずっと複雑になる。

## 17 GB/s のデータと逆問題

35万素子のエコーをリアルタイム収録すると、毎秒17GBのデータが生まれるという。このデータから体内の3次元像を作るのが逆問題の求解で、「観測された音波分布から、どんな内部構造があるとこの結果が説明できるか」を解くことになる。

X線CTなら Radon 変換の逆変換（FBPなど）が使える。超音波の場合はもう少し難しくて、組織ごとに音速が異なるため、波の伝播経路自体が曲がってしまう。反射成分だけでなく透過成分も使う **フルウェーブ反転（Full-Waveform Inversion）** や、音速マップと減衰マップを同時に推定する手法が候補になる。探査地震学や地球物理学で積み上げてきた手法が、医用イメージングに流れ込んできた形だ。

## RFフェーズドアレイとの類比

35万素子を全方向に配置して照射・受信するというのは、信号処理の観点では大規模な **フェーズドアレイ** に近い。RFのフェーズドアレイと同じ発想──各素子の遅延を制御して任意の方向にビームを向ける──を音響に適用している。

生体組織中の音速は1,480〜1,560 m/s 程度で、数MHz帯を使えば波長は〜0.3mm。35万素子あれば空間分解能は相当高くなる計算だ。ただしRFのビームフォーミングと違って、媒質の音速が場所によって変化する点が厄介なんだよ。その変化を推定しながら同時に像を作る、という鶏と卵の問題がある。

## 現時点の現実

目標は1分スキャンだが、現在のプロトタイプは約20分かかるという。逆問題の反復解法はGPUクラスタを使っても重い。ここが詰まらないと、スパで数ドルというビジネスモデルは成立しないだろう。

2027年末にサンフランシスコへ最初の "Midjourney Spa" を開く計画とのこと。実現するかどうかは、この逆問題をどれだけ速く解けるかにかかっている気がする。そしてそこには、地震波解析やRFイメージングが何十年もかけて積み上げてきた数学が、静かに使われることになるんだろうな。

— ランキン

## 出典

**一次情報・発表報道**

- Shacknews（2026-06-18）— [Midjourney Scanner is a new medical diagnostic device from the AI image generation company](https://www.shacknews.com/article/149705/midjourney-medical-is-a-new-division-from-midjourney)
- TechTimes（2026-06-18）— [Midjourney Full-Body Ultrasound Scanner Targets MRI Speed, But Prototype Runs 20 Minutes](https://www.techtimes.com/articles/318628/20260618/midjourney-full-body-ultrasound-scanner-targets-mri-speed-prototype-runs-20-minutes.htm)

**第三者解説**

- explainx.ai — [Midjourney Medical: Full-Body Ultrasonic Scanner, 60 Seconds, SF Spa 2027](https://explainx.ai/blog/midjourney-medical-full-body-scanner-spa-2026)
- felloai.com — [Midjourney Scanner: AI Firm's Full-Body CT Device](https://felloai.com/midjourney-scanner/)

※素子数・データレート・スキャン時間はMidjourney Medical の発表値および報道値であり、独立した第三者検証はこれから。
