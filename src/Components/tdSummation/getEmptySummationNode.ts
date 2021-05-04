import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from '../MatrixTable/defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getEmptySummationRowNode } from './getEmptySummationRowNode';
import { getSumSymbolRowNode } from './getSumSymbolRowNode';



export const getEmptySummationNode = (options?: TableOptions) => {
   const { table} = setDefaults(options, {
    ...DEFAULTS_TABLE,
  });

  return {
    children:[
    {
      children: [{ text: " " }]
    },
    {type: table.type,
    children: [getEmptySummationRowNode(1, ), getSumSymbolRowNode(2, ), getEmptySummationRowNode(1, )],
    },
    {
      children: [{ text: " " }]
    }
    ]
  };
};