// @flow

import dd from '../dedent';

describe("dedent", () => {
  it("works without interpolation", () => {
    expect(
      dd`first
         second
         third`
    ).toMatchSnapshot();
  });

  it("works with interpolation", () => {
    expect(
      dd`first ${"line"}
         ${"second"}
         third`
    ).toMatchSnapshot();
  });

  it("works with suppressed newlines", () => {
    expect(
      dd`first \
         ${"second"}
         third`
    ).toMatchSnapshot();
  });

  it("works with multiline interpolation", () => {
    expect(
      dd`
        first
          ${"second\nthird"}
        fourth
      `
    ).toMatchSnapshot();
  });

  it("works with inline interpolation", () => {
    expect(
      dd`
        first ${"second\nthird"} fourth
      `
    ).toMatchSnapshot();
  });

  it("works with dedent interpolation", () => {
    expect(
      dd`
        first
          ${dd`
            second
            third
          `}
        fourth
      `
    ).toMatchSnapshot();
  });

  it("works with blank first line", () => {
    expect(dd`
      Some text that I might want to indent:
        * reasons
        * fun
      That's all.
    `).toMatchSnapshot();
  });

  it("works with multiple blank first lines", () => {
    expect(
      dd`

         first
         second
         third`
    ).toMatchSnapshot();
  });

  it("works with removing same number of spaces", () => {
    expect(
      dd`
         first
            second
               third
      `
    ).toMatchSnapshot();
  });

  describe("single line input", () => {
    it("works with single line input", () => {
      expect(dd`A single line of input.`).toMatchSnapshot();
    });

    it("works with single line and closing backtick on newline", () => {
      expect(dd`
        A single line of input.
      `).toMatchSnapshot();
    });

    it("works with single line and inline closing backtick", () => {
      expect(dd`
        A single line of input.`
      ).toMatchSnapshot();
    });
  });

  it("can be used as a function", () => {
    expect(dd(`
      A test argument.
    `)).toMatchSnapshot();
  });

  it("escapes backticks", () => {
    expect(dd`\``).toMatchSnapshot();
  });

  it("doesn't strip exlicit newlines", () => {
    expect(dd`
      <p>Hello world!</p>\n
    `).toMatchSnapshot();
  });

  it("doesn't strip exlicit newlines with mindent", () => {
    expect(dd`
      <p>
        Hello world!
      </p>\n
    `).toMatchSnapshot();
  });

  it("handles zero indent", () => {
    expect(dd`
First line
  Second line
    `).toMatchSnapshot();
  });

  it("ignores first line indent", () => {
    expect(dd`{
  int a;
  int b;
}`).toMatchSnapshot();
  });

  it("another nested text", () => {
    const decl = dd`{
  int a;
  int b;
}`;
    expect(dd`{
  int a;
  struct ${decl} foo;
  int b;
}`).toMatchSnapshot();
  });

});
