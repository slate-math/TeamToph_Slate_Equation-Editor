import React, { useMemo, useState, useCallback } from 'react';
import { setDefaults } from '@udecode/slate-plugins';
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
  ToolbarMark,
  BoldPlugin,
  ItalicPlugin,
  HighlightPlugin,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH, 
  MARK_UNDERLINE,
  MARK_HIGHLIGHT, 
  StrikethroughPlugin,
  UnderlinePlugin,
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
import { TypeBold, TypeItalic, TypeStrikethrough, TypeUnderline} from '@styled-icons/bootstrap';
import  BorderColor from '@material-ui/icons/BorderColor';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createEditor,Transforms} from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact} from 'slate-react';
import { initialValueMentions, options } from './config/initialValues'; // Check this
import { MENTIONABLES } from './config/mentionables'; // Check this
import 'katex/dist/katex.min.css';
import components from "./Components"
import './App.css';
import { getEmptyFractionNode } from './Components/thfraction/getEmptyFractionNode';
import { getEmptySummationNode } from './Components/tdSummation/getEmptySummationNode';


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
  BoldPlugin(options),
  ItalicPlugin(options),
  HighlightPlugin(options),
  UnderlinePlugin(options),
  StrikethroughPlugin(options),
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

  var Latex = require('react-latex');

  return (
    <Slate 
      editor={editor}
      value={value}
      onChange={(newValue) => { 
        setValue(newValue as SlateDocument);
        onChangeMention(editor);  
      }}  
    > 
    <div className="fixed-top"> 
    
    <h4>Slate Equation Editor</h4> 
    
     <HeadingToolbar className="HT">
     <div className="btn-group"> 
     <Grid container alignItems="center">
     
        <button>
        <ToolbarMark type={MARK_BOLD} icon={<Tooltip title="Bold"><TypeBold/></Tooltip>}/>
        </button>   
        <button> 
        <ToolbarMark type={MARK_ITALIC} icon={<Tooltip title="Italic"><TypeItalic/></Tooltip>}/>
        </button>   
        <button>
        <ToolbarMark type={MARK_UNDERLINE} icon={<Tooltip title="Underline"><TypeUnderline/></Tooltip>}/>
        </button>   
        <button>
        <ToolbarMark type={MARK_STRIKETHROUGH} icon={<Tooltip title="StrikeThrough"><TypeStrikethrough/></Tooltip>}/>
        </button>   
        <button>
        <ToolbarMark type={MARK_HIGHLIGHT} icon={<Tooltip title="Highlight"><BorderColor/></Tooltip>}/>
        </button>     

        <Divider orientation="vertical" flexItem />

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

          <Divider orientation="vertical" flexItem />

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
          
          <Tooltip title="Fraction">
          <button onClick={() => { insertEquation(editor, "fraction"); }}>
           {hasIcon("fraction")}
          
          </button> 
          </Tooltip>  

 
          <Tooltip title="Summation">
          <button onClick={() => { insertEquation(editor, "summation"); }}>
          {hasIcon("summation")}
          </button>
          </Tooltip>
          
          <Tooltip title="Limit">
          <button onClick={() => { insertEquation(editor, "limit"); }}>
           {hasIcon("limit")}
          </button>
          </Tooltip>

          <Tooltip title="Integral">
          <button>
          <Latex displayMode={false}>{`$$ \\int $$`}</Latex>
          </button>
          </Tooltip>

          </Grid>
         </div> 

        </HeadingToolbar>
         </div>
      
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

/**
 * This methods checks to see if an equation component has an icon property. It prevents
 * the app from crashing when an icon isn't found.
 *
 * @param {string} eq   The name of the equation being looked up via intellisense hotkey
 */
const hasIcon = (eq) => {
  try {
    if (!components[eq].Icon()) throw "No icon found";
    return components[eq].Icon();
  } catch (err) {
    console.log(err);
  }
};
//const { table } = setDefaults(options, DEFAULTS_TABLE);
  /**
 * Inserts an equation's SlateDOM into the tree
 *
 * @param {string} eq   The name of the equation being looked up via intellisense hotkey
 */
const insertEquation = (editor, eq) => {
  let equation = {
    children: [{ text: "" }],
  };
  try {
    if (!EQUATIONS.includes(eq)) throw "Equation not supported";
    equation = components[eq].slateDOM();
  } catch (err) {
    console.log(err);
  }
  if (eq == "fraction"){
    Transforms.insertNodes(editor, getEmptyFractionNode());
    Transforms.move(editor);  
  }
  else if (eq == "summation") {
    Transforms.insertNodes(editor, getEmptySummationNode());
    Transforms.move(editor);  
  } else {
    Transforms.insertNodes(editor, equation);
    Transforms.move(editor);  
  }
};

// The different choices available in the drop-down box
const EQUATIONS = Object.keys(components); 

function App() {
  const Editor = createReactEditor();
  return( 
  <div className= "App">
      <body className="App-body">
       <Editor />
     </body>
  </div>
  );
}

export default App;