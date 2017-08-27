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
    component: load('Extract'),
    features: [
      'Easily extract the interesting fields'
    ]
  },
  {
    name: 'filter',
    icon: 'fa-filter',
    path: '/filter',
    component: load('Filter'),
    features: [
      'Remove duplicated elements',
      'Easily filtering using existing values',
      'Filter using AND or OR operands'
    ]
  },
  {
    name: 'format',
    icon: 'format align center',
    path: '/format',
    component: load('Format'),
    features: [
      'Fix minnor mistakes like missing commas in collections',
      'Accepts key names without quotes (like in JS code)',
      'Format collapsing the JSON to a single line',
      'Format expanding the provided JSON with certain spacing'
    ]
  },
  {
    name: 'info',
    icon: 'info',
    path: '/info',
    component: load('Info'),
    features: [
      'Find odd keys (not present on all objects) and their count',
      'Get the number of elements',
      'Get the number of duplicated elements'
    ]
  },
  {
    name: 'config',
    icon: 'settings',
    path: '/config',
    component: load('Config'),
    features: [
      'Optional automatic format input (fixing possible errors)'
    ]
  },
  {
    name: 'help',
    icon: 'help',
    path: '/help',
    component: load('Help')
  }
];
