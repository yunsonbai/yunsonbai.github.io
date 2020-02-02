define("biz_common/jquery.ui/jquery.ui.draggable.js",[],function(){
!function(t,e){
function i(e,i){
var o,n,r,a=e.nodeName.toLowerCase();
return"area"===a?(o=e.parentNode,n=o.name,e.href&&n&&"map"===o.nodeName.toLowerCase()?(r=t("img[usemap=#"+n+"]")[0],
!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(a)?!e.disabled:"a"===a?e.href||i:i)&&s(e);
}
function s(e){
return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){
return"hidden"===t.css(this,"visibility");
}).length;
}
var o=0,n=/^ui-id-\d+$/;
t.ui=t.ui||{},t.extend(t.ui,{
version:"1.10.3"
}),t.fn.extend({
focus:function(e){
return function(i,s){
return"number"==typeof i?this.each(function(){
var e=this;
setTimeout(function(){
t(e).focus(),s&&s.call(e);
},i);
}):e.apply(this,arguments);
};
}(t.fn.focus),
scrollParent:function(){
var e;
return e=t.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){
return/(relative|absolute|fixed)/.test(t.css(this,"position"))&&/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"));
}).eq(0):this.parents().filter(function(){
return/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"));
}).eq(0),/fixed/.test(this.css("position"))||!e.length?t(document):e;
},
zIndex:function(i){
if(i!==e)return this.css("zIndex",i);
if(this.length)for(var s,o,n=t(this[0]);n.length&&n[0]!==document;){
if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(o=parseInt(n.css("zIndex"),10),
!isNaN(o)&&0!==o))return o;
n=n.parent();
}
return 0;
},
uniqueId:function(){
return this.each(function(){
this.id||(this.id="ui-id-"+ ++o);
});
},
removeUniqueId:function(){
return this.each(function(){
n.test(this.id)&&t(this).removeAttr("id");
});
}
}),t.extend(t.expr[":"],{
data:t.expr.createPseudo?t.expr.createPseudo(function(e){
return function(i){
return!!t.data(i,e);
};
}):function(e,i,s){
return!!t.data(e,s[3]);
},
focusable:function(e){
return i(e,!isNaN(t.attr(e,"tabindex")));
},
tabbable:function(e){
var s=t.attr(e,"tabindex"),o=isNaN(s);
return(o||s>=0)&&i(e,!o);
}
}),t.extend(t.ui,{
plugin:{
add:function(e,i,s){
var o,n=t.ui[e].prototype;
for(o in s)n.plugins[o]=n.plugins[o]||[],n.plugins[o].push([i,s[o]]);
},
call:function(t,e,i){
var s,o=t.plugins[e];
if(o&&t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType)for(s=0;s<o.length;s++)t.options[o[s][0]]&&o[s][1].apply(t.element,i);
}
},
hasScroll:function(e,i){
if("hidden"===t(e).css("overflow"))return!1;
var s=i&&"left"===i?"scrollLeft":"scrollTop",o=!1;
return e[s]>0?!0:(e[s]=1,o=e[s]>0,e[s]=0,o);
}
});
}(jQuery),function(t,e){
var i=0,s=Array.prototype.slice,o=t.cleanData;
t.cleanData=function(e){
for(var i,s=0;null!=(i=e[s]);s++)try{
t(i).triggerHandler("remove");
}catch(n){}
o(e);
},t.widget=function(e,i,s){
var o,n,r,a,l={},h=e.split(".")[0];
e=e.split(".")[1],o=h+"-"+e,s||(s=i,i=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){
return!!t.data(e,o);
},t[h]=t[h]||{},n=t[h][e],r=t[h][e]=function(t,e){
return this._createWidget?void(arguments.length&&this._createWidget(t,e)):new r(t,e);
},t.extend(r,n,{
version:s.version,
_proto:t.extend({},s),
_childConstructors:[]
}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){
return t.isFunction(s)?void(l[e]=function(){
var t=function(){
return i.prototype[e].apply(this,arguments);
},o=function(t){
return i.prototype[e].apply(this,t);
};
return function(){
var e,i=this._super,n=this._superApply;
return this._super=t,this._superApply=o,e=s.apply(this,arguments),this._super=i,
this._superApply=n,e;
};
}()):void(l[e]=s);
}),r.prototype=t.widget.extend(a,{
widgetEventPrefix:n?a.widgetEventPrefix:e
},l,{
constructor:r,
namespace:h,
widgetName:e,
widgetFullName:o
}),n?(t.each(n._childConstructors,function(e,i){
var s=i.prototype;
t.widget(s.namespace+"."+s.widgetName,r,i._proto);
}),delete n._childConstructors):i._childConstructors.push(r),t.widget.bridge(e,r);
},t.widget.extend=function(i){
for(var o,n,r=s.call(arguments,1),a=0,l=r.length;l>a;a++)for(o in r[a])n=r[a][o],
r[a].hasOwnProperty(o)&&n!==e&&(i[o]=t.isPlainObject(n)?t.isPlainObject(i[o])?t.widget.extend({},i[o],n):t.widget.extend({},n):n);
return i;
},t.widget.bridge=function(i,o){
var n=o.prototype.widgetFullName||i;
t.fn[i]=function(r){
var a="string"==typeof r,l=s.call(arguments,1),h=this;
return r=!a&&l.length?t.widget.extend.apply(null,[r].concat(l)):r,this.each(a?function(){
var s,o=t.data(this,n);
return o?t.isFunction(o[r])&&"_"!==r.charAt(0)?(s=o[r].apply(o,l),s!==o&&s!==e?(h=s&&s.jquery?h.pushStack(s.get()):s,
!1):void 0):t.error("no such method '"+r+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; attempted to call method '"+r+"'");
}:function(){
var e=t.data(this,n);
e?e.option(r||{})._init():t.data(this,n,new o(r,this));
}),h;
};
},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={
widgetName:"widget",
widgetEventPrefix:"",
defaultElement:"<div>",
options:{
disabled:!1,
create:null
},
_createWidget:function(e,s){
s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,
this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),
this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),
this._on(!0,this.element,{
remove:function(t){
t.target===s&&this.destroy();
}
}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),
this._create(),this._trigger("create",null,this._getCreateEventData()),this._init();
},
_getCreateOptions:t.noop,
_getCreateEventData:t.noop,
_create:t.noop,
_init:t.noop,
destroy:function(){
this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),
this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),
this.focusable.removeClass("ui-state-focus");
},
_destroy:t.noop,
widget:function(){
return this.element;
},
option:function(i,s){
var o,n,r,a=i;
if(0===arguments.length)return t.widget.extend({},this.options);
if("string"==typeof i)if(a={},o=i.split("."),i=o.shift(),o.length){
for(n=a[i]=t.widget.extend({},this.options[i]),r=0;r<o.length-1;r++)n[o[r]]=n[o[r]]||{},
n=n[o[r]];
if(i=o.pop(),s===e)return n[i]===e?null:n[i];
n[i]=s;
}else{
if(s===e)return this.options[i]===e?null:this.options[i];
a[i]=s;
}
return this._setOptions(a),this;
},
_setOptions:function(t){
var e;
for(e in t)this._setOption(e,t[e]);
return this;
},
_setOption:function(t,e){
return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),
this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),
this;
},
enable:function(){
return this._setOption("disabled",!1);
},
disable:function(){
return this._setOption("disabled",!0);
},
_on:function(e,i,s){
var o,n=this;
"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=o=t(i),this.bindings=this.bindings.add(i)):(s=i,
i=this.element,o=this.widget()),t.each(s,function(s,r){
function a(){
return e||n.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?n[r]:r).apply(n,arguments):void 0;
}
"string"!=typeof r&&(a.guid=r.guid=r.guid||a.guid||t.guid++);
var l=s.match(/^(\w+)\s*(.*)$/),h=l[1]+n.eventNamespace,c=l[2];
c?o.delegate(c,h,a):i.bind(h,a);
});
},
_off:function(t,e){
e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e);
},
_delay:function(t,e){
function i(){
return("string"==typeof t?s[t]:t).apply(s,arguments);
}
var s=this;
return setTimeout(i,e||0);
},
_hoverable:function(e){
this.hoverable=this.hoverable.add(e),this._on(e,{
mouseenter:function(e){
t(e.currentTarget).addClass("ui-state-hover");
},
mouseleave:function(e){
t(e.currentTarget).removeClass("ui-state-hover");
}
});
},
_focusable:function(e){
this.focusable=this.focusable.add(e),this._on(e,{
focusin:function(e){
t(e.currentTarget).addClass("ui-state-focus");
},
focusout:function(e){
t(e.currentTarget).removeClass("ui-state-focus");
}
});
},
_trigger:function(e,i,s){
var o,n,r=this.options[e];
if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),
i.target=this.element[0],n=i.originalEvent)for(o in n)o in i||(i[o]=n[o]);
return this.element.trigger(i,s),!(t.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented());
}
},t.each({
show:"fadeIn",
hide:"fadeOut"
},function(e,i){
t.Widget.prototype["_"+e]=function(s,o,n){
"string"==typeof o&&(o={
effect:o
});
var r,a=o?o===!0||"number"==typeof o?i:o.effect||i:e;
o=o||{},"number"==typeof o&&(o={
duration:o
}),r=!t.isEmptyObject(o),o.complete=n,o.delay&&s.delay(o.delay),r&&t.effects&&t.effects.effect[a]?s[e](o):a!==e&&s[a]?s[a](o.duration,o.easing,n):s.queue(function(i){
t(this)[e](),n&&n.call(s[0]),i();
});
};
});
}(jQuery),function(t){
var e=!1;
t(document).mouseup(function(){
e=!1;
}),t.widget("ui.mouse",{
version:"1.10.3",
options:{
cancel:"input,textarea,button,select,option",
distance:1,
delay:0
},
_mouseInit:function(){
var e=this;
this.element.bind("mousedown."+this.widgetName,function(t){
return e._mouseDown(t);
}).bind("click."+this.widgetName,function(i){
return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),
i.stopImmediatePropagation(),!1):void 0;
}),this.started=!1;
},
_mouseDestroy:function(){
this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
},
_mouseDown:function(i){
if(!e){
this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;
var s=this,o=1===i.which,n="string"==typeof this.options.cancel&&i.target.nodeName?t(i.target).closest(this.options.cancel).length:!1;
return o&&!n&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){
s.mouseDelayMet=!0;
},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,
!this._mouseStarted)?(i.preventDefault(),!0):(!0===t.data(i.target,this.widgetName+".preventClickEvent")&&t.removeData(i.target,this.widgetName+".preventClickEvent"),
this._mouseMoveDelegate=function(t){
return s._mouseMove(t);
},this._mouseUpDelegate=function(t){
return s._mouseUp(t);
},t(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),
i.preventDefault(),e=!0,!0)):!0;
}
},
_mouseMove:function(e){
return t.ui.ie&&(!document.documentMode||document.documentMode<9)&&!e.button?this._mouseUp(e):this._mouseStarted?(this._mouseDrag(e),
e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,
this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted);
},
_mouseUp:function(e){
return t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),
this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),
this._mouseStop(e)),!1;
},
_mouseDistanceMet:function(t){
return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance;
},
_mouseDelayMet:function(){
return this.mouseDelayMet;
},
_mouseStart:function(){},
_mouseDrag:function(){},
_mouseStop:function(){},
_mouseCapture:function(){
return!0;
}
});
}(jQuery),function(t){
t.widget("ui.draggable",t.ui.mouse,{
version:"1.10.3",
widgetEventPrefix:"drag",
options:{
addClasses:!0,
appendTo:"parent",
axis:!1,
connectToSortable:!1,
containment:!1,
cursor:"auto",
cursorAt:!1,
grid:!1,
handle:!1,
helper:"original",
iframeFix:!1,
opacity:!1,
refreshPositions:!1,
revert:!1,
revertDuration:500,
scope:"default",
scroll:!0,
scrollSensitivity:20,
scrollSpeed:20,
snap:!1,
snapMode:"both",
snapTolerance:20,
stack:!1,
zIndex:!1,
drag:null,
start:null,
stop:null
},
_create:function(){
"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),
this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),
this._mouseInit();
},
_destroy:function(){
this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
this._mouseDestroy();
},
_mouseCapture:function(e){
var i=this.options;
return this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),
this.handle?(t(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){
t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
width:this.offsetWidth+"px",
height:this.offsetHeight+"px",
position:"absolute",
opacity:"0.001",
zIndex:1e3
}).css(t(this).offset()).appendTo("body");
}),!0):!1);
},
_mouseStart:function(e){
var i=this.options;
return this.helper=this._createHelper(e),this.helper.addClass("ui-draggable-dragging"),
this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),
this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),
this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),
this.offset=this.positionAbs=this.element.offset(),this.offset={
top:this.offset.top-this.margins.top,
left:this.offset.left-this.margins.left
},this.offset.scroll=!1,t.extend(this.offset,{
click:{
left:e.pageX-this.offset.left,
top:e.pageY-this.offset.top
},
parent:this._getParentOffset(),
relative:this._getRelativeOffset()
}),this.originalPosition=this.position=this._generatePosition(e),this.originalPageX=e.pageX,
this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),
this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),
t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),
t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0);
},
_mouseDrag:function(e,i){
if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),
this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),
!i){
var s=this._uiHash();
if(this._trigger("drag",e,s)===!1)return this._mouseUp({}),!1;
this.position=s.position;
}
return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),
this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),
t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1;
},
_mouseStop:function(e){
var i=this,s=!1;
return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),
this.dropped&&(s=this.dropped,this.dropped=!1),"original"!==this.options.helper||t.contains(this.element[0].ownerDocument,this.element[0])?("invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){
i._trigger("stop",e)!==!1&&i._clear();
}):this._trigger("stop",e)!==!1&&this._clear(),!1):!1;
},
_mouseUp:function(e){
return t("div.ui-draggable-iframeFix").each(function(){
this.parentNode.removeChild(this);
}),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),t.ui.mouse.prototype._mouseUp.call(this,e);
},
cancel:function(){
return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),
this;
},
_getHandle:function(e){
return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0;
},
_createHelper:function(e){
var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;
return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),
s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),
s;
},
_adjustOffsetFromHelper:function(e){
"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={
left:+e[0],
top:+e[1]||0
}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),
"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top);
},
_getParentOffset:function(){
var e=this.offsetParent.offset();
return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),
e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={
top:0,
left:0
}),{
top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),
left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)
};
},
_getRelativeOffset:function(){
if("relative"===this.cssPosition){
var t=this.element.position();
return{
top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),
left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()
};
}
return{
top:0,
left:0
};
},
_cacheMargins:function(){
this.margins={
left:parseInt(this.element.css("marginLeft"),10)||0,
top:parseInt(this.element.css("marginTop"),10)||0,
right:parseInt(this.element.css("marginRight"),10)||0,
bottom:parseInt(this.element.css("marginBottom"),10)||0
};
},
_cacheHelperProportions:function(){
this.helperProportions={
width:this.helper.outerWidth(),
height:this.helper.outerHeight()
};
},
_setContainment:function(){
var e,i,s,o=this.options;
return o.containment?"window"===o.containment?void(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):"document"===o.containment?void(this.containment=[0,0,t(document).width()-this.helperProportions.width-this.margins.left,(t(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):o.containment.constructor===Array?void(this.containment=o.containment):("parent"===o.containment&&(o.containment=this.helper[0].parentNode),
i=t(o.containment),s=i[0],void(s&&(e="hidden"!==i.css("overflow"),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],
this.relative_container=i))):void(this.containment=null);
},
_convertPositionTo:function(e,i){
i||(i=this.position);
var s="absolute"===e?1:-1,o="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;
return this.offset.scroll||(this.offset.scroll={
top:o.scrollTop(),
left:o.scrollLeft()
}),{
top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*s,
left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*s
};
},
_generatePosition:function(e){
var i,s,o,n,r=this.options,a="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=e.pageX,h=e.pageY;
return this.offset.scroll||(this.offset.scroll={
top:a.scrollTop(),
left:a.scrollLeft()
}),this.originalPosition&&(this.containment&&(this.relative_container?(s=this.relative_container.offset(),
i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,
e.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),
e.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),
r.grid&&(o=r.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/r.grid[1])*r.grid[1]:this.originalPageY,
h=i?o-this.offset.click.top>=i[1]||o-this.offset.click.top>i[3]?o:o-this.offset.click.top>=i[1]?o-r.grid[1]:o+r.grid[1]:o,
n=r.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/r.grid[0])*r.grid[0]:this.originalPageX,
l=i?n-this.offset.click.left>=i[0]||n-this.offset.click.left>i[2]?n:n-this.offset.click.left>=i[0]?n-r.grid[0]:n+r.grid[0]:n)),
{
top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),
left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)
};
},
_clear:function(){
this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),
this.helper=null,this.cancelHelperRemoval=!1;
},
_trigger:function(e,i,s){
return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s]),"drag"===e&&(this.positionAbs=this._convertPositionTo("absolute")),
t.Widget.prototype._trigger.call(this,e,i,s);
},
plugins:{},
_uiHash:function(){
return{
helper:this.helper,
position:this.position,
originalPosition:this.originalPosition,
offset:this.positionAbs
};
}
}),t.ui.plugin.add("draggable","connectToSortable",{
start:function(e,i){
var s=t(this).data("ui-draggable"),o=s.options,n=t.extend({},i,{
item:s.element
});
s.sortables=[],t(o.connectToSortable).each(function(){
var i=t.data(this,"ui-sortable");
i&&!i.options.disabled&&(s.sortables.push({
instance:i,
shouldRevert:i.options.revert
}),i.refreshPositions(),i._trigger("activate",e,n));
});
},
stop:function(e,i){
var s=t(this).data("ui-draggable"),o=t.extend({},i,{
item:s.element
});
t.each(s.sortables,function(){
this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,
this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(e),
this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({
top:"auto",
left:"auto"
})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",e,o));
});
},
drag:function(e,i){
var s=t(this).data("ui-draggable"),o=this;
t.each(s.sortables,function(){
var n=!1,r=this;
this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,
this.instance.offset.click=s.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(n=!0,
t.each(s.sortables,function(){
return this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,
this.instance.offset.click=s.offset.click,this!==r&&this.instance._intersectsWith(this.instance.containerCache)&&t.contains(r.instance.element[0],this.instance.element[0])&&(n=!1),
n;
})),n?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=t(o).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),
this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){
return i.helper[0];
},e.target=this.instance.currentItem[0],this.instance._mouseCapture(e,!0),this.instance._mouseStart(e,!0,!0),
this.instance.offset.click.top=s.offset.click.top,this.instance.offset.click.left=s.offset.click.left,
this.instance.offset.parent.left-=s.offset.parent.left-this.instance.offset.parent.left,
this.instance.offset.parent.top-=s.offset.parent.top-this.instance.offset.parent.top,
s._trigger("toSortable",e),s.dropped=this.instance.element,s.currentItem=s.element,
this.instance.fromOutside=s),this.instance.currentItem&&this.instance._mouseDrag(e)):this.instance.isOver&&(this.instance.isOver=0,
this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",e,this.instance._uiHash(this.instance)),
this.instance._mouseStop(e,!0),this.instance.options.helper=this.instance.options._helper,
this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),
s._trigger("fromSortable",e),s.dropped=!1);
});
}
}),t.ui.plugin.add("draggable","cursor",{
start:function(){
var e=t("body"),i=t(this).data("ui-draggable").options;
e.css("cursor")&&(i._cursor=e.css("cursor")),e.css("cursor",i.cursor);
},
stop:function(){
var e=t(this).data("ui-draggable").options;
e._cursor&&t("body").css("cursor",e._cursor);
}
}),t.ui.plugin.add("draggable","opacity",{
start:function(e,i){
var s=t(i.helper),o=t(this).data("ui-draggable").options;
s.css("opacity")&&(o._opacity=s.css("opacity")),s.css("opacity",o.opacity);
},
stop:function(e,i){
var s=t(this).data("ui-draggable").options;
s._opacity&&t(i.helper).css("opacity",s._opacity);
}
}),t.ui.plugin.add("draggable","scroll",{
start:function(){
var e=t(this).data("ui-draggable");
e.scrollParent[0]!==document&&"HTML"!==e.scrollParent[0].tagName&&(e.overflowOffset=e.scrollParent.offset());
},
drag:function(e){
var i=t(this).data("ui-draggable"),s=i.options,o=!1;
i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-e.pageY<s.scrollSensitivity?i.scrollParent[0].scrollTop=o=i.scrollParent[0].scrollTop+s.scrollSpeed:e.pageY-i.overflowOffset.top<s.scrollSensitivity&&(i.scrollParent[0].scrollTop=o=i.scrollParent[0].scrollTop-s.scrollSpeed)),
s.axis&&"y"===s.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-e.pageX<s.scrollSensitivity?i.scrollParent[0].scrollLeft=o=i.scrollParent[0].scrollLeft+s.scrollSpeed:e.pageX-i.overflowOffset.left<s.scrollSensitivity&&(i.scrollParent[0].scrollLeft=o=i.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(e.pageY-t(document).scrollTop()<s.scrollSensitivity?o=t(document).scrollTop(t(document).scrollTop()-s.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<s.scrollSensitivity&&(o=t(document).scrollTop(t(document).scrollTop()+s.scrollSpeed))),
s.axis&&"y"===s.axis||(e.pageX-t(document).scrollLeft()<s.scrollSensitivity?o=t(document).scrollLeft(t(document).scrollLeft()-s.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<s.scrollSensitivity&&(o=t(document).scrollLeft(t(document).scrollLeft()+s.scrollSpeed)))),
o!==!1&&t.ui.ddmanager&&!s.dropBehaviour&&t.ui.ddmanager.prepareOffsets(i,e);
}
}),t.ui.plugin.add("draggable","snap",{
start:function(){
var e=t(this).data("ui-draggable"),i=e.options;
e.snapElements=[],t(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){
var i=t(this),s=i.offset();
this!==e.element[0]&&e.snapElements.push({
item:this,
width:i.outerWidth(),
height:i.outerHeight(),
top:s.top,
left:s.left
});
});
},
drag:function(e,i){
var s,o,n,r,a,l,h,c,p,u,f=t(this).data("ui-draggable"),d=f.options,g=d.snapTolerance,m=i.offset.left,v=m+f.helperProportions.width,_=i.offset.top,b=_+f.helperProportions.height;
for(p=f.snapElements.length-1;p>=0;p--)a=f.snapElements[p].left,l=a+f.snapElements[p].width,
h=f.snapElements[p].top,c=h+f.snapElements[p].height,a-g>v||m>l+g||h-g>b||_>c+g||!t.contains(f.snapElements[p].item.ownerDocument,f.snapElements[p].item)?(f.snapElements[p].snapping&&f.options.snap.release&&f.options.snap.release.call(f.element,e,t.extend(f._uiHash(),{
snapItem:f.snapElements[p].item
})),f.snapElements[p].snapping=!1):("inner"!==d.snapMode&&(s=Math.abs(h-b)<=g,o=Math.abs(c-_)<=g,
n=Math.abs(a-v)<=g,r=Math.abs(l-m)<=g,s&&(i.position.top=f._convertPositionTo("relative",{
top:h-f.helperProportions.height,
left:0
}).top-f.margins.top),o&&(i.position.top=f._convertPositionTo("relative",{
top:c,
left:0
}).top-f.margins.top),n&&(i.position.left=f._convertPositionTo("relative",{
top:0,
left:a-f.helperProportions.width
}).left-f.margins.left),r&&(i.position.left=f._convertPositionTo("relative",{
top:0,
left:l
}).left-f.margins.left)),u=s||o||n||r,"outer"!==d.snapMode&&(s=Math.abs(h-_)<=g,
o=Math.abs(c-b)<=g,n=Math.abs(a-m)<=g,r=Math.abs(l-v)<=g,s&&(i.position.top=f._convertPositionTo("relative",{
top:h,
left:0
}).top-f.margins.top),o&&(i.position.top=f._convertPositionTo("relative",{
top:c-f.helperProportions.height,
left:0
}).top-f.margins.top),n&&(i.position.left=f._convertPositionTo("relative",{
top:0,
left:a
}).left-f.margins.left),r&&(i.position.left=f._convertPositionTo("relative",{
top:0,
left:l-f.helperProportions.width
}).left-f.margins.left)),!f.snapElements[p].snapping&&(s||o||n||r||u)&&f.options.snap.snap&&f.options.snap.snap.call(f.element,e,t.extend(f._uiHash(),{
snapItem:f.snapElements[p].item
})),f.snapElements[p].snapping=s||o||n||r||u);
}
}),t.ui.plugin.add("draggable","stack",{
start:function(){
var e,i=this.data("ui-draggable").options,s=t.makeArray(t(i.stack)).sort(function(e,i){
return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0);
});
s.length&&(e=parseInt(t(s[0]).css("zIndex"),10)||0,t(s).each(function(i){
t(this).css("zIndex",e+i);
}),this.css("zIndex",e+s.length));
}
}),t.ui.plugin.add("draggable","zIndex",{
start:function(e,i){
var s=t(i.helper),o=t(this).data("ui-draggable").options;
s.css("zIndex")&&(o._zIndex=s.css("zIndex")),s.css("zIndex",o.zIndex);
},
stop:function(e,i){
var s=t(this).data("ui-draggable").options;
s._zIndex&&t(i.helper).css("zIndex",s._zIndex);
}
});
}(jQuery);
});define("tpl/preview.html.js",[],function(){
return'<div class="mask preview_mask"></div>\n<div class="img_preview_container" id="preview_container">\n    <div class="img_preview_inner" id="img_container">\n        <img src="/mpres/htmledition/images/icon/common/icon32_loading_dark.gif" id="loading_dom">\n        <span class="img_preview_wrp" style="display:none;" id="img_dom">\n            <img src="{imgsrc}">\n            <!--#0001#-->\n            <a href="javascript:;" class="img_preview_close" id="closebtn" title="关闭"><i class="icon_img_preview_close">关闭</i></a>\n            <!--%0001%-->\n        </span>\n        <span class="vm_box"></span>\n    </div>\n    <span class="vm_box"></span>\n    {if !prev}\n    <div class="img_preview_opr_container prev_disabled" id="img_opr_container">\n    {else if !next}\n    <div class="img_preview_opr_container next_disabled" id="img_opr_container">\n    {else}\n    <div class="img_preview_opr_container" id="img_opr_container">\n    {/if}\n        <ul class="img_preview_opr_list">\n            <li class="img_preview_opr_item"><a href="javascript:;" id="btnview" title="查看原图"><i class="icon_img_preview origin">查看原图</i>&nbsp;</a></li>\n            {if view}<li class="img_preview_opr_item"><a href="javascript:;" id="btnprev" title="查看上一个"><i class="icon_img_preview prev">上一个</i>&nbsp;</a></li>{/if}\n            {if view}<li class="img_preview_opr_item"><a href="javascript:;" id="btnnext" title="查看下一个"><i class="icon_img_preview next">下一个</i>&nbsp;</a></li>{/if}\n            {if downsrc}<li class="img_preview_opr_item"><a href="{downsrc}" id="btndown" title="下载图片"><i class="icon_img_preview download">下载图片</i>&nbsp;</a></li>{/if}\n        </ul>\n    </div>\n</div>\n';
});define("tpl/tooltips.html.js",[],function(){
return'<div class="popover {parentClass}" style="display:none;position:{container_mode};{if offset.left}left:{offset.left}px;top:{offset.top}px;{/if}">\n    <div class="popover_inner">\n        <div class="js_content popover_content">{=content}</div>\n        {if container_close}\n        <!--#0001#-->\n        <a href="javascript:;" class="popover_close icon16_common close_flat js_popover_close">关闭</a>\n        <!--%0001%-->\n        {/if}\n        {if buttons.length > 0}\n        <div class="popover_bar">\n			{each buttons as o index}\n			<a onclick="return false;" href="javascript:;" class="js_btn btn {o.type}">{o.text}</a>\n			{/each}\n        </div>\n        {/if}\n    </div>\n    <i class="popover_arrow popover_arrow_out"></i>\n    <i class="popover_arrow popover_arrow_in"></i>\n</div>\n';
});define("tpl/dropdownClassify.html.js",[],function(){
return'<div class="dropdown_menu js_dropdownClassify">\n    <a href="javascript:;" class="btn dropdown_switch jsDropdownBt">\n        <label class="jsBtLabel">{label}</label>\n        <i class="arrow"></i>\n    </a>\n    <div class="weui-desktop-dropdown-menu__wrp jsDropdownList" style="display: none;">\n        <!--默认为分类下拉菜单，singleTags = true 时为纯标签-->\n        <div class="weui-desktop-dropdown-menu horizontal {singleTags ? \'single-tags\' : \'\'}">\n            {if search}\n                <!--带搜索-->\n                <span class="global_info frm_input_box search with_del append">\n                    <a class="del_btn js_search_clear_btn" style="display: none;" href="javascript:;"><i class="icon_search_del"></i>&nbsp;</a>\n                    <a href="javascript:;" class="frm_input_append js_search_btn"><i class="icon16_common search_gray">&nbsp;</i>&nbsp;</a>\n                    <input type="text" placeholder="{searchPlaceholder}" value="" class="frm_input js_search_input">\n                </span>\n            {/if}\n            <!--有结果-->\n            <div class="weui-desktop-dropdown__list__cascade__container js_scroll_area js_data">\n                {each data as classItem classItem_i}\n                <dl class="weui-desktop-dropdown__list__cascade">\n                    {if !!classItem.name}\n                    <dt title="{classItem.name}" class="weui-desktop-dropdown__list__cascade__ele">{classItem.name}</dt>\n                    {/if}\n                    <dd class="weui-desktop-dropdown__list__cascade__tags jsDropdownGroup">\n                        {each classItem.data as tag tag_i}\n                        <dl class="weui-desktop-dropdown__list__cascade">\n                            <dt title="{tag.name}" class="weui-desktop-dropdown__list__cascade__ele jsDropdownItem{if tag.disabled} disabled{/if}" data-value="{tag.value}" data-name="{tag.name}" data-index="{tag_i}">\n                                <a href="javascript:;" class="weui-desktop-dropdown__list__cascade__ele__contain">{tag.name}</a>\n                            </dt>\n                        </dl>\n                        {/each}\n                    </dd>\n                </dl>\n                {/each}\n                <div class="weui-desktop-dropdown__list__cascade__loading-more js_loadmore_wording" style="display: none;">加载更多</div>\n            </div>\n            <!--无结果-->\n            <div class="weui-desktop-dropdown__list__cascade__empty js_data_empty" style="display: none;">{dataEmptyWording}</div>\n        </div>\n    </div>\n</div>';
});define("tpl/step.html.js",[],function(){
return'<ul class="weui-desktop-steps">\n    {each stepArr as item index}\n    <li class="weui-desktop-step {item.cls}">\n        {item.name}\n    </li>\n    {/each}\n</ul>\n';
});define("tpl/author/author_recent_list.html.js",[],function(){
return'<div class="weui-desktop-dropdown-menu">\n  <div class="author-list__head">\n    最近填写    <a href="javascript:;" class="js_clear_list author-list__clear">清空</a>\n  </div>\n  <ul class="weui-desktop-dropdown__list">\n    {each info as item idx}\n    <li data-idx="{idx}" class="js_item weui-desktop-dropdown__list-ele">\n      {if item.nicknameHighline}\n      <div class="weui-desktop-dropdown__list-ele-contain">{=item.nicknameHighline}</div>\n      {else}\n      <div class="weui-desktop-dropdown__list-ele-contain">{item.nickname}</div>\n      {/if}\n    </li>\n    {/each}\n  </ul>\n</div>\n';
});define("author/author_info.js",["biz_common/utils/string/html.js","author/author_popover.js","tpl/author/author_select.html.js","common/wx/popup.js","widget/weui-desktop/author/author_select.css"],function(t,o,i){
"use strict";
function n(t){
this._init(t);
}
function e(t){
s.$dom.find(t.target).length||s.destroy();
}
function c(t,o){
if(t&&o)for(var i=o.html(!0),n=new RegExp("(("+i+")+)","gi"),e=0,c=t.length;c>e;e++){
var h=t[e];
h.nicknameHighline=(h.nickname||"").html(!0),h.nicknameHighline=h.nicknameHighline.replace(n,'<em class="highlight">$1</em>');
}
}
t("biz_common/utils/string/html.js");
var h=t("author/author_popover.js"),r=t("tpl/author/author_select.html.js");
t("common/wx/popup.js"),t("widget/weui-desktop/author/author_select.css");
var s=null,l={
info:[],
tpl:r,
container:"",
showLoading:!0,
highlineStr:"",
inviteAuthorLink:"",
botTips:"",
onHide:null,
onShow:null
};
n.prototype._init=function(t){
var o=this;
return o.opt=$.extend(!0,{},l,t),t.highlineStr&&o.opt.info&&o.opt.info[0]&&!o.opt.info[0].nicknameHighline&&c(o.opt.info,t.highlineStr),
o.$container=$(this.opt.container),this.$container&&0!=this.$container.length?(o.$dom=$(template.compile(o.opt.tpl)(o.opt)),
o.$dom.appendTo(o.$container),"function"==typeof o.opt.onItemClick&&(o._itemClickEvent=function(){
var t=$(this).data("idx");
o.opt.onItemClick.call(o,t,o.opt.info);
},o.$dom.on("click",".js_item",o._itemClickEvent)),h.init({
$container:o.$dom
}),void("function"==typeof this.opt.onShow&&this.opt.onShow.call(this))):(console.error('[OPTION] "container" is empty which expect dom'),
!1);
},n.prototype.reInit=function(t){
this.destroy(),this._init(t);
},n.prototype.destroy=function(){
this._itemClickEvent&&this.$dom.off("click",this._itemClickEvent),this.$dom.remove(),
$(document).off("click",e),"function"==typeof this.opt.onHide&&this.opt.onHide.call(this);
},i.exports={
show:function(t){
return s?s.reInit(t):s=new n(t),$(document).on("click",e),s;
},
remove:function(){
s&&s.destroy();
}
};
});define("tpl/author/qrcode_popover.html.js",[],function(){
return'<div style="display:none;position: absolute;" class="popover author_card_popover">\n  <div class="popover_inner">\n    <div class="popover_content">\n      <p class="js_author_popover_desc weui-desktop-tips author_card_qrcode_nickname"></p>\n      <img class="js_author_popover_qrcode author_card_qrcode" src="" alt="">\n      <div class="js_author_popover_botTips author_card_qrcode_desc"></div>\n    </div>\n  </div>\n  <i class="popover_arrow popover_arrow_out"></i>\n  <i class="popover_arrow popover_arrow_in"></i>\n</div>\n';
});!function(e){
var c="object"==typeof window&&window||"object"==typeof self&&self;
"function"==typeof define?define("biz_common/utils/emoji_data.js",[],function(c,o){
return e(o);
}):c&&"undefined"==typeof c.__emojiData&&(c.__emojiData=e({}));
}(function(){
return[{
id:0,
cn:"[微笑]",
hk:"[微笑]",
us:"[Smile]",
code:"/::)",
web_code:"/微笑",
style:"icon_smiley_0"
},{
id:1,
cn:"[撇嘴]",
hk:"[撇嘴]",
us:"[Grimace]",
code:"/::~",
web_code:"/撇嘴",
style:"icon_smiley_1"
},{
id:2,
cn:"[色]",
hk:"[色]",
us:"[Drool]",
code:"/::B",
web_code:"/色",
style:"icon_smiley_2"
},{
id:3,
cn:"[发呆]",
hk:"[發呆]",
us:"[Scowl]",
code:"/::|",
web_code:"/发呆",
style:"icon_smiley_3"
},{
id:4,
cn:"[得意]",
hk:"[得意]",
us:"[CoolGuy]",
code:"/:8-)",
web_code:"/得意",
style:"icon_smiley_4"
},{
id:5,
cn:"[流泪]",
hk:"[流淚]",
us:"[Sob]",
code:"/::<",
web_code:"/流泪",
style:"icon_smiley_5"
},{
id:6,
cn:"[害羞]",
hk:"[害羞]",
us:"[Shy]",
code:"/::$",
web_code:"/害羞",
style:"icon_smiley_6"
},{
id:7,
cn:"[闭嘴]",
hk:"[閉嘴]",
us:"[Silent]",
code:"/::X",
web_code:"/闭嘴",
style:"icon_smiley_7"
},{
id:8,
cn:"[睡]",
hk:"[睡]",
us:"[Sleep]",
code:"/::Z",
web_code:"/睡",
style:"icon_smiley_8"
},{
id:9,
cn:"[大哭]",
hk:"[大哭]",
us:"[Cry]",
code:"/::'(",
web_code:"/大哭",
style:"icon_smiley_9"
},{
id:10,
cn:"[尴尬]",
hk:"[尷尬]",
us:"[Awkward]",
code:"/::-|",
web_code:"/尴尬",
style:"icon_smiley_10"
},{
id:11,
cn:"[发怒]",
hk:"[發怒]",
us:"[Angry]",
code:"/::@",
web_code:"/发怒",
style:"icon_smiley_11"
},{
id:12,
cn:"[调皮]",
hk:"[調皮]",
us:"[Tongue]",
code:"/::P",
web_code:"/调皮",
style:"icon_smiley_12"
},{
id:13,
cn:"[呲牙]",
hk:"[呲牙]",
us:"[Grin]",
code:"/::D",
web_code:"/呲牙",
style:"icon_smiley_13"
},{
id:14,
cn:"[惊讶]",
hk:"[驚訝]",
us:"[Surprise]",
code:"/::O",
web_code:"/惊讶",
style:"icon_smiley_14"
},{
id:15,
cn:"[难过]",
hk:"[難過]",
us:"[Frown]",
code:"/::(",
web_code:"/难过",
style:"icon_smiley_15"
},{
id:16,
cn:"[酷]",
hk:"[酷]",
us:"[Ruthless]",
code:"/::+",
web_code:"/酷",
style:"icon_smiley_16"
},{
id:17,
cn:"[冷汗]",
hk:"[冷汗]",
us:"[Blush]",
code:"/:--b",
web_code:"/冷汗",
style:"icon_smiley_17"
},{
id:18,
cn:"[抓狂]",
hk:"[抓狂]",
us:"[Scream]",
code:"/::Q",
web_code:"/抓狂",
style:"icon_smiley_18"
},{
id:19,
cn:"[吐]",
hk:"[吐]",
us:"[Puke]",
code:"/::T",
web_code:"/吐",
style:"icon_smiley_19"
},{
id:20,
cn:"[偷笑]",
hk:"[偷笑]",
us:"[Chuckle]",
code:"/:,@P",
web_code:"/偷笑",
style:"icon_smiley_20"
},{
id:21,
cn:"[愉快]",
hk:"[愉快]",
us:"[Joyful]",
code:"/:,@-D",
web_code:"/可爱",
style:"icon_smiley_21"
},{
id:22,
cn:"[白眼]",
hk:"[白眼]",
us:"[Slight]",
code:"/::d",
web_code:"/白眼",
style:"icon_smiley_22"
},{
id:23,
cn:"[傲慢]",
hk:"[傲慢]",
us:"[Smug]",
code:"/:,@o",
web_code:"/傲慢",
style:"icon_smiley_23"
},{
id:24,
cn:"[饥饿]",
hk:"[饑餓]",
us:"[Hungry]",
code:"/::g",
web_code:"/饥饿",
style:"icon_smiley_24"
},{
id:25,
cn:"[困]",
hk:"[累]",
us:"[Drowsy]",
code:"/:|-)",
web_code:"/困",
style:"icon_smiley_25"
},{
id:26,
cn:"[惊恐]",
hk:"[驚恐]",
us:"[Panic]",
code:"/::!",
web_code:"/惊恐",
style:"icon_smiley_26"
},{
id:27,
cn:"[流汗]",
hk:"[流汗]",
us:"[Sweat]",
code:"/::L",
web_code:"/流汗",
style:"icon_smiley_27"
},{
id:28,
cn:"[憨笑]",
hk:"[大笑]",
us:"[Laugh]",
code:"/::>",
web_code:"/憨笑",
style:"icon_smiley_28"
},{
id:29,
cn:"[悠闲]",
hk:"[悠閑]",
us:"[Commando]",
code:"/::,@",
web_code:"/大兵",
style:"icon_smiley_29"
},{
id:30,
cn:"[奋斗]",
hk:"[奮鬥]",
us:"[Determined]",
code:"/:,@f",
web_code:"/奋斗",
style:"icon_smiley_30"
},{
id:31,
cn:"[咒骂]",
hk:"[咒罵]",
us:"[Scold]",
code:"/::-S",
web_code:"/咒骂",
style:"icon_smiley_31"
},{
id:32,
cn:"[疑问]",
hk:"[疑問]",
us:"[Shocked]",
code:"/:?",
web_code:"/疑问",
style:"icon_smiley_32"
},{
id:33,
cn:"[嘘]",
hk:"[噓]",
us:"[Shhh]",
code:"/:,@x",
web_code:"/嘘",
style:"icon_smiley_33"
},{
id:34,
cn:"[晕]",
hk:"[暈]",
us:"[Dizzy]",
code:"/:,@@",
web_code:"/晕",
style:"icon_smiley_34"
},{
id:35,
cn:"[疯了]",
hk:"[瘋了]",
us:"[Tormented]",
code:"/::8",
web_code:"/折磨",
style:"icon_smiley_35"
},{
id:36,
cn:"[衰]",
hk:"[衰]",
us:"[Toasted]",
code:"/:,@!",
web_code:"/衰",
style:"icon_smiley_36"
},{
id:37,
cn:"[骷髅]",
hk:"[骷髏頭]",
us:"[Skull]",
code:"/:!!!",
web_code:"/骷髅",
style:"icon_smiley_37"
},{
id:38,
cn:"[敲打]",
hk:"[敲打]",
us:"[Hammer]",
code:"/:xx",
web_code:"/敲打",
style:"icon_smiley_38"
},{
id:39,
cn:"[再见]",
hk:"[再見]",
us:"[Wave]",
code:"/:bye",
web_code:"/再见",
style:"icon_smiley_39"
},{
id:40,
cn:"[擦汗]",
hk:"[擦汗]",
us:"[Speechless]",
code:"/:wipe",
web_code:"/擦汗",
style:"icon_smiley_40"
},{
id:41,
cn:"[抠鼻]",
hk:"[摳鼻]",
us:"[NosePick]",
code:"/:dig",
web_code:"/抠鼻",
style:"icon_smiley_41"
},{
id:42,
cn:"[鼓掌]",
hk:"[鼓掌]",
us:"[Clap]",
code:"/:handclap",
web_code:"/鼓掌",
style:"icon_smiley_42"
},{
id:43,
cn:"[糗大了]",
hk:"[羞辱]",
us:"[Shame]",
code:"/:&-(",
web_code:"/糗大了",
style:"icon_smiley_43"
},{
id:44,
cn:"[坏笑]",
hk:"[壞笑]",
us:"[Trick]",
code:"/:B-)",
web_code:"/坏笑",
style:"icon_smiley_44"
},{
id:45,
cn:"[左哼哼]",
hk:"[左哼哼]",
us:"[Bah！L]",
code:"/:<@",
web_code:"/左哼哼",
style:"icon_smiley_45"
},{
id:46,
cn:"[右哼哼]",
hk:"[右哼哼]",
us:"[Bah！R]",
code:"/:@>",
web_code:"/右哼哼",
style:"icon_smiley_46"
},{
id:47,
cn:"[哈欠]",
hk:"[哈欠]",
us:"[Yawn]",
code:"/::-O",
web_code:"/哈欠",
style:"icon_smiley_47"
},{
id:48,
cn:"[鄙视]",
hk:"[鄙視]",
us:"[Pooh-pooh]",
code:"/:>-|",
web_code:"/鄙视",
style:"icon_smiley_48"
},{
id:49,
cn:"[委屈]",
hk:"[委屈]",
us:"[Shrunken]",
code:"/:P-(",
web_code:"/委屈",
style:"icon_smiley_49"
},{
id:50,
cn:"[快哭了]",
hk:"[快哭了]",
us:"[TearingUp]",
code:"/::'|",
web_code:"/快哭了",
style:"icon_smiley_50"
},{
id:51,
cn:"[阴险]",
hk:"[陰險]",
us:"[Sly]",
code:"/:X-)",
web_code:"/阴险",
style:"icon_smiley_51"
},{
id:52,
cn:"[亲亲]",
hk:"[親親]",
us:"[Kiss]",
code:"/::*",
web_code:"/亲亲",
style:"icon_smiley_52"
},{
id:53,
cn:"[吓]",
hk:"[嚇]",
us:"[Wrath]",
code:"/:@x",
web_code:"/吓",
style:"icon_smiley_53"
},{
id:54,
cn:"[可怜]",
hk:"[可憐]",
us:"[Whimper]",
code:"/:8*",
web_code:"/可怜",
style:"icon_smiley_54"
},{
id:55,
cn:"[菜刀]",
hk:"[菜刀]",
us:"[Cleaver]",
code:"/:pd",
web_code:"/菜刀",
style:"icon_smiley_55"
},{
id:56,
cn:"[西瓜]",
hk:"[西瓜]",
us:"[Watermelon]",
code:"/:<W>",
web_code:"/西瓜",
style:"icon_smiley_56"
},{
id:57,
cn:"[啤酒]",
hk:"[啤酒]",
us:"[Beer]",
code:"/:beer",
web_code:"/啤酒",
style:"icon_smiley_57"
},{
id:58,
cn:"[篮球]",
hk:"[籃球]",
us:"[Basketball]",
code:"/:basketb",
web_code:"/篮球",
style:"icon_smiley_58"
},{
id:59,
cn:"[乒乓]",
hk:"[乒乓]",
us:"[PingPong]",
code:"/:oo",
web_code:"/乒乓",
style:"icon_smiley_59"
},{
id:60,
cn:"[咖啡]",
hk:"[咖啡]",
us:"[Coffee]",
code:"/:coffee",
web_code:"/咖啡",
style:"icon_smiley_60"
},{
id:61,
cn:"[饭]",
hk:"[飯]",
us:"[Rice]",
code:"/:eat",
web_code:"/饭",
style:"icon_smiley_61"
},{
id:62,
cn:"[猪头]",
hk:"[豬頭]",
us:"[Pig]",
code:"/:pig",
web_code:"/猪头",
style:"icon_smiley_62"
},{
id:63,
cn:"[玫瑰]",
hk:"[玫瑰]",
us:"[Rose]",
code:"/:rose",
web_code:"/玫瑰",
style:"icon_smiley_63"
},{
id:64,
cn:"[凋谢]",
hk:"[枯萎]",
us:"[Wilt]",
code:"/:fade",
web_code:"/凋谢",
style:"icon_smiley_64"
},{
id:65,
cn:"[嘴唇]",
hk:"[嘴唇]",
us:"[Lips]",
code:"/:showlove",
web_code:"/示爱",
style:"icon_smiley_65"
},{
id:66,
cn:"[爱心]",
hk:"[愛心]",
us:"[Heart]",
code:"/:heart",
web_code:"/爱心",
style:"icon_smiley_66"
},{
id:67,
cn:"[心碎]",
hk:"[心碎]",
us:"[BrokenHeart]",
code:"/:break",
web_code:"/心碎",
style:"icon_smiley_67"
},{
id:68,
cn:"[蛋糕]",
hk:"[蛋糕]",
us:"[Cake]",
code:"/:cake",
web_code:"/蛋糕",
style:"icon_smiley_68"
},{
id:69,
cn:"[闪电]",
hk:"[閃電]",
us:"[Lightning]",
code:"/:li",
web_code:"/闪电",
style:"icon_smiley_69"
},{
id:70,
cn:"[炸弹]",
hk:"[炸彈]",
us:"[Bomb]",
code:"/:bome",
web_code:"/炸弹",
style:"icon_smiley_70"
},{
id:71,
cn:"[刀]",
hk:"[刀]",
us:"[Dagger]",
code:"/:kn",
web_code:"/刀",
style:"icon_smiley_71"
},{
id:72,
cn:"[足球]",
hk:"[足球]",
us:"[Soccer]",
code:"/:footb",
web_code:"/足球",
style:"icon_smiley_72"
},{
id:73,
cn:"[瓢虫]",
hk:"[甲蟲]",
us:"[Ladybug]",
code:"/:ladybug",
web_code:"/瓢虫",
style:"icon_smiley_73"
},{
id:74,
cn:"[便便]",
hk:"[便便]",
us:"[Poop]",
code:"/:shit",
web_code:"/便便",
style:"icon_smiley_74"
},{
id:75,
cn:"[月亮]",
hk:"[月亮]",
us:"[Moon]",
code:"/:moon",
web_code:"/月亮",
style:"icon_smiley_75"
},{
id:76,
cn:"[太阳]",
hk:"[太陽]",
us:"[Sun]",
code:"/:sun",
web_code:"/太阳",
style:"icon_smiley_76"
},{
id:77,
cn:"[礼物]",
hk:"[禮物]",
us:"[Gift]",
code:"/:gift",
web_code:"/礼物",
style:"icon_smiley_77"
},{
id:78,
cn:"[拥抱]",
hk:"[擁抱]",
us:"[Hug]",
code:"/:hug",
web_code:"/拥抱",
style:"icon_smiley_78"
},{
id:79,
cn:"[强]",
hk:"[強]",
us:"[ThumbsUp]",
code:"/:strong",
web_code:"/强",
style:"icon_smiley_79"
},{
id:80,
cn:"[弱]",
hk:"[弱]",
us:"[ThumbsDown]",
code:"/:weak",
web_code:"/弱",
style:"icon_smiley_80"
},{
id:81,
cn:"[握手]",
hk:"[握手]",
us:"[Shake]",
code:"/:share",
web_code:"/握手",
style:"icon_smiley_81"
},{
id:82,
cn:"[胜利]",
hk:"[勝利]",
us:"[Peace]",
code:"/:v",
web_code:"/胜利",
style:"icon_smiley_82"
},{
id:83,
cn:"[抱拳]",
hk:"[抱拳]",
us:"[Fight]",
code:"/:@)",
web_code:"/抱拳",
style:"icon_smiley_83"
},{
id:84,
cn:"[勾引]",
hk:"[勾引]",
us:"[Beckon]",
code:"/:jj",
web_code:"/勾引",
style:"icon_smiley_84"
},{
id:85,
cn:"[拳头]",
hk:"[拳頭]",
us:"[Fist]",
code:"/:@@",
web_code:"/拳头",
style:"icon_smiley_85"
},{
id:86,
cn:"[差劲]",
hk:"[差勁]",
us:"[Pinky]",
code:"/:bad",
web_code:"/差劲",
style:"icon_smiley_86"
},{
id:87,
cn:"[爱你]",
hk:"[愛你]",
us:"[RockOn]",
code:"/:lvu",
web_code:"/爱你",
style:"icon_smiley_87"
},{
id:88,
cn:"[NO]",
hk:"[NO]",
us:"[Nuh-uh]",
code:"/:no",
web_code:"/NO",
style:"icon_smiley_88"
},{
id:89,
cn:"[OK]",
hk:"[OK]",
us:"[OK]",
code:"/:ok",
web_code:"/OK",
style:"icon_smiley_89"
},{
id:90,
cn:"[爱情]",
hk:"[愛情]",
us:"[InLove]",
code:"/:love",
web_code:"/爱情",
style:"icon_smiley_90"
},{
id:91,
cn:"[飞吻]",
hk:"[飛吻]",
us:"[Blowkiss]",
code:"/:<L>",
web_code:"/飞吻",
style:"icon_smiley_91"
},{
id:92,
cn:"[跳跳]",
hk:"[跳跳]",
us:"[Waddle]",
code:"/:jump",
web_code:"/跳跳",
style:"icon_smiley_92"
},{
id:93,
cn:"[发抖]",
hk:"[發抖]",
us:"[Tremble]",
code:"/:shake",
web_code:"/发抖",
style:"icon_smiley_93"
},{
id:94,
cn:"[怄火]",
hk:"[噴火]",
us:"[Aaagh!]",
code:"/:<O>",
web_code:"/怄火",
style:"icon_smiley_94"
},{
id:95,
cn:"[转圈]",
hk:"[轉圈]",
us:"[Twirl]",
code:"/:circle",
web_code:"/转圈",
style:"icon_smiley_95"
},{
id:96,
cn:"[磕头]",
hk:"[磕頭]",
us:"[Kotow]",
code:"/:kotow",
web_code:"/磕头",
style:"icon_smiley_96"
},{
id:97,
cn:"[回头]",
hk:"[回頭]",
us:"[Dramatic]",
code:"/:turn",
web_code:"/回头",
style:"icon_smiley_97"
},{
id:98,
cn:"[跳绳]",
hk:"[跳繩]",
us:"[JumpRope]",
code:"/:skip",
web_code:"/跳绳",
style:"icon_smiley_98"
},{
id:99,
cn:"[投降]",
hk:"[投降]",
us:"[Surrender]",
code:"/:oY",
web_code:"/挥手",
style:"icon_smiley_99"
},{
id:100,
cn:"[激动]",
hk:"[激動]",
us:"[Hooray]",
code:"/:#-0",
web_code:"/激动",
style:"icon_smiley_100"
},{
id:101,
cn:"[乱舞]",
hk:"[亂舞]",
us:"[Meditate]",
code:"/:hiphot",
web_code:"/街舞",
style:"icon_smiley_101"
},{
id:102,
cn:"[献吻]",
hk:"[獻吻]",
us:"[Smooch]",
code:"/:kiss",
web_code:"/献吻",
style:"icon_smiley_102"
},{
id:103,
cn:"[左太极]",
hk:"[左太極]",
us:"[TaiChi L]",
code:"/:<&",
web_code:"/左太极",
style:"icon_smiley_103"
},{
id:104,
cn:"[右太极]",
hk:"[右太極]",
us:"[TaiChi R]",
code:"/:&>",
web_code:"/右太极",
style:"icon_smiley_104"
},{
id:204,
cn:"[嘿哈]",
hk:"[吼嘿]",
us:"[Hey]",
code:"",
web_code:"",
style:"icon_emoji_wx_4"
},{
id:205,
cn:"[捂脸]",
hk:"[掩面]",
us:"[Facepalm]",
code:"",
web_code:"",
style:"icon_emoji_wx_5"
},{
id:202,
cn:"[奸笑]",
hk:"[奸笑]",
us:"[Smirk]",
code:"",
web_code:"",
style:"icon_emoji_wx_2"
},{
id:206,
cn:"[机智]",
hk:"[機智]",
us:"[Smart]",
code:"",
web_code:"",
style:"icon_emoji_wx_6"
},{
id:212,
cn:"[皱眉]",
hk:"[皺眉]",
us:"[Moue]",
code:"",
web_code:"",
style:"icon_emoji_wx_12"
},{
id:211,
cn:"[耶]",
hk:"[歐耶]",
us:"[Yeah!]",
code:"",
web_code:"",
style:"icon_emoji_wx_11"
},{
id:207,
cn:"[茶]",
hk:"[茶]",
us:"[Tea]",
code:"",
web_code:"",
style:"icon_emoji_wx_7"
},{
id:209,
cn:"[红包]",
hk:"[Packet]",
us:"[Packet]",
code:"",
web_code:"",
style:"icon_emoji_wx_9"
},{
id:210,
cn:"[蜡烛]",
hk:"[蠟燭]",
us:"[Candle]",
code:"",
web_code:"",
style:"icon_emoji_wx_10"
},{
id:215,
cn:"[福]",
hk:"[福]",
us:"[Blessing]",
code:"",
web_code:"",
style:"icon_emoji_wx_15"
},{
id:214,
cn:"[鸡]",
hk:"[小雞]",
us:"[Chick]",
code:"",
web_code:"",
style:"icon_emoji_wx_14"
},{
id:300,
cn:"[笑脸]",
emoji:"😄",
hk:"",
us:"",
code:"\\ue415",
web_code:"",
style:"icon_emoji_ios_0"
},{
id:301,
cn:"[生病]",
emoji:"😷",
hk:"",
us:"",
code:"\\ue40c",
web_code:"",
style:"icon_emoji_ios_1"
},{
id:302,
cn:"[破涕为笑]",
emoji:"😂",
hk:"",
us:"",
code:"\\ue412",
web_code:"",
style:"icon_emoji_ios_2"
},{
id:303,
cn:"[吐舌]",
emoji:"😝",
hk:"",
us:"",
code:"\\ue409",
web_code:"",
style:"icon_emoji_ios_3"
},{
id:304,
cn:"[脸红]",
emoji:"😳",
hk:"",
us:"",
code:"\\ue40d",
web_code:"",
style:"icon_emoji_ios_4"
},{
id:305,
cn:"[恐惧]",
emoji:"😱",
hk:"",
us:"",
code:"\\ue107",
web_code:"",
style:"icon_emoji_ios_5"
},{
id:306,
cn:"[失望]",
emoji:"😔",
hk:"",
us:"",
code:"\\ue403",
web_code:"",
style:"icon_emoji_ios_6"
},{
id:307,
cn:"[无语]",
emoji:"😒",
hk:"",
us:"",
code:"\\ue40e",
web_code:"",
style:"icon_emoji_ios_7"
},{
id:308,
cn:"[鬼魂]",
emoji:"👻",
hk:"",
us:"",
code:"\\ue11b",
web_code:"",
style:"icon_emoji_ios_8"
},{
id:309,
cn:"[合十]",
emoji:"🙏",
hk:"",
us:"",
code:"\\ue41d",
web_code:"",
style:"icon_emoji_ios_9"
},{
id:310,
cn:"[强壮]",
emoji:"💪",
hk:"",
us:"",
code:"\\ue14c",
web_code:"",
style:"icon_emoji_ios_10"
},{
id:311,
cn:"[庆祝]",
emoji:"🎉",
hk:"",
us:"",
code:"\\ue312",
web_code:"",
style:"icon_emoji_ios_11"
},{
id:312,
cn:"[礼物]",
hk:"",
us:"",
code:"\\ue112",
web_code:"",
style:"icon_emoji_ios_12"
},{
id:"17_1",
cn:"[囧]",
hk:"[囧]",
us:"[Blush]",
code:"",
web_code:"",
style:"icon_smiley_17"
},{
id:"39_1",
cn:"[再见]",
hk:"[再見]",
us:"[Bye]",
code:"",
web_code:"",
style:"icon_smiley_39"
},{
id:"83_1",
cn:"[抱拳]",
hk:"[抱拳]",
us:"[Salute]",
code:"",
web_code:"",
style:"icon_smiley_83"
},{
id:"212_1",
cn:"[皱眉]",
hk:"[皺眉]",
us:"[Concerned]",
code:"",
web_code:"",
style:"icon_emoji_wx_12"
}];
});define("media/web2_edit_v2.js",["vue-weui/src/gallery/gallery.js","pages/reward/modules/auto_apply_list/auto_apply_list.js","common/qq/events.js","pages/modules/base/base.js"],function(e){
"use strict";
e("vue-weui/src/gallery/gallery.js"),e("pages/reward/modules/auto_apply_list/auto_apply_list.js");
var a=e("common/qq/events.js")(!0),s=e("pages/modules/base/base.js"),l=new s({
el:"#vue_app2",
data:function(){
return{
imageUrls:[],
showGallery:!1,
gallerySelected:0
};
},
mounted:function(){
var e=this;
a.on("img9DataChanged",function(a){
e.imageUrls=a;
}),a.on("img9DataSelected",function(a){
e.gallerySelected=a,e.showGallery=!0;
});
}
});
return{
vm:l
};
});define("media/get_article_structure.js",["common/wx/const.js","biz_common/utils/get_para_list.js","utils/common.js","3rd/editor/common/domUtils.js","biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function t(e,t,o){
return new RegExp("<"+e+".*?"+t+".*?"+o+'="([^"].*?)".*?>');
}
function o(e){
if(null!==e){
var t=[],o=[],r="",n="",a="",i="";
for(t.push(e);t.length>0;){
var l=t.pop(),d=l.nodeValue?l.nodeValue.replace(/\u200B/g,"").replace(/\s+/g,""):null;
if(3===l.nodeType&&d){
var s=l.parentNode;
if(null===s)continue;
var c=window.getComputedStyle(s,null)||{},u=c.getPropertyValue("background-color"),p=c.getPropertyValue("color"),g=c.getPropertyValue("font-size");
r=r?r+":#:"+d:d,n=n?n+":#:"+p:p,a=a?a+":#:"+g:g,i=i?i+":#:"+u:u,o.push(l);
}
var m=l.childNodes;
m=Array.prototype.slice.call(m,0).reverse();
for(var f=0;f<m.length;f++)t.push(m[f]);
}
return{
wholeText:r,
wholeTextColor:n,
wholeFontSize:a,
wholeTextBackGround:i,
result:o
};
}
}
function r(e){
for(var t,o,r=9,n=r,a=s.getHtmlText(e),i=0;i<g.length;i++)if(t=g[i].exec(e.outerHTML)){
n=i+1,o=t[t.length-1]||"";
break;
}
if(n!==r&&a.length&&(n=0),n===r&&"center"===getComputedStyle(e).textAlign){
var l=a.length,d=a.match(/[\u4e00-\u9fa5]+/g);
d&&d.length&&(l+=d.join("").length),50>=l&&(n=11);
}
return{
textContent:a,
sectionType:n,
extraContent:o
};
}
function n(e,t){
e.appendChild(t);
var o=t.offsetWidth;
return e.removeChild(t),o;
}
function a(e){
for(var t=Date.now(),o=document.createElement("p"),a=n(e,o),i=d(e,{
isMarkNode:function(e){
return c.isMarkNode(e);
},
getNestedStructure:!0
}),l=[],s=i.length,g=0,m=0;s>m;m++){
var f=i[m],h=d.paragraphStartIdx+m;
if(f.sectionIdx=h,f.isWrapper){
for(var x=[],v=0;v<f.children.length;v++)f.children[v].sectionIdx&&x.push(f.children[v].sectionIdx);
l.push({
section_index:h,
embedment:x
});
}else{
var _=r(f);
g+=_.textContent.length,l.push({
section_index:h,
text_content:_.textContent,
section_type:_.sectionType,
extra_content:_.extraContent
});
}
}
for(var w=0;s>w;w++){
var b,y=i[w].parentNode,C=l[w],j=C.text_content?C.text_content.length:0,k=(l[w-1]?l[w-1].textCountBefore:0)+j;
C.textCountBefore=k,b=y===e?a:n(y,o);
var T=a?b/a:0;
.7>=T?C.ad_available=!1:p>k||p>g-k||y.style.height&&y!==e||y.style.maxHeight?C.ad_available=!1:(l.autoAdAvailable=!0,
C.ad_available=!0,C.width_rate=T);
}
for(var A=0;s>A;A++){
var N=l[A];
if(N.ad_available){
for(var S=A+1;s>S;S++)if(l[S].ad_available&&l[S].textCountBefore-N.textCountBefore>=p){
N.second_ad_available=l[S].section_index,l.secondAutoAdAvailable=!0;
break;
}
delete N.textCountBefore;
}else delete N.textCountBefore;
}
return Math.random()<.5&&(u.saveSpeeds({
uin:window.wx&&window.wx.data&&window.wx.data.uin||0,
pid:34,
speeds:[{
sid:36,
time:Date.now()-t
}]
}),u.send()),l;
}
function i(e){
for(var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=d(e,{
isMarkNode:function(e){
return c.isMarkNode(e);
},
getNestedStructure:t.getNestedStructure,
ignoreFlexChildren:t.ignoreFlexChildren,
ignoreNotWriteableChildren:t.ignoreNotWriteableChildren
}),a=[],i=n.length,l=function(){
var e=n[s];
u=r(e),p=o(e);
var i=e.style.overflowY;
e.style.overflowY="hidden";
var l=e.offsetTop;
void 0===l&&(l=0,Array.prototype.forEach.call(e.getClientRects(),function(e){
l<e.bottom&&(l=e.bottom);
})),l=1*l.toFixed(2);
var d={
blockIdx:s+1,
content:e.outerHTML,
width:e.offsetWidth,
height:e.offsetHeight,
topMargin:l,
marginBottom:parseFloat(e.style.marginBottom)||0,
contentEditable:e.getAttribute("contenteditable"),
blockType:u.sectionType,
background:window.getComputedStyle(e,null).getPropertyValue("background-color"),
text:p.wholeText,
textColor:p.wholeTextColor,
textFontSize:p.wholeFontSize,
textBackGround:p.wholeTextBackGround,
isWrapper:e.isWrapper
};
t.needEl&&(d.el=e),a.push(d),e.style.overflowY=i||"",e.style.cssText||e.removeAttribute("style");
},s=0;i>s;s++){
var u,p;
l();
}
return a;
}
var l=e("common/wx/const.js"),d=e("biz_common/utils/get_para_list.js"),s=e("utils/common.js"),c=e("3rd/editor/common/domUtils.js").domUtils,u=e("biz_common/utils/wxgspeedsdk.js"),p=l.textCountAroundAd,g=[t("img","","src"),t("iframe","wx_video_iframe","src"),t("iframe","js_editor_audio","src"),t("iframe","js_editor_vote_card","src"),t("iframe","js_editor_card","src"),t("iframe","js_editor_cpcad","src"),t("iframe","weapp_app_iframe","data-miniprogram-appid"),t("iframe","js_editor_cps","src"),t("blockquote","","data-url")];
return{
getArticleStructure:a,
getArticleStructureNoAd:i
};
});define("tpl/media/audit_fail_tip.html.js",[],function(){
return'<div>\n        <!--cps审核不通过不能群发 begin-->\n        <div class="page_msg small default js_no_commission_tip">\n            <div class="inner group">\n                <span class="msg_icon_wrp">\n                    <i class="icon_msg warn"></i>\n                </span>\n                <div class="msg_content">\n                    <h4>文章内容有审核不通过商品，无法群发</h4>\n                </div>\n            </div>\n        </div>\n        <!--无法获得推广收益 end-->\n    </div>\n    \n    ';
});define("common/wx/pagebar.js",["widget/pagination.css","tpl/pagebar.html.js","common/qq/Class.js","common/wx/Tips.js"],function(t,e){
"use strict";
var i,n,s,a=(t("widget/pagination.css"),t("tpl/pagebar.html.js")),r=t("common/qq/Class.js"),h=t("common/wx/Tips.js");
s=template.compile(a),i=e,n={
first:"首页",
last:"末页",
prev:"上页",
next:"下页",
startPage:1,
initShowPage:1,
perPage:10,
startRange:1,
midRange:3,
endRange:1,
totalItemsNum:0,
container:"",
callback:null,
isNavHide:!1,
isSimple:!0,
jumpPage:!0,
showEndPage:!0
};
var o=function(t,e,i){
var n;
return n=t+(e-1),n=n>i?i:n;
},g=function(t,e,i){
var n;
return n=i%2===0?e-(i/2-1):e-(i-1)/2,n=t>n?t:n;
},u=function(t,e,i){
var n;
return n=e%2===0?parseInt(t)+e/2:parseInt(t)+(e-1)/2,n=n>i?i:n;
},c=function(t,e,i){
var n;
return n=e-(i-1),n=t>n?t:n;
},l=function(t,e){
if(e[t]&&isNaN(e[t]))throw new Error("Invalid arguments: "+t+" should be a number");
},p=function(t){
if(l("perPage",t),l("totalItemsNum",t),l("startPage",t),l("startRange",t),l("midRange",t),
l("endRange",t),l("initShowPage",t),void 0!==t.callback&&null!==t.callback&&!$.isFunction(t.callback))throw new Error("Invalid arguments: callback should be a function");
},d=function(t,e,i){
var n=t.container.find(".page_"+i);
if("string"==typeof e){
var s=$(e);
0!==s.length&&(n=s);
}else{
if(e!==!1)throw new Error("Invalid Paramter: '"+i+"' should be a string or false");
n.hide();
}
return n;
},P=r.declare({
init:function(t){
if(t.totalItemsNum){
var e;
if(p(t),e=$.extend(!0,{},n,t),this._init(e),e.initShowPage<e.startPage)throw new Error("Invalid arguments: initShowPage should be larger than startPage");
if(e.initShowPage>e.endPage)throw new Error("Invalid arguments: initShowPage should be smaller than endPage");
this.paginate();
}
},
_init:function(t){
this.currentPage=t.initShowPage,this._isNextButtonShow=!0,this._isPrevButtonShow=!0,
this.uid="wxPagebar_"+ +new Date,this.initEventCenter(),this.optionsForTemplate={},
$.extend(this,t),this.container=$(t.container),this.optionsForTemplate.isSimple=t.isSimple,
this.optionsForTemplate.jumpPage=t.jumpPage===!1?!1:!0,this.optionsForTemplate.showEndPage=t.showEndPage===!1?!1:!0,
this.optionsForTemplate.firstButtonText=0===$(t.first).length?t.first:n.first,this.optionsForTemplate.lastButtonText=0===$(t.last).length?t.last:n.last,
this.optionsForTemplate.nextButtonText=0===$(t.next).length?t.next:n.next,this.optionsForTemplate.prevButtonText=0===$(t.prev).length?t.prev:n.prev,
this.optionsForTemplate.isNavHide=t.isNavHide,this.generatePages(parseInt(this.totalItemsNum)),
this.gapForStartRange=this.container.find(".gap_prev"),this.gapForEndRange=this.container.find(".gap_next"),
this.firstButton=d(this,t.first,"first"),this.lastButton=d(this,t.last,"last"),this.prevButton=d(this,t.prev,"prev"),
this.nextButton=d(this,t.next,"next"),this.bindEvent();
},
initEventCenter:function(){
this.eventCenter={
eventList:[],
bind:function(t,e){
this.eventList[t]||(this.eventList[t]=[]),this.eventList[t].push(e);
},
trigger:function(t){
var e,i;
this.eventList[t]||(this.eventList[t]=[]),e=this.eventList[t];
for(var n=0;n<e.length;n++)if(i=Array.prototype.slice.call(arguments,1),e[n].apply(this,i)===!1)return!1;
},
unbind:function(t,e){
if(!this.eventList)throw new Error("The eventList was undefined");
if(!this.eventList[t])throw new Error("The event type "+t+" was not found");
if(void 0===e)this.eventList[t]=[];else for(var i=this.eventList[t],n=i.length,s=0;n>s;s++)if(i[s]===e){
i.splice(s,1);
break;
}
}
};
},
generatePages:function(t){
var e,i,n,a,r,h;
for(this.pageNum=Math.ceil(t/this.perPage),this.endPage=this.startPage+this.pageNum-1,
this.gapForStartRange=null,this.gapForEndRange=null,this.optionsForTemplate.startRange=[],
this.optionsForTemplate.midRange=[],this.optionsForTemplate.endRange=[],i=o(this.startPage,this.startRange,this.endPage),
n=g(this.startPage,this.currentPage,this.midRange),a=u(this.currentPage,this.midRange,this.endPage),
r=c(this.startPage,this.endPage,this.endRange),i>=r&&(r=i+1),e=this.startPage;i>=e;e+=1)this.optionsForTemplate.startRange.push(e);
for(var l=0,e=n;l<this.midRange;l+=1,e+=1)this.optionsForTemplate.midRange.push(e);
for(e=r;e<=this.endPage;e+=1)this.optionsForTemplate.endRange.push(e);
this.optionsForTemplate.endPage=this.endPage,this.optionsForTemplate.initShowPage=this.initShowPage,
h=s(this.optionsForTemplate),this.container.html(h),1==this.pageNum?this.container.hide():this.container.show(),
this.pages=this.container.find(".page_nav"),this.midPages=this.container.find(".js_mid"),
this.labels=this.container.find(".page_num label"),this.container.find(".pagination").attr("id",this.uid);
},
paginate:function(){
var t,e,i,n,s,a,r,h,l,p;
if(this.isSimple===!0)for(var d=0,P=this.labels.length;P>d;d++)d%2===0&&$(this.labels[d]).html(this.currentPage);else{
e=o(this.startPage,this.startRange,this.endPage),a=g(this.startPage,this.currentPage,this.midRange),
r=u(this.currentPage,this.midRange,this.endPage),h=c(this.startPage,this.endPage,this.endRange),
e>=h&&(h=e+1),e>=a&&(a=e+1),r>=h&&(r=h-1),this.pages.show(),this.pages.removeClass("current"),
p=parseInt(this.midPages.length/this.midRange);
for(var d=0,P=p;P>d;d++){
for(s=0,t=a;r>=t;t+=1)n=this.midRange*d+(t-a),l=$(this.midPages[n]),l.html(t),s+=1,
t==this.currentPage&&l.addClass("current");
for(n=this.midRange*d+s;s<this.midRange;s+=1)l=$(this.midPages[n]),l.hide(),l.removeClass("current"),
n+=1;
}
for(var d=0,P=this.pages.length;P>=d;d++)i=$(this.pages[d]),t=parseInt(i.html()),
t===parseInt(this.currentPage)&&i.addClass("current");
if(a>e+1?this.gapForStartRange.show():this.gapForStartRange.hide(),h>r+1?this.gapForEndRange.show():this.gapForEndRange.hide(),
this.isNavHide){
for(var d=this.startPage;d<=this.endPage;d+=1)this.pages.hide();
this.gapForStartRange.hide(),this.gapForEndRange.hide();
}
}
this.checkButtonShown();
},
destroy:function(){
this.container.off("click","#"+this.uid+" a.page_nav"),this.container.off("click","#"+this.uid+" a.page_go"),
this.container.off("keydown","#"+this.uid+" .goto_area input"),this.nextButton.off("click"),
this.prevButton.off("click"),this.firstButton.off("click"),this.lastButton.off("click");
},
bindEvent:function(){
this.container.on("click","#"+this.uid+" a.page_nav",this.proxy(function(t){
var e=$(t.target);
return e.hasClass("current")?!1:(this.clickPage(parseInt(e.html())),!1);
},this)),this.nextButton.on("click",this.proxy(function(t){
$(t.target);
return this.nextPage(),!1;
},this)),this.prevButton.on("click",this.proxy(function(t){
$(t.target);
return this.prevPage(),!1;
},this)),this.firstButton.on("click",this.proxy(function(t){
$(t.target);
return this.goFirstPage(),!1;
},this)),this.lastButton.on("click",this.proxy(function(t){
$(t.target);
return this.goLastPage(),!1;
},this)),this.container.on("click","#"+this.uid+" a.page_go",this.proxy(function(t){
var e=$(t.target).prev();
return this.goPage(e.val()),!1;
},this)),this.container.on("keydown","#"+this.uid+" .goto_area input",this.proxy(function(t){
return wx.isHotkey(t,"enter")?(this.container.find("a.page_go").click(),!1):void 0;
},this));
},
on:function(t,e){
this.eventCenter.bind(t,this.proxy(e,this));
},
callbackFunc:function(t){
var e={
currentPage:this.currentPage,
perPage:this.perPage,
count:this.pageNum
};
return $.isFunction(this.callback)&&this.callback(e)===!1?!1:this.eventCenter.trigger(t,e)===!1?!1:void this.paginate();
},
proxy:function(t,e){
return function(){
var i=Array.prototype.slice.call(arguments,0);
return t.apply(e,i);
};
},
nextPage:function(){
this.currentPage!==this.endPage&&(this.currentPage++,this.callbackFunc("next")===!1&&this.currentPage--);
},
prevPage:function(){
this.currentPage!==this.startPage&&(this.currentPage--,this.callbackFunc("prev")===!1&&this.currentPage++);
},
goFirstPage:function(){
var t=this.currentPage;
this.currentPage=this.startPage,this.callbackFunc("goFirst")===!1&&(this.currentPage=t);
},
goLastPage:function(){
var t=this.currentPage;
this.currentPage=this.endPage,this.callbackFunc("goLast")===!1&&(this.currentPage=t);
},
checkButtonShown:function(){
+this.currentPage===+this.startPage?this.hidePrevButton():this.showPrevButton(),
+this.currentPage===+this.endPage?this.hideNextButton():this.showNextButton();
},
goPage:function(t){
var e=this.currentPage,t=Math.round(t);
return t===this.currentPage?!1:isNaN(t)?(h.err("请输入正确的页码"),!1):""===t?!1:t<this.startPage?(h.err("请输入正确的页码"),
!1):t>this.endPage?(h.err("请输入正确的页码"),!1):(this.currentPage=t,void(this.callbackFunc("go")===!1&&(this.currentPage=e)));
},
clickPage:function(t){
var e=this.currentPage;
isNaN(t)&&(t=this.startPage),this.currentPage=t<this.startPage?this.startPage:t>this.endPage?this.endPage:t,
this.callbackFunc("click")===!1&&(this.currentPage=e);
},
showNextButton:function(){
this.nextButton&&this._isNextButtonShow===!1&&(this.nextButton.show(),this._isNextButtonShow=!0);
},
showPrevButton:function(){
this.prevButton&&this._isPrevButtonShow===!1&&(this.prevButton.show(),this._isPrevButtonShow=!0);
},
hideNextButton:function(){
this.nextButton&&this._isNextButtonShow===!0&&(this.nextButton.hide(),this._isNextButtonShow=!1);
},
hidePrevButton:function(){
this.prevButton&&this._isPrevButtonShow===!0&&(this.prevButton.hide(),this._isPrevButtonShow=!1);
}
});
return e=P;
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("common/wx/speedPerformance.js",["biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function s(e){
if(e)if(e.length>0)for(var s=0,n=e.length;n>s;s++){
var i=e[s];
a[i.type]=a[i.type]?$.extend(e,a[i.type]):{
uin:wx&&wx.data&&wx.data.uin||0,
pid:i.pid,
rid:i.rid||0,
speeds:[]
};
}else"object"===("undefined"==typeof e?"undefined":_typeof(e))&&(a[e.type]={
uin:wx&&wx.data&&wx.data.uin||0,
pid:e.pid,
rid:e.rid||0,
speeds:[]
});
}
function n(e,s,n){
a[e]?(u[e+s]||(u[e+s]=[]),"start"===n?u[e+s][0]=+new Date:"end"===n&&(u[e+s][1]=+new Date)):o(e);
}
function i(e,s,n){
var i=!0;
if(a[e]){
if("string"==typeof s&&1*n){
var t=e+s;
if(u[t][0]&&u[t][1]){
for(var d=u[t][1]-u[t][0],p=d>0?d:0,c=0,l=a[e].speeds.length;l>c;c++){
var m=a[e].speeds[c];
if(m.sid===n){
m.time=p;
break;
}
}
(c===l||0===a[e].speeds.length)&&a[e].speeds.push({
sid:n,
time:p
}),f.saveSpeeds(a[e]),r(e,s);
}else i=!1;
}else if(s&&s.length>0){
for(var c=0,l=s.length;l>c;c++)a[e].speeds.push(s[c]);
f.saveSpeeds(a[e]);
}else i=!1;
return i;
}
o(e),i=!1;
}
function t(e){
a[e]={};
}
function d(e,s){
if(a[e]){
if(f.setBasicTime({
uin:a[e].uin,
pid:a[e].pid,
rid:a[e].rid
}),s&&a[e].speeds.length>=0){
for(var n=0,i=s.length;i>n;n++)a[e].speeds.push(s[n]);
f.saveSpeeds(a[e]);
}
}else o(e);
}
function p(){
f.send();
}
function r(e,s){
u[e+s]=[];
}
function o(e){
console.error("cannot find speed type: %s, please init speeds",e);
}
var f=e("biz_common/utils/wxgspeedsdk.js"),a={},u={};
return{
initSpeeds:s,
saveSpeeds:i,
clearSpeeds:t,
setBasicSpeeds:d,
mark:n,
send:p
};
});