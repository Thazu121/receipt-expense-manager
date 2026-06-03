import API from "../../api/api";

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