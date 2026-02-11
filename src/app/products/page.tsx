import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductListContent } from "@/components/products/product-list-content";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `商品一覧 | ${SITE_NAME}`,
  description:
    "北海道の中古トラクター・作業機の商品一覧。フィルタ・ソート機能付き。",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>
      <Suspense
        fallback={
          <div className="text-center py-12 text-muted-foreground">
            読み込み中...
          </div>
        }
      >
        <ProductListContent />
      </Suspense>
    </div>
  );
}
