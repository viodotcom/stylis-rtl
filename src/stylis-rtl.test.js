// @flow

import stylisRtlPlugin, { STYLIS_PROPERTY_CONTEXT } from './stylis-rtl';

describe('Stylis RTL Plugin', () => {
  it('converts LTR to RTL', () => {
    expect(
      stylisRtlPlugin(STYLIS_PROPERTY_CONTEXT, 'padding-left: 2px;')
    ).toEqual('padding-right: 2px;');
    expect(
      stylisRtlPlugin(STYLIS_PROPERTY_CONTEXT, 'margin: 0 1px 0 2px;')
    ).toEqual('margin: 0 2px 0 1px;');
  });

  it('allows you to replace a value via inline comments', () => {
    expect(
      stylisRtlPlugin(STYLIS_PROPERTY_CONTEXT, 'font-size: 16px/*rtl:14px*/;')
    ).toEqual('font-size: 14px;');
  });

  it('allows you to skip rules via comments', () => {
    const input = `
      margin: 0 2px 0 1px;
      /*rtl:begin:ignore*/
      text-align:left;
      /*rtl:end:ignore*/
      /* just a regular comment */
      margin: 0 2px 0 1px;
    `;

    const output = `
      margin: 0 1px 0 2px;
      text-align:left;
      /* just a regular comment */
      margin: 0 1px 0 2px;
    `;
    expect(stylisRtlPlugin(STYLIS_PROPERTY_CONTEXT, input)).toEqual(output);
  });

  it('allows you to prepend a value via comments', () => {
    expect(
      stylisRtlPlugin(
        STYLIS_PROPERTY_CONTEXT,
        'font-family: "Droid Sans", sans-serif/*rtl:prepend:"Droid Arabic Kufi",*/;'
      )
    ).toEqual('font-family: "Droid Arabic Kufi","Droid Sans", sans-serif;');
  });
});
