"use strict"
!function(n,e){"function"==typeof define?define("@tencent/wxg-report",e):n.WX_BJ_REPORT=e()}(window,function(){var n=window.WX_BJ_REPORT||{}
return function(s){if(!s.TryJs){var c=window
s.TryJs={isCatchTimeout:!1,isCatchJquery:!1,isCatchCmd:!1,isTryed:!1,_onThrow:function(n){n.stack&&console&&console.error&&console.error(n.stack)}}
var a=function(n,e){return function(){try{return n.apply(this,e||arguments)}catch(n){s.TryJs._onThrow(n)}}},o=function(n,e){return function(){try{return n.apply(this,arguments)}catch(n){s.TryJs._onThrow(n,{cid:e})}}}
return s.TryJs=e(s.TryJs,{init:function(n){n&&(s.TryJs._onThrow=n),t()},catchJquery:n,catchCmd:r,run:t})}function f(n){return"function"==typeof n}function u(o,s){return function(){for(var n,e,r=[],t=0,i=arguments.length;t<i;t++)f(n=arguments[t])&&(e=a(n))&&(n.tryWrap=e)&&(n=e),r.push(n)
return o.apply(s||this,r)}}function n(){if(s.TryJs.isCatchJquery)return s.TryJs
var r=c.jQuery
if(r&&r.event){var n=r.event.add,t=r.ajax,i=r.event.remove
if(n&&(r.event.add=u(n),r.event.remove=function(){for(var n,e=[],r=0,t=arguments.length;r<t;r++)f(n=arguments[r])&&(n=n.tryWrap),e.push(n)
return i.apply(this,e)}),t&&(r.ajax=function(n,e){return e||(e=n,n=void 0),function(n){var e,r
for(e in n)f(r=n[e])&&(n[e]=a(r))}(e),n?t.call(r,n,e):t.call(r,e)}),jQuery.zepto){var e=r.fn.on,o=r.fn.off
r.fn.on=u(e),r.fn.off=function(){for(var n,e=[],r=0,t=arguments.length;r<t;r++)f(n=arguments[r])&&(n=n.tryWrap),e.push(n)
return o.apply(this,e)}}return s.TryJs.isCatchJquery=!0,s.TryJs}}function e(n,e){var r
for(r in e)n[r]=e[r]
return n}function r(){if(s.TryJs.isCatchCmd)return s.TryJs
c.require
var i=c.define
return c.seajs&&i&&(c.define=function(){for(var n,e=[],r=0,t=arguments.length;r<t;r++)f(n=arguments[r])&&((n=o(n,arguments[0])).toString=function(n){return function(){return n.toString()}}(arguments[r])),e.push(n)
return i.apply(this,e)},c.seajs.use=function(i){return function(){for(var n,e=[],r=0,t=arguments.length;r<t;r++)f(n=arguments[r])&&(n=a(n)),e.push(n)
return i.apply(this,e)}}(c.seajs.use),e(c.define,i),s.TryJs.isCatchCmd=!0),s.TryJs}function t(){n(),r(),function(){if(s.TryJs.isCatchTimeout)return s.TryJs
function n(t){return function(n,e){if("string"==typeof n)try{n=new Function(n)}catch(n){throw n}var r=[].slice.call(arguments,2)
return n=a(n,r.length&&r),t(n,e)}}c.setTimeout=n(c.setTimeout),c.setInterval=n(c.setInterval),s.TryJs.isCatchTimeout=!0,s.TryJs}()}}(n),function(o){if(!o.BadJs){var t=function(n,e){for(var r in e)n[r]=e[r]
return n}
return o.BadJs={uin:0,mid:"",_cache:{},_info:{},_hookCallback:null,ignorePath:!0,throw:function(n,e){throw this.onError(n,e),n},onError:function(n,e){try{if(1==n.BADJS_EXCUTED)return
n.BADJS_EXCUTED=!0
var r=function(n){var e=function(n){n._info=n._info||""
var e=n.stack||"",r={info:e,file:n.file||"",line:n.line||"",col:n.col||""}
if(""==r.file){var t=e.split(/\bat\b/)
if(t&&t[1]){var i=/(https?:\/\/[^\n]+)\:(\d+)\:(\d+)/.exec(t[1])
i&&(i[1]&&i[1]!=r.file&&(r.file&&(n._info+=" [file: "+r.file+" ]"),r.file=i[1]),i[2]&&i[2]!=r.line&&(r.line&&(n._info+=" [line: "+r.line+" ]"),r.line=i[2]),i[3]&&i[3]!=r.col&&(r.col&&(n._info+=" [col: "+r.col+" ]"),r.col=i[3]))}}r&&r.file&&0<r.file.length&&(r.info=r.info.replace(new RegExp(r.file.split("?")[0],"gi"),"__FILE__"))
o.BadJs.ignorePath&&(r.info=r.info.replace(/http(s)?\:[^:\n]*\//gi,"").replace(/\n/gi,""))
return r}(n)
return{name:n.name,key:n.message,msg:n.message,stack:e.info,file:e.file,line:e.line,col:e.col,client_version:"",_info:n._info}}(n)
if(r.uin=this.uin,r.mid=this.mid,r.view=this.view,e&&(r=t(r,e)),r.cid&&(r.key="["+r.cid+"]:"+r.key),n._info&&(r.msg+=" || e.info:"+n._info),"{}"!=JSON.stringify(this._info)&&(r.msg+=" || info:"+JSON.stringify(this._info)),"function"==typeof this._hookCallback&&!1===this._hookCallback(r))return
return this._send(r),o.BadJs}catch(n){console.error(n)}},winErr:function(n){if("unhandledrejection"===n.type)o.BadJs.onError(i(n.type,n.reason,"","","",n.reason))
else{if(n.error&&n.error.BADJS_EXCUTED)return
o.BadJs.onError(i("BadjsWindowError",n.message,n.filename,n.lineno,n.colno,n.error))}},init:function(n,e,r){return this.uin=n||this.uin,this.mid=e||this.mid,this.view=r||this.view,o.BadJs},hook:function(n){return this._hookCallback=n,o.BadJs},_send:function(n){if(n.mid){var e=[n.mid,n.name,n.key].join("|")
if(!this._cache||!this._cache[e])return this._cache&&(this._cache[e]=!0),this._xhr(n),o.BadJs}},_xhr:function(n){var e
if(window.ActiveXObject)try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(n){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(n){e=!1}}else window.XMLHttpRequest&&(e=new XMLHttpRequest)
var r=""
for(var t in n)t&&n[t]&&(r+=[t,"=",encodeURIComponent(n[t]),"&"].join(""))
e&&e.open?(e.open("POST","https://badjs.weixinbridge.com/report",!0),e.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),e.onreadystatechange=function(n){},e.send(r.slice(0,-1))):(new Image).src="https://badjs.weixinbridge.com/report?"+r},report:function(n,e,r){return this.onError(i(n,e),r),this},mark:function(n){this._info=t(this._info,n)},nocache:function(){return this._cache=!1,o.BadJs}},o.TryJs.init(function(n,e){o.BadJs.throw.call(o.BadJs,n,e)}),window.addEventListener&&window.addEventListener("error",o.BadJs.winErr),window.addEventListener&&window.addEventListener("unhandledrejection",o.BadJs.winErr),o.BadJs}function i(n,e,r,t,i,o){return{name:n||"",message:e||"",file:r||"",line:t||"",col:i||"",stack:o&&o.stack||""}}}(n),n})
