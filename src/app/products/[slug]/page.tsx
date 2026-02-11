import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Crosshair, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageGallery } from "@/components/products/image-gallery";
import { getProductBySlug } from "@/lib/queries";
import {
  formatPrice,
  formatHorsepower,
  formatYear,
  formatHours,
  getCategoryLabel,
  getSubcategoryLabel,
} from "@/lib/format";
import { SITE_NAME } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "商品が見つかりません" };

  return {
    title: `${product.title} | ${SITE_NAME}`,
    description: product.description?.slice(0, 160) || product.title,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const images = (product.product_images || []).sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* パンくずリスト */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          トップ
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">
          商品一覧
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 画像ギャラリー */}
        <ImageGallery images={images} title={product.title} />

        {/* 商品情報 */}
        <div>
          {/* バッジ */}
          <div className="flex gap-2 mb-3">
            {product.is_own_product ? (
              <Badge className="bg-green-600">自社販売</Badge>
            ) : (
              <Badge variant="secondary">
                提携販売店: {product.external_source || "他社"}
              </Badge>
            )}
            <Badge variant="outline">{getCategoryLabel(product.category)}</Badge>
            {product.subcategory && (
              <Badge variant="outline">
                {getSubcategoryLabel(product.subcategory)}
              </Badge>
            )}
            {product.status === "sold" && (
              <Badge variant="destructive">売約済み</Badge>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {product.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            {product.manufacturer}
            {product.model ? ` / ${product.model}` : ""}
          </p>

          {/* 価格 */}
          <div className="text-3xl font-bold text-green-700 mb-6">
            {formatPrice(product.price, product.price_type)}
            <span className="text-sm font-normal text-muted-foreground ml-2">
              （税込）
            </span>
          </div>

          {/* 自動操舵バッジ */}
          {product.auto_steering && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-blue-800 font-semibold mb-1">
                <Crosshair className="h-5 w-5" />
                GPS自動操舵オプション対応
              </div>
              <p className="text-sm text-blue-700">
                {product.steering_price
                  ? `オプション料金: ¥${product.steering_price.toLocaleString("ja-JP")}`
                  : "料金はお問い合わせください"}
              </p>
              {product.steering_note && (
                <p className="text-xs text-blue-600 mt-1">
                  {product.steering_note}
                </p>
              )}
            </div>
          )}

          {/* スペック */}
          <div className="space-y-3 mb-6">
            <SpecRow label="馬力" value={formatHorsepower(product.horsepower)} />
            <SpecRow label="年式" value={formatYear(product.year)} />
            <SpecRow label="稼働時間" value={formatHours(product.hours)} />
            {product.tire_size && (
              <SpecRow label="タイヤサイズ" value={product.tire_size} />
            )}
            {product.working_width && (
              <SpecRow label="作業幅" value={`${product.working_width}m`} />
            )}
            {product.compatible_hp && (
              <SpecRow label="適合馬力" value={product.compatible_hp} />
            )}
            {product.location && (
              <SpecRow
                label="所在地"
                value={product.location}
                icon={<MapPin className="h-4 w-4" />}
              />
            )}
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-3">
            {product.is_own_product ? (
              <>
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={product.status === "sold"}
                >
                  {product.status === "sold"
                    ? "売約済み"
                    : "購入する（Phase 2で実装）"}
                </Button>
                <Link href={`/about`} className="flex-1">
                  <Button size="lg" variant="outline" className="w-full">
                    お問い合わせ
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {product.external_url && (
                  <a
                    href={product.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button size="lg" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      販売元サイトで見る
                    </Button>
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* 商品説明 */}
      {product.description && (
        <>
          <Separator className="my-8" />
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold mb-4">商品説明</h2>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>
        </>
      )}

      {/* 戻るリンク */}
      <div className="mt-8">
        <Link href="/products">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            商品一覧に戻る
          </Button>
        </Link>
      </div>
    </div>
  );
}

function SpecRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  if (value === "-") return null;
  return (
    <div className="flex items-center justify-between py-2 border-b border-dashed">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium flex items-center gap-1">
        {icon}
        {value}
      </span>
    </div>
  );
}
