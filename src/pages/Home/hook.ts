import { useEffect, useMemo, useState } from 'react'
import { getInterestBreakdown } from 'utils/compoundApyHelpers'
import dayjs from 'dayjs'

interface IChartData {
  amount: number,
  compoundEvery: number,
  apr: number
}

interface IReport {
  time: string
  value: number,
}

export const useChartData = ({
  amount,
  apr,
  compoundEvery = 30 // weekly compound
}: IChartData) => {
  const period = 30
  const interestDay = apr / 365 / 100
  const [charts, setCharts] = useState<IReport[]>([])

  const interestBreakdown = useMemo(() => {
    let daysToCalculateAgainst: number[] = []
    const numberOfCompounding = Math.floor(365 / period)

    for (let index = 1; index < numberOfCompounding; index++) {
      daysToCalculateAgainst.push(index * 30)
    }
    daysToCalculateAgainst.push(365)

    return getInterestBreakdown({
      daysToCalculateAgainst,
      compoundFrequency: 1 / compoundEvery,
      principalInUSD: amount,
      apr,
      earningTokenPrice: 1,
    })
  }, [period, apr, compoundEvery, amount])

  useEffect(() => {
    const results = interestBreakdown.map((interest, index) => {
      return {
        time: dayjs().add(index * 30, 'day').format('D MMM YYYY'),
        value: (amount + interest),
      }
    })
    
    setCharts(results)
  }, [amount, compoundEvery, interestDay, interestBreakdown])
  return charts
}

interface ICap {
  cap: number
  swap: number
}

export const calcAverageSwap = (capWithSwaps: ICap[]) => {
  const totalCap = capWithSwaps.reduce((sum, { cap }) => sum + cap, 0)
  const withWeight = capWithSwaps.map(item => {
    return {
      ...item,
      weight: item.cap / totalCap
    }
  })
  const result = withWeight.reduce((average, { swap, weight }) => average + (swap * weight), 0)
  return result
}