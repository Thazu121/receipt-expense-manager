export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1f14] to-[#040a07] text-white">

      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="text-green-400">🧾</span>
          SpendWise
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#" className="hover:text-white">Features</a>
          <a href="#" className="hover:text-white">Why SpendWise</a>
          <a href="#" className="hover:text-white">About</a>
        </nav>

        <button className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-lg text-sm font-medium">
          Get Started
        </button>
      </header>


      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block mb-4 px-4 py-1 text-xs rounded-full bg-green-500/10 text-green-400">
            AI RECEIPT SCANNING
          </span>

          <h1 className="text-5xl font-extrabold leading-tight">
            Scan Receipts. <br />
            <span className="text-green-400">Track Expenses.</span><br />
            Save Money.
          </h1>

          <p className="mt-6 text-gray-300 max-w-md">
            Stop manual entry. Upload receipts and automatically track your personal expenses
            with smart insights and clean reports.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-medium">
              Get Started Free
            </button>
            <button className="border border-white/20 px-6 py-3 rounded-xl text-gray-200 hover:bg-white/10">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="relative bg-white/5 rounded-3xl p-6 border border-white/10">
          <div className="bg-black/60 rounded-2xl p-6">
            <div className="h-56 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
              <span className="text-green-400 font-medium">
                Scanning Receipt...
              </span>
            </div>
            <button className="mt-4 w-full bg-green-500 text-black py-2 rounded-lg font-medium">
              Upload Receipt
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why <span className="text-green-400">SpendWise?</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          <Feature
            title="Instant Scan"
            desc="Upload receipts and extract totals, dates, and merchants automatically."
          />
          <Feature
            title="Smart Categories"
            desc="Expenses are grouped into food, travel, shopping, and utilities."
          />
          <Feature
            title="Monthly Insights"
            desc="See spending trends and summaries that help you save more."
          />
          <Feature
            title="Private & Secure"
            desc="Your financial data stays encrypted and only visible to you."
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/5 border border-white/10 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to take control of your spending?
          </h3>
          <p className="text-gray-300 mb-8">
            Start scanning receipts and managing your expenses in minutes.
          </p>
          <button className="bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-xl font-medium">
            Start Now
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
        © 2026 SpendWise. Personal Expense Manager.
      </footer>
    </div>
  )
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-300">{desc}</p>
    </div>
  )
}
