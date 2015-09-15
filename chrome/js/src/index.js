'use strict';

import Links from './Links';
import CSSPreview from './CSSPreview';
import Page from './Page';
import { $ } from './DOMhelpers';

var cssPreview = new CSSPreview();
var links = new Links({
  onLinkSelected: cssPreview.render.bind(cssPreview),
  onClear: cssPreview.clear.bind(cssPreview)
});
var page = new Page({
  onElementSelected: links.addLink.bind(links)
});
