'use strict';

var html = require('raw!./view.spinners.html');

module.exports = {
  template: html,
  data: {
    size: 36,
    color: '#000000',
    spinners: [
      'audio', 'ball', 'bars', 'circles', 'dots',
      'facebook', 'gears', 'grid', 'hearts',
      'hourglass', 'infinity', 'ios', 'oval',
      'pie', 'puff', 'radio', 'rings', 'tail'
    ],
    colorOptions: [
      {
        label: 'Black',
        value: '#000000'
      },
      {
        label: 'Red',
        value: '#ff0000'
      },
      {
        label: 'Green',
        value: '#00ff00'
      },
      {
        label: 'Blue',
        value: '#0000ff'
      }
    ]
  }
};
