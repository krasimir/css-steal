'use strict';

import dompath from './vendor/dompath';
import execute from './execute';

export default class Page {
  constructor({ onElementSelected=null }) {
    this.selected = 1;
    this.onElementSelected = onElementSelected;
    var handleElementSelected = this.handleElementSelected.bind(this);

    chrome.devtools.panels.elements.onSelectionChanged.addListener(handleElementSelected);
    
  }
  handleElementSelected() {
    execute(
      this._getLastlyInspectedElement,
      [dompath],
      el => {
        if (el) this.onElementSelected(el)
      }
    );
  }

  // eval functions
  _getLastlyInspectedElement(dompath) {
    var el = $0;
    var nodeName = el.nodeName.toString().toLowerCase();
    var classes = el.getAttribute('class');

    return {
      label: nodeName + (classes ? ' class="' + classes + '"' : ''),
      selector: dompath($0).toCSS()
    }
  }
};