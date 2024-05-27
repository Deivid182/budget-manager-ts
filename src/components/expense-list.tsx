import { useMemo } from "react"
import { useBudget } from "../hooks/use-budget"
import ExpenseItem from "./expense-item"
const ExpenseList = () => {

  const { state } = useBudget()
  
  const filteredExpenses = useMemo(() => {
    return state.currentCategory === "" ? state.expenses : state.expenses.filter((expense) => expense.category === state.currentCategory)
  }, [state.currentCategory, state.expenses])

  const isEmpty = useMemo(() => {
    return filteredExpenses.length === 0
  }, [filteredExpenses])

  return (
    <div className="mt-10">
      {
        isEmpty ? (
          <p className="text-2xl">No expenses yet</p>
        ) : (
          <div className="space-y-5">
            <p className="text-2xl text-gray-600 font-bold ">Expenses</p>
            {filteredExpenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))}
          </div>
        )
      }
    </div>
  )
}

export default ExpenseList