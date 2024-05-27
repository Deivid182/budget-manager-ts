import { useState, useMemo } from "react";
import { useBudget } from "../hooks/use-budget";
const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
  };

  const isNotValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNotValid) return;
    dispatch({ type: "add-budget", payload: { budget } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex-col flex gap-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Enter your budget
        </label>
        <input
          type="number"
          id="budget"
          name="budget"
          autoFocus
          value={budget}
          onChange={handleChange}
          className="w-full border-2 bg-white outline-none border-gray-600 p-2 rounded-lg focus:border-blue-600"
        />
      </div>
      <button
        className="bg-blue-600 text-white text-2xl font-bold py-2 px-4 rounded-lg hover:bg-blue-700 w-full uppercase disabled:bg-gray-500 disabled:cursor-not-allowed"
        type="submit"
        disabled={isNotValid}
      >
        Submit
      </button>
    </form>
  );
};

export default BudgetForm;
