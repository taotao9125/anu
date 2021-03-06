import utils from '../utils';
import config from '../../config/config';
let rword = /[^, ]+/g;
const tags = Object.keys(config.pluginTags);
let builtInStr = tags.join(',') + ',' +
    'view,text,button,block,official-account,scroll-view,swiper,swiper-item,movable-area,movable-view,cover-image,cover-view,icon,rich-text,' +
    'progress,checkbox,form,input,input,label,picker,picker-view,picker-view-column,radio,slider,switch,textarea,template,' +
    'navigator,audio,image,camera,video,live-player,live-pusher,map,canvas,open-data,web-view,radio-group,' +
    'slot,wxs,checkbox-group,loading';
let builtIn: any = {};
builtInStr.replace(rword, function(el) {
    builtIn[el] = el;
    return el;
});


let map = Object.assign({}, builtIn);
'p,div,h1,h2,h3,h4,h5,h6,quoteblock'.replace(rword, function(el) {
    map[el] = 'view';
    return el;
});
'span,b,s,code,quote,cite'.replace(rword, function(el) {
    map[el] = 'text';
    return el;
});
module.exports = utils.createNodeName(map, 'view');