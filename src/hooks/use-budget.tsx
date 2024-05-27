import { useContext } from "react";
import { BudgetContext } from "../context/budget";

export const useBudget = () => {
  return useContext(BudgetContext);
}