const PlusRoundedIcon = ({
  color = "#000000",
  width = "64px",
  height = "64px",
}) => (
  <svg
    // fill={color}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M5 12h7m7 0h-7m0 0V5m0 7v7"
    ></path>
  </svg>
);

export default PlusRoundedIcon;
