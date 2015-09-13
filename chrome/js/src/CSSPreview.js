'use strict';

import CSSSteal from '../../../src/';
import { $ } from './DOMhelpers';

export default class CSSPreview {
  constructor() {
    this.container = $('.js-item-css');
  }
  render(els) {
    if (!Array.isArray(els)) els = [els];
    var css = CSSSteal(...els).toCSSText();
    
    this.container.innerHTML = '<pre>' + css + '</pre>';
  }
}