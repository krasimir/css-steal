# CSS steal

Given DOM element returns styles applied to it and all its children.

## Installation

```js
npm install css-steal
```

## Usage

```js
var CSSSteal = require('css-steal');
var css = CSSSteal(document.querySelector('.my-class'));
css.toCSSText(); // produces formatted CSS styles
css.toJS(): // returns an array of objects containing the styles
```

`CSSSteal` accepts multiple DOM elements. For example:

```js
var a = document.querySelector('.a-class');
var b = document.querySelector('.b-class');
var c = document.querySelector('.c-class');

var css = CSSSteal(a, b, c);
```
It merges the CSS used by the elements.

## Building

```js
gulp
```

## Resources

* [StackOverflow: Find all CSS rules that apply to an element](http://stackoverflow.com/questions/2952667/find-all-css-rules-that-apply-to-an-element)
