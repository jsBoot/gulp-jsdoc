# gulp-jsdoc

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url] [![Code Climate][codeclimate-image]][codeclimate-url]

> [jsdoc](https://github.com/jsdoc/jsdoc) plugin for [gulp](https://github.com/gulpjs/gulp)


Install `gulp-jsdoc` as a development dependency:

```shell
npm install --save-dev gulp-jsdoc
```

Then, use it where config is the only way to pass in jsdoc options. All CLI options are can be specified here,
the only exception is ink-docstrap is bundled here and used for templating.

```javascript
var jsdoc = require('gulp-jsdoc');

gulp.task('doc', function (cb) {
    gulp.src(['README.md', './src/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});
```

Another good example is in this project's [gulpfile](https://github.com/mlucool/gulp-jsdoc/blob/master/gulpfile.js)!

## Debugging
Set env variable: ```DEBUG=gulp-jsdoc```  

## Notes
This is a reasonable attempt to wrap jsdoc using gulp as thinly as possible. All files are added after the cli.
i.e. jsdoc -c config -t node_modules/ink-docstrap/template gulpFile1 gulpFile2  
[jsdoc](https://github.com/jsdoc/jsdoc) does not allow for piped input, so this attempt may be considered a gulp
anti-pattern. It also does not pass on output to be piped elsewhere.


I would like to thank Mangled Deutz @ [gulp-jsdoc](https://github.com/jsBoot/gulp-jsdoc) for the original implimentation.

License
-------------
[Apache-2.0 License](http://www.apache.org/licenses/LICENSE-2.0)

[npm-url]: https://npmjs.org/package/gulp-jsdoc
[npm-image]: https://badge.fury.io/js/gulp-jsdoc.png

[travis-url]: http://travis-ci.org/mlucool/gulp-jsdoc
[travis-image]: https://secure.travis-ci.org/mlucool/gulp-jsdoc.png?branch=master

[coveralls-url]: https://coveralls.io/r/mlucool/gulp-jsdoc
[coveralls-image]: https://coveralls.io/repos/mlucool/gulp-jsdoc/badge.png?branch=master

[depstat-url]: https://david-dm.org/mlucool/gulp-jsdoc
[depstat-image]: https://david-dm.org/mlucool/gulp-jsdoc.png

[codeclimate-url]: https://codeclimate.com/github/mlucool/gulp-jsdoc
[codeclimate-image]: https://codeclimate.com/github/mlucool/gulp-jsdoc.png
