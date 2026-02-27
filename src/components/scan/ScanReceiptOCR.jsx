import Tesseract from "tesseract.js";

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
    // 1️⃣ Extract & Clean Store Name
    // -----------------------------------
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let store = lines.length > 0 ? lines[0] : "Unknown Store";

    // Remove unwanted lines
    if (
      store.toLowerCase().includes("tax") ||
      store.toLowerCase().includes("invoice") ||
      store.toLowerCase().includes("receipt")
    ) {
      store = lines[1] || "Unknown Store";
    }

    // -----------------------------------
    // 2️⃣ Extract Date (With Validation)
    // -----------------------------------
    const dateMatch = text.match(
      /\b(\d{2}[\/\-]\d{2}[\/\-]\d{2,4}|\d{4}[\/\-]\d{2}[\/\-]\d{2})\b/
    );

    let date = "";

    if (dateMatch) {
      const parsedDate = new Date(dateMatch[0]);

      // Prevent very old wrong dates
      if (parsedDate.getFullYear() >= 2022) {
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
    let currency = "$"; // default

    if (text.includes("₹") || text.includes("Rs")) {
      currency = "₹";
    } else if (text.includes("$")) {
      currency = "$";
    }

    // -----------------------------------
    // 4️⃣ Extract Amount (Improved Logic)
    // -----------------------------------
    let amount = "";

    // Try TOTAL line first
    const totalMatch = text.match(
      /(total|grand total|amount due)[^\d]*([\d,.]+\.\d{1,2})/i
    );

    if (totalMatch) {
      amount = parseFloat(totalMatch[2].replace(/,/g, ""));
    } else {
      // Fallback: capture all decimal numbers
      const amounts = text.match(/[\d,.]+\.\d{1,2}/g);

      if (amounts && amounts.length > 0) {
        const numericValues = amounts
          .map((a) => parseFloat(a.replace(/,/g, "")))
          .filter((n) => n > 1); // ignore tiny numbers like 0.50 tax

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
    // 5️⃣ Default Category
    // -----------------------------------
    const category = "General";

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
