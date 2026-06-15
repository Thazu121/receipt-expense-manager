import API from "../../api/api";

export const getReceipts = async () => {
  const response = await API.get("/receipts");

  return {
    ...response.data,
    receipts: Array.from(
      new Map(
        (response.data.receipts || []).map((receipt) => [
          receipt.fileHash ||
            receipt.cloudinaryId ||
            receipt.imageUrl ||
            receipt._id,
          receipt,
        ])
      ).values()
    ),
  };
};

export const deleteReceipt = async (id) => {
  const response = await API.delete(`/receipts/${id}`);

  return response.data;
};