import React, { useContext, useEffect, useState } from "react";
import { UIContext } from "../../contexts/ui.context";

const HamburgerMenu = () => {
    // button expanded
    const { expanded, setExpanded, mobileMenuIsOpen, setMobileMenuIsOpen, darkMode } = useContext(UIContext);
    


  const toggle = () => {
      setMobileMenuIsOpen(!mobileMenuIsOpen);
      setExpanded(!expanded);
  };

  return (
    <div className=" align-center cursor-pointer p-1 hover:bg-zinc-200 rounded-md dark:hover:bg-zinc-700 transition">
      <button
        aria-expanded={mobileMenuIsOpen}
        type="button"
        className="group relative h-6 w-6"
        style={
          {
            "--width": "1.50rem",
            "--thickness": "0.125rem",
            "--gap": mobileMenuIsOpen ? "-0.14rem" : "0.25rem",
            "--color": darkMode ? "#fff" : "#000",
            "--duration": "300ms",
          } as React.CSSProperties
        }
        onClick={toggle}
      >
        <span
          className={`absolute left-1/2 top-1/2 h-[var(--thickness)] w-[var(--width)] -translate-x-1/2 translate-y-[calc(-150%-var(--gap))] transition-transform duration-[calc(var(--duration)*2/3)] before:absolute before:right-0 before:h-full before:w-full before:rounded-full before:bg-[var(--color)] before:transition-[width] before:delay-[calc(var(--duration)*1/3)] before:duration-[calc(var(--duration)*2/3)] ${
            mobileMenuIsOpen
              ? "-translate-y-1/2 -rotate-45 delay-[calc(var(--duration)*1/3)] before:w-[60%] before:delay-0"
              : ""
          }`}
        ></span>
        <span
          className={`absolute left-1/2 top-1/2 h-[var(--thickness)] w-[var(--width)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color)] transition-transform duration-[calc(var(--duration)*2/3)] ${
            mobileMenuIsOpen ? "rotate-45 delay-[calc(var(--duration)*1/3)] " : ""
          }`}
        ></span>
        <span
          className={`absolute left-1/2 top-1/2 h-[var(--thickness)] w-[var(--width)] -translate-x-1/2 translate-y-[calc(50%+var(--gap))] transition-transform duration-[calc(var(--duration)*2/3)] before:absolute before:right-0 before:h-full before:w-[60%] before:rounded-full before:bg-[var(--color)] before:transition-[right] before:delay-[calc(var(--duration)*1/3)] before:duration-[calc(var(--duration)*2/3)] ${
            mobileMenuIsOpen
              ? "-translate-y-1/2 -rotate-45 delay-[calc(var(--duration)*1/3)] before:right-[40%] before:delay-0"
              : ""
          }`}
        ></span>
      </button>
    </div>
  );
};
export default HamburgerMenu;
