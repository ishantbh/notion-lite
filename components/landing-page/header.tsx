"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { MenuIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../theme/theme-toggle";
import { LogoutButton } from "../logout-button";

export function Header() {
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="block text-lg sm:text-xl font-semibold">
          Notion Lite
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link
            href="#how-it-works"
            className="hover:text-foreground transition"
          >
            How it works
          </Link>

          <Link href="#features" className="hover:text-foreground transition">
            Value
          </Link>

          <Link href="#showcase" className="hover:text-foreground transition">
            Showcase
          </Link>

          <Link href="#tech-stack" className="hover:text-foreground transition">
            Tech Stack
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 md:flex">
            {!isPending &&
              (session ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>

                  <LogoutButton />
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">Sign in</Link>
                  </Button>

                  <Button size="sm" asChild>
                    <Link href="/sign-up">Get started</Link>
                  </Button>
                </>
              ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t bg-background md:hidden"
        >
          <div className="flex flex-col gap-4 px-6 py-4 text-sm">
            <Link href="#how-it-works" onClick={() => setOpen(false)}>
              How it works
            </Link>

            <Link href="#features" onClick={() => setOpen(false)}>
              Value
            </Link>

            <Link href="#showcase" onClick={() => setOpen(false)}>
              Showcase
            </Link>

            <Link href="#tech-stack" onClick={() => setOpen(false)}>
              Tech Stack
            </Link>

            <div className="flex gap-2 pt-2 items-center justify-center">
              {!isPending &&
                (session ? (
                  <>
                    <Button variant="default" size="sm" asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>

                    <LogoutButton withTitle />
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/login">Sign in</Link>
                    </Button>

                    <Button size="sm" asChild>
                      <Link href="/sign-up">Get started</Link>
                    </Button>
                  </>
                ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
