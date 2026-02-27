import {useDispatch,useSelector} from "react-redux"
import { addReceipt,clearScannedReceipt,setScannedReceipt } from "../../redux/features/receiptSlice";


export default function ExtractedDetails() {
 
  const dispatch =useDispatch()
  const scanned=useSelector((state)=>state.receipt.ScannedReceipt)
  if(!scanned){
    return(
      <div>
        <p>
          No receipt Scanned Yet.
        </p>
      </div>
    )
  }
  const handleChange=(field,value)=>{
    dispatch(
      setScannedReceipt({
        ...scanned,
        [field]:value
      })
    )
  }
  const handleSave=()=>{
    dispatch(
      addReceipt({
        id:Date.now(),
        ...scanned
      })
    )
    dispatch(clearScannedReceipt())
  }

  return (
    <div
      className="
        h-full flex flex-col
        rounded-2xl p-6
        bg-white/70 backdrop-blur-md
        border border-emerald-100
        shadow-xl
        dark:bg-white/5
        dark:border-emerald-900
        transition-all duration-500
      "
    >
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">
            Extracted Details
          </h2>
          <p className="text-sm text-gray-500 dark:text-green-400">
            Review and edit the scanned information
          </p>
        </div>

        <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-green-900 dark:text-green-400 px-3 py-1 rounded-full">
          98% CONFIDENCE
        </span>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col space-y-5">

        {/* Merchant */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400">
            MERCHANT NAME
          </label>
          <input
            value={scanned.store}
            onChange={(e) => handleChange("store",e.target.value)}
            className="
              w-full mt-1 p-3 rounded-xl
              bg-transparent
              border border-emerald-200
              dark:border-emerald-800
              focus:outline-none
              focus:ring-2 focus:ring-emerald-500
              transition
            "
          />
        </div>

        {/* Date + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400">
              DATE
            </label>
            <input
              value={scanned.date}
              onChange={(e) => handleChange("date",e.target.value)}
              className="
                w-full mt-1 p-3 rounded-xl
                bg-transparent
                border border-emerald-200
                dark:border-emerald-800
                focus:outline-none
                focus:ring-2 focus:ring-emerald-500
              "
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400">
              CATEGORY
            </label>
            <input
              value={scanned.category}
              onChange={(e) => handleChange(e.target.value)}
              className="
                w-full mt-1 p-3 rounded-xl
                bg-transparent
                border border-emerald-200
                dark:border-emerald-800
                focus:outline-none
                focus:ring-2 focus:ring-emerald-500
              "
            />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400">
            TOTAL AMOUNT
          </label>
          <input
            value={scanned.amount}
            onChange={(e) => handleChange("amount",e.target.value)}
            className="
              w-full mt-1 p-3 rounded-xl
              bg-transparent
              border border-emerald-200
              dark:border-emerald-800
              text-emerald-600 dark:text-green-400
              text-lg font-semibold
              focus:outline-none
              focus:ring-2 focus:ring-emerald-500
            "
          />
        </div>

        {/* Notes */}
        <div className="flex-1 flex flex-col">
          <label className="text-xs text-gray-500 dark:text-gray-400">
            NOTES (OPTIONAL)
          </label>
          <textarea
            value={scanned.notes}
            onChange={(e) => handleChange("notes",e.target.value)}
            rows={3}
            className="
              w-full mt-1 p-3 rounded-xl
              bg-transparent
              border border-emerald-200
              dark:border-emerald-800
              resize-none
              focus:outline-none
              focus:ring-2 focus:ring-emerald-500
            "
          />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="pt-6 flex gap-4">
        <button
        onClick={handleSave}
          className="
            flex-1 py-3 rounded-xl font-semibold
            bg-emerald-600 hover:bg-emerald-700
            text-white
            transition duration-300
          "
        >
          SAVE EXPENSE
        </button>

        <button
        onClick={()=>dispatch(clearScannedReceipt())}
          className="
            flex-1 py-3 rounded-xl
            border border-emerald-300
            dark:border-emerald-800
            hover:bg-emerald-100
            dark:hover:bg-emerald-900/40
            transition duration-300
          "
        >
          RETAKE
        </button>
      </div>
    </div>
  );
}
