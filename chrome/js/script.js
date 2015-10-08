(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _src = require('../../../src/');

var _src2 = _interopRequireDefault(_src);

var _execute = require('./execute');

var _execute2 = _interopRequireDefault(_execute);

var _DOMhelpers = require('./DOMhelpers');

var CSSPreview = (function () {
  function CSSPreview() {
    _classCallCheck(this, CSSPreview);

    this.container = (0, _DOMhelpers.$)('.js-css-holder');
  }

  _createClass(CSSPreview, [{
    key: 'render',
    value: function render(els) {
      var _this = this;

      var selectors = els.map(function (el) {
        return el.selector;
      });

      (0, _execute2['default'])(this._CSSSteal, [_src2['default'], '[' + selectors.map(function (s) {
        return '"' + s + '"';
      }).join(',') + ']'], function (css) {
        _this.container.innerHTML = '<pre>' + css + '</pre>';
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.container.innerHTML = '';
    }
  }, {
    key: '_CSSSteal',
    value: function _CSSSteal(CSSSteal, selectors) {
      var elements = selectors.map(function (sel) {
        return document.querySelector(sel);
      });

      return CSSSteal.apply(null, elements).toCSSText();
    }
  }]);

  return CSSPreview;
})();

exports['default'] = CSSPreview;
module.exports = exports['default'];

},{"../../../src/":8,"./DOMhelpers":2,"./execute":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  $: function $(sel) {
    return document.querySelector(sel);
  },
  $$: function $$(sel) {
    return document.querySelectorAll(sel);
  }
};
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _DOMhelpers = require('./DOMhelpers');

var _execute = require('./execute');

var _execute2 = _interopRequireDefault(_execute);

var Links = (function () {
  function Links(ops) {
    _classCallCheck(this, Links);

    this.ids = 0;
    this.elements = [];
    this.container = (0, _DOMhelpers.$)('.js-items-selected .items-holder');
    this.onLinkSelected = ops.onLinkSelected;
    this.onClear = ops.onClear;
    this.steal = (0, _DOMhelpers.$)('.js-steal');
    this.clear = (0, _DOMhelpers.$)('.js-clear');

    this.container.addEventListener('click', this._handleLink.bind(this));
    this.container.addEventListener('mouseover', this._handleMouseOver.bind(this));
    this.steal.addEventListener('click', this._handleGetCSS.bind(this));
    this.clear.addEventListener('click', this._handleClear.bind(this));
  }

  _createClass(Links, [{
    key: 'addLink',
    value: function addLink(_ref) {
      var label = _ref.label;
      var selector = _ref.selector;

      if (this._isThereSuchElement(selector)) return;
      this.elements.push({
        label: label,
        selector: selector,
        id: this._getId(),
        selected: false
      });
      this.clear.disabled = false;
      return this._render();
    }
  }, {
    key: '_isThereSuchElement',
    value: function _isThereSuchElement(selector) {
      return !!this._getRecordBySelector(selector);
    }
  }, {
    key: '_getId',
    value: function _getId() {
      return 'item' + ++this.ids;
    }
  }, {
    key: '_render',
    value: function _render() {
      var html = Array.prototype.slice.call(this.elements).reverse().map(function (el) {
        var html = '';
        var selected = el.selected ? ' class="selected"' : '';

        html += '<a href="#" data-index="' + el.id + '"' + selected + '>';
        html += '<i class="fa fa-check-square-o"></i> &lt;';
        html += el.label;
        html += '&gt;</a>';
        return html;
      }).join('');

      this.container.innerHTML = html === '' ? '&nbsp;' : html;

      return this;
    }
  }, {
    key: '_getRecordByElement',
    value: function _getRecordByElement(el) {
      var id = el.target ? el.target.getAttribute('data-index') : false;
      var filtered = this.elements.filter(function (record) {
        return record.id === id;
      });

      return filtered.length > 0 ? filtered[0] : false;
    }
  }, {
    key: '_getRecordBySelector',
    value: function _getRecordBySelector(selector) {
      var filtered = this.elements.filter(function (record) {
        return record.selector === selector;
      });

      return filtered.length > 0 ? filtered[0] : false;
    }
  }, {
    key: '_handleLink',
    value: function _handleLink(el) {
      var record = this._getRecordByElement(el);

      if (record) {
        record.selected = !record.selected;
        record.selected ? el.target.classList.add('selected') : el.target.classList.remove('selected');
        this.steal.disabled = !(this._selected().length > 0);
      }
    }
  }, {
    key: '_selected',
    value: function _selected() {
      return this.elements.filter(function (el) {
        return el.selected;
      });
    }
  }, {
    key: '_handleGetCSS',
    value: function _handleGetCSS() {
      this.onLinkSelected(this._selected());
    }
  }, {
    key: '_handleMouseOver',
    value: function _handleMouseOver(el) {
      var record = this._getRecordByElement(el);

      if (record) {
        (0, _execute2['default'])(this._inspect, ['"' + record.selector + '"']);
      }
    }
  }, {
    key: '_handleClear',
    value: function _handleClear() {
      this.elements = [];
      this.clear.disabled = true;
      this.steal.disabled = true;
      this._render();
      this.onClear();
    }
  }, {
    key: '_inspect',
    value: function _inspect(selector) {
      inspect(document.querySelector(selector));
    }
  }]);

  return Links;
})();

exports['default'] = Links;
;
module.exports = exports['default'];

},{"./DOMhelpers":2,"./execute":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _vendorDompath = require('./vendor/dompath');

var _vendorDompath2 = _interopRequireDefault(_vendorDompath);

var _execute = require('./execute');

var _execute2 = _interopRequireDefault(_execute);

var Page = (function () {
  function Page(_ref) {
    var _ref$onElementSelected = _ref.onElementSelected;
    var onElementSelected = _ref$onElementSelected === undefined ? null : _ref$onElementSelected;

    _classCallCheck(this, Page);

    this.selected = 1;
    this.onElementSelected = onElementSelected;
    var handleElementSelected = this.handleElementSelected.bind(this);

    chrome.devtools.panels.elements.onSelectionChanged.addListener(handleElementSelected);
  }

  _createClass(Page, [{
    key: 'handleElementSelected',
    value: function handleElementSelected() {
      var _this = this;

      (0, _execute2['default'])(this._getLastlyInspectedElement, [_vendorDompath2['default']], function (el) {
        if (el) _this.onElementSelected(el);
      });
    }

    // eval functions
  }, {
    key: '_getLastlyInspectedElement',
    value: function _getLastlyInspectedElement(dompath) {
      var el = $0;
      var nodeName = el.nodeName.toString().toLowerCase();
      var classes = el.getAttribute('class');

      return {
        label: nodeName + (classes ? ' class="' + classes + '"' : ''),
        selector: dompath($0).toCSS()
      };
    }
  }]);

  return Page;
})();

exports['default'] = Page;
;
module.exports = exports['default'];

},{"./execute":5,"./vendor/dompath":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = execute;

function execute(fn) {
  var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var callback = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var code = '(' + fn.toString() + ').apply(this, [' + args.toString() + ']);';

  chrome.devtools.inspectedWindow.eval(code, callback ? callback.bind(this) : function () {});
}

;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Links = require('./Links');

var _Links2 = _interopRequireDefault(_Links);

var _CSSPreview = require('./CSSPreview');

var _CSSPreview2 = _interopRequireDefault(_CSSPreview);

var _Page = require('./Page');

var _Page2 = _interopRequireDefault(_Page);

var _DOMhelpers = require('./DOMhelpers');

var cssPreview = new _CSSPreview2['default']();
var links = new _Links2['default']({
  onLinkSelected: cssPreview.render.bind(cssPreview),
  onClear: cssPreview.clear.bind(cssPreview)
});
var page = new _Page2['default']({
  onElementSelected: links.addLink.bind(links)
});

},{"./CSSPreview":1,"./DOMhelpers":2,"./Links":3,"./Page":4}],7:[function(require,module,exports){
// credits: https://github.com/jhartikainen/dompath

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (el, parent) {

  var getSelector = function getSelector(node) {
    if (node.id !== '') {
      return '#' + node.id;
    }

    var root = '';
    if (node.parent) {
      root = getSelector(node.parent) + ' > ';
    }

    return root + node.name + ':nth-child(' + (node.index + 1) + ')';
  };

  var DomPath = function DomPath(node) {
    this.node = node;
  };
  DomPath.prototype = {
    toCSS: function toCSS() {
      return getSelector(this.node);
    },

    select: function select() {
      if (this.node.id !== '') {
        return document.getElementById(this.node.id);
      }

      return document.querySelector(this.toCSS());
    }
  };

  var pathNode = function pathNode(el, root) {
    var node = {
      id: el.id,
      name: el.nodeName.toLowerCase(),
      index: childIndex(el),
      parent: null
    };

    if (el.parentElement && el.parentElement !== root) {
      node.parent = pathNode(el.parentElement, root);
    }

    return node;
  };

  var childIndex = function childIndex(el) {
    var idx = 0;
    while (el = el.previousSibling) {
      if (el.nodeType == 1) {
        idx++;
      }
    }

    return idx;
  };

  parent = parent || document.body;
  if (el.nodeName) {
    return new DomPath(pathNode(el, parent));
  }

  return new DomPath(el.node);
};

;
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

(function () {

  var CSSSteal = function CSSSteal() {
    var api = {},
        html = null,
        styles = [],
        indent = '  ',
        elements = false,
        args = arguments;

    var requirements = function requirements() {
      if (args.length === 0) {
        throw new Error('CSSSteal expects at least one argument (DOM element)');
      }
      if (!document.styleSheets) {
        throw new Error('CSSSteal: document.styleSheets is not available in this browser.');
      }
      elements = toArray(args, true);
    };
    var getHTMLAsString = function getHTMLAsString() {
      return elements.outerHTML;
    };
    var toArray = function toArray(obj, ignoreFalsy) {
      var arr = [],
          i;

      for (i = 0; i < obj.length; i++) {
        if (!ignoreFalsy || obj[i]) {
          arr[i] = obj[i];
        }
      }
      return arr;
    };
    var getRules = function getRules(a) {
      var sheets = document.styleSheets,
          result = [],
          selectorText;

      a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
      for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
          selectorText = rules[r].selectorText ? rules[r].selectorText.split(' ').map(function (piece) {
            return piece ? piece.split(/(:|::)/)[0] : false;
          }).join(' ') : false;
          try {
            if (a.matches(selectorText)) {
              result.push(rules[r]);
            }
          } catch (e) {
            // can not run matches on this selector
          }
        }
      }
      return result;
    };
    var readStyles = function readStyles(els) {
      return els.reduce(function (s, el) {
        s.push(getRules(el));
        s = s.concat(readStyles(toArray(el.children)));
        return s;
      }, []);
    };
    var flattenRules = function flattenRules(s) {
      var filterBySelector = function filterBySelector(selector, result) {
        return result.filter(function (item) {
          return item.selector === selector;
        });
      };
      var getItem = function getItem(selector, result) {
        var arr = filterBySelector(selector, result);
        return arr.length > 0 ? arr[0] : {
          selector: selector,
          styles: {}
        };
      };
      var pushItem = function pushItem(item, result) {
        var arr = filterBySelector(item.selector, result);
        if (arr.length === 0) result.push(item);
      };
      var all = [];
      s.forEach(function (rules) {
        rules.forEach(function (rule) {
          var item = getItem(rule.selectorText, all);
          for (var i = 0; i < rule.style.length; i++) {
            var property = rule.style[i];
            item.styles[property] = rule.style.getPropertyValue(property);
          }
          pushItem(item, all);
        });
      });
      return all;
    };

    requirements();

    html = getHTMLAsString();
    styles = flattenRules(readStyles(elements));

    api.toCSSText = function () {
      return styles.reduce(function (text, item) {
        text += item.selector + ' {\n';
        text += Object.keys(item.styles).reduce(function (lines, prop) {
          lines.push(indent + prop + ': ' + item.styles[prop] + ';');
          return lines;
        }, []).join('\n');
        text += '\n}\n';
        return text;
      }, '');
    };
    api.toJS = function () {
      return styles;
    };

    return api;
  };

  var root = this;
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = CSSSteal;
    }
    exports.CSSSteal = CSSSteal;
  } else {
    root.CSSSteal = CSSSteal;
  }
}).call(undefined);

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9jc3Mtc3RlYWwvY2hyb21lL2pzL3NyYy9DU1NQcmV2aWV3LmpzIiwiL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvY3NzLXN0ZWFsL2Nocm9tZS9qcy9zcmMvRE9NaGVscGVycy5qcyIsIi9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2Nzcy1zdGVhbC9jaHJvbWUvanMvc3JjL0xpbmtzLmpzIiwiL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvY3NzLXN0ZWFsL2Nocm9tZS9qcy9zcmMvUGFnZS5qcyIsIi9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2Nzcy1zdGVhbC9jaHJvbWUvanMvc3JjL2V4ZWN1dGUuanMiLCIvVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9jc3Mtc3RlYWwvY2hyb21lL2pzL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2Nzcy1zdGVhbC9jaHJvbWUvanMvc3JjL3ZlbmRvci9kb21wYXRoLmpzIiwiL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvY3NzLXN0ZWFsL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O21CQUVRLGVBQWU7Ozs7dUJBQ2hCLFdBQVc7Ozs7MEJBQ2IsY0FBYzs7SUFFWCxVQUFVO0FBQ2xCLFdBRFEsVUFBVSxHQUNmOzBCQURLLFVBQVU7O0FBRTNCLFFBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQUUsZ0JBQWdCLENBQUMsQ0FBQztHQUN0Qzs7ZUFIa0IsVUFBVTs7V0FJdkIsZ0JBQUMsR0FBRyxFQUFFOzs7QUFDVixVQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRTtl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QUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztLQUNyQztBQUNELFdBQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0dBQzdCLE1BQU07QUFDTCxRQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztHQUMxQjtDQUNBLENBQUEsQ0FBRSxJQUFJLFdBQU0sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDU1NTdGVhbCBmcm9tICcuLi8uLi8uLi9zcmMvJztcbmltcG9ydCBleGVjdXRlIGZyb20gJy4vZXhlY3V0ZSc7XG5pbXBvcnQgeyAkIH0gZnJvbSAnLi9ET01oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ1NTUHJldmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJCgnLmpzLWNzcy1ob2xkZXInKTtcbiAgfVxuICByZW5kZXIoZWxzKSB7XG4gICAgdmFyIHNlbGVjdG9ycyA9IGVscy5tYXAoZWwgPT4gZWwuc2VsZWN0b3IpO1xuXG4gICAgZXhlY3V0ZShcbiAgICAgIHRoaXMuX0NTU1N0ZWFsLFxuICAgICAgW0NTU1N0ZWFsLCAnWycgKyBzZWxlY3RvcnMubWFwKHMgPT4gJ1wiJyArIHMgKyAnXCInKS5qb2luKCcsJykgKyAnXSddLFxuICAgICAgY3NzID0+IHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gJzxwcmU+JyArIGNzcyArICc8L3ByZT4nO1xuICAgICAgfVxuICAgICk7XG4gIH1cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIH1cbiAgX0NTU1N0ZWFsKENTU1N0ZWFsLCBzZWxlY3RvcnMpIHtcbiAgICB2YXIgZWxlbWVudHMgPSBzZWxlY3RvcnMubWFwKHNlbCA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCkpO1xuICAgIFxuICAgIHJldHVybiBDU1NTdGVhbC5hcHBseShudWxsLCBlbGVtZW50cykudG9DU1NUZXh0KCk7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgJDogc2VsID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKSxcbiAgJCQ6IHNlbCA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbClcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7ICQgfSBmcm9tICcuL0RPTWhlbHBlcnMnO1xuaW1wb3J0IGV4ZWN1dGUgZnJvbSAnLi9leGVjdXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua3Mge1xuICBjb25zdHJ1Y3RvcihvcHMpIHtcbiAgICB0aGlzLmlkcyA9IDA7XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgIHRoaXMuY29udGFpbmVyID0gJCgnLmpzLWl0ZW1zLXNlbGVjdGVkIC5pdGVtcy1ob2xkZXInKTtcbiAgICB0aGlzLm9uTGlua1NlbGVjdGVkID0gb3BzLm9uTGlua1NlbGVjdGVkO1xuICAgIHRoaXMub25DbGVhciA9IG9wcy5vbkNsZWFyO1xuICAgIHRoaXMuc3RlYWwgPSAkKCcuanMtc3RlYWwnKTtcbiAgICB0aGlzLmNsZWFyID0gJCgnLmpzLWNsZWFyJyk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUxpbmsuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5faGFuZGxlTW91c2VPdmVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc3RlYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVHZXRDU1MuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5jbGVhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZUNsZWFyLmJpbmQodGhpcykpO1xuICB9XG4gIGFkZExpbmsoeyBsYWJlbCwgc2VsZWN0b3IgfSkge1xuICAgIGlmICh0aGlzLl9pc1RoZXJlU3VjaEVsZW1lbnQoc2VsZWN0b3IpKSByZXR1cm47XG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKHtcbiAgICAgIGxhYmVsLFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBpZDogdGhpcy5fZ2V0SWQoKSxcbiAgICAgIHNlbGVjdGVkOiBmYWxzZVxuICAgIH0pO1xuICAgIHRoaXMuY2xlYXIuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyKCk7XG4gIH1cbiAgX2lzVGhlcmVTdWNoRWxlbWVudChzZWxlY3Rvcikge1xuICAgIHJldHVybiAhIXRoaXMuX2dldFJlY29yZEJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9XG4gIF9nZXRJZCgpIHtcbiAgICByZXR1cm4gJ2l0ZW0nICsgKCsrdGhpcy5pZHMpO1xuICB9XG4gIF9yZW5kZXIoKSB7XG4gICAgdmFyIGh0bWwgPSBcbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsZW1lbnRzKVxuICAgIC5yZXZlcnNlKClcbiAgICAubWFwKChlbCkgPT4ge1xuICAgICAgdmFyIGh0bWwgPSAnJztcbiAgICAgIHZhciBzZWxlY3RlZCA9IGVsLnNlbGVjdGVkID8gJyBjbGFzcz1cInNlbGVjdGVkXCInIDogJyc7XG5cbiAgICAgIGh0bWwgKz0gJzxhIGhyZWY9XCIjXCIgZGF0YS1pbmRleD1cIicgKyBlbC5pZCArICdcIicgKyBzZWxlY3RlZCArICc+JztcbiAgICAgIGh0bWwgKz0gJzxpIGNsYXNzPVwiZmEgZmEtY2hlY2stc3F1YXJlLW9cIj48L2k+ICZsdDsnO1xuICAgICAgaHRtbCArPSBlbC5sYWJlbDtcbiAgICAgIGh0bWwgKz0gJyZndDs8L2E+JztcbiAgICAgIHJldHVybiBodG1sO1xuICAgIH0pXG4gICAgLmpvaW4oJycpO1xuXG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gaHRtbCA9PT0gJycgPyAnJm5ic3A7JyA6IGh0bWw7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBfZ2V0UmVjb3JkQnlFbGVtZW50KGVsKSB7XG4gICAgdmFyIGlkID0gZWwudGFyZ2V0ID8gZWwudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpIDogZmFsc2U7XG4gICAgdmFyIGZpbHRlcmVkID0gdGhpcy5lbGVtZW50cy5maWx0ZXIocmVjb3JkID0+IHJlY29yZC5pZCA9PT0gaWQpO1xuXG4gICAgcmV0dXJuIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBmaWx0ZXJlZFswXSA6IGZhbHNlO1xuICB9XG4gIF9nZXRSZWNvcmRCeVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgdmFyIGZpbHRlcmVkID0gdGhpcy5lbGVtZW50cy5maWx0ZXIocmVjb3JkID0+IHJlY29yZC5zZWxlY3RvciA9PT0gc2VsZWN0b3IpO1xuXG4gICAgcmV0dXJuIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBmaWx0ZXJlZFswXSA6IGZhbHNlO1xuICB9XG4gIF9oYW5kbGVMaW5rKGVsKSB7XG4gICAgdmFyIHJlY29yZCA9IHRoaXMuX2dldFJlY29yZEJ5RWxlbWVudChlbCk7XG5cbiAgICBpZiAocmVjb3JkKSB7XG4gICAgICByZWNvcmQuc2VsZWN0ZWQgPSAhcmVjb3JkLnNlbGVjdGVkO1xuICAgICAgcmVjb3JkLnNlbGVjdGVkID8gZWwudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJykgOiBlbC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgIHRoaXMuc3RlYWwuZGlzYWJsZWQgPSAhKHRoaXMuX3NlbGVjdGVkKCkubGVuZ3RoID4gMCk7XG4gICAgfVxuICB9XG4gIF9zZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5maWx0ZXIoZWwgPT4gZWwuc2VsZWN0ZWQpO1xuICB9XG4gIF9oYW5kbGVHZXRDU1MoKSB7XG4gICAgdGhpcy5vbkxpbmtTZWxlY3RlZCh0aGlzLl9zZWxlY3RlZCgpKTtcbiAgfVxuICBfaGFuZGxlTW91c2VPdmVyKGVsKSB7XG4gICAgdmFyIHJlY29yZCA9IHRoaXMuX2dldFJlY29yZEJ5RWxlbWVudChlbCk7XG5cbiAgICBpZiAocmVjb3JkKSB7XG4gICAgICBleGVjdXRlKHRoaXMuX2luc3BlY3QsIFsnXCInICsgcmVjb3JkLnNlbGVjdG9yICsgJ1wiJ10pO1xuICAgIH1cbiAgfVxuICBfaGFuZGxlQ2xlYXIoKSB7XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgIHRoaXMuY2xlYXIuZGlzYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuc3RlYWwuZGlzYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgdGhpcy5vbkNsZWFyKCk7XG4gIH1cblxuICBfaW5zcGVjdChzZWxlY3Rvcikge1xuICAgIGluc3BlY3QoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZG9tcGF0aCBmcm9tICcuL3ZlbmRvci9kb21wYXRoJztcbmltcG9ydCBleGVjdXRlIGZyb20gJy4vZXhlY3V0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2Uge1xuICBjb25zdHJ1Y3Rvcih7IG9uRWxlbWVudFNlbGVjdGVkPW51bGwgfSkge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSAxO1xuICAgIHRoaXMub25FbGVtZW50U2VsZWN0ZWQgPSBvbkVsZW1lbnRTZWxlY3RlZDtcbiAgICB2YXIgaGFuZGxlRWxlbWVudFNlbGVjdGVkID0gdGhpcy5oYW5kbGVFbGVtZW50U2VsZWN0ZWQuYmluZCh0aGlzKTtcblxuICAgIGNocm9tZS5kZXZ0b29scy5wYW5lbHMuZWxlbWVudHMub25TZWxlY3Rpb25DaGFuZ2VkLmFkZExpc3RlbmVyKGhhbmRsZUVsZW1lbnRTZWxlY3RlZCk7XG4gICAgXG4gIH1cbiAgaGFuZGxlRWxlbWVudFNlbGVjdGVkKCkge1xuICAgIGV4ZWN1dGUoXG4gICAgICB0aGlzLl9nZXRMYXN0bHlJbnNwZWN0ZWRFbGVtZW50LFxuICAgICAgW2RvbXBhdGhdLFxuICAgICAgZWwgPT4ge1xuICAgICAgICBpZiAoZWwpIHRoaXMub25FbGVtZW50U2VsZWN0ZWQoZWwpXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8vIGV2YWwgZnVuY3Rpb25zXG4gIF9nZXRMYXN0bHlJbnNwZWN0ZWRFbGVtZW50KGRvbXBhdGgpIHtcbiAgICB2YXIgZWwgPSAkMDtcbiAgICB2YXIgbm9kZU5hbWUgPSBlbC5ub2RlTmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGNsYXNzZXMgPSBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbGFiZWw6IG5vZGVOYW1lICsgKGNsYXNzZXMgPyAnIGNsYXNzPVwiJyArIGNsYXNzZXMgKyAnXCInIDogJycpLFxuICAgICAgc2VsZWN0b3I6IGRvbXBhdGgoJDApLnRvQ1NTKClcbiAgICB9XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleGVjdXRlKGZuLCBhcmdzID0gW10sIGNhbGxiYWNrID0gbnVsbCkge1xuICB2YXIgY29kZSA9ICcoJyArIGZuLnRvU3RyaW5nKCkgKyAnKS5hcHBseSh0aGlzLCBbJyArIGFyZ3MudG9TdHJpbmcoKSArICddKTsnO1xuICBcbiAgY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy5ldmFsKGNvZGUsIGNhbGxiYWNrID8gY2FsbGJhY2suYmluZCh0aGlzKSA6ICgpID0+IHt9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBMaW5rcyBmcm9tICcuL0xpbmtzJztcbmltcG9ydCBDU1NQcmV2aWV3IGZyb20gJy4vQ1NTUHJldmlldyc7XG5pbXBvcnQgUGFnZSBmcm9tICcuL1BhZ2UnO1xuaW1wb3J0IHsgJCB9IGZyb20gJy4vRE9NaGVscGVycyc7XG5cbnZhciBjc3NQcmV2aWV3ID0gbmV3IENTU1ByZXZpZXcoKTtcbnZhciBsaW5rcyA9IG5ldyBMaW5rcyh7XG4gIG9uTGlua1NlbGVjdGVkOiBjc3NQcmV2aWV3LnJlbmRlci5iaW5kKGNzc1ByZXZpZXcpLFxuICBvbkNsZWFyOiBjc3NQcmV2aWV3LmNsZWFyLmJpbmQoY3NzUHJldmlldylcbn0pO1xudmFyIHBhZ2UgPSBuZXcgUGFnZSh7XG4gIG9uRWxlbWVudFNlbGVjdGVkOiBsaW5rcy5hZGRMaW5rLmJpbmQobGlua3MpXG59KTsiLCIvLyBjcmVkaXRzOiBodHRwczovL2dpdGh1Yi5jb20vamhhcnRpa2FpbmVuL2RvbXBhdGhcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZWwsIHBhcmVudCkge1xuXG4gIHZhciBnZXRTZWxlY3RvciA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZihub2RlLmlkICE9PSAnJykge1xuICAgICAgcmV0dXJuICcjJyArIG5vZGUuaWQ7XG4gICAgfVxuXG4gICAgdmFyIHJvb3QgPSAnJztcbiAgICBpZihub2RlLnBhcmVudCkge1xuICAgICAgcm9vdCA9IGdldFNlbGVjdG9yKG5vZGUucGFyZW50KSArICcgPiAnO1xuICAgIH1cblxuICAgIHJldHVybiByb290ICsgbm9kZS5uYW1lICsgJzpudGgtY2hpbGQoJyArIChub2RlLmluZGV4ICsgMSkgKyAnKSc7XG4gIH07XG5cbiAgdmFyIERvbVBhdGggPSBmdW5jdGlvbihub2RlKSB7IHRoaXMubm9kZSA9IG5vZGU7IH07XG4gIERvbVBhdGgucHJvdG90eXBlID0ge1xuICAgIHRvQ1NTOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBnZXRTZWxlY3Rvcih0aGlzLm5vZGUpO1xuICAgIH0sXG4gIFxuICAgIHNlbGVjdDogZnVuY3Rpb24oKSB7XG4gICAgICBpZih0aGlzLm5vZGUuaWQgIT09ICcnKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLm5vZGUuaWQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRvQ1NTKCkpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgcGF0aE5vZGUgPSBmdW5jdGlvbihlbCwgcm9vdCkge1xuICAgIHZhciBub2RlID0ge1xuICAgICAgaWQ6IGVsLmlkLFxuICAgICAgbmFtZTogZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxcbiAgICAgIGluZGV4OiBjaGlsZEluZGV4KGVsKSxcbiAgICAgIHBhcmVudDogbnVsbFxuICAgIH07XG5cbiAgICBpZihlbC5wYXJlbnRFbGVtZW50ICYmIGVsLnBhcmVudEVsZW1lbnQgIT09IHJvb3QpIHtcbiAgICAgIG5vZGUucGFyZW50ID0gcGF0aE5vZGUoZWwucGFyZW50RWxlbWVudCwgcm9vdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgdmFyIGNoaWxkSW5kZXggPSBmdW5jdGlvbihlbCkge1xuICAgIHZhciBpZHggPSAwO1xuICAgIHdoaWxlKGVsID0gZWwucHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICBpZihlbC5ub2RlVHlwZSA9PSAxKSB7XG4gICAgICAgIGlkeCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpZHg7XG4gIH07XG5cbiAgcGFyZW50ID0gcGFyZW50IHx8IGRvY3VtZW50LmJvZHk7XG4gIGlmKGVsLm5vZGVOYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBEb21QYXRoKHBhdGhOb2RlKGVsLCBwYXJlbnQpKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgRG9tUGF0aChlbC5ub2RlKTtcbn07IiwiKGZ1bmN0aW9uKCkge1xuXG52YXIgQ1NTU3RlYWwgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcGkgPSB7fSwgaHRtbCA9IG51bGwsIHN0eWxlcyA9IFtdLCBpbmRlbnQgPSAnICAnLCBlbGVtZW50cyA9IGZhbHNlLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gIHZhciByZXF1aXJlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NTU1N0ZWFsIGV4cGVjdHMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50IChET00gZWxlbWVudCknKTtcbiAgICB9XG4gICAgaWYgKCFkb2N1bWVudC5zdHlsZVNoZWV0cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDU1NTdGVhbDogZG9jdW1lbnQuc3R5bGVTaGVldHMgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGlzIGJyb3dzZXIuJyk7IFxuICAgIH1cbiAgICBlbGVtZW50cyA9IHRvQXJyYXkoYXJncywgdHJ1ZSk7XG4gIH07XG4gIHZhciBnZXRIVE1MQXNTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRzLm91dGVySFRNTDtcbiAgfTtcbiAgdmFyIHRvQXJyYXkgPSBmdW5jdGlvbihvYmosIGlnbm9yZUZhbHN5KSB7XG4gICAgdmFyIGFyciA9IFtdLCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFpZ25vcmVGYWxzeSB8fCBvYmpbaV0pIHtcbiAgICAgICAgYXJyW2ldID0gb2JqW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG4gIHZhciBnZXRSdWxlcyA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHNoZWV0cyA9IGRvY3VtZW50LnN0eWxlU2hlZXRzLCByZXN1bHQgPSBbXSwgc2VsZWN0b3JUZXh0O1xuXG4gICAgYS5tYXRjaGVzID0gYS5tYXRjaGVzIHx8IGEud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGEubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGEubXNNYXRjaGVzU2VsZWN0b3IgfHwgYS5vTWF0Y2hlc1NlbGVjdG9yO1xuICAgIGZvciAodmFyIGkgaW4gc2hlZXRzKSB7XG4gICAgICB2YXIgcnVsZXMgPSBzaGVldHNbaV0ucnVsZXMgfHwgc2hlZXRzW2ldLmNzc1J1bGVzO1xuICAgICAgZm9yICh2YXIgciBpbiBydWxlcykge1xuICAgICAgICBzZWxlY3RvclRleHQgPSBydWxlc1tyXS5zZWxlY3RvclRleHQgPyBydWxlc1tyXS5zZWxlY3RvclRleHQuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24ocGllY2UpIHtcbiAgICAgICAgICByZXR1cm4gcGllY2UgPyBwaWVjZS5zcGxpdCgvKDp8OjopLylbMF0gOiBmYWxzZTtcbiAgICAgICAgfSkuam9pbignICcpIDogZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKGEubWF0Y2hlcyhzZWxlY3RvclRleHQpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChydWxlc1tyXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAvLyBjYW4gbm90IHJ1biBtYXRjaGVzIG9uIHRoaXMgc2VsZWN0b3JcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHZhciByZWFkU3R5bGVzID0gZnVuY3Rpb24gKGVscykge1xuICAgIHJldHVybiBlbHMucmVkdWNlKGZ1bmN0aW9uIChzLCBlbCkge1xuICAgICAgcy5wdXNoKGdldFJ1bGVzKGVsKSk7XG4gICAgICBzID0gcy5jb25jYXQocmVhZFN0eWxlcyh0b0FycmF5KGVsLmNoaWxkcmVuKSkpO1xuICAgICAgcmV0dXJuIHM7ICBcbiAgICB9LCBbXSk7XG4gIH07XG4gIHZhciBmbGF0dGVuUnVsZXMgPSBmdW5jdGlvbiAocykge1xuICAgIHZhciBmaWx0ZXJCeVNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yLCByZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnNlbGVjdG9yID09PSBzZWxlY3RvcjtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgZ2V0SXRlbSA9IGZ1bmN0aW9uIChzZWxlY3RvciwgcmVzdWx0KSB7XG4gICAgICB2YXIgYXJyID0gZmlsdGVyQnlTZWxlY3RvcihzZWxlY3RvciwgcmVzdWx0KTtcbiAgICAgIHJldHVybiBhcnIubGVuZ3RoID4gMCA/IGFyclswXSA6IHtcbiAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgICBzdHlsZXM6IHt9XG4gICAgICB9O1xuICAgIH1cbiAgICB2YXIgcHVzaEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSwgcmVzdWx0KSB7XG4gICAgICB2YXIgYXJyID0gZmlsdGVyQnlTZWxlY3RvcihpdGVtLnNlbGVjdG9yLCByZXN1bHQpO1xuICAgICAgaWYgKGFyci5sZW5ndGggPT09IDApIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICB2YXIgYWxsID0gW107XG4gICAgcy5mb3JFYWNoKGZ1bmN0aW9uIChydWxlcykge1xuICAgICAgcnVsZXMuZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICB2YXIgaXRlbSA9IGdldEl0ZW0ocnVsZS5zZWxlY3RvclRleHQsIGFsbCk7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxydWxlLnN0eWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHByb3BlcnR5ID0gcnVsZS5zdHlsZVtpXTtcbiAgICAgICAgICBpdGVtLnN0eWxlc1twcm9wZXJ0eV0gPSBydWxlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgICAgIHB1c2hJdGVtKGl0ZW0sIGFsbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWxsO1xuICB9O1xuXG4gIHJlcXVpcmVtZW50cygpO1xuXG4gIGh0bWwgPSBnZXRIVE1MQXNTdHJpbmcoKTtcbiAgc3R5bGVzID0gZmxhdHRlblJ1bGVzKHJlYWRTdHlsZXMoZWxlbWVudHMpKTtcblxuICBhcGkudG9DU1NUZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzdHlsZXMucmVkdWNlKGZ1bmN0aW9uICh0ZXh0LCBpdGVtKSB7XG4gICAgICB0ZXh0ICs9IGl0ZW0uc2VsZWN0b3IgKyAnIHtcXG4nO1xuICAgICAgdGV4dCArPSBPYmplY3Qua2V5cyhpdGVtLnN0eWxlcykucmVkdWNlKGZ1bmN0aW9uIChsaW5lcywgcHJvcCkge1xuICAgICAgICBsaW5lcy5wdXNoKGluZGVudCArIHByb3AgKyAnOiAnICsgaXRlbS5zdHlsZXNbcHJvcF0gKyAnOycpO1xuICAgICAgICByZXR1cm4gbGluZXM7XG4gICAgICB9LCBbXSkuam9pbignXFxuJyk7XG4gICAgICB0ZXh0ICs9ICdcXG59XFxuJztcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH0sICcnKTtcbiAgfTtcbiAgYXBpLnRvSlMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxuXG4gIHJldHVybiBhcGk7XG59O1xuXG52YXIgcm9vdCA9IHRoaXM7XG5pZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IENTU1N0ZWFsO1xuICB9XG4gIGV4cG9ydHMuQ1NTU3RlYWwgPSBDU1NTdGVhbDtcbn0gZWxzZSB7XG4gIHJvb3QuQ1NTU3RlYWwgPSBDU1NTdGVhbDtcbn1cbn0pLmNhbGwodGhpcyk7XG5cblxuIl19
