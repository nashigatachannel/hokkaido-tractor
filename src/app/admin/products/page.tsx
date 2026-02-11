import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { formatPrice, getCategoryLabel } from "@/lib/format";
import { AdminLogoutButton } from "@/components/admin/logout-button";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import type { Product } from "@/lib/types";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const statusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-600">公開中</Badge>;
      case "draft":
        return <Badge variant="secondary">下書き</Badge>;
      case "sold":
        return <Badge variant="destructive">売約済み</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              ← ダッシュボード
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">商品管理</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/products/new">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              新規登録
            </Button>
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>商品名</TableHead>
              <TableHead className="hidden md:table-cell">カテゴリ</TableHead>
              <TableHead className="hidden md:table-cell">メーカー</TableHead>
              <TableHead className="hidden md:table-cell">価格</TableHead>
              <TableHead>出品元</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(products as Product[])?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium max-w-[200px] truncate">
                  {product.title}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {getCategoryLabel(product.category)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.manufacturer}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatPrice(product.price, product.price_type)}
                </TableCell>
                <TableCell>
                  {product.is_own_product ? (
                    <Badge className="bg-green-600" variant="default">
                      自社
                    </Badge>
                  ) : (
                    <Badge variant="secondary">他社</Badge>
                  )}
                </TableCell>
                <TableCell>{statusBadge(product.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button variant="outline" size="sm">
                        編集
                      </Button>
                    </Link>
                    <DeleteProductButton
                      productId={product.id}
                      productTitle={product.title}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!products || products.length === 0) && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  商品が登録されていません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
