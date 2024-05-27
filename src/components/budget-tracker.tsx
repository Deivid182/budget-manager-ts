import { useBudget } from "../hooks/use-budget";
import AmountDisplay from "./amount-display";
import ExpenseModal from "./expense-modal";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BudgetTracker = () => {
  const { state, totalExpenses, remaining, dispatch } = useBudget();

  const percentajeSpent = Math.round((totalExpenses / state.budget) * 100);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentajeSpent}
          text={`${percentajeSpent}% Spent`}
          styles={buildStyles({
            textColor: "#3b82f6",
            pathColor: "#3b82f6",
            trailColor: "#f5f5f5",
            textSize: "12px",

          })}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          onClick={() => dispatch({ type: "reset-app" })}
          type="button"
          className="bg-pink-600 text-white w-full p-2 rounded-lg font-semibold uppercase hover:bg-pink-700 disabled:bg-pink-300 disabled:cursor-not-allowed"
        >
          Reset App
        </button>
        <AmountDisplay label="Budget" amount={state.budget} />
        <AmountDisplay label="Remaining" amount={remaining} />
        <AmountDisplay label="Spent" amount={totalExpenses} />
      </div>
      <ExpenseModal />
    </div>
  );
};

export default BudgetTracker;
