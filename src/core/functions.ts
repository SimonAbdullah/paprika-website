export const getPagesCount = (totalCount: number, pageSize: number) => {
  return Math.ceil(totalCount / pageSize);
};

export const isOdd = (number: number) => number % 2;
