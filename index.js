/**
 * @file fontmin otf2ttf
 * @author junmer
 */

/* eslint-env node */

'use strict';

var b2ab = require('b3b').b2ab;
var ab2b = require('b3b').ab2b;
var isOtf = require('is-otf');
var opentype = require('opentype.js');
var TTF = require('fonteditor-ttf').TTF;
var TTFWriter = require('fonteditor-ttf').TTFWriter;
var through = require('through2');
var ttfEmpty = require('./ttf-empty');

module.exports = function (opts) {
    opts = opts || {};

    return through.ctor({objectMode: true}, function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new Error('Streaming is not supported'));
            return;
        }

        if (!isOtf(file.contents)) {
            cb(null, file);
            return;
        }

        // clone
        if (opts.clone) {
            this.push(file.clone());
        }

        try {

            // parse otf
            var otf = opentype.parse(b2ab(file.contents));

            // new ttf
            var ttf = new TTF(ttfEmpty);

            // set tables
            var otfTables = otf.tables;

            ttf.setName(otfTables.name);
            ttf.setHead(otfTables.head);
            ttf.setHhea(otfTables.hhea);
            ttf.setOS2(otfTables.os2);
            ttf.setPost(otfTables.post);

            // set glyphs
            var otfGlyphs = otf.glyphs;
            otfGlyphs.shift();
            otfGlyphs.forEach(function (glyph, index) {

                // @todo 字形数据结构转换
                delete glyph.font;
                glyph.unicode = glyph.unicodes;
                // glyph.contours = glyph.path.commands;
                // delete glyph.path;
                ttf.addGlyf(glyph);

            });

            // write ttf
            var ttfBuffer = new TTFWriter().write(ttf.get());

            file.contents = ab2b(ttfBuffer);

            cb(null, file);

        }
        catch (err) {
            cb(err);
        }
    });
};
