import { DraftExpense, Expense } from "../types"

const initialBudget = () => {
  const storedBudget = localStorage.getItem("budget")
  return storedBudget ? Number(storedBudget) : 0
}

const getStoredExpenses = () =>{
  const storedExpenses = localStorage.getItem("expenses")
  return storedExpenses ? JSON.parse(storedExpenses) : []
}


export type BudgetActions =
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'show-modal' } |
  { type: 'close-modal' } |
  { type: 'add-expense', payload: { expense: DraftExpense } } |
  { type: "remove-expense", payload: { id: Expense["id"] } } |
  { type: "get-expense-by-id", payload: { id: Expense["id"] } } |
  { type: "update-expense", payload: { expense: Expense } } |
  { type: "add-filter-category", payload: { id: Expense["id"] } } |
  { type: "reset-app" }

export type BudgetState = {
  budget: number
  modal: boolean
  expenses: Expense[]
  editingId: Expense["id"]
  currentCategory: string
}


export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: getStoredExpenses(),
  editingId: "",
  currentCategory: "",
}

const createExpense = (expense: DraftExpense): Expense => {
  return {
    ...expense,
    id: crypto.randomUUID()
  }
}

export const budgetReducer = (
  state: BudgetState,
  action: BudgetActions
) : BudgetState => {

  if (action.type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget
    }
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true
    }
  }

  if (action.type === 'close-modal') {
    return {
      ...state,
      modal: false,
      editingId: '',
    }
  }

  if (action.type === 'add-expense') {
    return {
      ...state,
      expenses: [...state.expenses, createExpense(action.payload.expense)],
      modal: false
    }
  }

  if(action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload.id)
    }
  }

  if(action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true
    }
  }

  if(action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((expense) => expense.id === action.payload.expense.id ? action.payload.expense : expense),
      modal: false,
      editingId: ""
    }
  }

  if(action.type === "add-filter-category") {
    return {
      ...state,
      currentCategory: action.payload.id
    }
  }

  if(action.type === "reset-app") {
    return {
      ...state,
      budget: 0,
      expenses: [],
    }
  }
  return state
}