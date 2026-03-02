import ReceiptCard from "./ReceiptCard";

export default function ReceiptGrid({ receipts }) {
  if (!receipts.length) {
    return (
      <div className="text-center text-gray-400 mt-20">
        No receipts found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {receipts.map((receipt) => (
        <ReceiptCard
          key={receipt.id}
          receipt={receipt}
        />
      ))}
    </div>
  );
}
