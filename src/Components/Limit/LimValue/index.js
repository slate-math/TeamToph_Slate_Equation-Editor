import React from "react";
const dom = () => ({
  type: "math",
  subtype: "LimValue",
  children: [
    {
      type: "input",
      children: [{ text: "\u2b1a\u2192\u2b1a" }]
    }
  ]
});

const Element = (attributes, children) => {
  return (
    <span className="LimValue" {...attributes}>
      {children}
    </span>
  );
};
export default { slateDOM: dom, MathElement: Element };
