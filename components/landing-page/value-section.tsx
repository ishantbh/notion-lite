'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { LockIcon, TagsIcon, SearchIcon, ZapIcon } from 'lucide-react'

const values = [
  {
    title: 'Secure authentication built-in',
    description:
      'Protected routes, login, and signup powered by Better Auth with clean session handling.',
    icon: LockIcon,
  },
  {
    title: 'Organize with tags & starred notes',
    description:
      'Group notes using a many-to-many tag system and quickly access important notes.',
    icon: TagsIcon,
  },
  {
    title: 'Instant search & pagination',
    description:
      'Debounced search with URL-synced state and paginated queries for fast navigation.',
    icon: SearchIcon,
  },
  {
    title: 'Optimistic & responsive UI',
    description:
      'Star notes instantly with optimistic updates and experience smooth UI feedback everywhere.',
    icon: ZapIcon,
  },
]

export function ValueSection() {
  return (
    <section id='features' className='w-full border-b'>
      <div className='mx-auto max-w-6xl px-6 py-20 lg:py-24'>
        <div className='grid items-center gap-12 lg:grid-cols-2 text-center md:text-start'>
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='space-y-8'
          >
            <div className='space-y-4'>
              <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
                Built like a production-grade application
              </h2>

              <p className='text-muted-foreground max-w-xl'>
                This notes app goes beyond CRUD. It demonstrates authentication,
                caching, optimistic updates, reusable forms, and a scalable data
                model with tags and soft deletion.
              </p>
            </div>

            {/* Value points */}
            <div className='space-y-5'>
              {values.map((item, index) => {
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: 'easeOut',
                    }}
                    className='flex items-start gap-4'
                  >
                    <div className='flex h-10 w-10 items-center justify-center rounded-lg border bg-background'>
                      <Icon className='h-5 w-5' />
                    </div>

                    <div>
                      <h3 className='text-sm font-semibold'>{item.title}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='relative'
          >
            <div className='relative rounded-2xl border bg-background p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
              <Image
                src='/screenshots/note-details-light.png'
                alt='Note details page'
                width={1200}
                height={800}
                className='rounded-xl dark:hidden'
                priority
                loading='eager'
              />

              <Image
                src='/screenshots/note-details-dark.png'
                alt='Note details page'
                width={1200}
                height={800}
                className='rounded-xl hidden dark:block'
                priority
                loading='eager'
              />

              <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5' />
            </div>

            <div className='pointer-events-none absolute -inset-6 -z-10 bg-linear-to-tr from-primary/10 via-transparent to-transparent blur-2xl' />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
