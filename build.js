/**
 * Created by at15 on 14-9-17.
 */
// build the emojis

var nsg = require('node-sprite-generator');

nsg({
    src: [
        'emotions/*.png'
    ],
    spritePath: 'build/emoji.png',
    stylesheet:'css',
    stylesheetPath: 'build/emoji.css'
}, function (err) {
    if (!err) {
        console.log('Sprite generated!');

    } else {
        console.log('error occurred', err);
    }
});