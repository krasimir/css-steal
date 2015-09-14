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
  addLink(element) {
    this.elements.push(element);
    return this;
  }
  render() {
    var links = this.elements.map((el, i) => {
      var nodeName = el.nodeName.toString().toLowerCase();
      var classes = el.getAttribute('class');
      var html = '';

      html += '<a href="#" data-index="item' + i + '">';
      html += '<i class="fa fa-check-square-o"></i> &lt;';
      html += nodeName + (classes ? ' class="' + classes + '"' : '');
      html += '&gt;</a>';
      return html;
    });

    this.container.innerHTML = links.join('');
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
};
