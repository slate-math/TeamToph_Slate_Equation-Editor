import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from '../MatrixTable/defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getIntegralSymbolCellNode } from './getIntegralSymbolCellNode';

export const getIntegralSymbolRowNode = (colCount: number, options?: TableOptions) => {
  const { tr } = setDefaults(options, DEFAULTS_TABLE);

  return {
    type: tr.type,
    children: Array(colCount)
      .fill(colCount)
      .map(() => getIntegralSymbolCellNode(options)),
  };
};