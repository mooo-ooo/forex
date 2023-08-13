import React from "react";
import Link from "./Link";
import { LinkProps } from "./types";
import OpenNewIcon from "../Icons/OpenNew";
import BscScanIcon from "../Icons/BscScan";

const LinkExternal: React.FC<React.PropsWithChildren<LinkProps>> = ({
  children,
  isBscScan = false,
  isAptosScan = false,
  showExternalIcon = true,
  ...props
}) => {
  return (
    <Link external {...props}>
      {children}
      {isBscScan && <BscScanIcon color={props.color ? props.color : "primary"} ml="4px" />}
      {!isBscScan && !isAptosScan && showExternalIcon && (
        <OpenNewIcon color={props.color ? props.color : "primary"} ml="4px" />
      )}
    </Link>
  );
};

export default LinkExternal;
