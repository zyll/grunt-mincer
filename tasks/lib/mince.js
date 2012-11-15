/*
 * grunt-mincer
 * https://github.com/pirxpilot/grunt-mincer
 *
 * Copyright (c) 2012 Damian Krzeminski
 * Licensed under the MIT license.
 */


var Mincer = require('mincer');

exports.init = function(grunt) {
  'use strict';

  var exports = {};

  exports.mince = function(src, dest, include, unregister, fn) {
    var environment = new Mincer.Environment(process.cwd()),
      asset;
    for(var i = 0, l = unregister.length; i < l; i++) {
      environment.unregisterPostProcessor(unregister[i].type, Mincer[unregister[i].processor]);
    }
    include.forEach(function(include) {
      environment.appendPath(include);
    });

    asset = environment.findAsset(src);
    if (!asset) {
      return fn('Cannot find logical path: ' + src.cyan);
    }

    asset.compile(function (err) {
      if (err) {
        fn(err);
      } else {
        grunt.file.write(dest, asset.toString());
        fn();
      }
    });
  };

  return exports;
};
