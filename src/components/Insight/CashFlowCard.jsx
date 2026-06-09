import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import { Wallet } from "lucide-react";

export default function CashFlowCard({ expenses = [] }) {
  const currency = useSelector((state) => state.settings.currency);

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          Total Spending
        </h3>

        <Wallet size={24} />
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold mt-4">
        {formatCurrency(total, currency)}
      </h2>

      <p className="text-sm opacity-80 mt-2">
        Based on selected report range
      </p>
    </div>
  );
}