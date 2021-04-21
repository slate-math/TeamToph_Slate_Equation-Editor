import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from './defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getEmptyRowNode } from './getEmptyRowNode';


export const getEmptyTableNode = (options?: TableOptions) => {
   const { table} = setDefaults(options, {
    ...DEFAULTS_TABLE,
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