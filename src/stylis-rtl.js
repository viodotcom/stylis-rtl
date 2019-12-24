// @flow

import cssjanus from "cssjanus";

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

// We need to apply cssjanus as early as possible to capture the noflip directives if used
// (they are not present at the PROPERTY, SELECTOR_BLOCK, or POST_PROCESS steps)
export const STYLIS_PROPERTY_CONTEXT = STYLIS_CONTEXTS.PREPARATION;

export default (context: StylisContextType, content: string): ?string => {
  if (context === STYLIS_PROPERTY_CONTEXT) {
    return cssjanus.transform(content);
  }
};
