import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_PARAGRAPH } from '@udecode/slate-plugins';
import { ParagraphPluginOptions } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from '../MatrixTable/defaults';
import { TableOptions } from '@udecode/slate-plugins';
import summationSymbol from "../Symbols/SummationSymbol/index";



export const getSumSymbolCellNode = (
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
        children: [summationSymbol.slateDOM(),],
      },
    ],
  };
};