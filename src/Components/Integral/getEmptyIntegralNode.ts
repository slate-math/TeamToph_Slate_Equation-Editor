import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from '../MatrixTable/defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getEmptyRowNode } from '../tdComponents/getEmptyRowNode';
import { getIntegralSymbolRowNode } from './getIntegralSymbolRowNode';



export const getEmptyIntegralNode = (options?: TableOptions) => {
   const { table} = setDefaults(options, {
    ...DEFAULTS_TABLE,
  });

  return {
    children:[
    {
      children: [{ text: " " }]
    },
    {type: table.type,
    children: [getEmptyRowNode(1, ), getIntegralSymbolRowNode(1, ), getEmptyRowNode(1, )],
    },
    {
      children: [{ text: " " }]
    }
    ]
  };
};