export default function ReceiptCard({ receipt }) {
  return (
    <div className="bg-green-950/40 backdrop-blur-md
      border border-green-800 rounded-2xl overflow-hidden
      hover:scale-[1.02] transition">

      <img
        src={receipt.image}
        alt={receipt.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">
            {receipt.title}
          </h3>
          <span className="text-green-400 font-semibold">
            {receipt.amount}
          </span>
        </div>

        <p className="text-sm text-green-300 mt-2">
          {receipt.date}
        </p>

        <span className="inline-block mt-3 text-xs
          bg-green-800 text-green-300
          px-3 py-1 rounded-full">
          {receipt.category}
        </span>
      </div>
    </div>
  );
}
