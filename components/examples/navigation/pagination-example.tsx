"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationExample() {
  // Example click handler
  const handleClick = () => {
    console.log("Pagination item clicked");
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Left Aligned Pagination</h3>
        <Pagination align="left">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handleClick} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={handleClick}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={handleClick} isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={handleClick}>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleClick} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Center Aligned Pagination (Default)</h3>
        <Pagination align="center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handleClick} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={handleClick}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={handleClick} isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={handleClick}>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleClick} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Right Aligned Pagination</h3>
        <Pagination align="right">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handleClick} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={handleClick}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={handleClick} isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={handleClick}>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleClick} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default PaginationExample;
