import 'katex/dist/katex.min.css';
import React from "react";


var Latex = require('react-latex');
var dude = <Latex displayMode={false}>{`$$ \\Biggr( $$`}</Latex>

const dom = eq => ({
  type: "math",
  subtype: "summationSymbol",
  children: [{ text: "\u2211" }]
});

const Element = (attributes, children) => {
  return (
    <span contentEditable="false" className="sum-symbol" {...attributes}>
      {children}
    </span>
  );
};

export default { slateDOM: dom, MathElement: Element };
