import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import AmountDisplay from "./amount-display";
import { Expense } from "../types";
import { formatDate } from "../helpers";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/use-budget";

type Props = {
  expense: Expense;
};
const ExpenseItem = ({ expense }: Props) => {
  const categoryInfo = useMemo(() => {
    return categories.filter((category) => category.id === expense.category)[0];
  }, [expense.category]);

  const { dispatch } = useBudget()

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({ type: "get-expense-by-id", payload: { id: expense.id }})}>
        Update
      </SwipeAction>
    </LeadingActions>
  );
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => dispatch({ type: "remove-expense", payload: { id: expense.id } })}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );
  
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5">
          <div>
            <img
              src={`/${categoryInfo.icon}`}
              alt="category icon"
              width={50}
              height={50}
              className="rounded-full size-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-lg font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p className="">{expense.name}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default ExpenseItem;
