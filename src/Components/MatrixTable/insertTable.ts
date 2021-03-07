import { Editor, Transforms } from 'slate';
import { someNode } from '@udecode/slate-plugins';
import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from './defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getEmptyTableNode } from './getEmptyTableNode';

export const insertTable = (editor: Editor, options?: TableOptions) => {
  const { table } = setDefaults(options, DEFAULTS_TABLE);

  if (!someNode(editor, { match: { type: table.type } })) {
    Transforms.insertNodes(editor, getEmptyTableNode(options));
  }
};
export default insertTable;