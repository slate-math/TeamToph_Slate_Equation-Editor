import { getRenderElement } from '@udecode/slate-plugins';
import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_MENTION } from './defaults';
import { MentionRenderElementOptions } from './types';

export const renderElementMention = (options?: MentionRenderElementOptions) => {
  const { mention } = setDefaults(options, DEFAULTS_MENTION);

  return getRenderElement(mention);
};
