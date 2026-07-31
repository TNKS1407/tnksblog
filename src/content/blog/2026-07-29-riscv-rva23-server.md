---
title: 'RISC-Vがサーバーへ踏み込んだ年 — RVA23とServer Platform Spec 1.0'
description: 'RISC-V Summit Europe 2026でRVA23シリコンが続々登場し、Server Platform Specification 1.0が承認された。オープンなISAがデータセンターへ本格参入する転換点を整理する。'
pubDate: 2026-07-29T07:00:00+09:00
---

ボローニャで開かれたRISC-V Summit Europe 2026で、アーキテクチャの生みの親のひとりKrste Asanovićが基調講演で言った言葉が印象に残った。「RISC-Vは避けられない」。決意表明でもなく、煽りでもなく、淡々と。

RISCというのはReduced Instruction Set Computer、削った命令セットの計算機、という意味だ。ひとつの命令で複雑な処理までこなすCISC（x86がその流れを汲む）に対して、単純な命令だけを揃えて、組み合わせ方はコンパイラに任せる。ハードが簡単になる分、速くも小さくも作りやすい。RISC-Vはその設計思想で作られた命令セットで、末尾のVはローマ数字の5。カリフォルニア大バークレー校で作られた5代目のRISCなんだ。

今年が「RVAシリコンの年」と呼ばれるようになった理由を少し整理しておきたい。

## RVA23とは何か

RISC-Vの「プロファイル」というのは、命令セットのどの拡張を実装するかを定めた仕様の束だ。RVA23（RISC-V Application 2023）は2024年に批准されたプロファイルで、たとえばこんなものが必須の側に置かれている。

- **ベクタ拡張 V**：一命令で配列をまとめて演算する。機械学習の行列積や、信号処理のフィルタがそのまま速くなる
- **ビット操作 Zba/Zbb/Zbs**：ビットを数える・立てる・抜き出すといった細かい操作。ハッシュ、圧縮、暗号まわりで効く
- **ハイパーバイザ拡張 H**：仮想化の支援。1台を複数のVMに切り分けるのがサーバーの日常なので、これが無いと土俵に上がれない
- **キャッシュ管理 Zicbom系**：キャッシュの掃き出しや無効化をソフトから明示的に指示する。DMAと噛み合わせる場面で要る

なぜわざわざ「束」にするのか。拡張を自由に足せるのがRISC-Vの強みだけど、裏を返すと、Aというチップにはベクタがあって、Bには無い、という状況が普通に起きる。それだとAでコンパイルしたバイナリがBで落ちる。UbuntuやDebianは、どのチップでも動く一本のバイナリを配りたいわけで、「RVA23を満たす」と言い切れる線が引かれて初めて、コンパイラは安心して最適化できるし、ディストリビュータは一種類だけビルドすればよくなる。Androidが端末ごとの断片化で苦労した話に少し似ている気がする。

ハードウェアの仕様だけがあってもソフトウェアが乗らなければ意味がない。それを埋めるのがServer Platform Specification 1.0で、UEFI、ACPI 6.6といった、x86やArmでは当たり前になっていたブートとランタイムのインターフェースをRISC-Vにも標準として定義した。

UEFIは、電源を入れてからOSが動き出すまでの手順と受け渡しの取り決めだ。昔のBIOSの後継にあたる。ディスクのどこにブートローダを置くか、ファームウェアはOSに何を差し出すか——そういう作法が共通だから、同じインストーラのUSBメモリが違うメーカーのマシンで動く。

ACPIのほうは、動き出したOSがハードの構成を知って制御するための取り決め。CPUが何個あってどう繋がっているか、割り込みがどこへ配線されているか、使わないコアをどの深さまで眠らせられるか。ファームウェアがテーブルの形で書き置いて、OSがそれを読む。

「どうしてそれをRISC-Vに定義したのか」がたぶん本題なんだ。ISAが同じでも、起動の作法やハードの見え方がベンダごとに違えば、OSはベンダごとに移植し直しになる。組み込みの世界ならデバイスツリーを添えてカーネルごとビルドし直すのが普通だけど、サーバーでそれは通らない。買ってきた箱に汎用のOSを入れたら動いてほしい。だから新しくきれいな仕組みを発明するのではなく、x86とArmで既に動いているファームウェアとOSの資産をそのまま連れてこられるように、わざと既存の仕組みへ寄せた。

オープンなISAは誰でも実装できるのが長所で、放っておくと分裂するのが短所だ。プロファイルもプラットフォーム仕様も、短所のほうに手当てをしている、と読むと筋が通ると思う。

## シリコンが届いてきた

今年登場した実際のチップを見ると、ようやく具体的になってきたと感じる。

SiFiveのPerformance P870Dは最大128コアを束ねたサーバーグレードのCPU。Epic SemiのContrail AIXは32個のRISC-VコアとAIコア16個を組み合わせ、75 TOPSを謳う。NextSiliconのArbel、Akeanaのテストチップも続いている。どれもまだ出荷直後や評価段階のものが多いだろうが、ラインナップ自体は確かに増えた。

Canonicalは最近リリースしたUbuntu 26.04 LTSでRVA23を正式サポートした。LTSということは標準で5年、Ubuntu Pro を付ければ10年以上のセキュリティ保証がつくわけで、エンタープライズがRISC-Vサーバーを評価しやすくなる足場ができた。

## なぜ面白いのか

x86はIntelとAMDの寡占で、ArmはISA仕様と高性能コアのライセンス費用が障壁になる。RISC-VはISA自体がロイヤリティフリーで、誰でも実装できる。この「主権的な技術スタック」という動機と組み合わさって、欧州では特に動きが速い。SUSEはスペインのOpenchipと組んで、欧州向けRISC-Vサーバーエコシステムの構築を進めている。

市場予測（2026年の13億ドルが2032年には49億ドル、CAGR 24%程度）は予測にすぎない。数字を眺めるより、こうなりそう・こうなると面白い、を並べるほうが私には楽しい。

入り口は、サーバーの主役CPUではなく脇のコアだろうと思っている。ストレージコントローラ、ネットワークカード、AIアクセラレータを管理する制御コア。載るソフトが限られていて自社で全部書ける場所ほど、命令セットを替える痛みが小さい。実際、SSDやGPUの中の見えないところではもう普通に動いている。表から入るのではなく、裏口から埋まっていく形。

律速になるのはハードよりソフトの成熟かもしれない。コンパイラの最適化、カーネルのドライバ、JITを積んだ言語処理系。ベンチマークの数字が、シリコンの実力ではなくコンパイラの若さを測ってしまっている場面は当面続く気がする。その差が縮んでいく速さのほうを、私は見ていたい。

技術以外の力も効く。ロイヤリティも輸出許可も要らないという性質が、性能表とは無関係なところで採用を決める場面は増えるかもしれない。選定理由が地政学で決まるのは面白いというより奇妙だけど、たぶんそうなる。

いちばん面白いのは、共通化と自由な拡張が両立したときだと思う。RVA23という共通の土台の上で普通のLinuxが動き、その上に自社のワークロードにだけ効くカスタム命令が積まれている状態。今は綱引きしているように見えるけれど、もし噛み合ったら、それはx86にもArmにもできないことだ。

ISAが仕様書として存在するだけでなく、そこにエコシステムが少しずつ積み上がっていく過程を見るのは、わりと面白いなと感じる。

— ランキン

## 出典

一次情報・公式発表：
- [RISC-V Summit Europe 2026（公式）](https://riscv-europe.org/summit/2026/)
- [RISC-V Profiles 仕様（riscv/riscv-profiles）](https://github.com/riscv/riscv-profiles)
- [RISC-V Server Platform 仕様（riscv-non-isa/riscv-server-platform）](https://github.com/riscv-non-isa/riscv-server-platform)
- [RISC-V Profiles — Why is RVA23 significant?（Canonical公式）](https://ubuntu.com/blog/risc-v-profiles-why-is-rva23-significant)
- [SUSE + Openchip MoU 発表（Evertiq）](https://evertiq.com/design/2026-07-08-suse-openchip-partner-to-develop-european-risc-v-hardware)

第三者報道：
- [RISC-V Is Inevitable, State of the Union Keynote Argues（EE Times）](https://www.eetimes.com/risc-v-is-inevitable-state-of-the-union-keynote-argues/)
- [RISC-V Summit Europe 2026 Highlights（IndexBox）](https://www.indexbox.io/blog/risc-v-summit-europe-2026-mature-architecture-targets-data-centers-edge-ai-and-space/)
- [Canonical Talks Up RISC-V With Ubuntu 26.04 LTS（Phoronix）](https://www.phoronix.com/news/Ubuntu-RISC-V-2026)
- [RISC-V Market Projected to Quadruple by 2032（GlobeNewswire）](https://www.globenewswire.com/news-release/2026/07/14/3326671/0/en/RISC-V-Market-Projected-to-Quadruple-by-2032-Driven-by-Open-Standard-Architectures.html)

各社のチップスペック・出荷状況は公称値・発表ベースで、独立した検証や査読はこれからのものが多い。後半の見通しは私の観測にすぎないので、そのつもりで読んでほしい。

