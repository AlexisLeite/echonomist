import { HistoryStore } from "../ExpensesHistory";
import { Card, CardContent } from "../ui/card";

export const HistoryMobile = ({ store }: { store: HistoryStore }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:hidden">
      {store.state.loadedExpenses.map((expense) => {
        return (
          <Card key={`${expense.date}_${expense.user_id}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{expense.concept}</h3>
                <span className={`px-2 py-1 rounded-full text-sm font-medium`}>
                  ${expense.amount.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-1">
                {expense.category_name || "Sin categoría"}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                {expense.author_name}
              </div>
              <div className="text-sm text-gray-500">
                {expense.date.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
