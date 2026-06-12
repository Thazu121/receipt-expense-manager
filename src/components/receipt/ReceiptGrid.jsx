import ReceiptCard from "./ReceiptCard";

export default function PageGrid({
  receipts = [],
  onSelectReceipt,
}) {
  if (!receipts.length) {
    return (
      <div
        className="
          flex
          items-center
          justify-center

          min-h-[250px]

          rounded-2xl

          bg-white
          dark:bg-[#0F1B22]

          border
          border-gray-200
          dark:border-white/5

          text-gray-500
          dark:text-gray-400

          text-center

          p-6
        "
      >
        No receipts found
      </div>
    );
  }

  return (
    <div
      className="
        grid

        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5

        gap-4
        sm:gap-5
        lg:gap-6

        w-full
      "
    >
      {receipts.map((receipt) => (
        <ReceiptCard
          key={receipt._id}
          receipt={receipt}
          onClick={() =>
            onSelectReceipt?.(receipt)
          }
        />
      ))}
    </div>
  );
}