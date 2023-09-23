import { Box } from 'uikit/Box'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useTheme, keyframes} from 'styled-components'
import { darken } from 'polished'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styled from 'styled-components'

const Row = styled(Box)<{
  width?: string
  align?: string
  justify?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({ width }) => width ?? '100%'};
  display: flex;
  padding: 0;
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`

export const RowBetween = styled(Row)`
  justify-content: space-between;
`

dayjs.extend(utc)

const DEFAULT_HEIGHT = 300

const Wrapper = styled(Box)`
  width: 100%;
  height: ${DEFAULT_HEIGHT}px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  > * {
    font-size: 1rem;
  }
`

export type LineChartProps = {
  data: any[]
  color?: string | undefined
  height?: number | undefined
  minHeight?: number
  setValue?: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setLabel?: Dispatch<SetStateAction<string | undefined>> // used for label of value
  value?: number
  label?: string
  topLeft?: ReactNode | undefined
  topRight?: ReactNode | undefined
  bottomLeft?: ReactNode | undefined
  bottomRight?: ReactNode | undefined
} & React.HTMLAttributes<HTMLDivElement>

const Chart = ({
  data,
  color = '#1FC7D4',
  value,
  label,
  setValue,
  setLabel,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: LineChartProps) => {
  const theme = useTheme()
  const parsedValue = value

  return (
    <Wrapper minHeight={minHeight} {...rest}>
      <RowBetween>
        {topLeft ?? null}
        {topRight ?? null}
      </RowBetween>
      {data?.length === 0 ? (
        <LoadingRows>
          <div />
          <div />
          <div />
        </LoadingRows>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 15,
            }}
            onMouseLeave={() => {
              if (setLabel) setLabel(undefined)
              if (setValue) setValue(undefined)
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={darken(0.36, color)} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tickFormatter={(time) => dayjs(time).format('MMM')}
              minTickGap={10}
            />
            <YAxis
              dataKey="value"
              axisLine={false}
              tickLine={false}
              // tickFormatter={(time) => dayjs(time).format('DD')}
              minTickGap={10}
              tick={{fontSize: 14}}
            />
            <Tooltip
              cursor={{ stroke: theme.colors.backgroundAlt2 }}
              // contentStyle={{ display: 'none' }}
              formatter={(tooltipValue, name, props) => {
                return tooltipValue
              }}
              
            />
            <Area dataKey="value" type="monotone" stroke={color} fill="url(#gradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
      <RowBetween>
        {bottomLeft ?? null}
        {bottomRight ?? null}
      </RowBetween>
    </Wrapper>
  )
}

export default Chart

const loadingAnimation = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

export const LoadingRows = styled.div`
  display: grid;
  min-width: 75%;
  max-width: 100%;
  grid-column-gap: 0.5em;
  grid-row-gap: 0.8em;
  grid-template-columns: repeat(1, 1fr);
  & > div {
    animation: ${loadingAnimation} 1.5s infinite;
    animation-fill-mode: both;
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.colors.background} 25%,
      ${({ theme }) => theme.colors.backgroundAlt} 50%,
      ${({ theme }) => theme.colors.backgroundAlt2} 75%
    );
    background-size: 400%;
    border-radius: 12px;
    height: 2.4em;
    will-change: background-position;
  }
  & > div:nth-child(4n + 1) {
    grid-column: 1 / 3;
  }
  & > div:nth-child(4n) {
    grid-column: 3 / 4;
    margin-bottom: 2em;
  }
`