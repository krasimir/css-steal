'use strict';

import Links from './Links';
import CSSPreview from './CSSPreview';
import { $ } from './DOMhelpers';

var cssPreview = new CSSPreview();
var links = new Links({
  onLinkSelected: cssPreview.render.bind(cssPreview)
});

links
  .addLink($('section'))
  .addLink($('button'))
  .render();
