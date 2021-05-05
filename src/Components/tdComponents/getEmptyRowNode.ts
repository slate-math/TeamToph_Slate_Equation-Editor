import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from '../MatrixTable/defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getEmptyCellNode } from './getEmptyCellNode';

export const getEmptyRowNode = (colCount: number, options?: TableOptions) => {
  const { tr } = setDefaults(options, DEFAULTS_TABLE);

  return {
    type: tr.type,
    children: Array(colCount)
      .fill(colCount)
      .map(() => getEmptyCellNode(options)),
  };
};