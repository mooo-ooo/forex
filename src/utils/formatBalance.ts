import { formatUnits } from 'viem'


/**
 * Don't use the result to convert back to number.
 * It uses undefined locale which uses host language as a result.
 * Languages have different decimal separators which results in inconsistency when converting back this result to number.
 */
export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  }
  return number.toLocaleString(undefined, options)
}

export const formatBigInt = (value: bigint, displayDecimals = 18, decimals = 18): string => {
  const remainder = value % 10n ** BigInt(decimals - displayDecimals)

  const formatted = formatUnits(value - remainder, decimals)
  return formatted
}

// eslint-disable-next-line no-mixed-operators
export const isNumeric = (num: any) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num as number);