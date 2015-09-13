'use strict';

import { $ } from './DOMhelpers';

export default class Links {
  constructor(ops) {
    this.elements = [];
    this.selected = {};
    this.container = $('.js-items-selected .items-holder');
    this.container.addEventListener('click', this.handleLink.bind(this));
    this.onLinkSelected = ops.onLinkSelected;
    this.steal = $('.js-steal');
  }
  addLink(element) {
    this.elements.push(element);
    return this;
  }
  render() {
    var links = this.elements.map((el, i) => {
      var nodeName = el.nodeName.toString().toLowerCase();
      var classes = el.getAttribute('class');
      return '<a href="#" data-index="item' + i + '">&lt;' + nodeName + (classes ? ' class="' + classes + '"' : '') + '&gt;</a>';
    });

    this.container.innerHTML = links.join('');
    return this;
  }
  handleLink(e) {
    var el = e.target;
    var id = el.getAttribute('data-index');

    this.selected[id] = !(!!this.selected[id]);
    this.canSteal();
  }
  canSteal() {
    console.log(this.selected);
    var status = Object.keys(this.selected).reduce((s, id) => {
      if (this.selected[id]) {
        return true;
      }
      return s;
    }, false);
    console.log(status);
  }
};
