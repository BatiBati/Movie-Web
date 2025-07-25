"use client";
import { UpCominMoviesAll } from "@/app/upComing/_components/UpcomingMoviesAll";

export default function Upcoming() {
  return (
    <div className="flex flex-col w-full items-center ">
      <div className="w-fit h-full flex flex-col ">
        <UpCominMoviesAll />
      </div>
    </div>
  );
}
