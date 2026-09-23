---
title: 'フィルムカメラにデジタルを宿す：Sitina B220M と CCD 読み出しの話'
description: '中判フィルムカメラ Mamiya Super 23 に Kodak 2200万画素 CCD を載せたオープンソースデジタルバック、Sitina B220M。CCD の読み出し信号処理と FPGA による精密タイミング制御が面白い。'
pubDate: 2026-09-23T07:00:00+09:00
---

「デジタルバック」というものがある。フィルムカメラの後部——フィルムが収まる部分——にセンサーユニットを差し込む改造のことだ。光学系はそのままで、フィルムの代わりにセンサーが光を受ける。プロ用の中判システムでは昔からある概念で、Hasselblad や Phase One が業務用として作ってきた。

Wenting Zhang という制作者が、Mamiya Super 23 向けにオープンソースのデジタルバック「Sitina B220M」を作った。センサーは Kodak KAF-22000CE、2200万画素、38.8mm×50mm という大きさ。120フィルムの画面（大きい辺が56mmほど）とほぼ同じスケールだ。処理系は Xilinx Zynq 7010 ── Cortex-A9 コアと FPGA が同居した SoC で、カメラの読み出し制御と画像処理を担う。

## CCD はなぜ FPGA と組み合わせやすいか

CCD と CMOS では、センサーから電荷を取り出す仕組みが根本的に違う。CMOS は各ピクセルに増幅器があって、それぞれが独立に読める。CCD は電荷を「バケツリレー」でチップの端まで運んで、最終段の出力アンプで読む。

このバケツリレーには、複数相のクロックシーケンスを精密なタイミングで与える必要がある。垂直転送（行ごとに電荷を移す）、水平転送（列方向に流す）、リセット ── それぞれがナノ秒単位で制御される。タイミングがずれると、固定パターンノイズや縦スジが画像に現れる。

読み出しにはもう一工夫がある。相関二重サンプリング（CDS: Correlated Double Sampling）だ。CCD の出力アンプはリセットのたびに微妙に異なる熱雑音（kTC ノイズ）を持つ。リセット直後の電圧 $V_\text{reset}$ と、電荷転送後の電圧 $V_\text{signal}$ の差を取る。

$$V_\text{out} = V_\text{signal} - V_\text{reset}$$

こうすることで kTC ノイズがキャンセルされ、低ノイズ読み出しが実現する。これはアナログフロントエンドで行われるが、タイミング制御は FPGA が担う。確定的なクロック制御が得意な FPGA と CCD の相性が良い理由がここにある。

## なぜ CCD か

KAF-22000CE は Kodak が天文・科学計測向けに作ったチップで、大型センサーとしての均一性と充填率（fill factor）が高い。コンシューマー向けでは CMOS が圧倒しているが、大判・高精度の用途ではまだ CCD の優位がある場面がある。天文カメラが今も CCD を使う理由の一つはそこだ。

## オープンソースの意義

設計ファイルはすべて公開されている。回路図、ファームウェア、基板データ。昔の中判光学系を持っている人が電子側を自作できる環境が、少しずつ整ってきている。Wenting Zhang は以前にも完全オープンソースの FPGA カメラ「Sitina 1」を作っていて、今回はそれの「バックだけ版」という位置づけだ。

ガラスの光学部品を活かして電子部分だけ現代化する、というアプローチは、修理・再利用の観点でも理にかなっていると思う。古い光学系の解像力は今でも侮れないし、センサーとレンズを組み合わせる方法がオープンになっていれば、やれることの幅が広がるんだよ。

— ランキン

## 出典

- [Digital Upgrade Brings Medium Format Camera Into The 21st Century – Hackaday (2026-09-22)](https://hackaday.com/2026/09/22/digital-upgrade-brings-medium-format-camera-into-the-21st-century/)（制作者の公開情報にもとづく報告で、独立した検証はこれから）
- [Wenting Zhang's Sitina 1 Is a Fully Open Source FPGA-Powered Full-Frame Mirrorless Digital Camera – Hackster.io](https://www.hackster.io/news/wenting-zhang-s-sitina-1-is-a-fully-open-source-fpga-powered-full-frame-mirrorless-digital-camera-eeb144a99008)
