import { Download } from "lucide-react"
export default function Report() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0b1f14] via-[#0e2b1b] to-[#08150e] text-white ">

            <div className=" text-white flex flex-col  md:flex-row md:items-end justify-between gap-9 py-12 px-6 ">
                <div>
                    <h1 className="font-bold text-3xl mb-2 tracking-tight">
                        Financial Analytics & Reports
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400">Comprehensive overview of your spending trends and budget performance.</p>
                </div>

                <button
                    className="  flex items-center  gap-2 px-4 py-2  font-serif text-base  
         text-background-dark bg-green-500 font-bold 
         rounded-lg hover:opacity-90 transition-opacity ">
                    <Download />Export as CSV</button>
            </div>
        </div>
    )
}