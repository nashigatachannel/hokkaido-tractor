import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm">
            ← 商品一覧
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">新規商品登録</h1>
      </div>
      <ProductForm />
    </div>
  );
}
