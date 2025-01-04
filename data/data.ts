"use client";

import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { TbCategoryMinus } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineStopCircle } from "react-icons/hi2";
import { TbPigMoney } from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import { TbZoomMoney } from "react-icons/tb";
import { EditableItem } from "@/components/modal/EditModal";
import { useI18n } from "@/locales/client";

export type NavButtonType = {
  id: number;
  name: string;
  description: string;
  icon: any;
  path: string;
  children: NavButtonType[];
};

export const BudgetEditableParams = () => {
  const t = useI18n();

  return [
    {
      name: t("common.word.name"),
      type: "input",
      key: "name",
      value: "",
      required: true,
    },
    {
      name: t("common.word.description"),
      type: "input",
      key: "description",
      value: "",
      required: true,
    },
    {
      name: t("common.word.amount"),
      type: "number",
      key: "amount",
      value: 0,
      required: true,
    },
    {
      name: t("common.word.type"),
      type: "select",
      selectValues: [
        {
          name: t("common.word.monthly"),
          id: "monthly",
        },
        {
          name: t("common.word.quarterly"),
          id: "quarterly",
        },
        {
          name: t("common.word.biyearly"),
          id: "bi-yearly",
        },
        {
          name: t("common.word.yearly"),
          id: "yearly",
        },
      ],
      key: "type",
      value: "monthly",
      required: true,
    },
    {
      name: t("common.sentence.startMonth"),
      type: "select",
      selectValues: [
        {
          name: t("common.month.january"),
          id: 1,
        },
        {
          name: t("common.month.february"),
          id: 2,
        },
        {
          name: t("common.month.march"),
          id: 3,
        },
        {
          name: t("common.month.april"),
          id: 4,
        },
        {
          name: t("common.month.may"),
          id: 5,
        },
        {
          name: t("common.month.june"),
          id: 6,
        },
        {
          name: t("common.month.july"),
          id: 7,
        },
        {
          name: t("common.month.august"),
          id: 8,
        },
        {
          name: t("common.month.september"),
          id: 9,
        },
        {
          name: t("common.month.october"),
          id: 10,
        },
        {
          name: t("common.month.november"),
          id: 11,
        },
        {
          name: t("common.month.december"),
          id: 12,
        },
      ],
      key: "startMonth",
      value: "1",
      required: true,
    },
  ] as EditableItem[];
};

export const GoalEditableParams = () => {
  const t = useI18n();

  return [
    {
      name: t("common.word.name"),
      type: "input",
      key: "name",
      value: "",
      required: true,
    },
    {
      name: t("common.word.description"),
      type: "input",
      key: "description",
      value: "",
      required: true,
    },
    {
      name: t("common.word.amount"),
      type: "number",
      key: "amount",
      value: 0,
      required: true,
    },
    {
      name: t("common.sentence.dateEnd"),
      type: "date",
      key: "dateEnd",
      value: "",
      required: true,
    },
  ] as EditableItem[];
};

export const RawNavButtons = () => {
  const t = useI18n();

  return [
    {
      id: 1,
      name: t("home.word.singular"),
      description: t("home.description"),
      icon: LuLayoutDashboard,
      path: "/",
      children: [],
    },
    {
      id: 2,
      name: t("transaction.word.plural"),
      description: t("transaction.description"),
      icon: GrTransaction,
      path: "/transaction",
      children: [
        {
          id: 21,
          name: t("expense.word.plural"),
          description: t("expense.description"),
          icon: GiPayMoney,
          path: "/transaction/expenses",
          children: [],
        },
        {
          id: 22,
          name: t("income.word.plural"),
          description: t("income.description"),
          icon: GiReceiveMoney,
          path: "/transaction/incomes",
          children: [],
        },
        {
          id: 23,
          name: t("uncategorized.word.singular"),
          description: t("uncategorized.description"),
          icon: TbCategoryMinus,
          path: "/transaction/uncategorized",
          children: [],
        },
      ],
    },
    {
      id: 3,
      name: t("category.word.plural"),
      description: t("category.description"),
      icon: MdOutlineCategory,
      path: "/category",
      children: [
        {
          id: 31,
          name: t("limit.word.plural"),
          description: t("limit.description"),
          icon: HiOutlineStopCircle,
          path: "/category/limit",
          children: [],
        },
      ],
    },
    {
      id: 4,
      name: t("economy.word.plural"),
      description: t("economy.description"),
      icon: TbPigMoney,
      path: "/economy",
      children: [
        {
          id: 41,
          name: t("budget.word.plural"),
          description: t("budget.description"),
          icon: TbZoomMoney,
          path: "/economy/budget",
          children: [],
        },
        {
          id: 42,
          name: t("goal.word.plural"),
          description: t("goal.description"),
          icon: GoGoal,
          path: "/economy/goal",
          children: [],
        },
      ],
    },
  ];
};

export const defaultCategories = [
  {
    name: "Carburant ⛽",
    color: "#C77549",
  },
  {
    name: "Courses 🛒",
    color: "#49AEC7",
  },
  {
    name: "Restaurant 🍽️",
    color: "#FFC132",
  },
  {
    name: "Livraison nourriture 🍕",
    color: "#FF8932",
  },
  {
    name: "Sport 🏋️",
    color: "#C132FF",
  },
  {
    name: "Shopping 🛍️",
    color: "#48DF5F",
  },
  {
    name: "Vacances 🏖️",
    color: "#FFF665",
  },
  {
    name: "Santé 🏥",
    color: "#82E578",
  },
  {
    name: "Impôts 📑",
    color: "#FF5656",
  },
  {
    name: "Logement 🏠",
    color: "#7EC2FF",
  },
  {
    name: "Transport 🚗",
    color: "#B37D5C",
  },
  {
    name: "Loisirs 🎮",
    color: "#3FE494",
  },
  {
    name: "Cadeaux 🎁",
    color: "#E5A9F5",
  },
  {
    name: "Autres 📦",
    color: "#787878",
  },
  {
    name: "Services 📝",
    color: "#5168A9",
  },
  {
    name: "Assurance 📄",
    color: "#54B6D8",
  },
  {
    name: "Epargne 💰",
    color: "#FFB833",
  },
  {
    name: "Virements entrants 💸",
    color: "#8BF176",
  },
  {
    name: "Virements sortants 💸",
    color: "#F17676",
  },
  {
    name: "Animaux 🐶",
    color: "#FFC132",
  },
  {
    name: "Bien être 🧘",
    color: "#FFC132",
  },
  {
    name: "Maisons 🏠",
    color: "#FFC132",
  },
  {
    name: "Salaires 💰",
    color: "#FFC132",
  },
  {
    name: "Energie ⚡",
    color: "#FFC132",
  },
  {
    name: "Enfants 👶",
    color: "#FFC132",
  },
];

export const defaultCategoryColor = [
  // Pastels
  "#EF9A9A",
  "#F48FB1",
  "#CE93D8",
  "#B39DDB",
  "#9FA8DA",
  "#90CAF9",
  "#81D4FA",
  "#80DEEA",
  "#80CBC4",
  "#A5D6A7",
  "#C5E1A5",
  "#E6EE9C",
  "#FFF59D",
  "#FFE082",
  "#FFCC80",
  "#FFAB91",
  "#BCAAA4",
  "#EEEEEE",
  "#CFD8DC",
  // Classics
  "#E53935",
  "#D81B60",
  "#8E24AA",
  "#5E35B1",
  "#3949AB",
  "#1E88E5",
  "#039BE5",
  "#00ACC1",
  "#00897B",
  "#43A047",
  "#7CB342",
  "#C0CA33",
  "#FDD835",
  "#FFB300",
  "#FB8C00",
  "#F4511E",
  "#6D4C41",
  "#757575",
  "#455A64",
];
