// @flow

// https://rtlcss.com/
import rtlcss from 'rtlcss';

// https://github.com/thysultan/stylis.js#plugins
const STYLIS_CONTEXTS = {
  POST_PROCESS: -2,
  PREPARATION: -1,
  NEWLINE: 0,
  PROPERTY: 1,
  SELECTOR_BLOCK: 2,
  AT_RULE: 3
};

export type StylisContextType = $Values<typeof STYLIS_CONTEXTS>;
// Using PREPARATION because comments are getting removed at the PROPERTY level.
export const STYLIS_PROPERTY_CONTEXT = STYLIS_CONTEXTS.PREPARATION;

export default (context: StylisContextType, content: string): ?string => {
  if (context === STYLIS_PROPERTY_CONTEXT) {
    return rtlcss.process(content);
  }
};
