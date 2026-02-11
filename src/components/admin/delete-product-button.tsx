"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteProductButtonProps {
  productId: string;
  productTitle: string;
}

export function DeleteProductButton({
  productId,
  productTitle,
}: DeleteProductButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      toast.error("削除に失敗しました");
      setDeleting(false);
      return;
    }

    toast.success("商品を削除しました");
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>商品を削除しますか？</DialogTitle>
          <DialogDescription>
            「{productTitle}」を削除します。この操作は取り消せません。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            キャンセル
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "削除中..." : "削除する"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
