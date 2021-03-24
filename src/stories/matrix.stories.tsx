// YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import insertTable from '../Components/MatrixTable/insertTable';
import Editor from "../Components/MatrixTable/index"
import createReactEditor from "../App"


import {
  ToolbarTable,
} from '@udecode/slate-plugins';

import { Tooltip } from '@material-ui/core';
import BorderAllIcon from '@material-ui/icons/BorderAll';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'MatrixToolbar',

  component: Editor,
}


export function Matrix() {
  return (
    <Editor/>
  )
}



//👇 We create a “template” of how args map to rendering
//const Template = (args) => <Editor {...args} />;

//export const MatrixEditor = Template.bind({});
//MatrixEditor.args = {
  /*👇 The args you need here will depend on your component */
//};
