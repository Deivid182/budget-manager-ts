import { useEffect, useState } from "react";
import ErrorMessage from "./error-message";
import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import { useBudget } from "../hooks/use-budget";
const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    name: "",
    amount: 0,
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState("");
  const { dispatch, state, remaining } = useBudget();
  const [previousAmount, setPreviousAmount] = useState(0);

  useEffect(() => {
    if (state.editingId) {
      const expense = state.expenses.find(
        (expense) => expense.id === state.editingId
      );
      if (expense) {
        setExpense(expense);
        setPreviousAmount(expense.amount);
      }
    }
  }, [state.editingId, state.expenses]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const isNumericField = ["amount"].includes(name);

    setExpense({ ...expense, [name]: isNumericField ? Number(value) : value });
  };

  const handleChangeDate = (date: Value) => {
    setExpense({ ...expense, date });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).some((value) => !value)) {
      setError("All fields are required");
      return;
    }

    if ((expense.amount - previousAmount) > remaining) {
      setError("You don't have enough money");
      return;
    }
    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { ...expense, id: state.editingId } },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }
    setExpense({ name: "", amount: 0, category: "", date: new Date() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <legend className="text-2xl font-black border-b-4 border-blue-500 text-center uppercase">
        {state.editingId ? "Update Expense" : "Add Expense"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xl">
          Expense Name
        </label>
        <input
          type="text"
          autoFocus
          value={expense.name}
          onChange={handleChange}
          id="name"
          name="name"
          className="w-full border-2 bg-white outline-none border-gray-600 p-2 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Expense Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          className="w-full border-2 bg-white outline-none border-gray-600 p-2 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Category
        </label>
        <select
          name="category"
          id="category"
          value={expense.category}
          onChange={handleChange}
          className="w-full border-2 bg-white outline-none border-gray-600 p-2 rounded-lg focus:border-blue-600"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Expense Date
        </label>
        <DatePicker
          id="date"
          name="date"
          value={expense.date}
          onChange={handleChangeDate}
          className="w-full border-2 bg-white outline-none border-gray-600 p-2 rounded-lg focus:border-blue-600"
        />
      </div>

      <button
        type="submit"
        className="bg-pink-600 text-white w-full p-2 rounded-lg font-semibold uppercase hover:bg-pink-700 disabled:bg-pink-300 disabled:cursor-not-allowed"
      >
        {state.editingId ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
