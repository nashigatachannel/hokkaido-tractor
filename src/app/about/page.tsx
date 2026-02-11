import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `会社概要 | ${SITE_NAME}`,
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">会社概要</h1>

      <div className="space-y-6 text-muted-foreground">
        <p>
          このページは入社後に会社情報が確定次第、更新される予定です。
        </p>

        <div className="bg-muted/50 rounded-lg p-6 space-y-3">
          <InfoRow label="会社名" value="（入社後に確定）" />
          <InfoRow label="所在地" value="北海道" />
          <InfoRow label="事業内容" value="中古農機の売買、GPS自動操舵システムの販売・取付" />
          <InfoRow label="古物商許可" value="取得済み" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-3">
            お問い合わせ
          </h2>
          <p>
            商品に関するお問い合わせは、各商品ページからお問い合わせいただくか、
            下記までご連絡ください。
          </p>
          <p className="mt-2">
            メール: <span className="text-foreground">（入社後に設定）</span>
          </p>
          <p>
            電話: <span className="text-foreground">（入社後に設定）</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-sm font-medium text-foreground w-28 shrink-0">
        {label}
      </span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
