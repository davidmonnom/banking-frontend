import { diacriticsMap } from "@/data/diacriticsMap";

function unaccent(str: string, caseSensitive: boolean): string {
  str = str.replace(/[^\u0000-\u007E]/g, (accented: string) => {
    return (diacriticsMap as { [key: string]: string })[accented] || accented;
  });
  return caseSensitive ? str : str.toLowerCase();
}

function match(pattern: string, strs: string | string[]): number {
  if (!Array.isArray(strs)) {
    strs = [strs];
  }
  let globalScore = 0;
  for (const str of strs) {
    globalScore = Math.max(globalScore, _match(pattern, str));
  }
  return globalScore;
}

function _match(pattern: string, str: string): number {
  let totalScore = 0;
  let currentScore = 0;
  const len = str.length;
  let patternIndex = 0;

  pattern = unaccent(pattern, false);
  str = unaccent(str, false);

  for (let i = 0; i < len; i++) {
    if (str[i] === pattern[patternIndex]) {
      patternIndex++;
      currentScore += 100 + currentScore - i / 200;
    } else {
      currentScore = 0;
    }
    totalScore = totalScore + currentScore;
  }

  return patternIndex === pattern.length ? totalScore : 0;
}

type FuzzyLookup = {
  score: number;
  elem: string;
};
export function fuzzyLookup(
  pattern: string,
  list: string[],
  fn: Function
): string[] {
  const results = [] as FuzzyLookup[];
  list.forEach((data) => {
    const score = match(pattern, fn(data));
    if (score > 0) {
      results.push({ score, elem: data });
    }
  });

  // we want better matches first
  results.sort((a, b) => b.score - a.score);

  return results.map((r) => r.elem);
}
