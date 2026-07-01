import Link from 'next/link'

export function Footer() {
  return (
    <footer className='w-full'>
      <div className='mx-auto max-w-6xl px-6 pt-12'>

        <div className='grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4 sm:text-start'>

          {/* Brand */}
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold'>Notes App</h3>

            <p className='text-sm text-muted-foreground'>
              A full-stack notes application built with Next.js, Better Auth,
              Drizzle ORM, and PostgreSQL. Designed to demonstrate modern React
              architecture and UI patterns.
            </p>
          </div>

          {/* Product */}
          <div className='space-y-3'>
            <h4 className='text-sm font-medium'>Product</h4>

            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <Link href='#how-it-works'>How it works</Link>
              </li>
              <li>
                <Link href='#features'>Features</Link>
              </li>
              <li>
                <Link href='#showcase'>Showcase</Link>
              </li>
              <li>
                <Link href='#tech-stack'>Tech Stack</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className='space-y-3'>
            <h4 className='text-sm font-medium'>Resources</h4>

            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <a
                  href='https://github.com/ishantbh/notion-lite'
                  target='_blank'
                  rel='noreferrer'
                >
                  GitHub
                </a>
              </li>

              <li>
                <a
                  href='https://github.com/ishantbh/notion-lite/blob/main/README.md'
                  target='_blank'
                  rel='noreferrer'
                >
                  Documentation
                </a>
              </li>

              <li>
                <Link href='#'>Support</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className='space-y-3'>
            <h4 className='text-sm font-medium'>Contact</h4>

            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <a
                  href='https://www.linkedin.com/in/ishant-bhurani/'
                  target='_blank'
                  rel='noreferrer'
                >
                  LinkedIn
                </a>
              </li>

              <li>
                <a href='mailto:ishant.dev@outlook.com'>
                  Email
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className='my-10 text-center flex flex-col items-center justify-center gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row'>
          <p>
            © {new Date().getFullYear()} Ishant Bhurani. Built as a portfolio project.
          </p>
        </div>

      </div>
    </footer>
  )
}