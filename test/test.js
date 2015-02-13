/**
 * @file test
 * @author junmer
 */

/* eslint-env node */

'use strict';

var assert = require('assert');
var isOtf = require('is-otf');
var isTtf = require('is-ttf');
var path = require('path');
var read = require('vinyl-file').read;
var fs = require('fs');
var otf2ttf = require('../');

var sourceFile = path.join(__dirname, 'fixtures/FontAwesome.otf');
var destFile = sourceFile.replace('.otf', '.ttf');


it('input otf, output ttf', function (done) {

    read(sourceFile, function (err, file) {

        assert(!err);

        assert(isOtf(file.contents));

        var stream = otf2ttf()();

        stream.on('data', function (data) {
            fs.writeFileSync(destFile, data.contents);
            assert(isTtf(data.contents));
            done();
        });

        stream.end(file);
    });

});
