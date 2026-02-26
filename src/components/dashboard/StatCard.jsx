export default function StatCard({ title, value }) {
  return (
    <div
      className="
        bg-white dark:bg-[#0F1B22]
        border border-gray-100 dark:border-white/5
        shadow-sm hover:shadow-md
        rounded-2xl
        p-4 sm:p-6
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h2 className="
        text-xl sm:text-2xl lg:text-3xl
        font-semibold
        mt-2 sm:mt-3
        text-gray-900 dark:text-white
      ">
        {value}
      </h2>
    </div>
  );
}
