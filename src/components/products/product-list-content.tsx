"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "./product-card";
import { ProductFilters } from "./product-filters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SORT_OPTIONS, ITEMS_PER_PAGE } from "@/lib/constants";
import type { ProductWithImages } from "@/lib/types";

export function ProductListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [total, setTotal] = useState(0);
  const [, startTransition] = useTransition();

  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "newest";
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const fetchProducts = useCallback(async () => {
    const params = new URLSearchParams(searchParams.toString());
    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const json = await res.json();
      setProducts(json.products || []);
      setTotal(json.total || 0);
    } catch {
      setProducts([]);
      setTotal(0);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function updateParams(key: string, value: string) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (key !== "page") {
        params.delete("page");
      }
      router.push(`/products?${params.toString()}`);
    });
  }

  function goToPage(p: number) {
    updateParams("page", p > 1 ? String(p) : "");
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-64 shrink-0">
        <ProductFilters
          searchParams={searchParams}
          updateParams={updateParams}
        />
      </aside>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {total}件の商品が見つかりました
          </p>
          <Select value={sort} onValueChange={(v) => updateParams("sort", v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              該当する商品が見つかりませんでした
            </p>
            <Button
              variant="outline"
              onClick={() => router.push("/products")}
            >
              フィルタをリセット
            </Button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              disabled={page >= totalPages}
              onClick={() => goToPage(page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
