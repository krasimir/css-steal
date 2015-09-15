'use strict';

import CSSSteal from '../../../src/';
import execute from './execute';
import { $ } from './DOMhelpers';

export default class CSSPreview {
  constructor() {
    this.container = $('.js-css-holder');
  }
  render(els) {
    var selectors = els.map(el => el.selector);
    console.log(selectors);
    execute(
      this._CSSSteal,
      [CSSSteal, '[' + selectors.map(s => '"' + s + '"').join(',') + ']'],
      css => {
        this.container.innerHTML = '<pre>' + css + '</pre>';
      }
    );
  }
  _CSSSteal(CSSSteal, selectors) {
    var elements = selectors.map(sel => document.querySelector(sel));

    return CSSSteal.apply(null, elements).toCSSText()
  }
}