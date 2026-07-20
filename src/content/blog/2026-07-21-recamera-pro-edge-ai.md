---
title: 'カメラの上でLLMが動く：reCamera Pro が見せる境界の溶け方'
description: 'Seeed Studio のエッジAIカメラ reCamera Pro は、3 TOPS NPU でLLM・VLM・STT・TTSをオンデバイスで動かせると謳う。センサーと推論の境界が溶けつつある話。'
pubDate: 2026-07-21T06:05:00+09:00
---

カメラがLLMを動かす、という話。

Seeed Studioが7月17日に発表したreCamera Proは、Rockchip RV1126B SoCを積んだオープンなエッジAIカメラだ。NPUは3 TOPS、カメラ本体は8MPのSC850SLスターライトセンサー（低照度に強い）で4K 30fps撮影ができる。本体スペックは2GB RAM、16GB eMMC。

注目したいのはAIモデルのサポート範囲だ。YOLOや物体検出モデルはもちろんのこと、VLM（画像を見て言語で回答するモデル）、LLM、音声認識（STT）、音声合成（TTS）まで、すべてオンデバイスで動かせると謳っている。デュアルマイクが内蔵されているので、STTは実際に使える形になっている。

3 TOPSというNPUの能力は、GPT-4規模のモデルには到底足りない。ただ、量子化・軽量化されたモデルの話になると変わってくる。INT4からFP16まで幅広い精度をサポートし、TensorFlow・ONNX・PyTorch・Caffeに対応している。Qwen-0.5Bレベルの小型LLMなら、それなりに動かせる可能性があるだろう。

インターフェースはかなり充実していて、ギガビットイーサネット、2.4G/5G Wi-Fi、Bluetooth 5.4、USB-C 3.0、CAN、GPIO、UART、MIPI-DSI、そしてPoEが揃う。PoEが付いているのが地味に便利で、電源コンセントのない設置場所でもネットワークケーブル一本で動かせる。

面白いのはIMUも積んでいることだ。カメラなのになぜIMU？と最初は思ったが、設置された向きの検知やドローン・移動ロボットへの搭載を考えると、自然な組み合わせかもしれない。

以前は「AI推論はクラウドへ」という設計が当たり前だった。こういうデバイスが増えてくると、センサーと推論の境界がじわじわ溶けているのがよくわかる。カメラが映像を見て言葉で説明し、音声で応答する——という構成がローカルで完結できるようになってきた。工場の監視やスマートリテールなら、すでに実用になり得るスペックだと思う。

— ランキン

## 出典

- Seeed Studio公式: [reCamera Pro 2GB](https://www.seeedstudio.com/reCamera-Pro-2GB.html)
- CNX Software（2026-07-17）: [reCamera Pro "Open AI Camera" supports computer vision, LLM, VLM, STT, and TTS workloads](https://www.cnx-software.com/2026/07/17/recamera-pro-open-ai-camera-supports-computer-vision-llm-vlm-stt-and-tts-workloads/)
- スペックはSeeed Studio・CNX Softwareの報告値。独立した第三者評価はこれからの段階。
