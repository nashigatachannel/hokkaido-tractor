-- =============================================
-- Hokkaido Tractor - Phase 1 DBスキーマ
-- =============================================

-- updated_at自動更新トリガー関数
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 商品テーブル
CREATE TABLE IF NOT EXISTS products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  category        TEXT NOT NULL CHECK (category IN ('tractor', 'implement')),
  subcategory     TEXT,
  manufacturer    TEXT NOT NULL,
  model           TEXT,
  horsepower      INTEGER,
  year            INTEGER,
  hours           INTEGER,
  tire_size       TEXT,
  working_width   DECIMAL,
  compatible_hp   TEXT,
  price           INTEGER,
  price_type      TEXT DEFAULT 'fixed' CHECK (price_type IN ('fixed', 'negotiable', 'inquiry')),
  description     TEXT,
  location        TEXT,
  is_own_product  BOOLEAN DEFAULT false,
  external_url    TEXT,
  external_source TEXT,
  auto_steering   BOOLEAN DEFAULT false,
  steering_price  INTEGER,
  steering_note   TEXT,
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold')),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- 商品画像テーブル
CREATE TABLE IF NOT EXISTS product_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 管理者テーブル
CREATE TABLE IF NOT EXISTS admin_users (
  id          UUID PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  role        TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- トリガー設定
CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- インデックス
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_manufacturer ON products(manufacturer);
CREATE INDEX IF NOT EXISTS idx_products_is_own ON products(is_own_product);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);

-- RLS（Row Level Security）
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 公開商品は誰でも閲覧可能
CREATE POLICY "published_products_viewable" ON products
  FOR SELECT USING (status = 'published');

-- 認証済みユーザーは全商品を閲覧可能（管理画面用）
CREATE POLICY "authenticated_view_all_products" ON products
  FOR SELECT TO authenticated USING (true);

-- 認証済みユーザーは商品を挿入可能
CREATE POLICY "authenticated_insert_products" ON products
  FOR INSERT TO authenticated WITH CHECK (true);

-- 認証済みユーザーは商品を更新可能
CREATE POLICY "authenticated_update_products" ON products
  FOR UPDATE TO authenticated USING (true);

-- 認証済みユーザーは商品を削除可能
CREATE POLICY "authenticated_delete_products" ON products
  FOR DELETE TO authenticated USING (true);

-- 商品画像: 商品に紐づく画像は誰でも閲覧可能
CREATE POLICY "product_images_viewable" ON product_images
  FOR SELECT USING (true);

-- 認証済みユーザーは画像を操作可能
CREATE POLICY "authenticated_insert_images" ON product_images
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "authenticated_delete_images" ON product_images
  FOR DELETE TO authenticated USING (true);

-- admin_users: 認証済みのみ閲覧
CREATE POLICY "authenticated_view_admins" ON admin_users
  FOR SELECT TO authenticated USING (true);

-- Storageバケット（product-images）
-- ※ Supabaseダッシュボードで作成するか、以下のSQLを実行
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage: 誰でも閲覧可能
CREATE POLICY "product_images_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Storage: 認証済みユーザーはアップロード可能
CREATE POLICY "product_images_auth_upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');

-- Storage: 認証済みユーザーは削除可能
CREATE POLICY "product_images_auth_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'product-images');
