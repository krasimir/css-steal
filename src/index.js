(function() {

var CSSSteal = function () {
  var api = {}, html = null, styles = [], indent = '  ', elements = false, args = arguments;

  var requirements = function () {
    if (args.length === 0) {
      throw new Error('CSSSteal expects at least one argument (DOM element)');
    }
    if (!document.styleSheets) {
      throw new Error('CSSSteal: document.styleSheets is not available in this browser.'); 
    }
    elements = toArray(args, true);
  };
  var getHTMLAsString = function () {
    return elements.outerHTML;
  };
  var toArray = function(obj, ignoreFalsy) {
    var arr = [], i;

    for (i = 0; i < obj.length; i++) {
      if (!ignoreFalsy || obj[i]) {
        arr[i] = obj[i];
      }
    }
    return arr;
  }
  var getRules = function (a) {
    var sheets = document.styleSheets, result = [], selectorText;

    a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
    for (var i in sheets) {
      var rules = sheets[i].rules || sheets[i].cssRules;
      for (var r in rules) {
        selectorText = rules[r].selectorText ? rules[r].selectorText.split(' ').map(function(piece) {
          return piece.split(/(:|::)/)[0];
        }).join(' ') : false;
        if (a.matches(selectorText)) {
          result.push(rules[r]);
        }
      }
    }
    return result;
  }
  var readStyles = function (els) {
    return els.reduce(function (s, el) {
      s.push(getRules(el));
      s = s.concat(readStyles(toArray(el.children)));
      return s;  
    }, []);
  };
  var flattenRules = function (s) {
    var filterBySelector = function (selector, result) {
      return result.filter(function (item) {
        return item.selector === selector;
      });
    }
    var getItem = function (selector, result) {
      var arr = filterBySelector(selector, result);
      return arr.length > 0 ? arr[0] : {
        selector: selector,
        styles: {}
      };
    }
    var pushItem = function (item, result) {
      var arr = filterBySelector(item.selector, result);
      if (arr.length === 0) result.push(item);
    }
    var all = [];
    s.forEach(function (rules) {
      rules.forEach(function (rule) {
        var item = getItem(rule.selectorText, all);
        for (var i=0; i<rule.style.length; i++) {
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
  }

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
}).call(this);


