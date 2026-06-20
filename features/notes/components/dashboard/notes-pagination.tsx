'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { generatePagination } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {
  totalPages: number
}

export function NotesPagination({ totalPages }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            disabled={currentPage <= 1}
          />
        </PaginationItem>

        {allPages.map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageURL(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
