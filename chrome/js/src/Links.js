'use strict';

import { $ } from './DOMhelpers';

export default class Links {
  constructor(ops) {
    this.elements = [];
    this.selected = {};
    this.container = $('.js-items-selected .items-holder');
    this.onLinkSelected = ops.onLinkSelected;
    this.steal = $('.js-steal');

    this.container.addEventListener('click', this.handleLink.bind(this));
    this.steal.addEventListener('click', this.handleGetCSS.bind(this));
  }
  addLink({ label, selector }) {
    this.elements.push({ label, selector });
    return this.render();
  }
  render() {
    this.container.innerHTML = 
    Array.prototype.slice.call(this.elements)
    .reverse()
    .map((el, i) => {
      var html = '';

      html += '<a href="#" data-index="item' + i + '">';
      html += '<i class="fa fa-check-square-o"></i> &lt;';
      html += el.label;
      html += '&gt;</a>';
      return html;
    })
    .join('');

    return this;
  }
  handleLink(e) {
    var el = e.target, selected;
    var id = el.getAttribute('data-index');

    this.selected[id] = selected = !(!!this.selected[id]);
    this.canSteal();

    selected ? el.classList.add('selected') : el.classList.remove('selected');
  }
  canSteal() {
    return this.steal.disabled = !Object.keys(this.selected).reduce((s, id) => {
      if (this.selected[id]) {
        return true;
      }
      return s;
    }, false);
  }
  handleGetCSS(e) {
    this.onLinkSelected(this.elements.filter((el, i) => this.selected['item' + i]));
  }
  clear() {
    this.elements = [];
    this.selected = [];
  }
};
