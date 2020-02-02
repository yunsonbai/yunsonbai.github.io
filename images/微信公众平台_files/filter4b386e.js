define("pages/editor/editor_for_web1.js",["3rd/editor/editor.js","pages/modules/media_dialog/question_dialog/questionDialog4Web1.js","pages/modules/media_dialog/link_dialog/linkDialog4Web1.js","pages/editor/audioMusicDialog4Web1.js","pages/editor/videoDialog4Web1.js","pages/editor/weappDialog4Web1.js","pages/editor/videoAdBackPanelDialog4web1.js","pages/editor/videoTransitionDialog4web1.js","pages/editor/cpsDialog4Web1.js","pages/editor/blockquoteDialog4Web1.js","pages/modules/media_dialog/image_dialog/imageDialog4Web1.js","pages/editor/ad_insert_statement_dialog.js","pages/modules/media_dialog/music_check_dialog/musicCheckDialog4Web1.js","pages/modules/media_dialog/pay_statement_dialog/payStatementDialog4Web1.js","pages/editor/eventBus4Web1.js","pages/editor/editor_store.js","vat/vat.js","pages/modules/media_dialog/red_package_cover_dialog/redPackageCoverDialog4Web1.js"],function(e,a,s){"use strict"
e("3rd/editor/editor.js")
var i=e("pages/modules/media_dialog/question_dialog/questionDialog4Web1.js"),t=e("pages/modules/media_dialog/link_dialog/linkDialog4Web1.js"),o=e("pages/editor/audioMusicDialog4Web1.js"),d=e("pages/editor/videoDialog4Web1.js"),n=e("pages/editor/weappDialog4Web1.js"),l=e("pages/editor/videoAdBackPanelDialog4web1.js"),g=e("pages/editor/videoTransitionDialog4web1.js"),r=e("pages/editor/cpsDialog4Web1.js"),c=e("pages/editor/blockquoteDialog4Web1.js"),u=e("pages/modules/media_dialog/image_dialog/imageDialog4Web1.js"),p=e("pages/editor/ad_insert_statement_dialog.js"),m=e("pages/modules/media_dialog/music_check_dialog/musicCheckDialog4Web1.js"),v=e("pages/modules/media_dialog/pay_statement_dialog/payStatementDialog4Web1.js"),b=e("pages/editor/eventBus4Web1.js"),D=e("pages/editor/editor_store.js"),_=e("vat/vat.js"),j={redPackageCoverDialog:e("pages/modules/media_dialog/red_package_cover_dialog/redPackageCoverDialog4Web1.js"),payStatementDialog:v},B=_.init({el:"#vue_app",store:D,data:function(){var e={audioMusicDialog:o.getParmas(),videoDialog:d.getParmas(),weappDialog:n.getParmas(),cpsDialog:r.getParmas(),blockquoteDialog:c.getParmas(),adInsertStatementDialog:p.getParams(),videoAdBackPanelDialog:l.getParmas(),videoAdBackTransitionDialog:g.getParmas(),imageDialog:u.getParams(),linkDialog:t.getParmas(),musicCheckDialog:m.getParmas()}
for(var a in j){if(Object.prototype.hasOwnProperty.call(j,a))e[a.substr(0,1).toLocaleLowerCase()+a.substr(1)]=j[a].getParams()}return e},mounted:function(){for(var e in o.bindEvent({eventBus:b,params:this.audioMusicDialog}),d.bindEvent({eventBus:b,params:this.videoDialog}),l.bindEvent({eventBus:b,params:this.videoAdBackPanelDialog}),g.bindEvent({eventBus:b,params:this.videoAdBackTransitionDialog}),n.bindEvent({eventBus:b,params:this.weappDialog}),r.bindEvent({eventBus:b,params:this.cpsDialog}),c.bindEvent({eventBus:b,params:this.blockquoteDialog}),i.bindEvent({eventBus:b,$store:this.$store}),u.bindEvent({eventBus:b,$store:this.$store,params:this.imageDialog}),p.bindEvent({eventBus:b,$store:this.$store,params:this.adInsertStatementDialog}),t.bindEvent({eventBus:b,params:this.linkDialog}),m.bindEvent({eventBus:b,params:this.musicCheckDialog}),j)if(Object.prototype.hasOwnProperty.call(j,e)){var a=e.substr(0,1).toLocaleLowerCase()+e.substr(1)
j[e].bindEvent({eventBus:b,params:this[a]})}},methods:function(){var s={selectAudio:function(e){o.close({eventBus:b,data:e})},selectVideo:function(e,a,s){d.close({eventBus:b,data:e,tab:a,scene:s})},closeVideoAdBack:function(e){l.close({eventBus:b,data:e})},closeVideoAdTransition:function(e){g.close({eventBus:b,data:e})},selectWeapp:function(e){n.close({eventBus:b,data:e})},selectCps:function(e){r.close({eventBus:b,data:e})},selectBlockquote:function(e){c.close({eventBus:b,data:e})},selectQuestion:function(e){i.close({eventBus:b,data:e})},selectImage:function(e){u.close({eventBus:b,data:e})},closeAdInsertStatementDialog:function(){p.close({params:this.adInsertStatementDialog})},selectLink:function(e){t.close({eventBus:b,data:e})},closeMusicCheck:function(e){m.close({eventBus:b,data:e})}}
for(var e in j)Object.prototype.hasOwnProperty.call(j,e)&&function(a){var e=a.substr(0,1).toUpperCase()+a.substr(1)
s["close"+e]=function(e){j[a].close({eventBus:b,data:e})}}(e)
return s}()})
s.exports=B})
"use strict"
define("3rd/editor/editor.js",["widget/ueditor_new/themes/default/ueditor.css","widget/ueditor_new/themes/default/css/ueditor.css","widget/tooltip.css","3rd/editor/common/domUtils.js","3rd/editor/plugin/checkTextUtils.js","3rd/editor/tpl/layout.tpl.js","3rd/editor/plugin/filter.js","3rd/editor/common/no_editable.js","pages/modules/utils/cgi.js","3rd/editor/contextmenu.js","pages/modules/mplog/mplogd.js","3rd/editor/editor_options.js","3rd/editor/plugin/popup.js","3rd/editor/plugin/remoteimg.js","3rd/editor/plugin/filterPlugin.js","3rd/editor/plugin/scaleimg.js","3rd/editor/plugin/cropimg.js","3rd/editor/plugin/checkText.js","3rd/editor/plugin/wordcount.js","3rd/editor/plugin/multiple_tab.js","3rd/editor/plugin/insertcode/insertcode.js","3rd/editor/tpl/tooltip.tpl.js","3rd/editor/common/report.js","3rd/editor/common/monitor.js","3rd/wxgspeedsdk/wxgspeedsdk.js","pages/modules/dbCache/dbCache.js"],function(e,t,i){e("widget/ueditor_new/themes/default/ueditor.css"),e("widget/ueditor_new/themes/default/css/ueditor.css"),e("widget/tooltip.css")
var n,c=e("3rd/editor/common/domUtils.js"),b=c.domUtils,o=e("3rd/editor/plugin/checkTextUtils.js"),r=e("3rd/editor/tpl/layout.tpl.js"),d=e("3rd/editor/plugin/filter.js"),p=e("3rd/editor/common/no_editable.js"),s=e("pages/modules/utils/cgi.js"),a=e("3rd/editor/contextmenu.js"),l=e("pages/modules/mplog/mplogd.js"),u=e("3rd/editor/editor_options.js"),f=e("3rd/editor/plugin/popup.js"),g=e("3rd/editor/plugin/remoteimg.js"),h=e("3rd/editor/plugin/filterPlugin.js"),_=e("3rd/editor/plugin/scaleimg.js"),m=e("3rd/editor/plugin/cropimg.js"),v=e("3rd/editor/plugin/checkText.js"),y=e("3rd/editor/plugin/wordcount.js"),w=e("3rd/editor/plugin/multiple_tab.js"),C=e("3rd/editor/plugin/insertcode/insertcode.js"),k=e("3rd/editor/tpl/tooltip.tpl.js"),x=e("3rd/editor/common/report.js"),T=e("3rd/editor/common/monitor.js"),E=e("3rd/wxgspeedsdk/wxgspeedsdk.js"),D=e("pages/modules/dbCache/dbCache.js"),j={logInstance:null,allEditor:[],LANG:window.wx.data.lang,TOKEN:window.wx.data.t,URL:/^dev/.test(location.host)?"/mpres/htmledition/style/widget/ueditor_new/":"//res.wx.qq.com/mpres/htmledition/style/widget/ueditor_new/",clickReport:{blockquote:{id:"122325",key:"27"},inserttemplate:{id:"122325",key:"35"},templatelist:{id:"122325",key:"37"},link:{id:"122325",key:"39"},unlink:{id:"122325",key:"41"},mpemotion:{id:"122325",key:"43"},insertcode:{id:"122325",key:"51"},insertvideo:{id:"122333",key:"33"},insertaudio:{id:"122333",key:"35"},insertvote:{id:"122333",key:"37"},insertquestion:{id:"122333",key:"39"},insertcard:{id:"122333",key:"41"},insertad:{id:"122333",key:"43"},insertweapp:{id:"122333",key:"45"},insertcpsmoviebook:{id:"122333",key:"47"}}}
function S(e){this.__o={catchTipsDom:null,multipleTab:!1,maxArticleNum:8,app_id:Math.random()+"",needCheckText:!1,wordCount:!1,needPopup:!0,imgScale:!0,scaleimgWheelScroll:!1,cropimgWheelScroll:!1,plugins:[],onReady:function(){}},this.__ueditor_config={pluginsContainer:{},debug:0,layout:"",is_illegal:0,contextMenu:a,UEDITOR_HOME_URL:j.URL,isShow:!0,canChangeIframeHeight:!0,initialContent:"",autoClearinitialContent:!1,iframeCssUrl:wx.EditorRes.iframe,textarea:"editorValue",focus:!1,minFrameWidth:800,minFrameHeight:400,autoClearEmptyNode:!0,fullscreen:!1,readonly:!1,zIndex:999,imagePopup:!0,enterTag:"p",pageBreakTag:"_baidu_page_break_tag_",customDomain:!0,lang:j.LANG,theme:"default",allHtmlEnabled:!1,scaleEnabled:!1,elementPathEnabled:!1,autoHeightEnabled:!1,autoFloatEnabled:!1,sourceEditor:"textarea",imageUrl:"/cgi-bin/uploadimg2cdn?t=ajax-editor-upload-img&lang="+j.LANG+"&token="+j.TOKEN,imagePath:"",compressSide:1,catchRemoteImageEnable:!0,catcherUrl:"/cgi-bin/uploadimg2cdn?lang="+j.LANG+"&token="+j.TOKEN,separater:"",toolbars:[["more","|","fontsize","|","blockquote","horizontal","|","removeformat"],["bold","italic","underline","forecolor","backcolor","|","justifyleft","justifycenter","justifyright","justifyindent","|","rowspacingtop","rowspacingbottom","lineheight","letterspacing","|","insertorderedlist","insertunorderedlist","|","imagenone","imageleft","imageright","imagecenter"]],labelMap:{anchor:"",undo:""},topOffset:0},this.__init(e)}function L(e){if(!e)return null
for(var t=0,i=j.allEditor.length;t<i;t++)if(e===j.allEditor[t].getWindow())return j.allEditor[t]
return null}return S.prototype={__init:function(e){this.__g={id:+new Date,asynList:{},classWhiteListRules:{},curSeq:0,remoteImgInstance:null,pasteUneditable:!1},this.__extend(e)
var t=+new Date
this.__extendPlugins(),this.__registerPlugins()
var i=+new Date
this.__createEditor(),this.__initReport(),this.__initPulginEvent(),this.__initClassWhiteList()
var n=+new Date
this.__g.remoteImgInstance=new g({mpeditor:this,catchTipsDom:this.__o.catchTipsDom})
var o=+new Date
this.__customEventHandle(),j.allEditor.push(this),E.saveSpeeds({uin:wx&&wx.data&&wx.data.uin||0,pid:34,speeds:[{sid:30,time:i-t},{sid:32,time:o-n}]}),E.send()},__extendPlugins:function(){var e=this.__o
if(e.plugins.push(new h),e.imgScale&&e.plugins.push(new _({wheelScroll:e.scaleimgWheelScroll})),e.needPopup&&e.plugins.push(new m({coverWheelScroll:e.cropimgWheelScroll})),e.plugins.push(new C),e.wordCount&&e.plugins.push(new y({app_id:e.app_id})),e.needCheckText&&e.plugins.push(new v({maxArticleNum:e.maxArticleNum,app_id:e.app_id,isNewAppmsg:+e.app_id<1})),e.multipleTab){var t=wx&&wx.EditorRes&&wx.EditorRes.multipleTabWorkerPath?wx.EditorRes.multipleTabWorkerPath:""
"/"===(t=t.replace(/^http(s)?:\/\/res\.wx\.qq\.com/,"").replace(/\/\//g,"/")).substr(0,1)&&e.plugins.push(new w({app_id:e.app_id,workerPath:t}))}},__initReport:function(){var s=this
this.addListener("mplog",function(e,t){s.__g.logInstance||(s.__g.logInstance=new l({autoLogError:!1,autoLogRejection:!1,autoLogAjax:!1,bufferSize:0})),void 0===t.data.appmsgid&&(t.data.appmsgid=s.__o.app_id),void 0===t.data.seq&&(t.data.seq=s.__g.curSeq),void 0===t.data.ua&&(t.data.ua=window.navigator.userAgent),s.__g.logInstance&&"function"==typeof s.__g.logInstance[t.level]&&s.__g.logInstance[t.level](t.description||"",t.data)}),this.addListener("funcPvUvReport",function(e,t,i){s.funcPvUvReport(t,i)}),this.addListener("reportAddNum",function(e,t,i,n){if("[object Array]"===Object.prototype.toString.call(t))for(var o=0,r=t.length;o<r;o++){var a=t[o]
x.addNum(a.id,a.key,a.len||1)}else x.addNum(t,i,n||1)}),this.addListener("reportToolbarClick",function(e,t,i,n){if(x.addNum("122325","19","1"),x.addNum("122333","0","1"),"[object Array]"===Object.prototype.toString.call(t))for(var o=0,r=t.length;o<r;o++){var a=t[o]
x.addNum(a.id,a.key,a.len||1)}else x.addNum(t,i,n||1)}),this.addListener("getCommonReportIDKey",function(e,t,i){if(!t)return null
Object.prototype.toString.call(t)
for(var n=s.getUeditor().options.commonReportConf,o=0,r=t.length;o<r&&(n=n[t[o]]);o++);if("function"==typeof n)return n(i)
if(n){var a=n.split("_")
return{id:a[0],key:a[1]}}return null})},__extend:function(e){var t=this.__ueditor_config,i=this.__o,n=u.getOptions()
for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])
for(var o in e)i.hasOwnProperty(o)?i[o]=e[o]:t.hasOwnProperty(o)&&(t[o]=e[o])
t.layout||(t.layout=r),t.layout=template.compile(t.layout)},__registerPlugins:function(){for(var i=this,e=this.__o.plugins,t=0,n=e.length;t<n;t++){var o=e[t]
"function"==typeof o.registerPlugin&&o.registerPlugin({app_id:this.__o.app_id}),function(e){var t=e.getName()
i.__ueditor_config.pluginsContainer[t]=function(){"function"==typeof e.beforeDefineCommand&&e.beforeDefineCommand(this,i),"function"==typeof e.getExecCommand&&(this.commands[t]={execCommand:e.getExecCommand(),noCommandReprot:"function"==typeof e.noCommandReprot&&e.noCommandReprot()}),"function"==typeof e.getQueryCommandState&&(this.commands[t].queryCommandState=e.getQueryCommandState()),"function"==typeof e.getQueryCommandValue&&(this.commands[t].queryCommandValue=e.getQueryCommandValue())},i.__setPluginMenu(e),i.__pluginPerformance(e)}(o)}},__setPluginMenu:function(e){var t=this.__ueditor_config.contextMenu
"function"==typeof e.getContextMenu&&t.push("-",e.getContextMenu())},__pluginPerformance:function(e){var t=0
switch("function"==typeof e.getType&&(t=e.getType()||0),t){case 1:this.__createToolBarBtn(e)}},__ceateDefaultBtn:function(e){for(var t=this.__o.plugins,i=0,n=t.length;i<n;i++){var o=0
if("function"==typeof(e=t[i]).getType&&(o=e.getType()||0),0==o&&"function"==typeof e.getContainer){var r=e.getContainer()
if(r){var a=$(r).show()
e._o&&e._o.can_show_reddot&&e._o.redbit&&a.addClass("tpl_item_reddot"),function(i,n,o,r){i&&0<i.length&&i.click(function(e){o.execCommand(n)
var t=j.clickReport[n]
t&&o.fireEvent("reportToolbarClick",t.id,t.key,1),r&&r._o&&r._o.can_show_reddot&&r._o.redbit&&s.post({url:"/cgi-bin/operatereddot?action=del",data:{bit:r._o.redbit}},function(e){e&&e.base_resp&&0==+e.base_resp.ret&&(r._o.can_show_reddot=!1,i.removeClass("tpl_item_reddot"))})})}(a,e.getName(),this,e)}}}},__createEditor:function(){var t=+new Date,i=this,n=this.__o,e=this.__ueditor_config
e.onready=function(){i.__ceateDefaultBtn(),i.__initToolbarTips(),n.needPopup&&(i.__g.editorPopup=new f(i)),$(window).on("unload",function(){x.setData(1),x.send(1)})
var e=+new Date
E.saveSpeeds({uin:wx&&wx.data&&wx.data.uin||0,pid:34,speeds:{sid:31,time:e-t||0}}),E.send(),n.onReady.call(i,i.ueditor)},this.ueditor=new UE.ui.Editor(e)},__initToolbarTips:function(){if(this.__ueditor_config.toolbars&&0!=this.__ueditor_config.toolbars.length){var o=this,r=this.__g
r.toolbarsTips||(r.toolbarsTips=$(template.compile(k)({content:""})),r.toolbarsTips.hide(),$("body").append(r.toolbarsTips)),$("#edui_fixedlayer").length||setTimeout(function(){o.__initToolbarTips()},100),$("#edui_fixedlayer").on("mouseover",function(e){var t=$(e.target||e.srcElement).parents("div[data-tooltip]")
if(1==t.length){var i=t.data("tooltip")
if(/^fire_/.test(i)&&(i=o.fireEvent(i.split("_")[1])),i){r.toolbarsTips.find(".tooltip_inner").html(i)
var n=t.offset()
r.toolbarsTips._scroll_top=$(window).scrollTop(),r.toolbarsTips.css({top:n.top-5-r.toolbarsTips.height(),left:n.left+t.width()/2-r.toolbarsTips.width()/2}).show()}}}).on("mouseout",function(e){0==$(e.toElement).parents("div[data-tooltip]").length&&r.toolbarsTips.hide()}),$(this.ueditor.container).find("[id*=_toolbarboxouter]").on("mouseover",function(e){var t=$(e.target||e.srcElement).parents("div[data-tooltip]")
if(1==t.length){var i=t.data("tooltip")
if(/^fire_/.test(i)&&(i=o.fireEvent(i.split("_")[1])),i){r.toolbarsTips.find(".tooltip_inner").html(i)
var n=t.offset()
r.toolbarsTips._scroll_top=$(window).scrollTop(),r.toolbarsTips.css({top:n.top-5-r.toolbarsTips.height(),left:n.left+t.width()/2-r.toolbarsTips.width()/2}).show()}}}).on("mouseout",function(e){0==$(e.toElement).parents("div[data-tooltip]").length&&r.toolbarsTips.hide()}),$(window).on("scroll",function(){"none"!=r.toolbarsTips.css("display")&&r.toolbarsTips.hide()})}},__initPulginEvent:function(){for(var e=this.__o.plugins,t=0,i=e.length;t<i;t++){var n=e[t]
n.editor=this,"function"==typeof n.addListener&&n.addListener(this)
var o=0
"function"==typeof n.getType&&(o=n.getType()||0),1!=o&&"function"==typeof n.getContainer&&n.getContainer()&&function(n,o,e){e.addListener("selectionchange",function(e,t,i){-1==this.queryCommandState(n)?$(o).addClass("edui-state-disabled"):$(o).removeClass("edui-state-disabled")})}(n.getName(),n.getContainer(),this)}},__createToolBarBtn:function(e){if("function"!=typeof e.initToolBar||!e.initToolBar(this)){var t=""
"function"==typeof e.getTitle&&(t=e.getTitle()||"")
var i=!1
"function"==typeof e.hideButtonWhenInit&&(i=e.hideButtonWhenInit())
var d,n=e.getName(),o=this.getUi()
o[n]=(d=n,function(a){var s=new o.Button({hideWhenInit:i,className:"edui-for-"+d,title:t,onclick:function(){a.execCommand(d)
var e=j.clickReport[d]
e&&a.fireEvent("reportToolbarClick",e.id,e.key,1)},theme:a.options.theme,showText:!1})
return o.buttons[d]=s,a.addListener("selectionchange",function(e,t,i,n){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{},r=a.queryCommandState(d,{allDomInRange:o.allDomInRange||[]});-1==r?(s.setDisabled(!0),s.setChecked(!1)):i||(s.setDisabled(!1),s.setChecked(r))}),s})}},__customEventHandle:function(){var l=this
if(this.addListener("beforepaste",function(e,t){l.__g.pasteUneditable=!1
var i=$("<div></div>").html(t.html)
p.formatUneditablePluginHtml({$container:i}).hasUneditable&&(l.__g.pasteUneditable=!0),t.html=i.html()}),this.addListener("afterpaste",function(e,t,i){l.__g.pasteUneditable&&p.handleEvent({editor:l})}),!this.getBrowser().ie){var m=!1,v=!1,y=null,u=!1
this.addListener("keyup",function(e,t){var i=t.keyCode||t.which
if((8===i||46===i||13===i)&&(m||v||y||u)){var n=this.selection.getRange()
if(n.collapsed&&n.startContainer){var o=null,r=null
n.startContainer&&3===n.startContainer.nodeType?o=n.startContainer:n.startContainer&&1===n.startContainer.nodeType&&(o=n.startContainer.childNodes[n.startOffset]),o||(n.endContainer&&3===n.endContainer.nodeType?r=n.endContainer:n.endContainer&&1===n.endContainer.nodeType&&(r=n.endContainer.childNodes[n.endOffset-1]))
var a=o||r
if(a){var s=null
if((u||m)&&(s=s||b.findParent(a,function(e){return!!b.isBlockElm(e)},!1))&&(b.removePluginDefaultClass({node:s}),u&&b.removePluginDefaultClass({node:s.previousSibling})),y&&y.parentNode){y.parentNode.removeChild(y)
var d=b.findPreviousSibling(a,function(e){return"br"===e.nodeName.toLowerCase()},!0)
d&&d.previousSibling&&"br"===d.previousSibling.nodeName.toLowerCase()&&d.parentNode.removeChild(d)}v&&a.parentNode&&b.isFillChar2(a)&&(a.nodeValue=c.fillChar,b.removeSiblingFillchar({node:a}),n.setStart(a,l.getBrowser().webkit?1:0).collapse(!0).select(!0)),y=null,u=m=v=!1,this.fireEvent("scrollIntoView",a)}}}}),this.addListener("keydown",function(e,t){var i=t.keyCode||t.which
if(8===i||46===i||13===i){var g=this.selection.getRange()
if(g.collapsed&&g.startContainer){y=null,u=v=m=!1
var h=function(e){return b.findParent(e,function(e){return!!b.isBlockElm(e)},!1)}
if(13===i){var n=g.createBookmark(),o=h(n.start)
return o&&o.getAttribute("class")&&(u=!0),void g.moveToBookmark(n).select(!0)}var _=function(e,t){if(e&&3===e.nodeType){var i="",n=""
for(n="pre"===t?(i=-1,0):(i=0,1);e.nodeValue&&!b.replaceFillChar(e.nodeValue.substr(i,1));)e.nodeValue=e.nodeValue.substr(n,e.nodeValue.length-1)
!e.nodeValue&&e.parentNode&&e.parentNode.removeChild(e)}},r=""
8==i?r="pre":46==i&&(r="next")
var a=g.createBookmark()
"pre"===r&&b.isUneditablePluginNode({node:a.start.nextSibling})&&(y=a.start.ownerDocument.createElement("span"),a.start.parentNode.insertBefore(y,a.start.nextSibling),v=!0),function(e,t,i){for(var n=null,o=h(e),r=function(e){return 2===b.isContentEditable({node:e,checkParent:!1})};n=b.getDelNode({node:e,filter:r,type:t});){var a=!1,s=null
if(n.parentNode===e.parentNode?a=!0:(s=h(n))&&s===o&&(a=!0),a&&3===n.nodeType){if(_(n,t),n.nodeValue)break}else if(b.isMarkNode(n)&&n.parentNode)n.parentNode.removeChild(n)
else{if(2===b.isContentEditable({node:n,checkParent:!1})){var d=n.parentNode,l=b.createFillcharTextNode(n.ownerDocument)
a?(d.insertBefore(l,n),d.removeChild(n)):d.insertBefore(l,n.nextSibling),v=m=!0
break}if("br"!==n.nodeName.toLowerCase()){!a&&y&&(s=s||h(n))&&b.isEmptyNode(s,!1)&&s.parentNode.removeChild(s)
break}var u=!1
if("next"===t&&n.nextSibling&&b.isUneditablePluginNode({node:n.nextSibling})||"pre"===t&&n.previousSibling&&b.isUneditablePluginNode({node:n.previousSibling}))u=!0
else if(a&&"next"===t){for(var c=n.nextSibling;c&&b.isMarkNode(c);)c=c.nextSibling
u=!c}if(!u)break
n.parentNode.removeChild(n)}}for(var p=i.start.parentNode.firstChild;p&&b.isMarkNode(p);)p=p.nextSibling
var f=!1
p||(f=!0,p=b.createFillcharTextNode(i.start.ownerDocument),i.start.parentNode.insertBefore(p,i.start),v=!0),g.moveToBookmark(i),f&&("pre"===t?g.selectNode(p).collapse(!0):"next"===t&&g.selectNode(p).collapse(!1)),g.select(!0)}(a.start,r,a)}}})}l.addListener("afterscencerestore cleardoc",function(e){p.handleEvent({editor:l})}),l.addListener("dbcache_get",function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}
D.get({cacheKey:t.cacheKey}).then(function(e){t.callback(e)},function(e){t.callback(e)})}),l.addListener("dbcache_remove",function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}
D.remove({cacheKey:t.cacheKey})}),l.addListener("focus keyup aftersetcontent afterinserthtml",function(e,t){if(l.getDom("contentplaceholder").style.display="none","keyup"===e)switch(t.charCode||t.keyCode){case 13:case 49:case 190:case 191:T.setSum(59475,4,1),T.send()}}),l.addListener("blur showContentplaceholder",function(){l.hasContents()||(l.getDom("contentplaceholder").style.display="block")}),l.addListener("checkdomAsynList",function(){return l.checkdomAsynList()}),l.addListener("handleWinScroll",function(e,t){document.body.style.overflow=t?"visible":"hidden"})},__initClassWhiteList:function(){var t=this,e=this.__ueditor_config.iframeCssUrl
$.ajax({url:e,crossDomain:!0,success:function(e){t.setClassWhiteListRules.call(t,e)},error:function(){x.addNum("65080","123","1")}})},hasContents:function(){var e=this
return!!this.ueditor.getContent(null,function(){return e.ueditor.hasContents(["iframe","pre","img"])}).trim()},destory:function(){for(var e=this.__o.plugins,t=0,i=e.length;t<i;t++)"function"==typeof e[t].beforeEditorDestory&&e[t].beforeEditorDestory()
this.__g.editorPopup&&"function"==typeof this.__g.editorPopup.beforeEditorDestory&&this.__g.editorPopup.beforeEditorDestory(),this.__g.remoteImgInstance&&"function"==typeof this.__g.remoteImgInstance.beforeEditorDestory&&this.__g.remoteImgInstance.beforeEditorDestory()
for(t=0,i=j.allEditor.length;t<i;t++)j.allEditor[t]===this&&j.allEditor.splice(t,1)
this.hasDestory=!0},ready:function(e){if("function"==typeof e){var t=this
this.__o
this.ueditor.ready(function(){e.call(t,t.ueditor),t.hasContents()||(t.getDom("contentplaceholder").style.display="block")})}},addListener:function(e,t){this.ueditor.addListener(e,t)},handlerContent:function(e,t,i){for(var n=2<arguments.length&&void 0!==i?i:{},o=this.__o.plugins,r=0,a=o.length;r<a;r++){var s=o[r]
s._g&&(s._g.curSeq=+n.seq),"function"==typeof s.beforeSetContent&&(e=s.beforeSetContent(e,t,n))}var d=$("<div></div>").html(e)
return p.formatUneditablePluginHtml({$container:d}),e=(e=d.html()).replace(/background\-image:\s*url\(https\:\/\/mp\.weixin\.qq\.com\/cgi\-bin\/appmsg(.*?)\)/g,"")},insertTemplate:function(e,t){!0!==t&&(e=this.handlerContent(e,!1,{seq:0})),this.execCommand("insertHtml",e),this.afterSetContent()},afterSetContent:function(e){for(var t=this.__o.plugins,i=0,n=t.length;i<n;i++){var o=t[i]
"function"==typeof o.afterSetContent&&o.afterSetContent(e)}this.getUeditor().body.innerHTML&&p.handleEvent({editor:this})},updateSeq:function(e){var t=0<arguments.length&&void 0!==e?e:{},i=+t.seq
if(0<=i&&this.__g.curSeq!==i){var n=this.__g.curSeq
this.__g.curSeq=i
for(var o=this.__o.plugins,r=0,a=o.length;r<a;r++){var s=o[r]
"function"==typeof s.updateSeq&&s.updateSeq({seq:this.__g.curSeq,oldSeq:n,article:t.article})}}},updateAppid:function(e){if(+this.__o.app_id!=+e){var t=this.__o.app_id
this.__o.app_id=e
for(var i=this.__o.plugins,n=0,o=i.length;n<o;n++){var r=i[n]
"function"==typeof r.updateAppid&&r.updateAppid({app_id:this.__o.app_id,maxArticleNum:this.__o.maxArticleNum,oldAppid:t})}}},splitContent:function(e){var t=e.data||{},i=e.content||""
if(!this.__o.needCheckText||!i)return i
if(!1===this.fireEvent("is_article_data_inited"))return i
var n=!1
return!0===e.isModify&&this.fireEvent("is_highline_checktext")&&(n=!0),this.fireEvent("splitsentence_by_html",{html:i,htmlChecktext:t.content_checktext,checkTextInfo:t.check_text_info,highline:n})},setContent:function(e){var t=e.content||"",i=e.isAppendTo,n=e.data||{}
!0!==e.noFormat&&(t=this.splitContent({content:e.content,data:n,isModify:e.isModify}),this.__g.curSeq=void 0!==n.seq?+n.seq:0,t=this.handlerContent(t,!1,{seq:this.__g.curSeq})),this.ueditor.setContent(t,i),this.afterSetContent()},setHeight:function(e,t){this.ueditor.setHeight(e,t)},initPluginData:function(e){e=e||{}
for(var t=this.__o.plugins,i=0,n=t.length;i<n;i++){var o=t[i]
if("function"==typeof o.initPluginData){var r=o.initPluginData()
"string"==typeof(r=r||[])&&(r=[r])
for(var a=0,s=r.length;a<s;a++)void 0===e[r[a]]&&(e[r[a]]="")}}return e},getEditorData:function(e,t){this.fireEvent("beforeGetEditorData",this.getUeditor().body.innerHTML,[this.getUeditor().body])
for(var i=this.__o.plugins,n=0,o=i.length;n<o;n++){"function"==typeof(a=i[n]).beforeGetContent&&a.beforeGetContent()}(e=e||{}).content=this.ueditor.getContent(void 0,function(){return!0},void 0,void 0,void 0,t)
var r=[]
for(n=0,o=i.length;n<o;n++){var a
if("function"==typeof(a=i[n]).getPluginData){var s=this.getPluginDataTmpl(e)
a.getPluginData({init:s.init}),this.fillPluginData(s,e)}"function"==typeof a.getfilterIdTagNameWhiteList&&(r=r.concat(a.getfilterIdTagNameWhiteList()))}return r=","+r.join(",")+",",e.content=e.content.replace(/(<\w+[^>]*)\sid=\"([^\">]*)\"([^>]*>)/g,function(e,t,i,n){var o=e.split(" ")[0].replace("<","")
return r&&0<=r.indexOf(","+o+",")?e:t+n}),e.content=e.content.replace(/(<[^>]+?style=([\'\"]))([^\2]*?text-decoration-line[\s]*:[^\2]*?)(\2)/gi,function(){return arguments[1]+arguments[3].replace(/text-decoration-line[\s]*:/g,"text-decoration:")+arguments[4]}),e.content=e.content.replace(/(<[^>]+?style=([\'\"]))([^\2>]*?-ms-overflow[^\2>]+?)(\2)/gi,function(){return arguments[1]+arguments[3].replace(/-ms-overflow/g,"overflow")+arguments[4]}),e.content=d.formatStyle(e.content),e.content=d.formatRedundancyStr(e.content),this.__g.classWhiteListRules&&this.__g.classWhiteListRules.whiteList&&(e.content=d.formatClass(this.__g.classWhiteListRules,e.content)),this.formatCheckTextInfo({data:e}),e},setClassWhiteListRules:function(e){for(var t="rich_pages,blockquote_info,blockquote_biz,blockquote_other,blockquote_article,js_jump_icon,h5_image_link,js_banner_container,js_list_container,js_cover,js_tx_video_container,js_product_err_container,js_product_loop_content,js_product_container,img_loading,list-paddingleft-1,list-paddingleft-2,list-paddingleft-3,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double,__bg_gif,weapp_text_link,weapp_image_link,js_img_loading,wx_video_context,db,wx_video_thumb_primary,wx_video_play_btn,wx_video_mask".split(","),i=[new RegExp("^editor__content__"),new RegExp("^js_"),new RegExp("^cps_inner"),new RegExp("^bizsvr_"),new RegExp("^code-snippet"),new RegExp("^qa__"),new RegExp("^wx-edui-")],n=/^(\.[:-\w\d\s,\.]+)\{*|[\b\n\}]+(\.[:-\w\d\s,\.]+)\{*/g,o=null;e&&null!==(o=n.exec(e));)try{this.getIframeClass(o,t)}catch(e){console.error(e)}var r=[p.pluginParentClass,p.parentClass,p.selectedClass]
this.__g.classWhiteListRules={whiteList:t,whiteListReg:i,blackList:r}},getIframeClass:function(e,o){var r=/\.([a-z]+[-\w]+)/g,a=""
e&&e.forEach(function(e){if(e&&(a=e.match(r))&&0<a.length)for(var t=0,i=a.length;t<i;t++){var n=a[t];-1===(n=n.slice(1)).indexOf(p.selectedClass)&&n&&-1===o.indexOf(n)&&o.push(n)}})},formatCheckTextInfo:function(e){var t=e.data||{},i=t.content||""
return this.__o.needCheckText&&i?!1===this.fireEvent("is_article_data_inited")?i:(t.content_checktext=i,t.content=o.clearSplitTag(i),void o.setCacheData({content:"",checkTextInfo:t.check_text_info,appmsgId:this.__o.app_id,seq:t.seq})):i},fillPluginData:function(e,t){var i=e.getData()
for(var n in i)i.hasOwnProperty(n)&&void 0!==t[n]&&(t[n]=i[n])},getPluginDataTmpl:function(e){var n={content:e.content||""}
return{init:function(e){"string"==typeof(e=e||[])&&(e=[e])
for(var t=0,i=e.length;t<i;t++)void 0===n[e[t]]&&(n[e[t]]="")
return{set:function(e,t){void 0!==n[e]&&(n[e]=t)},get:function(e){return n[e]}}},getData:function(){return n}}},queryCommandValue:function(e){return this.ueditor.queryCommandValue(e)},getSelection:function(){return this.ueditor.selection},getSelectionRange:function(){return this.getSelection().getRange()},getSelectionStart:function(){return this.getSelection().getStart()},render:function(e){this.ueditor.render(e)},getUeditor:function(){return this.ueditor},getWindow:function(){return this.ueditor.window},getDocument:function(){return this.getWindow().document},execCommand:function(e){var t=this.ueditor
return t.execCommand.apply(t,arguments)},fireEvent:function(e){var t=this.ueditor
return t.fireEvent.apply(t,arguments)},removeListener:function(e){var t=this.ueditor
return t.removeListener.apply(t,arguments)},funcPvUvReport:function(e,t){x.addPvUv(e,t)},getUtils:function(){return UE.utils},getDomUtils:function(){return UE.dom.domUtils},getBrowser:function(){return UE.browser},getUi:function(){return UE.ui},getDom:function(e){return this.ueditor.ui.getDom(e)},enableToolbar:function(){var e=this.ueditor.ui.getDom("toolbar_mask"),t=$(".js_media_list_box_mask")[0]
e&&(e.style.display="none"),t&&(t.style.display="none")},disableToolbar:function(){var e=this.ueditor.ui.getDom("toolbar_mask"),t=$(".js_media_list_box_mask")[0]
e&&(e.style.display="block"),t&&(t.style.display="block")
var i=this.getUi().buttons
for(var n in i){var o=i[n]
"function"==typeof o.setDisabled&&"function"==typeof o.setChecked&&(o.setDisabled(!1),o.setChecked(!1))}},checkPlugins:function(n,o){var e=this.__o.plugins,r=!0
return $.each(e,function(e,t){if("function"==typeof t.check){var i=t.check(n,o)
if(!1===i||"[object Object]"===Object.prototype.toString.call(i))return r=i,!1}}),r},isHighlight:function(){return this.ueditor.highlight},getuid:function(){return this.__g.id++},delegateDomAsyn:function(n){var s=this,d=s.ueditor
if("function"==typeof n.requsetFun){var i=n.requsetFailFun||function(){},o=n.requsetSucFun||function(){},l=this.setDomAsynTag({dom:n.dom})
l&&(n.__hasHandle=!1,n.requsetSucFun=function(){if(this.__timeoutid&&clearTimeout(this.__timeoutid),!0!==this.__hasHandle){this.__hasHandle=!0
try{var e=Array.prototype.slice.call(arguments),t=r()
l.newDom=t.newDom,l.tempDoc=t.tempDoc,e.unshift(l),o.apply(n,e)}catch(e){throw e}a()}},n.requsetFailFun=function(){if(this.__timeoutid&&clearTimeout(this.__timeoutid),!0!==this.__hasHandle){this.__hasHandle=!0
try{var e=Array.prototype.slice.call(arguments),t=r()
l.newDom=t.newDom,l.tempDoc=t.tempDoc,e.unshift(l),i.apply(n,e)}catch(e){throw e}a()}},n.timeout&&(n.__timeoutid=setTimeout(function(){"function"==typeof n.requsetFailFun&&n.requsetFailFun()},+n.timeout)),n.requsetFun())}function r(){var e,t,i={newDom:null,tempDoc:null},n=l.uid
if(l.article){var o=l.article
if(!0!==d.fireEvent("is_article_alive",o))return i
var r=o.data("article").data
if(d.fireEvent("is_article_editing",o))t=$(s.getDocument()).find("[data-asynid="+n+"]")
else{e=$("<div>")
var a=r.get("content")
if(!a)return i
t=e.html(a).find("[data-asynid="+n+"]")}}else t=$(s.getDocument()).find("[data-asynid="+n+"]")
return t&&0!=t.length&&(i.newDom=t,i.tempDoc=e||null),i}function a(){if(l){var e=l.newDom
try{if(!e)return delete s.__g.asynList[l.uid],!0===s.checkdomAsynList()&&d.fireEvent("domasyn_all_complete"),void(n.__hasHandle=!0)
if(e.removeClass("js_asyningdom").removeAttr("data-asynid").data("asynid",""),delete s.__g.asynList[l.uid],l.tempDoc){var t=l.tempDoc.html()
if(t){var i=l.article.data("article").data
i.set("content",t),i.setData(i.getData())}}!0===s.checkdomAsynList()&&d.fireEvent("domasyn_all_complete"),n.__hasHandle=!0}catch(e){}}}},checkdomAsynList:function(){var e=0
for(var t in this.__g.asynList)if(this.__g.asynList.hasOwnProperty(t))return e++,!1
return!(0<e)},setDomAsynTag:function(e){var t=this.ueditor,i=this.getuid()+"",n=this.__g.asynList,o=t.fireEvent("get_current_article"),r=null
if(e.dom){var a=$(e.dom)
if((r=a.attr("data-asynid")||a.data("asynid")||"")&&n[r]){if(!0!==e.force)return!1
delete n[r]}else r=null
a.addClass("js_asyningdom").attr("data-asynid",i)}return n[i=r||i]={article:o,uid:i}},setHistory:function(e){var t=this.getUeditor().undoManger
if(!t)return!1
if(!e)return t.reset(),!1!==this.fireEvent("is_article_data_inited")&&this.fireEvent("saveScene"),!0
var i=e.list
if("[object Array]"!==Object.prototype.toString.call(i)||0==i.length)return t.reset(),!0
var n=e.index
return(void 0===n||n<0||n>i.length-1)&&(n=i.length-1),t.list=i,t.index=n,t.clearKey(),t.update(),!0},getHistory:function(){var e=this.getUeditor().undoManger
return e?{list:JSON.parse(JSON.stringify2(e.list)),index:e.index}:null},changeUeditorConf:function(e){if(e.key&&e.value&&e.key.length==e.value.length)for(var t=0,i=e.key.length;t<i;t++)void 0!==this.ueditor.options[e.key[t]]&&this.ueditor.options[e.key[t]]!==e.value[t]&&("function"==typeof this["beforeUeditorConf_"+e.key[t]+"_change"]&&this["beforeUeditorConf_"+e.key[t]+"_change"](),this.ueditor.options[e.key[t]]=e.value[t],"function"==typeof this["afterUeditorConf_"+e.key[t]+"_change"]&&this["afterUeditorConf_"+e.key[t]+"_change"]())},afterUeditorConf_debug_change:function(){this.ueditor.eventLog?this.ueditor.eventLog=null:this.ueditor.eventLog=[]}},(n=window).__editorIframeSelect=function(e){if(e&&e.parent&&e.parent.window){var t=L(e.parent.window)
if(t)for(var i=t.getDocument(),n=i.getElementsByTagName("iframe"),o=0,r=n.length;o<r;o++){var a=n[o]
if(a.contentWindow===e){new UE.dom.Range(i).selectNode(a).select(),t.fireEvent("iframeSelected"),t.getUeditor()._selectionChange(250,null,"iframeSelected")
break}}}},n.__editorIframeMouseup=function(e){if(e&&e.parent&&e.parent.window){var t=L(e.parent.window)
t&&t.getUeditor()._selectionChange(250,null,"iframeMouseup")}},window.__MpEditor=S})
"use strict"
define("3rd/editor/common/domUtils.js",["3rd/editor/common/browser.js","3rd/editor/common/utils.js","3rd/editor/common/dtd.js"],function(e,t,r){var s=e("3rd/editor/common/browser.js").browser,f=e("3rd/editor/common/utils.js").utils,o=e("3rd/editor/common/dtd.js").dtd,d=s.ie,n=window.UE.dom
function u(e,t,r,n,i,o){var l,a=n&&e[t]
for(a=a||e[r];!a&&(l=(l||e).parentNode);){if("BODY"==l.tagName||o&&!o(l))return null
a=l[r]}return a&&i&&!i(a)?u(a,t,r,!1,i):a}var i=d&&s.version<9?{tabindex:"tabIndex",readonly:"readOnly",for:"htmlFor",class:"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder"}:{tabindex:"tabIndex",readonly:"readOnly"},l=f.listToMap(["inline","inline-block","inline-table"]),c=f.listToMap(["-webkit-box","-moz-box","block","list-item","table","table-row-group","table-header-group","table-footer-group","table-row","table-column-group","table-column","table-cell","table-caption"]),p=d&&"6"==s.version?"\ufeff":"​",m=d&&"6"==s.version?"&#65279;":"&#8203;",g="_baidu_bookmark_",h="mpchecktext",y="mptmpchecktext",v="data-pluginname",N="wx-edui-media-wrp",b="custom_select_card_wrp",C=n.domUtils={NODE_ELEMENT:1,NODE_DOCUMENT:9,NODE_TEXT:3,NODE_COMMENT:8,NODE_DOCUMENT_FRAGMENT:11,POSITION_IDENTICAL:0,POSITION_DISCONNECTED:1,POSITION_FOLLOWING:2,POSITION_PRECEDING:4,POSITION_IS_CONTAINED:8,POSITION_CONTAINS:16,fillChar:p,fillCharEncode:m,fillCharReg:new RegExp(p,"g"),bookmarkFillChar:"‍",bookmarkFillCharEncdoe:"&zwj;",bookmarkFillCharReg:new RegExp("‍","g"),bookmarkPrefix:g,keys:{8:1,46:1,16:1,17:1,18:1,37:1,38:1,39:1,40:1,13:1},getPosition:function(e,t){if(!e||!t)return 1
if(e===t)return 0
var r,n=[e],i=[t]
for(r=e;r=r.parentNode;){if(r===t)return 10
n.push(r)}for(r=t;r=r.parentNode;){if(r===e)return 20
i.push(r)}if(n.reverse(),i.reverse(),n[0]!==i[0])return 1
for(var o=-1;n[++o]===i[o];);for(e=n[o],t=i[o];e=e.nextSibling;)if(e===t)return 4
return 2},createFillcharTextNode:function(e){return e.createTextNode(p)},getNodeIndex:function(e,t){for(var r=e,n=0;r=r.previousSibling;)t&&3==r.nodeType?r.nodeType!=r.nextSibling.nodeType&&n++:n++
return n},inDoc:function(e,t){return 10==C.getPosition(e,t)},findParent:function(e,t,r){if(e&&!C.isBody(e))for(e=r?e:e.parentNode;e;){if(!t||t(e)||C.isBody(e))return t&&!t(e)&&C.isBody(e)?null:e
e=e.parentNode}return null},findPreviousSibling:function(e,t,r){if(e&&!C.isBody(e))for(e=r?e:e.previousSibling;e;){if(!t||t(e)||C.isBody(e))return t&&!t(e)&&C.isBody(e)?null:e
e=e.previousSibling}return null},findNextSibling:function(e,t,r){if(e&&!C.isBody(e))for(e=r?e:e.nextSibling;e;){if(!t||t(e)||C.isBody(e))return t&&!t(e)&&C.isBody(e)?null:e
e=e.nextSibling}return null},findParentByTagName:function(e,t,r,n){return t=f.listToMap(f.isArray(t)?t:[t]),C.findParent(e,function(e){return t[e.tagName]&&!(n&&n(e))},r)},findParents:function(e,t,r,n){for(var i=t&&(r&&r(e)||!r)?[e]:[];e=C.findParent(e,r);)i.push(e)
return n?i:i.reverse()},insertAfter:function(e,t){return e&&e.parentNode?e.parentNode.insertBefore(t,e.nextSibling):null},remove:function(e,t){if(e){var r,n=e.parentNode
if(n){if(t&&e.hasChildNodes())for(;r=e.firstChild;)n.insertBefore(r,e)
n.removeChild(e)}return e}},getNextDomNode:function(e,t,r,n){return u(e,"firstChild","nextSibling",t,r,n)},isBookmarkNode:function(e){return 1==e.nodeType&&e.id&&new RegExp("^"+g,"i").test(e.id)},createBookmarkNode:function(e,t){t=t||""
var r=(e=e||document).createElement("span")
return r.style.cssText="display:none;line-height:0px;",r.appendChild(e.createTextNode("‍")),r.id=g+"start_"+t,r},getBookmarkReg:function(){return new RegExp("<span[^>]*"+g+"[^>]*>[^<]*<\\/span>","g")},getWindow:function(e){var t=e.ownerDocument||e
return t.defaultView||t.parentWindow},getCommonAncestor:function(e,t){if(e===t)return e
for(var r=[e],n=[t],i=e,o=-1;i=i.parentNode;){if(i===t)return i
r.push(i)}for(i=t;i=i.parentNode;){if(i===e)return i
n.push(i)}for(r.reverse(),n.reverse();r[++o]===n[o];);return 0==o?null:r[o-1]},clearEmptySibling:function(e,t,r){function n(e,t){for(var r;e&&!C.isBookmarkNode(e)&&(C.isEmptyInlineElement(e)||!new RegExp("[^\t\n\r"+C.fillChar+"]").test(e.nodeValue));)r=e[t],C.remove(e),e=r}t||n(e.nextSibling,"nextSibling"),r||n(e.previousSibling,"previousSibling")},split:function(e,t){var r=e.ownerDocument
if(s.ie&&t==e.nodeValue.length){var n=r.createTextNode("")
return C.insertAfter(e,n)}var i=e.splitText(t)
if(s.ie8){var o=r.createTextNode("")
C.insertAfter(i,o),C.remove(o)}return i},isWhitespace:function(e){return!new RegExp("[^ \t\n\r"+C.fillChar+"]").test(e.nodeValue)},getXY:function(e){for(var t=0,r=0;e.offsetParent;)r+=e.offsetTop,t+=e.offsetLeft,e=e.offsetParent
if(0==t&&0==r){var n=$(e).offset()
t=n.left,r=n.top}return{x:t,y:r}},on:function(e,t,r){var n=f.isArray(t)?t:f.trim(t).split(/\s+/),i=n.length
if(i)for(;i--;)if(t=n[i],e.addEventListener)e.addEventListener(t,r,!1)
else{r._d||(r._d={els:[]})
var o=t+r.toString(),l=f.indexOf(r._d.els,e)
r._d[o]&&-1!=l||(-1==l&&r._d.els.push(e),r._d[o]||(r._d[o]=function(e){return r.call(e.srcElement,e||window.event)}),e.attachEvent("on"+t,r._d[o]))}e=null},un:function(e,t,r){var n=f.isArray(t)?t:[t],i=n.length
if(i)for(;i--;)if(t=n[i],e.removeEventListener)e.removeEventListener(t,r,!1)
else{var o=t+r.toString()
try{e.detachEvent("on"+t,r._d?r._d[o]:r)}catch(e){}if(r._d&&r._d[o]){var l=f.indexOf(r._d.els,e);-1!=l&&r._d.els.splice(l,1),0==r._d.els.length&&delete r._d[o]}}},isSameElement:function(e,t){if(e.tagName!=t.tagName)return!1
var r=e.attributes,n=t.attributes
if(!d&&r.length!=n.length)return!1
for(var i,o,l=0,a=0,s=0;i=r[s++];){if("style"==i.nodeName){if(i.specified&&l++,C.isSameStyle(e,t))continue
return!1}if(d){if(!i.specified)continue
l++,o=n.getNamedItem(i.nodeName)}else o=t.attributes[i.nodeName]
if(!o.specified||i.nodeValue!=o.nodeValue)return!1}if(d){for(s=0;o=n[s++];)o.specified&&a++
if(l!=a)return!1}return!0},isSameStyle:function(e,t){var r=e.style.cssText.replace(/( ?; ?)/g,";").replace(/( ?: ?)/g,":"),n=t.style.cssText.replace(/( ?; ?)/g,";").replace(/( ?: ?)/g,":")
if(s.opera){if(r=e.style,n=t.style,r.length!=n.length)return!1
for(var i in r)if(!/^(\d+|csstext)$/i.test(i)&&r[i]!=n[i])return!1
return!0}if(!r||!n)return r==n
if(r=r.split(";"),n=n.split(";"),r.length!=n.length)return!1
for(var o,l=0;o=r[l++];)if(-1==f.indexOf(n,o))return!1
return!0},isBlockElm:function(e){return!!e&&(1==e.nodeType&&(o.$block[e.tagName]||c[C.getComputedStyle(e,"display")])&&!o.$nonChild[e.tagName])},isBlockElm2:function(e){if(e&&1==e.nodeType){var t=C.getComputedStyle(e,"display")
return!!(o.$block2[e.tagName]&&!l[t]||c[t])}return!1},isBody:function(e){return e&&1==e.nodeType&&"body"==e.tagName.toLowerCase()},breadByUneditable:function(e){var t=0<arguments.length&&void 0!==e?e:{},r=t.node,n=null,i=[]
do{if(!(n=(n=this.getChildUneditable({node:r,isMarkNode:!1}))[0]||null)){t.attrs&&this.setAttributes(r,t.attrs),this.removePluginDefaultClass({parent:a})
for(var o=r.querySelectorAll("[class]"),l=0,s=o.length;l<s;l++){var d=o[l]
this.removePluginDefaultClass({parent:d})}i.push(r)
break}var f=null
n.parentNode&&!this.isBody(n.parentNode)&&(f=n.parentNode.cloneNode(!1)),n.nextSibling&&this.isBr(n.nextSibling)&&n.parentNode.removeChild(n.nextSibling)
var u=this.breakParent({node:n,parent:r,keepLeft:!1,keepRight:!1,returnNewDom:!0})
f&&(n.parentNode.insertBefore(f,n),f.appendChild(n)),r=null
for(var c=!1,p=0,m=u.length;p<m;p++){var g=u[p]
if(g===n)t.attrs&&t.applyUneditablParent&&this.setAttributes(g.parentNode,t.attrs),i.push(g.parentNode),c=!0
else if(c)r=g
else{i.push(g),t.attrs&&this.setAttributes(g,t.attrs),this.removePluginDefaultClass({node:g})
for(var h=g.querySelectorAll("[class]"),y=0,v=h.length;y<v;y++){var N=h[y]
this.removePluginDefaultClass({node:N})}}}}while(r)
return i},breakParent:function(e,t,r,n){var i=!1
"[object Object]"===Object.prototype.toString.call(e)&&(t=e.parent,r=e.keepLeft,n=e.keepRight,i=e.returnNewDom,e=e.node)
var o,l,a,s,d,f=e,u=e,c=!0,p=!0
for(o=e;o&&o!==t&&!(s=this.findPreviousSibling(o,function(e){return!C.isFillChar(e)}));)o=o.parentNode
for(s||!0===r||(c=!1),o=e;o&&o!==t&&!(d=this.findNextSibling(o,function(e){return!C.isFillChar(e)}));)o=o.parentNode
d||!0===n||(p=!1)
do{if(f=f.parentNode,c&&(l?((o=f.cloneNode(!1)).appendChild(l),l=o):!(s=this.findPreviousSibling(u,function(e){return!C.isFillChar(e)}))&&!0!==r||(l=f.cloneNode(!1)),l))for(;o=u.previousSibling;)l.insertBefore(o,l.firstChild)
if(p&&(a?((o=f.cloneNode(!1)).appendChild(a),a=o):!(d=this.findNextSibling(u,function(e){return!C.isFillChar(e)}))&&!0!==n||(a=f.cloneNode(!1)),a))for(;o=u.nextSibling;)a.appendChild(o)
u=f}while(t!==f)
var m=[]
return o=t.parentNode,l&&(o.insertBefore(l,t),m.push(l)),o.insertBefore(e,t),m.push(e),a&&(o.insertBefore(a,t),m.push(a)),C.remove(t),!0===i?m:e},isEmptyInlineElement:function(e){if(1!=e.nodeType||!o.$removeEmpty[e.tagName])return 0
for(e=e.firstChild;e;){if(C.isBookmarkNode(e))return 0
if(1==e.nodeType&&!C.isEmptyInlineElement(e)||3==e.nodeType&&!C.isWhitespace(e))return 0
e=e.nextSibling}return 1},trimWhiteTextNode:function(r){function e(e){for(var t;(t=r[e])&&3==t.nodeType&&C.isWhitespace(t);)r.removeChild(t)}r&&3!=r.nodeType&&(e("firstChild"),e("lastChild"))},mergeChild:function(e,t,r){for(var n,i=C.getElementsByTagName(e,e.tagName.toLowerCase()),o=0;n=i[o++];)if(n.parentNode&&!C.isBookmarkNode(n))if("span"!=n.tagName.toLowerCase())C.isSameElement(e,n)&&C.remove(n,!0)
else{if(e===n.parentNode&&(C.trimWhiteTextNode(e),1==e.childNodes.length)){e.style.cssText=n.style.cssText+";"+e.style.cssText,C.remove(n,!0)
continue}if(n.style.cssText=e.style.cssText+";"+n.style.cssText,r){var l=r.style
if(l){l=l.split(";")
for(var a,s=0;a=l[s++];)n.style[f.cssStyleToDomStyle(a.split(":")[0])]=a.split(":")[1]}}C.isSameStyle(n,e)&&C.remove(n,!0)}},getElementsByTagName:function(e,t,r){if(!e)return[]
if(r&&f.isString(r)){var n=r
r=function(e){return C.hasClass(e,n)}}t=f.trim(t).replace(/[ ]{2,}/g," ").split(" ")
for(var i,o=[],l=0;i=t[l++];)for(var a,s=e.getElementsByTagName(i),d=0;a=s[d++];)r&&!r(a)||o.push(a)
return o},mergeToParent:function(e){for(var t=e.parentNode;t&&o.$removeEmpty[t.tagName];){if(t.tagName==e.tagName||"A"==t.tagName){if(C.trimWhiteTextNode(t),"SPAN"==t.tagName&&!C.isSameStyle(t,e)||"A"==t.tagName&&"SPAN"==e.tagName){if(1<t.childNodes.length||t!==e.parentNode){e.style.cssText=t.style.cssText+";"+e.style.cssText,t=t.parentNode
continue}t.style.cssText+=";"+e.style.cssText}if("A"!=t.tagName){t===e.parentNode&&C.remove(e,!0)
break}}t=t.parentNode}},mergeSibling:function(e,t,r){function n(e,t,r){var n
if((n=r[e])&&!C.isBookmarkNode(n)&&1==n.nodeType&&C.isSameElement(r,n)){for(;n.firstChild;)"firstChild"==t?r.insertBefore(n.lastChild,r.firstChild):r.appendChild(n.firstChild)
C.remove(n)}}t||n("previousSibling","firstChild",e),r||n("nextSibling","lastChild",e)},unSelectable:d&&s.ie9below||s.opera?function(e){e.onselectstart=function(){return!1},e.onclick=e.onkeyup=e.onkeydown=function(){return!1},e.unselectable="on",e.setAttribute("unselectable","on")
for(var t,r=0;t=e.all[r++];)switch(t.tagName.toLowerCase()){case"iframe":case"textarea":case"input":case"select":break
default:t.unselectable="on",e.setAttribute("unselectable","on")}}:function(e){e.style.MozUserSelect=e.style.webkitUserSelect=e.style.KhtmlUserSelect="none"},removeAttributes:function(e,t){t=f.isArray(t)?t:f.trim(t).replace(/[ ]{2,}/g," ").split(" ")
for(var r,n=0;r=t[n++];){switch(r=i[r]||r){case"className":e[r]=""
break
case"style":e.style.cssText="",!s.ie&&e.getAttributeNode("style")&&e.removeAttributeNode(e.getAttributeNode("style"))}e.removeAttribute(r)}},createElement:function(e,t,r){return C.setAttributes(e.createElement(t),r)},setAttributes:function(e,t){for(var r in t)if(t.hasOwnProperty(r)){var n=t[r]
switch(r){case"class":e.className=n
break
case"style":e.style.cssText=e.style.cssText+";"+n
break
case"innerHTML":e[r]=n
break
case"value":e.value=n
break
default:e.setAttribute(i[r]||r,n)}}return e},getComputedStyle:function(e,t){if(-1<"width height top left".indexOf(t))return e["offset"+t.replace(/^\w/,function(e){return e.toUpperCase()})]+"px"
if(3==e.nodeType&&(e=e.parentNode),s.ie&&s.version<9&&"font-size"==t&&!e.style.fontSize&&!o.$empty[e.tagName]&&!o.$nonChild[e.tagName]){var r=e.ownerDocument.createElement("span")
r.style.cssText="padding:0;border:0;font-family:simsun;",r.innerHTML=".",e.appendChild(r)
var n=r.offsetHeight
return e.removeChild(r),r=null,n+"px"}try{var i=C.getStyle(e,t)||(window.getComputedStyle?C.getWindow(e).getComputedStyle(e,"").getPropertyValue(t):(e.currentStyle||e.style)[f.cssStyleToDomStyle(t)])}catch(e){return""}return f.transUnitToPx(f.fixColor(t,i))},removeClasses:function(e,t){t=f.isArray(t)?t:f.trim(t).replace(/[ ]{2,}/g," ").split(" ")
for(var r,n=0,i=e.className;r=t[n++];)i=i.replace(new RegExp("\\b"+r+"\\b"),"");(i=f.trim(i).replace(/[ ]{2,}/g," "))?e.className=i:C.removeAttributes(e,["class"])},addClass:function(e,t){if(e){t=f.trim(t).replace(/[ ]{2,}/g," ").split(" ")
for(var r,n=0,i=e.className;r=t[n++];)new RegExp("\\b"+r+"\\b").test(i)||(e.className+=" "+r)}},hasClass:function(e,t){if(!e)return!1
if(f.isRegExp(t))return t.test(e.className)
t=f.trim(t).replace(/[ ]{2,}/g," ").split(" ")
for(var r,n=0,i=e.className;r=t[n++];)if(!new RegExp("\\b"+r+"\\b","i").test(i))return!1
return n-1==t.length},preventDefault:function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},removeStyle:function(e,t){s.ie?("color"==t&&(t="(^|;)"+t),e.style.cssText=e.style.cssText.replace(new RegExp(t+"[^:]*:[^;]+;?","ig"),"")):e.style.removeProperty?e.style.removeProperty(t):e.style.removeAttribute(f.cssStyleToDomStyle(t)),e.style.cssText||C.removeAttributes(e,["style"])},getStyles:function(e){if(!e||!e.style||!e.style.cssText)return null
for(var t={},r=e.style.cssText.replace(/( *; *)/g,";").replace(/( *: *)/g,":").split(";"),n=0,i=r.length;n<i;n++){var o=r[n]
if(o){var l=o.split(":")
l[0]&&l[1]&&!t[l[0]]&&(t[l[0]]=l[1])}}return t},getStyle:function(e,t){var r=e.style[f.cssStyleToDomStyle(t)]
return f.fixColor(t,r)},setStyle:function(e,t,r){e.style[f.cssStyleToDomStyle(t)]=r,f.trim(e.style.cssText)||this.removeAttributes(e,"style")},setStyles:function(e,t){for(var r in t)t.hasOwnProperty(r)&&C.setStyle(e,r,t[r])},removeDirtyAttr:function(e){for(var t,r=0,n=e.getElementsByTagName("*");t=n[r++];)t.removeAttribute("_moz_dirty")
e.removeAttribute("_moz_dirty")},getChildCount:function(e,t){var r=0,n=e.firstChild
for(t=t||function(){return 1};n;)t(n)&&r++,n=n.nextSibling
return r},isEmptyNode:function(e,n){return!e||1!=e.nodeType||(null==n&&(n=!0),!e.firstChild||0==C.getChildCount(e,function(e){var t=!C.isBr(e)&&!C.isMarkNode(e)&&!C.isWhitespace(e),r=!("none"!==C.getComputedStyle(e,"display"))
return n?t:t&&!r}))},clearSelectedArr:function(e){for(var t;t=e.pop();)C.removeAttributes(t,["class"])},scrollToView:function(e,t,r){var n,i,o=(n=t.document,{width:((i="CSS1Compat"==n.compatMode)?n.documentElement.clientWidth:n.body.clientWidth)||0,height:(i?n.documentElement.clientHeight:n.body.clientHeight)||0}).height,l=-1*o+r
l+=e.offsetHeight||0,l+=C.getXY(e).y
var a=function(e){if("pageXOffset"in e)return{x:e.pageXOffset||0,y:e.pageYOffset||0}
var t=e.document
return{x:t.documentElement.scrollLeft||t.body.scrollLeft||0,y:t.documentElement.scrollTop||t.body.scrollTop||0}}(t).y;(a<l||l<a-o)&&t.scrollTo(0,l+(l<0?-20:20))},isBr:function(e){return 1==e.nodeType&&"BR"==e.tagName},isFillChar:function(e,t){return 3==e.nodeType&&!e.nodeValue.replace(new RegExp((t?"^":"")+C.fillChar,"g"),"").length},isFillChar2:function(e){return!(!e||3!==e.nodeType||this.replaceFillChar(e.nodeValue))},isStartInblock:function(e){var t,r=e.cloneRange(),n=0,i=r.startContainer
if(1==i.nodeType&&i.childNodes[r.startOffset])for(var o=(i=i.childNodes[r.startOffset]).previousSibling;o&&C.isFillChar(o);)o=(i=o).previousSibling
for(this.isFillChar(i,!0)&&1==r.startOffset&&(r.setStartBefore(i),i=r.startContainer);i&&C.isFillChar(i);)i=(t=i).previousSibling
for(t&&(r.setStartBefore(t),i=r.startContainer),1==i.nodeType&&C.isEmptyNode(i)&&1==r.startOffset&&r.setStart(i,0).collapse(!0);!r.startOffset;){if(i=r.startContainer,C.isBlockElm(i)||C.isBody(i)){n=1
break}var l
if(o=r.startContainer.previousSibling){for(;o&&C.isFillChar(o);)o=(l=o).previousSibling
l?r.setStartBefore(l):r.setStartBefore(r.startContainer)}else r.setStartBefore(r.startContainer)}return n&&!C.isBody(r.startContainer)?1:0},isEmptyBlock:function(e,t){if(!e)return 0
if(1!=e.nodeType)return 0
if(t=t||new RegExp("[ \t\r\n"+C.fillChar+"]","g"),0<e[s.ie?"innerText":"textContent"].replace(t,"").length)return 0
for(var r in o.$isNotEmpty)if(e.getElementsByTagName(r).length)return 0
return 1},getChildUneditable:function(e){var t=0<arguments.length&&void 0!==e?e:{},r=[]
if(!t.node||!t.node.querySelectorAll)return r
for(var n=t.node.querySelectorAll('[contenteditable="false"]'),i=0,o=n.length;i<o;i++){var l=n[i]
!t.isMarkNode&&this.isMarkNode(l)||r.push(l)}return r},getContentEditableNode:function(e){var t=0<arguments.length&&void 0!==e?e:{},r=null
if(!t.node)return r
var n=t.node
for(n&&3===n.nodeType&&(n=n.parentNode);n&&n.nodeName&&"body"!==n.nodeName.toLocaleLowerCase();){if(2===this.isContentEditable({node:n,checkParent:!1})&&(t.isMarkNode||!t.isMarkNode&&!this.isMarkNode(n))){r=n
break}n=n.parentNode}return r},isContentEditable:function(e){var t=0<arguments.length&&void 0!==e?e:{},r=t.node,n=t.checkParent
if(!r)return 2
var i=r
if(1!==i.nodeType&&(i=i.parentNode),!i||1!==i.nodeType)return 2
if(!n)return"false"==i.contentEditable+""?2:3
for(;i;){var o=i.contentEditable+""
if("false"==o)return 2
if("true"==o)return 1
i=i.parentNode}return 2},setViewportOffset:function(e,t){var r=0|parseInt(e.style.left),n=0|parseInt(e.style.top),i=e.getBoundingClientRect(),o=t.left-i.left,l=t.top-i.top
o&&(e.style.left=r+o+"px"),l&&(e.style.top=n+l+"px")},fillNode:function(e,t){var r=s.ie?e.createTextNode(C.fillChar):e.createElement("br")
t.innerHTML="",t.appendChild(r)},moveChild:function(e,t,r){for(;e.firstChild;)r&&t.firstChild?t.insertBefore(e.lastChild,t.firstChild):t.appendChild(e.firstChild)},hasNoAttributes:function(e){return s.ie?/^<\w+\s*?>/.test(e.outerHTML):0==e.attributes.length},isCustomeNode:function(e){return 1==e.nodeType&&e.getAttribute("_ue_custom_node_")},isTagNode:function(e,t){return 1==e.nodeType&&new RegExp("^"+e.tagName+"$","i").test(t)},filterNodeList:function(e,t,r){var n=[]
if(!f.isFunction(t)){var i=t
t=function(e){return-1!=f.indexOf(f.isArray(i)?i:i.split(" "),e.tagName.toLowerCase())}}return f.each(e,function(e){t(e)&&n.push(e)}),0==n.length?null:1!=n.length&&r?n:n[0]},isInNodeEndBoundary:function(e,t){var r=e.startContainer
if(3==r.nodeType&&e.startOffset!=r.nodeValue.length)return 0
if(1==r.nodeType&&e.startOffset!=r.childNodes.length)return 0
for(;r!==t;){if(r.nextSibling)return 0
r=r.parentNode}return 1},isBoundaryNode:function(e,t){for(;!C.isBody(e);)if(e!==(e=e.parentNode)[t])return!1
return!0},canContainByP:function(e){var t=0<arguments.length&&void 0!==e?e:{},r={body:1,div:1,p:1,section:1,ol:1,ul:1}
if(t.tagName)return!r[t.tagName]
if(t.dom){var n=t.dom.nodeType
if(1!==n)return 3===n
var i=t.dom.outerHTML
for(var o in r){if(Object.prototype.hasOwnProperty.call(r,o))if(new RegExp("<"+o+"\\s*[^>]*>","i").test(i))return!1}return!0}return!1},canContainP:function(e){var t=0<arguments.length&&void 0!==e?e:{},r={p:1}
if(t.tagName)return!r[t.tagName]
if(t.dom){for(var n=t.dom;n&&"body"!==n.nodeName.toLowerCase();){if(r[n.nodeName.toLowerCase()])return!1
n=n.parentNode}return!0}return!1},isMarkNode:function(e){if(!e||!e.tagName)return!1
var t=e.tagName.toLowerCase()
return t===h||t===y||"mp-pay-preview-filter"===t||!!this.isBookmarkNode(e)},replaceFillChar:function(e){return e?e.replace(this.fillCharReg,"").replace(this.bookmarkFillCharReg,""):""},getTreeWalker:function(e){var t=this,r=0<arguments.length&&void 0!==e?e:{}
if(!r.root||!f.isSupportWalker())return null
var n=null
return(r.filterMarkNode||r.filterFillchar||"function"==typeof r.filter)&&(n={acceptNode:function(e){return r.filterMarkNode&&t.isMarkNode(e)||r.filterFillchar&&t.isFillChar2(e)?window.NodeFilter.FILTER_REJECT:"function"==typeof r.filter?r.filter({node:e})?window.NodeFilter.FILTER_ACCEPT:window.NodeFilter.FILTER_REJECT:window.NodeFilter.FILTER_ACCEPT}}),r.root.ownerDocument.createTreeWalker(r.root,r.whatToShow,n,!1)},isContainUneditable:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(!t.node||1!==t.node.nodeType)return!1
var r=t.node.querySelectorAll('[contenteditable="false"]')
if(!1===t.ignoreMarkNode)return 0<r.length
for(var n=0,i=r.length;n<i;n++)if(!this.isMarkNode(r[n]))return!0
return!1},isUneditableApplyStyle:function(e){return!!{margin:1,"margin-left":1,"margin-right":1,"margin-top":1,"margin-bottom":1}[(0<arguments.length&&void 0!==e?e:{}).styleKey]},getDelNode:function(e){var t=0<arguments.length&&void 0!==e?e:{},r="",n=""
if(n="pre"===t.type?(r="lastChild","previousSibling"):(r="firstChild","nextSibling"),!r)return null
for(var i=u(t.node,r,n,!1),o=null,l=null;i&&(!t.endNode||(l=C.getPosition(i,t.endNode)&C.POSITION_FOLLOWING)&&"pre"===t.type||"next"===t.type&&!l);){if(3==i.nodeType||t.filter&&t.filter(i)||!this.isBlockElm(i)&&!i[r]){o=i
break}i=u(i,r,n,!0)}return o},isUneditablePluginNode:function(e){var t=0<arguments.length&&void 0!==e?e:{}
return!!(t.node&&t.node.getAttribute&&t.node.getAttribute(v)&&2===this.isContentEditable({node:t.node,checkParent:!1}))},findUneditablePluginNode:function(e){return(0<arguments.length&&void 0!==e?e:{}).node.querySelectorAll('[contenteditable="false"]['+v+"]")},removeSiblingFillchar:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.node)for(var r=["previousSibling","nextSibling"],n=0,i=r.length;n<i;n++)for(var o=r[n],l=null,a=t.node[o];a&&this.isFillChar2(a);)l=a[o],this.remove(a),a=l},removePluginDefaultClass:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.node&&1===t.node.nodeType&&t.node.className&&"[object String]"===Object.prototype.toString.call(t.node.className)){var r=t.node.className.split(" ")
r.indexOf(N)<0||r.indexOf(b)<0||this.isContainUneditable({node:t.node,ignoreMarkNode:!0})||(r.splice(r.indexOf(N),1),r.splice(r.indexOf(b),1),t.node.className=r.join(" "),t.node.className||t.node.removeAttribute("class"))}},fillHtml:s.ie11below?p:"<br/>"}
return{domUtils:C,fillCharReg:C.fillCharReg,fillChar:p,fillCharEncode:m,getDomNode:u,checktextTagName:h,checktextTmpTagName:y,pluginAttr:v,pluginParentClass:N,uneditableParentClass:b}})
"use strict"
define("3rd/editor/common/browser.js",[],function(e,o,t){return window.UE||(window.UE={}),{browser:UE.browser=function(){var e=navigator.userAgent.toLowerCase(),o=window.opera,t={ipad:/(ipad).*\s([\d_]+)/i.test(e),iphone:/(iphone)\sos\s([\d_]+)/i.test(e),android:/(android)\s([\d\.]+)/i.test(e),edge:/edge\/([\w.]+)/i.test(e),ie:/(msie\s|trident.*rv:)([\w.]+)/.test(e),opera:!!o&&o.version,webkit:-1<e.indexOf(" applewebkit/"),mac:-1<e.indexOf("macintosh"),quirks:"BackCompat"==document.compatMode}
t.gecko="Gecko"==navigator.product&&!t.webkit&&!t.opera&&!t.ie
var i=0
if(t.ie){var d=e.match(/(?:msie\s([\w.]+))/),a=e.match(/(?:trident.*rv:([\w.]+))/)
i=d&&a&&d[1]&&a[1]?Math.max(1*d[1],1*a[1]):d&&d[1]?1*d[1]:a&&a[1]?1*a[1]:0,t.ie11Compat=11==document.documentMode,t.ie9Compat=9==document.documentMode,t.ie8=!!document.documentMode,t.ie8Compat=8==document.documentMode,t.ie7Compat=7==i&&!document.documentMode||7==document.documentMode,t.ie6Compat=i<7||t.quirks,t.ie9above=8<i,t.ie9below=i<9,t.ie11above=10<i,t.ie11below=i<11}if(t.gecko){var r=e.match(/rv:([\d\.]+)/)
r&&(i=1e4*(r=r[1].split("."))[0]+100*(r[1]||0)+1*(r[2]||0))}return/chrome\/(\d+\.\d)/i.test(e)&&(t.chrome=+RegExp.$1),/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e)&&!/chrome/i.test(e)&&(t.safari=+(RegExp.$1||RegExp.$2)),t.opera&&(i=parseFloat(o.version())),t.webkit&&(i=parseFloat(e.match(/ applewebkit\/(\d+)/)[1])),t.version=i,t.isCompatible=!t.mobile&&(t.ie&&6<=i||t.gecko&&10801<=i||t.opera&&9.5<=i||t.air&&1<=i||t.webkit&&522<=i||!1),t}()}})
"use strict"
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
define("3rd/editor/common/utils.js",["3rd/editor/common/browser.js"],function(e,t,r){var n=e("3rd/editor/common/browser.js").browser,i={supportWalker:!1,hasCheckWalker:!1}
window.UE||(window.UE={})
var o,u,a,c,l=UE.utils={each:function(e,t,r){if(null!=e)if(e.length===+e.length){for(var n=0,o=e.length;n<o;n++)if(!1===t.call(r,e[n],n,e))return!1}else for(var i in e)if(e.hasOwnProperty(i)&&!1===t.call(r,e[i],i,e))return!1},isSupportWalker:function(){if(i.hasCheckWalker)return i.supportWalker
if(i.hasCheckWalker=!0,"function"==typeof document.createTreeWalker&&window.NodeFilter&&window.NodeFilter.SHOW_ALL&&window.NodeFilter.SHOW_TEXT&&window.NodeFilter.FILTER_ACCEPT&&window.NodeFilter.FILTER_REJECT){var e=document.createElement("div")
e.style.display="none",e.innerHTML='<div id="test_walker_accept"></div>a<div id="test_walker_reject"></div>'
var t=[],r=[]
try{for(var n=document.createTreeWalker(e,window.NodeFilter.SHOW_TEXT,{acceptNode:function(e){return window.NodeFilter.FILTER_ACCEPT}},!1),o=document.createTreeWalker(e,window.NodeFilter.SHOW_ALL,{acceptNode:function(e){return 1==e.nodeType&&"test_walker_accept"==e.id?window.NodeFilter.FILTER_ACCEPT:window.NodeFilter.FILTER_REJECT}},!1);n.nextNode();)t.push(n.currentNode)
for(;o.nextNode();)r.push(o.currentNode)}catch(e){t=[],r=[]}return 1==t.length&&"a"===t[0].nodeValue&&1==r.length&&"test_walker_accept"===r[0].id?i.supportWalker=!0:i.supportWalker=!1,i.supportWalker}},makeInstance:function(e){var t=new Function
return t.prototype=e,e=new t,t.prototype=null,e},extend:function(e,t,r){if(t)for(var n in t)r&&e.hasOwnProperty(n)||(e[n]=t[n])
return e},extend2:function(e){for(var t=arguments,r=1;r<t.length;r++){var n=t[r]
for(var o in n)e.hasOwnProperty(o)||(e[o]=n[o])}return e},inherits:function(e,t){var r=e.prototype,n=l.makeInstance(t.prototype)
return l.extend(n,r,!0),(e.prototype=n).constructor=e},bind:function(e,t){return function(){return e.apply(t,arguments)}},defer:function(e,t,r){var n
return function(){r&&clearTimeout(n),n=setTimeout(e,t)}},indexOf:function(e,r,n){var o=-1
return n=this.isNumber(n)?n:0,this.each(e,function(e,t){if(n<=t&&e===r)return o=t,!1}),o},removeItem:function(e,t){for(var r=0,n=e.length;r<n;r++)e[r]===t&&(e.splice(r,1),r--)},trim:function(e){return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g,"")},listToMap:function(e){if(!e)return{}
e=l.isArray(e)?e:e.split(",")
for(var t,r=0,n={};t=e[r++];)n[t.toUpperCase()]=n[t]=1
return n},unhtml:function(e,t){return e?e.replace(t||/[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g,function(e,t){return t?e:{"<":"&lt;","&":"&amp;",'"':"&quot;",">":"&gt;","'":"&#39;"}[e]}):""},html:function(e){return e?e.replace(/&((g|l|quo)t|amp|#39);/g,function(e){return{"&lt;":"<","&amp;":"&","&quot;":'"',"&gt;":">","&#39;":"'"}[e]}):""},cssStyleToDomStyle:(a=document.createElement("div").style,c={float:null!=a.cssFloat?"cssFloat":null!=a.styleFloat?"styleFloat":"float"},function(e){return c[e]||(c[e]=e.toLowerCase().replace(/-./g,function(e){return e.charAt(1).toUpperCase()}))}),loadFile:(u=[],function(t,r,e){r.src&&(r.src+="?v="+UE.version),r.href&&(r.href+="?v="+UE.version)
var n=d(t,r)
if(n)n.ready?e&&e():n.funs.push(e)
else if(u.push({doc:t,url:r.src||r.href,funs:[e]}),t.body){if(!r.id||!t.getElementById(r.id)){var o=t.createElement(r.tag)
for(var i in delete r.tag,r)o.setAttribute(i,r[i])
o.onload=o.onreadystatechange=function(){if(!this.readyState||/loaded|complete/.test(this.readyState)){if(0<(n=d(t,r)).funs.length){n.ready=1
for(var e;e=n.funs.pop();)e()}o.onload=o.onreadystatechange=null}},o.onerror=function(){throw Error("The load "+(r.href||r.src)+" fails,check the url settings of file ueditor.config.js ")},t.getElementsByTagName("head")[0].appendChild(o)}}else{var a=[]
for(var i in r)"tag"!=i&&a.push(i+'="'+r[i]+'"')
t.write("<"+r.tag+" "+a.join(" ")+" ></"+r.tag+">")}}),isEmptyObject:function(e){if(null==e)return!0
if(this.isArray(e)||this.isString(e))return 0===e.length
for(var t in e)if(e.hasOwnProperty(t))return!1
return!0},fixColor:function(e,t){if(/color/i.test(e)&&/rgba?/.test(t)){var r=t.split(",")
if(3<r.length)return""
t="#"
for(var n,o=0;n=r[o++];)t+=1==(n=parseInt(n.replace(/[^\d]/gi,""),10).toString(16)).length?"0"+n:n
t=t.toUpperCase()}return t},optCss:function(e){var o,i
function t(e,t){if(!e)return""
var r=e.top,n=e.bottom,o=e.left,i=e.right,a=""
if(r&&o&&n&&i)a+=";"+t+":"+(r==n&&n==o&&o==i?r:r==n&&o==i?r+" "+o:o==i?r+" "+o+" "+n:r+" "+i+" "+n+" "+o)+";"
else for(var u in e)a+=";"+t+"-"+u+":"+e[u]+";"
return a}return e=e.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi,function(e,t,r,n){if(1==n.split(" ").length)switch(t){case"padding":return(o=o||{})[r]=n,""
case"margin":return(i=i||{})[r]=n,""
case"border":return"initial"==n?"":e}return e}),(e+=t(o,"padding")+t(i,"margin")).replace(/^[ \n\r\t;]*|[ \n\r\t]*$/,"").replace(/;([ \n\r\t]+)|\1;/g,";").replace(/(&((l|g)t|quot|#39))?;{2,}/g,function(e,t){return t?t+";;":";"})},clone:function(e,t){var r
for(var n in t=t||{},e)e.hasOwnProperty(n)&&("object"==(void 0===(r=e[n])?"undefined":_typeof(r))?(t[n]=l.isArray(r)?[]:{},l.clone(e[n],t[n])):t[n]=r)
return t},transUnitToPx:function(n){if(!/(pt|cm)/.test(n))return n
var o
switch(n.replace(/([\d.]+)(\w+)/,function(e,t,r){n=t,o=r}),o){case"cm":n=25*parseFloat(n)
break
case"pt":n=Math.round(96*parseFloat(n)/72)}return n+(n?"px":"")},domReady:(o=[],function(e,t){var r=(t=t||window).document
e&&o.push(e),"complete"===r.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?s(r):(r.isReady&&s(r),t.addEventListener?(r.addEventListener("DOMContentLoaded",function e(){r.removeEventListener("DOMContentLoaded",e,!1),s(r)},!1),t.addEventListener("load",function(){s(r)},!1)):(function(){if(!r.isReady){try{r.documentElement.doScroll("left")}catch(e){return setTimeout(arguments.callee,0)}s(r)}}(),t.attachEvent("onload",function(){s(r)})))}),cssRule:n.ie&&11!=n.version&&document.createStyleSheet?function(e,t,r){var n,o,i
if((n=(r=r||document).indexList?r.indexList:r.indexList={})[e])i=r.styleSheets[n[e]]
else{if(void 0===t)return""
i=r.createStyleSheet("",o=r.styleSheets.length),n[e]=o}if(void 0===t)return i.cssText
i.cssText=t||""}:function(e,t,r){var n,o=(r=r||document).getElementsByTagName("head")[0]
if(!(n=r.getElementById(e))){if(void 0===t)return"";(n=r.createElement("style")).id=e,o.appendChild(n)}if(void 0===t)return n.innerHTML
""!==t?n.innerHTML=t:o.removeChild(n)},sort:function(e,t){t=t||function(e,t){return e.localeCompare(t)}
for(var r=0,n=e.length;r<n;r++)for(var o=r,i=e.length;o<i;o++)if(0<t(e[r],e[o])){var a=e[r]
e[r]=e[o],e[o]=a}return e}}
function s(e){e.isReady=!0
for(var t;t=o.pop();t());}function d(e,t){try{for(var r,n=0;r=u[n++];)if(r.doc===e&&r.url==(t.src||t.href))return r}catch(e){return null}}return l.each(["String","Function","Array","Number","RegExp","Object"],function(t){UE.utils["is"+t]=function(e){return Object.prototype.toString.apply(e)=="[object "+t+"]"}}),{utils:l}})
"use strict"
define("3rd/editor/common/dtd.js",["3rd/editor/common/utils.js"],function(e,t,o){var r,a,d,i,s,n,l,b,m,p,c,u,h,f,g,y,k,v,$,x,w,q,E,j,U,C,B=e("3rd/editor/common/utils.js").utils
function A(e){for(var t in e)e[t.toUpperCase()]=e[t]
return e}return window.UE||(window.UE={}),window.UE.dom||(window.UE.dom={}),{dtd:window.UE.dom.dtd=(r=B.extend2,a=A({isindex:1,fieldset:1}),d=A({input:1,button:1,select:1,textarea:1,label:1}),i=r(A({a:1}),d),s=r({iframe:1},i),n=A({hr:1,ul:1,menu:1,div:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1}),l=A({ins:1,del:1,script:1,style:1}),b=r(A({b:1,acronym:1,bdo:1,var:1,"#":1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1}),l),m=r(A({sub:1,img:1,embed:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1}),b),p=r(A({p:1}),m),c=r(A({iframe:1}),m,d),u=A({img:1,embed:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,"#":1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,var:1,div:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1}),h=r(A({a:0}),c),f=A({tr:1}),g=A({"#":1}),y=r(A({param:1}),u),k=r(A({form:1}),a,s,n,p),v=A({li:1,ol:1,ul:1}),$=A({style:1,script:1}),x=A({base:1,link:1,meta:1,title:1}),w=r(x,$),q=A({head:1,body:1}),E=A({html:1}),j=A({address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1}),U=A({figure:1,output:1,hgroup:1,video:1,footer:1,header:1,canvas:1,audio:1,aside:1,figcaption:1,section:1,address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1}),C=A({area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1}),A({$nonBodyContent:r(E,q,x),$block:j,$block2:U,$inline:h,$inlineWithA:r(A({a:1}),h),$body:r(A({script:1,style:1}),j),$cdata:A({script:1,style:1}),$empty:C,$nonChild:A({iframe:1,textarea:1}),$listItem:A({dd:1,dt:1,li:1}),$list:A({ul:1,ol:1,dl:1}),$isNotEmpty:A({pre:1,table:1,ul:1,ol:1,dl:1,iframe:1,area:1,base:1,col:1,hr:1,img:1,embed:1,input:1,link:1,meta:1,param:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1}),$removeEmpty:A({a:1,abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,var:1}),$removeEmptyBlock:A({p:1,div:1}),$tableContent:A({caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1,table:1}),$notTransContent:A({pre:1,script:1,style:1,textarea:1}),html:q,head:w,style:g,script:g,body:k,base:{},link:{},meta:{},title:g,col:{},tr:A({td:1,th:1}),img:{},embed:{},colgroup:A({thead:1,col:1,tbody:1,tr:1,tfoot:1}),noscript:k,td:k,br:{},th:k,center:k,kbd:h,button:r(p,n),basefont:{},h5:h,h4:h,samp:h,h6:h,ol:v,h1:h,h3:h,option:g,h2:h,form:r(a,s,n,p),select:A({optgroup:1,option:1}),font:h,ins:h,menu:v,abbr:h,label:h,table:A({thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1}),code:h,tfoot:f,cite:h,li:k,input:{},iframe:k,strong:h,textarea:g,noframes:k,big:h,small:h,span:A({"#":1,br:1,b:1,strong:1,u:1,i:1,em:1,sub:1,sup:1,strike:1,span:1}),hr:h,dt:h,sub:h,optgroup:A({option:1}),param:{},bdo:h,var:h,div:k,object:y,sup:h,dd:k,strike:h,area:{},dir:v,map:r(A({area:1,form:1,p:1}),a,l,n),applet:y,dl:A({dt:1,dd:1}),del:h,isindex:{},fieldset:r(A({legend:1}),u),thead:f,ul:v,acronym:h,b:h,a:r(A({a:1}),c),blockquote:r(A({td:1,tr:1,tbody:1,li:1}),k),caption:h,i:h,u:h,tbody:f,s:h,address:r(s,p),tt:h,legend:h,q:h,pre:r(b,i),p:r(A({a:1}),h),em:h,dfn:h}))}})
"use strict"
function _asyncToGenerator(e){return function(){var o=e.apply(this,arguments)
return new Promise(function(c,r){return function t(e,a){try{var i=o[e](a),n=i.value}catch(e){return void r(e)}if(!i.done)return Promise.resolve(n).then(function(e){t("next",e)},function(e){t("throw",e)})
c(n)}("next")})}}define("3rd/editor/plugin/checkTextUtils.js",["vue-weui/src/utils/string.js","3rd/store/store.js","pages/modules/dbCache/dbCache.js","pages/modules/utils/cgi.js","3rd/editor/common/domUtils.js"],function(e,t,a){var h=this,n=e("vue-weui/src/utils/string.js"),g=e("3rd/store/store.js"),d=e("pages/modules/dbCache/dbCache.js"),p=e("pages/modules/utils/cgi.js"),i=e("3rd/editor/common/domUtils.js"),m={checkResult:{},hasReportHtmlText:!1,cacheKey:"mpchecktextinfo",cacheValidTime:2592e6,checkQueue:[],checktexting:!1,splitChar:[{value:"？",escape:!1},{value:"！",escape:!1},{value:"。",escape:!1},{value:"：",escape:!1},{value:"；",escape:!1}],blockTag:{p:1,section:1,br:1,iframe:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,table:1,ul:1,div:1,dl:1,ol:1,pre:1,form:1,figure:1,output:1,hgroup:1,video:1,footer:1,header:1,canvas:1,audio:1,aside:1,figcaption:1,address:1,blockquote:1,center:1,dir:1,fieldset:1,isindex:1,menu:1,noframes:1},splitTagName:i.checktextTagName,splitTagText:"mpchecktext@#%mpchecktext",tmpTagName:i.checktextTmpTagName,highlineClass:"character selected",highlineclassJs:"js_checktext",highlineTagName:"span",uid:+new Date}
function c(){return m.uid+++"_"+Math.random()}function l(e){e=e||{}
return u({tagName:m.splitTagName,needGlobal:e.needGlobal})}function u(e){return e.needGlobal?new RegExp("<"+e.tagName+"[^<>]*>[^<>]*</"+e.tagName+">","g"):new RegExp("<"+e.tagName+"[^<>]*>[^<>]*</"+e.tagName+">")}function r(){if(!0!==m.checktexting&&0!=m.checkQueue.length){var e=m.checkQueue.shift()
e.data&&("1"==e.data.status?function(a){if(!(a&&a.data&&a.data.origin&&a.instance))return
if(!0===o(a))return r()
if(m.checktexting)return
m.checktexting=!0,a.data.status=2,p.post({url:"/cgi-bin/spellingcheck?",dataType:"json",data:{action:"check",content:a.data.origin}},function(e){if(e&&e.base_resp&&1*e.base_resp.ret==0){var t=[]
e.check_result&&e.check_result.check_item&&e.check_result.check_item.position&&0<e.check_result.check_item.position.length&&(t=e.check_result.check_item.position),f({origin:a.data.origin,position:t}),o(a)}else a.data.status=5
m.checktexting=!1,r()},function(){m.checktexting=!1,a.data.status=5,r()})}(e):r())}}function o(e){if(!(e&&e.data&&e.data.origin&&e.instance))return!1
var t=encodeURIComponent(e.data.origin||"")
if(m.checkResult[t]){var a=m.checkResult[t]
if(a.position&&0<a.position.length){var i=e.instance.getCheckTextInfo()
i&&i[e.data.id]===e.data&&e.instance.getTextByEndSplit(e.data.id)===e.data.origin?(e.data.status=3,e.data.position=a.position,s(e)):e.instance.clearSplitElement({id:e.data.id})}else e.data.status=4,e.data.position=[],s(e)
return!0}return!0===e.data.noRequest?(f({origin:e.data.origin,position:[]}),e.data.status=4,e.data.position=[],s(e),!0):e.data.origin!==n.text(e.data.origin)&&(f({origin:e.data.origin,position:[]}),e.data.status=4,e.data.position=[],s(e),function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
if(!e.instance||!e.instance.editor)return
if(1===parseInt(1e3*Math.random(),10)&&!m.hasReportHtmlText){m.hasReportHtmlText=!0
var t=e.instance.editor.getDocument().body.innerHTML,a=new Date,i=a.getFullYear(),n=a.getMonth()+1,c=a.getDate(),r=a.getHours(),o=a.getMinutes(),s=a.getSeconds(),l=i+"-"+n+"-"+c+" "+r+":"+o+":"+s,u=parseInt(a.getTime()/1e3,10),h={data:JSON.stringify({appmsgid:e.instance.editor.__o.app_id,seq:e.instance.editor.__g.curSeq,ua:window.navigator.userAgent,text:e.text,body:t}),description:"checktext has html tag",level:"info",location:window.location.href,time:l,timestamp:u}
p.post({url:"/advanced/mplog?action=up",data:{log:JSON.stringify({detail_items:[h]}),seq:0}}),window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&window.WX_BJ_REPORT.BadJs.report&&window.WX_BJ_REPORT.BadJs.report("checktext has html tag","https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit&action=edit",{mid:"mmbizweb2:monitorChecktextHasHtmlTag"})}e.instance.editor.fireEvent("reportAddNum","122443","5",1)}({text:e.data.origin,instance:e.instance}),!0)}function f(e){if(e&&e.origin&&e.position){var t=encodeURIComponent(e.origin||"")
m.checkResult[t]={origin:e.origin,position:e.position}}}function s(e){setTimeout(function(){e.instance.updateErrCount({afterCheck:!0,status:e.data.status,splitId:e.data.id})},0)}!function(){for(var e=[],t=0,a=m.splitChar.length;t<a;t++)e.push(m.splitChar[t].value)
m.splitcharStr=e.join("")}()
function T(e,t){return m.cacheKey+"_"+wx.data.uin+"_"+e+"_"+t}function k(){return(new Date).getTime()+m.cacheValidTime}var x,v=(x=_asyncToGenerator(regeneratorRuntime.mark(function e(t,a){var i,n,c,r,o,s,l,u
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=void 0,e.prev=1,n=T(t,a),e.next=5,d.get({cacheKey:n})
case 5:if((!(i=e.sent)||!i.cacheValue)&&(c=g.get(n))&&c.checkTextInfo){r=null
try{r=JSON.parse(c.checkTextInfo)}catch(e){r=null}r&&(i={cacheValue:{content:"",checkTextInfo:r},cacheKey:n,updateTime:(new Date).getTime(),expireTime:k()})}if(i&&i.cacheValue&&(o=i.cacheValue)&&o.checkTextInfo)for(l in s=o.checkTextInfo)(u=s[l])&&u.origin&&"[object Array]"===Object.prototype.toString.call(u.position)&&("3"==u.status||"4"==u.status)&&f({origin:u.origin,position:u.position})
e.next=13
break
case 10:e.prev=10,e.t0=e.catch(1),i=null
case 13:return e.abrupt("return",i)
case 15:case"end":return e.stop()}},e,h,[[1,10]])})),function(e,t){return x.apply(this,arguments)})
return{splitcharStr:m.splitcharStr,splitChar:m.splitChar,splitTagName:m.splitTagName,getSplitTag:function(e){return e=e||c(),"<"+m.splitTagName+' contenteditable="false" id="'+e+'"></'+m.splitTagName+">"},getSplitTagReg:l,tmpTagName:m.tmpTagName,getUid:c,splitTagText:m.splitTagText,blockTag:m.blockTag,clearSplitTag:function(e){if(!e)return""
var t,a,i=(t={needGlobal:!0},a="<"+m.highlineTagName+"[^>]*"+m.highlineclassJs+"[^<>]*>([^<>]*)</"+m.highlineTagName+">",t.needGlobal?new RegExp(a,"g"):new RegExp(a))
if(e=e.replace(l({needGlobal:!0}),"").replace(u({needGlobal:!0,tagName:m.tmpTagName}),"").replace(i,"$1"),new RegExp("<"+m.highlineTagName+"[^>]*"+m.highlineclassJs+"[^<>]*>").test(e)){var n=document.createElement("div")
n.innerHTML=e
var c=n.querySelectorAll(m.highlineTagName+"."+m.highlineclassJs)
if(c&&0<c.length){for(var r=0,o=c.length;r<o;r++){for(var s=c[r];s.firstChild;)s.parentElement.insertBefore(s.firstChild,s)
s.parentElement.removeChild(s)}e=n.innerHTML}}return e},addCheckInfoQueue:function(e){m.checkQueue.push(e),r()},clearQueue:function(){m.checkQueue=[]},setCacheData:function(e){e.appmsgId&&d.set({data:{cacheKey:T(e.appmsgId,e.seq),cacheValue:{content:e.content||"",checkTextInfo:e.checkTextInfo},expireTime:k()}})},getCacheData:v,removeCacheData:function(e,t){d.remove({cacheKey:T(e,t)})},highlineClass:m.highlineClass,highlineclassJs:m.highlineclassJs,highlineTagName:m.highlineTagName,isDbCacheSupported:d.isSupported,html:function(e,t){var a=void 0
a=!1===t?["&#39;","'","&quot;",'"',"&#32;"," ","&#160;"," ","&nbsp;"," ","&gt;",">","&lt;","<","&amp;","&"]:["&","&amp;","<","&lt;",">","&gt;"," ","&#32;"," ","&nbsp;",'"',"&quot;","'","&#39;"]
for(var i=e,n=0;n<a.length;n+=2)i=i.replace(new RegExp(a[n],"g"),a[1+n])
return i}}})
define("vue-weui/src/utils/string.js",[],function(t,n,e){"use strict"
e.exports={format:function(t,e){return t.replace(/\{(\w+)\}/g,function(t,n){return void 0!==e[n]?e[n]:t})},sprintf:function(){for(var t=arguments.length,n=Array(t),e=0;e<t;e++)n[e]=arguments[e]
var r=void 0,i=n[0]||"",o=void 0,u=void 0,c=n.length-1
if(c<1)return i
for(r=1;r<1+c;)i=i.replace(/%s/,"{#"+r+"#}"),r++
for(i.replace("%s",""),r=1;void 0!==(o=n[r]);)u=new RegExp("{#"+r+"#}","g"),i=i.replace(u,o),r++
return i},text:function(t){return t.replace(/<\/?[^>]*\/?>/g,"")},len:function(t){return t.replace(/[^\x00-\xff]/g,"**").length},truncate:function(t,n,e){var r=n||30,i=Object.isUndefined(e)?"...":e
return t.length>r?t.slice(0,r-i.length)+i:String(t)},trim:String.prototype.trim||function(t,n){return!0===n?t.replace(/^\s+/,""):!1===n?t.replace(/\s+$/,""):t.replace(/^\s+/,"").replace(/\s+$/,"")},html:function(t,n){var e=void 0
e=!1===n?["&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&amp;","&"]:["&","&amp;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;"]
for(var r=t,i=0;i<e.length;i+=2)r=r.replace(new RegExp(e[i],"g"),e[1+i])
return r},has:function(t,n){return-1<t.indexOf(n)},startsWith:function(t,n){return 0===t.lastIndexOf(n,0)},endsWith:function(t,n){var e=t.length-n.length
return 0<=e&&t.indexOf(n,e)===e},param:function(t,e,n){if("function"!=typeof t.split)return null
var r=t.split(n||"&"),i={}
return r.each(function(t){var n=t.split("=")
2===n.length&&n[0]&&n[1]&&(!0===e?i[decodeURIComponent(n[0])]=decodeURIComponent(n[1]):i[n[0]]=n[1])}),i},empty:function(t){return""===t},blank:function(t){return/^\s*$/.test(t)},bytes:function(t){for(var n=0,e=void 0,r=0;e=t.charAt(n++);)r+=e.charCodeAt().toString(16).length/2
return r}}})
define("3rd/store/store.js",["3rd/json/json.js"],function(e,t,r){var i,n=e("3rd/json/json.js"),a={},o=window.document,c="localStorage",u="__storejs__"
function d(){try{return c in window&&window[c]}catch(e){return!1}}if(a.disabled=!1,a.set=function(e,t){},a.get=function(e){},a.remove=function(e){},a.clear=function(){},a.transact=function(e,t,r){var n=a.get(e)
null==r&&(r=t,t=null),void 0===n&&(n=t||{}),r(n),a.set(e,n)},a.getAll=function(){},a.serialize=function(e){return n.stringify2(e)},a.deserialize=function(t){if("string"==typeof t)try{return n.parse(t)}catch(e){return t||void 0}},d())i=window[c],a.set=function(t,r,n){if(void 0===r)return a.remove(t)
try{i.setItem(t,a.serialize(r))}catch(e){window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&window.WX_BJ_REPORT.BadJs.onError&&window.WX_BJ_REPORT.BadJs.onError(e,{mid:"mmbizweb2:monitorLsQuotaExceeded"}),i.clear()
try{i.setItem(t,a.serialize(r))}catch(e){"function"==typeof n&&n(e)}}return r},a.get=function(e,t){try{return a.deserialize(i.getItem(e))}catch(e){return void("function"==typeof t&&t(e))}},a.remove=function(e,t){try{i.removeItem(e)}catch(e){"function"==typeof t&&t(e)}},a.clear=function(t){try{i.clear()}catch(e){"function"==typeof t&&t(e)}},a.getAll=function(){for(var e={},t=0;t<i.length;++t){var r=i.key(t)
e[r]=a.get(r)}return e}
else if(o.documentElement.addBehavior){var s,l
try{(l=new ActiveXObject("htmlfile")).open(),l.write('<script>document.w=window<\/script><iframe src="/favicon.ico"></iframe>'),l.close(),s=l.w.frames[0].document,i=s.createElement("div")}catch(e){i=o.createElement("div"),s=o.body}function f(r){return function(){var e=Array.prototype.slice.call(arguments,0)
e.unshift(i),s.appendChild(i),i.addBehavior("#default#userData"),i.load(c)
var t=r.apply(a,e)
return s.removeChild(i),t}}var m=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g")
function v(e){return e.replace(m,"___")}a.set=f(function(e,t,r){return t=v(t),void 0===r?a.remove(t):(e.setAttribute(t,a.serialize(r)),e.save(c),r)}),a.get=f(function(e,t){return t=v(t),a.deserialize(e.getAttribute(t))}),a.remove=f(function(e,t){t=v(t),e.removeAttribute(t),e.save(c)}),a.clear=f(function(e){var t=e.XMLDocument.documentElement.attributes
e.load(c)
for(var r,n=0;r=t[n];n++)e.removeAttribute(r.name)
e.save(c)}),a.getAll=f(function(e){for(var t,r=e.XMLDocument.documentElement.attributes,n={},i=0;t=r[i];++i){var o=v(t.name)
n[t.name]=a.deserialize(e.getAttribute(o))}return n})}try{a.set(u,u),a.get(u)!=u&&(a.disabled=!0),a.remove(u)}catch(e){a.disabled=!0}a.isLocalStorageNameSupported=d,a.enabled=!a.disabled,r.exports=a})
define("3rd/json/json.js",[],function(require,exports,module){return"object"!=typeof JSON&&(JSON={}),function(){"use strict"
function f(t){return t<10?"0"+t:t}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(t){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(t){return this.valueOf()})
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep
function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t]
return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,f,u,i=gap,p=e[t]
switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(t)),"function"==typeof rep&&(p=rep.call(e,t,p)),typeof p){case"string":return quote(p)
case"number":return isFinite(p)?String(p):"null"
case"boolean":case"null":return String(p)
case"object":if(!p)return"null"
if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(p)){for(f=p.length,r=0;r<f;r+=1)u[r]=str(r,p)||"null"
return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",gap=i,o}if(rep&&"object"==typeof rep)for(f=rep.length,r=0;r<f;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],p))&&u.push(quote(n)+(gap?": ":":")+o)
else for(n in p)Object.prototype.hasOwnProperty.call(p,n)&&(o=str(n,p))&&u.push(quote(n)+(gap?": ":":")+o)
return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",gap=i,o}}JSON.stringify2=function(t,e,r){var n
if(indent=gap="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" "
else"string"==typeof r&&(indent=r)
if((rep=e)&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify")
return str("",{"":t})},"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j
function walk(t,e){var r,n,o=t[e]
if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r])
return reviver.call(t,e,o)}if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j
throw new SyntaxError("JSON.parse")})}(),JSON})
define("pages/modules/dbCache/dbCache.js",["pages/modules/mplog/mplogd.js"],function(e,t,n){"use strict"
function s(){return d.logInstance||(d.logInstance=new c({autoLogError:!1,autoLogRejection:!1,autoLogAjax:!1,dbName:"mpcache__"+wx.uin,dbStoreName:"local_cache",dbVersion:"4",bufferSize:1,retryInterval:3e3,onupgradeneeded:function(e){d.logInstance.db=e.target.result
try{if(!d.logInstance.db.objectStoreNames.contains(d.logInstance.DB_STORE_NAME)){var t=d.logInstance.db.createObjectStore(d.logInstance.DB_STORE_NAME,{keyPath:"cacheKey",autoIncrement:!1})
t.createIndex("updateTime","updateTime",{unique:!1}),t.createIndex("expireTime","expireTime",{unique:!1})}}catch(e){d.logInstance._throwError(c.errorLevel.fatal,"indexedDB upgrade error",e)}}}),d.clearExpireDataId&&(clearTimeout(d.clearExpireDataId),d.clearExpireDataId=null),d.clearExpireDataId=setTimeout(function(){!function e(t){var n=0<arguments.length&&void 0!==t?t:{}
if(d.isSupported){var o=n.logInstance
if(o.status!==c.dbStatus.INITED&&o.pool.length<o.poolSize)o.pool.push(function(){return e()})
else{var r=o._getTransaction(c.transactionType.READ_WRITE)
if(r){var a=r.objectStore(o.DB_STORE_NAME),i=IDBKeyRange.upperBound(+new Date)
a.index("expireTime").openCursor(i).onsuccess=function(e){var t=e.target.result
t&&(t.delete(),t.continue())}}else o._throwError(c.errorLevel.fatal,"transaction is null")}}}({logInstance:d.logInstance})},3e4)),d.logInstance}var c=e("pages/modules/mplog/mplogd.js"),d={isSupported:!(!(window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB)||!window.IDBKeyRange),logInstance:null,clearExpireDataId:null}
n.exports={isSupported:d.isSupported,get:function a(e){var i=0<arguments.length&&void 0!==e?e:{}
return new Promise(function(t,n){if(d.isSupported){var e=s()
if(e.status!==c.dbStatus.INITED&&e.pool.length<e.poolSize)e.pool.push(function(){a(i).then(function(e){t(e)},function(e){n(e)})})
else{var o=e._getTransaction(c.transactionType.READ_ONLY)
if(!o)return e._throwError(c.errorLevel.fatal,"transaction is null"),void n(null)
var r=o.objectStore(e.DB_STORE_NAME).get(i.cacheKey)
r.onsuccess=function(e){t(e.target.result)},r.onerror=function(e){n(e.target.error)}}}else n(null)})},set:function e(t){var n=0<arguments.length&&void 0!==t?t:{}
if(d.isSupported){var o=s()
if(o.status!==c.dbStatus.INITED&&o.pool.length<o.poolSize)o.pool.push(function(){return e(n)})
else{var r=function(e){return{cacheKey:e.cacheKey,cacheValue:e.cacheValue,updateTime:+new Date,expireTime:void 0===e.expireTime?9999999999999:1*e.expireTime}}
if("[object Object]"===Object.prototype.toString.call(n.data))o.bufferLog.push(r(n.data))
else if("[object Array]"===Object.prototype.toString.call(n.data))for(var a=0,i=n.data.length;a<i;a++){var l=n.data[a]
o.bufferLog.push(r(l))}0<o.bufferLog.length&&o._flush()}}},remove:function e(t){var n=0<arguments.length&&void 0!==t?t:{}
if(d.isSupported){var o=s()
if(o.status!==c.dbStatus.INITED&&o.pool.length<o.poolSize)o.pool.push(function(){return e(n)})
else{var r=o._getTransaction(c.transactionType.READ_WRITE)
if(r)r.objectStore(o.DB_STORE_NAME).delete(n.cacheKey)
else o._throwError(c.errorLevel.fatal,"transaction is null")}}},handlerAll:function l(e){var u=0<arguments.length&&void 0!==e?e:{}
return new Promise(function(o,t){if(d.isSupported){var e=s()
if(e.status!==c.dbStatus.INITED&&e.pool.length<e.poolSize)e.pool.push(function(){l(u).then(function(e){o(e)},function(e){t(e)})})
else{var n=e._getTransaction(c.transactionType.READ_WRITE)
if(!n)return e._throwError(c.errorLevel.fatal,"transaction is null"),void t(null)
var r=n.objectStore(e.DB_STORE_NAME),a=void 0
a=u.index?r.index(u.index).openCursor(u.keyRange):r.openCursor(u.keyRange)
var i={data:[]}
a.onsuccess=function(e){var t=e.target.result
if(t){if("function"==typeof u.filter){var n=u.filter({data:t.value})
n&&"add"===n.type?i.data.push(t.value):n&&"delete"===n.type?t.delete():n&&"update"===n.type&&n.data&&t.update(n.data)}else i.data.push(t.value)
t.continue()}else o(i)},a.onerror=function(e){t(e.target.error)}}}else t(null)})},isUsable:function(){return!(d.logInstance&&d.logInstance.status===c.dbStatus.FAILED&&d.logInstance.currentRetryCount>d.logInstance.maxRetryCount)}}})
define("pages/modules/mplog/mplogd.js",[],function(t,e,r){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n=function(t,e,r){return e&&a(t.prototype,e),r&&a(t,r),t}
function a(t,e){for(var r=0;r<e.length;r++){var o=e[r]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var u={defaultDbName:"mplog__"+wx.uin,defaultDbStoreName:"logs"},i=(n(h,[{key:"_init",value:function(){try{this._createDB(),this._bindEvent()}catch(t){console.log("Mplog createDB failed")}}},{key:"_createDB",value:function(){var r=this
if(this.indexedDB=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB,this.indexedDB)if(this.status===h.dbStatus.INITING){var t=indexedDB.open(this.DB_NAME,this.DB_VERSION)
t.onerror=function(t){r._checkDB(t)
var e=h.errorLevel.serious
t.target.error&&"VersionError"===t.target.error.name&&(e=h.errorLevel.fatal,r.status=h.dbStatus.FAILED,r.currentRetryCount=r.maxRetryCount+1),r._throwError(e,"indexedDB open error, message:",t.target.error)},t.onsuccess=function(t){r.status===h.dbStatus.INITING&&(r.db=t.target.result,r.status=h.dbStatus.INITED,r.db.onerror=function(t){return r._throwError(h.errorLevel.serious,"indexedDB error",t.target.error)},r.db.onversionchange=function(t){0<r.bufferLog.length&&r._flush(),r.db.close(),r.status=h.dbStatus.FAILED,r.currentRetryCount=r.maxRetryCount+1,r._throwError(h.errorLevel.fatal,"indexedDB version change, message:",t.target.error)},r._consumePool(),r.DB_NAME===u.defaultDbName&&r.DB_STORE_NAME===u.defaultDbStoreName&&setTimeout(function(){r.keep(7)},3e4))},t.onblocked=function(){r._throwError(h.errorLevel.serious,"indexedDB is blocked")},t.onupgradeneeded=this.onupgradeneeded}else this._throwError(h.errorLevel.serious,"indexedDB init error")
else this._throwError(h.errorLevel.serious,"your browser not support IndexedDB.")}},{key:"_checkDB",value:function(t){t.target.error&&"QuotaExceededError"===t.target.error.name&&this.clean()}},{key:"_consumePool",value:function(){try{for(var t=this.pool.shift();t;)t(),t=this.pool.shift()}catch(t){this._throwError(h.errorLevel.fatal,"consume pool error",t)}}},{key:"_formatDate",value:function(t){var e=""
return/^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(t)?e+=new Date(t).getTime():/^\d{13}$/.test(t)?e+=t:this._throwError(h.errorLevel.normal,"invalid time "+t),1*e}},{key:"_throwError",value:function(t,e,r){var o=this
this.currentErrorNum+=t,this.currentErrorNum>=this.maxErrorNum&&(this.status=h.dbStatus.FAILED,this.pool=[],this.currentErrorNum=0)
var n=""
r&&(e=e+":"+(r.message||r.stack||r.name),n=r.toString()),console.error&&console.error("Mplog: error msg: "+e+", error detail: "+n),this.status===h.dbStatus.FAILED&&(this.timer=setInterval(function(){o.retryDBConnection()},this.retryInterval))}},{key:"retryDBConnection",value:function(){this.currentRetryCount++,this.currentRetryCount>this.maxRetryCount?(this.status=h.dbStatus.FAILED,this.pool=[],clearInterval(this.timer)):(this.status=h.dbStatus.INITING,this._createDB())}},{key:"info",value:function(t,e){this._log(this.location,h.levelEnum.info,t,e)}},{key:"warn",value:function(t,e){this._log(this.location,h.levelEnum.warn,t,e)}},{key:"error",value:function(t,e){this._log(this.location,h.levelEnum.error,t,e)}},{key:"keep",value:function(t){var e=this
if(this.status===h.dbStatus.FAILED)return!(this.pool=[])
if(this.pool.length>=this.poolSize)return!1
if(this.DB_NAME!==u.defaultDbName||this.DB_STORE_NAME!==u.defaultDbStoreName)return!1
if(this.status===h.dbStatus.INITING&&this.pool.length<this.poolSize)return this.pool.push(function(){return e.keep(t)})
var r=this._getTransaction(h.transactionType.READ_WRITE)
if(null===r)return this._throwError(h.errorLevel.fatal,"transaction is null"),!1
var o=r.objectStore(this.DB_STORE_NAME)
if(t){var n=Date.now()-60*t*60*24*1e3,a=IDBKeyRange.upperBound(n),i=o.index("timestamp").openCursor(a)
i.onsuccess=function(t){var e=t.target.result
e&&(e.delete(),e.continue())},i.onerror=function(t){return e._throwError(h.errorLevel.normal,"keep logs error",t.target.error)}}else o.clear().onerror=function(t){return e._throwError(h.errorLevel.serious,"indexedb_keep_clear",t.target.error)}
return!0}},{key:"clean",value:function(){var e=this
if(this.pool.length>=this.poolSize)return!1
if(this.status!==h.dbStatus.INITED&&this.pool.length<this.poolSize)return this.pool.push(function(){e.clean()})
this.db&&this.db.close()
var t=this.indexedDB.deleteDatabase(this.DB_NAME)
return t.onerror=function(t){e._throwError(h.errorLevel.serious,"clean database failed",t.target.error)},t.onsuccess=function(){e.dbStatus=h.dbStatus.FAILED},!0}},{key:"get",value:function(t,e,r){var o=this
if(this.pool.length>=this.poolSize)return!1
if(this.DB_NAME!==u.defaultDbName||this.DB_STORE_NAME!==u.defaultDbStoreName)return!1
if(this.status!==h.dbStatus.INITED&&this.pool.length<this.poolSize)return this.pool.push(function(){return o.get(t,e,r)})
t=1*this._formatDate(t),e=1*this._formatDate(e)
var n=this._getTransaction(h.transactionType.READ_ONLY)
if(null===n)return this._throwError(h.errorLevel.fatal,"transaction is null"),!1
var a=n.objectStore(this.DB_STORE_NAME),i=[],s=IDBKeyRange.bound(t,e)
return a.index("timestamp").openCursor(s).onsuccess=function(t){var e=t.target.result
e?(i.push({time:e.value.time,level:e.value.level,location:e.value.location,description:e.value.description,data:e.value.data,timestamp:e.value.timestamp}),e.continue()):r(i)},!0}},{key:"_getTransaction",value:function(t){var e=this,r=null
if(this.status===h.dbStatus.FAILED)r=null
else{try{r=this.db.transaction(this.DB_STORE_NAME,t)}catch(t){r=null}r&&(r.onerror=function(t){return t.stopPropagation(),e._throwError(h.errorLevel.fatal,"transaction is error")},r.onabort=function(t){t.stopPropagation(),t.target.error&&"QuotaExceededError"===t.target.error.name&&e.clean()})}return r}},{key:"_log",value:function(t,e,r,o){var n=new Date,a={time:h.formatTime(n),location:t,level:e,description:r,data:this._filterFunction(o),timestamp:n.getTime()}
this.bufferLog.push(a),this.bufferLog.length>=this.bufferSize&&this._flush()}},{key:"_bindEvent",value:function(){var e=this
this.autoLogError&&window.addEventListener("error",function(t){e.error("[OnError]: "+t.message,"("+t.lineno+"行"+t.colno+"列)")}),this.autoLogAjax&&window.addEventListener("unhandledrejection",function(t){e.error("[OnRejection]:",t.reason)}),this._ajaxHanler()}},{key:"_ajaxHanler",value:function(){if(this.autoLogAjax){var n=this
XMLHttpRequest.prototype.open=function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r]
this._lajaxMethod=e[0],this._lajaxUrl=h.resolveUrl(e[1]),n.xhrOpen.apply(this,e)},XMLHttpRequest.prototype.send=function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r]
var o=new Date;(n.logAjaxFilter&&n.logAjaxFilter(this._lajaxUrl,this._lajaxMethod)||!n.logAjaxFilter)&&(n.info("[ajax] send: "+this._lajaxMethod.toLowerCase()+"; request："+this._lajaxUrl),this.setRequestHeader("X-Request-Id",n.reqId)),this.addEventListener("readystatechange",function(){if(n.logAjaxFilter&&n.logAjaxFilter(this._lajaxUrl,this._lajaxMethod)||!n.logAjaxFilter)try{if(this.readyState===XMLHttpRequest.DONE){var t=(new Date-o)/1e3
200<=this.status&&this.status<400?n.info("request succeed"):n.info("request failed"),n.info("request cost："+t+"; URL："+this._lajaxUrl+"; request method:"+this._lajaxMethod),"post"===this._lajaxMethod.toLowerCase()&&n.info("request data: ",e[0])}}catch(t){n.error("request failed！",t),n.error("URL："+this._lajaxUrl+";request method："+this._lajaxMethod+","+this.status),"post"===this._lajaxMethod.toLowerCase()&&n.error("request data",e[0])}}),n.xhrSend.apply(this,e)}}}},{key:"_loadFromStorage",value:function(){var t=this
this._isSupportLocalStorage&&window.addEventListener("load",function(){window.localStorage.getItem("mplog")&&(t.bufferLog=JSON.parse(window.localStorage.getItem("mplog")),t._flush(),window.localStorage.removeItem("mplog"))})}},{key:"_saveUnstoreData",value:function(){var e=this
window.addEventListener("unload",function(){if(0<e.bufferLog.length)if(e._isSupportLocalStorage){var t=JSON.stringify(e.bufferLog)
window.localStorage.setItem("mplog",t)}else e._flush()})}},{key:"_flush",value:function(){var e=this
if(0===this.bufferLog.length||this.pool.length>=this.poolSize)return!1
var t=void 0
if(this.status===h.dbStatus.FAILED)return this.pool=[],this.currentRetryCount>this.maxRetryCount&&(this.bufferLog=[]),!1
if(this.status!==h.dbStatus.INITED&&this.pool.length<this.poolSize)return this.pool.push(function(){return e._flush()})
var r=this._getTransaction(h.transactionType.READ_WRITE)
if(null===r)return this._throwError(h.errorLevel.fatal,"transaction is null"),!1
var o=r.objectStore(this.DB_STORE_NAME),n=!0,a=!1,i=void 0
try{for(var s,u=this.bufferLog[Symbol.iterator]();!(n=(s=u.next()).done);n=!0){var l=s.value;(t=o.put(l)).onsuccess=function(){},t.onerror=function(t){return e._throwError(h.errorLevel.normal,"add log failed",t.target.error)},this.isDBLocked=!1}}catch(t){a=!0,i=t}finally{try{!n&&u.return&&u.return()}finally{if(a)throw i}}return this.bufferLog=[],0}},{key:"_isSupportLocalStorage",value:function(){var e=!0
if(window.localStorage)try{window.localStorage.setItem("test","123"),"123"!==window.localStorage.getItem("test")&&(e=!1)}catch(t){return e=!1,this._throwError(h.errorLevel.normal,"browser not support localStorage",t)}else e=!1
return e}},{key:"_filterFunction",value:function(t){var e={}
try{if("function"==typeof t)return t.toString()
if("object"!==(void 0===t?"undefined":o(t)))return t
for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&"function"!=typeof t[r]&&(e[r]=this._filterFunction(t[r]))
return e}catch(t){return{error:"filterFunction error"}}}}],[{key:"formatNumber",value:function(t){return(t=t.toString())[1]?t:"0"+t}},{key:"formatTime",value:function(t){var e=t.getFullYear(),r=t.getMonth()+1,o=t.getDate(),n=t.getHours(),a=t.getMinutes(),i=t.getSeconds()
return[e,r,o].map(h.formatNumber).join("-")+" "+[n,a,i].map(h.formatNumber).join(":")}},{key:"resolveUrl",value:function(t){var e=document.createElement("a")
return e.href=t,e.protocol+"//"+e.host+e.pathname+e.search+e.hash}}]),h)
function h(t){var o=this
!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,h)
var n=t
this.location=n&&n.location?n.location:window.location.href,this.autoLogError=!(!n||void 0===n.autoLogError)&&n.autoLogError,this.autoLogRejection=!(!n||void 0===n.autoLogRejection)&&n.autoLogRejection,this.autoLogAjax=!(!n||void 0===n.autoLogAjax)&&n.autoLogAjax
this.logAjaxFilter=n&&n.logAjaxFilter&&"function"===n.logAjaxFilter?n.logAjaxFilter:null,this.xhrOpen=XMLHttpRequest.prototype.open,this.xhrSend=XMLHttpRequest.prototype.send,this.maxErrorNum=n&&n.maxErrorNum?n.maxErrorNum:3,this.currentErrorNum=0,this.DB_NAME=n&&n.dbName?n.dbName:u.defaultDbName,this.DB_STORE_NAME=n&&n.dbStoreName?n.dbStoreName:u.defaultDbStoreName,this.DB_VERSION=n&&void 0!==n.dbVersion?n.dbVersion:"6",this.db=null,this.indexedDB=null,this.bufferLog=[],this.bufferSize=n&&void 0!==n.bufferSize?1*n.bufferSize:0,this.status=h.dbStatus.INITING,this.pool=[],this.poolSize=5e3,this.retryInterval=6e3,this.currentRetryCount=0,this.maxRetryCount=3,this.timer=null,this.successCount=0,this.onupgradeneeded=function(t){o.db=t.target.result
try{if(o.DB_NAME===u.defaultDbName&&o.DB_STORE_NAME===u.defaultDbStoreName)if(o.db.objectStoreNames.contains(o.DB_STORE_NAME)){if(t.oldVersion<3){var e=t.target.transaction.objectStore(o.DB_STORE_NAME)
e.createIndex("timestamp","timestamp",{unique:!1}),e.openCursor().onsuccess=function(t){var e=t.target.result
e&&(e.update({time:e.value.time,level:e.value.level,location:e.value.location,description:e.value.description,data:e.value.data,timestamp:new Date(e.value.time).getTime()}),e.continue())}}}else{var r=o.db.createObjectStore(o.DB_STORE_NAME,{autoIncrement:!0})
r.createIndex("location","location",{unique:!1}),r.createIndex("level","level",{unique:!1}),r.createIndex("description","description",{unique:!1}),r.createIndex("data","data",{unique:!1}),r.createIndex("timestamp","timestamp",{unique:!1})}n&&"function"==typeof n.onupgradeneeded&&n.onupgradeneeded(t)}catch(t){o.status=h.dbStatus.FAILED,o._throwError(h.errorLevel.fatal,"indexedDB upgrade error",t)}},this._init()}i.levelEnum={info:"info",warn:"warn",error:"error"},i.errorLevel={normal:1,serious:2,fatal:3},i.dbStatus={INITING:"initing",INITED:"inited",FAILED:"failed"},i.transactionType={READ_WRITE:"readwrite",READ_ONLY:"readonly"},r.exports=i})
define("pages/modules/utils/cgi.js",["vue-weui/src/utils/ajax.js","vue-weui/src/utils/string.js","vue-weui/src/utils/object.js","pages/modules/utils/url.js"],function(e,r,t){"use strict"
function o(e){for(var r=e||{},t=Object.keys(m),a=0;a<t.length;a++)r[t[a]]=m[t[a]]
return r}function n(e,r){var t=-1!==location.href.indexOf("/cgi-bin/home")&&(-1!==r.url.indexOf("/misc/safeassistant")||-1!==r.url.indexOf("/safe/safeuuid")),a=11
switch(e){case"timeout":a=7
break
case"error":a=8
break
case"notmodified":a=9
break
case"parsererror":a=10
break
default:a=11}for(var o=["lang","random","f","ajax","token"],n=0;n<o.length;++n){var i=o[n]
r.data&&r.data[i]&&delete r.data[i]}a+=t?100:0,u({url:"/misc/jslog?1=1",data:{content:c.format("[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}]",{uin:window.wx.commonData.data.uin,useragent:window.navigator.userAgent,page:location.href,url:r.url,param:JSON.stringify(r.data).substr(0,50),info:e}),id:a,level:"error"},type:"POST"}),u({url:"/misc/jslog?1=1",data:{content:c.format("[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}]",{uin:window.wx.commonData.data.uin,useragent:window.navigator.userAgent,page:location.href,url:r.url,param:JSON.stringify(r.data).substr(0,50),info:e}),id:6+(t?100:0),level:"error"},type:"POST"}),"timeout"===e&&Vue.prototype.$tipsErr("你的网络环境较差，请稍后重试")}function i(e,n){var i=e
return"function"!=typeof i&&(i=function(){}),e=function(e){try{var r=i.toString(),t={uin:wx.commonData.data.uin||"0",id:"64430",key:"0",url:"",location:encodeURIComponent(window.location.href)||"",ret:e&&e.base_resp&&e.base_resp.ret||"undefined"}
if(e&&e.base_resp&&0!==e.base_resp.ret&&(r.indexOf("handleRet")<0&&r.indexOf(e.base_resp.ret)<0&&((new Image).src=c.format("https://badjs.weixinbridge.com/badjs?level=4&uin={uin}&id={id}&msg={msg}&from={url}",{uin:t.uin,url:t.url||t.location,id:138,msg:encodeURIComponent("ret="+t.ret+"|idkey="+t.id+":"+t.key)})),void 0!==window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs)){var a=""
if(-1!==n.indexOf("?")){a=n.substr(0,n.indexOf("?"))
var o=l.parseQuery(n)
o.action&&(a+="?action="+o.action)}else a=n
window.WX_BJ_REPORT.BadJs.report(a,"ret="+e.base_resp.ret,{mid:window.PAGE_MID,view:"web_retcode"})}}catch(e){console.error(e)}i(e)}}var s=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]
for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},u=e("vue-weui/src/utils/ajax.js"),c=e("vue-weui/src/utils/string.js"),d=e("vue-weui/src/utils/object.js"),l=e("pages/modules/utils/url.js"),m={token:window.wx.commonData.data.t,lang:window.wx.commonData.data.lang,f:"json",ajax:"1"},p={0:"恭喜你，操作成功！","-1":"系统错误，请稍后尝试。",200002:"参数错误，请核对参数后重试。",200003:"登录超时，请重新登录。",200004:"请求页面的域名没有授权。",200005:"请求方式错误，请确认请求方式后重试。",200006:"表单名称验证出错，请核对表单名称后重试。",200007:"对不起，你没有权限访问目标请求。",200040:"登录超时，请重新登录。"},a={updateCommonPostData:function(){m={token:window.wx.commonData.data.t,lang:window.wx.commonData.data.lang,f:"json",ajax:"1"}},get:function(t,e,a,r){t.data=o(t.data),t.success=t.success||e,t.complete=t.complete||r,a=t.error||a,t.error=function(e,r){n(r,t),a&&a(e,r)},t.dataType="json",t.success=i(t.success,t.url),u(t)},post:function(t,e,a,r){t.type="POST",t.data=o(t.data),t.success=t.success||e,t.complete=t.complete||r,a=t.error||a,t.error=function(e,r){n(r,t),a&&a(e,r)},t.dataType="json",t.success=i(t.success,t.url),u(t)},handleRet:function(e,r){console.log(e,r)
var t={msg:r.msg||"系统繁忙，请稍后尝试"}
if(e&&e.base_resp&&e.base_resp.ret){r=d.clone(r,!0),(r=s({uin:wx.commonData.data.uin||"0",id:"64430",key:"0",url:"",location:encodeURIComponent(window.location.href)||"",ret:e.base_resp.ret,showMsg:!0,msg:"系统繁忙，请稍后尝试"},r)).url=encodeURIComponent(r.url)
var a=p[r.ret]
a?(r.showMsg&&Vue.prototype.$tipsErr(a),t.msg=a):((new Image).src=c.format("/mp/unknow_ret_report?uin={uin}&id={id}&key={key}&url={url}&location={location}&ret={ret}&method=get&action=report",r),r.showMsg&&Vue.prototype.$tipsErr(r.msg),(new Image).src=c.format("/mp/unknow_ret_report?uin={uin}&id=64430&key=126&url={url}&location={location}&ret={ret}&method=get&action=report",r),(new Image).src=c.format("https://badjs.weixinbridge.com/badjs?level=4&uin={uin}&id={id}&msg={msg}&from={url}",{uin:r.uin,url:r.url||r.location,id:138,msg:encodeURIComponent("ret="+r.ret+"|idkey="+r.id+":"+r.key)}))}return t}}
t.exports=a})
define("vue-weui/src/utils/ajax.js",[],function(t,e,o){"use strict"
function f(){}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t}
o.exports=function(o){var t=(o.type||"GET").toUpperCase(),e=o.url,r=void 0===o.async||o.async,n=new XMLHttpRequest
n.donotHock=!!o.donotHock
var a=null,c=null,s=f,u=f,i=f
if(o.success&&(s=function(t){try{o.success(t)}catch(t){throw t}}),o.error&&(u=function(t,e){try{o.error(t,e)}catch(t){throw t}}),o.complete&&(i=function(){try{o.complete()}catch(t){throw t}}),"object"===l(o.data)){var y=o.data
for(var p in c=[],y)Object.prototype.hasOwnProperty.call(y,p)&&c.push(p+"="+encodeURIComponent(y[p]))
c=c.join("&")}else c="string"==typeof o.data?o.data:null
"GET"===t&&c&&(e+=(0<=e.indexOf("?")?"&":"?")+c),n.open(t,e,r),n.onerror=function(){u(n,"error"),a&&clearTimeout(a),i()},n.onreadystatechange=function(){if(3===n.readyState&&o.received&&o.received(n),4===n.readyState){n.onreadystatechange=null
var t=n.status
if(200<=t&&t<400)try{var e=n.responseText
if("json"===o.dataType)try{e=JSON.parse(e)}catch(t){return void u(n,"parsererror")}s(e)}catch(t){throw t}else u(n,"error")
a&&clearTimeout(a),i(),i=f}},"POST"===t&&n.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),o.crossDomain||n.setRequestHeader("X-Requested-With","XMLHttpRequest"),void 0!==o.timeout&&(a=setTimeout(function(){n.abort("timeout"),u(n,"timeout"),i(),i=f},o.timeout))
try{n.send(c)}catch(t){u(n,"timeout")}}})
define("vue-weui/src/utils/object.js",[],function(n,t,e){"use strict"
var r="[object Array]",i="[object Object]",o=Object.prototype.toString,u=Object.prototype.hasOwnProperty
function c(n,t){for(var e in t)u.call(t,e)&&(n[e]=t[e])
return n}function l(n){return o.call(n)===i}function a(n){return o.call(n)===r}var f=null
f="function"==typeof Number.isFinite?Number.isFinite.bind(Number):"function"==typeof window.isFinite?window.isFinite:function(){return!0}
var s=null
s="function"==typeof Object.assign?Object.assign:function(){for(var n=arguments.length,t=Array(n),e=0;e<n;e++)t[e]=arguments[e]
if(null==t[0])throw new TypeError("Cannot convert undefined or null to object")
for(var r=Object(t[0]),i=1;i<t.length;i++){var o=t[i]
if(null!=o)for(var c in o)u.call(o,c)&&(r[c]=o[c])}return r},e.exports={assign:s,extend:c,clone:function n(t,e){var r=void 0
if(!0!==e)return c({},t)
if(a(t))for(var i in r=[],t)u.call(t,i)&&(l(t[i])?r.push(n(t[i],!0)):r.push(t[i]))
else for(var o in r={},t)u.call(t,o)&&(l(t[o])?r[o]=n(t[o],!0):r[o]=t[o])
return r},isObject:l,isElement:function(n){return!(!this||1!==n.nodeType)},isArray:a,isFunction:function(n){return"function"==typeof n},isString:function(n){return"[object String]"===o.call(n)},isBoolean:function(n){return"[object Boolean]"===o.call(n)},isNumber:function(n){return"[object Number]"===o.call(n)},isDate:function(n){return"[object Date]"===o.call(n)},isUndefined:function(n){return void 0===n},isRepExp:function(n){return"[object RegExp]"===o.call(n)},isFinite:f,param:function(n,t){var e=[]
for(var r in n)u.call(n,r)&&(!0===t?e.push([encodeURIComponent(r),"=",encodeURIComponent(n[r]),"&"].join("")):e.push([r,"=",n[r],"&"].join("")))
return e.join("").slice(0,-1)},each:function(n,t){if(void 0!==t)for(var e in n)if(u.call(n,e)&&!1===t(n[e],e))break},hasOwn:function(n,t){return u.call(n,t)}}})
define("pages/modules/utils/url.js",[],function(r,t,a){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.fullUrl=function(r){if(!r)return""
if(0===r.indexOf("javasript:"))return r
var t=wx.commonData.data.param
return-1!==r.indexOf("?")?r+t:r+"?1=1"+t},t.addBaseParm=function(r){if(!r)return""
if(0===r.indexOf("javasript:"))return r
var t=window.wx.commonData.data,a=r.charAt(r.length-1)
return"?"!==a&&(-1===r.indexOf("?")?r+="?":"&"!==a&&(r+="&")),r+"token="+t.t+"&lang="+t.lang},t.parseQuery=function(r){var t={},a=r.match(/[?&]([^=&#]+)=([^&#]*)/g)
if(a)for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var n=a[e].split("="),i=n[0].substr(1),u=n[1]
t[i]?t[i]=[].concat(t[i],u):t[i]=u}return t}})
define("3rd/editor/tpl/layout.tpl.js",[],function(s,i,a){return'<div>    <div id="##" class="%%">        <div class="editor-toolbarbox-placeholder"></div>                <div id="js_reprint_article_tips" class="page_msg mini with_closed" style="display: none;">          <div class="inner">            <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>            <div class="msg_content">              <p class="js_content">当前为开放转载文章，不支持修改</p>            </div>            <span class="msg_closed js_msg_close">关闭</span>          </div>        </div>                <div id="##_toolbarbox" class="%%-toolbarbox show-edui-more js_readonly">            {if length}            <div class="%%-toolbarboxouter-placeholder"></div>            <div id="##_toolbarboxouter" class="%%-toolbarboxouter">                <div class="%%-toolbarboxinner">{=toolbarBoxHtml}</div>                            </div>            <div id="##_toolbar_mask" class="edui_toolbar_mask"></div>            {/if}            <div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;">                <div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">{clickToUpload}</div>                <div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div>                <div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div>                <div style="height:0;overflow:hidden;clear:both;"></div>            </div>            <div class="mpeditor_global_tips">                                <span id="js_autosave" class="weui-desktop-tips weui-desktop-tips_icon-after" style="display:none;">                    自动保存<i class="icon_appmsg_edit_save"></i>                </span>            </div>        </div>                                                <div class="page_msg mini with_closed js_title_error js_error_msg" style="display:none;">            <div class="inner">                <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>                <div class="msg_content">                    <p class="js_msg_content">                    标题不能为空且长度不能超过64字                    </p>                </div>            </div>            <span class="msg_closed js_msg_close">关闭</span>        </div>                <div class="page_msg mini with_closed js_author_error" style="display:none;">            <div class="inner">                <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>                <div class="msg_content">                    <p class="js_msg_content">作者不能超过8个字</p>                </div>            </div>            <span class="msg_closed js_msg_close">关闭</span>        </div>                <div id="js_title_main" class="js_title_main appmsg_edit_item title frm_input_box">            <label for="title" class="tips_global placeholder_tips" style="display:none">请在这里输入标题</label>            <input id="title" type="text" placeholder="请在这里输入标题" class="frm_input js_title js_counter js_field" name="title" max-length="64">            <span class="js_edit_tips weui-desktop-tips card_media_edit_tips" style="display:none;">              <i class="icon-svg-common-ask"></i>            </span>        </div>                        <div id="js_video_ori_display" style="display: none;" class="video_ori_source">            <span id="js_video_ori_info">原创</span>            <span id="js_video_ori_username"></span>        </div>                <div id="js_author_area" class="js_author_container js_reprint_hide appmsg_edit_item author frm_input_box author_select_pop_wrp">            <i class="appmsg_origianl_tag">原创：</i>            <label for="author" class="tips_global placeholder_tips" style="display:none">请输入作者</label>                        <input id="author" type="text" placeholder="请输入作者" class="frm_input js_author js_counter js_field" name="author" max-length="8" autocomplete="off">            <div class="js_author_list author-list"></div>                        <input type="hidden" class="js_field js_writerid" name="writerid" value="">            <input type="hidden" class="js_field js_can_reward" name="can_reward" value="0" data-type="checkbox">            <input type="hidden" class="js_field js_can_open_reward" name="can_open_reward" value="0" data-type="checkbox">            <input type="hidden" class="js_field js_author_username" name="author_username" value="">        </div>                <div id="guide_words_main" class="appmsg_edit_origin_recommended"></div>                <div class="js_editor_area editor_area">            <div class="split_line"></div>                        <div class="page_msg mini with_closed js_catch_tips" style="display:none;">                <div class="inner">                    <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>                    <div class="msg_content">                        <p>                            <span class="msg_content_inner js_msg_content"></span>                        </p>                    </div>                </div>                <p class="msg_right_btns">                    <i class="icon_msg_mini load js_msg_loading" style="display: none;"></i>                    <span class="js_msg_retry" style="display: ndone;">重试</span>                    <span class="js_msg_next">查看</span>                </p>                <span class="msg_closed js_msg_close">关闭</span>            </div>            <div class="page_msg mini with_closed js_content_error js_error_msg" style="display:none;">                <div class="inner">                    <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>                    <div class="msg_content">                        <p class="js_msg_content">正文不能为空</p>                    </div>                </div>                <span class="msg_closed js_msg_close">关闭</span>            </div>            <div class="page_msg mini with_closed js_warn" style="display:none;">                <div class="inner">                    <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>                    <div class="msg_content">                        <p class="profile_link_msg_global">请勿在图文外链中添加其他公众号的主页链接</p>                    </div>                </div>                <span class="msg_closed js_msg_close">关闭</span>            </div>                        <div id="js_reprint_source" style="display: none;" class="original_area_primary">                            <div class="original_primary_tips">                <div class="original_primary_tips_input_wrp">                  <div class="original_primary_tips_input_placeholder tips_global" style="display: none;">编者荐语：</div>                  <input type="text" placeholder="编者荐语：" class="original_primary_tips_input js_reprint_recommend_title" name="reprint_recommend_title">                  <span class="weui-desktop-form__input-append-in">                    <em class="weui-desktop-form__counter"><span class="js_reprint_recommend_title_len">0</span>/10</em>                  </span>                </div>                <div class="original_primary_tips_input_wrp">                  <div class="original_primary_tips_input_placeholder tips_global" style="display: none;">说说你推荐文章的理由</div>                  <div class="original_primary_tips_input js_reprint_recommend_content" contenteditable="true"></div>                  <div class="weui-desktop-form__input-append-in original_primary_tips_counter">                    <em class="weui-desktop-form__counter"><span class="weui-desktop-formm__counter__inner js_reprint_recommend_content_len">0</span>/120</em>                  </div>                </div>              </div>                            <p class="original_primary_info weui-desktop-tips">                <span>文章来源于<span class="js_reprint_biz_nickname"></span>，作者<span class="js_reprint_author"></span></span>              </p>              <div class="original_primary_card">                <div class="weui-desktop-vm_default">                  <img class="original_primary_avatar js_reprint_biz_avatar">                </div>                <div class="weui-desktop-vm_primary">                  <strong class="original_primary_nickname js_reprint_biz_nickname"></strong>                  <p class="original_primary_desc js_reprint_biz_profile_description">公众号描述</p>                </div>              </div>            </div>                        <div id="##_iframeholder" class="%%-iframeholder">                <div id="##_contentplaceholder" class="editor_content_placeholder" style="display:none">从这里开始写正文</div>            </div>            <div class="edui_iframe_switch_tips js_unfold_editor mini_tips weak_text icon_before" style="display:none;"><i class="icon_appmsg_edit_folder"></i>展开正文</div>        </div>                <div id="##_bottombar" class="%%-bottomContainer" style="display:none;">            <table>                <tr>                    <td id="##_elementpath" class="%%-bottombar"></td>                    <td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td>                </tr>            </table>        </div>        <div id="##_scalelayer" style="display:none;"></div>    </div></div>'})
"use strict"
define("3rd/editor/plugin/filter.js",[],function(e,t,r){return{formatRedundancyStr:function(e){for(var t=["noscript","iframe"],r=0;r<t.length;r++){var a="(<#targetName#\\s*[^<>]*?>)[^<\\/]+?<\\/#targetName#>".replace(/#targetName#/g,t[r]),n="$1</#targetName#>".replace(/#targetName#/g,t[r]),i=new RegExp(a,"g")
e=e.replace(i,n)}return e},formatStyle:function(e){var t=new RegExp("(<[^<>]*?)\\sstyle=(?:(?:\"([^\"]*?)\")|(?:'([^']*?)')|([^'\"\\s=<>]*?))([\\s\\/>])","g")
return e=e.replace(t,function(e,t,r,a,n,i){if(l=r||a||n||""){for(var l,s=[],f=0,c=(l=l.split(";")).length;f<c;f++){var g=l[f].replace(/^\s+/,"").replace(/\s+$/,"").replace(/"/g,"&quot;")
g&&s.push(g)}return t+' style="'+s.join(";")+';"'+i||""}return e})},filterStyleAttr:function(e,t){if(t){var r=(e=$(e)).attr("style")
if(r){"[object String]"==Object.prototype.toString.call(t)&&(t=[t])
for(var a=0,n=t.length;a<n;a++){var i=new RegExp("(^|;|\\b)[^;]*#attr#\\s*:[^;]*[$;]".replace("#attr#",t[a]),"g")
r=r.replace(i,"$1")}e.attr("style",r)}}},formatClass:function(e,t){var v=e.whiteList,h=e.whiteListReg,m=e.blackList
if(!v&&!h&&!m)return t
var r=new RegExp("(<[^<>]*?)\\sclass=(?:(?:\"([^\"]*?)\")|(?:'([^']*?)')|([^'\"\\s=<>]*?))([\\s\\/>])","g")
return t.replace(r,function(e,t,r,a,n,i){for(var l=(r||a||n||"").split(" "),s=[],f="",c=0,g=l.length;c<g;c++)if(f=l[c]){if(m&&~m.indexOf(f))continue
if(v&&~v.indexOf(f))s.push(f)
else if(h&&0<h.length)for(var o=0,u=h.length;o<u;o++)if(h[o].test(f)){s.push(f)
break}}var p=s.join(" ").trim()
return p?t+' class="'+p+'"'+i||"":t+i||""})},removeAttribute:function(e,t){for(var r="(<#tagName#[^<>]*?)\\s#attribute#=(?:(?:\"([^\"]*?)\")|(?:'([^']*?)')|([^'\"\\s=<>]*?))([\\s\\/>])",a=0,n=t.length;a<n;a++){var i=t[a],l=i[0],s=i[1],f=""
f=r.replace("#tagName#","*"===l?"":l)
for(var c=new RegExp(f.replace("#attribute#",s),"g");c.test(e);)e=e.replace(c,"$1$5")}return e},filterClass:function(e,i){if(!i||!e)return e
for(var t=i.split(" "),r="",a=0,n=t.length;a<n;a++)r&&(r+="|"),r+="(?:"+t[a]+")"
var l=new RegExp('(<[^<>]*?)\\sclass=((?:"[^"]*'+r+"[^\"]*\")|(?:'[^']*"+r+"[^']*'))","g")
return e.replace(l,function(){for(var e=arguments[2].replace(/['"]/g,"").split(" "),t=[],r=0,a=e.length;r<a;r++){var n=e[r]
n&&-1===(" "+i+" ").indexOf(" "+n+" ")&&t.push(n)}return arguments[1]+' class="'+t.join(" ")+'"'})}}})
