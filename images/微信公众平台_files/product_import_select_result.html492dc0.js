function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("media/base_article.js",["tpl/author/authority_warn.html.js","common/wx/mpEditor/utils.js","author/author_popover.js","media/common.js","biz_common/jquery.validate.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/mpEditor/plugin/remoteimg.js","common/wx/mpEditor/common/base_class.js","media/article_data_key.js","common/wx/mpEditor/text_editor.js","tpl/media/appmsg_edit/article_list_item.html.js","media/get_article_structure.js","common/wx/const.js","common/wx/utils.js"],function(e){
"use strict";
var t=e("tpl/author/authority_warn.html.js"),i=e("common/wx/mpEditor/utils.js"),r=e("author/author_popover.js"),a=(e("media/common.js"),
e("biz_common/jquery.validate.js")),s=e("common/wx/Tips.js"),n=(e("common/wx/Cgi.js"),
e("common/wx/mpEditor/plugin/remoteimg.js")),o=a.rules,d=e("common/wx/mpEditor/common/base_class.js"),_=e("media/article_data_key.js"),c=e("common/wx/mpEditor/text_editor.js"),l=e("tpl/media/appmsg_edit/article_list_item.html.js"),h=e("media/get_article_structure.js"),u=h.getArticleStructure,f=h.getArticleStructureNoAd,p=e("common/wx/const.js"),m=(p.moreReadModeMap,
p.DEFAULT_AD_TEXT),g=p.NO_AD_TEXT,v=p.videoPasterMinPlayLength,w=e("common/wx/utils.js"),j=w.formatVideoTime,y=["一","二","三","四","五","六","七","八","九","十"],b={
submitKey:_.getSubmitKey()
},C={
0:"文章设置",
9:"文章设置",
5:"视频消息设置",
7:"音频消息设置",
8:"图片消息设置",
6:"音频消息设置"
},k=5,x=d.inherit({
init:function(e){
this._o={
isNew:!0,
app_id:"",
$infoContainer:null,
$articleList:null,
data:null,
index:0,
ueditor:null,
$freeUEditor:null,
$navigator:null,
cgiData:null,
defaultGuideWordlimit:140,
guideWordlimit:140,
undoManagerState:{
list:[],
index:0
}
},this._o=this.extend(this._o,e),this.editor=this._o.ueditor,this.domUtils=this.editor.getDomUtils(),
this.initG(),this.data=this.initData(),this.renderArticleItem(this._o.index);
},
updateAppid:function(e){
1*this._o.app_id!==1*e&&(this._o.app_id=e);
},
initTextEditorEnv:function(){
var e=this;
c.initEnv({
$dom:$("#guide_words_main"),
wordlimit:this._o.defaultGuideWordlimit,
onFocus:function(){
this.selector$.find(".js_editorTip").show();
},
onBlur:function(){
this.selector$.find(".js_editorArea").each(function(){
var t=e._o.ueditor.fireEvent("get_current_article"),i=t&&t.data("article");
if(i){
var r=i.data.getData(),a=r.share_page_type;
if(!$(this).is(":hidden")&&8===a){
i.flushGuidWords();
var s=i.data.get("guide_words")||"",n=s||"分享图片";
t.find(".js_appmsg_title").html(n);
}
}
}),!this.hasOverflowed()&&this.selector$.find(".js_editorTip").hide();
}
});
},
setTextEditorWordlimit:function(e){
if("number"==typeof e){
this._o.guideWordlimit=e;
var t=c.getEditor(this._o.ueditor,this._o.formItemsOpt);
t&&t.setWordlimit(e);
}
},
enableToolbar:function(){
c.enableToolbar();
},
disableToolbar:function(){
c.disableToolbar();
},
showToolbar:function(){
c.showToolbar();
},
hideToolbar:function(){
c.hideToolbar();
},
setShowEmotionNLinkNWeapp:function(e){
var t=c.getEditor(this._o.ueditor,this._o.formItemsOpt);
t&&(t.opt.showLinkAndWeapp=e),t&&(t.opt.hideEmotion=!e),$("#js_text_editor_link_popup").hide();
},
initG:function(){
this._g={
undoHistory:null,
$item:null,
isAutoDigest:!0,
scrollTop:this._o.$navigator.offset().top,
maxDigest:120
};
},
initData:function(){
var e=this._o.data,t=this._o.index,r=this._o.cgiData,a=_.getLocalKey(t);
for(var s in e)e.hasOwnProperty(s)&&"undefined"!=typeof a[s]&&(a[s]="[object Number]"===Object.prototype.toString.call(a[s])?1*e[s]:"[object String]"===Object.prototype.toString.call(a[s])?e[s]?e[s]+"":"":e[s]);
if(a.file_id=1*a.file_id===0?"":a.file_id+"",a.writerid||(a.authority=0,a.author_status=1),
a.can_reward=1*r.can_use_reward?a.can_reward:0,r&&1==r.can_use_comment){
if(this._o.isNew){
var n=localStorage.getItem("commentStatus_"+wx.data.user_name);
null!==n&&(n=JSON.parse(n),a.need_open_comment=n.need_open_comment,a.only_fans_can_comment=n.only_fans_can_comment);
}
}else a.need_open_comment=0;
if(0==a.need_open_comment&&(a.only_fans_can_comment=0),a.title_tips="第%s篇图文".sprintf(y[t]),
a.cdn_url_back||(a.cdn_url_back=a.cdn_url),a.cdn_url?(a.cover=a.cdn_url=a.cdn_url.nogif(),
a.cdn_235_1_url||(a.cdn_235_1_url=a.cdn_url),a.cdn_1_1_url||(a.cdn_1_1_url=a.cdn_url)):a.file_id&&(r&&r.appmsg_data.multi_item&&$.each(r.appmsg_data.multi_item,function(e,t){
t.file_id==a.file_id&&(a.cover=t.cover);
}),a.cover||(a.cover=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(a.file_id)))),
a.source_url_checked=a.source_url?1:0,a.advert_info&&a.advert_info.back_transition){
var o=a.advert_info.back_transition;
if("string"==typeof o){
var d=o||"";
d=i.htmlDecode(d),a.advert_info.back_transition=JSON.parse(d);
}
}
if(!a.crop_list||"[object String]"===Object.prototype.toString.call(a.crop_list))try{
a.crop_list=JSON.parse(a.crop_list);
}catch(c){
a.crop_list={
crop_list:[]
};
}
return a.crop_list&&a.crop_list.crop_list||(a.crop_list={
crop_list:[]
}),a=this._o.ueditor.initPluginData(a),{
set:function(e,t){
"undefined"!=typeof a[e]&&"undefined"!=typeof t&&(a[e]=t);
},
get:function(e){
return a[e];
},
getData:function(){
return a;
},
setData:function(e){
a=e;
}
};
},
renderArticleItem:function(e){
var t=this._o.$articleList,i=t.children(),r=i.length||0,a=this.data.getData(),s=$.parseHTML(wx.T(l,a))[0],n=null;
if(0===e)n=$(s).prependTo(t);else if(e===r)n=$(s).appendTo(t);else{
var o=i.eq(e+1);
n=$(s).insertBefore(o);
}
this._g.$item=n,n.data("article",this);
},
getListItem:function(){
return this._g.$item;
},
getDigestFromContent:function(){
return"";
},
setAutoDigest:function(e){
this.data.set("auto_gen_digest",e?1:0);
},
setDigest:function(){
var e=this.data,t=$.trim(e.get("digest"));
this.data.get("auto_gen_digest")?e.set("digest",this.getDigestFromContent()):e.set("digest",t);
},
updateIndex:function(e){
1*e!==this.data.get("seq")&&(this.data.set("seq",e),this.data.set("msg_index",e),
this.data.set("isFirst",0==e),this.data.set("title_tips","第%s篇图文".sprintf(y[e])),
this.changeCoverPreviewCss()),this.changeArticleItemCss();
},
changeArticleItemCss:function(){
this.data.get("isFirst")?this._g.$item.removeClass("sub_card_media"):this._g.$item.addClass("sub_card_media"),
this.data.get("cover")?this._g.$item.addClass("has_thumb"):this._g.$item.removeClass("has_thumb");
},
getIndex:function(){
return 1*this.data.get("seq");
},
showErrMsg:function(e,t){
this._o.ueditor.fireEvent("showErrMsg",e,t);
},
scrollIntoView:function(e,t){
this._o.ueditor.fireEvent("scrollIntoView",e,t);
},
hideAllErrMsg:function(){
this.hideErrorTips(),this._o.ueditor.fireEvent("hideAllErrMsg");
},
setHistory:function(e){
this._g.undoHistory=e;
},
getHistory:function(){
return this._g.undoHistory;
},
renderOriginal:function(){
var e=this,t=e.data.getData(),i=e._o.$infoContainer;
if(!t.is_pay_subscribe){
var r=$("#js_original");
if(r.find(".js_original_type").hide().eq(1==t.copyright_type||2==t.copyright_type?1:0).show(),
this.renderReward(),1==t.copyright_type||2==t.copyright_type){
if(r.find(".js_original_content").show(),r.find(".js_original_publish").val(t.releasefirst),
r.find(".js_reprint_frm").val(t.reprint_permit_type),r.find(".js_author").text(t.author),
r.find(".js_platform").text(+t.releasefirst?"微信公众平台":t.platform),r.find(".js_can_reprint").text(t.allow_reprint?"开启":"关闭"),
r.find(".js_classify").text(t.original_article_type||t.source_article_type),"object"!==_typeof(t.ori_white_list))try{
t.ori_white_list=$.parseJSON(t.ori_white_list.html(!1)).white_list;
}catch(a){
t.ori_white_list=[];
}
$.each(t.ori_white_list,function(e,t){
t.title=[],1*t.can_modify&&t.title.push("可修改文章"),1*t.can_hide_source&&t.title.push("可不显示转载来源"),
t.title=t.title.join("，");
}),t.ori_white_list&&t.ori_white_list.length?r.find(".js_original_item").show():r.find(".js_original_item").hide(),
r.find(".js_whitelist").html(template.render("tpl_whitelist",{
list:t.ori_white_list
}));
}else r.find(".js_original_content").hide(),r.find(".js_whitelist").html(""),i.find(".js_author").closest(".appmsg_edit_item").eq(0).show();
}
},
handlePay:function(){},
renderPay:function(){},
renderAd:function(){
var e=this,t=e.data.getData(),i=e._o.$infoContainer;
if(t.ad_info&&t.ad_info.ad_id){
$("#js_editor_insertad").addClass("disabled"),i.find(".js_ad_preview").empty(),i.find(".js_ad_preview").parent().show(),
t.ad_info.video_info&&(t.ad_info.ad_img=t.ad_info.video_info.thumbUrl);
var r=template.render("js_ad_preview_tpl",{
ad_id:t.ad_info.ad_id,
ad_img:t.ad_info.ad_img,
img:t.ad_info.img,
nick_name:t.ad_info.nick_name,
pt:t.ad_info.pt
});
i.find(".js_ad_preview").html(r),i.find(".js_tag").text(0==t.ad_info.trade_mode?"广告推荐":"内容定制");
}else $("#js_editor_insertad").removeClass("disabled"),i.find(".js_ad_preview").empty(),
i.find(".js_ad_preview").parent().hide();
},
renderPayRead:function(e){
if(window.wx.cgiData.can_use_pay_subscribe){
var t=this.data.getData(),i=this._o.$infoContainer,r=i.find("#js_pay_setting_preview");
if(t.is_pay_subscribe&&wx.cgiData.can_use_copyright&&!t.is_share_copyright){
this.setAuthorInfo({
copyright_type:1,
writerid:t.writerid||"",
author_username:t.author_username||"",
author:t.author,
author_status:t.author_status,
can_open_reward:t.can_open_reward,
can_reward:t.can_open_reward&&t.can_reward?1:0
});
var a=i.find("#js_pay_setting_area .js_pay_setting_radio");
a.eq(0).removeProp("checked").parent().removeClass("selected"),a.eq(1).prop("checked","checked").parent().addClass("selected"),
this.data.set("insert_ad_mode",0),$("#js_insert_ad_area .js_auto_insert_ad").removeProp("checked").parent().removeClass("selected"),
this.initPayPopup({
show:!0,
init:!e,
isFromDialog:e,
previewPercent:1*t.pay_preview_percent
}),r.find(".js_author").html(t.author),r.find(".js_amount").html("￥"+t.pay_fee/100),
""!==t.pay_desc?(r.find(".js_desc_wrap").show(),r.find(".js_desc").html(t.pay_desc)):r.find(".js_desc_wrap").hide(),
r[0].style.display="",$("#js_original").hide();
var s=i.find("#article_setting_area2");
$.each(s.find(".js_pay_hide_item"),function(e,t){
"none"!==t.style.display&&(t.style.display="none",t.dataset.pay=1);
});
var n=i.find("#js_comment_area");
(0===n.length||n.length&&"none"===n[0].style.display)&&s.hide();
}else{
if(t.is_pay_subscribe){
var o=this.data;
o.set("is_pay_subscribe",0),o.set("pay_fee",""),o.set("pay_preview_percent",""),
o.set("pay_desc",""),o.set("copyright_type",0),o.set("original_article_type",""),
o.set("allow_reprint",""),o.set("releasefirst",""),o.set("reprint_permit_type",""),
o.set("allow_reprint_modify",""),o.set("ori_white_list","");
}
if(!t.is_share_copyright){
var a=i.find("#js_pay_setting_area .js_pay_setting_radio");
a.eq(0).parent().addClass("selected"),a[0].checked=!0,a.eq(1).parent().removeClass("selected"),
a[1].checked=!1,r[0].style.display="none";
}
this.initPayPopup({
show:!1
}),$("#js_original").show(),this.renderOriginal(),i.find("#article_setting_area2").show().find('.js_pay_hide_item[data-pay="1"]').show().removeAttr("data-pay");
}
}
},
initPayPopup:function(e){
if(e.show){
var t={
isFromDialog:e.isFromDialog
};
e.init?t.mode="init":(t.mode="set",t.previewPercent=e.previewPercent),this.setPayPopup(t),
this._o.$infoContainer.find("#js_pay_preview_popup").show();
}else this._o.$infoContainer.find("#js_pay_preview_popup").hide();
},
setPayPopup:function(e){
var t=this.data,i=this._o.$infoContainer,r=i.find("#js_pay_preview_popup"),a=r.find(".js_btn_up"),n=r.find(".js_btn_down"),o=i.find("#js_pay_preview_popup_mask"),d=e.mode,_=f(this.editor.ueditor.body,{
getNestedStructure:!0,
ignoreFlexChildren:!0,
ignoreNotWriteableChildren:!0,
needEl:"init"===e.mode
}),c=function(e,t){
e.some(function(e,i){
return e.isWrapper?void 0:"function"==typeof t?t(e,i):!0;
});
},l=0,h=0,u=0,p=0,m=!0,g=0,v=0;
if(_.length&&(c(_,function(e,t){
var i=e.topMargin;
i>g&&(g=i,v=t);
}),g+=_[v].height+_[v].marginBottom),"init"===d)m=!1,c(_,function(e){
var t=e.el,i=e.topMargin;
return u++,"js_pay_preview_filter"===t.className?(m=!0,l=i,t.parentNode.removeChild(t),
!0):void 0;
});else if("set"===d)!function(){
e.previewPercent=parseInt(e.previewPercent)||0,e.previewPercent>=100&&(e.previewPercent=99),
e.previewPercent<0&&(e.previewPercent=0);
var t=g*e.previewPercent/100;
c(_,function(e){
var i=e.topMargin;
return u++,h=l,l=i,l>=t?(l>t&&(l=h,u--),!0):void 0;
});
}();else if("up"===d||"down"===d){
if(p=1*parseFloat(r.css("top")).toFixed(2),"up"===d&&0===p)return;
c(_,function(e){
var t=e.topMargin;
return u++,h=l,l=t,l>=p&&"up"===d?(l=h,u--,!0):l>p&&"down"===d?!0:void 0;
});
}else!function(){
var e=1*r.data("offset");
c(_,function(t){
var i=t.topMargin;
return u++,l=i,u===e?!0:void 0;
});
}();
if(m){
var w="init"!==d?0===g?0:Math.ceil(l/g*100):1*t.get("pay_preview_percent");
100===w&&(w=99);
var j=this._o.ueditor.ueditor.iframe.parentNode,y=parseInt(getComputedStyle(j).paddingTop);
r[0].parentNode!==j&&(j.insertAdjacentElement("afterbegin",o[0]),j.insertAdjacentElement("afterbegin",r[0])),
r.css({
marginTop:"-"+(r.height()-y)+"px",
top:l+"px"
}),o.css({
marginTop:y+"px",
height:l+"px"
}),"up"===d||"down"===d?(document.documentElement.scrollTop=document.documentElement.scrollTop+l-p,
document.body.scrollTop=document.body.scrollTop+l-p):"set"===d&&(document.documentElement.scrollTop=l,
document.body.scrollTop=l,!e.isFromDialog&&e.previewPercent!==w&&s.err("由于文章以段落划分免费试读区域，输入值无法生效，已自动为你切换到最近的有效数值")),
a[0===v||1===u?"addClass":"removeClass"]("disabled"),n[0===v||u===v+1?"addClass":"removeClass"]("disabled"),
r.data("offset",u),r.find(".js_preview_input").val(w),i.find("#js_pay_setting_preview .js_preview_percent").html(w+"%"),
"init"!==d&&t.set("pay_preview_percent",w);
}
},
hideErrorTips:function(){
var e=this._o.$infoContainer;
e.find(".js_reward_error,.js_title_error,.js_author_error,.js_desc_error,.js_tip_mask_msg,.js_cover_error,.js_url_error,.js_catch_tips,.js_content_error,.js_platform_error,.js_ad_error_tips").hide(),
e.find(".js_tip_mask").removeClass("error_mask");
},
flushGuidWords:function(){
var e=c.getEditor(this._o.ueditor,this._o.formItemsOpt),t=e.getContent();
this.data.set("guide_words",t||""),this._o.undoManagerState=e.dumpUndoManager();
},
flushPay:function(){},
flushField:function(){
var e=this.data,t=this._o.$infoContainer;
t.find(".js_field").each(function(){
var t=$(this),i=t.attr("name"),r=t.attr("type");
"checkbox"==r?e.set(i,t.checkbox("value")?1:0):"checkbox"==t.data("type")?e.set(i,1*t.val()?1:0):"guide_words"==i?e.set(i,t.val()):e.set(i,$.trim(t.val()));
});
},
flushRelatedVideo:function(){
var e=this.data,t=$(".js_related_video_desc"),i=t.data("related_video"),r=$(".js_related_video_radio_suggestion").hasClass("selected")?1:0,a=[];
try{
a=JSON.parse(i);
}catch(s){}
e.set("related_video",a),e.set("is_video_recommend",r);
},
flushCommon:function(){
var e=this.data,t=this._o.$infoContainer,i=this._o.cgiData;
t.find('.js_desc[name="digest"]').val(e.get("digest")),e.set("source_url",e.get("source_url_checked")?e.get("source_url"):"");
var r=e.get("source_url");
r&&!/:\/\//.test(r)&&e.set("source_url","http://"+r);
var a=t.find("#js_original");
if(!e.get("is_pay_subscribe")&&(1==e.get("copyright_type")||2==e.get("copyright_type"))){
e.set("releasefirst",a.find(".js_original_publish").val()),e.set("author",a.find(".js_author").text()),
e.set("platform",+e.get("releasefirst")?"":a.find(".js_platform").text()),e.set("reprint_permit_type",a.find(".js_reprint_frm").val()),
e.set("original_article_type",a.find(".js_classify").text()),e.set("allow_reprint",Number("开启"===a.find(".js_can_reprint").text())),
e.set("allow_reprint_modify",Number("开启"===a.find(".js_can_modify").text()));
var s=[];
a.find(".js_whitelist .js_whitelist_item").each(function(){
var e=$(this);
s.push({
nickname:e.attr("data-nickname"),
title:e.attr("title"),
openid:e.attr("data-openid"),
wx_name:e.attr("data-wx_name"),
username:e.attr("data-username"),
avatar:e.attr("data-avatar"),
can_modify:e.attr("data-can_modify"),
can_hide_source:e.attr("data-can_hide_source"),
can_reward:e.attr("data-can_reward")
});
}),e.set("ori_white_list",JSON.stringify2({
white_list:s
}));
}
var n=$(".js_ad_msg");
if(e.set("ad_info",{
ad_id:n.data("ad_id")||"",
ad_img:n.data("ad_img")||"",
img:n.data("img")||"",
nick_name:n.data("nick_name")||"",
pt:n.data("pt")||"",
trade_mode:n.data("trade_mode")||""
}),0==e.get("need_open_comment")?e.set("only_fans_can_comment",0):e.set("only_fans_can_comment",1*$(".js_comment_setting:checked").val()||0),
1==i.can_use_hyperlink){
var o=e.get("content").match(/<a([^>]*)>(.*?)<\/a>/g);
o&&e.set("link_count",o.length);
}
var d=e.get("cdn_url"),_=e.get("file_id");
if(d)d=d.nogif(),e.set("cdn_url",d),e.set("cover",d);else if(_){
var c,i=this._o.cgiData;
i&&i.appmsg_data&&i.appmsg_data.multi_item&&$.each(i.appmsg_data.multi_item,function(e,t){
t.file_id==_&&(c=t.cover);
}),c||(c=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(_))),
e.set("cover",c);
}else e.set("cover","");
e.set("isFirst",0==this.getListItem().index()),this.setScrollTop(),this.setHistory(this._o.ueditor.getHistory());
},
setScrollTop:function(){
this._g.scrollTop=Math.max($(window).scrollTop(),this._o.$navigator.offset().top);
},
getScrollTop:function(){
return this._g.scrollTop;
},
flush:function(){
return this;
},
getData:function(e,t){
var i=this,r=i.data.getData(),a={},s=b.submitKey;
this.isCurrentArticle()&&(this.data.getData().sections=u(this.editor.ueditor.body),
r.compose_info=JSON.stringify(0===r.share_page_type?{
list:f(this.editor.ueditor.body)
}:{
list:""
})),$.each(s,function(e,t){
switch(t){
case"fileid":
a[t]=r.file_id;
break;

case"sourceurl":
a[t]=r.source_url;
break;

case"cdn_url":
a[t]=(r.cdn_url||"").https2http().nogif();
break;

case"cover":
break;

case"ad_info":
a.ad_id=r.ad_info&&r.ad_info.ad_id||"";
break;

case"advert_info":
a.ad_video_transition=JSON.stringify(r.ad_video_transition)||r.advert_info.back_transition;
break;

case"dot":
r.dot&&r.dot.list&&r.dot.list.length&&r.dot.list.forEach(function(e){
e.dot&&(e.dot=e.dot.replace(/&quot;/g,'"'),e.position=e.position.replace(/&quot;/g,'"'));
}),a.dot=JSON.stringify(r.dot);
break;

case"share_imageinfo":
a[t]=JSON.stringify2({
list:r.share_imageinfo
});
break;

case"sections":
a[t]="string"==typeof r[t]?r[t]:JSON.stringify(r[t]);
break;

case"categories_list":
a[t]=JSON.stringify(r[t]);
break;

case"related_video":
a.related_video=r.related_video?r.related_video.map(function(e){
return e.aid;
}).join(","):"";
break;

case"crop_list":
a[t]=r[t]&&r[t].crop_list&&r[t].crop_list.length>0?JSON.stringify(r[t]):"";
break;

default:
a[t]=r[t];
}
});
var n=e?t?i.validateStrictly(a):i.validate(a):$.extend(!0,{},r);
return!!n&&(n.cover=void 0),n;
},
isCurrentArticle:function(){
var e=this._o.ueditor.fireEvent("get_current_article");
return e&&e.data("article")===this?!0:!1;
},
removeCover:function(){
if(this.isCurrentArticle()){
var e=this._o.$infoContainer.find(".js_cover_preview");
e.hide().find("input").val(""),this._g.$item.find("div.js_appmsg_thumb").css("backgroundImage",'url("")'),
this._g.$item.removeClass("has_thumb");
}
this.data.set("file_id",""),this.data.set("cdn_url",""),this.data.set("cdn_url_back",""),
this.data.set("show_cover_pic",0);
},
handleEditTips:function(){
this._o.$infoContainer.find(".js_edit_tips").hide();
},
getEditTipsContent:function(){
return"";
},
validateCommon:function(e){
{
var t=e.$dom,i=e.item;
this.data.getData();
}
return this.checkSourceUrl(e),o.rangelength(i.digest,[0,this._g.maxDigest])||(t.find(".js_desc_error").text("摘要长度不能超过%s字".sprintf(this._g.maxDigest)).show(),
e.viewClass=e.viewClass||".js_desc",e.isValid=!1),this.validateReward(e),1==i.can_reward&&i.reward_money>0&&(i.reward_money<1||i.reward_money>256||i.reward_money.toString().indexOf(".")>-1)&&(t.find(".js_reward_money_error").text("赞赏金额范围为1-256，只能是整数").show(),
e.viewClass=e.viewClass||".js_reward_ios_money",e.isValid=!1),e;
},
validateStrictlyCommon:function(e){
{
var t=e.$dom,i=e.item;
this.data.getData();
}
return i.fileid||i.cdn_url||(this.showErrMsg(t.find(".js_cover_error"),"必须插入一张图片"),
e.viewClass=e.viewClass||".js_cover_error",e.isValid=!1),this.checkSourceUrl(e),
o.rangelength(i.digest,[0,this._g.maxDigest])||(t.find(".js_desc_error").text("摘要长度不能超过%s字".sprintf(this._g.maxDigest)).show(),
e.viewClass=e.viewClass||".js_desc",e.isValid=!1),this.validateReward(e),e;
},
validateReward:function(e){
var t=this.getRewardErrorText();
t&&(e.$dom.find(".js_reward_error").text(t).show(),e.viewClass=e.viewClass||".js_reward_error",
e.isValid=!1);
},
checkSourceUrl:function(e){
var t=e.$dom,i=e.item,r=this.data.getData();
r.source_url_checked&&""==i.sourceurl&&(t.find(".js_url_error").text("请输入原文链接").show(),
e.viewClass=e.viewClass||".js_url",e.isValid=!1),i.sourceurl&&!o.url(i.sourceurl)&&(t.find(".js_url_error").text("链接不合法").show(),
e.viewClass=e.viewClass||".js_url",e.isValid=!1);
},
getRewardErrorText:function(){
if(0==this.data.get("copyright_type")||2==this.data.get("copyright_type"))return"";
var e="",t=this.data.get("can_reward"),i=this.data.get("can_open_reward"),r=this.data.get("writerid"),a=this.data.get("authority"),s=this.data.get("author_status");
return r&&!a?e="赞赏账户授权已失效，请编辑原创声明重新设置。":t&&!r?e="因未选择赞赏账户，无法开启赞赏。请编辑原创声明重新设置。":r&&s?e="因未选择赞赏账户，无法开启赞赏。请编辑原创声明重新设置。":t&&r&&!i&&(e="选择的赞赏账户异常，请编辑原创声明重新设置。"),
e;
},
validateGuideWords:function(e){
return o.rangelength(e.item.guide_words,[0,this._o.guideWordlimit])||(this.showErrMsg(e.$dom.find(".js_content_error"),"推荐语长度不能超过%s字".replace("%s",this._o.guideWordlimit)),
e.viewClass=e.viewClass||".js_content_error",e.isValid=!1),e;
},
handleValidateResult:function(e){
return e.isValid?(this.hideAllErrMsg(),e.item):(e.viewClass&&this.scrollIntoView(e.$dom.find(e.viewClass),250),
null);
},
validate:function(e){
return e;
},
validateStrictly:function(e){
return e;
},
setGuideWordsReadOnly:function(){},
modifyCurrentEditData:function(e){
this.renderFieldData(e);
},
renderFieldData:function(e){
this._o.$infoContainer.find(".js_field").each(function(){
var t=$(this),i=t.attr("name"),r=t.attr("type");
"undefined"!=typeof e[i]&&("checkbox"==r?t.checkbox("checked",!!e[i]):t.val(e[i]||"").trigger("blur keydown "));
});
},
renderGuidWords:function(){
var e=c.getEditor(this._o.ueditor,this._o.formItemsOpt);
return e.setContent(this.data.get("guide_words")),$("#guide_words_main").show(),
e;
},
renderSharePreview:function(e){
var t=this.data,i=$("#reprint_article_main");
i.html(wx.T(e.tpl,t.getData())),i.show();
},
getArticleType:function(){
return this.data.get("share_page_type");
},
renderSourceUrl:function(){
var e=this._o.$infoContainer,t=this.data.getData();
t.source_url_checked?(e.find(".js_url_area .article_url_setting").show(),$("#js_article_url_area").find(".js_article_url_allow_click").addClass("open")):(e.find(".js_url_area .article_url_setting").hide(),
$("#js_article_url_area").find(".js_article_url_allow_click").removeClass("open")),
e.find(".js_url_area .article_url_setting").html(t.source_url);
},
renderAdBackTransition:function(){
var e=this._o.$infoContainer,t=this.data.getData(),i=t.ad_video_transition&&t.ad_video_transition.ad_video_transition,r="undefined"!=typeof localStorage.getItem("adTransitionText")?localStorage.getItem("adTransitionText"):null,a=void 0;
a=t.is_new_create?i||t.advert_info&&t.advert_info.back_transition&&t.advert_info.back_transition.ad_video_transition||r||m:i||t.advert_info&&t.advert_info.back_transition&&t.advert_info.back_transition.ad_video_transition,
e.find(".ad_transition_area").show(),a&&a!==g?(e.find(".js_ad_back").checkbox("checked",!0),
t.ad_video_transition={
ad_video_transition:a
},e.find(".ad_transition_area .ad_text_setting").html(a||""),e.find(".ad_transition_area .ad_text_setting").show()):(e.find(".js_ad_back").checkbox("checked",!1),
e.find(".ad_transition_area .ad_text_setting").html(""),e.find(".ad_transition_area .ad_text_setting").hide()),
$("#ad_transition_area").find(".js_ad_allow_click").addClass("open");
},
replaceMedia:function(){},
setAuthorInfo:function(e){
var t=this.data;
t.set("writerid",e.writerid),"undefined"!=typeof e.copyright_type&&t.set("copyright_type",1*e.copyright_type),
e.writerid?("undefined"==typeof e.author_status?t.set("author_status",0):t.set("author_status",1*e.author_status),
"undefined"==typeof e.authority?t.set("authority",1):t.set("authority",1*e.authority)):(t.set("author_status",1),
t.set("authority",0)),t.set("author_username",e.author_username),t.set("author",e.author),
t.set("can_open_reward",1*e.can_open_reward),t.set("can_reward",1*e.can_reward),
t.set("reward_reply_id",e.reward_reply_id),this.isCurrentArticle()&&(this._o.$infoContainer.find('input[name="writerid"]').val(e.writerid),
this._o.$infoContainer.find('input[name="author_username"]').val(e.author_username),
this._o.$infoContainer.find('input[name="author"]').val(e.author),this._o.$infoContainer.find('input[name="can_open_reward"]').val(1*e.can_open_reward),
this._o.$infoContainer.find('input[name="can_reward"]').val(1*e.can_reward),this.renderReward());
},
getAuthorInfo:function(){
var e=this.data,t=1*e.get("author_status"),i=e.get("writerid"),r=e.get("authority"),a=e.get("author_username"),s=1*e.get("can_open_reward"),n=1*e.get("can_reward"),o=e.get("author"),d=e.get("reward_reply_id");
return!i||r&&!t&&s||(t=0,r=0,i="",a="",s=0,n=0,o="",d=""),{
writerid:i,
author_username:a,
author:o,
can_open_reward:s,
author_status:t,
can_reward:n,
authority:r,
copyright_type:e.get("copyright_type"),
reward_reply_id:d
};
},
renderCover:function(){
var e=this._o.$infoContainer,t=this.data.getData(),r=t.cover,a=e.find(".js_cover_preview");
a.find("img").remove(),r&&(n.isLocalDomain(r)||i.isOuterWhiteDomain(r))?a.show().css("backgroundImage",'url("'+r+'")'):(this._g.$item.removeClass("has_thumb").find(".js_appmsg_thumb").css("backgroundImage",'url("")'),
a.hide(),e.find(".js_cdn_url").val(""),e.find(".js_file_id").val(""),e.find(".js_cdn_url_back").val("")),
this.changeCoverPreviewCss(a);
},
changeCoverPreviewCss:function(e){
if(this.isCurrentArticle()){
var t=this.getIndex();
e||(e=this._o.$infoContainer.find(".js_cover_preview")),0==t?e.addClass("first_appmsg_cover"):e.removeClass("first_appmsg_cover");
}
},
titleChange:function(e){
this.isCurrentArticle()&&(this._o.$infoContainer.find('.js_field[name="title"]').val(e.title).trigger("blur keydown "),
this._g.$item.find(".js_appmsg_title").text(e.title)),this.data.set("title",e.title);
},
videoLengthChange:function(e){
this.isCurrentArticle()&&this._g.$item.find(".js_appmsg_video_length").text(e.duration);
},
coverChange:function(e){
var t,i,r,a,s=this._o.$infoContainer,n=e.multiSize,o={
crop_list:[]
};
if(n){
n["16_9"]&&n["16_9"].url&&(t=n["16_9"].url.http2https().nogif()),n["16_9"]&&n["16_9"].file_id&&(i=n["16_9"].file_id),
n["2.35_1"]&&n["2.35_1"].url&&(r=n["2.35_1"].url.http2https().nogif()),n["1_1"]&&n["1_1"].url&&(a=n["1_1"].url.http2https().nogif());
for(var d in n){
var _=n[d];
o.crop_list.push({
ratio:d,
x1:Math.floor(_.absX1),
y1:Math.floor(_.absY1),
x2:Math.floor(_.absX2),
y2:Math.floor(_.absY2)
});
}
}
var c="";
c=e.url?e.url.http2https().nogif():wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(e.file_id)),
t||(t=c),i||(i=e.file_id),r||(r=c),a||(a=c);
var l,h=e.oriUrl||c,u=this.getIndex();
if(l=1*u===0?r:a,this.isCurrentArticle()){
var f=s.find(".js_cover_preview");
if(f.show(),f.css("backgroundImage",'url("'+l+'")'),f.find("input.js_file_id").val(i),
f.find("input.js_cdn_url").val(t),f.find("input.js_cdn_url_back").val(h),1*e.coverPic===1&&h){
var p=this._o.ueditor.getUeditor(),m=p.selection.getRange(),g=m.createBookmark(),v=p.body.firstChild;
m.setEndBefore(v),m.setStartBefore(v),p.fireEvent("insertMaterialImg",{
format:e.oriFormat,
src:h
}),m.moveToBookmark(g),m.select(),p.fireEvent("contentchange",!0),p.fireEvent("scrollIntoView",$("#author"),200);
}
s.find(".js_show_cover_pic").val("0"),this._g.$item.find(".js_appmsg_thumb").css("backgroundImage",'url("'+l+'")'),
this._g.$item.addClass("has_thumb"),this.changeCoverPreviewCss(f);
}
this.data.set("file_id",i),this.data.set("cdn_url",t),this.data.set("cdn_235_1_url",r),
this.data.set("cdn_1_1_url",a),this.data.set("cover",t),this.data.set("cdn_url_back",h),
this.data.set("show_cover_pic",0),this.data.set("crop_list",o);
},
renderComment:function(){
var e=this._o.$infoContainer,t=this.data.getData();
e.find(".js_comment").checkbox("checked",0!=t.need_open_comment),$(".js_comment_setting").each(function(e){
e==Number(t.only_fans_can_comment||0)?$(this).checkbox("checked",!0):$(this).checkbox("checked",!1);
}),0==t.need_open_comment?($("#js_comment_area").find(".comment_setting").hide(),
$("#js_comment_area").find(".js_comment_allow_click").removeClass("open")):($("#js_comment_area").find(".comment_setting").show(),
$("#js_comment_area").find(".js_comment_allow_click").addClass("open")),e.find("#js_comment_area").find(".comment_setting").html($(".js_comment_setting:checked").data("label"));
},
renderRelatedVideo:function(){
var e=this._o.cgiData;
if(e.can_use_related_video){
$("#js_related_video_area").show();
var t=this._o.$infoContainer,i=this.data.getData(),r=i.related_video||[],a=i.is_video_recommend;
if(t.find(".js_related_list").empty(),console.log("is_video_recommend data",this.data.get("is_video_recommend")),
-1==this.data.get("is_video_recommend"))1===wx.cgiData.can_use_video_recommend&&wx.cgiData.can_use_watch_more?(t.find(".js_related_video_desc").html("智能推荐本公众号已群发视频").show().data("related_video",""),
t.find(".js_recommend_wording").show(),t.find(".js_related_video_checkbox").checkbox("checked",!0),
t.find(".js_related_video_radio_suggestion").addClass("selected"),t.find(".js_related_video_radio_custom").removeClass("selected"),
t.find(".js_related_list").empty(),$(".js_relate_video_modify").hide()):(t.find(".js_related_video_radio_suggestion").removeClass("selected"),
t.find(".js_related_video_radio_custom").removeClass("selected"),t.find(".js_related_video_desc").html("").hide().data("related_video",""),
t.find(".js_related_video_checkbox").checkbox("checked",!1));else if(r.length){
t.find(".js_related_video_desc").html("已选%s条视频".sprintf(r.length)).show().data("related_video",JSON.stringify(r)),
t.find(".js_related_video_checkbox").checkbox("checked",!0),t.find(".js_related_video_radio_custom").addClass("selected"),
t.find(".js_related_video_radio_suggestion").removeClass("selected");
for(var s=0;s<r.length;s++)$(".js_related_list").append("<li>"+r[s].title+"</li>");
$(".js_relate_video_modify").show(),$(".js_recommend_wording").hide();
}else 1===a?(t.find(".js_related_video_desc").html("智能推荐本公众号已群发视频").show().data("related_video",""),
t.find(".js_recommend_wording").show(),t.find(".js_related_video_checkbox").checkbox("checked",!0),
t.find(".js_related_video_radio_suggestion").addClass("selected"),t.find(".js_related_video_radio_custom").removeClass("selected")):(t.find(".js_related_video_radio_suggestion").removeClass("selected"),
t.find(".js_related_video_radio_custom").removeClass("selected"),t.find(".js_related_video_desc").html("").hide().data("related_video",""),
t.find(".js_related_video_checkbox").checkbox("checked",!1)),$(".js_relate_video_modify").hide();
}
},
renderReward:function(){
var e=this._o.$infoContainer,i=this._o.$infoContainer.find(".js_reward_container"),a=this.data.get("author"),s=this.data.get("can_reward"),n=this.data.get("can_open_reward"),o=this.data.get("writerid"),d=this.data.get("authority"),_=this.data.get("author_status"),c=this.data.get("copyright_type"),l=this.data.get("is_share_copyright"),h=e.find(".js_author_container"),u=e.find("input.js_author"),f=e.find(".js_reward_tips");
if(1==c&&o||0==l&&2==c?h.addClass("author_active"):h.removeClass("author_active"),
1==c&&!d&&o){
var p=wx.T(t,{
text:encodeURIComponent("赞赏账户授权已失效，要重新获得授权，请前往赞赏账户小程序添加本公众号")
});
h.addClass("author_status_warn"),u.siblings(".js_author_warn").remove(),$(p).insertBefore(u),
r.init({
$container:h
});
}else h.removeClass("author_status_warn"),u.siblings(".js_author_warn").remove();
1===this.data.get("is_pay_subscribe")?(h.removeClass("author_original"),this.editor.fireEvent("setAuthorStatus",{
status:!0,
readonly:!0,
hideCounter:!0
})):1==c?(h.addClass("author_original"),this.editor.fireEvent("setAuthorStatus",{
status:!0,
readonly:!0,
hideCounter:!0
})):(h.removeClass("author_original"),this.editor.fireEvent("setAuthorStatus",{
status:!0
}));
var m=this.getRewardErrorText();
!m&&s&&o&&d&&!_&&n||0==l&&2==c?(i.find(".js_author_username").text(a),i.find(".js_reward_preview_list").show(),
i.find(".js_no_reward_list").hide(),i.find(".js_reward_error").hide(),f.text("已开启")):(m?i.find(".js_reward_error").text(m).show():i.find(".js_reward_error").hide(),
i.find(".js_reward_preview_list").hide(),i.find(".js_no_reward_list").show(),f.text("未开启"));
},
triggerInputValidate:function(){
var e=this._o.$infoContainer,t=["input.js_title","input.js_author","textarea.js_desc"];
t=t.join(","),e.find(t).trigger("keydown"),e.find(t).trigger("blur");
},
renderReprintSource:function(){
var e=this._o.$infoContainer.find("#js_reprint_source"),t=this.data.getData();
e.find(".js_reprint_biz_avatar").attr("src",t.copyright_headimg||"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0"),
e.find(".js_reprint_biz_nickname").html(t.copyright_nickname),e.find(".js_reprint_author").html(t.author),
e.find(".js_reprint_biz_profile_description").html(t.profile_description),e.find(".js_reprint_recommend_title").val(t.reprint_recommend_title).trigger("blur"),
e.find(".js_reprint_recommend_title_len").html(t.reprint_recommend_title.length),
e.find(".js_reprint_recommend_content").html(t.reprint_recommend_content).trigger("blur"),
e.find(".js_reprint_recommend_content_len").html(this.getReprintRecommendContentLen(t.reprint_recommend_content||"")),
e.show();
},
renderReprintTips:function(e){
if(e){
var t=this._o.$infoContainer.find("#js_reprint_article_tips");
t.find(".js_content").text(e),t.show();
}
},
getReprintRecommendContentLen:function(e){
var t=document.createElement("div");
return t.innerHTML=e,t.innerText.replace(/\s/g,"").length;
},
openAdBackTips:function(){
var e=localStorage.getItem("hasCloseAdTips-"+wx.commonData.data.uin);
"true"!==e&&$(".advert_tips").show();
},
renderAdBackTips:function(){
var e=this.data.getData(),t=this._o.cgiData;
if(5===e.share_page_type){
var i=t.advert_ctrl||{},r=i.can_open_video_back_seller,a=i.is_adseller,s=i.is_video_back_adseller;
1===a?0===s?1===r&&this.openAdBackTips():1===s?this.renderAdBackTransition():($(".ad_transition_area").hide(),
$(".ad_transition_area .ad_text_setting").hide(),$(".js_ad_back").checkbox("checked",!1),
$("#ad_transition_area").find(".js_ad_allow_click").removeClass("open")):1===r&&this.openAdBackTips();
}else $(".advert_tips").hide(),$(".ad_transition_area").hide();
},
renderSettingTitle:function(e){
var t=C[e];
$("#article_type_setting").text(t);
},
renderVideoDotArea:function(e){
var t=$("#video_dot_area"),i=t.find("#video_dot_checkbox");
if(e.share_page_type===k&&wx.cgiData.canUseVideoPaster)if(t.show(),e.share_videoinfo[0].play_length>=v&&(e.isMyMpVideo||e.is_my_mp_video))if(t.removeClass("video-disabled"),
i.attr("disabled",!1),e.dot&&Object.keys(e.dot).length){
i.checkbox("checked",!0);
var r=e.dot.list[0].begin_time,a="在%s开始出现贴片".replace("%s",j(r));
t.find(".js_paster_setting_text").html(a);
}else i.checkbox("checked",!1),t.find(".js_paster_setting_text").html("");else t.addClass("video-disabled"),
i.attr("disabled",!0),i.checkbox("checked",!1),t.find(".js_paster_setting_text").html("");else t.hide();
},
updateTitleInputCounter:function(e){
this._o.ueditor.fireEvent("updateTitleInputCounter",e);
},
renderCommon:function(){
var e=this.data.getData(),t=e.share_page_type;
this.renderFieldData(e),this.renderComment(),this.renderCover(),this.renderSettingTitle(t),
this.renderAdBackTips(),this.renderVideoDotArea(e),this.renderSourceUrl(),this.renderOriginal(),
this.renderAd(),this.triggerInputValidate(),this.updateTitleInputCounter(64);
},
resetBeforeRender:function(){
$("#word_count_container").remove(),$("#js_checktext").remove(),$("#guide_words_main").hide(),
$("#reprint_article_main").hide(),$("#js_reprint_source").hide(),$("#js_reprint_article_tips").hide(),
$("#js_related_video_area").hide(),$("#js_video_title_input").hide();
var e=$("#js_pay_setting_area").hide(),t=e.find(".js_pay_setting_disabled_tips");
1===t.length&&(e.find(".js_pay_setting_radio").eq(1).prop("disabled",!1).parent().removeClass("disabled"),
t.html("")),$("#js_pay_preview_popup").hide();
var i=this._o.$infoContainer;
i.find(".js_plublish_style").show(),i.find(".js_cover_tip").html("").hide(),i.find("#article_setting_area2").show().find('.js_pay_hide_item[data-pay="1"]').removeAttr("data-pay"),
this.handleEditTips(),this.setTextEditorWordlimit(this._o.defaultGuideWordlimit);
var r=c.getEditor(this._o.ueditor,this._o.formItemsOpt);
r&&r.selector$.find(".js_editorTip").hide();
},
render:function(){
this.resetBeforeRender(),this.renderCommon();
var e=c.getEditor(this._o.ueditor,this._o.formItemsOpt);
e&&e.undumpUndoManager(this._o.undoManagerState);
},
destroy:function(){}
});
return x;
});define("tpl/media/appmsg_tmpl.html.js",[],function(){
return'<div class="js_appmsg appmsg single" data-id="{appmsgid}">\n    <div class="appmsg_content">\n        <div class="appmsg_info">\n            {if showUpdateTime}\n                <em class="appmsg_date">更新于 {update_time_str}</em>            \n            {/if}\n        </div>\n        <div class="appmsg_item">\n            <h4 class="appmsg_title js_title">\n                <span>{=title_encode}</span>\n            <div class="appmsg_thumb_wrp">\n              {=iframeHtml}\n            </div>\n            {if canPreview}            \n            {else if !canSelect}\n            <a href="javascript:;" style="display: block;" class="edit_mask preview_mask temp_mask">\n                <div class="edit_mask_content">\n                    <p class=""></p>\n                </div>\n                <span class="vm_box"></span>\n            </a>\n            {/if}\n        </div>\n        {if canSelect}\n        <div class="js_mask edit_mask appmsg_mask">\n            <i class="icon_card_selected">已选择</i>\n        </div>\n        {/if}\n    </div>\n    {if showEdit}\n    <div class="appmsg_opr">\n        <ul>\n            <li class="appmsg_opr_item grid_item size1of2">\n            <a target="_blank" class="js_tooltip" href="/cgi-bin/appmsgtemplate?action=edit&lang=zh_CN&token={token}&appmsgid={appmsgid}" data-tooltip="编辑">&nbsp;<i class="icon18_common edit_gray">编辑</i></a>\n            </li>\n            <li class="appmsg_opr_item grid_item size1of2 no_extra">\n                <a class="js_del no_extra js_tooltip" data-id="{appmsgid}" href="javascript:void(0);" data-tooltip="删除">&nbsp;<i class="icon18_common del_gray">删除</i></a>\n            </li>\n        </ul>\n    </div>\n    {/if}\n</div>\n';
});define("tpl/media/cps_template/card_tmpl.html.js",[],function(){
return'<!--cps card类卡片-->\n<!--fail_cps的时候加className cps_inner_fail-->\n<!--hover的时候加className hover-->\n<section class="cps_inner cps_inner_card inner_edit js_product_container js_banner_container">\n    <div class="cps_inner_wrp js_product_loop_content" data-pidtype="2" data-templateid="{{templateid}}" data-appid="{{appid}}" data-pid="{{pid}}" data-wxaappid="{{wxaappid}}" data-wxapath="{{wxapath}}">\n        <div class="cps_inner_content">\n            <figure class="cps_inner_image_container">\n                <!--<span width="100%" class="js_cover cps_inner_image" style="background: url({{img_url}}) no-repeat center; background-size:cover;"></span>-->\n                <img width="100%" class="js_cover cps_inner_image" data-src="{{img_url}}" style="width: 100%!important" >\n                <!--is_ad === 1时候，出现”广告“两个字-->\n                <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                <div class="cps_inner_info_from">\n                    <span data-ratio="1" data-nopreviewclick="1" class="cps_inner_ic_from" style="background: url({{source_logo_url}}) no-repeat center;\n                    background-size: contain;"></span>{{source_name}}\n                </div>\n            </figure>\n            <div class="cps_inner_info">\n                <div class="cps_inner_info_hd">\n                    <h2 class="cps_inner_info_title">{{title}}</h2>\n                    <!--<p class="cps_inner_info_desc">{{desc}}</p>-->\n                </div>\n\n                <div class="cps_inner_info_ft">\n                    <!--is_ad === 1时候，出现”购买“，否则出”详情“-->\n                    <span class="cps_inner_btn_cps_info buy"><!--<i class="cps_inner_ic_miniapp"></i><span class=\'js_btn_word\'>购买</span>--></span><!--这里有个逻辑判断-->\n                    <p class="cps_inner_info_desc price"><span class="price_sign">¥</span>{{price}}</p><!--价格-->\n                    \n                </div>\n            </div>\n        </div>\n        <div class="cps_inner_audit_fail_mask js_cps_check_fail">\n            <p class="cps_inner_cps_audit_fail">\n                <span class="cps_inner_ic_audit_fail"></span>该商品存在违规，请删除后操作            </p>\n        </div>\n        <!--hover 操作 begin-->\n        <div class="hover_mask">\n            <span class="hover_operation_ele js_change_cps_tmpl">\n                <div class="active_wrp js_change_cps_tmpl_a" title="更换模版">\n                    <span class="ic icon20_common edit_media_white"></span>\n                    <p class="hover_operation_ele_desc">更换模版</p>\n                </div>\n            </span>\n            <span class="hover_operation_ele js_del_cps_card">\n                <div class="active_wrp js_del_cps_card_a" title="删除">\n                    <span class="ic icon20_common del_media_white"></span>\n                    <p class="hover_operation_ele_desc">删除</p>\n                </div>\n            </span>\n        </div>\n        <!--hover 操作 end-->\n    </div>\n</section>';
});define("tpl/media/cps_template/banner_tmpl.html.js",[],function(){
return'<!--cps banner类卡片-->\n<!--fail_cps的时候加className cps_inner_fail-->\n<!--hover的时候加className hover-->\n<section class="cps_inner cps_inner_banner inner_edit js_product_container js_banner_container">\n    <div class="cps_inner_wrp js_product_loop_content" data-pidtype="2" data-templateid="{{templateid}}" data-appid="{{appid}}" data-pid="{{pid}}" data-wxaappid="{{wxaappid}}" data-wxapath="{{wxapath}}">\n        <div class="cps_inner_content">\n            <figure class="cps_inner_image_container">\n                <img width="100%" class="js_cover cps_inner_image" data-src="{{img_url}}" style="width: 100%!important" >\n                <!--<span width="100%" class="js_cover cps_inner_image" style="background: url({{img_url}}) no-repeat center; background-size: cover;"></span>-->\n            </figure>\n            <!--is_ad === 1时候，出现”广告“两个字-->\n            <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n            <div class="cps_inner_info">\n                <div class="cps_inner_info_hd">\n                    <h2 class="cps_inner_info_title">{{title}}</h2>\n                    <p class="cps_inner_info_desc">{{desc}}</p>\n                </div>\n\n                <div class="cps_inner_info_ft">\n                    <div class="cps_inner_info_from">\n                        <span data-ratio="1" data-nopreviewclick="1" class="cps_inner_ic_from" style="background: url({{source_logo_url}}) no-repeat center;\n                        background-size: contain;"></span>{{source_name}}\n                    </div>\n                    <!--is_ad === 1时候，出现”购买“，否则出”详情“-->\n                    <span class="cps_inner_btn_cps_info buy"><!--<i class="cps_inner_ic_miniapp"></i><span class="js_btn_word">购买</span>--></span><!--这里有个逻辑判断-->\n                </div>\n            </div>\n        </div>\n        <div class="cps_inner_audit_fail_mask js_cps_check_fail">\n            <p class="cps_inner_cps_audit_fail">\n                <span class="cps_inner_ic_audit_fail"></span>该商品存在违规，请删除后操作            </p>\n        </div>\n        <!--hover 操作 begin-->\n        <div class="hover_mask">\n            <span class="hover_operation_ele js_change_cps_tmpl">\n                <div class="active_wrp  js_change_cps_tmpl_a" title="更换模版">\n                    <span class="ic icon20_common edit_media_white"></span>\n                    <p class="hover_operation_ele_desc">更换模版</p>\n                </div>\n            </span>\n            <span class="hover_operation_ele js_del_cps_card">\n                <div class="active_wrp js_del_cps_card_a" href="javascript:;" title="删除">\n                    <span class="ic icon20_common del_media_white"></span>\n                    <p class="hover_operation_ele_desc">删除</p>\n                </div>\n            </span>\n        </div>\n        <!--hover 操作 end-->\n    </div>\n</section>';
});define("tpl/media/cps_template/list_tmpl.html.js",[],function(){
return'<!--cps list类卡片-->\n<!--这里有个逻辑判断-->\n<!--pid_type != \'movie\'时候(即：图书、其他通用类目)，加className cps_inner_book-->\n<!--fail_cps的时候加className cps_inner_fail-->\n<!--hover的时候加className hover-->\n<section class="cps_inner cps_inner_list inner_edit js_list_container js_product_container">\n    <div class="cps_inner_wrp js_product_loop_content" data-pidtype="2" data-templateid="{{templateid}}" data-appid="{{appid}}" data-pid="{{pid}}" data-wxaappid="{{wxaappid}}" data-wxapath="{{wxapath}}">\n        <div class="cps_inner_content">\n            <figure class="cps_inner_image_container">\n                <img class="js_cover cps_inner_image" data-src="{{img_url}}" >\n                <!--<span class="js_cover cps_inner_image" style="background: url({{img_url}}) no-repeat center bottom; background-size: cover;"></span>-->\n            </figure>\n            <!--is_ad === 1时候，出现”广告“两个字-->\n            <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n            <div class="cps_inner_info">\n                <div class="cps_inner_info_hd">\n                    <!--通用模版，pid_type !== \'book\' && pid_type !== \'movie\'，加className line2-->\n                    <h2 class="cps_inner_info_title js_title">{{title}}</h2>\n                    <p class="cps_inner_info_desc js_desc">{{desc}}</p>\n                    <div class="cps_inner_info_from">\n                        <span data-ratio="1" data-nopreviewclick="1" style="background: url({{source_logo_url}}) no-repeat center;\n                        background-size: contain;" class="cps_inner_ic_from"></span>{{source_name}}\n                    </div>\n                </div>\n\n                <div class="cps_inner_info_ft">\n                    <!--is_ad === 1时候，出现”购买“，否则出”详情“-->\n                    <span class="cps_inner_btn_cps_info buy"><!--<i class="cps_inner_ic_miniapp"></i><span class=\'js_btn_word\'>购买</span>--></span>\n                    <p class="cps_inner_info_desc price js_price"><span class="price_sign">¥</span>{{price}}</p>\n                </div>\n            </div>\n        </div>\n        <div class="cps_inner_audit_fail_mask js_cps_check_fail">\n            <p class="cps_inner_cps_audit_fail">\n                <span class="cps_inner_ic_audit_fail"></span>该商品存在违规，请删除后操作            </p>\n        </div>\n        <!--hover 操作 begin-->\n        <div class="hover_mask">\n            <span class="hover_operation_ele js_change_cps_tmpl">\n                <div class="active_wrp js_change_cps_tmpl_a" title="更换模版">\n                    <span class="ic icon20_common edit_media_white"></span>\n                    <p class="hover_operation_ele_desc">更换模版</p>\n                </div>\n            </span>\n            <span class="hover_operation_ele js_del_cps_card">\n                <div class="active_wrp js_del_cps_card_a" title="删除">\n                    <span class="ic icon20_common del_media_white"></span>\n                    <p class="hover_operation_ele_desc">删除</p>\n                </div>\n            </span>\n        </div>\n        <!--hover 操作 end-->\n    </div>\n</section>\n';
});define("tpl/media/cps_template_dialog.html.js",[],function(){
return'<!--选择商品皮肤弹窗 begin-->\n<div class="dialog_select_product_skin">\n    <!--banner类 begin-->\n    <!--选中时，这里加className selected-->\n    {if show_type == \'banner\'}\n    <div class="dialog_select_product_skin_ele js_cps_template {select_id == \'banner\'? \'selected\': \'\'}" data-id="banner">\n        <div class="dialog_select_product_skin_ele_hd">海报大图</div>\n        <div class="dialog_select_product_skin_ele_bd">\n            <section class="js_product_container cps_inner cps_inner_banner" style="">\n                <div class="js_product_loop_content cps_inner_wrp" style="">\n                    <!-- 数据加载成功模版 -->\n                    <div class="cps_inner_content">\n                        <figure class="cps_inner_image_container">\n                            <img class="cps_inner_image" width="100%" src="data:image/png;base64,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" data-ratio="1" data-forceheight="100%" data-nopreviewclick="1" alt="" style="">\n                        </figure>\n                        <span class="cps_inner_info_adTag" style="">广告</span>\n                        <div class="cps_inner_info" style="">\n                            <div class="cps_inner_info_hd">\n                                <h2 class="cps_inner_info_title" style="">电影名称</h2>\n                                <p class="cps_inner_info_desc" style="">主演名称</p>\n                            </div>\n                            <div class="cps_inner_info_ft" style="">\n                                <div class="cps_inner_info_from" style="">\n                                    <i class="cps_inner_ic cps_inner_ic_from ic_undefined"></i>来源                                </div>\n                                <span class="cps_inner_btn_cps_info buy" style=""><!--<i class="cps_inner_ic_miniapp"></i>购买--></span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n        \n        <div class="selected_mask">\n            <div class="selected_mask_inner"></div>\n            <div class="selected_mask_icon"></div>\n        </div>\n    </div>\n    {else}\n    <!--卡片类 begin-->\n    <div class="dialog_select_product_skin_ele js_cps_template {select_id == \'card\'? \'selected\': \'\'}" data-id="card">\n        <div class="dialog_select_product_skin_ele_hd">大图</div>\n        <div class="dialog_select_product_skin_ele_bd">\n            <section class="js_product_container cps_inner cps_inner_card" style="">\n                <div class="js_product_loop_content cps_inner_wrp" style="">\n                    <!-- 数据加载成功模版 -->\n                    <div class="cps_inner_content">\n                        <figure class="cps_inner_image_container">\n                            <img class="cps_inner_image" width="100%" src="data:image/png;base64,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" data-ratio="1" data-forceheight="100%" data-nopreviewclick="1" alt="" style="">\n                            <span class="cps_inner_info_adTag" style="">广告</span>\n                            <div class="cps_inner_info_from" style="">\n                                <i class="cps_inner_ic cps_inner_ic_from ic_undefined"></i>来源                            </div>\n                        </figure>\n                        <div class="cps_inner_info" style="">\n                            <div class="cps_inner_info_hd">\n                                <h2 class="cps_inner_info_title" style="">商品名称</h2>\n                                \n                            </div>\n                            <div class="cps_inner_info_ft" style="">\n                                <span class="cps_inner_btn_cps_info buy" style=""><!--<i class="cps_inner_ic_miniapp"></i>购买--></span>\n                                <p class="cps_inner_info_desc" style="">金额</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n        \n        <div class="selected_mask">\n            <div class="selected_mask_inner"></div>\n            <div class="selected_mask_icon"></div>\n        </div>\n    </div>\n    {/if}\n    <!--列表类 begin-->\n    <!--选中时，这里加className selected-->\n    <div class="dialog_select_product_skin_ele js_cps_template {select_id == \'list\'? \'selected\': \'\'}" data-id="list">\n        <div class="dialog_select_product_skin_ele_hd ">列表        </div>\n        <div class="dialog_select_product_skin_ele_bd">\n            <section class="js_product_container cps_inner cps_inner_list" style="">\n                <div class="js_product_loop_content cps_inner_wrp" style="">\n                    <!-- 数据加载成功模版 -->\n                    <div class="cps_inner_content">\n                        <figure class="cps_inner_image_container">\n                            <img width="100%" class="cps_inner_image" data-ratio="1" data-forceheight="100%" data-nopreviewclick="1" alt="" style="" src="data:image/png;base64,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">\n                        </figure>\n                        <span class="cps_inner_info_adTag" style="">广告</span>\n                        <div class="cps_inner_info" style="">\n                            <div class="cps_inner_info_hd">\n                                <h2 class="cps_inner_info_title" style="">{if show_type == \'banner\'}电影名称{else}商品名称{/if}</h2>\n                                {if show_type == \'banner\'}\n                                <p class="cps_inner_info_desc" style="">主演名称</p>\n                                {/if}\n                                <div class="cps_inner_info_from" style="">\n                                    <i class="cps_inner_ic cps_inner_ic_from ic_undefined"></i>来源                                </div>\n                            </div>\n                            <div class="cps_inner_info_ft" style="">\n                                <span class="cps_inner_btn_cps_info buy" style=""><!--<i class="cps_inner_ic_miniapp"></i>购买--></span>\n                                {if show_type != \'banner\'}\n                                <p class="cps_inner_info_desc price">金额</p>\n                                {/if}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n        <div class="selected_mask">\n            <div class="selected_mask_inner"></div>\n            <div class="selected_mask_icon"></div>\n        </div>\n    </div>\n</div>\n    <!--选择商品皮肤弹窗 end-->';
});define("tpl/media/product_highline_style.html.js",[],function(){
return'<style>body{margin:0;font-family:"Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","\\9ED1\\4F53",Arial,sans-serif;}</style>';
});define("tpl/media/product_iframe_smart_tips.html.js",[],function(){
return'<section style="position: relative;z-index: 1;margin-bottom: -32px">\n  <div style="height: 32px;background-color: #1AAD19;background-color: rgba(26,173,25,.9);display: inline-block;border-radius: 0 0 10px 10px;font-size: 12px;color: #fff;line-height: 32px;padding: 0 16px;"><span style="display: inline-block;vertical-align: -2px;background: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAFfvTeYAAAABGdBTUEAALGPC/xhBQAAAmdJREFUOBGNlEtIVVEUhr23dw0qR6FJDzCLkiyhJs0CB4EEYUUDqUnvQRjOhAZNkhooDUKCoiAjkCYJRYGDBj0hgyKzouwl9CRKyazs9v3rrn3c96TVD99ej732Ovvsfc8tKkopoziHPJ9NzadDKq+oHJ1O5ghKLcD5LAe7F/pBsoco+Qs2K+NqTVr4qgnpRLFXPsa+df+cbZigDyo8aSabQbRoh3UwAJVwEmxXFeaMN9CjJmo3Eb8XdkLBuWRJLAWpjGaXvaG6v4duWA0jzK+Cn7CF2LbQSPAcFoFUBa9hkoJII7YgDEwsjyYX4k+B/fAhyuevISwKVsXB/6el+Lp3PIs9AudhyR8LSR4E6ZkmsdstyuVOuZV5CXWa/AG7oQuku1Bi3uhp9hDvU04LjsMLeAjSEBwzb3RQ7iZcte15vhT7Bc6A7mAmhCa4Jt2P7Xm9Qvfr83O5r27tDsK8LfBCFXyHGx6vwL+kQtdgUhwcJoqDH1vy0+J4XJ9C3fgueADXYEEoxv/vCy74JasBixdDO+h9h2AqtMBKaCW/DHRG32RdOoLbcAjWwizmC0VyIzwCaSBvbNQX0QZHQb/fcrgI0h51wW5VEEl/HrFqVKTPUBeha17jC3XtsU54vi5O4g+n4g6vm09eb6oNz1NODyqDdyDpc50Nc6AfJNm50KsA3Yc75v19aLIHhIHaGXDP17zBPoUO0AO2QQNIH6EadHevIEjHWgs9nniCnR76J5ZkBjq96AJWd9ACt0Bvchi0ER1tWl0kDkD4S96UNB7L8WJ9q32wAyaPVacccyWwAfQm+mw/QXNc/xvj7PMZChXlSwAAAABJRU5ErkJggg==\')  0 0 no-repeat;width: 25px;height: 16px;-webkit-background-size: cover;background-size: cover;margin-right: 5px;"></span>非该位置最终商品，以实际推荐为准</div>\n</section>\n';
});define("tpl/media/product_style_dialog_content.html.js",[],function(){
return'<div class="js_content dialog_media_container">\n  <div class="mpui-media-list-wrp">\n    <p class="js_loading icon_loading_small white">加载中</p>\n  </div>\n</div>';
});define("tpl/media/product_style_dialog_list.html.js",[],function(){
return'{each list as item index}\n<label for="product_style_{index}" class="product-style">\n  <div class="js_checkbox_parent product-style__meta">\n    <i class="icon_radio"></i>\n    <span class="product-style__name">{item.name}</span>\n    <input type="radio" class="frm_radio" name="productstyle" data-id="{item.id}" id="product_style_{index}">\n  </div>\n  <div class="product-style__container">\n  	{if item.cover}\n    <img src="{item.cover}" alt="">\n    {else}\n    {=html}\n    {/if}\n  </div>\n</label>\n{/each}';
});define("tpl/media/product_smart_tips.html.js",[],function(){
return"<p>商品将会根据用户特征进行个性化推荐展示，以提升转化。</p>\n<br>	\n<p>此外，包含个性化推荐商品的文章将会被系统分时段推送至用户，以进一步提升转化。</p>";
});define("tpl/media/product_import_select_result.html.js",[],function(){
return'{if errMsg}\n  <span class="filter-fail">{errMsg}</span>\n{else if templateFileLink}\n  <span class="filter-fail">\n  文件格式有误，<a href="{templateFileLink}" target="_blank" download="商品筛选模版.xls">下载商品筛选模版</a>  </span>\n{else}  \n  <span class="filter-fail">\n  成功导入筛选{suc_num}个商品  {if err_num>0}\n  ，{err_num}个商品筛选失败，    {if err_link}\n    <a href="{err_link}" target="_blank" download="筛选失败商品列表.xls">下载筛选失败的商品列表</a>    {/if}\n  {/if}  \n  </span>  \n{/if}\n。&nbsp;&nbsp;<a href="javascript:;" class="js_clear_import">清空筛选</a>';
});