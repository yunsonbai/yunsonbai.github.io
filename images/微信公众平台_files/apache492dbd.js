define("pages/modules/crop/jquery.Jcrop.min.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.jcrop-holder {  direction: ltr;  text-align: left;}.jcrop-vline,.jcrop-hline {  background-image: url(/mpres/zh_CN/htmledition/pages/modules/crop/Jcrop.gif);  background-position: 0 0;  background-repeat: no-repeat;  background-color: #FFFFFF;  font-size: 0;  position: absolute;}.jcrop-vline {  height: 100%;  width: 1px !important;}.jcrop-hline {  height: 1px!important;  width: 100%;}.jcrop-vline.right {  right: 0;}.jcrop-hline.bottom {  bottom: 0;}.jcrop-handle {  background-color: #333;  border: 1px #eee solid;  font-size: 1px;}.jcrop-tracker {  -webkit-tap-highlight-color: transparent;  -webkit-touch-callout: none;  -webkit-user-select: none;  height: 100%;  width: 100%;}.jcrop-handle.ord-n {  left: 50%;  margin-left: -4px;  margin-top: -4px;  top: 0;}.jcrop-handle.ord-s {  bottom: 0;  left: 50%;  margin-bottom: -4px;  margin-left: -4px;}.jcrop-handle.ord-e {  margin-right: -4px;  margin-top: -4px;  right: 0;  top: 50%;}.jcrop-handle.ord-w {  left: 0;  margin-left: -4px;  margin-top: -4px;  top: 50%;}.jcrop-handle.ord-nw {  left: 0;  margin-left: -4px;  margin-top: -4px;  top: 0;}.jcrop-handle.ord-ne {  margin-right: -4px;  margin-top: -4px;  right: 0;  top: 0;}.jcrop-handle.ord-se {  bottom: 0;  margin-bottom: -4px;  margin-right: -4px;  right: 0;}.jcrop-handle.ord-sw {  bottom: 0;  left: 0;  margin-bottom: -4px;  margin-left: -4px;}.jcrop-dragbar.ord-n,.jcrop-dragbar.ord-s {  height: 7px;  width: 100%;}.jcrop-dragbar.ord-e,.jcrop-dragbar.ord-w {  height: 100%;  width: 7px;}.jcrop-dragbar.ord-n {  margin-top: -4px;}.jcrop-dragbar.ord-s {  bottom: 0;  margin-bottom: -4px;}.jcrop-dragbar.ord-e {  margin-right: -4px;  right: 0;}.jcrop-dragbar.ord-w {  margin-left: -4px;}.jcrop-light .jcrop-vline,.jcrop-light .jcrop-hline {  background: #FFF;  filter: alpha(opacity=70) !important;  opacity: 0.7 !important;}.jcrop-light .jcrop-handle {  -moz-border-radius: 3px;  -webkit-border-radius: 3px;  background-color: #000;  border-color: #FFF;  border-radius: 3px;}.jcrop-dark .jcrop-vline,.jcrop-dark .jcrop-hline {  background: #000;  filter: alpha(opacity=70) !important;  opacity: 0.7 !important;}.jcrop-dark .jcrop-handle {  -moz-border-radius: 3px;  -webkit-border-radius: 3px;  background-color: #FFF;  border-color: #000;  border-radius: 3px;}.jcrop-holder img,img.jcrop-preview {  max-width: none;}";});define("common/wx/dialog.js",["biz_common/jquery.ui/jquery.ui.draggable.js","tpl/dialog.html.js"],function(t,e){
"use strict";
function i(t){
var e=this;
"string"==typeof t&&(t={
msg:t
}),t=$.extend(!0,{},o,t),e.id=t.id=[n.uiName,"_",++n.uid].join(""),t.icon=n.iconClass[t.type||"warn"];
var i=[];
i=t.msg.split("|"),t.msg=i[0]?i[1]?{
title:i[0],
text:i[1],
msgClass:""
}:{
title:t.msg,
msgClass:"single_line"
}:{
text:i[1],
msgClass:"single_line"
},$.each(t.buttons,function(t,e){
e.type=n.btTypes[e.type||"primary"];
}),e.opt=t,$(template.compile(n.html)(t)).appendTo("body"),e.dom=$("#"+this.id).parent(),
e.dom.css("margin-left",-1*e.dom.outerWidth()/2).css("margin-top",-1*e.dom.outerHeight()/2),
e.dom.fadeIn(),t.draggable&&e.dom.draggable({
handle:".dialog_hd"
}),function(){
$.each($("#"+e.id+" .js_btn"),function(i,o){
t.buttons[i].click&&$(o).click(function(){
return t.buttons[i].click.apply(e),!1;
});
}),$("#"+e.id+" .pop_closed").click(function(){
return t.close&&"function"==typeof t.close?void(t.close()&&e.remove()):void e.remove();
});
}();
}
t("biz_common/jquery.ui/jquery.ui.draggable.js");
var o={
title:"温馨提示",
type:"warn",
msg:"错误信息|对不起，系统繁忙请稍后尝试。",
buttons:[{
text:"确定",
click:function(t){
this.remove(t);
}
}],
width:720,
height:0,
draggable:!0,
mask:!0,
className:"",
contentClassName:""
},n={
uid:0,
uiName:"wxDialog",
iconClass:{
succ:"success",
err:"error",
warn:"warn",
info:"info",
warn_primary:"warn_primary",
waiting:"waiting"
},
btTypes:{
primary:"btn_primary",
normal:"btn_default",
disabled:"btn_disabled"
}
};
n.html=t("tpl/dialog.html.js"),i.prototype={
hide:function(){
this.opt.mask&&this.dom.next().remove(),this.dom.fadeOut();
},
remove:function(){
this.opt.mask&&this.dom.next().remove(),this.dom.remove();
},
resetPos:function(){
var t=this;
t.dom.css("margin-left",-1*t.dom.outerWidth()/2).css("margin-top",-1*t.dom.outerHeight()/2);
}
},e.show=function(t){
return new i(t);
};
});define("common/wx/Tips.js",[],function(e,n){
"use strict";
function t(e,n,t){
$(".JS_TIPS").remove();
var i=$(template.compile('<div class="JS_TIPS page_tips {type}" id="wxTips_'+(new Date).getTime()+'"><div class="inner">{msg}</div></div>')({
type:e||"error",
msg:n
})).appendTo("body").fadeIn();
setTimeout(function(){
o(i),i=null;
},1e3*(t||s.delay));
}
function o(e){
e&&e.length>0&&"function"==typeof e.fadeOut&&e.fadeOut({
complete:function(){
e&&"function"==typeof e.remove&&e.remove(),e=null;
}
});
}
var i=n,s={
errMsg:"系统发生错误，请稍后重试",
sucMsg:"操作成功",
delay:2
};
i.err=function(e,n){
t("error",e||s.errMsg,n);
},i.suc=function(e,n){
t("success",e||s.sucMsg,n);
},i.remove=function(){
$(".JS_TIPS").remove();
};
});"use strict"
define("3rd/editor/common/cropImgCgi.js",["pages/modules/utils/cgi.js"],function(r,e,o){var t=r("pages/modules/utils/cgi.js")
return{getUrl:function(e){t.post({url:"/cgi-bin/cropimage?",data:{imgurl:e.imgurl,x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2}},function(r){r&&r.base_resp&&0==r.base_resp.ret&&r.imgurl?"function"==typeof e.onsuccess&&e.onsuccess({oriUrl:e.imgurl,url:r.imgurl,file_id:r.file_id||""}):"function"==typeof e.onerror&&e.onerror(r||{})},function(r){"function"==typeof e.onerror&&e.onerror({retcode:-2})})},getUrlMulti:function(e){for(var r={imgurl:e.imgurl,size_count:e.size.length},o=0,i=e.size.length;o<i;o++){var n=e.size[o]
r["size"+o+"_x1"]=n.x1,r["size"+o+"_y1"]=n.y1,r["size"+o+"_x2"]=n.x2,r["size"+o+"_y2"]=n.y2}t.post({url:"/cgi-bin/cropimage?action=crop_multi",data:r},function(r){r&&r.base_resp&&0==r.base_resp.ret&&r.result&&r.result.length==e.size.length?"function"==typeof e.onsuccess&&e.onsuccess({oriUrl:e.imgurl,result:r.result}):"function"==typeof e.onerror&&e.onerror(r||{})},function(r){"function"==typeof e.onerror&&e.onerror({retcode:-2})})}}})
define("3rd/editor/tpl/crop_img.tpl.js",[],function(s,a,i){return'<div class=\'js_crop_img_container\'>  <div class="js_crop_img_wrap img_edit_area" style="position:absolute;">    <div class="js_crop_area img_edit_wrp" style="overflow:hidden;">      <div class="js_img_scale_cover" style="position:absolute;background-color: #fff;" draggable="false">      </div>      <img src="{url}">      <div class="js_img_scale edui-editor-imagescale img_edit_scale" draggable="false"        style="display:block;z-index:500;">        <span draggable="false" class="edui-editor-imagescale-hand0"></span>        <span draggable="false" class="edui-editor-imagescale-hand2"></span>        <span draggable="false" class="edui-editor-imagescale-hand5"></span>        <span draggable="false" class="edui-editor-imagescale-hand7"></span>      </div>    </div>  </div>  <div class="js_tool_bar img_edit_toolbar">    <div class="weui-slider-box">      <div class="weui-slider">        <div class="js_drag_bar weui-slider__inner">          <div style="width: 0%;" class="js_progress weui-slider__track"></div>          <div style="left: 0%;" class="js_dot weui-slider__handler__wrp">            <div class="weui-slider__handler"></div>          </div>        </div>      </div>    </div>    <a class="js_ok btn btn_primary" href="javascript:;">完成</a>    <a class="js_cancel btn btn_default" href="javascript:;">放弃裁剪</a>  </div></div>'})
define("common/wx/mpEditor/common/eventbus.js",[],function(){
"use strict";
function n(n,e,t){
if(window.web2_eventBus){
var i=window.web2_eventBus;
if("function"==typeof t){
var o=n+"_callback";
i.$on(o,function(){
window.web2_eventBus.$off(o),t.apply(this,arguments);
});
}
i.$emit(n,e);
}
}
return{
fireEvent:n
};
});"use strict"
define("3rd/editor/plugin/wordcount.js",["3rd/editor/plugin/basePlugin.js","3rd/editor/common/domUtils.js","3rd/editor/tpl/wordCount.tpl.js","3rd/editor/common/no_editable.js"],function(t,e,n){var o=t("3rd/editor/plugin/basePlugin.js"),i=t("3rd/editor/common/domUtils.js").domUtils,d=t("3rd/editor/tpl/wordCount.tpl.js"),r=t("3rd/editor/common/no_editable.js")
return o.inherit({init:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this.initG(e)},initG:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this._g={timeoutId:null,requestId:null,curSeq:-1,app_id:e.app_id+""}},getName:function(){return"wordcount"},beforeSetContent:function(t,e,n){var o=2<arguments.length&&void 0!==n?n:{}
return this._g.curSeq=1*o.seq,t},addListener:function(){var t=this,e=this
this.editor.addListener("contentchange afterinserthtml",function(){t.wordcount({delay:500})}),this.editor.addListener("getWordCountContent",function(){return e.getWordCountContent()}),this.editor.addListener("ready",function(){i.on(this.body,"keyup",function(t){(t.keyCode||t.which)in{16:1,18:1,20:1,37:1,38:1,39:1,40:1}||e.wordcount({delay:500})})})},getWordCountContent:function(){var t=this.editor.getUeditor().body.cloneNode(!0)
$(t).find("."+r.unEditablClass).each(function(){$(this).remove()})
var e=t.textContent||""
return e=e&&e.replace(i.fillCharReg,"").replace(i.bookmarkFillCharReg,"").replace(/(\b|^)(\w)(\w*)(\b|$)/g,"#").replace(/\s/g,"")},handleDom:function(t){var e=0<arguments.length&&void 0!==t?t:{},n=$("#word_count_container")
e.show&&this.editor.fireEvent("is_use_editor")?n&&0!==n.length?n.find(".js_word_count").text(e.wordCount):$("#bot_bar_left_container").prepend(template.compile(d)({wordCount:e.wordCount})):e.show||n.remove()},updateSeq:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this._g.curSeq=1*e.seq},updateAppid:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this._g.app_id=e.app_id+""},wordcount:function(t){var n=this,e=0<arguments.length&&void 0!==t?t:{},o=void 0!==e.delay?1*e.delay:5e3
this._g.timeoutId&&(clearTimeout(this._g.timeoutId),this._g.timeoutId=null),this._g.timeoutId=setTimeout(function(){var t,e
t=n.getWordCountContent(),e=0,t&&(e=t.length),n.updateWordCount({contentLength:e,quoteContentLength:0})},o)},updateWordCount:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this.handleDom({show:!0,wordCount:e.contentLength+e.quoteContentLength})}})})
define("3rd/editor/tpl/wordCount.tpl.js",[],function(n,o,s){return'<span id="word_count_container" class="fold_tips">  正文字数<span class="fold_tips_value js_word_count">{wordCount}</span></span>'})
"use strict"
function _asyncToGenerator(t){return function(){var d=t.apply(this,arguments)
return new Promise(function(r,s){return function e(t,a){try{var i=d[t](a),n=i.value}catch(t){return void s(t)}if(!i.done)return Promise.resolve(n).then(function(t){e("next",t)},function(t){e("throw",t)})
r(n)}("next")})}}define("3rd/editor/plugin/multiple_tab.js",["3rd/editor/lsMessage.js","3rd/editor/plugin/basePlugin.js","pages/modules/dbCache/dbCache.js"],function(t,e,a){var i=t("3rd/editor/lsMessage.js"),n=t("3rd/editor/plugin/basePlugin.js"),r=t("pages/modules/dbCache/dbCache.js"),s="editor",d="multipetab",o=3e5,u=1e4
return n.inherit({init:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this.initG(e)},initG:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this._g={app_id:1*e.app_id,tabId:(new Date).getTime()+"_"+Math.random(),keepAliveTimeoutId:null,workerPath:e.workerPath||"/mpres/zh_CN/htmledition/3rd/editor/worker/plain/multipleTabWorker.js",sharedWorker:null,supportType:0,workerFunc:{},getLastTabDataCallbackFunc:[],workerInitTime:null,postMessageTime:null,checkDbTimeoutId:null,tabState:!0,getLastTabDataId:null,synDraftId:null,hasBindFocusEvent:!1,hasInitLsMessage:!1}},getName:function(){return"multipletab"},updateAppid:function(t){var e=0<arguments.length&&void 0!==t?t:{},a=!1
this._g.app_id<1&&1<1*e.app_id&&(a=!0),this._g.app_id=1*e.app_id,a&&this.initMultipleTab()},addListener:function(){var t=this
this.editor.addListener("ready",function(){t.bindEvent()})},bindEvent:function(){var t=this
this.editor.addListener("initMultipleTab",function(){t.initMultipleTab()})},activeStateChange:function(t){var e=0<arguments.length&&void 0!==t?t:{},a=this
if(a._g.tabState&&!e.isFocus){if(a.canUseDb()){a.editor.fireEvent("reportAddNum",69271,60,1)
var i=+new Date
a.getDbData().then(function(t){if(a.editor.fireEvent("reportAddNum",69271,61,new Date-i),t&&t.tabId!==a._g.tabId){a.editor.fireEvent("reportAddNum",69271,63,1)
var e=a.editor.fireEvent("getArticleListData")
try{e=JSON.parse(JSON.stringify(e))}catch(t){e={data:null}}a.setDbData({appmsgData:e.data})}})}this.editor.fireEvent("activeStateChange",{isFocus:!!e.isFocus})}else!a._g.tabState&&e.isFocus&&(a._g.getLastTabDataId&&clearTimeout(a._g.getLastTabDataId),a._g.getLastTabDataId=setTimeout(function(){a._g.tabState&&(a.editor.fireEvent("reportAddNum",65080,104,1),a.getLastTabData({callback:function(t){t&&t.data&&t.data.appmsgData&&"[object Array]"===Object.prototype.toString.call(t.data.appmsgData)&&(a._g.synDraftId&&clearTimeout(a._g.synDraftId),a._g.synDraftId=setTimeout(function(){a._g.tabState&&a.editor.fireEvent("syn_draft",{data:t.data.appmsgData})},0))}}))},500),this.editor.fireEvent("activeStateChange",{isFocus:!!e.isFocus}))
a._g.tabState=!!e.isFocus},getLastTabData:function(t){var e=this,a=0<arguments.length&&void 0!==t?t:{}
this.canUseWorker()?0<this._g.getLastTabDataCallbackFunc.length?this._g.getLastTabDataCallbackFunc.push(a.callback):(this._g.getLastTabDataCallbackFunc.push(a.callback),this._g.sharedWorker.port.postMessage({tabId:this._g.tabId,appId:this._g.app_id,func:"getLastTabData"})):this.canUseDb()?this.getDbData().then(function(t){t&&t.tabId!==e._g.tabId&&t.appmsgData&&a.callback({data:t})}):a.callback({data:null})},initMultipleTab:function(){var t=this
1<this._g.app_id&&0===this._g.supportType&&(this.editor.fireEvent("reportAddNum",69271,49,1),window.SharedWorker?(this.initSharedWorker(),this._g.checkDbTimeoutId&&(clearTimeout(this._g.checkDbTimeoutId),this._g.checkDbTimeoutId=null),this._g.checkDbTimeoutId=setTimeout(function(){t.editor.fireEvent("reportAddNum",69271,58,1),t.initDb()},u)):this.initDb(),this.initLsMessage())},initLsMessage:function(){var a=this
this._g.hasInitLsMessage||(this._g.hasInitLsMessage=!0,this._g.lsMessageFunc={getOtherTabId:function(t){var e=0<arguments.length&&void 0!==t?t:{}
e.data&&1*e.data.appId==1*a._g.app_id&&a._g.tabId!==e.data.tabId&&i.postMessage({scope:s,eventName:"getOtherTabIdCallback",data:{appId:a._g.app_id,tabId:a._g.tabId}})},getOtherTabIdCallback:function(t){var e=0<arguments.length&&void 0!==t?t:{}
e.data&&1*e.data.appId==1*a._g.app_id&&a._g.tabId!==e.data.tabId&&a.editor.fireEvent("reportAddNum","122443","11")}},i.onReceiveMessage({scope:s,func:function(t){var e=0<arguments.length&&void 0!==t?t:{}
e.scope===s&&a._g.lsMessageFunc[e.eventName]&&a._g.lsMessageFunc[e.eventName]({data:e.data})}}),i.postMessage({scope:s,eventName:"getOtherTabId",data:{appId:this._g.app_id,tabId:this._g.tabId}}))},initDb:function(){if(1<this._g.app_id&&0===this._g.supportType&&r.isSupported){this._g.supportType=2,this.editor.fireEvent("reportAddNum",69271,52,1)
var e=this.editor.fireEvent("getArticleListData")
try{e=JSON.parse(JSON.stringify(e))}catch(t){e={data:null}}this.setDbData({appmsgData:e.data}),this.bindFocusEvent()}},bindFocusEvent:function(){if(!this._g.hasBindFocusEvent){this._g.hasBindFocusEvent=!0
var t=this,e=t.editor.window,a=null,i=!1
t.activeStateChange({isFocus:!0}),this.editor.fireEvent("reportAddNum",65080,94,1)
var n="",r=""
void 0!==document.hidden?(n="hidden",r="visibilitychange"):void 0!==document.msHidden?(n="msHidden",r="msvisibilitychange"):void 0!==document.webkitHidden?(n="webkitHidden",r="webkitvisibilitychange"):void 0!==document.mozHidden&&(n="mozHidden",r="mozvisibilitychange"),n&&(t.editor.fireEvent("reportAddNum",65080,102,1),$(document).on(r,function(){document[n]&&o()})),$(window).on("focus",s),$(e).on("focus",s),$(window).on("blur",o),$(e).on("blur",o)
t.editor.addListener("before_add_article before_del_article focus mousedown keydown",d),t.editor.addListener("blur",o)}function s(){i||(t.editor.fireEvent("reportAddNum",65080,95,1),i=!0),d()}function d(){a&&(clearTimeout(a),a=null),t.activeStateChange({isFocus:!0})}function o(){a=a||setTimeout(function(){a=null,t._g.tabState&&("function"!=typeof document.hasFocus||!0!==document.hasFocus()&&!0!==t.editor.getDocument().hasFocus())&&t.activeStateChange({isFocus:!1})},200)}},setDbData:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this.canUseDb()&&(this.editor.fireEvent("reportAddNum",69271,69,1),r.isUsable()||this.editor.fireEvent("reportAddNum",69271,70,1),r.set({data:{cacheKey:this.getCacheKey(),cacheValue:{tabId:this._g.tabId,appmsgData:e.appmsgData},expireTime:this.getDbDataExpireTime()}}))},getDbData:function(){var n=this
return _asyncToGenerator(regeneratorRuntime.mark(function t(){var e,a,i
return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=null,t.prev=1,2===n._g.supportType)return n.editor.fireEvent("reportAddNum",69271,69,1),r.isUsable()||n.editor.fireEvent("reportAddNum",69271,70,1),t.next=7,r.get({cacheKey:n.getCacheKey()})
t.next=10
break
case 7:a=t.sent,i=+new Date,a&&a.cacheValue&&a.expireTime>i&&(e=a.cacheValue)
case 10:t.next=15
break
case 12:t.prev=12,t.t0=t.catch(1),e=null
case 15:return t.abrupt("return",e)
case 16:case"end":return t.stop()}},t,n,[[1,12]])}))()},initSharedWorker:function(){var e=this
if(1<this._g.app_id&&!this._g.sharedWorker){if(!window.SharedWorker)return
this._g.workerInitTime=+new Date,this.initWorkerFunc(),this._g.sharedWorker=new SharedWorker(this._g.workerPath),this._g.sharedWorker.port.addEventListener("message",function(t){t.data&&t.data.appId&&t.data.tabId&&t.data.func&&"function"==typeof e._g.workerFunc[t.data.func]&&e._g.workerFunc[t.data.func]({data:t.data.data,tabId:t.data.tabId,appId:t.data.appId})}),this._g.sharedWorker.port.start(),this._g.sharedWorker.port.postMessage({tabId:this._g.tabId,appId:this._g.app_id,func:"register"})}},initWorkerFunc:function(){var r=this
this._g.workerFunc={getAppmsgData:function(t){var e=0<arguments.length&&void 0!==t?t:{}
if(1*e.appId==1*r._g.app_id&&r._g.tabId!==e.tabId){var a=r.editor.fireEvent("getArticleListData")
try{a=JSON.parse(JSON.stringify(a))}catch(t){a={data:null}}r._g.sharedWorker.port.postMessage({func:"setAppmsgData",tabId:r._g.tabId,appId:e.appId,data:{appmsgData:a.data}})}},getLastTabDataCallback:function(t){var e=0<arguments.length&&void 0!==t?t:{}
if(1*e.appId==1*r._g.app_id&&r._g.tabId===e.tabId){for(var a=0,i=r._g.getLastTabDataCallbackFunc.length;a<i;a++){var n=r._g.getLastTabDataCallbackFunc[a]
"function"==typeof n&&n({data:e.data})}r._g.getLastTabDataCallbackFunc=[]}},registed:function(t){var e=0<arguments.length&&void 0!==t?t:{}
if(1*e.appId==1*r._g.app_id&&r._g.tabId===e.tabId){if(0<r._g.workerInitTime){var a=new Date-r._g.workerInitTime
r.editor.fireEvent("reportAddNum",69271,54,a)}r._g.checkDbTimeoutId&&(clearTimeout(r._g.checkDbTimeoutId),r._g.checkDbTimeoutId=null),r._g.supportType=1,r.editor.fireEvent("reportAddNum",69271,50,1),r._g.keepAliveTimeoutId=setTimeout(function(){r.keepTabAlive()},o),r._g.postMessageTime=+new Date,r._g.sharedWorker.port.postMessage({func:"testMessageTime",tabId:r._g.tabId,appId:e.appId,data:{}}),r.bindFocusEvent()}},testMessageTimeCallback:function(t){var e=0<arguments.length&&void 0!==t?t:{}
1*e.appId==1*r._g.app_id&&r._g.tabId===e.tabId&&0<r._g.postMessageTime&&r.editor.fireEvent("reportAddNum",69271,56,new Date-r._g.postMessageTime)}}},keepTabAlive:function(){var t=this
this._g.keepAliveTimeoutId&&(clearTimeout(this._g.keepAliveTimeoutId),this._g.keepAliveTimeoutId=null),this.canUseWorker()&&(this._g.sharedWorker.port.postMessage({func:"keepTabAlive",tabId:this._g.tabId,appId:this._g.app_id}),this._g.keepAliveTimeoutId=setTimeout(function(){t.keepTabAlive()},o))},canUseWorker:function(){return 1<this._g.app_id&&1===this._g.supportType},canUseDb:function(){return 1<this._g.app_id&&2===this._g.supportType},getDbDataExpireTime:function(){return 864e5+(new Date).getTime()},getCacheKey:function(){return d+"_"+this._g.app_id}})})
"use strict"
define("3rd/editor/lsMessage.js",[],function(e,t,o){var p={lsEventKey:"__mpLSEvent",supported:!1,postQueue:{},receiveQueue:{},postId:null}
try{"localStorage"in window&&window.localStorage&&(p.supported=!0)}catch(e){}return p.supported&&window.addEventListener("storage",function(e){if(e.key===p.lsEventKey){var t=(e.storageArea||window.localStorage).getItem(e.key)
if(t){var o=[]
try{o=JSON.parse(t)}catch(e){return}if("[object Array]"===Object.prototype.toString.call(o))for(var r=0,a=o.length;r<a;r++){var n=o[r]
if(n.scope&&p.receiveQueue[n.scope])for(var s=0,u=p.receiveQueue[n.scope].length;s<u;s++){var i=p.receiveQueue[n.scope][s]
"function"==typeof i&&i({eventName:n.eventName,scope:n.scope,data:n.data})}}}}}),{onReceiveMessage:function(e){var t=0<arguments.length&&void 0!==e?e:{},o=t.scope
o=o||"*",p.receiveQueue[o]||(p.receiveQueue[o]=[]),p.receiveQueue[o].push(t.func)},postMessage:function(e){var t=0<arguments.length&&void 0!==e?e:{}
p.supported&&(function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.eventName){var o=t.scope
o=o||"*",p.postQueue[o]||(p.postQueue[o]=[])
for(var r=-1,a=0,n=p.postQueue[o].length;a<n;a++){var s=p.postQueue[o][a]
if(s.eventName===t.eventName){s.dataArr.push(t.data),r=a
break}}-1===r&&p.postQueue[o].push({eventName:t.eventName,dataArr:[t.data]})}}(t),p.postId&&clearTimeout(p.postId),p.postId=setTimeout(function(){for(var e in p.postQueue){if(!Object.prototype.hasOwnProperty.call(p.postQueue,e))return
var t=p.postQueue[e].shift()
if(t.eventName&&0<t.dataArr.length)try{for(var o=[],r=0,a=t.dataArr.length;r<a;r++)o.push({eventName:t.eventName,scope:e,data:t.dataArr[r]})
JSON.stringify(o)===window.localStorage.getItem(p.lsEventKey)&&window.localStorage.setItem(p.lsEventKey,""),window.localStorage.setItem(p.lsEventKey,JSON.stringify(o))}catch(e){}0===p.postQueue[e].length&&delete p.postQueue[e]}},0))}}})
define("3rd/editor/plugin/insertcode/insertcode.js",["3rd/editor/plugin/basePlugin.js","3rd/editor/common/utils.js","3rd/editor/common/domUtils.js","3rd/editor/common/browser.js","3rd/editor/common/dtd.js","3rd/editor/plugin/insertcode/shCore.js","3rd/editor/plugin/insertcode/insertCodeUtils.js","vue-weui/src/utils/string.js"],function(e,t,n){"use strict"
var r=e("3rd/editor/plugin/basePlugin.js"),v=e("3rd/editor/common/utils.js").utils,B=e("3rd/editor/common/domUtils.js").domUtils,o=e("3rd/editor/common/browser.js").browser,i=e("3rd/editor/common/dtd.js").dtd,L=e("3rd/editor/plugin/insertcode/shCore.js"),E=e("3rd/editor/plugin/insertcode/insertCodeUtils.js"),m=e("vue-weui/src/utils/string.js"),a={undo:1,redo:1,insertcode:1,inserthtml:1,selectall:1},l=r.inherit({init:function(){this.initG()},initG:function(){this._g={curSelectPre:null,scrollIntoViewId:null,scrollXId:null,canScrollX:!0}},getType:function(){return 1},hideButtonWhenInit:function(){return!0},getTitle:function(){return"fire_getinsertcodetitle"},getName:function(){return"insertcode"},getExecCommand:function(){var s=this
return function(e){if(s.editor){var m=this,f=m.selection.getRange(),t="",u=s.getCodeBlockDom(f.startContainer)
if(u){var v=s.getLineByRang(f)
0<v.length&&function(){m.fireEvent("saveScene")
for(var r=f.createBookmark(!0),i={id:!0},e=m.document.createDocumentFragment(),t=void 0,n=0,a=v.length;n<a;n++){var o=v[n],l=""
l="body"===u.parentNode.nodeName.toLowerCase()?"p":"section"
var d=m.document.createElement(l),s=o.textContent
s=s.html(!0).replace(B.bookmarkFillCharReg,function(e){if(r.start){delete r.start
var t=B.createBookmarkNode(m.document,Math.random())
return i.start=t.id,t.outerHTML}if(r.end){delete r.end
var n=B.createBookmarkNode(m.document,Math.random())
return i.end=n.id,n.outerHTML}}),d.innerHTML=s,e.appendChild(d)}var c=v[v.length-1]
if(c.nextSibling&&c.nextSibling.nodeName.toLowerCase()===E.lineTagName){for(t=u.cloneNode(!1);c.nextSibling&&c.nextSibling.nodeName.toLowerCase()===E.lineTagName;)t.appendChild(c.nextSibling)
e.appendChild(t)}for(var g=0,h=v.length;g<h;g++)v[g].parentNode.removeChild(v[g])
u.parentNode.insertBefore(e,u.nextSibling),0<u.getElementsByTagName(E.lineTagName).length?m.fireEvent("blurPre",u,!0):u.parentNode.removeChild(u),t&&m.fireEvent("blurPre",t,!0),f.moveToBookmark(i).select(),m.fireEvent("saveScene"),m.fireEvent("reportAddNum",69271,30,1)}()}else{var n=""
if(f.collapsed)n=E.getCodeLineStr(B.fillChar),m.fireEvent("reportAddNum",69271,28,1)
else{var r=f.extractContents(),i=m.document.createElement("div")
if(i.appendChild(r),n=s.parseHtml2String(i.innerHTML)){var a=L.highlightStr(n,"",m.document)
a.result.language&&(t=a.result.language),n=a.result.value,m.fireEvent("reportAddNum",69271,29,1)}else n=E.getCodeLineStr(B.fillChar),m.fireEvent("reportAddNum",69271,28,1)}var o=E.getCodeBlockStr(n,t),l=m.execCommand("inserthtml",o,!0)
if(l&&l[0]){u=l[0],s._g.curSelectPre=u
var d=s.getLastLineLastElement(u)
d&&f.selectNodeContents(d).collapse(!1).select()}}}}},getQueryCommandValue:function(){var a=this
return function(e,t){if(a.editor){var n=this.selection.getRange(),r=a.getCodeBlockDom(n.startContainer),i=void 0
return r&&(i=r.getAttribute(E.languageAttr)||""),i}}},addListener:function(){var r=this
this.editor.addListener("getinsertcodetitle",function(e){return r._g.curSelectPre?"取消代码":"插入代码"}),this.editor.addListener("isInCodeBlockVirtual",function(e,t){if(!t||"text"!==t.type&&"element"!==t.type||"element"===t.type&&t.tagName!==E.codeBlockTagName&&t.tagName!==E.lineTagName&&t.tagName!==E.lineContainTagName)return!1
for(var n,r=t;r&&"root"!==r.type;){if(!0==!!((n=r)&&"element"===n.type&&n.tagName===E.codeBlockTagName&&0<=(n.getAttr("class")||"").indexOf(E.codeBlockClass)))return!0
r=r.parentNode}return!1}),this.editor.addListener("ready",function(){if(v.isSupportWalker()){var e=r.editor.getUi().buttons[r.getName()]
if(e&&"function"==typeof e.getDom){var t=e.getDom()
t&&(t.style.display="")}var n=this.queryCommandState
this.queryCommandState=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}
if(e===r.getName()&&t.allDomInRange&&t.allDomInRange[0]&&2===B.isContentEditable({node:t.allDomInRange[0],checkParent:!1}))return-1
if(this.selection&&void 0!==this.queryCommandValue("insertcode")){if(!a[e.toLowerCase()])return-1
if(e===r.getName())return 1}else if(e===r.getName())return 0
return n.apply(this,arguments)},r.bindEvent(),r.addFilterRule()}})},getPluginData:function(e){var t=e.init(),n=t.get("content")
if(n){var r=$("<div></div>"),i=E.codeBlockTagName,a=E.codeBlockClass,o=E.lineTagName,l=E.lineContainTagName,d=E.lineContainStartTag,s=E.lineContainEndTag,c=[]
r.html(n).find(i+"."+a).each(function(){var e=$(this)
e.removeAttr("style")
var t=e.find(o)
0===t.length?e.append(E.getCodeLineStr("br")):t.each(function(){var e=this
if(0===e.childNodes.length||1<e.childNodes.length||1===e.childNodes.length&&(1!==e.firstChild.nodeType||e.firstChild.nodeName.toLowerCase()!==l||-1===e.firstChild.className.indexOf(E.lineContainClass))){var t=e.ownerDocument.createElement(l)
for(t.className=E.lineContainClass;e.firstChild;)t.appendChild(e.firstChild)
e.appendChild(t)}e.textContent.replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")||(e.innerHTML=d+"<br>"+s)}),c.push({codeBlock:this})})
for(var g=0,h=c.length;g<h;g++){var m=c[g].codeBlock,f=$(m).find(o).length
if(0!==f){var u=m.ownerDocument,v=u.createElement(E.outputMainTagName)
v.className=E.outputMainClass+" "+E.codeBlockClass
var C=u.createElement(E.outputLineMainTagName)
C.className=E.outputLineMainClass+" "+E.codeBlockClass,v.appendChild(C),m.parentNode.insertBefore(v,m),v.appendChild(m),m.className=E.codeBlockClass
for(var p=0;p<f;p++)C.appendChild(u.createElement(E.outputLineItemTagName))}}t.set("content",r.html())}},reportCodeBolckEdit:function(){this.editor.fireEvent("reportAddNum",69271,32,1)},addFilterRule:function(){var l=E.codeBlockTagName,d=E.codeBlockClass,s=E.lineTagName,c=E.lineContainTagName,g=E.lineContainStartTag,h=E.lineContainEndTag,e=this.editor.getUeditor()
e.addInputNativeNodeRule(function(e){for(var t=e.getElementsByTagName("pre"),n=0,r=t.length;n<r;n++){var i=t[n],a=i.innerHTML;/\n/.test(a)&&(i.innerHTML=a.replace(/\n/g,"<br>"))}}),e.addInputRule(function(e){var i=[]
v.each(e.getNodesByTagName(l),function(e){var t=e.getAttr("class")||""
if(e.tagName==l&&0<=t.indexOf(d)){e.setAttr("style",""),e.setAttr("class",d+" "+E.inputCodeBlockClass),v.each(e.getNodesByTagName("br"),function(e){e.parentNode.removeChild(e)})
var n=e.getNodesByTagName(s)
if(0===n.length){var r=UE.uNode.createElement(E.getCodeLineStr())
e.appendChild(r)}else v.each(n,function(e){if(0===e.children.length||1<e.children.length||1===e.children.length&&("element"!==e.children[0].type||e.children[0].tagName!==c||e.children[0].getAttr("class")!==E.lineContainClass)){var t=UE.uNode.createElement(c)
for(t.setAttr("class",E.lineContainClass);e.firstChild();)t.appendChild(e.firstChild())
e.appendChild(t)}m.html(e.innerText(),!1).replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")||e.innerHTML(g+h)})
i.push({codeBlock:e})}})
for(var t=0,n=i.length;t<n;t++){var r=i[t].codeBlock,a=r.parentNode,o=a?a.getAttr("class"):""
a.parentNode&&o&&(0<=o.indexOf(d)||0<=o.indexOf(E.outputMainClass))&&(a.parentNode.insertBefore(r,a),a.parentNode.removeChild(a))}v.each(e.getNodesByTagName(E.outputLineMainTagName),function(e){var t=e.getAttr("class")||""
t&&(0<=t.indexOf(d)||0<=t.indexOf(E.outputLineMainClass))&&e.parentNode.removeChild(e)})})},bindEvent:function(){var C=this
this.editor.addListener("afterscencerestore aftersetcontent afterpaste",function(e,t,n){var r=[],i=this.document
"afterpaste"===e&&n&&0<n.length?v.each(n,function(e){if(e)if(e.nodeName.toLowerCase()===E.codeBlockTagName&&0<=e.className.indexOf(E.codeBlockClass))r.push(e)
else if(1==e.nodeType){var t=e.getElementsByTagName(E.codeBlockTagName)
v.each(t,function(e){r.push(e)})}}):r=i.getElementsByTagName(E.codeBlockTagName)
for(var a=0,o=r.length;a<o;a++){var l=r[a]
if(l=C.getCodeBlockDom(l)){for(var d=l.getElementsByTagName("br"),s=0,c=d.length;s<c;s++)d[s].parentNode.removeChild(d[s])
for(var g=l.getElementsByTagName(E.lineTagName),h=0,m=g.length;h<m;h++){var f=g[h]
if(!f.textContent.replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")){var u=f.ownerDocument.createElement("div")
u.innerHTML=E.getCodeLineStr(),f.innerHTML=u.firstChild.innerHTML}}}}setTimeout(function(){C.scrollXIntoView()},100)}),this.editor.addListener("beforeinserthtml",function(e,t){var n=this.selection.getRange()
if(C.getCodeBlockDom(n.startContainer)){var r=C.parseHtml2String(t)
return C.insertHighlight2Range(r,n),this.fireEvent("saveScene"),!0}}),this.editor.addListener("beforeenterkeydown",function(){var e=this.selection.getRange(),t=C.getCodeBlockDom(e.startContainer)
if(t){this.fireEvent("saveScene")
var n=B.findParentByTagName(e.startContainer,E.lineTagName,!0),r=""
if(n){var i=e.createBookmark()
r=n.textContent.split(B.bookmarkFillChar)[0]||""
var a=new RegExp("^([\\s"+B.fillChar+"]+)([^\\s"+B.fillChar+"]|$)"),o=r.match(a)
r=o&&o[0]?o[0].replace(a,"$1").replace(/\t/g,E.tabSize).replace(B.fillCharReg,""):"",e.moveToBookmark(i)}return C.insertHighlight2Range("\n"+r,e),this.fireEvent("saveScene"),C.reportCodeBolckEdit(t),!0}}),this.editor.addListener("selectionchange",function(e,t){if(t){var n=this.selection.getRange(),r=C.getCodeBlockDom(n.startContainer);(r&&C._g.curSelectPre!==r&&C._g.curSelectPre||!r&&C._g.curSelectPre)&&this.fireEvent("blurPre",C._g.curSelectPre),C._g.curSelectPre=r||null}}),this.editor.addListener("onpasting",function(e,t){var n=this,r=(t.clipboardData?t.clipboardData:t.originalEvent&&t.originalEvent.clipboardData?t.originalEvent.clipboardData:{}).items
if(r&&0<r.length){var i=this.selection.getRange()
if(C.getCodeBlockDom(i.startContainer)){for(var a=void 0,o=0,l=r.length;o<l;o++)if("text/plain"===r[o].type){a=r[o]
break}if(a){var d=[+new Date]
return a.getAsString(function(e){e&&(n.fireEvent("saveScene"),d.push(+new Date),C.insertHighlight2Range(e,i),d.push(+new Date),n.fireEvent("saveScene"),n.fireEvent("reportAddNum",69271,31,1))}),!0}}}}),this.editor.addListener("heightChanged",function(){C._g.scrollIntoViewId&&clearTimeout(C._g.scrollIntoViewId)
var n=this
C._g.scrollIntoViewId=setTimeout(function(){var e=n.selection.getRange()
if(C.getCodeBlockDom(e.startContainer)){var t=e.startContainer
1*t.nodeType!=1&&(t=t.parentNode),n.fireEvent("scrollIntoView",t)}},100)}),this.editor.addListener("tabkeydown",function(e,t){var n=this,r=n.selection.getRange(),i=C.getCodeBlockDom(r.startContainer)
if(i){var a=!1
if(n.fireEvent("saveScene"),t.shiftKey){var o=C.getLineByRang(r)
if(0<o.length){for(var l=r.createBookmark(),d=0,s=o.length;d<s;d++)C.deletePreTab(o[d])
r.moveToBookmark(l),r.select(),a=!0}}else if(r.collapsed)C.insertTabByCollapseRange(r),a=!0
else{var c=C.getLineByRang(r)
if(1===c.length)C.deleteRangeContents(r),C.insertTabByCollapseRange(r),a=!0
else if(1<c.length){for(var g=r.createBookmark(),h=n.document.createTextNode(E.tabSize),m=0,f=c.length;m<f;m++){var u=c[m]
if(u.firstChild)u.firstChild.insertBefore(h.cloneNode(!0),u.firstChild.firstChild)
else{var v=n.document.createElement(E.lineContainTagName)
v.className=E.lineContainClass,v.appendChild(h.cloneNode(!0)),u.appendChild(v)}}r.moveToBookmark(g).select(),a=!0}}if(n.fireEvent("saveScene"),a)return C.reportCodeBolckEdit(i),!0}}),this.editor.addListener("keydown",function(e,t){var n=t.keyCode||t.which,r=this.selection.getRange(),i=C.getCodeBlockDom(r.startContainer)
if(i)if(40==n)C.handleDownKeydown(t,r,i)
else if(38==n)C.handleUpKeydown(t,r,i)
else if(8==n){if(!0===C.handleBackKeydown(t,r))return C.reportCodeBolckEdit(i),!0}else if(46==n){if(!0===C.handleDelKeydown(t,r))return C.reportCodeBolckEdit(i),!0}else if(32==n)this.fireEvent("saveScene")
else if(65==n&&(t.ctrlKey||t.metaKey)){if(!0===C.handleSelectAll(t,r,i))return!0}}),this.editor.addListener("keyup",function(e,t){var n=t.keyCode||t.which,r=this.selection.getRange(),i=C.getCodeBlockDom(r.startContainer)
if(i&&32==n){var a=B.findParentByTagName(r.startContainer,E.lineTagName,!0)
if(!a)return
var o=r.createBookmark(!0)
C.mergeCommentLine(a),r.moveToBookmark(o),C.highlightCurLine(a.firstChild,r),this.fireEvent("saveScene")}i&&C.scrollXIntoView()}),this.editor.addListener("blur",function(e){C._g.curSelectPre&&this.fireEvent("blurPre",C._g.curSelectPre),C._g.curSelectPre=null}),this.editor.addListener("blurPre",function(e,t,n){if(t=C.getCodeBlockDom(t)){var r=t.getAttribute(E.languageAttr)||""
if(r){for(var i=[],a=[],o=0,l=t.children.length;o<l;o++){var d=t.children[o]
i.push(d),a.push(d.textContent||"")}if((a=a.join("\n")).replace(/\n/g,"").replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")){var s=t.ownerDocument,c=L.highlightStr(a,r,s,!1),g=s.createElement(E.codeBlockTagName)
g.innerHTML=c.result.value
for(var h=[],m=0,f=g.children.length;m<f;m++)h.push(g.children[m])
n||this.fireEvent("saveScene"),C.updateLine(i,h),n||this.fireEvent("saveScene")}}}})},handleSelectAll:function(e,t,n){var r=n.firstChild,i=n.lastChild
if(r&&i&&r.nodeName.toLowerCase()===i.nodeName.toLowerCase()&&r.nodeName.toLowerCase()===E.lineTagName){var a=r.firstChild?r.firstChild.firstChild:null,o=i.lastChild?i.lastChild.lastChild:null
if(a&&o)return t.setStartBefore(a),t.setEndAfter(o),t.select(),B.preventDefault(e),!0}},handleUpKeydown:function(e,t,n){var r=this.editor.getUeditor(),i=B.findParentByTagName(t.startContainer,E.lineTagName,!0)
if(i&&!i.previousSibling&&!n.previousSibling){r.fireEvent("saveScene")
var a=n.ownerDocument.createElement("p")
a.innerHTML=o.ie&&o.ie11below?B.fillChar:"<br>",n.parentNode.insertBefore(a,n),t.selectNodeContents(a).collapse(!0).select(),r.fireEvent("saveScene"),B.preventDefault(e)}},handleDownKeydown:function(e,t,n){var r=this.editor.getUeditor(),i=B.findParentByTagName(t.startContainer,E.lineTagName,!0)
if(i&&!i.nextSibling&&!n.nextSibling){r.fireEvent("saveScene")
var a=n.ownerDocument.createElement("p")
a.innerHTML=o.ie&&o.ie11below?B.fillChar:"<br>",n.parentNode.appendChild(a),t.selectNodeContents(a).collapse(!0).select(),r.fireEvent("saveScene"),B.preventDefault(e)}},handleBackKeydown:function(e,t){var n=this.editor.getUeditor(),r=!1
if(t.collapsed){var i=B.findParentByTagName(t.startContainer,E.lineTagName,!0)
if(!i)return
var a=t.createBookmark(),o=i.textContent
t.moveToBookmark(a)
var l=i.parentNode
if(1===l.childNodes.length&&!o.replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")){var d=l.previousSibling
return d?(n.fireEvent("saveScene"),t.selectNodeContents(d).collapse(!1).select(),B.preventDefault(e),n.fireEvent("saveScene")):this.handleUpKeydown(e,t,l),l.parentNode.removeChild(l),r=!0}var s=B.createBookmarkNode(n.document,Math.random()),c=n.document.createElement(E.codeBlockTagName)
c.innerHTML=E.getCodeLineStr(B.fillChar+s.outerHTML)
var g=c.firstChild,h={id:s.id,start:s.id},m=new RegExp("[^"+B.fillChar+"]["+B.fillChar+"]*"+B.bookmarkFillChar,"m"),f=void 0,u="##__insertcode_tmp_char__##"
m.test(o)?(n.fireEvent("saveScene"),i.innerHTML=o.replace(m,u).html(!0).replace(u,g.innerHTML),t.moveToBookmark(h),this.resetLanguage(t.startContainer),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0):(f=i.previousSibling)&&(n.fireEvent("saveScene"),o=f.textContent+"\n"+o,f.parentNode.removeChild(f),i.innerHTML=o.replace(m,u).html(!0).replace(u,g.innerHTML),t.moveToBookmark(h),this.resetLanguage(t.startContainer),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0)}else n.fireEvent("saveScene"),this.deleteRangeContents(t),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0
if(r)return B.preventDefault(e),!0},handleDelKeydown:function(e,t){var n=this.editor.getUeditor(),r=!1
if(t.collapsed){var i=t.createBookmark(),a=B.findParentByTagName(t.startContainer,E.lineTagName,!0)
if(!a)return
var o=a.textContent
t.moveToBookmark(i)
var l=B.createBookmarkNode(n.document,Math.random()),d=n.document.createElement(E.codeBlockTagName)
d.innerHTML=E.getCodeLineStr(l.outerHTML+B.fillChar)
var s=d.firstChild,c={id:l.id,start:l.id},g=new RegExp(B.bookmarkFillChar+"["+B.fillChar+"]*[^"+B.fillChar+"]","m"),h=void 0,m="##__insertcode_tmp_char__##"
g.test(o)?(n.fireEvent("saveScene"),a.innerHTML=o.replace(g,m).html(!0).replace(m,s.innerHTML),t.moveToBookmark(c),this.resetLanguage(t.startContainer),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0):(h=a.nextSibling)&&(n.fireEvent("saveScene"),o=o+"\n"+h.textContent,h.parentNode.removeChild(h),a.innerHTML=o.replace(g,m).html(!0).replace(m,s.innerHTML),t.moveToBookmark(c),this.resetLanguage(t.startContainer),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0),r=!0}else n.fireEvent("saveScene"),this.deleteRangeContents(t),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0
if(r)return B.preventDefault(e),!0},parseHtml2String:function(e){var r=""
if(!e)return r
var t=this.editor.getUeditor()
return e=e.replace(/\r/g,"").replace(/\t/g,E.tabSize),v.each(UE.filterNode(UE.htmlparser(e),t.options.filterTxtRules).children,function(e){var t=""
t="element"==e.type?i.$empty[e.tagName]?"":(t=e.innerHTML().replace(/<br[^>]*>/g,"\n").text(),m.html(t,!1)):m.html(e.data,!1),r+=t
var n=e.nextSibling()
n&&"element"==n.type&&(i.$block2[n.tagName]||"br"===n.tagName)&&(r+="\n")}),r},scrollXIntoView:function(){this._g.scrollXId&&clearTimeout(this._g.scrollXId)
var s=this
this._g.scrollXId=setTimeout(function(){var e=null,t=s.editor.getUeditor().selection.getRange(),n=s.getCodeBlockDom(t.startContainer)
if(n&&t.collapsed){var r=B.findParentByTagName(t.startContainer,E.lineTagName,!0)
if(r&&r.firstChild){var i=$(r.firstChild.lastElementChild)
if(0<n.scrollLeft||0<i.length&&i.offset().left+i.width()>$(n).width()){var a=t.createBookmark()
a.start.style.display="",e=a.start.getBoundingClientRect().left-r.getBoundingClientRect().left-n.getBoundingClientRect().left,t.moveToBookmark(a)}}}if(null!==e){var o=n.scrollLeft,l=n.scrollLeft+$(n).width(),d=Math.max(e-20,0)
s._g.canScrollX&&n&&B.inDoc(n,n.ownerDocument)&&!(o<e&&e<l)&&d!==n.scrollLeft&&(s._g.canScrollX=!1,$(n).animate({scrollLeft:d},null,null,function(){s._g.canScrollX=!0}))}},100)},insertTabByCollapseRange:function(e){var t=this,n=e.document.createTextNode(E.tabSize)
e.insertNode(n).setStartAfter(n).collapse(!1),B.findParent(n,function(e){if(t.isCommentNode(e))return!0})?e.select():this.highlightCurLine(n,e)},deletePreTab:function(e){for(var t=e.ownerDocument.createTreeWalker(e,window.NodeFilter.SHOW_TEXT,{acceptNode:function(e){return e.nodeValue&&0<e.nodeValue.replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"").length?window.NodeFilter.FILTER_ACCEPT:window.NodeFilter.FILTER_REJECT}},!1),n=[],r=new RegExp("^["+B.fillChar+"]* ["+B.fillChar+"]*"),i=0;t.nextNode()&&i<2;){for(var a=t.currentNode.nodeValue;r.test(a)&&i<2;)a=a.replace(r,""),i++
if(a!==t.currentNode.nodeValue&&n.push({node:t.currentNode,text:a}),0===n.length)break}for(var o=[],l=0,d=n.length;l<d;l++){var s=n[l]
if(s.node&&s.node.parentNode){var c=s.node.ownerDocument.createTextNode(s.text),g=s.node.parentNode
g.insertBefore(c,s.node),g.removeChild(s.node),o.push(c)}}return o},getLineByRang:function(e){var t=[],n=B.findParentByTagName(e.startContainer,E.lineTagName,!0),r=B.findParentByTagName(e.endContainer,E.lineTagName,!0)
if(!n||!r)return t
if(t.push(n),n===r)return t
for(var i=n;(i=i.nextSibling)&&1===i.nodeType&&i!==r;)t.push(i)
return t.push(r),t},highlightCurLine:function(e,t){var n={result:{language:"",relevance:0}}
if(!e)return n
var r=B.findParentByTagName(e,E.lineTagName,!0)
if(!r)return n
var i=this.getCodeBlockDom(r)
if(!i)return n
if(r.textContent){var a=!1
if(t){var o=B.findParentByTagName(t.startContainer,E.lineTagName,!0),l=B.findParentByTagName(t.endContainer,E.lineTagName,!0)
o===r&&l===r&&(a=!0)}var d=void 0
a&&(d=t.createBookmark())
var s=this.getCommentSibling(r,!0,!0),c=this.editor.getUeditor().document,g=i.getAttribute(E.languageAttr)||"";(n=L.highlightStr(s.nodeText,g,c,a)).result.language&&!g&&i.setAttribute(E.languageAttr,n.result.language)
var h=c.createElement(E.codeBlockTagName)
h.innerHTML=n.result.value
for(var m=[],f=0,u=h.children.length;f<u;f++)m.push(h.children[f])
var v=m[s.pre.length],C=this.getFirstElementChild(v),p=v.textContent.replace(B.fillCharReg,"")
if(a&&!p&&(!n.bookmark||!n.bookmark.startid)){var N=B.createBookmarkNode(c,Math.random())
C.appendChild(N),C.appendChild(c.createTextNode(B.fillChar)),d.id=N.id,d.start=N.id}return this.updateLine(s.nodeList,m),a&&(!d.id&&n.bookmark&&n.bookmark.startid&&(d.id=n.bookmark.startid,d.start=n.bookmark.startid),!d.id&&n.bookmark&&n.bookmark.endid&&(d.end=n.bookmark.endid),t.moveToBookmark(d).select()),n}},updateLine:function(e,t){if(e&&t&&e.length===t.length)for(var n=0,r=e.length;n<r;n++){var i=e[n],a=t[n]
i.innerHTML!==a.innerHTML&&(i.parentNode.insertBefore(a,i),i.parentNode.removeChild(i))}},getCommentSibling:function(e,t,n){var r={cur:e,pre:[],next:[],nodeText:"",nodeList:[]}
if(!e||e.nodeName.toLowerCase()!==E.lineTagName)return r
for(var i=e;i=i.previousSibling;){var a=i.firstChild
if(!(a&&a.children&&1===a.children.length&&this.isCommentNode(a.children[0])))break
r.pre.push(i),(n||t)&&r.nodeList.push(i)}for((n||t)&&(r.nodeList.reverse(),r.nodeList.push(e)),i=e;i=i.nextSibling;){var o=i.firstChild
if(!(o&&o.children&&1===o.children.length&&this.isCommentNode(o.children[0])))break
r.next.push(i),(n||t)&&r.nodeList.push(i)}if(t){for(var l=[],d=0,s=r.nodeList.length;d<s;d++){var c=r.nodeList[d]
l.push(c.textContent||"")}r.nodeText=l.join("\n")}return r},insertHighlight2Range:function(e,t,n){if(e){var r=this.getCodeBlockDom(t.startContainer)
if(r){this.deleteRangeContents(t)
var i=r.getAttribute(E.languageAttr)||"",a=L.highlightStr(e,i,r.ownerDocument),o=a.result.value
a.result.language&&(i=a.result.language,r.setAttribute(E.languageAttr,a.result.language))
var l=B.findParentByTagName(t.startContainer,E.lineTagName,!0),d=this.getFirstElementChild(l)
if(l&&B.inDoc(l,l.ownerDocument)&&d){var s=this.editor.getUeditor(),c=this.createFragmentByStr(o,s.document),g=this.getFirstElementChild(c),h=this.getFirstElementChild(g),m=h.firstChild
m||(m=s.document.createTextNode(B.fillChar),h.appendChild(m))
var f=this.getLastElementChild(c),u=this.getLastElementChild(f),v=u.lastChild
v||(v=s.document.createTextNode(B.fillChar),u.appendChild(v))
var C=t.createBookmark(!1)
this.mergeFromeStart2End(C.start,d,h,"pre"),this.mergeFromeStart2End(C.end||C.start,d,u,"next")
var p=void 0,N=void 0,k=void 0
g!==f&&(u.insertBefore(B.createBookmarkNode(s.document,Math.random()),v.nextSibling),p=(N=L.highlightStr(f.textContent,i||"",s.document,!0)).bookmark,k=this.createFragmentByStr(N.result.value,s.document),c.appendChild(k),c.removeChild(f))
var T=void 0
return p&&p.startid||(T=B.createBookmarkNode(s.document,Math.random()),u.insertBefore(T,v.nextSibling)),(N=L.highlightStr(g.textContent,i||"",s.document,!!T)).bookmark&&N.bookmark.startid&&(p=N.bookmark),k=this.createFragmentByStr(N.result.value,s.document),c.insertBefore(k,g),c.removeChild(g),f=this.getLastElementChild(c),u=this.getLastElementChild(f),g=this.getFirstElementChild(c),l.parentNode.insertBefore(c,l),l.parentNode.removeChild(l),p&&(p.startid&&(p.id=p.startid,p.start=p.startid),p.endid&&(p.end=p.endid)),p&&p.start?t.moveToBookmark(p):t.selectNodeContents(u).collapse(!1),n||t.select(),g}}}},resetLanguage:function(e){(e=this.getCodeBlockDom(e))&&(e.textContent.replace(/\s/g,"").replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")||e.setAttribute(E.languageAttr,""))},deleteRangeContents:function(e){if(!e.collapsed){var t=e.createBookmark()
e.deleteContents()
var n=this.getCodeBlockDom(e.startContainer)
this.resetLanguage(n)
var r=void 0,i=void 0,a=void 0,o=void 0
t.start&&t.start.parentNode&&(r=B.findParentByTagName(t.start,E.lineTagName,!0))&&(i=this.getFirstElementChild(r)),t.end&&t.start.parentNode&&(a=B.findParentByTagName(t.end,E.lineTagName,!0))&&(o=this.getFirstElementChild(a))
var l=void 0,d=void 0,s=void 0;(r||a)&&(l=this.createFragmentByStr(E.getCodeLineStr(),e.document),d=this.getFirstElementChild(l),s=this.getFirstElementChild(d))
var c=void 0
if(r&&i){this.mergeFromeStart2End(t.start,i,s,"pre")
var g=B.createBookmarkNode(e.document,Math.random())
s.appendChild(g),c={start:g.id,end:null,id:g.id},a&&o&&this.mergeFromeStart2End(t.end,o,s,"next"),this.mergeCommentLine(d),r.parentNode.insertBefore(l,r)}else if(a&&o){this.mergeFromeStart2End(t.end,o,s,"next")
var h=B.createBookmarkNode(e.document,Math.random())
s.insertBefore(h,s.firstChild),c={start:h.id,end:null,id:h.id},this.mergeCommentLine(d),a.parentNode.insertBefore(l,a)}r&&r.parentNode&&r.parentNode.removeChild(r),a&&a.parentNode&&a.parentNode.removeChild(a),c&&e.moveToBookmark(c)}},isCommentNode:function(e){return!!(e&&"span"===e.nodeName.toLowerCase()&&0<=e.className.indexOf(E.classPrefix+"comment"))},mergeCommentLine:function(e){if(!e||e.nodeName.toLowerCase()!==E.lineTagName)return!1
if(!(e=e.firstChild)||e.nodeName.toLowerCase()!==E.lineContainTagName)return!1
if(e.childNodes.length<=1)return!1
var t=e.ownerDocument.createElement(E.lineTagName)
t.innerHTML=e.innerHTML
var n=!1,r=t.firstChild
do{if(this.isCommentNode(r))for(var i=r;i=i.nextSibling;)if(B.isBookmarkNode(i)||B.isFillChar(i))r.appendChild(i),i=r,n=!0
else{if(!this.isCommentNode(i))break
var a=this.createFragmentByStr(i.innerHTML)
r.appendChild(a),i.parentNode.removeChild(i),i=r,n=!0}}while(r=r.nextSibling)
return!!n&&(e.innerHTML=t.innerHTML,!0)},mergeFromeStart2End:function(e,t,n,r){var i=new RegExp("[^>]*(<\\/?(\\w+)\\s*(?:[^>]*)>)[^<]*","g"),a=new RegExp("<(\\w+)\\s*(?:[^>]*)>[^<]*<\\/\\1>","g"),o=t.innerHTML.split(e.outerHTML)
o[0]=(o[0]||"").replace(B.getBookmarkReg(),""),o[1]=(o[1]||"").replace(B.getBookmarkReg(),"")
var l=""
if("pre"===r)if(i.test(o[1])){for(o[1]=o[1].replace(i,"$1");a.test(o[1]);)o[1]=o[1].replace(a,"")
l=o[0]+o[1]}else l=o[0]
else if(i.test(o[0])){for(o[0]=o[0].replace(i,"$1");a.test(o[0]);)o[0]=o[0].replace(a,"")
l=o[0]+o[1]}else l=o[1]
var d=e.ownerDocument||document,s=d.createElement(E.codeBlockTagName)
s.innerHTML=l
for(var c=d.createDocumentFragment();s.firstChild;)c.appendChild(s.firstChild)
"pre"===r?n.insertBefore(c,n.firstChild):n.appendChild(c)},createFragmentByStr:function(e,t){e=e||""
var n=(t=t||document).createElement(E.codeBlockTagName)
n.innerHTML=e
for(var r=t.createDocumentFragment();n.firstChild;)r.appendChild(n.firstChild)
return r},getLastLineLastElement:function(e){var t=void 0
return t=(t=this.getLastElementChild(e))&&this.getLastElementChild(t)},getFirstLineFirstElement:function(e){var t=void 0
return t=(t=this.getFirstElementChild(e))&&this.getFirstElementChild(t)},getLastElementChild:function(e){if(!e||0===e.childNodes.length)return null
for(var t=void 0,n=e.childNodes,r=n.length-1;t=n[r--];)if(1===t.nodeType)return t
return null},getFirstElementChild:function(e){if(!e||0===e.childNodes.length)return null
for(var t=void 0,n=e.childNodes,r=0;t=n[r++];)if(1===t.nodeType)return t
return null},getCodeBlockDom:function(e){var t=void 0
return e?t=B.findParent(e,function(e){if(e&&e.nodeName.toLowerCase()===E.codeBlockTagName&&0<=e.className.indexOf(E.codeBlockClass))return!0},!0):t}})
n.exports=l})
define("3rd/editor/plugin/insertcode/shCore.js",["3rd/editor/plugin/insertcode/highlight.js","3rd/editor/plugin/insertcode/languageList.js","3rd/editor/plugin/insertcode/insertCodeUtils.js","3rd/editor/common/domUtils.js"],function(e,n,r){"use strict"
var l=e("3rd/editor/plugin/insertcode/highlight.js"),o=e("3rd/editor/plugin/insertcode/languageList.js"),s=e("3rd/editor/plugin/insertcode/insertCodeUtils.js"),m=e("3rd/editor/common/domUtils.js").domUtils,c="lang-"
function f(e){var n=e.node.ownerDocument,r=e.node.cloneNode(!0),o=r.splitText(e.pos+1),t=n.createDocumentFragment()
t.appendChild(r)
var d=m.createBookmarkNode(n,Math.random())
t.appendChild(d),t.appendChild(n.createTextNode(m.fillChar)),t.appendChild(o)
var a=e.node.parentNode
return a.insertBefore(t,e.node),a.removeChild(e.node),d}!function(){for(var e in o)l.registerLanguage(e,o[e])
l.configure({tabReplace:s.tabSize,classPrefix:s.classPrefix})}(),r.exports={highlightStr:function(e,n,r,o){var t=(r=r||document).createElement(s.codeBlockTagName)
n&&(t.className=c+n),e=e.replace(/\r/g,"").replace(m.fillCharReg,"").replace(/\t/g,s.tabSize)
var d=void 0
o&&(d=function(e){if(!e)return null
var n=new RegExp(m.bookmarkFillChar,"g"),r=[],o=void 0
for(;null!==(o=n.exec(e))&&r.length<2;)r.push(o.index)
return{startPos:void 0!==r[0]?r[0]:void 0,endPos:void 0!==r[1]?r[1]:void 0}}(e)),e=e.replace(m.bookmarkFillCharReg,""),t.textContent=e,l.highlightBlock(t)
var a={}
o&&d&&(a=function(e,n){var r=!0,o=!0
n&&(void 0!==n.startPos&&(r=!1),void 0!==n.endPos&&(o=!1))
if(r&&o)return
var t=e.ownerDocument.createTreeWalker(e,window.NodeFilter.SHOW_TEXT,{acceptNode:function(e){return e.nodeValue?window.NodeFilter.FILTER_ACCEPT:window.NodeFilter.FILTER_REJECT}},!1),d=0,a={start:{node:null},end:{node:null}}
for(;t.nextNode()&&(!r||!o);){var i=d+t.currentNode.nodeValue.length
!r&&d<=n.startPos&&n.startPos<=i&&(a.start.node=t.currentNode,a.start.pos=n.startPos-d-1,d+=1,i+=1,r=!0),!o&&d<=n.endPos&&n.endPos<=i&&(a.end.node=t.currentNode,a.end.pos=n.endPos-d-1,o=!0),d=i}var l=void 0,s=void 0
if(a.start.node&&a.start.node!==a.end.node)l=f(a.start),a.end.node&&(s=f(a.end))
else if(a.start.node&&a.start.node===a.end.node){var c=a.start.node.cloneNode(!0),u=c.splitText(a.start.pos+1),p=a.end.pos-c.nodeValue.length+1,g=void 0
p<=u.nodeValue.length&&(g=u.splitText(p)),l=m.createBookmarkNode(e.ownerDocument,Math.random()),s=m.createBookmarkNode(e.ownerDocument,Math.random())
var h=e.ownerDocument.createDocumentFragment()
h.appendChild(c),h.appendChild(l),h.appendChild(e.ownerDocument.createTextNode(m.fillChar)),h.appendChild(u),h.appendChild(s),g&&h.appendChild(g)
var v=_nodeInfo.node.parentNode
v.insertBefore(h,a.start.node),v.removeChild(a.start.node)}s&&(s.id=s.id.replace("start","end"))
return{startid:l?l.id:"",endid:s?s.id:""}}(t,d)),function(e){var d=e.ownerDocument||document,n="."+s.classPrefix+"comment",a=[]
$(e).find(n).each(function(){if(0<=this.innerHTML.indexOf("\n")){var e="</"+this.nodeName.toLowerCase()+">",n=this.cloneNode(!1).outerHTML.replace(e,""),r=this.innerHTML.replace(/\n/g,e+"\n"+n)
r=n+r+e
var o=d.createElement(s.codeBlockTagName)
o.innerHTML=r
for(var t=d.createDocumentFragment();o.firstChild;)t.appendChild(o.firstChild)
a.push([this,t])}})
for(var r=0,o=a.length;r<o;r++){var t=a[r]
t[0].parentNode&&(t[0].parentNode.insertBefore(t[1],t[0]),t[0].parentNode.removeChild(t[0]))}}(t)
var i=function(e){var n=e.innerHTML,r=new RegExp("\\n[\\s]*(<\\/[^>]*>)","g")
for(;r.test(n);)n=n.replace(r,"$1\n")
for(var o=n.split(/\n/),t=0,d=o.length;t<d;t++)o[t]=s.getCodeLineStr(o[t])
var a={language:"",relevance:0},i={language:e.result.language||"",relevance:e.result.relevance,value:o.join("")}
e.second_best&&(a.language=e.second_best.language,a.relevance=e.second_best.relevance)
return{result:i,second_best:a}}(t)
return i.bookmark=a,i}}})
define("3rd/editor/plugin/insertcode/highlight.js",[],function(e,n,t){"use strict"
function b(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function g(e){return e.nodeName.toLowerCase()}function h(e,n){var t=e&&e.exec(n)
return t&&0===t.index}function l(e){return m.test(e)}function a(e){var n,t={},a=Array.prototype.slice.call(arguments,1)
for(n in e)t[n]=e[n]
return a.forEach(function(e){for(n in e)t[n]=e[n]}),t}function c(e){var r=[]
return function e(n,t){for(var a=n.firstChild;a;a=a.nextSibling)3===a.nodeType?t+=a.nodeValue.length:1===a.nodeType&&(r.push({event:"start",offset:t,node:a}),t=e(a,t),g(a).match(/br|hr|img|input/)||r.push({event:"stop",offset:t,node:a}))
return t}(e,0),r}function u(n){return n.variants&&!n.cached_variants&&(n.cached_variants=n.variants.map(function(e){return a(n,{variants:null},e)})),n.cached_variants||n.endsWithParent&&[a(n)]||[n]}function _(s){function o(e){return e&&e.source||e}function l(e,n){return new RegExp(o(e),"m"+(s.case_insensitive?"i":"")+(n?"g":""))}!function n(t,e){if(t.compiled)return
t.compiled=!0
t.keywords=t.keywords||t.beginKeywords
if(t.keywords){var a={},r=function(t,e){s.case_insensitive&&(e=e.toLowerCase()),e.split(" ").forEach(function(e){var n=e.split("|")
a[n[0]]=[t,n[1]?Number(n[1]):1]})}
"string"==typeof t.keywords?r("keyword",t.keywords):E(t.keywords).forEach(function(e){r(e,t.keywords[e])}),t.keywords=a}t.lexemesRe=l(t.lexemes||/\w+/,!0)
e&&(t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")\\b"),t.begin||(t.begin=/\B|\b/),t.beginRe=l(t.begin),t.endSameAsBegin&&(t.end=t.begin),t.end||t.endsWithParent||(t.end=/\B|\b/),t.end&&(t.endRe=l(t.end)),t.terminator_end=o(t.end)||"",t.endsWithParent&&e.terminator_end&&(t.terminator_end+=(t.end?"|":"")+e.terminator_end))
t.illegal&&(t.illegalRe=l(t.illegal))
null==t.relevance&&(t.relevance=1)
t.contains||(t.contains=[])
t.contains=Array.prototype.concat.apply([],t.contains.map(function(e){return u("self"===e?t:e)}))
t.contains.forEach(function(e){n(e,t)})
t.starts&&n(t.starts,e)
var i=t.contains.map(function(e){return e.beginKeywords?"\\.?("+e.begin+")\\.?":e.begin}).concat([t.terminator_end,t.illegal]).map(o).filter(Boolean)
t.terminators=i.length?l(i.join("|"),!0):{exec:function(){return null}}}(s)}function R(e,n,i,t){function o(e,n,t,a){var r=a?"":S.classPrefix,i='<span class="'+r,s=t?"":O
return(i+=e+'">')+n+s}function s(){f+=null!=u.subLanguage?function(){var e="string"==typeof u.subLanguage
if(e&&!x[u.subLanguage])return b(d)
var n=e?R(u.subLanguage,d,!0,g[u.subLanguage]):N(d,u.subLanguage.length?u.subLanguage:void 0)
0<u.relevance&&(E+=n.relevance)
e&&(g[u.subLanguage]=n.top)
return o(n.language,n.value,!1,!0)}():function(){var e,n,t,a
if(!u.keywords)return b(d)
a="",n=0,u.lexemesRe.lastIndex=0,t=u.lexemesRe.exec(d)
for(;t;)a+=b(d.substring(n,t.index)),r=u,i=t,void 0,s=c.case_insensitive?i[0].toLowerCase():i[0],(e=r.keywords.hasOwnProperty(s)&&r.keywords[s])?(E+=e[1],a+=o(e[0],b(t[0]))):a+=b(t[0]),n=u.lexemesRe.lastIndex,t=u.lexemesRe.exec(d)
var r,i,s
return a+b(d.substr(n))}(),d=""}function l(e){f+=e.className?o(e.className,"",!0):"",u=Object.create(e,{parent:{value:u}})}function a(e,n){if(d+=e,null==n)return s(),0
var t=function(e,n){var t,a
for(t=0,a=n.contains.length;t<a;t++)if(h(n.contains[t].beginRe,e))return n.contains[t].endSameAsBegin&&(n.contains[t].endRe=(r=n.contains[t].beginRe.exec(e)[0],new RegExp(r.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m"))),n.contains[t]
var r}(n,u)
if(t)return t.skip?d+=n:(t.excludeBegin&&(d+=n),s(),t.returnBegin||t.excludeBegin||(d=n)),l(t),t.returnBegin?0:n.length
var a=function e(n,t){if(h(n.endRe,t)){for(;n.endsParent&&n.parent;)n=n.parent
return n}if(n.endsWithParent)return e(n.parent,t)}(u,n)
if(a){var r=u
for(r.skip?d+=n:(r.returnEnd||r.excludeEnd||(d+=n),s(),r.excludeEnd&&(d=n));u.className&&(f+=O),u.skip||u.subLanguage||(E+=u.relevance),(u=u.parent)!==a.parent;);return a.starts&&(a.endSameAsBegin&&(a.starts.endRe=a.endRe),l(a.starts)),r.returnEnd?0:n.length}if(function(e,n){return!i&&h(n.illegalRe,e)}(n,u))throw new Error('Illegal lexeme "'+n+'" for mode "'+(u.className||"<unnamed>")+'"')
return d+=n,n.length||1}var c=M(e)
if(!c)throw new Error('Unknown language: "'+e+'"')
_(c)
var r,u=t||c,g={},f=""
for(r=u;r!==c;r=r.parent)r.className&&(f=o(r.className,"",!0)+f)
var d="",E=0
try{for(var v,m,p=0;u.terminators.lastIndex=p,v=u.terminators.exec(n);)m=a(n.substring(p,v.index),v[0]),p=v.index+m
for(a(n.substr(p)),r=u;r.parent;r=r.parent)r.className&&(f+=O)
return{relevance:E,value:f,language:e,top:u}}catch(e){if(e.message&&-1!==e.message.indexOf("Illegal"))return{relevance:0,value:b(n)}
throw e}}function N(t,e){e=e||S.languages||E(x)
var a={relevance:0,value:b(t)},r=a
return e.filter(M).filter(s).forEach(function(e){var n=R(e,t,!1)
n.language=e,n.relevance>r.relevance&&(r=n),n.relevance>a.relevance&&(r=a,a=n)}),r.language&&(a.second_best=r),a}function f(e){return S.tabReplace||S.useBR?e.replace(w,function(e,n){return S.useBR&&"\n"===e?"<br>":S.tabReplace?n.replace(/\t/g,S.tabReplace):""}):e}function r(e,n){var t,a,r,i,s,o=function(e){var n,t,a,r,i=e.className+" "
if(i+=e.parentNode?e.parentNode.className:"",t=p.exec(i))return M(t[1])?t[1]:"no-highlight"
for(i=i.split(/\s+/),n=0,a=i.length;n<a;n++)if(l(r=i[n])||M(r))return r}(e)
l(o)||(s=(t=e).textContent,r=o?R(o,s,!0):N(s),(a=c(t)).length&&((i=document.createElementNS("http://www.w3.org/1999/xhtml","div")).innerHTML=r.value,r.value=function(e,n,t){var a=0,r="",i=[]
function s(){return e.length&&n.length?e[0].offset!==n[0].offset?e[0].offset<n[0].offset?e:n:"start"===n[0].event?e:n:e.length?e:n}function o(e){function n(e){return" "+e.nodeName+'="'+b(e.value).replace('"',"&quot;")+'"'}r+="<"+g(e)+d.map.call(e.attributes,n).join("")+">"}function l(e){r+="</"+g(e)+">"}function c(e){("start"===e.event?o:l)(e.node)}for(;e.length||n.length;){var u=s()
if(r+=b(t.substring(a,u[0].offset)),a=u[0].offset,u===e){for(i.reverse().forEach(l);c(u.splice(0,1)[0]),(u=s())===e&&u.length&&u[0].offset===a;);i.reverse().forEach(o)}else"start"===u[0].event?i.push(u[0].node):i.pop(),c(u.splice(0,1)[0])}return r+b(t.substr(a))}(a,c(i),s)),r.value=f(r.value),e.innerHTML=r.value,n&&(e.className=n(e.className,o,r.language)),e.result={language:r.language,re:r.relevance},r.second_best&&(e.second_best={language:r.second_best.language,re:r.second_best.relevance}))}function i(){if(!i.called){i.called=!0
var e=document.querySelectorAll("pre code")
d.forEach.call(e,r)}}function M(e){return e=(e||"").toLowerCase(),x[e]||x[v[e]]}function s(e){var n=M(e)
return n&&!n.disableAutodetect}var o,d,E,x,v,m,p,w,O,S
t.exports=(o={},d=[],E=Object.keys,x={},v={},m=/^(no-?highlight|plain|text)$/i,p=/\blang(?:uage)?-([\w-]+)\b/i,w=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,S={classPrefix:"hljs-",tabReplace:null,useBR:!(O="</span>"),languages:void 0},o.highlight=R,o.highlightAuto=N,o.fixMarkup=f,o.highlightBlock=r,o.configure=function(e){S=a(S,e)},o.initHighlighting=i,o.initHighlightingOnLoad=function(){addEventListener("DOMContentLoaded",i,!1),addEventListener("load",i,!1)},o.registerLanguage=function(n,e){var t=x[n]=e(o)
t.aliases&&t.aliases.forEach(function(e){v[e]=n})},o.listLanguages=function(){return E(x)},o.getLanguage=M,o.autoDetection=s,o.inherit=a,o.IDENT_RE="[a-zA-Z]\\w*",o.UNDERSCORE_IDENT_RE="[a-zA-Z_]\\w*",o.NUMBER_RE="\\b\\d+(\\.\\d+)?",o.C_NUMBER_RE="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",o.BINARY_NUMBER_RE="\\b(0b[01]+)",o.RE_STARTERS_RE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",o.BACKSLASH_ESCAPE={begin:"\\\\[\\s\\S]",relevance:0},o.APOS_STRING_MODE={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[o.BACKSLASH_ESCAPE]},o.QUOTE_STRING_MODE={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[o.BACKSLASH_ESCAPE]},o.PHRASAL_WORDS_MODE={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},o.COMMENT=function(e,n,t){var a=o.inherit({className:"comment",begin:e,end:n,contains:[]},t||{})
return a.contains.push(o.PHRASAL_WORDS_MODE),a.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0}),a},o.C_LINE_COMMENT_MODE=o.COMMENT("//","$"),o.C_BLOCK_COMMENT_MODE=o.COMMENT("/\\*","\\*/"),o.HASH_COMMENT_MODE=o.COMMENT("#","$"),o.NUMBER_MODE={className:"number",begin:o.NUMBER_RE,relevance:0},o.C_NUMBER_MODE={className:"number",begin:o.C_NUMBER_RE,relevance:0},o.BINARY_NUMBER_MODE={className:"number",begin:o.BINARY_NUMBER_RE,relevance:0},o.CSS_NUMBER_MODE={className:"number",begin:o.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},o.REGEXP_MODE={className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[o.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[o.BACKSLASH_ESCAPE]}]},o.TITLE_MODE={className:"title",begin:o.IDENT_RE,relevance:0},o.UNDERSCORE_TITLE_MODE={className:"title",begin:o.UNDERSCORE_IDENT_RE,relevance:0},o.METHOD_GUARD={begin:"\\.\\s*"+o.UNDERSCORE_IDENT_RE,relevance:0},o)})
define("3rd/editor/plugin/insertcode/languageList.js",["3rd/editor/plugin/insertcode/languages/javascript.js","3rd/editor/plugin/insertcode/languages/apache.js","3rd/editor/plugin/insertcode/languages/bash.js","3rd/editor/plugin/insertcode/languages/shell.js","3rd/editor/plugin/insertcode/languages/cs.js","3rd/editor/plugin/insertcode/languages/cpp.js","3rd/editor/plugin/insertcode/languages/css.js","3rd/editor/plugin/insertcode/languages/typescript.js","3rd/editor/plugin/insertcode/languages/diff.js","3rd/editor/plugin/insertcode/languages/xml.js","3rd/editor/plugin/insertcode/languages/http.js","3rd/editor/plugin/insertcode/languages/ini.js","3rd/editor/plugin/insertcode/languages/json.js","3rd/editor/plugin/insertcode/languages/java.js","3rd/editor/plugin/insertcode/languages/makefile.js","3rd/editor/plugin/insertcode/languages/markdown.js","3rd/editor/plugin/insertcode/languages/nginx.js","3rd/editor/plugin/insertcode/languages/objectivec.js","3rd/editor/plugin/insertcode/languages/php.js","3rd/editor/plugin/insertcode/languages/perl.js","3rd/editor/plugin/insertcode/languages/properties.js","3rd/editor/plugin/insertcode/languages/python.js","3rd/editor/plugin/insertcode/languages/ruby.js","3rd/editor/plugin/insertcode/languages/sql.js","3rd/editor/plugin/insertcode/languages/powershell.js","3rd/editor/plugin/insertcode/languages/swift.js","3rd/editor/plugin/insertcode/languages/kotlin.js","3rd/editor/plugin/insertcode/languages/go.js"],function(e,s,i){"use strict"
var r=e("3rd/editor/plugin/insertcode/languages/javascript.js"),n=e("3rd/editor/plugin/insertcode/languages/apache.js"),d=e("3rd/editor/plugin/insertcode/languages/bash.js"),g=e("3rd/editor/plugin/insertcode/languages/shell.js"),t=e("3rd/editor/plugin/insertcode/languages/cs.js"),a=e("3rd/editor/plugin/insertcode/languages/cpp.js"),l=e("3rd/editor/plugin/insertcode/languages/css.js"),o=e("3rd/editor/plugin/insertcode/languages/typescript.js"),u=e("3rd/editor/plugin/insertcode/languages/diff.js"),p=e("3rd/editor/plugin/insertcode/languages/xml.js"),c=e("3rd/editor/plugin/insertcode/languages/http.js"),j=e("3rd/editor/plugin/insertcode/languages/ini.js"),h=e("3rd/editor/plugin/insertcode/languages/json.js"),f=e("3rd/editor/plugin/insertcode/languages/java.js"),v=e("3rd/editor/plugin/insertcode/languages/makefile.js"),b=e("3rd/editor/plugin/insertcode/languages/markdown.js"),k=e("3rd/editor/plugin/insertcode/languages/nginx.js"),m=e("3rd/editor/plugin/insertcode/languages/objectivec.js"),w=e("3rd/editor/plugin/insertcode/languages/php.js"),y=e("3rd/editor/plugin/insertcode/languages/perl.js"),x=e("3rd/editor/plugin/insertcode/languages/properties.js"),q=e("3rd/editor/plugin/insertcode/languages/python.js"),L=e("3rd/editor/plugin/insertcode/languages/ruby.js"),z=e("3rd/editor/plugin/insertcode/languages/sql.js"),A=e("3rd/editor/plugin/insertcode/languages/powershell.js"),B=e("3rd/editor/plugin/insertcode/languages/swift.js"),C=e("3rd/editor/plugin/insertcode/languages/kotlin.js"),D=e("3rd/editor/plugin/insertcode/languages/go.js")
i.exports={javascript:r,apache:n,bash:d,shell:g,cs:t,cpp:a,css:l,typescript:o,diff:u,xml:p,http:c,ini:j,json:h,java:f,makefile:v,markdown:b,nginx:k,objectivec:m,php:w,perl:y,properties:x,python:q,ruby:L,sql:z,powershell:A,swift:B,kotlin:C,go:D}})
define("3rd/editor/plugin/insertcode/languages/javascript.js",[],function(e,n,a){"use strict"
a.exports=function(e){var n="[A-Za-z$_][0-9A-Za-z$_]*",a={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},r={className:"number",variants:[{begin:"\\b(0[bB][01]+)"},{begin:"\\b(0[oO][0-7]+)"},{begin:e.C_NUMBER_RE}],relevance:0},s={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},i={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,s]}
s.contains=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,i,r,e.REGEXP_MODE]
var t=s.contains.concat([e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE])
return{aliases:["js","jsx"],keywords:a,contains:[{className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},{className:"meta",begin:/^#!/,end:/$/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,i,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,r,{begin:/[{,]\s*/,relevance:0,contains:[{begin:n+"\\s*:",returnBegin:!0,relevance:0,contains:[{className:"attr",begin:n,relevance:0}]}]},{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.REGEXP_MODE,{className:"function",begin:"(\\(.*?\\)|"+n+")\\s*=>",returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:n},{begin:/\(\s*\)/},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:t}]}]},{begin:/</,end:/(\/\w+|\w+\/)>/,subLanguage:"xml",contains:[{begin:/<\w+\s*\/>/,skip:!0},{begin:/<\w+/,end:/(\/\w+|\w+\/)>/,skip:!0,contains:[{begin:/<\w+\s*\/>/,skip:!0},"self"]}]}],relevance:0},{className:"function",beginKeywords:"function",end:/\{/,excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:n}),{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,contains:t}],illegal:/\[|%/},{begin:/\$[(.]/},e.METHOD_GUARD,{className:"class",beginKeywords:"class",end:/[{;=]/,excludeEnd:!0,illegal:/[:"\[\]]/,contains:[{beginKeywords:"extends"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"constructor",end:/\{/,excludeEnd:!0}],illegal:/#(?!!)/}}})
define("3rd/editor/plugin/insertcode/languages/apache.js",[],function(e,n,a){"use strict"
a.exports=function(e){var n={className:"number",begin:"[\\$%]\\d+"}
return{aliases:["apacheconf"],case_insensitive:!0,contains:[e.HASH_COMMENT_MODE,{className:"section",begin:"</?",end:">"},{className:"attribute",begin:/\w+/,relevance:0,keywords:{nomarkup:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{end:/$/,relevance:0,keywords:{literal:"on off all"},contains:[{className:"meta",begin:"\\s\\[",end:"\\]$"},{className:"variable",begin:"[\\$%]\\{",end:"\\}",contains:["self",n]},n,e.QUOTE_STRING_MODE]}}],illegal:/\S/}}})
