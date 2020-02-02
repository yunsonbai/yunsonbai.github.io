define("3rd/webuploader/queue.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js","3rd/webuploader/file.js"],function(e,t,u){var n=e("3rd/webuploader/base.js"),s=e("3rd/webuploader/mediator.js"),a=e("3rd/webuploader/file.js"),r=n.$,i=a.Status
function o(){this.stats={numOfQueue:0,numOfSuccess:0,numOfCancel:0,numOfProgress:0,numOfUploadFailed:0,numOfInvalid:0,numofDeleted:0,numofInterrupt:0},this._queue=[],this._map={}}return r.extend(o.prototype,{append:function(e){return this._queue.push(e),this._fileAdded(e),this},prepend:function(e){return this._queue.unshift(e),this._fileAdded(e),this},getFile:function(e){return"string"!=typeof e?e:this._map[e]},fetch:function(e){var t,u,n=this._queue.length
for(e=e||i.QUEUED,t=0;t<n;t++)if(e===(u=this._queue[t]).getStatus())return u
return null},sort:function(e){"function"==typeof e&&this._queue.sort(e)},getFiles:function(){for(var e,t=[].slice.call(arguments,0),u=[],n=0,s=this._queue.length;n<s;n++)e=this._queue[n],t.length&&!~r.inArray(e.getStatus(),t)||u.push(e)
return u},removeFile:function(e){this._map[e.id]&&(delete this._map[e.id],e.destroy(),this.stats.numofDeleted++)},_fileAdded:function(e){var u=this
this._map[e.id]||(this._map[e.id]=e).on("statuschange",function(e,t){u._onFileStatusChange(e,t)})},_onFileStatusChange:function(e,t){var u=this.stats
switch(t){case i.PROGRESS:u.numOfProgress--
break
case i.QUEUED:u.numOfQueue--
break
case i.ERROR:u.numOfUploadFailed--
break
case i.INVALID:u.numOfInvalid--
break
case i.INTERRUPT:u.numofInterrupt--}switch(e){case i.QUEUED:u.numOfQueue++
break
case i.PROGRESS:u.numOfProgress++
break
case i.ERROR:u.numOfUploadFailed++
break
case i.COMPLETE:u.numOfSuccess++
break
case i.CANCELLED:u.numOfCancel++
break
case i.INVALID:u.numOfInvalid++
break
case i.INTERRUPT:u.numofInterrupt++}}}),s.installTo(o.prototype),o})
define("3rd/webuploader/file.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js"],function(t,e,i){var s=t("3rd/webuploader/base.js"),r=t("3rd/webuploader/mediator.js"),a=s.$,d="WU_FILE_",o=0,n=/\.([^.]+)$/,h={}
function u(t){this.name=t.name||"Untitled",this.size=t.size||0,this.width=t.width||-1,this.height=t.height||-1,this.type=t.type||"application/octet-stream",this.lastModifiedDate=t.lastModifiedDate||1*new Date,this.id=d+o++,this.ext=n.exec(this.name)?RegExp.$1:"",this.statusText="",h[this.id]=u.Status.INITED,this.source=t,this.loaded=0,this.on("error",function(t){this.setStatus(u.Status.ERROR,t)})}return a.extend(u.prototype,{setStatus:function(t,e){var i=h[this.id]
void 0!==e&&(this.statusText=e),t!==i&&(h[this.id]=t,this.trigger("statuschange",t,i))},getStatus:function(){return h[this.id]},getSource:function(){return this.source},destroy:function(){this.off(),delete h[this.id]}}),r.installTo(u.prototype),u.Status={INITED:"inited",QUEUED:"queued",PROGRESS:"progress",ERROR:"error",COMPLETE:"complete",CANCELLED:"cancelled",INTERRUPT:"interrupt",INVALID:"invalid"},u})
define("3rd/webuploader/widgets/runtime.js",["3rd/webuploader/uploader.js","3rd/webuploader/runtime/runtime.js","3rd/webuploader/widgets/widget.js"],function(e,r,t){var i=e("3rd/webuploader/uploader.js"),u=e("3rd/webuploader/runtime/runtime.js")
return e("3rd/webuploader/widgets/widget.js"),i.support=function(){return u.hasRuntime.apply(u,arguments)},i.register({name:"runtime",init:function(){if(!this.predictRuntimeType())throw Error("Runtime Error")},predictRuntimeType:function(){var e,r,t=this.options.runtimeOrder||u.orders,i=this.type
if(!i)for(e=0,r=(t=t.split(/\s*,\s*/g)).length;e<r;e++)if(u.hasRuntime(t[e])){this.type=i=t[e]
break}return i}})})
define("3rd/webuploader/widgets/upload.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/file.js","3rd/webuploader/lib/transport.js","3rd/webuploader/widgets/widget.js"],function(t,e,r){var p=t("3rd/webuploader/base.js"),i=t("3rd/webuploader/uploader.js"),n=t("3rd/webuploader/file.js"),c=t("3rd/webuploader/lib/transport.js")
t("3rd/webuploader/widgets/widget.js")
var d=p.$,o=p.isPromise,f=n.Status
d.extend(i.options,{prepareNextFile:!1,chunked:!1,chunkSize:5242880,chunkRetry:2,threads:3,formData:{}}),i.register({name:"upload",init:function(){var t=this.owner,e=this
this.runing=!1,this.progress=!1,t.on("startUpload",function(){e.progress=!0}).on("uploadFinished",function(){e.progress=!1}),this.pool=[],this.stack=[],this.pending=[],this.remaning=0,this.__tick=p.bindFn(this._tick,this),t.on("uploadComplete",function(t){t.blocks&&d.each(t.blocks,function(t,e){e.transport&&(e.transport.abort(),e.transport.destroy()),delete e.transport}),delete t.blocks,delete t.remaning})},reset:function(){this.request("stop-upload",!0),this.runing=!1,this.pool=[],this.stack=[],this.pending=[],this.remaning=0,this._trigged=!1,this._promise=null},startUpload:function(r){var i=this
if(d.each(i.request("get-files",f.INVALID),function(){i.request("remove-file",this)}),r)if((r=r.id?r:i.request("get-file",r)).getStatus()===f.INTERRUPT)d.each(i.pool,function(t,e){e.file===r&&e.transport&&e.transport.send()}),r.setStatus(f.QUEUED)
else{if(r.getStatus()===f.PROGRESS)return
r.setStatus(f.QUEUED)}else d.each(i.request("get-files",[f.INITED]),function(){this.setStatus(f.QUEUED)})
if(!i.runing){i.runing=!0
var n=[]
for(d.each(i.pool,function(t,e){var r=e.file
r.getStatus()===f.INTERRUPT&&(n.push(r),i._trigged=!1,e.transport&&e.transport.send())});r=n.shift();)r.setStatus(f.PROGRESS)
r||d.each(i.request("get-files",f.INTERRUPT),function(){this.setStatus(f.PROGRESS)}),i._trigged=!1,p.nextTick(i.__tick),i.owner.trigger("startUpload")}},stopUpload:function(r,t){var i=this
if(!0===r&&(t=r,r=null),!1!==i.runing){if(r){if((r=r.id?r:i.request("get-file",r)).getStatus()!==f.PROGRESS&&r.getStatus()!==f.QUEUED)return
return r.setStatus(f.INTERRUPT),d.each(i.pool,function(t,e){e.file===r&&(e.transport&&e.transport.abort(),i._putback(e),i._popBlock(e))}),p.nextTick(i.__tick)}i.runing=!1,this._promise&&this._promise.file&&this._promise.file.setStatus(f.INTERRUPT),t&&d.each(i.pool,function(t,e){e.transport&&e.transport.abort(),e.file.setStatus(f.INTERRUPT)}),i.owner.trigger("stopUpload")}},cancelFile:function(t){(t=t.id?t:this.request("get-file",t)).blocks&&d.each(t.blocks,function(t,e){var r=e.transport
r&&(r.abort(),r.destroy(),delete e.transport)}),t.setStatus(f.CANCELLED),this.owner.trigger("fileDequeued",t)},isInProgress:function(){return!!this.progress},_getStats:function(){return this.request("get-stats")},skipFile:function(t,e){(t=t.id?t:this.request("get-file",t)).setStatus(e||f.COMPLETE),t.skipped=!0,t.blocks&&d.each(t.blocks,function(t,e){var r=e.transport
r&&(r.abort(),r.destroy(),delete e.transport)}),this.owner.trigger("uploadSkip",t)},_tick:function(){var t,e,r=this,i=r.options
if(r._promise)return r._promise.always(r.__tick)
r.pool.length<i.threads&&(e=r._nextBlock())?(r._trigged=!1,t=function(t){r._promise=null,t&&t.file&&r._startSend(t),p.nextTick(r.__tick)},r._promise=o(e)?e.always(t):t(e)):r.remaning||r._getStats().numOfQueue||r._getStats().numofInterrupt||(r.runing=!1,r._trigged||p.nextTick(function(){r.owner.trigger("uploadFinished",r._getStats())}),r._trigged=!0)},_putback:function(t){t.cuted.unshift(t),~this.stack.indexOf(t.cuted)||this.stack.unshift(t.cuted)},_getStack:function(){for(var t,e=0;t=this.stack[e++];){if(t.has()&&t.file.getStatus()===f.PROGRESS)return t
t.has()&&(t.file.getStatus()===f.PROGRESS||t.file.getStatus()===f.INTERRUPT)||this.stack.splice(--e,1)}return null},_nextBlock:function(){var e,t,r,i,n=this,s=n.options
return(e=this._getStack())?(s.prepareNextFile&&!n.pending.length&&n._prepareNextFile(),e.shift()):n.runing?(!n.pending.length&&n._getStats().numOfQueue&&n._prepareNextFile(),t=n.pending.shift(),r=function(t){return t?(e=function(t,e){var r,i,n=[],s=t.source.size,o=e?Math.ceil(s/e):1,a=0,u=0
for(i={file:t,has:function(){return!!n.length},shift:function(){return n.shift()},unshift:function(t){n.unshift(t)}};u<o;)r=Math.min(e,s-a),n.push({file:t,start:a,end:e?a+r:s,total:s,chunks:o,chunk:u++,cuted:i}),a+=r
return t.blocks=n.concat(),t.remaning=n.length,i}(t,s.chunked?s.chunkSize:0),n.stack.push(e),e.shift()):null},o(t)?(i=t.file,(t=t[t.pipe?"pipe":"then"](r)).file=i,t):r(t)):void 0},_prepareNextFile:function(){var e,r=this,i=r.request("fetch-file"),n=r.pending
i&&(e=r.request("before-send-file",i,function(){return i.getStatus()===f.PROGRESS||i.getStatus()===f.INTERRUPT?i:r._finishFile(i)}),r.owner.trigger("uploadStart",i),i.setStatus(f.PROGRESS),e.file=i,e.done(function(){var t=d.inArray(e,n)
~t&&n.splice(t,1,i)}),e.fail(function(t){var e=r.options.compress
i.setStatus(f.ERROR,t),"F_EXCEED_COMPRESS_SIZE"==t&&r.owner.trigger("error",t,e&&e.afterCompressSizeLimit,i),r.owner.trigger("uploadError",i,t),r.owner.trigger("uploadComplete",i)}),n.push(e))},_popBlock:function(t){var e=d.inArray(t,this.pool)
this.pool.splice(e,1),t.file.remaning--,this.remaning--},_startSend:function(t){var e=this,r=t.file
r.getStatus()===f.PROGRESS?(e.pool.push(t),e.remaning++,t.blob=1===t.chunks?r.source:r.source.slice(t.start,t.end),e.request("before-send",t,function(){r.getStatus()===f.PROGRESS?e._doSend(t):(e._popBlock(t),p.nextTick(e.__tick))}).fail(function(){1===r.remaning?e._finishFile(r).always(function(){t.percentage=1,e._popBlock(t),e.owner.trigger("uploadComplete",r),p.nextTick(e.__tick)}):(t.percentage=1,e.updateFileProgress(r),e._popBlock(t),p.nextTick(e.__tick))})):r.getStatus()===f.INTERRUPT&&e._putback(t)},_doSend:function(r){var i,n,e=this,s=e.owner,o=e.options,a=r.file,u=new c(o),t=d.extend({},o.formData),l=d.extend({},o.headers);(r.transport=u).on("destroy",function(){delete r.transport,e._popBlock(r),p.nextTick(e.__tick)}),u.on("progress",function(t){r.percentage=t,e.updateFileProgress(a)}),i=function(e){var t
return(n=u.getResponseAsJson()||{})._raw=u.getResponse(),t=function(t){e=t},s.trigger("uploadAccept",r,n,t)||(e=e||"server"),e},u.on("error",function(t,e){r.retried=r.retried||0,1<r.chunks&&~"http,abort".indexOf(t)&&r.retried<o.chunkRetry?(r.retried++,u.send()):(e||"server"!==t||(t=i(t)),a.setStatus(f.ERROR,t),s.trigger("uploadError",a,t),s.trigger("uploadComplete",a))}),u.on("load",function(){var t;(t=i())?u.trigger("error",t,!0):1===a.remaning?e._finishFile(a,n):u.destroy()}),t=d.extend(t,{id:a.id,name:a.name,type:a.type,lastModifiedDate:a.lastModifiedDate,size:a.size}),1<r.chunks&&d.extend(t,{chunks:r.chunks,chunk:r.chunk}),s.trigger("uploadBeforeSend",r,t,l),u.appendBlob(o.fileVal,r.blob,a.name),u.append(t),u.setRequestHeader(l),u.send()},_finishFile:function(e,t,r){var i=this,n=this.owner
return n.request("after-send-file",arguments,function(){e.setStatus(f.COMPLETE),n.trigger("uploadSuccess",e,t,i._getStats(),r)}).fail(function(t){e.getStatus()===f.PROGRESS&&e.setStatus(f.ERROR,t),n.trigger("uploadError",e,t)}).always(function(){n.trigger("uploadComplete",e)})},updateFileProgress:function(t){var e,r=0
t.blocks&&(d.each(t.blocks,function(t,e){r+=(e.percentage||0)*(e.end-e.start)}),e=r/t.size,this.owner.trigger("uploadProgress",t,e||0))}})})
define("3rd/webuploader/lib/transport.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js","3rd/webuploader/mediator.js"],function(e,t,i){var o=e("3rd/webuploader/base.js"),r=e("3rd/webuploader/runtime/client.js"),n=e("3rd/webuploader/mediator.js"),s=o.$
function a(e){var t=this
e=t.options=s.extend(!0,{},a.options,e||{}),r.call(this,"Transport"),this._blob=null,this._formData=e.formData||{},this._headers=e.headers||{},this.on("progress",this._timeout),this.on("load error",function(){t.trigger("progress",1),clearTimeout(t._timer)})}return a.options={server:"",method:"POST",withCredentials:!1,fileVal:"file",timeout:12e4,formData:{},headers:{},sendAsBinary:!1},s.extend(a.prototype,{appendBlob:function(e,t,i){var o=this,r=o.options
o.getRuid()&&o.disconnectRuntime(),o.connectRuntime(t.ruid,function(){o.exec("init")}),o._blob=t,r.fileVal=e||r.fileVal,r.filename=i||r.filename},append:function(e,t){"object"==typeof e?s.extend(this._formData,e):this._formData[e]=t},setRequestHeader:function(e,t){"object"==typeof e?s.extend(this._headers,e):this._headers[e]=t},send:function(e){this.exec("send",e),this._timeout()},abort:function(){return clearTimeout(this._timer),this.exec("abort")},destroy:function(){this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime()},getResponse:function(){return this.exec("getResponse")},getResponseAsJson:function(){return this.exec("getResponseAsJson")},getStatus:function(){return this.exec("getStatus")},_timeout:function(){var e=this,t=e.options.timeout
t&&(clearTimeout(e._timer),e._timer=setTimeout(function(){e.abort(),e.trigger("error","timeout")},t))}}),n.installTo(a.prototype),a})
define("3rd/webuploader/widgets/validator.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/file.js","3rd/webuploader/widgets/widget.js"],function(e,i,t){var r=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/uploader.js"),o=e("3rd/webuploader/file.js")
e("3rd/webuploader/widgets/widget.js")
var u,a=r.$,d={}
return u={addValidator:function(e,i){d[e]=i},removeValidator:function(e){delete d[e]}},n.register({name:"validator",init:function(){var e=this
r.nextTick(function(){a.each(d,function(){this.call(e.owner)})})}}),u.addValidator("fileNumLimit",function(){var e=this,i=e.options,t=0,r=parseInt(i.fileNumLimit,10),n=!0
r&&(e.on("beforeFileQueued",function(e){return r<=t&&n&&(n=!1,this.trigger("error","Q_EXCEED_NUM_LIMIT",r,e),setTimeout(function(){n=!0},1)),!(r<=t)}),e.on("fileQueued",function(){t++}),e.on("fileDequeued",function(){t--}),e.on("reset",function(){t=0}))}),u.addValidator("fileSizeLimit",function(){var e=this,i=e.options,t=0,r=parseInt(i.fileSizeLimit,10),n=!0
r&&(e.on("beforeFileQueued",function(e){var i=t+e.size>r
return i&&n&&(n=!1,this.trigger("error","Q_EXCEED_SIZE_LIMIT",r,e),setTimeout(function(){n=!0},1)),!i}),e.on("fileQueued",function(e){t+=e.size}),e.on("fileDequeued",function(e){t-=e.size}),e.on("reset",function(){t=0}))}),u.addValidator("fileSingleSizeLimit",function(){var i=this.options.fileSingleSizeLimit
i&&this.on("beforeFileQueued",function(e){if(e.size>i)return e.setStatus(o.Status.INVALID,"exceed_size"),this.trigger("error","F_EXCEED_SIZE",i,e),!1})}),u.addValidator("duplicate",function(){var e=this,i=e.options,t={}
i.duplicate||(e.on("beforeFileQueued",function(e){var i=e.__hash||(e.__hash=function(e){for(var i=0,t=0,r=e.length;t<r;t++)i=e.charCodeAt(t)+(i<<6)+(i<<16)-i
return i}(e.name+e.size+e.lastModifiedDate))
if(t[i])return this.trigger("error","F_DUPLICATE",e),!1}),e.on("fileQueued",function(e){var i=e.__hash
i&&(t[i]=!0)}),e.on("fileDequeued",function(e){var i=e.__hash
i&&delete t[i]}),e.on("reset",function(){t={}}))}),u})
define("3rd/webuploader/widgets/image.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/lib/image.js","3rd/webuploader/widgets/widget.js"],function(e,i,o){var n=e("3rd/webuploader/base.js"),m=e("3rd/webuploader/uploader.js"),l=e("3rd/webuploader/lib/image.js")
e("3rd/webuploader/widgets/widget.js")
var a,t,r,d=n.$
function s(){for(var e;r.length&&t<5242880;)e=r.shift(),t+=e[0],e[1]()}return t=0,r=[],a=function(e,i,o){r.push([i,o]),e.once("destroy",function(){t-=i,setTimeout(s,1)}),setTimeout(s,1)},d.extend(m.options,{thumb:{width:110,height:110,quality:70,allowMagnify:!0,crop:!0,preserveHeaders:!1,type:"image/jpeg"},compress:{width:1600,height:1600,quality:90,allowMagnify:!1,crop:!1,preserveHeaders:!1}}),m.register({name:"image",makeThumb:function(e,i,o,t){var r,s;(e=this.request("get-file",e)).type.match(/^image/)?(r=d.extend({},this.options.thumb),d.isPlainObject(o)&&(r=d.extend(r,o),o=null),o=o||r.width,t=t||r.height,(s=new l(r)).once("load",function(){e._info=e._info||s.info(),e._meta=e._meta||s.meta(),o<=1&&0<o&&(o=e._info.width*o),t<=1&&0<t&&(t=e._info.height*t),s.resize(o,t)}),s.once("complete",function(){i(!1,s.getAsDataUrl(r.type)),s.destroy()}),s.once("error",function(e){i(e||!0),s.destroy()}),a(s,e.source.size,function(){e._info&&s.info(e._info),e._meta&&s.meta(e._meta),s.loadFromBlob(e.source)})):i(!0)},beforeSendFile:function(o){var t,r,s=this.options.compress||this.options.resize,e=s&&s.compressSize||0,a=s&&s.noCompressIfLarger||!1
o=this.request("get-file",o)
var i=!!(wx&&wx.commonData&&wx.commonData.acl&&wx.commonData.acl.msg_acl&&wx.commonData.acl.msg_acl.can_upload_2m_more_gif)
return s&&~"image/gif".indexOf(o.type)&&o.size>s.afterCompressSizeLimit&&!i?(r=n.Deferred(),setTimeout(function(){r.reject("F_EXCEED_COMPRESS_SIZE")},0),r.promise()):!s||!~"image/jpeg,image/jpg,image/png,image/bmp".indexOf(o.type)||o.size<e||o._compressed?void 0:(s=d.extend({},s),r=n.Deferred(),t=new l(s),r.always(function(){t.destroy(),t=null}),t.once("error",r.reject),t.once("load",function(){var e=s.width,i=s.height
o._info=o._info||t.info(),o._meta=o._meta||t.meta(),e<=1&&0<e&&(e=o._info.width*e),i<=1&&0<i&&(i=o._info.height*i),s.resizeSize&&o.size<s.resizeSize&&(!s.maxResolution||o._info.width*o._info.height<s.maxResolution)?t.resize(o._info.width,o._info.height):t.resize(e,i)}),t.once("complete",function(){var e,i
try{i=o.size,e=function e(i,o,t,r){var s,a
return i*=t.quality/100,s=m.support("html5")?o.getAsBlob(t.type,0|i):o.getAsBlob(t.type),console.log(s.size,0|i),a=r.size,s.size<a&&t.afterCompressSizeLimit&&s.size>t.afterCompressSizeLimit&&40<i&&(r.size=s.size,i=e(i,o,t,r).quality),{quality:i,blob:s}}(100,t,s,{source:o.source,size:o.size}).blob,(!a||e.size<i)&&(o.source=e,o.size=e.size,o.trigger("resize",e.size,i)),o._compressed=!0,o.size>s.afterCompressSizeLimit?r.reject("F_EXCEED_COMPRESS_SIZE"):r.resolve()}catch(e){o.size>s.afterCompressSizeLimit?r.reject("F_EXCEED_COMPRESS_SIZE"):r.resolve()}}),o._info&&t.info(o._info),o._meta&&t.meta(o._meta),t.loadFromBlob(o.source),r.promise())}})})
define("3rd/webuploader/runtime/html5/blob.js",["3rd/webuploader/runtime/html5/runtime.js","3rd/webuploader/lib/blob.js"],function(e,r,l){var i=e("3rd/webuploader/runtime/html5/runtime.js"),t=e("3rd/webuploader/lib/blob.js")
return i.register("Blob",{slice:function(e,r){var l=this.owner.source
return l=(l.slice||l.webkitSlice||l.mozSlice).call(l,e,r),new t(this.getRuid(),l)}})})
define("3rd/webuploader/runtime/html5/runtime.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/runtime.js","3rd/webuploader/runtime/compbase.js"],function(e,r,t){var o=e("3rd/webuploader/base.js"),i=e("3rd/webuploader/runtime/runtime.js"),n=e("3rd/webuploader/runtime/compbase.js"),s="html5",a={}
function u(){var u={},d=this,e=this.destroy
i.apply(d,arguments),d.type=s,d.exec=function(e,r){var t,i=this.uid,n=o.slice(arguments,2)
if(a[e]&&(t=u[i]=u[i]||new a[e](this,d))[r])return t[r].apply(t,n)},d.destroy=function(){return e&&e.apply(this,arguments)}}return o.inherits(i,{constructor:u,init:function(){var e=this
setTimeout(function(){e.trigger("ready")},1)}}),u.register=function(e,r){return a[e]=o.inherits(n,r)},window.Blob&&window.FileReader&&window.DataView&&i.addRuntime(s,u),u})
define("3rd/webuploader/runtime/compbase.js",[],function(t,n,i){return function(t,n){this.owner=t,this.options=t.options,this.getRuntime=function(){return n},this.getRuid=function(){return n.uid},this.trigger=function(){return t.trigger.apply(t,arguments)}}})
define("3rd/webuploader/runtime/html5/filepicker.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/html5/runtime.js","3rd/webuploader/runtime/html5/util.js"],function(e,t,i){var n=e("3rd/webuploader/base.js"),r=e("3rd/webuploader/runtime/html5/runtime.js"),s=(e("3rd/webuploader/runtime/html5/util.js"),n.$)
return r.register("FilePicker",{init:function(){var e,t,i,n,r=this.getRuntime().getContainer(),l=this,a=l.owner,o=l.options,u=this.label=s(document.createElement("label")),c=this.input=s(document.createElement("input"))
if(c.attr("type","file"),c.attr("name",o.name),c.css("display","none"),u.on("click",function(){c.trigger("click")}),u.css({opacity:0,width:"100%",height:"100%",display:"block",cursor:"pointer",background:"#ffffff"}),o.multiple&&c.attr("multiple","multiple"),o.accept&&0<o.accept.length){for(e=[],t=0,i=o.accept.length;t<i;t++)e.push(o.accept[t].mimeTypes)
c.attr("accept",e.join(","))}r.append(c),r.append(u),n=function(e){a.trigger(e.type)},c.on("change",function(e){var t,i=arguments.callee
l.files=e.target.files,(t=this.cloneNode(!0)).value=null,this.parentNode.replaceChild(t,this),c.off(),c=s(t).on("change",i).on("mouseenter mouseleave",n),a.trigger("change")}),u.on("mouseenter mouseleave",n)},getFiles:function(){return this.files},destroy:function(){this.input.off(),this.label.off()}})})
define("3rd/webuploader/runtime/html5/util.js",["3rd/webuploader/base.js"],function(e,r,t){var n=e("3rd/webuploader/base.js"),o=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL,a=n.noop,i=a
return o&&(a=function(){return o.createObjectURL.apply(o,arguments)},i=function(){return o.revokeObjectURL.apply(o,arguments)}),{createObjectURL:a,revokeObjectURL:i,dataURL2Blob:function(e){var r,t,n,o,a,i
for(r=~(i=e.split(","))[0].indexOf("base64")?atob(i[1]):decodeURIComponent(i[1]),n=new ArrayBuffer(r.length),t=new Uint8Array(n),o=0;o<r.length;o++)t[o]=r.charCodeAt(o)
return a=i[0].split(":")[1].split(";")[0],this.arrayBufferToBlob(n,a)},dataURL2ArrayBuffer:function(e){var r,t,n,o
for(r=~(o=e.split(","))[0].indexOf("base64")?atob(o[1]):decodeURIComponent(o[1]),t=new Uint8Array(r.length),n=0;n<r.length;n++)t[n]=r.charCodeAt(n)
return t.buffer},arrayBufferToBlob:function(e,r){var t,n=window.BlobBuilder||window.WebKitBlobBuilder
return n?((t=new n).append(e),t.getBlob(r)):new Blob([e],r?{type:r}:{})},canvasToDataUrl:function(e,r,t){return e.toDataURL(r,t/100)},parseMeta:function(e,r){r(!1,{})},updateImageHead:function(e){return e}}})
define("3rd/webuploader/runtime/html5/imagemeta/exif.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/html5/imagemeta.js"],function(e,t,i){var p=e("3rd/webuploader/base.js"),a=e("3rd/webuploader/runtime/html5/imagemeta.js"),x={ExifMap:function(){return this}}
return x.ExifMap.prototype.map={Orientation:274},x.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},x.exifTagTypes={1:{getValue:function(e,t){return e.getUint8(t)},size:1},2:{getValue:function(e,t){return String.fromCharCode(e.getUint8(t))},size:1,ascii:!0},3:{getValue:function(e,t,i){return e.getUint16(t,i)},size:2},4:{getValue:function(e,t,i){return e.getUint32(t,i)},size:4},5:{getValue:function(e,t,i){return e.getUint32(t,i)/e.getUint32(t+4,i)},size:8},9:{getValue:function(e,t,i){return e.getInt32(t,i)},size:4},10:{getValue:function(e,t,i){return e.getInt32(t,i)/e.getInt32(t+4,i)},size:8}},x.exifTagTypes[7]=x.exifTagTypes[1],x.getExifValue=function(e,t,i,a,n,r){var g,f,s,u,l,o,d=x.exifTagTypes[a]
if(d){if(!((f=4<(g=d.size*n)?t+e.getUint32(i+8,r):i+8)+g>e.byteLength)){if(1===n)return d.getValue(e,f,r)
for(s=[],u=0;u<n;u+=1)s[u]=d.getValue(e,f+u*d.size,r)
if(d.ascii){for(l="",u=0;u<s.length&&"\0"!==(o=s[u]);u+=1)l+=o
return l}return s}p.log("Invalid Exif data: Invalid data offset.")}else p.log("Invalid Exif data: Invalid tag type.")},x.parseExifTag=function(e,t,i,a,n){var r=e.getUint16(i,a)
n.exif[r]=x.getExifValue(e,t,i,e.getUint16(i+2,a),e.getUint32(i+4,a),a)},x.parseExifTags=function(e,t,i,a,n){var r,g,f
if(i+6>e.byteLength)p.log("Invalid Exif data: Invalid directory offset.")
else{if(!((g=i+2+12*(r=e.getUint16(i,a)))+4>e.byteLength)){for(f=0;f<r;f+=1)this.parseExifTag(e,t,i+2+12*f,a,n)
return e.getUint32(g,a)}p.log("Invalid Exif data: Invalid directory size.")}},x.parseExifData=function(e,t,i,a){var n,r,g=t+10
if(1165519206===e.getUint32(t+4))if(g+8>e.byteLength)p.log("Invalid Exif data: Invalid segment size.")
else if(0===e.getUint16(t+8)){switch(e.getUint16(g)){case 18761:n=!0
break
case 19789:n=!1
break
default:return void p.log("Invalid Exif data: Invalid byte alignment marker.")}42===e.getUint16(g+2,n)?(r=e.getUint32(g+4,n),a.exif=new x.ExifMap,r=x.parseExifTags(e,g,g+r,n,a)):p.log("Invalid Exif data: Missing TIFF marker.")}else p.log("Invalid Exif data: Missing byte alignment offset.")},a.parsers[65505].push(x.parseExifData),x})
define("3rd/webuploader/runtime/html5/imagemeta.js",["3rd/webuploader/runtime/html5/util.js"],function(e,a,r){var o,t=e("3rd/webuploader/runtime/html5/util.js")
return o={parsers:{65505:[]},maxMetaDataSize:262144,parse:function(e,a){var r=this,t=new FileReader
t.onload=function(){a(!1,r._parse(this.result)),t=t.onload=t.onerror=null},t.onerror=function(e){a(e.message),t=t.onload=t.onerror=null},e=e.slice(0,r.maxMetaDataSize),t.readAsArrayBuffer(e.getSource())},_parse:function(e,a){if(!(e.byteLength<6)){var r,t,n,i,g=new DataView(e),s=2,u=g.byteLength-4,l=s,m={}
if(65496===g.getUint16(0)){for(;s<u&&(65504<=(r=g.getUint16(s))&&r<=65519||65534===r)&&!(s+(t=g.getUint16(s+2)+2)>g.byteLength);){if(n=o.parsers[r],!a&&n)for(i=0;i<n.length;i+=1)n[i].call(o,g,s,t,m)
l=s+=t}6<l&&(e.slice?m.imageHead=e.slice(2,l):m.imageHead=new Uint8Array(e).subarray(2,l))}switch(g.getUint16(0)){case 65496:m.imageType="image/jpeg"
break
case 35152:m.imageType="image/png"
break
case 16973:m.imageType="image/bmp"
break
case 18249:70==g.getUint8(2)&&(m.imageType="image/gif")}return m}},updateImageHead:function(e,a){var r,t,n,i=this._parse(e,!0)
return n=2,i.imageHead&&(n=2+i.imageHead.byteLength),t=e.slice?e.slice(n):new Uint8Array(e).subarray(n),(r=new Uint8Array(a.byteLength+2+t.byteLength))[0]=255,r[1]=216,r.set(new Uint8Array(a),2),r.set(new Uint8Array(t),a.byteLength+2),r.buffer}},t.parseMeta=function(){return o.parse.apply(o,arguments)},t.updateImageHead=function(){return o.updateImageHead.apply(o,arguments)},o})
define("3rd/webuploader/runtime/html5/transport.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/html5/runtime.js"],function(e,t,r){var u=e("3rd/webuploader/base.js"),s=e("3rd/webuploader/runtime/html5/runtime.js"),n=u.noop,d=u.$
return s.register("Transport",{init:function(){this._status=0,this._response=null},send:function(){var r,e,t,s=this.owner,n=this.options,a=this._initAjax(),o=s._blob,i=n.server
i+="&seq="+(wx&&wx.getSeq()),n.sendAsBinary?(i+=(/\?/.test(i)?"&":"?")+d.param(s._formData),e=o.getSource()):(r=new FormData,d.each(s._formData,function(e,t){r.append(e,t)}),r.append(n.fileVal,o.getSource(),n.filename||s._formData.name||"")),n.withCredentials&&"withCredentials"in a?(a.open(n.method,i,!0),a.withCredentials=!0):a.open(n.method,i),this._setRequestHeader(a,n.headers),e?(a.overrideMimeType&&a.overrideMimeType("application/octet-stream"),u.os.android?((t=new FileReader).onload=function(){a.send(this.result),t=t.onload=null},t.readAsArrayBuffer(e)):a.send(e)):a.send(r)},getResponse:function(){return this._response},getResponseAsJson:function(){return this._parseJson(this._response)},getStatus:function(){return this._status},abort:function(){var e=this._xhr
e&&(e.upload.onprogress=n,e.onreadystatechange=n,e.abort(),this._xhr=e=null)},destroy:function(){this.abort()},_initAjax:function(){var r=this,e=new XMLHttpRequest
return!this.options.withCredentials||"withCredentials"in e||"undefined"==typeof XDomainRequest||(e=new XDomainRequest),e.upload.onprogress=function(e){var t=0
return e.lengthComputable&&(t=e.loaded/e.total),r.trigger("progress",t)},e.onreadystatechange=function(){if(4===e.readyState)return e.upload.onprogress=n,e.onreadystatechange=n,r._xhr=null,r._status=e.status,200<=e.status&&e.status<300?(r._response=e.responseText,r.trigger("load")):500<=e.status&&e.status<600?(r._response=e.responseText,r.trigger("error","server")):r.trigger("error",r._status?"http":"abort")},r._xhr=e},_setRequestHeader:function(r,e){d.each(e,function(e,t){r.setRequestHeader(e,t)})},_parseJson:function(e){var t
try{t=JSON.parse(e)}catch(e){t={}}return t}})})
define("3rd/webuploader/runtime/html5/image.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/html5/runtime.js","3rd/webuploader/runtime/html5/util.js"],function(t,e,a){var i=t("3rd/webuploader/base.js"),r=t("3rd/webuploader/runtime/html5/runtime.js"),n=t("3rd/webuploader/runtime/html5/util.js")
return r.register("Image",{modified:!1,init:function(){var a=this,t=new Image
t.onload=function(){a._info={type:a.type,width:this.width,height:this.height},a._metas||"image/jpeg"!==a.type?a.owner.trigger("load"):n.parseMeta(a._blob,function(t,e){a._metas=e
try{a._info.type=a._blob.type=a.type=e.imageType}catch(t){}a.owner.trigger("load")})},t.onerror=function(){a.owner.trigger("error")},a._img=t},loadFromBlob:function(t){var e=this,a=e._img
e._blob=t,e.type=t.type,a.src=n.createObjectURL(t.getSource()),e.owner.once("load",function(){n.revokeObjectURL(a.src)})},resize:function(t,e){var a=this._canvas||(this._canvas=document.createElement("canvas"))
this._resize(this._img,a,t,e),this._blob=null,this.modified=!0,this.owner.trigger("complete","resize")},crop:function(t,e,a,i,r){var n=this._canvas||(this._canvas=document.createElement("canvas")),s=this.options,o=this._img,h=o.naturalWidth,c=o.naturalHeight,l=this.getOrientation()
r=r||1,n.width=a,n.height=i,s.preserveHeaders||this._rotate2Orientaion(n,l),this._renderImageToCanvas(n,o,-t,-e,h*r,c*r),this._blob=null,this.modified=!0,this.owner.trigger("complete","crop")},getAsBlob:function(t,e){var a,i=this._blob,r=this.options
if(t=t||this.type,this.modified||this.type!==t){if(a=this._canvas,"image/jpeg"===t){if(i=n.canvasToDataUrl(a,t,e||r.quality),r.preserveHeaders&&this._metas&&this._metas.imageHead)return i=n.dataURL2ArrayBuffer(i),i=n.updateImageHead(i,this._metas.imageHead),i=n.arrayBufferToBlob(i,t)}else i=n.canvasToDataUrl(a,t)
i=n.dataURL2Blob(i)}return i},getAsDataUrl:function(t){var e=this.options
return"image/jpeg"===(t=t||this.type)?n.canvasToDataUrl(this._canvas,t,e.quality):this._canvas.toDataURL(t)},getOrientation:function(){return this._metas&&this._metas.exif&&this._metas.exif.get("Orientation")||1},info:function(t){return t?(this._info=t,this):this._info},meta:function(t){return t?(this._meta=t,this):this._meta},destroy:function(){var t=this._canvas
this._img.onload=null,t&&(t.getContext("2d").clearRect(0,0,t.width,t.height),t.width=t.height=0,this._canvas=null),this._img.src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D",this._img=this._blob=null},_resize:function(t,e,a,i){var r,n,s,o,h,c=this.options,l=t.width,d=t.height,g=this.getOrientation()
~[5,6,7,8].indexOf(g)&&(a^=i,a^=i^=a),r=Math[c.crop?"max":"min"](a/l,i/d),c.allowMagnify||(r=Math.min(1,r)),n=l*r,s=d*r,c.crop?(e.width=a,e.height=i):(e.width=n,e.height=s),o=(e.width-n)/2,h=(e.height-s)/2,c.preserveHeaders||this._rotate2Orientaion(e,g),this._renderImageToCanvas(e,t,o,h,n,s)},_rotate2Orientaion:function(t,e){var a=t.width,i=t.height,r=t.getContext("2d")
1!==e&&(document.createElement("img").src="/mp/jsmonitor?idkey=65080_118_1")
switch(e){case 5:case 6:case 7:case 8:t.width=i,t.height=a}switch(e){case 2:r.translate(a,0),r.scale(-1,1)
break
case 3:r.translate(a,i),r.rotate(Math.PI)
break
case 4:r.translate(0,i),r.scale(1,-1)
break
case 5:r.rotate(.5*Math.PI),r.scale(1,-1)
break
case 6:r.rotate(.5*Math.PI),r.translate(0,-i)
break
case 7:r.rotate(.5*Math.PI),r.translate(a,-i),r.scale(-1,1)
break
case 8:r.rotate(-.5*Math.PI),r.translate(-a,0)}},_renderImageToCanvas:function(){if(!i.os.ios)return function(t){var e=i.slice(arguments,1),a=t.getContext("2d")
a.drawImage.apply(a,e)}
function y(t,e,a){var i,r,n=document.createElement("canvas"),s=n.getContext("2d"),o=0,h=a,c=a
for(n.width=1,n.height=a,s.drawImage(t,0,0),i=s.getImageData(0,0,1,a).data;o<c;)0===i[4*(c-1)+3]?h=c:o=c,c=h+o>>1
return 0==(r=c/a)?1:r}if(7<=i.os.ios)return function(t,e,a,i,r,n){var s=e.naturalWidth,o=e.naturalHeight,h=y(e,0,o)
return t.getContext("2d").drawImage(e,0,0,s*h,o*h,a,i,r,n)}
return function(t,e,a,i,r,n){var s,o,h,c,l,d,g,m=e.naturalWidth,u=e.naturalHeight,f=t.getContext("2d"),_=function(t){var e,a,i=t.naturalWidth
return 1048576<i*t.naturalHeight&&((e=document.createElement("canvas")).width=e.height=1,(a=e.getContext("2d")).drawImage(t,1-i,0),0===a.getImageData(0,0,1,1).data[3])}(e),p="image/jpeg"===this.type,v=1024,w=0,b=0
for(_&&(m/=2,u/=2),f.save(),(s=document.createElement("canvas")).width=s.height=v,o=s.getContext("2d"),h=p?y(e,0,u):1,c=Math.ceil(v*r/m),l=Math.ceil(v*n/u/h);w<u;){for(g=d=0;d<m;)o.clearRect(0,0,v,v),o.drawImage(e,-d,-w),f.drawImage(s,0,0,v,v,a+g,i+b,c,l),d+=v,g+=c
w+=v,b+=l}f.restore(),s=o=null}}()})})
