import React from "react";
import { Flex, Box } from "../Box";
import { StyledBalanceInput, StyledInput, UnitContainer } from "./styles";
import { BalanceInputProps } from "./types";

const BalanceInput: React.FC<React.PropsWithChildren<BalanceInputProps>> = ({
  value,
  placeholder = "0.0",
  onUserInput,
  currencyValue,
  inputProps,
  innerRef,
  isWarning = false,
  decimals = 18,
  unit,
  switchEditingUnits,
  ...props
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      onUserInput(e.currentTarget.value.replace(/,/g, "."));
    }
  };

  return (
    <StyledBalanceInput isWarning={isWarning} {...props}>
      <Flex justifyContent="flex-end">
        <Box width="100%">
          <Flex alignItems="center">
            <StyledInput
              pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
              inputMode="decimal"
              min="0"
              value={value}
              onChange={handleOnChange}
              placeholder={placeholder}
              ref={innerRef}
              {...inputProps}
            />
            {unit && <UnitContainer>{unit}</UnitContainer>}
          </Flex>
        </Box>
      </Flex>
    </StyledBalanceInput>
  );
};

export default BalanceInput;
