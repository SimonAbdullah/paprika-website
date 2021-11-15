import { ParsedUrlQuery } from "node:querystring";

export type PathsType =
  | string
  | {
      params: ParsedUrlQuery;
      locale?: string;
    }[];

export type NextImageLayoutType = "responsive" | "fill" | "fixed" | "intrinsic";
