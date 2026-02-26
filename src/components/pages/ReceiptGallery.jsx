import ReceiptCard from "../receipt/ReceiptCard";
import ReceiptFilters from "../receipt/ReceiptFilters";
import ReceiptPagination from "../receipt/ReceiptPagination";
import { Upload, Plus } from "lucide-react";

export default function ReceiptGallery() {
  const receipts = [
    {
      id: 1,
      title: "Starbucks Coffee",
      amount: "$14.50",
      date: "Oct 24, 2023",
      category: "Food & Drink",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
    },
    {
      id: 2,
      title: "Amazon.com",
      amount: "$189.99",
      date: "Oct 23, 2023",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505",
    },
    {
      id: 3,
      title: "Delta Airlines",
      amount: "$452.00",
      date: "Oct 21, 2023",
      category: "Travel",
      image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    },
    {
      id: 4,
      title: "Whole Foods Market",
      amount: "$78.25",
      date: "Oct 20, 2023",
      category: "Groceries",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },
  ];

  return (
    <div
      className="
        p-6 md:p-10 min-h-screen transition-colors duration-300
        
        bg-gradient-to-br 
        from-emerald-50 
        via-slate-50 
        to-green-100
        
        dark:bg-gradient-to-br 
        dark:from-green-950 
        dark:via-green-900 
        dark:to-black
        
        text-gray-800 
        dark:text-white
      "
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Receipt Gallery</h1>
          <p className="text-emerald-600 dark:text-green-300 text-sm mt-2">
            128 receipts found across all accounts
          </p>
        </div>

        <button
          className="
            flex items-center gap-2
            bg-emerald-500 hover:bg-emerald-600
            text-white dark:text-black
            font-medium px-5 py-3 rounded-xl transition
          "
        >
          <Upload size={18} />
          Upload New Receipt
        </button>
      </div>

      {/* Filters */}
      <ReceiptFilters />

      {/* Grid */}
      <div
        className="
          grid gap-6 mt-8
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {receipts.map((item) => (
          <ReceiptCard key={item.id} receipt={item} />
        ))}

        {/* Add New Card */}
        <div
          className="
            border-2 border-dashed border-emerald-300
            bg-white/70 backdrop-blur-md
            
            dark:border-green-700
            dark:bg-green-900/20
            
            rounded-2xl flex flex-col items-center justify-center
            h-[380px] hover:scale-[1.02] transition cursor-pointer
          "
        >
          <div className="bg-emerald-500 text-white dark:text-black p-4 rounded-full mb-4">
            <Plus />
          </div>
          <p className="text-emerald-600 dark:text-green-400">
            Add Another
          </p>
        </div>
      </div>

      {/* Pagination */}
      <ReceiptPagination />
    </div>
  );
}
