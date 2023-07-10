import styled, { css, DefaultTheme } from "styled-components";
import { ForexTheme } from 'theme'
import { space } from "styled-system";
import { Box } from "../Box";
import { CardProps } from "./types";

interface StyledCardProps extends CardProps {
  theme: DefaultTheme & ForexTheme;
}

export const StyledCard = styled.div<StyledCardProps>`
  background: #272627;
  border-radius: 8px;
  color: ${({ theme, isDisabled }) => theme.colors[isDisabled ? "textDisabled" : "text"]};
  overflow: hidden;
  position: relative;

  ${({ isActive }) =>
    isActive &&
    css`
      background-size: 400% 400%;
    `}

  padding: 1px 1px 3px 1px;

  ${space}
`;

export const StyledCardInner = styled(Box)<{ background?: string; hasCustomBorder: boolean }>`
  width: 100%;
  height: 100%;
  overflow: ${({ hasCustomBorder }) => (hasCustomBorder ? "initial" : "inherit")};
  background: ${({ theme, background }) => background ?? theme.card.background};
  border-radius: 8px;
`;

StyledCard.defaultProps = {
  isActive: false,
  isSuccess: false,
  isWarning: false,
  isDisabled: false,
};
