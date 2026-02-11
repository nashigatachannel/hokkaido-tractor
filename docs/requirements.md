# 北海道中古トラクター・作業機 販売ポータルサイト — 要件定義書

> 作成日: 2026-02-11
> ステータス: ドラフト v1.0

---

## 1. プロジェクト概要

### 1.1 コンセプト
北海道の中古トラクター・作業機を**網羅的に掲載するポータルサイト**。
他社製品はカタログ的に掲載（購入は外部サイトへ誘導）し、自社製品はサイト内で決済まで完結するECサイトとしても機能する。

### 1.2 差別化ポイント
- 自社製品に限り**GPS自動操舵システムの後付けオプション**を提供
- 北海道特化（地域・気候に合った農機情報）
- ポータル＋ECのハイブリッド構成

### 1.3 ターゲットユーザー
| ユーザー | ニーズ |
|---|---|
| 北海道の農家（個人・法人） | 中古トラクター・作業機を探したい、比較したい |
| 新規就農者 | 低コストで農機を揃えたい、自動操舵で効率化したい |
| 他地域の農家 | 北海道の大型機材を探している |

---

## 2. サイト構成（ページ一覧）

```
/                           トップページ
/products/                  商品一覧（全商品: 自社+他社）
/products/[id]              商品詳細ページ
/products/[id]/purchase     購入フロー（自社品のみ）
/tractors/                  トラクター一覧
/implements/                作業機一覧
/auto-steering/             自動操舵オプション紹介ページ
/about/                     会社概要
/contact/                   お問い合わせ
/guide/                     購入ガイド（ローン・配送・自動操舵）
/shipping/                  配送・運賃一覧ページ
/admin/                     管理ダッシュボード（認証必要）
/admin/products/            商品管理
/admin/orders/              注文管理
/admin/external-products/   他社品管理
/admin/shipping/            運賃一覧管理
```

---

## 3. 機能要件

### 3.1 商品掲載（共通）

全商品に以下の情報を掲載する:

| 項目 | 必須 | 備考 |
|---|---|---|
| 商品名 | ○ | メーカー + 型式 |
| メーカー | ○ | クボタ, ヤンマー, ジョンディア, ニューホランド 等 |
| カテゴリ | ○ | トラクター / 作業機（プラウ, ハロー, ロータリー, 播種機 等） |
| 馬力 (PS/HP) | △ | トラクターは必須、作業機は任意 |
| 年式 | △ | あれば記載 |
| アワーメーター（稼働時間） | △ | あれば記載 |
| タイヤサイズ | △ | あれば記載 |
| 作業幅 | △ | 作業機の場合 |
| 適合馬力帯 | △ | 作業機の場合 |
| 価格 | ○ | 税込表示。「要問合せ」も可 |
| 画像 | ○ | 複数枚対応（最大10枚） |
| 状態説明 | ○ | 自由テキスト |
| 所在地 | △ | 市町村レベル |
| 出品元 | ○ | 「自社」 or 「他社（会社名）」 |

### 3.2 他社製品の掲載

- **データ登録**: 管理画面から手動登録（将来的にスクレイピング/API連携も視野）
- **表示**: 商品一覧・詳細ページに自社品と同列で表示
- **識別**: 「提携販売店」等のバッジで他社品と明示
- **購入動線**: 「この商品を見る」ボタン → **他社サイトの該当商品ページへ外部リンク**（target="_blank"）
- **注意**: サイト内では決済しない。あくまでカタログ＆リンク

### 3.3 自社製品の販売（EC機能）

#### 購入フロー
```
商品詳細ページ
  ↓ 「購入する」ボタン
オプション選択画面
  ├─ GPS自動操舵オプション（+料金表示）
  ├─ 整備オプション（任意）
  └─ 配送方法選択（大型配送 or 引取）
  ↓
購入者情報入力
  ├─ 氏名 / 法人名
  ├─ 住所
  ├─ 電話番号
  ├─ メールアドレス
  └─ 備考欄
  ↓
決済方法選択
  ├─ クレジットカード（Stripe）
  ├─ 銀行振込（振込先表示 → 入金確認後に発送）
  └─ ローン（会社既存の農機ローン連携ルートを使用）
  ↓
注文確認画面
  ↓
注文完了（確認メール送信）
```

#### 決済詳細

| 決済手段 | 実装方法 | 備考 |
|---|---|---|
| クレジットカード | **Stripe Checkout** | VISA/Master/JCB/AMEX対応。3Dセキュア必須 |
| 銀行振込 | 手動確認フロー | 注文後に振込先を表示・メール送信。管理画面で入金確認 |
| ローン | 会社既存ルート | 入社先企業の仕入れ・ローン連携ルートを使用。詳細は入社後に確定 |

#### GPS自動操舵オプション

| 項目 | 内容 |
|---|---|
| 対象 | 自社販売品のみ |
| 内容 | RTK-GPS対応自動操舵システムの後付け取り付け |
| 対応メーカー例 | トプコン, ニコン・トリンブル, AG Leader 等 |
| 料金 | 商品ごとに異なる（管理画面で設定） |
| 表示 | 購入フローのオプション選択で「自動操舵を追加」として表示 |
| 備考 | 車種適合チェックが必要（対応不可の場合は選択不可にする） |

#### 配送方法

| 方法 | 説明 |
|---|---|
| **大型配送** | 大型トラック等で配送。運賃は地域別一覧表に基づく |
| **引取（来店）** | 購入者が直接引取に来る。運賃なし |

**運賃一覧表について:**
- 管理画面から地域別の運賃一覧を登録・更新できるようにする
- 購入フローで配送先住所に応じた運賃を自動表示
- 一覧表のデータは後日提供予定 → CSVインポート or 管理画面から手動入力に対応
- 運賃テーブル構造: `地域（振興局 or 市町村）× 機材サイズ区分 → 運賃`

### 3.4 検索・フィルタ機能

| フィルタ項目 | 種別 |
|---|---|
| カテゴリ | セレクト（トラクター / 作業機サブカテゴリ） |
| メーカー | マルチセレクト |
| 馬力帯 | レンジスライダー（例: 20PS〜200PS） |
| 価格帯 | レンジスライダー |
| 年式 | レンジスライダー |
| 出品元 | 自社 / 他社 / すべて |
| 自動操舵オプション対応 | チェックボックス |
| フリーワード検索 | テキスト |
| 所在地 | 北海道の振興局 or 市町村 |

### 3.5 管理ダッシュボード

| 機能 | 説明 |
|---|---|
| 自社商品CRUD | 登録・編集・削除・公開/非公開切替 |
| 他社商品CRUD | 登録・編集・削除（外部リンクURL含む） |
| 画像アップロード | 複数画像のドラッグ&ドロップアップロード |
| 注文管理 | 一覧・詳細・ステータス更新（受注→入金確認→整備中→発送済→完了） |
| 自動操舵オプション管理 | 車種別の対応可否・料金設定 |
| 運賃一覧管理 | 地域×サイズ区分の運賃テーブル編集。CSVインポート対応 |
| 売上レポート | 月別売上・商品別売上 |
| お問い合わせ管理 | 問い合わせの一覧・対応状況管理 |

### 3.6 その他の機能

| 機能 | 説明 |
|---|---|
| お気に入り | ログインなしでもlocalStorageで保持 |
| 新着通知 | 条件に合う商品が登録されたらメール通知（任意登録） |
| SEO | 構造化データ（Product schema）、OGP、サイトマップ自動生成 |
| レスポンシブ | スマホ・タブレット対応必須 |
| お問い合わせフォーム | 商品個別＋一般問い合わせ |
| ブログ/コラム | 農機の選び方、自動操舵の解説等（SEO集客用） |

---

## 4. 技術設計

### 4.1 技術スタック

| レイヤー | 技術 | 選定理由 |
|---|---|---|
| フロントエンド | **Next.js 15 (App Router)** | SSG/ISRでSEO最強。React Server Components対応 |
| スタイリング | **Tailwind CSS** | 高速なUI構築。レスポンシブ対応が楽 |
| バックエンド/DB | **Supabase (PostgreSQL)** | BaaS。認証・DB・ストレージ・リアルタイムを一括提供。無料枠あり |
| 画像ストレージ | **Supabase Storage** | S3互換。画像リサイズはEdge Functionで対応 |
| 決済 | **Stripe** | クレカ決済。Checkout Session + Webhook |
| メール | **Resend** | トランザクションメール（注文確認・入金依頼等） |
| ホスティング | **Vercel** | Next.jsとの相性最高。Edge Network対応 |
| CMS（ブログ） | **MDX or Supabase** | ブログ記事をMarkdownで管理 |

### 4.2 アーキテクチャ概要

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   ブラウザ    │────→│  Vercel Edge  │────→│  Next.js App │
│  (ユーザー)   │←────│   Network    │←────│  (SSR/SSG)   │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                 │
                         ┌───────────────────────┼───────────────┐
                         ↓                       ↓               ↓
                  ┌──────────────┐      ┌──────────────┐  ┌───────────┐
                  │   Supabase   │      │    Stripe    │  │   Resend  │
                  │  (DB/Auth/   │      │   (決済)      │  │  (メール)  │
                  │   Storage)   │      └──────────────┘  └───────────┘
                  └──────────────┘
```

### 4.3 データモデル（主要テーブル）

```sql
-- 商品テーブル
products (
  id              UUID PRIMARY KEY,
  title           TEXT NOT NULL,           -- 商品名
  slug            TEXT UNIQUE NOT NULL,     -- URLスラッグ
  category        TEXT NOT NULL,           -- 'tractor' | 'implement'
  subcategory     TEXT,                    -- 'plow', 'harrow', 'rotary' 等
  manufacturer    TEXT NOT NULL,           -- メーカー名
  model           TEXT,                    -- 型式
  horsepower      INTEGER,                -- 馬力
  year            INTEGER,                -- 年式
  hours           INTEGER,                -- アワーメーター
  tire_size       TEXT,                    -- タイヤサイズ
  working_width   DECIMAL,                -- 作業幅 (m)
  compatible_hp   TEXT,                    -- 適合馬力帯 (例: "60-120PS")
  price           INTEGER,                -- 価格（税込・円）。price_type='inquiry'の場合はNULL許可
  price_type      TEXT DEFAULT 'fixed',   -- 'fixed' | 'negotiable' | 'inquiry'
  description     TEXT,                    -- 状態説明
  location        TEXT,                    -- 所在地
  is_own_product  BOOLEAN DEFAULT false,  -- 自社品か否か
  external_url    TEXT,                    -- 他社品の購入先URL
  external_source TEXT,                    -- 他社名
  auto_steering   BOOLEAN DEFAULT false,  -- 自動操舵オプション対応可
  steering_price  INTEGER,                -- 自動操舵オプション料金
  steering_note   TEXT,                    -- 自動操舵の備考
  status          TEXT DEFAULT 'draft',   -- 'draft' | 'published' | 'sold'
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
)

-- 商品画像
product_images (
  id          UUID PRIMARY KEY,
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
)

-- 注文テーブル（自社品のみ）
orders (
  id                UUID PRIMARY KEY,
  product_id        UUID REFERENCES products(id),
  order_number      TEXT UNIQUE NOT NULL,    -- 注文番号
  customer_name     TEXT NOT NULL,
  customer_company  TEXT,                    -- 法人名（任意）
  customer_email    TEXT NOT NULL,
  customer_phone    TEXT NOT NULL,
  customer_address  TEXT NOT NULL,
  customer_zip      TEXT NOT NULL,
  with_steering     BOOLEAN DEFAULT false,   -- 自動操舵オプション有無
  steering_price    INTEGER DEFAULT 0,
  subtotal          INTEGER NOT NULL,        -- 商品小計
  total             INTEGER NOT NULL,        -- 合計（オプション込み）
  payment_method    TEXT NOT NULL,           -- 'credit' | 'transfer' | 'loan'
  payment_status    TEXT DEFAULT 'pending',  -- 'pending' | 'paid' | 'failed'
  order_status      TEXT DEFAULT 'received', -- 'received' | 'confirmed' | 'preparing' | 'shipped' | 'completed' | 'cancelled'
  delivery_method   TEXT NOT NULL,           -- 'shipping' | 'pickup'
  shipping_region   TEXT,                    -- 配送先地域
  shipping_price    INTEGER DEFAULT 0,       -- 運賃
  stripe_session_id TEXT,
  notes             TEXT,                    -- 備考
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
)

-- 運賃一覧テーブル
shipping_rates (
  id              UUID PRIMARY KEY,
  region          TEXT NOT NULL,            -- 地域名（振興局 or 市町村）
  size_class      TEXT NOT NULL,            -- 機材サイズ区分（'small' | 'medium' | 'large' | 'extra_large'）
  price           INTEGER NOT NULL,         -- 運賃（円）
  notes           TEXT,                     -- 備考
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(region, size_class)
)

-- お問い合わせ
inquiries (
  id          UUID PRIMARY KEY,
  product_id  UUID REFERENCES products(id),  -- 商品個別問合せの場合
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT NOT NULL,
  status      TEXT DEFAULT 'new',  -- 'new' | 'in_progress' | 'resolved'
  created_at  TIMESTAMPTZ DEFAULT now()
)

-- 新着通知登録
notifications (
  id          UUID PRIMARY KEY,
  email       TEXT NOT NULL,
  category    TEXT,          -- フィルタ条件
  manufacturer TEXT,
  min_hp      INTEGER,
  max_hp      INTEGER,
  max_price   INTEGER,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
)

-- 管理者
admin_users (
  id          UUID PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  role        TEXT DEFAULT 'admin',  -- 'admin' | 'editor'
  created_at  TIMESTAMPTZ DEFAULT now()
)

-- updated_at自動更新トリガー（products, orders, shipping_rates に適用）
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON shipping_rates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## 5. 画面設計（ワイヤーフレーム概要）

### 5.1 トップページ
```
┌─────────────────────────────────────────┐
│  ロゴ    ナビ（トラクター|作業機|自動操舵|ガイド|問合せ）│
├─────────────────────────────────────────┤
│                                         │
│   ヒーローバナー                          │
│   「北海道の中古農機、ここに全部ある」       │
│   [トラクターを探す]  [作業機を探す]        │
│                                         │
├─────────────────────────────────────────┤
│  検索バー（カテゴリ / メーカー / 馬力 / 価格）│
├─────────────────────────────────────────┤
│  新着商品（カード形式 × 8件）              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ 画像  │ │ 画像  │ │ 画像  │ │ 画像  │   │
│  │ 名前  │ │ 名前  │ │ 名前  │ │ 名前  │   │
│  │ 馬力  │ │ 馬力  │ │ 馬力  │ │ 馬力  │   │
│  │ 価格  │ │ 価格  │ │ 価格  │ │ 価格  │   │
│  │[自社] │ │[他社] │ │[自社] │ │[他社] │   │
│  └──────┘ └──────┘ └──────┘ └──────┘   │
├─────────────────────────────────────────┤
│  自動操舵オプション紹介セクション          │
│  「中古トラクターにGPS自動操舵を後付け」    │
├─────────────────────────────────────────┤
│  フッター（会社情報・リンク・SNS）          │
└─────────────────────────────────────────┘
```

### 5.2 商品詳細ページ（自社品）
```
┌─────────────────────────────────────────┐
│  パンくずリスト                           │
├──────────────────┬──────────────────────┤
│                  │                      │
│  画像ギャラリー    │  商品名              │
│  (スライダー)     │  メーカー / 型式      │
│                  │  馬力: ○○PS          │
│                  │  年式: ○○年          │
│                  │  稼働: ○○時間        │
│                  │  タイヤ: ○○          │
│                  │  所在地: ○○          │
│                  │                      │
│                  │  価格: ¥○○○,○○○     │
│                  │                      │
│                  │  [★ 自動操舵対応]     │
│                  │                      │
│                  │  [購入する]           │
│                  │  [お問い合わせ]       │
├──────────────────┴──────────────────────┤
│  商品説明（自由テキスト）                  │
├─────────────────────────────────────────┤
│  関連商品                                │
└─────────────────────────────────────────┘
```

### 5.3 商品詳細ページ（他社品）
```
  ※ 基本レイアウトは自社品と同じ
  ※ 違い:
    - 「提携販売店: ○○」バッジ表示
    - 購入ボタンが「販売元サイトで見る →」に変わる
    - クリックで外部サイト（target="_blank"）へ遷移
    - 自動操舵オプションは非表示
    - 決済フローなし
```

---

## 6. 非機能要件

| 項目 | 要件 |
|---|---|
| パフォーマンス | 商品一覧ページ: LCP 2.5秒以内。画像は WebP + lazy loading |
| SEO | 各商品ページに構造化データ（Product + Offer）。サイトマップ自動生成 |
| セキュリティ | Stripe Webhook署名検証。CSRFトークン。管理画面は認証必須 |
| アクセシビリティ | WCAG 2.1 AA準拠（最低限） |
| バックアップ | Supabaseの自動バックアップ（日次） |
| 対応ブラウザ | Chrome, Safari, Edge（最新2バージョン）。IE非対応 |
| スマホ対応 | モバイルファースト。農家は現場でスマホで見る |

---

## 7. 開発フェーズ

### Phase 1: MVP（最小限の動くもの）

#### やること
- [ ] プロジェクトセットアップ（Next.js 15 + Supabase + Vercel + 環境変数設定 + DB接続確認）
- [ ] DBスキーマ作成 + updated_atトリガー設定 + シードデータ投入
- [ ] 簡易トップページ（ヘッダー + 検索バー + 新着商品8件 + フッター）
- [ ] 商品一覧ページ（フィルタ付き + ページネーション20件/ページ + 0件時メッセージ）
- [ ] 商品詳細ページ（自社品 / 他社品の分岐 + 画像ギャラリー）
- [ ] 管理画面（商品CRUD + 画像アップロード + ステータス切替）
- [ ] 管理者認証（Supabase Auth / メール+パスワード）

#### やらないこと（Phase 2以降に延期）
- ヒーローバナーのリッチなアニメーション → Phase 3
- 購入フロー・決済 → Phase 2
- お問い合わせフォーム → Phase 3
- 新着通知メール → Phase 3
- ブログ/コラム → Phase 3
- お気に入り機能 → Phase 3
- 画像のWebP変換・リサイズ最適化 → Phase 3
- 画像の並び順変更UI（D&D） → Phase 3
- URLパラメータによるフィルタ状態保持 → Phase 3
- 追加管理者の登録UI → Phase 3
- 商品編集プレビュー → Phase 3
- カスタムメールテンプレート → Phase 3

#### Phase 1 実装仕様

**トップページ（簡易版）:**
- ヘッダー（ロゴ + ナビ）+ 検索バー（カテゴリ / メーカー / 馬力 / 価格）
- 新着商品カード8件 + 「全商品を見る」リンク
- 自動操舵紹介セクション（テキスト + リンクのみ）
- フッター（会社情報プレースホルダー + リンク）

**シードデータ（最低要件）:**
- 自社品5件 + 他社品5件 = 計10件
- メーカー3社以上（例: クボタ, ヤンマー, ジョンディア）
- カテゴリ: トラクター5件 + 作業機5件
- 馬力帯・価格帯・年式が分散するように設定
- 各商品に画像2〜3枚のダミー画像

**画像アップロード:**
- 対応形式: JPEG / PNG / WebP
- 最大ファイルサイズ: 5MB/枚
- 最大枚数: 10枚/商品
- リサイズ: Phase 1ではなし（原寸アップロード）
- エラー時: トースト通知で表示
- 削除時: DBレコードのみ削除（Storage実ファイルの孤立クリーンアップはPhase 3）

**商品一覧ページ:**
- ページネーション: 1ページ20件、ページ番号ナビゲーション
- フィルタ: 各入力変更後に即時適用（デバウンス300ms）
- ソート: 新着順（デフォルト）/ 価格順 / 馬力順
- 0件時: 「該当する商品が見つかりませんでした」+ フィルタリセットボタン

**商品詳細ページ:**
- 画像ギャラリー: Embla Carousel使用（軽量・アクセシブル）
- 画像の並び順: 登録順（sort_order昇順）
- 他社品の外部リンク: `rel="noopener noreferrer"` 付与、別タブで開く、警告ダイアログなし
- 「お問い合わせ」ボタン: `/contact?product_id=xxx` へのリンク（Phase 3でフォーム実装時に連動）
- Phase 1では問い合わせページは静的な連絡先表示のみ

**管理画面:**
- UIフレームワーク: shadcn/ui + Tailwind CSS
- 商品ステータス: セレクトボックスで draft / published / sold を切替、即時反映
- 商品削除: Phase 1では物理削除（DELETE）。論理削除はPhase 3で検討
- slug: 管理画面で手動入力必須。重複チェックあり。自動生成はPhase 3
- 初期管理者: シードデータで1名登録（メールアドレスは入社後確定、仮アドレスで開発）
- パスワードリセット: Supabase Authのデフォルト機能をそのまま使用

#### Phase 1 完了条件
1. 管理画面で自社品・他社品を登録・編集・削除できる
2. 商品一覧ページでフィルタ・ページネーションが動作する
3. 商品詳細ページで自社品・他社品が正しく表示される
4. 他社品の「販売元サイトで見る」が外部リンクとして機能する
5. 管理者のみが管理画面にアクセスできる（未認証時はリダイレクト）
6. Vercelにデプロイされ、公開URLでアクセスできる

### Phase 2: EC機能
- [ ] 購入フロー（オプション選択 → 情報入力 → 確認）
- [ ] Stripe決済（クレカ）
- [ ] 銀行振込フロー（振込先表示 + 管理画面で入金確認）
- [ ] 注文確認メール（Resend）
- [ ] 注文管理画面
- [ ] 自動操舵オプション選択UI

### Phase 3: ポータル強化
- [ ] 検索・フィルタの強化（全文検索、URLパラメータ保持）
- [ ] お気に入り機能（localStorage）
- [ ] 新着通知メール
- [ ] お問い合わせフォーム + 管理
- [ ] ブログ/コラム機能

### Phase 4: 運用最適化
- [ ] ローン連携（外部フォーム誘導）
- [ ] 売上レポート
- [ ] 他社品データの半自動取り込み（スクレイピング or CSV）
- [ ] OGP画像自動生成
- [ ] Google Analytics / Search Console連携

---

## 8. 運用コスト概算

| サービス | 月額 | 備考 |
|---|---|---|
| Vercel (Pro) | $20 | 商用利用に必要 |
| Supabase (Pro) | $25 | DB 8GB + Storage + Auth |
| Stripe | 3.6% + ¥40/件 | 決済手数料（売上に比例） |
| Resend | 無料〜$20 | 月3,000通まで無料 |
| ドメイン | ¥1,500/年 | .jp or .com |
| **合計（固定費）** | **約 ¥7,000〜8,000/月** | Stripe手数料は別 |

---

## 9. 未決事項・確認事項

| # | 項目 | 状態 |
|---|---|---|
| 1 | 会社名・ロゴ・ブランドカラー | 未定（入社後確定） |
| 2 | 自動操舵の取扱メーカー・機種一覧 | 要確認 |
| 3 | 他社品の掲載は許可制か自由掲載か | 要確認 |
| 4 | ローン連携先 | ✅ 解決: 入社先企業の既存仕入れルートを使用 |
| 5 | 配送方法 | ✅ 解決: 大型配送 or 引取の2択。運賃一覧表は後日提供 |
| 6 | 特定商取引法に基づく表記の内容 | 必須（入社後に会社情報で作成） |
| 7 | 初期掲載する商品数の目安 | 要確認 |
| 8 | 既存のWebサイトやSNSアカウントの有無 | 要確認 |
| 9 | 運賃一覧表のデータ | 後日提供予定 |

---

## 10. 法的要件

EC機能を持つサイトとして以下が必須:

- [ ] **特定商取引法に基づく表記**（事業者名、住所、電話番号、返品ポリシー等）
- [ ] **プライバシーポリシー**（個人情報の取扱い）
- [ ] **利用規約**
- [ ] **古物商許可証**（入社先企業の既存許可証を使用。保有人員あり）
- [ ] **Stripe本番アカウントの審査**（事業内容の確認が必要）
