export const baseColors = {
  white: 'white',
  failure: '#ED4B9E',
  failure33: '#ED4B9E33',
  primary: '#1fc7d4',
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

export const shadows = {
  level1: '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)',
  active: '0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)',
  success: '0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)',
  warning: '0px 0px 0px 1px #D67E0A, 0px 0px 0px 4px rgba(214, 126, 10, 0.2)',
  danger: '0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)',
  focus: '0px 0px 0px 1px #7645D9, 0px 0px 0px 4px rgba(118, 69, 217, 0.6)',
  inset: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)',
  tooltip: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)',
}

export const colors = {
  ...baseColors,
  secondary: '#7645D9',
  headerBackground: 'rgba(0, 0, 0, 0.25)',
  background: '#08060B',
  backgroundDisabled: '#3c3742',
  backgroundAlt: '#27262c',
  backgroundAlt2: 'rgba(39, 38, 44, 0.7)',
  cardBorder: '#383241',
  contrast: '#191326',
  dropdown: '#1e1d20',
  dropdownDeep: '#EEEEEE',
  invertedContrast: '#FFFFFF',
  input: '#372F47',
  inputSecondary: '#d7caec',
  tertiary: '#353547',
  text: '#f4eeff',
  textSecondary: '#9a6aff',
  textDisabled: '#BDC2C4',
  textSubtle: '#b8add2',
  disabled: '#E9EAEB',
  gradientBubblegum: 'linear-gradient(139.73deg,#313d5c,#3d2a54)',
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

const cardTheme = {
  background: '#272627',
  boxShadow: shadows.level1,
  boxShadowActive: shadows.active,
  boxShadowSuccess: shadows.success,
  boxShadowWarning: shadows.warning,
  cardHeaderBackground: {
    default: colors.gradientCardHeader,
    blue: colors.gradientBlue,
    bubblegum: colors.gradientBubblegum,
    violet: colors.gradientViolet,
  },
  dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
}

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type Breakpoint = keyof typeof breakpoints
export type Breakpoints = string[];

export const breakpointNames = Object.keys(breakpoints) as Breakpoint[]

export type TooltipTheme = {
  background: string;
  text: string;
  boxShadow: string;
};

export const tooltip: TooltipTheme = {
  background: colors.backgroundAlt,
  text: colors.text,
  boxShadow: shadows.tooltip,
};
export interface ForexTheme {
  colors: typeof colors;
  card: typeof cardTheme;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  tooltip: TooltipTheme
  shadows: typeof shadows
}

const defaultTheme: ForexTheme = {
  colors,
  mediaQueries,
  breakpoints: breakpointNames,
  card: cardTheme,
  tooltip,
  shadows,
}

export default defaultTheme