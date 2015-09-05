# CSS steal

> Given DOM element returns styles applied to it.

## Usage 

```js
var css = CSSSteal(document.querySelector('.my-class'));
css.toCSSText(); // produces formatted CSS styles
css.toJS(): // returns an array of objects containing the styles
```

`CSSSteal` accepts as many DOM elements as you want. For example:

```js
var a = document.querySelector('.a-class');
var b = document.querySelector('.b-class');
var c = document.querySelector('.c-class');

var css = CSSSteal(a, b, c);
```

## Resources

[StackOverflow: Find all CSS rules that apply to an element](http://stackoverflow.com/questions/2952667/find-all-css-rules-that-apply-to-an-element);
