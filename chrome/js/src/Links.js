'use strict';

import { $ } from './DOMhelpers';
import execute from './execute';

export default class Links {
  constructor(ops) {
    this.ids = 0;
    this.elements = [];
    this.container = $('.js-items-selected .items-holder');
    this.onLinkSelected = ops.onLinkSelected;
    this.onClear = ops.onClear;
    this.steal = $('.js-steal');
    this.clear = $('.js-clear');

    this.container.addEventListener('click', this._handleLink.bind(this));
    this.container.addEventListener('mouseover', this._handleMouseOver.bind(this));
    this.steal.addEventListener('click', this._handleGetCSS.bind(this));
    this.clear.addEventListener('click', this._handleClear.bind(this));
  }
  addLink({ label, selector }) {
    if (this._isThereSuchElement(selector)) return;
    this.elements.push({
      label,
      selector,
      id: this._getId(),
      selected: false
    });
    this.clear.disabled = false;
    return this._render();
  }
  _isThereSuchElement(selector) {
    return !!this._getRecordBySelector(selector);
  }
  _getId() {
    return 'item' + (++this.ids);
  }
  _render() {
    var html = 
    Array.prototype.slice.call(this.elements)
    .reverse()
    .map((el) => {
      var html = '';
      var selected = el.selected ? ' class="selected"' : '';

      html += '<a href="#" data-index="' + el.id + '"' + selected + '>';
      html += '<i class="fa fa-check-square-o"></i> &lt;';
      html += el.label;
      html += '&gt;</a>';
      return html;
    })
    .join('');

    this.container.innerHTML = html === '' ? '&nbsp;' : html;

    return this;
  }
  _getRecordByElement(el) {
    var id = el.target ? el.target.getAttribute('data-index') : false;
    var filtered = this.elements.filter(record => record.id === id);

    return filtered.length > 0 ? filtered[0] : false;
  }
  _getRecordBySelector(selector) {
    var filtered = this.elements.filter(record => record.selector === selector);

    return filtered.length > 0 ? filtered[0] : false;
  }
  _handleLink(el) {
    var record = this._getRecordByElement(el);

    if (record) {
      record.selected = !record.selected;
      record.selected ? el.target.classList.add('selected') : el.target.classList.remove('selected');
      this.steal.disabled = !(this._selected().length > 0);
    }
  }
  _selected() {
    return this.elements.filter(el => el.selected);
  }
  _handleGetCSS() {
    this.onLinkSelected(this._selected());
  }
  _handleMouseOver(el) {
    var record = this._getRecordByElement(el);

    if (record) {
      execute(this._inspect, ['"' + record.selector + '"']);
    }
  }
  _handleClear() {
    this.elements = [];
    this.clear.disabled = true;
    this.steal.disabled = true
    this._render();
    this.onClear();
  }

  _inspect(selector) {
    inspect(document.querySelector(selector));
  }
};
