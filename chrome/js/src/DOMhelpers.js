'use strict';

export default {
  $: sel => document.querySelector(sel),
  $$: sel => document.querySelectorAll(sel)
};
