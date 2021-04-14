import React, { useMemo, useState } from 'react';
import { text } from '@storybook/addon-knobs';
import {
  EditablePlugins, 
  HeadingPlugin,  
  ParagraphPlugin,   
  HeadingToolbar,  
  pipe,
  SlateDocument,
  withInlineVoid, 
  ToolbarTable,
   deleteColumn,
  deleteRow,
  deleteTable,
  TablePlugin,
  withTable, 
  SoftBreakPlugin,
  ExitBreakPlugin,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  SubscriptPlugin,
  SuperscriptPlugin,
  withMarks,
  ToolbarMark
} from '@udecode/slate-plugins';
import { MentionNodeData, MentionPlugin, MentionSelect, useMention } from './mention'  


import addRow from './Components/MatrixTable/addRow';
import addColumn from './Components/MatrixTable/addColumn';
import insertTable from './Components/MatrixTable/insertTable';

import { Tooltip } from '@material-ui/core';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import BorderClearIcon from '@material-ui/icons/BorderClear';
import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import BorderLeftIcon from '@material-ui/icons/BorderLeft';
import BorderRightIcon from '@material-ui/icons/BorderRight';
import { Subscript } from '@styled-icons/foundation/Subscript';
import { Superscript } from '@styled-icons/foundation/Superscript';
import { createEditor} from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import { initialValueMentions, options } from './config/initialValues'; // Check this
import { MENTIONABLES } from './config/mentionables'; // Check this
import './App.css';


/*export default {
  title: 'Elements/Mention',
  component: MentionPlugin, 
  subcomponents: {
    useMention, 
    MentionSelect,
  },
};*/

const plugins = [
  ParagraphPlugin(options),
  HeadingPlugin(options),
  TablePlugin(options),
  SubscriptPlugin(options),
  SuperscriptPlugin(options),
  MentionPlugin({
    mention: {
      ...options.mention,
      rootProps: {
        onClick: (mentionable: MentionNodeData) =>
          console.info(`Hello, I'm ${mentionable.value}`),
        prefix: text('prefix', '\\'),
      },
    },
  }), 
  SoftBreakPlugin({
    rules: [
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: [
            options.code_block.type,
            options.blockquote.type,
            options.td.type,
          ],
        },
      },
    ],
  }),
  ExitBreakPlugin({
    rules: [
      {
        hotkey: 'mod+enter',
        level: 1,
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
        level: 1,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
        },
        level: 1,
      },
    ],
  }),
];

const withPlugins = [
  withReact,
  withHistory,
  withMarks(),
  withInlineVoid({ plugins }),
  withTable(options),
] as const;

const createReactEditor = () => () => {
  const [value, setValue] = useState(initialValueMentions);

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

  const {
    onAddMention,
    onChangeMention,
    onKeyDownMention,
    search,
    index,
    target,
    values,
  } = useMention(MENTIONABLES, {
    maxSuggestions: 10,
    trigger: '\\',
  });
 
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => { 
        setValue(newValue as SlateDocument);
        onChangeMention(editor);
      }} 
    > 
      <HeadingToolbar>
      <div className="btn-group">
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
          <button> 
          <ToolbarMark
          type={MARK_SUPERSCRIPT}
          clear={MARK_SUBSCRIPT}
          icon={<Tooltip title="Superscript"><Superscript/></Tooltip>}
        />        
          </button>
        <button> 
        <ToolbarMark
          type={MARK_SUBSCRIPT}
          clear={MARK_SUPERSCRIPT}
          icon={<Tooltip title="Subscript"><Subscript/></Tooltip>}
        />        
          </button>
         </div>

        </HeadingToolbar>
      <EditablePlugins
        plugins={plugins}
        placeholder='Enter some text...'
        onKeyDown={[onKeyDownMention]}
        onKeyDownDeps={[index, search, target]}
      />
      <MentionSelect
        at={target}
        valueIndex={index}
        options={values}
        onClickMention={onAddMention}
      />
    </Slate>
  );
};

function App() {
  const Editor = createReactEditor();
  return( 
  <div className= "App">
  <header className="App-header">
    <p>
      Slate Equation Editor
    </p>
  </header>
      <body className="App-body">
       <Editor />
     </body>
  </div>
  );
}

export default App;