var vows = require('vows');
var assert = require('assert');
var util = require('util');
var github = require('passport-deviantart');


vows.describe('passport-deviantart').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(github.version);
    },
  },
  
}).export(module);
