"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../../_components/UpcomingMovies";
import { useParams } from "next/navigation";
import { MoviesLoader } from "../../_components/MoviesLoader";
import Link from "next/link";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IsDarkContext } from "../../_components/Provider";
import { Card } from "@/app/_components/Card";

type ParamsType = {
  id: string;
};

type Movie = {
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
type Response = {
  results: Movie[];
  total_pages: number;
};

export default function MoreLikeThis() {
  const { id } = useParams<ParamsType>();
  const [page, setPage] = useState(1);
  const { loading, setLoading } = useContext(IsDarkContext);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [lastPage, setLastPage] = useState<number>(0);

  useEffect(() => {
    const getSimilarMovie = async () => {
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      console.log(data);

      setLastPage(data.total_pages);

      setMovies(data.results);

      setLoading(false);
    };
    getSimilarMovie();
  }, [page]);

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
  const selectedPageNumber = [page - 1, page, page + 1].filter(
    (number) => number > 1 && lastPage > number
  );

  return (
    <div className="flex justify-center">
      <div className="w-[1440px]">
        <div className="p-20 pt-10 pb-10 flex flex-col ">
          <div className="grid grid-cols-5 grid-rows-2 gap-8">
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
        </div>
      </div>
    </div>
  );
}
