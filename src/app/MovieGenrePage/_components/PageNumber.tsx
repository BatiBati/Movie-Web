"use client";

import {
  PaginationContent,
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

type Pages = {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
};

export const PageNumber = ({ page, setPage, lastPage }: Pages) => {
  const selectedPageNumber = [page - 1, page, page + 1].filter(
    (number) => number > 1 && lastPage > number
  );

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePage = (page: number) => {
    setPage(page);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={handlePrev} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              handlePage(1);
            }}
            style={{
              backgroundColor: page === 1 ? "#CFCFCF" : "#FFF",
              color: page === 1 ? "#FFFFFF" : "black",
            }}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {selectedPageNumber.map((item, index) => {
          return (
            <PaginationItem className="cursor-pointer" key={index}>
              <PaginationLink
                onClick={() => {
                  handlePage(item);
                }}
                style={{
                  backgroundColor: item === page ? "#CFCFCF" : "#FFFFFF",
                  color: item === page ? "#FFFFFF" : "black",
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {page !== lastPage &&
        page + 1 !== lastPage - 1 &&
        page !== lastPage - 1 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          ""
        )}

        <PaginationItem className="cursor-pointer">
          <PaginationLink
            onClick={() => {
              handlePage(lastPage);
            }}
            style={{
              backgroundColor: page === lastPage ? "#CFCFCF" : "#FFFFFF",
              color: page === lastPage ? "#FFFFFF" : "black",
            }}
          >
            {lastPage}
          </PaginationLink>
        </PaginationItem>
        {lastPage === selectedPageNumber.length - 1 ? (
          ""
        ) : (
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
