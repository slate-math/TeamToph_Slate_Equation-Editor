import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from './defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getEmptyRowNode } from './getEmptyRowNode';
import { DEFAULTS_PARAGRAPH } from '@udecode/slate-plugins';


export const getEmptyTableNode = (options?: TableOptions) => {
   const { table, p } = setDefaults(options, {
    ...DEFAULTS_TABLE,
    ...DEFAULTS_PARAGRAPH,
  });

  return {
    children:[
    {
      children: [{ text: " " }]
    },
    {type: table.type,
    children: [getEmptyRowNode(2, options), getEmptyRowNode(2, options)],
    },
    {
      children: [{ text: "   " }]
    }
    ]
  };
};