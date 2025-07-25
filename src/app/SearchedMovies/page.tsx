"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { GenreCard } from "../MovieGenrePage/_components/GenreCard";
import {
  GenreMovies,
  GenresFromData,
  MovieGenres,
} from "../MovieGenrePage/page";
import Link from "next/link";
import { ACCESS_TOKEN } from "../_components/UpcomingMovies";
import { Arrow } from "@/app/MovieGenrePage/assets/Arrow";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type SearchedMovieType = {
  results: GenreMovies[];
  total_results: number;
};

export default function SearchedMovies() {
  const searchParam = useSearchParams();
  const searchValue = searchParam.get("searchValue") || 0;

  const searchParamm = useSearchParams();
  const genreID = searchParamm.get("genre") || 0;

  const [searchedMovies, setSearchedMovies] = useState<GenreMovies[]>([]);
  const [genres, setGenres] = useState<GenresFromData[]>([]);
  const [page, setPage] = useState(1);

  const [lastPage, setLastPage] = useState<number>(0);

  useEffect(() => {
    const getMoviesGenre = async () => {
      const { data } = await axios.get<MovieGenres>(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
      );
      setGenres(data.genres);
    };
    getMoviesGenre();
  }, []);

  useEffect(() => {
    const getSearchedMovie = async () => {
      const { data } = await axios.get<SearchedMovieType>(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${page}`
      );
      setSearchedMovies(data.results);
      setLastPage(data.total_results);
    };
    getSearchedMovie();
  }, [searchValue, page]);

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
  console.log(searchedMovies.length);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col p-6 gap-8">
        <div className="text-3xl font-semibold">Search filter</div>
        <div className="flex w-[1280px] justify-between">
          <div className="w-[80%] h-fit text-2xl font-semibold flex flex-col gap-y-6 border-r-2 ">
            {searchedMovies.length} results for "{searchValue}"
            {searchedMovies.length === 0 && (
              <div className="w-full flex justify-center text-2xl font-light">
                No results
              </div>
            )}
            <div className="grid grid-cols-4 gap-12 w-full pr-2.5">
              {searchedMovies.map((item) => {
                return (
                  <Link href={`/selectedMoviePage/${item.id}`} key={item.id}>
                    <div className=" h-fit" key={item.id}>
                      <GenreCard
                        imageUrl={`${item.poster_path}`}
                        rate={item.vote_average}
                        movieName={item.title}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="w-full flex justify-end">
              {searchedMovies.length > 3 && (
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
                              backgroundColor:
                                item === page ? "#CFCFCF" : "#FFFFFF",
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
                          backgroundColor:
                            page === lastPage ? "#CFCFCF" : "#FFFFFF",
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
              )}
            </div>
          </div>
          <div className=" flex flex-col gap-5 w-[40%] pl-4">
            <div className="w-full">
              <p className="w-fit h-fit text-3xl font-semibold">Genres</p>
              <p className="w-fit">See lists of movies by genre</p>
            </div>
            <div className="flex flex-wrap pl-0 w-[400px] gap-x-1.5">
              {genres.map((item) => {
                return (
                  <Link href={`/MovieGenrePage?genre=${item.id}`} key={item.id}>
                    <div className="flex w-fit h-fit p-1.5 ">
                      <button
                        key={item.id}
                        className="flex  w-fit border-[1px] rounded-2xl p-2 py-1 items-center gap-1 border-[#E4E4E7] cursor-pointer hover:bg-[#EFEFEF]"
                        style={
                          genreID == item.id
                            ? { backgroundColor: "black", color: "white" }
                            : {}
                        }
                      >
                        {item.name}
                        {genreID == item.id ? (
                          <Arrow color={"white"} />
                        ) : (
                          <Arrow color={"black"} />
                        )}
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
