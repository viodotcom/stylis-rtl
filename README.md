# Stylis RTL Plugin

Stylis RTL plugin based on CSSJanus

## Using with Emotion

```javascript
import createEmotion from 'create-emotion'
import stylisRTL from 'stylis-rtl'

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  caches
} = createEmotion({}, {
  stylisPlugins: stylisRTL
})
```
