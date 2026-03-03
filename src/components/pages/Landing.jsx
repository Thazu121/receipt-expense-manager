import { useSelector } from "react-redux";
import { ScanLine, BarChart3, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  const isLight = useSelector((state) => state.theme.isLight);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isLight
          ? "bg-white text-gray-900"
          : "bg-gradient-to-b from-[#071a10] via-[#0b2a1a] to-[#05140c] text-white"
        }`}
    >
      <Hero isLight={isLight} />
      <Features isLight={isLight} />
      <Steps isLight={isLight} />
    </div>
  );
}


function Hero({ isLight }) {
  return (
    <section id="home" className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <span
            className={`inline-block text-xs font-semibold px-4 py-1 rounded-full ${isLight
                ? "bg-green-100 text-green-700"
                : "bg-green-900/40 text-green-400"
              }`}
          >
            AI-POWERED RECEIPT SCANNING
          </span>

          <h1
            className={`text-4xl md:text-5xl font-bold mt-6 leading-tight ${isLight ? "text-gray-900" : "text-white"
              }`}
          >
            Scan Receipts. <br />
            <span className={isLight ? "text-green-600" : "text-green-400"}>
              Track Expenses.
            </span>
            <br />
            Save Money.
          </h1>

          <p
            className={`mt-6 max-w-lg leading-relaxed ${isLight ? "text-gray-600" : "text-white/70"
              }`}
          >
            SpendWise uses advanced AI to scan receipts,
            track expenses automatically, and generate
            powerful financial insights in seconds.
          </p>
          <Link to={"signup"}>
            <button

              className={`mt-8 px-8 py-3 rounded-xl shadow-lg transition ${isLight
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
                }`}
            >
              Get Started
            </button>
          </Link>
        </div>

        <div
          className={`p-6 rounded-3xl shadow-2xl ${isLight
              ? "bg-white border border-gray-200"
              : "bg-[#0e2418] border border-green-900/40"
            }`}
        >
          <img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"
            alt="Dashboard Preview"
            className="rounded-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
}


function Features({ isLight }) {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">

        <h2
          className={`text-3xl font-bold ${isLight ? "text-gray-900" : "text-white"
            }`}
        >
          Powerful Features for Modern Finance
        </h2>

        <p
          className={`mt-4 ${isLight ? "text-gray-600" : "text-white/70"
            }`}
        >
          Everything you need powered by intelligent automation.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            isLight={isLight}
            icon={<ScanLine size={28} />}
            title="Instant Receipt Scan"
            text="Extract totals, merchants and line items instantly using OCR technology."
          />

          <FeatureCard
            isLight={isLight}
            icon={<BarChart3 size={28} />}
            title="Smart Analytics"
            text="Visual insights that help you track and optimize spending habits."
          />

          <FeatureCard
            isLight={isLight}
            icon={<Wallet size={28} />}
            title="Expense Control"
            text="Automatically categorize transactions and manage budgets easily."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, text, isLight }) {
  return (
    <div
      className={`p-8 rounded-3xl transition-all duration-300 hover:shadow-xl ${isLight
          ? "bg-gray-50 border border-gray-200"
          : "bg-[#0e2418] border border-green-900/40"
        }`}
    >
      <div
        className={`mb-6 ${isLight ? "text-green-600" : "text-green-400"
          }`}
      >
        {icon}
      </div>

      <h3
        className={`font-semibold text-lg ${isLight ? "text-gray-900" : "text-white"
          }`}
      >
        {title}
      </h3>

      <p
        className={`mt-4 ${isLight ? "text-gray-600" : "text-white/70"
          }`}
      >
        {text}
      </p>
    </div>
  );
}


function Steps({ isLight }) {
  return (
    <section
      id="steps"
      className={`py-20 px-6 ${isLight ? "bg-gray-50" : "bg-[#0a1f15]"
        }`}
    >

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <h2
            className={`text-3xl font-bold ${isLight ? "text-gray-900" : "text-white"
              }`}
          >
            Getting Started is Simple
          </h2>

          <div className="mt-10 space-y-8">
            <Step number="1" title="Upload Receipt" text="Take a photo or upload your receipt securely." isLight={isLight} />
            <Step number="2" title="AI Extraction" text="Our AI reads and categorizes your transaction automatically." isLight={isLight} />
            <Step number="3" title="Track & Save" text="View insights and reduce unnecessary expenses easily." isLight={isLight} />
          </div>
        </div>

        <div
          className={`p-6 rounded-3xl shadow-xl ${isLight
              ? "bg-white border border-gray-200"
              : "bg-[#0e2418] border border-green-900/40"
            }`}
        >
          <img
            src="https://images.unsplash.com/photo-1556742031-c6961e8560b0"
            alt="App Preview"
            className="rounded-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
}

function Step({ number, title, text, isLight }) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-white ${isLight ? "bg-green-600" : "bg-green-500"
          }`}
      >
        {number}
      </div>

      <div>
        <h4
          className={`font-semibold ${isLight ? "text-gray-900" : "text-white"
            }`}
        >
          {title}
        </h4>

        <p
          className={`text-sm mt-2 ${isLight ? "text-gray-600" : "text-white/70"
            }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
