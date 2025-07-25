"use client";

import { MoonIcon, SearchIcon } from "lucide-react";
import { MovieLogo } from "./assets/MovieLogo";
import { Button } from "./assets/ui/button";
import { Input } from "@/app/_components/assets/ui/input";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IsDarkContext } from "./Provider";
import axios from "axios";
import { ACCESS_TOKEN } from "../upComing/_components/UpcomingMoviesAll";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RightArrow } from "./assets/RightArrow";
import { Arrow } from "../MovieGenrePage/assets/Arrow";
import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { YellowStar } from "./assets/YellowStar";

type JumpToHomePage = {
  href: string;
};
export type MovieGenres = {
  genres: GenresFromData[];
};

type GenresFromData = {
  id: number;
  name: string;
};

export type MappedSearchValueType = {
  results: SearchValueType[];
};

export type SearchValueType = {
  id: number;
  original_title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
};

export type JumpToSearchedPage = {
  searchedValue: SearchValueType[];
};

export const Header = ({ href }: JumpToHomePage) => {
  const { isDark } = useContext(IsDarkContext);
  const { setIsDark } = useContext(IsDarkContext);
  const [genre, setGenre] = useState<GenresFromData[]>([]);
  const searchParam = useSearchParams();
  const searchValueId = searchParam.get("genre") || 0;
  const [searchValue, setSearchValue] = useState("");
  const [searchedValue, setSearchedValue] = useState<SearchValueType[]>([]);

  useEffect(() => {
    const getMoviesGenre = async () => {
      const { data } = await axios.get<MovieGenres>(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setGenre(data.genres);
    };
    getMoviesGenre();
  }, []);

  useEffect(() => {
    const getSearchMovie = async () => {
      const { data } = await axios.get<MappedSearchValueType>(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setSearchedValue(data.results);
    };
    getSearchMovie();
  }, [searchValue]);
  const handleEventChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="flex items-center justify-center w-full h-[59px] mt-7  pt-0 pb-0 ">
      <div className=" flex  justify-between w-[1280px] h-9">
        <Link href={href}>
          <div className="flex items-center gap-2 ">
            <MovieLogo stroke={"#4338CA"} width={20} height={20} />
            <span className="text-[#4338CA] font-bold ">Movie Z</span>
          </div>
        </Link>
        <div className="flex gap-4 h-full relative">
          <div className="flex flex-col gap-3 ">
            <Popover>
              <div>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    <div className="rotate-90">
                      <RightArrow />
                    </div>
                    Genre
                  </Button>
                </PopoverTrigger>
                <div className="w-fit h-fit">
                  <PopoverContent className="w-fit ">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Genres</h4>
                        <p className="text-sm text-muted-foreground">
                          See lists of movies by genre
                        </p>
                      </div>
                      <div className="border-[1px] border-solid"></div>
                      <div className="grid grid-cols-5 gap-3 ">
                        {genre.map((item) => {
                          return (
                            <Link
                              href={`/MovieGenrePage?genre=${item.id}`}
                              key={item.id}
                            >
                              <button
                                className="flex w-fit border-[1px] rounded-2xl p-2 py-0 items-center gap-1 border-[#E4E4E7] cursor-pointer hover:bg-[#EFEFEF]"
                                style={
                                  searchValueId == item.id
                                    ? {
                                      backgroundColor: "black",
                                      color: "white",
                                    }
                                    : {}
                                }
                              >
                                {item.name}
                                {genre ? (
                                  <Arrow color={"white"} />
                                ) : (
                                  <Arrow color={"black"} />
                                )}
                              </button>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </PopoverContent>
                </div>
              </div>
            </Popover>
          </div>

          <div className="flex items-center relative w-[500px] p-3">
            <div className="p-1">
              <SearchIcon width={20} height={20} />
            </div>

            <Input
              type="search"
              placeholder="Search..."
              className="absolute w-full pl-7"
              onChange={handleEventChange}
            />
          </div>

          {searchValue.length === 0 ? (
            ""
          ) : (
            <div className="bg-[#f3f3f4] rounded-2xl w-[650px] h-fit max-h-[700px]  absolute left-0.5 top-10 z-20 p-3 flex flex-col dark:bg-black">
              <div className="overflow-y-auto">
                <div className="w-full flex justify-center">
                  {searchedValue.length === 0 && "No results"}
                </div>
                {searchedValue.slice(0, 7).map((movie) => {
                  return (
                    <div
                      className="w-full h-[116px] border-b-2 flex p-2 gap-4"
                      key={movie.id}
                    >
                      <div className="w-[70px] rounded-[8px] overflow-hidden">
                        <img
                          className="w-[67px] h-[100px]"
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.original_title}
                        />
                      </div>
                      <div className="w-[90%] h-full flex flex-col justify-between">
                        <div>
                          <span className="text-[20px] font-semibold">
                            {movie.original_title}
                          </span>
                          <div className="flex items-center text-[14px] font-medium gap-0.5">
                            <YellowStar width={16} height={16} />
                            {movie.vote_average.toFixed(1)}{" "}
                            <span className="text-[12px] font-normal opacity-30 dark:text-white dark:opacity-50">
                              /10
                            </span>
                          </div>
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="text-[14px] font-medium">
                            {movie.release_date &&
                              movie.release_date.slice(0, 4)}
                          </div>
                          <div>
                            <Link href={`/selectedMoviePage/${movie.id}`}>
                              <Button
                                variant={"outline"}
                                className="cursor-pointer"
                              >
                                See more <RightArrow />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href={`/SearchedMovies?searchValue=${searchValue}`}>
                <div className="px-4 py-2 text-[14px] font-normal">
                  See all results for "{searchValue}"
                </div>
              </Link>
            </div>
          )}
        </div>
        <Button
          size="icon"
          variant="outline"
          className="hover:cursor-pointer"
          onClick={() => {
            setIsDark(!isDark);
          }}
        >
          <MoonIcon />
        </Button>
      </div>
    </div>
  );
};
