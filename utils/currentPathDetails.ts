import { NavButtonType, RawNavButtons } from "@/data/data";

const childFinderIter = (
  btn: NavButtonType,
  acc: NavButtonType[]
): NavButtonType[] => {
  if (btn.children) {
    return btn.children.reduce(
      (acc, child) => [...acc, child, ...childFinderIter(child, [])],
      acc
    );
  } else {
    return [...acc, btn];
  }
};

export const currentPathDetails = (
  currentPathName: string
): NavButtonType | undefined => {
  const buttons = RawNavButtons()
    .map((btn) => [btn, ...childFinderIter(btn, [])])
    .flat();

  const lang = currentPathName.split("/")[1];
  const path = currentPathName.substring(3) || "/"; // Lang is 2 chars, plus the slash
  return buttons.find((btn) => btn.path === path);
};
