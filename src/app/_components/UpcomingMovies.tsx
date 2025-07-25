"use client";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { IsDarkContext } from "@/app/_components/Provider";
import { MoviesLoader } from "@/app/_components/MoviesLoader";

import Link from "next/link";
import { Card } from "./Card";

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
};

export const UpCominMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { loading, setLoading } = useContext(IsDarkContext);

  useEffect(() => {
    setLoading(true);
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2",
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

  return (
    <div className="p-20 pt-10 pb-10 flex flex-col  ">
      <div className="grid grid-cols-5 grid-rows-2 gap-8 ">
        {loading ? (
          <MoviesLoader />
        ) : (
          movies.slice(0, 10).map((movie) => {
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
    </div>
  );
};
