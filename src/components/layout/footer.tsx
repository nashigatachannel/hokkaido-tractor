import Link from "next/link";
import { Tractor } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ロゴ・概要 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tractor className="h-6 w-6 text-green-600" />
              <span className="font-bold">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              北海道の中古トラクター・作業機を網羅的に掲載。
              GPS自動操舵オプションも対応しています。
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="font-semibold mb-3">商品カテゴリ</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/products?category=tractor"
                  className="hover:text-foreground transition-colors"
                >
                  トラクター
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=implement"
                  className="hover:text-foreground transition-colors"
                >
                  作業機
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-foreground transition-colors"
                >
                  全商品一覧
                </Link>
              </li>
            </ul>
          </div>

          {/* 情報 */}
          <div>
            <h3 className="font-semibold mb-3">インフォメーション</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  会社概要
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
