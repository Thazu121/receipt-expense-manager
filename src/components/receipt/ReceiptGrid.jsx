import ReceiptCard from "./ReceiptCard";

export default function PageGrid({ receipts = [], onSelectReceipt }) {
  if (!receipts.length) {
    return (
      <div className="text-center py-10 opacity-60">
        No receipts found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {receipts.map((receipt) => (
        <ReceiptCard
          key={receipt._id}
          receipt={receipt}
          onClick={() => onSelectReceipt?.(receipt)}
        />
      ))}
    </div>
  );
}