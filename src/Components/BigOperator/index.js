import React from "react";
import bottomlimit from "../BottomLimit";
import toplimit from "../UpperBound";
import symbol from "../Symbols/SummationSymbol";
import "./index.css";

const dom = () => [
  {
    type: "math",
    subtype: "bigOperator",
    children: [],
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
    <span className="bigOperator" {...attributes}>
      {children}
    </span>
  );
};

const icon = (attributes, children) => {
  return (
    <>
      <div class="bigOperator">
        <span className="top-limit-ico">x</span>
        <span className="symbol-ico">&#11034;</span>
        <span class="bottom-limit-ico">y=n</span>
      </div>
    </>
  );
};

export default { slateDOM: dom, MathElement: Element, Icon: icon };