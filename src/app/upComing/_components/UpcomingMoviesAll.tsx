"use client";
import { useContext, useEffect, useState } from "react";
import { Card } from "../../_components/Card";
import axios from "axios";
import { IsDarkContext } from "@/app/_components/Provider";
import { MoviesLoader } from "@/app/_components/MoviesLoader";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGYzNDNlZmMwYjgyOTVmMDY3YTBmNDUxYzI2MDAxZSIsIm5iZiI6MTc0MzQwOTc1OC4yMjQsInN1YiI6IjY3ZWE1MjVlNzAwYTZhOTRjNmU1N2VkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bolznFYz55SDoyGnhn3fUZXtdVzZaDyl-l4SzvzDwLc";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  popularity: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
};

export type Response = {
  results: Movie[];
  total_pages: number;
};

export const UpCominMoviesAll = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [lastPage, setLastPage] = useState<number>(0);

  const { loading, setLoading } = useContext(IsDarkContext);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setLoading(true);
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setLastPage(data.total_pages);

      setMovies(data.results);

      setLoading(false);
    };
    getMoviesByAxios();
  }, [page]);

  const selectedPageNumber = [page - 1, page, page + 1].filter(
    (number) => number > 1 && lastPage > number
  );

  return (
    <div className="p-20 pt-10 pb-10 flex flex-col">
      <div className="grid grid-cols-5 grid-rows-2 gap-8 ">
        {loading ? (
          <MoviesLoader />
        ) : (
          movies.map((movie) => {
            return (
              <Link href={`/selectedMoviePage/${movie.id}`} key={movie.id}>
                <div className="cursor-pointer">
                  <Card
                    imageUrl={movie.poster_path}
                    rate={movie.vote_average}
                    movieName={movie.title}
                  />
                </div>
              </Link>
            );
          })
        )}
      </div>

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

          {selectedPageNumber.map((item, i) => {
            return (
              <PaginationItem className="cursor-pointer" key={i}>
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
    </div>
  );
};
