"use client";

import { YellowStar } from "@/app/_components/assets/YellowStar";

type CardType = {
  rate: number;
  imageUrl: string;
  movieName: string;
};

export const GenreCard = ({ rate, imageUrl, movieName }: CardType) => {
  return (
    <div className=" h-[330px] bg-[#e5e5e5] rounded-2xl overflow-hidden cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/original${imageUrl}`}
        className="h-[80%] w-full"
      />
      <div className="p-2 h-[20%]">
        <div className="flex gap-1">
          <YellowStar width={16} height={16} />
          <span className="text-[14px]">
            {rate.toFixed(1)}
            <span className="text-[12px] text-[#9e9e9e] "> / 10 </span>
          </span>
        </div>
        <div className=" overflow-hidden text-[14px]">{movieName}</div>
      </div>
    </div>
  );
};
