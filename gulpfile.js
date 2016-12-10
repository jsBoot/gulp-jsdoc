(function(){
  'use strict';

  // Gulp
  var gulp = require('gulp');
  var gutil = require('gulp-util');

  // Some basic linting
  var eslint = require('gulp-eslint');
  var jshint = require('gulp-jshint');

  var jsreporter = require('jshint-stylish');

  var fs = require('fs');
  var jsconfig = JSON.parse(fs.readFileSync('./.jshintrc'));
  var esconfig = JSON.parse(fs.readFileSync('./.eslintrc'));

  gulp.task('lint', function(){
    gulp.src([
      'gulpfile.js',
      'index.js',
      'lib/**/*.js'
    ])
    .pipe(gutil.combine(
      eslint(esconfig),
      eslint.format(),
      jshint(jsconfig),
      jshint.reporter(jsreporter)
    )());
  });




  var template = require('gulp-template');
  var jsdoc = require('./');

  var pkg = require('./package.json');

  var opts = {
    showPrivate: true,
    monospaceLinks: true,
    cleverLinks: true,
    outputSourceFiles: true
  };

  var tpl = {
    path: 'ink-docstrap',
    systemName      : pkg.name,
    footer          : 'Generated with gulp',
    copyright       : 'Copyright WebItUp 2014',
    navType         : 'vertical',
    theme           : 'journal',
    linenums        : true,
    collapseSymbols : false,
    inverseNav      : false
  };

  // Amelia
  // Cerulean
  // Cosmo
  // Cyborg
  // Flatly
  // Journal
  // Readable
  // Simplex
  // Slate
  // Spacelab
  // Spruce
  // Superhero
  // United

  gulp.task('doc-simple', function() {
    gulp.src([
      'index.js',
      'lib/**/*.js',
      'testjs/**/*.js'
    ])
    // Process source files first
    .pipe(template({pkg: pkg}))
    // Then process it
    .pipe(jsdoc('./doc/jsdoc-simple'));
  });

  gulp.task('doc-inked', function() {
    gulp.src([
      'README.md',
      'index.js',
      'lib/**/*.js'
    ])
    // Process source files first
    .pipe(template({pkg: pkg}))
    // Then parse
    .pipe(jsdoc.parser(/*{
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      licenses: pkg.licenses || [pkg.license]
    }*/))
    // Then generate the documentation and
    .pipe(jsdoc.generator('./doc/jsdoc-inked', tpl, opts));
  });

}());
