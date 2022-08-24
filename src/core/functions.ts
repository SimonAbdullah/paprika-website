import { CustomerEventDto } from "../features/customers/services/customer-event/models/customer-event-dto.models";
import { RestaurantSummaryDto } from "../features/restaurants/services/places/models/restaurant-summary-dto.models";
import { v4 as uuidV4 } from "uuid";
import aesJs from "aes-js";
import moment, { Moment } from "moment";

export const isBrowser = () => typeof window !== "undefined";

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

export const bitwiseOr = (number1: number, number2: number) => {
  return number1 | number2;
};

export const bitwiseXor = (number1: number, number2: number) => {
  return number1 ^ number2;
};

export const bitwiseAnd = (number1: number, number2: number) => {
  return number1 & number2;
};

export const arrayDecimalsForBinaryNumber = (num: string) => {
  let arrayDecimals = [];
  for (let i = 0; i < num.length; i++) {
    if (num[num.length - (i + 1)] === "1") {
      let decimalNumber = 2 ** i;
      arrayDecimals.push(decimalNumber);
    }
  }
  return arrayDecimals;
};

export const generateUuid = () => {
  return uuidV4();
};

export const aesEncodeWithBase64AndKeyConcat = () => {
  let uuid = generateUuid();

  const uuidBytes = aesJs.utils.utf8.toBytes(uuid);

  const data = aesJs.padding.pkcs7.pad(uuidBytes);

  const aesCbc = new aesJs.ModeOfOperation.cbc(
    JSON.parse(process.env.NEXT_PUBLIC_KEY || "[]"),
    JSON.parse(process.env.NEXT_PUBLIC_IV || "[]")
  );

  const encryptedBytes = aesCbc.encrypt(data);

  const encryptedBase64 = Buffer.from(encryptedBytes).toString("base64");

  return `${uuid}.${encryptedBase64}`;
};

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export const disabledDate = (current: Moment) => {
  return current && current < moment().startOf("day");
};

export const disabledDateTime = () => {
  return {
    disabledHours: () =>
      range(0, 24).slice(0, moment().endOf("hour").hour() + 1),
  };
};
