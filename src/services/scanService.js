import API from "../api/api";

export const scanReceipt = async (file, receiptId) => {
  const formData = new FormData();

  formData.append("receipt", file);
  formData.append("receiptId", receiptId);

  const res = await API.post(
    "/scan/receipt",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return res.data;
}