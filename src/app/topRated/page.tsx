"use client";

import { TopRatedMoviesAll } from "./_components/TopRatedMoviesAll";

export default function TopRated() {
  return (
    <>
      <div className="flex flex-col w-full items-center ">
        <div className="w-fit h-full flex flex-col p-8">
          <TopRatedMoviesAll />
        </div>
      </div>
    </>
  );
}
