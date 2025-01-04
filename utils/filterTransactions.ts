import { Transaction } from "@/client";
import { DateTime } from "luxon";

type TransactionByDate = {
  [key: string]: Transaction[];
};

const dateReducer = (acc: TransactionByDate, t: Transaction) => {
  const date = DateTime.fromSQL(t.date, {
    zone: "utc",
  }).toFormat("dd-MM-yyyy");

  if (!date) {
    return acc;
  }

  if (acc[date]) {
    acc[date].push(t);
  } else {
    acc[date] = [t];
  }
  return acc;
};

export default function filterTransactions(
  transactions: Transaction[],
  type: string,
  date: string,
  category: number
) {
  const sortedTransaction = transactions.slice().reverse();
  if (type === "all" && date === "" && category === 0) {
    return sortedTransaction.reduce(dateReducer, {});
  }

  return sortedTransaction
    .filter((t) => {
      const transactionDate = DateTime.fromSQL(t.date, {
        zone: "utc",
      }).toFormat("yyyy-MM-dd");
      const isDate = date === "" || date === transactionDate;
      const isType =
        (type === "income" && t.amount > 0) ||
        (type === "expense" && t.amount < 0) ||
        type === "all";
      const isCategory =
        category === 0 ||
        t.categories.map((c) => c.id).includes(category) ||
        (category === -1 && t.categories.length === 0);

      return isType && isDate && isCategory;
    })
    .reduce(dateReducer, {});
}
