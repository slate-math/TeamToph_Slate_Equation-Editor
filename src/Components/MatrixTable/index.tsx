
import React, { useMemo, useState, useRef, useCallback } from 'react';
import {boolean } from '@storybook/addon-knobs';
import { createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import {
  ParagraphPlugin,
  BlockquotePlugin,
  BoldPlugin,
  EditablePlugins,
  HeadingToolbar,
  ItalicPlugin,
  HeadingPlugin,
  SlateDocument,
  SlatePlugin,
  TablePlugin,
  UnderlinePlugin,
  CodeBlockPlugin,
  CodePlugin,
  ListPlugin,
  DEFAULTS_LIST,
  pipe,
  ToolbarTable,
  DEFAULTS_PARAGRAPH,
  DEFAULTS_BOLD,
  DEFAULTS_UNDERLINE,
  DEFAULTS_ITALIC,
  DEFAULTS_HEADING,
  DEFAULTS_CODE_BLOCK,
  DEFAULTS_BLOCKQUOTE,
  DEFAULTS_TODO_LIST,
  DEFAULTS_CODE,
  ResetBlockTypePlugin,   
  deleteTable,
  deleteRow,
  deleteColumn,
  ExitBreakPlugin,
  SoftBreakPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ResetBlockTypePluginOptions,
  isSelectionAtBlockStart,
  isBlockAboveEmpty,
} from '@udecode/slate-plugins'; 

 //import insertTable from './insertTable'
 import addRow from './addRow'
 import addColumn from './addColumn'
 import insertTable from './insertTable'

import DEFAULTS_TABLE from './defaults'

import { Tooltip } from '@material-ui/core';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import BorderClearIcon from '@material-ui/icons/BorderClear';
import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import BorderLeftIcon from '@material-ui/icons/BorderLeft';
import BorderRightIcon from '@material-ui/icons/BorderRight';



export const headingTypes = [
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
]

export const options = {
  ...DEFAULTS_PARAGRAPH,
  ...DEFAULTS_UNDERLINE,
  ...DEFAULTS_BOLD,
  ...DEFAULTS_ITALIC,
  ...DEFAULTS_HEADING,
  ...DEFAULTS_CODE_BLOCK,
  ...DEFAULTS_CODE,
  ...DEFAULTS_LIST,
  ...DEFAULTS_BLOCKQUOTE,
  ...DEFAULTS_TABLE,
    blockquote: { ...DEFAULTS_BLOCKQUOTE.blockquote, type: 'custom_blockquote' },
  code_block: { ...DEFAULTS_CODE_BLOCK.code_block, type: 'custom_code_block' },
    td: { ...DEFAULTS_TABLE.td, type: 'custom_td' },
    todo_li: { ...DEFAULTS_TODO_LIST.todo_li, type: 'custom_todo_li' },
  }

const resetBlockTypesCommonRule = {
  types: [
    options.blockquote.type,
    options.code_block.type,
    options.todo_li.type,
  ],
  defaultType: options.p.type,
}

export const optionsResetBlockTypes: ResetBlockTypePluginOptions = {
  rules: [
    {
      ...resetBlockTypesCommonRule,
      hotkey: "Enter",
      predicate: isBlockAboveEmpty,
    },
    {
      ...resetBlockTypesCommonRule,
      hotkey: "Backspace",
      predicate: isSelectionAtBlockStart,
    },
  ],
};

const initialValueTable: Node[] = [
  {
    type: options.p.type,
    children: [
      {
        text: 'Type "\\" and a character to begin',
      },
    ],
  }
];

  const plugins: SlatePlugin[] = [
    ParagraphPlugin(options),
    HeadingPlugin(options),
    CodeBlockPlugin(options),
    BlockquotePlugin(options),
    CodePlugin(options),
    ListPlugin(options),
    TablePlugin(options),
    ResetBlockTypePlugin(optionsResetBlockTypes),
      SoftBreakPlugin({
    rules: [
      { hotkey: 'shift+enter' },
    ],
  }),
  ExitBreakPlugin({
    rules: [
      {
        hotkey: 'mod+enter',
        level: 0,
      }, 
      {
        hotkey: 'mod+shift+enter',
        before: true,
        level: 0,
      },
      {
        hotkey: 'enter',
        level: 0,
      },
    ],
  }),
  ];
  

  const withPlugins=[withReact, withHistory] as const;
 if (boolean('TablePlugin', true)) plugins.push(TablePlugin(options));



 export const Editor = () => {

   const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

    const [value, setValue] = useState(initialValueTable);    

    return (
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue as SlateDocument)}
      >
      
        <HeadingToolbar>        
         <button>
          <ToolbarTable 
              {...options}
              icon={<Tooltip title="Add New Matrix"><BorderAllIcon /></Tooltip>}
              transform={insertTable}
            />  
        </button>   
        <button>
        <ToolbarTable
            {...options}
            icon={<Tooltip title="Delete Matrix"><BorderClearIcon /></Tooltip>}
            transform={deleteTable}
          />
          </button>              
          <button>
          <ToolbarTable
            {...options}
            icon={<Tooltip title="Add Row"><BorderBottomIcon /></Tooltip>}
            transform={addRow}
          />
          </button>         
          <button>
          <ToolbarTable
            {...options}
            icon={<Tooltip title="Delete Row"><BorderTopIcon /></Tooltip>}
            transform={deleteRow}
          />
          </button>         
          <button>
          <ToolbarTable
            {...options}
            icon={<Tooltip title="Add Column"><BorderLeftIcon /></Tooltip>}
            transform={addColumn}
          />
          </button>         
          <button>
          <ToolbarTable
            {...options}
            icon={<Tooltip title="Delete Column"><BorderRightIcon /></Tooltip>}
            transform={deleteColumn}
          />
          </button> 
          </HeadingToolbar>
        <EditablePlugins plugins={plugins} 
        placeholder= '&#11034;' />
      </Slate>
    );
  };


  export default Editor;
