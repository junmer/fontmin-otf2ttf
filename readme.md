# fontmin-otf2ttf [![Build Status](http://img.shields.io/travis/junmer/fontmin-otf2ttf.svg?style=flat)](https://travis-ci.org/junmer/fontmin-otf2ttf) 

> otf2ttf fontmin plugin

NOTICE: not ready, don't use util released

注意: 还没准备好, 等稳定了再用

## Install

```sh
$ npm install --save fontmin-otf2ttf
```

## Usage

```js
var Fontmin = require('fontmin');
var otf2ttf = require('fontmin-otf2ttf');

var fontmin = new Fontmin()
    .src('fonts/*.otf')
    .dest('build/fonts')
    .use(otf2ttf());

fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    console.log('Files convert successfully!'); 
});
```

You can also use this plugin with [gulp](http://gulpjs.com):

```js
var gulp = require('gulp');
var otf2ttf = require('fontmin-otf2ttf');

gulp.task('default', function () {
    return gulp.src('fonts/*.otf')
        .pipe(otf2ttf()())
        .pipe(gulp.dest('build/fonts'));
});
```


## License

MIT © [junmer](https://github.com/junmer)
