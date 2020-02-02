define("tpl/pagebar.html.js",[],function(){
return'<div class="pagination">\n    <span class="page_nav_area">\n        <a href="javascript:void(0);" class="btn page_first">{firstButtonText}</a>\n        <a href="javascript:void(0);" class="btn page_prev"><i class="arrow"></i></a>\n        {if isSimple}\n            <span class="page_num">\n                <label>{initShowPage}</label>\n                { if showEndPage}\n                <span class="num_gap">/</span>\n                <label>{endPage}</label>\n                {/if}\n            </span>\n        {else}\n            {each startRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav">{pageIndex}</a>\n            {/each}\n            <span class="gap_prev">...</span>\n            {each midRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav js_mid">{pageIndex}</a>\n            {/each}\n            <span class="gap_next">...</span>\n            {each endRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav">{pageIndex}</a>\n            {/each}\n        {/if}\n        <a href="javascript:void(0);" class="btn page_next"><i class="arrow"></i></a>\n        <a href="javascript:void(0);" class="btn page_last">{lastButtonText}</a>            \n    </span>\n    {if (endPage>1 && jumpPage)}\n    <span class="goto_area">\n        <input type="text">\n        <a href="javascript:void(0);" class="btn page_go">跳转</a>\n    </span>\n    {/if}\n</div>\n';
});define("biz_common/utils/wxgspeedsdk.js",[],function(){
function e(e){
if(!e.pid||!e.speeds)return-1;
if(!e.speeds.length>0){
var n=e.speeds;
e.speeds=[],e.speeds.push(n);
}
e.user_define&&(p=e.user_define);
for(var t=d(e),o=0;o<e.speeds.length;o++){
var r=e.speeds[o];
r.time=parseInt(r.time),r.sid>20&&r.time>=0&&i(t,r.sid,r.time);
}
}
function n(){
s(function(){
setTimeout(function(){
for(var e in u)r({
pid_uin_rid:e,
speeds:u[e],
user_define:p
},c);
u={};
},100);
});
}
function t(e){
s(function(){
if(!e.pid||!e.time)return-1;
var n=d(e);
i(n,9,e.time);
});
}
function o(e){
s(function(){
var n=d(e);
u[n]||(u[n]=[]);
var t=window.performance||window.msPerformance||window.webkitPerformance||{};
if(t&&t.timing){
var o=t.timing||{};
i(n,1,o.domainLookupEnd-o.domainLookupStart),i(n,2,"https:"==location.protocol&&0!=o.secureConnectionStart?o.connectEnd-o.secureConnectionStart:0),
i(n,3,o.connectEnd-o.connectStart),i(n,4,o.responseStart-o.requestStart),i(n,5,o.responseEnd-o.responseStart),
i(n,6,o.domContentLoadedEventStart-o.domLoading),i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),
i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart),function(){
setTimeout(function(){
o.loadEventEnd&&(i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart));
},0);
}(u),u[n][9]||i(n,9,o.domContentLoadedEventStart-o.navigationStart),i(n,10,o.redirectEnd-o.redirectStart),
i(n,11,o.domainLookupStart-o.fetchStart),i(n,12,o.domLoading-o.responseStart);
}
});
}
function i(e,n,t){
u[e]=u[e]||[],u[e][n]=u[e][n]||[],0>t||(21>n?u[e][n][0]=t:u[e][n].push(t));
}
function d(e){
return e&&e.pid?e.pid+"_"+(e.uin||0)+"_"+(e.rid||0):void(console&&console.error("Must provide a pid"));
}
function r(e,n){
var t=e.pid_uin_rid.split("_");
if(3!=t.length)return void(console&&console.error("pid,uin,rid, invalid args"));
var o="pid="+t[0]+"&uin="+t[1]+"&rid="+t[2];
e.user_define&&(o+="&user_define="+e.user_define);
for(var i=n+o+"&speeds=",d="",r=[],s=1;s<e.speeds.length;s++)if(e.speeds[s]){
for(var a=0;a<e.speeds[s].length;a++){
var p=s+"_"+e.speeds[s][a];
i.length+d.length+p.length<1024?d=d+p+";":(d.length&&r.push(i+d.substring(0,d.length-1)),
d=p+";");
}
s==e.speeds.length-1&&r.push(i+d.substring(0,d.length-1));
}
for(var s=0;s<r.length;s++)(new Image).src=r[s];
}
function s(e){
"complete"==document.readyState?e():f.push(e);
}
function a(){
for(var e=0;e<f.length;e++)f[e]();
f=[];
}
var p,u={},c="https://badjs.weixinbridge.com/frontend/reportspeed?",f=[];
return window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
{
saveSpeeds:e,
send:n,
setFirstViewTime:t,
setBasicTime:o
};
});define("media/appmsg_dialog.js",["widget/media/appmsg_dialog.css","common/wx/popup.js","common/wx/top.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/time.js","tpl/media/appmsg_dialog.html.js","tpl/media/appmsg_list.html.js","biz_web/ui/checkbox.js","biz_common/moment.js"],function(i){
"use strict";
function e(i){
this.opt=i,this.onOK=i.onOK,this.createDialog();
}
i("widget/media/appmsg_dialog.css"),i("common/wx/popup.js");
var t=(i("common/wx/top.js"),i("common/wx/Tips.js")),n=i("common/wx/Cgi.js"),a=i("common/wx/pagebar.js"),s=(i("common/wx/time.js"),
i("tpl/media/appmsg_dialog.html.js")),o=i("tpl/media/appmsg_list.html.js"),p=(i("biz_web/ui/checkbox.js"),
i("biz_common/moment.js")),d=0,m=[],l={
dialogData:null
},r=[],g={
createDialog:function(){
l.dialogData=null;
var i=this,e=$.parseHTML(wx.T(s,{}));
this.dialog&&this.dialog.popup("remove"),this.dialog=$(e[0]).popup({
title:"从素材库选择图文",
className:"align_edge appmsg_dialog",
width:960,
onOK:function(){
return i.$btn.hasClass("btn_disabled")||!l.dialogData?(t.err("请选择图文消息"),!0):void(i.onOK&&i.onOK(l.dialogData));
},
onCancel:function(){
this.hide(),i.dialog=null;
},
onHide:function(){
i.$dom.off(),this.remove(),i.dialog=null;
}
}),i.$dom=i.dialog.popup("get"),i.$btn=i.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"),
i.init();
},
init:function(){
var i=this;
i.initEvent(),i.initAppMsg();
},
initEvent:function(){
var i=this;
i.$dom.on("click","a",function(i){
i.preventDefault();
}),i.$dom.on("click",".jsTempLink",function(){
var i=$(this).parents("ul").data("id"),e=$(this).parents("ul").data("index"),a=window.open();
n.get({
url:"/cgi-bin/appmsg?action=get_temp_url",
data:{
appmsgid:i,
itemidx:e+1
},
success:function(i){
i.base_resp&&0===i.base_resp.ret?a&&a.location&&(a.location.href=i.temp_url):(t.err("生成临时链接失败，请重试"),
a.close());
},
error:function(){
t.err("生成临时链接失败，请重试");
}
});
});
},
initAppMsg:function(){
var i=this;
if(!i.appMsgInited){
var e=i.$dom.find(".js_search_clear_btn"),t=i.$dom.find(".js_search");
i.getAppMsgList(),i.$dom.on("click",".js_search_btn",function(){
""==t.val()?e.hide():e.show(),i.getAppMsgList({
query:t.val()
});
}),i.$dom.on("keyup",".js_search",function(n){
wx.isHotkey(n,"enter")&&(""==t.val()?e.hide():e.show(),i.getAppMsgList({
query:t.val(),
highlight:0
}));
}),e.on("click",function(){
t.val(""),e.hide(),i.getAppMsgList({
query:""
});
}),i.appMsgInited=!0;
}
},
getAppMsgList:function(i){
var e=this,a=$.extend({
begin:0,
count:7
},i||{}),s=e.loadingFlag=++d;
e.$dom.find(".js_loading").show().siblings().hide(),e.resetPos(),n.post({
url:"/cgi-bin/appmsg?type=10&action=list_card",
data:a,
complete:function(){
e.$dom.find(".js_loading").hide(),e.resetPos();
}
},{
done:function(i){
if(s==e.loadingFlag)if(i&&i.base_resp){
if(0==i.base_resp.ret){
var o=i.app_msg_info.item;
return m=[],o.each(function(i){
i.multi_item.each(function(e,t){
e.title=e.title.replace(/<em>/g,"#em#").replace(/<(\/)em>/g,"#/em#").html(!0).replace(/#em#/g,"<em>").replace(/#\/em#/g,"</em>");
var n={
title:e.title,
cover:e.cover,
share_page_type:e.share_page_type,
id:i.app_id,
index:t,
time:p.unix(i.update_time).format("YYYY-MM-DD"),
info:""
};
n.title?n.cover||7==n.share_page_type||(n.info="(未设置封面，无法预览)"):n.info="(未命名图文，无法预览)",
a.query?n.title.indexOf("<em>")>-1&&m.push(n):m.push(n);
});
}),e.renderAppMsg(m),void(a.query?e.renderPageBar(a.begin,i.app_msg_info.search_cnt):e.renderPageBar(a.begin,i.app_msg_info.file_cnt.app_msg_cnt));
}
n.show(i);
}else t.err("系统错误");
},
fail:function(){
t.err("系统错误");
}
});
},
renderAppMsg:function(i){
var e=this;
i.length?(r=i,e.$dom.find(".js_appmsg_list").show().find(".js_tbody").html(wx.T(o,{
data:i
})).show().siblings().hide()):e.$dom.find(".js_appmsg_list").show().find(".js_empty").show().siblings().hide(),
e.$btn.addClass("btn_disabled"),l.dialogData=null,e.$dom.find(".jsAppmsgRadio").checkbox({
multi:!1,
onChanged:function(i){
var t=$(i).parents("ul");
t&&n.get({
url:"/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&&isMul=1&appmsgid="+t.data("id")
},function(n){
if(i.is(":checked")&&0==n.base_resp.ret){
var a=JSON.parse(n.app_msg_info);
l.dialogData=a.item[0].multi_item[t.data("index")],e.$btn.removeClass("btn_disabled");
}
});
}
}),e.resetPos();
},
renderPageBar:function(i,e,t){
var n=this;
i=i||0,0==e&&n.$dom.find(".js_pagebar").hide(),new a({
container:n.$dom.find(".js_pagebar"),
perPage:10,
initShowPage:(i/10|0)+1,
totalItemsNum:e,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
var e=i.currentPage;
9==t?n.getSentList({
begin:10*(e-1),
query:n.$dom.find(".js_search").val()
}):n.getAppMsgList({
begin:10*(e-1),
query:n.$dom.find(".js_search").val()
});
}
});
},
resetPos:function(){
this.dialog&&this.dialog.popup("resetPosition");
}
};
return $.extend(e.prototype,g),e;
});define("media/report.js",["biz_common/utils/monitor.js","common/wx/Cgi.js"],function(e){
"use strict";
function t(e,t){
s.pv[e]&&(t=t||1,s.pv[e].count+=t,s.debug&&console.log("addpv:"+e+" count:"+s.pv[e].count));
}
function o(e){
s.uv[e]&&(s.uv[e].count=1,s.debug&&console.log("addUv:"+e+" count:"+s.uv[e].count));
}
function n(e,n){
t(e,n),o(e);
}
function i(e){
var t=s.id[e]||s.id[0];
for(var o in s.pv){
var n=s.pv[o];
n.count>0&&c.setSum(t,n.key,n.count);
}
for(var o in s.uv){
var n=s.uv[o];
n.count>0&&c.setSum(t,n.key,n.count);
}
for(var o in s.ohterData){
var n=s.ohterData[o];
if(n.count>0){
var i=o.split("_");
c.setSum(i[0],i[1],n.count);
}
}
}
function r(){
c.send();
}
function a(e,t,o){
s.ohterData[e+"_"+t]||(s.ohterData[e+"_"+t]={
count:0
}),s.ohterData[e+"_"+t].count+=o||1,s.debug&&console.log("addNum:"+(e+"_"+t+"_"+s.ohterData[e+"_"+t].count));
}
function u(e,t,o){
var n=0,i=[],r={};
if(t&&"[object String]"==Object.prototype.toString.call(t))n=1,"img"==o&&(t=encodeURIComponent(t)),
i.push("log0="+t),r.log0=t;else if(t&&"[object Array]"==Object.prototype.toString.call(t)){
n=t.length;
for(var a=0;n>a;a++){
var u="img"==o?encodeURIComponent(t[a]):t[a];
i.push("log"+a+"="+u),r["log"+a]=u;
}
}
if("img"==o){
var c=new Image,s="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e;
n>0&&(s+="&lc="+n+"&"+i.join("&")),s+="&t="+Math.random(),c.src=s;
}else{
var l={};
n>0&&(l=r),l.idkey=e,l.lc=n,m.post({
url:"//mp.weixin.qq.com/mp/jsmonitor?",
data:l,
dataType:"json"
});
}
}
var c=e("biz_common/utils/monitor.js"),m=e("common/wx/Cgi.js"),s={
debug:window.location.href.indexOf("&_debug=1")>-1?!0:!1,
id:["28146","28305","65080"],
keyConf:["autowidth","fontsize","blockquote","horizontal","removeformat","link","unlink","mpvideo","qqvideo","wxvideo","insertimage","insertvote","insertmusic","insertaudio","insertcard","bold","italic","underline","forecolor","backcolor","justifyleft","justifycenter","justifyright","rowspacingtop","rowspacingbottom","lineheight","insertorderedlist","insertunorderedlist","imagefloatnone","imagefloatleft","imagefloatright","imagefloatcenter","usecache","cover_from_article","showlink","hidelink","remoteimgsuc","remoteimgerr","cancel_autowidth","paste","formatmatch","contextmenu","menu_selectall","menu_cleardoc","menu_justifyleft","menu_justifyright","menu_justifycenter","menu_justifyjustify","menu_inserttable","menu_copy","menu_paste","menu_unlink","insertshop","menu_insertparagraphtrue","menu_insertparagraph","img_popup","link_popup","del_img","remoteimg_img","remoteimg_style","screen_shot_suc","screen_shot_fail","not_cur_img_count","save_remoting_img"],
pv:{},
uv:{},
ohterData:{}
};
return function(){
for(var e=0,t=s.keyConf.length;t>e;e++){
var o=2*e,n=2*e+1,i=s.keyConf[e];
s.pv[i]={
key:o,
count:0
},s.uv[i]={
key:n,
count:0
};
}
}(),{
logReport:u,
addPv:t,
addUv:o,
addPvUv:n,
setData:i,
addNum:a,
send:r,
reportId:s.id
};
});define("media/draft.js",["biz_common/jquery.md5.js","media/common.js","common/qq/Class.js","biz_web/lib/store.js","biz_common/moment.js","media/report.js"],function(t){
"use strict";
function e(t,e){
return"draft_ls|%s|bizuin:%s|appid:%s|ua:%s|start_write:%s|start_read:%s|start_write_err_STK:%s|start_read_err_STK:%s".sprintf(t||"",wx.data.uin||"",e||0,window.navigator.userAgent,S.lsStartWriteEnable,S.lsStartReadEnable,S.lsStartWriteErrLog,S.lsStartReadErrLog);
}
function a(t){
var e=t.stack||t.toString()||"";
try{
e=e.replace(/http(s)?:\/\/res\.wx\.qq\.com/g,"");
for(var a=/\/([^.]+)\/js\/(\S+?)\.js(\,|:)?/g;a.test(e);)e=e.replace(a,"$2$3");
}catch(t){
e=t.stack?t.stack:"";
}
return e.replace(/\n/g,"");
}
function r(){
if(!f.isLocalStorageNameSupported()){
var t=e("notsupport");
return g.logReport("65080_44_1;65080_45_1",t,"img"),void(S.lsSupport=!1);
}
g.logReport("65080_44_1","","img"),S.lsSupport=!0;
var r=+new Date+"";
try{
window.localStorage.setItem(S.namespace,r);
}catch(n){
S.lsStartWriteEnable=0,S.lsStartWriteErrLog=a(n);
}
var i="";
try{
i=window.localStorage.getItem(S.namespace);
}catch(n){
S.lsStartReadEnable=0,S.lsStartReadErrLog=a(n);
}
window.localStorage.removeItem(S.namespace),i==r&&(S.lsStartWriteEnable=1,S.lsStartWriteErrLog="",
S.lsStartReadEnable=1,S.lsStartReadErrLog="");
}
function n(t,e,a,r){
return l(t,e,a,3,0,r);
}
function i(t,e,a){
return l(t,e,a,4);
}
function s(t){
var e=d(t);
e.appKey+=S.readOnlyDraftName;
var a=_(e.appKey);
return a&&a.list?a.list||!1:!1;
}
function o(t){
var e=d(t);
e.appKey+=S.readOnlyDraftName,f.remove(e.appKey);
}
function _(t){
var e=!1,a=!1;
if(e=f.get(t,function(){
a=!0;
}),a===!0||!e||"v2"!=e.v)return!1;
if(e.md5===$.md5(e.data)){
try{
e=JSON.parse(e.data);
}catch(r){
return!1;
}
return e?(e.seq=(e.seq||"0")+"",e):!1;
}
return!1;
}
function l(t,r,n,i,s,o){
if(S.lsSupport!==!0||!t)return!1;
n=n+""||"0",o=o+""||"0";
var _=d(r);
3==i&&(_.appKey+=S.conflictName),4==i&&(_.appKey+=S.readOnlyDraftName);
var l=1,c=[],p="65080_31_1",u="",m={
data:"",
md5:"",
v:v
},y=+new Date,h={
list:t,
seq:n,
write_t:y,
active_id:s
};
3==i&&(h.ls_seq=o);
try{
m.data=JSON.stringify(h),m.md5=$.md5(m.data);
}catch(K){
l=-6,p+=";65080_86_1",c.push("serialize_err_STK:"+a(K));
}
if(1==l&&f.set(_.appKey,m,function(t){
l=-1,p+=";65080_34_1",c.push("write_err_STK:"+a(t));
}),1==l&&(u=f.get(_.appKey,function(t){
l=-2,p+=";65080_36_1",c.push("read_err_STK:"+a(t));
})),1==l&&m.md5!=u.md5&&(p+=";65080_38_1",l=-3),1==l)return 2==i&&(p+=";65080_47_1"),
3==i?(p+=";65080_88_1",g.logReport(p,e("conflict_data",r)+("|data:"+m.data),"ajax")):g.logReport(p,"","img"),
!0;
var j=e("writeerr",r)+"|handle_type："+l+"|"+c.join("|");
return p+=";65080_32_1",p+=S.lsStartWriteEnable&&S.lsStartReadEnable?";65080_40_1":";65080_42_1",
2==i?(p+=";65080_48_1",j+="|leave_data:"+m.data):3==i&&(p+=";65080_88_1",j+="|conflict_data:"+m.data),
g.logReport(p,j,"ajax"),!1;
}
function c(t){
if(S.lsSupport!==!0)return!1;
var r=d(t);
f.remove(r.timeKey);
var n=1,i=[],s="65080_63_1";
f.remove(r.appKey,function(t){
s+=";65080_70_1",n=-4,i.push("clear_err_STK:"+a(t));
});
var o="";
if(1==n&&(o=f.get(r.appKey,function(t){
s+=";65080_72_1",n=-2,i.push("read_err_STK:"+a(t));
})),1==n&&o&&(s+=";65080_74_1",n=-3),1==n)return g.logReport(s,"","img"),!0;
s+=";65080_64_1",s+=S.lsStartWriteEnable&&S.lsStartReadEnable?";65080_66_1":";65080_68_1";
var _=e("clearerr",t)+"|handle_type："+n+"|"+i.join("|");
return g.logReport(s,_,"ajax"),!1;
}
function d(t){
var e={
draftId:wx.data.uin+(t?t:"")
};
return e.timeKey="Time"+e.draftId,e.appKey="App"+e.draftId,e;
}
t("biz_common/jquery.md5.js");
var p=t("media/common.js"),u=t("common/qq/Class.js"),f=t("biz_web/lib/store.js"),m=t("biz_common/moment.js"),g=t("media/report.js"),v="v2",S={
lsStartWriteEnable:0,
lsStartReadEnable:0,
lsStartWriteErrLog:"",
lsStartReadErrLog:"",
namespace:"__editordraft__",
conflictName:"__conflict",
readOnlyDraftName:"__readonlydraft",
lsSupport:!1,
diffTime:Math.floor(wx.cgiData.svr_time-new Date/1e3)
};
r();
var y=u.declare({
init:function(t,e,a){
var r=this;
r.app_id=t;
var n=d(t);
r.draftId=n.draftId,r.timeKey=n.timeKey,r.appKey=n.appKey,r.seq=e+"",r.editor=a,
r.isDropped=!1,r.conflict=!1,r.activeId=0,r.data=r.get();
},
_updateAppid:function(t,e){
this.app_id=t;
var a=d(t);
this.draftId=a.draftId,this.timeKey=a.timeKey,this.appKey=a.appKey,this.seq=e;
},
_supportUserData:function(){
try{
var t=document.createElement("input");
t.addBehavior("#default#userData");
}catch(e){
return!1;
}
return!0;
},
_getSaveTime:function(){
return f.get(this.timeKey);
},
_showTips:function(){},
_getDefaultLog:function(t){
return e(t,this.app_id);
},
_getErrorMessage:function(t){
return a(t);
},
showTips:function(){
$("#js_draft_tips").show().find(".js_msg_content").html('<span class="js_msg_content">点击<span class="link_global" id="js_draft_cancel">撤消</span>刚刚的导入操作。</span>');
},
clear:function(){
return c(this.app_id);
},
save:function(t,e){
return l(t,this.app_id,this.seq,e,this.activeId);
},
forceSave:function(t,e){
return l(t,this.app_id,this.seq,1,e||+new Date);
},
get:function(){
if(S.lsSupport!==!0)return!1;
var t=this,e=1,a=[],r="65080_50_1",n=!1,i="",s="";
if(i=f.get(t.appKey,function(n){
e=-2,r+=";65080_76_1",a.push("read_err_STK:"+t._getErrorMessage(n));
}),1==e&&i)if(r+=";65080_57_1","v2"==i.v)if(r+=";65080_82_1",s="",i.md5===$.md5(i.data)){
try{
i=JSON.parse(i.data);
}catch(o){
r+=";65080_80_1",e=-5;
}
1==e&&("gt"==p.dataSeqCompare(i.seq,t.seq)?(n=!1,e=-8,r+=";65080_90_1"):"gt"==p.dataSeqCompare(t.seq,i.seq)?(t.conflict=!0,
t.conflict_ls_seq=i.seq+"",n=i.list||!1):(t.conflict_ls_seq=i.seq+"",n=i.list||!1));
}else e=-3,r+=";65080_78_1";else"v1"==i.v?(r+=";65080_59_1",s=i.t||"",n=i.list||!1,
t.conflict_ls_seq="0"):(s=f.get(t.timeKey),r+=";65080_61_1",n=i||!1,t.conflict_ls_seq="0");
if(1==e&&s)try{
Number(wx.cgiData.updateTime)>m(s,"YYYY-MM-DD HH:mm:ss").unix()+S.diffTime&&(t.conflict=!0);
}catch(o){}
if(t.conflict===!0&&(r+=";65080_84_1"),1==e)return g.logReport(r,"","img"),n||!1;
r+=";65080_51_1",r+=S.lsStartWriteEnable&&S.lsStartReadEnable?";65080_53_1":";65080_55_1";
var _=t._getDefaultLog("readerr")+"|handle_type："+e+"|"+a.join("|");
return g.logReport(r,_,"ajax"),!1;
}
});
return{
constructor:y,
clear:c,
saveConflict:n,
saveReadOnlyDraft:i,
getReadOnlyDraft:s,
clearReadOnlyDraft:o
};
});define("media/article_interface.js",["media/appmsg_article.js","media/share_article.js","media/video_article.js","media/audio_article.js","media/image_article.js","media/reprint_article.js"],function(e){
"use strict";
function i(e){
var i=e.data||{},a=(i.share_page_type||0)+"";
"0"===a&&(1==i.is_share_copyright?a="9":0==i.is_share_copyright&&2==i.copyright_type&&(a="11"));
var r=new t[a](e);
return r;
}
function a(e){
var i=(e.type||0)+"";
"function"==typeof t[i].showDialog&&(e.ueditor&&e.ueditor.fireEvent("handleWinScroll",!1),
t[i].showDialog({
can_use_txvideo:e.can_use_txvideo,
onOk:function(i){
e.ueditor&&e.ueditor.fireEvent("handleWinScroll",!0),"function"==typeof e.onOk&&e.onOk(i);
},
onCancel:function(){
e.ueditor&&e.ueditor.fireEvent("handleWinScroll",!0),"function"==typeof e.onCancel&&e.onCancel();
}
}));
}
var t={
0:e("media/appmsg_article.js"),
9:e("media/share_article.js"),
5:e("media/video_article.js"),
7:e("media/audio_article.js"),
8:e("media/image_article.js"),
11:e("media/reprint_article.js")
};
return{
create:i,
showDialog:a
};
});define("media/media_cgi.js",["media/common.js","common/wx/Tips.js","common/wx/Cgi.js","resp_types/base_resp.rt.js","resp_types/file_cnt.rt.js"],function(e){
"use strict";
var r=e("media/common.js"),s=e("common/wx/Tips.js"),t=e("common/wx/Cgi.js"),i=e("resp_types/base_resp.rt.js"),n=e("resp_types/file_cnt.rt.js"),a={
del:function(e,r){
t.post({
mask:!1,
url:wx.url("/cgi-bin/operate_appmsg?sub=del&t=ajax-response"),
data:{
AppMsgId:e
},
rtDesc:i,
error:function(){
s.err("删除失败");
}
},function(e){
"0"==e.ret?(s.suc("删除成功"),r&&r(e)):s.err("删除失败");
});
},
del_sv:function(e,r){
t.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=del&t=ajax-response"),
data:{
fileid:e
},
rtDesc:i,
error:function(){
s.err("删除失败");
}
},function(e){
e.base_resp&&0==+e.base_resp.ret?(s.suc("删除成功"),r.suc&&r.suc(e)):(s.err("删除失败"),
r.fail&&r.fail(e));
});
},
edit_sv:function(e,r){
t.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=rename&t=ajax-response"),
data:{
fileid:e.id,
filename:e.name
},
rtDesc:i,
error:function(){
s.err("编辑失败");
}
},function(e){
e.base_resp&&0==+e.base_resp.ret?(s.suc("编辑成功"),r.suc&&r.suc(e)):(s.err("编辑失败"),
r.fail&&r.fail(e));
});
},
save:function(e,i,n,a,o,p){
var c=wx.url(n.AppMsgId?"/cgi-bin/operate_appmsg?t=ajax-response&sub=update&type=%s".sprintf(i):"/cgi-bin/operate_appmsg?t=ajax-response&sub=create&type=%s".sprintf(i));
n.ajax=1,t.post({
url:c,
data:n,
dataType:"json",
rtDesc:{
ret_R:"string",
appMsgId_R:"number"
},
error:function(e,r){
"timeout"!=r&&s.err("保存失败"),o&&o(!1,-1,"",{
myErrMsg:"保存失败"
});
},
complete:p
},function(e){
if("0"==e.ret)s.suc("保存成功"),a&&a(e);else{
var t=r.articleRetCode(e),i=t.index;
e.myErrMsg=t.errmsg,200047===e.base_resp.ret&&(e.myErrMsg="标题中不能含有特殊字符"),o&&o(i,e.ret,e.remind_wording,e);
}
});
},
preview:function(e,i,n,a,o){
t.post({
url:wx.url("/cgi-bin/operate_appmsg?sub=preview&t=ajax-appmsg-preview&type=%s".sprintf(i)),
data:n,
dataType:"json",
rtDesc:{
ret_R:"string"
},
error:function(){
s.err("发送失败，请稍后重试"),o&&o({
word:"发送失败，请稍后重试"
});
}
},function(e){
if("0"==e.ret)n.only_check||s.suc("发送预览成功，请留意你的手机微信"),a&&a(e);else{
var t=r.articleRetCode(e);
e.word=t.errmsg,e.antispam=t.index,200047===e.base_resp.ret&&(e.word="标题中不能含有特殊字符"),
15==i&&s.err(e.word),o&&o(e);
}
});
},
sendPreview:function(e,i,n){
t.post({
url:wx.url("/cgi-bin/operate_appmsg?sub=preview&t=ajax-appmsg-preview&type=10"),
data:e,
dataType:"json",
rtDesc:{
ret_R:"string"
},
error:function(){
s.err("发送失败，请稍后重试"),n&&n({
word:"发送失败，请稍后重试"
});
}
},function(t){
if("0"==t.ret)e.only_check||s.suc("发送预览成功，请留意你的手机微信"),i&&i(t);else{
var a=r.articleRetCode(t);
t.word=a.errmsg,t.antispam=a.index,n&&n(t);
}
});
},
modifyPreview:function(e,i,n){
t.post({
url:wx.url("/cgi-bin/masssendmodify?action=preview"),
data:e,
dataType:"json",
rtDesc:{
ret_R:"string"
},
error:function(){
s.err("发送失败，请稍后重试"),n&&n({
word:"发送失败，请稍后重试"
});
}
},function(e){
if("0"==e.ret)s.suc("发送预览成功，请留意你的手机微信"),i&&i(e);else{
var t=r.articleRetCode(e);
e.word=t.errmsg,e.antispam=t.index,15==type&&s.err(e.word),n&&n(e);
}
});
},
getList:function(e,r,a,o,p,c){
var u="";
u=wx.url(p?"/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&query=%s&f=json".sprintf(e,r,a,p):"/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&f=json".sprintf(e,r,a)),
0==c?u=wx.url("/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&f=json".sprintf(e,r,a)):1==c&&(u=wx.url("/cgi-bin/video_mgr?type=%s&action=get_video_list&begin=%s&offset=%s&f=json".sprintf(e,r,a))),
t.get({
mask:!1,
url:u,
rtDesc:$.extend({},i,{
app_msg_info:$.extend({},n,{
item_R:[],
search_cnt:"number"
})
}),
error:function(){
s.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?o&&o(e.app_msg_info):s.err("获取列表失败");
});
},
getSingleList:function(e,r,i,n){
t.get({
mask:!1,
url:wx.url("/cgi-bin/appmsg?type=%s&action=for_advert&begin=%s&count=%s&f=json".sprintf(e,r,i)),
error:function(){
s.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?n&&n(e.app_msg_info):s.err("获取列表失败");
});
}
},o={
save:function(e,r,i){
var n=wx.url("/cgi-bin/operate_vote");
e.ajax=1,t.post({
url:n,
data:e,
error:function(){
s.err("保存失败"),i&&i();
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?(s.suc("保存成功"),r&&r(e)):(s.err("保存失败"),i&&i(e));
});
}
};
return{
rename:function(e,r,i){
t.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=rename&t=ajax-response"),
data:{
fileid:e,
fileName:r
},
error:function(){
s.err("重命名失败");
}
},function(e){
if(!e||!e.base_resp)return void s.err("重命名失败");
var r=e.base_resp.ret;
if("0"==r)s.suc("重命名成功"),i&&i(e);else switch(r){
case"200002":
s.err("素材名不能包含空格");
break;

default:
s.err("重命名失败");
}
});
},
del:function(e,r){
t.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=del&t=ajax-response"),
data:{
fileid:e
},
error:function(){
s.err("删除失败");
}
},function(e){
if(!e||!e.base_resp)return void s.err("删除失败");
var t=e.base_resp.ret;
"0"==t?(s.suc("删除成功"),r&&r(e)):s.err("删除失败");
});
},
getList:function(e,r,a,o){
(2==e||3==e)&&(e+="&action=select"),t.get({
mask:!1,
url:wx.url("/cgi-bin/filepage?type=%s&begin=%s&count=%s&f=json".sprintf(e,r,a)),
rtDesc:$.extend({},i,{
page_info_R:$.extend({},n,{
file_item_R:[{
file_id_R:"number",
name_R:"string",
size_R:"string",
update_time_R:"number",
type_R:"number"
}]
})
}),
error:function(){
s.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?o&&o(e.page_info):s.err("获取列表失败");
});
},
appmsg:a,
vote:o
};
});define("common/wx/mpEditor/plugin/remoteimg.js",["common/wx/Tips.js","media/report.js","common/wx/mpEditor/plugin/filter.js","common/wx/mpEditor/plugin/checkTextUtils.js"],function(require,exports,module){
"use strict";
function Remoteimg(e){
this.init(e),this.addEvent();
}
var Tips=require("common/wx/Tips.js"),Report=require("media/report.js"),Filter=require("common/wx/mpEditor/plugin/filter.js"),CheckTextUtils=require("common/wx/mpEditor/plugin/checkTextUtils.js"),g={
appmsgTmpImg:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
defaultRemoteImg:"http://mmbiz.qpic.cn/mmbiz/G1lssUsxJOsVVJNUIuKfUP7bLm5EVWxXl5znicMum6Os0CMJHPdeHicicZ4W5MGOVa8ooSXYuE61Ek/0"
};
return Remoteimg.defaultRemoteImg=g.defaultRemoteImg,Remoteimg.prototype.init=function(e){
var t=this;
this.uploadUrl=(~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"")+"/cgi-bin/filetransfer?action=upload_material&f=json&scene=8&writetype=doublewrite&groupid=3&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time,
this.uploadUrl=wx.url(this.uploadUrl),this.mpeditor=e,this.editor=e.getUeditor(),
this.domUtils=UE.dom.domUtils,this.ajax=UE.ajax,this.localDomain=["127.0.0.1","localhost","mmbiz.qpic.cn","mmbiz.qlogo.cn","m.qpic.cn",/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g,"mmsns.qpic.cn"],
this.catcherUrl=this.editor.options.catcherUrl,this.catchFieldName="imgurl",this.separater="ue_separate_ue",
this.id=+new Date,this.remoteList={},this.Blob_obj_support=function(){
try{
return!!window.Blob&&Boolean(new Blob);
}catch(e){
return!1;
}
}(),this.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,
this.dataURLtoBlobSupport=function(){
return(t.BlobBuilder||t.Blob_obj_support)&&window.atob&&window.ArrayBuffer&&window.Uint8Array?!0:!1;
}(),this.Blob_Uint8Array_support=function(){
try{
return!!t.Blob_obj_support&&!!window.Uint8Array&&100===new Blob([new Uint8Array(100)]).size;
}catch(e){
return!1;
}
}();
},Remoteimg.prototype.countSentence=function(e){
var t=0,r=CheckTextUtils.splitChar,o="=#,@";
try{
for(var i=e.getData("text/plain"),a=i.replace(/ /g,"").replace(/\r/g,"").replace(/\n/g,o),n=0,m=r.length;m>n;n++){
var s,c=r[n];
s=c.escape?new RegExp("\\"+c.value,"g"):new RegExp(c.value,"g"),a=a.replace(s,o);
}
var s=new RegExp("("+o+")+","g"),p=new RegExp("^("+o+")","g"),l=new RegExp("("+o+")$","g");
a=a.replace(s,o).replace(p,"").replace(l,""),t=a.split(o).length;
}catch(d){}
t>0&&(Report.addNum(65080,110,1),Report.addNum(65080,111,t));
},Remoteimg.prototype.addEvent=function(){
var _t=this,me=this.editor,mpeditor=this.mpeditor;
me.addListener("onpasting",function(e,t){
var r=null,o=t.clipboardData?t.clipboardData:t.originalEvent&&t.originalEvent.clipboardData?t.originalEvent.clipboardData:{},i=o.items;
if(i&&i.length>0){
Report.addNum(Report.reportId[2],5,1),1==i.length&&/image/i.test(i[0].type)&&(r=i[0].getAsFile());
for(var a=0,n=i.length;n>a;a++)/text\/rtf/i.test(i[a].type)&&Report.addNum(Report.reportId[2],6,100);
_t.countSentence(o);
}
return _t.catchObjectBlob(r);
}),me.addListener("afterpaste aftersetcontent afterinserthtml",function(e,t,r){
for(var o,i,a,n,m=[],s=0;n=r[s++];)if(n.tagName){
o="img"==n.tagName.toLowerCase()?[n]:_t.domUtils.getElementsByTagName(n,"img");
for(var c,p=0;c=o[p++];){
if(_t.handleDataSrc(c),i=c.getAttribute("style")||c.style.cssText||"",c.getAttribute("src")&&/;?\s*(background|background-image)\s*\:/.test(i)&&($(c).css({
"background-image":"none"
}).removeClass("img_loading"),Filter.filterStyleAttr(c,["background-image"])),c.src===g.appmsgTmpImg){
var l=c.getAttribute("data-src");
l&&_t.isLocalDomain(l)&&(c.src=l,c.removeAttribute("data-src"));
}
_t.http2https("img",c),a=c.getAttribute("_src")||c.src||"",/^(https?|ftp):/i.test(a)&&!_t.isLocalDomain(a)?me.fireEvent("catchRemoteImage",c,"img",a):/^data:image/i.test(a)?_t.catchDataUrl(a,c):/^blob:/i.test(a)?_t.catchObjectUrl(c,a):_t.isLocalDomain(a)||c.parentNode&&c.parentNode.removeChild(c);
}
for("afterpaste"==e&&o.length>0&&me.fireEvent("afterpasteimg","",o),m=[n],m.push.apply(m,_t.domUtils.getElementsByTagName(n,"*")),
p=0;c=m[p++];)if(i=c.getAttribute("style")||c.style.cssText||"",i=i.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),
i&&i[2]){
a=i[2].replace(/^['"]|['"]$/g,"");
var d=_t.http2https("bg",c,a);
a=d&&d.url?d.url:a,/^(https?|ftp):/i.test(a)&&!_t.isLocalDomain(a)?me.fireEvent("catchRemoteImage",c,"bg",a):/^data:image/i.test(a)?_t.catchDataUrl(a,c):/^blob:/i.test(a)?_t.catchObjectUrl(c,a):_t.isLocalDomain(a)||(c.style.background="");
}
for(p=0;c=m[p++];)c.style&&(c.style.borderImage="",c.style.borderImageSource="");
}
}),me.addListener("catchRemoteImage",function(cmd,ci,type,url){
var remoteObj=_t.setRemoteTag({
dom:ci,
uid:"c"+_t.getuid()
});
if(remoteObj){
var uid=remoteObj.uid;
"bg"==type?me.fireEvent("funcPvUvReport","remoteimg_style"):"img"==type&&me.fireEvent("funcPvUvReport","remoteimg_img"),
_t.catchremoteimage([url],{
success:function success(xhr){
!!_t.remoteList[uid]&&delete _t.remoteList[uid];
try{
var info=eval("("+xhr.responseText+")");
}catch(e){
return me.fireEvent("funcPvUvReport","remoteimgerr"),me.fireEvent("catchremoteerror",remoteObj,""),
void _t.checkRemoteList(!0);
}
info&&0==info.errcode&&info.url?(me.fireEvent("funcPvUvReport","remoteimgsuc"),me.fireEvent("catchremotesuccess",remoteObj,info.url,info.img_format)):(me.fireEvent("funcPvUvReport","remoteimgerr"),
me.fireEvent("catchremoteerror",remoteObj,"")),_t.checkRemoteList(!0);
},
error:function(){
!!_t.remoteList[uid]&&delete _t.remoteList[uid],me.fireEvent("funcPvUvReport","remoteimgerr"),
me.fireEvent("catchremoteerror",remoteObj,""),_t.checkRemoteList(!0);
}
});
}
}),me.addListener("checkRemoteList",function(e,t){
return _t.checkRemoteList(t===!0?!0:!1);
}),me.addListener("getRemoteList",function(){
return _t.remoteList;
});
},Remoteimg.prototype.catchObjectBlob=function(e,t){
var r=this,o=this.editor,i=!1;
if(null!==e&&(i=r.filterImgSize(e)),null!==e&&i!==!0)return r.pasteImageError({
msg:i.msg?i.msg:"图片粘贴失败",
dom:t
}),!0;
if(null!==e&&i===!0){
var a,n=e.type.split("/")[1]||"";
if(a=o.window.URL||o.window.webkitURL){
var m=a.createObjectURL(e);
if("string"==typeof m)return t?r.uploadPasteImg({
image:m,
blob:e,
type:n,
dom:t
}):r.pasteImageInserted({
image:m,
blob:e,
type:n
}),!0;
}
if("function"!=typeof FileReader)return!1;
var s=new FileReader;
return s.onload=function(o){
o.target&&2==o.target.readyState&&(t?r.uploadPasteImg({
image:m,
blob:e,
type:n,
dom:t
}):r.pasteImageInserted({
image:o.target.result,
blob:e,
type:n
}));
},s.onerror=function(){
r.pasteImageError({
msg:"图片粘贴失败",
dom:t
});
},s.readAsDataURL(e),!0;
}
},Remoteimg.prototype.catchObjectUrl=function(e,t){
var r=this,o=this.editor,i=r.setRemoteTag({
dom:e,
uid:"p"+r.getuid()
});
if(i){
var a=i.uid,n=new Image;
n.onerror=function(){
!!r.remoteList[a]&&delete r.remoteList[a],o.fireEvent("catchremoteerror",i,""),r.checkRemoteList(!0);
},n.onload=function(){
!!r.remoteList[a]&&delete r.remoteList[a],n.onerror=null,n.onload=null;
var t=n.width||n.naturalWidth,i=n.height||n.naturalHeight,m=o.document.createElement("canvas"),s=m.getContext("2d");
m.width=t,m.height=i,s.drawImage(n,0,0,t,i);
var c=m.toDataURL();
r.catchDataUrl(c,e);
},n.src=t;
}
},Remoteimg.prototype.catchDataUrl=function(e,t){
var r=this,o=r.dataURLtoBlob(e),i=!1;
if(o&&!r.validImg(o)&&(o=null),o)if(i=r.filterImgSize(o),i===!0){
var a=o.type.split("/")[1]||"";
r.uploadPasteImg({
image:e,
blob:o,
dom:t,
type:a
});
}else r.pasteImageError({
msg:i.msg?i.msg:"图片粘贴失败",
dom:t
});else r.pasteImageError({
msg:"图片粘贴失败",
dom:t
});
},Remoteimg.prototype.objectUrl2Blob=function(e,t,r){
var o=new XMLHttpRequest;
o.onerror=function(){
"function"==typeof r&&r();
},o.onreadystatechange=function(){
4===o.readyState&&(o.onreadystatechange=null,o.onerror=null,o.status>=200&&o.status<300?"function"==typeof t&&t(this.response):"function"==typeof r&&r());
},o.responseType="blob",o.open("GET",e,!0),o.send();
},Remoteimg.prototype.pasteImageError=function(e){
var t=this,r=this.editor;
if(!e.dom)return void r.fireEvent("catchremoteerror",null,e.msg||"");
var o=t.setRemoteTag({
dom:e.dom,
force:!0,
uid:"p_"+this.getuid()
});
!!t.remoteList[o.uid]&&delete t.remoteList[o.uid],r.fireEvent("catchremoteerror",o,e.msg||"");
},Remoteimg.prototype.pasteImageInserted=function(e){
for(var t=this,r=this.editor,o=r.fireEvent("insertMaterialImg",[{
format:e.type,
src:e.image
}]),i=0,a=o.length;a>i;i++){
var n=o[i];
if(/^img$/i.test(n.nodeName)){
e.dom=n;
break;
}
var m=n.getElementsByTagName("img");
if(m&&m.length>0){
e.dom=m[0];
break;
}
}
e.dom&&/^img$/i.test(e.dom.nodeName)&&t.uploadPasteImg(e);
},Remoteimg.prototype.dataURLtoBlob=function(e){
if(!this.dataURLtoBlobSupport)return!1;
try{
var t,r=e.split(",");
t=r[0].indexOf("base64")>=0?window.atob(r[1]):decodeURIComponent(r[1]);
for(var o=new ArrayBuffer(t.length),i=new Uint8Array(o),a=0,n=t.length;n>a;a++)i[a]=t.charCodeAt(a);
var m=r[0].split(":")[1].split(";")[0];
if(this.Blob_obj_support)return this.Blob_Uint8Array_support?new Blob([i],{
type:m
}):new Blob([o],{
type:m
});
var s=new BlobBuilder;
return s.append(o),s.getBlob(m);
}catch(c){
return!1;
}
},Remoteimg.prototype.setRemoteTag=function(e){
var t=this,r=this.editor,o=r.fireEvent("get_current_article");
if(!e.dom||!e.uid)return!1;
var i=e.dom.getAttribute("data-remoteid");
if(i&&t.remoteList[i]){
if(e.force!==!0)return!1;
delete t.remoteList[i];
}
i=i||e.uid;
var a=t.remoteList[i]={
article:o,
uid:i,
defaultRemoteImg:g.defaultRemoteImg
};
return t.domUtils.setAttributes(e.dom,{
"data-remoteid":i
}),a;
},Remoteimg.prototype.uploadPasteImg=function(opt){
var _t=this,me=this.editor;
if("function"!=typeof FormData)return _t.pasteImageError({
msg:"粘贴图片失败",
dom:opt.dom
}),!1;
var id=this.getuid(),remoteObj=_t.setRemoteTag({
dom:opt.dom,
uid:"p_"+id
});
if(remoteObj){
var uid=remoteObj.uid,originName=$(opt.dom).data("filename"),seq=wx&&wx.getSeq(),form=new FormData,extensions=opt.blob.type.split("/")[1]||"",url=this.uploadUrl+"&seq="+seq,filename=originName||"粘贴图片_"+this.formatDate(new Date,"YYYYMMDDHHIISS")+(extensions?"."+extensions:"");
form.append("id",id),form.append("name",filename),form.append("type",opt.blob.type),
form.append("lastModifiedDate",new Date),form.append("size",opt.blob.size),form.append("file",opt.blob,filename);
var xhr=new XMLHttpRequest;
xhr.onerror=function(){
!!_t.remoteList[uid]&&delete _t.remoteList[uid],me.fireEvent("funcPvUvReport","screen_shot_fail"),
me.fireEvent("catchremoteerror",remoteObj,""),_t.checkRemoteList(!0);
},xhr.onreadystatechange=function(error){
if(4===xhr.readyState)if(xhr.upload.onprogress=null,xhr.onreadystatechange=null,
xhr.onerror=null,!!_t.remoteList[uid]&&delete _t.remoteList[uid],xhr.status>=200&&xhr.status<300){
try{
var info=eval("("+xhr.responseText+")");
}catch(e){
return me.fireEvent("funcPvUvReport","screen_shot_fail"),me.fireEvent("catchremoteerror",remoteObj,""),
void _t.checkRemoteList(!0);
}
if(info&&info.base_resp&&0==info.base_resp.ret&&info.cdn_url){
var cdnUrl=info.cdn_url.http2https();
me.fireEvent("funcPvUvReport","screen_shot_suc"),me.fireEvent("catchremotesuccess",remoteObj,cdnUrl,extensions);
}else info&&info.base_resp&&220001==info.base_resp.ret?Tips.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'):info&&info.base_resp&&220002==info.base_resp.ret?Tips.err("你的图片库已达到存储上限，请进行清理。"):(me.fireEvent("funcPvUvReport","screen_shot_fail"),
me.fireEvent("catchremoteerror",remoteObj,""));
_t.checkRemoteList(!0);
}else me.fireEvent("funcPvUvReport","screen_shot_fail"),me.fireEvent("catchremoteerror",remoteObj,""),
_t.checkRemoteList(!0);
},xhr.open("POST",url),xhr.send(form);
}
},Remoteimg.prototype.validImg=function(e){
return e.size<1024?!1:!0;
},Remoteimg.prototype.filterImgSize=function(e){
var t=5242880,r=",bmp,png,jpeg,jpg,gif,",o=","+(e.type.split("/")[1]||"")+",";
return e.size>t?{
type:1,
msg:"截图的图片大小不能超过5M"
}:-1==r.indexOf(o)?{
type:2,
msg:"截图的图片必须为以下格式：bmp,png,jpeg,jpg,gif"
}:!0;
},Remoteimg.prototype.checkRemoteList=function(e){
var t=0;
for(var r in this.remoteList)this.remoteList.hasOwnProperty(r)&&t++;
return t>0?!1:(e===!0&&this.editor.fireEvent("remoteimg_all_complete"),!0);
},Remoteimg.prototype.handleDataSrc=function(e){
var t=e.getAttribute("src")||"",r=e.getAttribute("data-src")||"";
/^data:image/i.test(t)&&(/^http:\/\/mmbiz\.qpic\.cn/.test(r)||/^https:\/\/mmbiz\.qlogo\.cn/.test(r))&&(e.setAttribute("src",r),
e.removeAttribute("data-src"));
},Remoteimg.prototype.http2https=function(e,t,r){
if("img"==e){
var o=t.getAttribute("src")||"";
if(!this.isCdnImg(o))return;
var i=this.formatUrl(o);
return t.setAttribute("src",i.url),!!i.format&&t.setAttribute("data-type",i.format),
t.removeAttribute("_src"),t.removeAttribute("data-src"),i;
}
if("bg"==e&&r&&this.isCdnImg(r)){
var i=this.formatUrl(r);
return t.style.backgroundImage=i.url,i;
}
return null;
},Remoteimg.prototype.formatUrl=function(e){
e=e||"";
var t=e.match(/(?:\?|&)wx_fmt=(.*?)(?:&|$)/)||[];
return t=t[1]||"",e=e.http2https().replace(/\?.*$/,"?"),t&&e&&(e=e+"wx_fmt="+t),
{
url:e,
format:t
};
},Remoteimg.prototype.catchremoteimage=function(e,t){
var r=e.join(this.separater),o=(this.editor,{
timeout:6e4,
onsuccess:function(){
"function"==typeof t.success&&t.success.apply(this,arguments);
},
onerror:function(){
"function"==typeof t.error&&t.error.apply(this,arguments);
}
});
try{
var i=decodeURIComponent(r);
o[this.catchFieldName]=encodeURI(i);
}catch(a){
o[this.catchFieldName]=r;
}
o.t="ajax-editor-upload-img";
var n=this;
setTimeout(function(){
n.ajax.request(n.catcherUrl,o);
},2e3);
},Remoteimg.prototype.getuid=function(){
return this.id++;
},Remoteimg.isCdnImg=Remoteimg.prototype.isCdnImg=function(e){
for(var t,r=[/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmsns\.qpic\.cn([\/?].*)*$/i],o=0;t=r[o++];)if(t.test(e))return!0;
return!1;
},Remoteimg.isLocalDomain=Remoteimg.prototype.isLocalDomain=function(e){
for(var t,r=[/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/m\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mp\.weixin\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/res\.wx\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/(a|b)(\d)+\.photo\.store\.qq\.com([\/?].*)*$/i],o=0;t=r[o++];)if(t.test(e))return!0;
return!1;
},Remoteimg.prototype.formatDate=function(e,t){
var r=t.replace(/yyyy|YYYY/,e.getFullYear()).replace(/yy|YY/,this.addZero(e.getFullYear()%100,2)).replace(/mm|MM/,this.addZero(e.getMonth()+1,2)).replace(/m|M/g,e.getMonth()+1).replace(/dd|DD/,this.addZero(e.getDate(),2)).replace(/d|D/g,e.getDate()).replace(/hh|HH/,this.addZero(e.getHours(),2)).replace(/h|H/g,e.getHours()).replace(/ii|II/,this.addZero(e.getMinutes(),2)).replace(/i|I/g,e.getMinutes()).replace(/ss|SS/,this.addZero(e.getSeconds(),2)).replace(/s|S/g,e.getSeconds());
return r;
},Remoteimg.prototype.addZero=function(e,t){
for(var r=0,o=t-(e+"").length;o>r;r++)e="0"+e;
return e+"";
},Remoteimg;
});define("common/wx/time.js",[],function(){
"use strict";
function e(e){
var t=new Date(1e3*e),r=new Date,g=t.getTime(),a=r.getTime(),u=864e5;
return u>a-g&&r.getDate()==t.getDate()?"%s:%s".sprintf(n(t.getHours()),n(t.getMinutes())):2*u>a-g&&new Date(1*t+u).getDate()==r.getDate()?"昨天 %s:%s".sprintf(n(t.getHours()),n(t.getMinutes())):6*u>=a-g?"%s %s:%s".sprintf(s[t.getDay()],n(t.getHours()),n(t.getMinutes())):t.getFullYear()==r.getFullYear()?"%s月%s日".sprintf(n(t.getMonth()+1),n(t.getDate())):"%s年%s月%s日".sprintf(t.getFullYear(),n(t.getMonth()+1),n(t.getDate()));
}
function t(e){
var t=new Date(1e3*e);
return"%s-%s-%s %s:%s:%s".sprintf(t.getFullYear(),n(t.getMonth()+1),n(t.getDate()),n(t.getHours()),n(t.getMinutes()),n(t.getSeconds()));
}
function r(e,t){
var r=["日","一","二","三","四","五","六"],n=t.replace(/yyyy|YYYY/,e.getFullYear()).replace(/yy|YY/,g(e.getFullYear()%100,2)).replace(/mm|MM/,g(e.getMonth()+1,2)).replace(/m|M/g,e.getMonth()+1).replace(/dd|DD/,g(e.getDate(),2)).replace(/d|D/g,e.getDate()).replace(/hh|HH/,g(e.getHours(),2)).replace(/h|H/g,e.getHours()).replace(/ii|II/,g(e.getMinutes(),2)).replace(/i|I/g,e.getMinutes()).replace(/ss|SS/,g(e.getSeconds(),2)).replace(/s|S/g,e.getSeconds()).replace(/w/g,e.getDay()).replace(/W/g,r[e.getDay()]);
return n;
}
function g(e,t){
for(var r=0,g=t-(e+"").length;g>r;r++)e="0"+e;
return e+"";
}
var n=function(e){
return e+="",e.length>=2?e:"0"+e;
},s=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
return{
timeFormat:e,
getFullTime:t,
formatDate:r
};
});define("common/wx/mpEditor/common/base_class.js",["common/qq/Class.js"],function(e){
"use strict";
var t=e("common/qq/Class.js"),n=t.declare({
extend:function(e){
for(var t=1,n=arguments.length;n>t;t++)for(var i in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],i)&&(e[i]=arguments[t][i]);
return e;
},
bindEventInterface:function(e){
return this.domUtils&&this.editor?("domUtils"==e.type?this.domUtils.on(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.addListener(e.eventName,e.fun),
this.__EventInterfaceCache||(this.__EventInterfaceCache=[]),void this.__EventInterfaceCache.push(e)):!1;
},
unbindEventInterface:function(){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache)for(;this.__EventInterfaceCache.length>0;){
var e=this.__EventInterfaceCache[0];
"domUtils"==e.type?this.domUtils.un(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.removeListener(e.eventName,e.fun),
this.__EventInterfaceCache.shift();
}
this.__EventInterfaceCache=[];
},
unbindSpecifyEvent:function(e){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache&&e)for(var t=0,n=this.__EventInterfaceCache.length;n>t;t++){
var i=this.__EventInterfaceCache[t];
if(i.type===e.type&&i.eventName===e.eventName&&i.fun===e.fun&&(!e.dom||e.dom&&i.dom===e.dom)){
"domUtils"==i.type?this.domUtils.un(i.dom,i.eventName,i.fun):"editor"==i.type&&this.editor.removeListener(i.eventName,i.fun),
this.__EventInterfaceCache.splice(t,1);
break;
}
}
}
});
return n;
});define("common/wx/media/keywordDialog.js",["biz_web/ui/checkbox.js","common/wx/popup.js","tpl/media/keyword_dialog.html.js"],function(i){
"use strict";
i("biz_web/ui/checkbox.js"),i("common/wx/popup.js");
var t=i("tpl/media/keyword_dialog.html.js"),n=function(i){
this.hint_word=i.hint_word||[],this.remind_wording=i.remind_wording||"你所编辑的图文消息可能含有违反微信公众平台平台协议、相关法律法规和政策的内容|你可以继续保存或发布该图文消息，若保存或发布后，经核实涉嫌含有上述相关内容的，将可能被作删除、屏蔽等处理。<br/><a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN&token=2056316619' target='_blank'>对应规则</a>",
this.buttons=i.buttons,this.onChange=i.onChange,this.onHide=i.onHide,this._initData(),
this._init();
};
return n.prototype._initData=function(){
for(var i=[],t=0;t<this.hint_word.length;t++)-1==i.indexOf(this.hint_word[t])&&i.push(this.hint_word[t]);
this.words=i;
},n.prototype._init=function(){
var i=this;
$(wx.T(t,{
words:i.words,
title:i.remind_wording.split("|")[0],
desc:i.remind_wording.split("|")[1]
})).popup({
title:"关键词提示",
buttons:i.buttons,
onShow:function(){
i.$dialog=this.get(),this.get().find(".js_btn_p").eq(0).disable(),i.$dialog.find(".js_checkbox").checkbox({
multi:!1,
onChanged:function(t){
i.onChange(i.$dialog,t);
}
});
},
onHide:i.onHide
});
},n;
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("media/common.js",["media/article_data_key.js","biz_common/jquery.validate.js","common/wx/mpEditor/plugin/filter.js"],function(e){
"use strict";
function r(e){
var r=e.key+(e.strict===!0?"Strict":"");
return"function"==typeof u[r]?u[r](e):!0;
}
function s(e){
function r(){
s&&s.fireEvent("checkRemoteList")&&s.fireEvent("checkdomAsynList")&&(s.removeListener("remoteimg_all_complete domasyn_all_complete",r),
a());
}
var s=e.editor,a=e.callback;
return s.fireEvent("checkRemoteList")&&s.fireEvent("checkdomAsynList")?void a():(s.addListener("remoteimg_all_complete domasyn_all_complete",r),
void s.funcPvUvReport("save_remoting_img"));
}
function a(e){
var r,s={
errmsg:"",
index:!1
};
switch("undefined"!=typeof e.ret?r=1*e.ret:e.base_resp&&"undefined"!=typeof e.base_resp.ret&&(r=1*e.base_resp.ret),
1*r){
case-8:
case-6:
e.ret="-6",s.errmsg="请输入验证码";
break;

case 62752:
s.errmsg="可能含有具备安全风险的链接，请检查";
break;

case 64505:
s.errmsg="发送预览失败，请稍后再试";
break;

case 64504:
s.errmsg="保存图文消息发送错误，请稍后再试";
break;

case 64518:
s.errmsg="正文只能包含一个投票";
break;

case 10704:
case 10705:
s.errmsg="该素材已被删除";
break;

case 10701:
s.errmsg="用户已被加入黑名单，无法向其发送消息";
break;

case 10703:
s.errmsg="对方关闭了接收消息";
break;

case 10700:
case 64503:
s.errmsg="1.接收预览消息的微信尚未关注公众号，请先扫码关注<br /> 2.如果已经关注公众号，请查看微信的隐私设置（在手机微信的“我->设置->隐私->添加我的方式”中），并开启“可通过以下方式找到我”的“手机号”、“微信号”、“QQ号”，否则可能接收不到预览消息";
break;

case 64502:
s.errmsg="你输入的微信号不存在，请重新输入";
break;

case 64501:
s.errmsg="你输入的帐号不存在，请重新输入";
break;

case 412:
s.errmsg="图文中含非法外链";
break;

case 64515:
s.errmsg="当前素材非最新内容，请重新打开并编辑";
break;

case 320001:
s.errmsg="该素材已被删除，无法保存";
break;

case 64702:
s.errmsg="标题超出64字长度限制";
break;

case 64703:
s.errmsg="摘要超出120字长度限制";
break;

case 64704:
s.errmsg="推荐语超出300字长度限制";
break;

case 64708:
s.errmsg="推荐语超出140字长度限制";
break;

case 64515:
s.errmsg="当前素材非最新内容";
break;

case 200041:
s.errmsg="此素材有文章存在违规，无法编辑";
break;

case 64506:
s.errmsg="保存失败,链接不合法";
break;

case 64507:
s.errmsg="内容不能包含外部链接，请输入http://或https://开头的公众号相关链接";
break;

case 64510:
s.errmsg="内容不能包含音频，请调整";
break;

case 64511:
s.errmsg="内容不能包多个音频，请调整";
break;

case 64512:
s.errmsg="文章中音频错误,请使用音频添加按钮重新添加。";
break;

case 64508:
s.errmsg="查看原文链接可能具备安全风险，请检查";
break;

case 64550:
s.errmsg="请勿插入不合法的图文消息链接";
break;

case 64558:
s.errmsg="请勿插入图文消息临时链接，链接会在短期失效";
break;

case 64559:
s.errmsg="请勿插入未群发的图文消息链接";
break;

case-99:
s.errmsg="内容超出字数，请调整";
break;

case 64705:
s.errmsg="内容超出字数，请调整";
break;

case-1:
s.errmsg="系统错误，请注意备份内容后重试";
break;

case-2:
case 200002:
s.errmsg="参数错误，请注意备份内容后重试";
break;

case 64509:
s.errmsg="正文中不能包含超过3个视频，请重新编辑正文后再保存。";
break;

case-5:
s.errmsg="服务错误，请注意备份内容后重试。";
break;

case 64513:
s.errmsg="请从正文中选择封面，再尝试保存。";
break;

case-206:
s.errmsg="目前，服务负荷过大，请稍后重试。";
break;

case 10801:
s.errmsg="标题不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",s.index=1*e.msg;
break;

case 10802:
s.errmsg="作者不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",s.index=1*e.msg;
break;

case 10803:
s.errmsg="敏感链接，请重新添加。",s.index=1*e.msg;
break;

case 10804:
s.errmsg="摘要不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",s.index=1*e.msg;
break;

case 10806:
s.errmsg="正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",s.index=1*e.msg;
break;

case 10808:
s.errmsg="推荐语不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",s.index=1*e.msg;
break;

case 10807:
s.errmsg="内容不能违反公众平台协议、相关法律法规和政策，请重新编辑。";
break;

case 200003:
s.errmsg="登录态超时，请重新登录。";
break;

case 64513:
s.errmsg="封面必须存在正文中，请检查封面";
break;

case 64551:
s.errmsg="请检查图文消息中的微视链接后重试。";
break;

case 64552:
s.errmsg="请检查阅读原文中的链接后重试。";
break;

case 64553:
s.errmsg="请不要在图文消息中插入超过5张卡券。请删减卡券后重试。";
break;

case 64554:
s.errmsg="在当前情况下不允许在图文消息中插入卡券，请删除卡券后重试。";
break;

case 64555:
s.errmsg="请检查图文消息卡片跳转的链接后重试。";
break;

case 64556:
s.errmsg="卡券不属于该公众号，请删除后重试";
break;

case 64557:
s.errmsg="卡券无效，请删除后重试。";
break;

case 13002:
s.errmsg="该广告卡片已过期，删除后才可保存成功",s.index=1*e.msg;
break;

case 13003:
s.errmsg="已有文章插入过该广告卡片，一个广告卡片仅可插入一篇文章",s.index=1*e.msg;
break;

case 13004:
s.errmsg="该广告卡片与图文消息位置不一致",s.index=1*e.msg;
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
s.errmsg=e.remind_wording||"你所编辑的内容可能含有违反微信公众平台平台协议、相关法律法规和政策的内容";
break;

case 1530503:
s.errmsg="请勿添加其他公众号的主页链接";
break;

case 1530504:
s.errmsg="请勿添加其他公众号的主页链接";
break;

case 1530510:
s.errmsg="链接已失效，请在手机端重新复制链接";
break;

case 153007:
case 153008:
case 153009:
case 153010:
s.errmsg="很抱歉，原创声明不成功|你的文章内容未达到声明原创的要求，满足以下任一条件可发起声明：<br />1、文章文字字数大于300字，且自己创作的内容大于引用内容<br />2、文章文字字数小于300字，无视频，且图片（包括封面图）均为你已成功声明原创的图片<br />说明：上述要求中，文章文字字数不包含标点符号和空格，请知悉。";
break;

case 153200:
s.errmsg="无权限声明原创，取消声明后重试";
break;

case 1530511:
s.errmsg="链接已失效，请在手机端重新复制链接";
break;

case 220001:
s.errmsg='"素材管理"中的存储数量已达到上限，请删除后再操作。';
break;

case 220002:
s.errmsg="你的图片库已达到存储上限，请进行清理。";
break;

case 153012:
s.errmsg="请设置转载类型";
break;

case 200042:
s.errmsg="图文中包含的小程序素材不能多于50个、小程序帐号不能多于10个";
break;

case 200043:
s.errmsg="图文中包含没有关联的小程序，请删除后再保存";
break;

case 64601:
s.errmsg="一篇文章只能插入一个广告卡片";
break;

case 64602:
s.errmsg="尚未开通文中广告位，但文章中有广告";
break;

case 64603:
s.errmsg="文中广告前不足300字";
break;

case 64604:
s.errmsg="文中广告后不足300字";
break;

case 64605:
s.errmsg="文中不能同时插入文中广告和互选广告";
break;

case 64607:
s.errmsg="付费图文不可插入广告，请将广告移除后再保存";
break;

case 65101:
s.errmsg="图文模版数量已达到上限，请删除后再操作";
break;

case 64560:
s.errmsg="请勿插入历史图文消息页链接";
break;

case 64561:
s.errmsg="请勿插入mp.weixin.qq.com域名下的非图文消息链接";
break;

case 64562:
s.errmsg="请勿插入非mp.weixin.qq.com域名的链接";
break;

case 153013:
s.errmsg="文章内含有投票，不能设置为开放转载";
break;

case 153014:
s.errmsg="文章内含有卡券，不能设置为开放转载";
break;

case 153015:
s.errmsg="文章内含有小程序链接，不能设置为开放转载";
break;

case 153016:
s.errmsg="文章内含有小程序链接，不能设置为开放转载";
break;

case 153017:
s.errmsg="文章内含有小程序卡片，不能设置为开放转载";
break;

case 153018:
s.errmsg="文章内含有商品，不能设置为开放转载";
break;

case 153019:
s.errmsg="文章内含有广告卡片，不能设置为开放转载";
break;

case 153020:
s.errmsg="文章内含有广告卡片，不能设置为开放转载";
break;

case 153021:
s.errmsg="文章内含有广告卡片，不能设置为开放转载";
break;

case 153101:
s.errmsg="含有原文已删除的转载文章，请删除后重试";
break;

case 64707:
s.errmsg="赞赏账户授权失效或者状态异常";
break;

case 64710:
s.errmsg="原创功能已被封禁不可设置付费图文，请切换为普通图文";
break;

case 202605:
s.errmsg="付费功能已被封禁不可设置付费图文，请切换为普通图文";
break;

case 420001:
s.errmsg="封面图不支持GIF，请更换";
break;

case 353004:
s.errmsg="不支持添加商品，请删除后重试";
break;

case 442001:
s.errmsg="帐号新建/编辑素材能力已被封禁，暂不可使用。";
break;

default:
s.errmsg="系统繁忙，请稍后重试";
}
return s;
}
function t(e,r,s,a,c){
if(c=c===!0?!0:!1,e===r)return 0!==e||1/e===1/r;
if(null==e||null==r)return e===r;
var m=Object.prototype.toString.call(e);
if(m!==Object.prototype.toString.call(r))return!1;
switch(m){
case"[object RegExp]":
case"[object String]":
return""+e==""+r;

case"[object Number]":
return+e!==+e?+r!==+r:0===+e?1/+e===1/r:+e===+r;

case"[object Date]":
case"[object Boolean]":
return+e===+r;
}
var g="[object Array]"===m;
if(!g&&("object"!=("undefined"==typeof e?"undefined":_typeof(e))||"object"!=("undefined"==typeof r?"undefined":_typeof(r))))return!1;
s=s||[],a=a||[];
for(var i=s.length;i--;)if(s[i]===e)return a[i]===r;
if(s.push(e),a.push(r),g){
if(i=e.length,i!==r.length)return!1;
for(;i--;)if(!t(e[i],r[i],s,a,c))return!1;
}else for(var o in e)if(e.hasOwnProperty(o)&&(c||l.eqWhiteKey[o])&&!(!c&&1*e.is_share_copyright==1&&l.shareCopyrightIgnoreKey.indexOf(","+o+",")>=0||"undefined"==typeof e[o]&&"undefined"==typeof r[o])){
var b=e[o],k=r[o];
if("cdn_url"==o?(b=b.http2https().replace(/\?$/,""),k=k.http2https().replace(/\?$/,"")):"content"==o&&(b=n(b),
k=n(k)),!r.hasOwnProperty(o)||!t(b,k,s,a,c))return!1;
}
return s.pop(),a.pop(),!0;
}
function n(e){
return UE&&(e=e.replace(UE.dom.domUtils.fillCharReg,"")),e=e.replace(/\s/g," "),
e=e.replace(/<br([^>]*?)>/g,""),e=e.replace('<span data-fillchar="1"></span>',""),
e=o.removeAttribute(e,[["*","class"],["*","scrolling"],["*","frameborder"],["*","data-(?:[^'\"\\s=<>]*?)"]]),
e=e.replace(/<img\s([^>]*?)>/g,function(e,r){
return"<img "+$.trim(r)+" />";
}),e=e.replace(/<input\s([^>]*?)>/g,function(e,r){
return"<input "+$.trim(r)+" />";
});
}
function c(e,r){
var e=(e||"0")+"",r=(r||"0")+"";
return e===r?"eq":e.length>r.length?"gt":e.length<r.length?"lt":e>r?"gt":"lt";
}
var m=/[\u2600-\u27BF]|[\u2B00-\u2BFF]|[\u3291-\u32B0]|[\uD83C\uD83D][\uDC00-\uDFFF]/,g=e("media/article_data_key.js"),i=e("biz_common/jquery.validate.js"),o=e("common/wx/mpEditor/plugin/filter.js"),b=i.rules,k=wx&&"3071959254"==wx.uin?1e5:5e4,u={},l={
eqWhiteKey:g.getCompareWhiteKey(),
shareCopyrightIgnoreKey:g.getShareArticleIgnoreKey()
};
return u.title=function(e){
var r=e.content||"",s=e.maxlen||64;
return b.rangelength(r,[0,s])?m.test(r)?{
msg:"%s中不能含有特殊字符".sprintf(e.label||"标题"),
errType:2
}:!0:{
msg:"%s长度不能超过%s字".sprintf(e.label||"标题",s),
errType:1
};
},u.titleStrict=function(e){
var r=e.content||"",s=e.maxlen||64;
return b.rangelength(r,[1,s])?m.test(r)?{
msg:"%s中不能含有特殊字符".sprintf(e.label||"标题"),
errType:2
}:!0:{
msg:"%s不能为空且长度不能超过%s字".sprintf(e.label||"标题",s),
errType:1
};
},u.templateContent=function(e){
var r=u.content(e);
if(r!==!0)return r;
var s=e.content||"";
return s?!0:{
msg:"正文必须有内容",
errType:100
};
},u.content=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.content||"",s=e.maxlen||1e7;
if(!b.rangelength(r,[0,s]))return{
msg:"正文总大小不得超过%sM字节".sprintf(s/1e6),
errType:1
};
var a=e.editor.fireEvent("getWordCountContent")||r.text();
if(!b.rangelength(a,[0,k]))return{
msg:"正文不能超过%s字，请删减部分内容后重试".sprintf(k),
errType:2
};
var t=$("<div>").html(r),n=e.editor.checkPlugins(t,e.articleData);
return n!==!0?{
msg:n&&n.msg?n.msg:"多媒体插件校验出错",
errType:4,
noTips:n&&n.noTips===!0?!0:!1
}:!0;
},u.contentStrict=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.content||"",s=r.text()||"";
if(!s)return{
msg:"正文必须有文字，请在正文中至少输入1个汉字后重试",
errType:3
};
var a=e.editor.fireEvent("getWordCountContent")||s;
if(!b.rangelength(a,[1,k]))return{
msg:"正文不能超过%s字，请删减部分内容后重试".sprintf(k),
errType:2
};
var t=e.maxlen||1e7;
if(!b.rangelength(r,[1,t]))return{
msg:"正文总大小不得超过%sM字节".sprintf(t/1e6),
errType:1
};
var n=$("<div>").html(r),c=e.editor.checkPlugins(n,e.articleData);
return c!==!0?{
msg:c&&c.msg?c.msg:"多媒体插件校验出错",
errType:4,
noTips:c&&c.noTips===!0?!0:!1
}:!0;
},{
articleRetCode:a,
validate:r,
waitAsynAction:s,
eq:t,
dataSeqCompare:c
};
});define("common/wx/media/previewDialog.js",["common/wx/popup.js","media/template_common.js","media/media_cgi.js","tpl/media/appmsg_edit/previewDialog.html.js","common/wx/Tips.js","biz_web/lib/store.js"],function(e){
"use strict";
e("common/wx/popup.js");
var t=e("media/template_common.js"),n=e("media/media_cgi.js"),i=e("tpl/media/appmsg_edit/previewDialog.html.js"),c=e("common/wx/Tips.js"),s=e("biz_web/lib/store.js"),o={
cacheKey:"previewAccounts",
cacheKeyLast:"lastPreviewAccounts",
uin:window.wx&&window.wx.data&&window.wx.data.uin?window.wx.data.uin:""
},a=function(e){
this._o={
appmsgid:"",
AppMsgId:"",
tpl:i,
type:1,
hasConfirmed:!1,
selectFun:null,
uin:"",
token:"",
nickname:"",
isModify:!1
},this._g={
accountLimit:5,
accountList:[],
lastAccounts:[],
rememberAccounts:[],
original_type:0,
word:"",
vObj:null,
vArea:null,
isEmpty:!0,
isChecking:!1
},this._dom={},this._extend(e),this._init();
};
return a.prototype={
_extend:function(e){
for(var t in e)this._o[t]=e[t];
},
_init:function(){
var e=this._o,t=this._g;
1==e.type?t.word="图文模版":2==e.type&&(t.word="图文消息"),e.appmsgid||(e.appmsgid=e.AppMsgId),
e.AppMsgId||(e.AppMsgId=e.appmsgid),this._initCache(),this._initDialog();
},
_initCache:function(){
var e=this,t=s.get(o.uin+o.cacheKey),n=s.get(o.uin+o.cacheKeyLast);
if(t)try{
e._g.rememberAccounts=t.split("|");
}catch(i){
e._g.rememberAccounts=[];
}
if(n)try{
e._g.accountList=e._g.lastAccounts=n.split("|");
}catch(i){
e._g.lastAccounts=[];
}
},
_cache:function(e){
var t=this._g.rememberAccounts,n=[].concat(e);
n.each(function(e){
var n=t.indexOf(e);
n>-1&&t.splice(n,1);
}),t=n.concat(t),s.set(o.uin+o.cacheKey,t.join("|")),s.set(o.uin+o.cacheKeyLast,e.join("|"));
},
_initDialog:function(){
var e=this,i=this._o,s=this._g,o=this._dom,a=this._error=function(t){
if(e._hideRecentlyContainer(),e.checkDialogAlive()&&(o.$btn.btn(!0),t)){
switch("undefined"==typeof t.ret&&t.base_resp&&"undefined"!=typeof t.base_resp.ret&&(t.ret=t.base_resp.ret),
!t||"-6"!=t.ret&&"-8"!=t.ret||(s.vArea=o.$popup.find(".js_verifycode"),s.vObj=s.vArea.html("").removeClass("dn").verifycode().data("verifycode"),
s.vObj.focus()),t&&t.antispam!==!1&&"function"==typeof i.selectFun&&i.selectFun(1*t.msg),
+t.ret){
case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
Dialog.show({
type:"warn",
msg:t.remind_wording||"你所编辑的图文消息可能含有违反微信公众平台平台协议、相关法律法规和政策的内容|你可以继续保存或发布该图文消息，若保存或发布后，经核实涉嫌含有上述相关内容的，将可能被作删除、屏蔽等处理。<br/>                    <a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN&token=2056316619' target='_blank'>对应规则</a>",
buttons:[{
text:"继续发送",
click:function(){
this.remove(),i.hasConfirmed=!0,o.$btn.trigger("click");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
break;

case 64503:
e._showError(t.word);
break;

default:
e._showError(t.word,!0);
}
e._g.isChecking=!1;
}
},r={
appmsgid:i.appmsgid,
AppMsgId:i.AppMsgId
};
s.$popup=$(wx.T(i.tpl,{
label:"请输入微信号，此%s将发送至该微信号预览。".sprintf(s.word),
accounts:s.lastAccounts,
uin:i.uin,
token:i.token,
nickname:i.nickname
})).popup({
title:"发送预览",
className:"label_block wechat_send_dialog",
onHide:function(){
i.onCancel&&i.onCancel(),e.destory(this);
},
onOK:function(){
var l=this;
e._hideError();
var d=s.accountList.concat(),_=o.$wxnameInput.val();
if(_.length&&d.push(_),0==d.length)return o.$errTips.text("请输入预览的帐号").show(),!0;
if(r.preusername_list=JSON.stringify({
preusername:d
}),null!=s.vObj&&s.vObj.getCode().trim().length<=0)return c.err("请输入验证码"),s.vObj.focus(),
!0;
o.$btn.btn(!1),r.imgcode=s.vObj&&s.vObj.getCode().trim(),i.hasConfirmed&&(r.confirm=1),
c.remove(),r.is_preview=1;
var u=function(){
e.checkDialogAlive()&&(c.suc("发送预览成功，请留意你的手机微信"),setTimeout(function(){
o.$btn.btn(!0);
},500),i.onOK&&i.onOK(),e._cache(d),e.destory(l));
};
return 2==i.type?i.sendData?(r.copyright_check_result=JSON.stringify({
list:i.sendData.copyright_check_result
})||"",r.operate_info=JSON.stringify({
list:i.sendData.operate_info
})||"",n.appmsg.sendPreview(r,u,a)):n.appmsg.preview(!0,10,r,u,a):t.preview({
postData:r,
onSuccess:u,
onError:a
}),!0;
},
onCancel:function(){
i.onCancel&&i.onCancel();
}
}),this._initEvent(),this._renderAccountList(),s.accountList.length>=s.accountLimit&&this._disableInput();
},
_initEvent:function(){
var e=this,t=e._g,n=e._g.$popup,i=e._dom;
i.$popup=n,i.$wxnameInput=n.find("#js_preview_wxname"),i.$accountContainer=n.find("#js_preview_wxname_container"),
i.$recentlyList=n.find("#js_recently_preview_wxname"),i.$recentlyContainer=n.find("#js_recently_preview_wxname_container"),
i.$recentlyTitle=i.$recentlyContainer.find(".js_rencently_title"),i.$dialogContent=n.find(".js_preview_dialog_content"),
i.$btn=n.find(".btn_primary>.js_btn"),i.$errTips=n.find(".jsAccountFail"),i.$wxnameInput.on("keyup",function(n){
var i="which"in n?n.which:n.keyCode,c=n.target.value,s=$.trim(c);
switch(e._hideError(),1*i){
case 13:
s&&(e._hideRecentlyContainer(),e._addAccount(s));
break;

case 8:
case 46:
c?(t.isEmpty=!1,e._renderRecentlyList()):t.isEmpty&&t.accountList.length?e._delAccount(t.accountList.length-1):(t.isEmpty=!0,
e._renderRecentlyList());
break;

default:
t.isEmpty=!c,e._renderRecentlyList();
}
}),i.$popup.find("#js_preview_wxname_label").on("click",function(){
t.accountList.length>=t.accountLimit&&c.err("最多添加%s个微信号".sprintf(t.accountLimit));
}),i.$accountContainer.click(function(t){
var n=$(t.target);
n.hasClass("js_del_account")&&e._delAccount(n.data("i"));
}),i.$wxnameInput.on("focus",function(){
e._renderRecentlyList();
}),n.click(function(t){
var n=$(t.target);
n.hasClass("js_add")||n.hasClass("js_del")||n.hasClass("js_del_account")||"js_preview_wxname"===t.target.id||"js_preview_wxname_container"===t.target.id||"js_recently_preview_wxname_container"===t.target.id||n.parents("#js_recently_preview_wxname_container").length||n.parents("#js_preview_wxname_container").length||e._hideRecentlyContainer();
}),$($(n.prevObject[1]).css({
zIndex:9998
}).find("iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).click(e._hideRecentlyContainer),
i.$recentlyList.click(function(n){
var i=$(n.target);
i.hasClass("js_add")?t.accountList.length<t.accountLimit?e._addAccount(i.data("value")):c.err("最多添加%s个微信号".sprintf(t.accountLimit)):e._delAccount(i.data("index"));
}),i.$popup.find("#js_clear_rencently_wxname").click(function(){
t.rememberAccounts=[],s.remove(o.uin+o.cacheKey),s.remove(o.uin+o.cacheKeyLast),
e._renderRecentlyList();
});
},
_showRecentlyContainer:function(){
this._dom&&this._dom.$recentlyContainer&&this._dom.$recentlyContainer.show();
},
_hideRecentlyContainer:function(){
this._dom&&this._dom.$recentlyContainer&&this._dom.$recentlyContainer.hide();
},
_addAccount:function(e){
var t=this,i=t._g,s=t._dom,o=t._g.accountList;
if(-1===o.indexOf(e)){
if(i.isChecking)return;
i.isChecking=!0,n.appmsg.preview(!0,10,{
only_check:1,
is_preview:1,
preusername_list:JSON.stringify({
preusername:[e]
})
},function(){
o.push(e),t._renderAccountList(),t._renderRecentlyList(),s.$wxnameInput.val(""),
i.isEmpty=!0,i.isChecking=!1,o.length>=i.accountLimit?t._disableInput():s.$wxnameInput[0].focus();
},t._error);
}else c.err("已经添加该微信号");
},
_delAccount:function(e,t){
var n=this._g;
t=t||1,n.accountList.splice(e,t),this._renderAccountList(),this._renderRecentlyList(),
n.accountList.length<n.accountLimit&&(this._enableInput(),this._dom.$wxnameInput[0].focus());
},
_enableInput:function(){
this._dom.$wxnameInput.prop("disabled",!1).show();
},
_disableInput:function(){
this._dom.$wxnameInput.prop("disabled",!0).hide();
},
_renderAccountList:function(e){
e=e||this._g.accountList;
for(var t=this._dom,n="",i=0,c=e.length;c>i;i++)n+='<span class="weui-desktop-form-tag js_account">                      <i class="weui-desktop-form-tag__name">'+e[i]+'</i>                      <a class="weui-desktop-opr-btn weui-desktop-opr-btn_close js_del_account" href="javascript:;" data-i="'+i+'">删除</a>                    </span>';
t.$accountContainer.html(n);
},
_renderRecentlyList:function(){
var e=this._g,t=this._dom,n="",i=new Array(e.rememberAccounts.length),c=t.$wxnameInput.val();
c?t.$recentlyTitle.hide():t.$recentlyTitle.show();
for(var s=0,o=e.rememberAccounts.length,a="",r="",l=!1,d=0;o>s;s++){
if(a=e.rememberAccounts[s],d=e.accountList.indexOf(a),l=d>-1,c){
if(l)continue;
if(0!==a.toLowerCase().indexOf(c.toLowerCase()))continue;
}
r='<li class="weui-desktop-wechat '+(l?"weui-desktop-wechat_selected js_del":"js_add")+'" data-value="'+a+'" data-index="'+d+'">',
r+='<em class="weui-desktop-highlight">'+a.slice(0,c.length)+"</em>"+a.slice(c.length)+"</li>",
l?i[d]=r:n+=r;
}
n=i.join("")+n,t.$recentlyList.html(n),n?this._showRecentlyContainer():this._hideRecentlyContainer();
},
_showError:function(e,t){
t||this._dom.$dialogContent.addClass("with_qrcheck"),this._dom.$errTips.html(e||"").show();
},
_hideError:function(){
this._dom.$dialogContent.removeClass("with_qrcheck"),this._dom.$errTips.html("").hide();
},
checkDialogAlive:function(){
return this._g.$popup?!0:!1;
},
destory:function(e){
e&&e.remove(),this._g.$popup=null,this._g.$vObj=null,this._g.$vArea=null,this._o.selectFun=null;
}
},a;
});define("biz_web/lib/json.js",[],function(require,exports,module){
return"object"!=typeof JSON&&(JSON={}),function(){
"use strict";
function f(t){
return 10>t?"0"+t:t;
}
function quote(t){
return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){
var e=meta[t];
return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4);
})+'"':'"'+t+'"';
}
function str(t,e){
var r,n,o,f,u,i=gap,p=e[t];
switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(t)),"function"==typeof rep&&(p=rep.call(e,t,p)),
typeof p){
case"string":
return quote(p);

case"number":
return isFinite(p)?String(p):"null";

case"boolean":
case"null":
return String(p);

case"object":
if(!p)return"null";
if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(p)){
for(f=p.length,r=0;f>r;r+=1)u[r]=str(r,p)||"null";
return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",
gap=i,o;
}
if(rep&&"object"==typeof rep)for(f=rep.length,r=0;f>r;r+=1)"string"==typeof rep[r]&&(n=rep[r],
o=str(n,p),o&&u.push(quote(n)+(gap?": ":":")+o));else for(n in p)Object.prototype.hasOwnProperty.call(p,n)&&(o=str(n,p),
o&&u.push(quote(n)+(gap?": ":":")+o));
return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",
gap=i,o;
}
}
"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){
return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null;
},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){
return this.valueOf();
});
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={
"\b":"\\b",
"	":"\\t",
"\n":"\\n",
"\f":"\\f",
"\r":"\\r",
'"':'\\"',
"\\":"\\\\"
},rep;
JSON.stringify2=function(t,e,r){
var n;
if(gap="",indent="","number"==typeof r)for(n=0;r>n;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);
if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");
return str("",{
"":t
});
},"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){
function walk(t,e){
var r,n,o=t[e];
if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),
void 0!==n?o[r]=n:delete o[r]);
return reviver.call(t,e,o);
}
var j;
if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){
return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4);
})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),
"function"==typeof reviver?walk({
"":j
},""):j;
throw new SyntaxError("JSON.parse");
});
}(),JSON;
});