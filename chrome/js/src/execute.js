'use strict';

export default function execute(fn, args = [], callback = null) {
  var code = '(' + fn.toString() + ').apply(this, [' + args.toString() + ']);';
  
  chrome.devtools.inspectedWindow.eval(code, callback ? callback.bind(this) : () => {});
};
