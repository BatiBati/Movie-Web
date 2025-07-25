import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Triangle } from "lucide-react";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../../UpcomingMovies";
import axios from "axios";
import { useParams } from "next/navigation";
import { Params } from "next/dist/server/request/params";
type GetTrailerMovieApiProps = {
  movieId: number;
};
export const GetTrailerApi = ({ movieId }: GetTrailerMovieApiProps) => {
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const getTrailer = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3//movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setTrailer(data.results[0].key);
    };
    getTrailer();
  });

  return (
    <Dialog>
      <DialogTrigger asChild className="flex items-center gap-1 w-[130px]">
        <div>
          <Button variant="outline" className="text-black dark:text-black dark:bg-white cursor-pointer">
            <Triangle className="rotate-90" />
            Watch Trailer
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="w-1 h-1 bg-transparent">
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
  );
};
