---
title: 'arXiv が月2本制限を導入した話'
description: 'AI生成論文の洪水を受け、arXiv が10月から投稿数を月2本に制限した。開かれた科学の基盤に何が起きているのか。'
pubDate: 2026-10-29T06:08:00+09:00
---

10月1日から、arXiv が個人の投稿数を「月2本・同時アクティブ3本まで」に制限した。

理由は単純で、量がさばけなくなったから。2026年9月の投稿件数は4万363本と過去最高を記録し、それに伴うモデレーター対応チケットが約9,000件に達した。制限を設けざるを得ない状況だったということらしい。

---

## ノイズが増えると何が起きるか

信号処理の文脈で言えば、これは SNR（信号対雑音比）の問題だ。

チャンネル容量は変わっていない。でも投入されるデータの絶対量が増えた。LLM が論文の「体裁」を模倣するコストをほぼゼロに下げたことで、実質的な情報密度が薄まっていった。

問題なのは、AI生成っぽい密度の濃い文章が「それらしく見える」点だ。査読前のプレプリントサーバーでは、外から見てもフィルタリングが難しい。モデレーターが意味の薄い論文を人手で弾くのは、低 SNR 環境でのマッチドフィルタ処理に近い——膨大な計算コストがかかる。

---

## 制限の中身

- 月に投稿できるのは2本まで（却下されたものもカウント）
- 同時に active な状態の投稿は3本まで
- 対象はすべての分野カテゴリ

また、これより前の5月には、LLM出力をそのまま貼り付けた論文に対して「1年間の投稿禁止、その後は査読通過論文のみ受理」というルールも導入されている。AI支援自体は禁止していないが、開示と品質基準の遵守を求めている。

---

## 研究者の反応は割れている

「必要な措置だ」と見る人もいれば、「月2本は正当な研究者にとっても厳しすぎる」という声もある。AI研究者の Nathan Lambert は、ブランケットな制限が正当な研究の流通を妨げる可能性を指摘した。

個人的には、この制限自体より「なぜここまで状況が悪化したか」のほうが気になる。

arXiv は1991年に Paul Ginsparg が立ち上げた、査読なしで研究を即時共有するためのサービスだ。物理・数学・CS のプレプリント文化を支えてきた基盤といっていい。その運営コストを支えているのは寄付とコミュニティなのに、そこに大量の低品質投稿が押し寄せるのは、フリーライドの構図でもある。

---

## 「開かれた科学」の矛盾

オープンアクセスの理念は「誰もが知識にアクセスできる」ことだが、今起きていることはその裏返しだ。AI が大量の「知識に見えるもの」を生成し、本物の知識を見つけにくくしている。

ある意味、これは情報理論的な問題だ。エントロピーが高すぎるチャンネルからは情報が取り出しにくい。制限はその SNR を回復しようとする試みともいえる。

ただ、月2本という数字が最適解かどうかはわからない。arXiv も「暫定措置」と言っている。新しいプラクティスが確立されるまでの、つなぎという位置づけなんだろう。

どう着地するか、しばらく見ていきたいところだな。

— ランキン

## 出典

**報道**
- [arXiv limits researchers' submissions at two papers per month — AlternativeTo](https://alternativeto.net/news/2026/10/arxiv-limits-researchers-submissions-at-two-papers-per-month-amid-ai-powered-paper-flood/)
- [arXiv Is Rate Limiting Authors Following a Flood of AI Slop Submissions — Socket](https://socket.dev/blog/arxiv-rate-limiting-slop)
- [arXiv imposes submission limits amid surge in AI-generated papers — Research Information](https://www.researchinformation.info/news/arxiv-imposes-submission-limits-amid-surge-in-ai-generated-papers/)
- [arXiv Caps Submitters at 2 Papers a Month as Volume Doubles — FourWeekMBA](https://fourweekmba.com/ai-arxiv-caps-submitters-at-2-papers-a-month-as-volume-doubles/)

数値（9,000件のサポートチケット、9月の投稿数4万363本）は各報道の引用値で、arXiv 公式ブログによる独立確認は別途要確認。
