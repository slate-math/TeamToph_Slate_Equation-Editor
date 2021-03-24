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
  ExitBreakPlugin
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
import { createEditor} from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import { initialValueMentions, options } from './config/initialValues'; // Check this
import { MENTIONABLES } from './config/mentionables'; // Check this
import logo from './logo.svg';
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

const withPlugins = [
  withReact,
  withHistory,
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
          <ToolbarTable 
            {...options}
            icon={<Tooltip title="Add New Matrix"><BorderAllIcon /></Tooltip>}
            transform={insertTable}
          />          
          <ToolbarTable
            {...options}
            icon={<Tooltip title="Delete Matrix"><BorderClearIcon /></Tooltip>}
            transform={deleteTable}
          />
          <ToolbarTable
            {...options}
            icon={<Tooltip title="Add Row"><BorderBottomIcon /></Tooltip>}
            transform={addRow}
          />
          <ToolbarTable
            {...options}
            icon={<Tooltip title="Delete Row"><BorderTopIcon /></Tooltip>}
            transform={deleteRow}
          />
          <ToolbarTable
            {...options}
            icon={<Tooltip title="Add Column"><BorderLeftIcon /></Tooltip>}
            transform={addColumn}
          />
          <ToolbarTable
            {...options}
            icon={<Tooltip title="Delete Column"><BorderRightIcon /></Tooltip>}
            transform={deleteColumn}
          />
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
    <header className="App-body">
       <Editor />
     </header>
  </header>
  </div>
  );
}

export default App;
