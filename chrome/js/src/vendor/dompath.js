// credits: https://github.com/jhartikainen/dompath

export default function(el, parent) {

  var getSelector = function(node) {
    if(node.id !== '') {
      return '#' + node.id;
    }

    var root = '';
    if(node.parent) {
      root = getSelector(node.parent) + ' > ';
    }

    return root + node.name + ':nth-child(' + (node.index + 1) + ')';
  };

  var DomPath = function(node) { this.node = node; };
  DomPath.prototype = {
    toCSS: function() {
      return getSelector(this.node);
    },
  
    select: function() {
      if(this.node.id !== '') {
        return document.getElementById(this.node.id);
      }

      return document.querySelector(this.toCSS());
    }
  };

  var pathNode = function(el, root) {
    var node = {
      id: el.id,
      name: el.nodeName.toLowerCase(),
      index: childIndex(el),
      parent: null
    };

    if(el.parentElement && el.parentElement !== root) {
      node.parent = pathNode(el.parentElement, root);
    }

    return node;
  };

  var childIndex = function(el) {
    var idx = 0;
    while(el = el.previousSibling) {
      if(el.nodeType == 1) {
        idx++;
      }
    }

    return idx;
  };

  parent = parent || document.body;
  if(el.nodeName) {
    return new DomPath(pathNode(el, parent));
  }

  return new DomPath(el.node);
};