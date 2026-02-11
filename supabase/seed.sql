-- =============================================
-- シードデータ: 自社品5件 + 他社品5件 = 計10件
-- =============================================

-- 自社品（トラクター3台 + 作業機2台）
INSERT INTO products (title, slug, category, subcategory, manufacturer, model, horsepower, year, hours, tire_size, price, price_type, description, location, is_own_product, auto_steering, steering_price, steering_note, status) VALUES
(
  'クボタ M7-172 中古トラクター',
  'kubota-m7-172',
  'tractor', NULL,
  'クボタ', 'M7-172',
  172, 2019, 1850,
  '前輪 380/85R28 後輪 480/80R42',
  8500000, 'fixed',
  'クボタのフラッグシップモデルM7-172。CVTミッション搭載で滑らかな変速が可能。キャビン内装も良好で、エアコン・ラジオ完備。整備済みで即使用可能です。GPS自動操舵システムの後付けにも対応しています。',
  '十勝・帯広市',
  true, true, 1200000,
  'トプコン System 350 対応。取付工賃込み。',
  'published'
),
(
  'ヤンマー YT5113A 中古トラクター',
  'yanmar-yt5113a',
  'tractor', NULL,
  'ヤンマー', 'YT5113A',
  113, 2020, 980,
  '前輪 320/85R24 後輪 420/85R34',
  6200000, 'fixed',
  'ヤンマーYTシリーズの113馬力モデル。ロボットトラクター仕様のベース機としても人気。低稼働時間で状態良好。パワーシフト16段変速。',
  '上川・旭川市',
  true, true, 980000,
  'AG Leader SteerCommand 対応。',
  'published'
),
(
  'ジョンディア 6130R 中古トラクター',
  'john-deere-6130r',
  'tractor', NULL,
  'ジョンディア', '6130R',
  130, 2018, 2400,
  '前輪 380/85R28 後輪 480/80R38',
  7800000, 'negotiable',
  'ジョンディア6Rシリーズ。AutoPowr無段変速ミッション。フロントPTO・フロント3点リンク装備。大規模畑作に最適なパワフルモデル。',
  '網走・北見市',
  true, true, 1500000,
  'ジョンディア純正 StarFire 6000 + AutoTrac対応。',
  'published'
),
(
  'スガノ ボトムプラウ RQY183 中古',
  'sugano-rqy183-plow',
  'implement', 'plow',
  'スガノ', 'RQY183',
  NULL, 2017, NULL,
  NULL,
  450000, 'fixed',
  'スガノ製3連ボトムプラウ。リバーシブル式で往復耕が可能。適合馬力80〜130PS。シェア（刃）は8割残っています。',
  '十勝・帯広市',
  true, false, NULL, NULL,
  'published'
),
(
  'ニプロ ロータリーハロー HRL3610B 中古',
  'niplo-hrl3610b-harrow',
  'implement', 'harrow',
  'ニプロ', 'HRL3610B',
  NULL, 2019, NULL,
  NULL,
  680000, 'fixed',
  'ニプロ製ロータリーハロー。作業幅3.6m。砕土性能が高く、播種前の整地に最適。爪の摩耗少なめ。適合馬力60〜100PS。',
  '空知・岩見沢市',
  true, false, NULL, NULL,
  'published'
),

-- 他社品（トラクター2台 + 作業機3台）
(
  'ニューホランド T6.180 中古トラクター',
  'new-holland-t6-180',
  'tractor', NULL,
  'ニューホランド', 'T6.180',
  180, 2017, 3200,
  '前輪 420/85R28 後輪 520/85R42',
  9200000, 'fixed',
  'ニューホランドT6シリーズの180馬力モデル。エレクトロコマンドミッション搭載。大型畑作・牧草作業に。',
  '釧路・釧路市',
  false, false, NULL, NULL,
  'published'
),
(
  'イセキ TJV655 中古トラクター',
  'iseki-tjv655',
  'tractor', NULL,
  'イセキ', 'TJV655',
  65, 2021, 450,
  '前輪 9.5-24 後輪 16.9-34',
  3800000, 'fixed',
  'イセキの65馬力クラス。低稼働の極上車。小〜中規模農家に最適なサイズ感。キャビン仕様。',
  '石狩・札幌市',
  false, false, NULL, NULL,
  'published'
),
(
  'コバシ ディスクハロー DC401T 中古',
  'kobashi-dc401t-harrow',
  'implement', 'harrow',
  'コバシ', 'DC401T',
  NULL, 2018, NULL,
  NULL,
  520000, 'negotiable',
  'コバシ製ディスクハロー。作業幅4m。大型圃場の一次砕土に威力を発揮。ディスク残量7割。',
  '十勝・音更町',
  false, false, NULL, NULL,
  'published'
),
(
  'タカキタ マニュアスプレッダ DH2080D 中古',
  'takakita-dh2080d-spreader',
  'implement', 'other',
  'タカキタ', 'DH2080D',
  NULL, 2016, NULL,
  NULL,
  380000, 'fixed',
  'タカキタ製マニュアスプレッダ。積載量2t。堆肥散布に。ビーター・チェーンともに良好な状態。適合馬力50〜80PS。',
  '根室・中標津町',
  false, false, NULL, NULL,
  'published'
),
(
  'ササキ ブロードキャスター CB401 中古',
  'sasaki-cb401-seeder',
  'implement', 'seeder',
  'ササキ', 'CB401',
  NULL, 2020, NULL,
  NULL,
  280000, 'fixed',
  'ササキ製ブロードキャスター。容量400L。肥料・種子の散布に。ステンレスホッパーで錆びにくい。',
  '上川・名寄市',
  false, false, NULL, NULL,
  'published'
);

-- 他社品の外部URLを設定
UPDATE products SET external_url = 'https://example.com/new-holland-t6-180', external_source = '北海道農機販売' WHERE slug = 'new-holland-t6-180';
UPDATE products SET external_url = 'https://example.com/iseki-tjv655', external_source = '旭川トラクターセンター' WHERE slug = 'iseki-tjv655';
UPDATE products SET external_url = 'https://example.com/kobashi-dc401t', external_source = '十勝農機具市場' WHERE slug = 'kobashi-dc401t-harrow';
UPDATE products SET external_url = 'https://example.com/takakita-dh2080d', external_source = '根室農機サービス' WHERE slug = 'takakita-dh2080d-spreader';
UPDATE products SET external_url = 'https://example.com/sasaki-cb401', external_source = '北海道農機販売' WHERE slug = 'sasaki-cb401-seeder';

-- 作業機に適合馬力と作業幅を設定
UPDATE products SET compatible_hp = '80-130PS' WHERE slug = 'sugano-rqy183-plow';
UPDATE products SET compatible_hp = '60-100PS', working_width = 3.6 WHERE slug = 'niplo-hrl3610b-harrow';
UPDATE products SET compatible_hp = '80-150PS', working_width = 4.0 WHERE slug = 'kobashi-dc401t-harrow';
UPDATE products SET compatible_hp = '50-80PS' WHERE slug = 'takakita-dh2080d-spreader';
UPDATE products SET compatible_hp = '30-60PS' WHERE slug = 'sasaki-cb401-seeder';
