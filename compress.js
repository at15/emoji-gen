/**
 * Created by at15 on 14-9-17.
 */

// use image magic to compress the image

var gm = require('gm');
var glob = require('glob');
var path =require('path');

var opt = {
    src:'emotions/*.png',
    dst:'emotion_compressed'
};

var files = glob.sync(opt.src, {});

files.forEach(function(file){
    //console.log(file);
    gm(file)
        .resize(30 , 30)
        .autoOrient()
        .write(writeStream, function (err) {
            if (err) {
                console.log(' compress fail',err);
            }
        });
});
