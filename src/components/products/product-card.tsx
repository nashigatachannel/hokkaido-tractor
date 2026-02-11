import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Crosshair } from "lucide-react";
import { formatPrice, formatHorsepower, getCategoryLabel } from "@/lib/format";
import type { ProductWithImages } from "@/lib/types";

interface ProductCardProps {
  product: ProductWithImages;
}

export function ProductCard({ product }: ProductCardProps) {
  const thumbnailUrl =
    product.product_images?.[0]?.url || "/placeholder-tractor.svg";

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={thumbnailUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-2 left-2 flex gap-1">
            {product.is_own_product ? (
              <Badge className="bg-green-600 hover:bg-green-700">自社</Badge>
            ) : (
              <Badge variant="secondary">
                {product.external_source || "提携販売店"}
              </Badge>
            )}
            {product.status === "sold" && (
              <Badge variant="destructive">売約済み</Badge>
            )}
          </div>
          {product.auto_steering && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
                <Crosshair className="h-3 w-3" />
                自動操舵対応
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">
            {product.manufacturer} / {getCategoryLabel(product.category)}
          </p>
          <h3 className="font-semibold text-sm line-clamp-2 mb-2">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-green-700">
              {formatPrice(product.price, product.price_type)}
            </span>
            {product.horsepower && (
              <span className="text-xs text-muted-foreground">
                {formatHorsepower(product.horsepower)}
              </span>
            )}
          </div>
          {product.location && (
            <p className="text-xs text-muted-foreground mt-1">
              {product.location}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
