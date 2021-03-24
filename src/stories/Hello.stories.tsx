// YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import Hello from './Hello.js';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Hello Story',
  component: Hello
}


export function HelloJoe() {
  return (
    <Hello name="Jo Doe" />
  )
}