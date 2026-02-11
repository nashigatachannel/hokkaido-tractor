"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/types";

interface ImageGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">画像なし</p>
      </div>
    );
  }

  return (
    <div>
      {/* メイン画像 */}
      <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-3">
        <Image
          src={images[selectedIndex].url}
          alt={`${title} - 画像${selectedIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* サムネイル */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                idx === selectedIndex
                  ? "border-green-600"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={img.url}
                alt={`${title} - サムネイル${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
