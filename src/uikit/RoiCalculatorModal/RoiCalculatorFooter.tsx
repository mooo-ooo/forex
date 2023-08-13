import { getApy } from "utils/compoundApyHelpers";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { useTooltip } from "../../hooks/useTooltip";
import { Box, Flex, Grid } from "../Box";
import { ExpandableLabel } from "../Button/ExpandableButton";
import { Link, LinkExternal } from "../Link";
import { Text } from "../Text";

export const Footer = styled(Flex)`
  width: 100%;
  background: ${({ theme }) => theme.colors.dropdown};
`;

export const BulletList = styled.ul`
  list-style-type: none;
  margin-top: 16px;
  padding: 0;
  li {
    margin: 0;
    padding: 0;
  }
  li::before {
    content: "•";
    margin-right: 4px;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
  li::marker {
    font-size: 12px;
  }
`;

interface RoiCalculatorFooterProps {
  isFarm: boolean;
  apr?: number;
  apy?: number;
  displayApr?: string;
  autoCompoundFrequency: number;
  multiplier?: string;
  linkLabel: string;
  linkHref: string;
  performanceFee: number;
  rewardCakePerSecond?: boolean;
  isLocked?: boolean;
  stableSwapAddress?: string;
  stableLpFee?: number;
  farmCakePerSecond?: string;
  totalMultipliers?: string;
}

const RoiCalculatorFooter: React.FC<React.PropsWithChildren<RoiCalculatorFooterProps>> = ({
  isFarm,
  apr = 0,
  apy = 0,
  displayApr,
  autoCompoundFrequency,
  multiplier,
  linkLabel,
  linkHref,
  performanceFee,
  rewardCakePerSecond,
  isLocked = false,
  stableSwapAddress,
  stableLpFee,
  farmCakePerSecond,
  totalMultipliers,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);


  const gridRowCount = isFarm ? 4 : 2;

  return (
    <Footer p="16px" flexDirection="column">
      <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? "Hide" : "Details"}
      </ExpandableLabel>
      {isExpanded && (
        <Box px="8px">
          <Grid gridTemplateColumns="2.5fr 1fr" gridRowGap="8px" gridTemplateRows={`repeat(${gridRowCount}, auto)`}>
            <Text color="textSubtle" small>
              {Number.isFinite(apy) && apy !== 0 && !isLocked ? "APY" : "APR"}
            </Text>
            <Text small textAlign="right">
              {Number.isFinite(apy) && apy !== 0 ? apy.toFixed(2) : apr?.toFixed(2)}%
            </Text>
            {/* {!Number.isFinite(apy) && (
              <Text color="textSubtle" small>
                {t("APY (%compoundTimes%x daily compound)", {
                  compoundTimes: autoCompoundFrequency > 0 ? autoCompoundFrequency : 1,
                })}
              </Text>
            )} */}
            {!Number.isFinite(apy) && (
              <Text small textAlign="right">
                {(
                  getApy(apr, autoCompoundFrequency > 0 ? autoCompoundFrequency : 1, 365, performanceFee) * 100
                ).toFixed(2)}
                %
              </Text>
            )}
          </Grid>
          <BulletList>
            <li>
              <Text fontSize="12px" textAlign="center" color="textSubtle" display="inline" lineHeight={1.1}>
                {"Calculated based on current rates."}
              </Text>
            </li>
            
            <li>
              <Text fontSize="12px" textAlign="center" color="textSubtle" display="inline" lineHeight={1.1}>
                "All figures are estimates provided for your convenience only, and by no means represent guaranteed returns."
              </Text>
            </li>
            {performanceFee > 0 && (
              <li>
                <Text mt="14px" fontSize="12px" textAlign="center" color="textSubtle" display="inline">
                  {`All estimated rates take into account this pool’s %{performanceFee}% performance fee`}
                </Text>
              </li>
            )}
          </BulletList>
          {linkHref && (
            <Flex justifyContent="center" mt="24px">
              <LinkExternal href={linkHref}>{linkLabel}</LinkExternal>
            </Flex>
          )}
        </Box>
      )}
    </Footer>
  );
};

export default RoiCalculatorFooter;
