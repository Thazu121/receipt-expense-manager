import Tesseract from "tesseract.js";

// -----------------------------------
// 🧠 SMART CATEGORY DETECTION (Score Based)
// -----------------------------------
const detectCategory = (text) => {
  const lower = text.toLowerCase();

  const categories = {
    Transport: [
      "uber", "ola", "petrol", "fuel", "bus", "train", "metro"
    ],
    Food: [
      "restaurant", "cafe", "hotel", "coffee",
      "pizza", "burger", "bakery", "swiggy", "zomato"
    ],
    Grocery: [
      "supermarket", "grocery", "vegetable", "fruits",
      "rice", "milk", "bread", "dairy", "hypermarket",
      "lulu", "reliance fresh", "d mart", "provision"
    ],
    Shopping: [
      "amazon", "flipkart", "mall",
      "clothing", "fashion", "store"
    ],
    Health: [
      "hospital", "pharmacy", "medical",
      "clinic", "lab", "apollo"
    ],
    Bills: [
      "electricity", "water bill",
      "internet", "wifi", "recharge",
      "broadband", "bill payment"
    ],
    Entertainment: [
      "movie", "cinema", "theatre",
      "netflix", "amazon prime"
    ]
  };

  let scores = {};
  Object.keys(categories).forEach((cat) => {
    scores[cat] = 0;
  });

  // Count keyword matches
  for (const category in categories) {
    categories[category].forEach((keyword) => {
      if (lower.includes(keyword)) {
        scores[category]++;
      }
    });
  }

  console.log("CATEGORY SCORES:", scores);

  let bestCategory = "General";
  let highestScore = 0;

  for (const category in scores) {
    if (scores[category] > highestScore) {
      highestScore = scores[category];
      bestCategory = category;
    }
  }

  return highestScore > 0 ? bestCategory : "General";
};

// -----------------------------------
// 🚀 MAIN OCR FUNCTION
// -----------------------------------
export const ScanReceiptOCR = async (file, setProgress) => {
  try {
    const result = await Tesseract.recognize(file, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text" && setProgress) {
          setProgress(Math.round(m.progress * 100));
        }
      },
    });

    const text = result?.data?.text || "";
    console.log("RAW OCR TEXT:", text);

    // -----------------------------------
    // 1️⃣ Extract Store Name
    // -----------------------------------
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let store = lines[0] || "Unknown Store";

    if (
      store.toLowerCase().includes("tax") ||
      store.toLowerCase().includes("invoice") ||
      store.toLowerCase().includes("receipt")
    ) {
      store = lines[1] || "Unknown Store";
    }

    // -----------------------------------
    // 2️⃣ Extract Date
    // -----------------------------------
    const dateMatch = text.match(
      /\b(\d{2}[\/\-]\d{2}[\/\-]\d{2,4}|\d{4}[\/\-]\d{2}[\/\-]\d{2})\b/
    );

    let date = new Date().toISOString().split("T")[0];

    if (dateMatch) {
      const parsedDate = new Date(dateMatch[0]);
      if (!isNaN(parsedDate) && parsedDate.getFullYear() >= 2022) {
        date = parsedDate.toISOString().split("T")[0];
      }
    }

    // -----------------------------------
    // 3️⃣ Detect Currency
    // -----------------------------------
    let currency = "$";

    if (text.includes("₹") || /rs\.?/i.test(text)) {
      currency = "₹";
    } else if (text.includes("€")) {
      currency = "€";
    } else if (text.includes("$")) {
      currency = "$";
    }

    // -----------------------------------
    // 4️⃣ Extract Amount
    // -----------------------------------
    let amount = "";

    const totalMatch = text.match(
      /(total|grand total|amount due)[^\d]*([\d,.]+\.\d{1,2})/i
    );

    if (totalMatch) {
      amount = parseFloat(totalMatch[2].replace(/,/g, ""));
    } else {
      const amounts = text.match(/[\d,.]+\.\d{1,2}/g);

      if (amounts?.length) {
        const numericValues = amounts
          .map((a) => parseFloat(a.replace(/,/g, "")))
          .filter((n) => n > 1);

        if (numericValues.length) {
          amount = Math.max(...numericValues);
        }
      }
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      return {
        success: false,
        message: "Unable to detect valid amount.",
      };
    }

    amount = amount.toFixed(2);

    console.log("EXTRACTED AMOUNT:", amount);

    // -----------------------------------
    // 5️⃣ Smart Category Detection
    // -----------------------------------
    const category = detectCategory(text);

    console.log("DETECTED CATEGORY:", category);

    // -----------------------------------
    // ✅ Final Return
    // -----------------------------------
    return {
      success: true,
      data: {
        store,
        date,
        amount,
        currency,
        category,
        notes: "",
      },
    };
  } catch (error) {
    console.error("OCR ERROR:", error);

    return {
      success: false,
      message: "OCR processing failed.",
    };
  }
};
