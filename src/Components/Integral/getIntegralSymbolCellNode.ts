import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_PARAGRAPH } from '@udecode/slate-plugins';
import { ParagraphPluginOptions } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from '../MatrixTable/defaults';
import { TableOptions } from '@udecode/slate-plugins';
import integralSymbol from "../Symbols/IntegralSymbol/index";



export const getIntegralSymbolCellNode = (
  options?: TableOptions & ParagraphPluginOptions & { header?: boolean }
) => {
  const { td, p } = setDefaults(options, {
    ...DEFAULTS_TABLE,
    ...DEFAULTS_PARAGRAPH,
  });

  return {
    type: td.type,
    children: [
      {
        type: p.type,
        children: [integralSymbol.slateDOM(),],
      },
    ],
  };
};