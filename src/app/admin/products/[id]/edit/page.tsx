import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/product-form";
import { createClient } from "@/lib/supabase/server";
import type { ProductWithImages } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("id", id)
    .single();

  if (error || !product) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm">
            ← 商品一覧
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">商品編集</h1>
      </div>
      <ProductForm product={product as ProductWithImages} />
    </div>
  );
}
