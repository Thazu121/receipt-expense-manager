import API from "../api/api";

export const saveReceipt = async (data) => {
  const response = await API.post(
    "/receipts",
    data
  );

  return response.data;
};

export const getReceipts = async () => {
  const response =
    await API.get("/receipts");

  return response.data;
};

export const deleteReceipt = async (id) => {
  const response =
    await API.delete(
      `/receipts/${id}`
    );

  return response.data;
};