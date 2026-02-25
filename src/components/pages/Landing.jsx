import { useSelector } from "react-redux";

export default function Landing() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition">

        <Hero />
        <Features />
        <Steps />

      </div>
    </div>
  );
}

/* ================= HERO ================= */

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs font-semibold px-4 py-1 rounded-full">
            AI-POWERED RECEIPT SCANNING
          </span>

          <h1 className="text-5xl font-bold mt-6 leading-tight">
            Take control of <br />
            your <span className="text-green-600">wealth</span> in seconds.
          </h1>

          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
            SpendWise uses advanced AI to track your expenses,
            scan receipts, and provide deep insights to help you
            save more every month.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
              Start Free Trial →
            </button>

            <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-xl shadow transition">
              Watch Demo
            </button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Joined by 10,000+ savers this month
          </p>
        </div>

        <div className="relative">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 px-6 py-4 rounded-2xl shadow-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Potential Savings
            </p>
            <p className="font-bold text-lg">$420.50</p>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ================= FEATURES ================= */

function Features() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold">
          Powerful features for modern finance
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Everything you need powered by AI intelligence.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-16">

          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-lg">Instant Scanning</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              Snap a photo of your receipt and automatically extract merchants,
              totals, and items.
            </p>
          </div>

          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-lg">AI Spending Insights</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              Get personalized recommendations based on your real spending habits.
            </p>
          </div>

          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-lg">Smart Categorization</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              Automatically organize expenses into clean, easy-to-understand categories.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================= STEPS ================= */

function Steps() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-3xl font-bold">
            Getting started is as easy as 1-2-3
          </h2>

          <div className="mt-10 space-y-8">

            <Step number="1" title="Connect your accounts"
              text="Securely link your bank accounts or manually upload daily transactions." />

            <Step number="2" title="Scan your receipts"
              text="Use our mobile app to scan paper receipts and match them instantly." />

            <Step number="3" title="Review AI insights"
              text="Check your dashboard weekly for smart suggestions to optimize spending." />

          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>

      </div>
    </section>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full font-semibold">
        {number}
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          {text}
        </p>
      </div>
    </div>
  );
}

