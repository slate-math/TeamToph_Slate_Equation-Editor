import { Editor, Transforms } from 'slate';
import { someNode } from '@udecode/slate-plugins';
import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from '../../MatrixTable/defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getEmptyFractionNode } from './getEmptyFractionNode';

export const insertFraction = (editor: Editor, options?: TableOptions) => {
  const { table } = setDefaults(options, DEFAULTS_TABLE);

  if (!someNode(editor, { match: { type: table.type } })) {
    Transforms.insertNodes(editor, getEmptyFractionNode());
    Transforms.move(editor);
  }
};
export default insertFraction;