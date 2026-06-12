---
title: '天井が空になる——RTL-SDRとADS-Bで作るリビング天文台'
description: '安価なSDRドングルで航空機の電波を受信し、短焦点プロジェクターで天井に投影する「Skylight」の話。ADS-Bという信号の仕組みから、なぜ誰でも受信できるかまで。'
pubDate: 2026-06-12T19:30:00+09:00
---

自分の部屋の天井に、今まさに頭上を飛んでいる航空機が映し出される。便名、高度、速度まで添えて。星座や月、ISSまで重なって。短焦点プロジェクターを上向きに置き、RTL-SDRドングルとRaspberry Pi 5をつなぐだけで。

これを実現したのが、[cpaczek]というエンジニアがGitHubに公開している **Skylight** だ。6月頭にHackadayやRTL-SDR Blogで話題になっていたので、紹介したい。

## ADS-Bって何だ

ADS-B（Automatic Dependent Surveillance-Broadcast）は、民間航空機が **1090 MHz** で位置情報をブロードキャストし続ける方式だ。「Dependent」はGPS測位に依存している意味で、「Broadcast」は文字通り垂れ流し——問い合わせなしで周期的に送る。

信号の中身は短いパルス列だ。PPM（パルス位置変調）で56 bitまたは112 bitのメッセージを乗せる。機体識別子（ICAO 24ビットアドレス）、緯度・経度・高度・速度・飛行方向などが含まれる。航空管制がレーダー補完として使うために規格化されたものだが、暗号化もなく、誰でも受信して解読できる形で流れている。

## RTL-SDRで受信できる理由

RTL-SDR（RTL2832Uチップのこと）はもともとDVB-Tテレビチューナー用ICだ。ある時期に「このチップはI/Qサンプルを直接吸い出せる」と誰かが気づき、オープンソースドライバが書かれ、安価な広帯域SDRとして広まった経緯がある。v4は500 kHz〜1.75 GHzをカバーし、1090 MHzのADS-Bはその範囲に収まる。ドングル単体で数千円。

ADCのサンプリングレートは最大約3.2 MSps、ビット深度は8 bit I/Qと控えめだが、ADS-Bのビットレートは1 Mbps程度なので受信には十分だ。デコード側はMode S解析ソフト（dump1090など）が成熟していて、実用上の差は受信感度とアンテナの設計に出る。

## Skylightのしくみ

Skylightはデコード済みのADS-Bデータを受け取り、各機の位置を天頂からの方位・仰角に変換して、プロジェクターのスクリーン座標に射影する。天頂を中心にした正距方位図法的なマッピングだ。

航空機の位置だけでなく、外部APIから太陽・月・星・星座・ISS軌道のデータも取り込んでオーバーレイできる。「天井が空になる」というのはそういうことで、昼間でも夜でも使える。

ハード構成はRaspberry Pi 5 + RTL-SDR v4 + 短焦点プロジェクター（天井向き固定）。プロジェクターの焦点距離や投影サイズをキャリブレーションするパラメータがあり、壁掛けでも棚置きでも対応できる。

## 信号処理の出口として

ADS-Bは実験対象として面白い、と思っている。信号が単純（PPM変調、規格公開）なのでデコーダを自分で書ける。受信距離がアンテナ設計と感度にもろに依存するから、コリニアアンテナとホイップアンテナで比べる、地上高を変える、同軸の損失を測る——こういう実験のフィードバックが「何機見えるか」という直感的な指標で返ってくる。

信号処理の実験は「正しく動いているかどうかわかりにくい」ことが多い。ADS-Bは地図や天井に飛行機が見えたかどうかで結果が出る。Skylightはその出口をさらに面白くした、というふうに見ている。手元にRTL-SDRがあるなら、試してみる価値はあるかもしれない。

— ランキン

## 出典

**一次情報**
- [cpaczek, *skylight* — GitHub](https://github.com/cpaczek/skylight)

**報道・解説**
- [Hackaday: "Make Your Ceiling Disappear With ADS-B And Short-Throw Projector"（2026-06-04）](https://hackaday.com/2026/06/04/make-your-ceiling-disappear-with-ads-b-and-short-throw-projector/)
- [RTL-SDR Blog: "SkyLight Ceiling: Projecting Live ADS-B Aircraft Positions Onto your Ceiling"](https://www.rtl-sdr.com/skylight-ceiling-projecting-live-ads-b-aircraft-positions-onto-your-ceiling/)
- [Tom's Hardware: "Aviation enthusiast uses Raspberry Pi and ADS-B radio to create viral real-time airport tracker"](https://www.tomshardware.com/raspberry-pi/aviation-enthusiast-uses-raspberry-pi-and-abs-b-radio-to-create-viral-real-time-airport-tracker-open-source-skylight-intercepts-aircraft-signals-and-projects-flight-paths-onto-your-ceiling)

Skylightの機能・構成は上記報道とGitHubリポジトリに基づく。仕様は開発中のため変わりうる。ADS-B信号の規格の一般論はICAO Doc 9684等に基づく整理。
