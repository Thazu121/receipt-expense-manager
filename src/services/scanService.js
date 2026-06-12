import API from "../api/api";

export const scanReceipt = async (file) => {
  const formData = new FormData();

  formData.append("receipt", file);

  const response = await API.post(
    "/scan/receipt",
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );

  return response.data;
};