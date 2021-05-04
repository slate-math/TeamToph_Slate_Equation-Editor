import React from "react";
const dom = (eq) => ({
  type: "math",
  subtype: "numerator",
  children: [
    {
      type: "input",
      children: [{ text:  '\u2b1a' }],
    },
  ],
});

const Element = (attributes, children) => {
  return (
    <span className="numerator" {...attributes}>
      {children}
    </span>
  );
};

export default { slateDOM: dom, MathElement: Element };
