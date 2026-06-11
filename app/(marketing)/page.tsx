import { Header } from '@/components/header'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export default function Page() {
  return (
    <div className='w-full'>
      <Header />

      <div>
        <h1 className='text-2xl font-bold'>Notion Lite</h1>
        <ThemeToggle />
      </div>
    </div>
  )
}
