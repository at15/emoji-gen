/**
 * Created by at15 on 14-9-17.
 */


// build the emojis

var gm = require('gm').subClass({imageMagick: true});
var glob = require('glob');
var path = require('path');
var fs = require('fs');

var files = glob.sync('emotion_compressed/*', {});

// 首先复制第一个图片
var first_img_path = 'build/emoji.png';
var first_name = path.basename(files[0], '.png');
var first_img_content = fs.readFileSync(files[0]);
fs.writeFileSync(first_img_path, first_img_content);

// 只能用eval了...
var to_eval = 'gm(first_img_path).append(';
var array_str = 'var emoji_list = [\'' + first_name + '\',\n';
var css_str = '.emoji {background-image: url("emoji.png"); width: 30px; height: 30px; display: -moz-inline-stack; display: inline-block; vertical-align: top; zoom: 1; *display: inline; }\n' +
    '.' + first_name + '{background-position:0 0;}\n';
for (var i = 1; i < files.length; i++) {
    //gm(first_img_path).append(files[i]);
    to_eval += "'" + files[i] + "',";
    // 然后就是生成css了.
    var file_name = path.basename(files[i], '.png');
    var pos = {x: i * 30, y: 0};
    array_str += "'" + file_name + "',\n";
    css_str += '.' + file_name + '{background-position: ' + pos.x + 'px ' + pos.y + 'px;}\n';
}

array_str += ']';

to_eval += 'true).write(first_img_path, function () {});';

//console.log(to_eval);
eval(to_eval);

fs.writeFileSync('build/emoji.css', css_str);
fs.writeFileSync('build/emoji.arr.js', array_str);