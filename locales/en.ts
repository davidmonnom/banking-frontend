export default {
  home: {
    word: {
      plural: "Homes",
      singular: "Home",
    },
    description: "Welcome, explore your dashboard",
  },
  transaction: {
    word: {
      plural: "Transactions",
      singular: "Transaction",
    },
    description: "Manage your transactions",
    create: {
      title: "Create Transaction",
      subtitle: "Create a new transaction",
    },
    edit: {
      title: "Edit Transaction",
      subtitle: "Edit an existing transaction",
    },
  },
  expense: {
    word: {
      plural: "Expenses",
      singular: "Expense",
    },
    description: "Manage your expenses",
  },
  income: {
    word: {
      plural: "Incomes",
      singular: "Income",
    },
    description: "Manage your incomes",
  },
  uncategorized: {
    word: {
      plural: "Uncategorized",
      singular: "Uncategorized",
    },
    description: "Manage your uncategorized transactions",
  },
  category: {
    word: {
      plural: "Categories",
      singular: "Category",
    },
    description: "Manage your categories",
    create: {
      title: "Create Category",
      subtitle: "Create a new category",
    },
    edit: {
      title: "Edit Category",
      subtitle: "Edit an existing category",
    },
  },
  limit: {
    word: {
      plural: "Limits",
      singular: "Limit",
    },
    description: "Manage your expense limits by category",
  },
  economy: {
    word: {
      plural: "Economies",
      singular: "Economy",
    },
    description: "Overview of your economy",
  },
  budget: {
    word: {
      plural: "Budgets",
      singular: "Budget",
    },
    detail: {
      noRecord: "No budget",
      restart: "When a budget ends, it will automatically start again.",
      timeline: "You can manage your budget periods via the edit icon.",
    },
    description: "Manage your budgets",
    create: {
      title: "Create Budget",
      subtitle: "Create a new budget",
    },
    edit: {
      title: "Edit Budget",
      subtitle: "Edit an existing budget",
    },
  },
  goal: {
    word: {
      plural: "Goals",
      singular: "Goal",
    },
    detail: {
      noRecord: "No goal",
      restart: "When a goal ends, it will remain displayed.",
      timeline: "You can change the end date of a goal via the edit button.",
    },
    description: "Manage your goals",
    create: {
      title: "Create Goal",
      subtitle: "Create a new goal",
    },
    edit: {
      title: "Edit Goal",
      subtitle: "Edit an existing goal",
    },
  },
  common: {
    word: {
      name: "Name",
      description: "Description",
      icon: "Icon",
      path: "Path",
      children: "Children",
      date: "Date",
      amount: "Amount",
      type: "Type",
      monthly: "Monthly",
      quarterly: "Quarterly",
      biyearly: "Biyearly",
      yearly: "Yearly",
      edit: "Edit",
      close: "Close",
      save: "Save",
      saving: "Saving",
      search: "Search",
      all: "All",
    },
    month: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December",
    },
    sentence: {
      dateEnd: "Date End",
      startMonth: "Start Month",
      endMonth: "End Month",
      startYear: "Start Year",
      endYear: "End Year",
    },
  },
} as const;
