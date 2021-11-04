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
