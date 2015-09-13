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
    this.container.addEventListener('click', this.handleLink.bind(this));
    this.onLinkSelected = ops.onLinkSelected;
    this.steal = (0, _DOMhelpers.$)('.js-steal');
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
        return '<a href="#" data-index="item' + i + '">&lt;' + nodeName + (classes ? ' class="' + classes + '"' : '') + '&gt;</a>';
      });

      this.container.innerHTML = links.join('');
      return this;
    }
  }, {
    key: 'handleLink',
    value: function handleLink(e) {
      var el = e.target;
      var id = el.getAttribute('data-index');

      this.selected[id] = !!!this.selected[id];
      this.canSteal();
    }
  }, {
    key: 'canSteal',
    value: function canSteal() {
      var _this = this;

      console.log(this.selected);
      var status = Object.keys(this.selected).reduce(function (s, id) {
        if (_this.selected[id]) {
          return true;
        }
        return s;
      }, false);
      console.log(status);
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
  onLinkSelected: function onLinkSelected(el) {
    console.log(el);
    cssPreview.render(el);
  }
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9jc3Mtc3RlYWwvY2hyb21lL2pzL3NyYy9DU1NQcmV2aWV3LmpzIiwiL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvY3NzLXN0ZWFsL2Nocm9tZS9qcy9zcmMvRE9NaGVscGVycy5qcyIsIi9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2Nzcy1zdGVhbC9jaHJvbWUvanMvc3JjL0xpbmtzLmpzIiwiL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvY3NzLXN0ZWFsL2Nocm9tZS9qcy9zcmMvaW5kZXguanMiLCIvVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9jc3Mtc3RlYWwvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7OzttQkFFUSxlQUFlOzs7OzBCQUNsQixjQUFjOztJQUVYLFVBQVU7QUFDbEIsV0FEUSxVQUFVLEdBQ2Y7MEJBREssVUFBVTs7QUFFM0IsUUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBRSxjQUFjLENBQUMsQ0FBQztHQUNwQzs7ZUFIa0IsVUFBVTs7V0FJdkIsZ0JBQUMsR0FBRyxFQUFFO0FBQ1YsVUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckMsVUFBSSxHQUFHLEdBQUcscURBQVksR0FBRyxFQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7O0FBRXZDLFVBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO0tBQ3JEOzs7U0FUa0IsVUFBVTs7O3FCQUFWLFVBQVU7Ozs7QUNML0IsWUFBWSxDQUFDOzs7OztxQkFFRTtBQUNiLEdB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QUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDM0QsaUJBQU8sS0FBSyxDQUFDO1NBQ2QsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEIsWUFBSSxJQUFJLE9BQU8sQ0FBQztBQUNoQixlQUFPLElBQUksQ0FBQztPQUNiLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDUixDQUFDO0FBQ0YsT0FBRyxDQUFDLElBQUksR0FBRyxZQUFZO0FBQ3JCLGFBQU8sTUFBTSxDQUFDO0tBQ2YsQ0FBQTs7QUFFRCxXQUFPLEdBQUcsQ0FBQztHQUNaLENBQUM7O0FBRUYsTUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLE1BQUksT0FBTyxPQUFPLEtBQUssV0FBVyxFQUFFO0FBQ2xDLFFBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDbkQsYUFBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO0tBQ3JDO0FBQ0QsV0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7R0FDN0IsTUFBTTtBQUNMLFFBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0dBQzFCO0NBQ0EsQ0FBQSxDQUFFLElBQUksV0FBTSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IENTU1N0ZWFsIGZyb20gJy4uLy4uLy4uL3NyYy8nO1xuaW1wb3J0IHsgJCB9IGZyb20gJy4vRE9NaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENTU1ByZXZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9ICQoJy5qcy1pdGVtLWNzcycpO1xuICB9XG4gIHJlbmRlcihlbHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkgZWxzID0gW2Vsc107XG4gICAgdmFyIGNzcyA9IENTU1N0ZWFsKC4uLmVscykudG9DU1NUZXh0KCk7XG4gICAgXG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gJzxwcmU+JyArIGNzcyArICc8L3ByZT4nO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICQ6IHNlbCA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCksXG4gICQkOiBzZWwgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyAkIH0gZnJvbSAnLi9ET01oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua3Mge1xuICBjb25zdHJ1Y3RvcihvcHMpIHtcbiAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgdGhpcy5zZWxlY3RlZCA9IHt9O1xuICAgIHRoaXMuY29udGFpbmVyID0gJCgnLmpzLWl0ZW1zLXNlbGVjdGVkIC5pdGVtcy1ob2xkZXInKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlTGluay5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm9uTGlua1NlbGVjdGVkID0gb3BzLm9uTGlua1NlbGVjdGVkO1xuICAgIHRoaXMuc3RlYWwgPSAkKCcuanMtc3RlYWwnKTtcbiAgfVxuICBhZGRMaW5rKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIHZhciBsaW5rcyA9IHRoaXMuZWxlbWVudHMubWFwKChlbCwgaSkgPT4ge1xuICAgICAgdmFyIG5vZGVOYW1lID0gZWwubm9kZU5hbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICByZXR1cm4gJzxhIGhyZWY9XCIjXCIgZGF0YS1pbmRleD1cIml0ZW0nICsgaSArICdcIj4mbHQ7JyArIG5vZGVOYW1lICsgKGNsYXNzZXMgPyAnIGNsYXNzPVwiJyArIGNsYXNzZXMgKyAnXCInIDogJycpICsgJyZndDs8L2E+JztcbiAgICB9KTtcblxuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IGxpbmtzLmpvaW4oJycpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGhhbmRsZUxpbmsoZSkge1xuICAgIHZhciBlbCA9IGUudGFyZ2V0O1xuICAgIHZhciBpZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuXG4gICAgdGhpcy5zZWxlY3RlZFtpZF0gPSAhKCEhdGhpcy5zZWxlY3RlZFtpZF0pO1xuICAgIHRoaXMuY2FuU3RlYWwoKTtcbiAgfVxuICBjYW5TdGVhbCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkKTtcbiAgICB2YXIgc3RhdHVzID0gT2JqZWN0LmtleXModGhpcy5zZWxlY3RlZCkucmVkdWNlKChzLCBpZCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRbaWRdKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHM7XG4gICAgfSwgZmFsc2UpO1xuICAgIGNvbnNvbGUubG9nKHN0YXR1cyk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBMaW5rcyBmcm9tICcuL0xpbmtzJztcbmltcG9ydCBDU1NQcmV2aWV3IGZyb20gJy4vQ1NTUHJldmlldyc7XG5pbXBvcnQgeyAkIH0gZnJvbSAnLi9ET01oZWxwZXJzJztcblxudmFyIGNzc1ByZXZpZXcgPSBuZXcgQ1NTUHJldmlldygpO1xudmFyIGxpbmtzID0gbmV3IExpbmtzKHtcbiAgb25MaW5rU2VsZWN0ZWQ6IGVsID0+IHtcbiAgICBjb25zb2xlLmxvZyhlbCk7XG4gICAgY3NzUHJldmlldy5yZW5kZXIoZWwpO1xuICB9XG59KTtcblxubGlua3NcbiAgLmFkZExpbmsoJCgnc2VjdGlvbicpKVxuICAuYWRkTGluaygkKCdidXR0b24nKSlcbiAgLnJlbmRlcigpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG52YXIgQ1NTU3RlYWwgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcGkgPSB7fSwgaHRtbCA9IG51bGwsIHN0eWxlcyA9IFtdLCBpbmRlbnQgPSAnICAnLCBlbGVtZW50cyA9IGZhbHNlLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gIHZhciByZXF1aXJlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NTU1N0ZWFsIGV4cGVjdHMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50IChET00gZWxlbWVudCknKTtcbiAgICB9XG4gICAgaWYgKCFkb2N1bWVudC5zdHlsZVNoZWV0cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDU1NTdGVhbDogZG9jdW1lbnQuc3R5bGVTaGVldHMgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGlzIGJyb3dzZXIuJyk7IFxuICAgIH1cbiAgICBlbGVtZW50cyA9IHRvQXJyYXkoYXJncywgdHJ1ZSk7XG4gIH07XG4gIHZhciBnZXRIVE1MQXNTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRzLm91dGVySFRNTDtcbiAgfTtcbiAgdmFyIHRvQXJyYXkgPSBmdW5jdGlvbihvYmosIGlnbm9yZUZhbHN5KSB7XG4gICAgdmFyIGFyciA9IFtdLCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFpZ25vcmVGYWxzeSB8fCBvYmpbaV0pIHtcbiAgICAgICAgYXJyW2ldID0gb2JqW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG4gIHZhciBnZXRSdWxlcyA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHNoZWV0cyA9IGRvY3VtZW50LnN0eWxlU2hlZXRzLCByZXN1bHQgPSBbXTtcbiAgICBhLm1hdGNoZXMgPSBhLm1hdGNoZXMgfHwgYS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgYS5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgYS5tc01hdGNoZXNTZWxlY3RvciB8fCBhLm9NYXRjaGVzU2VsZWN0b3I7XG4gICAgZm9yICh2YXIgaSBpbiBzaGVldHMpIHtcbiAgICAgIHZhciBydWxlcyA9IHNoZWV0c1tpXS5ydWxlcyB8fCBzaGVldHNbaV0uY3NzUnVsZXM7XG4gICAgICBmb3IgKHZhciByIGluIHJ1bGVzKSB7XG4gICAgICAgIGlmIChhLm1hdGNoZXMocnVsZXNbcl0uc2VsZWN0b3JUZXh0KSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHJ1bGVzW3JdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHZhciByZWFkU3R5bGVzID0gZnVuY3Rpb24gKGVscykge1xuICAgIHJldHVybiBlbHMucmVkdWNlKGZ1bmN0aW9uIChzLCBlbCkge1xuICAgICAgcy5wdXNoKGdldFJ1bGVzKGVsKSk7XG4gICAgICBzID0gcy5jb25jYXQocmVhZFN0eWxlcyh0b0FycmF5KGVsLmNoaWxkcmVuKSkpO1xuICAgICAgcmV0dXJuIHM7ICBcbiAgICB9LCBbXSk7XG4gIH07XG4gIHZhciBmbGF0dGVuUnVsZXMgPSBmdW5jdGlvbiAocykge1xuICAgIHZhciBmaWx0ZXJCeVNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yLCByZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnNlbGVjdG9yID09PSBzZWxlY3RvcjtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgZ2V0SXRlbSA9IGZ1bmN0aW9uIChzZWxlY3RvciwgcmVzdWx0KSB7XG4gICAgICB2YXIgYXJyID0gZmlsdGVyQnlTZWxlY3RvcihzZWxlY3RvciwgcmVzdWx0KTtcbiAgICAgIHJldHVybiBhcnIubGVuZ3RoID4gMCA/IGFyclswXSA6IHtcbiAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgICBzdHlsZXM6IHt9XG4gICAgICB9O1xuICAgIH1cbiAgICB2YXIgcHVzaEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSwgcmVzdWx0KSB7XG4gICAgICB2YXIgYXJyID0gZmlsdGVyQnlTZWxlY3RvcihpdGVtLnNlbGVjdG9yLCByZXN1bHQpO1xuICAgICAgaWYgKGFyci5sZW5ndGggPT09IDApIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICB2YXIgYWxsID0gW107XG4gICAgcy5mb3JFYWNoKGZ1bmN0aW9uIChydWxlcykge1xuICAgICAgcnVsZXMuZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICB2YXIgaXRlbSA9IGdldEl0ZW0ocnVsZS5zZWxlY3RvclRleHQsIGFsbCk7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxydWxlLnN0eWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHByb3BlcnR5ID0gcnVsZS5zdHlsZVtpXTtcbiAgICAgICAgICBpdGVtLnN0eWxlc1twcm9wZXJ0eV0gPSBydWxlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgICAgIHB1c2hJdGVtKGl0ZW0sIGFsbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWxsO1xuICB9O1xuXG4gIHJlcXVpcmVtZW50cygpO1xuXG4gIGh0bWwgPSBnZXRIVE1MQXNTdHJpbmcoKTtcbiAgc3R5bGVzID0gZmxhdHRlblJ1bGVzKHJlYWRTdHlsZXMoZWxlbWVudHMpKTtcblxuICBhcGkudG9DU1NUZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzdHlsZXMucmVkdWNlKGZ1bmN0aW9uICh0ZXh0LCBpdGVtKSB7XG4gICAgICB0ZXh0ICs9IGl0ZW0uc2VsZWN0b3IgKyAnIHtcXG4nO1xuICAgICAgdGV4dCArPSBPYmplY3Qua2V5cyhpdGVtLnN0eWxlcykucmVkdWNlKGZ1bmN0aW9uIChsaW5lcywgcHJvcCkge1xuICAgICAgICBsaW5lcy5wdXNoKGluZGVudCArIHByb3AgKyAnOiAnICsgaXRlbS5zdHlsZXNbcHJvcF0gKyAnOycpO1xuICAgICAgICByZXR1cm4gbGluZXM7XG4gICAgICB9LCBbXSkuam9pbignXFxuJyk7XG4gICAgICB0ZXh0ICs9ICdcXG59XFxuJztcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH0sICcnKTtcbiAgfTtcbiAgYXBpLnRvSlMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxuXG4gIHJldHVybiBhcGk7XG59O1xuXG52YXIgcm9vdCA9IHRoaXM7XG5pZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IENTU1N0ZWFsO1xuICB9XG4gIGV4cG9ydHMuQ1NTU3RlYWwgPSBDU1NTdGVhbDtcbn0gZWxzZSB7XG4gIHJvb3QuQ1NTU3RlYWwgPSBDU1NTdGVhbDtcbn1cbn0pLmNhbGwodGhpcyk7XG5cblxuIl19
