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

export const NOTES_PER_PAGE = 6

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage < 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}
