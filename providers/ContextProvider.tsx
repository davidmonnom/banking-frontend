"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import {
  TransactionByCategIds,
  processTransactionByCategId,
} from "@/utils/processTransactionByCategId";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import {
  Account,
  Budget,
  Category,
  CategoryService,
  DataService,
  Goal,
  Group,
  Item,
  Transaction,
  TransactionService,
  User,
} from "@/client";

export type ComputedDateRange = {
  range: number;
  curStart: DateTime;
  curEnd: DateTime;
  hisStart: DateTime;
  hisEnd: DateTime;
};

export type FilterType = {
  type: string;
  category: number;
  date: string;
  account: string;
};

type AccountableContextType = {
  data: {
    budgetById: { [key: string]: Budget };
    categoryById: { [key: string]: Category };
    goalById: { [key: string]: Goal };
    budgets: Budget[];
    accounts: Account[];
    transactions: Transaction[];
    transactionsHistory: Transaction[];
    transactionsOut: Transaction[];
    linkToken: string;
    categories: Category[];
    items: Item[];
    transByCategId: TransactionByCategIds;
    transHisByCategid: TransactionByCategIds;
    groups: Group[];
    sharedGroups: Group[];
    goals: Goal[];
    sharedUsers: User[];
  };
  setters: {
    budgets: React.Dispatch<React.SetStateAction<Budget[]>>;
    goals: React.Dispatch<React.SetStateAction<Goal[]>>;
    accounts: React.Dispatch<React.SetStateAction<Account[]>>;
    transactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    categories: React.Dispatch<React.SetStateAction<Category[]>>;
    loading: React.Dispatch<React.SetStateAction<boolean>>;
    computedDateRange: React.Dispatch<React.SetStateAction<ComputedDateRange>>;
    filter: React.Dispatch<React.SetStateAction<FilterType>>;
    items: React.Dispatch<React.SetStateAction<Item[]>>;
    groups: React.Dispatch<React.SetStateAction<Group[]>>;
    sharedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  };
  states: {
    loading: boolean;
    backLoading: boolean;
    refresh: boolean;
    computedDateRange: ComputedDateRange;
    filter: FilterType;
  };
  fn: {
    getCategoryById: (id: number) => Category | undefined;
    fetchTransaction: () => Promise<void>;
  };
};

export const AccountableContext = createContext({} as AccountableContextType);

interface AccountableContextWrapper {
  children: React.ReactNode;
}

export const AccountableContextWrapper = ({
  children,
}: AccountableContextWrapper) => {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();
  let initialDataLoaded = useMemo(() => {
    return false;
  }, []);

  // Data
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [sharedGroups, setSharedGroups] = useState<Group[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [linkToken, setLinkToken] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sharedUsers, setSharedUsers] = useState<User[]>([]);
  const [budgetById, setBudgetById] = useState<{ [key: string]: Budget }>({});
  const [goalById, setGoalById] = useState<{ [key: string]: Goal }>({});
  const [categoryById, setCategoryById] = useState<{
    [key: string]: Category;
  }>({});
  const [transByCategId, setTransByCategid] = useState<TransactionByCategIds>(
    {}
  );
  const [transHisByCategid, setTransHisByCategid] =
    useState<TransactionByCategIds>({});
  const [transactionsHistory, setTransactionsHistory] = useState<Transaction[]>(
    []
  );
  const [transactionsOut, setTransactionsOut] = useState<Transaction[]>([]);

  // States
  const [filter, setFilter] = useState<FilterType>({
    type: "all",
    category: 0,
    date: "",
    account: "",
  });
  const [backLoading, setBackLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [computedDateRange, setComputedDateRange] = useState<ComputedDateRange>(
    {
      range: 0,
      curStart: DateTime.now(),
      curEnd: DateTime.now().minus({ months: 1 }),
      hisStart: DateTime.now().minus({ months: 2 }),
      hisEnd: DateTime.now().minus({ months: 3 }),
    }
  );

  const data = {
    budgetById,
    categoryById,
    goalById,
    sharedUsers,
    budgets,
    goals,
    accounts,
    transactions,
    transactionsHistory,
    transactionsOut,
    linkToken,
    categories,
    items,
    transByCategId,
    transHisByCategid,
    groups,
    sharedGroups,
  };

  const setters = {
    budgets: setBudgets,
    goals: setGoals,
    accounts: setAccounts,
    transactions: setTransactions,
    categories: setCategories,
    loading: setLoading,
    computedDateRange: setComputedDateRange,
    filter: setFilter,
    items: setItems,
    groups: setGroups,
    sharedUsers: setSharedUsers,
  };

  const states = {
    filter,
    loading,
    backLoading,
    refresh,
    computedDateRange,
  };

  const fetchInitialData = async () => {
    try {
      const data = await DataService.initDataInitGet();
      const accounts = data.accounts || [];
      const categories = data.categories || [];
      const budgets = data.budgets || [];
      const items = data.items || [];
      const goals = data.goals || [];
      const group = data.user.groups || [];
      const sharedGroups = data.user.ownedGroup || [];
      const sharedUsers = data.user.sharedUsers || [];

      processBudgets(budgets);
      processCategories(categories);
      processGoals(goals);
      setGroups(group);
      setSharedGroups(sharedGroups);
      setAccounts(accounts);
      setItems(items);
      setLinkToken(linkToken);
      setSharedUsers(sharedUsers);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const processBudgets = (budgets: Budget[]) => {
    setBudgets(budgets);
    setBudgetById(
      budgets.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
    );
  };

  const processGoals = (goals: Goal[]) => {
    setGoals(goals);
    setGoalById(goals.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}));
  };

  const processCategories = (categories: Category[]) => {
    setCategories(categories.sort((a, b) => a.name.localeCompare(b.name)));
    setCategoryById(
      categories.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
    );
  };

  const fetchTransaction = async () => {
    try {
      setRefresh(true);

      if (refresh) {
        return;
      }

      const { curStart, curEnd, hisStart, hisEnd } = computedDateRange;
      const transactionsHistory = [];
      const transactions = [];
      const transactionsOut = [];
      const fetchedTransactions =
        await TransactionService.listTransactionListGet({
          dateStart: computedDateRange.hisStart.toFormat("yyyy-MM-dd"),
          dateEnd: computedDateRange.curEnd.toFormat("yyyy-MM-dd"),
        });

      for (const t of fetchedTransactions) {
        const date = DateTime.fromSQL(t.date, { zone: "utc" });

        if (date >= curStart && date <= curEnd) {
          transactions.push(t);
        } else if (date >= hisStart && date <= hisEnd) {
          transactionsHistory.push(t);
        } else if (t.budgets.length > 0 || t.goals.length > 0) {
          transactionsOut.push(t);
        }
      }

      const sorter = (a: Transaction, b: Transaction) => {
        return (
          DateTime.fromSQL(a.date, { zone: "utc" }).toMillis() -
          DateTime.fromSQL(b.date, { zone: "utc" }).toMillis()
        );
      };
      const processedTs = processTransactionByCategId([...transactions]);
      const processedTsHis = processTransactionByCategId([...transactionsHistory]);
      setTransactions([...transactions.sort(sorter)]);
      setTransactionsOut([...transactionsOut]);
      setTransactionsHistory([...transactionsHistory.sort(sorter)]);
      setTransByCategid({...processedTs});
      setTransHisByCategid({...processedTsHis});
    } catch (error) {
      console.warn(error);
    } finally {
      setRefresh(false);
    }
  };

  const processTransactions = async () => {
    let fetchTransaction = false;
    try {
      setBackLoading(true);
      const sync = await TransactionService.syncTransactionSyncGet();

      if (sync.details.has_more) {
        fetchTransaction = true;
        await processTransactions();
      } else {
        await fetchCategories();
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setBackLoading(false);
      return fetchTransaction;
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await CategoryService.listCategoryListGet();
      processCategories(categories);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (!initialDataLoaded) {
      initialDataLoaded = true;
      fetchInitialData();
      processTransactions();
    }
  }, []);

  useEffect(() => {
    if (computedDateRange.range > 0 && computedDateRange.range < 13) {
      fetchTransaction();
    }
  }, [computedDateRange]);

  useEffect(() => {
    setTransByCategid(processTransactionByCategId(transactions));
    setTransHisByCategid(processTransactionByCategId(transactionsHistory));
  }, [transactions, transactionsHistory]);

  useEffect(() => {
    processCategories(categories);
  }, [categories]);

  useEffect(() => {
    processBudgets(budgets);
  }, [budgets]);

  useEffect(() => {
    processGoals(goals);
  }, [goals]);

  const getCategoryById = (id: number) => {
    return categories.find((category) => category.id === id);
  };

  const fn = {
    getCategoryById,
    fetchTransaction,
  };

  return (
    <AccountableContext.Provider value={{ data, setters, states, fn }}>
      {children}
    </AccountableContext.Provider>
  );
};
