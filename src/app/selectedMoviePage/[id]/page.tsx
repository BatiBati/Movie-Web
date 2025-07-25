"use client";
import axios from "axios";
import { YellowStar } from "@/app/_components/assets/YellowStar";
import { ACCESS_TOKEN } from "@/app/upComing/_components/UpcomingMoviesAll";
import { Button } from "@/components/ui/button";
import { Triangle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SeeMore } from "@/app/_components/SeeMore";
import { Card } from "@/app/selectedMoviePage/_components/Card";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectedMoviePageSkeleton } from "../_components/SelectedMoviePageSkeleton";

type Params = {
  id: string;
};
type GenresType = {
  id: number;
  name: string;
};
export type MovieDetails = {
  adult: boolean;
  title: string;
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  vote_count: number;
  genres: GenresType[];
};

type Response = {
  cast: Cast[];
  crew: Crew[];
};

type Cast = {
  original_name: string;
  popularity: number;
  name: string;
};

type Crew = {
  job: string;
  name: string;
};

interface Star {
  popularity: number;
  name: string;
}
type SimilarMovies = {
  results: Similar[];
};
type Similar = {
  poster_path: string;
  vote_average: number;
  title: string;
  id: number;
  rate: number;
};

export default function SelectedMoviePage() {
  const { id } = useParams<Params>();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [director, setDirector] = useState<string>();
  const [writer, setWriter] = useState<string>();
  const [stars, setStars] = useState<Star[]>([]);
  const [similarMovie, setSimilarMovie] = useState<Similar[]>([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const getTrailer = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3//movie/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setTrailer(data.results[0].key);
    };
    getTrailer();
  }, [id]);

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get<MovieDetails>(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovie(data);

    };

    const getNames = async () => {
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      const director = data.crew.find((item) => item.job.includes("Director"));
      if (director) {
        setDirector(director.name);
      }

      const writer = data.crew.find((item) => item.job.includes("Writer"));
      if (writer) {
        setWriter(writer.name);
      }

      const stars = data.cast.filter((item) => item.popularity > 2);
      setStars(stars);
    };
    getMovie();
    getNames();
  }, [id]);

  useEffect(() => {
    const getSimilarMovie = async () => {
      const { data } = await axios.get<SimilarMovies>(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setSimilarMovie(data.results);
    };
    getSimilarMovie();
  }, [id]);

  return (
    <>
      {movie === null ? <SelectedMoviePageSkeleton /> : <div className="py-16 w-full flex justify-center">
        <div className="w-[1080px] gap-6 flex flex-col relative">
          <div className=" w-full">
            <div className="flex justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold">
                  {movie?.title}
                </div>
                <div>

                  {movie?.release_date}
                </div>
              </div>
              <div className="flex flex-col p-2">
                <p className="text-[12px]">Rating</p>
                <div className="flex flex-col w-fit">
                  <div className="flex items-center gap-3">
                    <div>
                      <YellowStar width={28} height={48} />
                    </div>
                    <div className="flex flex-col">
                      <div>
                        <span className="text-[18px] font-semibold">
                          {movie?.vote_average.toFixed(1)}
                        </span>
                        <span className="opacity-50 text-[16px] dark:opacity-50"> /10</span>
                      </div>

                      <p className="text-[#a5a5a5]"> {movie?.vote_count}k</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-8">
              <div>
                <img
                  className="w-[290px] h-[428px] rounded-2xl"
                  alt="Poster Picture"
                  src={"https://image.tmdb.org/t/p/original" + movie?.poster_path}
                />
              </div>

              <div className="relative">
                <img
                  src={
                    "https://image.tmdb.org/t/p/original" + movie?.backdrop_path
                  }
                  alt="PosterBig"
                  className="w-[760px] h-[428px] rounded-2xl"
                />
                <div className="absolute left-6 bottom-6 ">
                  <Dialog>
                    <DialogTrigger
                      asChild
                      className="absolute left-2 bottom-2 flex items-center gap-1 w-[130px]  "
                    >
                      <div>
                        <Button className="rounded-full flex justify-center items-center rotate-90 bg-white hover:bg-white  cursor-pointer">
                          <Triangle stroke="black" />
                        </Button>
                        <div className="text-white font-normal  cursor-pointer">
                          Play trailer
                        </div>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="w-fit h-fit bg-transparent">
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <iframe
                          className="absolute left-[-450px] top-[-300px] z-40 w-[1000px] h-[500px]"
                          width="1716"
                          height="965"
                          src={`https://www.youtube.com/embed/${trailer}`}
                          title='"She&#39;s the One" – Robbie Williams Meets Nicole Appleton | Better Man | Paramount Movies'
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                      </DialogHeader>

                      <DialogFooter></DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex w-fit gap-3">
              {movie?.genres.map((item) => {
                return (
                  <Badge
                    key={item.id}
                    variant={"outline"}
                  >
                    {item.name}
                  </Badge>
                );
              })}
            </div>
            <div className="text-[14px font-normal]">{movie?.overview}</div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-2 w-full border-b-[1px] border-gray pb-2">
              <div className="w-[100px]  text-[16px] font-bold">Director</div>
              <div>{director}</div>
            </div>
            <div className="flex gap-2 w-full border-b-[1px] border-gray pb-2">
              <div className="w-[100px]  text-[16px] font-bold">Writers</div>
              <div>{writer}</div>
            </div>
            <div className="flex gap-2 w-full border-b-[1px] border-gray pb-2">
              <div className="w-[100px]  text-[16px] font-bold">Stars</div>
              <div>
                {stars.map((itm, idx) => {
                  return (
                    <span key={idx} className="px-2 pl-0">
                      {itm.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <div className="flex justify-between">
              <div className=" text-2xl font-semibold">More like this</div>

              <SeeMore href={`/moreLikeThis/${id}`} movieGenre="" />
            </div>
            <div className="flex w-full justify-between">
              {similarMovie.slice(0, 5).map((movie) => {
                return (
                  <Link href={`/selectedMoviePage/${movie.id}`} key={movie.id}>
                    <div className="cursor-pointer  ">
                      <Card
                        imageUrl={movie.poster_path}
                        rate={movie.vote_average}
                        movieName={movie.title}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
