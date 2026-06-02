import API from "../api/api";

/**
 * Upload receipt for OCR scanning
 */
export const scanReceipt = async (file) => {
  try {
    const formData = new FormData();
    formData.append("receipt", file)

    const response = await API.post(
      "/scan/receipt", 
      formData
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "OCR scan failed"
    );
  }
};