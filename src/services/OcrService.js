import Tesseract from "tesseract.js";

export const scanReceiptOCR = async (
  base64Image,
  onProgress
) => {

  const result =
    await Tesseract.recognize(
      base64Image,
      "eng",

      {
        logger: (m) => {

          if (
            m.status ===
              "recognizing text" &&
            onProgress
          ) {
            onProgress(
              Math.round(
                m.progress * 100
              )
            );
          }
        },
      }
    );



  const text =
    result.data.text;



  const confidence =
    result.data.confidence / 100;



  if (confidence < 0.4) {
    throw new Error(
      "Low OCR confidence"
    );
  }



  return {

    merchant:
      detectMerchant(text),

    date:
      detectDate(text),

    amount:
      detectAmount(text),

    category:
      detectCategory(text),

    rawText: text,

    confidence,
  };
};






const detectCategory = (text) => {

  const lower =
    text.toLowerCase();

  const lines =
    lower
      .split("\n")
      .filter(Boolean);



  const merchantMap = {

    "indian oil": "Fuel",
    "bharat petroleum": "Fuel",
    "hp petrol": "Fuel",
    shell: "Fuel",

    kfc: "Food",
    mcdonald: "Food",
    "pizza hut": "Food",
    dominos: "Food",

    amazon: "Shopping",
    flipkart: "Shopping",

    "apollo pharmacy":
      "Medical",

    medplus: "Medical",

    "reliance fresh":
      "Grocery",

    "big bazaar":
      "Grocery",

    "d mart":
      "Grocery",
  };



  for (const merchant in merchantMap) {

    if (
      lower.includes(merchant)
    ) {
      return merchantMap[
        merchant
      ];
    }
  }



  const categories = {

    Food: [
      "restaurant",
      "cafe",
      "food",
      "burger",
      "pizza",
      "meal",
      "bakery",
    ],

    Grocery: [
      "supermarket",
      "mart",
      "grocery",
      "vegetable",
      "milk",
      "rice",
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
      "tablet",
      "capsule",
    ],

    Shopping: [
      "fashion",
      "electronics",
      "mall",
      "retail",
    ],
  };



  const scores = {};



  Object.keys(categories)
    .forEach((cat) => {
      scores[cat] = 0;
    });



  lines.forEach((line) => {

    for (const category in categories) {

      categories[
        category
      ].forEach((keyword) => {

        if (
          line.includes(keyword)
        ) {
          scores[
            category
          ] += 1;
        }
      });
    }
  });



  let bestCategory =
    "General";

  let maxScore = 0;



  for (const category in scores) {

    if (
      scores[category] >
      maxScore
    ) {

      maxScore =
        scores[category];

      bestCategory =
        category;
    }
  }



  return maxScore === 0
    ? "General"
    : bestCategory;
};






const detectMerchant = (
  text
) => {

  const lines =
    text
      .split("\n")
      .filter(Boolean);



  for (let line of lines) {

    if (
      line.length > 3 &&
      !line.match(/\d/)
    ) {

      return line
        .replace(
          /[^a-zA-Z0-9\s]/g,
          ""
        )
        .trim();
    }
  }



  return "Unknown Merchant";
};






const detectDate = (text) => {

  const dateRegex =
    /\b(\d{1,4}[\/\-.]\d{1,2}[\/\-.]\d{1,4})\b/;



  const match =
    text.match(dateRegex);



  return match
    ? match[1]
    : "";
};






const detectAmount = (
  text
) => {

  const lines =
    text.split("\n");



  let totalAmount =
    null;

  let subTotalAmount =
    null;

  let highestAmount =
    0;



  for (let line of lines) {

    const lower =
      line.toLowerCase();



    const match =
      line.match(
        /(?:₹|rs\.?|inr|\$)?\s*([\d,]+(?:\.\d{1,2})?)/i
      );



    if (!match)
      continue;



    const amount =
      parseFloat(
        match[1].replace(
          /,/g,
          ""
        )
      );



    if (isNaN(amount))
      continue;



    if (
      lower.includes(
        "total"
      ) &&
      !lower.includes(
        "subtotal"
      )
    ) {

      totalAmount =
        amount;
    }



    if (
      lower.includes(
        "subtotal"
      )
    ) {

      subTotalAmount =
        amount;
    }



    if (
      amount >
      highestAmount
    ) {

      highestAmount =
        amount;
    }
  }



  return (
    totalAmount ||
    subTotalAmount ||
    highestAmount ||
    0
  )
}