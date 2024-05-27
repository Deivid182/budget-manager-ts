import { useMemo } from "react";
import BudgetForm from "./components/budget-form";
import BudgetTracker from "./components/budget-tracker";
import FilterByCategory from "./components/filter-by-category";
import { useBudget } from "./hooks/use-budget";
import ExpenseList from "./components/expense-list";
const App = () => {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => {
    return state.budget > 0;
  }, [state.budget]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 py-8">
        <h1 className="text-4xl font-black uppercase text-white text-center">
          Budget Manager
        </h1>
      </header>
      <div className="max-w-3xl mx-auto rounded-lg bg-white shadow-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
        </main>
      )}
    </div>
  );
};

export default App;
