import { Budget } from "@/client";
import { DateTime } from "luxon";

export const budgetGapToMonth = {
  monthly: 1,
  yearly: 12,
  "bi-yearly": 6,
  quarterly: 3,
};

export const computeStartMonth = (budget: Budget) => {
  const currentMonth = DateTime.now().month;
  const bStartMonth =
    typeof budget.startMonth === "string"
      ? parseInt(budget.startMonth)
      : budget.startMonth;
  const budgetGap = budgetGapToMonth[
    budget.type as keyof typeof budgetGapToMonth
  ] as number;

  // Calculate the correct start month
  let year = DateTime.now().year;
  let startMonth =
    currentMonth - ((currentMonth - bStartMonth + 12) % budgetGap);

  if (startMonth <= 0) {
    startMonth += 12;
    year -= 1;
  }

  let endMonth = startMonth + budgetGap - 1;
  endMonth = endMonth > 12 ? endMonth - 12 : endMonth;
  return {
    startMonth,
    endMonth,
    startDate: DateTime.fromObject({ year, month: startMonth, day: 1 }),
  };
};
