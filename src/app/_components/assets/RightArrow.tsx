import { useContext } from "react";
import { IsDarkContext } from "../Provider";

export const RightArrow = () => {

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33301 6.00004H10.6663M10.6663 6.00004L5.99967 1.33337M10.6663 6.00004L5.99967 10.6667"
        // stroke="black"
        className="stroke-black dark:stroke-white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
