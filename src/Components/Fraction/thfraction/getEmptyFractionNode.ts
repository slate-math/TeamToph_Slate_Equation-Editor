import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from '../../MatrixTable/defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getEmptyFractionRowNode } from './getEmptyFractionRowNode';


export const getEmptyFractionNode = (options?: TableOptions) => {
   const { table} = setDefaults(options, {
    ...DEFAULTS_TABLE,
  });

  return {
    children:[
    {
      children: [{ text: " " }]
    },
    {type: table.type,
    children: [getEmptyFractionRowNode(1, ), getEmptyFractionRowNode(1, )],
    },
    {
      children: [{ text: " " }]
    }
    ]
  };
};