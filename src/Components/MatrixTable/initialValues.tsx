import { Descendant } from 'slate'
import {
  DEFAULTS_ALIGN,
  DEFAULTS_BLOCKQUOTE,
  DEFAULTS_BOLD,
  DEFAULTS_CODE,
  DEFAULTS_CODE_BLOCK,
  DEFAULTS_HEADING,
  DEFAULTS_HIGHLIGHT,
  DEFAULTS_IMAGE,
  DEFAULTS_ITALIC,
  DEFAULTS_LINK,
  DEFAULTS_LIST,
  DEFAULTS_MEDIA_EMBED,
  DEFAULTS_MENTION,
  DEFAULTS_PARAGRAPH,
  DEFAULTS_SEARCH_HIGHLIGHT,
  DEFAULTS_STRIKETHROUGH,
  DEFAULTS_SUBSUPSCRIPT,
  DEFAULTS_TODO_LIST,
  DEFAULTS_UNDERLINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  SlateDocument,
  SlateDocumentDescendant,
  SlateDocumentFragment,
  isSelectionAtBlockStart,
  isBlockAboveEmpty,
  ResetBlockTypePluginOptions,
  DEFAULTS_KBD,
} from '@udecode/slate-plugins'

import DEFAULTS_TABLE from "./defaults"

export const headingTypes = [
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
]

export const options = {
  ul: { ...DEFAULTS_LIST.ul, type: 'custom_ul' },
  ol: { ...DEFAULTS_LIST.ol, type: 'custom_ol' },
  li: { ...DEFAULTS_LIST.li, type: 'custom_li' },
  p: { ...DEFAULTS_PARAGRAPH.p, type: 'custom_p' },
  mention: { ...DEFAULTS_MENTION.mention, type: 'custom_mention' },
  blockquote: { ...DEFAULTS_BLOCKQUOTE.blockquote, type: 'custom_blockquote' },
  code_block: { ...DEFAULTS_CODE_BLOCK.code_block, type: 'custom_code_block' },
  link: { ...DEFAULTS_LINK.link, type: 'custom_link' },
  img: { ...DEFAULTS_IMAGE.img, type: 'custom_img' },
  media_embed: {
    ...DEFAULTS_MEDIA_EMBED.media_embed,
    type: 'custom_media_embed',
  },
  todo_li: { ...DEFAULTS_TODO_LIST.todo_li, type: 'custom_todo_li' },
  table: { ...DEFAULTS_TABLE.table, type: 'custom_table' },
  tr: { ...DEFAULTS_TABLE.tr, type: 'custom_tr' },
  td: { ...DEFAULTS_TABLE.td, type: 'custom_td' },
  th: { ...DEFAULTS_TABLE.th, type: 'custom_th' },
  ...DEFAULTS_HEADING,
  h1: { ...DEFAULTS_HEADING.h1, type: 'custom_h1' },
  align_left: { ...DEFAULTS_ALIGN.align_left, type: 'custom_align_left' },
  align_center: { ...DEFAULTS_ALIGN.align_center, type: 'custom_align_center' },
  align_right: { ...DEFAULTS_ALIGN.align_right, type: 'custom_align_right' },

  // marks
  ...DEFAULTS_BOLD,
  ...DEFAULTS_ITALIC,
  ...DEFAULTS_UNDERLINE,
  ...DEFAULTS_STRIKETHROUGH,
  ...DEFAULTS_CODE,
  ...DEFAULTS_KBD,
  ...DEFAULTS_SUBSUPSCRIPT,
  ...DEFAULTS_HIGHLIGHT,
  ...DEFAULTS_SEARCH_HIGHLIGHT,
}


const createTable = () => ({
  type: options.table.type,
  children: [
    {
      type: options.tr.type,
      children: [
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
      ],
    },
    {
      type: options.tr.type,
      children: [
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
      ],
    },
    {
      type: options.tr.type,
      children: [
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
        {
          type: options.td.type,
                children: [{ text: "\u2b1a" }],

        },
      ],
    },
  ],
})

export const initialValueTables: SlateDocument = [
  {
    children: [
      {
        type: options.h2.type,
        children: [
          {
            text: '🏓 Table',
          },
        ],
      },
      {
        type: options.p.type,
        children: [
          {
            text:
              'Since the editor is based on a recursive tree model, similar to an HTML document, you can create complex nested structures, like tables:',
          },
        ],
      },
      createTable(),
      {
        type: options.p.type,
        children: [
          {
            text:
              "This table is just a basic example of rendering a table, and it doesn't have fancy functionality. But you could augment it to add support for navigating with arrow keys, displaying table headers, adding column and rows, or even formulas if you wanted to get really crazy!",
          },
        ],
      },
    ] as SlateDocumentFragment,
  },
]