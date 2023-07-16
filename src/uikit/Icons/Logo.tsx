import React from "react";
import Svg from "./Svg";
import { SvgProps } from "./types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => (
  <Svg viewBox="0 0 175 175" fill="#ec9454" {...props}>
    <g id="Page-1" stroke="#ec9454" stroke-width="1" fill="none" fill-rule="evenodd"><polygon id="frame.secondary" fill="#ec9454" points="87 0 162 43.75 162 131.25 87 175 12 131.25 12 43.75"></polygon></g>
  </Svg>
  // <svg width="175" height="175" viewBox="0 0 175 175" version="1.1" id="svg_frame.secondary" x="163" y="94" fill="#ec9454"></svg>
);

export default Icon;
