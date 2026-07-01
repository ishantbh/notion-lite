'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { CheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className='relative w-full overflow-hidden border-b'>
      <div className='mx-auto max-w-4xl px-6 py-20 text-center lg:py-24'>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='space-y-6'
        >
          {/* Heading */}
          <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
            Start organizing your notes better
          </h2>

          {/* Subtext */}
          <p className='mx-auto max-w-xl text-muted-foreground'>
            A fast, modern notes app built to demonstrate real-world full-stack
            development with authentication, tagging, search, and a clean UI.
          </p>

          {/* CTA buttons */}
          <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Button size='lg' asChild>
              <Link href='/signup'>Get Started</Link>
            </Button>

            <Button variant='outline' size='lg' asChild>
              <Link href='/login'>Sign In</Link>
            </Button>
          </div>

          {/* Microcopy */}
          <div className='flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-2'>
            <div className='flex items-center gap-2'>
              <CheckIcon className='size-4 text-primary' />
              <span>Secure authentication</span>
            </div>

            <span className='hidden sm:block'>•</span>

            <div className='flex items-center gap-2'>
              <CheckIcon className='size-4 text-primary' />
              <span>Free portfolio project</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}