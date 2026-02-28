import { createSlice } from "@reduxjs/toolkit";
const goalSlice = createSlice({
    name:"goal",
      initialState: {   goals: []
},
reducers:{
    addGoal: (state, action) => {
  state.goals.push(action.payload)
},

addSavings: (state, action) => {
  const { id, amount } = action.payload

  const goal = state.goals.find(g => g.id === id)

  if (goal) {
    goal.savedAmount += Number(amount)
  }
}


}

})
export const {addGoal,addSavings } = goalSlice.actions
export default goalSlice.reducer
