import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_TABLE } from '../MatrixTable/defaults';
import { TableOptions } from '@udecode/slate-plugins';
import { getLimSymbolRowNode } from './getLimSymbolRowNode';
import { getBottomLimSymbolRowNode } from './getBottomLimSymbolRowNode';




export const getEmptyLimNode = (options?: TableOptions) => {
   const { table} = setDefaults(options, {
    ...DEFAULTS_TABLE,
  });

  return {
    children:[
    {
      children: [{ text: " " }]
    },
    {type: table.type,
    children: [getLimSymbolRowNode(1, ), getBottomLimSymbolRowNode(1, )],
    },
    {
      children: [{ text: " " }]
    }
    ]
  };
};