const EllipsisHorizontalOutline = ({
  color = "#000000",
  width = "64px",
  height = "64px",
  type = "full"
}) => {
  return (
    <>
      {type === "full" ? (
        <svg
          fill={color}
          width={width}
          height={height}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        ><circle cx={12} cy={12} r={2} fill={color}></circle><circle cx={5} cy={12} r={2} fill={color}></circle><circle cx={19} cy={12} r={2} fill={color}></circle></svg>) : (<svg
          fill={color}
          width={width}
          height={height}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M5 10a2 2 0 1 0 0 4a2 2 0 0 0 0-4m0 3a1 1 0 1 1 0-2a1 1 0 0 1 0 2m7-3a2 2 0 1 0 0 4a2 2 0 0 0 0-4m0 3a1 1 0 1 1 0-2a1 1 0 0 1 0 2m7-3a2 2 0 1 0 0 4a2 2 0 0 0 0-4m0 3a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
          ></path>
        </svg>)}
    </>
  );
};

export default EllipsisHorizontalOutline;

