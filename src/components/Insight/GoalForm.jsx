import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGoal } from "../../redux/features/goalSlice";

export default function AddGoalCard() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const handleAddGoal = () => {
    if (!title || !targetAmount) return;

    dispatch(
      addGoal({
        id: Date.now(),
        title,
        targetAmount: Number(targetAmount),
        savedAmount: 0,
      })
    );

    setTitle("");
    setTargetAmount("");
  };

  return (
    <div className="bg-white dark:bg-[#0F1B22] p-5 rounded-2xl shadow-sm">
      <h2 className="font-semibold mb-4">Add New Goal</h2>

      <input
        type="text"
        placeholder="Goal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <button
        onClick={handleAddGoal}
        className="bg-emerald-500 text-white px-4 py-2 rounded-lg w-full"
      >
        Add Goal
      </button>
    </div>
  );
}
