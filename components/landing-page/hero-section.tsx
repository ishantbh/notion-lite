"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const { data: session } = authClient.useSession();

  return (
    <section className="w-full border-b">
      {/* Subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-primary/10 dark:bg-primary/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-8 text-center md:text-start lg:pb-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Organize your ideas with a modern full-stack notes app
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground">
              Create, organize, search, and manage your notes with tags,
              starring, and soft-delete support. Built with Next.js and a modern
              React ecosystem to showcase production-inspired full-stack
              development.
            </p>

            {/* CTA */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center md:justify-start">
              {session ? (
                <Button size="lg" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>

                  <Button variant="outline" size="lg" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Microcopy */}
            <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground md:items-start">
              <div className="flex items-center gap-2">
                <CheckIcon className="size-4 text-primary" />
                <span>Secure authentication with Better Auth</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="size-4 text-primary" />
                <span>Fast search, tags, starring, and soft delete</span>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.1,
            }}
            className="relative"
          >
            <div className="relative rounded-2xl border bg-background p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Image
                src="/screenshots/dashboard-light.png"
                alt="Notes application dashboard"
                width={1200}
                height={800}
                className="rounded-xl dark:hidden"
                priority
                loading="eager"
              />

              <Image
                src="/screenshots/dashboard-dark.png"
                alt="Notes application dashboard"
                width={1200}
                height={800}
                className="hidden rounded-xl dark:block"
                priority
                loading="eager"
              />

              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
            </div>

            <div className="pointer-events-none absolute -inset-4 -z-10 bg-linear-to-tr from-primary/10 via-transparent to-transparent blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
