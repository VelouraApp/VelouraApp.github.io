
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationComponentProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(currentPage - 1)} 
              className="cursor-pointer"
              aria-label="Pagina anterioară"
            />
          </PaginationItem>
        )}

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink 
                isActive={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationLink 
              onClick={() => handlePageChange(totalPages)}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(currentPage + 1)} 
              className="cursor-pointer"
              aria-label="Pagina următoare"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
