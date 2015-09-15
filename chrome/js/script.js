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
      console.log(selectors);
      (0, _execute2['default'])(this._CSSSteal, [_src2['default'], '[' + selectors.map(function (s) {
        return '"' + s + '"';
      }).join(',') + ']'], function (css) {
        _this.container.innerHTML = '<pre>' + css + '</pre>';
      });
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _DOMhelpers = require('./DOMhelpers');

var Links = (function () {
  function Links(ops) {
    _classCallCheck(this, Links);

    this.elements = [];
    this.selected = {};
    this.container = (0, _DOMhelpers.$)('.js-items-selected .items-holder');
    this.onLinkSelected = ops.onLinkSelected;
    this.steal = (0, _DOMhelpers.$)('.js-steal');

    this.container.addEventListener('click', this.handleLink.bind(this));
    this.steal.addEventListener('click', this.handleGetCSS.bind(this));
  }

  _createClass(Links, [{
    key: 'addLink',
    value: function addLink(_ref) {
      var label = _ref.label;
      var selector = _ref.selector;

      this.elements.push({ label: label, selector: selector });
      return this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      this.container.innerHTML = Array.prototype.slice.call(this.elements).reverse().map(function (el, i) {
        var html = '';

        html += '<a href="#" data-index="item' + i + '">';
        html += '<i class="fa fa-check-square-o"></i> &lt;';
        html += el.label;
        html += '&gt;</a>';
        return html;
      }).join('');

      return this;
    }
  }, {
    key: 'handleLink',
    value: function handleLink(e) {
      var el = e.target,
          selected;
      var id = el.getAttribute('data-index');

      this.selected[id] = selected = !!!this.selected[id];
      this.canSteal();

      selected ? el.classList.add('selected') : el.classList.remove('selected');
    }
  }, {
    key: 'canSteal',
    value: function canSteal() {
      var _this = this;

      return this.steal.disabled = !Object.keys(this.selected).reduce(function (s, id) {
        if (_this.selected[id]) {
          return true;
        }
        return s;
      }, false);
    }
  }, {
    key: 'handleGetCSS',
    value: function handleGetCSS(e) {
      var _this2 = this;

      this.onLinkSelected(this.elements.filter(function (el, i) {
        return _this2.selected['item' + i];
      }));
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.elements = [];
      this.selected = [];
    }
  }]);

  return Links;
})();

exports['default'] = Links;
;
module.exports = exports['default'];

},{"./DOMhelpers":2}],4:[function(require,module,exports){
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

  chrome.devtools.inspectedWindow.eval(code, callback.bind(this));
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
  onLinkSelected: cssPreview.render.bind(cssPreview)
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
          result = [];
      a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
      for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
          if (a.matches(rules[r].selectorText)) {
            result.push(rules[r]);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9jc3Mtc3RlYWwvY2hyb21lL2pzL3NyYy9DU1NQcmV2aWV3LmpzIiwiL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvY3NzLXN0ZWFsL2Nocm9tZS9qcy9zcmMvRE9NaGVscGVycy5qcyIsIi9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2Nzcy1zdGVhbC9jaHJvbWUvanMvc3JjL0xpbmtzLmpzIiwiL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvY3NzLXN0ZWFsL2Nocm9tZS9qcy9zcmMvUGFnZS5qcyIsIi9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2Nzcy1zdGVhbC9jaHJvbWUvanMvc3JjL2V4ZWN1dGUuanMiLCIvVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9jc3Mtc3RlYWwvY2hyb21lL2pzL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2Nzcy1zdGVhbC9jaHJvbWUvanMvc3JjL3ZlbmRvci9kb21wYXRoLmpzIiwiL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvY3NzLXN0ZWFsL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O21CQUVRLGVBQWU7Ozs7dUJBQ2hCLFdBQVc7Ozs7MEJBQ2IsY0FBYzs7SUFFWCxVQUFVO0FBQ2xCLFdBRFEsVUFBVSxHQUNmOzBCQURLLFVBQVU7O0FBRTNCLFFBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQUUsZ0JBQWdCLENBQUMsQ0FBQztHQUN0Qzs7ZUFIa0IsVUFBVTs7V0FJdkIsZ0JBQUMsR0FBRyxFQUFFOzs7QUFDVixVQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRTtl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QUFRLENBQUM7R0FDN0IsTUFBTTtBQUNMLFFBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0dBQzFCO0NBQ0EsQ0FBQSxDQUFFLElBQUksV0FBTSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IENTU1N0ZWFsIGZyb20gJy4uLy4uLy4uL3NyYy8nO1xuaW1wb3J0IGV4ZWN1dGUgZnJvbSAnLi9leGVjdXRlJztcbmltcG9ydCB7ICQgfSBmcm9tICcuL0RPTWhlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDU1NQcmV2aWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKCcuanMtY3NzLWhvbGRlcicpO1xuICB9XG4gIHJlbmRlcihlbHMpIHtcbiAgICB2YXIgc2VsZWN0b3JzID0gZWxzLm1hcChlbCA9PiBlbC5zZWxlY3Rvcik7XG4gICAgY29uc29sZS5sb2coc2VsZWN0b3JzKTtcbiAgICBleGVjdXRlKFxuICAgICAgdGhpcy5fQ1NTU3RlYWwsXG4gICAgICBbQ1NTU3RlYWwsICdbJyArIHNlbGVjdG9ycy5tYXAocyA9PiAnXCInICsgcyArICdcIicpLmpvaW4oJywnKSArICddJ10sXG4gICAgICBjc3MgPT4ge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHByZT4nICsgY3NzICsgJzwvcHJlPic7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuICBfQ1NTU3RlYWwoQ1NTU3RlYWwsIHNlbGVjdG9ycykge1xuICAgIHZhciBlbGVtZW50cyA9IHNlbGVjdG9ycy5tYXAoc2VsID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKSk7XG5cbiAgICByZXR1cm4gQ1NTU3RlYWwuYXBwbHkobnVsbCwgZWxlbWVudHMpLnRvQ1NTVGV4dCgpXG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgJDogc2VsID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKSxcbiAgJCQ6IHNlbCA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbClcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7ICQgfSBmcm9tICcuL0RPTWhlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rcyB7XG4gIGNvbnN0cnVjdG9yKG9wcykge1xuICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkID0ge307XG4gICAgdGhpcy5jb250YWluZXIgPSAkKCcuanMtaXRlbXMtc2VsZWN0ZWQgLml0ZW1zLWhvbGRlcicpO1xuICAgIHRoaXMub25MaW5rU2VsZWN0ZWQgPSBvcHMub25MaW5rU2VsZWN0ZWQ7XG4gICAgdGhpcy5zdGVhbCA9ICQoJy5qcy1zdGVhbCcpO1xuXG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUxpbmsuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zdGVhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlR2V0Q1NTLmJpbmQodGhpcykpO1xuICB9XG4gIGFkZExpbmsoeyBsYWJlbCwgc2VsZWN0b3IgfSkge1xuICAgIHRoaXMuZWxlbWVudHMucHVzaCh7IGxhYmVsLCBzZWxlY3RvciB9KTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gXG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbGVtZW50cylcbiAgICAucmV2ZXJzZSgpXG4gICAgLm1hcCgoZWwsIGkpID0+IHtcbiAgICAgIHZhciBodG1sID0gJyc7XG5cbiAgICAgIGh0bWwgKz0gJzxhIGhyZWY9XCIjXCIgZGF0YS1pbmRleD1cIml0ZW0nICsgaSArICdcIj4nO1xuICAgICAgaHRtbCArPSAnPGkgY2xhc3M9XCJmYSBmYS1jaGVjay1zcXVhcmUtb1wiPjwvaT4gJmx0Oyc7XG4gICAgICBodG1sICs9IGVsLmxhYmVsO1xuICAgICAgaHRtbCArPSAnJmd0OzwvYT4nO1xuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfSlcbiAgICAuam9pbignJyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBoYW5kbGVMaW5rKGUpIHtcbiAgICB2YXIgZWwgPSBlLnRhcmdldCwgc2VsZWN0ZWQ7XG4gICAgdmFyIGlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG5cbiAgICB0aGlzLnNlbGVjdGVkW2lkXSA9IHNlbGVjdGVkID0gISghIXRoaXMuc2VsZWN0ZWRbaWRdKTtcbiAgICB0aGlzLmNhblN0ZWFsKCk7XG5cbiAgICBzZWxlY3RlZCA/IGVsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJykgOiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICB9XG4gIGNhblN0ZWFsKCkge1xuICAgIHJldHVybiB0aGlzLnN0ZWFsLmRpc2FibGVkID0gIU9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWQpLnJlZHVjZSgocywgaWQpID0+IHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkW2lkXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuICBoYW5kbGVHZXRDU1MoZSkge1xuICAgIHRoaXMub25MaW5rU2VsZWN0ZWQodGhpcy5lbGVtZW50cy5maWx0ZXIoKGVsLCBpKSA9PiB0aGlzLnNlbGVjdGVkWydpdGVtJyArIGldKSk7XG4gIH1cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGRvbXBhdGggZnJvbSAnLi92ZW5kb3IvZG9tcGF0aCc7XG5pbXBvcnQgZXhlY3V0ZSBmcm9tICcuL2V4ZWN1dGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIHtcbiAgY29uc3RydWN0b3IoeyBvbkVsZW1lbnRTZWxlY3RlZD1udWxsIH0pIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gMTtcbiAgICB0aGlzLm9uRWxlbWVudFNlbGVjdGVkID0gb25FbGVtZW50U2VsZWN0ZWQ7XG4gICAgdmFyIGhhbmRsZUVsZW1lbnRTZWxlY3RlZCA9IHRoaXMuaGFuZGxlRWxlbWVudFNlbGVjdGVkLmJpbmQodGhpcyk7XG5cbiAgICBjaHJvbWUuZGV2dG9vbHMucGFuZWxzLmVsZW1lbnRzLm9uU2VsZWN0aW9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihoYW5kbGVFbGVtZW50U2VsZWN0ZWQpO1xuICAgIFxuICB9XG4gIGhhbmRsZUVsZW1lbnRTZWxlY3RlZCgpIHtcbiAgICBleGVjdXRlKFxuICAgICAgdGhpcy5fZ2V0TGFzdGx5SW5zcGVjdGVkRWxlbWVudCxcbiAgICAgIFtkb21wYXRoXSxcbiAgICAgIGVsID0+IHtcbiAgICAgICAgaWYgKGVsKSB0aGlzLm9uRWxlbWVudFNlbGVjdGVkKGVsKVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICAvLyBldmFsIGZ1bmN0aW9uc1xuICBfZ2V0TGFzdGx5SW5zcGVjdGVkRWxlbWVudChkb21wYXRoKSB7XG4gICAgdmFyIGVsID0gJDA7XG4gICAgdmFyIG5vZGVOYW1lID0gZWwubm9kZU5hbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBjbGFzc2VzID0gZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsOiBub2RlTmFtZSArIChjbGFzc2VzID8gJyBjbGFzcz1cIicgKyBjbGFzc2VzICsgJ1wiJyA6ICcnKSxcbiAgICAgIHNlbGVjdG9yOiBkb21wYXRoKCQwKS50b0NTUygpXG4gICAgfVxuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXhlY3V0ZShmbiwgYXJncyA9IFtdLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgdmFyIGNvZGUgPSAnKCcgKyBmbi50b1N0cmluZygpICsgJykuYXBwbHkodGhpcywgWycgKyBhcmdzLnRvU3RyaW5nKCkgKyAnXSk7JztcblxuICBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LmV2YWwoY29kZSwgY2FsbGJhY2suYmluZCh0aGlzKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTGlua3MgZnJvbSAnLi9MaW5rcyc7XG5pbXBvcnQgQ1NTUHJldmlldyBmcm9tICcuL0NTU1ByZXZpZXcnO1xuaW1wb3J0IFBhZ2UgZnJvbSAnLi9QYWdlJztcbmltcG9ydCB7ICQgfSBmcm9tICcuL0RPTWhlbHBlcnMnO1xuXG52YXIgY3NzUHJldmlldyA9IG5ldyBDU1NQcmV2aWV3KCk7XG52YXIgbGlua3MgPSBuZXcgTGlua3Moe1xuICBvbkxpbmtTZWxlY3RlZDogY3NzUHJldmlldy5yZW5kZXIuYmluZChjc3NQcmV2aWV3KVxufSk7XG52YXIgcGFnZSA9IG5ldyBQYWdlKHtcbiAgb25FbGVtZW50U2VsZWN0ZWQ6IGxpbmtzLmFkZExpbmsuYmluZChsaW5rcylcbn0pO1xuIiwiLy8gY3JlZGl0czogaHR0cHM6Ly9naXRodWIuY29tL2poYXJ0aWthaW5lbi9kb21wYXRoXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVsLCBwYXJlbnQpIHtcblxuICB2YXIgZ2V0U2VsZWN0b3IgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYobm9kZS5pZCAhPT0gJycpIHtcbiAgICAgIHJldHVybiAnIycgKyBub2RlLmlkO1xuICAgIH1cblxuICAgIHZhciByb290ID0gJyc7XG4gICAgaWYobm9kZS5wYXJlbnQpIHtcbiAgICAgIHJvb3QgPSBnZXRTZWxlY3Rvcihub2RlLnBhcmVudCkgKyAnID4gJztcbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdCArIG5vZGUubmFtZSArICc6bnRoLWNoaWxkKCcgKyAobm9kZS5pbmRleCArIDEpICsgJyknO1xuICB9O1xuXG4gIHZhciBEb21QYXRoID0gZnVuY3Rpb24obm9kZSkgeyB0aGlzLm5vZGUgPSBub2RlOyB9O1xuICBEb21QYXRoLnByb3RvdHlwZSA9IHtcbiAgICB0b0NTUzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZ2V0U2VsZWN0b3IodGhpcy5ub2RlKTtcbiAgICB9LFxuICBcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYodGhpcy5ub2RlLmlkICE9PSAnJykge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5ub2RlLmlkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50b0NTUygpKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHBhdGhOb2RlID0gZnVuY3Rpb24oZWwsIHJvb3QpIHtcbiAgICB2YXIgbm9kZSA9IHtcbiAgICAgIGlkOiBlbC5pZCxcbiAgICAgIG5hbWU6IGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgICBpbmRleDogY2hpbGRJbmRleChlbCksXG4gICAgICBwYXJlbnQ6IG51bGxcbiAgICB9O1xuXG4gICAgaWYoZWwucGFyZW50RWxlbWVudCAmJiBlbC5wYXJlbnRFbGVtZW50ICE9PSByb290KSB7XG4gICAgICBub2RlLnBhcmVudCA9IHBhdGhOb2RlKGVsLnBhcmVudEVsZW1lbnQsIHJvb3QpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIHZhciBjaGlsZEluZGV4ID0gZnVuY3Rpb24oZWwpIHtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB3aGlsZShlbCA9IGVsLnByZXZpb3VzU2libGluZykge1xuICAgICAgaWYoZWwubm9kZVR5cGUgPT0gMSkge1xuICAgICAgICBpZHgrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaWR4O1xuICB9O1xuXG4gIHBhcmVudCA9IHBhcmVudCB8fCBkb2N1bWVudC5ib2R5O1xuICBpZihlbC5ub2RlTmFtZSkge1xuICAgIHJldHVybiBuZXcgRG9tUGF0aChwYXRoTm9kZShlbCwgcGFyZW50KSk7XG4gIH1cblxuICByZXR1cm4gbmV3IERvbVBhdGgoZWwubm9kZSk7XG59OyIsIihmdW5jdGlvbigpIHtcblxudmFyIENTU1N0ZWFsID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXBpID0ge30sIGh0bWwgPSBudWxsLCBzdHlsZXMgPSBbXSwgaW5kZW50ID0gJyAgJywgZWxlbWVudHMgPSBmYWxzZSwgYXJncyA9IGFyZ3VtZW50cztcblxuICB2YXIgcmVxdWlyZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDU1NTdGVhbCBleHBlY3RzIGF0IGxlYXN0IG9uZSBhcmd1bWVudCAoRE9NIGVsZW1lbnQpJyk7XG4gICAgfVxuICAgIGlmICghZG9jdW1lbnQuc3R5bGVTaGVldHMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ1NTU3RlYWw6IGRvY3VtZW50LnN0eWxlU2hlZXRzIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhpcyBicm93c2VyLicpOyBcbiAgICB9XG4gICAgZWxlbWVudHMgPSB0b0FycmF5KGFyZ3MsIHRydWUpO1xuICB9O1xuICB2YXIgZ2V0SFRNTEFzU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBlbGVtZW50cy5vdXRlckhUTUw7XG4gIH07XG4gIHZhciB0b0FycmF5ID0gZnVuY3Rpb24ob2JqLCBpZ25vcmVGYWxzeSkge1xuICAgIHZhciBhcnIgPSBbXSwgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghaWdub3JlRmFsc3kgfHwgb2JqW2ldKSB7XG4gICAgICAgIGFycltpXSA9IG9ialtpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuICB2YXIgZ2V0UnVsZXMgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBzaGVldHMgPSBkb2N1bWVudC5zdHlsZVNoZWV0cywgcmVzdWx0ID0gW107XG4gICAgYS5tYXRjaGVzID0gYS5tYXRjaGVzIHx8IGEud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGEubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGEubXNNYXRjaGVzU2VsZWN0b3IgfHwgYS5vTWF0Y2hlc1NlbGVjdG9yO1xuICAgIGZvciAodmFyIGkgaW4gc2hlZXRzKSB7XG4gICAgICB2YXIgcnVsZXMgPSBzaGVldHNbaV0ucnVsZXMgfHwgc2hlZXRzW2ldLmNzc1J1bGVzO1xuICAgICAgZm9yICh2YXIgciBpbiBydWxlcykge1xuICAgICAgICBpZiAoYS5tYXRjaGVzKHJ1bGVzW3JdLnNlbGVjdG9yVGV4dCkpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChydWxlc1tyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICB2YXIgcmVhZFN0eWxlcyA9IGZ1bmN0aW9uIChlbHMpIHtcbiAgICByZXR1cm4gZWxzLnJlZHVjZShmdW5jdGlvbiAocywgZWwpIHtcbiAgICAgIHMucHVzaChnZXRSdWxlcyhlbCkpO1xuICAgICAgcyA9IHMuY29uY2F0KHJlYWRTdHlsZXModG9BcnJheShlbC5jaGlsZHJlbikpKTtcbiAgICAgIHJldHVybiBzOyAgXG4gICAgfSwgW10pO1xuICB9O1xuICB2YXIgZmxhdHRlblJ1bGVzID0gZnVuY3Rpb24gKHMpIHtcbiAgICB2YXIgZmlsdGVyQnlTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3RvciwgcmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5zZWxlY3RvciA9PT0gc2VsZWN0b3I7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGdldEl0ZW0gPSBmdW5jdGlvbiAoc2VsZWN0b3IsIHJlc3VsdCkge1xuICAgICAgdmFyIGFyciA9IGZpbHRlckJ5U2VsZWN0b3Ioc2VsZWN0b3IsIHJlc3VsdCk7XG4gICAgICByZXR1cm4gYXJyLmxlbmd0aCA+IDAgPyBhcnJbMF0gOiB7XG4gICAgICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICAgICAgc3R5bGVzOiB7fVxuICAgICAgfTtcbiAgICB9XG4gICAgdmFyIHB1c2hJdGVtID0gZnVuY3Rpb24gKGl0ZW0sIHJlc3VsdCkge1xuICAgICAgdmFyIGFyciA9IGZpbHRlckJ5U2VsZWN0b3IoaXRlbS5zZWxlY3RvciwgcmVzdWx0KTtcbiAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSByZXN1bHQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgdmFyIGFsbCA9IFtdO1xuICAgIHMuZm9yRWFjaChmdW5jdGlvbiAocnVsZXMpIHtcbiAgICAgIHJ1bGVzLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBnZXRJdGVtKHJ1bGUuc2VsZWN0b3JUZXh0LCBhbGwpO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8cnVsZS5zdHlsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHJ1bGUuc3R5bGVbaV07XG4gICAgICAgICAgaXRlbS5zdHlsZXNbcHJvcGVydHldID0gcnVsZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoSXRlbShpdGVtLCBhbGwpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFsbDtcbiAgfTtcblxuICByZXF1aXJlbWVudHMoKTtcblxuICBodG1sID0gZ2V0SFRNTEFzU3RyaW5nKCk7XG4gIHN0eWxlcyA9IGZsYXR0ZW5SdWxlcyhyZWFkU3R5bGVzKGVsZW1lbnRzKSk7XG5cbiAgYXBpLnRvQ1NTVGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc3R5bGVzLnJlZHVjZShmdW5jdGlvbiAodGV4dCwgaXRlbSkge1xuICAgICAgdGV4dCArPSBpdGVtLnNlbGVjdG9yICsgJyB7XFxuJztcbiAgICAgIHRleHQgKz0gT2JqZWN0LmtleXMoaXRlbS5zdHlsZXMpLnJlZHVjZShmdW5jdGlvbiAobGluZXMsIHByb3ApIHtcbiAgICAgICAgbGluZXMucHVzaChpbmRlbnQgKyBwcm9wICsgJzogJyArIGl0ZW0uc3R5bGVzW3Byb3BdICsgJzsnKTtcbiAgICAgICAgcmV0dXJuIGxpbmVzO1xuICAgICAgfSwgW10pLmpvaW4oJ1xcbicpO1xuICAgICAgdGV4dCArPSAnXFxufVxcbic7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9LCAnJyk7XG4gIH07XG4gIGFwaS50b0pTID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cblxuICByZXR1cm4gYXBpO1xufTtcblxudmFyIHJvb3QgPSB0aGlzO1xuaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBDU1NTdGVhbDtcbiAgfVxuICBleHBvcnRzLkNTU1N0ZWFsID0gQ1NTU3RlYWw7XG59IGVsc2Uge1xuICByb290LkNTU1N0ZWFsID0gQ1NTU3RlYWw7XG59XG59KS5jYWxsKHRoaXMpO1xuXG5cbiJdfQ==
