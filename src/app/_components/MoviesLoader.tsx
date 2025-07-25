"use client";
import { Skeleton } from "./assets/ui/skeleton";

const skeletonNumber = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export const MoviesLoader = () => {
  return (
    <>
      {skeletonNumber.slice(0, 10).map((_, index) => {
        return (
          <div key={index}>
            <Skeleton className="w-[230px] h-[345px] bg-[#e4e4e5] rounded-2xl overflow-hidden" />
          </div>
        );
      })}
    </>
  );
};
