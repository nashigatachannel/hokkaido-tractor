import Link from "next/link";
import { ArrowRight, Crosshair, Tractor, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { getLatestProducts } from "@/lib/queries";

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof getLatestProducts>> = [];
  try {
    products = await getLatestProducts(8);
  } catch {
    // Supabase未接続時は空配列
  }

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            北海道の中古農機、
            <br className="md:hidden" />
            ここに全部ある
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            中古トラクター・作業機を網羅的に掲載。
            GPS自動操舵オプションの後付けにも対応しています。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products?category=tractor">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Tractor className="h-5 w-5" />
                トラクターを探す
              </Button>
            </Link>
            <Link href="/products?category=implement">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2"
              >
                <Wrench className="h-5 w-5" />
                作業機を探す
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 新着商品 */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">新着商品</h2>
            <Link href="/products">
              <Button variant="ghost" className="gap-1">
                全商品を見る <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>商品データの読み込みに失敗しました。</p>
              <p className="text-sm mt-2">
                Supabaseの接続設定を確認してください。
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 自動操舵セクション */}
      <section className="bg-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
              <Crosshair className="h-4 w-4" />
              GPS自動操舵オプション
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              中古トラクターにGPS自動操舵を後付け
            </h2>
            <p className="text-muted-foreground mb-6">
              RTK-GPS対応の自動操舵システムを後付けで取り付けます。
              トプコン、ニコン・トリンブル、AG
              Leader等の主要メーカーに対応。
              対応可能な車両には「自動操舵対応」バッジが表示されます。
            </p>
            <Link href="/products?autoSteering=true">
              <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Crosshair className="h-5 w-5" />
                自動操舵対応車両を見る
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
