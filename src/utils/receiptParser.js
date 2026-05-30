export const detectMerchant = (
  text
) => {
  const lines =
    text.split("\n");

  return (
    lines.find(
      (line) =>
        line.length > 3 &&
        !/\d/.test(line)
    ) || "Unknown"
  );
};

export const detectDate = (
  text
) => {
  const match =
    text.match(
      /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/
    );

  return match
    ? match[0]
    : "";
};

export const detectAmount = (
  text
) => {

  const amounts =
    text.match(
      /\d+\.\d{2}/g
    );

  if (!amounts)
    return 0;

  return Math.max(
    ...amounts.map(Number)
  );
};

export const detectCategory = (
  text
) => {

  const lower =
    text.toLowerCase();

  if (
    lower.includes("kfc") ||
    lower.includes("pizza")
  )
    return "Food";

  if (
    lower.includes("petrol")
  )
    return "Fuel";

  if (
    lower.includes("amazon")
  )
    return "Shopping";

  return "General";
};