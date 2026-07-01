"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  withTitle?: boolean;
};

export function LogoutButton({ withTitle = false }: Props) {
  const router = useRouter();

  const queryClient = useQueryClient();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.clear();
          toast.success("Logout successful");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  }

  return (
    <Button
      variant="destructive"
      size={withTitle ? "sm" : "icon"}
      onClick={handleLogout}
    >
      <LogOutIcon className="size-4" />
      <span className={cn({ "sr-only": !withTitle })}>Logout</span>
    </Button>
  );
}
