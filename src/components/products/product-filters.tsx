"use client";

import { useEffect, useRef, useState } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CATEGORIES, MANUFACTURERS } from "@/lib/constants";
import { Search, X } from "lucide-react";

interface ProductFiltersProps {
  searchParams: ReadonlyURLSearchParams;
  updateParams: (key: string, value: string) => void;
}

export function ProductFilters({
  searchParams,
  updateParams,
}: ProductFiltersProps) {
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParams("search", searchText);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const category = searchParams.get("category") || "";
  const manufacturer = searchParams.get("manufacturer") || "";
  const isOwnProduct = searchParams.get("isOwnProduct") || "";

  const hasFilters = category || manufacturer || isOwnProduct || searchText;

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium mb-1.5">キーワード検索</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="メーカー名・型式など"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-1.5">カテゴリ</Label>
        <Select
          value={category || "all"}
          onValueChange={(v) => updateParams("category", v === "all" ? "" : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="すべて" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-1.5">メーカー</Label>
        <Select
          value={manufacturer || "all"}
          onValueChange={(v) =>
            updateParams("manufacturer", v === "all" ? "" : v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="すべて" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            {MANUFACTURERS.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-1.5">出品元</Label>
        <Select
          value={isOwnProduct || "all"}
          onValueChange={(v) =>
            updateParams("isOwnProduct", v === "all" ? "" : v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="すべて" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="own">自社品のみ</SelectItem>
            <SelectItem value="other">他社品のみ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1"
          onClick={() => {
            setSearchText("");
            updateParams("category", "");
            updateParams("manufacturer", "");
            updateParams("isOwnProduct", "");
          }}
        >
          <X className="h-3 w-3" />
          フィルタをリセット
        </Button>
      )}
    </div>
  );
}
