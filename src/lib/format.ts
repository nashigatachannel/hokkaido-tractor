export function formatPrice(price: number | null, priceType: string): string {
  if (priceType === "inquiry" || price === null) return "要問合せ";
  if (priceType === "negotiable")
    return `${price.toLocaleString("ja-JP")}円〜（応相談）`;
  return `¥${price.toLocaleString("ja-JP")}`;
}

export function formatHorsepower(hp: number | null): string {
  if (hp === null) return "-";
  return `${hp}PS`;
}

export function formatYear(year: number | null): string {
  if (year === null) return "-";
  return `${year}年`;
}

export function formatHours(hours: number | null): string {
  if (hours === null) return "-";
  return `${hours.toLocaleString("ja-JP")}時間`;
}

export function getCategoryLabel(category: string): string {
  return category === "tractor" ? "トラクター" : "作業機";
}

export function getSubcategoryLabel(sub: string | null): string {
  const map: Record<string, string> = {
    plow: "プラウ",
    harrow: "ハロー",
    rotary: "ロータリー",
    seeder: "播種機",
    sprayer: "防除機",
    mower: "モア",
    baler: "ベーラー",
    loader: "ローダー",
    other: "その他",
  };
  return sub ? map[sub] || sub : "";
}
