"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageUploader } from "./image-uploader";
import { toast } from "sonner";
import {
  CATEGORIES,
  SUBCATEGORIES,
  MANUFACTURERS,
  PRODUCT_STATUSES,
  PRICE_TYPES,
} from "@/lib/constants";
import type { ProductWithImages, ProductImage } from "@/lib/types";

interface ProductFormProps {
  product?: ProductWithImages;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!product;
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<ProductImage[]>(
    product?.product_images?.sort((a, b) => a.sort_order - b.sort_order) || []
  );

  // フォーム状態
  const [form, setForm] = useState({
    title: product?.title || "",
    slug: product?.slug || "",
    category: product?.category || "tractor",
    subcategory: product?.subcategory || "",
    manufacturer: product?.manufacturer || "",
    model: product?.model || "",
    horsepower: product?.horsepower?.toString() || "",
    year: product?.year?.toString() || "",
    hours: product?.hours?.toString() || "",
    tire_size: product?.tire_size || "",
    working_width: product?.working_width?.toString() || "",
    compatible_hp: product?.compatible_hp || "",
    price: product?.price?.toString() || "",
    price_type: product?.price_type || "fixed",
    description: product?.description || "",
    location: product?.location || "",
    is_own_product: product?.is_own_product ?? true,
    external_url: product?.external_url || "",
    external_source: product?.external_source || "",
    auto_steering: product?.auto_steering ?? false,
    steering_price: product?.steering_price?.toString() || "",
    steering_note: product?.steering_note || "",
    status: product?.status || "draft",
  });

  function updateField(key: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    // バリデーション
    if (!form.title || !form.slug || !form.manufacturer) {
      toast.error("必須項目を入力してください");
      setSaving(false);
      return;
    }

    const supabase = createClient();

    // slug重複チェック
    const slugQuery = supabase
      .from("products")
      .select("id")
      .eq("slug", form.slug);
    if (isEditing) {
      slugQuery.neq("id", product.id);
    }
    const { data: existing } = await slugQuery;
    if (existing && existing.length > 0) {
      toast.error("このスラッグは既に使用されています");
      setSaving(false);
      return;
    }

    const payload = {
      title: form.title,
      slug: form.slug,
      category: form.category,
      subcategory: form.subcategory || null,
      manufacturer: form.manufacturer,
      model: form.model || null,
      horsepower: form.horsepower ? Number(form.horsepower) : null,
      year: form.year ? Number(form.year) : null,
      hours: form.hours ? Number(form.hours) : null,
      tire_size: form.tire_size || null,
      working_width: form.working_width ? Number(form.working_width) : null,
      compatible_hp: form.compatible_hp || null,
      price: form.price ? Number(form.price) : null,
      price_type: form.price_type,
      description: form.description || null,
      location: form.location || null,
      is_own_product: form.is_own_product,
      external_url: form.is_own_product ? null : form.external_url || null,
      external_source: form.is_own_product
        ? null
        : form.external_source || null,
      auto_steering: form.is_own_product ? form.auto_steering : false,
      steering_price:
        form.is_own_product && form.auto_steering && form.steering_price
          ? Number(form.steering_price)
          : null,
      steering_note:
        form.is_own_product && form.auto_steering
          ? form.steering_note || null
          : null,
      status: form.status,
    };

    let productId = product?.id;

    if (isEditing) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", product.id);
      if (error) {
        toast.error("更新に失敗しました: " + error.message);
        setSaving(false);
        return;
      }
    } else {
      const { data, error } = await supabase
        .from("products")
        .insert(payload)
        .select("id")
        .single();
      if (error) {
        toast.error("登録に失敗しました: " + error.message);
        setSaving(false);
        return;
      }
      productId = data.id;
    }

    // 画像のsort_orderを更新
    for (let i = 0; i < images.length; i++) {
      await supabase
        .from("product_images")
        .update({ sort_order: i })
        .eq("id", images[i].id);
    }

    toast.success(isEditing ? "商品を更新しました" : "商品を登録しました");
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 基本情報 */}
      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">
                商品名 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="クボタ M7-172 中古トラクター"
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">
                スラッグ（URL） <span className="text-destructive">*</span>
              </Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="kubota-m7-172"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                半角英数字とハイフンのみ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>カテゴリ</Label>
              <Select
                value={form.category}
                onValueChange={(v) => updateField("category", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {form.category === "implement" && (
              <div>
                <Label>サブカテゴリ</Label>
                <Select
                  value={form.subcategory || "none"}
                  onValueChange={(v) =>
                    updateField("subcategory", v === "none" ? "" : v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="選択..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">なし</SelectItem>
                    {SUBCATEGORIES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>
                メーカー <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.manufacturer || "none"}
                onValueChange={(v) =>
                  updateField("manufacturer", v === "none" ? "" : v)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="選択..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">選択...</SelectItem>
                  {MANUFACTURERS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="model">型式</Label>
            <Input
              id="model"
              value={form.model}
              onChange={(e) => updateField("model", e.target.value)}
              placeholder="M7-172"
            />
          </div>
        </CardContent>
      </Card>

      {/* スペック */}
      <Card>
        <CardHeader>
          <CardTitle>スペック</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="horsepower">馬力 (PS)</Label>
              <Input
                id="horsepower"
                type="number"
                value={form.horsepower}
                onChange={(e) => updateField("horsepower", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="year">年式</Label>
              <Input
                id="year"
                type="number"
                value={form.year}
                onChange={(e) => updateField("year", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="hours">稼働時間</Label>
              <Input
                id="hours"
                type="number"
                value={form.hours}
                onChange={(e) => updateField("hours", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tire_size">タイヤサイズ</Label>
              <Input
                id="tire_size"
                value={form.tire_size}
                onChange={(e) => updateField("tire_size", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="working_width">作業幅 (m)</Label>
              <Input
                id="working_width"
                type="number"
                step="0.1"
                value={form.working_width}
                onChange={(e) => updateField("working_width", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="compatible_hp">適合馬力帯</Label>
              <Input
                id="compatible_hp"
                value={form.compatible_hp}
                onChange={(e) => updateField("compatible_hp", e.target.value)}
                placeholder="60-120PS"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 価格 */}
      <Card>
        <CardHeader>
          <CardTitle>価格</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>価格タイプ</Label>
              <Select
                value={form.price_type}
                onValueChange={(v) => updateField("price_type", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_TYPES.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {form.price_type !== "inquiry" && (
              <div>
                <Label htmlFor="price">価格（税込・円）</Label>
                <Input
                  id="price"
                  type="number"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="5000000"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 出品元 */}
      <Card>
        <CardHeader>
          <CardTitle>出品元</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>出品元タイプ</Label>
            <Select
              value={form.is_own_product ? "own" : "other"}
              onValueChange={(v) =>
                updateField("is_own_product", v === "own")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="own">自社品</SelectItem>
                <SelectItem value="other">他社品</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!form.is_own_product && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="external_source">他社名</Label>
                <Input
                  id="external_source"
                  value={form.external_source}
                  onChange={(e) =>
                    updateField("external_source", e.target.value)
                  }
                  placeholder="北海道農機販売"
                />
              </div>
              <div>
                <Label htmlFor="external_url">外部リンクURL</Label>
                <Input
                  id="external_url"
                  value={form.external_url}
                  onChange={(e) => updateField("external_url", e.target.value)}
                  placeholder="https://example.com/product"
                />
              </div>
            </div>
          )}

          {form.is_own_product && (
            <>
              <Separator />
              <div>
                <Label>GPS自動操舵オプション</Label>
                <Select
                  value={form.auto_steering ? "yes" : "no"}
                  onValueChange={(v) =>
                    updateField("auto_steering", v === "yes")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">非対応</SelectItem>
                    <SelectItem value="yes">対応</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.auto_steering && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="steering_price">
                      自動操舵オプション料金（円）
                    </Label>
                    <Input
                      id="steering_price"
                      type="number"
                      value={form.steering_price}
                      onChange={(e) =>
                        updateField("steering_price", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="steering_note">自動操舵の備考</Label>
                    <Input
                      id="steering_note"
                      value={form.steering_note}
                      onChange={(e) =>
                        updateField("steering_note", e.target.value)
                      }
                      placeholder="トプコン System 350 対応"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* 詳細情報 */}
      <Card>
        <CardHeader>
          <CardTitle>詳細情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">商品説明</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={6}
              placeholder="商品の状態、特徴、備考などを記入"
            />
          </div>
          <div>
            <Label htmlFor="location">所在地</Label>
            <Input
              id="location"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="十勝・帯広市"
            />
          </div>
        </CardContent>
      </Card>

      {/* 画像 */}
      <Card>
        <CardHeader>
          <CardTitle>画像</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader
            productId={product?.id}
            images={images}
            onImagesChange={setImages}
          />
        </CardContent>
      </Card>

      {/* ステータス + 保存 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>ステータス</Label>
              <Select
                value={form.status}
                onValueChange={(v) => updateField("status", v)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/products")}
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={saving}>
                {saving
                  ? "保存中..."
                  : isEditing
                    ? "更新する"
                    : "登録する"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
