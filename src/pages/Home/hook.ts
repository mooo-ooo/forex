import { useEffect, useState } from 'react'

interface IChartData {
  amount: number,
  compoundEvery: number,
  apr: number
}

interface IReport {
  time: Date
  value: number,
  isCompounded: boolean
}

export const useChartData = ({
  amount,
  apr,
  compoundEvery = 7 // weekly compound
}: IChartData) => {
  const period = 30
  const interestDay = apr / 365 / 100
  const [report, setReport] = useState<IReport[]>([])

  useEffect(() => {
    let dates = []
    let balanceSoFar = amount
    let swapSoFar = 0
    for (let index = 0; index < period; index++) {
      const shouldCompound = ((index + 1) % compoundEvery) === 0
      swapSoFar = (balanceSoFar * interestDay) + swapSoFar
      const newDate = {
        time: addDays(new Date(), index),
        value: balanceSoFar + swapSoFar,
        isCompounded: shouldCompound
      }
      if (shouldCompound) {
        balanceSoFar = balanceSoFar + swapSoFar
        swapSoFar = 0
      }
      dates.push(newDate)
    }
    setReport(dates)
  }, [amount, compoundEvery, interestDay])
  return report
}

function addDays(date: Date, days: number) {
  const dateCopy = new Date(date)
  dateCopy.setDate(date.getDate() + days)
  return dateCopy
}