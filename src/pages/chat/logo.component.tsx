import React from "react";

const defaultColor = "#d90429";

const LogoVector = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="100"
      viewBox="0 0 400 100"
    >
      <foreignObject x="0" y="0" width="100%" height="100%">
        <div className="flex gap-2 items-center sm:justify-start justify-center">
          <span className="text-2xl font-light flex items-center gap-2">
            {/* the icon */}
            <div
              style={{ backgroundColor: defaultColor }}
              className="p-2 rounded-md"
            >
              <AppIcon color="#ffffff" height="30" width="30" />
            </div>
            {/* Name of app */}
            <span
              style={{ color: "#d90429" }}
              className="font-bold text-mainColor"
            >
              Accounta
              <span className="font-bold text-customCharcoal">Buddy</span>
            </span>
          </span>
        </div>
      </foreignObject>
    </svg>
  );
};

const AppIcon = ({ color = "#000000", width = "64px", height = "64px" }) => (
  <svg
    fill={color}
    height={height}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <g>
          <polygon points="478.609,306.087 478.609,272.696 512,272.696 512,128 478.609,128 478.609,94.609 445.217,94.609 445.217,61.217 322.783,61.217 322.783,94.609 356.174,94.609 356.174,128 389.565,128 389.565,161.391 422.957,161.391 422.957,306.087 389.565,306.087 389.565,339.478 356.174,339.478 356.174,372.87 389.565,372.87 389.565,406.261 512,406.261 512,372.87 478.609,372.87 478.609,339.478 445.217,339.478 445.217,306.087 "></polygon>
        </g>
      </g>
      <g>
        <g>
          <polygon points="66.783,61.217 66.783,94.609 33.391,94.609 33.391,128 0,128 0,272.696 33.391,272.696 33.391,306.087 66.783,306.087 66.783,339.478 33.391,339.478 33.391,372.87 0,372.87 0,406.261 122.435,406.261 122.435,372.87 155.826,372.87 155.826,339.478 122.435,339.478 122.435,306.087 89.044,306.087 89.044,161.391 122.435,161.391 122.435,128 155.826,128 155.826,94.609 189.217,94.609 189.217,61.217"></polygon>
        </g>
      </g>
      <g>
        <g>
          <polygon points="356.174,339.478 356.174,306.087 389.565,306.087 389.565,161.391 356.174,161.391 356.174,128 322.783,128 322.783,94.609 189.217,94.609 189.217,128 155.826,128 155.826,161.391 122.435,161.391 122.435,306.087 155.826,306.087 155.826,339.478 189.217,339.478 189.217,372.87 155.826,372.87 155.826,406.261 122.435,406.261 122.435,450.783 389.565,450.783 389.565,406.261 356.174,406.261 356.174,372.87 322.783,372.87 322.783,339.478"></polygon>
        </g>
      </g>
    </g>
  </svg>
);

export default LogoVector;
export { AppIcon };
