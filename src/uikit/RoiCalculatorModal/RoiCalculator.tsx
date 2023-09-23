import { getBalanceNumber } from "utils/formatBalance";
import BigNumber from "bignumber.js";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import RoiCalculatorFooter from "./RoiCalculatorFooter";
import RoiCard from "./RoiCard";
import useRoiCalculatorReducer, {
  CalculatorMode,
  DefaultCompoundStrategy,
  EditingCurrency,
} from "./useRoiCalculatorReducer";
import AnimatedArrow from "./AnimatedArrow";
import { Flex, Box } from "../Box";
import { Text } from "../Text";
import HelpIcon from "../Icons/Help";
import Button from "../Button";
import { Checkbox } from "../Checkbox";
import { BalanceInput } from "../BalanceInput";
import { useTooltip } from "../../hooks/useTooltip";
import { ButtonMenu, ButtonMenuItem } from "../ButtonMenu";

export const ScrollableContainer = styled.div`
  padding: 24px;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`;

const FullWidthButtonMenu = styled(ButtonMenu)<{ disabled?: boolean }>`
  width: 100%;
  background-color: transparent;
  & > button {
    width: 100%;
  }

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export interface RoiCalculatorModalProps {
  account: string;
  pid?: number;
  earningTokenPrice: number;
  apr?: number;
  apy?: number;
  displayApr?: string;
  linkLabel: string;
  linkHref: string;
  stakingTokenBalance: BigNumber;
  stakingTokenDecimals: number;
  stakingTokenSymbol: string;
  stakingTokenPrice: number;
  earningTokenSymbol?: string;
  multiplier?: string;
  autoCompoundFrequency?: number;
  performanceFee?: number;
  isFarm?: boolean;
  initialState?: any;
  initialValue?: string;
  strategy?: any;
  header?: React.ReactNode;
  rewardCakePerSecond?: boolean;
  onBack?: () => void;
  onDismiss?: () => void;
  bCakeCalculatorSlot?: (stakingTokenBalance: string) => React.ReactNode;
  isLocked?: boolean;
  stableSwapAddress?: string;
  stableLpFee?: number;
  farmCakePerSecond?: string;
  totalMultipliers?: string;
}

const RoiCalculator: React.FC<React.PropsWithChildren<RoiCalculatorModalProps>> = ({
  account,
  earningTokenPrice,
  apr,
  apy,
  displayApr,
  linkLabel,
  linkHref,
  stakingTokenBalance,
  stakingTokenSymbol,
  stakingTokenPrice,
  multiplier,
  initialValue,
  earningTokenSymbol = "CAKE",
  autoCompoundFrequency = 0,
  performanceFee = 0,
  isFarm = false,
  initialState,
  strategy,
  header,
  children,
  stakingTokenDecimals,
  rewardCakePerSecond,
  onBack,
  onDismiss,
  bCakeCalculatorSlot,
  isLocked = false,
  stableSwapAddress,
  stableLpFee,
  farmCakePerSecond,
  totalMultipliers,
}) => {
  const balanceInputRef = useRef<HTMLInputElement | null>(null);

  const {
    state,
    setPrincipalFromUSDValue,
    setPrincipalFromTokenValue,
    setStakingDuration,
    toggleCompounding,
    toggleEditingCurrency,
    setCompoundingFrequency,
    setCalculatorMode,
    setTargetRoi,
    dispatch,
  } = useRoiCalculatorReducer({ stakingTokenPrice, earningTokenPrice, autoCompoundFrequency }, initialState);

  const { compounding, activeCompoundingIndex, stakingDuration, editingCurrency } = state.controls;
  const { principalAsUSD, principalAsToken } = state.data;

  // Auto-focus input on opening modal
  useEffect(() => {
    if (balanceInputRef.current) {
      balanceInputRef.current.focus();
    }
  }, []);

  // If user comes to calculator from staking modal - initialize with whatever they put in there
  useEffect(() => {
    if (initialValue) {
      setPrincipalFromTokenValue(initialValue);
    }
  }, [initialValue, setPrincipalFromTokenValue]);

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    `“My Balance” here is USDT onchain amount.`
  );

  const onBalanceFocus = () => {
    setCalculatorMode(CalculatorMode.ROI_BASED_ON_PRINCIPAL);
  };
  
  const editingValue = editingCurrency === EditingCurrency.TOKEN ? principalAsToken : principalAsUSD;
  const conversionUnit = editingCurrency === EditingCurrency.TOKEN ? "USD" : stakingTokenSymbol;
  const conversionValue = editingCurrency === EditingCurrency.TOKEN ? principalAsUSD : principalAsToken;
  const onUserInput = editingCurrency === EditingCurrency.TOKEN ? setPrincipalFromTokenValue : setPrincipalFromUSDValue;

  const DURATION = useMemo(() => ["30D", "60D", "90D", "120D", "1Y"], []);

  const isDisableMyBalance = useMemo(() => {
    return (
      !Number.isFinite(stakingTokenPrice) || !stakingTokenBalance.isFinite() || stakingTokenBalance.lte(0) || !account
    );
  }, [account, stakingTokenBalance, stakingTokenPrice]);

  return (
    <Box>
      {strategy ? (
        strategy(state, dispatch)
      ) : (
        <DefaultCompoundStrategy
          state={state}
          apr={apy ?? apr}
          dispatch={dispatch}
          earningTokenPrice={earningTokenPrice}
          performanceFee={performanceFee}
          stakingTokenPrice={stakingTokenPrice}
        />
      )}
      {header}
      <Flex flexDirection="column" mb="8px">
        <Text textAlign="left" color="textSubtle" bold fontSize="12px" textTransform="uppercase">
          {`${stakingTokenSymbol} staked`}
        </Text>
        <BalanceInput
          inputProps={{ scale: "sm" }}
          currencyValue={`${conversionValue} ${conversionUnit}`}
          innerRef={balanceInputRef}
          placeholder="0.00"
          value={editingValue}
          unit='USDT'
          decimals={stakingTokenDecimals}
          onUserInput={onUserInput}
          switchEditingUnits={toggleEditingCurrency}
          onFocus={onBalanceFocus}
        />
        <Flex justifyContent="space-between" mt="8px">
          <Button
            scale="xs"
            p="4px 16px"
            width="68px"
            variant="tertiary"
            onClick={() => setPrincipalFromUSDValue("100")}
          >
            $100
          </Button>
          <Button
            scale="xs"
            p="4px 16px"
            width="68px"
            variant="tertiary"
            onClick={() => setPrincipalFromUSDValue("1000")}
          >
            $1000
          </Button>
          <Button
            scale="xs"
            p="4px 16px"
            width="128px"
            variant="tertiary"
            style={{ textTransform: "uppercase" }}
            disabled={isDisableMyBalance}
            onClick={() =>
              setPrincipalFromUSDValue(
                getBalanceNumber(stakingTokenBalance.times(stakingTokenPrice), stakingTokenDecimals).toString()
              )
            }
          >
            My Balance
          </Button>
          <span ref={targetRef}>
            <HelpIcon width="16px" height="16px" color="textSubtle" />
          </span>
          {tooltipVisible && tooltip}
        </Flex>
        {children || (
          <>
            <Text mt="24px" textAlign="left" color="textSubtle" bold fontSize="12px" textTransform="uppercase">
              Staked for
            </Text>
            <FullWidthButtonMenu activeIndex={stakingDuration} onItemClick={setStakingDuration} scale="sm">
              {DURATION.map((duration) => (
                <ButtonMenuItem key={duration} variant="tertiary">
                  {duration}
                </ButtonMenuItem>
              ))}
            </FullWidthButtonMenu>
          </>
        )}
        {bCakeCalculatorSlot && bCakeCalculatorSlot(principalAsToken)}
        {autoCompoundFrequency === 0 && (
          <>
            <Text textAlign="left" mt="24px" color="textSubtle" bold fontSize="12px" textTransform="uppercase">
              Compounding every
            </Text>
            <Flex alignItems="center">
              <Flex flex="1">
                <Checkbox scale="sm" checked={compounding} onChange={toggleCompounding} />
              </Flex>
              <Flex flex="6">
                <FullWidthButtonMenu
                  scale="sm"
                  disabled={!compounding}
                  activeIndex={activeCompoundingIndex}
                  onItemClick={setCompoundingFrequency}
                >
                  <ButtonMenuItem>{"1D"}</ButtonMenuItem>
                  <ButtonMenuItem>{"7D"}</ButtonMenuItem>
                  <ButtonMenuItem>{"14D"}</ButtonMenuItem>
                  <ButtonMenuItem>{"30D"}</ButtonMenuItem>
                </FullWidthButtonMenu>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
      <AnimatedArrow calculatorState={state} />
      <Flex>
        <RoiCard
          calculatorState={state}
          earningTokenSymbol={earningTokenSymbol}
          setTargetRoi={setTargetRoi}
          setCalculatorMode={setCalculatorMode}
        />
      </Flex>
      <RoiCalculatorFooter
        isFarm={isFarm}
        apr={apr}
        apy={apy}
        displayApr={displayApr}
        autoCompoundFrequency={autoCompoundFrequency}
        multiplier={multiplier}
        linkLabel={linkLabel}
        linkHref={linkHref}
        performanceFee={performanceFee}
        rewardCakePerSecond={rewardCakePerSecond}
        isLocked={isLocked}
        stableSwapAddress={stableSwapAddress}
        stableLpFee={stableLpFee}
        farmCakePerSecond={farmCakePerSecond}
        totalMultipliers={totalMultipliers}
      />
    </Box>
  );
};

export default RoiCalculator;
