import { Transaction } from "@/client";
import { DateTime } from "luxon";

export type transactionByDateType = {
  date: string;
  expense: number;
  income: number;
  salary: number;
  dateFromatted: string;
};

export type transactionByDateObjectType = {
  [key: string]: transactionByDateType;
};

export const transactionByDate = (
  transactions: Transaction[]
): transactionByDateObjectType => {
  return transactions.reduce((acc: any, curr) => {
    const date = DateTime.fromSQL(curr.date, { zone: "utc" });
    const millis = date.toMillis();

    if (acc[millis]) {
      acc[millis].expense += curr.amount < 0 ? Math.abs(curr.amount) : 0;
      acc[millis].income += curr.amount > 0 ? curr.amount : 0;
    } else {
      acc[millis] = {
        date: date,
        dateFromatted: date.toFormat("dd/MM/yyyy"),
        expense: curr.amount < 0 ? Math.abs(curr.amount) : 0,
        income: curr.amount > 0 ? curr.amount : 0,
      };
    }

    return acc;
  }, {});
};
