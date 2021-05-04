import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_PARAGRAPH } from '@udecode/slate-plugins';
import { ParagraphPluginOptions } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from '../MatrixTable/defaults';
import { TableOptions } from '@udecode/slate-plugins';
import matrixElement from "../MatrixElement/index";


export const getEmptyFractionCellNode = (
  options?: TableOptions & ParagraphPluginOptions & { header?: boolean }
) => {
  const { th, p } = setDefaults(options, {
    ...DEFAULTS_TABLE,
    ...DEFAULTS_PARAGRAPH,
  });

  return {
    type: th.type,
    children: [
      {
        type: p.type,
        children: [matrixElement.slateDOM(),],
      },
    ],
  };
};