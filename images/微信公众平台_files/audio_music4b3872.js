define("common/wx/media/templateListDialog.js",["common/wx/popup.js","media/template_common.js","common/wx/Tips.js","common/wx/Cgi.js","tpl/media/templateListDialog.html.js","tpl/media/templateListContent.html.js","common/wx/pagebar.js"],function(t){
"use strict";
function e(t){
this._o={
token:"",
editor:null,
onSuccess:function(){}
},this._g={
perPage:4,
dom:{}
},this._extend(t),this.initDialog();
}
t("common/wx/popup.js");
var i=t("media/template_common.js"),o=t("common/wx/Tips.js"),a=(t("common/wx/Cgi.js"),
t("tpl/media/templateListDialog.html.js")),n=t("tpl/media/templateListContent.html.js"),s=t("common/wx/pagebar.js");
return e.prototype={
_extend:function(t){
if(t)for(var e in t)this._o[e]=t[e];
},
initDialog:function(){
var t=this,e=this._o,i=this._g,n=i.dom;
document.body.style.overflow="hidden",n.$dialog=$(wx.T(a,{
token:e.token||""
})).popup({
width:680,
title:"图文模版",
autoShow:!0,
className:"align_edge weui-desktop-appmsg-dialog appmsg_tmpl_select_dialog",
buttons:[{
text:"添加到正文",
type:"primary",
classWrap:"js_save_btn",
click:function(){
if(!i.selectedId)return void o.err("请选择图文模版");
var a=t.getSelectData();
e.onSuccess({
content:a?a.content:""
}),e.editor.fireEvent("reportAddNum","122333","84","1"),t.destory(this);
}
},{
text:"取消",
type:"default",
click:function(){
t.destory(this);
}
}],
onHide:function(){
t.destory(this);
}
}),n.$js_loading=n.$dialog.find(".js_loading"),n.$js_content=n.$dialog.find(".js_content"),
n.$js_pagebar=n.$dialog.find(".js_pagebar"),n.$dialog.find(".js_gomanage").on("click",function(){
e.editor.fireEvent("reportAddNum","122333","83","1");
}),this.getList({
page:0
});
},
showLoading:function(){
var t=this._g,e=t.dom;
t.gettingData=!0,e.$js_loading.show(),e.$js_content.hide(),e.$js_pagebar.hide();
},
checkDialogAlive:function(){
var t=this._g.dom;
return t&&t.$dialog?!0:!1;
},
hideLoading:function(){
var t=this._g,e=t.dom;
t.gettingData=!1,e.$js_loading.hide();
},
checkAccLoading:function(){
return this._g.gettingData;
},
getList:function(t){
var e=this,o=this._g;
e.checkAccLoading()!==!0&&(e.showLoading(),i.getTemplateList({
page:t.page,
perPage:o.perPage,
callback:function(t){
e.checkDialogAlive()&&(e.hideLoading(),e.renderContent(t));
}
}));
},
getSelectData:function(){
var t=this._g;
if(!t.selectedId)return null;
for(var e=0,i=t.curData.length;i>e;e++){
var o=t.curData[e];
if(o.appmsgid==t.selectedId)return o;
}
return null;
},
renderContent:function(t){
var e=this._g,o=e.dom;
o&&o.$dialog&&(0==t.code||t.msg?0!=t.code||t.list&&0!=t.list.length||t.msg||(t.msg="暂无数据"):t.msg="系统繁忙，请稍后再试",
e.curData=t.list||[],e.selectedId=void 0,i.formatTemplateData(e.curData,{
canPreview:!1,
showUpdateTime:!0,
showEdit:!1,
highLine:!1
}),o.$js_content.html(template.compile(n)({
list:e.curData,
msg:t.msg
})).show(),o.$js_loading.hide(),0==t.code&&t.total>0&&"undefined"!=typeof t.page?(this.initPageBar({
curPage:t.page+1,
total:t.total
}),o.$js_content.on("click",".js_appmsg",function(){
var t=$(this);
e.selectedId=t.data("id"),o.$js_content.find(".js_appmsg").removeClass("selected"),
t.addClass("selected");
})):o.$js_pagebar.hide(),o.$dialog.popup("resetPosition"));
},
initPageBar:function(t){
var e=this,i=this._g,o=i.dom;
i.myPagebar&&i.myPagebar.destroy(),i.myPagebar=new s({
container:o.$js_pagebar,
perPage:i.perPage,
initShowPage:t.curPage,
totalItemsNum:t.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
e.getList({
page:1*t.currentPage-1
});
}
});
},
destory:function(t){
t&&t.remove(),document.body.style.overflow="visible",this._g.dom=null;
}
},e;
});define("common/wx/mpEditor/plugin/redPacketCover.js",["3rd/editor/common/domUtils.js","3rd/editor/plugin/basePlugin.js","common/wx/mpEditor/common/eventbus.js","3rd/editor/common/no_editable.js","common/wx/Tips.js","tpl/mpEditor/plugin/red_package_cover.html.js"],function(e){
"use strict";
var t=e("3rd/editor/common/domUtils.js"),r=e("3rd/editor/plugin/basePlugin.js"),a=e("common/wx/mpEditor/common/eventbus.js"),n=e("3rd/editor/common/no_editable.js"),o=e("common/wx/Tips.js"),i=e("tpl/mpEditor/plugin/red_package_cover.html.js"),d={
complieTpl:template.compile(i),
wapClass:"js_wap_redpacketcover",
saveTag:"redpacketcover",
queryCardClass:"js_redpacketcover",
frameClass:"redpackage_iframe",
cardTag:"section",
errTypeAttr:"data-errortype",
maxLen:3,
overMaxWording:"每篇图文最多插入三款红包封面"
},s=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return d.complieTpl({
img:e.img,
name:e.name,
errorType:e.errorType
}).replace(/>\s*</g,"><");
},m=r.inherit({
init:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._o={
container:"",
redbit:512,
can_show_reddot:!1,
can_use_redpacketcover:!1,
remove:!1
},this.initG(),r.prototype.init.call(this,e),this._o.can_use_redpacketcover||(this._o.container="");
},
initG:function(){
this._g={
app_id:"",
curSeq:-1,
focusErrData:null,
event:{}
};
},
getName:function(){
return"redpacketcover";
},
getContainer:function(){
return this._o.container;
},
getExecCommand:function(){
var e=this;
return function(){
if(e._o.can_use_redpacketcover){
var t=e.getCard({
$container:$(this.body)
});
if(t.length>=d.maxLen)return void o.err(d.overMaxWording);
var r=[];
t.each(function(){
var e=decodeURIComponent(this.getAttribute("data-orderid")||"");
e&&r.push({
order_id:e
});
}),a.fireEvent("showRedPackageCoverDialog",{
appmsgid:e._g.app_id,
scene:"editor",
type:"select",
inserteddata:r
},function(t){
t&&e.insertCard({
data:t
});
});
}
};
},
beforeSetContent:function(e){
var t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];
if(e){
if(this._g.curSeq=1*t.seq,this._o.remove){
var r=$("<div></div>").html(e);
r.find(d.saveTag).remove(),e=r.html();
}
return m.beforeSetContent({
html:e
});
}
},
getPluginData:function(e){
var t=e.init(),r=t.get("content");
if(r){
var a=$("<div></div>").html(r);
this.changeCardToTag({
$dom:a
}),t.set("content",a.html());
}
return t;
},
addListener:function(e){
var t=this;
e.addListener("beforepaste",function(e,r){
var a=$("<div></div>").html(r.html);
t.getCard({
$container:a
}).remove(),a.find(d.saveTag).remove(),a.find("."+d.wapClass).remove(),r.html=a.html();
}),e.addListener("showRedPackageCoverDialog",function(){
var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
a.fireEvent("showRedPackageCoverDialog",{
appmsgid:t._g.app_id,
scene:"editor",
type:"warn",
warnfocustype:"callback",
item:r.errorData
},function(t){
t&&e.fireEvent("redPacketCoverCheckResultFocus",{
errorData:t.errorData,
focusData:t.focusData
});
});
}),e.addListener("redPacketCoverCheckResultFocus",function(){
var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],r=e.errorData,a=e.focusData;
this.fireEvent("saveScene");
for(var n={},o=!1,i=0,s=r.length;s>i;i++){
var m=r[i];
n[m.appmsg_idx]||(n[m.appmsg_idx]={}),n[m.appmsg_idx][m.cover_uri]=m,1*m.appmsg_idx!==1*t._g.curSeq&&(o=!0);
}
var c=null;
o&&(c=t.getArticleObject());
var g=null;
for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){
var m=n[i];
if(1*i===1*t._g.curSeq){
var u=null;
a&&1*a.appmsg_idx===1*t._g.curSeq&&(u=a);
var v=t.setError({
tagName:d.cardTag,
$dom:$(this.body),
data:m,
focusData:u
});
!g&&u&&v&&v.$focusDom&&v.$focusDom.length>0&&(g=v.$focusDom);
}else if(c&&c[i]){
var l=$("<div></div>").html(c[i].data.get("content"));
t.setError({
tagName:d.saveTag,
$dom:l,
data:m
}),c[i].data.set("content",l.html());
}
}
if(a)if(g)this.fireEvent("scrollIntoView",g);else{
this.fireEvent("selectArticle",{
idx:a.appmsg_idx,
doNotHideErr:!0,
doNotScroll:!0,
isNewCreate:!1,
markInited:!1
});
var p=t.getCard({
$container:$(this.body),
coverUri:a.cover_uri
});
p&&p.length>0&&this.fireEvent("scrollIntoView",p);
}
this.fireEvent("saveScene");
});
},
setError:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t={
$focusDom:null
};
return e.$dom.find(e.tagName+"."+d.queryCardClass).each(function(){
var r=$(this),a=decodeURIComponent(r.attr("data-coveruri")||"");
if(e.focusData&&e.focusData.cover_uri===a&&!t.$focusDom&&(t.$focusDom=r),e.data[a]){
var n=e.data[a].status;
r.attr(d.errTypeAttr,n).html(s({
img:decodeURIComponent(r.attr("data-receiveimg")||""),
name:decodeURIComponent(r.attr("data-name")||""),
errorType:n
}));
}
}),t;
},
getCardHtml:function(e){
var r=["<"+d.cardTag+"><"+d.cardTag+' class="'+d.queryCardClass+" "+d.frameClass+'"',' data-coveruri="'+encodeURIComponent(e.cover_uri)+'"',' data-bizuin="'+encodeURIComponent(wx.commonData.uin||"")+'"',' data-receiveimg="'+encodeURIComponent(e.receive_image)+'"',' data-name="'+encodeURIComponent(e.name)+'"'," "+t.pluginAttr+'="'+encodeURIComponent(this.getName())+'"',' data-orderid="'+encodeURIComponent(e.order_id)+'"',' data-w="286" data-ratio="1.5664335664335665"',">",s({
img:e.receive_image,
name:e.name
}),"</"+d.cardTag+"></"+d.cardTag+">"].join(""),a=$("<div></div>").html(r);
return n.setDisable({
dom:a[0].firstChild.firstChild
}),a.html();
},
insertCard:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
n.insertHtml({
html:this.getCardHtml(e.data),
editor:this.editor
});
},
getCard:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t="";
return e.coverUri&&(t='[data-coveruri="'+encodeURIComponent(e.coverUri)+'"]'),e.$container.find(d.cardTag+"."+d.queryCardClass+t);
},
getErrCard:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return e.$container.find(d.cardTag+"."+d.queryCardClass+"["+d.errTypeAttr+"]");
},
check:function(e){
return e.find(d.saveTag).length>d.maxLen?{
msg:d.overMaxWording
}:!0;
},
changeCardToTag:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return this.getCard({
$container:e.$dom
}).replaceTagName(d.saveTag).html("");
}
}),c=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
e.$dom.find(d.saveTag).each(function(){
var e=$(this),t=e.attr(d.errTypeAttr)||"",r=e.replaceTagName(d.cardTag).addClass(d.queryCardClass+" "+d.frameClass),a=decodeURIComponent(r.attr("data-name")||""),o=decodeURIComponent(r.attr("data-receiveimg")||"");
r.html(s({
name:a,
img:o,
errorType:t
})),n.setDisable({
dom:r[0]
});
});
};
return m.beforeSetContent=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(!e.html)return"";
var t=$("<div></div>").html(e.html);
return c({
$dom:t
}),t.html();
},m;
});define("common/wx/mpEditor/plugin/insertquestion.js",["common/wx/mpEditor/plugin/questionUtils.js","common/wx/Cgi.js","common/wx/mpEditor/common/eventbus.js","common/wx/Tips.js"],function(t){
"use strict";
var e=t("common/wx/mpEditor/plugin/questionUtils.js"),i=t("common/wx/Cgi.js"),n=t("common/wx/mpEditor/common/eventbus.js"),o=t("common/wx/Tips.js"),a={
biz:window.wx&&window.wx.commonData&&window.wx.commonData.data?window.wx.commonData.data.uin_base64:"",
limit:999,
iframeClass:"wx-edui-question_iframe_js",
customerTagName:"mp-question",
questionInfo:{}
};
!function(){
a.iframeReg=new RegExp("<iframe([^>]*?)"+a.iframeClass+"([^>]*?)><\\/iframe>","g"),
a.iframeRegReplace="<"+a.customerTagName+" $1"+a.iframeClass+"$2></"+a.customerTagName+">";
}();
var r=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return a.questionInfo[t.qaid]||null;
},s=function(t){
return t="undefined"==typeof t?"":t,"/cgi-bin/readtemplate?t=tmpl/question_tmpl&editorId="+t;
},d=function(t,e){
var i=void 0;
return t=t||$(document.body),t.find("iframe."+a.iframeClass).each(function(){
return this.contentWindow===e?(i=this,!1):void 0;
}),i;
},u=function(t,e){
var i=void 0;
i=$(e?e.getDocument().body:document.body),i.find("iframe."+a.iframeClass).each(function(){
this.getAttribute("data-qaid")==t&&this.contentDocument.getElementById("main")&&this.contentWindow.location.reload();
});
},m=function(t,n){
for(var o=0,r=t.length;r>o;o++){
var s=t[o],d=s.qaid,m=a.questionInfo[d];
"[object Object]"!==Object.prototype.toString.call(m)&&1*m!==1&&1*m!==-1&&!function(t){
a.questionInfo[t.qaid]=1,i.get({
url:"/cgi-bin/qa?action=question_detail",
data:{
mid:t.mid,
idx:t.idx
}
},{
done:function(i){
var o=i&&i.base_resp?1*i.base_resp.ret:-1;
if(0===o&&i.question)try{
var r=JSON.parse(i.question),s=void 0;
window.wx&&window.wx.cgiData&&window.wx.cgiData.svr_time&&(s=window.wx.cgiData.svr_time),
a.questionInfo[t.qaid]=e.formatQuestionInfo(r,s);
}catch(d){
a.questionInfo[t.qaid]=-1;
}else a.questionInfo[t.qaid]=-1;
u(t.qaid,n);
},
fail:function(){
a.questionInfo[t.qaid]=-1,u(t.qaid,n);
}
});
}(s);
}
},f=function(t){
this._o={
container:t.container||"#js_editor_insertquestion",
can_use_qa:"undefined"==typeof t.can_use_qa?!1:t.can_use_qa||!1
},this._g={};
};
return f.afterSetContent=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=0;
if(window.UE&&window.UE.instants)for(var i in window.UE.instants)Object.prototype.hasOwnProperty.call(window.UE.instants,i)&&e++;
window.UE&&window.UE.instants&&0!==e||window.__getQuestionInfo||(window.__getQuestionInfo=r);
var n=t.$dom||$(document.body),o="undefined"==typeof t.editorId?"":t.editorId;
n.find(a.customerTagName).each(function(){
$(this).attr("src",s(o)).addClass(a.iframeClass).replaceTagName("iframe");
});
},f.beforeSetContent=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return t.html&&!function(){
var e=[];
$("<div>").html(t.html).find(a.customerTagName).each(function(){
var t=$(this),i=t.attr("data-qaid"),n=t.attr("data-mid"),o=t.attr("data-idx");
i&&n&&e.push({
qaid:i,
mid:n,
idx:o
});
}),m(e,t.editor);
}(),t.html;
},f.prototype={
getName:function(){
return"insertquestion";
},
getExecCommand:function(){
var t=this;
return function(){
if(t.getQuestionNum()>=a.limit)return void o.err("每篇图文消息只能添加%s个问答").sprintf(a.limit);
var e=this,i=t.editor.getDomUtils(),r=e.selection.getRange(),s=r.collapsed?e.queryCommandValue("link"):e.selection.getStart(),d="",u=!1;
if(s){
var m=i.findParentByTagName(s,"a",!0);
m&&(s=m),d=s.text||"你已选中了添加链接的文本内容",u=!0;
}
n.fireEvent("showQuestionDialog",{
listpageTitle:d,
listpageTitleDisabled:u,
questionpageTitle:d,
questionpageTitleDisabled:u
},function(e){
e&&t.insert(e);
});
};
},
getContainer:function(){
return 1*this._o.can_use_qa===1?this._o.container:!1;
},
addListener:function(t){
var e=this;
t.addListener("beforepaste",function(t,e){
var i=$("<div></div>").html(e.html);
i.find(".qa__container_js").remove(),i.find(a.customerTagName).remove(),e.html=i.html();
}),t.addListener("aftersetcontent",function(){
f.afterSetContent({
editorId:this.uid,
$dom:$(this.body)
});
}),t.addListener("select_question_iframe",function(t,e){
!!window.__editorIframeSelect&&window.__editorIframeSelect(e.win);
}),t.addListener("get_question_info",function(t,e){
return r(e);
}),t.addListener("change_question_iframe_height",function(i,n){
var o=e.getQuestionIframeByWin(n.win);
o&&($(o).height(n.height),t.fireEvent("adjustheight"));
});
},
beforeSetContent:function(t){
return f.beforeSetContent({
html:t,
editor:this.editor
});
},
getPluginData:function(t){
var e=t.init(),i=e.get("content");
i&&(i=i.replace(a.iframeReg,a.iframeRegReplace),e.set("content",i));
},
getQuestionNum:function(){
var t=this.editor.getDocument();
return $(t).find("iframe."+a.iframeClass).length;
},
insert:function(t){
if("questions"===t.type){
for(var e=[],i=0,n=t.data.length;n>i;i++){
var o=t.data[i];
a.questionInfo[o.qa_id]=o,e.push(this.getIframeStrById(o.qa_id));
}
e=e.join(""),e&&this.editor.execCommand("inserthtml",e,!0);
}else("listpage"===t.type||"questionpage"===t.type)&&this.editor.fireEvent("insert_link",{
href:t.data.url,
target:"_blank",
textValue:t.data.title
});
},
getQuestionIframeByWin:function(t){
var e=this.editor.getDocument();
return d($(e.body),t);
},
getIframeStrById:function(t){
var e=a.questionInfo[t];
if(!e)return"";
$(this.editor.getDocument().body).width();
return['<p><iframe class="'+a.iframeClass+'"',' data-qaid="'+t+'"',' data-biz="'+a.biz+'"',' data-idx="'+e.idx+'"',' data-mid="'+e.appmsgid+'"',' style="width:100% !important;height:auto;"',' src="'+this.getQuestionTmplPageUrl()+'"></iframe></p>'].join("");
},
getQuestionTmplPageUrl:function(){
return"undefined"==typeof this._g.editorId&&(this._g.editorId=this.editor.getUeditor().uid),
s(this._g.editorId);
}
},f;
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("common/wx/mpEditor/plugin/blockquote.js",["common/wx/Tips.js","common/wx/mpEditor/plugin/basePlugin.js","common/wx/mpEditor/common/eventbus.js","common/wx/mpEditor/utils.js","tpl/mpEditor/plugin/blockquote.html.js","tpl/mpEditor/plugin/blockquote_source.html.js","tpl/mpEditor/plugin/blockquote_tips.html.js","tpl/mpEditor/plugin/blockquote_popup.html.js"],function(e){
"use strict";
var t=e("common/wx/Tips.js"),r=e("common/wx/mpEditor/plugin/basePlugin.js"),o=e("common/wx/mpEditor/common/eventbus.js"),i=e("common/wx/mpEditor/utils.js"),n=function(e){
return e.replace(/>\s*</g,"><").replace(/>\s*{/g,">{").replace(/}\s*</g,"}<").replace(/}\s*{/g,"}{");
},a=n(e("tpl/mpEditor/plugin/blockquote.html.js")),c=n(e("tpl/mpEditor/plugin/blockquote_source.html.js")),s=n(e("tpl/mpEditor/plugin/blockquote_tips.html.js")),l=e("tpl/mpEditor/plugin/blockquote_popup.html.js"),u={
canUseWhenBlockquote:{
undo:1,
redo:1,
inserthtml:1,
fontsize:1,
blockquote:1,
horizontal:1,
removeformat:1,
formatmatch:1,
link:1,
unlink:1,
bold:1,
italic:1,
underline:1,
strikethrough:1,
forecolor:1,
backcolor:1,
indent:1,
justifyleft:1,
justifyright:1,
justifycenter:1,
justifyjustify:1,
justifyindent:1,
rowspacingbottom:1,
rowspacingtop:1,
lineheight:1,
letterspacing:1,
insertorderedlist:1,
insertunorderedlist:1
},
checkFail:!1,
sourceIframe:{
uid:"insert_blockquote_source_iframe_ready",
className:"blockquote_iframe js_blockquote_source"
},
tipsIframe:{
uid:"insert_blockquote_tips_iframe_ready",
className:"blockquote_tips_iframe js_blockquote_tips"
},
hasReportOverSize:!1
};
["sourceIframe","tipsIframe"].forEach(function(e){
var t=u[e],r=t.className.split(" ")[1];
t.domRegexp=new RegExp("<section[^<]*?"+r+".*?</section>","g"),t.iframeRegexp=new RegExp("<iframe[^<]*?"+r+".*?</iframe>","g");
});
var p=r.inherit({
init:function(e){
this._o={},this.extend(this._o,e),this.bindEventInterface({}),this.unbindEventInterface({}),
this.unbindSpecifyEvent({});
},
getName:function(){
return"blockquote";
},
getType:function(){
return 1;
},
getTitle:function(){
return"引用";
},
addListener:function(){
var e=this;
this.domUtils=this.editor.getDomUtils(),e.createIframeReadyFunc("source"),e.createIframeReadyFunc("tips"),
e.editor.addListener("ready",function(){
var t=this.queryCommandState;
this.queryCommandState=function(r,o){
var i=e.getName();
if(r===i&&o&&o.allDomInRange&&o.allDomInRange[0]&&2===e.domUtils.isContentEditable({
node:o.allDomInRange[0],
checkParent:!1
}))return-1;
var n=this.queryCommandValue("blockquote");
if(this.selection&&n){
var a=r.toLowerCase();
if("blockquote_tips"===n.type||"blockquote_source"===n.type)return-1;
if("blockquote"===n.type&&!u.canUseWhenBlockquote[a]&&!u.canUseWhenBlockquote[a+(o?o.toString():"")])return-1;
if(r===i)return 1;
}else if(r===i)return 0;
return t.apply(this,arguments);
};
}),e.editor.addListener("keydown",function(t,r){
var o=e.getSelectionDom(this.selection),i=o.dom,n=o.rng;
if(i&&1===i.nodeType){
var a=i.getAttribute("class");
if(a&&(a.indexOf("js_blockquote_source")>=0||a.indexOf("js_blockquote_digest")>=0)){
var c=r.keyCode||r.which;
if(13===c){
var s=e.getBlockquoteBlockDom(i);
return s.insertAdjacentHTML("afterend","<p><br></p>"),n.selectNodeContents(s.nextElementSibling).select(),
r.preventDefault(),!0;
}
if(37!==c&&38!==c&&39!==c&&40!==c)return r.preventDefault(),!0;
}else if(a&&a.indexOf("js_blockquote_tips")>=0){
var c=r.keyCode||r.which;
return 37!==c&&38!==c&&39!==c&&40!==c&&r.preventDefault(),!0;
}
}
}),e.editor.addListener("keyup",function(t,r){
var o=this.selection.getRange(),i=e.getBlockquoteDigestDom(o.startContainer);
if(i){
var n=r.keyCode||r.which;
if(65===n&&(r.ctrlKey||r.metaKey))e.handleSelectAll(r,o,i);else if(8===n||46===n){
var a=e.editor.getDocument().body,c=e.fixSourceIframe(a.innerHTML),s=c.content,l=c.hasFix;
l&&(a.innerHTML=s),e.validate(i.parentNode);
}else e.validate(i.parentNode);
}
}),e.editor.addListener("beforepaste",function(t,r){
var o=this.selection.getRange(),i=e.getBlockquoteDigestDom(o.startContainer);
r.html=i?e.filterDigest(r.html,!0):r.html.replace(/<iframe[^>]*?js_blockquote_source([^>]*?)>.*?<\/iframe>/g,function(t){
return e.createLocalIframe("source",t.match(/ data-json="([^"]*?)"/)[1]);
});
}),e.editor.addListener("handle_common_popup",function(t,r){
if(!(r.data&&r.data.length>0)){
var o=this.queryCommandValue("blockquote");
if(o&&("blockquote"===o.type||"blockquote_source"===o.type)){
var i=e.getBlockquoteBlockDom(o.dom);
if(i){
var n=i.getElementsByClassName("js_blockquote_digest");
if(n.length&&"string"==typeof n[0].textContent){
var a={
needBreak:!!r.data.length>0?!0:!1,
text:n[0].textContent.replace(/\s/g,"")
};
r.data.push({
html:wx.T(l,a),
renderData:a,
cmd:e.getName(),
node:i
}),r.size={
width:214
},r.pos="bottomleft";
}
}
}
}
}),e.editor.addListener("afterArticleSelect",function(){
if(u.checkFail){
u.checkFail=!1;
for(var r=$(e.editor.getDocument()).find(".js_blockquote_wrap"),o=-1,i=0,n=r.length;n>i;i++)e.validate(r[i])||-1!==o||(o=i);
e.editor.fireEvent("scrollIntoView",$(r[o].previousElementSibling),0),t.err("单次引用不得超过300字，避免不合理引用");
}
});
},
getExecCommand:function(){
var e=this;
return function(t,r){
var i=this;
if(e.editor){
var n=this.selection,c=n.getRange(),s=n.getText(),l=e.getBlockquoteBlockDom(c.startContainer);
if(!r&&l){
var p=l.parentNode,d=e.getTipsDom(l);
d&&p.removeChild(d);
var m=l.getAttribute("class");
if(m&&m.indexOf("js_blockquote_wrap")>=0){
var f=l.getElementsByClassName("js_blockquote_digest")[0];
if(1===f.children.length&&"P"===f.children[0].nodeName){
var g=function(){
var e=[];
return Array.prototype.forEach.call(f.children[0].children,function(t){
1===t.nodeType&&"BR"!==t.nodeName&&e.push(t);
}),1===e.length&&"IFRAME"===e[0].nodeName&&f.children[0].children[0].className.indexOf("js_blockquote_source")>=0?(p.removeChild(l),
{
v:void 0
}):void 0;
}();
if("object"===("undefined"==typeof g?"undefined":_typeof(g)))return g.v;
}
for(var h=this.document.createDocumentFragment();f.firstChild;)h.appendChild(f.firstChild);
p.replaceChild(h,l);
}else{
for(var h=this.document.createDocumentFragment();l.firstChild;)h.appendChild(l.firstChild);
p.replaceChild(h,l);
}
}else{
var v={
text:r||s,
hasReportOverSize:u.hasReportOverSize
};
r&&(v.dataset=JSON.parse(JSON.stringify(l.dataset))),o.fireEvent("showBlockquoteDialog",v,function(t){
if(t){
if(t.editorReportData&&t.editorReportData.length>0&&i.fireEvent("reportAddNum",t.editorReportData),
void 0===t.type)return void(u.hasReportOverSize=t.hasReportOverSize);
t.sourceDom="out"===t.type&&""===t.from?"":e.createLocalIframe("source",t);
var r=wx.T(a,t);
if(l){
var o=l.getElementsByClassName("js_blockquote_digest")[0];
l.insertAdjacentHTML("beforebegin",r);
var n=l.previousElementSibling;
n.replaceChild(o,n.getElementsByClassName("js_blockquote_digest")[0]),l.parentNode.removeChild(l);
}else{
if(""!==t.text){
var s=i.document.createElement("div");
s.innerHTML=r;
var o=s.getElementsByClassName("js_blockquote_digest")[0],p=c.extractContents(),d=i.document.createElement("section");
0===p.children.length?(o.appendChild(p),d.textContent=o.textContent,o.innerHTML=""):d.appendChild(p),
o.appendChild(d),r=s.innerHTML;
var m=t.text.length;
m>300&&(r=e.createLocalIframe("tips",{
len:m
})+r);
}
i.execCommand("inserthtml",e.filterDigest(r)+"<p><br></p>",!0);
}
return!0;
}
});
}
}
};
},
getQueryCommandValue:function(){
var e=this;
return function(){
var t=e.editor;
if(t){
var r=e.getSelectionDom(this.selection),o=r.dom;
if(o){
var i=void 0;
return 1===o.nodeType&&(i=o.getAttribute("class")),i&&i.indexOf("js_blockquote_source")>=0?{
type:"blockquote_source",
dom:o
}:i&&i.indexOf("js_blockquote_tips")>=0?{
type:"blockquote_tips",
dom:o
}:(o=e.getBlockquoteBlockDom(o),o?{
type:"blockquote",
dom:o
}:void 0);
}
}
};
},
check:function(e){
for(var t=e.find(".js_blockquote_wrap"),r=!0,o=0,i=t.length;r&&i>o;o++)this.validate(t[o],!0)||(r=!1);
return r||(u.checkFail=!0),r;
},
beforeSetContent:function(e){
return this.iframeSwitcher(e,"iframe");
},
getPluginData:function(e){
var t=e.init(),r=t.get("content");
r&&t.set("content",this.iframeSwitcher(r,"dom"));
},
validate:function(e,t){
var r=e.getElementsByClassName("js_blockquote_digest");
if(r.length){
var o=r[0].innerText.replace(/\s/g,"").length;
if(t||(e.dataset.contentUtf8Length=o),o>300){
if(!t){
var i=this.getTipsDom(e);
if(i){
var n=i.children[0].contentDocument;
if(n){
var a=n.getElementById("js_blockquote_tips_len");
a&&(a.innerHTML=o);
}
}else e.insertAdjacentHTML("beforebegin",this.createLocalIframe("tips",{
len:o
}));
}
return u.hasReportOverSize||(this.editor.fireEvent("reportAddNum",69271,37,1),u.hasReportOverSize=!0),
!1;
}
if(!t){
var i=this.getTipsDom(e);
i&&i.parentNode.removeChild(i);
}
}
return!0;
},
handleSelectAll:function(e,t,r){
for(;1===r.children.length&&1===r.firstChild.nodeType&&"SECTION"===r.firstChild.nodeName;)r=r.firstChild;
var o=r.firstChild,i=r.lastChild,n=function(e,t){
for(var r=t;r[e];)r=r[e];
return r;
};
if(o&&i&&o.nodeName.toLowerCase()===i.nodeName.toLowerCase()){
var a=n("firstChild",o),c=n("lastChild",i);
if(a&&c)return t.setStartBefore(a),t.setEndAfter(c),t.select(),e.preventDefault(),
!0;
}
},
getIframeFuncUid:function(){
var e=arguments.length<=0||void 0===arguments[0]?"source":arguments[0];
return u[e+"Iframe"].uid+"_"+this.editor.getUeditor().uid;
},
createIframeReadyFunc:function(e){
i.createIframeReadyFunc({
uid:this.getIframeFuncUid(e),
force:!0,
notClear:!0,
iframeSelect:!0,
onIframeReadyFunc:function(){
return function(t){
var r=t.iframe?wx.T("source"===e?c:s,JSON.parse(decodeURIComponent(t.iframe.getAttribute("data-json")))):"";
r&&(t.doc.head.innerHTML+=$("#blockquote_iframe_css").html(),t.doc.body.innerHTML=r,
"source"===e&&!function(){
var e=setInterval(function(){
var r=t.doc.getElementsByClassName("js_blockquote_source");
if(r.length)if(t.iframe&&t.iframe.contentWindow){
var o=t.iframe.contentWindow.getComputedStyle(r[0]);
"0px"!==o.getPropertyValue("margin-top")&&(t.iframe.style.height=parseInt(o.getPropertyValue("margin-top"))+parseInt(o.getPropertyValue("height"))+"px",
clearInterval(e),e=null);
}else clearInterval(e),e=null;
},200);
}());
};
}()
});
},
createLocalIframe:function(){
var e=arguments.length<=0||void 0===arguments[0]?"source":arguments[0],t=arguments[1];
"object"===("undefined"==typeof t?"undefined":_typeof(t))&&(t=encodeURIComponent(JSON.stringify(t)));
var r=function(e,r){
return i.createLocalIframe({
noSrc:!1,
uid:e,
attr:{
"data-json":t,
"class":r
}
});
}(this.getIframeFuncUid(e),u[e+"Iframe"].className);
return"tips"===e&&(r='<p class="js_blockquote_tips_p">'+r+"</p>"),r;
},
iframeSwitcher:function(e,t){
var r=this;
return"iframe"===t?e.replace(u.sourceIframe.domRegexp,function(e){
return r.createLocalIframe("source",e.match(/ data-json="([^"]*?)"/)[1]);
}):this.fixSourceIframe(e).content.replace(u.sourceIframe.iframeRegexp,function(e){
var t=e.match(/ data-json="([^"]*?)"/)[1],r=JSON.parse(decodeURIComponent(t));
return r.json=t,wx.T(c,r);
});
},
fixSourceIframe:function(e){
var t=!1;
return e=e.replace(/((<p>)?(<iframe[^<]*?js_blockquote_source.*?<\/iframe>)(<br>)*(<\/p>)?)(<\/section>)/g,function(e,r,o,i,n,a,c){
return t=!0,c+i;
}),{
content:e,
hasFix:t
};
},
getBlockquoteBlockDom:function(e){
return this.getDom(e,function(e){
var t=e.getAttribute("class");
return t&&t.indexOf("js_blockquote_wrap")>=0||"BLOCKQUOTE"===e.nodeName?!0:!1;
});
},
getBlockquoteDigestDom:function(e){
return this.getDom(e,function(e){
var t=e.getAttribute("class");
return t&&t.indexOf("js_blockquote_digest")>=0?!0:!1;
});
},
getDom:function(e,t){
var r=e;
if(!e)return r;
for(;r&&(1!==r.nodeType||!t(r));)r=r.parentNode;
return r;
},
getSelectionDom:function(e){
var t=e.getRange(),r=t.startContainer,o={
dom:null,
rng:t
};
if(r){
var i=r.nodeType;
if(1===i){
var n=r.childNodes;
o.dom=n[Math.max(0,t.startOffset-1)]||null;
}else 3===i&&(o.dom=r.parentNode);
}
return o;
},
getTipsDom:function(e){
var t=e.previousElementSibling;
return t&&t.className.indexOf("js_blockquote_tips_p")>=0?t:null;
},
filterDigest:function(e,t){
return e.replace(/<img[^>]*>/g,"<p>[图片]</p>").replace(/<iframe [^>]*?class=\"res_iframe card_iframe js_editor_card\"[^>]*?data-cardid=\"[^\"]*?\"[^>]*?><\/iframe>/gi,"<p>[卡券]</p>").replace(/<mpvoice([^>]*?)js_editor_audio([^>]*?)><\/mpvoice>/g,"<p>[音频]</p>").replace(/<iframe([^>]*?)js_editor_audio([^>]*?)><\/iframe>/g,"<p>[音频]</p>").replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<p>[音乐]</p>").replace(/<iframe([^>]*?)js_editor_qqmusic([^>]*?)><\/iframe>/g,"<p>[音乐]</p>").replace(/<mpgongyi([^>]*?)js_editor_gy([^>]*?)><\/mpgongyi>/g,"<p>[公益]</p>").replace(/<mpshop([^>]*?)js_editor_shop([^>]*?)><\/mpshop>/g,"<p>[小店]</p>").replace(/<iframe([^>]*?)class=[\'\"][^\'\"]*video_iframe([^>]*?)><\/iframe>/g,"<p>[视频]</p>").replace(/(<iframe[^>]*?js_editor_vote_card[^<]*?<\/iframe>)/gi,"<p>[投票]</p>").replace(/<iframe[^>]*?js_editor_product[^<]*?<\/iframe>/g,"<p>[商品]</p>").replace(/<iframe[^>]*?js_editor_cps[^<]*?<\/iframe>/g,"<p>[商品]</p>").replace(/<iframe[^>]*?js_cpc_area[^<]*?<\/iframe>/g,"<p>[广告]</p>").replace(/<mp-weapp([^>]*?)weapp_element([^>]*?)><\/mp-weapp>/g,"<p>[小程序]</p>").replace(/<a([^>]*?)weapp_text_link([^>]*?)>.*?<\/a>/g,"<p>[小程序]</p>").replace(/<a([^>]*?)weapp_image_link([^>]*?)>.*?<\/a>/g,"<p>[小程序]</p>").replace(/<iframe([^>]*?)js_editor_weapp([^>]*?)><\/iframe>/g,"<p>[小程序]</p>").replace(/<pre[^>]*?code-snippet([^>]*?)>.*?<\/pre>/g,"<p>[代码]</p>").replace(new RegExp((t?"":"(?!^)")+"<blockquote[^>]*?js_blockquote_wrap([^>]*?)>.*?</blockquote>"+(t?"":"(?!$)"),"g"),"<p>[引用]</p>");
}
});
return p.beforeSetContent=function(e){
return e.html;
},p.afterSetContent=function(){},p;
});define("common/wx/mpEditor/plugin/insertcode.js",[],function(){
"use strict";
var e=function(){};
return e.beforeSetContent=function(e){
if(!e||!e.html)return"";
var t=$("<div></div>").html(e.html),i="pre",n="code-snippet__js",r="code-snippet code-snippet_nowrap",o="code-snippet__fix",d="ul",s="code-snippet__line-index",c=[];
t.find(i+"."+n).each(function(){
this.removeAttribute("style"),this.setAttribute("class",n+" "+r),c.push({
codeBlock:this
});
});
for(var p=0,f=c.length;f>p;p++){
var a=c[p].codeBlock,h=a.parentNode,l=h?h.getAttribute("class"):"";
h.parentNode&&l&&(l.indexOf(n)>=0||l.indexOf(o)>=0)&&(h.parentNode.insertBefore(a,h),
h.parentNode.removeChild(h));
}
return t.find(d).each(function(){
var e=this.getAttribute("class")||"";
e&&(e.indexOf(n)>=0||e.indexOf(s)>=0)&&this.parentNode.removeChild(this);
}),t.html();
},e;
});define("common/wx/mpEditor/plugin/cps.js",["common/wx/dialog.js","common/wx/Cgi.js","common/wx/mpEditor/common/eventbus.js","common/wx/media/cpsTemplateDialog.js","common/wx/media/cpsUtils.js","common/wx/mpEditor/utils.js","tpl/mpEditor/plugin/cps_template_popup.html.js","common/wx/Tips.js","biz_web/lib/store.js"],function(e){
"use strict";
function t(){
C.mpcpsReg=new RegExp("<mpcps([^>]*?)"+C.className+"([^>]*?)><\\/mpcps>","g"),C.mpcpsRegReplace="<iframe $1"+C.className+"$2></iframe>",
C.iframeReg=new RegExp("<iframe([^>]*?)"+C.className+"([^>]*?)><\\/iframe>","g"),
C.iframeRegReplace="<mpcps $1"+C.className+"$2></mpcps>";
}
function i(e){
return e.find("iframe."+C.className).remove(),e.find("mpcps").remove(),e.find("."+h.appmsgContainerClass).remove(),
e.find("."+h.appmsgLoopClass).remove(),e.find("."+h.appmsgProductErrClass).remove(),
e.find("section").each(function(){
this.firstChild||this.style.cssText||$(this).remove();
}),e;
}
function r(){
if(C.hasTemplateData&&0!=C.updateCpsDataStatus){
for(var e=0,t=C.afterTemplateQueue.length;t>e;e++){
var i=C.afterTemplateQueue[e];
"function"==typeof i&&i();
}
C.afterTemplateQueue=[];
}
}
function a(e){
this._o={
container:null,
redbit:1,
red_dot_flag:0,
can_use_cps:!1,
clearProduct:!1,
tipStatus:{
choiceNoCommissionNeedTip:!1
},
can_use_wxopen_link:!1
},this._g={
highlineCacheIframe:[],
highlineTarget:null,
highlineTimeoutId:null
},this._extend(e);
var t=this.getContainer();
t&&$(t).show(),this._o.container&&this._o.can_use_cps&&($(this._o.container).show(),
e.can_show_reddot&&$(this._o.container).addClass("tpl_item_reddot")),this.initTemplate(),
this.redbit=e.redbit||256,this.editor=null;
}
function o(e,t,i){
for(var r=window.UE.dom.domUtils,a=e,o=!0;a;){
if(r.isBody(a)){
o=!1;
break;
}
var d=r["find"+i+"Sibling"](a,s(t),!1);
if(d&&!r.isBody(d)){
var l=r["find"+i+"Sibling"](a,c(d),!1);
if(l&&l!==d&&!r.isBody(l)){
o=!1;
break;
}
if(d===t){
o=!0;
break;
}
var u="";
if("Next"==i?u="Previous":"Previous"==i&&(u="Next"),n(t,d,u)){
o=!1;
break;
}
o=!0;
break;
}
if(d=r["find"+i+"Sibling"](a,c(),!1),d&&!r.isBody(d)){
o=!1;
break;
}
a=a.parentNode;
}
return o;
}
function n(e,t,i){
for(var r=window.UE.dom.domUtils,a=e,o=!1;a&&a!==t;){
var n=r["find"+i+"Sibling"](a,c(),!1);
if(n&&!r.isBody(n)){
o=!0;
break;
}
a=a.parentNode;
}
return o;
}
function s(e){
var t=window.UE.dom.domUtils,i=e.getAttribute("data-uid");
return function(r){
if(t.isBody(r))return!0;
if(1==r.nodeType){
if(e===r)return!0;
var a=$(r).find("."+C.className+"[data-uid="+i+"]");
return a&&a.length>0?!0:!1;
}
return!1;
};
}
function c(e){
var t=window.UE.dom.domUtils;
return function(i){
if(t.isBody(i))return!0;
if("undefined"!=typeof e&&i===e)return!0;
if(1==i.nodeType){
if("br"==i.nodeName.toLowerCase())return!1;
var r=i.innerText.replace(/[\r\n\s]/g,"").replace(t.fillCharReg,"");
if(i.style.cssText||r.length>0)return!0;
var a=["p","section","span"],o=","+a.join(",")+",",n=i.nodeName.toLowerCase();
if(o.indexOf(","+n+",")>=0){
if(0==i.childElementCount)return!1;
var s=$(i.cloneNode(!0));
s.find("br").remove();
for(var c=[],d=0,l=a.length;l>d;d++){
var u=a[d];
s.find(u).each(function(){
0!=this.childElementCount||this.style.cssText||c.push(this);
});
}
for(var d=0,l=c.length;l>d;d++)$(c[d]).remove();
return 0===s[0].childElementCount?!1:!0;
}
return!0;
}
if(3==i.nodeType){
var r=i.nodeValue.replace(/[\r\n\s]/g,"").replace(t.fillCharReg,"");
return r.length>0?!0:!1;
}
return!1;
};
}
function d(e,t){
for(var i=window.UE.dom.domUtils,r=e;r&&!i.isBody(r);){
var a=i["find"+t+"Sibling"](r,u,!1);
if(a){
r=a;
break;
}
r=r.parentNode;
}
if(r&&!i.isBody(r)&&1==r.nodeType){
if(l(r)===!0)return r;
var o=$(r).find("."+C.className).eq(0)[0];
if(o){
var n;
"Next"==t?n="Previous":"Previous"==t&&(n="Next");
for(var s=o;s&&!i.isBody(s)&&s!==r;){
var a=i["find"+n+"Sibling"](s,u,!1);
if(a){
s=a;
break;
}
s=s.parentNode;
}
return s&&!i.isBody(s)&&s!==r?null:o;
}
}
return null;
}
function l(e){
return e&&1==e.nodeType&&/^iframe$/i.test(e.nodeName)&&(e.className||"").indexOf(C.className)>=0?!0:!1;
}
function u(e){
var t=window.UE.dom.domUtils;
return t.isBody(e)||3==e.nodeType&&0==(e.nodeValue||"").replace(t.fillCharReg,"").length?!1:!0;
}
var p=(e("common/wx/dialog.js"),e("common/wx/Cgi.js")),m=e("common/wx/mpEditor/common/eventbus.js"),f=e("common/wx/media/cpsTemplateDialog.js"),h=e("common/wx/media/cpsUtils.js"),g=e("common/wx/mpEditor/utils.js"),v=e("tpl/mpEditor/plugin/cps_template_popup.html.js"),y=e("common/wx/Tips.js"),_=e("biz_web/lib/store.js"),C={
updateCpsDataStatus:0,
hasTemplateData:!1,
afterTemplateQueue:[],
maxLen:10,
curColor:h.defaultColor,
colorCacheMax:10,
curTemplateId:"",
PopupTplCompile:template.compile(v),
iframeUid:"insert_cps_iframe_ready",
className:"js_editor_cps",
cacheProductKey:"editorCpsInfo_"+window.wx.data.uin,
defaultColorList:["#fa7834","#09BB07","#D54036","#9058CB"],
productStyleText:"width:100% !important;border:0;"
};
return t(),a.afterSetContent=function(e){
var t=[],i=e.$dom,r=e.funcUid;
i.find("mpcps").each(function(){
var e=$(this),i=e.attr("data-uid")||"";
i||(i=g.getuid(),e.attr("data-uid",i)),e.attr("src",g.getIframeSrc(i,r)),t.push(e);
}),g.createAsynRenderIframe(t);
},a.beforeSetContent=function(e){
if(C.updateCpsDataStatus=0,!e.html)return C.updateCpsDataStatus=1,"";
if(-1==e.html.indexOf("<mpcps")&&(C.updateCpsDataStatus=1),e.clearProduct===!0){
var t=$("<div>").html(e.html);
return t=i(t),t.html();
}
if(/<mpcps\s/.test(e.html)){
var a,t=$("<div>").html(e.html),o=[],n=[];
t.find("mpcps").each(function(){
var t,i=$(this);
e.isPreview===!0?(t=g.getuid(),i.attr("data-uid",t)):a=i.attr("data-color");
var r=i.parents("p");
if(r&&r.length>0)for(var s=0,c=r.length;c>s;s++)o.push(r[s]);
var d=h.getDataFromCustomTag(this);
n.push(d);
});
h.updateCpsData({
dataList:n,
onSuccess:function(){
C.updateCpsDataStatus=1,r();
},
onError:function(){
C.updateCpsDataStatus=-1,r();
}
}),a&&h.validColor(a)&&(C.curColor=a);
for(var s=0,c=o.length;c>s;s++){
var d=o[s];
d&&1==d.nodeType&&"p"==d.nodeName.toLowerCase()&&d.parentNode&&$(d).replaceTagName("section");
}
return e.html=t.html(),e.html;
}
return e.html;
},a.prototype={
_extend:function(e){
for(var t in e)this._o[t]=e[t];
},
getName:function(){
return"insertcpsmoviebook";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
{
var e=this;
this._o;
}
return function(){
var t=e.editor;
if(t){
p.get({
url:" /cgi-bin/cpsproductmaterial?action=report",
data:{
type:"click_cps_product_entrance"
}
},function(){});
var i=e.getCurProductCount();
return i>=C.maxLen?(p.get({
url:" /cgi-bin/cpsproductmaterial?action=report",
data:{
type:"cps_product_limit"
}
},function(){}),void y.err("最多插入%s个商品".sprintf(C.maxLen))):void m.fireEvent("showCpsDialog",{
choiceLimit:C.maxLen-i,
tipStatus:e._o.tipStatus||{},
sessionId:"id_"+ +new Date+"_"+parseInt(1e6*Math.random(),10)
},function(t){
e._o.tipStatus.choiceNoCommissionNeedTip=!1,console.log("data:",t),void 0!=t&&(C.curTemplateId&&h.getTemplateDataById(C.curTemplateId)&&(t.templateId=C.curTemplateId),
e.insertHtml(t));
});
}
};
},
initTemplate:function(){
C.hasTemplateData!==!0&&h.getTemplate({
callback:function(){
C.hasTemplateData=!0,r();
}
});
},
addListener:function(e){
if(this._o.clearProduct!==!0){
var t=this;
this.domUtils=this.editor.getDomUtils(),this.createIframeReadyFunc(),this.showPopup(e),
e.addListener("beforesavescene",function(e,t){
t&&t.content&&(t.content=t.content.replace(C.iframeReg,C.iframeRegReplace));
}),e.addListener("afterscencerestore",function(){
t.afterSetContent();
}),e.addListener("show_cps_template_dialog",function(e,i,r){
t.showCpsTemplateDialog(r);
}),e.addListener("beforepaste",function(e,i){
var r=$("<div></div>").html(i.html);
r=t.filterData(r),i.html=r.html();
}),e.addListener("beforekeydown",function(e,i){
if(i=i||window.event,i&&i.type){
var r=i.keyCode||i.which;
if(8==r||46==r){
var a=this.selection.getRange();
if(a.collapsed){
var o;
if(8==r){
if(1==a.startContainer.nodeType)o=a.startContainer.childNodes[a.startOffset-1];else if(3==a.startContainer.nodeType){
var n=a.startContainer.nodeValue.charAt(a.startOffset-1)||"";
n=n.replace(t.domUtils.fillCharReg,""),n&&(o=a.startContainer);
}
o||(o=d(a.startContainer,"Previous"));
}else if(46==r){
if(1==a.startContainer.nodeType)o=a.startContainer.childNodes[a.startOffset];else if(3==a.startContainer.nodeType){
var n=a.startContainer.nodeValue.charAt(a.startOffset)||"";
n=n.replace(t.domUtils.fillCharReg,""),n&&(o=a.startContainer);
}
o||(o=d(a.startContainer,"Next"));
}
if(o&&l(o)===!0)return this.selection.getRange().selectNode(o).select(!0),i.stopPropagation?(i.stopPropagation(),
i.preventDefault()):i.cancelBubble=!0,!1;
}
}
}
});
}
},
cancelHighline:function(){
this._g.highlineTimeoutId&&(clearTimeout(this._g.highlineTimeoutId),this._g.highlineTimeoutId=null);
var e=this;
this._g.highlineTimeoutId=setTimeout(function(){
e.highLineIframe(!1),e._g.highlineTarget=null,e._g.highlineCacheIframe=[];
},100);
},
getContainer:function(){
return this._o.can_use_cps?this._o.container:!1;
},
getTitle:function(){
return"添加商品";
},
beforeSetContent:function(e,t){
return a.beforeSetContent({
isPreview:t,
html:e,
clearProduct:this._o.clearProduct
});
},
afterSetContent:function(e){
a.afterSetContent({
$dom:e||$(this.editor.getUeditor().body),
funcUid:this.getIframeFuncUid()
});
},
getPluginData:function(e){
var t=e.init(),i=t.get("content");
if(i=i.replace(C.iframeReg,C.iframeRegReplace),this._o.clearProduct===!0){
var r=$("<div>").html(i);
return r=this.filterData(r),i=r.html(),t.set("content",i),t;
}
if(/<mpcps\s/.test(i)){
var r=$("<div>").html(i),a=[];
r.find("mpcps").each(function(){
var e=$(this),t=e.parents("p");
if(t&&t.length>0)for(var i=0,r=t.length;r>i;i++)a.push(t[i]);
e.attr("style",C.productStyleText),e.removeAttr("src"),h.setData2CustomTag(this);
});
for(var o=0,n=a.length;n>o;o++){
var s=a[o];
s&&1==s.nodeType&&"p"==s.nodeName.toLowerCase()&&s.parentNode&&$(s).replaceTagName("section");
}
i=r.html();
}
return t.set("content",i),t;
},
filterData:function(e){
return i(e);
},
getIframeFuncUid:function(){
var e=this.editor.getUeditor().uid;
return C.iframeUid+"_"+e;
},
beforeEditorDestory:function(){
g.clearIframeReadyFunc(this.getIframeFuncUid());
},
highLineIframe:function(e){
var t=this._g.highlineCacheIframe;
if(t){
{
this.initHighlineDom();
}
e?(this.showHighlineDom(),this.attachToHighline(t)):this.hideHighlineDom();
}
},
initHighlineDom:function(){
if(this._g.highlineDom)return this._g.highlineDom;
var e=this.editor.getUeditor(),t=document.createElement("div");
return t.id=e.ui.id+"_product_highline",t.style.cssText="position: absolute;border: 2px solid #43b548;box-sizing: border-box;display:none;z-index:"+e.options.zIndex+";",
e.ui.getDom().appendChild(t),this._g.highlineDom=t,t;
},
showHighlineDom:function(){
this._g.highlineDom.style.display="block";
},
hideHighlineDom:function(){
this._g.highlineDom.style.display="none";
},
attachToHighline:function(e){
if(e&&0!=e.length){
var t=UE.ui.uiUtils,i=this.editor.getUeditor(),r=this.editor.getDomUtils(),a=this._g.highlineDom,o=e[0],n=e[e.length-1],s=r.getXY(o),c=(t.getClientRect(o),
t.getClientRect(n),r.getXY(i.iframe)),d=r.getXY(this._g.highlineDom.parentNode);
r.setStyles(a,{
height:o.getBoundingClientRect().height+8+"px",
top:c.y+s.y-i.document.body.scrollTop-d.y-parseInt(a.style.borderTopWidth)-2+"px",
left:o.getBoundingClientRect().left-7+"px",
right:o.getBoundingClientRect().right+7+"px",
width:o.getBoundingClientRect().width+14+"px"
});
}
},
pickColor:function(e,t,i){
if(h.validColor(t)){
e.find("input").val(t),e.find(".js_fail").hide();
var r=_.get(C.cacheProductKey)||{},a=[];
r.color&&(a=r.color||[]);
var o=a.length>0?","+a.join(",")+",":"",n=","+C.defaultColorList.join(",")+",",s=","+t+",";
return-1!=n.indexOf(s)||o&&-1!=o.indexOf(s)||(a.unshift(t),a.length>C.colorCacheMax&&a.splice(C.colorCacheMax),
r.color=a,_.set(C.cacheProductKey,r)),this.changeProductColor(t,i),!0;
}
return!1;
},
changeProductColor:function(e,t){
var i=h.validColor(e);
if(i){
C.curColor=e;
var r=$(this.editor.getUeditor().body),a=0,o=0,n=[];
r.find("."+C.className).each(function(){
var i=$(this),r=h.getOptionsFromIframe(this);
r.color=e,n.push(i),t&&this===t&&(o=a),a++;
});
var s=[];
if(o>0){
s.push(n[o]);
for(var c=o-1,d=o+1;c>=0||d<n.length;)n[c]&&s.push(n[c]),n[d]&&s.push(n[d]),c--,
d++;
}else s=n;
this.editor.fireEvent("saveScene"),g.createAsynIframeReload(s);
}
},
createIframeReadyFunc:function(){
var e=this.editor.getUeditor().uid;
g.createIframeReadyFunc({
uid:this.getIframeFuncUid(),
force:!0,
notClear:!0,
iframeSelect:!0,
onIframeReadyFunc:function(e,t,i){
return function(r){
var a=function(){
var a=t(r.iframe);
a&&(r.doc.body.innerHTML=a,i(r.iframe,r.doc.body,e),"function"==typeof window.__editorIframeMouseup&&(r.doc.body.onmouseup=function(){
window.__editorIframeMouseup(r.doc.defaultView||r.doc.parentWindow);
}));
};
C.hasTemplateData===!0&&0!=C.updateCpsDataStatus?a():C.afterTemplateQueue.push(a);
};
}(e,h.getIframeContentByIframe,h.addIframeImgLoadEvent)
});
},
insertHtml:function(e){
var t=h.getTemplateDataById(e.templateId);
if(t){
t.loop=1;
var i=_.get(C.cacheProductKey)||{};
i.templateId=e.templateId,_.set(C.cacheProductKey,i),C.curTemplateId=e.templateId;
var r=[],a=[],o=[],n=[];
for(r=[].concat(e.productData),a=[].concat(e.productId);r.length>0;)o.push(r.splice(0,t.loop)),
n.push(a.splice(0,t.loop));
e.appid&&(e.appidList=[e.appid]),e.categoryid&&(e.categoryidList=[e.categoryid]);
for(var s=[],c=0,d=o.length;d>c;c++){
var l=["<section>","","</section>"],u=e.templateId;
"banner"==u&&e.categoryidList[c]>2&&(u="card"),"card"==u&&2==e.categoryidList[c]&&(u="banner"),
1==e.categoryidList[c]&&(u="list");
var p=h.cacheIframeData({
type:e.type,
productData:o[c],
templateId:u,
productId:n[c],
packId:e.packId,
smartNum:e.smartNum,
color:e.color||C.curColor,
categoryid:e.categoryidList[c],
appid:e.appidList[c],
report:e.productData[0].report_buffer
});
l[1]=this.createLocalIframe({
datakey:p
}),s.push(l.join(""));
}
s=s.join("").replace(/<iframe /g,"<mpcps ").replace(/<\/iframe>/g,"</mpcps>");
var m=this.editor.execCommand("insertHtml",s),f=[],v=this.getIframeFuncUid();
$(m).find("mpcps").each(function(){
var e=$(this),t=e.attr("data-uid")||"";
t||(t=g.getuid(),e.attr("data-uid",t)),e.attr("src",g.getIframeSrc(t,v)),f.push(e);
}),g.createAsynRenderIframe(f);
}
},
createLocalIframe:function(e){
var t=this.getIframeFuncUid();
return function(t,i,r){
return g.createLocalIframe({
noSrc:!0,
uid:i,
attr:{
" frameborder":"0",
"class":r,
"data-datakey":e.datakey,
style:C.productStyleText
}
});
}(e,t,C.className);
},
getCurProductCount:function(){
var e=$(this.editor.getUeditor().body),t=0;
return e.find("."+C.className).each(function(){
var e=h.getOptionsFromIframe(this),i=($(this),e.type),r=1*e.smartNum,a=e.productId||[];
t+=2==i?r:a.length;
}),t;
},
getNotRenderProductCount:function(){
return $(this.editor.getUeditor().body).find("mpcps").length;
},
showPopup:function(e){
{
var t=this;
e.getUeditor();
}
e.addListener("cancel_common_popup_mouseover_event",function(){}),e.addListener("mouseout",function(e,t){
var i=t.target||t.srcElement;
l(i)===!0&&($(i.contentDocument).find(".js_product_container").removeClass("hover"),
$(i.contentDocument).find(".js_change_cps_tmpl_a").unbind(),$(i.contentDocument).find(".js_del_cps_card_a").unbind());
}),e.addListener("mouseover",function(e,i){
var r=i.target||i.srcElement;
if(l(r)===!0){
$(r.contentDocument).find(".js_product_container").addClass("hover"),$(r.contentDocument).find(".js_change_cps_tmpl_a").click(function(){
t.showCpsTemplateDialog(r);
});
var a=h.getOptionsFromIframe(r)||{};
a.categoryid==h.getBookCategoryId()&&$(r.contentDocument).find(".js_change_cps_tmpl").hide(),
$(r.contentDocument).find(".js_del_cps_card_a").click(function(){
$(r).remove();
});
}
});
},
getProductIframeFromRange:function(e,t){
if(e){
var i=e[t+"Container"];
if(i&&1==i.nodeType){
var r=i.childNodes[e[t+"Offset"]];
if(r&&1==r.nodeType){
if(l(r)===!0)return r;
for(var a,o=r.getElementsByTagName("iframe"),n=0,s=o.length;s>n;n++){
var c=o[n];
if(l(c)===!0){
a=c;
break;
}
}
return a;
}
}
}
},
showCpsTemplateDialog:function(e){
var t=h.getOptionsFromIframe(e);
if(t&&t.templateId){
var i=t.productData;
if(i&&i.length>0){
var r=this,a=(t.type,"card");
i[0].category_id==h.getMovieCategoryId()&&(a="banner"),new f.myclass({
color:C.curColor||"",
templateId:t.templateId,
showType:a,
productData:i[0],
editor:this.editor,
callback:function(t){
var i=r.editor.getDomUtils(),a=r.getNeighbor(e);
if(a&&a.opts&&a.iframeList&&0!=a.iframeList.length){
a.opts.templateId=t.id;
for(var o=this.editor.getUeditor(),n=a.iframeList.length-1;n>=0;n--){
var s=a.iframeList[n];
if(0==n){
var d=o.selection.getRange().selectNode(s).select();
d&&d.collapse(!0);
}
var l=s.parentNode;
if(h.clearIframeProductDataByDom(s),$(s).remove(),l&&!i.isBody(l)){
var u=c()(l);
if(u===!1){
if(0==n){
var d=o.selection.getRange().selectNode(l).select();
d&&d.collapse(!0);
}
$(l).remove();
}
}
}
r.insertHtml(a.opts);
}
}
});
}
}
},
getNeighbor:function(e){
var t=(this.editor.getDomUtils(),{
iframeList:[],
opts:null
});
if(!e)return t;
var i=e.getAttribute("data-uid"),r=$(this.editor.getUeditor().body);
if(e=r.find("."+C.className+"[data-uid="+i+"]"),!i||!e||0==e.length)return t;
if(e=e[0],t.opts=h.getOptionsFromIframe(e,!0),!t.opts)return t;
var a=1*t.opts.type;
if(2===a)return t.iframeList.push(e),t;
var n=0,s=void 0,c=[];
if(r.find("."+C.className).each(function(){
this===e&&(s=n),n++,c.push(this);
}),"undefined"==typeof s)return t;
for(var d=[],l=s-1;l>=0;l--){
var u=h.getOptionsFromIframe(c[l]);
if(1*u.type===2)break;
d.push(c[l]);
}
d.reverse();
for(var p=[],l=s+1,m=c.length;m>l;l++){
var u=h.getOptionsFromIframe(c[l]);
if(1*u.type===2)break;
p.push(c[l]);
}
var d=[],p=[],f=[].concat(d,c[s],p);
s=d.length;
var g={},v={
Previous:{
ratio:-1
},
Next:{
ratio:1
}
};
for(var y in v){
var a=y;
g[a]=[];
for(var _=v[y].ratio,n=s+_,I=f[s],b=f[n];b&&o(I,b,a)===!0;)g[a].push(b),I=b,n+=_,
b=f[n];
}
g.Previous.reverse(),t.iframeList=[].concat(g.Previous,f[s],g.Next),t.opts.productData=this.mergeProduct(t.iframeList);
for(var T=[],l=0,m=t.opts.productData.length;m>l;l++)T.push(t.opts.productData[l].pid);
return t.opts.productId=T,t;
},
mergeProduct:function(e){
for(var t=[],i=0,r=e.length;r>i;i++){
var a=h.getOptionsFromIframe(e[i]);
a&&a.productData&&(t=t.concat(a.productData));
}
return t;
}
},g.initEventInterface(a),a;
});define("common/wx/mpEditor/plugin/insert_product.js",["common/wx/dialog.js","common/wx/media/productDialog.js","common/wx/media/productTemplateDialog.js","common/wx/mpEditor/plugin/productUtils.js","common/wx/mpEditor/utils.js","tpl/mpEditor/plugin/product_popup.html.js","tpl/mpEditor/plugin/product_popup_icon.html.js","common/wx/Tips.js","biz_web/lib/store.js"],function(e){
"use strict";
function t(){
C.mpproductReg=new RegExp("<mpproduct([^>]*?)"+C.className+"([^>]*?)><\\/mpproduct>","g"),
C.mpproductRegReplace="<iframe $1"+C.className+"$2></iframe>",C.iframeReg=new RegExp("<iframe([^>]*?)"+C.className+"([^>]*?)><\\/iframe>","g"),
C.iframeRegReplace="<mpproduct $1"+C.className+"$2></mpproduct>";
var e=y.get(C.cacheProductKey)||{};
e.templateId&&(C.curTemplateId=e.templateId);
}
function r(e){
return e.find("iframe."+C.className).remove(),e.find("mpproduct").remove(),e.find("."+f.appmsgContainerClass).remove(),
e.find("."+f.appmsgLoopClass).remove(),e.find("."+f.appmsgProductErrClass).remove(),
e.find("section").each(function(){
this.firstChild||this.style.cssText||$(this).remove();
}),e;
}
function i(e){
this._o={
container:null,
clearProduct:!1,
can_see_product:!1,
can_use_smart:!1,
can_use_product:!1,
can_use_wxopen_link:!1
},this._g={
highlineCacheIframe:[],
highlineTarget:null,
highlineTimeoutId:null
},this._extend(e);
var t=this.getContainer();
t&&($(t).show(),this._o.container&&this._o.can_see_product===!0&&($(this._o.container).show(),
e.can_show_reddot&&$(this._o.container).addClass("tpl_item_reddot"))),this._o.can_see_product!==!0||this._o.can_use_product!==!0?this._o.clearProduct=!0:this.initTemplate(),
this.redbit=e.redbit||128,this.editor=null;
}
function o(e,t,r){
for(var i=window.UE.dom.domUtils,o=e,c=!0;o;){
if(i.isBody(o)){
c=!1;
break;
}
var d=i["find"+r+"Sibling"](o,n(t),!1);
if(d&&!i.isBody(d)){
var l=i["find"+r+"Sibling"](o,s(d),!1);
if(l&&l!==d&&!i.isBody(l)){
c=!1;
break;
}
if(d===t){
c=!0;
break;
}
var u="";
if("Next"==r?u="Previous":"Previous"==r&&(u="Next"),a(t,d,u)){
c=!1;
break;
}
c=!0;
break;
}
if(d=i["find"+r+"Sibling"](o,s(),!1),d&&!i.isBody(d)){
c=!1;
break;
}
o=o.parentNode;
}
return c;
}
function a(e,t,r){
for(var i=window.UE.dom.domUtils,o=e,a=!1;o&&o!==t;){
var n=i["find"+r+"Sibling"](o,s(),!1);
if(n&&!i.isBody(n)){
a=!0;
break;
}
o=o.parentNode;
}
return a;
}
function n(e){
var t=window.UE.dom.domUtils,r=e.getAttribute("data-uid");
return function(i){
if(t.isBody(i))return!0;
if(1==i.nodeType){
if(e===i)return!0;
var o=$(i).find("."+C.className+"[data-uid="+r+"]");
return o&&o.length>0?!0:!1;
}
return!1;
};
}
function s(e){
var t=window.UE.dom.domUtils;
return function(r){
if(t.isBody(r))return!0;
if("undefined"!=typeof e&&r===e)return!0;
if(1==r.nodeType){
if("br"==r.nodeName.toLowerCase())return!1;
var i=r.innerText.replace(/[\r\n\s]/g,"").replace(t.fillCharReg,"");
if(r.style.cssText||i.length>0)return!0;
var o=["p","section","span"],a=","+o.join(",")+",",n=r.nodeName.toLowerCase();
if(a.indexOf(","+n+",")>=0){
if(0==r.childElementCount)return!1;
var s=$(r.cloneNode(!0));
s.find("br").remove();
for(var c=[],d=0,l=o.length;l>d;d++){
var u=o[d];
s.find(u).each(function(){
0!=this.childElementCount||this.style.cssText||c.push(this);
});
}
for(var d=0,l=c.length;l>d;d++)$(c[d]).remove();
return 0===s[0].childElementCount?!1:!0;
}
return!0;
}
if(3==r.nodeType){
var i=r.nodeValue.replace(/[\r\n\s]/g,"").replace(t.fillCharReg,"");
return i.length>0?!0:!1;
}
return!1;
};
}
function c(e,t){
for(var r=window.UE.dom.domUtils,i=e;i&&!r.isBody(i);){
var o=r["find"+t+"Sibling"](i,l,!1);
if(o){
i=o;
break;
}
i=i.parentNode;
}
if(i&&!r.isBody(i)&&1==i.nodeType){
if(d(i)===!0)return i;
var a=$(i).find("."+C.className).eq(0)[0];
if(a){
var n;
"Next"==t?n="Previous":"Previous"==t&&(n="Next");
for(var s=a;s&&!r.isBody(s)&&s!==i;){
var o=r["find"+n+"Sibling"](s,l,!1);
if(o){
s=o;
break;
}
s=s.parentNode;
}
return s&&!r.isBody(s)&&s!==i?null:a;
}
}
return null;
}
function d(e){
return e&&1==e.nodeType&&/^iframe$/i.test(e.nodeName)&&(e.className||"").indexOf(C.className)>=0?!0:!1;
}
function l(e){
var t=window.UE.dom.domUtils;
return t.isBody(e)||3==e.nodeType&&0==(e.nodeValue||"").replace(t.fillCharReg,"").length?!1:!0;
}
var u=e("common/wx/dialog.js"),p=e("common/wx/media/productDialog.js"),m=e("common/wx/media/productTemplateDialog.js"),f=e("common/wx/mpEditor/plugin/productUtils.js"),h=e("common/wx/mpEditor/utils.js"),g=e("tpl/mpEditor/plugin/product_popup.html.js"),v=e("tpl/mpEditor/plugin/product_popup_icon.html.js"),_=e("common/wx/Tips.js"),y=e("biz_web/lib/store.js"),C={
hasTemplateData:!1,
afterTemplateQueue:[],
maxLen:200,
curColor:f.defaultColor,
colorCacheMax:10,
curTemplateId:"",
PopupTplCompile:template.compile(g),
PopupIconTplCompile:template.compile(v),
iframeUid:"insert_product_iframe_ready",
className:"js_editor_product",
cacheProductKey:"editorProductInfo_"+window.wx.data.uin,
defaultColorList:["#fa7834","#09BB07","#D54036","#9058CB"],
productStyleText:"width:100% !important;border:0;"
};
return t(),i.afterSetContent=function(e){
var t=[],r=e.$dom,i=e.funcUid;
r.find("mpproduct").each(function(){
var e=$(this),r=e.attr("data-uid")||"";
r||(r=h.getuid(),e.attr("data-uid",r)),e.attr("src",h.getIframeSrc(r,i)),t.push(e);
}),h.createAsynRenderIframe(t);
},i.beforeSetContent=function(e){
if(!e.html)return"";
if(e.clearProduct===!0){
var t=$("<div>").html(e.html);
return t=r(t),t.html();
}
if(/<mpproduct\s/.test(e.html)){
var i,t=$("<div>").html(e.html),o=[];
t.find("mpproduct").each(function(){
var t,r=$(this);
e.isPreview===!0?(t=h.getuid(),r.attr("data-uid",t)):i=r.attr("data-color");
var a=r.parents("p");
if(a&&a.length>0)for(var n=0,s=a.length;s>n;n++)o.push(a[n]);
f.getDataFromCustomTag(this);
}),i&&f.validColor(i)&&(C.curColor=i);
for(var a=0,n=o.length;n>a;a++){
var s=o[a];
s&&1==s.nodeType&&"p"==s.nodeName.toLowerCase()&&s.parentNode&&$(s).replaceTagName("section");
}
return e.html=t.html(),e.html;
}
return e.html;
},i.prototype={
_extend:function(e){
for(var t in e)this._o[t]=e[t];
},
getName:function(){
return"insertproduct";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
{
var e=this;
this._o;
}
return function(){
var t=e.editor;
if(t){
if(e._o.can_use_product!==!0){
var r="未关联开通微信支付的小程序，暂无法使用商品组件能力%s去关联%s",i="";
return i=e._o.can_use_wxopen_link===!0?"<p style='text-align:center'><a href='"+wx.url("/cgi-bin/wxopen?action=list")+"' target='_blank'>":"<p style='text-align:center'><a href='"+wx.url("/cgi-bin/wxopen?action=apply_page")+"' target='_blank'>",
void u.show({
title:"选择商品",
type:"info",
msg:r.sprintf(i,"</a></p>"),
className:"dialog-product-not-support",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
}
var o=e.getCurProductCount();
return o>=C.maxLen?void _.err("最多插入%s个商品".sprintf(C.maxLen)):void new p({
can_use_smart:e._o.can_use_smart,
maxLen:C.maxLen-o,
editor:t,
callback:function(t){
C.curTemplateId&&f.getTemplateDataById(C.curTemplateId)&&(t.templateId=C.curTemplateId),
e.insertHtml(t);
}
});
}
};
},
initTemplate:function(){
C.hasTemplateData!==!0&&f.getTemplate({
callback:function(){
C.hasTemplateData=!0;
for(var e=0,t=C.afterTemplateQueue.length;t>e;e++){
var r=C.afterTemplateQueue[e];
"function"==typeof r&&r();
}
C.afterTemplateQueue=[];
}
});
},
addListener:function(e){
if(this._o.clearProduct!==!0){
var t=this;
this.domUtils=this.editor.getDomUtils(),this.createIframeReadyFunc(),this.showPopup(e),
e.addListener("beforesavescene",function(e,t){
t&&t.content&&(t.content=t.content.replace(C.iframeReg,C.iframeRegReplace));
}),e.addListener("afterscencerestore",function(){
t.afterSetContent();
}),e.addListener("show_product_template_dialog",function(e,r,i){
$(r).parents(".js_product_popup").find(".js_color_picker").hide(),t.showProductTemplateDialog(i);
}),e.addListener("beforepaste",function(e,r){
var i=$("<div></div>").html(r.html);
i=t.filterData(i),r.html=i.html();
}),e.addListener("toggle_product_color",function(e,t,r){
t=t||window.event;
var i=$(t.target||t.srcElement);
if(i.hasClass("js_toggle")){
var o=$(r).find(".js_color_picker");
o.is(":hidden")?o.show():o.hide();
}
}),e.addListener("product_color_pick",function(e,r,i,o){
r=r||window.event;
var a=$(r.target||r.srcElement);
if(a.hasClass("js_color_icon")){
var n=a.attr("data-color"),s=a.parents(".js_color_picker"),c=t.pickColor(s,n,o);
c===!0&&this.fireEvent("hide_common_popup");
}
}),e.addListener("product_color_change",function(e,r,i,o){
var a=$(i),n=a.parents(".js_color_picker"),s=n.find("input.js_color_input").val(),c=n.find(".js_fail");
if(s&&f.validColor(s)){
c.hide(),r=r||window.event;
var d=r.keyCode||r.which||0;
if("click"==r.type||"keyup"==r.type&&13==d){
var l=t.pickColor(n,s,o);
l===!0&&this.fireEvent("hide_common_popup");
}
}else s?c.show().find(".js_fail_msg").text("请输入合法颜色值，如#666666"):c.hide();
}),e.addListener("common_popup_mouseover",function(e,r,i,o){
if(d(o)){
var a=t._g,n=$(i).find(".js_template")[0];
if(n){
var s=n.getBoundingClientRect();
r.clientX<parseInt(s.left)||r.clientX>parseInt(s.right)||r.clientY<parseInt(s.top)||r.clientY>parseInt(s.bottom)?t.cancelHighline():(a.highlineTimeoutId&&(clearTimeout(a.highlineTimeoutId),
a.highlineTimeoutId=null),(0==a.highlineCacheIframe.length||a.highlineTarget!==o)&&(a.highlineTarget=o,
a.highlineCacheIframe=t.getNeighbor(o).iframeList||[],t.highLineIframe(!0)));
}else t.cancelHighline();
}
}),e.addListener("common_popup_mouseout",function(e,r,i,o){
d(o)&&t.cancelHighline();
}),e.addListener("beforekeydown",function(e,r){
if(r=r||window.event,r&&r.type){
var i=r.keyCode||r.which;
if(8==i||46==i){
var o=this.selection.getRange();
if(o.collapsed){
var a;
if(8==i){
if(1==o.startContainer.nodeType)a=o.startContainer.childNodes[o.startOffset-1];else if(3==o.startContainer.nodeType){
var n=o.startContainer.nodeValue.charAt(o.startOffset-1)||"";
n=n.replace(t.domUtils.fillCharReg,""),n&&(a=o.startContainer);
}
a||(a=c(o.startContainer,"Previous"));
}else if(46==i){
if(1==o.startContainer.nodeType)a=o.startContainer.childNodes[o.startOffset];else if(3==o.startContainer.nodeType){
var n=o.startContainer.nodeValue.charAt(o.startOffset)||"";
n=n.replace(t.domUtils.fillCharReg,""),n&&(a=o.startContainer);
}
a||(a=c(o.startContainer,"Next"));
}
if(a&&d(a)===!0)return this.selection.getRange().selectNode(a).select(!0),r.stopPropagation?(r.stopPropagation(),
r.preventDefault()):r.cancelBubble=!0,!1;
}
}
}
});
}
},
cancelHighline:function(){
this._g.highlineTimeoutId&&(clearTimeout(this._g.highlineTimeoutId),this._g.highlineTimeoutId=null);
var e=this;
this._g.highlineTimeoutId=setTimeout(function(){
e.highLineIframe(!1),e._g.highlineTarget=null,e._g.highlineCacheIframe=[];
},100);
},
getContainer:function(){
return this._o.can_see_product?this._o.container:"";
},
getTitle:function(){
return"添加商品";
},
beforeSetContent:function(e,t){
return i.beforeSetContent({
isPreview:t,
html:e,
clearProduct:this._o.clearProduct
});
},
afterSetContent:function(e){
i.afterSetContent({
$dom:e||$(this.editor.getUeditor().body),
funcUid:this.getIframeFuncUid()
});
},
getPluginData:function(e){
var t=e.init(),r=t.get("content");
if(r=r.replace(C.iframeReg,C.iframeRegReplace),this._o.clearProduct===!0){
var i=$("<div>").html(r);
return i=this.filterData(i),r=i.html(),t.set("content",r),t;
}
if(/<mpproduct\s/.test(r)){
var i=$("<div>").html(r),o=[];
i.find("mpproduct").each(function(){
var e=$(this),t=e.parents("p");
if(t&&t.length>0)for(var r=0,i=t.length;i>r;r++)o.push(t[r]);
e.attr("style",C.productStyleText),e.removeAttr("src"),f.setData2CustomTag(this);
});
for(var a=0,n=o.length;n>a;a++){
var s=o[a];
s&&1==s.nodeType&&"p"==s.nodeName.toLowerCase()&&s.parentNode&&$(s).replaceTagName("section");
}
r=i.html();
}
return t.set("content",r),t;
},
filterData:function(e){
return r(e);
},
getIframeFuncUid:function(){
var e=this.editor.getUeditor().uid;
return C.iframeUid+"_"+e;
},
beforeEditorDestory:function(){
h.clearIframeReadyFunc(this.getIframeFuncUid());
},
highLineIframe:function(e){
var t=this._g.highlineCacheIframe;
if(t){
{
this.initHighlineDom();
}
e?(this.showHighlineDom(),this.attachToHighline(t)):this.hideHighlineDom();
}
},
initHighlineDom:function(){
if(this._g.highlineDom)return this._g.highlineDom;
var e=this.editor.getUeditor(),t=document.createElement("div");
return t.id=e.ui.id+"_product_highline",t.style.cssText="position: absolute;left: 72px;border: 2px solid #43b548;box-sizing: border-box;right: 72px;display:none;z-index:"+e.options.zIndex+";",
e.ui.getDom().appendChild(t),this._g.highlineDom=t,t;
},
showHighlineDom:function(){
this._g.highlineDom.style.display="block";
},
hideHighlineDom:function(){
this._g.highlineDom.style.display="none";
},
attachToHighline:function(e){
if(e&&0!=e.length){
var t=UE.ui.uiUtils,r=this.editor.getUeditor(),i=this.editor.getDomUtils(),o=this._g.highlineDom,a=e[0],n=e[e.length-1],s=i.getXY(a),c=t.getClientRect(a),d=t.getClientRect(n),l=i.getXY(r.iframe),u=i.getXY(this._g.highlineDom.parentNode);
i.setStyles(o,{
height:d.bottom-c.top+"px",
top:l.y+s.y-r.document.body.scrollTop-u.y-parseInt(o.style.borderTopWidth)+"px"
});
}
},
pickColor:function(e,t,r){
if(f.validColor(t)){
e.find("input").val(t),e.find(".js_fail").hide();
var i=y.get(C.cacheProductKey)||{},o=[];
i.color&&(o=i.color||[]);
var a=o.length>0?","+o.join(",")+",":"",n=","+C.defaultColorList.join(",")+",",s=","+t+",";
return-1!=n.indexOf(s)||a&&-1!=a.indexOf(s)||(o.unshift(t),o.length>C.colorCacheMax&&o.splice(C.colorCacheMax),
i.color=o,y.set(C.cacheProductKey,i)),this.changeProductColor(t,r),!0;
}
return!1;
},
changeProductColor:function(e,t){
var r=f.validColor(e);
if(r){
C.curColor=e;
var i=$(this.editor.getUeditor().body),o=0,a=0,n=[];
i.find("."+C.className).each(function(){
var r=$(this),i=f.getOptionsFromIframe(this);
i.color=e,n.push(r),t&&this===t&&(a=o),o++;
});
var s=[];
if(a>0){
s.push(n[a]);
for(var c=a-1,d=a+1;c>=0||d<n.length;)n[c]&&s.push(n[c]),n[d]&&s.push(n[d]),c--,
d++;
}else s=n;
this.editor.fireEvent("saveScene"),h.createAsynIframeReload(s);
}
},
createIframeReadyFunc:function(){
var e=this.editor.getUeditor().uid;
h.createIframeReadyFunc({
uid:this.getIframeFuncUid(),
force:!0,
notClear:!0,
iframeSelect:!0,
onIframeReadyFunc:function(e,t,r){
return function(i){
var o=function(){
var o=t(i.iframe);
o&&(i.doc.body.innerHTML=o,r(i.iframe,i.doc.body,e));
};
C.hasTemplateData===!0?o():C.afterTemplateQueue.push(o);
};
}(e,f.getIframeContentByIframe,f.addIframeImgLoadEvent)
});
},
insertHtml:function(e){
var t=f.getTemplateDataById(e.templateId);
if(t&&t.loop){
var r=y.get(C.cacheProductKey)||{};
r.templateId=e.templateId,y.set(C.cacheProductKey,r),C.curTemplateId=e.templateId;
var i=[],o=[],a=[],n=[];
if(2==e.type)i=[].concat(e.productData.splice(0,e.smartNum)),a.push(i),n.push(e.productId);else for(i=[].concat(e.productData),
o=[].concat(e.productId);i.length>0;)a.push(i.splice(0,t.loop)),n.push(o.splice(0,t.loop));
for(var s=[],c=0,d=a.length;d>c;c++){
var l=["<section>","","</section>"],u=f.cacheIframeData({
type:e.type,
productData:a[c],
templateId:e.templateId,
productId:n[c],
packId:e.packId,
smartNum:e.smartNum,
color:e.color||C.curColor
});
l[1]=this.createLocalIframe({
datakey:u
}),s.push(l.join(""));
}
s=s.join("").replace(/<iframe /g,"<mpproduct ").replace(/<\/iframe>/g,"</mpproduct>");
var p=this.editor.execCommand("insertHtml",s),m=[],g=this.getIframeFuncUid();
$(p).find("mpproduct").each(function(){
var e=$(this),t=e.attr("data-uid")||"";
t||(t=h.getuid(),e.attr("data-uid",t)),e.attr("src",h.getIframeSrc(t,g)),m.push(e);
}),h.createAsynRenderIframe(m);
}
},
createLocalIframe:function(e){
var t=this.getIframeFuncUid();
return function(t,r,i){
return h.createLocalIframe({
noSrc:!0,
uid:r,
attr:{
" frameborder":"0",
"class":i,
"data-datakey":e.datakey,
style:C.productStyleText
}
});
}(e,t,C.className);
},
getCurProductCount:function(){
var e=$(this.editor.getUeditor().body),t=0;
return e.find("."+C.className).each(function(){
var e=f.getOptionsFromIframe(this),r=($(this),e.type),i=1*e.smartNum,o=e.productId||[];
t+=2==r?i:o.length;
}),t;
},
getNotRenderProductCount:function(){
return $(this.editor.getUeditor().body).find("mpproduct").length;
},
showPopup:function(e){
e.getUeditor();
e.addListener("mouseover_common_popup",function(e,t,r){
var i=r.target||r.srcElement;
if(d(i)===!0){
var o=y.get(C.cacheProductKey)||{};
o=o.color?o.color||[]:[],o=[].concat(o,C.defaultColorList);
var a=C.PopupIconTplCompile({
list:o
});
t.html+=C.PopupTplCompile({
colorList:a
}),t.adjust=!0,t.node=i;
}
});
},
getProductIframeFromRange:function(e,t){
if(e){
var r=e[t+"Container"];
if(r&&1==r.nodeType){
var i=r.childNodes[e[t+"Offset"]];
if(i&&1==i.nodeType){
if(d(i)===!0)return i;
for(var o,a=i.getElementsByTagName("iframe"),n=0,s=a.length;s>n;n++){
var c=a[n];
if(d(c)===!0){
o=c;
break;
}
}
return o;
}
}
}
},
showProductTemplateDialog:function(e){
var t=f.getOptionsFromIframe(e);
if(t&&t.templateId){
var r=t.productData;
if(r&&r.length>0){
{
var i=this;
t.type;
}
new m.myclass({
color:C.curColor||"",
templateId:t.templateId,
productData:r[0],
editor:this.editor,
callback:function(t){
var r=i.editor.getDomUtils(),o=i.getNeighbor(e);
if(delete o.iframeList,o.iframeList=[],o.iframeList.push(e),o&&o.opts&&o.iframeList&&0!=o.iframeList.length){
o.opts.templateId=t.id;
for(var a=this.editor.getUeditor(),n=o.iframeList.length-1;n>=0;n--){
var c=o.iframeList[n];
if(0==n){
var d=a.selection.getRange().selectNode(c).select();
d&&d.collapse(!0);
}
var l=c.parentNode;
if(f.clearIframeProductDataByDom(c),$(c).remove(),l&&!r.isBody(l)){
var u=s()(l);
if(u===!1){
if(0==n){
var d=a.selection.getRange().selectNode(l).select();
d&&d.collapse(!0);
}
$(l).remove();
}
}
}
i.insertHtml(o.opts);
}
}
});
}
}
},
getNeighbor:function(e){
var t=(this.editor.getDomUtils(),{
iframeList:[],
opts:null
});
if(!e)return t;
var r=e.getAttribute("data-uid"),i=$(this.editor.getUeditor().body);
if(e=i.find("."+C.className+"[data-uid="+r+"]"),!r||!e||0==e.length)return t;
if(e=e[0],t.opts=f.getOptionsFromIframe(e,!0),!t.opts)return t;
var a=1*t.opts.type;
if(2===a)return t.iframeList.push(e),t;
var n=0,s=void 0,c=[];
if(i.find("."+C.className).each(function(){
this===e&&(s=n),n++,c.push(this);
}),"undefined"==typeof s)return t;
for(var d=[],l=s-1;l>=0;l--){
var u=f.getOptionsFromIframe(c[l]);
if(1*u.type===2)break;
d.push(c[l]);
}
d.reverse();
for(var p=[],l=s+1,m=c.length;m>l;l++){
var u=f.getOptionsFromIframe(c[l]);
if(1*u.type===2)break;
p.push(c[l]);
}
var h=[].concat(d,c[s],p);
s=d.length;
var g={},v={
Previous:{
ratio:-1
},
Next:{
ratio:1
}
};
for(var _ in v){
var a=_;
g[a]=[];
for(var y=v[_].ratio,n=s+y,I=h[s],T=h[n];T&&o(I,T,a)===!0;)g[a].push(T),I=T,n+=y,
T=h[n];
}
g.Previous.reverse(),t.iframeList=[].concat(g.Previous,h[s],g.Next),t.opts.productData=this.mergeProduct(t.iframeList);
for(var w=[],l=0,m=t.opts.productData.length;m>l;l++)w.push(t.opts.productData[l].pid);
return t.opts.productId=w,t;
},
mergeProduct:function(e){
for(var t=[],r=0,i=e.length;i>r;r++){
var o=f.getOptionsFromIframe(e[r]);
o&&o.productData&&(t=t.concat(o.productData));
}
return t;
}
},h.initEventInterface(i),i;
});define("common/wx/mpEditor/plugin/video.js",["common/wx/popup.js","biz_common/utils/url/parse.js","common/wx/media/videoUtils.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/getVinfo.js","common/wx/mpEditor/common/eventbus.js","common/wx/Cgi.js","common/wx/mpEditor/plugin/filter.js"],function(t){
"use strict";
function e(t){
var e=27,r=wx.getBanInfo&&wx.getBanInfo(e);
return r&&t&&v.show({
msg:"经用户投诉，你的帐号上传的视频%s，已封禁添加视频能力至%s。".sprintf(r.reason_desc,r.ban_time==r.unlock_time?"永久":i(r.unlock_time)),
buttons:[{
text:"返回",
click:function(){
this.remove();
}
}]
}),r;
}
function i(t){
var e=new Date(1e3*t);
return e.getFullYear()+"年"+(e.getMonth()+1)+"月"+e.getDate()+"日";
}
function r(t){
if(!t)return h.ratio;
for(var e=[4/3,16/9],i=e[0],r=Math.abs(i-t),n=1,a=e.length;a>n;n++){
var o=Math.abs(e[n]-t);
r>o&&(r=o,i=e[n]);
}
return i;
}
function n(t){
var e=arguments[1]||window.location.search,i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),r=e.substr(e.indexOf("?")+1).match(i);
return null!=r?r[2]:"";
}
function a(t,e){
var i,r=$(t).find("iframe");
return r.each(function(){
var t=$(this),r=t.attr("src")||t.attr("data-src");
return n("vid",r)==e?(i=t,!1):void 0;
}),i;
}
function o(t){
if(t&&1==t.nodeType&&"iframe"==t.tagName.toLowerCase()){
var e=t.attributes;
if(e&&e.length>0){
for(var i=[],r=","+h.attrList.join(",")+",",n=0,a=e.length;a>n;n++)-1==r.indexOf(e[n].name)&&i.push(e[n].name);
for(var n=0,a=i.length;a>n;n++)t.removeAttribute(i[n]);
}
}
}
function d(t,e,i){
return t.find("iframe").each(function(){
var t=$(this),a=s(t),d=t.attr("data-src")||t.attr("src")||"",v=t.attr("data-vidtype");
if(1==a)t.remove();else if(2==a)t.remove();else if(3==a){
var c=n("vid",d);
if(c){
o(this),t.addClass("video_iframe wx_video_iframe"),t.removeAttr("data-src");
var f=e?m.getPreviewPhoneWidth():i,u=1*t.data("ratio");
u=u?r(u):h.ratio;
var l=Math.round(f/u);
e?t.css({
width:f,
height:l
}):t.removeAttr("style"),e===!0?(t.attr("width",f),t.attr("height","auto"),t.attr("src",m.getPlayurlByVid(c,t.attr("data-mpvid")?1:0,f,"auto",!0))):(t.attr("width",f),
t.attr("height",l),t.attr("src","/cgi-bin/readtemplate?t=tmpl/video_tmpl&vid="+c)),
v||t.attr("data-vidtype","-1");
}else t.remove();
}else t.removeClass("video_iframe");
}),t;
}
function s(t){
var e=$(t),i=e.attr("data-src")||e.attr("src")||"";
return i.indexOf("//mp.weixin.qq.com/mp/getcdnvideourl?")>=0?1:/^http(s)*:\/\/z\.weishi\.com\/weixin\/player\.html/.test(i)?2:/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(i)||i.indexOf("/cgi-bin/readtemplate?t=tmpl/video_tmpl")>=0||/http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/.test(i)||/http(s)*\:\/\/v\.qq\.com\/txp\/iframe\/(preview|player)\.html\?/.test(i)?3:-1;
}
t("common/wx/popup.js");
var m=(t("biz_common/utils/url/parse.js"),t("common/wx/media/videoUtils.js")),v=t("common/wx/dialog.js"),c=t("common/wx/Tips.js"),f=t("common/wx/getVinfo.js"),u=t("common/wx/mpEditor/common/eventbus.js"),l=(t("common/wx/Cgi.js"),
t("common/wx/mpEditor/plugin/filter.js")),h={
ratio:16/9,
maxLength:3,
attrList:["data-src","class","data-vidtype","allowfullscreen","frameborder","style","height","width","src","data-ratio","data-w","scrolling","data-vh","data-vw","data-cover","data-mpvid"]
},p=(wx.cgiData,function(t){
t&&t.container&&(this.domid=t.container,this.container=$(t.container).show(),t.can_show_reddot&&this.container.addClass("tpl_item_reddot")),
this.redbit=t.redbit||2;
var e=this;
e.report_vid_type=[],e.can_use_txvideo=t.can_use_txvideo,e.show_share_dialog=t.show_share_dialog,
this._g={
renderId:null
};
});
return p.beforeSetContent=function(t){
var e=d($("<div></div>").html(t.html),t.isPreview,t.width);
return e.html();
},p.prototype={
getName:function(){
return"insertvideo";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
var i=t.editor,r=this;
if(i){
var n=e(!0);
n||(t.getIframeLen()<h.maxLength?u.fireEvent("showVideoDialog",{
scene:"ueditor",
allowChooseLength:3-t.getIframeLen(),
canusetxvideo:!!t.can_use_txvideo,
showsharedialog:!!t.show_share_dialog
},function(e,n){
if(!(t.getIframeLen()>=3)){
if(e&&Object.isObject(e)&&(e=[e]),e&&Array.isArray(e)){
for(var a=e.length>3?3:e.length,o=0;a>o;o++){
var d=e[o];
"library"==n?(d.height=375,d.width=500,d.vid=d.content,d.vidtype=2):0==d.subtype?d.vidtype=1:1==d.subtype?d.vidtype=4:2==d.subtype?d.vidtype=5:3==d.subtype&&(d.vidtype=6);
}
e=e.slice(0,a),t.doCommand(r,"insertvideo",e),"library"==n?i.funcPvUvReport("mpvideo",a):i.funcPvUvReport("qqvideo",a);
}
return!0;
}
}):c.err("每篇图文最多添加三个视频"));
}
};
},
doCommand:function(t,e,i){
console.log("insert video");
var r=t;
i=UE.utils.isArray(i)?i:[i];
for(var n,a=[],o=$(this.editor.getDocument().body).width(),d=Math.round(o/h.ratio),s=0,v=i.length;v>s;s++){
n=i[s];
var c="";
n.vidtype&&(c+="data-vidtype='"+n.vidtype+"'"),n.is_mp_video&&(c+=' data-mpvid="'+n.vid+'"'),
n.cover&&(c+=' data-cover="'+encodeURIComponent(n.cover)+'"'),a.push(m.creatInsertStr({
vid:n.vid,
width:o,
height:d,
attr:c,
editFrame:!0
}));
}
r.execCommand("inserthtml",a.join(""),!0);
},
addListener:function(t){
var i=this;
t.addListener("ready",function(){
var t=this;
i._g.renderId&&clearTimeout(i._g.renderId),i._g.renderId=setTimeout(function(){
i.filterInputData($(t.body),!1);
},0);
}),t.addListener("beforepaste",function(t,r){
var n=i.filterInputData($("<div></div>").html(r.html)),a=n.find("iframe.video_iframe").length;
if(n.find(".img_loading[data-vid]").remove(),a){
var o=e(!0);
if(o)return r.html="",!0;
}
return i.getIframeLen()+a>h.maxLength?(c.err("每篇图文最多添加三个视频"),r.html="",!0):void(r.html=n.html());
}),t.addListener("afterpaste aftersetcontent afterinserthtml",function(e,i,r){
var a=$(r),o=a.filter("iframe.video_iframe").add(a.find("iframe.video_iframe"));
o.each(function(){
var e=$(this);
if(!e.attr("data-ratio")||!e.attr("data-w")){
var i=e.data("src")||e.attr("src")||"";
if(i){
var r=n("vid",i);
r&&!function(t,e){
var i=t.attr("data-mpvid")?!0:!1;
e.delegateDomAsyn({
dom:t,
timeout:15e3,
requsetFun:function(){
var t=this;
i?f.getMpVideoInfo({
vid:r,
onSuccess:function(e){
t.requsetSucFun(e);
},
onError:function(){
t.requsetFailFun();
}
}):f.getInfoByVid({
vid:r,
onSuccess:function(e){
t.requsetSucFun(e);
},
onError:function(){
t.requsetFailFun();
}
});
},
requsetSucFun:function(t,e){
if(t&&t.newDom){
var i,r;
e&&e.data&&(i=e.data.width||0,r=e.data.height||0),0!=i&&0!=r&&(t.newDom.attr("data-ratio",i/r),
t.newDom.attr("data-w",i));
}
},
requsetFailFun:function(t){
t&&t.newDom&&t.newDom.removeAttr("data-ratio").removeAttr("data-w");
}
});
}(e,t,r);
}
}
});
}),t.addListener("keydown",function(t,e){
var i=this.selection.getRange();
if(i.endOffset!==i.startOffset){
var r=i.startContainer,n=null;
if(r){
var a=r.nodeType;
1===a?n=r.children[i.endOffset-1]:3===a&&(n=r.parentNode);
}
if(n&&1===n.nodeType&&n.className.indexOf("video_iframe")>=0){
var o=e.keyCode||e.which;
if(13===o){
var d=n.parentNode,s=d.childNodes;
if(i.endOffset<s.length){
var m=this.document.createElement("p");
m.style.textAlign="center";
for(var v=i.startOffset;v>=0;v--)m.appendChild(s[0]);
d.insertAdjacentElement("beforebegin",m);
var c=d;
d=d.previousElementSibling,0===c.childNodes&&c.parentNode.removeChild(c);
}
return d.insertAdjacentHTML("afterend","<p><br></p>"),i.selectNodeContents(d.nextElementSibling).select(),
e.preventDefault(),this.fireEvent("saveScene"),!0;
}
}
}
});
},
getIframeLen:function(){
var t=this.editor.getDocument();
return $(t).find("iframe.video_iframe").length;
},
getContainer:function(){
return this.domid;
},
getQueryCommandState:function(){
return function(){
var t=this,e=t.selection.getRange().getClosedNode(),i=e&&"edui-faked-video"==e.className;
return i?1:0;
};
},
initPluginData:function(){
return["video_id","vid_type","shortvideofileid"];
},
getPluginData:function(t){
var e=t.init(this.initPluginData());
if(e.get("content")){
var i=this,r=$("<div></div>"),a=[],d=[],s=[];
return r.html(e.get("content")).find("iframe").each(function(){
var t=$(this),e=i.getTypeByDom(t),r=(t.attr("data-shortvideofileid"),t.attr("src")||t.attr("data-src")||""),s=t.attr("data-vidtype");
if(1==e)t.remove();else if(2==e)t.remove();else if(3==e){
var v=n("vid",r);
v&&(t.attr("data-src",m.getPlayurlByVid(v,t.attr("data-mpvid")?1:0,500,375)),t.removeAttr("src"),
t.addClass("video_iframe"),t.removeClass("wx_video_iframe"),t.removeAttr("width"),
t.removeAttr("height"),t.removeAttr("data-vh"),t.removeAttr("data-vw"),l.filterStyleAttr(t,["width","height"]),
o(t[0]),a.push(v),d.push(s||"-1"));
}else t.removeClass("video_iframe");
}),e.set("content",r.html()),e.set("video_id",a.join(",")),e.set("vid_type",d.join(",")),
e.set("shortvideofileid",s.join("|")),e;
}
},
getTypeByDom:function(t){
return s(t);
},
filterInputData:function(t,e){
var i=$(this.editor.getDocument().body).width();
return d(t,e,i);
},
beforeSetContent:function(t,e){
var i=$(this.editor.getDocument().body).width();
return p.beforeSetContent({
html:t,
isPreview:e,
width:i
});
}
},function(){
top.window.__crossFun||(top.window.__crossFun={});
var t=top.window.__crossFun;
t.__videoFrameClick||(t.__videoFrameClick=function(t){
var e=t.event.target||t.event.srcElement;
if(e){
var i=$(e);
if(i.hasClass("js_play_btn")&&!h.previewVideo){
var n,o,d=0;
t.win&&t.win.parent&&t.win.parent.document&&(n=a(t.win.parent.document,t.vid)),n&&n.length>0&&(o=n.attr("data-ratio"),
d=n.attr("data-mpvid")?1:0),o=r(o),h.previewVideo=!0,m.showVideoPreviewDialog({
vid:t.vid,
radio:o,
is_mp_video:d,
onClose:function(){
h.previewVideo=!1,setTimeout(function(){
window.__editorIframeSelect(t.win);
},0);
}
});
}else!!window.__editorIframeSelect&&window.__editorIframeSelect(t.win);
}
});
}(),p;
});define("common/wx/mpEditor/plugin/adv.js",["common/wx/popup.js","common/wx/Cgi.js","common/wx/media/adDialog.js","common/wx/Tips.js","biz_web/lib/store.js","tpl/media/dialog/auto_insert_tip_dialog.html.js","utils/common.js","common/wx/const.js","common/wx/mpEditor/common/eventbus.js"],function(t){
"use strict";
t("common/wx/popup.js");
var e=t("common/wx/Cgi.js"),i=t("common/wx/media/adDialog.js"),n=t("common/wx/Tips.js"),o=t("biz_web/lib/store.js"),r=(t("tpl/media/dialog/auto_insert_tip_dialog.html.js"),
t("utils/common.js")),a=t("common/wx/const.js"),d=t("common/wx/mpEditor/common/eventbus.js"),s=a.insertAdModeMap,c=a.maxArticleAdCount,l=a.maxArticleAutoInsertAdCount,m="iframe.js_cpc_area",_=function(t){
var e=this;
t&&t.container&&(this.domid=t.container,this.container=$(t.container).show(),t.can_show_reddot&&this.container.addClass("tpl_item_reddot")),
this.redbit=t.redbit||32,0==t.has_ad&&this.container&&this.container.length>0&&this.container.addClass("disabled"),
this.can_see_ad=t.can_see_ad||!1,this.redbit=t.redbit||1,t.can_see_ad&&t.has_ad&&!o.get(a.hasShowDoubleAutoInsertDialogKey)&&(d.fireEvent("showAdInsertStatementDialog"),
o.set(a.hasShowDoubleAutoInsertDialogKey,1)),document.addEventListener("EditorCpcEdit",function(){
console.log("触发iframe EditorCpcEdit"),e._editCpc(s.op);
}),document.addEventListener("EditorCpcDel",function(t){
console.log("触发iframe EditorCpcDel"),e._delCpc(t.adId);
});
};
return _.beforeSetContent=function(t){
if(!t.html)return"";
var e=t.html.replace(/<mpcpc([^>]*?)js_editor_cpcad([^>]*?)><\/mpcpc>/g,"<iframe $1js_editor_cpcad$2></iframe>"),i=$("<div>"+e+"</div>");
return t.can_see_ad||(i=_.filterData(i)),i.html();
},_.filterData=function(t){
return t.find("mpcpc").remove(),t.find("iframe.js_cpc_area").remove(),t;
},_.prototype={
getName:function(){
return"insertad";
},
getContainer:function(){
return this.domid;
},
noCommandReprot:function(){
return!0;
},
fireSetArticleAdModeEvent:function(t){
this.editor.fireEvent("setArticleAdMode",t);
},
fireSetArticleAdCategoriesListEvent:function(t){
this.editor.fireEvent("setArticleAdCategoriesList",t);
},
saveToGlobalSetting:function(t,i,n){
t&&e.post({
url:"/merchant/ad_seller_manager?action=set_ad_setting",
data:{
insert_ad_mode:i,
categories_list:JSON.stringify(n)
}
});
},
getExecCommand:function(t){
var e=this;
return function(){
console.log("insert ad");
var o=e.editor,r=this;
if(!o)return!1;
var a=$(o.getDocument()).find(m),d=a.attr("data-category_id_list"),_=a.length,p=_>=c,u=$(".js_appmsg_item.current").data("insertadmode")===s.auto,f="block"===$(".appmsg_edit_ad_preview").css("display"),h=p?c:u?l:1;
return $("#js_pay_setting_area .js_pay_setting_radio").eq(1).parent().hasClass("selected")?(n.err("付费图文不可插入广告"),
!1):(p||u||f)&&!t?(n.err(u?"已插入智能插入文中广告，无法继续插入其他广告，可在编辑器底部进行修改":f?"已插入互选广告，无法继续插入其他广告":"每篇图文消息只可插入"+h+"个广告卡片"),
!1):wx.cgiData.has_ad?void new i({
showStep2:t,
articleAdCount:_,
insertAdMode:_?s.op:void 0,
cpc_edit_data:_?{
category_id_list:d?d.split("|"):d
}:void 0,
idx:$(".js_appmsg_item.current").data("msgindex"),
onOK:function(t){
e.insertOrEditAd(r,t);
}
}):(n.err("暂无可插入的广告卡片"),!1);
};
},
insertOrEditAd:function(t,e,i){
var n=this.editor,o=e.insertAdMode,r=e.category_id_list,a=!!e.ad_id;
if(o=a?s.none:o,this.fireSetArticleAdModeEvent(o),n.fireEvent("editAd"),o!==s.op&&this._delCpc(),
a)return void this._insertSponsor(t,e);
if(o===s.auto)return this.fireSetArticleAdCategoriesListEvent(r),void this.saveToGlobalSetting(e.ifSaveToGlobal,o,r);
o!==s.op||i&&i===s.op||this._insertCpcCatsItems(n,r);
var d=$(n.getDocument());
d.find(m).attr("data-category_id_list",r.join("|")),n.fireEvent("hideAllErrMsg");
},
initPluginData:function(){},
beforeSetContent:function(t){
return _.beforeSetContent({
html:t,
can_see_ad:this.can_see_ad
});
},
addListener:function(t){
var e=this;
t.addListener("beforepaste",function(t,i){
var n=$("<div>"+i.html+"</div>");
n=e._filterData(n),i.html=n.html();
}),t.addListener("openCpcSetting",function(){
e._editCpc(s.auto);
});
},
getPluginData:function(t){
var e=t.init(this.initPluginData()),i=e.get("content");
if(i){
var n=$("<div>"+i+"</div>");
this.can_see_ad||(n=this._filterData(n)),e.set("content",n.html().replace(/<iframe([^>]*?)js_editor_cpcad([^>]*?)><\/iframe>/g,"<mpcpc $1js_editor_cpcad$2></mpcpc>"));
}
},
dispatchEventToIframe:function(t,e){
var i=t.contentDocument,n=i.createEvent("Event");
n.initEvent("SetAdValidStatus",!0,!0),n.invalidReasons=e,i.dispatchEvent(n);
},
check:function(t,e){
var i=this,n=t.html(),o=a.textCountAroundAd,d="js_editor_cpcad";
if(-1!==n.indexOf(d)){
for(var c,l=n.split(d),_=[],p=0;p<l.length;p++)p&&(l[p]="<mpcpc "+l[p]),p<l.length-1&&(l[p]+=">"),
_.push(r.getHtmlText(l[p]).length>=o);
return c=-1===_.indexOf(!1),setTimeout(function(){
for(var t,e,n=!0,r=$(i.editor.getDocument()).find(m),a=0;a<r.length;a++){
t=[];
var d=r[a];
if(_[a]||t.push((a?"距离前一个广告卡片未满":"广告卡片前未满")+o+"个字符"),_[a+1]||t.push((a!==r.length-1?"距离下一个广告卡片未满":"广告卡片后未满")+o+"个字符"),
d){
i.dispatchEventToIframe(d,t),d.contentWindow.onload=function(t,e){
return function(){
i.dispatchEventToIframe(t,e);
};
}(d,t);
var s=d.contentDocument,l=s.createEvent("Event");
l.initEvent("SetAdValidStatus",!0,!0),l.invalidReasons=t,s.dispatchEvent(l);
}
n=n&&!t.length,n||e||(e=d);
}
c||i.editor.fireEvent("scrollIntoView",e,-250);
},20),c;
}
if(e&&e.insert_ad_mode===s.auto){
var u;
try{
u=JSON.parse(e.sections);
}catch(f){
return!0;
}
for(var h=!1,g=0;g<u.length;g++)if(u[g].ad_available)return h=!0,!0;
if(!h)return{
msg:"广告只能插入在段落之间的位置，且这个位置前后内容需要超过"+o+"个字符，文章中没有位置符合该要求（插入商品时不受此限制）"
};
}
return!0;
},
_showErrMsg:function(t){
var e=$(this.editor.getDom()).find(".js_content_error");
this.editor.fireEvent("showErrMsg",e,t),this.editor.fireEvent("scrollIntoView",e,200);
},
_editCpc:function(t){
var e=this,n=this.editor,o=$(n.getDocument()).find(m),r=t===s.op?o.attr("data-category_id_list")||"":$(".js_appmsg_item.current").data("categorieslist");
new i({
idx:$(".js_appmsg_item.current").data("msgindex"),
articleAdCount:o.length,
insertAdMode:t,
cpc_edit_data:{
category_id_list:r?r.split("|"):r
},
editCpc:!0,
onOK:function(i){
e.insertOrEditAd(n,i,t);
}
}),console.log("_editCpc");
},
_delCpc:function(t){
var e=$(this.editor.getDocument()).find(m);
void 0!==t&&(e=e.filter(t?"[data-id="+t+"]":":not([data-id])")),e.remove(),this.editor.fireEvent("adjustheight");
},
_filterData:function(t){
return _.filterData(t);
},
_insertCpcCatsItems:function(t,e){
var i=t,n=e.join("|"),o=Date.now(),r=['<iframe js_editor_cpcad class="js_cpc_area res_iframe cpc_iframe"','src="/cgi-bin/readtemplate?t=tmpl/cpc_tmpl#',o,'" ','data-category_id_list="',n,'" ','data-id="',o,'"',"></iframe>"].join("");
i.execCommand("insertHtml",r);
},
_insertSponsor:function(t,e){
var i=t,n=$(".js_ad_preview");
n.html(template.render("js_ad_preview_tpl",e)).parent().show(),n.parent().find(".js_tag").text(0==e.trade_mode?"广告推荐":"内容定制");
var o=new UE.dom.Range(i.document);
o.selectNode(i.body.childNodes[i.body.childNodes.length-1]).select().setCursor(!0,!1);
for(var r=$(i.body),a=r.height()-16,d="",s=0;s<r.children().length;s++)a-=r.children().eq(s).outerHeight(!0);
if(a>=0)for(var s=0;s<Math.floor(a/25);s++)d+="<br/>";
0==e.trade_mode&&i.execCommand("inserthtml","<p>"+d+e.ad_tips+"</p>",!0),i.fireEvent("scrollIntoView",n,$(window).height()-n.height()-72-30);
}
},_;
});define("common/wx/mpEditor/plugin/img.js",["tpl/mpEditor/plugin/img_popup.html.js","common/wx/mpEditor/common/eventbus.js","common/wx/mpEditor/plugin/remoteimg.js","common/wx/Tips.js","common/wx/mpEditor/plugin/exif.js"],function(t){
"use strict";
var e=t("tpl/mpEditor/plugin/img_popup.html.js"),i=t("common/wx/mpEditor/common/eventbus.js"),a=t("common/wx/mpEditor/plugin/remoteimg.js"),n=t("common/wx/Tips.js"),r=t("common/wx/mpEditor/plugin/exif.js"),o={
attrWhiteList:",data-remoteid,data-asynid,src,data-src,_src,align,alt,border,class,data-ratio,data-s,data-type,data-w,height,hspace,ismap,opacity,sizes,style,title,type,usemap,vspace,width,data-width,data-height,data-croporisrc,data-cropx1,data-cropx2,data-cropy1,data-cropy2,data-cropselx1,data-cropselx2,data-cropsely1,data-cropsely2,data-backw,data-backh,data-copyright,data-oversubscription-url,data-before-oversubscription-url,"
},s=function(t){
t&&t.container&&(this.domid=t.container,this.container=$(t.container).show(),this._canvas=document.createElement("canvas"),
this._ctx=this._canvas.getContext("2d"),this._bindHideMenuOnDocument=this._hideMenuOnDocument.bind(this),
this._bindHideMenuOnEditor=this._hideMenuOnEditor.bind(this),t.can_show_reddot&&this.container.addClass("tpl_item_reddot")),
this.redbit=t.redbit||1;
};
return s.beforeSetContent=function(t){
if(!t.html)return"";
var e=t.html.replace(/<img(.*?)\s+data\-src="/g,'<img$1 src="');
return e;
},s.formatHTML=function(t){
var e="300,640";
if(t=UE.utils.isArray(t)?t:[t],t.length){
var i,a=[],n="";
if(i=t[0],1==t.length){
var r=i.format||"",o=i.name||"";
"gif"==r&&(i.src+="/mmbizgif");
var s=' data-s="'+e+'" ';
i.src&&/\/mmbizgif$/.test(i.src)&&(i.src=i.src.replace(/\/mmbizgif$/,""),s=" "),
s+=r?' data-type="'+r+'" ':"",s+=o?' data-filename="'+o+'" ':"";
var d="rich_pages";
i.classname&&(d+=" "+i.classname),s+=' class="'+d+'"',n="<img "+s+' src="'+i.src+'"'+("undefined"!=typeof i.copyright_status?' data-copyright="'+i.copyright_status+'"':"")+(i.title&&""!=i.title?' title="'+i.title+'"':"")+(i.border&&"0"!=i.border?' border="'+i.border+'"':"")+(i.alt&&""!=i.alt?' alt="'+i.alt+'"':"")+(i.hspace&&"0"!=i.hspace?' hspace = "'+i.hspace+'"':"")+(i.vspace&&"0"!=i.vspace?' vspace = "'+i.vspace+'"':"")+' style="'+(i.width?"width:"+i.width+"px;":"")+(i.height?" height:"+i.height+"px;":"")+("left"==i.floatStyle||"right"==i.floatStyle?"float:"+i.floatStyle+";":"")+'" />',
n='<p style="text-align: center">'+n+"</p>",a.push(n);
}else for(var c=0;i=t[c++];){
"gif"==i.format&&(i.src+="/mmbizgif");
var s=' data-s="'+e+'" ';
i.src&&/\/mmbizgif$/.test(i.src)&&(i.src=i.src.replace(/\/mmbizgif$/,""),s=" "),
s+=i.format?' data-type="'+i.format+'" ':"",s+=i.name?' data-filename="'+i.name+'" ':"";
var d="rich_pages";
i.classname&&(d+=" "+i.classname),s+=' class="'+d+'"',n="<p "+("center"==i.floatStyle?'style="text-align: center" ':"")+"><img "+s+' src="'+i.src+'" '+("undefined"!=typeof i.copyright_status?' data-copyright="'+i.copyright_status+'"':"")+(i.title&&""!=i.title?' title="'+i.title+'"':"")+(i.border&&"0"!=i.border?' border="'+i.border+'"':"")+(i.alt&&""!=i.alt?' alt="'+i.alt+'"':"")+(i.hspace&&"0"!=i.hspace?' hspace = "'+i.hspace+'"':"")+(i.vspace&&"0"!=i.vspace?' vspace = "'+i.vspace+'"':"")+' style="'+(i.width?"width:"+i.width+"px;":"")+(i.height?" height:"+i.height+"px;":"")+("left"==i.floatStyle||"right"==i.floatStyle?"float:"+i.floatStyle+";":"")+'" /></p>',
a.push(n);
}
return a;
}
},s.prototype={
getName:function(){
return"insertimage";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return this._hasMenuShow=!1,function(){
var e=this;
t.$imgMenu=$(".js_img_dropdown_menu"),t.$uploadFile=t.$imgMenu.children().find("input[type=file]"),
t._hasMenuShow||t._showMenu(e);
};
},
doCommand:function(t,e,i){
if(i){
console.log("insert image");
var a=t,n=s.formatHTML(i);
return a.execCommand("insertHtml",n.join(""));
}
},
getContainer:function(){
return this.domid;
},
getPluginData:function(t){
var e=t.init(),i=e.get("content");
e.set("content",i.replace(/<img(.*?)\s+src="/g,'<img$1 data-src="'));
},
addListener:function(t){
var e=this,i=t.getUeditor();
t.getBrowser().ie?this._showPopup(t):t.addListener("click",function(e,a){
var n=a.target||a.srcElement;
if(n&&"IMG"==n.tagName&&-1===n.className.indexOf("js_noimgselected")){
var r=new UE.dom.Range(i.document);
r.selectNode(a.target).select(),t.fireEvent("img_selected",a,n);
}
}),t.addListener("get_img_popup_html",function(t,i,a){
return e._getImgPopupHtml(i,a);
}),t.addListener("afterpaste",function(t,e,i){
$(i).find(".gif_bg_tips_wrp").each(function(){
$(this).remove();
}),$(i).find(".gif_img_tips_group").each(function(){
$(this).remove();
}),$(i).find(".gif_img_tips").each(function(){
$(this).remove();
}),$(i).find(".load_img_tips").each(function(){
$(this).remove();
}),$(i).find(".load_img_wrp").each(function(){
$(this).remove();
}),$(i).find(".js_img_tips").each(function(){
$(this).remove();
}),$.each(i,function(){
$(this).find("img").each(function(){
var t=$(this).attr("src")||"";
t.indexOf("/s640?")>-1&&t.indexOf("wx_fmt=gif")>-1&&$(this).parent().hasClass("gif_img_wrp")&&$(this).parent().before(this).remove(),
$(this).removeAttr("data-forceheight").removeAttr("data-nopreviewclick");
}),$(this).hasClass("js_img_tips")&&$(this).remove();
});
}),t.addListener("insertMaterialImg",function(t,a){
return e.doCommand(i,"insertimage",a);
}),t.addListener("uploadLocalImg",function(t,i){
e._getImgFromLocal(this,i.evt,{
type:"fireEvent"
});
}),t.addListener("afterpaste",function(t,i,a){
e.filterLinkImgIcon(a);
}),t.addListener("afterpasteimg aftersetcontent afterinserthtml afterCropImg",function(i,a,n){
var r=$(t.getDocument()).find("body").width(),o=$(n),s=o.filter("img").add(o.find("img"));
s.each(function(){
var i,a=$(this);
e.filterAttr(a),i=a.attr("data-w"),isNaN(parseInt(i))&&a.removeAttr("data-w"),a.attr("data-ratio")&&a.attr("data-w")||!function(t,e){
var i=new Image,a=t.attr("src");
e.delegateDomAsyn({
dom:t,
timeout:1e4,
requsetFun:function(){
i.onload=this.requsetSucFun,i.onerror=this.requsetFailFun,i.src=a;
},
requsetSucFun:function(t){
if(i){
if(t&&t.newDom){
var e=i.naturalWidth||i.width||0,a=i.naturalHeight||i.height||0;
0!=e&&0!=a&&(t.newDom.attr("data-ratio",a/e),t.newDom.attr("data-w",r==e?"":e));
}
i.onload=null,i.onerror=null,i=null;
}
},
requsetFailFun:function(t){
i&&(t&&t.newDom&&t.newDom.removeAttr("data-ratio").removeAttr("data-w"),i.onload=null,
i.onerror=null,i=null);
}
});
}(a,t),e.handlerH5LinkImg(a[0]);
});
}),t.addListener("handlerH5LinkImg",function(t,i){
e.handlerH5LinkImg(i);
}),t.addListener("keydown",function(t,e){
var i=this.selection.getRange();
if(i.endOffset!==i.startOffset){
var a=i.startContainer,n=null;
if(a){
var r=a.nodeType;
1===r?n=a.children[i.endOffset-1]:3===r&&(n=a.parentNode);
}
if(n&&1===n.nodeType&&"IMG"===n.nodeName){
var o=e.keyCode||e.which;
if(13===o){
var s=n.parentNode,d=s.childNodes;
if(i.endOffset<d.length){
var c=this.document.createElement("p");
c.style.textAlign="center";
for(var m=i.startOffset;m>=0;m--)c.appendChild(d[0]);
s.insertAdjacentElement("beforebegin",c),0===s.childNodes&&s.parentNode.removeChild(s);
}else s.insertAdjacentHTML("afterend","<p><br></p>"),i.selectNodeContents(s.nextElementSibling).select();
return e.preventDefault(),this.fireEvent("saveScene"),!0;
}
}
}
});
},
filterAttr:function(t){
if(t&&0!=t.length)for(var e=t[0].attributes,i=0;i<e.length;i++){
var a=","+e[i].name+",";
-1==o.attrWhiteList.indexOf(a)&&(t.removeAttr(e[i].name),i--);
}
},
filterLinkImgIcon:function(t){
var e=$(t),i=e.filter("span.js_jump_icon").add(e.find("span.js_jump_icon")),a=this.editor.getDomUtils();
i.each(function(){
0==this.getElementsByTagName("img").length&&a.remove(this,!0);
});
},
handlerH5LinkImg:function(t){
function e(t,e){
var i=t.ownerDocument,a=i.defaultView||i.parentWindow,r=a.getComputedStyle(t);
for(var o in n)("position"!=o||"position"==o&&/^(absolute)|(fixed)|(sticky)$/.test(r[o]))&&(e.style[o]=r[o]);
"span"==e.tagName.toLowerCase()&&e.setAttribute("data-positionback",r.position),
t.style.margin="0px",t.style.position="static";
}
function i(t){
var e={};
for(var i in n)e[i]=t.style[i];
return t.getAttribute("data-positionback")&&(e.position=t.getAttribute("data-positionback")),
e;
}
var a=$(t);
if(a&&0!=a.length&&"img"==a[0].tagName.toLowerCase()){
var n={
position:"",
top:"",
left:"",
margin:"",
right:"",
bottom:""
},r=this.editor.getUeditor(),o=this.editor.getDomUtils(),s=a.parents("a"),d=!1;
s.each(function(){
var t=this.getAttribute("href");
return/^http(s)?:\/\//i.test(t)?(d=!0,!1):void 0;
});
var c=null;
if(a.parents("span.js_jump_icon").each(function(){
(1!=this.childElementCount||"img"!=this.firstElementChild.tagName.toLowerCase())&&this.parentNode&&(c||(c=i(this,{})),
o.remove(this,!0));
}),c)for(var m in c)a[0].style[m]=c[m];
var l=!1,h=a.parent();
if(h.length>0&&"span"==h[0].tagName.toLowerCase()&&h.hasClass("js_jump_icon")&&(l=!0),
d){
if(!l){
h=a.parent();
var p=r.document.createElement("span");
p.className="js_jump_icon h5_image_link",e(a[0],p),h[0].insertBefore(p,a[0]),p.appendChild(a[0]);
}
}else if(l){
for(h=a.parent(),e(h[0],a[0]);h[0].firstChild;)h[0].parentNode.insertBefore(h[0].firstChild,h[0]);
a[0].style.position=h[0].getAttribute("data-positionback"),h[0].parentNode.removeChild(h[0]);
}
}
},
beforeSetContent:function(t){
return s.beforeSetContent({
html:t
});
},
_showPopup:function(t){
var e=this,i=t.getUeditor();
t.addListener("handle_common_popup",function(t,a){
var n=i.selection.getRange().getClosedNode();
e._getImgPopupHtml(n,a);
});
},
_getImgPopupHtml:function(t,i){
var n=$(t),r="";
if(t&&/^img$/i.test(t.tagName)&&!n.hasClass("js_noimgpopup")&&!this._filterPopup(t)){
var o=!1;
"100%"==t.style.width&&"auto"==t.style.height&&(o=!0);
var s=!0,d=a.defaultRemoteImg.replace("http://","").replace("https://","");
(!a.isLocalDomain(t.src)||t.src.indexOf(d)>0||a.isCdnImg(t.src)&&t.src.indexOf("mmbiz_gif")>=0)&&(s=!1);
var c={
hasCropimg:s,
needBreak:i&&i.data.length>0?!0:!1,
hasadapt:o
};
r=wx.T(e,c),i&&i.data&&i.data.push({
html:r,
renderData:c,
cmd:this.getName(),
node:t
}),this.editor.fireEvent("reportAddNum","122333","85","1");
}
return r;
},
_filterPopup:function(t){
if(!t)return!1;
var e=t.src||"";
return/^http(s)?:\/\/res\.wx\.qq\.com\/mpres\/htmledition\/images\/icon\/common\/emotion_panel/.test(e)?!0:/http(s)?:\/\/res\.wx\.qq\.com\/mpres\/zh_CN\/htmledition\/comm_htmledition\/images\/pic\/common\/pic_blank\.gif/.test(e)?!0:void 0;
},
_dataURLtoBlob:function(t){
for(var e=t.split(","),i=e[0].match(/:(.*?);/)[1],a=atob(e[1]),n=a.length,r=new Uint8Array(n);n--;)r[n]=a.charCodeAt(n);
return new Blob([r],{
type:i
});
},
_compressAsDataURL:function(t,e){
return this._canvas.toDataURL(t,e/100);
},
_doCompress:function(t,e,i,a){
var n=a.afterCompressSizeLimit;
if(!a||!~"image/jpeg,image/jpg,image/png,image/bmp".indexOf(e.type))return{
quality:t,
blob:e
};
t*=a.quality/100;
var r=this._compressAsDataURL(e.type,0|t),o=this._dataURLtoBlob(r),s=e.size;
return o.size<s&&o.size>n&&t>40&&(e.size=o.size,t=this._doCompress(t,e,i,a).quality),
{
quality:t,
blob:o
};
},
_rotate2Orientation:function(t,e){
var i=t.width,a=t.height,n=t.getContext("2d");
switch(e){
case 5:
case 6:
case 7:
case 8:
t.width=a,t.height=i;
}
switch(e){
case 2:
n.translate(i,0),n.scale(-1,1);
break;

case 3:
n.translate(i,a),n.rotate(Math.PI);
break;

case 4:
n.translate(0,a),n.scale(1,-1);
break;

case 5:
n.rotate(.5*Math.PI),n.scale(1,-1);
break;

case 6:
n.rotate(.5*Math.PI),n.translate(0,-a);
break;

case 7:
n.rotate(.5*Math.PI),n.translate(i,-a),n.scale(-1,1);
break;

case 8:
n.rotate(-.5*Math.PI),n.translate(-i,0);
}
},
_resizeImg:function(t,e,i){
var a,n,r=e.width,o=e.height,s=i.afterCompressSizeLimit;
s&&t.size<s&&(!i.maxResolution||e.width*e.height<i.maxResolution)?(a=e.width,n=e.height):(a=i.maxWidth,
n=i.maxHeight);
var d=Math.min(a/r,n/o);
d=Math.min(1,d);
var c=r*d,m=o*d;
this._canvas.width=c,this._canvas.height=m,e.width=c,e.height=m,this._rotate2Orientation(this._canvas,i.orientation),
this._ctx.clearRect(0,0,c,m),this._ctx.drawImage(e,0,0,c,m);
},
_appendImage:function(t,e){
var i=this;
if(t!==i._curFiles.length){
var a=i._curFiles[t],o=i._validImg(a);
if(null!==a&&o!==!0&&2===o.type?this.editor.fireEvent("reportAddNum",[{
id:"122443",
key:"2",
len:"1"
},{
id:"122443",
key:"0",
len:"1"
}]):null!==a&&o===!0&&this.editor.fireEvent("reportAddNum",[{
id:"122443",
key:"1",
len:"1"
},{
id:"122443",
key:"0",
len:"1"
}]),null!==a&&o===!0){
var s=new Image,d=1;
s.onload=function(){
r.getData(a,function(){
d=r.getTag(this,"Orientation"),1!==d&&((new Image).src="/mp/jsmonitor?idkey=65080_118_1"),
i._resizeImg(a,s,{
maxWidth:1280,
maxHeight:1e8,
maxResolution:6e6,
orientation:d
});
var o=i._doCompress(100,a,s,{
afterCompressSizeLimit:5242880,
quality:90
}),c=i._validImgCompressSize(o.blob,a);
if(c===!0)i._getDataURL(o.blob,function(n){
a.src=a.url=n.target.result,a.classname="js_insertlocalimg";
var r=[];
r.push(a),i.doCommand(e,"insertimage",r),i._appendImage(t+1,e);
});else{
var m=2097152,l=5242880,h=[];
o.blob&&o.blob.size>m&&h.push({
id:"122443",
key:"3",
len:"1"
}),o.blob&&o.blob.size>m&&o.blob.size<l&&h.push({
id:"122443",
key:"4",
len:"1"
}),h.length>0&&i.editor.fireEvent("reportAddNum",h),n.err(c.msg||""),i._appendImage(t+1,e);
}
});
},s.onerror=function(){
i._appendImage(t+1,e);
},i._getDataURL(a,function(t){
s.src=t.target.result;
});
}else n.err(o.msg||""),i._appendImage(t+1,e);
}
},
_getDataURL:function(t,e){
var i=new FileReader;
i.onload=e,i.readAsDataURL(t);
},
_getImgFromLocal:function(t,e){
var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],a=this,r=20,o=e.target.files,s=o.length;
if(a._curFiles=[],0===s)console.log("no files"),o=null;else if(s>r)n.err("最多可同时上传20张");else{
$.each(o,function(t,e){
a._curFiles.push(e);
});
var d=this.editor.getUeditor();
d.fireEvent("reportAddNum",65080,115,s),d.fireEvent("reportAddNum",65080,116,1),
a._appendImage(0,t);
}
a.destroy(),a.$uploadFile.val(""),i&&i.type||this.editor.fireEvent("reportToolbarClick",[{
id:"122333",
key:"27"
},{
id:"122333",
key:"29"
}]);
},
_getImgFromLib:function(t){
var e=this,a=this.editor;
a&&((new Image).src="/mp/jsmonitor?idkey=69271_33_1",i.fireEvent("showImageDialog",{
maxselect:100,
uploadscene:3,
uploadgroup:3,
desc:"大小不超过5M"
},function(i){
if(i){
e.doCommand(t,"insertimage",i.map(function(t){
return t.src=t.url,t;
}));
var n=0,r=0;
$.each(i,function(t,e){
"upload"==e.source?n++:r++;
}),n>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:39,
val:n,
level:"trace",
content:"[file=media/appmsg_edit]"
}),r>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:40,
val:r,
level:"trace",
content:"[file=media/appmsg_edit]"
});
var o=i.length;
o>0&&a.funcPvUvReport("insertimage",o);
}
}));
},
_validImg:function(t){
var e=",bmp,png,jpeg,jpg,gif,",i=","+(t.type.split("/")[1]||"")+",",a=5242880;
return-1==e.indexOf(i)?{
type:1,
msg:"不支持该格式"
}:t.size>a?{
type:2,
msg:"文件大小超过5M"
}:!0;
},
_validImgCompressSize:function(t,e){
var i=5242880,a=!!(wx&&wx.commonData&&wx.commonData.acl&&wx.commonData.acl.msg_acl&&wx.commonData.acl.msg_acl.can_upload_2m_more_gif);
if(t.size>i){
if(!~"image/gif".indexOf(e.type))return{
type:3,
msg:"图片尺寸太大，压缩后不能超过5M，请缩小图片尺寸再试"
};
if(!a)return{
type:3,
msg:"图片尺寸太大，压缩后不能超过5M，请缩小图片尺寸再试"
};
}
return!0;
},
_showMenu:function(t){
var e=this.$imgMenu,i=this.editor;
i&&!this._hasMenuShow&&(this._bindMenuClickEvent=this._menuClickEvent.bind(this,t),
this._bindGetImgFromLocal=this._getImgFromLocal.bind(this,t),this._hasMenuShow=!0,
e.show(),$(document).on("click",this._bindHideMenuOnDocument),this.$uploadFile.on("change",this._bindGetImgFromLocal),
this._bindMenuClickEvent&&e.on("click",this._bindMenuClickEvent),i.addListener("click",this._bindHideMenuOnEditor));
},
_hideMenuOnDocument:function(t){
var e=$(this.domid);
e.is(t.target)||e.find(t.target).length||this._hasMenuShow&&this.destroy();
},
_hideMenuOnEditor:function(){
this.destroy();
},
_menuClickEvent:function(t,e){
var i=this.$imgMenu.children()[1];
e.target===i&&(this._getImgFromLib(t),this.editor.fireEvent("reportToolbarClick",[{
id:"122333",
key:"27"
},{
id:"122333",
key:"31"
}]));
},
destroy:function(){
var t=this.$imgMenu;
this._bindMenuClickEvent&&t.off("click",this._bindMenuClickEvent),this._hasMenuShow=!1,
t.hide(),this.$uploadFile.off("change",this._bindGetImgFromLocal),this.editor.removeListener("click",this._bindHideMenuOnEditor),
$(document).off("click",this._bindHideMenuOnDocument);
}
},s;
});define("common/wx/mpEditor/plugin/weapp.js",["common/wx/popup.js","biz_web/ui/checkbox.js","common/wx/mpEditor/plugin/remoteimg.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/mpEditor/common/eventbus.js","tpl/mpEditor/plugin/link_popup.html.js","common/wx/mpEditor/plugin/img.js"],function(t){
"use strict";
function a(t,a){
var e={};
for(var r in a)e[r]=encodeURIComponent(a[r]);
return t.replace(/\{(.+?)\}/g,function(t,a){
return e[a]||a;
});
}
function e(t,a){
var e=a;
for(var r in a)e[r]=((a[r]||"")+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
return t.format(e);
}
function r(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=t.html,r=t.editor,i=$("<div>"+e+"</div>"),n=[];
if(i.find("mp-miniprogram,mp-weapp").replaceWith(function(){
var t=$(this),e=t.attr("data-miniprogram-appid")||t.attr("data-weapp-appid")||"",r=t.attr("data-miniprogram-title")||t.attr("data-weapp-title")||"",i=t.attr("data-miniprogram-imageUrl")||t.attr("data-weapp-imageUrl")||"",p=t.attr("data-miniprogram-nickname")||t.attr("data-weapp-nickname")||"",m=t.attr("data-miniprogram-avatar")||t.attr("data-weapp-avatar")||"",o=t.attr("data-miniprogram-path")||t.attr("data-weapp-path")||"",d=t.attr("data-miniprogram-type")||"",s=t.attr("data-miniprogram-servicetype")||"0";
return n.push({
imageUrl:i
}),$('<iframe class="res_iframe weapp_app_iframe js_editor_weapp" frameborder="0">').attr("src",a("/cgi-bin/readtemplate?t=tmpl/weapp_tmpl&title={title}&imageUrl={imageUrl}&avatar={avatar}&nickname={nickname}",{
nickname:p,
avatar:m,
title:r,
imageUrl:i
})).attr("data-miniprogram-appid",e).attr("data-miniprogram-path",o).attr("data-miniprogram-nickname",p).attr("data-miniprogram-avatar",m).attr("data-miniprogram-title",r).attr("data-miniprogram-imageUrl",i).attr("data-miniprogram-type",d).attr("data-miniprogram-servicetype",s);
}),i.find("a.weapp_text_link,a.weapp_image_link").each(function(){
$(this).attr("href",""),$(this).attr("_href","");
}),i.find("span.js_weapp_display_element").remove(),r&&"function"==typeof r.fireEvent&&n.length>0){
for(var m=[],o=0,d=n.length;d>o;o++){
m.push({
id:"122443",
key:"12"
});
var s=n[o];
s.imageUrl&&!p.isLocalDomain(s.imageUrl)&&m.push({
id:"122443",
key:"13"
});
}
m.length>0&&r.fireEvent("reportAddNum",m);
}
return i.html();
}
function i(t){
var a=$("<div>"+t+"</div>");
return a.find("iframe.js_editor_weapp").replaceWith(function(){
var t=$(this),a=t.attr("data-miniprogram-appid"),e=t.attr("data-miniprogram-title"),r=t.attr("data-miniprogram-imageUrl"),i=t.attr("data-miniprogram-nickname"),n=t.attr("data-miniprogram-avatar"),p=t.attr("data-miniprogram-path"),m=t.attr("data-miniprogram-type")||"",o=t.attr("data-miniprogram-servicetype")||"0";
return $("<mp-miniprogram>").attr("class","miniprogram_element").attr("data-miniprogram-appid",a).attr("data-miniprogram-path",p).attr("data-miniprogram-nickname",i).attr("data-miniprogram-avatar",n).attr("data-miniprogram-title",e).attr("data-miniprogram-imageUrl",r).attr("data-miniprogram-type",m).attr("data-miniprogram-servicetype",o);
}),a.html();
}
function n(t){
this.__o={
container:""
},this.editor=null,this.__init(t||{}),t&&t.container&&($(t.container).show(),t.can_show_reddot&&$(t.container).addClass("tpl_item_reddot")),
this.redbit=t.redbit||64,this.can_use_weapp_card=t.can_use_weapp_card||!1;
}
t("common/wx/popup.js"),t("biz_web/ui/checkbox.js"),t("common/wx/popup.js");
var p=t("common/wx/mpEditor/plugin/remoteimg.js"),m=(t("common/wx/Tips.js"),t("common/wx/dialog.js")),o=t("common/wx/mpEditor/common/eventbus.js"),d=t("tpl/mpEditor/plugin/link_popup.html.js"),s=t("common/wx/mpEditor/plugin/img.js"),c={
maxCount:50,
maxUniqueCount:10
};
return n.beforeSetContent=function(t){
if(!t.html)return"";
var a=r({
html:t.html,
editor:t.editor
});
return a;
},n.prototype={
getName:function(){
return"insertweapp";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
var a,e=t.editor.queryCommandValue("insertweapp"),r=!1;
if(e){
var i=e.getAttribute("data-miniprogram-appid"),n=e.getAttribute("data-miniprogram-type"),p=e.getAttribute("data-miniprogram-servicetype")||"0";
("qrcode"!=n||"text"!=n||"image"!=n)&&(n="");
var m=e.innerText||"",d=$(e).find("img").attr("src")||"";
n||(d?n="image":m&&(n="text")),a={
type:n||"text",
service_type:p,
appid:i,
path:e.getAttribute("data-miniprogram-path")||"",
nickname:e.getAttribute("data-miniprogram-nickname")||"",
content:m,
image:d,
qrcode:d
},r=!0;
}
(r!==!1||t.check($(t.editor.getUeditor().body))!==!1)&&o.fireEvent("showWeappDialog",{
weappinfo:a
},function(a){
a&&t.__insert(a,r);
});
};
},
getContainer:function(){
return this.__o.container;
},
getQueryCommandValue:function(){
var t=this;
return function(){
var a=t.editor;
if(a){
var e,r=a.getSelectionRange(),i=a.getDomUtils();
if(!r.collapsed){
r.shrinkBoundary();
var n=3!=r.startContainer.nodeType&&r.startContainer.childNodes[r.startOffset]?r.startContainer.childNodes[r.startOffset]:r.startContainer,p=3==r.endContainer.nodeType||0==r.endOffset?r.endContainer:r.endContainer.childNodes[r.endOffset-1],m=r.getCommonAncestor();
if(e=i.findParentByTagName(m,"a",!0),!e&&1==m.nodeType)for(var o,d,s,c=m.getElementsByTagName("a"),g=0;s=c[g++];)if(o=i.getPosition(s,n),
d=i.getPosition(s,p),(o&i.POSITION_FOLLOWING||o&i.POSITION_CONTAINS)&&(d&i.POSITION_PRECEDING||d&i.POSITION_CONTAINS)){
e=s;
break;
}
return e;
}
return e=r.startContainer,e=1==e.nodeType?e:e.parentNode,e&&(e=i.findParentByTagName(e,"a",!0))&&!i.isInNodeEndBoundary(r,e)?e:void 0;
}
};
},
addListener:function(t){
var a=this;
t.addListener("beforepaste",function(t,e){
e.html=r({
html:e.html,
editor:a.editor
});
}),t.addListener("handle_common_popup",function(e,r){
var i=t.queryCommandValue("insertweapp");
if(i&&-1==(i.href||"").indexOf("javascript:")){
if(!i.getAttribute("data-miniprogram-appid"))return;
for(var n=void 0,p=0;p<r.data.length;p++){
var m=r.data[p];
"checktext"===m.cmd&&(n=m.renderData,r.data.splice(p,1),p--);
}
var o=i.getAttribute("data-miniprogram-nickname")||"";
o.length>30&&(o=o.substring(0,20)+"...");
var s={
needBreak:r.data.length>0?!0:!1,
url:"javascript:;",
txt:o,
isWeapp:!0
},c=void 0;
n?(c=n,c.url=s.url,c.txt=s.txt,c.needBreak=s.needBreak,c.isWeapp=s.isWeapp):c=s,
r.data.push({
html:wx.T(d,c),
renderData:c,
renderTpl:d,
cmd:a.getName(),
node:i
});
}
});
},
beforeSetContent:function(t){
return n.beforeSetContent({
html:t,
editor:this.editor
});
},
getPluginData:function(t){
var a=t.init(),e=a.get("content");
return e?(e=i(e),a.set("content",e),a):void 0;
},
__init:function(t){
var a=this.__o;
for(var e in t)Object.prototype.hasOwnProperty.call(a,e)&&(a[e]=t[e]);
},
check:function(t){
var a=this.getWeappCount(t);
return a.totalCount>c.maxCount||a.uniqueCount>c.maxUniqueCount?(m.show({
width:750,
type:"warn",
msg:"图文中包含的小程序素材不能多于%s个、小程序帐号不能多于%s个".sprintf(c.maxCount,c.maxUniqueCount),
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}),!1):!0;
},
getWeappCount:function(t){
if(!t){
var a=this.editor.getUeditor();
t=$(a.body);
}
var e=[],r={};
t.find("iframe[data-miniprogram-appid]").each(function(){
var t=this.getAttribute("data-miniprogram-appid");
t&&(e.push(e),r[t]=1);
}),t.find("a[data-miniprogram-appid]").each(function(){
var t=this.getAttribute("data-miniprogram-appid");
t&&(e.push(e),r[t]=1);
});
var i=0;
for(var n in r)i++;
return{
totalCount:e.length,
uniqueCount:i
};
},
__insert:function(t,r){
var i=t.type,n="",p={
type:i,
servicetype:t.service_type,
appid:t.appid,
nickname:t.nickname,
avatar:t.headimg_url,
title:t.title,
imageUrl:t.cardImage,
path:t.path,
content:t.content
};
if(p.src=a("/cgi-bin/readtemplate?t=tmpl/weapp_tmpl&title={title}&imageUrl={imageUrl}&avatar={avatar}&nickname={nickname}",p),
"card"==i)n='<p><iframe class="res_iframe weapp_app_iframe js_editor_weapp js_weapp_entry" frameborder="0" src="{src}" data-miniprogram-appid="{appid}" data-miniprogram-nickname="{nickname}" data-miniprogram-title="{title}" data-miniprogram-imageUrl="{imageUrl}" data-miniprogram-avatar="{avatar}" data-miniprogram-path="{path}" data-miniprogram-type="{type}" data-miniprogram-servicetype="{servicetype}"></iframe></p>';else if("text"==i){
var m=this.editor.queryCommandValue("fontsize");
if(n='<a class="weapp_text_link js_weapp_entry" '+(m?'style="font-size:'+m+';"':"")+' data-miniprogram-appid="{appid}" data-miniprogram-path="{path}" data-miniprogram-nickname="{nickname}" href="" data-miniprogram-type="{type}" data-miniprogram-servicetype="{servicetype}">{content}</a>',
r){
var o=this.editor.queryCommandValue("insertweapp");
if(o)return void $(o).replaceWith(function(){
return $(e(n,p));
});
}
}else if("image"==i){
if(n=s.formatHTML({
src:t.image,
_src:t.image
}).join(""),n=$(n).find("img").get(0).outerHTML,n='<p><a class="weapp_image_link js_weapp_entry" data-miniprogram-appid="{appid}" data-miniprogram-path="{path}" data-miniprogram-nickname="{nickname}" href="" data-miniprogram-type="{type}" data-miniprogram-servicetype="{servicetype}">'+n+"</a></p>",
r){
var o=this.editor.queryCommandValue("insertweapp");
if(o)return void $(o).replaceWith(function(){
return $(e(n,p));
});
}
}else"qrcode"==i&&this.editor.fireEvent("insertMaterialImg",{
src:t.qrcode,
classname:"js_weapp_entry"
});
n=e(n,p);
var d=this.editor,c=d.execCommand("inserthtml",n,!0);
console.log("execCommand",c);
}
},n;
});define("common/wx/mpEditor/plugin/audio_music.js",["common/wx/popup.js","biz_web/ui/checkbox.js","3rd/editor/common/domUtils.js","common/wx/Cgi.js","common/wx/mpEditor/common/eventbus.js","common/wx/Tips.js","tpl/mpEditor/plugin/music_card.html.js","tpl/mpEditor/plugin/audio_card.html.js","3rd/editor/common/no_editable.js"],function(e){
"use strict";
function t(e,t){
if(!t){
var i=e.getUeditor();
t=$(i.body);
}
return t.find(_.cardTag+"."+_.audioCardClass).length;
}
function i(e){
return e.find(_.cardTag+"."+_.audioCardClass).removeAttr("isaac"),e.find(_.audioSaveTag).remove(),
e.find(".js_audio_frame").remove(),e.find("span.js_wap_qqmusic").remove(),e;
}
function a(e,t){
var i="";
if(!e)return i;
if(1==t){
if(/^http(s)?:\/\//i.test(e)){
for(var a,r=[/^http(s)?:\/\/imgcache\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/y\.gtimg\.cn([\/?].*)*$/i],n=!1,s=0;a=r[s++];)if(a.test(e)){
n=!0;
break;
}
n&&(i=e);
}else{
var o="https://imgcache.qq.com/music/photo/mid_album_90",u="https://y.gtimg.cn/music/photo_new/T002R90x90M000#mid#.jpg",c=e.split("/");
try{
c=c[c.length-1],c=c.split(".")[0];
}catch(d){
c="";
}
i=c?u.replace("#mid#",c):o+e;
}
i=i.replace("mid_album_68","mid_album_90").replace("68x68","90x90");
}else{
for(var a,r=[/^http(s)?:\/\/singerimg\.kugou\.com([\/?].*)*$/i,/^http(s)?:\/\/imge\.kugou\.com([\/?].*)*$/i],n=!1,s=0;a=r[s++];)if(a.test(e)){
n=!0;
break;
}
n&&(i=e);
}
return i;
}
function r(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return template.compile(p)({
musicName:e.musicName,
singer:e.singer,
type:e.type,
albumurl:a(e.albumurl,e.type),
errorType:e.errorType
});
}
function n(e){
var t=Math.floor(e/1e3),i="";
if(60>t)i="00:"+(10>t?"0":"")+t;else{
var a=Math.floor(t/60);
t-=60*a,i=(10>a?"0":"")+a+":"+(10>t?"0":"")+t;
}
return i;
}
function s(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return template.compile(v)({
name:e.name,
play_length:n(e.play_length)
});
}
function o(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=e.$dom;
return 1===e.type?t.find(_.cardTag+"."+_.musicCardClass+"["+_.musicErrTypeAttr+'="1"]'):2===e.type?t.find(_.musicSaveTag+"."+_.musicCardClass+"["+_.musicErrTypeAttr+'="1"]'):t.find(_.cardTag+"."+_.musicCardClass+"["+_.musicErrTypeAttr+'="1"]').add(_.musicSaveTag+"."+_.musicCardClass+"["+_.musicErrTypeAttr+'="1"]',t);
}
function u(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=!1,i=!1;
return e.$dom.find(_.musicSaveTag).each(function(){
var e=$(this),a=e.attr(_.musicErrTypeAttr)||"";
1*a===1&&(i=!0);
var n=e.replaceTagName(_.cardTag).addClass(_.musicCardClass+" qqmusic_iframe"),s=(n.attr("music_name")||"").html(!1),o=(n.attr("singer")||"").html(!1),u=n.attr("musictype")||"",c=(n.attr("albumurl")||"").html(!1);
n.html(r({
musicName:s,
singer:o,
type:u,
albumurl:c,
errorType:a
})),f.setDisable({
dom:n[0]
}),t=!0;
}),{
hasMusicCard:t,
hasNoCopyrightMusicCard:i
};
}
function c(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=!1;
e.$dom.find(_.audioSaveTag).each(function(){
var e=$(this).replaceTagName(_.cardTag).addClass(_.audioCardClass+" audio_iframe"),i=(e.attr("name")||"").html(!1),a=e.attr("play_length")||0;
e.html(s({
name:i,
play_length:a
})),f.setDisable({
dom:e[0]
}),t=!0;
}),t&&e.editor&&f.handleEvent({
editor:e.editor
});
}
function d(e){
this.__o={
container:"",
allowAudio:!1,
allowMusic:!1
},this._g={
pasteMusic:!1,
app_id:"",
curSeq:-1,
hasBindErrCardEvent:!1,
hasNoCopyrightMusicCard:!1,
focusMusicErrData:null,
event:{},
need2CheckMusic:!1
},this.redbit=e.redbit||2,this.editor=null,this.__init(e||{}),e&&e.container&&($(e.container).show(),
e.can_show_reddot&&$(e.container).addClass("tpl_item_reddot")),this.redbit=e.redbit||4;
}
e("common/wx/popup.js"),e("biz_web/ui/checkbox.js");
var m=e("3rd/editor/common/domUtils.js"),l=e("common/wx/Cgi.js"),g=e("common/wx/mpEditor/common/eventbus.js"),h=e("common/wx/Tips.js"),p=e("tpl/mpEditor/plugin/music_card.html.js").replace(/>\s*</g,"><"),v=e("tpl/mpEditor/plugin/audio_card.html.js").replace(/>\s*</g,"><"),f=e("3rd/editor/common/no_editable.js"),_={
pluginName:"insertaudio",
cardWarpClass:f.pluginParentClass,
musicCardClass:"js_editor_qqmusic",
audioCardClass:"js_editor_audio",
cardTag:"section",
musicSaveTag:"qqmusic",
audioSaveTag:"mpvoice",
musicErrTypeAttr:"data-errortype"
},C=3;
return d.beforeSetContent=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(!e.html)return"";
var t=$("<div>").html(e.html);
c({
$dom:t,
outerContainer:t[0]
}),t=i(t);
var a=u({
$dom:t,
outerContainer:t[0]
});
return a&&a.hasNoCopyrightMusicCard&&e.instance&&e.instance._g&&(e.instance._g.hasNoCopyrightMusicCard=!0),
t.html();
},d.prototype={
registerPlugin:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._g.app_id=e.app_id+"";
},
updateSeq:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._g.curSeq=1*e.seq;
},
updateAppid:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._g.app_id=e.app_id+"";
},
getName:function(){
return _.pluginName;
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var e=this;
return function(){
e.showDialog({
checkAudioCount:!0
});
};
},
showDialog:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=this,a=!0,r=!0;
e.allowAudio!==!1&&i.__o.allowAudio||(a=!1),e.allowMusic!==!1&&i.__o.allowMusic||(r=!1);
var n=t(i.editor),s=!1;
if(e.checkAudioCount&&a&&n>=C){
if(!r)return void h.err("每篇图文最多添加三条素材库音频");
s=!0;
}
g.fireEvent("showAudioMusicDialog",{
allowAudio:!!a,
allowMusic:!!r,
audioDisabled:!!s,
audiotips:!!s==!0?"每篇图文最多添加三条素材库音频":"",
allowAudioNumber:C-n
},function(t){
if(t){
if(e.replaceDom){
var a=i.editor.getUeditor().selection.getRange();
a.selectNode(e.replaceDom).select(!0);
}
i.__insert(t,{
replaceMusicId:e.replaceMusicId,
replaceMusicType:e.replaceMusicType
});
}
});
},
getContainer:function(){
return this.__o.container;
},
addListener:function(e){
var a=this;
e.addListener("beforeWaitAsynAction",function(){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
a._g.need2CheckMusic=!1;
for(var i={
list:[]
},r=1*t.postData.count,n=0;r>n;n++)i.list.push({
title:t.postData["title"+n]||"未设置标题",
content:t.postData["content"+n]||""
});
i.list.length>0&&e.delegateDomAsyn({
dom:null,
timeout:1e4,
requsetFun:function(){
var e=this;
l.post({
url:"/cgi-bin/masssend?action=check_music",
data:{
item_list:JSON.stringify(i)
}
},{
done:function(t){
var i=t&&t.base_resp?t.base_resp.ret:-1;
(0!=i||t.list&&0!==t.list.length)&&0==i&&t.list&&t.list.length>0?e.requsetSucFun(t.list):e.requsetFailFun();
},
fail:function(){
e.requsetFailFun();
}
});
},
requsetSucFun:function(i,r){
a._g.need2CheckMusic=!0,e.fireEvent("musicCheckResultFocus",{
errorData:r
}),t.hasShowTips||(t.hasShowTips=!0,g.fireEvent("showMusicCheckDialog",{
musicdata:r,
focustype:"callback"
},function(t){
t&&e.fireEvent("musicCheckResultFocus",{
errorData:t.errorData,
focusData:t.focusData
});
}));
},
requsetFailFun:function(){}
});
}),e.addListener("beforepaste",function(e,r){
a._g.pasteMusic=!1;
var n=$("<div></div>").html(r.html),s=n.find(_.cardTag+"."+_.audioCardClass).length;
return t(a.editor)+s>C?(h.err("每篇图文最多添加三条素材库音频"),r.html="",!0):(n=i(n),o({
$dom:n,
type:3
}).remove(),a.changeCardToAudioTag({
$dom:n
}),a.changeCardToMusicTag({
$dom:n
}),n.find(_.audioSaveTag).length>0&&(c({
$dom:n,
outerContainer:n[0]
}),a._g.pasteMusic=!0),n.find(_.musicSaveTag).length>0&&(u({
$dom:n,
outerContainer:n[0]
}),a._g.pasteMusic=!0),void(r.html=n.html()));
}),e.addListener("afterpaste",function(){
a._g.pasteMusic&&f.handleEvent({
editor:a.editor
});
}),e.addListener("musicCheckResultFocus",function(){
var e=this,t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.errorData,r=t.focusData;
this.fireEvent("saveScene");
for(var n=r,s={},o=!1,u=0,c=i.length;c>u;u++){
var d=i[u];
s[d.appmsg_idx]||(s[d.appmsg_idx]={}),s[d.appmsg_idx][d.song_mid]=d,1*d.appmsg_idx!==1*a._g.curSeq&&(o=!0);
}
var m=null,l=null;
o&&!function(){
l={},m=e.fireEvent("getArticleDomList");
var t=0;
m.each(function(){
var e=$(this).data("article");
e&&e.data&&(l[t]=e),t++;
});
}();
var g=null;
for(var u in s)if(Object.prototype.hasOwnProperty.call(s,u)){
var d=s[u];
if(1*u===1*a._g.curSeq){
var h=null;
n&&1*n.appmsg_idx===1*a._g.curSeq&&(h=n);
var p=a.setMusicError({
tagName:_.cardTag,
$dom:$(this.body),
data:d,
focusData:h
});
h&&p&&p.$focusDom&&p.$focusDom.length>0&&(g=p.$focusDom);
}else if(l&&l[u]){
var v=$("<div></div>").html(l[u].data.get("content"));
a.setMusicError({
tagName:_.musicSaveTag,
$dom:v,
data:d
}),l[u].data.set("content",v.html());
}
}
n&&(g?(this.fireEvent("scrollIntoView",g),a._g.focusMusicErrData=null):(a._g.focusMusicErrData=n,
a.bindArticleChangeEvent(),this.fireEvent("selectArticle",{
idx:n.appmsg_idx,
doNotHideErr:!0,
doNotScroll:!0,
isNewCreate:!1,
markInited:!1
}))),a.bindErrCardEvent(),this.fireEvent("saveScene");
});
},
beforeSetContent:function(e){
var t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];
return this._g.curSeq=1*t.seq,this._g.hasNoCopyrightMusicCard=!1,d.beforeSetContent({
html:e,
instance:this
});
},
afterSetContent:function(){
this._g.hasNoCopyrightMusicCard?this.bindErrCardEvent():this.removeErrCardEvent();
},
initPluginData:function(){
return["music_id"];
},
getPluginData:function(e){
var t=e.init(this.initPluginData()),a=t.get("content");
if(a){
var r=$("<div></div>").html(a);
r=i(r),this.changeCardToAudioTag({
$dom:r
});
var n=this.changeCardToMusicTag({
$dom:r
}),s=[],o=",";
return n.each(function(){
var e=this.getAttribute("musicid")||"";
e&&-1===o.indexOf(","+e+",")&&(s.push(e),o+=e+",");
}),t.set("content",r.html()),t.set("music_id",s.join(",")),t;
}
},
changeCardToMusicTag:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return e.$dom.find(_.cardTag+"."+_.musicCardClass).replaceTagName(_.musicSaveTag).html("");
},
changeCardToAudioTag:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return e.$dom.find(_.cardTag+"."+_.audioCardClass).replaceTagName(_.audioSaveTag).html("");
},
bindArticleChangeEvent:function(){
this.removeArticleChangeEvent(),this.editor.addListener("afterArticleSelect",this._g.event.afterArticleSelectEvent);
},
removeArticleChangeEvent:function(){
this.editor.removeListener("afterArticleSelect",this._g.event.afterArticleSelectEvent);
},
bindErrCardEvent:function(){
this._g.hasBindErrCardEvent||(this._g.hasBindErrCardEvent=!0,this.editor.addListener("afterscencerestore cleardoc",this._g.event.handleErrCardEvent),
this.editor.addListener("noEditableClick",this._g.event.noEditableClick),this.editor.addListener("noeditableDel",this._g.event.noeditableDel));
},
removeErrCardEvent:function(){
this._g.hasBindErrCardEvent&&(this._g.hasBindErrCardEvent=!1,this.editor.removeListener("cleardoc",this._g.event.handleErrCardEvent),
this.editor.removeListener("noEditableClick",this._g.event.noEditableClick),this.editor.removeListener("noeditableDel",this._g.event.noeditableDel));
},
handleErrCard:function(){
var e=o({
$dom:$(this.editor.getUeditor().body),
type:1
});
e.length>0?this.bindErrCardEvent():this.removeErrCardEvent();
},
setMusicError:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t={
$focusDom:null
};
return e.$dom.find(e.tagName+"."+_.musicCardClass).each(function(){
var i=$(this),a=(i.attr("mid")||"").html(!1),r=1*(i.attr("musictype")||"");
e.focusData&&e.focusData.song_mid===a&&1*e.focusData.song_type===r&&(t.$focusDom=i),
e.data[a]&&1*e.data[a].song_type===r&&(f.setNoSelect({
dom:this
}),i.attr(_.musicErrTypeAttr,"1").find(".js_mask").show());
}),t;
},
check:function(e){
return e.find(_.audioSaveTag).length>C?{
msg:"单篇文章最多只能添加三条素材库音频"
}:this._g.need2CheckMusic&&o({
$dom:e,
type:2
}).length>0?(this._g.need2CheckMusic=!1,{
msg:"",
noTips:!0
}):!0;
},
__init:function(e){
var t=this.__o;
for(var i in e)Object.prototype.hasOwnProperty.call(t,i)&&(t[i]=e[i]);
this.defineEvent();
},
defineEvent:function(){
var e=this;
this._g.event={
handleErrCardEvent:function(){
e.handleErrCard();
},
noEditableClick:function(){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
if(t.unEditableDom){
var i=$(t.unEditableDom);
i.hasClass(_.musicCardClass)&&1*i.attr(_.musicErrTypeAttr)===1&&e.showDialog({
allowAudio:!1,
replaceDom:t.unEditableDom
});
}
},
noeditableDel:function(){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=$(t.target);
i.hasClass(_.musicCardClass)&&1*i.attr(_.musicErrTypeAttr)===1&&e.handleErrCard();
},
afterArticleSelectEvent:function(t,i){
var a=e._g.focusMusicErrData;
if(a){
if(a&&1*a.appmsg_idx===1*i){
var r=null;
$(this.body).find(_.cardTag+"."+_.musicCardClass).each(function(){
var e=$(this),t=(e.attr("mid")||"").html(!1),i=1*(e.attr("musictype")||"");
return t===a.song_mid&&i===1*a.song_type?(r=e,!1):void 0;
}),r&&this.fireEvent("scrollIntoView",r),e._g.focusMusicErrData=null,e.removeArticleChangeEvent();
}
}else e.removeArticleChangeEvent();
}
};
},
getAudioHtml:function(e){
e.uri_encoded_name=encodeURIComponent(e.name),e.uri_encoded_title=encodeURIComponent(e.title),
e.title_encode=e.title.html(!0),e.src="/cgi-bin/readtemplate?t=tmpl/audio_tmpl&name={uri_encoded_title}&play_length={duration}".format(e);
var t="<"+_.cardTag+"><"+_.cardTag+' class="'+_.audioCardClass+' audio_iframe res_iframe" src="{src}" isaac2={is_aac} low_size="{low_size}" source_size="{source_size}" high_size="{high_size}" name="{title_encode}" play_length="{play_length}" voice_encode_fileid="{voice_encode_fileid}" '+m.pluginAttr+'="'+this.getName()+'">'+s({
name:e.title,
play_length:e.play_length
})+"</"+_.cardTag+"></"+_.cardTag+">";
t=t.format(e);
var i=$("<div></div>").html(t);
return f.setDisable({
dom:i[0].firstChild.firstChild
}),i.html();
},
execInsertCommand:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
f.insertHtml({
html:e.html,
editor:this.editor
});
},
__insertAudio:function(e){
if(e&&e.length){
for(var t="",i=0,a=0;a<e.length;a++)e[a]&&(t+=this.getAudioHtml(e[a]),i++);
this.execInsertCommand({
html:t
}),this.editor.funcPvUvReport("insertaudio",i);
}
},
getMusicHtml:function(e){
var t=e.musicid,i=e.mid,a=e.url,n=e.songname,s=e.albumurl,o=e.singername,u=e.play_length,c=(e.commentid||"",
"/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&singer="+encodeURIComponent(o)+"&music_name="+encodeURIComponent(n)+"&albumurl="+encodeURIComponent(s)+"&musictype="+encodeURIComponent(e.musictype)),d=["<"+_.cardTag+"><"+_.cardTag+' class="'+_.musicCardClass+' qqmusic_iframe res_iframe"',' musicid="'+t.html(!0)+'"',' mid="'+i.html(!0)+'"',' albumurl="'+s.html(!0)+'"',' audiourl="'+a.html(!0)+'"',' music_name="'+n.html(!0)+'"',' singer="'+o.html(!0)+'"',' play_length="'+u+'"',' src="'+c+'"',' musictype="'+e.musictype+'"',' otherid="'+e.otherid+'"',' albumid="'+e.albumid+'"',' jumpurlkey="'+e.jumpurlkey+'"'," "+m.pluginAttr+'="'+this.getName()+'"',">",r({
musicName:n,
singer:o,
type:e.musictype,
albumurl:s
}),"</"+_.cardTag+"></"+_.cardTag+">"].join(""),l=$("<div></div>").html(d);
return f.setDisable({
dom:l[0].firstChild.firstChild
}),l.html();
},
__insertMusic:function(e){
arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
if(e&&e.length){
for(var t="",i=0,a=0;a<e.length;a++)e[a]&&(t+=this.getMusicHtml(e[a]),i++);
this.execInsertCommand({
html:t
}),this.editor.funcPvUvReport("insertmusic",i);
}
},
__insert:function(e){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
"audio"===e[0].type?this.__insertAudio(e):this.__insertMusic(e,{
replaceMusicId:t.replaceMusicId,
replaceMusicType:t.replaceMusicType
});
}
},d;
});