import { useState } from "react";

export default function DateFilter({ onChange }) {
  const [active, setActive] = useState(30);

  const options = [
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
    { label: "90 Days", value: 90 },
    { label: "All", value: 0 },
  ];

  const handleClick = (value) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-emerald-100 dark:bg-white/10">
      {options.map((item) => (
        <button
          key={item.value}
          onClick={() => handleClick(item.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            active === item.value
              ? "bg-emerald-500 text-white shadow"
              : "text-gray-600 dark:text-gray-300 hover:bg-emerald-200 dark:hover:bg-white/20"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}