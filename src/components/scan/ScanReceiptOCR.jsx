import Tesseract from "tesseract.js";

// -----------------------------------
// 🔥 CATEGORY DETECTION FUNCTION
// -----------------------------------
const detectCategory = (text) => {
  const lower = text.toLowerCase();

  if (/uber|ola|petrol|fuel|bus|train|metro/i.test(lower)) {
    return "Transport";
  }

  if (/restaurant|cafe|hotel|food|coffee|bakery|pizza|burger/i.test(lower)) {
    return "Food";
  }

  if (/amazon|flipkart|shopping|mall|store|mart/i.test(lower)) {
    return "Shopping";
  }

  if (/hospital|pharmacy|medical|clinic|lab/i.test(lower)) {
    return "Health";
  }

  if (/electricity|water bill|internet|wifi|recharge|broadband/i.test(lower)) {
    return "Bills";
  }

  if (/movie|cinema|theatre|netflix|amazon prime/i.test(lower)) {
    return "Entertainment";
  }

  return "General";
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

    const text = result.data.text || "";
    console.log("RAW OCR TEXT:", text);

    // -----------------------------------
    // 1️⃣ Extract Store Name
    // -----------------------------------
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let store = lines.length > 0 ? lines[0] : "Unknown Store";

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

    let date = "";

    if (dateMatch) {
      const parsedDate = new Date(dateMatch[0]);

      if (!isNaN(parsedDate) && parsedDate.getFullYear() >= 2022) {
        date = parsedDate.toISOString().split("T")[0];
      } else {
        date = new Date().toISOString().split("T")[0];
      }
    } else {
      date = new Date().toISOString().split("T")[0];
    }

    // -----------------------------------
    // 3️⃣ Detect Currency
    // -----------------------------------
    let currency = "$";

    if (text.includes("₹") || /rs\.?/i.test(text)) {
      currency = "₹";
    } else if (text.includes("$")) {
      currency = "$";
    } else if (text.includes("€")) {
      currency = "€";
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

      if (amounts && amounts.length > 0) {
        const numericValues = amounts
          .map((a) => parseFloat(a.replace(/,/g, "")))
          .filter((n) => n > 1);

        if (numericValues.length > 0) {
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
    // 5️⃣ 🔥 AUTO CATEGORY DETECTION
    // -----------------------------------
    const category = detectCategory(text);

    console.log("DETECTED CATEGORY:", category);

    // -----------------------------------
    // ✅ RETURN CLEAN DATA
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
