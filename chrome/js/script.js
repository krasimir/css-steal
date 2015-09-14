(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _src = require('../../../src/');

var _src2 = _interopRequireDefault(_src);

var _DOMhelpers = require('./DOMhelpers');

var CSSPreview = (function () {
  function CSSPreview() {
    _classCallCheck(this, CSSPreview);

    this.container = (0, _DOMhelpers.$)('.js-item-css');
  }

  _createClass(CSSPreview, [{
    key: 'render',
    value: function render(els) {
      if (!Array.isArray(els)) els = [els];
      var css = _src2['default'].apply(undefined, _toConsumableArray(els)).toCSSText();

      this.container.innerHTML = '<pre>' + css + '</pre>';
    }
  }]);

  return CSSPreview;
})();

exports['default'] = CSSPreview;
module.exports = exports['default'];

},{"../../../src/":5,"./DOMhelpers":2}],2:[function(require,module,exports){
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
    value: function addLink(element) {
      this.elements.push(element);
      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      var links = this.elements.map(function (el, i) {
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
  }]);

  return Links;
})();

exports['default'] = Links;
;
module.exports = exports['default'];

},{"./DOMhelpers":2}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Links = require('./Links');

var _Links2 = _interopRequireDefault(_Links);

var _CSSPreview = require('./CSSPreview');

var _CSSPreview2 = _interopRequireDefault(_CSSPreview);

var _DOMhelpers = require('./DOMhelpers');

var cssPreview = new _CSSPreview2['default']();
var links = new _Links2['default']({
  onLinkSelected: cssPreview.render.bind(cssPreview)
});

links.addLink((0, _DOMhelpers.$)('section')).addLink((0, _DOMhelpers.$)('button')).render();

},{"./CSSPreview":1,"./DOMhelpers":2,"./Links":3}],5:[function(require,module,exports){
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

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9jc3Mtc3RlYWwvY2hyb21lL2pzL3NyYy9DU1NQcmV2aWV3LmpzIiwiL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvY3NzLXN0ZWFsL2Nocm9tZS9qcy9zcmMvRE9NaGVscGVycy5qcyIsIi9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2Nzcy1zdGVhbC9jaHJvbWUvanMvc3JjL0xpbmtzLmpzIiwiL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvY3NzLXN0ZWFsL2Nocm9tZS9qcy9zcmMvaW5kZXguanMiLCIvVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9jc3Mtc3RlYWwvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7OzttQkFFUSxlQUFlOzs7OzBCQUNsQixjQUFjOztJQUVYLFVBQVU7QUFDbEIsV0FEUSxVQUFVLEdBQ2Y7MEJBREssVUFBVTs7QUFFM0IsUUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBRSxjQUFjLENBQUMsQ0FBQztHQUNwQzs7ZUFIa0IsVUFBVTs7V0FJdkIsZ0JBQUMsR0FBRyxFQUFFO0FBQ1YsVUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckMsVUFBSSxHQUFHLEdBQUcscURBQVksR0FBRyxFQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7O0FBRXZDLFVBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO0tBQ3JEOzs7U0FUa0IsVUFBVTs7O3FCQUFWLFVBQVU7Ozs7QUNML0IsWUFBWSxDQUFDOzs7OztxQkFFRTtBQUNiLEdB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QixNQUFNO0FBQ0wsUUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7R0FDMUI7Q0FDQSxDQUFBLENBQUUsSUFBSSxXQUFNLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ1NTU3RlYWwgZnJvbSAnLi4vLi4vLi4vc3JjLyc7XG5pbXBvcnQgeyAkIH0gZnJvbSAnLi9ET01oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ1NTUHJldmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJCgnLmpzLWl0ZW0tY3NzJyk7XG4gIH1cbiAgcmVuZGVyKGVscykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbHMpKSBlbHMgPSBbZWxzXTtcbiAgICB2YXIgY3NzID0gQ1NTU3RlYWwoLi4uZWxzKS50b0NTU1RleHQoKTtcbiAgICBcbiAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHByZT4nICsgY3NzICsgJzwvcHJlPic7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgJDogc2VsID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKSxcbiAgJCQ6IHNlbCA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbClcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7ICQgfSBmcm9tICcuL0RPTWhlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rcyB7XG4gIGNvbnN0cnVjdG9yKG9wcykge1xuICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkID0ge307XG4gICAgdGhpcy5jb250YWluZXIgPSAkKCcuanMtaXRlbXMtc2VsZWN0ZWQgLml0ZW1zLWhvbGRlcicpO1xuICAgIHRoaXMub25MaW5rU2VsZWN0ZWQgPSBvcHMub25MaW5rU2VsZWN0ZWQ7XG4gICAgdGhpcy5zdGVhbCA9ICQoJy5qcy1zdGVhbCcpO1xuXG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUxpbmsuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zdGVhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlR2V0Q1NTLmJpbmQodGhpcykpO1xuICB9XG4gIGFkZExpbmsoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgdmFyIGxpbmtzID0gdGhpcy5lbGVtZW50cy5tYXAoKGVsLCBpKSA9PiB7XG4gICAgICB2YXIgbm9kZU5hbWUgPSBlbC5ub2RlTmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgICB2YXIgY2xhc3NlcyA9IGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgIHZhciBodG1sID0gJyc7XG5cbiAgICAgIGh0bWwgKz0gJzxhIGhyZWY9XCIjXCIgZGF0YS1pbmRleD1cIml0ZW0nICsgaSArICdcIj4nO1xuICAgICAgaHRtbCArPSAnPGkgY2xhc3M9XCJmYSBmYS1jaGVjay1zcXVhcmUtb1wiPjwvaT4gJmx0Oyc7XG4gICAgICBodG1sICs9IG5vZGVOYW1lICsgKGNsYXNzZXMgPyAnIGNsYXNzPVwiJyArIGNsYXNzZXMgKyAnXCInIDogJycpO1xuICAgICAgaHRtbCArPSAnJmd0OzwvYT4nO1xuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSBsaW5rcy5qb2luKCcnKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBoYW5kbGVMaW5rKGUpIHtcbiAgICB2YXIgZWwgPSBlLnRhcmdldCwgc2VsZWN0ZWQ7XG4gICAgdmFyIGlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG5cbiAgICB0aGlzLnNlbGVjdGVkW2lkXSA9IHNlbGVjdGVkID0gISghIXRoaXMuc2VsZWN0ZWRbaWRdKTtcbiAgICB0aGlzLmNhblN0ZWFsKCk7XG5cbiAgICBzZWxlY3RlZCA/IGVsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJykgOiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICB9XG4gIGNhblN0ZWFsKCkge1xuICAgIHJldHVybiB0aGlzLnN0ZWFsLmRpc2FibGVkID0gIU9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWQpLnJlZHVjZSgocywgaWQpID0+IHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkW2lkXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuICBoYW5kbGVHZXRDU1MoZSkge1xuICAgIHRoaXMub25MaW5rU2VsZWN0ZWQodGhpcy5lbGVtZW50cy5maWx0ZXIoKGVsLCBpKSA9PiB0aGlzLnNlbGVjdGVkWydpdGVtJyArIGldKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBMaW5rcyBmcm9tICcuL0xpbmtzJztcbmltcG9ydCBDU1NQcmV2aWV3IGZyb20gJy4vQ1NTUHJldmlldyc7XG5pbXBvcnQgeyAkIH0gZnJvbSAnLi9ET01oZWxwZXJzJztcblxudmFyIGNzc1ByZXZpZXcgPSBuZXcgQ1NTUHJldmlldygpO1xudmFyIGxpbmtzID0gbmV3IExpbmtzKHtcbiAgb25MaW5rU2VsZWN0ZWQ6IGNzc1ByZXZpZXcucmVuZGVyLmJpbmQoY3NzUHJldmlldylcbn0pO1xuXG5saW5rc1xuICAuYWRkTGluaygkKCdzZWN0aW9uJykpXG4gIC5hZGRMaW5rKCQoJ2J1dHRvbicpKVxuICAucmVuZGVyKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbnZhciBDU1NTdGVhbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFwaSA9IHt9LCBodG1sID0gbnVsbCwgc3R5bGVzID0gW10sIGluZGVudCA9ICcgICcsIGVsZW1lbnRzID0gZmFsc2UsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgdmFyIHJlcXVpcmVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ1NTU3RlYWwgZXhwZWN0cyBhdCBsZWFzdCBvbmUgYXJndW1lbnQgKERPTSBlbGVtZW50KScpO1xuICAgIH1cbiAgICBpZiAoIWRvY3VtZW50LnN0eWxlU2hlZXRzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NTU1N0ZWFsOiBkb2N1bWVudC5zdHlsZVNoZWV0cyBpcyBub3QgYXZhaWxhYmxlIGluIHRoaXMgYnJvd3Nlci4nKTsgXG4gICAgfVxuICAgIGVsZW1lbnRzID0gdG9BcnJheShhcmdzLCB0cnVlKTtcbiAgfTtcbiAgdmFyIGdldEhUTUxBc1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZWxlbWVudHMub3V0ZXJIVE1MO1xuICB9O1xuICB2YXIgdG9BcnJheSA9IGZ1bmN0aW9uKG9iaiwgaWdub3JlRmFsc3kpIHtcbiAgICB2YXIgYXJyID0gW10sIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWlnbm9yZUZhbHN5IHx8IG9ialtpXSkge1xuICAgICAgICBhcnJbaV0gPSBvYmpbaV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cbiAgdmFyIGdldFJ1bGVzID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgc2hlZXRzID0gZG9jdW1lbnQuc3R5bGVTaGVldHMsIHJlc3VsdCA9IFtdO1xuICAgIGEubWF0Y2hlcyA9IGEubWF0Y2hlcyB8fCBhLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBhLm1vek1hdGNoZXNTZWxlY3RvciB8fCBhLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGEub01hdGNoZXNTZWxlY3RvcjtcbiAgICBmb3IgKHZhciBpIGluIHNoZWV0cykge1xuICAgICAgdmFyIHJ1bGVzID0gc2hlZXRzW2ldLnJ1bGVzIHx8IHNoZWV0c1tpXS5jc3NSdWxlcztcbiAgICAgIGZvciAodmFyIHIgaW4gcnVsZXMpIHtcbiAgICAgICAgaWYgKGEubWF0Y2hlcyhydWxlc1tyXS5zZWxlY3RvclRleHQpKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2gocnVsZXNbcl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmFyIHJlYWRTdHlsZXMgPSBmdW5jdGlvbiAoZWxzKSB7XG4gICAgcmV0dXJuIGVscy5yZWR1Y2UoZnVuY3Rpb24gKHMsIGVsKSB7XG4gICAgICBzLnB1c2goZ2V0UnVsZXMoZWwpKTtcbiAgICAgIHMgPSBzLmNvbmNhdChyZWFkU3R5bGVzKHRvQXJyYXkoZWwuY2hpbGRyZW4pKSk7XG4gICAgICByZXR1cm4gczsgIFxuICAgIH0sIFtdKTtcbiAgfTtcbiAgdmFyIGZsYXR0ZW5SdWxlcyA9IGZ1bmN0aW9uIChzKSB7XG4gICAgdmFyIGZpbHRlckJ5U2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uc2VsZWN0b3IgPT09IHNlbGVjdG9yO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBnZXRJdGVtID0gZnVuY3Rpb24gKHNlbGVjdG9yLCByZXN1bHQpIHtcbiAgICAgIHZhciBhcnIgPSBmaWx0ZXJCeVNlbGVjdG9yKHNlbGVjdG9yLCByZXN1bHQpO1xuICAgICAgcmV0dXJuIGFyci5sZW5ndGggPiAwID8gYXJyWzBdIDoge1xuICAgICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICAgIHN0eWxlczoge31cbiAgICAgIH07XG4gICAgfVxuICAgIHZhciBwdXNoSXRlbSA9IGZ1bmN0aW9uIChpdGVtLCByZXN1bHQpIHtcbiAgICAgIHZhciBhcnIgPSBmaWx0ZXJCeVNlbGVjdG9yKGl0ZW0uc2VsZWN0b3IsIHJlc3VsdCk7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHZhciBhbGwgPSBbXTtcbiAgICBzLmZvckVhY2goZnVuY3Rpb24gKHJ1bGVzKSB7XG4gICAgICBydWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgIHZhciBpdGVtID0gZ2V0SXRlbShydWxlLnNlbGVjdG9yVGV4dCwgYWxsKTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPHJ1bGUuc3R5bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgcHJvcGVydHkgPSBydWxlLnN0eWxlW2ldO1xuICAgICAgICAgIGl0ZW0uc3R5bGVzW3Byb3BlcnR5XSA9IHJ1bGUuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG4gICAgICAgIH1cbiAgICAgICAgcHVzaEl0ZW0oaXRlbSwgYWxsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBhbGw7XG4gIH07XG5cbiAgcmVxdWlyZW1lbnRzKCk7XG5cbiAgaHRtbCA9IGdldEhUTUxBc1N0cmluZygpO1xuICBzdHlsZXMgPSBmbGF0dGVuUnVsZXMocmVhZFN0eWxlcyhlbGVtZW50cykpO1xuXG4gIGFwaS50b0NTU1RleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHN0eWxlcy5yZWR1Y2UoZnVuY3Rpb24gKHRleHQsIGl0ZW0pIHtcbiAgICAgIHRleHQgKz0gaXRlbS5zZWxlY3RvciArICcge1xcbic7XG4gICAgICB0ZXh0ICs9IE9iamVjdC5rZXlzKGl0ZW0uc3R5bGVzKS5yZWR1Y2UoZnVuY3Rpb24gKGxpbmVzLCBwcm9wKSB7XG4gICAgICAgIGxpbmVzLnB1c2goaW5kZW50ICsgcHJvcCArICc6ICcgKyBpdGVtLnN0eWxlc1twcm9wXSArICc7Jyk7XG4gICAgICAgIHJldHVybiBsaW5lcztcbiAgICAgIH0sIFtdKS5qb2luKCdcXG4nKTtcbiAgICAgIHRleHQgKz0gJ1xcbn1cXG4nO1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfSwgJycpO1xuICB9O1xuICBhcGkudG9KUyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc3R5bGVzO1xuICB9XG5cbiAgcmV0dXJuIGFwaTtcbn07XG5cbnZhciByb290ID0gdGhpcztcbmlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gQ1NTU3RlYWw7XG4gIH1cbiAgZXhwb3J0cy5DU1NTdGVhbCA9IENTU1N0ZWFsO1xufSBlbHNlIHtcbiAgcm9vdC5DU1NTdGVhbCA9IENTU1N0ZWFsO1xufVxufSkuY2FsbCh0aGlzKTtcblxuXG4iXX0=
