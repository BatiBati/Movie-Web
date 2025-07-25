"use client";

import { useContext, useEffect, useState } from "react";

import {
  Movie,
  Response,
  ACCESS_TOKEN,
} from "@/app/upComing/_components/UpcomingMoviesAll";
import axios from "axios";
import { IsDarkContext } from "@/app/_components/Provider";
import { MoviesLoader } from "@/app/_components/MoviesLoader";
import Link from "next/link";
import { Card } from "./Card";

export const PopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { loading, setLoading } = useContext(IsDarkContext);

  useEffect(() => {
    setLoading(true);
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
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
    <div className="p-20 pt-10 pb-10 flex flex- col gap-8 ">
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
