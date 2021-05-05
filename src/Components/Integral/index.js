import React from "react";
import bottomlimit from "../BottomLimit";
import toplimit from "../UpperBound";
import symbol from "../Symbols/IntegralSymbol";
import "./index.css";

const dom = () => [
  {
    type: "math",
    subtype: "integral",
    children: [toplimit.slateDOM(), symbol.slateDOM(), bottomlimit.slateDOM()],
  },
  {
    children: [
      {
        text: " ",
      },
    ],
  },
];

const Element = (attributes, children) => {
  return (
    <span className="integral" {...attributes}>
      {children}
    </span>
  );
};

const icon = (attributes, children) => {
  return (
    <>
      <span class="integral" {...attributes}>
        <span class="toplimit">x</span>
        <span class="symbol">&#x222B;</span>
        <span class="bottomlimit">y</span>
        {children}
      </span>
    </>
  );
};

export default { slateDOM: dom, MathElement: Element, Icon: icon };
