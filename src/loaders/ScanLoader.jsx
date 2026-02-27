import { createWorker } from "tesseract.js";

export const scanReceiptLoader = async (file) => {
  let worker;

  try {
    // Create worker with English
    worker = await createWorker("eng");

    const {
      data: { text },
    } = await worker.recognize(file);

    await worker.terminate();

    return {
      success: true,
      store: text.split("\n")[0] || "Unknown Store",
      amount: "",
      fullText: text,
    };

  } catch (error) {
    console.error("OCR Error:", error);

    if (worker) await worker.terminate();

    return {
      success: false,
      error: "Failed to scan image",
    };
  }
};
