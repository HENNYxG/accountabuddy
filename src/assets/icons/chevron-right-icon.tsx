const ChevronRightIcon = ({
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
      strokeWidth={2}
      d="m6 6l6 6l-6 6M17 5v13"
    ></path>
  </svg>
);

export default ChevronRightIcon;
