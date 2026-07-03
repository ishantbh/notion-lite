"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { loginDemoUser } from "../server/login-demo-user";

export function DemoSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { refetch } = authClient.useSession();

  async function handleDemoSignIn() {
    setIsLoading(true);

    const res = await loginDemoUser();

    if (res?.error) {
      toast.error(res.error);
      setIsLoading(false);
      return;
    }

    toast.success("Sign in successful");

    // loginAction runs on server and does not update client session so,
    // we need to manually update client session
    await refetch();

    router.replace("/dashboard");
  }

  return (
    <Button
      type="button"
      disabled={isLoading}
      onClick={handleDemoSignIn}
      variant="secondary"
      className="grow"
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Signing in...</span>
        </>
      ) : (
        <span>Sign In with Demo User</span>
      )}
    </Button>
  );
}
