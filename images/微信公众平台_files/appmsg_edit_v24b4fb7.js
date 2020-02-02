function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("media/appmsg_edit_v2.js",["biz_web/ui/jquery.scrollbar.js","biz_common/utils/string/html.js","common/qq/emoji.js","pages/editor/editor_for_web1.js","author/author_popover.js","author/author_info_list.js","author/author_recent.js","tpl/media/reward_swtich_tips.html.js","author/author_utils.js","common/qq/Class.js","common/wx/mpEditor/common/eventbus.js","common/wx/inputCounter.js","common/wx/Step.js","common/wx/dropdownClassify.js","common/wx/tooltips.js","biz_common/jquery.validate.js","common/wx/Tips.js","biz_common/moment.js","common/wx/preview.js","common/wx/dialog.js","common/wx/popover.js","common/wx/ban.js","common/wx/Cgi.js","common/wx/mpEditor/common/cropImgCgi.js","common/wx/mpEditor/pluginsList.js","common/wx/mpEditor/plugin/templateList.js","common/wx/mpEditor/plugin/more.js","biz_web/lib/store.js","tpl/media/appmsg_edit/article.html.js","media/article_list.js","media/media_static_data.js","common/wx/const.js","common/wx/utils.js","common/wx/speedPerformance.js","common/wx/pagebar.js","tpl/media/audit_fail_tip.html.js","media/get_article_structure.js","media/web2_edit_v2.js"],function(e){
"use strict";
function t(e,t,i){
(t||1)>X&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:e,
val:1,
level:i||"error",
content:"[file=media/appmsg_edit]"
});
}
function i(){
z.initSpeeds({
type:"appmsg",
pid:34
});
}
function r(e,t){
var i=$(e);
return i.find(".vote_area").length>0?"投票":i.find(".card_iframe").length>0?"卡券":i.find(".weapp_text_link").length>0?"小程序链接":i.find(".weapp_image_link").length>0?"小程序链接":i.find(".miniprogram_element").length>0?"小程序卡片":i.find(".js_editor_product").length>0?"商品":i.find(".js_editor_cps").length>0?"广告卡片":t&&t.ad_info&&t.ad_info.ad_id?"广告卡片":"";
}
e("biz_web/ui/jquery.scrollbar.js"),e("biz_common/utils/string/html.js"),e("common/qq/emoji.js"),
e("pages/editor/editor_for_web1.js");
var a=e("author/author_popover.js"),n=e("author/author_info_list.js"),o=e("author/author_recent.js"),s=e("tpl/media/reward_swtich_tips.html.js"),d=e("author/author_utils.js"),c=e("common/qq/Class.js"),l=e("common/wx/mpEditor/common/eventbus.js"),_=e("common/wx/inputCounter.js"),u=e("common/wx/Step.js"),p=e("common/wx/dropdownClassify.js"),h=e("common/wx/tooltips.js"),m=e("biz_common/jquery.validate.js").rules,f=e("common/wx/Tips.js"),g=e("biz_common/moment.js"),w=e("common/wx/preview.js"),v=e("common/wx/dialog.js"),j=e("common/wx/popover.js"),y=e("common/wx/ban.js"),b=e("common/wx/Cgi.js"),x=e("common/wx/mpEditor/common/cropImgCgi.js"),k=e("common/wx/mpEditor/pluginsList.js"),C=e("common/wx/mpEditor/plugin/templateList.js"),T=e("common/wx/mpEditor/plugin/more.js"),L=e("biz_web/lib/store.js"),S=e("tpl/media/appmsg_edit/article.html.js"),A=e("media/article_list.js"),D=e("media/media_static_data.js"),I=e("common/wx/const.js"),O=I.insertAdModeMap,E=I.DEFAULT_AD_TEXT,R=(I.moreReadModeMap,
I.NO_AD_TEXT),P=I.videoPasterMinPlayLength,M=I.videoPasterMinShowTime,N=I.modifyVideoTitleTips,B=e("common/wx/utils.js"),q=B.formatVideoTime,U=(D.URL_PLATFORM_MAP,
D.article_type),z=e("common/wx/speedPerformance.js"),F=wx.cgiData,V=document.referrer,W=e("common/wx/pagebar.js"),H=(e("tpl/media/audit_fail_tip.html.js"),
e("media/get_article_structure.js")),Y=H.getArticleStructure;
e("media/web2_edit_v2.js");
var J,K={
masssendCacheKey:"masssendMusicCheck",
originalProtoKey:"mpeditor_original_reward_proto_"+wx.data.uin,
scrollIntoViewid:null,
scrollIntoViewCount:0,
curRenderType:1,
$articlePanel:null,
hideArticlePanelId:null,
canShowArticlePanel:!0,
isReadOnly:!1,
isRewardSwitched:!1,
articleReplaceType:0,
recentList:[]
};
!function(e){
var t=function(e,t){
var i=e.siblings(".tips_global"),r=e[0];
t&&""===r.value||!t&&""===r.innerText.replace(/\n|\r/g,"")?i.show():i.hide();
};
e.fn.placeholder2=function(){
var e=this,i="INPUT"===this[0].nodeName;
i&&"placeholder"in document.createElement("input")||this.on("input propertychange blur",function(){
t(e,i);
}).trigger("blur");
},e.fn.checkPlaceholder2=function(){
t(this,"INPUT"===this[0].nodeName);
},e.extend(e.easing,{
easeOutCubic:function(e,t,i,r,a){
return r*((t=t/a-1)*t*t+1)+i;
}
});
}(jQuery);
{
var X=Math.random(),G=!1,Q={},Z=!1,et=c.declare({
init:function(e){
var t=this;
t.opt=e,i(),$.extend(!0,t,e),t.$editor=$(t.editor_selector).html(wx.T(S,{
can_use_copyright:F.can_use_copyright,
can_use_reward:F.can_use_reward,
can_use_payforread:F.can_use_payforread,
can_use_comment:F.can_use_comment,
can_use_appmsg_source_url:F.can_use_appmsg_source_url,
can_see_ad:F.can_see_ad&&""!==F.insert_ad_mode,
is_ios_reward_open:F.is_ios_reward_open,
has_invited_original:F.has_invited_original,
orginal_apply_stat:F.orginal_apply_stat,
can_use_original_reprint:F.can_use_original_reprint,
token:wx.data.t,
is_illegal:1*t.appmsg_data.is_illegal||0,
can_use_related_video:F.can_use_related_video,
can_use_video_recommend:F.can_use_video_recommend,
can_use_watch_more:F.can_use_watch_more,
can_use_pay_subscribe:F.can_use_pay_subscribe,
is_pay_subscribe_block:F.is_pay_subscribe_block
})),t._initUEditor({
callback:function(){
$("#media_item_list_scrollbar").scrollbar({
autoUpdate:!1
});
}
});
},
_initFormItemsOpt:function(){
this.formItemsOpt={
title:{
readonly:!1,
readonlyTips:""
},
author:{
counter:null,
readonly:!1,
readonlyTips:""
},
content:{
readonly:!1,
readonlyTips:""
},
guideWords:{
readonly:!1,
readonlyTips:""
},
description:{
readonly:!1,
readonlyTips:""
}
};
},
_renderReadOnly:function(e){
var t=e.type,i=e.time,r=e.name,a=e.ua,n=$("#read_only_container"),o=n.find(".js_close");
if(5==t){
var s=location.href+"&conflict=1",d="你有未保存的草稿，%s点击查看%s".sprintf("<a href='javascript:;'>","</a>");
return n.find("p").html(d),n.find("a").click(function(){
n.hide(),window.open(s);
}),e.showTips===!0&&v.show({
type:"warn",
msg:"你有未保存的草稿",
buttons:[{
text:"查看草稿",
click:function(){
n.hide(),window.open(s),this.remove();
}
},{
text:"编辑当前内容",
type:"normal",
click:function(){
this.remove();
}
}]
}),n.show(),void o.show();
}
if(1==t||2==t)n.find("p").text("此素材有文章存在违规，无法编辑"),n.show(),o.hide();else if(4==t){
var d="当前素材并非最新内容，你可以%s打开最新素材%s".sprintf("<a target='_blank' href='"+location.href+"'>","</a>");
n.find("p").html(d);
var c="当前素材非最新内容，是否打开重新编辑？";
i&&(c+="<br />最新素材更新时间：%s".sprintf(i)),r&&(c+="<br />操作人：%s".sprintf(r.html(!0))),
a&&(c+="<br />保存于：%s".sprintf((a+"浏览器").html(!0))),v.show({
type:"warn",
msg:c,
buttons:[{
text:"编辑新内容",
click:function(){
window.open(location.href),this.remove();
}
},{
text:"查看当前内容",
type:"normal",
click:function(){
this.remove();
}
}]
}),n.show(),o.hide();
}else(3==t||6==t)&&(n.hide(),o.hide());
K.isReadOnly=!0;
var l=$(this.editor_selector);
if(l.find(".js_title_main").addClass("without_margin"),l.find(".js_readonly").hide(),
$(this.appmsg_selector).find(".js_readonly").hide(),$("#editor_pannel").addClass("appmsg_input_area_pull_right"),
$("#js_add_appmsg").hide(),$("#bottom_main").hide(),$("#right_pannel").hide(),this.articleList){
var _=this.articleList.getCurrentArticle();
if(_){
var u=_.data("article");
u&&"function"==typeof u.setGuideWordsReadOnly&&u.setGuideWordsReadOnly();
}
}
this.ueditor&&(this.ueditor.fireEvent("scrollIntoView",$("#read_only_container"),150),
this.ueditor.fireEvent("setToolBarStatus",{
status:!1
}));
},
_renderEditorByType:function(e,t,i){
switch(1*e){
case 1:
this._setCurRenderType(1),this._setAuthorStatus({
status:!0
}),this._switchContentType({
type:1
}),K.isReadOnly?(this._setToolBarStatus({
status:!1
}),this._setTitleStatus({
readonly:!0
})):(this._setToolBarStatus({
status:!0
}),this._setTitleStatus({
readonly:!1
})),this._setArticleUrlStatus(!0),this._setAdInsertStatus(!0),this._setMoreReadStatus(!0),
this._setCommentStatus(!0),this._setOriginalStatus({
status:!0
}),this._setCoverStatus({
status:!0
}),this._setDescriptionStatus({
status:!0
}),this._setCoverDescriptionStatus({
status:!0
}),this._setFoldStatus(!0);
break;

case 2:
var r="分享图文标题不可编辑";
"object"===("undefined"==typeof i?"undefined":_typeof(i))&&"isMyMpVideo"in i&&(r=N),
this._setCurRenderType(2),this._setTitleStatus({
readonly:!i.isMyMpVideo,
readonlyTips:r,
isMyMpVideo:i.isMyMpVideo
}),this._setAuthorStatus({
status:!1
}),this._switchContentType({
type:2
}),this._setToolBarStatus({
status:!1,
disabledTips:"分享图文中不能插入多媒体素材"
}),this._setArticleUrlStatus(!1),this._setAdInsertStatus(!1),this._setMoreReadStatus(!1),
this._setCommentStatus(!0),this._setOriginalStatus({
status:!1
}),this._setCoverStatus({
status:!1
}),this._setDescriptionStatus({
status:!1
}),this._setCoverDescriptionStatus({
status:!1
}),this._setFoldStatus(!1);
}
"function"==typeof t&&t();
},
_setTitleStatus:function(e){
e.readonly?($("#title").attr("readonly","true"),this.formItemsOpt.title.readonlyTips=e.readonlyTips||"",
$("#js_title_main").addClass("appmsg_edit_not_appmsg")):($("#title").removeAttr("readonly"),
e.isMyMpVideo?$("#js_title_main").addClass("appmsg_edit_not_appmsg"):$("#js_title_main").removeClass("appmsg_edit_not_appmsg")),
"none"===e.display?$("#js_title_main").hide():$("#js_title_main").show(),this.formItemsOpt.title.readonly=!!e.readonly;
},
_setAuthorStatus:function(e){
e.status?($("#js_author_area").show(),e.readonly?($("#author").attr("readonly","true"),
this.formItemsOpt.author.readonlyTips=e.readonlyTips||""):$("#author").removeAttr("readonly")):$("#js_author_area").hide(),
this.formItemsOpt.author.readonly=!!e.readonly,this.formItemsOpt.author.counter[e.hideCounter?"hideWithAppend":"show"]();
},
_switchContentType:function(e){
switch(1*e.type){
case 1:
$($("#edui1_iframeholder").show().find("iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).attr("contenteditable",!e.readonly),
$("#guide_words_main").hide(),this.formItemsOpt.content.readonly=!!e.readonly,this.formItemsOpt.content.readonlyTips=e.readonlyTips||"";
break;

case 2:
$("#edui1_iframeholder").hide(),$("#guide_words_main").show().find(".js_editorArea").attr("contenteditable",!e.readonly).attr("placeholder",e.placeholder||"可以输入140字以内的推荐语(选填)"),
this.formItemsOpt.guideWords.readonly=!!e.readonly,this.formItemsOpt.guideWords.readonlyTips=e.readonlyTips||"";
break;

case 3:
$($("#edui1_iframeholder").show().find("iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).attr("contenteditable",!e.content.readonly),
this.formItemsOpt.content.readonly=!!e.content.readonly,this.formItemsOpt.content.readonlyTips=e.content.readonlyTips||"",
$("#guide_words_main").hide(),this.formItemsOpt.guideWords.readonly=!!e.guideWords.readonly,
this.formItemsOpt.guideWords.readonlyTips=e.guideWords.readonlyTips||"";
}
},
_setToolBarStatus:function(e){
e.status?(this.ueditor.fireEvent("star_toolbar_float"),$(this.editor_selector).find(".js_title_main").removeClass("without_margin"),
$("#edui1_toolbarbox").show(),$("#js_media_list_box").show(),$("#js_media_extra_list").show()):($(this.editor_selector).find(".js_title_main").addClass("without_margin"),
$("#edui1_toolbarbox").hide(),$("#js_media_list_box").hide(),$("#js_media_extra_list").hide());
},
_setArticleUrlStatus:function(e){
e?$("#js_article_url_area").show():$("#js_article_url_area").hide();
},
_setAdInsertStatus:function(e){
e?$("#js_insert_ad_area").show():$("#js_insert_ad_area").hide();
},
_setMoreReadStatus:function(e){
e?$("#js_article_recommend_area").show():$("#js_article_recommend_area").hide();
},
_setCommentStatus:function(e){
var t=$("#js_comment_area");
t&&(e?t.show():t.hide());
},
_setOriginalStatus:function(e){
var t=$("#js_original");
if(t)if(e.status){
var i=t.find("#js_original_open"),r=t.find(".js_original_content");
switch(e.type){
case"reprint":
i.find(".js_original_title").text("转载文章：原文已声明原创"),i.find(".js_original_btn").hide(),
r.find(".js_original_item").hide().filter(".js_reprint").show();
break;

case"article":
default:
i.find(".js_original_title").text("原创：已声明"),i.find(".js_original_btn").show(),r.find(".js_original_item").hide().filter(".js_article").show();
}
t.show();
}else t.hide();
},
_setCoverStatus:function(e){
var t=$("#js_cover_area");
e.status?(t.show(),e.readonly?t.find(".js_cover_btn_area").hide():t.find(".js_cover_btn_area").show()):t.hide();
},
_setCoverDescriptionStatus:function(e){
e.status?$("#js_cover_description_area").show():$("#js_cover_description_area").hide();
},
_setDescriptionStatus:function(e){
e.status?($("#js_description_area").show(),e.readonly?($("#js_description").attr("readonly","true"),
this.formItemsOpt.description.readonlyTips=e.readonlyTips||""):$("#js_description").removeAttr("readonly")):$("#js_description_area").hide(),
this.formItemsOpt.description.readonly=!!e.readonly;
},
_setFoldStatus:function(e){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=$("#bot_bar_left_container");
i.find(".js_fold").remove(),1*t.type!==1&&1*t.type!==2&&(t.type=-1),e&&i.append(template.render("tpl_bot_left_fold",t));
},
_setSaveBtnStatus:function(e){
e.disabled?($("#js_send").addClass("btn_disabled"),$("#js_preview").addClass("btn_disabled"),
$("#js_submit").addClass("btn_disabled")):($("#js_send").removeClass("btn_disabled"),
$("#js_preview").removeClass("btn_disabled"),$("#js_submit").removeClass("btn_disabled"));
},
_setCurRenderType:function(e){
K.curRenderType=1*e;
},
_initEditArea:function(){
function e(e){
return e.isMyMpVideo||e.is_my_mp_video;
}
function t(){
var t=s.articleList.getCurrentArticleObject().data.getData(),i=t.share_videoinfo;
i[0].play_length>=P&&e(t)&&(d.find(".video_dot_text").show(),l.fireEvent("showWeappDialog",{
isvideodot:!0,
videoinfo:i,
pasterInfo:t.dot
},function(e){
if(e){
var i=e.begin_time,r=(e.main_page,e.nickname),a=e.path,n=e.dot,o=e.end_time,s={
begin_time:i,
end_time:o,
dot:JSON.stringify({
title:n.title,
desc:n.desc,
relativeURL:a,
originalId:n.originalId,
weAppName:r,
appId:n.appId,
avatar:n.avatar
}),
type:1,
id:1,
min_show_time:M,
position:JSON.stringify({
right:0,
bottom:20,
gravity:"right|bottom"
})
},d=[];
d.push(s),t.dot={
list:d
};
var c="在%s开始出现贴片".replace("%s",q(i));
D.find(".js_paster_setting_text").html(c);
}else t.dot&&Object.keys(t.dot).length||A.checkbox("checked",!1);
}));
}
function i(){
var e="undefined"!=typeof localStorage.getItem("adTransitionText")?localStorage.getItem("adTransitionText"):null;
e===R&&(e=null);
var t=s.articleList&&s.articleList.getCurrentArticleObject().data.getData(),i=t.advert_info&&t.advert_info.back_transition&&t.advert_info.back_transition.ad_video_transition||"",r=t.ad_video_transition&&t.ad_video_transition.ad_video_transition;
l.fireEvent("showVideoAdTransitionDialog",{
scene:"ueditor",
selectedValue:r||i||e||E
},function(e){
return e?(localStorage.setItem("finalAdText",e),t.ad_video_transition={
ad_video_transition:e
},void d.find(".ad_text").html(e)):void($(".ad_transition_area .ad_text_setting").html()||(d.find(".js_ad_back").checkbox("checked",!1),
d.find(".ad_transition_area .ad_text_setting").html(""),d.find(".ad_transition_area .ad_text_setting").hide()));
});
}
function r(){
l.fireEvent("showRelatedVideoDialog",{
isShow:!0,
scene:"morevideo",
canuselink:!1,
allowChooseLength:3,
videoList:JSON.parse($(".js_related_video_desc").data("related_video")||"[]")
},function(e){
if(console.log(e),"undefined"!=typeof e){
$(".js_related_video_desc").data("related_video",JSON.stringify(e)).html("已选%s条视频".sprintf(e.length)).show(),
$(".js_related_list").empty();
for(var t=0;t<e.length;t++)e[t].title=e[t].title.html(!0),$(".js_related_list").append("<li>"+e[t].title+"</li>");
$(".js_related_video_checkbox").checkbox("checked",!0),$(".js_related_video_radio_custom").addClass("selected"),
$(".js_related_video_radio_suggestion").removeClass("selected"),$(".js_relate_video_modify").show(),
$(".js_recommend_wording").hide();
}
var i=$(".js_related_video_desc").data("related_video")||"";
(0===i.length||0===JSON.parse(i).length)&&($(".js_related_video_radio_suggestion").hasClass("selected")||($(".js_related_video_checkbox").checkbox("checked",!1),
$(".js_related_video_radio_custom").removeClass("selected")));
});
}
function a(e,t){
return"none"!=$(".js_more_video_area").css("display")?!1:void(0===wx.cgiData.can_use_video_recommend?r():0===$(t.target).closest(".js_related_video_select").length&&($(".js_related_video_select").toggle(),
"checked"!=$(".js_related_video_checkbox").attr("checked")&&n(!0),e&&n(!0)));
}
function n(e){
$(".js_related_video_radio_custom").removeClass("selected"),$(".js_related_video_radio_suggestion").addClass("selected"),
$(".js_relate_video_modify").hide(),$(".js_related_video_desc").data("related_video",JSON.stringify([])).html("智能推荐本公众号已群发视频").show(),
$(".js_recommend_wording").show(),$(".js_related_list").empty(),$(".js_related_video_checkbox").checkbox("checked",!0),
e||setTimeout(function(){
$(".js_related_video_select").hide();
});
}
function o(e){
var t=N.$pop.find(".jsPopoverBt").eq(0);
if(!t.hasClass("btn_disabled")&&!t.hasClass("btn_loading")){
t.addClass("btn_loading");
var i=$.trim(e);
return/^https?:\/\//.test(i)||(i="http://"+i),m.url(i)?void b.get({
url:"/cgi-bin/operate_appmsg?sub=check_sourceurl",
data:{
sourceurl:i
}
},function(e){
if(t.removeClass("btn_loading"),"none"!=N.$pop.css("display")){
var r=e&&e.base_resp&&e.base_resp.ret;
N.$pop.find(".js_err_msg").hide(),0==r?(s.articleList&&s.articleList.getCurrentArticleObject().data.set("source_url",i),
$("#js_article_url_area").find(".article_url_setting").html(i),$(".js_url").val(i),
N.hide()):1530503==r?(t.addClass("btn_disabled"),$(".js_url_tempkey").hide(),$(".js_warn.frm_msg").show()):64552==r?(t.addClass("btn_disabled"),
$(".js_url_tempkey").hide(),$(".js_url_error").show()):64508==r?(t.addClass("btn_disabled"),
N.$pop.find(".js_common_err").text("该链接非法，微信已经禁止访问").show()):(t.addClass("btn_disabled"),
$(".js_url_tempkey").hide(),f.err("系统繁忙，请稍后再试")),N.resetPosition();
}
}):($(".js_url_error").show(),N.resetPosition());
}
}
var s=this,d=s.$editor,c=(s.articleList&&s.articleList.getCurrentArticleObject().data.getData(),
s.ueditor.getBrowser());
if(c.ipad||c.iphone||c.android){
var u=$(s.ueditor.getUeditor().body);
$(document.body).on("click touchstart",function(){
u.blur();
});
}
s.ueditor.ueditor.body.addEventListener("load",function(e){
"IMG"===e.target.nodeName&&s.ueditor.fireEvent("adjustheight");
},!0),d.find(".js_field").each(function(){
{
var e=$(this).attr("name");
$(this).attr("keyup");
}
$(this).on("keyup",function(){
d.find(".js_%s_error".sprintf(e)).hide();
});
}),d.find(".js_title").on("keyup",function(){
if(s.articleList){
var e=$.trim($(this).val()).html(!0),t=s.articleList&&s.articleList.getCurrentArticle();
t&&t.find(".js_appmsg_title").html(e||"标题"),d.find(".js_title_error").hide(),$("#js_draft_tips").hide();
}
}).on("focus",function(){
s.ueditor.fireEvent("title_focus"),s.ueditor.disableToolbar(),s.ueditor.teditor&&s.ueditor.teditor.disableToolbar(),
s.formItemsOpt.title.readonly||$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).on("click",function(){
s.formItemsOpt.title.readonly&&s.formItemsOpt.title.readonlyTips&&f.err(s.formItemsOpt.title.readonlyTips);
}).placeholder2();
{
var p=d.find("input.js_author");
d.find("input.js_writerid");
}
p.on("focus",function(){
s.ueditor.fireEvent("author_focus"),s.ueditor.disableToolbar(),$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).on("keyup",function(){
$("#js_draft_tips").hide();
}).on("click",function(){
var e;
if(s.articleList){
var t=s.articleList.getCurrentArticleObject();
t&&t.data&&(e=t.data.get("copyright_type"));
}
s.formItemsOpt.author.readonly&&(1===t.data.get("is_pay_subscribe")?s._showPayStatementDialog(!0):1==e?$("#js_original").find(".js_original_apply").eq(0).trigger("click"):s.formItemsOpt.author.readonlyTips&&f.err(s.formItemsOpt.author.readonlyTips));
}).placeholder2();
var h=d.find(".js_reprint_recommend_title_len");
d.find(".js_reprint_recommend_title").on("focus",function(){
s.ueditor.disableToolbar();
}).on("input propertychange",function(){
var e=this.value.length;
h.html(e),e>10?h.parent().addClass("original_primary_tips_counter_warn"):h.parent().removeClass("original_primary_tips_counter_warn");
}).placeholder2();
var g=d.find(".js_reprint_recommend_content_len"),w=d.find(".js_reprint_recommend_content"),v=function(e){
return e.replace(/\s/g,"").length;
},y=null,x=function(e){
null!==y&&(clearTimeout(y),y=null),y=setTimeout(function(){
var t=v(e);
g.html(t),t>120?g.parent().addClass("original_primary_tips_counter_warn"):g.parent().removeClass("original_primary_tips_counter_warn");
},500);
};
w.on("focus",function(){
s.ueditor.disableToolbar();
}).on("input propertychange",function(){
x(this.innerText);
}).placeholder2();
var k=function(e){
return e.replace(/\r\n/g,"\n").replace(/\n\n/g,"<div><br></div>").replace(/\n([^\n]+)\n/g,"<div>$1</div>\n").replace(/\n([^\n]+)$/,"<div>$1</div>");
},C=function(e,t,i,r){
var a=function d(e,t){
if(!(e.childNodes.length>1))return 1===e.nodeType?{
target:e.childNodes[0],
pos:t
}:{
target:e,
pos:t
};
for(var i=0,r=e.childNodes,a=r.length;a>i;i++){
var n=r[i];
if(3===n.nodeType){
if(n.textContent.length>=t)return{
target:n,
pos:t
};
t-=n.textContent.length;
}else{
if(n.innerText.length>=t)return d(n,t);
t-=n.innerText.length;
}
}
},n=a(t,i+r.replace(/\r\n/g,"\n").replace(/\n\n/g,"a").replace(/\n/g,"").length),o=n.target,s=n.pos;
e.setBaseAndExtent(o,s,o,s);
};
w[0].addEventListener("paste",function(e){
e.preventDefault();
var t=window.getSelection(),i=t.getRangeAt(0).startOffset;
t.deleteFromDocument();
var r=t.anchorNode,a=null;
if(1===r.nodeType)a=r.childNodes[0];else if(a=r,r=a.parentNode,r.classList.contains("js_reprint_recommend_content")){
var n=document.createElement("div");
r.replaceChild(n,a),n.appendChild(a),r=n;
}
var o=(e.clipboardData||window.clipboardData).getData("text");
r.innerHTML=r.innerHTML.slice(0,i)+k(o)+r.innerHTML.slice(i),w.checkPlaceholder2(),
C(t,r,i,o),x(this.innerText);
}),w[0].addEventListener("drop",function(e){
e.preventDefault();
var t=null,i=null,r=null;
if(document.caretRangeFromPoint?(t=document.caretRangeFromPoint(e.x,e.y),i=t.startContainer,
r=t.startOffset):document.caretPositionFromPoint&&(t=document.caretPositionFromPoint(e.x,e.y),
i=t.offsetNode,r=t.offset),null!==t){
var a=window.getSelection();
a.deleteFromDocument();
var n=null;
if(1===i.nodeType)n=i.childNodes[0];else if(n=i,i=n.parentNode,i.classList.contains("js_reprint_recommend_content")){
var o=document.createElement("div");
i.replaceChild(o,n),o.appendChild(n),i=o;
}
var s=e.dataTransfer.getData("text");
i.innerHTML=i.innerHTML.slice(0,r)+k(s)+i.innerHTML.slice(r),w.checkPlaceholder2(),
C(a,i,r,s),x(this.innerText);
}
}),$(d.find("#edui1_iframeholder iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).on("click",function(){
s.formItemsOpt.content.readonly&&s.formItemsOpt.content.readonlyTips&&f.err(s.formItemsOpt.content.readonlyTips);
}),d.find(".js_desc").on("keyup",function(){
if(s.articleList){
var e=$.trim($(this).val()).html(!0),t=s.articleList.getCurrentArticle(),i=t.data("article");
i.data.set("auto_gen_digest",0),t&&t.find(".appmsg_desc").html(e),d.find(".js_desc_error").hide();
}
}),d.find("textarea.js_desc[name='digest']").on("change",function(){
if(s.articleList){
var e,t=s.articleList.getCurrentArticle();
t&&(e=t.data("article"))&&e.setAutoDigest(!1);
}
});
var T=d.find(".js_auto_insert_ad");
T&&T.length>0&&T.checkbox({
multi:!0,
onChanged:function(e){
if(s.articleList){
var t=e.checkbox("value")?O.auto:O.none;
s.articleList.getCurrentArticleObject().data.getData().insert_ad_mode=t,$(".js_appmsg_item.current").data("insertadmode",t),
e.checkbox("value")?($("#js_insert_ad_area").find(".js_insert_ad_allow_click").addClass("open"),
J.fireEvent("openCpcSetting")):$("#js_insert_ad_area").find(".js_insert_ad_allow_click").removeClass("open");
}
}
});
var L=$("#js_comment_area");
if(L&&L.length>0){
var S=new j({
dom:L.find(".js_comment_allow_click"),
content:$("#js_comment_setting_popover_tpl").html(),
place:"top",
hideIfBlur:!0,
onShow:function(){
this.resetPosition();
}
});
S.hide(),$(".js_comment_setting").checkbox({
multi:!1,
onChanged:function(e){
localStorage.setItem("commentStatus_"+wx.data.user_name,JSON.stringify({
need_open_comment:d.find(".js_comment").checkbox("value")?1:0,
only_fans_can_comment:1*e.checkbox("value")||0
})),L.find(".comment_setting").html(e.data("label"));
}
}),L.on("click",".js_comment_allow_click.open",function(e){
e.preventDefault(),S.show();
});
}
d.find("#js_ad_back").checkbox({
multi:!0,
onChanged:function(e){
if(s.articleList){
var t=s.articleList.getCurrentArticleObject().data.getData(),r=e.checkbox("value");
r?(d.find(".ad_text").show(),i()):(d.find(".ad_text").html(""),t.ad_video_transition="",
t.advert_info.back_transition="",localStorage.removeItem("finalAdText"));
}
}
});
var A=d.find("#video_dot_checkbox"),D=d.find("#video_dot_area");
A.checkbox({
multi:!0,
onChanged:function(e){
if(s.articleList){
var i=e.checkbox("value");
if(i)t();else{
var r=s.articleList.getCurrentArticleObject().data.getData();
r.dot={},D.find(".js_paster_setting_text").html("");
}
}
}
}),D.on("click",".allow_click_opr",function(e){
"checked"===A.attr("checked")&&(e.preventDefault(),t());
});
var I=new j({
dom:D.find(".allow_click_opr"),
content:$("#js_video_paster_popover_tpl").html(),
className:"popover_paster_tips",
place:"top",
hideIfBlur:!0,
onShow:function(){
var t="",i=s.articleList.getCurrentArticleObject().data.getData(),r=i.share_videoinfo[0].play_length;
P>r&&!e(i)?t="从公众平台上传的1分钟以上视频可设置自定义贴片":P>r&&e(i)?t="1分钟以上的视频才能设置自定义贴片":r>=P&&!e(i)&&(t="从公众平台上传的视频才能设置自定义贴片"),
this.$pop.find(".popover-video-paster__content").text(t),this.resetPosition();
}
});
I.hide(),I.$pop.find(".popover_bar").hide(),D.find(".allow_click_opr").on("mouseover",function(){
var t=s.articleList.getCurrentArticleObject().data.getData();
(!e(t)||t.share_videoinfo[0].play_length<P)&&I.show();
}),D.find(".allow_click_opr").on("mouseleave",function(){
I.hide();
}),d.find(".ad_transition").on("click",function(e){
"checked"===d.find("#js_ad_back").attr("checked")&&(e.preventDefault(),i());
}),d.find(".js_comment").checkbox({
multi:!0,
onChanged:function(e){
var t=e.checkbox("value");
localStorage.setItem("commentStatus_"+wx.data.user_name,JSON.stringify({
need_open_comment:t?1:0,
only_fans_can_comment:1*$(".js_comment_setting:checked").val()||0
})),t?(d.find(".comment_setting").show(),d.find(".js_comment_allow_click").addClass("open"),
setTimeout(S.show.bind(S))):(d.find(".comment_setting").hide(),d.find(".js_comment_allow_click").removeClass("open"));
}
}),d.find(".js_related_video_checkbox").checkbox({
multi:!0,
onChanged:function(e){
var t=e.checkbox("value");
t?a(!0):($(".js_related_list").empty(),$(".js_related_video_checkbox").checkbox("checked",!1),
$(".js_related_video_radio_suggestion").removeClass("selected"),$(".js_related_video_radio_custom").removeClass("selected"),
$(".js_related_video_desc").data("related_video",JSON.stringify([])).html("").hide(),
$(".js_related_video_select").hide());
}
}),d.find(".js_related_video_custom").on("click",function(){
r();
}),d.find(".js_related_video_suggestion").on("click",function(){
n();
}),$(document).on("click",function(e){
var t=$(e.target);
0!=t.closest(".js_related_video_allow_click").length||0!=t.closest(".js_related_video_select").length||t.hasClass("js_related_video_checkbox_icon")||t.hasClass("js_related_video_checkbox")||$(".js_related_video_select").hide();
}),$(".js_more_video_qa").mouseenter(function(){
"none"==$(".js_related_video_select").css("display")&&$(".js_more_video_area").show();
}).mouseleave(function(){
$(".js_more_video_area").hide();
}),d.find(".js_related_video_allow_click").on("click",function(e){
e.preventDefault(),a(!1,e);
});
var N=new j({
dom:$("#js_article_url_area").find(".js_article_url_allow_click"),
content:$("#js_article_setting_popover_tpl").html(),
place:"top",
width:500,
className:"popover_article_setting_large",
hideIfBlur:!0,
buttons:[{
text:"确定",
type:"primary",
click:function(){
o(this.$pop.find(".js_url").val());
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}],
onShow:function(){
this.resetPosition();
var e="";
s.articleList&&(e=s.articleList.getCurrentArticleObject().data.get("source_url")),
$(".js_url").val(e);
var t=this.$pop.find(".jsPopoverBt").eq(0);
e?t.removeClass("btn_disabled"):t.addClass("btn_disabled");
},
onHide:function(e){
if(s.articleList&&s.articleList.getCurrentArticleObject&&(!e||e.target!=$(".js_url_checkbox")[0]&&e.target!=$(".js_url_checkbox_icon")[0]&&e.target!=$(".js_url_checkbox_icon").parent()[0])){
var t=s.articleList.getCurrentArticleObject();
if(t&&t.data){
var i=t.data.get("source_url");
d.find(".js_url_checkbox").checkbox("value")&&!i&&(d.find(".js_url_checkbox").checkbox("checked",!1),
d.find(".article_url_setting").hide(),d.find(".js_article_url_allow_click").removeClass("open"),
s.ueditor.funcPvUvReport("hidelink"),$(".js_url_error").hide(),$(".frm_msg.js_warn").hide());
}
}
}
});
N.hide(),$(".js_url").on("keyup",function(e){
13==e.keyCode&&o($(this).val());
}),$(".js_url").on("input change",function(){
var e=N.$pop.find(".jsPopoverBt").eq(0);
e.removeClass("btn_loading"),$(".js_warn.frm_msg").hide(),$(".js_url_error").hide();
var t=$.trim($(this).val());
t?e.removeClass("btn_disabled"):e.addClass("btn_disabled"),/\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/.test(t)?"none"==$(".js_url_tempkey").css("display")&&$(".js_url_tempkey").show():"none"!=$(".js_url_tempkey").css("display")&&$(".js_url_tempkey").hide(),
N.resetPosition();
}),$("#js_article_url_area").on("click",".js_article_url_allow_click.open",function(e){
e.preventDefault(),N.show();
}),d.find(".js_url_checkbox").checkbox({
multi:!0,
onChanged:function(e){
e.checkbox("value")?(d.find(".article_url_setting").show(),d.find(".js_article_url_allow_click").addClass("open"),
s.ueditor.funcPvUvReport("showlink"),setTimeout(N.show.bind(N))):(d.find(".article_url_setting").hide(),
d.find(".js_article_url_allow_click").removeClass("open"),s.ueditor.funcPvUvReport("hidelink")),
$(".js_url_error").hide(),$(".frm_msg.js_warn").hide();
}
}),s._initUploadCover(),d.find(".page_msg_link").on("click",function(){
l.fireEvent("showVideoAdBackDialog",{
scene:"ueditor"
},function(e){
var t=this;
e&&b.post({
url:"/merchant/ad_seller_manager?action=quick_open_adseller"
},function(e){
var i=e.base_resp,r=void 0===i?{}:i;
0===r.ret?(t.$tipsSuc("视频后贴广告开通成功"),$("#ad_transition_area").show(),$(".js_ad_back").checkbox("checked",!0),
$(".ad_transition_area .ad_text_setting").html(E),localStorage.setItem("adTransitionText",E),
$(".ad_transition_area .ad_text_setting").show(),$(".advert_tips").hide()):t.$tipsErr("系统错误，请稍候重试"+r.ret);
});
});
}),d.find(".ad_closed").on("click",function(){
$(".advert_tips").hide(),localStorage.setItem("hasCloseAdTips-"+wx.commonData.data.uin,!0);
}),d.find("#js_description").on("click",function(){
s.formItemsOpt.description.readonly&&s.formItemsOpt.description.readonlyTips&&f.err(s.formItemsOpt.description.readonlyTips);
}),d.find(".js_counter").each(function(){
$(this).hasClass("js_author")?s.formItemsOpt.author.counter=new _(this,{
maxLength:$(this).attr("max-length"),
useGBKLength:!0,
GBKBased:!0
}):$(this).hasClass("js_title")?s.formItemsOpt.title.counter=new _(this):new _(this,{
maxLength:$(this).attr("max-length")
});
}),s._initOriginal(),s._initPay(),s.freeUEditor=d.find(".js_fp_editor_empty_none"),
s._initBan(),s._initAd();
},
_initUploadCover:function(){
var e=this,t=e.$editor;
$("#js_selectCoverFromContent").on("click",function(){
if(e.articleList){
var t=e.articleList._getCurrentIndex(),i=e.ueditor.fireEvent("get_current_article_all_img")||[];
document.body.style.overflow="hidden";
var r=1*t===0?[{
title:"图文封面",
desc:"你的星标、常读用户将在订阅号消息列表里，看到此封面。",
ratio:2.35
},{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}]:[{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}];
l.fireEvent("showImageDialog",{
maxselect:1,
uploadscene:2,
uploadgroup:3,
desc:"大小不超过5M",
fromcontent:!0,
contentimgUrls:i,
crop:!0,
ratio:r
},function(t){
if(t){
var i=t.img,r=t.info,a="content";
e._setCropImg(i,r,a),setTimeout(function(){
$("#js_description").focus();
},1e3);
}
});
}
}),$("#js_imagedialog").on("click",function(){
if(e.articleList){
document.body.style.overflow="hidden";
var t=e.articleList._getCurrentIndex(),i=1*t===0?[{
title:"图文封面",
desc:"你的星标、常读用户将在订阅号消息列表里，看到此封面。",
ratio:2.35
},{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}]:[{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}];
l.fireEvent("showImageDialog",{
maxselect:1,
uploadscene:2,
uploadgroup:3,
desc:"大小不超过5M",
crop:!0,
ratio:i
},function(t){
if(t){
var i=t.img,r=t.info,a="lib";
e._setCropImg(i,r,a),setTimeout(function(){
$("#js_description").focus();
},1e3);
}
});
}
}),t.on("click",".js_modifyCover",function(){
if(e.articleList){
var i=e.articleList._getCurrentIndex(),r=e.articleList.getCurrentArticleObject().data,a=r.get("crop_list"),n=t.find("#js_cover_area"),o=n.find("input.js_cdn_url").val(),s=n.find("input.js_cdn_url_back").val();
s||(s=o);
var d=1*i===0?[{
title:"图文封面",
desc:"你的星标、常读用户将在订阅号消息列表里，看到此封面。",
ratio:2.35
},{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}]:[{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}],c=[];
if(a&&a.crop_list&&a.crop_list.length>0)for(var _=0,u=a.crop_list.length;u>_;_++){
var p=a.crop_list[_];
c.push({
x:p.x1,
y:p.y1,
x2:p.x2,
y2:p.y2
});
}
l.fireEvent("showImageDialog",{
src:s,
crop:!0,
step:2,
ratio:d,
cropInfo:c
},function(t){
if(t){
var i=t.img,r=t.info,a="modify";
e._setCropImg(i,r,a),setTimeout(function(){
$("#js_description").focus();
},1e3);
}
});
}
});
},
_resizeUploadCover:function(){
if(this.articleList){
var e=this.articleList._getCurrentIndex();
0===e?(this.$editor.find(".setting-group__cover").addClass("setting-group__cover_primary"),
this.$editor.find(".setting-group__cover").removeClass("setting-group__cover_minor")):(this.$editor.find(".setting-group__cover").removeClass("setting-group__cover_primary"),
this.$editor.find(".setting-group__cover").addClass("setting-group__cover_minor"));
}
},
_setCropImg:function(e,i,r){
var a=this,n=a.articleList._getCurrentIndex(),o=[],s=1*n===0?["2.35_1","1_1"]:["1_1"],d=$.map(i,function(e){
return e.info;
});
$.each(d,function(e,t){
t&&o.push({
key:s[e],
absX1:t.x,
absY1:t.y,
absX2:t.x2,
absY2:t.y2
});
}),x.getUrlMulti({
imgurl:e.url,
size:$.map(i,function(e){
return delete e.info,e;
}),
onerror:function(e){
f.err(-1==e.retcode?"请选择裁剪区域":"系统繁忙，请稍后再试"),document.body.style.overflow="visible";
},
onsuccess:function(i){
for(var s={
oriUrl:i.oriUrl,
multiSize:{}
},d=0,c=o.length;c>d;d++){
var l=o[d],_=i.result[d];
s.multiSize[l.key]={
url:_.cdnurl,
file_id:_.file_id,
absX1:l.absX1,
absY1:l.absY1,
absX2:l.absX2,
absY2:l.absY2
};
}
1*n===0?(s.url=s.multiSize["2.35_1"].url,s.file_id=s.multiSize["2.35_1"].file_id):(s.url=s.multiSize["1_1"].url,
s.file_id=s.multiSize["1_1"].file_id),a._coverChange({
file_id:e.fileId||"",
oriUrl:s.oriUrl,
url:s.url,
multiSize:s.multiSize
}),a.ueditor.fireEvent("reportAddNum",65080,0,1),"upload"===e.source&&a.ueditor.fireEvent("reportAddNum",65080,113,1),
"lib"===r?(a.ueditor.fireEvent("reportAddNum",65080,2,100),t(38,1,"trace")):"content"===r&&a.ueditor.fireEvent("reportAddNum",65080,1,100),
document.body.style.overflow="visible";
}
});
},
_getCropImgRatio:function(e){
return 0==e?16/9:1;
},
_coverChange:function(e){
var t=this.articleList.getCurrentArticleObject();
t&&t.coverChange(e);
},
_getCropImgTips:function(e){
return 0==e?"首篇图文封面图片长宽比只能为16：9，拖拽裁剪框调整展示区域":"次篇图文封面图片长宽比只能为1：1，拖拽裁剪框调整展示区域";
},
_getFrameHeight:function(){
this.ueditor&&this.ueditor.fireEvent("adjustheight");
},
handleAutoInsertCountTips:function(e,t,i){
var r=this.$editor.find(".auto_insert_count_tips");
if(e===O.auto){
var a=t?2:i?1:0;
r.html("本文最多可插入"+a+"条广告"),r.show();
}else r.hide();
},
handleAutoInsertCountTipsTask:function(){
var e=this,t=void 0,i=Date.now(),r=500;
J.addListener("keyup editAd",function(){
var a=Date.now();
r>a-i&&t?clearTimeout(t):i=a,t=setTimeout(function(){
if(e.articleList){
var t=e.articleList.getCurrentArticleObject();
if(t){
var i=t.data.getData().insert_ad_mode;
if(i===O.auto){
var r=Y(e.ueditor.getUeditor().body);
e.handleAutoInsertCountTips(i,r.secondAutoAdAvailable,r.autoAdAvailable);
}
}
}
},r);
});
},
handleCheckMusicResult:function(){
var e=this,t=function(){
e.ueditor.fireEvent("dbcache_get",{
cacheKey:K.masssendCacheKey,
callback:function(t){
if(t&&t.cacheValue){
e.ueditor.fireEvent("dbcache_remove",{
cacheKey:K.masssendCacheKey
});
var i=t.cacheValue;
if(i.errorData&&i.errorData.length>0){
var r=i.appmsgid;
if(!r||wx.cgiData.app_id+""!=r+"")return;
var a=i.type||"music";
e.ueditor.fireEvent(a+"CheckResultFocus",{
focusData:i.focusData,
errorData:i.errorData
});
}
}
}
});
};
window.musicCheckResultFocus=function(){
t();
},t();
},
_reportAppmsg:function(){
z.saveSpeeds("appmsg",[{
sid:21,
time:window._points[10]-window._points[5]||0
},{
sid:32,
time:window._points[7]-window._points[6]||0
},{
sid:33,
time:window._points[9]-window._points[8]||0
}])&&z.send();
var e=[{
id:"122325",
key:"0",
len:"1"
},{
id:"122325",
key:"1",
len:"1"
}];
(wx.cgiData.can_use_voice||wx.cgiData.qqmusic_flag)&&e.push({
id:"122325",
key:"3",
len:"1"
}),wx.cgiData.can_use_vote&&e.push({
id:"122325",
key:"5",
len:"1"
}),wx.commonData&&wx.commonData.acl&&wx.commonData.acl.msg_acl.can_use_qa&&e.push({
id:"122325",
key:"7",
len:"1"
}),wx.cgiData.can_use_card&&e.push({
id:"122325",
key:"9",
len:"1"
}),wx.cgiData.can_see_ad&&e.push({
id:"122325",
key:"11",
len:"1"
}),wx.cgiData.can_use_weapp_card&&e.push({
id:"122325",
key:"13",
len:"1"
}),wx.cgiData.can_use_cps&&e.push({
id:"122325",
key:"15",
len:"1"
}),e.push({
id:"122325",
key:"17",
len:"1"
}),wx.cgiData.can_see_ad&&wx.cgiData.can_use_cps&&wx.cgiData.can_use_card&&e.push({
id:"122443",
key:"14",
len:"1"
}),(wx.cgiData.can_see_ad&&wx.cgiData.can_use_cps||wx.cgiData.can_see_ad&&wx.cgiData.can_use_card||wx.cgiData.can_use_cps&&wx.cgiData.can_use_card)&&e.push({
id:"122443",
key:"15",
len:"1"
}),this.ueditor.fireEvent("reportAddNum",e);
},
_initUEditor:function(e){
var t=this;
if(window._points&&(window._points[9]=+new Date),z.mark("appmsg","web2Use","start"),
"function"!=typeof window.__MpEditor)return void setTimeout(function(){
t._initUEditor(e);
},100);
z.mark("appmsg","web2Use","end"),z.saveSpeeds("appmsg","web2Use",34)&&z.send(),t._initFormItemsOpt();
var i=k.getEditorPluginsObject({
can_use_txvideo:wx.cgiData.can_use_txvideo,
show_share_dialog:wx.cgiData.can_pub_video,
can_use_vote:wx.cgiData.can_use_vote,
can_use_card:wx.cgiData.can_use_card,
biz_uin:F.biz_uin,
can_see_ad:wx.cgiData.can_see_ad,
has_ad:wx.cgiData.has_ad,
can_use_voice:wx.cgiData.can_use_voice,
qqmusic_flag:wx.cgiData.qqmusic_flag,
can_use_weapp_card:wx.cgiData.can_use_weapp_card,
can_use_hyperlink:wx.cgiData.can_use_hyperlink,
can_use_appmsg_outer_url:wx.cgiData.can_use_appmsg_outer_url,
token:wx.data.t,
appmsg_template_cnt:wx.cgiData.appmsg_template_cnt,
can_see_product:1===wx.cgiData.can_see_product?!0:!1,
can_use_smart:1===wx.cgiData.can_use_smart?!0:!1,
can_use_product:1===wx.cgiData.can_use_product?!0:!1,
can_use_wxopen_link:1===wx.cgiData.can_use_wxopen_link?!0:!1,
can_use_cps:1===wx.cgiData.can_use_cps?!0:!1,
cpsTipStatus:{
choiceNoCommissionNeedTip:!0
},
red_dot_flag:wx.cgiData.red_dot_flag,
can_use_redpacketcover:1===wx.cgiData.can_use_red_packet_cover?!0:!1
}),r=["undo","redo","|","removeformat","formatmatch","|","fontsize","bold","italic","underline","strikethrough","forecolor","backcolor","|","justify","indent","justifyindent","rowspacingtop","rowspacingbottom","lineheight","letterspacing","insertlist","imagefloat","|","inserttable","blockquote","horizontal","insertcode","mpemotion","more"];
i.push(new C({
container:"#js_editor_inserttemplate",
token:wx.data.t
})),i.push(new T),z.mark("appmsg","initEditor","start"),J=t.ueditor=new window.__MpEditor({
maxArticleNum:8,
app_id:(wx.cgiData.app_id||Math.random())+"",
needCheckText:!0,
wordCount:!0,
multipleTab:!0,
plugins:i,
initialFrameWidth:2e3,
autoHeightEnabled:!0,
topOffset:0,
is_illegal:1*t.appmsg_data.is_illegal||0,
toolbars:[r],
onReady:function(){
z.mark("appmsg","initEditor","end"),z.saveSpeeds("appmsg","initEditor",35)&&z.send(),
t._initEditArea(),z.mark("appmsg","initArticleList","start"),t.articleList=new A($.extend({
maxNum:8,
ueditor:t.ueditor,
freeUEditor:t.freeUEditor,
is_illegal:1*t.appmsg_data.is_illegal||0,
is_rumor:1*t.appmsg_data.is_rumor||0,
formItemsOpt:t.formItemsOpt,
is_malicious:1*t.appmsg_data.is_malicious||0
},t.opt)),$("#editor_pannel").show(),$(t.ueditor.getDom("_iframeholder")).show(),
$("#article_setting_area").show(),$("#history_bt").show(),$("#bottom_main").show(),
$(".edui-combox.js_toolbar_more").find(".edui-arrow").css("cssText","display:none!important"),
$(".edui-combox.js_toolbar_more").css("cssText","display:none!important"),$("#editor_pannel").css("minHeight",$(window).height()-$("#header").height()),
t._bindEvent(),t._initRecentList(),window._points&&(window._points[10]=+new Date),
z.mark("appmsg","initArticleList","end"),z.saveSpeeds("appmsg","initArticleList",27)&&z.send(),
t._reportAppmsg(),t.handleCheckMusicResult();
}
}),J.render("js_editor"),J.addListener("is_use_editor",function(){
return!$("#edui1_iframeholder").is(":hidden");
}),J.addListener("begincatchimage",function(){
f.suc("内容已上传完成");
}),J.addListener("after_change_article",function(e,i){
K.canShowArticlePanel=!1,K.$articlePanel&&K.$articlePanel.hide(),"replace"===i?t.ueditor.fireEvent("reportAddNum",65080,121,1):"add"===i&&t.ueditor.fireEvent("reportAddNum",65080,122,1),
setTimeout(function(){
K.canShowArticlePanel=!0;
},500);
}),J.addListener("showEditorMsgTips",function(e,i){
$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text(i.msg);
}),J.addListener("catchremotesuccess",function(e,i,r,a){
J.fireEvent("update_remote_img",{
article:i.article,
remoteType:"success",
uid:i.uid,
format:a,
img_url:r
});
var n=$(J.getDocument()).find(".js_catchremoteimageerror").length;
0==n?$(".js_catch_tips",t.$editor).hide():$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text("有%s张图片上传失败".sprintf(n));
}),J.addListener("catchremoteerror",function(e,i,r){
if(i&&J.fireEvent("update_remote_img",{
article:i.article,
remoteType:"error",
uid:i.uid,
img_url:i.defaultRemoteImg
}),r)$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text(r);else{
var a=$(J.getDocument()).find(".js_catchremoteimageerror").length;
0==a?$(".js_catch_tips",t.$editor).hide():$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text("有%s张图片上传失败".sprintf(a));
}
}),J.addListener("scrollIntoView",function(e,t,i){
var r=this;
K.scrollIntoViewid&&clearTimeout(K.scrollIntoViewid),K.scrollIntoViewid=setTimeout(function(){
var e=J.getDomUtils();
if(t=$(t)[0],0==K.scrollIntoViewCount&&t&&e.inDoc(t,t.ownerDocument)){
var a=null;
if(3===t.nodeType){
var n=r.selection.getRange(),o=n.createBookmark(),s=t.ownerDocument.createElement("span");
t.parentNode.insertBefore(s,t),s.appendChild(t),a=$(s).offset().top,s.parentNode.insertBefore(t,s),
s.parentNode.removeChild(s),n.moveToBookmark(o).select(!0);
}else a=$(t).offset().top;
K.scrollIntoViewCount=2,$("html, body").animate({
scrollTop:a-(i||50)
},null,null,function(){
K.scrollIntoViewCount--;
});
}
},100);
}),J.addListener("showErrMsg",function(e,t,i){
$(t).show().find(".js_msg_content").text(i);
}),J.addListener("hideAllErrMsg",function(){
t.$editor.find(".js_error_msg,.js_tip_mask_msg").hide(),t.$editor.find(".js_tip_mask").removeClass("error_mask"),
$("#js_labels_error").hide();
}),J.addListener("keyup",function(){
$(".js_content_error",t.$editor).hide(),$(".page_msg.js_warn").hide(),$("#js_draft_tips").hide();
}),J.addListener("aftersetcontent",function(){
var e=t.articleList&&t.articleList.getCurrentArticleObject();
if(e){
var i=e.data;
i.get("is_pay_subscribe")&&e.setPayPopup({
mode:"init"
});
}
}),J.addListener("afterAdjustHeightFnExcute",function(){
$(window).trigger("scroll",!1);
var e=t.articleList&&t.articleList.getCurrentArticleObject(),i=e.data;
i.get("is_pay_subscribe")&&e.setPayPopup({
mode:"update"
});
}),J.addListener("focus",function(){
$(".page_msg.js_warn").hide(),J.enableToolbar();
}),J.addListener("renderReadOnly",function(e,i){
0==Z?t._renderReadOnly(i):(G=!0,Q=i);
}),J.addListener("isReadOnly",function(){
return K.isReadOnly;
}),J.addListener("renderEditorByType",function(e,i,r){
var a=i,n="number"==typeof i?i:a.type;
t._renderEditorByType(n,r,a);
}),J.addListener("setTitleStatus",function(e,i){
t._setTitleStatus(i);
}),J.addListener("setAuthorStatus",function(e,i){
t._setAuthorStatus(i);
}),J.addListener("switchContentType",function(e,i){
t._switchContentType(i);
}),J.addListener("setToolBarStatus",function(e,i){
t._setToolBarStatus(i);
}),J.addListener("setArticleUrlStatus",function(e,i){
t._setArticleUrlStatus(i);
}),J.addListener("setAdInsertStatus",function(e,i){
t._setAdInsertStatus(i);
}),J.addListener("setMoreReadStatus",function(e,i){
t._setMoreReadStatus(i);
}),J.addListener("setCommentStatus",function(e,i){
t._setCommentStatus(i);
}),J.addListener("setOriginalStatus",function(e,i){
t._setOriginalStatus(i);
}),J.addListener("setCoverStatus",function(e,i){
t._setCoverStatus(i);
}),J.addListener("setDescriptionStatus",function(e,i){
t._setDescriptionStatus(i);
}),J.addListener("setFoldStatus",function(e,i,r){
t._setFoldStatus(i,r);
}),J.addListener("setSaveBtnStatus",function(e,i){
t._setSaveBtnStatus(i);
}),J.addListener("setCurRenderType",function(e,i){
t._setCurRenderType(i);
}),J.addListener("afterArticleSelect",function(){
$(window).trigger("scroll",!1),t._resizeUploadCover();
}),J.addListener("showVideoModifyDialog",function(){
v.show({
width:600,
type:"info",
className:"media_attr_edit_dialog dialog_weui_desktop",
msg:"群发时可直接修改标题和介绍语，群发成功后会覆盖素材库原有标题或介绍语。",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
}),J.addListener("setArticleAdMode",function(e,i){
i=1===K.curRenderType?i:O.none,setTimeout(function(){
if(t.articleList){
var e=t.articleList.getCurrentArticleObject().data.getData();
e.insert_ad_mode=i,$(".js_appmsg_item.current").data("insertadmode",i);
var r=t.$editor.find(".js_auto_insert_ad");
i==O.op?(r.checkbox().checked(!1),r.checkbox().disabled(!0),r.parent().find(".js_insert_ad_allow_click").removeClass("open"),
r.parent().find(".insert_ad_tips").show()):(r.checkbox().checked(i!=O.none),r.checkbox().disabled(!1),
r.parent().find(".js_insert_ad_allow_click").addClass("open"),r.parent().find(".insert_ad_tips").hide()),
t.handleAutoInsertCountTips(i,e.secondAutoAdAvailable,e.autoAdAvailable);
}
},50);
}),t.handleAutoInsertCountTipsTask(),document.addEventListener("EditorCpcDel",function(){
var e=t.$editor.find(".js_auto_insert_ad");
e.checkbox().checked(!1),e.checkbox().disabled(!1),e.parent().find(".js_insert_ad_allow_click").removeClass("open"),
e.parent().find(".insert_ad_tips").hide();
}),J.addListener("setArticleAdCategoriesList",function(e,i){
if("string"==typeof i)try{
i=JSON.parse(i);
}catch(r){}
t.articleList&&setTimeout(function(){
t.articleList.getCurrentArticleObject().data.getData().categories_list=i,$(".js_appmsg_item.current").data("categorieslist",i.join("|"));
},50);
}),J.addListener("updateTitleInputCounter",function(e,i){
t.formItemsOpt.title.counter.updateMaxLength(i);
}),"function"==typeof e.callback&&e.callback();
},
renderRewardSwtich:function(e){
var t=0,i=!1,r=!1;
e.authorTotalCount?e.writerid?1*e.can_open_reward?(1*e.can_reward?(i=!0,t=3):(i=!1,
t=4),r=!1):(r=!0,i=!1,t=2):(r=!1,i=!1,t=1):(r=!0,i=!1,t=wx.cgiData.totalInviteAuthorCnt>0&&wx.cgiData.inviteAuthorCnt>0?5:6),
e.$tipsDom.html(wx.T(s,{
inviteAuthorLink:e.inviteAuthorLink,
type:t,
author_username:e.author_username,
author:e.author,
author_encode:encodeURIComponent(e.author)
})).show(),e.$inputDom&&e.$inputDom.length&&(e.$inputDom.prop("disabled",r).prop("checked",i),
e.updateReprint&&this.updateReprintSwitchByReward({
multiMediaText:e.multiMediaText,
rewardChecked:i,
$reprintSwitchDom:e.$reprintSwitchDom,
$reprintTipDom:e.$reprintTipDom,
reprintOptions:e.reprintOptions
}),e.$rewardReplyContainer&&this.updateReplyByReward({
$rewardReplyContainer:e.$rewardReplyContainer,
author:e.author,
rewardChecked:i,
reward_reply_id:e.reward_reply_id||"",
$dom:$(".original_dialog")
})),e.$authorityContainer&&e.$customerauthorContainer&&this.showOriginInputDom(t>=2&&4>=t?{
$authorityLabel:e.$authorityLabel,
$customerauthorLabel:e.$customerauthorLabel,
$authorityContainer:e.$authorityContainer,
$customerauthorContainer:e.$customerauthorContainer,
$authorityTips:e.$authorityTips,
showAuthority:!0,
author:e.author,
writerid:e.writerid
}:{
$authorityLabel:e.$authorityLabel,
$customerauthorLabel:e.$customerauthorLabel,
$authorityContainer:e.$authorityContainer,
$customerauthorContainer:e.$customerauthorContainer,
$authorityTips:e.$authorityTips,
showAuthority:!1,
author:e.author,
writerid:e.writerid,
trigger:!0
}),a.init({
$container:e.$tipsDom
});
},
updateReprintSwitchByReward:function(e){
e.multiMediaText||(e.rewardChecked?(e.$reprintSwitchDom.prop("disabled",!1),e.$reprintTipDom.text("开启后，所有公众号都可以转载此文章。")):(e.$reprintSwitchDom.prop("disabled",!0).prop("checked",!1),
e.$reprintTipDom.text("开启赞赏之后才能开启开放转载。")));
},
updateReplyByReward:function(e){
if(e.rewardChecked&&e.author){
e.$rewardReplyContainer.show();
var t=this,i=e.$rewardReplyContainer.find(".js_reply_list_container");
t.getRewardReplyList({
$dom:e.$rewardReplyContainer,
replyId:e.reward_reply_id
},function(r){
function a(e){
return e=e||"",e.emoji();
}
var n=e.$rewardReplyContainer.find(".js_not_reply_tips"),o=e.$rewardReplyContainer.find(".js_has_reply_tips"),s=e.$rewardReplyContainer.find(".js_choose_reply_tips");
if(!r||0===r.length)return n.show(),o.hide(),void s.hide();
e.reward_reply_id?(n.hide(),o.show(),s.hide()):(n.hide(),o.hide(),s.show());
var d=!1,c=e.$dom;
r&&r.forEach(function(t){
t.extrClass="",t.reply_id==e.reward_reply_id&&(t.extrClass="selected",d=!0),2!==t.type||t.text||(t.text="图片："+t.title),
t.text=t.text.replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\'/g,""),t.text=a(t.text).replace(/\n/g,"<br>");
});
var l=c.data("author_info");
e.reward_reply_id||d||!K.isRewardSwitched||(r[0].extrClass="selected",l.reward_reply_id=r[0].reply_id,
t.ueditor.fireEvent("changeAuthorInfo",l,!0),n.hide(),o.show(),s.hide()),i.html(template.render("tpl_reward_reply_list",{
list:r
})),i.show();
});
}else e.$rewardReplyContainer.hide();
},
getRewardReplyList:function(e,t){
var i=e.$dom,r=e.replyId,a=i.find(".js_reply_list_loading"),n=i.find(".js_reply_list_container");
a.show(),n.hide(),n.html(""),b.get({
url:"/merchant/reward?action=getautoreply&ignore_del_reply_id="+r,
data:{}
},function(e){
e.base_resp&&0===e.base_resp.ret?(t(e.reply_infos),a.hide()):(b.handleRet(e,{
msg:"赞赏回复拉取失败，请稍后重试",
ret:e.base_resp.ret
}),t(null),a.hide());
},function(e){
b.handleRet(e,{
msg:"赞赏回复拉取失败，请稍后重试"
});
});
},
showOriginInputDom:function(e){
if(e.showAuthority){
e.$authorityContainer.show(),e.$customerauthorContainer.hide(),e.$authorityLabel.show(),
e.$customerauthorLabel.hide(),e.writerid?(n.highlineAuthor({
$highline:e.$authorityContainer,
highlineClass:"author_active"
}),e.$authorityTips.show()):(n.resetHighlineAuthor({
$highline:e.$authorityContainer,
highlineClass:"author_active"
}),e.$authorityTips.hide());
var t=e.$authorityContainer.find("input.js_author");
t.val(e.author),e.trigger&&t.trigger("keyup",{
keyCode:13
});
}else{
e.$authorityTips.hide(),e.$authorityContainer.hide(),e.$customerauthorContainer.show(),
e.$authorityLabel.hide(),e.$customerauthorLabel.show(),n.resetHighlineAuthor({
$highline:e.$authorityContainer,
highlineClass:"author_active"
});
var i=e.$customerauthorContainer.find("input.js_author");
i.val(e.author),e.trigger&&i.trigger("keyup");
}
},
_initOriginal:function(){
var e,t=this,i=t.$editor,a=0,o=!1;
t.rencentArticleType=[{
name:"全部类别",
data:U
}],b.get({
url:"/cgi-bin/operate_appmsg?t=ajax-response&sub=get_recently_article_type",
data:{}
},function(e){
if(e&&e.items&&e.items.length){
var i={
name:"最近使用",
data:[]
};
$.each(e.items,function(e,t){
i.data.push({
name:t.article_type,
value:t.article_type,
disabled:!1
});
}),t.rencentArticleType.unshift(i);
}
}),$(".js_original_apply").on("click",function(s){
function c(){
2==h&&(o=!1,l(s));
}
function l(i){
function o(e){
q=e,at.html(template.render("js_recently_article_whitelist_tpl",{
list:"recent"===e?V:z,
type:e
})).show();
}
function s(){
at.hide();
}
function c(t){
if(t){
var i=Number(C.prop("checked"));
$.each(U,function(e,t){
t.can_reward=i,t.title=x(t);
});
}
$("#js_article_whitelist_added").html(template.render("js_article_whitelist_added_tpl",{
list:U
})).show(),U.length?(ot.parent().show(),ot.prop("checked")?e.find(".js_btn_p:eq(2)").enable():e.find(".js_btn_p:eq(2)").disable()):(ot.parent().hide(),
e.find(".js_btn_p:eq(2)").enable());
}
function l(e){
return U.length>0&&$.each(e.list,function(t,i){
$.each(U,function(e,t){
h(i,t.openid);
}),"function"==typeof e.cb&&e.cb(i);
}),e.list;
}
function h(e,t){
e.openid===t&&(e.isSelect=!0);
}
function v(e){
G||(G=!0,b.post({
url:"/cgi-bin/appmsgcopyright?action=searchacct",
data:{
username:e
},
complete:function(){
G=!1;
}
},function(e){
e.base_resp&&0==e.base_resp.ret&&e.search_list?(z=l({
list:e.search_list,
cb:function(e){
e.pic_url&&(e.pic_url=e.pic_url.endsWith("/0")?e.pic_url:e.pic_url+"/0");
}
}),o("search")):f.err(e.base_resp&&200013==e.base_resp.ret?"操作频繁，请稍后重试":"系统错误，请稍候再试");
}));
}
function y(e){
e.direction=e.direction||"bottom",e.offset=e.offset||0;
var t=e.target.getBoundingClientRect()[e.direction],i=e.container.getBoundingClientRect()[e.direction];
switch(e.direction){
case"top":
case"left":
if(!e.isForce&&t>i)return;
break;

case"bottom":
case"right":
if(!e.isForce&&i>t)return;
}
e.container[["top","bottom"].indexOf(e.direction)>-1?"scrollTop":"scrollLeft"]+=t-i+e.offset;
}
function x(e){
var t=[];
return e.can_modify&&t.push("可修改文章"),e.can_hide_source&&t.push("不显示转载来源"),t.join("，");
}
var k,C,T,S,A,D,I,O,E,R,P,M,N=$("#js_original"),B=wx.cgiData.inviteAuthorCnt>0?wx.url("/cgi-bin/safecenterstatus?action=inviteauthor"):"",q="",U=[],z=[],V=[],W="",H=t.articleList&&t.articleList.getCurrentArticle().data("article").flush().getData(),Y=H&&H.content?H.content:"";
W=r(Y,H),b.get({
url:"/cgi-bin/appmsgcopyright?action=get_recently_add"
},function(e){
e.base_resp&&0==e.base_resp.ret&&e.white_list&&(V=e.white_list,V=l({
list:V
}));
}),N.find(".js_whitelist .js_whitelist_item").each(function(e,t){
var i=$(t);
U.push({
nickname:i.data("nickname"),
title:i.attr("title"),
openid:i.data("openid"),
wx_name:i.data("wx_name"),
username:i.data("username"),
avatar:i.data("avatar"),
can_modify:1*i.data("can_modify"),
can_hide_source:1*i.data("can_hide_source"),
can_reward:1*i.data("can_reward")
});
});
var J=JSON.parse(localStorage.getItem("reprintOptions")),X="none"!==$("#js_original .js_original_type")[0].style.display;
null===J&&(J={
canReprint:!0,
canModify:!1
},localStorage.setItem("reprintOptions",JSON.stringify(J)));
var G=!1,Q=$("#tpl_original").popup({
title:"声明原创",
width:960,
className:"simple align_edge original_dialog",
data:{
author:w||"",
frm:N.find(".js_reprint_frm").val()||1,
can_use_appmsg_source_url:F.can_use_appmsg_source_url,
biz_can_use_reward:1*F.can_use_reward,
canReprint:X?J.canReprint:"开启"===N.find(".js_can_reprint").text(),
canModify:X?J.canModify:"开启"===N.find(".js_can_modify").text(),
canUseOriginalReprint:F.can_use_original_reprint,
multiMediaText:W,
whitelist:U
},
buttons:[{
text:"下一步",
type:"primary",
click:function(){
K.isRewardSwitched=!1,e.find(".js_step_panel").hide().eq(1).show();
var i=new p({
container:"#js_original_article_type",
label:"请选择",
data:t.rencentArticleType,
show:function(e){
y({
target:e.find(".jsDropdownList > div")[0],
container:nt,
offset:10
});
},
callback:function(t){
t&&e.find(".js_article_type_error").hide();
}
});
i.selected(N.find(".js_classify").text()),U.length&&c(),e.find(".js_btn_p").eq(0).hide(),
e.find(".js_btn_p").eq(1).show(),e.find(".js_btn_p").eq(2).show(),ot.parent()[$("#js_article_whitelist_added").children().length?"show":"hide"](),
dt.setStep(2);
}
},{
text:"上一步",
click:function(){
e.find(".js_step_panel").hide().eq(0).show(),e.find(".js_btn_p").eq(0).show(),e.find(".js_btn_p").eq(1).hide(),
e.find(".js_btn_p").eq(2).hide(),ot.parent().hide(),dt.setStep(1);
}
},{
text:"确定",
type:"primary",
click:function(){
if(t._checkOriginal(e)){
$(".js_original_type").hide().eq(1).show(),$(".js_original_content").show(),$.each(U,function(e,t){
t.title=x(t);
}),$("#js_original").find(".js_whitelist").html(template.render("tpl_whitelist",{
list:U
})),U&&U.length?$("#js_original").find(".js_original_item").show():$("#js_original").find(".js_original_item").hide();
var i=e.data("author_info");
C.prop("checked")?$("#js_original").find(".js_reward_tips").text("已开启"):($("#js_original").find(".js_reward_tips").text("未开启"),
i.writerid="",i.author_username="",i.author_status=1,i.can_open_reward=0,i.can_reward=0,
i.reward_reply_id=""),m.setAuthorInfo({
copyright_type:1,
writerid:i.writerid||"",
author_username:i.author_username||"",
author:i.author,
author_status:1*i.author_status,
can_open_reward:1*i.can_open_reward,
can_reward:1*i.can_open_reward&&C.prop("checked")?1:0,
reward_reply_id:i.reward_reply_id||""
}),L.set(K.originalProtoKey,"1"),K.isRewardSwitched=!1,this.remove();
}
}
}],
onHide:function(){
this.remove();
}
});
e=Q.popup("get");
var Z=Q.popup("mask"),et=e.find(".js_add_whitelist_btn"),tt=e.find(".js_search_wrap"),it=$("#js_article_whitelist_setting_row"),rt=$("#js_article_whitelist_search"),at=$("#js_article_whitelist_search_result"),nt=document.getElementById("js_original_edit_box"),ot=e.find(".js_agree");
e.find(".js_btn_p").eq(1).hide(),e.find(".js_btn_p").eq(2).hide(),k=e.find(".js_reward_tips"),
C=e.find("input.js_reward_switch"),T=e.find(".js_authority_label"),S=e.find(".js_customerauthor_label"),
I=e.find(".js_authority_container"),A=e.find(".js_search_del_btn"),D=e.find(".js_search_btn"),
O=I.find("input"),E=e.find(".js_customerauthor_container"),R=E.find("input"),P=e.find(".js_authority_tips"),
M=e.find(".js_reward_reply_box");
var st=function(i,r){
if(i.author=$.trim(i.author||""),e.data("author_info",i),r!==!0){
var n={
$authorityLabel:T,
$customerauthorLabel:S,
$authorityContainer:I,
$customerauthorContainer:E,
$authorityTips:P,
$tipsDom:k,
$inputDom:C,
authorTotalCount:a,
author:i.author,
writerid:i.writerid,
author_username:i.author_username,
can_open_reward:i.can_open_reward,
can_reward:i.can_reward,
reward_reply_id:i.reward_reply_id,
inviteAuthorLink:B,
multiMediaText:W,
$reprintSwitchDom:$("#js_enable_reprint"),
$reprintTipDom:e.find(".js_reprint_tip"),
reprintOptions:J,
updateReprint:i.updateReprint,
$rewardReplyContainer:M
};
t.renderRewardSwtich(n);
}
};
st({
author:w,
writerid:g.writerid,
author_username:g.author_username,
can_open_reward:g.can_open_reward,
author_status:g.author_status,
can_reward:g.copyright_type?g.can_reward:1,
reward_reply_id:g.reward_reply_id,
updateReprint:!0
}),t.ueditor.addListener("changeAuthorInfo",function(e,t,i){
st(t,i);
});
var dt=new u({
container:e.find(".js_step"),
selected:1,
names:["1 须知","2 原创声明信息"]
});
e.find(".js_btn_p").eq(0).disable(),e.find("#js_copyright_agree").checkbox({
onChanged:function(){
e.find("#js_copyright_agree").prop("checked")?e.find(".js_btn_p").enable():e.find(".js_btn_p").disable();
}
}),e.find(".js_reprint_frm").checkbox({
multi:!1
}),n.initAuthorSearchList({
$inputContainer:O,
$listContainer:e.find(".js_author_list"),
$highline:I,
highlineClass:"author_active",
inviteAuthorLink:B,
stateChange:function(t){
C.prop("checked")&&(O.val()?A.show():A.hide(),t?(st({
author:t.nickname,
writerid:t.writerid,
author_username:t.username,
can_open_reward:1*t.can_reward,
author_status:1*t.author_status,
can_reward:1*t.can_reward?1:0
}),e.find(".js_authority_tips").show(),d.setHistory({
author:[{
writerid:t.writerid
}]
})):(st({
author:"",
writerid:"",
author_username:"",
can_open_reward:0,
author_status:1,
can_reward:0,
reward_reply_id:""
},!0),e.find(".js_reward_reply_box").hide(),e.find(".js_authority_tips").hide()),
e.find(".js_author_error").hide());
}
}),C.on("change",function(){
var i,r,a=$(this).prop("checked");
a?(i=R.val(),r=!0,K.isRewardSwitched=!0):(i=O.val(),r=!1,K.isRewardSwitched=!1),
t.updateReprintSwitchByReward({
multiMediaText:W,
rewardChecked:a,
$reprintSwitchDom:$("#js_enable_reprint"),
$reprintTipDom:e.find(".js_reprint_tip"),
reprintOptions:J
}),t.updateReplyByReward({
$rewardReplyContainer:M,
rewardChecked:a,
author:i,
reward_reply_id:g.reward_reply_id||"",
$dom:e
}),t.showOriginInputDom({
$authorityContainer:I,
$customerauthorContainer:E,
$authorityTips:P,
showAuthority:r,
$authorityLabel:T,
$customerauthorLabel:S,
author:i,
trigger:!0
});
var n={
author:i,
writerid:"",
author_username:"",
can_open_reward:0,
can_reward:0,
author_status:1,
updateReprint:!0
};
st(n,!0),e.find(".js_author_error").hide(),e.find(".js_authority_tips").hide(),c(!0);
});
var ct=L.get(K.originalProtoKey,"1");
"1"==ct&&(e.find("#js_copyright_agree").trigger("click"),e.find(".js_btn").eq(0).trigger("click")),
new _(R,{
maxLength:R.attr("max-length"),
useGBKLength:!0,
GBKBased:!0
}),R.on("keyup",function(){
var t={
author:$(this).val()||"",
writerid:"",
author_username:"",
can_open_reward:0,
can_reward:0,
author_status:1
};
st(t,!0),e.find(".js_author_error").hide();
}),A.on("click",function(){
n.removeAuthorListDom(),O.val("").trigger("keyup"),A.hide();
}),D.on("click",function(){
O.trigger("keyup",{
keyCode:13
});
});
var lt,_t=function(){
var e=$(this);
if(e){
e.find(".js_reply_item_inner").addClass("hover");
var t=e.find(".js_reply_text");
t[0]&&t[0].scrollHeight>t[0].clientHeight&&(lt=new j({
dom:t,
content:t.html(),
place:"top",
hideIfBlur:!0,
onShow:function(){
this.resetPosition();
},
onHide:function(){}
}),lt.hide(),setTimeout(function(){
lt.show();
},500));
}
},ut=function(){
var e=$(this);
e&&(e.find(".js_reply_item_inner").removeClass("hover"),lt&&lt.remove());
},pt=M.find(".js_reply_list_container"),ht=M.find(".js_has_reply_tips"),mt=M.find(".js_choose_reply_tips");
pt.on("mouseenter",".js_reply_item",_t),pt.on("mouseleave",".js_reply_item",ut),
pt.on("click",".js_reply_item",function(){
var t=$(this),i=e.data("author_info");
if(t.hasClass("selected"))t.removeClass("selected"),t.find(".js_reply_item_inner").removeClass("hover"),
i.reward_reply_id="",st(i,!0),mt.show(),ht.hide();else{
$(".js_reply_item").removeClass("selected"),t.addClass("selected");
var r=t.data("replyid");
i.reward_reply_id=r,st(i,!0),mt.hide(),ht.show();
}
}),e.find(".js_article_whitelist").hover(function(){
new j({
dom:this,
content:"通过添加白名单，授权某些公众帐号可以转载文章，并允许修改或不显示转载来源，在文章群发后生效。如果文章开启了赞赏，转载文也会支持赞赏作者。",
isToggle:!0
});
});
var ft=$(i.target);
if(ft.hasClass("js_edit_whitelist")||ft.hasClass("js_edit_whitelist_btn")){
et.remove(),tt.show();
var gt=it[0].getBoundingClientRect().top-30,wt=nt.getBoundingClientRect().top;
nt.scrollTop+=gt-wt;
}
et.on("click",function(){
et.remove(),tt.show();
}),rt.on("focus",function(){
""===$.trim(rt.val())&&o("recent"),y({
target:at[0],
container:nt,
offset:10
});
}),rt.on("keyup",function(e){
var t=$.trim(e.target.value);
""===t?($("#js_article_whitelist_clear").hide(),o("recent")):($("#js_article_whitelist_clear").show(),
s(),13===e.keyCode&&v(t)),y({
target:at[0],
container:nt,
offset:10
});
}),$("#js_article_whitelist_clear").click(function(){
rt.val(""),$("#js_article_whitelist_clear").hide();
}),e.find(".js_search").click(function(){
var e=$.trim(rt.val());
""!==e&&v(e);
}),at.click(function(e){
for(var t=$(e.target);"js_article_whitelist_search_result"!==t.attr("id")&&!t.hasClass("js_add");)t=t.parent();
if(t.hasClass("js_add")){
var i={
nickname:t.data("nickname"),
openid:t.data("openid"),
wx_name:t.data("wx_name"),
username:t.data("username"),
avatar:t.data("avatar"),
can_modify:1,
can_reward:Number(C.prop("checked")),
can_hide_source:0
};
return i.title=x(i),U.push(i),("recent"===q?V:z).forEach(function(e){
h(e,t.data("openid"));
}),o(q),c(),!1;
}
}),$("#js_article_whitelist_added").click(function(e){
var t=$(e.target);
if(t.hasClass("js_remove"))U.splice(Number(t.data("index")),1),c(),V.forEach(function(e){
e.openid==t.data("openid")&&delete e.isSelect;
}),o("recent");else if(t.hasClass("js_edit_right")){
var i=t.siblings(".js_title_wrap"),r=i.find(".js_title"),a=new j({
dom:i,
container:i,
content:template.render("js_article_whitelist_edit_right_tpl",{
canReward:1==t.data("can_reward"),
canHideSource:1==t.data("can_hide_source")
}),
hideIfBlur:!0,
onShow:function(){
this.resetPosition();
},
onHide:function(){
this.remove();
}
}),n=a.getDom();
n.find(".js_can_hide_source").on("change",function(e){
var i=$(e.target),n=i.prop("checked");
n?i.parent().addClass("selected"):i.parent().removeClass("selected");
var o=Number(t.data("index")),s=U[o];
s.can_hide_source=Number(n),s.title=x(s),r.html(s.title),t.data("can_hide_source",s.can_hide_source),
a.remove();
}),y({
target:n[0],
container:nt
});
}
}),ot.on("change",function(t){
var i=$(t.target),r=i.prop("checked");
r?(i.parent().addClass("selected"),e.find(".js_btn_p:eq(2)").enable()):(i.parent().removeClass("selected"),
e.find(".js_btn_p:eq(2)").disable());
}),e.click(function(e){
$(e.target).parents(".js_search_wrap").length||s();
}),$(Z.find("iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).click(s);
}
if(!o){
var h=0,m=t.articleList&&t.articleList.getCurrentArticleObject(),g=m.getAuthorInfo(),w=i.find("input.js_author").val();
o=!0,0==a?d.getAuthorList({
onError:function(){
h++,c();
},
onSuccess:function(e){
h++,a=e.totalCnt,c();
}
}):(h++,c()),1==g.copyright_type?(h++,c()):d.searchAuthorList({
nickname:w,
onError:function(){
h++,c();
},
onSuccess:function(e){
var t=e.writerlist[0]||null;
t&&1==t.can_reward&&0==t.author_status&&(g.writerid=t.writerid,g.author_username=t.username,
g.author=w,g.can_open_reward=t.can_reward,g.author_status=t.author_status,g.can_reward=1,
g.authority=1),h++,c();
}
});
}
}),$(".js_original_cancel").on("click",function(){
var e=$("#js_original");
e.find(".js_author").text(""),t.formItemsOpt.author.counter.setCount(0),i.find(".js_original_type").hide().eq(0).show(),
i.find(".js_original_content").hide(),i.find(".js_whitelist").empty();
var r=t.articleList&&t.articleList.getCurrentArticleObject();
r.setAuthorInfo({
copyright_type:0,
writerid:"",
author_username:"",
author:"",
author_status:0,
can_open_reward:0,
can_reward:0
});
}),$("#js_original").find(".js_whitelist_tips").length&&new j({
dom:$("#js_original").find(".js_whitelist_tips"),
content:"<p>通过添加白名单，授权某些公众帐号可以转载文章，并允许修改或不显示转载来源，在文章群发后生效。如果文章开启了赞赏，转载文也会支持赞赏作者。</p>",
isToggle:!0,
onShow:function(){
this.resetPosition();
}
}).hide(),$(".js_reward_ios_tips").length&&new j({
dom:$(".js_reward_ios_tips"),
content:"<p>赞赏功能在iOS上将改为转账，iOS用户可以向你转账任意金额或你设置的固定金额，固定金额只对此篇图文生效。仍保持T+7结算到原收款人的微信零钱包，仍可在赞赏功能里查看流水。</p>",
isToggle:!0,
onShow:function(){
this.resetPosition();
}
}).hide(),$("#js_original").on("click",".js_del_whitelist",function(){
$(this).parent().remove();
}),$("#js_original_detail").on("click",function(){
$(this).parent().toggleClass("open"),$(this).siblings("ul").toggle();
});
var s=!0,c=F.orginal_apply_stat,l=1==F.has_invited_original?"/acct/copyrightapply?action=apply":"/acct/selfapply?action=apply";
l=wx.url(l);
var h=$("#js_original_func_open").closest(".js_original_type"),m=function g(){
b.post({
url:"/cgi-bin/appmsg?action=get_original_stat"
},function(e){
if(e.base_resp&&0==e.base_resp.ret){
var t="";
switch(+e.orginal_apply_stat){
case 0:
t="原创声明：未开通";
break;

case 1:
t="原创声明：审核中",h.find(".opt").hide();
break;

case 2:
t="原创声明：申请失败",h.find(".opt").hide();
break;

case 3:
t="原创：未声明",h.find(".opt").html('<a href="javascript:;" onclick="return false;" class="btn btn_default js_original_apply">声明原创</a>').show();
}
h.find(".subtitle").text(t),c=e.orginal_apply_stat;
}
3!=e.orginal_apply_stat&&setTimeout(g,2e3);
});
};
$("#js_original_func_open").on("click",function(){
0==c&&window.open(l),s&&(s=!1,setTimeout(m,2e3));
});
},
_initPay:function(){
var e=this,t=$("#js_pay_setting_area"),i=this.$editor;
t&&t.length>0&&!function(){
var t=i.find("#js_pay_setting_preview")[0];
i.find(".js_pay_setting_radio").checkbox({
onChanged:function(i){
var r=i.val();
if("1"===r&&"none"===t.style.display)e._showPayStatementDialog();else if("0"===r&&""===t.style.display){
var a=e.articleList&&e.articleList.getCurrentArticleObject(),n=a.data;
n.set("is_pay_subscribe",0),n.set("pay_fee",""),n.set("pay_preview_percent",""),
n.set("pay_desc",""),n.set("copyright_type",0),n.set("original_article_type",""),
n.set("allow_reprint",""),n.set("releasefirst",""),n.set("reprint_permit_type",""),
n.set("allow_reprint_modify",""),n.set("ori_white_list",""),a.renderPayRead();
}
}
}),$("#js_edit_pay_setting").on("click",function(){
e._showPayStatementDialog(!0);
});
var r=$("#js_pay_preview_popup"),a=$("#js_pay_preview_popup_mask"),n=r.find(".js_preview_input");
r.on("mouseover",function(){
a.show();
}),r.on("mouseout",function(){
a.hide();
}),r.on("click",function(t){
var i=$(t.target);
if(!i.hasClass("disabled"))if(i.hasClass("js_btn_up")){
var r=e.articleList&&e.articleList.getCurrentArticleObject();
r.setPayPopup({
mode:"up"
});
}else if(i.hasClass("js_btn_down")){
var r=e.articleList&&e.articleList.getCurrentArticleObject();
r.setPayPopup({
mode:"down"
});
}
}),n.on("keydown",function(e){
return 13===e.keyCode?(e.target.blur(),!1):void 0;
}),n.on("input paste",function(e){
var t=e.target;
t.value.length>=2&&(t.value=t.value.slice(0,2));
}),n.on("blur",function(t){
var i=e.articleList&&e.articleList.getCurrentArticleObject();
i.setPayPopup({
mode:"set",
previewPercent:t.target.value
});
}),n.on("focus",function(e){
setTimeout(function(){
return e.target.select();
},100);
});
}();
},
_showPayStatementDialog:function(e){
var t=this,i=this.articleList&&this.articleList.getCurrentArticleObject(),r=i.data,a={
isShow:!0,
authorName:$("#author").val(),
readProportion:window.wx.cgiData.default_preview_percent,
priceOptionList:window.wx.cgiData.price_option_list
};
e&&(a.payNumber=r.get("pay_fee"),a.readProportion=r.get("pay_preview_percent"),a.description=r.get("pay_desc"),
a.step=2),l.fireEvent("showPayStatementDialog",a,function(e){
if(e.cancel){
if(0===r.get("is_pay_subscribe")){
var a=t.$editor.find(".js_pay_setting_radio");
a.eq(0).checkbox("checked",!0),a.eq(1).checkbox("checked",!1);
}
}else r.set("copyright_type",1),r.set("author",e.authorName),r.set("is_pay_subscribe",1),
r.set("pay_fee",e.payNumber),r.set("pay_preview_percent",e.readProportion),r.set("pay_desc",e.description),
i.renderPayRead(!0);
delete e.cancel,l.fireEvent("showPayStatementDialog",$.extend({
isShow:!1,
step:2
},e));
});
},
_initBan:function(){
var e=this.$editor,t=e.find(".js_url_area"),i=17,r=function(){
var e;
$.each(F.func_ban_info,function(t,r){
r.func_id==i&&(e=r);
});
var r=y.getReason(e.reason_id),a='你的帐号<a href="'+(r.pc_url?r.pc_url:defaultReason.pc_url)+'">'+r.reason_description+"</a>，",n=new Date(1e3*e.unlock_time);
e.ban_time==e.unlock_time?a+="已被永久屏蔽阅读原文功能。":(a+="已被屏蔽阅读原文功能至",a+=n.getFullYear()+"/"+(n.getMonth()+1)+"/"+n.getDate(),
a+="，期间阅读原文将不可用。"),t.find(".js_url_checkbox").attr("disabled",!0).attr("checked",!1).parent().addClass("disabled"),
$(".js_url").attr("disabled",!0).parent().addClass("disabled"),$(".js_url_ban_wording").html(a);
};
y(F.func_ban_info,"source-url")?F.can_use_appmsg_source_url||t.hide():r();
},
_initAd:function(){
var e=this.$editor;
e.on("click",".js_del_ad",function(){
e.find(".js_ad_preview").html(""),e.find(".js_ad_preview").parent().hide(),$("#js_editor_insertad").removeClass("disabled");
});
},
_showPayDialog:function(e){
var t=this,i=t.$editor,r=e.popup("get");
r.find(".js_fee").val($(".js_fee",i).text()),r.find(".js_step_panel").hide().eq(0).show(),
r.find(".js_btn_p").hide(),r.find(".js_btn_p").eq(0).show(),r.find(".js_btn_p").eq(1).show(),
e._step.setStep(1),e.popup("show");
},
_createPayDialog:function(){
var e=this,t=e.$editor,i=$("#tpl_pay").popup({
title:"付费阅读设置",
width:960,
className:"simple align_edge pay_dialog",
autoShow:!1,
data:{},
buttons:[{
text:"取消",
click:function(){
$(".js_pay_setting",t).is(":visible")||$("#js_pay",t).checkbox("checked",!1),this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
var i=e.freeUEditor.val(),n=r.find(".js_fee").val();
return""==i?void f.err("免费区域不能为空"):m.rangelength(i,[20,200])?!n||!/^\d*(\.\d+)?$/.test(n)||n.toString().match(/\.\d{3,}/)||.01>n?void f.err("请输入正确的金额"):.01>n?void f.err("金额必须大于零"):n>200?void f.err("金额不能超过200元"):(r.find(".js_content").html(i),
r.find(".js_content_count").text(e.ueditor.getUeditor().getContent().text().length),
r.find(".js_fee_preview").text(parseFloat(n).toFixed(2)),r.find(".js_nickname").text(wx.data.nick_name),
r.find(".js_title").text($.trim($(".js_title",t).val())),r.find(".js_author").text($.trim($(".js_author",t).val())),
r.find(".js_date").text(g().format("YYYY-MM-DD")),r.find(".js_step_panel").hide().eq(1).show(),
r.find(".js_btn_p").hide(),r.find(".js_btn_p").eq(2).show(),r.find(".js_btn_p").eq(3).show(),
r.find(".js_preview").scrollTop(1e8),a.setStep(2),void this.resetPosition()):void f.err("正文字数要多于20字且不能超过200字");
}
},{
text:"上一步",
click:function(){
r.find(".js_step_panel").hide().eq(0).show(),r.find(".js_btn_p").hide(),r.find(".js_btn_p").eq(0).show(),
r.find(".js_btn_p").eq(1).show(),a.setStep(1),this.resetPosition();
}
},{
text:"确定",
type:"primary",
click:function(){
$(".js_pay_setting",t).show().find(".js_fee").text((+r.find(".js_fee").val()).toFixed(2)),
$(".js_pay_tips",t).hide(),this.hide();
}
}],
onClose:function(){
$(".js_pay_setting",t).is(":visible")||$("#js_pay",t).checkbox("checked",!1),i.popup("hide");
},
onShow:function(){
this.resetPosition();
}
}),r=i.popup("get");
r.find(".js_btn_p").eq(2).hide(),r.find(".js_btn_p").eq(3).hide();
var a=new u({
container:r.find(".js_step"),
selected:1,
names:["设置","预览并确认"]
});
return e.freeUEditor=r.find(".js_editor"),new _(e.freeUEditor,{
minLength:20,
maxLength:200
}),r.find(".js_fee").on("input propertychange",function(){
var e=$(this).val();
e&&/^\d*(\.\d+)?$/.test(e)&&!e.toString().match(/\.\d{3,}/)?.01>e?$(this).parent().addClass("error"):e>200?$(this).parent().addClass("error"):$(this).parent().removeClass("error"):$(this).parent().addClass("error");
}),i.popup("resetPosition"),i._step=a,i;
},
_checkOriginal:function(e){
var t=!0,i="",r="checked"==e.find(".js_forIEbug_frm").attr("checked")?1:e.find(".js_reprint_frm:checked").val(),a=e.data("author_info"),n=a.author,o=a.writerid,s=!!e.find("#js_enable_reprint").prop("checked"),d=!1,c=e.find("#js_original_article_type .dropdown_switch label").text();
e.find("input.js_reward_switch").prop("checked")?n&&o?e.find(".js_author_error").hide():(e.find(".js_author_error").text("请选择赞赏账户").show(),
i=i||"请选择赞赏账户",t=!1):n.len()>16||n.len()<=0?(e.find(".js_author_error").text("作者不能为空且不超过8个字").show(),
i=i||"作者不能为空且不超过8个字",t=!1):e.find(".js_author_error").hide();
for(var l=!1,_=0;_<U.length;_++)c==U[_].name&&(l=!0);
if(0==l?(e.find(".js_article_type_error").show(),t=!1,i=i||"请选择文章类别"):e.find(".js_article_type_error").hide(),
t){
var u=$("#js_original");
u.find(".js_author").text(n),u.find(".js_reprint_frm").val(r),$("#original_type_msg").hide(),
u.find(".js_classify").text(c),u.find(".js_can_reprint").text(s?"开启":"关闭"),F.can_use_original_reprint&&localStorage.setItem("reprintOptions",JSON.stringify({
canReprint:s,
canModify:d
})),this._updateWhitelist(r);
}else f.err(i);
return t;
},
_updateWhitelist:function(e){
$("#js_original").find(".js_whitelist").children().each(function(){
var t=1*$(this).attr("data-can_modify"),i=1*$(this).attr("data-can_reward"),r=1*$(this).attr("data-can_hide_source");
1==e&&(t||i||r||$(this).remove());
});
},
_updateCurUrl:function(e){
if(e){
wx.cgiData.app_id=e,window.history&&history.replaceState?history.replaceState(history.state,document.title,wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(e))):1==F.isNew&&(location.href=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(e)));
var t=new RegExp("^"+location.protocol+"//"+location.hostname+"(:8080)?"+location.pathname+"?.*action=(list_card|list_list)");
V.match(t)&&window.opener&&opener.location&&(opener.location=V);
}
},
_initRecentList:function(){
o.initList({
$inputContainer:$("#author"),
$listContainer:$("#js_author_area").find(".js_author_list")
});
},
_bindEvent:function(){
function e(t,i,r){
b.post({
url:"/cgi-bin/appmsg?action=get_appmsg_update_history&appmsgid="+wx.cgiData.app_id+"&offset="+t+"&limit="+i
},function(t){
if(0==t.base_resp.ret){
var i=t.list;
i.each(function(e){
e.time=g.unix(e.update_time).format("YYYY-MM-DD HH:mm:ss"),e.action=0==e.operate_type?"保存":"群发",
""==e.operator_name&&(e.operator_name="未知"),wx.cgiData.bizmediaid&&wx.cgiData.bizmediaid==e.bizmediaid&&(e.current=!0),
e.url=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=get_history_appmsg&bizmediaid="+e.bizmediaid+"&type="+wx.cgiData.type+"&appmsgid="+wx.cgiData.app_id);
}),$("#history_list").html(template.render("history_tpl",{
list:i
})),r&&new W({
container:"#history_page",
perPage:4,
first:!1,
last:!1,
isSimple:!0,
totalItemsNum:t.total,
callback:function(t){
e(4*(t.currentPage-1),4);
}
}),$("#history_bt").addClass("appmsg_history_active"),$("#history_pop").show();
}
});
}
function t(e){
var t=e.target;
t&&($.contains($("#history_bt")[0],t)||$.contains($("#history_pop")[0],t))?($("#history_pop").show(),
$("#history_bt").addClass("appmsg_history_active")):($("#history_pop").hide(),$("#history_bt").removeClass("appmsg_history_active"));
}
function i(e){
var t='<div class="edui-listitem edui-default"><div class="js_toolbar_more_item edui-listitem-body edui-default"></div></div>',i=$.parseHTML(t)[0],r=$(i).find(".js_toolbar_more_item");
return r.append(e),i;
}
function r(e){
var t=!0;
return $.each(e.children(),function(e,i){
"none"!==$(i).css("display")&&(t=!1);
}),!Y.children().length||t;
}
function a(e){
var t=V.children().eq(-2);
return t.length?(nt=t.data("index"),ot=tt[nt],H.is(":hidden")&&!t.is(":hidden")?H.show():ot&&(e-=ot),
t.addClass("tpl_dropdown_menu_item"),t.removeClass("tpl_item"),Y.prepend(t),e):!1;
}
function n(e){
var t=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];
if(t){
for(;Y.children().length;){
var i=Y.children().eq(0);
if(!i.length)break;
i.removeClass("tpl_dropdown_menu_item"),i.addClass("tpl_item"),i.insertBefore(H),
nt+=1,ot=tt[nt];
}
return H.hide(),!1;
}
var i=Y.children().eq(0);
return i.length?(i.removeClass("tpl_dropdown_menu_item"),i.addClass("tpl_item"),
i.insertBefore(H),r(Y)?(H.hide(),0):(ot&&(e-=ot),nt+=1,ot=tt[nt],e)):(H.hide(),0);
}
function o(e){
var t=G[0]&&G.prev();
return t.length?(t.hasClass("edui-separator")?(e-=t.outerWidth(),t.css("cssText","display:none!important")):e-=Z,
it.prepend(i(t)),e):!1;
}
function s(e){
var t=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],i=void 0,r=void 0;
if(t){
for(;it.children().length&&(i=it.children().eq(0),r=i.find(".js_toolbar_more_item").children().eq(0),
r.length);)r.hasClass("edui-separator")?(e-=r.outerWidth(),r.css("cssText","display:inline_block!important")):e-=Z,
r.length&&r.insertBefore(G),i.remove();
return G.length&&G.css("cssText","display:none!important"),!1;
}
return i=it.children().eq(0),r=i.find(".js_toolbar_more_item").children().eq(0),
r.length?(r.hasClass("edui-separator")?(e-=r.outerWidth(),r.css("cssText","display:inline_block!important")):e-=Z,
r.insertBefore(G),i.remove(),it.children().length?e:(G.length&&G.css("cssText","display:none!important"),
!1)):(G.length&&G.css("cssText","display:none!important"),!1);
}
function d(e,t){
var i=null,r=u.articleList&&u.articleList.getCurrentArticle();
if(r){
var d=r.data("article");
d&&d.getArticleType&&(i=d.getArticleType());
}
if(0===i&&U&&q){
Z=$("#js_toolbar_0").find(".edui-box").outerWidth();
var c=Math.round(U.offset().left-q.offset().left),l=Math.round(document.body.clientWidth);
if(et=Math.round($("#edui1_toolbarboxouter").outerWidth()),t)n(0,t),rt=c,s(0,t),
at=et;else{
if(rt>c){
for(var _=rt-c;_>0&&(_=a(_)););
rt=c+_;
}else if(c-rt>=ot){
for(var _=c-rt,p=!1;_>=ot;)if(_=n(_),!_){
p=!0;
break;
}
rt=p?c:c-_;
}else c===Q&&n(0,!0);
if(st&&!function(){
st=!1;
var e=0,t=$("#js_toolbar_0").children();
$.each(t,function(i,r){
i<t.length-1&&(e+=$(r).outerWidth(!0));
}),et=e,at=e;
}(),et>l){
G.is(":hidden")&&G.css("cssText","display:inline_block!important");
for(var _=et-l;_>0&&(_=o(_)););
at=et+_;
}else if(l-at>=Z){
for(var _=l-at;_>=Z&&(_=s(_)););
at=Math.min(l-_,et);
}
}
}
}
function c(e){
e.matches?(d(),$(window).on("resize",d)):(d(null,!0),H.hide(),rt=Q,at=et,$(window).off("resize",d)),
u.ueditor.fireEvent("hide_action_btn");
}
function l(e){
var t=H.find(".js_more_plugins_menu");
H.is($(e.target))||t.is($(e.target))||t.has($(e.target)).length||(t.length&&t.hide(),
$(document).off("click",l),u.ueditor.removeListener("click",l));
}
function _(){
var e=document.getElementById("js_btn_account_opr"),t=document.getElementById("js_div_account_opr");
if(e&&t){
window._hideHeaderMenu=!0;
var i=setTimeout(function(){
clearTimeout(i),t.style.display="none";
},100);
}
}
var u=this,p=function(){
if(K.$articlePanel){
var e=$("#js_add_appmsg")[0].getBoundingClientRect(),t=$(window).height(),i=K.$articlePanel.height(),r=10,a=e.bottom-r;
a+i>t?K.$articlePanel.css({
top:e.top-i+$(window).scrollTop()-25,
left:e.left+e.width/2-65
}).find(".js_article_panel_inner").addClass("preview_media_add_panel_up"):K.$articlePanel.css({
top:a+$(window).scrollTop()+20,
left:e.left+e.width/2-65
}).find(".js_article_panel_inner").removeClass("preview_media_add_panel_up");
}
},m=function(){
var e=$(".js_action_container"),t=e.offset();
K.$articlePanel&&K.$articlePanel.css({
top:t.top,
left:t.left+e.width()-10
});
},x=function(){
K.hideArticlePanelId&&(clearTimeout(K.hideArticlePanelId),K.hideArticlePanelId=null),
K.hideArticlePanelId=setTimeout(function(){
K.$articlePanel&&K.$articlePanel.hide(),K.hideArticlePanelId=null;
},100);
},k=function(){
K.isReplacing||u.ueditor.fireEvent("is_article_removing")||"add"===K.actionType&&x();
},C=function(e){
return function(){
if(K.canShowArticlePanel){
if("add"===e)u.ueditor.fireEvent("hide_action_btn"),u.ueditor.fireEvent("hide_replace_popover"),
u.ueditor.fireEvent("hide_del_popover");else if("replace"===e&&$(".js_replace_pop")[0]&&!$(".js_replace_pop").is(":hidden"))return;
K.hideArticlePanelId&&(clearTimeout(K.hideArticlePanelId),K.hideArticlePanelId=null),
K.$articlePanel||(K.$articlePanel=$(template.render("tpl_article_panel",{})).appendTo($("body")),
K.$articlePanel.bind({
mouseenter:function(){
K.hideArticlePanelId&&(clearTimeout(K.hideArticlePanelId),K.hideArticlePanelId=null);
},
mouseleave:k
}),u.ueditor&&u.ueditor.fireEvent("can_change_article",K.$articlePanel)),K.actionType=e,
"replace"===e?(K.$articlePanel.find(".js_article_panel_inner").addClass("delete_arrow"),
u.ueditor.fireEvent("reportAddNum",121548,11,1)):K.$articlePanel.find(".js_article_panel_inner").removeClass("delete_arrow"),
"replace"===e?m():p(),K.$articlePanel.show();
}
};
},T=function(){
if(K.$articlePanel){
var e=$("#js_add_appmsg")[0].getBoundingClientRect(),t=$("#js_side_article_list")[0].getBoundingClientRect();
t.top+t.height<e.top?x():K.$articlePanel.is(":hidden")||p();
}
},L=function(){
if(K.$articlePanel){
var e=$(".js_replace_appmsg")[0].getBoundingClientRect(),t=$("#js_side_article_list")[0].getBoundingClientRect();
t.top+t.height<e.top?x():K.$articlePanel.is(":hidden")||m();
}
};
$("#js_add_appmsg").click(C("add")).hover(C("add"),k),$("#js_mp_sidemenu").on("scroll",function(){
u.ueditor.fireEvent("article_item_list_scroll");
}),u.ueditor.addListener("update_action_panel_pos",function(){
"add"===K.actionType&&T(),"replace"===K.actionType&&L();
}),u.ueditor.addListener("get_article_action_type",function(){
return K.actionType||"add";
});
var S={
0:"写新图文",
100:"选择其他图文",
5:"替换为视频",
7:"替换为音频",
8:"替换为图片",
9:"替换为转载"
};
u.ueditor.addListener("reset_replace_popover",function(){
$(".js_article_panel")&&$(".js_article_panel")[0]&&$(".js_replace_appmsg")&&$(".js_replace_appmsg")[0]&&K._replacePopover&&(K._replacePopover.resetPosition($(".js_replace_appmsg")),
K._replacePopover.$dom=$(".js_article_panel"));
}),u.ueditor.addListener("hide_replace_popover",function(){
K._replacePopover&&K._replacePopover.hide();
}),u.ueditor.addListener("before_replace_article",function(e,t){
K._replacePopover=new j({
dom:$(".js_replace_appmsg"),
content:$("#js_article_replace_popover_tpl").html(),
addCls:"js_replace_pop",
margin:"left_top",
width:300,
hideIfBlur:!0,
buttons:[{
text:"确定",
type:"primary",
click:function(){
u.ueditor.fireEvent("reportAddNum",121548,23,1),u.ueditor.fireEvent("replace_article",K.articleReplaceType),
$(".js_action_container").hide(),this.hide();
}
},{
text:"取消",
type:"default",
click:function(){
u.ueditor.fireEvent("reportAddNum",121548,22,1),$(".js_action_container").hide(),
this.hide();
}
}],
onShow:function(){
var e=$(".js_replace_appmsg"),t=this.$pop.find("#js_replace_type").eq(0);
t.html(S[K.articleReplaceType]),this.resetPosition(e),this.$dom=$(".js_article_panel"),
K.isReplacing=!0;
},
onHide:function(){
K.isReplacing=!1;
}
}),K._replacePopover.hide(),K.articleReplaceType=t,x(),u.ueditor.fireEvent("reportAddNum",121548,21,1),
K._replacePopover.show();
}),$(".js_replace_appmsg").click(C("replace")).hover(C("replace")),$("#history_bt").click(function(){
$(this).hasClass("appmsg_history_active")?($(this).removeClass("appmsg_history_active"),
$("#history_pop").hide()):($("#history_pop").css({
top:$(this).offset().top-$(window).scrollTop()+$(this).height()+10
}),e(0,4,!0),u.ueditor.fireEvent("reportAddNum","122333","98","1"));
}),$("#history_list").on("click",".js_history_link",function(){
wx.cgiData.bizmediaid?window.location=$(this).data("url")+"&idx"+wx.cgiData.idx:window.open($(this).data("url")+"&idx"+wx.cgiData.idx),
u.ueditor.fireEvent("reportAddNum","122333","99","1");
}),$(document).on("click",t),u.ueditor.addListener("click",t),$("#read_only_container").find(".js_close").click(function(){
$("#read_only_container").hide();
}),u.$editor.on("click",".js_msg_close",function(){
$(this).closest(".page_msg").hide();
}),u.$editor.find(".js_cover_preview").on("click","img",function(){
var e=$(this).attr("src");
e&&w.show({
imgdata:[{
imgsrc:e
}]
});
}),$("#bot_bar_left_container").on("click",".js_fold",function(){
var e=$(this).find("a").data("type");
"1"==e?u.ueditor.fireEvent("scrollIntoView",$("#article_setting_area")):"2"==e&&u.ueditor.fireEvent("scrollIntoView",$("#editor_pannel"),131);
});
var A=$("#reprint_article_main");
A.on("click",".js_replace_media",function(){
var e=u.articleList&&u.articleList.getCurrentArticleObject();
e&&"function"==typeof e.replaceMedia&&e.replaceMedia();
}),A.on("click",".js_preview_hd",function(){
var e=u.articleList&&u.articleList.getCurrentArticleObject();
e&&"function"==typeof e.previewVideoPlay&&e.previewVideoPlay();
}),new h({
container:u.$editor.find(".js_edit_tips"),
content:"",
parentClass:"",
position:{
left:-136
},
reposition:!0,
onshow:function(){
var e=u.articleList&&u.articleList.getCurrentArticleObject();
e&&"function"==typeof e.getEditTipsContent&&(this.changeContent(e.getEditTipsContent()),
this.show());
},
type:"hover"
}),$("#js_submit").on("click",function(){
var e=$(this);
1*u.appmsg_data.is_illegal==1||e.hasClass("btn_disabled")||($("#js_import_tips,#js_draft_tips").hide(),
$(".js_warn").hide(),$(".js_ad_error_tips").hide(),z.mark("appmsg","saveArticle","start"),
u.articleList&&u.articleList.save(e,function(t,i){
var r=localStorage.getItem("finalAdText");
r?localStorage.setItem("adTransitionText",r):localStorage.setItem("adTransitionText",R);
for(var a=0,n=0;n<i.count;n++)if(i["ad_id"+n]){
a=1;
break;
}
e.btn(!0),f.remove(),t.is_ad_optioal?$("#js_save_success_with_ad_op").show().delay(2e3).fadeOut(300):a?$("#js_save_success_with_ad").show().delay(2e3).fadeOut(300):$("#js_save_success").show().delay(2e3).fadeOut(300),
u._updateCurUrl(t.appMsgId);
},!1,J),u.ueditor.fireEvent("reportAddNum","122333","100","1"));
}),$("#js_submit_close").on("click",function(){
var e=$(this);
u.articleList&&u.articleList.save(e,function(){
f.suc("保存成功"),window.close();
},!1,J);
}),$("#js_send").on("click",function(){
var e=$(this);
1*u.appmsg_data.is_illegal==1||e.hasClass("btn_disabled")||(u.ueditor.fireEvent("reportAddNum",[{
id:"122333",
key:"102",
len:1
},{
id:"65080",
key:"120",
len:1
}]),$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),u.articleList&&u.articleList.save(e,function(e){
window.onbeforeunload=null;
var t=localStorage.getItem("finalAdText");
t?localStorage.setItem("adTransitionText",t):localStorage.setItem("adTransitionText",R),
u.articleList.draft.isDropped=!0,u._updateCurUrl(e.appMsgId),location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&type=10&appmsgid=%s".sprintf(e.appMsgId));
},!1,J,void 0,!0));
}),$("#js_preview").on("click",function(){
var e=$(this);
if(1*u.appmsg_data.is_illegal!=1&&!e.hasClass("btn_disabled")){
if(u.ueditor.fireEvent("reportAddNum",65080,119,1),$("#js_import_tips,#js_draft_tips").hide(),
$(".js_warn").hide(),y(F.func_ban_info,"preview")){
var e=$(this);
u.articleList&&u.articleList.preview(J,function(e){
u._updateCurUrl(e.appMsgId);
});
}
u.ueditor.fireEvent("reportAddNum","122333","101","1");
}
}),u.$editor.on("click",".js_jumpToOrder",function(){
v.show({
type:"info",
msg:"是否保存文章并跳转至广告订单页面？",
buttons:[{
text:"确定",
click:function(){
$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),$(".js_ad_error_tips").hide();
var e=$("#js_submit"),t=this,i=$(".js_ad_msg").data("ad_id");
t.remove(),u.articleList&&u.articleList.save(e,function(e){
u._updateCurUrl(e.appMsgId),window.location.href=wx.url("/cgi-bin/frame?t=ad_system/common_simple_frame&t1=publisher/freetrade_item_detail&aid="+i);
},!1,J);
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
});
var D,I,O=($("body"),$(".edui-editor-toolbarbox")),E=$(".js_catch_tips"),P=$("#article_setting_area")[0],M=$("#bottom_main")[0],N=document.getElementById("js_author_area"),B=$(".js_editor_area")[0],q=$("#js_media_list_box"),U=$(".js_header_account"),V=$("#js_plugins_list"),H=$("#editor_showmore"),Y=H.find(".js_more_plugins_menu"),X=window.matchMedia("(max-width: 1169px)"),G=$(".edui-combox.js_toolbar_more"),Q=768,Z=0,et=Math.round($("#edui1_toolbarboxouter").outerWidth()),tt=[],it=$("<div></div>"),rt=Q,at=0,nt=-2,ot=null,st=!0;
$.each(V.children(),function(e,t){
$(t).data("index",e);
var i=$(t).outerWidth();
i&&tt.push(i);
}),G.click(function(){
if(!it.hasClass("js_toolbar_more_list")){
$(".js_toolbar_more_list").append(it.children()),it=$(".js_toolbar_more_list");
var e=$(".edui-popup.js_toolbar_more");
e.length&&e.removeClass("edui-for-more");
}
}),X.addListener(c),c(X),u.ueditor.addListener("foldToolbar",function(){
d();
}),H&&H.click(function(){
var e=H.find(".js_more_plugins_menu");
e.length&&e.show(),$(document).on("click",l),u.ueditor.addListener("click",l);
}),u.ueditor.addListener("click",_),$(window).scroll(function(){
I&&(clearTimeout(I),I=null),D&&(clearTimeout(D),D=null),$("#history_pop").css({
top:$("#history_bt").offset().top-$(window).scrollTop()+$("#history_bt").height()+10
});
var e,t=!0,i=u.articleList&&u.articleList.getCurrentArticle();
if(i){
var r=i.data("article");
r&&r.getArticleType&&(e=r.getArticleType());
}
t=!0;
var a=$(window).scrollTop(),n=B.getBoundingClientRect();
if(t&&a>$(".main_bd").offset().top){
var o=O[0].getBoundingClientRect();
E.css({
position:"fixed",
top:o.bottom,
width:n.width,
zIndex:999
});
}else E.css({
position:"",
top:"",
width:"",
zIndex:""
});
if(t&&(I=setTimeout(function(){
u.ueditor&&u.ueditor.fireEvent("toolbar_fixed_change");
},100)),!$("#edui1_iframeholder").is(":hidden")){
var s=P.getBoundingClientRect(),d=M.getBoundingClientRect();
if(d.top-s.top<=50)u._setFoldStatus(!0,{
type:1
});else if(u.ueditor){
var c=u.ueditor.getDom("toolbarbox").getBoundingClientRect(),l=N.getBoundingClientRect();
c.bottom>l.bottom?u._setFoldStatus(!0,{
type:2
}):u._setFoldStatus(!1);
}
}
}).trigger("scroll",!1),$("#js_mp_sidemenu").on("scroll",function(){
$("#history_pop").css({
top:$("#history_bt").offset().top-$(window).scrollTop()+$("#history_bt").height()+10
});
}).parent().on("scroll",function(){
$("#history_pop").css({
top:$("#history_bt").offset().top-$(window).scrollTop()+$("#history_bt").height()+10
});
});
$(window).width();
$(window).on("resize",function(){
1==K.curRenderType&&u.ueditor.fireEvent("star_toolbar_float"),u._getFrameHeight(),
$(window).trigger("scroll",!1);
}),$("#js_insert_ad_area").on("click",".js_insert_ad_allow_click.open",function(e){
e.preventDefault(),J.fireEvent("openCpcSetting");
});
}
});
new et({
app_id:F.app_id,
editor_selector:"#js_appmsg_editor",
appmsg_selector:"#js_appmsg_preview",
appmsg_account_selector:"#js_appmsg_account",
appmsg_data:F.appmsg_data
});
}
z.setBasicSpeeds("appmsg"),z.send();
});