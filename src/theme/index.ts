import { DefaultTheme } from "styled-components"

export const baseColors = {
  white: 'white',
  failure: '#ED4B9E',
  failure33: '#ED4B9E33',
  primary: '#F57C00',
  primary0f: '#1FC7D40f',
  primary3D: '#1FC7D43D',
  primaryBright: '#53DEE9',
  primaryDark: '#0098A1',
  success: '#31D0AA',
  success19: '#31D0AA19',
  warning: '#FFB237',
  warning2D: '#ED4B9E2D',
  warning33: '#ED4B9E33',
}

export const colors = {
  ...baseColors,
  secondary: '#7645D9',
  headerBackground: 'rgba(0, 0, 0, 0.25)',
  background: '#F6F6F6',
  backgroundDisabled: '#E9EAEB',
  backgroundAlt: '#FFFFFF',
  cardBorder: '#E7E3EB',
  contrast: '#191326',
  dropdown: '#F6F6F6',
  dropdownDeep: '#EEEEEE',
  invertedContrast: '#FFFFFF',
  input: '#eeeaf4',
  inputSecondary: '#d7caec',
  tertiary: '#EFF4F5',
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDC2C4',
  textSubtle: '#7A6EAA',
  disabled: '#E9EAEB',
  gradientBubblegum: 'linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)',
  gradientInverseBubblegum: 'linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)',
  gradientCardHeader: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
  gradientBlue: 'linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)',
  gradientViolet: 'linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)',
  gradientVioletAlt: 'linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)',
  gradientGold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
  gradientBold: 'linear-gradient(#53DEE9, #7645D9)',
}

export const breakpoints = {
  xs: 370,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xxl: 1200,
} as const

export const mediaQueries = {
  xs: ``,
  sm: `@media screen and (min-width: ${breakpoints.sm}px)`,
  md: `@media screen and (min-width: ${breakpoints.md}px)`,
  lg: `@media screen and (min-width: ${breakpoints.lg}px)`,
  xl: `@media screen and (min-width: ${breakpoints.xl}px)`,
  xxl: `@media screen and (min-width: ${breakpoints.xxl}px)`,
}

export type Breakpoint = keyof typeof breakpoints

export const breakpointNames = Object.keys(breakpoints) as Breakpoint[]

const defaultTheme: DefaultTheme = {
  colors,
  mediaQueries,
  breakpoints: breakpointNames
}

export default defaultTheme