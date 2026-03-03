/* =========================================
   SMART RECEIPT EXTRACTOR (AI-STYLE LOGIC)
========================================= */

export const extractReceiptData = (rawText) => {
  if (!rawText) return null;

  const lines = rawText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 2);

  const merchant = detectMerchant(lines);
  const date = detectDate(rawText);
  const amount = detectTotalAmount(rawText);
  const category = detectCategory(merchant);

  return {
    store: merchant,
    date: date || new Date().toISOString(),
    amount: amount || 0,
    category,
    confidence: calculateConfidence(merchant, date, amount),
  };
};

/* =========================================
   MERCHANT DETECTION
========================================= */

const detectMerchant = (lines) => {
  const blacklist = [
    "receipt",
    "invoice",
    "total",
    "amount",
    "tax",
    "date",
    "payment",
  ];

  for (let line of lines.slice(0, 8)) {
    const lower = line.toLowerCase();

    if (
      !lower.includes("@") &&
      !/\d/.test(line) &&
      !blacklist.some((word) => lower.includes(word)) &&
      line.length > 4
    ) {
      return line;
    }
  }

  return "Unknown Merchant";
};

/* =========================================
   DATE DETECTION
========================================= */

const detectDate = (text) => {
  const patterns = [
    /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/,
    /\b\w+\s\d{1,2},\s\d{4}\b/,
    /\b\d{4}-\d{2}-\d{2}\b/,
  ];

  for (let pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }

  return null;
};

/* =========================================
   TOTAL AMOUNT DETECTION
========================================= */

const detectTotalAmount = (text) => {
  const amountRegex = /₹?\s?(\d+(\.\d{2})?)/g;

  const matches = [...text.matchAll(amountRegex)];
  if (!matches.length) return 0;

  const values = matches.map((m) => parseFloat(m[1]));

  return Math.max(...values); // highest amount usually total
};

/* =========================================
   AUTO CATEGORY DETECTION
========================================= */

const detectCategory = (merchant) => {
  const name = merchant.toLowerCase();

  if (name.includes("rent") || name.includes("real estate"))
    return "Rent";

  if (
    name.includes("mart") ||
    name.includes("store") ||
    name.includes("supermarket")
  )
    return "Groceries";

  if (
    name.includes("fuel") ||
    name.includes("petrol") ||
    name.includes("gas")
  )
    return "Fuel";

  if (
    name.includes("restaurant") ||
    name.includes("cafe") ||
    name.includes("hotel")
  )
    return "Food";

  if (
    name.includes("amazon") ||
    name.includes("flipkart") ||
    name.includes("online")
  )
    return "Shopping";

  return "Other";
};

/* =========================================
   CONFIDENCE SCORE
========================================= */

const calculateConfidence = (merchant, date, amount) => {
  let score = 0;

  if (merchant && merchant !== "Unknown Merchant") score += 30;
  if (date) score += 30;
  if (amount && amount > 0) score += 40;

  return score; // out of 100
};
