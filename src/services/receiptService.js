import API from "../api/api";

export const saveReceipt = async (file) => {
  try {
    const formData = new FormData();
    formData.append("receipt", file);

    const response = await API.post("/receipts/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload receipt failed:", error);
    throw error?.response?.data || { message: "Upload failed" };
  }
};

export const getReceipts = async () => {
  try {
    const response = await API.get("/receipts");
    return response.data;
  } catch (error) {
    console.error("Fetch receipts failed:", error);
    throw error?.response?.data || { message: "Fetch failed" };
  }
};

export const deleteReceipt = async (id) => {
  try {
    const response = await API.delete(`/receipts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete receipt failed:", error);
    throw error?.response?.data || { message: "Delete failed" };
  }
};