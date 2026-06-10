import API from "../api/api";

export const getRecurringExpenses = async () => {
  const res = await API.get("/recurring");
  return res.data;
};

export const createRecurringExpense = async (data) => {
  const res = await API.post("/recurring", data);
  return res.data;
};

export const deleteRecurringExpense = async (id) => {
  const res = await API.delete(`/recurring/${id}`);
  return res.data;
};

export const toggleRecurringExpense = async (id) => {
  const res = await API.patch(`/recurring/${id}/toggle`);
  return res.data;
};