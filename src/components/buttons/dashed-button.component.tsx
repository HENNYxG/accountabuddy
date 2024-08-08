
const DashedButton = ({ children, className, onClick }) => {
  return (
    <button
      className={`rounded-2xl border-[4px] shadow-[6px_6px_0px_black] border-black bg-customGreen px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_black] dark:shadow-customGreen/40 dark:border-emerald-950 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DashedButton;
