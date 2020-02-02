define("common/wx/utils.js",[],function(){
"use strict";
return{
formatVideoTime:function(e){
var r=Math.floor(e%60),o=Math.floor(e/60);
return r=r&&10>r?"0"+r:r,"%s分%s秒".replace("%s",o).replace("%s",r);
}
};
});define("common/wx/const.js",[],function(){
"use strict";
var o=30;
return{
insertAdModeMap:{
auto:"2",
op:"1",
none:"0"
},
moreReadModeMap:{
custom:2,
auto:1,
none:0
},
textCountAroundAd:300,
hasShowDoubleAutoInsertDialogKey:"hasShowDoubleAutoInsertDialog",
maxArticleAdCount:2,
maxArticleAutoInsertAdCount:2,
videoDigestPlaceholder:"从这里开始输入视频介绍，可以不填",
hasShowVideoModifyDialogKey:"hasShowVideoModifyDialog",
DEFAULT_AD_TEXT:"接下来，是广告时间",
NO_AD_TEXT:"noAdText",
videoPasterMinPlayLength:60,
videoPasterMinShowTime:3,
videoTitleMaxLen:o,
modifyVideoTitleTips:"链接中的视频不可修改标题"
};
});define("media/media_static_data.js",[],function(w,e){
"use strict";
e.article_type=[{
name:"文学",
value:"文学"
},{
name:"金融财经",
value:"金融财经"
},{
name:"房产",
value:"房产"
},{
name:"时事政治",
value:"时事政治"
},{
name:"社会新闻",
value:"社会新闻"
},{
name:"工业农业",
value:"工业农业"
},{
name:"汽车",
value:"汽车"
},{
name:"科技互联网",
value:"科技互联网"
},{
name:"教育培训",
value:"教育培训"
},{
name:"艺术文化",
value:"艺术文化"
},{
name:"美妆时尚",
value:"美妆时尚"
},{
name:"娱乐",
value:"娱乐"
},{
name:"旅游",
value:"旅游"
},{
name:"健康医疗",
value:"健康医疗"
},{
name:"体育",
value:"体育"
},{
name:"餐饮美食",
value:"餐饮美食"
},{
name:"母婴育儿",
value:"母婴育儿"
},{
name:"情感",
value:"情感"
},{
name:"历史",
value:"历史"
},{
name:"军事",
value:"军事"
},{
name:"宗教",
value:"宗教"
},{
name:"星座占卜",
value:"星座占卜"
},{
name:"幽默笑话",
value:"幽默笑话"
},{
name:"图片",
value:"图片"
},{
name:"视频",
value:"视频"
},{
name:"其他",
value:"其他"
}],e.URL_PLATFORM_MAP={
"www.guokr.com":"果壳",
"www.zhihu.com":"知乎",
"blog.sina.com.cn":"新浪博客",
"www.huxiu.com":"虎嗅网",
"www.dreamore.com":"追梦网",
"cn.engadget.com":"瘾科技",
"www.cnbeta.com":"cnBeta",
"www.199it.com":"199IT",
"www.36kr.com":"36氪",
"www.tmtpost.com":"钛媒体",
"www.iheima.com":"i黑马",
"www.cyzone.cn":"创业邦",
"www.ikanchai.com":"砍柴网",
"www.iresearch.cn":"艾瑞网",
"xianguo.com":"鲜果网",
"www.myzaker.com":"ZAKER",
"jandan.net":"煎蛋网",
"pianke.me":"片刻网",
"www.techweb.com.cn":" TechWeb",
"www.leiphone.com":"雷锋网",
"www.douban.com":"豆瓣",
"www.mop.com":"猫扑",
"www.tianya.cn":"天涯",
"jingyan.baidu.com":"百度经验",
"baike.baidu.com":"百度百科",
"wenku.baidu.com":"百度文库",
"tieba.baidu.com":"百度贴吧",
"zhidao.baidu.com":"百度知道",
"news.sina.com.cn":" 新浪新闻",
"news.qq.com":"腾讯新闻",
"news.ifeng.com":"凤凰资讯",
"news.163.com":"网易新闻",
"www.xinhuanet.com":"新华社",
"www.people.com.cn":"人民网",
"www.huanqiu.com":"环球时报",
"www.gov.cn":"中国政府网",
"www.china.com":"中华网",
"www.takungpao.com":"大公网",
"www.81.cn":"中国军网",
"www.zaobao.com":"联合早报",
"d.weibo.com":"新浪微博",
"weibo.com":"新浪微博",
"www.baidu.com":"百度",
"www.sina.com.cn":"新浪",
"www.163.com":"网易",
"news.sohu.com":"搜狐新闻",
"www.sohu.com":"搜狐",
"www.ifeng.com":"凤凰网",
"qzone.qq.com":"QQ空间"
};
});define("media/article_list.js",["common/wx/media/previewDialog.js","media/common.js","common/wx/media/keywordDialog.js","common/qq/events.js","common/wx/mpEditor/common/base_class.js","common/wx/time.js","biz_web/lib/store.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/popover.js","common/wx/mpEditor/plugin/remoteimg.js","biz_common/moment.js","common/wx/const.js","common/wx/Cgi.js","common/wx/speedPerformance.js","media/media_cgi.js","media/article_interface.js","media/draft.js","media/report.js","media/appmsg_dialog.js","media/get_article_structure.js"],function(e){
"use strict";
function t(){
if("-1"==C.navigatorType)return"";
if(!C.navigatorType){
var e=window.navigator.userAgent;
C.navigatorType=/360se/i.test(e)?"360":/metasr/i.test(e)?"搜狗":/LBBROWSER/i.test(e)?"猎豹":/QQBrowser/i.test(e)?"QQ":/Edge/i.test(e)?"Edge":/Opera/i.test(e)||/Opr\//i.test(e)?"Opera":/chrome/i.test(e)?"Chrome":/Safari/i.test(e)?"Safari":/Firefox/i.test(e)?"Firefox":/MSIE/i.test(e)||/Trident\//i.test(e)?"IE":"-1";
}
return C.navigatorType;
}
function i(e){
var t=e&&e.multi_item;
return t&&t.length?($.each(t,function(e,t){
$.each(t,function(e,i){
i.html&&(t[e]=i.html(!1));
});
}),t):null;
}
function r(e,t,i){
(t||1)>S&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:e,
level:i||"error",
content:"[file=media/appmsg_edit]"
});
}
var a=e("common/wx/media/previewDialog.js"),n=e("media/common.js"),o=e("common/wx/media/keywordDialog.js"),s=e("common/qq/events.js")(!0),c=e("common/wx/mpEditor/common/base_class.js"),l=e("common/wx/time.js"),_=e("biz_web/lib/store.js"),p=e("common/wx/Tips.js"),u=e("common/wx/dialog.js"),f=e("common/wx/popover.js"),m=e("common/wx/mpEditor/plugin/remoteimg.js"),g=e("biz_common/moment.js"),h=e("common/wx/const.js").insertAdModeMap,v=e("common/wx/Cgi.js"),w=e("common/wx/speedPerformance.js"),x=e("media/media_cgi.js"),y=e("media/article_interface.js"),b=e("media/draft.js"),j=e("media/report.js"),A=e("media/appmsg_dialog.js"),E=e("media/get_article_structure.js"),k=E.getArticleStructure,D=E.getArticleStructureNoAd,T=["一","二","三","四","五","六","七","八","九","十"],C={
articleScrollId:null,
navigatorType:"",
articleSelectIdx:0,
actionClicked:!1,
CACHE_DATA_KEY:"mpnewappmsg_"+wx.uin,
CACHE_TYPE_KEY:"appmsgtype_"+wx.uin,
debug:window.location.href.indexOf("&_debug=1")>0?!0:!1,
draftTipsreportList:["2397429400","3086281409","2398460220"]
},S=Math.random(),N=n.eq,I=c.inherit({
init:function(e){
var t=this;
if($.extend(!0,t,e),t.editor=t.ueditor,t.domUtils=t.editor.getDomUtils(),t._g={
delPopover:null,
hasInitArticleData:!1
},t.opt=e,t.data_seq=(e.appmsg_data.data_seq||"0")+"",t.crop_img_ing=!1,t.$list=$(e.appmsg_selector),
t.$accountHeader=$(e.appmsg_account_selector),t.canAddArticleMoveLog=-1,t.isshare=1!=wx.cgiData.share||e.app_id?0:1,
t.gid=0,t.readOnlyType=0,t.defineEvent(),t.is_illegal)t.draft=null,t.readOnlyType="3_1",
t.list=i(e.appmsg_data),t._initArticleList();else if(t.is_rumor||t.is_malicious)t.draft=null,
t.readOnlyType="3_2",t.list=i(e.appmsg_data),t._initArticleList();else if(1==wx.cgiData.conflict){
t.readOnlyType="3_3",t.draft=null,t.list=b.getReadOnlyDraft(e.app_id),b.clearReadOnlyDraft(e.app_id);
var r="65080_99_1";
t.list||(r+=";65080_100_1"),j.logReport(r,"","img"),t._initArticleList();
}else if(wx.cgiData.bizmediaid)t.draft=null,t.readOnlyType="1_6",t.list=i(e.appmsg_data),
t._initArticleList();else if(t.ueditor.fireEvent("reportAddNum",65080,107,1),t.draft=new b.constructor(e.app_id,t.data_seq,t.ueditor),
e.app_id||t.data_seq&&"0"!=t.data_seq)t.list=i(e.appmsg_data),t.draft.seq=t.data_seq,
t.conflict_ls_seq=t.conflict_ls_seq,t._initArticleList();else if(t._hasAppmsgType()){
var a=!1;
window.localStorage&&(a=JSON.parse(localStorage.getItem(C.CACHE_DATA_KEY)),localStorage.removeItem(C.CACHE_DATA_KEY)),
t.list=a&&[a],t._initArticleList();
}else t.list=!1,t._initArticleList();
t._bindEvent();
},
_hasAppmsgType:function(){
var e=!1;
return window.localStorage&&(e=!!localStorage.getItem(C.CACHE_TYPE_KEY)),e;
},
_initArticleList:function(){
var e=this;
if(e.list){
var t=e.list.length;
$.each(e.list,function(i,r){
e.add({
data:r,
isNew:!1
}),t>1&&e.select({
idx:i,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1
});
}),wx.cgiData.bizmediaid?(e.select({
idx:wx.cgiData.idx,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1,
markInited:!0
}),$("#nav").text(wx.cgiData.appmsg_data.history_time?"正在查看历史版本："+g.unix(wx.cgiData.appmsg_data.update_time).format("YYYY-MM-DD HH:mm:ss")+"由"+(wx.cgiData.appmsg_data.operator_name||"未知")+"保存":"正在查看历史版本")):e.select({
idx:0,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1,
markInited:!0
});
}else 1!=e.isshare?(e.add({
isNew:!0
}),e.select({
idx:0,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!0
})):e.createArticle({
type:9,
onCancel:function(){
e.add({
isNew:!0
}),e.select({
idx:0,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1
});
}
});
e._g.hasInitArticleData=!0,e._updateTitleTips(),e.lastData=e._hasAppmsgType()?!1:e.getData()||!1,
e.hasConfirmed=!1,C.$actionBtn=$(template.render("tpl_article_action",{})).appendTo("body"),
1!=e.isshare&&(e._renderReadOnly(),e._warnDraft()),e._initDraftSyn(),e.renderCreateBtn();
},
_deserializeReadOnlyType:function(){
var e={
right:0,
index:0
};
if(this.readOnlyType){
var t=this.readOnlyType.split("_");
return e.right=1*t[0],e.index=1*t[1],e;
}
return e;
},
_warnDraft:function(){
var e=this;
if(this.draft&&this.draft.data){
if(N(this.lastData,this.draft.data))return void e.draft.clear();
e.ueditor.fireEvent("reportAddNum",65080,108,1);
var t=!0;
1*!e.app_id&&1*!e.draft.seq&&(t=!1),e.readOnlyType="0_5";
{
b.saveReadOnlyDraft(this.draft.data,e.app_id||0,e.draft.seq||0);
}
e.draft.clear();
var i=e._deserializeReadOnlyType();
e.ueditor.fireEvent("renderReadOnly",{
right:i.right,
type:i.index,
showTips:t
});
try{
var r=window.wx.data.uin;
if(C.debug||50==Math.floor(100*Math.random())||(","+C.draftTipsreportList.join(",")+",").indexOf(","+r+",")>=0){
var a=["draft_tips_",r,";time:",+new Date,";uin:",window.wx.data.uin||"",";app_id:",e.app_id||"",";service_ori:",JSON.stringify(e.list),";service:",JSON.stringify(e.lastData),";draft:",JSON.stringify(d)].join("");
j.logReport("",a,"ajax"),_.set("draft_tips",a),console.log("draft_tips,service:"),
console.log(e.lastData),console.log("draft_tips,draft:"),console.log(d);
}
}catch(n){}
}
},
_articleChoose:function(e,t){
var i=this,r=i.$list.children().length;
if(r>=i.maxNum&&"add"===e)return void p.err("你最多只可以加入%s条消息".sprintf(i.maxNum));
if("replace"===e&&i._reportReplaceType(t),100==t){
var a=new Image;
a.src="/cgi-bin/reportmaterialoper?oper=2&token="+wx.data.t,new A({
link:1,
onOK:function(t){
if(t){
var r=i[e]({
data:t,
isNew:!0
});
i.select({
idx:r.index()
}),i._updateTitleTips();
var a=new Image;
a.src="/cgi-bin/reportmaterialoper?oper=3&token="+wx.data.t;
}
}
});
}else i.createArticle({
type:t,
action:e,
onOk:function(t){
if(t&&(i.renderCreateBtn(),i._updateTitleTips(),i.ueditor.fireEvent("after_change_article",e),
i.app_id)){
var r=new Image;
r.src="/cgi-bin/reportmaterialoper?oper=0&idx="+t.index()+"&msgid="+i.app_id+"&token="+wx.data.t;
}
}
});
},
_reportReplaceType:function(e){
switch(e){
case 0:
this.ueditor.fireEvent("reportAddNum",121548,15,1);
break;

case 100:
this.ueditor.fireEvent("reportAddNum",121548,16,1);
break;

case 5:
this.ueditor.fireEvent("reportAddNum",121548,17,1);
break;

case 7:
this.ueditor.fireEvent("reportAddNum",121548,18,1);
break;

case 8:
this.ueditor.fireEvent("reportAddNum",121548,19,1);
break;

case 9:
this.ueditor.fireEvent("reportAddNum",121548,20,1);
}
},
_initDraftSyn:function(){
var e=this;
e.draft&&(e.ueditor.addListener("syn_draft",function(){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.data;
if(i){
var r=e.ueditor.fireEvent("checkRemoteList"),a=e.ueditor.fireEvent("checkdomAsynList");
if(e._saving!==!0&&e.crop_img_ing!==!0&&r===!0&&a===!0&&!N(i||!1,e.getData()||!1)){
e.ueditor.fireEvent("reportAddNum",65080,105,1);
var n,o=+new Date,s=0;
e.$current&&(s=e.$current.index()||0,n=e.ueditor.getSelectionRange().createDomAddress(!1,!0));
for(var d=e.$list.find(".js_appmsg_item"),c=[],l=[];d.length>0;){
e.select({
idx:0,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1
}),e.ueditor.fireEvent("saveScene");
var _=e.remove(0,!0);
c.push(_.getHistory()||null),l.push(_.getScrollTop()||0),d=e.$list.find(".js_appmsg_item");
}
e.list=i,e.lastData=e.list,$.each(e.list,function(t,i){
var r=e.add({
data:i,
isNew:!1
}),a=r.data("article");
a&&(c&&c[t]&&a.setHistory(c[t]),l&&"undefined"!=typeof l[t]&&a.setScrollTop(l[t])),
r.data("article",a),e.select({
idx:t,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1
}),e.ueditor.fireEvent("saveScene");
});
var p=e.$list.find(".js_appmsg_item").length;
e.select({
idx:Math.min(s,p-1)
}),e.renderCreateBtn(),setTimeout(function(){
n&&e.ueditor.getSelectionRange().moveToDomAddress(n,!1).select(!0);
},0),e.ueditor.fireEvent("reportAddNum",69271,66,1),e.ueditor.fireEvent("reportAddNum",69271,67,+new Date-o);
}
}
}),e.ueditor.fireEvent("initMultipleTab"));
},
_renderReadOnly:function(e,t,i){
var r=this,a=r._deserializeReadOnlyType();
if(4==a.index){
var n=r.getData()||!1;
r.draft=null,b.clear(r.app_id),b.saveConflict(n,r.app_id,r.data_seq,r.conflict_ls_seq);
}
1&a.right&&(C.$actionBtn=null,r.ueditor.fireEvent("renderReadOnly",{
right:a.right,
type:a.index,
time:e||"",
name:t||"",
ua:i||""
}));
},
_clearIntervalSave:function(){
this.draftSaveId&&(clearInterval(this.draftSaveId),this.draftSaveId=null);
},
_activeIntervalSave:function(){
var e=this;
e.draft&&(e._clearIntervalSave(),this.draftSaveId=setInterval(function(){
if(e._clearIntervalSave(),e.draft){
var t=e.getData()||!1;
e.draft.save(t);
}
e._activeIntervalSave();
},6e4));
},
_updateActionBtnPos:function(){
var e=this.$list.children().eq(C.articleSelectIdx),t=e.data("article"),i=t.getListItem(),r=i.offset(),a=r.top;
C.$actionBtn.css({
top:a+i.height()/2-C.$actionBtn.height()/2,
left:r.left+i.width()
});
},
_hoverOnArea:function(e,t){
var i=e&&(e.find(t).length>0||e.is($(t)));
return!!i;
},
_changeMoveBtnCss:function(){
var e=this.$list.children().eq(C.articleSelectIdx),t=$(".js_replace_appmsg"),i=$(".js_down"),r=$(".js_up"),a=$(".js_del");
e.is(":first-child")?(t.show(),r.hide(),r.removeClass("first_item"),i.show(),a.hide()):(t.hide(),
r.show(),r.addClass("first_item"),i.show(),a.show()),e.is(":last-child")&&i.hide();
},
_updateActionBtn:function(){
this._changeMoveBtnCss(),this._updateActionBtnPos();
},
_showActionBtn:function(e){
var t=this;
if(C.$actionBtn){
var i=$(".js_article_panel"),r=!C.$actionBtn.is(":hidden"),a=i[0]&&!i.is(":hidden");
a&&!r&&(i.hide(),a=!1);
var n=$(e.target).closest(".js_appmsg_item"),o=n.index();
o===C.articleSelectIdx&&(t._updateActionBtn(),C.$actionBtn.show());
}
},
_hideActionBtn:function(){
var e=C.$actionBtn,t=$(".js_article_panel");
if(e){
var i=!e.is(":hidden"),r=t[0]&&!t.is(":hidden");
$(".js_action_btn").removeClass("current"),i&&e.hide(),r&&t.hide();
}
},
_hideActionBtnOnDocumentClick:function(e){
var t=C.$actionBtn,i=$(".js_article_panel"),r=e.target;
this._hoverOnArea($(".js_appmsg_item"),r)||this._hoverOnArea(i,r)||this._hoverOnArea(t,r)||this._hoverOnArea($(".js_replace_pop"),r)||this._hoverOnArea($(".js_del_pop"),r)||(this._hideActionBtn(),
this.ueditor.fireEvent("hide_replace_popover"),this.ueditor.fireEvent("hide_del_popover"));
},
defineEvent:function(){
var e=this;
this._g.event={
delPopoverScroll:function(){
e._g.delPopover&&(e._g.delPopover.resetPosition($(".js_del")),e._g.delPopover.$dom=C.$actionBtn);
}
};
},
_bindEvent:function(){
var e=this;
e.ueditor.addListener("selectArticle",function(){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
e.select({
idx:t.idx,
doNotHideErr:t.doNotHideErr,
doNotScroll:t.doNotScroll,
isNewCreate:t.isNewCreate,
markInited:!1
});
}),e.ueditor.addListener("getArticleDomList",function(){
return e.$list.find(".js_appmsg_item");
}),e.ueditor.addListener("is_article_removing",function(e,t){
return C.isArticleRemoving=void 0===t?C.isArticleRemoving:!!t,C.isArticleRemoving;
}),e.ueditor.addListener("hide_del_popover",function(){
e._g.delPopover&&e._g.delPopover.hide();
}),e.ueditor.addListener("hide_action_btn",function(){
e._hideActionBtn();
}),e.$list.on("click",".js_appmsg_item",function(t){
var i=$(this).closest(".js_appmsg_item").index();
0!==i&&$(".js_article_panel").hide(),$(".js_replace_pop").hide(),$(".js_del_pop").hide(),
$(".js_action_btn").removeClass("current"),w.mark("appmsg","articleSelect","start"),
i!=e.$current.index()&&(e.select({
idx:i
}),e.ueditor.fireEvent("isReadOnly")||e.ueditor.fireEvent("foldToolbar")),wx.cgiData.idx=i,
w.mark("appmsg","articleSelect","end"),w.saveSpeeds("appmsg","articleSelect",29)&&w.send(),
e._showActionBtn.bind(e)(t);
}),e._bindHideActionBtnOnDocClick=e._hideActionBtnOnDocumentClick.bind(e),e._bindHideActionBtn=e._hideActionBtn.bind(e),
$(document).on("click",e._bindHideActionBtnOnDocClick),e.ueditor.addListener("click",e._bindHideActionBtn),
$(window).on("scroll",function(){
e.ueditor.fireEvent("article_item_list_scroll");
}),e.$list.on("mouseenter",".js_appmsg_item",e._showActionBtn.bind(e)),$(".js_appmsg_action").on("mouseenter",".js_action_btn",function(){
var e=this,t=$(".js_article_panel"),i=$(".js_replace_pop"),r=$(".js_del_pop"),a=i[0]&&!i.is(":hidden"),n=r[0]&&!r.is(":hidden"),o=t[0]&&!t.is(":hidden");
$(e).hasClass("js_replace_appmsg")||$(e).hasClass("js_del")?C.actionClicked=a||n||o?!0:!1:($(".js_article_panel").hide(),
C.actionClicked=!1,a||n||$(".js_appmsg_action").find(".js_action_btn").removeClass("current")),
$(e).addClass("current"),C.actionBtnToolTipsId&&(clearTimeout(C.actionBtnToolTipsId),
C.actionBtnToolTipsId=null),C.actionBtnToolTipsId=setTimeout(function(){
$(e).find(".js_tooltips").show();
},1e3);
}),$(".js_appmsg_action").on("click",".js_action_btn",function(){
$(this).hasClass("js_replace_appmsg")||$(this).hasClass("js_del")?($(this).addClass("current"),
C.actionClicked=!0):(e._hideActionBtn(),e._g.delPopover&&e._g.delPopover.hide());
}),$(".js_appmsg_action").on("mouseleave",".js_action_btn",function(){
C.actionClicked||$(this).removeClass("current"),C.actionBtnToolTipsId&&(clearTimeout(C.actionBtnToolTipsId),
C.actionBtnToolTipsId=null),$(this).find(".js_tooltips").hide();
}),$(".js_appmsg_action").on("click",".js_del",function(){
if(e._saving!==!0&&e.ueditor.fireEvent("before_del_article")!==!1){
e.ueditor.fireEvent("reportAddNum",121548,14,1);
var t=C.articleSelectIdx;
return t!=e.$current.index()&&e.select({
idx:t
}),e.remove(t),!1;
}
}),$(".js_appmsg_action").on("click",".js_up",function(){
if(e._saving!==!0){
e.ueditor.fireEvent("reportAddNum",121548,12,1);
var t=e.$list.children().eq(C.articleSelectIdx),i=t.prev();
t.insertBefore(i),e._updateTitleTips(),C.articleSelectIdx--;
}
}),$(".js_appmsg_action").on("click",".js_down",function(){
if(e._saving!==!0){
e.ueditor.fireEvent("reportAddNum",121548,13,1);
var t=e.$list.children().eq(C.articleSelectIdx),i=t.next();
i.insertBefore(t),e._updateTitleTips(),C.articleSelectIdx++;
}
}),$("#js_btn_account_opr").on("mouseover",function(){
$("#js_div_account_opr").is(":hidden")&&(e.accountMouseOverId&&clearTimeout(e.accountMouseOverId),
e.accountMouseOverId=setTimeout(function(){
e.ueditor.fireEvent("reportAddNum","122333","108",1);
},50));
}),$("body").on("click","a",function(t){
var i=$(this).attr("href"),r=$(this).attr("target");
if("_blank"!==r&&"string"==typeof i&&0!==i.indexOf("javascript:")&&0!==i.indexOf("#")){
e.reportAclick({
href:i
});
var a=e.getData()||!1,n=e._deserializeReadOnlyType();
if(2&n.right)return t.preventDefault(),void u.show({
type:"warn",
msg:"如果离开此页面，当前页面数据将丢失！",
buttons:[{
text:"留在此页面",
click:function(){
this.remove();
}
},{
text:"离开此页面",
type:"normal",
click:function(){
window.onbeforeunload=null,4==n.index&&b.saveConflict(a,e.app_id,e.data_seq,e.conflict_ls_seq),
location.href=i,this.remove();
}
}]
});
if(N(a,e.lastData))return void(e.draft&&e.draft.clear());
t.preventDefault();
var o=1==wx.cgiData.isNew?"是否保存当前图文消息内容？":"是否保存此次修改？";
u.show({
type:"info",
msg:o,
buttons:[{
text:"保存",
click:function(){
e.save($("#js_submit"),function(){
window.onbeforeunload=null,p.remove(),$("#js_save_success").show(),location.href=i;
}),this.remove();
}
},{
text:"不保存",
type:"normal",
click:function(){
e.draft&&e.draft.clear(),window.onbeforeunload=null,location.href=i,this.remove();
}
}]
});
}
}),e.ueditor.addListener("is_article_data_inited",function(){
return e._g.hasInitArticleData;
}),e.ueditor.addListener("can_change_article",function(t,i){
i.on("click",".js_create_article",function(){
if(e._saving!==!0&&e.ueditor.fireEvent("before_add_article")!==!1){
var t=1*$(this).attr("data-type"),r=e.ueditor.fireEvent("get_article_action_type");
"replace"===r?e.ueditor.fireEvent("before_replace_article",t):"add"===r&&(e._hideActionBtn(),
i.hide(),e._articleChoose("add",t));
}
});
}),e.ueditor.addListener("replace_article",function(t,i){
e._articleChoose("replace",i);
}),e.ueditor.addListener("contentchange",function(){
$("#js_import_tips,#js_draft_tips").hide();
}),e._activeIntervalSave(),window.onbeforeunload=function(t){
var i=e.getData()||!1,r="--------------------------------------------\n如果离开此页面，当前页面数据将丢失！\n--------------------------------------------",a=e._deserializeReadOnlyType();
if(2&a.right){
4==a.index&&b.saveConflict(i,e.app_id,e.data_seq,e.conflict_ls_seq);
try{
t.returnValue=r;
}catch(t){}
return r;
}
if(e.draft){
var n=!N(i,e.lastData);
if(!n)return void e.draft.clear();
try{
t.returnValue=r;
}catch(t){}
return r;
}
},$(window).on("unload",function(){
e._hasAppmsgType()&&window.localStorage&&localStorage.removeItem(C.CACHE_TYPE_KEY),
e.draft&&e.draft.clear();
}),e.ueditor.addListener("is_article_alive",function(e,t){
return t&&t.data("article")&&t.data("article").data&&"function"==typeof t.data("article").data.getData?!0:!1;
}),e.ueditor.addListener("is_article_editing",function(e,t){
return t.hasClass("current")?!0:!1;
}),e.ueditor.addListener("get_current_article",function(){
return e.getCurrentArticle();
}),e.ueditor.addListener("get_current_article_all_img",function(){
var t=e.$current?e.$current.data("article"):null;
return t&&"function"==typeof t.getAllImgData?t.getAllImgData():[];
}),e.ueditor.addListener("article_item_list_scroll",function(){
C.$actionBtn&&!C.$actionBtn.is(":hidden")&&e._updateActionBtn(),e.ueditor.fireEvent("update_action_panel_pos"),
e._g.event.delPopoverScroll(),e.ueditor.fireEvent("reset_replace_popover");
}),e.ueditor.addListener("end_crop_img",function(){
e.crop_img_ing=!1;
}),e.ueditor.addListener("start_crop_img",function(){
e.crop_img_ing=!0;
}),e.ueditor.addListener("getArticleListData",function(){
return{
data:e.getData()
};
}),e.ueditor.addListener("activeStateChange",function(){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
t.isFocus?e._activeIntervalSave():e._clearIntervalSave();
}),s.on("_preview",function(t){
e._preview(t);
});
},
renderCreateBtn:function(){
var e=this.$list.children().length;
e>=this.maxNum?$("#add_appmsg_container").hide():$("#add_appmsg_container").show();
},
reportAclick:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(e.href){
var t=location.protocol+"//"+location.host,i="122333",r=null;
0===e.href.indexOf(t+"/?")?r="106":0===e.href.indexOf(t+"/cgi-bin/settingpage?t=setting/index&action=index")?r="109":0===e.href.indexOf(t+"/cgi-bin/frame?t=notification/index_frame")?r="107":0===e.href.indexOf(t+"/acct/wxverifyorder?action=index")?r="110":0===e.href.indexOf(t+"/cgi-bin/settingpage?t=setting/function&action=function")?r="111":0===e.href.indexOf(t+"/cgi-bin/logout?t=wxm-logout")&&(r="112"),
r&&this.ueditor.fireEvent("reportAddNum",i,r,1);
}
},
createArticle:function(e){
var t=this,i=e.type,r=e.action||"add";
y.showDialog({
ueditor:t.ueditor,
can_use_txvideo:wx.cgiData.can_use_txvideo,
type:i,
onOk:function(a){
var n;
n=t[r](0==i?{
isNew:!0
}:{
data:a.data,
isNew:!0
}),t.select({
idx:n.index(),
doNotHideErr:!1,
doNotScroll:!1,
isNewCreate:!0
}),"function"==typeof e.onOk&&e.onOk(n);
},
onCancel:function(){
"function"==typeof e.onCancel&&e.onCancel();
}
});
},
_getArticleDiffData:function(){
var e=200,t=this.getData(),i=[],r=null;
if(t){
for(var a=!0,n=0,o=t.length;o>n;n++)i.push({
content:t[n].content.text().substr(0,e),
title:t[n].title
});
for(var n=0,o=i.length;o>n;n++){
var s=i[n];
if(!s.title||!s.content||s.content.length!=e){
a=!1;
break;
}
for(var d=n+1;o>d;d++){
var c=i[d];
if(!c.title||!c.content||c.content.length!=e){
a=!1;
break;
}
if(s.title==c.title||s.content==c.content){
a=!1;
break;
}
}
if(a===!1)break;
}
a===!0&&i.length>0&&(r=i);
}
return r;
},
_getCurrentIndex:function(){
return this.$current&&this.$current.data("article")?this.$current.data("article").getIndex():0;
},
_updateTitleTips:function(){
var e=0;
if(this.$list.children().each(function(){
var t=$(this);
t.data("msgindex",e),t.children().attr("title","第%s篇图文".sprintf(T[e]));
var i=t.data("article");
i&&i.updateIndex(e),e++;
}),this._g.hasInitArticleData&&this.$current&&this.ueditor.fireEvent("is_use_editor")){
var t=this.$current.data("article");
t&&this.ueditor.updateSeq({
article:t,
seq:1*t.data.get("seq")
});
}
},
_checkExternalLink:function(e){
var t=[],i=$.map(e,function(e,t){
return 0==t.indexOf("content")?e:void 0;
});
if($.each(i,function(e,i){
for(var r=/http\:\/\/([\w-]+\.)+[\w-]+(\:\d*)?(\/[\w\- \.\/\?%&=]*)?/gi,a=null,n="";null!=(a=r.exec(i));)n=i.substring(a.index,r.lastIndex),
m.isLocalDomain(n)||t.push(i.substring(Math.max(0,a.index-20),r.lastIndex));
}),t.length){
var r=(t.length,{
lc:t.length
});
$.each(t,function(e,t){
r["log"+e]=encodeURIComponent(t);
}),$.post("//mp.weixin.qq.com/mp/jsmonitor?idkey=28308_7_1",r);
}
},
getCurrentArticle:function(){
return this.$current||null;
},
getCurrentArticleObject:function(){
return this.$current?this.$current.data("article"):null;
},
add:function(e){
var t=this,i=t.$list.children().length;
i==t.maxNum-1&&t.$list.parent().siblings("a").hide(),i>=0&&t.$accountHeader&&"none"===t.$accountHeader.css("display")&&t.$accountHeader.show();
var r=new y.create({
isNew:e.isNew===!1?!1:!0,
app_id:t.app_id||"",
$infoContainer:$(t.opt.editor_selector),
$articleList:t.$list,
data:e.data,
index:i,
ueditor:t.ueditor,
$freeUEditor:t.freeUEditor,
$navigator:$(".js_main_title"),
cgiData:window.wx.cgiData,
formItemsOpt:t.opt.formItemsOpt
});
return $(".js_scrollbar").scrollbar.updateScrollbars(!0),t._updateTitleTips(),r.getListItem();
},
remove:function(e,t){
var i=this,r=i.$list.children().eq(e);
i.$current&&e!=i.$current.index()&&i.select({
idx:e
});
var a=r.data("article").flush();
return t===!0?i.drop(e):(i._g.delPopover=new f({
dom:C.$actionBtn,
content:$("#js_article_del_popover_tpl").html(),
className:"menu-inside-popover menu-inside-del js_del_pop",
margin:"left_top",
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
if(i.ueditor.fireEvent("reportAddNum",121548,24,1),i.drop(C.articleSelectIdx),i.renderCreateBtn(),
i.app_id){
var e=new Image;
e.src="/cgi-bin/reportmaterialoper?oper=1&idx="+C.articleSelectIdx+"&msgid="+i.app_id+"&token="+wx.data.t;
}
i._hideActionBtn(),this.hide();
},
type:"primary"
},{
text:"取消",
click:function(){
i.ueditor.fireEvent("reportAddNum",121548,25,1),i._hideActionBtn(),this.hide();
}
}],
onShow:function(){
var e=i.$list.children().eq(C.articleSelectIdx),t=e.data("article").data.getData(),r=this.$pop.find("#js_del_title").eq(0),a=8===t.share_page_type?t.guide_words||"":t.title;
r.html(t&&a?"："+a+"？":"？"),this.resetPosition($(".js_del")),this.$dom=C.$actionBtn,
i.ueditor.fireEvent("is_article_removing",!0);
},
onHide:function(){
i.ueditor.fireEvent("is_article_removing",!1),i.unbindSpecifyEvent({
dom:window,
type:"domUtils",
eventName:"scroll",
fun:i._g.event.delPopoverScroll
});
}
}),i._g.delPopover.hide(),i._g.delPopover.show(),i.bindEventInterface({
dom:window,
type:"domUtils",
eventName:"scroll",
fun:i._g.event.delPopoverScroll
})),a;
},
replace:function(e){
var t=this;
t.remove(e.idx||0,!0);
var i=new y.create({
isNew:e.isNew===!1?!1:!0,
app_id:t.app_id||"",
$infoContainer:$(t.opt.editor_selector),
$articleList:t.$list,
data:e.data,
index:e.idx||0,
ueditor:t.ueditor,
$freeUEditor:t.freeUEditor,
$navigator:$(".js_main_title"),
cgiData:window.wx.cgiData,
formItemsOpt:t.opt.formItemsOpt
});
return $(".js_scrollbar").scrollbar.updateScrollbars(!0),t._updateTitleTips(),i.getListItem();
},
drop:function(e){
var t=this;
0!=e&&t.select({
idx:Math.max(0,e-1)
});
var i=t.$list.children().eq(e),r=i.data("article");
r&&"function"==typeof r.destroy&&r.destroy(),t.$list.children().eq(e).remove(),t.$list.parent().siblings("a").show(),
$(".js_scrollbar").scrollbar.updateScrollbars(!0),t._updateTitleTips();
},
select:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=e.idx,i=e.doNotHideErr,r=e.doNotScroll,a=e.isNewCreate,n=this,o="number"!=typeof t?t:n.$list.find(".js_appmsg_item").eq(t);
o.addClass("current");
var s=null;
if(o.siblings().removeClass("current"),C.articleSelectIdx=t,n.$current){
if(t==n.$current.index())return void n.ueditor.fireEvent("afterArticleSelect",t);
if(s=n.$current.data("article")){
var d=s.data.getData(),c=k(s.editor.ueditor.body);
d.compose_info=JSON.stringify({
list:D(this.editor.ueditor.body)
}),d.sections=JSON.stringify(c),d.secondAutoAdAvailable=c.secondAutoAdAvailable,
d.autoAdAvailable=c.autoAdAvailable,s.flush(),s.destroy();
}
n._checkRepeat();
}
e.markInited&&(n._g.hasInitArticleData=!0),s=o.data("article"),s&&(!i&&s.hideErrorTips(),
n.$current=o,s.data.getData().is_new_create=a,s.render()),n.ueditor.fireEvent("showContentplaceholder");
var l=$("html"),_=s.getScrollTop(),p=l.scrollTop();
if(C.articleScrollId&&(clearTimeout(C.articleScrollId),C.articleScrollId=null),r||(C.articleScrollId=setTimeout(function(){
var e=Math.max(l.height()-$(window).height(),0);
!r&&_!=p&&e>=_&&l.animate({
scrollTop:_-131
});
},100)),$("#js_appmsg_upload_cover").siblings("ul").hide(),n.ueditor.fireEvent("afterArticleSelect",t),
wx.cgiData.can_see_ad){
var d=s.data.getData(),u=d.insert_ad_mode?d.insert_ad_mode:a?wx.cgiData.insert_ad_mode:h.none,f=-1!==d.content.indexOf("js_cpc_area"),m=-1!==d.content.indexOf("appmsg_edit_ad_preview"),g=f||m?h.op:u;
n.ueditor.fireEvent("setArticleAdMode",g),n.ueditor.fireEvent("setArticleAdCategoriesList",d.categories_list),
setTimeout(function(){
n.ueditor.fireEvent("editAd");
},50);
}
},
_checkRepeat:function(){
try{
var e=function(e,t,i){
var r={};
return e=$.extend(e,t),$.each(i,function(t,i){
r[i]=e[i];
}),r;
},t=this,i=t.$current.index(),r=t.$current.data("article").data,a=["author","digest","file_id","source_url","title","content"],n=e({},r.getData(),a);
if(""==r.get("content")||""==r.get("title"))return;
var o=!0;
if($.each(a,function(e,t){
n[t]&&(o=!1);
}),o)return;
t.$list.find(".js_appmsg_item").each(function(r){
if(r!=i){
var o=e({},$(this).data("article").data.getData(),a);
N(n,o,null,null,!0)&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=[repeat][appid:%s,idx:%s,bizuin:%s]".sprintf(28308,1,t.app_id||0,r,wx.data.uin));
}
});
}catch(s){}
},
getData:function(e,t){
var i=this,r=[],a=null,n=i.$current;
n&&(a=n.data("article"),a&&a.flush());
var o=!0;
return i.$list.find(".js_appmsg_item").each(function(a){
var n=$(this).data("article");
if(n){
var s=n.getData(e,t);
return null==s?(i.select({
idx:a,
doNotHideErr:!0,
doNotScroll:!0,
isNewCreate:!1
}),o=!1,!1):void r.push(s);
}
}),0==r.length?!1:o&&r;
},
getPostData:function(e){
var i=this,r=i.getData(!0,e);
if(!r)return null;
var a={
AppMsgId:i.app_id,
count:r.length,
data_seq:(i.data_seq||"0")+"",
operate_from:t(),
isnew:0
};
return $.each(r,function(e,t){
var i={};
$.each(t,function(r,a){
"writerid"==r&&""==a&&(a=0),"title"===r&&8==t.share_page_type&&(a="分享图片"),i[r+e]=a;
}),$.extend(a,i);
}),a;
},
updateAppid:function(e){
1*this.app_id!==1*e&&(this.app_id=e,this.$list.find(".js_appmsg_item").each(function(){
var t=$(this).data("article");
t&&"function"==typeof t.updateAppid&&t.updateAppid(e);
}),this.ueditor.updateAppid(e));
},
update:function(e,t){
if(e&&0!=e.length){
var i;
this.$current&&(i=this.$current.index()||0);
for(var r=["content","title","author","digest"],a=0,n=e.length;n>a;a++){
var o=e[a];
if(o){
for(var s=!1,d={},c=0;c<r.length;c++)"undefined"!=typeof o[r[c]]&&(s=!0,d[r[c]]=o[r[c]]);
if(s!==!1){
var l=void 0;
if("undefined"!=typeof d.content&&t&&t["content"+a]&&(l={
description:"mp editor modify content after save",
level:"info",
data:{
appmsgid:this.app_id,
seq:a,
beforeSaveContent:t["content"+a],
afterSaveContent:d.content
}
}),this.$current&&this.$current.index()==a){
var _=this.$current.data("article");
_&&_.data&&"function"==typeof _.data.get&&1*_.data.get("is_share_copyright")!=1&&(l&&this.ueditor.fireEvent("mplog",l),
_.modifyCurrentEditData(d));
}else{
var _=this.$list.find(".js_appmsg_item").eq(a).data("article");
if(_&&_.data&&"function"==typeof _.data.set&&1*_.data.get("is_share_copyright")!=1){
l&&this.ueditor.fireEvent("mplog",l);
for(var p in d)_.data.set(p,d[p]);
}
}
}
}
}
this.$current&&this.$current.index()!=i&&this.select({
idx:i,
doNotHideErr:!1,
doNotScroll:!1,
isNewCreate:!1
});
}
},
save:function(e,t,i,a,s,d){
var c=this._deserializeReadOnlyType();
if(!(1&c.right||this._saving===!0)){
this.ueditor.fireEvent("beforeSaveArticle");
var _=0,f=this;
try{
_=3;
{
f.getData();
}
_=4;
var m=f.getPostData(i||d);
if(_=5,!m)return;
f.hasConfirmed&&(f.hasConfirmed=!1,m.confirm=1),"undefined"!=typeof f.confirm_treatment&&(m.confirm_treatment=f.confirm_treatment),
"undefined"!=typeof f.cover_word&&(m.cover_word=f.cover_word),"undefined"!=typeof f.hint_word&&(m.hint_word=f.hint_word),
e.btn(!1),f._saving=!0,r(30,.1,"error"),this.ueditor.fireEvent("beforeWaitAsynAction",{
postData:m,
hasShowTips:!1
}),n.waitAsynAction({
editor:f.ueditor,
callback:function(){
var n=f.getPostData(i||d);
return n?(1===m.confirm&&(n.confirm=1),m.confirm_treatment&&(n.confirm_treatment=m.confirm_treatment),
m.cover_word&&(n.cover_word=m.cover_word),m.hint_word&&(n.hint_word=m.hint_word),
n=f.filtercharCode(n),r(31,.1,"error"),f.ueditor.fireEvent("reportAddNum",65080,91,1),
w.mark("appmsg","saveArticle","end"),w.saveSpeeds("appmsg","saveArticle",28)&&w.send(),
void x.appmsg.save(!0,10,n,function(i){
f.confirm_treatment=void 0,f.cover_word=void 0,f._saving=!1,e.btn(!0),f.updateAppid(i.appMsgId),
f.data_seq=i.data_seq+"",f.update(i.filter_content_html,n),f.lastData=f.getData()||!1,
f.lastData=f.getData()||!1,f.draft&&(f.draft.clear(),f.draft._updateAppid(f.app_id,f.data_seq)),
t(i,n),f._checkExternalLink(n);
},function(t,r,s,d){
switch(f._saving=!1,e.btn(!0),0!=t&&f.select({
idx:1*t
}),+r){
case 64515:
f.ueditor.fireEvent("reportAddNum",65080,92,1),f.readOnlyType="3_4",f.conflict_ls_seq=f.data_seq+"",
f.data_seq=d.data_seq+"",f._renderReadOnly(l.timeFormat(d.update_time),d.operator_name,d.operate_from);
break;

case 200041:
p.err(d.myErrMsg),f.draft=null,f.readOnlyType="3_1",f._renderReadOnly();
break;

case 1530503:
$(".frm_msg.js_warn").text(d.myErrMsg).show(),$("input[name='source_url']").focus();
break;

case 1530504:
$(".page_msg.js_warn").show().find(".profile_link_msg_global").text(d.myErrMsg),
$(window).scrollTop(0);
break;

case 1530510:
$(".frm_msg.js_warn").text(d.myErrMsg).show(),$("input[name='source_url']").focus();
break;

case 1530511:
$(".page_msg.js_warn").show().find(".profile_link_msg_global").text(d.myErrMsg),
$(window).scrollTop(0);
break;

case 153007:
case 153008:
case 153009:
case 200042:
case 200043:
case 64601:
case 64602:
case 64603:
case 64604:
case 64605:
case 153010:
u.show({
width:750,
type:"warn",
msg:d.myErrMsg,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
break;

case 10811:
case 10812:
case 10813:
case 10814:
f.hint_word=d.hint_word.join("|"),new o({
hint_word:d.hint_word,
remind_wording:d.remind_wording,
onHide:function(){
f.confirm_treatment=void 0,f.cover_word=void 0;
},
onChange:function(e,t){
e.find(".js_btn_p").eq(0).enable(),f.cover_word=0==t.checkbox("value")?0:1;
},
buttons:[{
text:"继续保存",
type:"primary",
click:function(){
this.remove(),f.confirm_treatment=d.confirm_treatment,e.trigger("click");
}
},{
text:"取消",
click:function(){
f.confirm_treatment=void 0,f.cover_word=void 0,this.remove();
}
}]
});
break;

case 13002:
$(".js_ad_tips_wording").text(d.myErrMsg),$(".js_ad_error_tips").parent().show(),
$(".js_ad_error_tips").show(),a&&a.fireEvent("scrollIntoView",$(".js_ad_preview"),$(window).height()-$(".js_ad_preview").height()-72-30);
break;

case 13003:
var c="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&lang=zh_CN&token="+wx.data.t+"&type=10&appmsgid="+d.ad_article_msgid+"&isMul=1";
$(".js_ad_tips_wording").html('已有文章<a href="%s" target="_blank">《%s》</a>过该广告卡片，一个广告卡片仅可插入一篇文章'.sprintf(c,d.ad_article_title)),
$(".js_ad_error_tips").parent().show(),$(".js_ad_error_tips").show(),a&&a.fireEvent("scrollIntoView",$(".js_ad_preview"),$(window).height()-$(".js_ad_preview").height()-72-30);
break;

case 13004:
$(".js_ad_tips_wording").text(d.myErrMsg),$(".js_ad_error_tips").parent().show(),
$(".js_ad_error_tips").show(),a&&a.fireEvent("scrollIntoView",$(".js_ad_preview"),$(window).height()-$(".js_ad_preview").height()-72-30);
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
u.show({
type:"info",
msg:s||"你所编辑的图文消息可能含有违反微信公众平台平台协议、相关法律法规和政策的内容|你可以继续保存或发布该图文消息，若保存或发布后，经核实涉嫌含有上述相关内容的，将可能被作删除、屏蔽等处理。<br/><a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN&token=2056316619' target='_blank'>对应规则</a>",
buttons:[{
text:i?"继续预览":"继续保存",
click:function(){
this.remove(),f.hasConfirmed=!0,f.confirm_treatment=d.confirm_treatment,e.trigger("click"),
i||f._remindReport(1,d.remind_type,JSON.stringify(d.hint_word));
}
},{
text:"取消",
type:"normal",
click:function(){
f._remindReport(2,d.remind_type,JSON.stringify(d.hint_word)),f.confirm_treatment=void 0,
f.cover_word=void 0,this.remove();
}
}],
close:function(){
return f._remindReport(0,d.remind_type,JSON.stringify(d.hint_word)),f.confirm_treatment=void 0,
f.cover_word=void 0,!0;
}
});
break;

case 153012:
setTimeout(function(){
$("html, body").animate({
scrollTop:$(".origined").offset().top-60
});
},100),$("#original_type_msg").show();
break;

case 64518:
p.err("保存失败，不允许包含多个投票");
break;

case 64519:
p.err("保存失败，包含了不属于该公众号的投票");
break;

case 64713:
p.err("因原视频被取消原创，导致转载视频无法播放，请重新上传视频");
break;

case 64712:
p.err("因原视频被删除，导致转载视频无法播放，请重新上传视频");
break;

case 64520:
p.err("保存失败，包含了未发布的投票");
break;

case 442001:
p.err("帐号新建/编辑素材能力已被封禁，暂不可使用。");
break;

case 353001:
for(var _=[],m=0;20>m;m++){
var g="content"+m;
if(!n[g])break;
_.push({
content:n[g]
});
}
f.update(_),u.show({
type:"warn",
msg:"文章内商品存在违规，请删除后群发",
buttons:[{
text:"返回编辑",
type:"primary",
click:function(){
this.remove();
}
}],
onHide:function(){
this.remove();
}
});
break;

case 202700:
var t="保存失败，红包封面数据异常";
if(d&&d.cover_uri_info_list&&d.cover_uri_info_list.list&&d.cover_uri_info_list.list.length>0){
for(var h=[],v=0,w=d.cover_uri_info_list.list.length;w>v;v++){
var x=d.cover_uri_info_list.list[v];
1*x.status>0&&h.push(x);
}
0===h.length?p.err(t):f.editor.fireEvent("showRedPackageCoverDialog",{
errorData:h
});
}else p.err(t);
break;

case 202701:
p.err("保存失败，每篇图文最多插入三款红包封面");
break;

case 202702:
p.err("请删除红包封面后再保存");
break;

case 202606:
p.err("请重新选择正确的价格"),wx.cgiData.price_option_list=d.price_option_list.map(function(e){
return{
label:"¥"+e/100,
value:1*e
};
});
break;

default:
var t=d&&d.myErrMsg?d.myErrMsg:"保存失败";
p.err(t);
}
})):(f._saving=!1,void e.btn(!0));
}
}),_=6;
}catch(g){
f._saving=!1,e.btn(!0),p.err("保存失败，请稍后再试"),_&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=editor_save_error;errmsg:%s,appid:%s,bizuin:%s".sprintf(28308,_,g.message,f.app_id||0,wx.data.uin)),
window.BJ_REPORT&&"function"==typeof window.BJ_REPORT.report&&g&&g.stack&&(g.stack="editor_save_error|"+g.stack,
window.BJ_REPORT.report(g)),g.stack&&console&&console.error&&console.error("[BJ-REPORT]",g.stack);
}
}
},
_remindReport:function(e,t,i){
var r=this;
v.post({
url:"/cgi-bin/appmsg?action=remind_report",
data:{
appmsgid:r.app_id,
operate_type:e,
remind_type:t,
hint_words:i
}
});
},
filtercharCode:function(e){
var t=!1;
for(var i in e)e.hasOwnProperty(i)&&"function"==typeof e[i].replace&&(e[i]=e[i].replace(/[\ud800-\uDFFF]/g,function(e,i,r){
return/[\ud800-\udbff]/.test(e)&&/[\uDC00-\uDFFF]/.test(r.charAt(i+1)||"")?e:/[\ud800-\udbff]/.test(r.charAt(i-1)||"")&&/[\uDC00-\uDFFF]/.test(e)?e:(t=!0,
"");
}));
return t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28308_11_1"),e;
},
preview:function(e,t){
var i=this;
i.save($("#js_preview"),function(r){
for(var a=i.getPostData(),n=i.getData(),o=0;8>o;o++)a["content"+o]&&(a["content"+o]=e.handlerContent(a["content"+o],!0),
a["content"+o]=a["content"+o].replace("/cgi-bin/readtemplate?t=tmpl/cpc_tmpl","/cgi-bin/readtemplate?t=tmpl/cpc_tmpl&preview=1")),
n&&n[o]&&(a["ad_info"+o]=n[o].ad_info);
i._preview({
data:a,
index:i.$current.index(),
allData:n,
editor:e
}),"function"==typeof t&&t(r);
},!0,e,i.$current.index());
},
_preview:function(e){
var t=this,i=t.getPostData();
new a({
AppMsgId:i.AppMsgId,
type:2,
hasConfirmed:t.hasConfirmed,
selectFun:t.select,
uin:wx.data.uin,
token:wx.data.t,
nickname:wx.data.nick_name,
pData:e
});
}
});
return I;
});define("tpl/media/appmsg_edit/article.html.js",[],function(){
return'<div id="read_only_container" class="page_msg mini" style="display:none;">\n    <div class="inner">\n        <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>\n        <div class="msg_content">\n            <p></p>\n            <span class="js_close msg_closed" style="display:none;">关闭</span>\n        </div>\n    </div>\n</div>\n<!--todo: BEGIN 视频尾贴顶部 tips-->\n<div class="page_msg mini advert_tips hide">\n    <div class="inner">\n        <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>\n        <div class="msg_content">\n            <p>视频尾部贴片广告已上线<a class="page_msg_link" href="javascript:;">立即开通</a></p>\n            <span class="js_close msg_closed ad_closed">关闭</span>\n        </div>\n    </div>\n</div>\n<!--todo: END 视频尾贴顶部 tips-->\n<div class="appmsg_editor">\n    <div class="appmsg_editor_inner">\n        <!-- BEGIN UEDITOR -->\n        <div id="js_ueditor" class="appmsg_edit_item content_edit">\n            <label for="" class="frm_label" style="display:none;">\n                <strong class="title">正文</strong>\n\n                <p class="tips l">\n                    <em id="js_auto_tips"></em>\n                    <a id="js_cancle" style="display:none;" href="javascript:void(0);"\n                       onclick="return false;">取消</a>\n                </p>\n            </label>\n<!--        <div class="frm_msg fail js_catch_tips" style="display:none;">有5张图片粘贴失败</div>\n            <div class="frm_msg fail js_content_error" style="display:none;">正文不能为空且长度不能超过20000字</div> -->\n            <div id="js_editor" class="edui_editor_wrp"></div>\n        </div>\n        <!-- END UEDITOR -->\n\n        <!-- BEGIN 原创文章预览 -->\n        <div id="reprint_article_main" style="display:none;" class="appmsg_edit_origin_preview">\n        </div>\n        <!-- END 原创文章预览 -->\n\n        <!-- BEGIN 广告预览 -->\n        <div class="appmsg_edit_ad_preview js_readonly" style="display: none;">\n            <div class="page_msg mini js_ad_error_tips" style="display: none;">\n                <div class="inner">\n                    <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>\n                    <div class="msg_content">\n                        <p class="js_ad_tips_wording">该广告为头条广告位，不能插入在非头条文章中。</p>\n                    </div>\n                </div>\n                <span class="msg_closed js_msg_close">关闭</span>\n            </div>\n            <div class="ad_preview_box js_ad_preview"></div>\n            <div class="mpda_preview_ft_tips">\n                <span class="radius_tag js_tag">广告推荐</span><span class="tips_global">文章编辑后需发送给广告主预览，操作请进入<a class="js_jumpToOrder" target="_blank" href="javascript:void(0);">广告订单页面</a></span>\n            </div>\n        </div>\n        <!-- END 广告预览 -->\n\n        <div id="article_setting_area" class="appsmg-editor__after-area" style="display: none;">\n            <div id=\'js_cover_description_area\' class="appmsg-editor__setting-group">\n                <div class="setting-group__title">封面和摘要</div>\n                <div class="setting-group__content setting-group__content_main">\n                    <!--\n                        主要图文+class: setting-group__cover_primary\n                        次要图文+class: setting-group__cover_minor\n                    -->\n                    <div id="js_cover_area" class="setting-group__cover setting-group__cover_primary">\n                        <div class="select-cover__btn js_cover_btn_area">\n                            <i class="icon-add_css"></i>\n                            <span class="btn-text">选择封面</span>\n                        </div>\n                        <div class="select-cover__preview js_cover_preview" style="display: none;"> <!-- 默认隐藏，选中图片后才显示 -->\n                            <div class="select-cover__preview__mask js_cover_btn_area">\n                                <a href="javascript:;" class="icon20_common edit_media_white js_modifyCover" onclick="return false;">修改</a>\n                            </div>\n                            <input type="hidden" class="js_field js_file_id" name="file_id">\n                            <input type="hidden" class="js_field js_cdn_url" name="cdn_url">\n                            <input type="hidden" class="js_field js_cdn_url_back" name="cdn_url_back">\n                            <input type="hidden" class="js_show_cover_pic js_field" data-type=\'checkbox\' name="show_cover_pic">\n                        </div>\n                        <div class="pop-opr__group js_cover_opr js_cover_btn_area">\n                            <ul class="pop-opr__list">\n                                <li class="pop-opr__item">\n                                    <a href="javascript:;" class="pop-opr__button" onclick="return false;" id="js_selectCoverFromContent">从正文选择</a>\n                                </li>\n                                <li class="pop-opr__item">\n                                    <a href="javascript:;" class="pop-opr__button" onclick="return false;" id="js_imagedialog">从图片库选择</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <div id="js_description_area" class="setting-group__abstract js_desc_area">\n                        <span class="frm_textarea_box">\n                            <textarea id="js_description" placeholder="选填，摘要会在订阅号消息、转发链接等文章外的场景显露，帮助读者快速了解内容，如不填写则默认抓取正文前54字" class="frm_textarea js_desc js_counter js_field" name="digest" max-length="120"></textarea>\n                            <em class="frm_input_append frm_counter">0/120</em>\n                        </span>\n                        <div class="frm_msg fail js_desc_error" style="display:none;"></div>\n                    </div>\n                </div>\n                <div class="frm_msg fail js_cover_error js_error_msg" style="display:none;">必须插入一张图片</div>\n            </div>\n\n            <!-- BEGIN 付费选择图文类型 -->\n            {if can_use_pay_subscribe}\n            <div class="appmsg-editor__setting-group" id="js_pay_setting_area" style="display: none;">\n              <div class="setting-group__title">图文类型</div>\n              <div class="setting-group__content">\n                <div class="setting-group__checkbox-item">\n                  <label class="frm_radio_label selected" for="checkbox2">\n                    <input data-label="普通图文" class="frm_radio js_pay_setting_radio" type="radio" value="0" checked="checked">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">普通图文</span>\n                  </label>\n                </div>\n                <div class="setting-group__checkbox-item">\n                  <label class="frm_radio_label" for="checkbox2">\n                    <input data-label="付费图文" class="frm_radio js_pay_setting_radio" type="radio" value="1"{if !can_use_copyright || is_pay_subscribe_block} disabled{/if}>\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">付费图文</span>\n                  </label>\n                  {if !can_use_copyright}\n                    <span class="lbl_content_desc js_pay_setting_disabled_tips">帐号原创功能被封禁期间不可设置付费图文</span>\n                  {else if is_pay_subscribe_block}\n                    <span class="lbl_content_desc js_pay_setting_disabled_tips">帐号付费功能被封禁期间不可设置付费图文</span>\n                  {/if}\n                  <span class="lbl_content_desc js_pay_setting_disabled_tips"></span>\n                </div>\n\n                <div class="origined__area pay__info" id="js_pay_setting_preview" style="display: none;">\n                  <div class="origined__main">\n                    <div class="lbl_content_desc simple_preview_item">以下配置仅在原创校验成功后生效</div>\n                    <ul class="simple_preview_list tips_global">\n                      <li class="simple_preview_item">\n                        <label class="simple_preview_label">原创状态</label>\n                        <div class="simple_preview_value">已声明原创</div>\n                      </li>\n                      <li class="simple_preview_item">\n                        <label class="simple_preview_label">作者</label>\n                        <div class="simple_preview_value js_author"></div>\n                      </li>\n                      <li class="simple_preview_item">\n                        <label class="simple_preview_label">付费金额</label>\n                        <div class="simple_preview_value js_amount"></div>\n                      </li>\n                      <li class="simple_preview_item">\n                        <label class="simple_preview_label">可试读比例</label>\n                        <div class="simple_preview_value js_preview_percent"></div>\n                      </li>\n                      <li class="simple_preview_item js_desc_wrap">\n                        <label class="simple_preview_label">前言</label>\n                        <div class="simple_preview_value simple_preview_value_prewrap js_desc"></div>\n                      </li>\n                    </ul>\n                  </div>\n                  <div class="pay__modify">\n                    <a href="javascript:;" id="js_edit_pay_setting">修改</a>\n                  </div>\n                </div>\n              </div>\n            </div>\n            {/if}\n            <!-- END 付费选择图文类型 -->\n\n            <div id="js_original" class="appmsg-editor__setting-group">\n                <!--BEGIN 未声明原创-->\n                {if can_use_copyright}\n                <div class="unorigin js_original_type">\n                    <div class="setting-group__title">原创：未声明</div>\n                    <div class="setting-group__content">\n                        <a href="javascript:;" onclick="return false;" class="btn btn_default btn_primary_border js_original_apply">声明原创</a>\n                    </div>\n                </div>\n                {else}\n                <div class="unorigin js_original_type">\n                    <!-- 原创邀请，可以下架了 @jaminqian -->\n                    <!-- {if has_invited_original}\n                        <div class="setting-group__title">\n                            {if orginal_apply_stat == 0}\n                                原创声明：未开通                            {else if orginal_apply_stat == 1}\n                                原创声明：审核中                            {else if orginal_apply_stat == 2}\n                                原创声明：申请失败                            {else if orginal_apply_stat == 3}\n                            {/if}\n                        </div>\n                        {if orginal_apply_stat == 0}\n                        <div class="setting-group__content">\n                            <div class="opt">\n                                <div class="description">\n                                    <p class="desc">原创声明是公众平台为维护原创作者权益推出的功能。</p>\n                                    <p class="desc">1. 开通后，你可以选择文章是否允许被转载；</p>\n                                    <p class="desc">2. 声明原创的文章被转载时，系统会自动注明文章出处。</p>\n                                </div>\n                            </div>\n                            <div class="opt">\n                                <a href="javascript:;" onclick="return false;" class="btn btn_default btn_primary_border" id="js_original_func_open">开通</a>\n                            </div>\n                        </div>\n                        {/if}\n                    {/if} -->\n                </div>\n                {/if}\n                <!--END 未声明原创-->\n\n                <!--BEGIN 已声明原创-->\n                <div class="origined js_original_type" id="js_original_open" style="display:none;">\n                    <div class="setting-group__title js_original_title">原创：已声明</div>\n                    <div class="setting-group__content js_original_content" style="display:none">\n                        <div class="origined__area">\n                            <div class="origined__main">\n                                <ul class="simple_preview_list tips_global">\n                                    <li class="simple_preview_item">\n                                        <label class="simple_preview_label" for="">作者</label>\n                                        <div class="simple_preview_value js_author"></div>\n                                    </li>\n                                    <li class="simple_preview_item" style="display: none;">\n                                        <label class="simple_preview_label" for="">文章类别</label>\n                                        <div class="simple_preview_value js_classify"></div>\n                                    </li>\n                                    <!-- 一般图文用到的 -->\n                                    {if can_use_original_reprint}\n                                    <li class="simple_preview_item js_original_item js_article">\n                                        <label class="simple_preview_label" for="">开放转载</label>\n\n                                        <div class="simple_preview_value js_can_reprint"></div>\n                                    </li>\n                                    <li class="simple_preview_item" style="display: none;">\n                                        <label class="simple_preview_label" for="">允许修改</label>\n                                        <div class="simple_preview_value js_can_modify"></div>\n                                    </li>\n                                    {/if}\n                                    {if can_use_reward}\n                                    <li class="simple_preview_item">\n                                        <label class="simple_preview_label" for="">赞赏</label>\n                                        <div class="simple_preview_value js_reward_tips">未开启</div>\n                                    </li>\n                                    {/if}\n                                    <li class="simple_preview_item js_original_item js_article">\n                                        <label class="simple_preview_label mini_tips icon_after" for="">白名单<i class="icon_msg_mini ask js_whitelist_tips"></i></label>\n                                        <div class="simple_preview_value">\n                                            <div class="original_user_list js_whitelist"></div>\n                                        </div>\n                                    </li>\n                                </ul>\n                            </div>\n                            <div class="origined__extra js_original_btn">\n                                <a href="javascript:;" class="">修改</a>\n                                <div class="pop-opr__group js_original_opr">\n                                    <ul class="pop-opr__list">\n                                        <li class="pop-opr__item">\n                                            <a href="javascript:;" class="pop-opr__button  js_original_apply" onclick="return false;">编辑声明</a>\n                                        </li>\n                                        <li class="pop-opr__item js_edit_whitelist">\n                                            <a href="javascript:;" class="pop-opr__button js_original_apply js_edit_whitelist_btn" onclick="return false;">编辑白名单</a>\n                                        </li>\n                                        <li class="pop-opr__item">\n                                            <a href="javascript:;" class="pop-opr__button js_original_cancel" onclick="return false;">撤销声明</a>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <!--END 已声明原创-->\n            </div>\n\n            <div id="article_setting_area2" class="appmsg-editor__setting-group">\n                <!--todo: 这里需要区分视频编辑页的话，这句wording是 ”视频设置“-->\n                <div class="setting-group__title" id="article_type_setting"></div>\n                <div class="setting-group__content">\n                    <!--todo: BEGIN 视频贴片设置-->\n                    <div class="setting-group__checkbox-item video_dot_area hide js_pay_hide_item" id="video_dot_area">\n                        <label class="frm_checkbox_label">\n                            <input type="checkbox" class="frm_checkbox video_dot_checkbox" name="" id="video_dot_checkbox">\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr">\n                                <span class="lbl_content">自定义贴片</span>\n                                <i class="lbl_content_after read-more__icon__more" onclick="return false;">icon</i>\n                                <span class="lbl_content_after lbl_content_desc video_dot_text"></span>\n                                <span class="lbl_content_after lbl_content_desc js_paster_setting_text"></span>\n                            </div>\n                        </label>\n                    </div>\n                    <!--END 视频贴片设置-->\n                    {if can_see_ad}\n                    <div id="js_insert_ad_area" class="setting-group__checkbox-item js_pay_hide_item">\n                        <!-- <p class="auto_insert_bottom_tips" style="display: none;">文中广告：已智能插入 <span class="auto_insert_ad_setting">修改</span></p> -->\n                        <label class="frm_checkbox_label" for="js_auto_insert_ad">\n                            <input type="checkbox" class="frm_checkbox js_auto_insert_ad" name="">\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr js_insert_ad_allow_click">\n                                <span class="lbl_content">文中广告智能插入</span>\n                                <i class="lbl_content_after read-more__icon__more" onclick="return false;">icon</i>\n                                <span class="lbl_content_after lbl_content_desc insert_ad_tips" style="display:none;">\n                                    已手动插入文中广告，无法开启自动插入功能                                </span>\n                                <span class="lbl_content_after lbl_content_desc auto_insert_count_tips" style="display:none;"></span>\n                            </div>\n                        </label>\n                    </div>\n                    {/if}\n                    <!-- 更多阅读start\n                    <div id="js_article_recommend_area" class="setting-group__checkbox-item">\n                        <label class="frm_checkbox_label" for="js_recommend">\n                            <input type="checkbox" class="frm_checkbox js_recommend js_field" checked>\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr js_article_recommend_allow_click">\n                                <span class="lbl_content">更多阅读</span>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc recommend_setting" style="display:none;">智能推荐</span>\n                            </div>\n                        </label>\n                    </div>\n                    更多阅读end-->\n                    <!-- BEGIN 原文链接 -->\n                    <div id="js_article_url_area" class="setting-group__checkbox-item js_url_area js_pay_hide_item">\n                        <label class="frm_checkbox_label" for="js_url_checkbox">\n                            <input type="checkbox" class="frm_checkbox js_url_checkbox js_field" name="source_url_checked">\n                            <i class="icon_checkbox js_url_checkbox_icon"></i>\n                            <div class="allow_click_opr js_article_url_allow_click">\n                                <span class="lbl_content">原文链接</span>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc lbl_content_desc_url article_url_setting" style="display:none;">https://mp.weixin.qq.com</span>\n                            </div>\n                        </label>\n                        <!-- <span class="frm_input_box" style="display:none;"><input type="text" class="js_url frm_input js_field" name="source_url"></span>\n                        <span class="js_url_ban_wording" style="position:relative; top:1em;"></span>\n                        <div class="profile_link_msg_global source_url frm_msg fail js_warn" style="display:none;">请勿添加其他公众号的主页链接</div>\n                        <div class="frm_msg fail js_url_error" style="display:none;">链接不合法</div> -->\n                    </div>\n                    <!-- END 原文链接 -->\n                    <!--todo: BEGIN 视频尾部贴片广告过渡-->\n                    <div id="ad_transition_area" class="setting-group__checkbox-item ad_transition_area hide js_pay_hide_item">\n                        <label class="frm_checkbox_label comment_checkbox" for="">\n                            <input type="checkbox" class="frm_checkbox js_ad_back" name="" id="js_ad_back">\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr ad_transition js_ad_allow_click">\n                                <span class="lbl_content">视频后贴广告过渡</span>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc ad_text ad_text_setting" ></span>\n                            </div>\n                        </label>\n\n                    </div>\n                    <!--END 视频尾部贴片广告过渡-->\n                    <!--BEGIN 留言 -->\n                    {if can_use_comment}\n                    <div id="js_comment_area" class="setting-group__checkbox-item">\n                        <label class="frm_checkbox_label comment_checkbox" for="">\n                            <input type="checkbox" class="frm_checkbox js_comment js_field" checked name="need_open_comment">\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr js_comment_allow_click">\n                                <span class="lbl_content">留言</span>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc comment_setting" style="display:none;">所有人均可留言</span>\n                            </div>\n                        </label>\n                        <!-- <div class="comment_radio_wrp" id="js_comment_setting_wrp" style="display:none;">\n                            <input data-label="所有人可留言" class="frm_radio js_comment_setting" type="radio" value="0">\n                            <input data-label="仅关注后可留言" class="frm_radio js_comment_setting" type="radio" value="1">\n                        </div> -->\n                    </div>\n                    {/if}\n                    <!-- END 留言-->\n\n                    <!-- BEGIN 更多视频 -->\n                    {if can_use_related_video}\n                    <div id="js_related_video_area" class="setting-group__checkbox-item related_video_area js_pay_hide_item" style="display: none;">\n                        <label class="frm_checkbox_label tags_checkbox" for="">\n                            <input type="checkbox" class="frm_checkbox js_related_video_checkbox js_field" name="need_open_tags">\n                            <i class="icon_checkbox js_related_video_checkbox_icon"></i>\n                            <div class="allow_click_opr js_related_video_allow_click">\n                                <div class="weui-desktop-popover__wrp related_video_target">\n                                    <span class="weui-desktop-popover__target">\n                                      <span class="lbl_content">观看更多</span>\n                                    </span>\n                                    <div class="weui-desktop-popover weui-desktop-popover_pos-down-left related_video_select js_related_video_select" style="">\n                                      <div class="weui-desktop-popover__inner">\n                                        <h4 class="weui-desktop-popover__title">观看更多</h4>\n                                        <div class="weui-desktop-popover__content">\n                                          <label class="frm_radio_label js_related_video_suggestion">\n                                            <i class="icon_radio js_related_video_radio_suggestion"></i>\n                                            <span class="lbl_content">智能推荐</span><span class="lbl_desc js_recommend_wording">根据观看数据和用户兴趣，推荐最多三条本公众号已群发视频</span>\n                                                <input type="radio" name="js_related_video_type" class="frm_radio">\n                                          </label>\n                                          <label class="frm_radio_label js_related_video_custom">\n                                            <i class="icon_radio js_related_video_radio_custom"></i>\n                                            <span class="lbl_content">指定视频</span><i class="lbl_desc lbl_content_after read-more__icon__more">icon</i>\n                                            <a class="related_video_modify js_relate_video_modify">修改</a>\n                                                <input type="radio" name="js_related_video_type" class="frm_radio">\n                                          </label>\n\n                                          <ul class="related_video_list js_related_list"></ul>\n                                        </div>\n                                      </div>\n                                    </div>\n                                  </div>\n\n                                <div class="weui-desktop-popover__wrp related_video_target relate_video_target_qa">\n                                  <span class="weui-desktop-popover__target js_more_video_qa">\n                                    <div class="weui-desktop-icon weui-desktop-icon__tips weui-desktop-icon__small weui-desktop-icon__normal"><svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M9 1.133c4.338 0 7.867 3.528 7.867 7.865 0 1.06-.208 2.088-.619 3.057a7.864 7.864 0 0 1-1.689 2.503 7.862 7.862 0 0 1-2.502 1.689A7.791 7.791 0 0 1 9 16.866a7.791 7.791 0 0 1-3.057-.619 7.862 7.862 0 0 1-2.502-1.69 7.864 7.864 0 0 1-1.69-2.502 7.794 7.794 0 0 1-.618-3.057c0-4.337 3.53-7.865 7.867-7.865zM9 0C4.038 0 0 4.036 0 8.998c0 4.961 4.038 9.001 9 9.001s9-4.04 9-9.001C18 4.036 13.962 0 9 0zm.601 13.966H8.276v-1.394H9.6v1.394zm2.166-6.264c-.142.296-.442.665-.902 1.106-.46.442-.765.757-.915.943-.15.187-.265.41-.342.67-.078.26-.112.608-.102 1.045H8.303c0-.51.041-.918.123-1.223.082-.305.205-.571.369-.8.164-.227.46-.562.888-1.003.428-.442.704-.763.827-.964.123-.2.184-.498.184-.895 0-.396-.141-.746-.423-1.052-.283-.305-.693-.457-1.23-.457-1.211 0-1.817.72-1.817 2.158H6.022c.018-.655.095-1.154.232-1.496.136-.341.355-.646.656-.915.3-.269.635-.467 1.004-.594a3.55 3.55 0 0 1 1.168-.192c.829 0 1.519.244 2.07.731.55.488.826 1.137.826 1.947 0 .365-.07.695-.211.99z"></path></svg></div>\n                                  </span>\n                                  <div class="weui-desktop-popover weui-desktop-popover_pos-down-center js_more_video_area">\n                                    <div class="weui-desktop-popover__inner">\n                                      <div class="weui-desktop-popover__desc">\n                                        {if can_use_video_recommend}\n                                        观看更多中的视频将会出现在当前上传的视频下方                                        {else}\n                                        观看更多中的视频将会出现在当前上传的视频下方。半年内群发视频消息达到10个可开启视频智能推荐功能                                        {/if}\n                                      </div>\n                                      <img class="related_video_img" src="https://mmbiz.qpic.cn/mmbiz_png/cVgP5bCElFiaJdYfdWzic2ibkKeYo9WLeT15ylXxyqxREWY9JNlwC7Fnc2N2y8lMdzATuVt2siaBazV7Ov1Om23gkw/0?wx_fmt=png" alt="">\n                                    </div>\n                                  </div>\n                                </div>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc js_related_video_desc" style="display:none;"></span>\n                            </div>\n                        </label>\n                    </div>\n                    {/if}\n                    <!-- END 更多视频 -->\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- 付费游标 -->\n<div id="js_pay_preview_popup" class="pay__preview-popup">\n  试读  <input type="number" class="js_preview_input" min="0" max="99" step="1" maxlength="2">%\n  <div class="pay__preview-action">\n    <button class="pay__preview-action-previous js_btn_up"></button>\n    <button class="pay__preview-action-next js_btn_down"></button>\n  </div>\n</div>\n\n<!-- 付费预览区域遮罩 -->\n<div id="js_pay_preview_popup_mask" class="pay__preview-mask"></div>';
});define("biz_web/lib/store.js",["biz_web/lib/json.js"],function(e,t,r){
function n(){
try{
return m in window&&window[m];
}catch(e){
return!1;
}
}
function i(e){
return function(){
var t=Array.prototype.slice.call(arguments,0);
t.unshift(a),l.appendChild(a),a.addBehavior("#default#userData"),a.load(m);
var r=e.apply(u,t);
return l.removeChild(a),r;
};
}
function o(e){
return e.replace(p,"___");
}
var a,c=e("biz_web/lib/json.js"),u={},s=window.document,m="localStorage",d="__storejs__";
if(u.disabled=!1,u.set=function(){},u.get=function(){},u.remove=function(){},u.clear=function(){},
u.transact=function(e,t,r){
var n=u.get(e);
null==r&&(r=t,t=null),"undefined"==typeof n&&(n=t||{}),r(n),u.set(e,n);
},u.getAll=function(){},u.serialize=function(e){
return c.stringify2(e);
},u.deserialize=function(e){
if("string"!=typeof e)return void 0;
try{
return c.parse(e);
}catch(t){
return e||void 0;
}
},n())a=window[m],u.set=function(e,t,r){
if(void 0===t)return u.remove(e);
(new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=69271_78_1&t="+Math.random();
try{
a.setItem(e,u.serialize(t));
}catch(n){
(new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=69271_79_1&t="+Math.random(),
n.message&&/exceeded/i.test(n.message)&&/quota/i.test(n.message)&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=69271_81_1&t="+Math.random()),
WX_BJ_REPORT&&WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.onError&&WX_BJ_REPORT.BadJs.onError(n,{
mid:"mmbizweb2:monitorLsQuotaExceeded"
}),a.clear();
try{
a.setItem(e,u.serialize(t));
}catch(i){
"function"==typeof r&&r(i);
}
}
return t;
},u.get=function(e,t){
try{
return u.deserialize(a.getItem(e));
}catch(r){
return void("function"==typeof t&&t(r));
}
},u.remove=function(e,t){
try{
a.removeItem(e);
}catch(r){
"function"==typeof t&&t(r);
}
},u.clear=function(e){
try{
a.clear();
}catch(t){
"function"==typeof e&&e(t);
}
},u.getAll=function(){
for(var e={},t=0;t<a.length;++t){
var r=a.key(t);
e[r]=u.get(r);
}
return e;
};else if(s.documentElement.addBehavior){
var l,f;
try{
f=new ActiveXObject("htmlfile"),f.open(),f.write('<script>document.w=window</script><iframe src="/favicon.ico"></iframe>'),
f.close(),l=f.w.frames[0].document,a=l.createElement("div");
}catch(v){
a=s.createElement("div"),l=s.body;
}
var p=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");
u.set=i(function(e,t,r){
return t=o(t),void 0===r?u.remove(t):(e.setAttribute(t,u.serialize(r)),e.save(m),
r);
}),u.get=i(function(e,t){
return t=o(t),u.deserialize(e.getAttribute(t));
}),u.remove=i(function(e,t){
t=o(t),e.removeAttribute(t),e.save(m);
}),u.clear=i(function(e){
var t=e.XMLDocument.documentElement.attributes;
e.load(m);
for(var r,n=0;r=t[n];n++)e.removeAttribute(r.name);
e.save(m);
}),u.getAll=i(function(e){
for(var t,r=e.XMLDocument.documentElement.attributes,n={},i=0;t=r[i];++i){
var a=o(t.name);
n[t.name]=u.deserialize(e.getAttribute(a));
}
return n;
});
}
try{
u.set(d,d),u.get(d)!=d&&(u.disabled=!0),u.remove(d);
}catch(v){
u.disabled=!0;
}
u.isLocalStorageNameSupported=n,u.enabled=!u.disabled,r.exports=u;
});define("common/wx/mpEditor/plugin/more.js",[],function(){
"use strict";
function t(){
this.editor=null,this.__g={
isFirstClick:!0
};
}
return t.prototype={
getName:function(){
return"more";
},
getExecCommand:function(){
var t=this;
return function(){
!t.editor;
};
},
getType:function(){
return 1;
},
getTitle:function(){
return"更多";
},
getMoreButtonHtml:function(t){
return'<div class="edui-default"><div class="edui-button-wrap edui-default"><div unselectable="on" data-tooltip="'+t+'" class="edui-button-body js_tooltip" onmousedown="return false;"><div class="edui-box edui-icon"></div></div></div></div>';
},
renderMoreToolbarList:function(t){
if(t.length){
var e=document.createElement("div");
e.className="edui-list-body js_toolbar_more_list edui-default",t.append(e);
}
},
initToolBar:function(t){
var e=this,i=t.getUi(),o=this.getTitle(),n=this.getName();
return i[n]=function(t){
return function(n){
var r=[],u=new i.Combox({
editor:n,
items:r,
title:o,
initValue:e.getMoreButtonHtml(o),
className:"js_toolbar_more edui-for-more toolbar_more",
onbuttonclick:function(){
this.showPopup();
var t=this.popup.getDom("content");
e.__g.isFirstClick&&(e.renderMoreToolbarList($(t)),e.__g.isFirstClick=!1);
}
});
return i.buttons[t]=u,n.addListener("selectionchange",function(){
var t=n.queryCommandState("more");
u.setDisabled(-1==t);
}),u;
};
}(n),!0;
}
},t;
});define("common/wx/mpEditor/plugin/templateList.js",["common/wx/media/templateListDialog.js"],function(t){
"use strict";
function n(t){
this.domid=t.container,this.container=$(t.container).show(),this._o={
token:""
},this._extend(t),this.editor=null;
}
var e=t("common/wx/media/templateListDialog.js");
return n.prototype={
_extend:function(t){
if(t)for(var n in t)this._o[n]=t[n];
},
getName:function(){
return"templatelist";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this,n=this._o;
return function(){
var o=t.editor;
if(o){
new e({
token:n.token,
editor:t.editor,
onSuccess:function(t){
t&&t.content&&o.insertTemplate(t.content);
}
});
}
};
},
getQueryCommandState:function(){
var t=this;
return function(){
var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],e=t.editor;
return e?n.allDomInRange&&n.allDomInRange[0]&&2===e.getDomUtils().isContentEditable({
node:n.allDomInRange[0],
checkParent:!1
})?-1:0:-1;
};
},
getType:function(){
return 0;
},
getTitle:function(){
return"插入图文模版";
},
getContainer:function(){
return this.domid;
}
},n;
});define("common/wx/mpEditor/pluginsList.js",["common/wx/mpEditor/plugin/vote.js","common/wx/mpEditor/plugin/card.js","common/wx/mpEditor/plugin/emotion.js","common/wx/mpEditor/plugin/link.js","common/wx/mpEditor/plugin/unlink.js","common/wx/mpEditor/plugin/audio_music.js","common/wx/mpEditor/plugin/weapp.js","common/wx/mpEditor/plugin/img.js","common/wx/mpEditor/plugin/adv.js","common/wx/mpEditor/plugin/video.js","common/wx/mpEditor/plugin/insert_product.js","common/wx/mpEditor/plugin/cps.js","common/wx/mpEditor/plugin/insertcode.js","common/wx/mpEditor/plugin/blockquote.js","common/wx/mpEditor/plugin/insertquestion.js","common/wx/mpEditor/plugin/redPacketCover.js","3rd/editor/common/no_editable.js"],function(e){
"use strict";
function n(){
return{
Vote:r,
Card:a,
Emotion:c,
MyLink:s,
Unlink:_,
AudioMusicPlugin:d,
WeappPlugin:u,
Img:m,
Ad:p,
Video:w,
InsertProduct:l,
InsertCps:g,
InsertCode:h,
Blockquote:j,
InsertQuestion:x,
RedPacketCover:v
};
}
function o(e){
var n=[];
return n.push(new m({
container:"#js_editor_insertimage",
redbit:1,
can_show_reddot:1&e.red_dot_flag
})),n.push(new w({
container:"#js_editor_insertvideo",
can_use_txvideo:e.can_use_txvideo,
show_share_dialog:e.show_share_dialog,
redbit:2,
can_show_reddot:2&e.red_dot_flag
})),n.push(new r({
container:e.can_use_vote?"#js_editor_insertvote":"",
can_use_vote:e.can_use_vote,
redbit:8,
can_show_reddot:8&e.red_dot_flag
})),n.push(new a({
container:e.can_use_card?"#js_editor_insertcard":"",
biz_uin:e.biz_uin,
can_use_card:e.can_use_card,
redbit:16,
can_show_reddot:16&e.red_dot_flag
})),n.push(new p({
container:e.can_see_ad?"#js_editor_insertad":"",
has_ad:e.has_ad,
can_see_ad:e.can_see_ad,
redbit:32,
can_show_reddot:32&e.red_dot_flag
})),n.push(new d({
container:e.can_use_voice||e.qqmusic_flag?"#audio_music_plugin_btn":"",
allowAudio:e.can_use_voice,
allowMusic:e.qqmusic_flag,
redbit:4,
can_show_reddot:4&e.red_dot_flag
})),n.push(new u({
container:e.can_use_weapp_card?"#js_editor_insertweapp":"",
can_use_weapp_card:e.can_use_weapp_card,
redbit:64,
can_show_reddot:64&e.red_dot_flag
})),n.push(new s({
container:"#js_editor_insertlink",
can_use_hyperlink:e.can_use_hyperlink,
can_use_appmsg_outer_url:e.can_use_appmsg_outer_url
})),n.push(new _),n.push(new c),n.push(new g({
container:"#editor_insertcpsmoviebook",
can_use_cps:e.can_use_cps,
tipStatus:e.cpsTipStatus,
redbit:256,
can_show_reddot:256&e.red_dot_flag
})),n.push(new j({})),n.push(new x({
container:"#js_editor_insertquestion",
can_use_qa:window.wx&&window.wx.commonData&&window.wx.commonData.acl?window.wx.commonData.acl.msg_acl.can_use_qa||0:0
})),n.push(new v({
container:"#editor_redpacketcover",
redbit:512,
can_show_reddot:512&e.red_dot_flag,
can_use_redpacketcover:e.can_use_redpacketcover
})),n;
}
function t(e){
return[new m({
container:e.hasContainer?"#js_editor_insertimage":""
}),new w({
container:e.hasContainer?"#js_editor_insertvideo":"",
can_use_txvideo:e.can_use_txvideo,
show_share_dialog:!1
}),new r({
container:e.can_use_vote&&e.hasContainer?"#js_editor_insertvote":"",
can_use_vote:e.can_use_vote
}),new a({
container:e.can_use_card&&e.hasContainer?"#js_editor_insertcard":"",
biz_uin:e.biz_uin,
can_use_card:e.can_use_card
}),new p({
can_see_ad:!1,
has_ad:0
}),new d({
container:(e.can_use_voice||e.qqmusic_flag)&&e.hasContainer?"#audio_music_plugin_btn":"",
allowAudio:e.can_use_voice,
allowMusic:e.qqmusic_flag
}),new u({
container:e.can_use_weapp_card&&e.hasContainer?"#js_editor_insertweapp":"",
can_use_weapp_card:e.can_use_weapp_card
}),new s({
container:"#js_editor_insertlink",
can_use_hyperlink:e.can_use_hyperlink,
can_use_appmsg_outer_url:e.can_use_appmsg_outer_url
}),new _,new c,new g({
clearProduct:!0
}),new j({}),new x({
container:e.hasContainer?"#js_editor_insertquestion":"",
can_use_qa:window.wx&&window.wx.commonData&&window.wx.commonData.acl?window.wx.commonData.acl.msg_acl.can_use_qa||0:0
}),new v({
container:"",
can_use_redpacketcover:!1,
remove:!0
})];
}
function i(e){
var o=n();
for(var t in o)if(o.hasOwnProperty(t))switch(name){
case"Video":
e.content=o[t].beforeSetContent({
isPreview:!1,
html:e.content,
width:e.appmsgTmplVideoWidth
});
break;

case"Ad":
e.content=o[t].beforeSetContent({
html:e.content,
can_see_ad:!1
});
break;

case"InsertProduct":
e.content=o[t].beforeSetContent({
html:e.content,
clearProduct:!0,
isPreview:!1
});
break;

case"InsertCps":
e.content=o[t].beforeSetContent({
html:e.content,
clearProduct:!0,
isPreview:!1
});
break;

default:
"function"==typeof o[t].beforeSetContent&&(e.content=o[t].beforeSetContent({
html:e.content
}));
}
var i=$("<div></div>").html(e.content);
return E.formatUneditablePluginHtml({
$container:i
}),e.content=i.html(),e.content;
}
var r=e("common/wx/mpEditor/plugin/vote.js"),a=e("common/wx/mpEditor/plugin/card.js"),c=e("common/wx/mpEditor/plugin/emotion.js"),s=e("common/wx/mpEditor/plugin/link.js"),_=e("common/wx/mpEditor/plugin/unlink.js"),d=e("common/wx/mpEditor/plugin/audio_music.js"),u=e("common/wx/mpEditor/plugin/weapp.js"),m=e("common/wx/mpEditor/plugin/img.js"),p=e("common/wx/mpEditor/plugin/adv.js"),w=e("common/wx/mpEditor/plugin/video.js"),l=e("common/wx/mpEditor/plugin/insert_product.js"),g=e("common/wx/mpEditor/plugin/cps.js"),h=e("common/wx/mpEditor/plugin/insertcode.js"),j=e("common/wx/mpEditor/plugin/blockquote.js"),x=e("common/wx/mpEditor/plugin/insertquestion.js"),v=e("common/wx/mpEditor/plugin/redPacketCover.js"),E=e("3rd/editor/common/no_editable.js");
return{
getList:n,
getEditorPluginsObject:o,
getTemplateEditorPluginsObject:t,
formatTemplateContent:i
};
});define("common/wx/mpEditor/common/cropImgCgi.js",["common/wx/Cgi.js"],function(r){
"use strict";
function o(r){
n.post({
url:"/cgi-bin/cropimage?",
data:{
imgurl:r.imgurl,
x1:r.x1,
y1:r.y1,
x2:r.x2,
y2:r.y2
}
},{
done:function(o){
o&&o.base_resp&&0==o.base_resp.ret&&o.imgurl?"function"==typeof r.onsuccess&&r.onsuccess({
oriUrl:r.imgurl,
url:o.imgurl,
file_id:o.file_id||""
}):"function"==typeof r.onerror&&r.onerror(o||{});
},
fail:function(){
"function"==typeof r.onerror&&r.onerror({
retcode:-2
});
}
});
}
function e(r){
for(var o={
imgurl:r.imgurl,
size_count:r.size.length
},e=0,i=r.size.length;i>e;e++){
var t=r.size[e];
o["size"+e+"_x1"]=t.x1,o["size"+e+"_y1"]=t.y1,o["size"+e+"_x2"]=t.x2,o["size"+e+"_y2"]=t.y2;
}
n.post({
url:"/cgi-bin/cropimage?action=crop_multi",
data:o
},{
done:function(o){
o&&o.base_resp&&0==o.base_resp.ret&&o.result&&o.result.length==r.size.length?"function"==typeof r.onsuccess&&r.onsuccess({
oriUrl:r.imgurl,
result:o.result
}):"function"==typeof r.onerror&&r.onerror(o||{});
},
fail:function(){
"function"==typeof r.onerror&&r.onerror({
retcode:-2
});
}
});
}
var n=r("common/wx/Cgi.js");
return{
getUrl:o,
getUrlMulti:e
};
});define("common/wx/ban.js",["tpl/ban/highlight_box.html.js","tpl/ban/page_msg.html.js","common/wx/dialog.js"],function(e,a,n){
"use strict";
var i=e("tpl/ban/highlight_box.html.js"),o=e("tpl/ban/page_msg.html.js"),t=e("common/wx/dialog.js"),r={
"mass-send":{
func_id:1,
name:"群发功能"
},
copyright:{
func_id:2,
name:"原创功能"
},
reward:{
func_id:3,
name:"赞赏功能"
},
seller:{
func_id:4,
name:"流量主功能"
},
comment:{
func_id:5,
name:"留言功能"
},
follow:{
func_id:6,
name:"被关注"
},
search:{
func_id:7,
name:"被搜索"
},
outlink:{
func_id:8,
name:"外链功能"
},
share:{
func_id:9,
name:"文章分享至朋友圈可见"
},
reply:{
func_id:10,
name:"自动回复功能",
highlight:"已禁用自动回复|你的帐号{=reason}，已被{forever}屏蔽自动回复功能{date}，期间用户将不会收到自动回复消息。",
hide:"all"
},
menu:{
func_id:11,
name:"自定义菜单功能",
highlight:"已禁用自定义菜单|你的帐号{=reason}，已被{forever}屏蔽自定义菜单功能{date}，期间自定义菜单将不可见。",
hide:"all"
},
"single-send":{
func_id:12,
name:"聊天功能",
pagemsg:"你的帐号{=reason}，已被{forever}屏蔽聊天功能{date}，期间将不可和粉丝互动聊天。"
},
preview:{
func_id:13,
name:"消息预览功能",
dialogmsg:"你的帐号{=reason}，已被{forever}屏蔽消息预览功能{date}，期间消息预览功能将不可用。"
},
"jssdk-share":{
func_id:14,
name:"JS-SDK分享接口"
},
template:{
func_id:15,
name:"模版消息接口"
},
"customer-service":{
func_id:16,
name:"客服接口"
},
"source-url":{
func_id:17,
name:"原文链接功能"
},
"outer-url":{
func_id:18,
name:"图文编辑外链功能"
},
"callback-message":{
func_id:20,
name:"开发者模式下消息管理功能"
},
"jump-home":{
func_id:21,
name:"跳转小主页"
},
"follow-home":{
func_id:22,
name:"关注小主页"
},
"online-temp-qrcode":{
func_id:25,
name:"（线上）临时二维码扫码关注"
},
"online-forever-qrcode":{
func_id:26,
name:"（线上）永久二维码扫码关注"
}
},p=[{
illegal_reason_id:3,
reason_id:1e4,
reason_name:"涉嫌违规",
reason_type:0,
reason_description:"涉嫌违规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:3
},{
illegal_reason_id:3,
reason_id:90004,
reason_name:"滥用原创声明",
reason_type:0,
reason_description:"涉嫌滥用原创声明功能",
reason_rule:"《微信公众平台运营规范》3.6条规定",
wap_url:"",
pc_url:"",
level:3
},{
illegal_reason_id:4,
reason_id:90005,
reason_name:"滥用赞赏",
reason_type:0,
reason_description:"涉嫌滥用赞赏功能",
reason_rule:"《微信公众平台运营规范》3.7条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_7",
level:3
},{
illegal_reason_id:10,
reason_id:10001,
reason_name:"垃圾广告",
reason_type:0,
reason_description:"涉嫌发布垃圾广告",
reason_rule:"《微信公众平台运营规范》4.8条规定-广告类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
level:2
},{
illegal_reason_id:11,
reason_id:20001,
reason_name:"政治敏感",
reason_type:0,
reason_description:"涉嫌违反相关法律法规和政策",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:3
},{
illegal_reason_id:12,
reason_id:20002,
reason_name:"色情",
reason_type:0,
reason_description:"涉及低俗、性暗示或色情信息",
reason_rule:"《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2",
level:1
},{
illegal_reason_id:13,
reason_id:20004,
reason_name:"社会事件",
reason_type:0,
reason_description:"涉嫌违反相关法律法规和政策",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:3
},{
illegal_reason_id:14,
reason_id:20006,
reason_name:"违法犯罪",
reason_type:0,
reason_description:"涉嫌违反相关法律法规和政策",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:15,
reason_id:20008,
reason_name:"欺诈",
reason_type:0,
reason_description:"涉嫌欺诈",
reason_rule:"《微信公众平台运营规范》4.8.1条规定-欺诈虚假广告类",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
level:1
},{
illegal_reason_id:16,
reason_id:20012,
reason_name:"低俗",
reason_type:0,
reason_description:"涉及低俗、性暗示或色情信息",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:2
},{
illegal_reason_id:18,
reason_id:20013,
reason_name:"冒名侵权",
reason_type:0,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:21,
reason_id:20106,
reason_name:"骚扰",
reason_type:0,
reason_description:"涉及骚扰信息",
reason_rule:"《微信公众平台运营规范》4.10条规定-搔扰类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=26&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_10",
level:3
},{
illegal_reason_id:22,
reason_id:21e3,
reason_name:"默认",
reason_type:0,
reason_description:"涉嫌违规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:3
},{
illegal_reason_id:23,
reason_id:90001,
reason_name:"侵犯隐私",
reason_type:0,
reason_description:"涉嫌侵犯他人隐私",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:3
},{
illegal_reason_id:35,
reason_id:20104,
reason_name:"造遥",
reason_type:0,
reason_description:"涉嫌造谣或传谣",
reason_rule:"《微信公众平台运营规范》4.9条规定-谣言类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=25&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_9",
level:2
},{
illegal_reason_id:36,
reason_id:20105,
reason_name:"诱导分享",
reason_type:0,
reason_description:"涉嫌诱导分享",
reason_rule:"《微信公众平台运营规范》3.3.1条规定-诱导分享",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
level:2
},{
illegal_reason_id:40,
reason_id:90002,
reason_name:"抄袭",
reason_type:0,
reason_description:"涉嫌抄袭他人内容",
reason_rule:"《微信公众平台运营规范》4.1.2条规定-内容侵权",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:3
},{
illegal_reason_id:41,
reason_id:90003,
reason_name:"诱导关注 ",
reason_type:0,
reason_description:"涉嫌诱导关注",
reason_rule:"《微信公众平台运营规范》3.3.2条规定-诱导关注",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
level:2
},{
illegal_reason_id:42,
reason_id:1,
reason_name:"默认",
reason_type:1,
reason_description:"其他",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:43,
reason_id:2,
reason_name:"政治敏感",
reason_type:1,
reason_description:"涉嫌违反相关法律法规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:44,
reason_id:3,
reason_name:"色情",
reason_type:1,
reason_description:"涉及低俗或色情信息",
reason_rule:"《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2",
level:1
},{
illegal_reason_id:45,
reason_id:4,
reason_name:"虚假认证",
reason_type:1,
reason_description:"涉嫌虚假认证",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:46,
reason_id:5,
reason_name:"侵权",
reason_type:1,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:47,
reason_id:4,
reason_name:"政治敏感",
reason_type:2,
reason_description:"涉嫌违反相关法律法规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:3
},{
illegal_reason_id:48,
reason_id:1,
reason_name:"色情",
reason_type:2,
reason_description:"涉嫌低俗或色情",
reason_rule:"《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2",
level:1
},{
illegal_reason_id:49,
reason_id:3,
reason_name:"欺诈",
reason_type:2,
reason_description:"涉嫌欺诈",
reason_rule:"《微信公众平台运营规范》4.8.1条规定-欺诈虚假广告类",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
level:1
},{
illegal_reason_id:50,
reason_id:5,
reason_name:"诱导分享",
reason_type:2,
reason_description:"涉嫌诱导分享",
reason_rule:"《微信公众平台运营规范》3.3.1条规定-诱导分享",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
level:2
},{
illegal_reason_id:51,
reason_id:19,
reason_name:"诱导关注",
reason_type:2,
reason_description:"涉嫌诱导关注",
reason_rule:"《微信公众平台运营规范》3.3.2条规定-诱导关注",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
level:2
},{
illegal_reason_id:52,
reason_id:7,
reason_name:"侵犯隐私",
reason_type:2,
reason_description:"涉嫌侵犯隐私",
reason_rule:"《微信公众平台运营规范》4.1.2条规定-内容侵权",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:3
},{
illegal_reason_id:53,
reason_id:6,
reason_name:"侵权",
reason_type:2,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:54,
reason_id:11,
reason_name:"外挂",
reason_type:2,
reason_description:"涉嫌使用外挂",
reason_rule:"《微信公众平台运营规范》3.1条规定－使用外挂行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_1",
level:1
},{
illegal_reason_id:55,
reason_id:8,
reason_name:"造遥",
reason_type:2,
reason_description:"涉嫌造谣或传谣",
reason_rule:"《微信公众平台运营规范》4.9条规定-谣言类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=25&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_9",
level:2
},{
illegal_reason_id:56,
reason_id:12,
reason_name:"骚扰",
reason_type:2,
reason_description:"涉嫌骚扰他人",
reason_rule:"《微信公众平台运营规范》4.10条规定-搔扰类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_10",
level:3
},{
illegal_reason_id:57,
reason_id:14,
reason_name:"刷粉",
reason_type:2,
reason_description:"涉嫌刷粉",
reason_rule:"《微信公众平台运营规范》3.2条规定－刷粉行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
level:3
},{
illegal_reason_id:58,
reason_id:13,
reason_name:"互推",
reason_type:2,
reason_description:"涉嫌互推",
reason_rule:"《微信公众平台运营规范》3.2条规定－刷粉行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
level:2
},{
illegal_reason_id:59,
reason_id:16,
reason_name:"抄袭",
reason_type:2,
reason_description:"涉嫌抄袭",
reason_rule:"《微信公众平台运营规范》4.1.2条规定-内容侵权",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:3
},{
illegal_reason_id:60,
reason_id:9,
reason_name:"垃圾广告",
reason_type:2,
reason_description:"涉嫌发送垃圾广告",
reason_rule:"《微信公众平台运营规范》4.8条规定-广告类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
level:2
},{
illegal_reason_id:61,
reason_id:10,
reason_name:"恶意注册",
reason_type:2,
reason_description:"涉嫌恶意注册",
reason_rule:"《微信公众平台运营规范》1条规定－ 注册规范",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot1",
level:1
},{
illegal_reason_id:62,
reason_id:17,
reason_name:"恶意投诉",
reason_type:2,
reason_description:"涉嫌恶意投诉",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:2
},{
illegal_reason_id:63,
reason_id:18,
reason_name:"违规分销",
reason_type:2,
reason_description:"涉嫌多级分销",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:64,
reason_id:90007,
reason_name:"违规声明原创",
reason_type:0,
reason_description:"涉嫌违规使用原创声明功能",
reason_rule:"微信公众平台运营规范》3.6条规定-滥用原创声明功能",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_6",
level:1
},{
illegal_reason_id:65,
reason_id:90011,
reason_name:"刷粉",
reason_type:0,
reason_description:"涉嫌刷粉",
reason_rule:"微信公众平台运营规范》3.2条规定－刷粉行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
level:1
},{
illegal_reason_id:66,
reason_id:90010,
reason_name:"侵犯名誉/商誉/隐私/肖像",
reason_type:0,
reason_description:"涉嫌侵犯名誉/商誉/隐私/肖像",
reason_rule:"《微信公众平台运营规范》4.1.2条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:69,
reason_id:90013,
reason_name:"滥用模版消息接口",
reason_type:0,
reason_description:"涉嫌滥用模版消息接口",
reason_rule:"《微信公众平台运营规范》3.9条规定-滥用模版消息接口行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=33&t=operation/faq_index&nettype=WIFI&fontScale=100&from=singlemessage&isappinstalled=0#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_9",
level:1
},{
illegal_reason_id:70,
reason_id:90012,
reason_name:"滥用客服消息",
reason_type:0,
reason_description:"涉嫌滥用客服消息",
reason_rule:"《微信公众平台运营规范》3.10条规定-滥用客服消息行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=34&t=operation/faq_index&nettype=WIFI&fontScale=100&from=singlemessage&isappinstalled=0#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_10",
level:1
},{
illegal_reason_id:71,
reason_id:90008,
reason_name:"互推",
reason_type:0,
reason_description:"涉嫌互推",
reason_rule:"《微信公众平台运营规范》3.2条规定－刷粉行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
level:2
},{
illegal_reason_id:72,
reason_id:90014,
reason_name:"广告恶意点击",
reason_type:0,
reason_description:"恶意点击公众号文章底部广告",
reason_rule:"《广告展示违规行为处理细则》-作弊行为",
wap_url:"http://mp.weixin.qq.com/promotion/readtemplate?t=faq/ad_host_faq_5_tmpl#5dot4",
pc_url:"http://mp.weixin.qq.com/promotion/readtemplate?t=faq/ad_host_faq_5_tmpl#5dot4",
level:1
},{
illegal_reason_id:73,
reason_id:20011,
reason_name:"暴力血腥",
reason_type:0,
reason_description:"涉嫌发布暴力信息",
reason_rule:"《微信公众平台运营规范》4.3条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=19&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?token=2010733288&t=business/faq_operation_tmpl&type=info#3dot4_3",
level:1
},{
illegal_reason_id:74,
reason_id:90016,
reason_name:"侵犯知识产权",
reason_type:0,
reason_description:"涉嫌侵犯他人版权/商标/专利等知识产权",
reason_rule:"《微信公众平台运营规范》4.1.2条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:75,
reason_id:90009,
reason_name:"其他侵权",
reason_type:0,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:76,
reason_id:90017,
reason_name:"恶意投诉",
reason_type:0,
reason_description:"涉嫌恶意投诉他人",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:77,
reason_id:25,
reason_name:"假货",
reason_type:2,
reason_description:"制作/售卖/传播假货",
reason_rule:"《微信公众平台运营规范》4.1条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:78,
reason_id:26,
reason_name:"网赚刷单",
reason_type:2,
reason_description:"诱导用户转发文章、下载app等",
reason_rule:"《微信公众平台运营规范》禁止诱导类行为的规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:85,
reason_id:90018,
reason_name:"阅读原文违规",
reason_type:0,
reason_description:"涉嫌阅读原文跳转至恶意链接",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:86,
reason_id:90019,
reason_name:"违反微信链接内容管理规范",
reason_type:0,
reason_description:"涉嫌违反微信链接内容管理规范",
reason_rule:"《微信外部链接内容管理规范》",
wap_url:"http://weixin.qq.com/cgi-bin/readtemplate?t=weixin_external_links_content_management_specification",
pc_url:"http://weixin.qq.com/cgi-bin/readtemplate?t=weixin_external_links_content_management_specification",
level:1
},{
illegal_reason_id:88,
reason_id:90020,
reason_name:"无证经营",
reason_type:0,
reason_description:"涉嫌无证经营",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:90,
reason_id:90021,
reason_name:"多级分销",
reason_type:0,
reason_description:"涉嫌多级分销经营行为",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:99,
reason_id:30001,
reason_name:"涉嫌恶意篡改广告",
reason_type:0,
reason_description:"涉嫌恶意篡改广告",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:100,
reason_id:30002,
reason_name:"涉嫌宣传销售假冒伪劣商品",
reason_type:0,
reason_description:"涉嫌宣传销售假冒伪劣商品",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:101,
reason_id:30003,
reason_name:"涉嫌宣传销售易对用户易产生损害用品",
reason_type:0,
reason_description:"涉嫌宣传销售易对用户易产生损害用品",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:102,
reason_id:30004,
reason_name:"涉嫌其他违规",
reason_type:0,
reason_description:"涉嫌其他违规",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:103,
reason_id:30005,
reason_name:"涉嫌未经授权使用或冒用第三方名义投放广告",
reason_type:0,
reason_description:"涉嫌未经授权使用或冒用第三方名义投放广告",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:104,
reason_id:30006,
reason_name:"涉嫌使用绝对化用语",
reason_type:0,
reason_description:"涉嫌使用绝对化用语",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:105,
reason_id:30007,
reason_name:"涉嫌贬低其他生产经营者的商品或服务",
reason_type:0,
reason_description:"涉嫌贬低其他生产经营者的商品或服务",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:106,
reason_id:30008,
reason_name:"涉嫌推广虚假广告",
reason_type:0,
reason_description:"涉嫌推广虚假广告",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:107,
reason_id:30009,
reason_name:"涉嫌虚假宣传官方合作",
reason_type:0,
reason_description:"涉嫌虚假宣传官方合作",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:108,
reason_id:30010,
reason_name:"涉嫌违反广告代言相关规则",
reason_type:0,
reason_description:"涉嫌违反广告代言相关规则",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:109,
reason_id:30011,
reason_name:"涉嫌其他违规",
reason_type:0,
reason_description:"涉嫌其他违规",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:110,
reason_id:30012,
reason_name:"涉嫌存在违规营销行为",
reason_type:0,
reason_description:"涉嫌存在违规营销行为",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:111,
reason_id:30013,
reason_name:"涉嫌推广不符合行业资质要求的产品或服务",
reason_type:0,
reason_description:"涉嫌推广不符合行业资质要求的产品或服务",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:112,
reason_id:30014,
reason_name:"涉嫌广告主公众号存在非腾讯许可的推广行为",
reason_type:0,
reason_description:"涉嫌广告主公众号存在非腾讯许可的推广行为",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:113,
reason_id:30015,
reason_name:"涉嫌恶意删除历史消息",
reason_type:0,
reason_description:"涉嫌恶意删除历史消息",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:114,
reason_id:30016,
reason_name:"涉嫌广告素材与文案不关联",
reason_type:0,
reason_description:"涉嫌广告素材与文案不关联",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:115,
reason_id:30017,
reason_name:"涉嫌推广微信广告不支持投放的产品或服务",
reason_type:0,
reason_description:"涉嫌推广微信广告不支持投放的产品或服务",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:116,
reason_id:30018,
reason_name:"涉嫌其他违规",
reason_type:0,
reason_description:"涉嫌其他违规",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:117,
reason_id:30019,
reason_name:"涉嫌虚假宣传",
reason_type:0,
reason_description:"涉嫌虚假宣传",
reason_rule:"《微信广告投放违规行为处理细则》",
wap_url:"http://ad.weixin.qq.com/learn/n59",
pc_url:"http://ad.weixin.qq.com/learn/n59",
level:0
},{
illegal_reason_id:118,
reason_id:36,
reason_name:"帐号迁移冻结",
reason_type:2,
reason_description:"已申请公众号帐号迁移流程，被冻结/回收",
reason_rule:"公众号帐号迁移说明",
wap_url:"https://kf.qq.com/touch/scene_faq.html?scene_id=kf3414",
pc_url:"https://kf.qq.com/touch/scene_faq.html?scene_id=kf3368",
level:0
}],_=function(e){
return e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate();
},l=function(e,a){
for(var n=$(".main_bd"),r=0,l=0;l<p.length;l++)p[l].reason_id==e.reason_id&&(r=l);
var s={};
if(s.reason='<a href="'+(p[r].pc_url?p[r].pc_url:p[0].pc_url)+'">'+p[r].reason_description+"</a>",
e.ban_time===e.unlock_time?(s.forever="永久",s.date=""):(s.forever="",s.date="至"+_(new Date(1e3*e.unlock_time))),
a.hide&&("all"===a.hide?n.children().hide():$(a.hide).hide()),a.highlight){
a.highlight=template.compile(a.highlight)(s);
var c={
title:a.highlight.split("|")[0],
desc:template.compile(a.highlight.split("|")[1])()
};
$(template.compile(i)(c)).prependTo(n);
}
if(a.pagemsg){
var d={
content:template.compile(a.pagemsg)(s)
};
0==n.find(".ban_page_msg").length&&$(template.compile(o)(d)).prependTo(n);
}
return a.dialogmsg&&t.show({
type:"warn",
title:"提示",
msg:"能力封禁提示|"+template.compile(a.dialogmsg)(s),
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove();
}
}]
}),!1;
},s=function(e,a,n){
var i=!0;
if(!r[a])return!0;
for(var o=0,t=e.length;t>o;o++)if(e[o].func_id==r[a].func_id){
var p=l(e[o],r[a]);
i=p&&i;
}
return!i&&n&&"function"==typeof n&&n(),i;
};
s.getReason=function(e){
if("default"==e)return p[0];
for(var a=0;a<p.length;a++)if(p[a].reason_id==e)return p[a];
return p[0];
},s.getTypeName=function(e){
for(var a in r)if(r[a].func_id==e)return r[a].name;
},n.exports=s;
});define("common/wx/popover.js",["tpl/popover.html.js"],function(o,t,e){
"use strict";
function i(o){
if(o=$.extend(!0,{},r,o),this.opt=o,this.$dom=$(o.dom),this.$dom.data("popover")){
var t=this.$dom.data("popover");
return p(o,t),t.$pop.show(),t.opt.defaultOpen?t.$pop.show():t.$pop.hide(),t;
}
return o.buttons&&o.buttons&&o.buttons.each(function(o){
o.type=o.type||"default";
}),"top"==o.place&&(o.arrowCls="pos_down_center"),this.$pop=$(o.noTpl?o.content:template.compile(s)(o)),
o.addCls&&this.$pop.addClass(o.addCls),$(o.container).append(this.$pop),n(this,o),
p(o,this),this.opt.defaultOpen?this.$pop.show():this.$pop.hide(),this.$dom.data("popover",this),
this.clickIn=!0,this;
}
function n(o,t){
function e(){
clearTimeout(n),o.show();
}
function i(){
n=setTimeout(function(){
o.hide();
},p);
}
if(t.buttons&&t.buttons.length>0&&o.$pop.find(".jsPopoverBt").each(function(e,i){
t.buttons[e]&&"function"==typeof t.buttons[e].click&&$(i).click(function(i){
t.buttons[e].click.call(o,i);
});
}),o.$pop.find(".jsPopoverClose").click(function(){
t.close===!0?o.hide():"function"==typeof t.close&&t.close.call(o);
}),t.hover&&(o.$dom.hover(function(){
o.hoverTime&&clearTimeout(o.hoverTime);
},function(){
o.hoverTime=o.hide.delay(1,o);
}),o.$pop.hover(function(){
o.hoverTime&&clearTimeout(o.hoverTime);
},function(){
o.hoverTime&&clearTimeout(o.hoverTime),o.hoverTime=o.hide.delay(1,o);
})),t.isToggle){
var n=null,p=300;
o.$dom.hover(e,i),o.$pop.hover(e,i);
}
t.hideIfBlur&&o._bindBlurEvent(t),o._onResize=function(o){
o.data.context.resetPosition();
},$(window).on("resize",{
context:o
},o._onResize);
}
function p(o,t){
if("body"!==o.container){
t.$dom.css({
position:"relative"
});
var e=-t.$pop.width();
switch(o.arrowPos){
case"left":
e*=.1;
break;

case"right":
e*=.9;
break;

case"center":
default:
e*=.5;
}
t.$pop.find(".js_arrow").css({
left:-e
}),"left"==o.margin?t.$pop.css({
top:18,
left:e,
marginBottom:40
}):"right"==o.margin?t.$pop.css({
top:0,
left:e+t.$dom.width(),
marginBottom:40
}):"left_top"==o.margin?t.$pop.css({
top:0,
left:e+t.$dom.width(),
marginBottom:40
}).addClass("pos_left_top"):t.$pop.css({
top:18,
left:e+t.$dom.width()/2,
marginBottom:40
});
}else{
var i=t.$dom.offset(),n=i.top+t.$dom.height();
"top"==o.place&&(n=i.top-t.$pop.height()-22),"left"==o.margin?t.$pop.css({
top:i.top+t.$dom.height(),
left:i.left-28
}).addClass("pos_left"):"right"==o.margin?t.$pop.css({
top:i.top+t.$dom.height(),
left:i.left+t.$dom.width()-t.$pop.width()+28
}).addClass("pos_right"):"left_top"==o.margin?t.$pop.css({
top:i.top-t.$dom.height()+6,
left:i.left+t.$dom.width()+18
}).addClass("pos_left_top"):t.$pop.css({
top:n,
left:i.left+t.$dom.outerWidth()/2-t.$pop.width()/2
}).addClass("pos_center");
}
}
var s=o("tpl/popover.html.js"),r={
dom:"",
container:"body",
content:"",
noTpl:!1,
margin:"center",
hideIfBlur:!1,
hover:!1,
addCls:"",
width:"",
isToggle:!1,
defaultOpen:!0,
onHide:!1,
onShow:!1,
onRemove:!1,
arrowCls:"",
arrowPos:"center"
};
i.prototype={
remove:function(){
this.$pop.remove(),this.$dom.removeData("popover"),this._onBlur&&$(document).off("click",this._onBlur),
$(window).off("resize",this._onResize),"function"==typeof this.opt.onRemove&&this.opt.onRemove.call(this);
},
hide:function(o){
this.$pop.hide(),"function"==typeof this.opt.onHide&&this.opt.onHide.call(this,o);
},
show:function(){
this.opt.hideIfBlur&&this._bindBlurEvent(this.opt),this.$pop.show(),"function"==typeof this.opt.onShow&&this.opt.onShow.call(this);
},
getDom:function(){
return this.$pop;
},
resetPosition:function(o){
return o&&(this.$dom=$(o)),p(this.opt,this);
},
_bindBlurEvent:function(o){
var t=this;
t._onDocumentBlur=function(e){
var i=e.data.context,n=e.target,p=i.$dom.get(0),s=i.$pop.get(0);
i.clickIn?i.clickIn=!1:($.contains(p,n)||p===n)&&!o.blurIfClickTargetDom||$.contains(s,n)||s===n||(e.data.context.hide(e),
$(document).off("click",t._onDocumentBlur));
},t._onWindowBlur=function(o){
var e=o.data.context;
e.hide(o),$(window).off("blur",t._onWindowBlur);
},$(document).on("click",{
context:t
},t._onDocumentBlur),$(window).on("blur",{
context:t
},t._onWindowBlur);
}
},e.exports=i;
});define("common/wx/preview.js",["common/wx/Tips.js","widget/img_preview.css","tpl/preview.html.js"],function(t,n,i){
"use strict";
var e=t("common/wx/Tips.js"),r=(t("widget/img_preview.css"),t("tpl/preview.html.js")),m=function(t){
this._initData(t),this._render(),this._initEvent();
};
m.prototype={
_moImgData:[],
_msTmplHtml:r,
_moCurrentImgIdx:0,
_initData:function(t){
return this._moImgData=t.imgdata||[],this._moCurrentImgIdx="undefined"==typeof t.current?0:"number"==typeof t.current?t.current:this._inArray(t.current,t.imgdata),
this._moImgData.length<1?void this._throwErr():((this._moCurrentImgIdx<0||this._moCurrentImgIdx>=this._moImgData.length)&&(this._moCurrentImgIdx=0),
void(this._moCfg={
view:this._moImgData.length>1?!0:!1,
imgsrc:this._moImgData[this._moCurrentImgIdx].imgsrc,
downsrc:this._moImgData[this._moCurrentImgIdx].downsrc,
prev:this._moCurrentImgIdx-1>-1?!0:!1,
next:this._moCurrentImgIdx+1<this._moImgData.length?!0:!1
}));
},
_render:function(){
$(template.compile(this._msTmplHtml)(this._moCfg)).appendTo("body");
},
_prev:function(){
this._moCurrentImgIdx>0&&($.extend(this._moCfg,{
imgsrc:this._moImgData[this._moCurrentImgIdx-1].imgsrc,
downsrc:this._moImgData[this._moCurrentImgIdx-1].downsrc,
prev:this._moCurrentImgIdx-1>0?!0:!1,
next:!0
}),this._changeImg(),this._moCurrentImgIdx--);
},
_next:function(){
this._moCurrentImgIdx+1<this._moImgData.length&&($.extend(this._moCfg,{
imgsrc:this._moImgData[this._moCurrentImgIdx+1].imgsrc,
downsrc:this._moImgData[this._moCurrentImgIdx+1].downsrc,
next:this._moCurrentImgIdx+2<this._moImgData.length?!0:!1,
prev:!0
}),this._moCurrentImgIdx++,this._changeImg());
},
_changeImg:function(){
var t=$("#img_opr_container");
this._moCfg.next?t.removeClass("next_disabled"):t.addClass("next_disabled"),this._moCfg.prev?t.removeClass("prev_disabled"):t.addClass("prev_disabled"),
$("#img_dom").hide(),$("#loading_dom").show(),$("#img_dom").find("img").attr("src",""),
$("#img_dom").find("img").attr("src",this._moCfg.imgsrc),$("#btndown").attr("href",this._moCfg.downsrc);
},
_destory:function(){
$(".preview_mask").remove(),$("#preview_container").remove();
},
_throwErr:function(){
alert("系统错误，请重试");
},
_initEvent:function(){
var t=this;
$("#preview_container").on("click",function(n){
var i=n.srcElement||n.target;
$.contains($("#img_container")[0],i)||$.contains($("#img_opr_container")[0],i)||t._destory();
}),$("#closebtn").on("click",function(){
return t._destory(),!1;
}),$("#btnview").on("click",function(){
return""!=t._moCfg.imgsrc?window.open(t._moCfg.imgsrc):e.err("图片资源加载失败。"),!1;
}),$("#btnnext").on("click",function(){
t._next();
}),$("#btnprev").on("click",function(){
t._prev();
}),$(document).keyup(function(n){
27==n.keyCode&&t._destory(),37==n.keyCode&&t._prev(),39==n.keyCode&&t._next();
}),$("#img_dom").find("img").on("load",function(){
$("#img_dom").show(),$("#loading_dom").hide();
});
},
_inArray:function(t,n){
for(var i,e=0;i=n[e];e++)if(t==i.imgsrc)return e;
return-1;
}
},i.exports={
close:function(){
m._destory();
},
show:function(t){
return new m(t);
}
};
});define("biz_common/moment.js",[],function(t,e,n){
function i(){
return xi.apply(null,arguments);
}
function r(t){
xi=t;
}
function s(t){
return"[object Array]"===Object.prototype.toString.call(t);
}
function a(t){
return t instanceof Date||"[object Date]"===Object.prototype.toString.call(t);
}
function o(t,e){
var n,i=[];
for(n=0;n<t.length;++n)i.push(e(t[n],n));
return i;
}
function u(t,e){
return Object.prototype.hasOwnProperty.call(t,e);
}
function d(t,e){
for(var n in e)u(e,n)&&(t[n]=e[n]);
return u(e,"toString")&&(t.toString=e.toString),u(e,"valueOf")&&(t.valueOf=e.valueOf),
t;
}
function l(t,e,n,i){
return Ce(t,e,n,i,!0).utc();
}
function c(){
return{
empty:!1,
unusedTokens:[],
unusedInput:[],
overflow:-2,
charsLeftOver:0,
nullInput:!1,
invalidMonth:null,
invalidFormat:!1,
userInvalidated:!1,
iso:!1
};
}
function h(t){
return null==t._pf&&(t._pf=c()),t._pf;
}
function f(t){
if(null==t._isValid){
var e=h(t);
t._isValid=!(isNaN(t._d.getTime())||!(e.overflow<0)||e.empty||e.invalidMonth||e.invalidWeekday||e.nullInput||e.invalidFormat||e.userInvalidated),
t._strict&&(t._isValid=t._isValid&&0===e.charsLeftOver&&0===e.unusedTokens.length&&void 0===e.bigHour);
}
return t._isValid;
}
function m(t){
var e=l(0/0);
return null!=t?d(h(e),t):h(e).userInvalidated=!0,e;
}
function _(t,e){
var n,i,r;
if("undefined"!=typeof e._isAMomentObject&&(t._isAMomentObject=e._isAMomentObject),
"undefined"!=typeof e._i&&(t._i=e._i),"undefined"!=typeof e._f&&(t._f=e._f),"undefined"!=typeof e._l&&(t._l=e._l),
"undefined"!=typeof e._strict&&(t._strict=e._strict),"undefined"!=typeof e._tzm&&(t._tzm=e._tzm),
"undefined"!=typeof e._isUTC&&(t._isUTC=e._isUTC),"undefined"!=typeof e._offset&&(t._offset=e._offset),
"undefined"!=typeof e._pf&&(t._pf=h(e)),"undefined"!=typeof e._locale&&(t._locale=e._locale),
Ai.length>0)for(n in Ai)i=Ai[n],r=e[i],"undefined"!=typeof r&&(t[i]=r);
return t;
}
function y(t){
_(this,t),this._d=new Date(null!=t._d?t._d.getTime():0/0),zi===!1&&(zi=!0,i.updateOffset(this),
zi=!1);
}
function p(t){
return t instanceof y||null!=t&&null!=t._isAMomentObject;
}
function g(t){
return 0>t?Math.ceil(t):Math.floor(t);
}
function D(t){
var e=+t,n=0;
return 0!==e&&isFinite(e)&&(n=g(e)),n;
}
function v(t,e,n){
var i,r=Math.min(t.length,e.length),s=Math.abs(t.length-e.length),a=0;
for(i=0;r>i;i++)(n&&t[i]!==e[i]||!n&&D(t[i])!==D(e[i]))&&a++;
return a+s;
}
function M(){}
function Y(t){
return t?t.toLowerCase().replace("_","-"):t;
}
function w(t){
for(var e,n,i,r,s=0;s<t.length;){
for(r=Y(t[s]).split("-"),e=r.length,n=Y(t[s+1]),n=n?n.split("-"):null;e>0;){
if(i=S(r.slice(0,e).join("-")))return i;
if(n&&n.length>=e&&v(r,n,!0)>=e-1)break;
e--;
}
s++;
}
return null;
}
function S(e){
var i=null;
if(!Zi[e]&&"undefined"!=typeof n&&n&&n.exports)try{
i=Ii._abbr,t("./locale/"+e),k(i);
}catch(r){}
return Zi[e];
}
function k(t,e){
var n;
return t&&(n="undefined"==typeof e?b(t):T(t,e),n&&(Ii=n)),Ii._abbr;
}
function T(t,e){
return null!==e?(e.abbr=t,Zi[t]=Zi[t]||new M,Zi[t].set(e),k(t),Zi[t]):(delete Zi[t],
null);
}
function b(t){
var e;
if(t&&t._locale&&t._locale._abbr&&(t=t._locale._abbr),!t)return Ii;
if(!s(t)){
if(e=S(t))return e;
t=[t];
}
return w(t);
}
function O(t,e){
var n=t.toLowerCase();
ji[n]=ji[n+"s"]=ji[e]=t;
}
function U(t){
return"string"==typeof t?ji[t]||ji[t.toLowerCase()]:void 0;
}
function W(t){
var e,n,i={};
for(n in t)u(t,n)&&(e=U(n),e&&(i[e]=t[n]));
return i;
}
function C(t,e){
return function(n){
return null!=n?(F(this,t,n),i.updateOffset(this,e),this):G(this,t);
};
}
function G(t,e){
return t._d["get"+(t._isUTC?"UTC":"")+e]();
}
function F(t,e,n){
return t._d["set"+(t._isUTC?"UTC":"")+e](n);
}
function P(t,e){
var n;
if("object"==typeof t)for(n in t)this.set(n,t[n]);else if(t=U(t),"function"==typeof this[t])return this[t](e);
return this;
}
function H(t,e,n){
var i=""+Math.abs(t),r=e-i.length,s=t>=0;
return(s?n?"+":"":"-")+Math.pow(10,Math.max(0,r)).toString().substr(1)+i;
}
function L(t,e,n,i){
var r=i;
"string"==typeof i&&(r=function(){
return this[i]();
}),t&&(qi[t]=r),e&&(qi[e[0]]=function(){
return H(r.apply(this,arguments),e[1],e[2]);
}),n&&(qi[n]=function(){
return this.localeData().ordinal(r.apply(this,arguments),t);
});
}
function x(t){
return t.match(/\[[\s\S]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"");
}
function I(t){
var e,n,i=t.match(Ei);
for(e=0,n=i.length;n>e;e++)i[e]=qi[i[e]]?qi[i[e]]:x(i[e]);
return function(r){
var s="";
for(e=0;n>e;e++)s+=i[e]instanceof Function?i[e].call(r,t):i[e];
return s;
};
}
function A(t,e){
return t.isValid()?(e=z(e,t.localeData()),Vi[e]=Vi[e]||I(e),Vi[e](t)):t.localeData().invalidDate();
}
function z(t,e){
function n(t){
return e.longDateFormat(t)||t;
}
var i=5;
for(Ni.lastIndex=0;i>=0&&Ni.test(t);)t=t.replace(Ni,n),Ni.lastIndex=0,i-=1;
return t;
}
function Z(t){
return"function"==typeof t&&"[object Function]"===Object.prototype.toString.call(t);
}
function j(t,e,n){
or[t]=Z(e)?e:function(t){
return t&&n?n:e;
};
}
function E(t,e){
return u(or,t)?or[t](e._strict,e._locale):new RegExp(N(t));
}
function N(t){
return t.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(t,e,n,i,r){
return e||n||i||r;
}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");
}
function V(t,e){
var n,i=e;
for("string"==typeof t&&(t=[t]),"number"==typeof e&&(i=function(t,n){
n[e]=D(t);
}),n=0;n<t.length;n++)ur[t[n]]=i;
}
function q(t,e){
V(t,function(t,n,i,r){
i._w=i._w||{},e(t,i._w,i,r);
});
}
function J(t,e,n){
null!=e&&u(ur,t)&&ur[t](e,n._a,n,t);
}
function $(t,e){
return new Date(Date.UTC(t,e+1,0)).getUTCDate();
}
function R(t){
return this._months[t.month()];
}
function B(t){
return this._monthsShort[t.month()];
}
function Q(t,e,n){
var i,r,s;
for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),
i=0;12>i;i++){
if(r=l([2e3,i]),n&&!this._longMonthsParse[i]&&(this._longMonthsParse[i]=new RegExp("^"+this.months(r,"").replace(".","")+"$","i"),
this._shortMonthsParse[i]=new RegExp("^"+this.monthsShort(r,"").replace(".","")+"$","i")),
n||this._monthsParse[i]||(s="^"+this.months(r,"")+"|^"+this.monthsShort(r,""),this._monthsParse[i]=new RegExp(s.replace(".",""),"i")),
n&&"MMMM"===e&&this._longMonthsParse[i].test(t))return i;
if(n&&"MMM"===e&&this._shortMonthsParse[i].test(t))return i;
if(!n&&this._monthsParse[i].test(t))return i;
}
}
function X(t,e){
var n;
return"string"==typeof e&&(e=t.localeData().monthsParse(e),"number"!=typeof e)?t:(n=Math.min(t.date(),$(t.year(),e)),
t._d["set"+(t._isUTC?"UTC":"")+"Month"](e,n),t);
}
function K(t){
return null!=t?(X(this,t),i.updateOffset(this,!0),this):G(this,"Month");
}
function te(){
return $(this.year(),this.month());
}
function ee(t){
var e,n=t._a;
return n&&-2===h(t).overflow&&(e=n[lr]<0||n[lr]>11?lr:n[cr]<1||n[cr]>$(n[dr],n[lr])?cr:n[hr]<0||n[hr]>24||24===n[hr]&&(0!==n[fr]||0!==n[mr]||0!==n[_r])?hr:n[fr]<0||n[fr]>59?fr:n[mr]<0||n[mr]>59?mr:n[_r]<0||n[_r]>999?_r:-1,
h(t)._overflowDayOfYear&&(dr>e||e>cr)&&(e=cr),h(t).overflow=e),t;
}
function ne(t){
i.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+t);
}
function ie(t,e){
var n=!0;
return d(function(){
return n&&(ne(t+"\n"+(new Error).stack),n=!1),e.apply(this,arguments);
},e);
}
function re(t,e){
gr[t]||(ne(e),gr[t]=!0);
}
function se(t){
var e,n,i=t._i,r=Dr.exec(i);
if(r){
for(h(t).iso=!0,e=0,n=vr.length;n>e;e++)if(vr[e][1].exec(i)){
t._f=vr[e][0];
break;
}
for(e=0,n=Mr.length;n>e;e++)if(Mr[e][1].exec(i)){
t._f+=(r[6]||" ")+Mr[e][0];
break;
}
i.match(rr)&&(t._f+="Z"),Se(t);
}else t._isValid=!1;
}
function ae(t){
var e=Yr.exec(t._i);
return null!==e?void(t._d=new Date(+e[1])):(se(t),void(t._isValid===!1&&(delete t._isValid,
i.createFromInputFallback(t))));
}
function oe(t,e,n,i,r,s,a){
var o=new Date(t,e,n,i,r,s,a);
return 1970>t&&o.setFullYear(t),o;
}
function ue(t){
var e=new Date(Date.UTC.apply(null,arguments));
return 1970>t&&e.setUTCFullYear(t),e;
}
function de(t){
return le(t)?366:365;
}
function le(t){
return t%4===0&&t%100!==0||t%400===0;
}
function ce(){
return le(this.year());
}
function he(t,e,n){
var i,r=n-e,s=n-t.day();
return s>r&&(s-=7),r-7>s&&(s+=7),i=Ge(t).add(s,"d"),{
week:Math.ceil(i.dayOfYear()/7),
year:i.year()
};
}
function fe(t){
return he(t,this._week.dow,this._week.doy).week;
}
function me(){
return this._week.dow;
}
function _e(){
return this._week.doy;
}
function ye(t){
var e=this.localeData().week(this);
return null==t?e:this.add(7*(t-e),"d");
}
function pe(t){
var e=he(this,1,4).week;
return null==t?e:this.add(7*(t-e),"d");
}
function ge(t,e,n,i,r){
var s,a=6+r-i,o=ue(t,0,1+a),u=o.getUTCDay();
return r>u&&(u+=7),n=null!=n?1*n:r,s=1+a+7*(e-1)-u+n,{
year:s>0?t:t-1,
dayOfYear:s>0?s:de(t-1)+s
};
}
function De(t){
var e=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;
return null==t?e:this.add(t-e,"d");
}
function ve(t,e,n){
return null!=t?t:null!=e?e:n;
}
function Me(t){
var e=new Date;
return t._useUTC?[e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()]:[e.getFullYear(),e.getMonth(),e.getDate()];
}
function Ye(t){
var e,n,i,r,s=[];
if(!t._d){
for(i=Me(t),t._w&&null==t._a[cr]&&null==t._a[lr]&&we(t),t._dayOfYear&&(r=ve(t._a[dr],i[dr]),
t._dayOfYear>de(r)&&(h(t)._overflowDayOfYear=!0),n=ue(r,0,t._dayOfYear),t._a[lr]=n.getUTCMonth(),
t._a[cr]=n.getUTCDate()),e=0;3>e&&null==t._a[e];++e)t._a[e]=s[e]=i[e];
for(;7>e;e++)t._a[e]=s[e]=null==t._a[e]?2===e?1:0:t._a[e];
24===t._a[hr]&&0===t._a[fr]&&0===t._a[mr]&&0===t._a[_r]&&(t._nextDay=!0,t._a[hr]=0),
t._d=(t._useUTC?ue:oe).apply(null,s),null!=t._tzm&&t._d.setUTCMinutes(t._d.getUTCMinutes()-t._tzm),
t._nextDay&&(t._a[hr]=24);
}
}
function we(t){
var e,n,i,r,s,a,o;
e=t._w,null!=e.GG||null!=e.W||null!=e.E?(s=1,a=4,n=ve(e.GG,t._a[dr],he(Ge(),1,4).year),
i=ve(e.W,1),r=ve(e.E,1)):(s=t._locale._week.dow,a=t._locale._week.doy,n=ve(e.gg,t._a[dr],he(Ge(),s,a).year),
i=ve(e.w,1),null!=e.d?(r=e.d,s>r&&++i):r=null!=e.e?e.e+s:s),o=ge(n,i,r,a,s),t._a[dr]=o.year,
t._dayOfYear=o.dayOfYear;
}
function Se(t){
if(t._f===i.ISO_8601)return void se(t);
t._a=[],h(t).empty=!0;
var e,n,r,s,a,o=""+t._i,u=o.length,d=0;
for(r=z(t._f,t._locale).match(Ei)||[],e=0;e<r.length;e++)s=r[e],n=(o.match(E(s,t))||[])[0],
n&&(a=o.substr(0,o.indexOf(n)),a.length>0&&h(t).unusedInput.push(a),o=o.slice(o.indexOf(n)+n.length),
d+=n.length),qi[s]?(n?h(t).empty=!1:h(t).unusedTokens.push(s),J(s,n,t)):t._strict&&!n&&h(t).unusedTokens.push(s);
h(t).charsLeftOver=u-d,o.length>0&&h(t).unusedInput.push(o),h(t).bigHour===!0&&t._a[hr]<=12&&t._a[hr]>0&&(h(t).bigHour=void 0),
t._a[hr]=ke(t._locale,t._a[hr],t._meridiem),Ye(t),ee(t);
}
function ke(t,e,n){
var i;
return null==n?e:null!=t.meridiemHour?t.meridiemHour(e,n):null!=t.isPM?(i=t.isPM(n),
i&&12>e&&(e+=12),i||12!==e||(e=0),e):e;
}
function Te(t){
var e,n,i,r,s;
if(0===t._f.length)return h(t).invalidFormat=!0,void(t._d=new Date(0/0));
for(r=0;r<t._f.length;r++)s=0,e=_({},t),null!=t._useUTC&&(e._useUTC=t._useUTC),e._f=t._f[r],
Se(e),f(e)&&(s+=h(e).charsLeftOver,s+=10*h(e).unusedTokens.length,h(e).score=s,(null==i||i>s)&&(i=s,
n=e));
d(t,n||e);
}
function be(t){
if(!t._d){
var e=W(t._i);
t._a=[e.year,e.month,e.day||e.date,e.hour,e.minute,e.second,e.millisecond],Ye(t);
}
}
function Oe(t){
var e=new y(ee(Ue(t)));
return e._nextDay&&(e.add(1,"d"),e._nextDay=void 0),e;
}
function Ue(t){
var e=t._i,n=t._f;
return t._locale=t._locale||b(t._l),null===e||void 0===n&&""===e?m({
nullInput:!0
}):("string"==typeof e&&(t._i=e=t._locale.preparse(e)),p(e)?new y(ee(e)):(s(n)?Te(t):n?Se(t):a(e)?t._d=e:We(t),
t));
}
function We(t){
var e=t._i;
void 0===e?t._d=new Date:a(e)?t._d=new Date(+e):"string"==typeof e?ae(t):s(e)?(t._a=o(e.slice(0),function(t){
return parseInt(t,10);
}),Ye(t)):"object"==typeof e?be(t):"number"==typeof e?t._d=new Date(e):i.createFromInputFallback(t);
}
function Ce(t,e,n,i,r){
var s={};
return"boolean"==typeof n&&(i=n,n=void 0),s._isAMomentObject=!0,s._useUTC=s._isUTC=r,
s._l=n,s._i=t,s._f=e,s._strict=i,Oe(s);
}
function Ge(t,e,n,i){
return Ce(t,e,n,i,!1);
}
function Fe(t,e){
var n,i;
if(1===e.length&&s(e[0])&&(e=e[0]),!e.length)return Ge();
for(n=e[0],i=1;i<e.length;++i)(!e[i].isValid()||e[i][t](n))&&(n=e[i]);
return n;
}
function Pe(){
var t=[].slice.call(arguments,0);
return Fe("isBefore",t);
}
function He(){
var t=[].slice.call(arguments,0);
return Fe("isAfter",t);
}
function Le(t){
var e=W(t),n=e.year||0,i=e.quarter||0,r=e.month||0,s=e.week||0,a=e.day||0,o=e.hour||0,u=e.minute||0,d=e.second||0,l=e.millisecond||0;
this._milliseconds=+l+1e3*d+6e4*u+36e5*o,this._days=+a+7*s,this._months=+r+3*i+12*n,
this._data={},this._locale=b(),this._bubble();
}
function xe(t){
return t instanceof Le;
}
function Ie(t,e){
L(t,0,0,function(){
var t=this.utcOffset(),n="+";
return 0>t&&(t=-t,n="-"),n+H(~~(t/60),2)+e+H(~~t%60,2);
});
}
function Ae(t){
var e=(t||"").match(rr)||[],n=e[e.length-1]||[],i=(n+"").match(br)||["-",0,0],r=+(60*i[1])+D(i[2]);
return"+"===i[0]?r:-r;
}
function ze(t,e){
var n,r;
return e._isUTC?(n=e.clone(),r=(p(t)||a(t)?+t:+Ge(t))-+n,n._d.setTime(+n._d+r),i.updateOffset(n,!1),
n):Ge(t).local();
}
function Ze(t){
return 15*-Math.round(t._d.getTimezoneOffset()/15);
}
function je(t,e){
var n,r=this._offset||0;
return null!=t?("string"==typeof t&&(t=Ae(t)),Math.abs(t)<16&&(t=60*t),!this._isUTC&&e&&(n=Ze(this)),
this._offset=t,this._isUTC=!0,null!=n&&this.add(n,"m"),r!==t&&(!e||this._changeInProgress?sn(this,Ke(t-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,
i.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?r:Ze(this);
}
function Ee(t,e){
return null!=t?("string"!=typeof t&&(t=-t),this.utcOffset(t,e),this):-this.utcOffset();
}
function Ne(t){
return this.utcOffset(0,t);
}
function Ve(t){
return this._isUTC&&(this.utcOffset(0,t),this._isUTC=!1,t&&this.subtract(Ze(this),"m")),
this;
}
function qe(){
return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ae(this._i)),
this;
}
function Je(t){
return t=t?Ge(t).utcOffset():0,(this.utcOffset()-t)%60===0;
}
function $e(){
return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset();
}
function Re(){
if("undefined"!=typeof this._isDSTShifted)return this._isDSTShifted;
var t={};
if(_(t,this),t=Ue(t),t._a){
var e=t._isUTC?l(t._a):Ge(t._a);
this._isDSTShifted=this.isValid()&&v(t._a,e.toArray())>0;
}else this._isDSTShifted=!1;
return this._isDSTShifted;
}
function Be(){
return!this._isUTC;
}
function Qe(){
return this._isUTC;
}
function Xe(){
return this._isUTC&&0===this._offset;
}
function Ke(t,e){
var n,i,r,s=t,a=null;
return xe(t)?s={
ms:t._milliseconds,
d:t._days,
M:t._months
}:"number"==typeof t?(s={},e?s[e]=t:s.milliseconds=t):(a=Or.exec(t))?(n="-"===a[1]?-1:1,
s={
y:0,
d:D(a[cr])*n,
h:D(a[hr])*n,
m:D(a[fr])*n,
s:D(a[mr])*n,
ms:D(a[_r])*n
}):(a=Ur.exec(t))?(n="-"===a[1]?-1:1,s={
y:tn(a[2],n),
M:tn(a[3],n),
d:tn(a[4],n),
h:tn(a[5],n),
m:tn(a[6],n),
s:tn(a[7],n),
w:tn(a[8],n)
}):null==s?s={}:"object"==typeof s&&("from"in s||"to"in s)&&(r=nn(Ge(s.from),Ge(s.to)),
s={},s.ms=r.milliseconds,s.M=r.months),i=new Le(s),xe(t)&&u(t,"_locale")&&(i._locale=t._locale),
i;
}
function tn(t,e){
var n=t&&parseFloat(t.replace(",","."));
return(isNaN(n)?0:n)*e;
}
function en(t,e){
var n={
milliseconds:0,
months:0
};
return n.months=e.month()-t.month()+12*(e.year()-t.year()),t.clone().add(n.months,"M").isAfter(e)&&--n.months,
n.milliseconds=+e-+t.clone().add(n.months,"M"),n;
}
function nn(t,e){
var n;
return e=ze(e,t),t.isBefore(e)?n=en(t,e):(n=en(e,t),n.milliseconds=-n.milliseconds,
n.months=-n.months),n;
}
function rn(t,e){
return function(n,i){
var r,s;
return null===i||isNaN(+i)||(re(e,"moment()."+e+"(period, number) is deprecated. Please use moment()."+e+"(number, period)."),
s=n,n=i,i=s),n="string"==typeof n?+n:n,r=Ke(n,i),sn(this,r,t),this;
};
}
function sn(t,e,n,r){
var s=e._milliseconds,a=e._days,o=e._months;
r=null==r?!0:r,s&&t._d.setTime(+t._d+s*n),a&&F(t,"Date",G(t,"Date")+a*n),o&&X(t,G(t,"Month")+o*n),
r&&i.updateOffset(t,a||o);
}
function an(t,e){
var n=t||Ge(),i=ze(n,this).startOf("day"),r=this.diff(i,"days",!0),s=-6>r?"sameElse":-1>r?"lastWeek":0>r?"lastDay":1>r?"sameDay":2>r?"nextDay":7>r?"nextWeek":"sameElse";
return this.format(e&&e[s]||this.localeData().calendar(s,this,Ge(n)));
}
function on(){
return new y(this);
}
function un(t,e){
var n;
return e=U("undefined"!=typeof e?e:"millisecond"),"millisecond"===e?(t=p(t)?t:Ge(t),
+this>+t):(n=p(t)?+t:+Ge(t),n<+this.clone().startOf(e));
}
function dn(t,e){
var n;
return e=U("undefined"!=typeof e?e:"millisecond"),"millisecond"===e?(t=p(t)?t:Ge(t),
+t>+this):(n=p(t)?+t:+Ge(t),+this.clone().endOf(e)<n);
}
function ln(t,e,n){
return this.isAfter(t,n)&&this.isBefore(e,n);
}
function cn(t,e){
var n;
return e=U(e||"millisecond"),"millisecond"===e?(t=p(t)?t:Ge(t),+this===+t):(n=+Ge(t),
+this.clone().startOf(e)<=n&&n<=+this.clone().endOf(e));
}
function hn(t,e,n){
var i,r,s=ze(t,this),a=6e4*(s.utcOffset()-this.utcOffset());
return e=U(e),"year"===e||"month"===e||"quarter"===e?(r=fn(this,s),"quarter"===e?r/=3:"year"===e&&(r/=12)):(i=this-s,
r="second"===e?i/1e3:"minute"===e?i/6e4:"hour"===e?i/36e5:"day"===e?(i-a)/864e5:"week"===e?(i-a)/6048e5:i),
n?r:g(r);
}
function fn(t,e){
var n,i,r=12*(e.year()-t.year())+(e.month()-t.month()),s=t.clone().add(r,"months");
return 0>e-s?(n=t.clone().add(r-1,"months"),i=(e-s)/(s-n)):(n=t.clone().add(r+1,"months"),
i=(e-s)/(n-s)),-(r+i);
}
function mn(){
return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function _n(){
var t=this.clone().utc();
return 0<t.year()&&t.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():A(t,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):A(t,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
}
function yn(t){
var e=A(this,t||i.defaultFormat);
return this.localeData().postformat(e);
}
function pn(t,e){
return this.isValid()?Ke({
to:this,
from:t
}).locale(this.locale()).humanize(!e):this.localeData().invalidDate();
}
function gn(t){
return this.from(Ge(),t);
}
function Dn(t,e){
return this.isValid()?Ke({
from:this,
to:t
}).locale(this.locale()).humanize(!e):this.localeData().invalidDate();
}
function vn(t){
return this.to(Ge(),t);
}
function Mn(t){
var e;
return void 0===t?this._locale._abbr:(e=b(t),null!=e&&(this._locale=e),this);
}
function Yn(){
return this._locale;
}
function wn(t){
switch(t=U(t)){
case"year":
this.month(0);

case"quarter":
case"month":
this.date(1);

case"week":
case"isoWeek":
case"day":
this.hours(0);

case"hour":
this.minutes(0);

case"minute":
this.seconds(0);

case"second":
this.milliseconds(0);
}
return"week"===t&&this.weekday(0),"isoWeek"===t&&this.isoWeekday(1),"quarter"===t&&this.month(3*Math.floor(this.month()/3)),
this;
}
function Sn(t){
return t=U(t),void 0===t||"millisecond"===t?this:this.startOf(t).add(1,"isoWeek"===t?"week":t).subtract(1,"ms");
}
function kn(){
return+this._d-6e4*(this._offset||0);
}
function Tn(){
return Math.floor(+this/1e3);
}
function bn(){
return this._offset?new Date(+this):this._d;
}
function On(){
var t=this;
return[t.year(),t.month(),t.date(),t.hour(),t.minute(),t.second(),t.millisecond()];
}
function Un(){
var t=this;
return{
years:t.year(),
months:t.month(),
date:t.date(),
hours:t.hours(),
minutes:t.minutes(),
seconds:t.seconds(),
milliseconds:t.milliseconds()
};
}
function Wn(){
return f(this);
}
function Cn(){
return d({},h(this));
}
function Gn(){
return h(this).overflow;
}
function Fn(t,e){
L(0,[t,t.length],0,e);
}
function Pn(t,e,n){
return he(Ge([t,11,31+e-n]),e,n).week;
}
function Hn(t){
var e=he(this,this.localeData()._week.dow,this.localeData()._week.doy).year;
return null==t?e:this.add(t-e,"y");
}
function Ln(t){
var e=he(this,1,4).year;
return null==t?e:this.add(t-e,"y");
}
function xn(){
return Pn(this.year(),1,4);
}
function In(){
var t=this.localeData()._week;
return Pn(this.year(),t.dow,t.doy);
}
function An(t){
return null==t?Math.ceil((this.month()+1)/3):this.month(3*(t-1)+this.month()%3);
}
function zn(t,e){
return"string"!=typeof t?t:isNaN(t)?(t=e.weekdaysParse(t),"number"==typeof t?t:null):parseInt(t,10);
}
function Zn(t){
return this._weekdays[t.day()];
}
function jn(t){
return this._weekdaysShort[t.day()];
}
function En(t){
return this._weekdaysMin[t.day()];
}
function Nn(t){
var e,n,i;
for(this._weekdaysParse=this._weekdaysParse||[],e=0;7>e;e++)if(this._weekdaysParse[e]||(n=Ge([2e3,1]).day(e),
i="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),
this._weekdaysParse[e]=new RegExp(i.replace(".",""),"i")),this._weekdaysParse[e].test(t))return e;
}
function Vn(t){
var e=this._isUTC?this._d.getUTCDay():this._d.getDay();
return null!=t?(t=zn(t,this.localeData()),this.add(t-e,"d")):e;
}
function qn(t){
var e=(this.day()+7-this.localeData()._week.dow)%7;
return null==t?e:this.add(t-e,"d");
}
function Jn(t){
return null==t?this.day()||7:this.day(this.day()%7?t:t-7);
}
function $n(t,e){
L(t,0,0,function(){
return this.localeData().meridiem(this.hours(),this.minutes(),e);
});
}
function Rn(t,e){
return e._meridiemParse;
}
function Bn(t){
return"p"===(t+"").toLowerCase().charAt(0);
}
function Qn(t,e,n){
return t>11?n?"pm":"PM":n?"am":"AM";
}
function Xn(t,e){
e[_r]=D(1e3*("0."+t));
}
function Kn(){
return this._isUTC?"UTC":"";
}
function ti(){
return this._isUTC?"Coordinated Universal Time":"";
}
function ei(t){
return Ge(1e3*t);
}
function ni(){
return Ge.apply(null,arguments).parseZone();
}
function ii(t,e,n){
var i=this._calendar[t];
return"function"==typeof i?i.call(e,n):i;
}
function ri(t){
var e=this._longDateFormat[t],n=this._longDateFormat[t.toUpperCase()];
return e||!n?e:(this._longDateFormat[t]=n.replace(/MMMM|MM|DD|dddd/g,function(t){
return t.slice(1);
}),this._longDateFormat[t]);
}
function si(){
return this._invalidDate;
}
function ai(t){
return this._ordinal.replace("%d",t);
}
function oi(t){
return t;
}
function ui(t,e,n,i){
var r=this._relativeTime[n];
return"function"==typeof r?r(t,e,n,i):r.replace(/%d/i,t);
}
function di(t,e){
var n=this._relativeTime[t>0?"future":"past"];
return"function"==typeof n?n(e):n.replace(/%s/i,e);
}
function li(t){
var e,n;
for(n in t)e=t[n],"function"==typeof e?this[n]=e:this["_"+n]=e;
this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source);
}
function ci(t,e,n,i){
var r=b(),s=l().set(i,e);
return r[n](s,t);
}
function hi(t,e,n,i,r){
if("number"==typeof t&&(e=t,t=void 0),t=t||"",null!=e)return ci(t,e,n,r);
var s,a=[];
for(s=0;i>s;s++)a[s]=ci(t,s,n,r);
return a;
}
function fi(t,e){
return hi(t,e,"months",12,"month");
}
function mi(t,e){
return hi(t,e,"monthsShort",12,"month");
}
function _i(t,e){
return hi(t,e,"weekdays",7,"day");
}
function yi(t,e){
return hi(t,e,"weekdaysShort",7,"day");
}
function pi(t,e){
return hi(t,e,"weekdaysMin",7,"day");
}
function gi(){
var t=this._data;
return this._milliseconds=Xr(this._milliseconds),this._days=Xr(this._days),this._months=Xr(this._months),
t.milliseconds=Xr(t.milliseconds),t.seconds=Xr(t.seconds),t.minutes=Xr(t.minutes),
t.hours=Xr(t.hours),t.months=Xr(t.months),t.years=Xr(t.years),this;
}
function Di(t,e,n,i){
var r=Ke(e,n);
return t._milliseconds+=i*r._milliseconds,t._days+=i*r._days,t._months+=i*r._months,
t._bubble();
}
function vi(t,e){
return Di(this,t,e,1);
}
function Mi(t,e){
return Di(this,t,e,-1);
}
function Yi(t){
return 0>t?Math.floor(t):Math.ceil(t);
}
function wi(){
var t,e,n,i,r,s=this._milliseconds,a=this._days,o=this._months,u=this._data;
return s>=0&&a>=0&&o>=0||0>=s&&0>=a&&0>=o||(s+=864e5*Yi(ki(o)+a),a=0,o=0),u.milliseconds=s%1e3,
t=g(s/1e3),u.seconds=t%60,e=g(t/60),u.minutes=e%60,n=g(e/60),u.hours=n%24,a+=g(n/24),
r=g(Si(a)),o+=r,a-=Yi(ki(r)),i=g(o/12),o%=12,u.days=a,u.months=o,u.years=i,this;
}
function Si(t){
return 4800*t/146097;
}
function ki(t){
return 146097*t/4800;
}
function Ti(t){
var e,n,i=this._milliseconds;
if(t=U(t),"month"===t||"year"===t)return e=this._days+i/864e5,n=this._months+Si(e),
"month"===t?n:n/12;
switch(e=this._days+Math.round(ki(this._months)),t){
case"week":
return e/7+i/6048e5;

case"day":
return e+i/864e5;

case"hour":
return 24*e+i/36e5;

case"minute":
return 1440*e+i/6e4;

case"second":
return 86400*e+i/1e3;

case"millisecond":
return Math.floor(864e5*e)+i;

default:
throw new Error("Unknown unit "+t);
}
}
function bi(){
return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*D(this._months/12);
}
function Oi(t){
return function(){
return this.as(t);
};
}
function Ui(t){
return t=U(t),this[t+"s"]();
}
function Wi(t){
return function(){
return this._data[t];
};
}
function Ci(){
return g(this.days()/7);
}
function Gi(t,e,n,i,r){
return r.relativeTime(e||1,!!n,t,i);
}
function Fi(t,e,n){
var i=Ke(t).abs(),r=ms(i.as("s")),s=ms(i.as("m")),a=ms(i.as("h")),o=ms(i.as("d")),u=ms(i.as("M")),d=ms(i.as("y")),l=r<_s.s&&["s",r]||1===s&&["m"]||s<_s.m&&["mm",s]||1===a&&["h"]||a<_s.h&&["hh",a]||1===o&&["d"]||o<_s.d&&["dd",o]||1===u&&["M"]||u<_s.M&&["MM",u]||1===d&&["y"]||["yy",d];
return l[2]=e,l[3]=+t>0,l[4]=n,Gi.apply(null,l);
}
function Pi(t,e){
return void 0===_s[t]?!1:void 0===e?_s[t]:(_s[t]=e,!0);
}
function Hi(t){
var e=this.localeData(),n=Fi(this,!t,e);
return t&&(n=e.pastFuture(+this,n)),e.postformat(n);
}
function Li(){
var t,e,n,i=ys(this._milliseconds)/1e3,r=ys(this._days),s=ys(this._months);
t=g(i/60),e=g(t/60),i%=60,t%=60,n=g(s/12),s%=12;
var a=n,o=s,u=r,d=e,l=t,c=i,h=this.asSeconds();
return h?(0>h?"-":"")+"P"+(a?a+"Y":"")+(o?o+"M":"")+(u?u+"D":"")+(d||l||c?"T":"")+(d?d+"H":"")+(l?l+"M":"")+(c?c+"S":""):"P0D";
}
var xi,Ii,Ai=i.momentProperties=[],zi=!1,Zi={},ji={},Ei=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Ni=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Vi={},qi={},Ji=/\d/,$i=/\d\d/,Ri=/\d{3}/,Bi=/\d{4}/,Qi=/[+-]?\d{6}/,Xi=/\d\d?/,Ki=/\d{1,3}/,tr=/\d{1,4}/,er=/[+-]?\d{1,6}/,nr=/\d+/,ir=/[+-]?\d+/,rr=/Z|[+-]\d\d:?\d\d/gi,sr=/[+-]?\d+(\.\d{1,3})?/,ar=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,or={},ur={},dr=0,lr=1,cr=2,hr=3,fr=4,mr=5,_r=6;
L("M",["MM",2],"Mo",function(){
return this.month()+1;
}),L("MMM",0,0,function(t){
return this.localeData().monthsShort(this,t);
}),L("MMMM",0,0,function(t){
return this.localeData().months(this,t);
}),O("month","M"),j("M",Xi),j("MM",Xi,$i),j("MMM",ar),j("MMMM",ar),V(["M","MM"],function(t,e){
e[lr]=D(t)-1;
}),V(["MMM","MMMM"],function(t,e,n,i){
var r=n._locale.monthsParse(t,i,n._strict);
null!=r?e[lr]=r:h(n).invalidMonth=t;
});
var yr="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),pr="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),gr={};
i.suppressDeprecationWarnings=!1;
var Dr=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,vr=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Mr=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Yr=/^\/?Date\((\-?\d+)/i;
i.createFromInputFallback=ie("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(t){
t._d=new Date(t._i+(t._useUTC?" UTC":""));
}),L(0,["YY",2],0,function(){
return this.year()%100;
}),L(0,["YYYY",4],0,"year"),L(0,["YYYYY",5],0,"year"),L(0,["YYYYYY",6,!0],0,"year"),
O("year","y"),j("Y",ir),j("YY",Xi,$i),j("YYYY",tr,Bi),j("YYYYY",er,Qi),j("YYYYYY",er,Qi),
V(["YYYYY","YYYYYY"],dr),V("YYYY",function(t,e){
e[dr]=2===t.length?i.parseTwoDigitYear(t):D(t);
}),V("YY",function(t,e){
e[dr]=i.parseTwoDigitYear(t);
}),i.parseTwoDigitYear=function(t){
return D(t)+(D(t)>68?1900:2e3);
};
var wr=C("FullYear",!1);
L("w",["ww",2],"wo","week"),L("W",["WW",2],"Wo","isoWeek"),O("week","w"),O("isoWeek","W"),
j("w",Xi),j("ww",Xi,$i),j("W",Xi),j("WW",Xi,$i),q(["w","ww","W","WW"],function(t,e,n,i){
e[i.substr(0,1)]=D(t);
});
var Sr={
dow:0,
doy:6
};
L("DDD",["DDDD",3],"DDDo","dayOfYear"),O("dayOfYear","DDD"),j("DDD",Ki),j("DDDD",Ri),
V(["DDD","DDDD"],function(t,e,n){
n._dayOfYear=D(t);
}),i.ISO_8601=function(){};
var kr=ie("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){
var t=Ge.apply(null,arguments);
return this>t?this:t;
}),Tr=ie("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){
var t=Ge.apply(null,arguments);
return t>this?this:t;
});
Ie("Z",":"),Ie("ZZ",""),j("Z",rr),j("ZZ",rr),V(["Z","ZZ"],function(t,e,n){
n._useUTC=!0,n._tzm=Ae(t);
});
var br=/([\+\-]|\d\d)/gi;
i.updateOffset=function(){};
var Or=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Ur=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
Ke.fn=Le.prototype;
var Wr=rn(1,"add"),Cr=rn(-1,"subtract");
i.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";
var Gr=ie("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(t){
return void 0===t?this.localeData():this.locale(t);
});
L(0,["gg",2],0,function(){
return this.weekYear()%100;
}),L(0,["GG",2],0,function(){
return this.isoWeekYear()%100;
}),Fn("gggg","weekYear"),Fn("ggggg","weekYear"),Fn("GGGG","isoWeekYear"),Fn("GGGGG","isoWeekYear"),
O("weekYear","gg"),O("isoWeekYear","GG"),j("G",ir),j("g",ir),j("GG",Xi,$i),j("gg",Xi,$i),
j("GGGG",tr,Bi),j("gggg",tr,Bi),j("GGGGG",er,Qi),j("ggggg",er,Qi),q(["gggg","ggggg","GGGG","GGGGG"],function(t,e,n,i){
e[i.substr(0,2)]=D(t);
}),q(["gg","GG"],function(t,e,n,r){
e[r]=i.parseTwoDigitYear(t);
}),L("Q",0,0,"quarter"),O("quarter","Q"),j("Q",Ji),V("Q",function(t,e){
e[lr]=3*(D(t)-1);
}),L("D",["DD",2],"Do","date"),O("date","D"),j("D",Xi),j("DD",Xi,$i),j("Do",function(t,e){
return t?e._ordinalParse:e._ordinalParseLenient;
}),V(["D","DD"],cr),V("Do",function(t,e){
e[cr]=D(t.match(Xi)[0],10);
});
var Fr=C("Date",!0);
L("d",0,"do","day"),L("dd",0,0,function(t){
return this.localeData().weekdaysMin(this,t);
}),L("ddd",0,0,function(t){
return this.localeData().weekdaysShort(this,t);
}),L("dddd",0,0,function(t){
return this.localeData().weekdays(this,t);
}),L("e",0,0,"weekday"),L("E",0,0,"isoWeekday"),O("day","d"),O("weekday","e"),O("isoWeekday","E"),
j("d",Xi),j("e",Xi),j("E",Xi),j("dd",ar),j("ddd",ar),j("dddd",ar),q(["dd","ddd","dddd"],function(t,e,n){
var i=n._locale.weekdaysParse(t);
null!=i?e.d=i:h(n).invalidWeekday=t;
}),q(["d","e","E"],function(t,e,n,i){
e[i]=D(t);
});
var Pr="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Hr="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Lr="Su_Mo_Tu_We_Th_Fr_Sa".split("_");
L("H",["HH",2],0,"hour"),L("h",["hh",2],0,function(){
return this.hours()%12||12;
}),$n("a",!0),$n("A",!1),O("hour","h"),j("a",Rn),j("A",Rn),j("H",Xi),j("h",Xi),j("HH",Xi,$i),
j("hh",Xi,$i),V(["H","HH"],hr),V(["a","A"],function(t,e,n){
n._isPm=n._locale.isPM(t),n._meridiem=t;
}),V(["h","hh"],function(t,e,n){
e[hr]=D(t),h(n).bigHour=!0;
});
var xr=/[ap]\.?m?\.?/i,Ir=C("Hours",!0);
L("m",["mm",2],0,"minute"),O("minute","m"),j("m",Xi),j("mm",Xi,$i),V(["m","mm"],fr);
var Ar=C("Minutes",!1);
L("s",["ss",2],0,"second"),O("second","s"),j("s",Xi),j("ss",Xi,$i),V(["s","ss"],mr);
var zr=C("Seconds",!1);
L("S",0,0,function(){
return~~(this.millisecond()/100);
}),L(0,["SS",2],0,function(){
return~~(this.millisecond()/10);
}),L(0,["SSS",3],0,"millisecond"),L(0,["SSSS",4],0,function(){
return 10*this.millisecond();
}),L(0,["SSSSS",5],0,function(){
return 100*this.millisecond();
}),L(0,["SSSSSS",6],0,function(){
return 1e3*this.millisecond();
}),L(0,["SSSSSSS",7],0,function(){
return 1e4*this.millisecond();
}),L(0,["SSSSSSSS",8],0,function(){
return 1e5*this.millisecond();
}),L(0,["SSSSSSSSS",9],0,function(){
return 1e6*this.millisecond();
}),O("millisecond","ms"),j("S",Ki,Ji),j("SS",Ki,$i),j("SSS",Ki,Ri);
var Zr;
for(Zr="SSSS";Zr.length<=9;Zr+="S")j(Zr,nr);
for(Zr="S";Zr.length<=9;Zr+="S")V(Zr,Xn);
var jr=C("Milliseconds",!1);
L("z",0,0,"zoneAbbr"),L("zz",0,0,"zoneName");
var Er=y.prototype;
Er.add=Wr,Er.calendar=an,Er.clone=on,Er.diff=hn,Er.endOf=Sn,Er.format=yn,Er.from=pn,
Er.fromNow=gn,Er.to=Dn,Er.toNow=vn,Er.get=P,Er.invalidAt=Gn,Er.isAfter=un,Er.isBefore=dn,
Er.isBetween=ln,Er.isSame=cn,Er.isValid=Wn,Er.lang=Gr,Er.locale=Mn,Er.localeData=Yn,
Er.max=Tr,Er.min=kr,Er.parsingFlags=Cn,Er.set=P,Er.startOf=wn,Er.subtract=Cr,Er.toArray=On,
Er.toObject=Un,Er.toDate=bn,Er.toISOString=_n,Er.toJSON=_n,Er.toString=mn,Er.unix=Tn,
Er.valueOf=kn,Er.year=wr,Er.isLeapYear=ce,Er.weekYear=Hn,Er.isoWeekYear=Ln,Er.quarter=Er.quarters=An,
Er.month=K,Er.daysInMonth=te,Er.week=Er.weeks=ye,Er.isoWeek=Er.isoWeeks=pe,Er.weeksInYear=In,
Er.isoWeeksInYear=xn,Er.date=Fr,Er.day=Er.days=Vn,Er.weekday=qn,Er.isoWeekday=Jn,
Er.dayOfYear=De,Er.hour=Er.hours=Ir,Er.minute=Er.minutes=Ar,Er.second=Er.seconds=zr,
Er.millisecond=Er.milliseconds=jr,Er.utcOffset=je,Er.utc=Ne,Er.local=Ve,Er.parseZone=qe,
Er.hasAlignedHourOffset=Je,Er.isDST=$e,Er.isDSTShifted=Re,Er.isLocal=Be,Er.isUtcOffset=Qe,
Er.isUtc=Xe,Er.isUTC=Xe,Er.zoneAbbr=Kn,Er.zoneName=ti,Er.dates=ie("dates accessor is deprecated. Use date instead.",Fr),
Er.months=ie("months accessor is deprecated. Use month instead",K),Er.years=ie("years accessor is deprecated. Use year instead",wr),
Er.zone=ie("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Ee);
var Nr=Er,Vr={
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},qr={
LTS:"h:mm:ss A",
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D, YYYY",
LLL:"MMMM D, YYYY h:mm A",
LLLL:"dddd, MMMM D, YYYY h:mm A"
},Jr="Invalid date",$r="%d",Rr=/\d{1,2}/,Br={
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},Qr=M.prototype;
Qr._calendar=Vr,Qr.calendar=ii,Qr._longDateFormat=qr,Qr.longDateFormat=ri,Qr._invalidDate=Jr,
Qr.invalidDate=si,Qr._ordinal=$r,Qr.ordinal=ai,Qr._ordinalParse=Rr,Qr.preparse=oi,
Qr.postformat=oi,Qr._relativeTime=Br,Qr.relativeTime=ui,Qr.pastFuture=di,Qr.set=li,
Qr.months=R,Qr._months=yr,Qr.monthsShort=B,Qr._monthsShort=pr,Qr.monthsParse=Q,Qr.week=fe,
Qr._week=Sr,Qr.firstDayOfYear=_e,Qr.firstDayOfWeek=me,Qr.weekdays=Zn,Qr._weekdays=Pr,
Qr.weekdaysMin=En,Qr._weekdaysMin=Lr,Qr.weekdaysShort=jn,Qr._weekdaysShort=Hr,Qr.weekdaysParse=Nn,
Qr.isPM=Bn,Qr._meridiemParse=xr,Qr.meridiem=Qn,k("en",{
ordinalParse:/\d{1,2}(th|st|nd|rd)/,
ordinal:function(t){
var e=t%10,n=1===D(t%100/10)?"th":1===e?"st":2===e?"nd":3===e?"rd":"th";
return t+n;
}
}),i.lang=ie("moment.lang is deprecated. Use moment.locale instead.",k),i.langData=ie("moment.langData is deprecated. Use moment.localeData instead.",b);
var Xr=Math.abs,Kr=Oi("ms"),ts=Oi("s"),es=Oi("m"),ns=Oi("h"),is=Oi("d"),rs=Oi("w"),ss=Oi("M"),as=Oi("y"),os=Wi("milliseconds"),us=Wi("seconds"),ds=Wi("minutes"),ls=Wi("hours"),cs=Wi("days"),hs=Wi("months"),fs=Wi("years"),ms=Math.round,_s={
s:45,
m:45,
h:22,
d:26,
M:11
},ys=Math.abs,ps=Le.prototype;
ps.abs=gi,ps.add=vi,ps.subtract=Mi,ps.as=Ti,ps.asMilliseconds=Kr,ps.asSeconds=ts,
ps.asMinutes=es,ps.asHours=ns,ps.asDays=is,ps.asWeeks=rs,ps.asMonths=ss,ps.asYears=as,
ps.valueOf=bi,ps._bubble=wi,ps.get=Ui,ps.milliseconds=os,ps.seconds=us,ps.minutes=ds,
ps.hours=ls,ps.days=cs,ps.weeks=Ci,ps.months=hs,ps.years=fs,ps.humanize=Hi,ps.toISOString=Li,
ps.toString=Li,ps.toJSON=Li,ps.locale=Mn,ps.localeData=Yn,ps.toIsoString=ie("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Li),
ps.lang=Gr,L("X",0,0,"unix"),L("x",0,0,"valueOf"),j("x",ir),j("X",sr),V("X",function(t,e,n){
n._d=new Date(1e3*parseFloat(t,10));
}),V("x",function(t,e,n){
n._d=new Date(D(t));
}),i.version="2.10.6",r(Ge),i.fn=Nr,i.min=Pe,i.max=He,i.utc=l,i.unix=ei,i.months=fi,
i.isDate=a,i.locale=k,i.invalid=m,i.duration=Ke,i.isMoment=p,i.weekdays=_i,i.parseZone=ni,
i.localeData=b,i.isDuration=xe,i.monthsShort=mi,i.weekdaysMin=pi,i.defineLocale=T,
i.weekdaysShort=yi,i.normalizeUnits=U,i.relativeTimeThreshold=Pi;
var gs=i;
return gs;
});