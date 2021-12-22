import { CustomerEventDto } from "../features/customers/services/customer-event/models/customer-event-dto.models";
import { RestaurantSummaryDto } from "../features/restaurants/services/places/models/restaurant-summary-dto.models";

export const isDataEmpty = (data?: unknown[]) => {
  return !data || data.length === 0;
};

export const getPagesCount = (totalCount: number, pageSize: number) => {
  return Math.ceil(totalCount / pageSize);
};

export const isOdd = (number: number) => number % 2;

export const percentOfNumber = (
  number: number,
  baseNumber: number,
  percentsOf: number = 100
) => {
  return (number * percentsOf) / baseNumber;
};

export const reverseString = (string: string) => {
  return string.split("").reverse().join("");
};

export function IsCustomerEvent(
  arg?: RestaurantSummaryDto | CustomerEventDto
): arg is CustomerEventDto {
  return (
    (arg as CustomerEventDto)?.restaurantId !== undefined &&
    (arg as CustomerEventDto)?.restaurantName !== undefined
  );
}

export const getSumOfObjectValues = (object: Object) => {
  return Object.values(object).reduce(
    (previous, current) => (previous || 0) + (current || 0),
    0
  );
};

export const currencyFormatter = (
  locales: "en-SY" | "ar-SY" = "en-SY",
  options: Intl.NumberFormatOptions = { style: "currency", currency: "SYP" }
) => {
  return new Intl.NumberFormat(locales, {
    ...options,
  });
};
