// @flow

import Stylis from "stylis";
import stylisRtlPlugin, { STYLIS_PROPERTY_CONTEXT } from "./stylis-rtl";

const stylis = new Stylis();

stylis.use(stylisRtlPlugin);

describe("Stylis RTL Plugin", () => {
  it("converts LTR to RTL", () => {
    expect(
      stylisRtlPlugin(STYLIS_PROPERTY_CONTEXT, "padding-left: 2px;")
    ).toEqual("padding-right: 2px;");
    expect(
      stylisRtlPlugin(STYLIS_PROPERTY_CONTEXT, "margin: 0 1px 0 2px;")
    ).toEqual("margin: 0 2px 0 1px;");
  });

  it("allows you to skip rules via comments", () => {
    const input = `
      margin: 0 2px 0 1px;
      /* @noflip */
      margin: 0 1px 0 2px;
      /* just a regular comment */
      margin: 0 2px 0 1px;
    `;

    const output = `
      margin: 0 1px 0 2px;
      /* @noflip */
      margin: 0 1px 0 2px;
      /* just a regular comment */
      margin: 0 1px 0 2px;
    `;
    expect(stylisRtlPlugin(STYLIS_PROPERTY_CONTEXT, input)).toEqual(output);
  });
});

describe("integration test with stylis", () => {
  it("flips simple rules", () => {
    expect(
      stylis(
        ".a",
        `
      padding-left: 5px;
      margin-right: 5px;
      border-left: 1px solid red;
    `
      )
    ).toMatchInlineSnapshot(
      `".a{padding-right:5px;margin-left:5px;border-right:1px solid red;}"`
    );
  });

  it("flips shorthands", () => {
    expect(
      stylis(
        ".a",
        `
      padding: 0 5px 0 0;
      margin: 0 0 0 5px;
    `
      )
    ).toMatchInlineSnapshot(`".a{padding:0 0 0 5px;margin:0 5px 0 0;}"`);
  });

  it("handles noflip directives", () => {
    expect(
      stylis(
        ".a",
        `
        /* @noflip */
      padding: 0 5px 0 0;
      margin: 0 0 0 5px;
    `
      )
    ).toMatchInlineSnapshot(`".a{padding:0 5px 0 0;margin:0 5px 0 0;}"`);
  });
});
