# ISOBUS（ISO 11783）最新動向調査レポート
## グローバルおよび日本における現状と展望（2026年2月時点）

---

## 1. ISOBUS規格の概要と最新バージョン

### 1.1 ISOBUS（ISO 11783）とは

ISOBUSは、農業・林業用のトラクターと作業機（インプルメント）間のシリアル制御・通信データネットワークに関する国際標準規格「ISO 11783」の通称である。SAE J1939プロトコル（CAN busベース）をベースに開発され、異なるメーカーの農機間でのプラグアンドプレイ通信を実現することを目的としている。

### 1.2 ISO 11783の14パート構成

| パート | 名称 | 最新版 | 概要 |
|--------|------|--------|------|
| Part 1 | General standard for mobile data communication | 2017年版 | 規格全体の概要 |
| Part 2 | Physical layer | 2019年版（改訂中） | CAN物理層、ISOBUSコネクタ仕様 |
| Part 3 | Data link layer | - | メッセージフォーマット |
| Part 4 | Network layer | - | ネットワーク相互接続ユニット |
| Part 5 | Network management | - | アドレスクレーミング等 |
| Part 6 | Virtual terminal | 2018年版 | オペレータインターフェース（VT） |
| Part 7 | Implement messages application layer | - | 作業機アプリケーションメッセージ |
| Part 8 | Powertrain messages | - | パワートレインメッセージ |
| Part 9 | Tractor ECU | - | トラクタECU、ゲートウェイ |
| Part 10 | Task controller and MIS data interchange | 改訂中 | タスク管理、処方箋適用、データロギング |
| Part 11 | Mobile data element dictionary | 継続更新中 | データ辞書（2026年1月29日版） |
| Part 12 | Diagnostics services | 2019年版 | 診断サービス |
| Part 13 | File server | - | ネットワークアクセス可能ストレージ |
| Part 14 | Sequence control | - | シーケンス制御 |

### 1.3 最新の改訂状況（2024-2026年）

- **Part 2（物理層）**: High-Speed ISOBUSへの対応を見据えた改訂が検討中
- **Part 10（タスクコントローラ）**: 新要件取り込みの改訂作業が進行中
- **サイバーセキュリティ**: AEFガイドライン040に基づくセキュリティテストが認証プロセスに必須化
- **UT Generation 3**: 2025年11月リリース。多言語Unicode対応、カスタマイズ可能なレイアウト、ドラッグアンドドロップインターフェース

---

## 2. ISOBUSの普及状況

### 2.1 グローバル市場規模

| 指標 | 数値 |
|------|------|
| 2024年市場規模 | 約22.8億〜28億米ドル |
| 2033年予測 | 約49億〜52億米ドル |
| CAGR（2025-2035） | 約7.1〜7.2% |
| ISOBUS電化市場（2024年） | 34億米ドル |
| ISOBUS電化市場（2033年予測） | 79億米ドル（CAGR 9.8%） |

### 2.2 地域別普及率

- **欧州**: 新規トラクターの約**65%**がISOBUS対応（最も高い普及率）
- **北米**: 新規トラクターの約**45%**がISOBUS対応
- **アジア太平洋**: 市場シェア25%超（第2位）、急速な農業機械化
- **新興市場**: ブラジルがEU持続可能性基準対応でISOBUS導入

### 2.3 認証製品・メーカー数

| 項目 | 数値 |
|------|------|
| 認証ECU数 | 1,280以上 |
| 製品タイプ数 | 755以上 |
| 製品モデル数 | 1,630以上 |
| 登録企業数 | 80社以上（認証製品保有） |
| AEF会員企業数 | 300社以上 |

---

## 3. AEF（Agricultural Industry Electronics Foundation）の動向

### 3.1 ISOBUSファンクショナリティ体系

| 略称 | 名称 | 概要 |
|------|------|------|
| **UT** | Universal Terminal | 1つのディスプレイで全ISOBUS作業機を操作 |
| **TC-BAS** | Task Controller Basic | タスクファイル受信、可変レート適用、データロギング |
| **TC-SC** | Task Controller Section Control | GPS位置に基づくセクション自動ON/OFF |
| **TC-GEO** | Task Controller Geo-based | 処方箋マップに基づく地理参照データ適用 |
| **AUX-N** | Auxiliary Control New | 外部ジョイスティック・ボタンへの機能割当 |
| **TECU** | Tractor ECU | トラクタデータのISOBUS提供 |
| **TIM** | Tractor Implement Management | 作業機からトラクタ機能の双方向制御 |
| **ISB** | ISOBUS Shortcut Button | 物理ボタンによる作業機機能の即時停止 |
| **TRACK** | （旧称TRAM） | トラムライン制御（2025年に名称変更） |

### 3.2 2025-2026年の主要活動

- 2025年1月: AEF Tech Week（ミュンヘン） - HSI、DCS、WIC、AgINの4プロジェクトに注力
- 2025年11月: Agritechnica 2025出展
- 2026年3月: AEF Spring Plugfest（ミルウォーキー）
- 2026年1月: スタートアップ企業の新規会員受付開始

---

## 4. TIM（Tractor Implement Management）

### 4.1 TIMの概要

TIMは、従来の一方向制御を双方向に拡張し、作業機がトラクタの機能（前進速度、リモートバルブ、PTO、ヒッチ高さ等）を自動制御できるようにする技術。

### 4.2 対応メーカー・製品

| メーカー | 対応状況 |
|----------|----------|
| **クボタ** | M7003 Premium KVT + BVシリーズで世界初のAEF TIM認証取得 |
| **DEUTZ-FAHR（SDF）** | トラクタメーカーとして初のTIM認証取得 |
| **b-plus** | コンセプト開発から量産までTIM統合を支援 |
| **CLAAS** | iMonitorによるISOBUS統合 |

---

## 5. 日本でのISOBUS普及状況

### 5.1 現状の概要

日本のISOBUS普及は欧米比で初期段階。2024年6月17日に日本初のAEF ISOBUSインフォメーションセミナーが東京で開催。

### 5.2 北海道・十勝の先進的取り組み

- 2018年7月: とかち財団が「ISOBUS普及推進会」を設立
- 北海道でISOBUS仕様のトラクター等の導入・開発が進行中

### 5.3 国内メーカーのISOBUS認証取得

**日本の農機メーカー4社が初めてISOBUS認証を取得**: ササキコーポレーション、タカキタ、東洋農機、ヤハタ（農研機構との共同研究成果）

### 5.4 主要国内メーカーの取り組み

**クボタ**
- ISOBUS認証を受け、トラクタ本体と他メーカー作業機の相互通信を推進
- Agri Roboトラクターの作業機はISOBUS準拠で設計

**ヤンマー**
- 可変施肥対応の側条施肥田植機でISOBUS/xarvio連携を先行実証
- JAとの協力体制による各地での実証展開

**井関農機**
- 2024年11月: 業界初の農機OpenAPI仕様の商業利用データ連携をAgrihubと開始

### 5.5 農林水産省の取り組み

- 令和3年2月: 「農業分野におけるオープンAPIの整備に関するガイドライン」策定
- 農機API共通化コンソーシアム設立（令和3年4月）
- WAGRIプラットフォーム: 約180 API、100機関超の有料会員

### 5.6 日本における普及の課題

1. **農地規模の問題**: 小規模経営が多く、高額なISOBUS対応機器の導入コストに見合わない
2. **国内独自規格との並存**: 農機OpenAPIとISOBUSの二重標準化
3. **技術者不足**: ISOBUS対応製品の開発・保守ができる技術者が限定的
4. **ローカライズの課題**: 水田、中山間地等の日本固有環境への適合が必要
5. **認知度の低さ**: 農業者のISOBUSに対する認知度が依然として低い

---

## 6. ISOBUS と 自動操舵の連携

### 6.1 セクションコントロール（TC-SC）

GPS位置に基づいてスプレーヤー、シーダー、施肥機のセクションを自動ON/OFF。資材のムダを**最大40%削減**。

### 6.2 可変施肥・可変散布（TC-GEO）

処方箋マップに基づく圃場内の地点ごとの施肥量・播種量の自動変動制御。

### 6.3 2025年の注目製品

- **CHCNAV NX612**: ISOBUS VT/TC-SC対応自動操舵システム
- **FJ Dynamics**: ISOBUSアップグレードキットで後付けセクションコントロール
- **AllyNav**: ISOBUS VT/TC-SC/TC-GEO対応統合ソリューション

---

## 7. 次世代ISOBUS技術

### 7.1 High-Speed ISOBUS（HSI）

- **基盤技術**: IEEE 1000BASE-T1（Single-Pair Ethernet、1 Gbit/s）
- **速度向上**: 従来比**約4,000倍**
- **後方互換性**: CAN-Tunnelingで既存コンポーネントとの互換性維持
- 高解像度カメラ、自律走行システム、複数作業機間通信等に対応

### 7.2 Digital Camera Systems（DCS）

HSI上で動作するデジタルカメラシステムの標準化。自動雑草検出、作物モニタリング、安全監視が主要用途。

### 7.3 Wireless In-Field Communication（WIC）

圃場内でのワイヤレス機械間通信の標準化。自律走行農機群の協調制御が主要ユースケース。

### 7.4 Agricultural Interoperability Network（AgIN）

クラウド間のピアツーピア接続を実現するデータスペースイニシアチブ。

- **参加企業**: AGCO、CLAAS、CNHi、John Deere、Kubota等26社以上
- **スケジュール**: 2026年3月に初回リリース、2026年9月にフルプロダクション予定
- ASABE AE50アワード受賞

---

## 8. 主要メーカーのISOBUS戦略

### 8.1 John Deere

- クローズドエコシステム + 自律走行戦略
- 2025年以降の8R/9Rシリーズは工場出荷時「Autonomy Ready」
- FTCが反トラスト訴訟を提起（修理市場の独占）
- AgINイニシアチブには参加

### 8.2 CNH Industrial（Case IH / New Holland）

- AI・自律・社内技術開発。精密技術の90%を社内開発目標
- Raven Industries買収でスプレーヤー自動化を強化
- Sense & Act Spraying: 除草剤**最大80%削減**

### 8.3 AGCO（Fendt / Massey Ferguson）

- Trimbleとの合弁会社設立（混合フリート精密農業プラットフォーム）
- AgINイニシアチブのリード役
- John Deereの単一ブランドエコシステムへの直接対抗

### 8.4 CLAAS

- CLAAS connectプラットフォーム中核のデジタル接続戦略
- AgINを支持、オープン標準を推進

### 8.5 クボタ

- **世界初のAEF TIM認証取得**（M7003 + BVシリーズ）
- Kverneland Groupを通じたISOBUS作業機ポートフォリオ
- Agritechnica 2025で「自動化」「持続可能性」「接続性」の3本柱を展示
- AgINイニシアチブに参加

### 8.6 ヤンマー

- 可変施肥田植機でISOBUS/xarvio連携を先行実証
- 水田農業という日本固有環境のスマート農業ソリューションに注力

---

## 総括と展望

### グローバルトレンド

1. **CAN からEthernetへの移行**: HSIにより約4,000倍の高速化。2026年以降パラダイムシフト
2. **データ相互運用性の確立**: AgINにより2026年にメーカー間クラウド連携が実用化
3. **自律走行との融合**: TIM、セクションコントロール、可変施肥の成熟 + 完全自律走行
4. **オープン vs クローズド**: John Deere vs AGCO/Trimble連合。修理権運動でオープン化圧力

### 日本の課題と機会

1. **ISOBUSとオープンAPIの二重標準化**: 両者の統合・棲み分けの明確化が必要
2. **十勝モデルの全国展開**: 北海道で蓄積されたノウハウの他地域展開
3. **国内作業機メーカーの認証拡大**: 4社の認証取得は第一歩
4. **水田農業への適用**: ヤンマーの可変施肥田植機は重要な先行事例
5. **中小規模農家への普及策**: シェアリング・FaaSの導入による経済的障壁低減

---

## 出典

- ISO 11783 - Wikipedia
- ISOBUS Data Dictionary (isobus.net)
- AEF Online (aef-online.org)
- AEF ISOBUS Database
- AEF - High Speed ISOBUS / TIM / AgIN
- Kubota TIM Story (kubota.com)
- ISOBUS Japan Tokachi (MyNavi Agriculture)
- Japanese 4 companies ISOBUS certification (Smart Agri)
- NARO ISOBUS Implements
- MAFF Open API
- WAGRI Open API
- CLAAS at Agritechnica 2025
- John Deere AI Strategy
- AGCO Autonomy (Precision Farming Dealer)
- FTC vs John Deere (repair.org)
- HSI - DSA
- Japan Smart Agriculture - MRI
