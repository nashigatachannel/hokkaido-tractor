import { NextRequest, NextResponse } from "next/server";
import { getFilteredProducts, type ProductFilters } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const filters: ProductFilters = {
    category: sp.get("category") || undefined,
    manufacturer: sp.get("manufacturer") || undefined,
    minHp: sp.get("minHp") ? Number(sp.get("minHp")) : undefined,
    maxHp: sp.get("maxHp") ? Number(sp.get("maxHp")) : undefined,
    minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    minYear: sp.get("minYear") ? Number(sp.get("minYear")) : undefined,
    maxYear: sp.get("maxYear") ? Number(sp.get("maxYear")) : undefined,
    isOwnProduct: sp.get("isOwnProduct") || undefined,
    autoSteering: sp.get("autoSteering") === "true" || undefined,
    search: sp.get("search") || undefined,
    sort: sp.get("sort") || undefined,
    page: sp.get("page") ? Number(sp.get("page")) : 1,
  };

  try {
    const result = await getFilteredProducts(filters);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { products: [], total: 0, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
