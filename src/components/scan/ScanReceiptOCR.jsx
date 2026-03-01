import Tesseract from "tesseract.js";

/* =========================================
   🧠 SMART CATEGORY DETECTION (Weighted)
========================================= */
const detectCategory = (text) => {
  const lower = text.toLowerCase();

  const categories = {
    Transport: {
      keywords: ["uber", "ola", "petrol", "fuel", "bus", "train", "metro"],
      weight: 2,
    },
    Food: {
      keywords: [
        "restaurant",
        "cafe",
        "hotel",
        "coffee",
        "pizza",
        "burger",
        "swiggy",
        "zomato",
      ],
      weight: 2,
    },
    Grocery: {
      keywords: [
        "supermarket",
        "grocery",
        "vegetable",
        "fruits",
        "rice",
        "milk",
        "bread",
        "d mart",
        "lulu",
        "reliance",
      ],
      weight: 3,
    },
    Shopping: {
      keywords: ["amazon", "flipkart", "mall", "clothing", "fashion"],
      weight: 2,
    },
    Health: {
      keywords: ["hospital", "pharmacy", "medical", "clinic", "apollo"],
      weight: 3,
    },
    Bills: {
      keywords: [
        "electricity",
        "water bill",
        "internet",
        "wifi",
        "recharge",
        "broadband",
      ],
      weight: 3,
    },
    Entertainment: {
      keywords: ["movie", "cinema", "theatre", "netflix", "prime"],
      weight: 2,
    },
  };

  const scores = {};

  Object.keys(categories).forEach((cat) => {
    scores[cat] = 0;
  });

  for (const category in categories) {
    const { keywords, weight } = categories[category];

    keywords.forEach((keyword) => {
      if (lower.includes(keyword)) {
        scores[category] += weight;
      }
    });
  }

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

/* =========================================
   🔍 DUPLICATE RECEIPT DETECTION
========================================= */
export const isDuplicateReceipt = (newReceipt, existingReceipts) => {
  return existingReceipts.some(
    (r) =>
      r.store === newReceipt.store &&
      r.date === newReceipt.date &&
      Number(r.amount) === Number(newReceipt.amount)
  );
};

/* =========================================
   🚀 MAIN OCR FUNCTION
========================================= */
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
    if (!text) {
      return { success: false, message: "No text detected." };
    }

    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    /* =========================================
       1️⃣ STORE NAME EXTRACTION
    ========================================= */
    const cleanLines = lines.filter((line) => {
      const lower = line.toLowerCase();

      return (
        line.length > 2 &&
        !lower.includes("tax") &&
        !lower.includes("invoice") &&
        !lower.includes("receipt") &&
        !lower.includes("gst") &&
        !/\d{5,}/.test(line)
      );
    });

    let store = cleanLines[0] || "Unknown Store";
    store = store.replace(/[^a-zA-Z0-9 &.-]/g, "").trim();

    /* =========================================
       2️⃣ DATE EXTRACTION
    ========================================= */
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

    /* =========================================
       3️⃣ CURRENCY DETECTION (CODE BASED)
    ========================================= */
    let currency = "USD";

    if (text.includes("₹") || /rs\.?/i.test(text)) {
      currency = "INR";
    } else if (text.includes("€")) {
      currency = "EUR";
    } else if (text.includes("$")) {
      currency = "USD";
    }

    /* =========================================
       4️⃣ AMOUNT EXTRACTION
    ========================================= */
    let amount = null;

    const totalMatch = text.match(
      /(total|grand total|amount due)[^\d]*([\d,.]+\.\d{1,2})/i
    );

    if (totalMatch) {
      amount = parseFloat(totalMatch[2].replace(/,/g, ""));
    } else {
      const amounts = text.match(/\d+[.,]?\d{0,2}/g);

      if (amounts?.length) {
        const numericValues = amounts
          .map((a) => parseFloat(a.replace(/,/g, "")))
          .filter((n) => n > 10);

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

    /* =========================================
       5️⃣ CATEGORY DETECTION
    ========================================= */
    const category = detectCategory(text);

    /* =========================================
       ✅ FINAL RETURN
    ========================================= */
    return {
      success: true,
      data: {
        store,
        date,
        amount: Number(amount.toFixed(2)),
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
