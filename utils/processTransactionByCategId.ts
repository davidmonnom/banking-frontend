import { Transaction } from "@/client";

export type TransactionByCategIds = {
  [key: number]: {
    expense: number;
    income: number;
    nbrTransactions: number;
    transactions: Transaction[];
  };
};

export const processTransactionByCategId = (
  transactions: Transaction[]
): TransactionByCategIds => {
  return transactions
    .filter((t) => t.amount < 0)
    .reduce((acc: any, curr) => {
      for (const category of curr.categories) {
        if (!acc[category.id]) {
          acc[category.id] = {
            transactions: [curr],
            expense: curr.amount < 0 ? Math.abs(curr.amount) : 0,
            income: curr.amount > 0 ? curr.amount : 0,
            nbrTransactions: 1,
          };
        } else {
          acc[category.id].nbrTransactions++;
          acc[category.id].expense +=
            curr.amount < 0 ? Math.abs(curr.amount) : 0;
          acc[category.id].income += curr.amount > 0 ? curr.amount : 0;
          acc[category.id].transactions.push(curr);
        }
      }

      if (curr.categories.length === 0) {
        if (!acc[-1]) {
          acc[-1] = {
            transactions: [curr],
            nbrTransactions: 1,
            income: curr.amount > 0 ? curr.amount : 0,
            expense: curr.amount < 0 ? Math.abs(curr.amount) : 0,
          };
        } else {
          acc[-1].nbrTransactions++;
          acc[-1].transactions.push(curr);
          acc[-1].amount += Math.abs(curr.amount);
          acc[-1].income += curr.amount > 0 ? curr.amount : 0;
          acc[-1].expense +=
            curr.amount < 0 ? Math.abs(curr.amount) : 0;
        }
      }

      return acc;
    }, {});
};
