import Link from "next/link";
import { Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { AdminLogoutButton } from "@/components/admin/logout-button";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: publishedProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  const { count: draftProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("status", "draft");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">管理ダッシュボード</h1>
        <AdminLogoutButton />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              全商品数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalProducts || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              公開中
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {publishedProducts || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              下書き
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">
              {draftProducts || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/products">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <h2 className="font-semibold">商品管理</h2>
                <p className="text-sm text-muted-foreground">
                  商品の登録・編集・削除
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
