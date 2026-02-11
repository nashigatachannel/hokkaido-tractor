"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SITE_NAME } from "@/lib/constants";

const navLinks = [
  { href: "/products?category=tractor", label: "トラクター" },
  { href: "/products?category=implement", label: "作業機" },
  { href: "/about", label: "会社概要" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Tractor className="h-8 w-8 text-green-600" />
          <span className="text-lg font-bold">{SITE_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/products">
            <Button variant="default" size="sm">
              全商品を見る
            </Button>
          </Link>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/products" onClick={() => setOpen(false)}>
                <Button className="w-full">全商品を見る</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
