'use strict';

import Links from './Links';
import CSSPreview from './CSSPreview';
import { $ } from './DOMhelpers';

var cssPreview = new CSSPreview();
var links = new Links({
  onLinkSelected: el => {
    console.log(el);
    cssPreview.render(el);
  }
});

links
  .addLink($('section'))
  .addLink($('button'))
  .render();
