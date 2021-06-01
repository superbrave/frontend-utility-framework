# frontend-framework

## 1. Introduction

This framework does not try to compete with renowned frameworks like Bootstrap or Tailwind. Instead, this framework is created to tailor to the needs and wishes of our current frontend philosophy. It differs from existing frameworks by not generating utility classes that can be used in HTML to build components, but by generating SASS placeholders that can be extended in scss files.

## 2. Installation

Use the following command to include the build script in your project.

```
yarn add @superbrave/utility-framework
```

Or if you are using NPM:

```
npm i @superbrave/utility-framework
```

## 3. The framework

### External

[Normalize.css](https://necolas.github.io/normalize.css/) is loaded by default.

### Functions

#### \_breakpoint.scss

Contains the `break()` mixin with a parameter for the breakpoint to generate the responsive classes. The breakpoints are defined in the file in a list variable and can be changed if necessary.
The mixin loops through the list and places a media query around the content passed into the mixin, with the breakpoint passed as the parameter.

For example:

```scss
@include break(desktop) {
  display: none;
}
```

will generate:

```scss
@media only screen and (min-width: 1200px) {
  display: none;
}
```

The file contains two helper functions:
`@function breakpoint-min($name, $breakpoint)` returns `null` if it loops through the breakpoint and matches with the breakpoint name `mobile`. This function is used for the breakpoint loop to generate no media query around the mobile (base) version of a style.

`@function breakpoint-infix()` returns a string with the breakpoint infix text to be used to declare a responsive style in the css (or null for mobile).
The default infix is \|. Because the pipe character is used in CSS to define namespaces, this character needs to be escaped.

Usage: `@extend [utility]\|[breakpoint-name]`

#### \_mixins.scss

This file contains helper functions that can be used by other utilities, or in custom css when necessary:

`@function rem($size)` accepts a pixel value and converts it to a rem value, with the value in `$base-font-size` as base value.

`@function strip-unit($value)` strips the units (like px, em, ..) from any value passed into the function.

`@mixin fluid-font($font-size, $min-font-size: null, $max-font-size:null, $min-vw: 320px, $max-vw:1920px)` generates a font size that depends on the viewport width of the user's browser.

If only `$font-size` is provided, the mixin will automatically determine a min and max font size based on a standard division and scale the font in between those sizes.
If `$min-font-size` and `$max-font-size` are provided, the font will scale between those values.

### Utilities

The utilities generate helper placeholders with default css rules applied to them. They can be applied to an element by using the SASS `@extend` directive.


#### Display

Used to apply a `display: xxx` to any element. Generated options are: `block`, `inline-block`, `inline`, `flex`, `inline-flex` and `grid`.

Note: `display:none` is generated in the hidden-utility.

Usage: `@extend [display-type]\|[responsive-modifier]` e.g. `@extend block\|desktop`

#### Flexembed

Provides default css to enforce aspect ratios of embedded elements (`iframe`, `embed`, `object`). The aspect ratios are defined in a list variable on top of the file. Default aspect ratios are: `2:1`, `4:3`, `16:9`
Flexembed does not accept responsive modifiers.
Usage:`@extend %flexembed-[xxbyxx]` where xx are width and height respectively. e.g. `flexembed-16by9`

Note: This variable can be overwritten

#### Font Sizes

Generates different font sizes, one base to be used for default text, and one for each possible header tag (`<h1>` to `<h6>`)
Font Sizes does not accept responsive modifiers.

Note: This variable cannot be overwritten

Usage: `@extend font-size-primary`

#### Hidden

Generates helper classes to hide elements from display on the page. This can be either `hidden`, to remove the element from the DOM, or `visually-hidden` to only hide the element from view, but keep it visible for screen readers, bots, etc.

Usage: `@extend hidden\|[responsive-modifier]`, or `@extend visually-hidden\|[responsive-modifier]`

#### Paddings & Margins

Generates helper placeholders to apply predefined padding and margin values to any dimension of an element. The sizes are defined in a list variable on top of the file. This ensures a consistency in the padding/margin values used on the page.

Note: This variable cannot be overwritten

Both paddings and margins can be applied to any one side (top, left, bottom, right), to the x-axis (horizontal), to the y-axis (vertical) or to every side of the element.

Usage: `@extend [padding-where-size]\|[responsive-modifier]` or `@extend [margin-where-size]\|[responsive-modifier]`. e.g. `@extend padding-vertical-tiny\|tablet-portrait`

#### Width

Generates fraction classes that can be used to define the width of an element. By default the maximum number of fractions the page is divided in, is 5.
The mixin creates fraction classes from one up to the maximum provided in the `$fractions` variable on top of the page, which is set to 5 by default.

Note: This variable can be overwritten

For example: `$fractions` set to 5 will generate all placeholders with _x_ of5, _x_ of4, _x_ of3, _x_ of2 and 1of1.
The fractions _x_ of5 will generate widths of 20% per fraction; _x_ of 4 widths of 25% per fraction, etc.

Usage: `@extend width-2of5|desktop` will generate:

```scss
@media only screen and (min-width: 1200px) {
  width: 40%;
}
```
