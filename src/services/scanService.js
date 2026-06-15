import API from "../api/api";

export const scanReceipt = async (file) => {
  try {
    const formData = new FormData();

    formData.append("receipt", file);

    const response = await API.post(
      "/scan/receipt",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};