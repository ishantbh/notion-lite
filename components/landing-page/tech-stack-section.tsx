"use client";

import { motion } from "motion/react";

const stack = [
  {
    category: "Framework",
    items: [
      {
        name: "Next.js",
        description: "App Router, Server Actions, and full-stack capabilities",
      },
    ],
  },
  {
    category: "Authentication",
    items: [
      {
        name: "Better Auth",
        description: "Secure sessions, protected routes, and auth flows",
      },
    ],
  },
  {
    category: "Database",
    items: [
      {
        name: "PostgreSQL",
        description: "Relational database for notes and tag relationships",
      },
      {
        name: "Drizzle ORM",
        description: "Type-safe queries and schema management",
      },
    ],
  },
  {
    category: "Data Fetching",
    items: [
      {
        name: "TanStack Query",
        description: "Caching, background refetching, and server state sync",
      },
    ],
  },
  {
    category: "Forms & Validation",
    items: [
      {
        name: "React Hook Form",
        description: "Performant and reusable form handling",
      },
      {
        name: "Zod",
        description: "Schema validation with full type safety",
      },
    ],
  },
  {
    category: "UI & Styling",
    items: [
      {
        name: "Tailwind CSS",
        description: "Utility-first styling system",
      },
      {
        name: "shadcn/ui",
        description: "Reusable accessible UI components",
      },
    ],
  },
];

export function TechStackSection() {
  return (
    <section id='tech-stack' className="w-full border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Built with a modern TypeScript stack
          </h2>

          <p className="mt-3 text-muted-foreground">
            A carefully chosen set of tools focused on type safety, performance,
            and scalability.
          </p>
        </div>

        {/* Stack grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="rounded-xl border bg-background p-6"
            >
              <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {section.category}
              </h3>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.name}>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}