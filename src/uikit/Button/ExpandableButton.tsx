import React from "react";
import ChevronDownIcon from "../Icons/ChevronDown";
import ChevronUpIcon from "../Icons/ArrowDropUp";
import Button from "./Button";
import IconButton from "./IconButton";

interface Props {
  onClick?: () => void;
  expanded?: boolean;
}

export const ExpandableButton: React.FC<React.PropsWithChildren<Props>> = ({ onClick, expanded, children }) => {
  return (
    <IconButton aria-label="Hide or show expandable content" onClick={onClick}>
      {children}
      {expanded ? <ChevronUpIcon color="invertedContrast" /> : <ChevronDownIcon color="invertedContrast" />}
    </IconButton>
  );
};
ExpandableButton.defaultProps = {
  expanded: false,
};

export const ExpandableLabel: React.FC<React.PropsWithChildren<Props>> = ({ onClick, expanded, children }) => {
  return (
    <Button
      variant="text"
      aria-label="Hide or show expandable content"
      onClick={onClick}
      endIcon={expanded ? <ChevronUpIcon color="primary" /> : <ChevronDownIcon color="primary" />}
    >
      {children}
    </Button>
  );
};
ExpandableLabel.defaultProps = {
  expanded: false,
};
