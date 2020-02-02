define("media/appmsg_article.js",["media/common.js","media/base_article.js","media/get_article_structure.js"],function(t){
"use strict";
var e=t("media/common.js"),i=t("media/base_article.js"),r=t("media/get_article_structure.js"),n=r.getArticleStructureNoAd,a='<p class="js_pay_preview_filter"><mp-pay-preview-filter></mp-pay-preview-filter></p>',o='<p class="js_pay_preview_filter" style="height: 0; overflow: hidden;"><mp-pay-preview-filter></mp-pay-preview-filter></p>',s=/<p[^>]*><mp-pay-preview-filter><\/mp-pay-preview-filter><\/p>/g,d=i.inherit({
init:function(){},
getDigestFromContent:function(){
var t=this.data;
return $.trim(t.get("content").text().html(!1).substr(0,54));
},
setEditorContent:function(){
var t=this;
t._o.ueditor.ready(function(){
var e=t.data.getData();
e.is_pay_subscribe&&(e.content=e.content.replace(s,o));
var i=t._o.ueditor;
i.setContent({
content:"",
data:e
});
try{
i.setContent({
content:e.content,
data:e
});
}catch(r){
e.content&&""==i.getUeditor().getContent()&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=editor_setcontent_error;errmsg:%s,uin:%s".sprintf(28308,0,r.message,wx.data.uin),
window.BJ_REPORT&&"function"==typeof window.BJ_REPORT.report&&r&&r.stack&&(r.stack="editor_setcontent_error|"+r.stack,
window.BJ_REPORT.report(r)),r.stack&&console&&console.error&&console.error("[BJ-REPORT]",r.stack));
}
i.setHistory(t.getHistory());
});
},
flush:function(){
{
var t=this.data,e=this._o.$infoContainer;
this._o.cgiData;
}
this.flushField();
var i=this._o.ueditor.getEditorData(t.getData());
return i.is_pay_subscribe&&!function(){
i.content=i.content.replace(s,"");
var t=e.find("#js_pay_preview_popup").data("offset");
void 0!==t&&!function(){
t*=1;
var e=document.createElement("div");
e.innerHTML=i.content;
var r=n(e,{
getNestedStructure:!0,
ignoreFlexChildren:!0,
ignoreNotWriteableChildren:!0,
needEl:!0
}),o=0;
r.some(function(e){
var i=e.el,r=e.isWrapper;
return r||(o++,o!==t)?void 0:(i.insertAdjacentHTML("beforebegin",a),!0);
}),i.content=e.innerHTML;
}();
}(),t.setData(i),this.setDigest(),this.flushCommon(),this;
},
getAllImgData:function(){
var t=this._o.ueditor,e=t.fireEvent("getRemoteList"),i=[];
for(var r in e){
var n=e[r];
i.push(n.uid);
}
i=0==i.length?"":","+i.join(",")+",";
for(var a=t.getDocument(),o=a.getElementsByTagName("*"),s=",",d=[],r=0,c=o.length;c>r;r++){
var n=o[r],l=$(n);
if(/img/i.test(n.nodeName)){
var u=n.getAttribute("_src")||n.src||"",h=n.getAttribute("data-remoteid")||"";
if(l.hasClass("js_catchremoteimageerror")||1*l.attr("data-notusecover")===1)continue;
if(!u)continue;
if(s.indexOf(","+u+",")>=0)continue;
var m=!1;
i&&h&&i.indexOf(","+h+",")>=0&&(m=!0),s+=u+",",d.push({
url:u,
uid:h,
isRemote:m
});
}else{
var f=n.getAttribute("style")||n.style.cssText||"";
if(f=f.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),f&&f[2]){
var u=f[2].replace(/^['"]|['"]$/g,""),h=n.getAttribute("data-remoteid")||"";
if($(n).hasClass("js_catchremoteimageerror")||1*l.attr("data-notusecover")===1)continue;
if(!u)continue;
if(s.indexOf(","+u+",")>=0)continue;
var m=!1;
i&&h&&i.indexOf(","+h+",")>=0&&(m=!0),s+=u+",",d.push({
url:u,
uid:h,
isRemote:m
});
}
}
}
return d;
},
gif2Img:function(t){
return/\/0\?(.*&)?wx_fmt=gif/.test(t)?t.replace(/\/0\?/,"/s640?"):t;
},
validateCatchRemoteImage:function(t){
var e=$("<div>").html(t.content),i=this._o.ueditor.fireEvent("handleCatchTips",{
$dom:e,
needPost:!1
});
return i.errNum?!1:!0;
},
validateTitle:function(t){
var i=t.item,r=t.$dom,n=e.validate({
key:"title",
content:i.title,
strict:t.strict
});
return n&&n.msg&&(this.showErrMsg(r.find(".js_title_error"),n.msg),t.viewClass=t.viewClass||".js_title_error",
t.isValid=!1,2==n.type&&((new Image).src="https://mp.weixin.qq.com/misc/jslog?id=115&content=badjs&level=error")),
t;
},
validateAuthor:function(t){
var e=t.item,i=t.$dom;
return!this.data.get("writerid")&&e.author.len()>16&&(this.showErrMsg(i.find(".js_author_error"),"作者不能超过8个字"),
t.viewClass=t.viewClass||".js_author_error",t.isValid=!1),t;
},
validateEditor:function(t,i){
var r=t.item,n=t.$dom,a=e.validate({
key:"content",
content:r.content,
editor:i,
strict:t.strict,
articleData:r
});
return a&&a.msg&&(a.noTips!==!0&&(this.showErrMsg(n.find(".js_content_error"),a.msg),
t.viewClass=t.viewClass||".js_content_error"),t.isValid=!1),t;
},
validate:function(t){
if(this.validateCatchRemoteImage(t)===!1)return null;
var e=this._o.$infoContainer,i=this._o.ueditor,r={
isValid:!0,
viewClass:"",
item:t,
$dom:e,
strict:!1
},n=t.content?t.content.text():"";
return t.title||n||t.fileid||(this.showErrMsg(e.find(".js_content_error"),"请先输入一段正文（或者标题），再点击保存按钮。"),
i.getUeditor().focus(),r.viewClass=r.viewClass||".js_content_error",r.isValid=!1),
r=this.validateTitle(r),this.data.get("writerid")||(r=this.validateAuthor(r)),r=this.validateEditor(r,i),
r=this.validateCommon(r),this.handleValidateResult(r);
},
checkSourceUrl:function(){},
validateStrictly:function(t){
if(this.validateCatchRemoteImage(t)===!1)return null;
var e=this._o.ueditor,i={
isValid:!0,
viewClass:"",
item:t,
$dom:this._o.$infoContainer,
strict:!0
};
return i=this.validateTitle(i),this.data.get("writerid")||(i=this.validateAuthor(i)),
i=this.validateEditor(i,e),i=this.validateStrictlyCommon(i),this.handleValidateResult(i);
},
modifyCurrentEditData:function(t){
i.prototype.modifyCurrentEditData.call(this,t),"undefined"!=typeof t.content&&(this.data.set("content",t.content),
this._o.ueditor.setContent({
content:t.content,
data:this.data.getData(),
isModify:!0
}));
},
render:function(){
var t=this._o.ueditor;
t.fireEvent("renderEditorByType",1),i.prototype.render.call(this),this.setEditorContent(),
i.prototype.renderPayRead.call(this),t.getUeditor().focus({
toFirstText:!0
}),$("#js_pay_setting_area").show();
}
});
return d.showDialog=function(t){
t.onOk();
},d;
});define("resp_types/file_cnt.rt.js",[],function(){
"use strict";
return{
file_cnt_R:{
total:"number",
img_cnt:"number",
voice_cnt:"number",
video_cnt:"number",
app_msg_cnt:"number",
commondity_msg_cnt:"number",
video_msg_cnt:"number",
short_video_cnt:"number",
app_msg_sent_cnt:"number"
}
};
});define("resp_types/base_resp.rt.js",[],function(){
"use strict";
return{
base_resp_R:{
ret_R:"number",
err_msg:"string"
}
};
});define("common/wx/mpEditor/plugin/checkTextUtils.js",["biz_web/lib/store.js","common/wx/Cgi.js"],function(e){
"use strict";
function t(){
for(var e=[],t=0,a=v.splitChar.length;a>t;t++)e.push(v.splitChar[t].value);
v.splitcharStr=e.join("");
}
function a(){
var e=v.uid++;
return e+"_"+Math.random();
}
function i(e){
var e=e||a();
return"<"+v.splitTagName+' id="'+e+'"></'+v.splitTagName+">";
}
function n(e){
var e=e||{};
return c({
tagName:v.splitTagName,
needGlobal:e.needGlobal
});
}
function c(e){
return e.needGlobal?new RegExp("<"+e.tagName+"[^<>]*></"+e.tagName+">","g"):new RegExp("<"+e.tagName+"[^<>]*></"+e.tagName+">");
}
function o(e){
return e?e.replace(n({
needGlobal:!0
}),"").replace(c({
needGlobal:!0,
tagName:v.tmpTagName
}),""):"";
}
function r(e){
v.checkQueue.push(e),s();
}
function s(){
if(v.checktexting!==!0&&0!=v.checkQueue.length){
var e=v.checkQueue.shift();
e.data&&("1"==e.data.status?l(e):s());
}
}
function u(e){
if(!(e&&e.data&&e.data.origin&&e.instance))return!1;
var t=encodeURIComponent(e.data.origin||"");
if(v.checkResult[t]){
var a=v.checkResult[t];
if(a.position&&a.position.length>0){
var i=e.instance.getCheckTextInfo();
i&&i[e.data.id]===e.data&&e.instance.getTextByEndSplit(e.data.id)===e.data.origin?(e.data.status=3,
e.data.position=a.position,e.instance.updateErrCount()):e.instance.clearSplitElement(e.data.id);
}else e.data.status=4,e.data.position=[],e.instance.updateErrCount();
return!0;
}
return!1;
}
function p(e){
if(e&&e.origin&&e.position){
var t=encodeURIComponent(e.origin||"");
v.checkResult[t]={
origin:e.origin,
position:e.position
};
}
}
function l(e){
return e&&e.data&&e.data.origin&&e.instance?u(e)===!0?void s():void(v.checktexting||(v.checktexting=!0,
e.data.status=2,k.post({
url:"/cgi-bin/spellingcheck?",
dataType:"json",
data:{
action:"check",
content:e.data.origin
}
},{
done:function(t){
if(t&&t.base_resp&&0==t.base_resp.ret){
var a=[];
t.check_result&&t.check_result.check_item&&t.check_result.check_item.position&&t.check_result.check_item.position.length>0&&(a=t.check_result.check_item.position),
p({
origin:e.data.origin,
position:a
}),u(e);
}else e.data.status=5;
v.checktexting=!1,s();
},
fail:function(){
v.checktexting=!1,e.data.status=5,s();
}
}))):void 0;
}
function g(){
v.checkQueue=[];
}
function h(e){
e.appmsgId&&f.set(m(e.appmsgId,e.seq),{
content:e.content,
checkTextInfo:e.checkTextInfo
});
}
function d(e,t){
var a=f.get(m(e,t));
if(a&&a.checkTextInfo){
var i={};
try{
i=JSON.parse(a.checkTextInfo);
}catch(n){
i={};
}
for(var c in i){
var o=i[c];
o&&o.origin&&"[object Array]"===Object.prototype.toString.call(o.position)&&("3"==o.status||"4"==o.status)&&p({
origin:o.origin,
position:o.position
});
}
}
return a;
}
function m(e,t){
return v.cacheKey+"_"+wx.data.uin+"_"+e+"_"+t;
}
var f=e("biz_web/lib/store.js"),k=e("common/wx/Cgi.js"),v={
checkResult:{},
cacheKey:"mpchecktextinfo",
checkQueue:[],
checktexting:!1,
splitChar:[{
value:"？",
escape:!1
},{
value:"！",
escape:!1
},{
value:"。",
escape:!1
},{
value:"：",
escape:!1
},{
value:"；",
escape:!1
},{
value:"?",
escape:!0
},{
value:"!",
escape:!0
},{
value:":",
escape:!0
}],
blockTag:{
p:1,
section:1,
br:1,
iframe:1,
h1:1,
h2:1,
h3:1,
h4:1,
h5:1,
h6:1,
hr:1,
table:1,
ul:1,
div:1,
dl:1,
ol:1,
pre:1,
form:1,
figure:1,
output:1,
hgroup:1,
video:1,
footer:1,
header:1,
canvas:1,
audio:1,
aside:1,
figcaption:1,
address:1,
blockquote:1,
center:1,
dir:1,
fieldset:1,
isindex:1,
menu:1,
noframes:1
},
splitTagName:"mpchecktext",
splitTagText:"mpchecktext@#%mpchecktext",
tmpTagName:"mptmpchecktext",
uid:+new Date
};
return t(),{
splitcharStr:v.splitcharStr,
splitChar:v.splitChar,
splitTagName:v.splitTagName,
getSplitTag:i,
getSplitTagReg:n,
tmpTagName:v.tmpTagName,
getUid:a,
splitTagText:v.splitTagText,
blockTag:v.blockTag,
clearSplitTag:o,
addCheckInfoQueue:r,
clearQueue:g,
setCacheData:h,
getCacheData:d
};
});define("tpl/media/keyword_dialog.html.js",[],function(){
return'<div class="keywords_dialog">\n    <div class="msg_area">\n        <div class="icon_area">\n            <i class="icon_msg info"></i>\n        </div>\n        <div class="text_area">\n            <h4 class="keyword_tips_title">{=title}</h4>\n            <p class="keyword_tips_desc">{=desc}</p>\n        </div>\n    </div>\n    <div class="keyword_list">\n        {each words as w}\n        <span class="match_keyword">{w}</span>\n        {/each}\n    </div>\n    <div class="keyword_choose">\n        <div class="weui-desktop-form__control-group weui-desktop-form__control-group_offset">\n            <div class="weui-desktop-form__controls">\n                <label class="weui-desktop-form__check-label">\n                <input type="radio" class="weui-desktop-form__radio js_checkbox" value="1">\n                <i class="weui-desktop-icon-radio"></i>\n                <span class="weui-desktop-form__check-content">\n                    关键词打码<br>\n                    <span class="keyword_choose_desc">图文消息中命中内容将被替换为"*****"。你可以继续保存或修改此内容。</span>\n                </span>\n                </label>\n            </div>\n        </div>\n        <div class="weui-desktop-form__control-group weui-desktop-form__control-group_offset">\n            <div class="weui-desktop-form__controls">\n                <label class="weui-desktop-form__check-label">\n                <input type="radio" class="weui-desktop-form__radio js_checkbox" value="0">\n                <i class="weui-desktop-icon-radio"></i>\n                <span class="weui-desktop-form__check-content">\n                    继续保存或发布该图文消息<br>\n                    <span class="keyword_choose_desc">将不会替换图文消息中的命中内容，发出后将可能因此被屏蔽、删除。</span>\n                </span>\n                </label>\n            </div>\n        </div>\n    </div>\n</div>';
});define("media/article_data_key.js",[],function(){
"use strict";
function e(e){
var i={
is_new_video:{
value:0,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
ad_video_transition:{
value:"",
isSubmit:!0
},
advert_info:{
value:{
back_transition:""
},
isSubmit:!0,
compare:!0,
isLocalKey:!0
},
is_new_create:{
value:!1,
isLocalKey:!1,
isSubmit:!1,
compare:!0
},
tags:{
value:[],
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
can_reward:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
can_open_reward:{
value:0,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
reward_reply_id:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
related_video:{
value:[],
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
is_video_recommend:{
value:-1,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
title:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
title_tips:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
author:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
authority:{
value:1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
writerid:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
author_username:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
author_status:{
value:1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
file_id:{
value:"",
isLocalKey:!0,
isSubmit:!0,
submitName:"fileid",
compare:!1
},
digest:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
auto_gen_digest:{
value:1,
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
content:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
source_url:{
value:"",
isLocalKey:!0,
isSubmit:!0,
submitName:"sourceurl",
compare:!0
},
cover:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
releasetime:{
value:0,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
need_open_comment:{
value:1,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
only_fans_can_comment:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
isFirst:{
value:0==e,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
cdn_url:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
cdn_235_1_url:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
cdn_1_1_url:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
cdn_url_back:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
crop_list:{
value:{
crop_list:[]
},
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
music_id:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
video_id:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
voteid:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
voteismlt:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
supervoteid:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
cardid:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
cardquantity:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
isbn:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
cardlimit:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
vid_type:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
seq:{
value:e,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
msg_index:{
value:e,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
source_url_checked:{
value:0,
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
show_cover_pic:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
shortvideofileid:{
value:0,
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
link_count:{
value:0,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
copyright_type:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
releasefirst:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
platform:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
reprint_permit_type:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
allow_reprint:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
allow_reprint_modify:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
original_article_type:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
ori_white_list:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
video_ori_status:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
hit_nickname:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
free_content:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
fee:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
ad_info:{
value:{
ad_id:"",
ad_img:"",
img:"",
nick_name:"",
pt:"",
trade_mode:""
},
isLocalKey:!0,
isSubmit:!0,
compare:["ad_info","ad_id","ad_img","img","nick_name","pt","trade_mode"]
},
copyright_headimg:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
copyright_nickname:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
profile_description:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
guide_words:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
is_share_copyright:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
share_copyright_url:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
source_article_type:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
reprint_recommend_title:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
reprint_recommend_content:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
share_page_type:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
share_imageid:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
share_imageinfo:{
value:[],
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
share_video_id:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
share_videoinfo:{
value:[],
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
dot:{
value:{},
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
isMyMpVideo:{
value:!1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
is_my_mp_video:{
value:!1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
share_voice_id:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
share_voiceinfo:{
value:[],
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
insert_ad_mode:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
categories_list:{
value:[],
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
sections:{
value:[],
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
compose_info:{
value:{},
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
content_checktext:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
check_text_info:{
value:{},
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
secondAutoAdAvailable:{
value:!1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
autoAdAvailable:{
value:!1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
is_pay_subscribe:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
pay_fee:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
pay_preview_percent:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
pay_desc:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
}
};
return i;
}
function i(){
var i=e(0),a=[];
for(var o in i)i.hasOwnProperty(o)&&i[o].isSubmit&&a.push(i[o].submitName?i[o].submitName:o);
return a;
}
function a(i){
var a=e(i),o={};
for(var c in a)a.hasOwnProperty(c)&&a[c].isLocalKey&&(o[c]=a[c].value);
return o;
}
function o(){
var i=e(0),a={};
for(var o in i)if(i.hasOwnProperty(o)&&i[o].compare)if(i[o].compare===!0)a[o]=!0;else if("[object Array]"===Object.prototype.toString.call(i[o].compare))for(var c=i[o].compare,s=0;s<c.length;s++)a[c[s]]=!0;
return a;
}
function c(){
return",content,cover,cdn_url,cdn_235_1_url,cdn_1_1_url,title,author,";
}
return{
getSubmitKey:i,
getLocalKey:a,
getCompareWhiteKey:o,
getShareArticleIgnoreKey:c
};
});define("tpl/media/appmsg_edit/previewDialog.html.js",[],function(){
return'<div class="js_preview_dialog_content wechat_send_content">\n    <div class="wechat_send_form_box">\n        <form class="form"  onSubmit="return false;">\n            <div class="frm_control_group">\n                <label class="frm_label">关注公众号后，才能接收图文消息预览</label>\n\n                <div class="weui-desktop-wechat-search">\n                    <span class="weui-desktop-form-tag__area">\n                        <label id="js_preview_wxname_label" class="weui-desktop-form-tag__input__label" for="js_preview_wxname"></label>\n                        <span class="weui-desktop-form-tag__wrp">\n                            <span id="js_preview_wxname_container"></span>\n                            <input id="js_preview_wxname" type="text" class="weui-desktop-form-tag__input" autocomplete="off" placeholder="可输入多个微信号，按回车分隔">\n                        </span>\n                    </span>\n                    <div id="js_recently_preview_wxname_container" class="weui-desktop-pop-panel" style="display: none;">\n                        <div class="weui-desktop-global-mod weui-desktop-pop-panel__hd js_rencently_title">\n                            <div class="weui-desktop-global__info">发送过的微信号</div>\n                            <div class="weui-desktop-global__extra"><a href="javascript:void(0);" id="js_clear_rencently_wxname">清空历史记录</a></div>\n                        </div>\n                        <div class="weui-desktop-pop-panel__bd">\n                            <ul id="js_recently_preview_wxname" class="weui-desktop-wechat-list"></ul>\n                        </div>\n                    </div>\n                </div>\n                <p class="weui-desktop-form__tips">预览功能仅用于公众号查看文章效果，不适用于公众传播，预览链接会在短期内失效</p>\n\n                <div class="wechat_send_extra_info">\n                  <div class="wechat_send_qrcheck">\n                    <img class="wechat_send_qrcheck_img" src="/misc/getqrcode?fakeid={uin}&token={token}&style=1">\n                    <p>扫描关注{nickname}</p>\n                  </div>\n                  <div class="wechat_send_msg">\n                    <p class="weui-desktop-tips_warn jsAccountFail" style="display: none;"></p>\n                  </div>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n';
});define("tpl/media/templateListContent.html.js",[],function(){
return'{if !!msg}\n<p class="weui-desktop-media-tips">{msg}</p>\n{else}\n<div class="weui-desktop-media__list tj">\n  <div class="weui-desktop-media__list-col tj_item">\n  {each list as item index}\n  {if index%2==0} \n  {=item.contentHtml}\n  {/if}\n  {/each}\n  </div>&nbsp;\n  <div class="weui-desktop-media__list-col tj_item">\n  {each list as item index}\n  {if index%2==1} \n  {=item.contentHtml}\n  {/if}\n  {/each}\n  </div>\n</div>\n{/if}';
});define("tpl/media/templateListDialog.html.js",[],function(){
return'<div class="dialog_media_container">\n  <div class="weui-desktop-global-mod weui-desktop-media-global-bar">\n    <div class="weui-desktop-global__extra">\n      <a class="js_gomanage btn btn_default" target="_blank" href=\'/cgi-bin/appmsgtemplate?action=list&begin=0&count=6&lang=zh_CN&token={token}\'>管理模版</a>\n    </div>\n  </div>\n  <div class="weui-desktop-media-list-wrp">\n    <p class="js_loading icon_loading_small white">加载中</p>\n    <div class="js_content" style="display: none;"></div>\n  </div>\n  <div class="js_pagebar pagination_wrp"></div>\n</div>';
});define("media/template_common.js",["media/common.js","common/wx/Cgi.js","common/wx/time.js","tpl/media/appmsg_tmpl.html.js","common/wx/mpEditor/utils.js","common/wx/mpEditor/pluginsList.js"],function(e){
"use strict";
function t(e,t){
var a=t.canSelect===!1?!1:!0,o=t.canPreview===!1?!1:!0,n=t.showUpdateTime===!1?!1:!0,i=t.showEdit===!1?!1:!0,m=t.showEdit===!0?!0:!1,r=t.token||"";
!r&&window.wx&&window.wx.data&&window.wx.data.t&&(r=window.wx.data.t);
for(var _=0,w=e.length;w>_;_++){
var u=e[_];
u.token=r,u.canSelect=a,u.canPreview=o,u.showUpdateTime=n,u.showEdit=i,u.highLine=m,
u.update_time&&(u.update_time_str=s.timeFormat(u.update_time)),u.title_encode=u.title,
u.title_encode=m?u.title_encode.replace(/<em>/g,"__em_start__").replace(/<\/em>/g,"__em_end__").html(!0).replace(/__em_start__/g,"<em>").replace(/__em_end__/g,"</em>"):u.title_encode.html(!0),
u.content=d.formatTemplateContent({
content:u.content,
appmsgTmplVideoWidth:l
}),u.iframeHtml=function(e,t){
return c.createLocalIframe({
$dom:$(document.body),
onIframeReadyFunc:function(a){
a.doc.body.innerHTML=e[t].content,window.wx&&window.wx.EditorRes&&window.wx.EditorRes.template_iframe&&(a.doc.head.innerHTML='<link rel="stylesheet" type="text/css" href="'+window.wx.EditorRes.template_iframe+'">');
}
});
}(e,_),u.contentHtml=template.compile(p)(u);
}
return e;
}
function a(e){
var t="";
t="undefined"!=typeof e.postData.appmsgid?"update":"create",r.post({
url:"/cgi-bin/appmsgtemplate?action="+t,
data:e.postData
},{
done:function(t){
if(t&&t.base_resp&&0==t.base_resp.ret)return void e.onSuccess(t);
var a;
if(t&&t.base_resp){
var o=m.articleRetCode(t);
a=o.errmsg||"系统繁忙，请稍后再试";
}else a="系统繁忙，请稍后再试";
e.onError(a,t||{});
},
fail:function(t){
e.onError("系统繁忙，请稍后再试",t||{});
}
});
}
function o(e){
var t=e.page||0,a=e.perPage||6;
r.post({
url:"/cgi-bin/appmsgtemplate?action=list",
data:{
begin:t*a,
count:a
},
mask:!1
},{
done:function(a){
if(a&&a.base_resp&&0==a.base_resp.ret)e.callback({
code:0,
list:a.appmsg_template||[],
total:1*a.total,
page:t
});else{
var o="";
a&&a.base_resp&&200013==a.base_resp.ret&&(o="操作太频繁，请稍后再试"),e.callback({
code:-1,
msg:o
});
}
},
fail:function(){
e.callback({
code:-1
});
}
});
}
function n(e){
r.post({
url:"/cgi-bin/appmsgtemplate?action=delete",
data:{
appmsgid:e.id
},
mask:!1
},{
done:function(t){
t&&t.base_resp&&0==t.base_resp.ret?e.onSuccess():e.onError({
resp:t||{},
msg:"系统繁忙，请稍后再试"
});
},
fail:function(t){
e.onError({
resp:t||{},
msg:"系统繁忙，请稍后再试"
});
}
});
}
function i(e){
r.post({
url:"/cgi-bin/appmsgtemplate?action=preview",
data:e.postData,
mask:!1
},{
done:function(t){
if(t&&t.base_resp&&0==t.base_resp.ret)e.onSuccess(t);else{
var a=m.articleRetCode(t);
t.word=a.errmsg,t.antispam=a.index,e.onError(t);
}
},
fail:function(){
e.onError({
word:"系统繁忙，请稍后再试"
});
}
});
}
var m=e("media/common.js"),r=e("common/wx/Cgi.js"),s=e("common/wx/time.js"),p=e("tpl/media/appmsg_tmpl.html.js"),c=e("common/wx/mpEditor/utils.js"),d=e("common/wx/mpEditor/pluginsList.js"),l=400,_=20;
return{
formatTemplateData:t,
maxTemplateNum:_,
handleTemplate:a,
getTemplateList:o,
delTemplateList:n,
preview:i
};
});define("tpl/mpEditor/plugin/red_package_cover.html.js",[],function(){
return'<!--异常加className disabled-->\n<section class="red_package_cover_wrp{if errorType * 1 > 0} disabled{/if}">\n    <section class="red_package_cover__inner">\n        <section class="red_package_cover__inner__main">\n            <section class="red_package_cover__body">\n                <span class="red_package_cover_img" data-notusecover="1" style="background-image: url(\'{img}\')"></span>\n            </section>\n            <section class="red_package_cover__foot">\n                {if errorType * 1 > 0}\n                <span class="red_package_cover__access-link disabled">红包封面不可用</span>\n                {else}\n                <!--品牌在这里加最多6个字-->\n                <span class="red_package_cover__access-link">领取{name}红包封面</span>\n                {/if}\n            </section>\n        </section>\n        <section class="red_package_cover__extend">\n            <span class="red_package_cover__extend_icon"></span>\n            <span class="red_package_cover__extend_info">微信红包封面</span>\n        </section>\n        {if errorType * 1 > 0}\n        <section class="red_package_cover_disable_wording">红包封面不可用</section>\n        {/if}\n    </section>\n</section>';
});define("common/wx/mpEditor/plugin/questionUtils.js",["common/wx/Cgi.js","biz_common/utils/emoji_data.js"],function(e){
"use strict";
var t=e("common/wx/Cgi.js"),n=e("biz_common/utils/emoji_data.js"),i={
biz:window.wx&&window.wx.data?window.wx.data.uin_base64:"",
emojiImg:'<img src="https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single #style#" alt="#name#">',
emojiDataMap:{}
};
!function(){
i.listpageUrl="https://mp.weixin.qq.com/mp/qa?action=list_question_page&__biz="+i.biz+"&count=10&offset=0#wechat_redirect",
i.questionpageUrl="https://mp.weixin.qq.com/mp/qa?action=question_page&__biz="+i.biz+"#wechat_redirect";
for(var e=0,t=n.length;t>e;e++){
var a=n[e];
a.cn&&!i.emojiDataMap[a.cn]&&(i.emojiDataMap[a.cn]={
index:e
}),a.hk&&!i.emojiDataMap[a.hk]&&(i.emojiDataMap[a.hk]={
index:e
}),a.us&&!i.emojiDataMap[a.us]&&(i.emojiDataMap[a.us]={
index:e
});
}
}();
var a=function(e){
return/\[[^\[\]]+\]/.test(e)?e.replace(/\[[^\[\]]+\]/g,function(e){
if(i.emojiDataMap[e]&&n[i.emojiDataMap[e].index]){
var t=n[i.emojiDataMap[e].index];
return i.emojiImg.replace("#name#",e).replace("#style#",t.style);
}
return e;
}):e;
},o=function(e,t){
var n=new Date(1e3*e),i=e-t,a=n.getFullYear(),o=1*t,s=new Date(1e3*o);
n.setHours(0),n.setMinutes(0),n.setSeconds(0);
var r=n.getTime()/1e3;
return o>=r?3600>i?Math.ceil(i/60)+"分钟前":"今天":o>=r-86400?"昨天":o>=r-172800?"前天":s.getFullYear()===a?s.getMonth()+1+"月"+s.getDate()+"日":s.getFullYear()+"年"+(s.getMonth()+1)+"月"+s.getDate()+"日";
},s=function(e){
return e.replace("#rd","#wechat_redirect").replace(/^http:\/\//,"https://");
},r=function(e,t){
t=t||Math.ceil((new Date).getTime()/1e3),1*e.is_anoymous&&(e.questioner_nickname="匿名",
e.questioner_headimg="",e.question_content.questioner_useruin=""),e.questioner_headimg||(e.questioner_headimg="https://mmbiz.qpic.cn/mmbiz_png/cVgP5bCElFjtIK2EeF0OjuGhbZVFRYyGRfbFeZ9GibWsibibIWP7XRSKews1ibWFZD5biaSXb7HfMF6dMricUib4naAFw/0");
var n=e.question_content;
e.question_page_url=s(e.question_page_url.html(!1)),e.questioner_useruin=n.questioner_useruin,
e.qa_id=e.question_content.qa_id,n.answer&&(n.answer.answer_time_str=o(t,n.answer.answer_timestamp)),
n.question&&(n.question.ask_time_str=o(t,n.question.ask_timestamp),n.question.title_html=n.question.title.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
n.question.title_html=a(n.question.title_html));
for(var i=[],r=[n.question?n.question.desc:[],n.answer?n.answer.answer:[]],u=function(e,t){
r[e]=r[e].map(function(e){
return"TEXT"===e.type&&e.content?(e.hasContentBefore=t,e.content_html=e.content.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
e.content_html=a(e.content_html),t=!0):"PIC_CDN_URL"===e.type&&(e.hasContentBefore=t,
i.push(e.content),t=!0),e;
}),l=t;
},c=0,l=!1,m=r.length;m>c;c++)u(c,l,m);
return e.allImg=i,e;
},u=function(e){
var n=e.onError||function(){},i=e.onSuccess||function(){};
t.get({
url:"/cgi-bin/qa?action=list_question",
dataType:"json",
data:{
status_filter:2,
time_filter:0,
content_filter:0,
offset:e.offset,
count:e.count
},
mask:!1
},{
done:function(e){
var t=void 0;
try{
t=JSON.parse(e.question_list).question_list;
}catch(a){
t=null;
}
e&&e.base_resp&&0===e.base_resp.ret&&"[object Array]"===Object.prototype.toString.call(t)?(t.forEach(function(t){
r(t,e.svr_time);
}),i({
list:t,
totalCount:e.total_count
})):n({
errMsg:"获取问题列表失败，请稍候再试"
});
},
fail:function(){
n({
errMsg:"系统繁忙，请稍候再试"
});
}
});
};
return{
formatQuestionInfo:r,
loadList:u,
listpageUrl:i.listpageUrl,
questionpageUrl:i.questionpageUrl
};
});