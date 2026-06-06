import { clsx, type ClassValue } from 'clsx'
import { formatDistanceToNowStrict, type FormatDistanceToken } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatToken = (token: FormatDistanceToken, count: number): string => {
  const map: Record<FormatDistanceToken, string> = {
    lessThanXSeconds: `${count}s`,
    xSeconds: `${count}s`,
    halfAMinute: '30s',
    lessThanXMinutes: `${count}m`,
    xMinutes: `${count}m`,
    aboutXHours: `${count}h`,
    xHours: `${count}h`,
    xDays: `${count}d`,
    xWeeks: `${count}w`,
    aboutXWeeks: `${count}w`,
    aboutXMonths: `${count}mo`,
    xMonths: `${count}mo`,
    aboutXYears: `${count}y`,
    xYears: `${count}y`,
    overXYears: `${count}y`,
    almostXYears: `${count}y`,
  }
  return `${map[token]} ago`
}

export function formatDate(date: Date): string {
  if (isNaN(date.getTime())) return ''
  return formatDistanceToNowStrict(date, {
    addSuffix: false,
    locale: { formatDistance: formatToken },
  })
}
