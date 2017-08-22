'use strict';

function load(component) {
  // '@' is aliased to src/components
  return require(`@/${component}.vue`)
}

export default [
  {
    name: 'extract',
    icon: 'content cut',
    path: '/extract',
    component: load('Extract')
  },
  {
    name: 'filter',
    icon: 'fa-filter',
    path: '/filter',
    component: load('Filter')
  },
  {
    name: 'format',
    icon: 'format align center',
    path: '/format',
    component: load('Format')
  },
  {
    name: 'info',
    icon: 'info',
    path: '/info',
    component: load('Info')
  }
];
