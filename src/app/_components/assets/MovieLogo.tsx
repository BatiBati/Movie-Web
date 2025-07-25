type MovieIconType = { stroke: string; width: number; height: number };

export const MovieLogo = ({ stroke, width, height }: MovieIconType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.83341 1.16675V17.8334M13.1667 1.16675V17.8334M0.666748 9.50008H17.3334M0.666748 5.33341H4.83341M0.666748 13.6667H4.83341M13.1667 13.6667H17.3334M13.1667 5.33341H17.3334M2.48341 1.16675H15.5167C16.5201 1.16675 17.3334 1.9801 17.3334 2.98341V16.0167C17.3334 17.0201 16.5201 17.8334 15.5167 17.8334H2.48341C1.4801 17.8334 0.666748 17.0201 0.666748 16.0167V2.98341C0.666748 1.9801 1.4801 1.16675 2.48341 1.16675Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
