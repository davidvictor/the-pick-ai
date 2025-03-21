import { Skeleton } from "@/components/ui/skeleton"
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

export function BetHistoryTableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><Skeleton className="h-5 w-16" /></TableHead>
            <TableHead><Skeleton className="h-5 w-20" /></TableHead>
            <TableHead><Skeleton className="h-5 w-24" /></TableHead>
            <TableHead><Skeleton className="h-5 w-24" /></TableHead>
            <TableHead><Skeleton className="h-5 w-28" /></TableHead>
            <TableHead><Skeleton className="h-5 w-16" /></TableHead>
            <TableHead><Skeleton className="h-5 w-20" /></TableHead>
            <TableHead><Skeleton className="h-5 w-20" /></TableHead>
            <TableHead><Skeleton className="h-5 w-20" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5).fill(0).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton className="h-5 w-24" /></TableCell>
              <TableCell><Skeleton className="h-5 w-16" /></TableCell>
              <TableCell><Skeleton className="h-5 w-40" /></TableCell>
              <TableCell><Skeleton className="h-5 w-20" /></TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </TableCell>
              <TableCell><Skeleton className="h-5 w-8" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-5 w-24" /></TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination Skeleton */}
      <div className="py-4 border-t">
        <Pagination className="justify-center md:justify-end">
          <PaginationContent>
            <PaginationItem>
              <Skeleton className="h-10 w-10 rounded-md" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-10 w-10 rounded-md" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-10 w-10 rounded-md" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-10 w-10 rounded-md" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-10 w-10 rounded-md" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
