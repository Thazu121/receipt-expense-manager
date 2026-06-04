import API from "../api/api";

export const scanReceipt = async (file) => {
  const formData = new FormData();

  formData.append("receipt", file);

  const res = await API.post(
    "/scan/receipt",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};