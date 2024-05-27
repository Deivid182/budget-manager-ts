import { useReducer, createContext, useEffect, useMemo } from "react"
import { initialState, budgetReducer, BudgetActions } from "../reducers/budget"
type BudgetContextType = {
  state: typeof initialState
  dispatch: React.Dispatch<BudgetActions>
  totalExpenses: number
  remaining: number
}

export const BudgetContext = createContext<BudgetContextType>({} as BudgetContextType)

export const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  const totalExpenses = useMemo(() => {
    return state.expenses.reduce((total, expense) => {
      return total + expense.amount
    }, 0)
  }, [state.expenses])

  const remaining = state.budget - totalExpenses

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses))
    localStorage.setItem("budget", state.budget.toString())
  }, [state.expenses, state.budget])

  return (
    <BudgetContext.Provider value={{ state, dispatch, totalExpenses, remaining }}>
      {children}
    </BudgetContext.Provider>
  )
}