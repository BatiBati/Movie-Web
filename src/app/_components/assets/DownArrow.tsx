type DownArrow = {
  width: number;
  height: number;
};

export const DownArrow = ({ width, height }: DownArrow) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ stroke: "black" }}
    >
      <path
        d="M1 0.5L5 4.5L9 0.5"

        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
