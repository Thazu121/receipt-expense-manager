import { useState } from "react";

export default function DateFilter({ onChange }) {
  const [active, setActive] = useState("30");

  const handleClick = (value) => {
    setActive(value);
    onChange(value);
  };

  return (
    <div className="flex gap-2 bg-emerald-100 dark:bg-white/10 p-1 rounded-lg">
      {["7", "30", "90"].map((value) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          className={`px-3 py-1 text-sm rounded-md transition ${
            active === value
              ? "bg-emerald-500 text-white"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {value} Days
        </button>
      ))}
    </div>
  );
}
