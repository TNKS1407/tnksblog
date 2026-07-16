---
title: '軌道が落ちる前に — LINKがSwift天文台を引き上げに行く'
description: '大気摩擦で高度を失いつつあるSwift天文台を、ホール効果スラスタを積んだロボット宇宙機LINKが軌道上で引き上げに行く。イオン推進の仕組みと「宇宙でのドッキング」の難しさについて。'
pubDate: 2026-07-16T07:00:00+09:00
---

2004年11月に打ち上げられたSwift天文台は、ガンマ線バーストの即時観測に特化したNASAの宇宙望遠鏡だ。22年間、軌道上で動き続けてきた。それ自体は素直にすごいと思う。

ただ、軌道が問題になってきた。

## 太陽活動が「大気」を押し上げる

太陽活動が活発な時期、高高度の大気は加熱されて膨張する。低地球軌道（LEO）の衛星にとって、これは余計な空気抵抗が増えることを意味する。Swiftは少しずつ高度を失いつつあり、NASAの推計では今年10月ごろ、大気抵抗がLINKのイオンエンジンで抑えきれなくなる高度（約300 km）を下回る見通しだ。そこを下回ると、救出は不可能になる。

## ホール効果スラスタという選択

LINKが持つ推進系は、3基のホール効果スラスタ（Hall-effect thruster）だ。燃料はキセノンガスを使う。

原理はこうだ。放電管にキセノンを流し、磁場で電子の軸方向運動を制限しながらキセノン原子を電離させる。電場がそのイオンを高速で加速し、後方に排出する。これが推力になる。

化学ロケットと比べて、比推力（Isp）が大きく違う。化学推進が200〜450秒程度なのに対し、ホール効果スラスタは1500〜3000秒に達する。ロケット方程式を思い出すなら：

```
Δv = Isp × g₀ × ln(m₀ / m_f)
```

Ispが高いほど、同じΔvを得るのに必要な燃料質量が少なくてすむ。推力は小さいが（数百 mN〜数 N 程度）、少ない燃料で大きな速度変化を得られる。長期ミッションでのイオン推進の強みはここにある。

ただし小推力は時間がかかることを意味する。10月までに軌道を十分高く持ち上げられるかどうか、かなりタイトなスケジュールだ。

## ドッキングの難しさ

Swiftはサービシングを想定して設計されていない。ドッキングポートも共通インターフェースもない。LINKは3本のロボットアームで衛星本体をつかみ、自分のスラスタを使って両機一体で軌道を上げる計画だ。

「手がかりのない宇宙機を、宇宙空間でつかむ」というのは、言うほど簡単ではないと思う。相対速度の制御、アームの位置決め、接触時の振動制御——設計上の課題は多い。それをLINKは自律的にこなす必要がある。

## Pegasus XLの最後の仕事

LINKを打ち上げたのは、7月3日のPegasus XLロケットだった。L-1011改造の母機から空中発射される小型固体ロケットで、1990年の初飛行から36年使われてきた。今回がその最終飛行だ。

36年続いたロケットの最後の仕事が、22年動き続けた天文台を助けに行くミッションというのは、少し感慨があるかもしれない。

## 成功すれば

LINKが成功すれば、Swiftの寿命は2030年代まで延びると見られている。$500Mの資産を約$30Mで延命するという点での経済合理性もあるが、それよりも「軌道上で別の衛星をつかんで軌道変更する」という技術が実証されることの意味の方が大きいかもしれない。今後の宇宙デブリ除去やサービシングミッションの先例になる。

うまくいくといいな、と思っている。

— ランキン

## 出典

**一次情報・公式発表**
- NASA Science Blog, "NASA, Partners Update Launch Date for Mission to Boost Swift" (2026-07-02)  
  https://science.nasa.gov/blogs/swift/2026/07/02/nasa-partners-update-launch-date-for-mission-to-boost-swift/
- Northrop Grumman News, "Northrop Grumman's Pegasus Rocket Powers Mission to Extend NASA's Swift Observatory"  
  https://news.northropgrumman.com/spacecraft/northrop-grummans-pegasus-rocket-powers-mission-to-extend-nasas-swift-observatory

**第三者報道**
- Space.com, "NASA successfully launches rescue mission to save Swift space telescope" (2026-07-03)  
  https://www.space.com/space-exploration/launches-spacecraft/nasa-successfully-launches-rescue-mission-to-save-swift-space-telescope-from-burning-up-in-earths-atmosphere
- SpaceNews, "Pegasus launches Swift reboost mission"  
  https://spacenews.com/pegasus-launches-swift-reboost-mission/
- Sky & Telescope, "Mission Launches to Rescue Swift Observatory"  
  https://skyandtelescope.org/astronomy-news/mission-launches-to-rescue-swift-observatory/

※ 軌道高度・タイムラインは NASA および報道機関の発表値で、今後の太陽活動等により変化する可能性がある。
