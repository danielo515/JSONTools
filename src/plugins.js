'use strict';

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default [
  {
    name: 'extract',
    icon: 'content cut',
    path: '/extract',
    component: load('Extract')
  },
  {
    name: 'info',
    icon: 'info',
    path: '/info',
    component: load('Info')
  },
  {
    name: 'filter',
    icon: 'fa-filter',
    path: '/filter',
    component: load('Filter')
  }
];
