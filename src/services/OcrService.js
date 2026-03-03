import Tesseract from "tesseract.js";

/* =====================================================
   🧠 MAIN OCR FUNCTION
===================================================== */

export const scanReceiptOCR = async (base64Image, onProgress) => {
  const result = await Tesseract.recognize(base64Image, "eng", {
    logger: (m) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });

  const text = result.data.text;
  const category = detectCategory(text);

  return {
    merchant: detectMerchant(text),
    date: detectDate(text),
    amount: detectAmount(text),
    category,
        rawText: text,

    confidence: result.data.confidence / 100,
  };
};
const detectCategory = (text) => {
  const lower = text.toLowerCase();
  const lines = lower.split("\n").filter(Boolean);

  /* ----------------------------------
     1️⃣ MERCHANT DATABASE (Strong weight)
  ---------------------------------- */

  const merchantMap = {
    "indian oil": "Fuel",
    "bharat petroleum": "Fuel",
    "hp petrol": "Fuel",
    "shell": "Fuel",

    "kfc": "Food",
    "mcdonald": "Food",
    "pizza hut": "Food",
    "dominos": "Food",

    "amazon": "Shopping",
    "flipkart": "Shopping",

    "apollo pharmacy": "Medical",
    "medplus": "Medical",

    "reliance fresh": "Grocery",
    "big bazaar": "Grocery",
    "d mart": "Grocery",
  };

  for (const merchant in merchantMap) {
    if (lower.includes(merchant)) {
      return merchantMap[merchant];
    }
  }

  /* ----------------------------------
     2️⃣ KEYWORD SCORING
  ---------------------------------- */

  const categories = {
    Food: [
      "restaurant",
      "cafe",
      "food",
      "burger",
      "pizza",
      "meal",
      "dine",
      "hotel",
      "bakery",
    ],

    Grocery: [
      "supermarket",
      "mart",
      "grocery",
      "vegetable",
      "milk",
      "rice",
      "atta",
      "provision",
    ],

    Fuel: [
      "petrol",
      "diesel",
      "fuel",
      "ltr",
      "litre",
    ],

    Medical: [
      "pharmacy",
      "medical",
      "clinic",
      "tablet",
      "capsule",
      "drug",
    ],

    Shopping: [
      "fashion",
      "clothing",
      "electronics",
      "retail",
      "mall",
    ],
  };

  const scores = {};
  Object.keys(categories).forEach(
    (cat) => (scores[cat] = 0)
  );

  // 🔹 Weight first 3 lines (merchant name zone)
  lines.slice(0, 3).forEach((line) => {
    for (const category in categories) {
      categories[category].forEach((keyword) => {
        if (line.includes(keyword)) {
          scores[category] += 3;
        }
      });
    }
  });

  // 🔹 Full text scan
  lines.forEach((line) => {
    for (const category in categories) {
      categories[category].forEach((keyword) => {
        if (line.includes(keyword)) {
          scores[category] += 1;
        }
      });
    }
  });

  /* ----------------------------------
     3️⃣ STRUCTURE LOGIC BOOST
  ---------------------------------- */

  // Many item lines → likely Grocery
  if (lines.length > 20) {
    scores["Grocery"] += 2;
  }

  // If litre present → definitely Fuel
  if (lower.includes("litre") || lower.includes("ltr")) {
    scores["Fuel"] += 5;
  }

  // Tablets mention → Medical
  if (lower.includes("tablet") || lower.includes("capsule")) {
    scores["Medical"] += 4;
  }

  /* ----------------------------------
     4️⃣ PICK BEST
  ---------------------------------- */

  let bestCategory = "General";
  let maxScore = 0;

  for (const category in scores) {
    if (scores[category] > maxScore) {
      maxScore = scores[category];
      bestCategory = category;
    }
  }

  return maxScore === 0 ? "General" : bestCategory;
};

/* =====================================================
   🏪 MERCHANT DETECTION
===================================================== */

const detectMerchant = (text) => {
  const lines = text.split("\n").filter(Boolean);

  // Usually first non-empty line is merchant
  for (let line of lines) {
    if (line.length > 3 && !line.match(/\d/)) {
      return line.trim();
    }
  }

  return "Unknown Merchant";
};

/* =====================================================
   📅 DATE DETECTION
===================================================== */

const detectDate = (text) => {
  // Matches:
  // 23/02/2021
  // 23-02-2021
  // 23.02.2021
  const dateRegex =
    /\b(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})\b/;

  const match = text.match(dateRegex);
  return match ? match[1] : "";
};

/* =====================================================
   💰 PROFESSIONAL AMOUNT DETECTION
===================================================== */

const detectAmount = (text) => {
  const lines = text.split("\n");

  let totalAmount = null;
  let subTotalAmount = null;
  let highestAmount = 0;

  for (let line of lines) {
    const lower = line.toLowerCase();

    // Extract numbers like:
    // 1,250.00
    // 1250.00
    // ₹1,250.00
    const match = line.match(
      /(?:₹|\$|aed|inr|rs\.?)?\s?([\d,]+\.\d{2})/i
    );

    if (!match) continue;

    // Remove commas
    const amount = parseFloat(
      match[1].replace(/,/g, "")
    );

    if (isNaN(amount)) continue;

    // PRIORITY 1 → TOTAL
    if (
      lower.includes("total") &&
      !lower.includes("subtotal") &&
      !lower.includes("total qty")
    ) {
      totalAmount = amount;
    }

    // PRIORITY 2 → SUBTOTAL
    if (lower.includes("subtotal")) {
      subTotalAmount = amount;
    }

    // Track highest amount
    if (amount > highestAmount) {
      highestAmount = amount;
    }
  }

  return totalAmount || subTotalAmount || highestAmount || 0;
};
