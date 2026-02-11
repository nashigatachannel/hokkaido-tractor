export const SITE_NAME = "北海道中古農機ポータル";
export const SITE_DESCRIPTION =
  "北海道の中古トラクター・作業機を網羅的に掲載。GPS自動操舵オプションも対応。";

export const MANUFACTURERS = [
  "クボタ",
  "ヤンマー",
  "イセキ",
  "三菱マヒンドラ",
  "ジョンディア",
  "ニューホランド",
  "マッセイファーガソン",
  "フェント",
  "クラース",
  "その他",
] as const;

export const CATEGORIES = [
  { value: "tractor", label: "トラクター" },
  { value: "implement", label: "作業機" },
] as const;

export const SUBCATEGORIES = [
  { value: "plow", label: "プラウ" },
  { value: "harrow", label: "ハロー" },
  { value: "rotary", label: "ロータリー" },
  { value: "seeder", label: "播種機" },
  { value: "sprayer", label: "防除機" },
  { value: "mower", label: "モア" },
  { value: "baler", label: "ベーラー" },
  { value: "loader", label: "ローダー" },
  { value: "other", label: "その他" },
] as const;

export const PRODUCT_STATUSES = [
  { value: "draft", label: "下書き" },
  { value: "published", label: "公開中" },
  { value: "sold", label: "売約済み" },
] as const;

export const PRICE_TYPES = [
  { value: "fixed", label: "固定価格" },
  { value: "negotiable", label: "応相談" },
  { value: "inquiry", label: "要問合せ" },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "新着順" },
  { value: "price_asc", label: "価格が安い順" },
  { value: "price_desc", label: "価格が高い順" },
  { value: "hp_asc", label: "馬力が低い順" },
  { value: "hp_desc", label: "馬力が高い順" },
] as const;

export const ITEMS_PER_PAGE = 20;

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_IMAGES_PER_PRODUCT = 10;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
