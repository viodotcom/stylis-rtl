// @flow

import stylisRtlPlugin, { STYLIS_PROPERTY_CONTEXT } from './stylis-rtl'

describe('Stylis RTL Plugin', () => {
  it('converts LTR to RTL', () => {
    expect(
      stylisRtlPlugin(STYLIS_PROPERTY_CONTEXT, 'padding-left: 2px;')
    ).toEqual('padding-right: 2px;')
    expect(
      stylisRtlPlugin(STYLIS_PROPERTY_CONTEXT, 'margin: 0 1px 0 2px;')
    ).toEqual('margin: 0 2px 0 1px;')
  })

  it('allows you to skip rules via comments', () => {
    const input = `
      margin: 0 2px 0 1px;
      /* @noflip */
      margin: 0 1px 0 2px;
      /* just a regular comment */
      margin: 0 2px 0 1px;
    `

    const output = `
      margin: 0 1px 0 2px;
      /* @noflip */
      margin: 0 1px 0 2px;
      /* just a regular comment */
      margin: 0 1px 0 2px;
    `
    expect(stylisRtlPlugin(STYLIS_PROPERTY_CONTEXT, input)).toEqual(output)
  })
})
