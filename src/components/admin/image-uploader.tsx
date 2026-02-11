"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import {
  MAX_IMAGE_SIZE,
  MAX_IMAGES_PER_PRODUCT,
  ACCEPTED_IMAGE_TYPES,
} from "@/lib/constants";
import type { ProductImage } from "@/lib/types";

interface ImageUploaderProps {
  productId?: string;
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
}

export function ImageUploader({
  productId,
  images,
  onImagesChange,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > MAX_IMAGES_PER_PRODUCT) {
      toast.error(`画像は最大${MAX_IMAGES_PER_PRODUCT}枚までです`);
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const newImages: ProductImage[] = [];

    for (const file of Array.from(files)) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast.error(`${file.name}: JPEG/PNG/WebPのみ対応しています`);
        continue;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`${file.name}: ファイルサイズは5MB以下にしてください`);
        continue;
      }

      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const filePath = productId
        ? `${productId}/${fileName}`
        : `temp/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) {
        toast.error(`${file.name}: アップロードに失敗しました`);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(filePath);

      // DBに画像レコードを作成（productIdがある場合）
      if (productId) {
        const { data: imgData, error: dbError } = await supabase
          .from("product_images")
          .insert({
            product_id: productId,
            url: publicUrl,
            sort_order: images.length + newImages.length,
          })
          .select()
          .single();

        if (dbError) {
          toast.error("画像の登録に失敗しました");
          continue;
        }
        newImages.push(imgData as ProductImage);
      } else {
        // 新規商品の場合はURLのみ保持（保存時にDBに登録）
        newImages.push({
          id: `temp-${Date.now()}-${Math.random()}`,
          product_id: "",
          url: publicUrl,
          sort_order: images.length + newImages.length,
          created_at: new Date().toISOString(),
        });
      }
    }

    onImagesChange([...images, ...newImages]);
    setUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleRemoveImage(index: number) {
    const image = images[index];
    const supabase = createClient();

    // DBから削除（一時IDでない場合）
    if (!image.id.startsWith("temp-")) {
      await supabase.from("product_images").delete().eq("id", image.id);
    }

    const updated = images.filter((_, i) => i !== index);
    onImagesChange(updated);
    toast.success("画像を削除しました");
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {images.map((img, idx) => (
          <div key={img.id} className="relative group">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={img.url}
                alt={`画像${idx + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveImage(idx)}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {idx + 1}枚目
            </p>
          </div>
        ))}

        {images.length < MAX_IMAGES_PER_PRODUCT && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
          >
            {uploading ? (
              <span className="text-xs">アップロード中...</span>
            ) : (
              <>
                <Upload className="h-6 w-6" />
                <span className="text-xs">画像を追加</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-muted-foreground">
        JPEG / PNG / WebP（最大5MB/枚、最大{MAX_IMAGES_PER_PRODUCT}枚）
      </p>
    </div>
  );
}
