---
title: '15ユーロの電力計をクラウドから切り離す'
description: 'OBI Smart Energy TrackerをリバースエンジニアリングしてローカルMQTTSで動かす話。868MHz LoRa、ESP32-C3、TEA鍵。'
pubDate: 2026-07-18T09:00:00+09:00
---

ドイツのホームセンター OBI が販売している電力モニタリングキット、OBI Smart Energy Trackerの話をしたい。価格は15ユーロ。2つのデバイスがセットになっている。

1つは電力メーターに取り付けるリーダー。メーターの赤外線インターフェース（IR）を読んで電力使用量を取得する。もう1つはゲートウェイ。リーダーと868MHzのLoRAで通信し、そのデータをWi-Fi経由でOBIのクラウド（AWSのMQTTブローカー）に投げる。

安くて実用的だ。ただしクラウドに縛られている。

これをAaron Christophelが解放した。

## 中身

ゲートウェイの中にはESP32-C3が入っている。元のファームウェアはTLSつきのMQTTS（MQTT over TLS）でAWSエンドポイントに接続する設計だ。

リーダー側はCortex-M0+ベースのBAT32G135というMCU。光学IRでメーターと話し、868MHz帯のLoRaでゲートウェイにデータを飛ばす。LoRaはこういう屋内・短〜中距離の低ビットレート通信にはよく使われる選択肢だよ。消費電力が低く、壁を通過する能力もある程度ある。

## 鍵の取り出し方

面白いのは、ファームウェアを書き換えなくてもローカル化できる方法が存在する点だ。手順はだいたいこうなる。

1. ゲートウェイが保持している32ビットの **TEA鍵** を取り出す
2. 自前のPKI（証明書）を生成する
3. ローカルにMQTTSブローカーを立てる
4. 付属のPythonスクリプトで再プロビジョニングする

TEAはTiny Encryption Algorithmの略で、フェイステル構造を持つシンプルな暗号だ。実装が64行程度で書けるのでマイコンによく採用される。ただし現代的な暗号強度という観点では弱い部類に入る。とはいえここで問題なのは暗号の堅牢さではなく、その鍵をどう取り出すかのほうだ。

もう1つのアプローチとして、ESP32-C3向けのカスタムファームウェアも別途公開されている。こちらはゼロから書き直す方向で、より深くコントロールしたい人向けだろう。

## なぜローカル化が重要か

「クラウドに送らなくてもいい」というのは趣味の話だけじゃないと思う。€15の電力モニターがサービス終了したら、データもアクセス手段も一緒に消える。最初からローカルで完結する仕掛けを持っておくのが合理的じゃないか。

HomeAssistant向けのHACS統合も誰かがすでに作ってGitHubに公開している。接続さえできればそこで完結できるんだよ。

868MHz LoRaで屋内通信、ESP32-C3でゲートウェイを構成して、自前MQTTSブローカーに繋ぐ。個々の技術は特別でもないけど、15ユーロの既製品の中でそれらがちゃんと機能するように組み合わさっているのを見ると、解きたくなる気持ちになるのはわかる気がする。

— ランキン

## 出典

一次情報・プロジェクト：
- Aaron Christophel, ["Hacking the OBI Energy Tracker into your local MQTTS Server"](https://www.youtube.com/watch?v=2jMEaRuSJ18) (YouTube, 2026)
- [mla157/hacs-obienergytracker-integration](https://github.com/mla157/hacs-obienergytracker-integration) (GitHub)

第三者報道：
- ["Reverse Engineering And Self-Hosting The OBI Smart Energy Tracker"](https://hackaday.com/2026/07/07/reverse-engineering-and-self-hosting-the-obi-smart-energy-tracker/), Hackaday, 2026-07-07
