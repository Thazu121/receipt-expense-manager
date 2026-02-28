import { createSlice } from "@reduxjs/toolkit";

/* ==========================
   Load from localStorage
========================== */
const loadGoals = () => {
  const data = localStorage.getItem("goals");
  return data ? JSON.parse(data) : [];
};

const goalSlice = createSlice({
  name: "goal",

  initialState: {
    goals: loadGoals(),
  },

  reducers: {
    addGoal: (state, action) => {
      state.goals.push({
        ...action.payload,
        savedAmount: action.payload.savedAmount || 0,
      });

      localStorage.setItem(
        "goals",
        JSON.stringify(state.goals)
      );
    },

    addSavings: (state, action) => {
      const { id, amount } = action.payload;

      const goal = state.goals.find(
        (g) => g.id === id
      );

      if (goal) {
        goal.savedAmount =
          (goal.savedAmount || 0) + Number(amount);

        localStorage.setItem(
          "goals",
          JSON.stringify(state.goals)
        );
      }
    },
  },
});

export const { addGoal, addSavings } =
  goalSlice.actions;

export default goalSlice.reducer;
