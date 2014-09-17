/**
 * Created by at15 on 14-9-17.
 */

// use image magic to compress the image

var gm = require('gm').subClass({imageMagick: true});
var glob = require('glob');
var path = require('path');
var fs = require('fs');

var opt = {
    src: 'emotions/*.png',
    dst: 'emotion_compressed'
};

var files = glob.sync(opt.src, {});

files.forEach(function (file) {
    //console.log(file);
    var file_name = path.basename(file, '.png');
    //console.log(file_name);
    //var writeStream = fs.createWriteStream(opt.dst + '/' + file_name + '.png', {
    //    flags: 'w',
    //    encoding: null,
    //    mode: 0666
    //});

    gm(file)
        .resize(30, 30)
        .write(opt.dst + '/' + file_name + '.png', function (err) {
            if (err) {
                console.log(' compress fail', err);
            }
        });
});
