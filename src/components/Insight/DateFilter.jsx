import { useState } from "react";

export default function DateFilter({ onChange }) {
  const [active, setActive] = useState("30");

  const handleClick = (value) => {
    setActive(value);
    onChange(value);
  };

  return (
    <div className="w-full sm:w-auto">
      <div className="flex flex-wrap sm:flex-nowrap gap-2 bg-emerald-100 dark:bg-white/10 p-1 rounded-lg w-full sm:w-auto">
        {["7", "30", "90"].map((value) => (
          <button
            key={value}
            onClick={() => handleClick(value)}
            className={`flex-1 sm:flex-none px-3 py-2 text-sm sm:text-base rounded-md transition-all duration-200
              ${
                active === value
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-emerald-200 dark:hover:bg-white/20"
              }`}
          >
            {value} Days
          </button>
        ))}
      </div>
    </div>
  );
}
