"use client";
import Link from "next/link";
import { RightArrow } from "@/app/_components/assets/RightArrow";
import { Button } from "./assets/ui/button";
type Href = {
  href: string;
  movieGenre: string;
};
export const SeeMore = ({ href, movieGenre }: Href) => {
  return (
    <div className="flex justify-between ">
      <p className="text-2xl font-semibold">{movieGenre} </p>
      <Link href={href}>
        <Button variant="outline" className="flex gap-2 items-center hover:cursor-pointer bg-white hover:bg-white text-black dark:text-white dark:bg-black dark:hover:bg-[#262626] ">
          See more
          <RightArrow />
        </Button>
      </Link>
    </div>
  );
};
