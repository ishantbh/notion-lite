"use client";

import { motion } from "motion/react";
import { NotebookPenIcon, TagsIcon, SearchIcon } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create your first note",
    description:
      "Sign up, create a note, and capture your ideas with a clean writing experience powered by reusable, type-safe forms.",
    icon: NotebookPenIcon,
  },
  {
    number: "02",
    title: "Organize everything",
    description:
      "Group notes with tags, star important ones, and browse dedicated pages to keep your workspace organized.",
    icon: TagsIcon,
  },
  {
    number: "03",
    title: "Find what you need",
    description:
      "Search instantly, edit notes at any time, and restore deleted notes from the trash whenever needed.",
    icon: SearchIcon,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>

          <p className="mt-3 text-muted-foreground">
            Capture ideas, organize your workspace, and always know where your
            notes are.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="group rounded-xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/5 hover:shadow-md"
              >
                {/* Icon + Number */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/40">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-sm font-medium text-muted-foreground">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}