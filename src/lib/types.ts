export type ProductCategory = "tractor" | "implement";

export type ProductSubcategory =
  | "plow"
  | "harrow"
  | "rotary"
  | "seeder"
  | "sprayer"
  | "mower"
  | "baler"
  | "loader"
  | "other";

export type PriceType = "fixed" | "negotiable" | "inquiry";
export type ProductStatus = "draft" | "published" | "sold";

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  subcategory: ProductSubcategory | null;
  manufacturer: string;
  model: string | null;
  horsepower: number | null;
  year: number | null;
  hours: number | null;
  tire_size: string | null;
  working_width: number | null;
  compatible_hp: string | null;
  price: number | null;
  price_type: PriceType;
  description: string | null;
  location: string | null;
  is_own_product: boolean;
  external_url: string | null;
  external_source: string | null;
  auto_steering: boolean;
  steering_price: number | null;
  steering_note: string | null;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  sort_order: number;
  created_at: string;
}

export interface ProductWithImages extends Product {
  product_images: ProductImage[];
}

export interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "editor";
  created_at: string;
}
