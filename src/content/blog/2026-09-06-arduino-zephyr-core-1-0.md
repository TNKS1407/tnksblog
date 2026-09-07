---
title: "Arduino Core on Zephyr 1.0 — Mbed亡き後の着地点"
description: "ArmがMbed OSを捨てた後、ArduinoはZephyr RTOSへの移行を進めてきた。9月3日にCore 1.0.0が出た。その意味を整理してみる。"
pubDate: 2026-09-06T09:00:00+09:00
---

先週、ArduinoがZephyr RTOSベースのコアを1.0.0としてリリースした。

少し経緯から整理する。ArduinoのPortentaシリーズやNano 33 BLEといった上位ボードは、かつてArm Mbed OSを下敷きにしていた。マルチスレッドやネットワークスタックを提供するRTOSとして機能していたわけだけど、Armは2022年にMbed OSのメンテナンス終了を宣言した。ArduinoはしばらくMbedを使い続けながら、次の基盤を探していた。

その着地点がZephyr RTOSだった。Arduinoは移行を2024年7月に発表し、同年末に最初のベータを出して、地道にブラッシュアップを続けてきた。今回の1.0.0はその到達点のひとつだと言えるかな。

Zephyrは何が違うのか。Linuxカーネルの構造に着想を得たRTOSで、Linux Foundationのプロジェクトだ。デバイスツリーでハードウェアを記述するし、プリエンプティブなスケジューラ、メモリ保護、電力管理のフレームワークが最初から組み込まれている。nRFのSDKやIntelの対応が示すように、産業界での実績もある。

MbedはArm主導の設計でそれなりにまとまっていたけど、保守が止まれば話にならない。Zephyrはコミュニティが活発で、上流にパッチを送れる構造になっている。長期的な信頼性という点ではずっとマシだと思う。

ユーザー視点では、Arduino APIは変わらない。`setup()` と `loop()` はそのまま書けるし、ライブラリも基本的に使える。ただし、裏でZephyrのスレッドが動くようになったことで、非同期処理やリアルタイム性に関する挙動が変わっている部分もある。既存コードがそのまま動くとは限らないから、移行する場合は注意が要るだろう。

今回の1.0.0で対応するボードは11種。UNO Q、Portenta H7、GIGA R1 WiFi、Nano Matter、Nano 33 BLEなど主要な上位ボードはおおむね揃っている。Zephyr 4.4.1ベースへの更新、Nicla VisionのカメラサポートとVENTUNO Qの追加が主な変更点だ。

Mbed後の空白期間が数年あったことを考えると、よくここまで漕ぎ着けたと思う。Arduinoのエコシステムの下の地盤が、これで少し固まった気がするな。

— ランキン

## 出典

- Arduino公式ブログ: "Arduino Core on Zephyr 1.0.0 is here!" (2026-09-03)  
  https://blog.arduino.cc/2026/09/03/arduino-core-on-zephyr-1-0-0-is-here/
- CNX Software: "ArduinoCore-Zephyr 1.0.0 adds support for Arduino VENTUNO Q, updates to Zephyr 4.4.1, and more" (2026-09-04)  
  https://www.cnx-software.com/2026/09/04/arduinocore-zephyr-1-0-0-adds-support-for-arduino-ventuno-q-updates-to-zephyr-4-4-1-and-more/
- Hackster.io: "Arduino's Long Move Away From Arm's MbedOS Culminates in the Zephyr RTOS Core's 1.0.0 Release"  
  https://www.hackster.io/news/arduino-s-long-move-away-from-arm-s-mbedos-culminates-in-the-zephyr-rtos-core-s-1-0-0-release-b5d86394993b

著者・企業の報告値に基づく情報を含む。独立した検証はこれから行われる段階のものもある。
