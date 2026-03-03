import ReceiptCard from "./ReceiptCard";

export default function PageGrid({ receipts }) {
  if (!receipts.length) {
    return (
      <div className="text-center py-20 opacity-60">
        No receipts found
      </div>
    );
  }

  const scanned = receipts.filter(
    (r) => r.source === "scan"
  )

  const manual = receipts.filter(
    (r) => r.source !== "scan"
  )

  return (
    <>
      {scanned.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-4">
            📷 Scanned Receipts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {scanned.map((receipt) => (
              <ReceiptCard
                key={receipt.id}
                receipt={receipt}
              />
            ))}
          </div>
        </>
      )}

      {manual.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-4">
            ✍ Manual Receipts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {manual.map((receipt) => (
              <ReceiptCard
                key={receipt.id}
                receipt={receipt}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
