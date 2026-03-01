export const formatCurrency = (amount, currency = "INR") => {
  const validCurrency = typeof currency === "string" && currency.length === 3
    ? currency.toUpperCase()
    : "INR";

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: validCurrency,
      minimumFractionDigits: 2,
    }).format(Number(amount) || 0);
  } catch (error) {
    return `₹${Number(amount || 0).toFixed(2)}`;
  }
};
