import { colors } from "./index";

export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type Spacing = number[];

export type Colors = typeof colors;
