"use client";

import { motion } from "motion/react";
import Image from "next/image";

const showcases = [
  {
    title: "A focused workspace for all your notes",
    description:
      "Browse notes in a clean, responsive dashboard with search, pagination, and quick access to starred items.",
    imageLight: "/screenshots/dashboard-light.png",
    imageDark: "/screenshots/dashboard-dark.png",
    alt: "Notes dashboard",
    reverse: false,
  },
  {
    title: "Write and organize without friction",
    description:
      "Create and edit notes using type-safe forms with validation, tag selection, and instant feedback.",
    imageLight: "/screenshots/note-edit-light.png",
    imageDark: "/screenshots/note-edit-dark.png",
    alt: "Create and edit note page",
    reverse: true,
  },
  {
    title: "Find anything instantly",
    description:
      "Search across all notes with debounced queries, URL-synced state, and fast filtered results.",
    imageLight: "/screenshots/search-light.png",
    imageDark: "/screenshots/search-dark.png",
    alt: "Search functionality",
    reverse: false,
  },
  {
    title: "Organize with tags, stars, and recovery",
    description:
      "Use tags to structure your notes, star important ideas, and restore deleted notes from trash anytime.",
    imageLight: "/screenshots/trash-light.png",
    imageDark: "/screenshots/trash-dark.png",
    alt: "Tags and trash management",
    reverse: true,
  },
];

export function ShowcaseSection() {
  return (
    <section className="w-full border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything your notes app should feel like
          </h2>

          <p className="mt-3 text-muted-foreground">
            From writing to organizing and recovery — every part of the
            experience is designed to be fast, clean, and predictable.
          </p>
        </div>

        {/* Blocks */}
        <div className="space-y-24">
          {showcases.map((item, index) => (
            <div
              key={item.title}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                item.reverse ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: item.reverse ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`space-y-4 text-center md:text-start ${
                  item.reverse ? "lg:col-start-2" : ""
                }`}
              >
                <h3 className="text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="text-muted-foreground max-w-md">
                  {item.description}
                </p>
              </motion.div>

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: item.reverse ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.1,
                }}
                className={`relative ${item.reverse ? "lg:col-start-1" : ""}`}
              >
                <div className="relative rounded-2xl border bg-background p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <Image
                    src={item.imageLight}
                    alt={item.alt}
                    width={1200}
                    height={800}
                    className="rounded-xl dark:hidden"
                  />

                  <Image
                    src={item.imageDark}
                    alt={item.alt}
                    width={1200}
                    height={800}
                    className="hidden rounded-xl dark:block"
                  />

                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
                </div>

                <div className="pointer-events-none absolute -inset-6 -z-10 bg-linear-to-tr from-primary/10 via-transparent to-transparent blur-2xl" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}