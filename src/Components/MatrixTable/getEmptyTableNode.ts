import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from './defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getEmptyRowNode } from './getEmptyRowNode';

export const getEmptyTableNode = (options?: TableOptions) => {
  const { table } = setDefaults(options, DEFAULTS_TABLE);

  return {
    children:[
    {type: table.type,
    children: [getEmptyRowNode(2, options), getEmptyRowNode(2, options)],
    },
    {
      type: "input",
      children: [{ text: " " }]
    }
    ]
  };
};