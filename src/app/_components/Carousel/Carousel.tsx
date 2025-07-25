"use client";
import { useContext, useEffect, useState } from "react";
import { DownArrow } from "../assets/DownArrow";
import { YellowStar } from "../assets/YellowStar";
import { Button } from "../assets/ui/button";
import {
  ACCESS_TOKEN,
  Movie,
  Response,
} from "../../upComing/_components/UpcomingMoviesAll";
import axios from "axios";
import { IsDarkContext } from "../Provider";
import { Skeleton } from "../assets/ui/skeleton";
import { GetTrailerApi } from "./_components/GetTrailerApi";

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, setLoading } = useContext(IsDarkContext);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setLoading(true);
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
      setLoading(false);
    };

    getMoviesByAxios();
  }, []);

  const handleClick = (index: number) => () => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        return newIndex === 5 ? 0 : newIndex;
      });
    }, 6000);
  }, []);
  return (
    <div className="w-full h-[600px] overflow-hidden">
      {loading ? (
        <Skeleton className="w-full h-full bg-[#e4e4e5]" />
      ) : (
        <div
          className="w-[500%] h-full f-full flex "
          style={{
            transition: "1000ms",
            transform: `translateX(calc(-${currentIndex}00%/5))`,
          }}
        >
          {movies.slice(0, 5).map((movie, index) => {
            return (
              <div
                className="w-[100%] relative flex items-center rounded-md overflow-hidden"
                key={movie.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className="w-full h-full "
                />

                <div className="w-[404px] h-fit p-2 absolute left-[140px] flex flex-col gap-4 text-white justify-between">
                  Now playing:
                  <span className="text-4xl font-bold text-white">
                    {movie.title}
                  </span>
                  <div className="flex items-center font-semibold text-[18px] gap-2">
                    <YellowStar width={23} height={20} />
                    {movie.vote_average.toFixed(1)}
                    <span className="font-normal opacity-50 text-[16px]">
                      /10
                    </span>
                  </div>
                  <div className="text-[12px] w-[70%]">{movie.overview}</div>
                  <GetTrailerApi movieId={movie.id} />
                </div>
                {index === 0 && (
                  <Button
                    className="absolute right-[44px] -rotate-90 rounded-full hover:cursor-pointer dark:bg-white"
                    variant="outline"
                    size="icon"
                    onClick={handleClick(1)}
                  >
                    <DownArrow width={10} height={10} />
                  </Button>
                )}
                {index === 1 && (
                  <>
                    <Button
                      className="absolute right-[44px] -rotate-90 rounded-full hover:cursor-pointer dark:bg-white"
                      variant="outline"
                      size="icon"
                      onClick={handleClick(2)}
                    >
                      <DownArrow width={10} height={10} />
                    </Button>
                    <Button
                      className="absolute left-[44px] rotate-90 rounded-full hover:cursor-pointer dark:bg-white"
                      variant="outline"
                      size="icon"
                      onClick={handleClick(0)}
                    >
                      <DownArrow width={10} height={10} />
                    </Button>
                  </>
                )}
                {index === 2 && (
                  <>
                    <Button
                      className="absolute right-[44px] -rotate-90 rounded-full hover:cursor-pointer dark:bg-white"
                      variant="outline"
                      size="icon"
                      onClick={handleClick(3)}
                    >
                      <DownArrow width={10} height={10} />
                    </Button>
                    <Button
                      className="absolute left-[44px] rotate-90 rounded-full hover:cursor-pointer dark:bg-white"
                      variant="outline"
                      size="icon"
                      onClick={handleClick(1)}
                    >
                      <DownArrow width={10} height={10} />
                    </Button>
                  </>
                )}
                {index === 3 && (
                  <>
                    <Button
                      className="absolute right-[44px] -rotate-90 rounded-full hover:cursor-pointer dark:bg-white"
                      variant="outline"
                      size="icon"
                      onClick={handleClick(4)}
                    >
                      <DownArrow width={10} height={10} />
                    </Button>
                    <Button
                      className="absolute left-[44px] rotate-90 rounded-full hover:cursor-pointer dark:bg-white"
                      variant="outline"
                      size="icon"
                      onClick={handleClick(2)}
                    >
                      <DownArrow width={10} height={10} />
                    </Button>
                  </>
                )}
                {index === 4 && (
                  <Button
                    className="absolute left-[44px] rotate-90 rounded-full hover:cursor-pointer dark:bg-white"
                    variant="outline"
                    size="icon"
                    onClick={handleClick(3)}
                  >
                    <DownArrow width={10} height={10} />
                  </Button>
                )}

                <div className="absolute bottom-5 w-full flex justify-center ">
                  <div className="flex items-center  gap-2 ">
                    <button
                      className="w-3 h-3 rounded-full hover:bg-gray-300 bg-white hover:cursor-pointer"
                      onClick={handleClick(0)}
                    ></button>
                    <button
                      className="w-3 h-3 rounded-full hover:bg-gray-300  bg-white hover:cursor-pointer"
                      onClick={handleClick(1)}
                    ></button>
                    <button
                      className="w-3 h-3 rounded-full hover:bg-gray-300  bg-white hover:cursor-pointer"
                      onClick={handleClick(2)}
                    ></button>
                    <button
                      className="w-3 h-3 rounded-full hover:bg-gray-300  bg-white hover:cursor-pointer"
                      onClick={handleClick(3)}
                    ></button>
                    <button
                      className="w-3 h-3 rounded-full hover:bg-gray-300  bg-white hover:cursor-pointer"
                      onClick={handleClick(4)}
                    ></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
