export const isDataEmpty = (data?: unknown[]) => {
  return !data || data.length === 0;
};

export const getPagesCount = (totalCount: number, pageSize: number) => {
  return Math.ceil(totalCount / pageSize);
};

export const isOdd = (number: number) => number % 2;

export const percentOfNumber = (
  number: number,
  options: {
    baseNumber: number;
    percentsOf: number;
  } = {
    baseNumber: 5,
    percentsOf: 100,
  }
) => {
  return (number * options.percentsOf) / options.baseNumber;
};

export const reverseString = (string: string) => {
  return string.split("").reverse().join("");
};

export function IsOfTypeT<T, C extends T>(arg?: T): arg is C {
  if (typeof arg !== "undefined") return true;
  return false;
}
