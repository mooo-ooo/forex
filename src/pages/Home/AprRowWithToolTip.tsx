import React, { ReactNode } from "react"
import { Text } from 'rebass'
import { Flex } from "uikit/Box";
import { TooltipText } from "uikit/Text";
import { useTooltip } from "hooks/useTooltip";
import { useTheme } from 'styled-components'

const AprRowWithToolTip: React.FC<React.PropsWithChildren<{ questionTooltip?: ReactNode }>> = ({
  children,
  questionTooltip,
}) => {
  const theme = useTheme()
  const tooltipContent = "Calculated based on current rates and subject to change based on various external variables. It is a rough estimate provided for convenience only, and by no means represents guaranteed returns."

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: "bottom-start" });

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <Flex>
        <TooltipText ref={targetRef}><Text color={theme.colors.textSubtle}>APR:</Text></TooltipText>
        {questionTooltip}
      </Flex>
      {children}
    </Flex>
  );
};
export default AprRowWithToolTip