"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function loginDemoUser() {
  try {
    await auth.api.signInEmail({
      body: {
        email: process.env.DEMO_USER_EMAIL!,
        password: process.env.DEMO_USER_PASSWORD!,
        rememberMe: true,
      },
      headers: await headers(),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to sign in" };
  }
}
