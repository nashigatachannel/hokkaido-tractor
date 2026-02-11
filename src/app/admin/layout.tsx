import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `管理画面 | ${SITE_NAME}`,
    template: `%s | 管理画面 | ${SITE_NAME}`,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
