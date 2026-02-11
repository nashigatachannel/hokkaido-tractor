import { createClient } from "@/lib/supabase/server";
import type { ProductWithImages } from "@/lib/types";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export async function getLatestProducts(
  limit = 8
): Promise<ProductWithImages[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data as ProductWithImages[]) || [];
}

export interface ProductFilters {
  category?: string;
  manufacturer?: string;
  minHp?: number;
  maxHp?: number;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  isOwnProduct?: string;
  autoSteering?: boolean;
  search?: string;
  sort?: string;
  page?: number;
}

export async function getFilteredProducts(filters: ProductFilters): Promise<{
  products: ProductWithImages[];
  total: number;
}> {
  const supabase = await createClient();
  const page = filters.page || 1;
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("products")
    .select("*, product_images(*)", { count: "exact" })
    .eq("status", "published");

  if (filters.category) {
    query = query.eq("category", filters.category);
  }
  if (filters.manufacturer) {
    query = query.eq("manufacturer", filters.manufacturer);
  }
  if (filters.minHp) {
    query = query.gte("horsepower", filters.minHp);
  }
  if (filters.maxHp) {
    query = query.lte("horsepower", filters.maxHp);
  }
  if (filters.minPrice) {
    query = query.gte("price", filters.minPrice);
  }
  if (filters.maxPrice) {
    query = query.lte("price", filters.maxPrice);
  }
  if (filters.minYear) {
    query = query.gte("year", filters.minYear);
  }
  if (filters.maxYear) {
    query = query.lte("year", filters.maxYear);
  }
  if (filters.isOwnProduct === "own") {
    query = query.eq("is_own_product", true);
  } else if (filters.isOwnProduct === "other") {
    query = query.eq("is_own_product", false);
  }
  if (filters.autoSteering) {
    query = query.eq("auto_steering", true);
  }
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,manufacturer.ilike.%${filters.search}%,model.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
    );
  }

  // ソート
  switch (filters.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true, nullsFirst: false });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false, nullsFirst: false });
      break;
    case "hp_asc":
      query = query.order("horsepower", {
        ascending: true,
        nullsFirst: false,
      });
      break;
    case "hp_desc":
      query = query.order("horsepower", {
        ascending: false,
        nullsFirst: false,
      });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;
  return {
    products: (data as ProductWithImages[]) || [],
    total: count || 0,
  };
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithImages | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw error;
  }
  return data as ProductWithImages;
}

export async function getManufacturers(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("manufacturer")
    .eq("status", "published");

  if (error) throw error;
  const unique = [...new Set((data || []).map((d) => d.manufacturer))];
  return unique.sort();
}
