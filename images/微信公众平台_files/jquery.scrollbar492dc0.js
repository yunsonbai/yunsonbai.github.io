define("biz_common/jquery.validate.js",[],function(){
!function(t){
t.extend(t.fn,{
validate:function(e){
if(!this.length)return void(e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));
var i=t.data(this[0],"validator");
return i?i:(this.attr("novalidate","novalidate"),i=new t.validator(e,this[0]),t.data(this[0],"validator",i),
i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(e){
i.settings.submitHandler&&(i.submitButton=e.target),t(e.target).hasClass("cancel")&&(i.cancelSubmit=!0),
void 0!==t(e.target).attr("formnovalidate")&&(i.cancelSubmit=!0);
}),this.submit(function(e){
function r(){
var r;
return i.settings.submitHandler?(i.submitButton&&(r=t("<input type='hidden'/>").attr("name",i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),
i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&r.remove(),!1):!0;
}
return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,r()):i.form()?i.pendingRequest?(i.formSubmitted=!0,
!1):r():(i.focusInvalid(),!1);
})),i);
},
valid:function(){
if(t(this[0]).is("form"))return this.validate().form();
var e=!0,i=t(this[0].form).validate();
return this.each(function(){
e=e&&i.element(this);
}),e;
},
removeAttrs:function(e){
var i={},r=this;
return t.each(e.split(/\s/),function(t,e){
i[e]=r.attr(e),r.removeAttr(e);
}),i;
},
rules:function(e,i){
var r=this[0];
if(e){
var n=t.data(r.form,"validator").settings,s=n.rules,a=t.validator.staticRules(r);
switch(e){
case"add":
t.extend(a,t.validator.normalizeRule(i)),delete a.messages,s[r.name]=a,i.messages&&(n.messages[r.name]=t.extend(n.messages[r.name],i.messages));
break;

case"remove":
if(!i)return delete s[r.name],a;
var o={};
return t.each(i.split(/\s/),function(t,e){
o[e]=a[e],delete a[e];
}),o;
}
}
var u=t.validator.normalizeRules(t.extend({},t.validator.classRules(r),t.validator.attributeRules(r),t.validator.dataRules(r),t.validator.staticRules(r)),r);
if(u.required){
var l=u.required;
delete u.required,u=t.extend({
required:l
},u);
}
return u;
}
}),t.extend(t.expr[":"],{
blank:function(e){
return!t.trim(""+t(e).val());
},
filled:function(e){
return!!t.trim(""+t(e).val());
},
unchecked:function(e){
return!t(e).prop("checked");
}
}),t.validator=function(e,i){
this.settings=t.extend(!0,{},t.validator.defaults,e),this.currentForm=i,this.init();
},t.validator.format=function(e,i){
return 1===arguments.length?function(){
var i=t.makeArray(arguments);
return i.unshift(e),t.validator.format.apply(this,i);
}:(arguments.length>2&&i.constructor!==Array&&(i=t.makeArray(arguments).slice(1)),
i.constructor!==Array&&(i=[i]),t.each(i,function(t,i){
e=e.replace(new RegExp("\\{"+t+"\\}","g"),function(){
return i;
});
}),e);
},t.extend(t.validator,{
defaults:{
messages:{},
groups:{},
rules:{},
errorClass:"error",
validClass:"valid",
errorElement:"label",
focusInvalid:!0,
errorContainer:t([]),
errorLabelContainer:t([]),
onsubmit:!0,
ignore:":hidden",
ignoreTitle:!1,
onfocusin:function(t){
this.lastActive=t,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),
this.addWrapper(this.errorsFor(t)).hide());
},
onfocusout:function(t){
this.checkable(t)||this.element(t);
},
onkeyup:function(t,e){
(9!==e.which||""!==this.elementValue(t))&&(t.name in this.submitted||t===this.lastElement)&&this.element(t);
},
onclick:function(t){
t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode);
},
highlight:function(e,i,r){
"radio"===e.type?this.findByName(e.name).addClass(i).removeClass(r):t(e).addClass(i).removeClass(r);
},
unhighlight:function(e,i,r){
"radio"===e.type?this.findByName(e.name).removeClass(i).addClass(r):t(e).removeClass(i).addClass(r);
}
},
setDefaults:function(e){
t.extend(t.validator.defaults,e);
},
messages:{
required:"This field is required.",
remote:"Please fix this field.",
email:"Please enter a valid email address.",
url:"Please enter a valid URL.",
date:"Please enter a valid date.",
dateISO:"Please enter a valid date (ISO).",
number:"Please enter a valid number.",
digits:"Please enter only digits.",
creditcard:"Please enter a valid credit card number.",
equalTo:"Please enter the same value again.",
maxlength:t.validator.format("Please enter no more than {0} characters."),
minlength:t.validator.format("Please enter at least {0} characters."),
rangelength:t.validator.format("Please enter a value between {0} and {1} characters long."),
range:t.validator.format("Please enter a value between {0} and {1}."),
max:t.validator.format("Please enter a value less than or equal to {0}."),
min:t.validator.format("Please enter a value greater than or equal to {0}.")
},
autoCreateRanges:!1,
prototype:{
init:function(){
function e(e){
var i=t.data(this[0].form,"validator"),r="on"+e.type.replace(/^validate/,"");
i.settings[r]&&i.settings[r].call(i,this[0],e);
}
this.labelContainer=t(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||t(this.currentForm),
this.containers=t(this.settings.errorContainer).add(this.settings.errorLabelContainer),
this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},
this.reset();
var i=this.groups={};
t.each(this.settings.groups,function(e,r){
"string"==typeof r&&(r=r.split(/\s/)),t.each(r,function(t,r){
i[r]=e;
});
});
var r=this.settings.rules;
t.each(r,function(e,i){
r[e]=t.validator.normalizeRule(i);
}),t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",e).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",e),
this.settings.invalidHandler&&t(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);
},
form:function(){
return this.checkForm(),t.extend(this.submitted,this.errorMap),this.invalid=t.extend({},this.errorMap),
this.valid()||t(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),
this.valid();
},
checkForm:function(){
this.prepareForm();
for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);
return this.valid();
},
element:function(e){
e=this.validationTargetFor(this.clean(e)),this.lastElement=e,this.prepareElement(e),
this.currentElements=t(e);
var i=this.check(e)!==!1;
return i?delete this.invalid[e.name]:this.invalid[e.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),
this.showErrors(),i;
},
showErrors:function(e){
if(e){
t.extend(this.errorMap,e),this.errorList=[];
for(var i in e)this.errorList.push({
message:e[i],
element:this.findByName(i)[0]
});
this.successList=t.grep(this.successList,function(t){
return!(t.name in e);
});
}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();
},
resetForm:function(){
t.fn.resetForm&&t(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,
this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
},
numberOfInvalids:function(){
return this.objectLength(this.invalid);
},
objectLength:function(t){
var e=0;
for(var i in t)e++;
return e;
},
hideErrors:function(){
this.addWrapper(this.toHide).hide();
},
valid:function(){
return 0===this.size();
},
size:function(){
return this.errorList.length;
},
focusInvalid:function(){
if(this.settings.focusInvalid)try{
t(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");
}catch(e){}
},
findLastActive:function(){
var e=this.lastActive;
return e&&1===t.grep(this.errorList,function(t){
return t.element.name===e.name;
}).length&&e;
},
elements:function(){
var e=this,i={};
return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
return!this.name&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),
this.name in i||!e.objectLength(t(this).rules())?!1:(i[this.name]=!0,!0);
});
},
clean:function(e){
return t(e)[0];
},
errors:function(){
var e=this.settings.errorClass.replace(" ",".");
return t(this.settings.errorElement+"."+e,this.errorContext);
},
reset:function(){
this.successList=[],this.errorList=[],this.errorMap={},this.toShow=t([]),this.toHide=t([]),
this.currentElements=t([]);
},
prepareForm:function(){
this.reset(),this.toHide=this.errors().add(this.containers);
},
prepareElement:function(t){
this.reset(),this.toHide=this.errorsFor(t);
},
elementValue:function(e){
var i=t(e).attr("type"),r=t(e).val();
return"radio"===i||"checkbox"===i?t("input[name='"+t(e).attr("name")+"']:checked").val():"string"==typeof r?r.replace(/\r/g,""):r;
},
check:function(e){
e=this.validationTargetFor(this.clean(e));
var i,r=t(e).rules(),n=!1,s=this.elementValue(e);
for(var a in r){
var o={
method:a,
parameters:r[a]
};
try{
if(i=t.validator.methods[a].call(this,s,e,o.parameters),"dependency-mismatch"===i){
n=!0;
continue;
}
if(n=!1,"pending"===i)return void(this.toHide=this.toHide.not(this.errorsFor(e)));
if(!i)return this.formatAndAdd(e,o),!1;
}catch(u){
throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+o.method+"' method.",u),
u;
}
}
return n?void 0:(this.objectLength(r)&&this.successList.push(e),!0);
},
customDataMessage:function(e,i){
return t(e).data("msg-"+i.toLowerCase())||e.attributes&&t(e).attr("data-msg-"+i.toLowerCase());
},
customMessage:function(t,e){
var i=this.settings.messages[t];
return i&&(i.constructor===String?i:i[e]);
},
findDefined:function(){
for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t];
return void 0;
},
defaultMessage:function(e,i){
return this.findDefined(this.customMessage(e.name,i),this.customDataMessage(e,i),!this.settings.ignoreTitle&&e.title||void 0,t.validator.messages[i],"<strong>Warning: No message defined for "+e.name+"</strong>");
},
formatAndAdd:function(e,i){
var r=this.defaultMessage(e,i.method),n=/\$?\{(\d+)\}/g;
"function"==typeof r?r=r.call(this,i.parameters,e):n.test(r)&&(r=t.validator.format(r.replace(n,"{$1}"),i.parameters)),
this.errorList.push({
message:r,
element:e
}),this.errorMap[e.name]=r,this.submitted[e.name]=r;
},
addWrapper:function(t){
return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t;
},
defaultShowErrors:function(){
var t,e;
for(t=0;this.errorList[t];t++){
var i=this.errorList[t];
this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),
this.showLabel(i.element,i.message);
}
if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);
if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);
this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show();
},
validElements:function(){
return this.currentElements.not(this.invalidElements());
},
invalidElements:function(){
return t(this.errorList).map(function(){
return this.element;
});
},
showLabel:function(e,i){
var r=this.errorsFor(e);
r.length?(r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
r.html(i)):(r=t("<"+this.settings.errorElement+">").attr("for",this.idOrName(e)).addClass(this.settings.errorClass).html(i||""),
this.settings.wrapper&&(r=r.hide().show().wrap("<"+this.settings.wrapper+" class='frm_msg fail'/>").parent()),
this.labelContainer.append(r).length||(this.settings.errorPlacement?this.settings.errorPlacement(r,t(e)):r.insertAfter(e))),
!i&&this.settings.success&&(r.text(""),"string"==typeof this.settings.success?r.addClass(this.settings.success):this.settings.success(r,e)),
this.toShow=this.toShow.add(r);
},
errorsFor:function(e){
var i=this.idOrName(e);
return this.errors().filter(function(){
return t(this).attr("for")===i;
});
},
idOrName:function(t){
return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name);
},
validationTargetFor:function(t){
return this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]),
t;
},
checkable:function(t){
return/radio|checkbox/i.test(t.type);
},
findByName:function(e){
return t(this.currentForm).find("[name='"+e+"']");
},
getLength:function(e,i){
switch(i.nodeName.toLowerCase()){
case"select":
return t("option:selected",i).length;

case"input":
if(this.checkable(i))return this.findByName(i.name).filter(":checked").length;
}
return e.length;
},
depend:function(t,e){
return this.dependTypes[typeof t]?this.dependTypes[typeof t](t,e):!0;
},
dependTypes:{
"boolean":function(t){
return t;
},
string:function(e,i){
return!!t(e,i.form).length;
},
"function":function(t,e){
return t(e);
}
},
optional:function(e){
var i=this.elementValue(e);
return!t.validator.methods.required.call(this,i,e)&&"dependency-mismatch";
},
startRequest:function(t){
this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0);
},
stopRequest:function(e,i){
this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[e.name],
i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(t(this.currentForm).submit(),
this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(t(this.currentForm).triggerHandler("invalid-form",[this]),
this.formSubmitted=!1);
},
previousValue:function(e){
return t.data(e,"previousValue")||t.data(e,"previousValue",{
old:null,
valid:!0,
message:this.defaultMessage(e,"remote")
});
}
},
classRuleSettings:{
required:{
required:!0
},
email:{
email:!0
},
url:{
url:!0
},
date:{
date:!0
},
dateISO:{
dateISO:!0
},
number:{
number:!0
},
digits:{
digits:!0
},
creditcard:{
creditcard:!0
}
},
addClassRules:function(e,i){
e.constructor===String?this.classRuleSettings[e]=i:t.extend(this.classRuleSettings,e);
},
classRules:function(e){
var i={},r=t(e).attr("class");
return r&&t.each(r.split(" "),function(){
this in t.validator.classRuleSettings&&t.extend(i,t.validator.classRuleSettings[this]);
}),i;
},
attributeRules:function(e){
var i={},r=t(e),n=r[0].getAttribute("type");
for(var s in t.validator.methods){
var a;
"required"===s?(a=r.get(0).getAttribute(s),""===a&&(a=!0),a=!!a):a=r.attr(s),/min|max/.test(s)&&(null===n||/number|range|text/.test(n))&&(a=Number(a)),
a?i[s]=a:n===s&&"range"!==n&&(i[s]=!0);
}
return i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)&&delete i.maxlength,
i;
},
dataRules:function(e){
var i,r,n={},s=t(e);
for(i in t.validator.methods)r=s.data("rule-"+i.toLowerCase()),void 0!==r&&(n[i]=r);
return n;
},
staticRules:function(e){
var i={},r=t.data(e.form,"validator");
return r.settings.rules&&(i=t.validator.normalizeRule(r.settings.rules[e.name])||{}),
i;
},
normalizeRules:function(e,i){
return t.each(e,function(r,n){
if(n===!1)return void delete e[r];
if(n.param||n.depends){
var s=!0;
switch(typeof n.depends){
case"string":
s=!!t(n.depends,i.form).length;
break;

case"function":
s=n.depends.call(i,i);
}
s?"string"!=typeof n&&(e[r]=void 0!==n.param?n.param:!0):delete e[r];
}
}),t.each(e,function(r,n){
e[r]=t.isFunction(n)?n(i):n;
}),t.each(["minlength","maxlength"],function(){
e[this]&&(e[this]=Number(e[this]));
}),t.each(["rangelength","range"],function(){
var i;
e[this]&&(t.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:"string"==typeof e[this]&&(i=e[this].split(/[\s,]+/),
e[this]=[Number(i[0]),Number(i[1])]));
}),t.validator.autoCreateRanges&&(e.min&&e.max&&(e.range=[e.min,e.max],delete e.min,
delete e.max),e.minlength&&e.maxlength&&(e.rangelength=[e.minlength,e.maxlength],
delete e.minlength,delete e.maxlength)),e;
},
normalizeRule:function(e){
if("string"==typeof e){
var i={};
t.each(e.split(/\s/),function(){
i[this]=!0;
}),e=i;
}
return e;
},
addMethod:function(e,i,r){
t.validator.methods[e]=i,t.validator.messages[e]=void 0!==r?r:t.validator.messages[e],
i.length<3&&t.validator.addClassRules(e,t.validator.normalizeRule(e));
},
methods:{
required:function(e,i,r){
if(!this.depend(r,i))return"dependency-mismatch";
if("select"===i.nodeName.toLowerCase()){
var n=t(i).val();
return n&&n.length>0;
}
return this.checkable(i)?this.getLength(e,i)>0:t.trim(e).length>0;
},
email:function(t,e){
return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t);
},
url:function(t,e){
return this.optional(e)||/^(https?|s?ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t);
},
date:function(t,e){
return this.optional(e)||!/Invalid|NaN/.test(new Date(t).toString());
},
dateISO:function(t,e){
return this.optional(e)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t);
},
number:function(t,e){
return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t);
},
digits:function(t,e){
return this.optional(e)||/^\d+$/.test(t);
},
creditcard:function(t,e){
if(this.optional(e))return"dependency-mismatch";
if(/[^0-9 \-]+/.test(t))return!1;
var i=0,r=0,n=!1;
t=t.replace(/\D/g,"");
for(var s=t.length-1;s>=0;s--){
var a=t.charAt(s);
r=parseInt(a,10),n&&(r*=2)>9&&(r-=9),i+=r,n=!n;
}
return i%10===0;
},
minlength:function(e,i,r){
var n=t.isArray(e)?e.length:this.getLength(t.trim(e),i);
return this.optional(i)||n>=r;
},
maxlength:function(e,i,r){
var n=t.isArray(e)?e.length:this.getLength(t.trim(e),i);
return this.optional(i)||r>=n;
},
rangelength:function(e,i,r){
var n=t.isArray(e)?e.length:this.getLength(t.trim(e),i);
return this.optional(i)||n>=r[0]&&n<=r[1];
},
min:function(t,e,i){
return this.optional(e)||t>=i;
},
max:function(t,e,i){
return this.optional(e)||i>=t;
},
range:function(t,e,i){
return this.optional(e)||t>=i[0]&&t<=i[1];
},
equalTo:function(e,i,r){
var n=t(r);
return this.settings.onfocusout&&n.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
t(i).valid();
}),e===n.val();
},
remote:function(e,i,r){
if(this.optional(i))return"dependency-mismatch";
var n=this.previousValue(i);
if(this.settings.messages[i.name]||(this.settings.messages[i.name]={}),n.originalMessage=this.settings.messages[i.name].remote,
this.settings.messages[i.name].remote=n.message,r="string"==typeof r&&{
url:r
}||r,n.old===e)return n.valid;
n.old=e;
var s=this;
this.startRequest(i);
var a={};
return a[i.name]=e,t.ajax(t.extend(!0,{
url:r,
mode:"abort",
port:"validate"+i.name,
dataType:"json",
data:a,
success:function(r){
s.settings.messages[i.name].remote=n.originalMessage;
var a=r===!0||"true"===r;
if(a){
var o=s.formSubmitted;
s.prepareElement(i),s.formSubmitted=o,s.successList.push(i),delete s.invalid[i.name],
s.showErrors();
}else{
var u={},l=r||s.defaultMessage(i,"remote");
u[i.name]=n.message=t.isFunction(l)?l(e):l,s.invalid[i.name]=!0,s.showErrors(u);
}
n.valid=a,s.stopRequest(i,a);
}
},r)),"pending";
}
}
}),t.format=t.validator.format;
}(jQuery),function(t){
var e={};
if(t.ajaxPrefilter)t.ajaxPrefilter(function(t,i,r){
var n=t.port;
"abort"===t.mode&&(e[n]&&e[n].abort(),e[n]=r);
});else{
var i=t.ajax;
t.ajax=function(r){
var n=("mode"in r?r:t.ajaxSettings).mode,s=("port"in r?r:t.ajaxSettings).port;
return"abort"===n?(e[s]&&e[s].abort(),e[s]=i.apply(this,arguments),e[s]):i.apply(this,arguments);
};
}
}(jQuery),function(t){
t.extend(t.fn,{
validateDelegate:function(e,i,r){
return this.bind(i,function(i){
var n=t(i.target);
return n.is(e)?r.apply(n,arguments):void 0;
});
}
});
}(jQuery),function(t){
t.validator.defaults.errorClass="frm_msg_content",t.validator.defaults.errorElement="span",
t.validator.defaults.errorPlacement=function(t,e){
e.parent().after(t);
},t.validator.defaults.wrapper="p",t.validator.messages={
required:"必选字段",
remote:"请修正该字段",
email:"请输入正确格式的电子邮件",
url:"请输入合法的网址",
date:"请输入合法的日期",
dateISO:"请输入合法的日期 (ISO).",
number:"请输入合法的数字",
digits:"只能输入整数",
creditcard:"请输入合法的信用卡号",
equalTo:"请再次输入相同的值",
accept:"请输入拥有合法后缀名的字符串",
maxlength:t.validator.format("请输入一个长度最多是 {0} 的字符串"),
minlength:t.validator.format("请输入一个长度最少是 {0} 的字符串"),
rangelength:t.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
range:t.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
max:t.validator.format("请输入一个最大为 {0} 的值"),
min:t.validator.format("请输入一个最小为 {0} 的值")
},function(){
function e(t){
var e,i=0;
"x"==t[17].toLowerCase()&&(t[17]=10);
for(var r=0;17>r;r++)i+=n[r]*t[r];
return e=i%11,t[17]==s[e]?!0:!1;
}
function i(t){
var e=t.substring(6,10),i=t.substring(10,12),r=t.substring(12,14),n=new Date(e,parseFloat(i)-1,parseFloat(r));
return(new Date).getFullYear()-parseInt(e)<18?!1:n.getFullYear()!=parseFloat(e)||n.getMonth()!=parseFloat(i)-1||n.getDate()!=parseFloat(r)?!1:!0;
}
function r(r){
if(r=t.trim(r.replace(/ /g,"")),15==r.length)return!1;
if(18==r.length){
var n=r.split("");
return i(r)&&e(n)?!0:!1;
}
return!1;
}
var n=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],s=[1,0,10,9,8,7,6,5,4,3,2];
t.validator.addMethod("idcard",function(t){
return r(t);
},"身份证格式不正确，或者年龄未满18周岁，请重新填写"),t.validator.addMethod("mobile",function(e){
return e=t.trim(e),/^1\d{10}$/.test(e);
},"请输入正确的手机号码"),t.validator.addMethod("telephone",function(e){
return e=t.trim(e),/^\d{1,4}(-\d{1,12})+$/.test(e);
},"请输入正确的座机号码，如020-12345678"),t.validator.addMethod("verifycode",function(e){
return e=t.trim(e),/^\d{6}$/.test(e);
},"验证码应为6位数字"),t.validator.addMethod("byteRangeLength",function(t,e,i){
return this.optional(e)||t.len()<=i[1]&&t.len()>=i[0];
},"必须为{0}到{1}个字节之间");
}();
}(jQuery);
var t={
optional:function(){
return!1;
},
getLength:function(t){
return t?t.length:0;
}
},e=$.validator;
return e.rules={},$.each(e.methods,function(i,r){
e.rules[i]=function(e,i){
return r.call(t,e,null,i);
};
}),e;
});define("common/wx/tooltips.js",["tpl/tooltips.html.js"],function(o,t,n){
"use strict";
var i={
position:{},
container:"",
type:"hover",
buttons:[],
delay:300,
disabled:!1,
reposition:!1,
container_close:!1,
parentClass:"",
container_mode:"absolute"
},s=wx.T,e=o("tpl/tooltips.html.js"),c="btn_disabled",p="hover",h="show",l=function(o){
if(this.options=o=$.extend(!0,{},i,o),this.$container=$(this.options.container),
this.$container&&0!=this.$container.length){
var t=this.$container.offset(),n=this.$container.height(),l=this.options.position.left||this.$container.data("x")||0,d=n+(this.options.position.top||this.$container.data("y")||0);
this.options.offset={
left:t.left+l,
top:t.top+d,
left_x:l,
top_y:d
},!o.content&&(o.content=this.$container.data("tips")||""),this.$dom=$(s(e,o)).appendTo("body"),
this.options.disabled&&this.$container.addClass(c);
var a=this,f=this.options.type===p||"click"===this.options.type?this.options.type:p;
if(f==p){
var r=null;
this.$container.hover(function(){
a.options.onshow&&"function"==typeof a.options.onshow?a.options.onshow.apply(a):!a.options.disabled&&a.show();
},function(){
r=window.setTimeout(function(){
a.hide();
},a.options.delay);
}),this.$dom.hover(function(){
r&&window.clearTimeout(r);
},function(){
a.hide();
});
}else this.$container.click(function(){
return a.options.disabled||a.options.onbeforeclick&&"function"==typeof a.options.onbeforeclick&&a.options.onbeforeclick.apply(a)===!1?void 0:(a.$dom.data(h)?a.options.onclose&&"function"==typeof a.options.onclose?a.options.onclose.apply(a):a.hide():a.options.onshow&&"function"==typeof a.options.onshow?a.options.onshow.apply(a):a.show(),
!1);
});
a.documentClickEvent=function(o){
a.$dom.find(o.target).length||(a.options.onclose&&"function"==typeof a.options.onclose?a.options.onclose.apply(a,[o]):a.hide());
},$(document).on("click",a.documentClickEvent),a.$dom.find(".js_popover_close").on("click",function(o){
return a.options.onclose&&"function"==typeof a.options.onclose?a.options.onclose.apply(a,[o]):a.hide(),
!1;
}),this.$dom.hide(),function(){
$.each(a.$dom.find(".js_btn"),function(o,t){
a.options.buttons[o].click&&$(t).on("click",function(){
a.options.buttons[o].click.apply(a);
});
});
}();
}
};
l.prototype={
constructor:l,
show:function(){
if(this.options.reposition){
var o=this.$container.offset(),t=o.left+this.options.offset.left_x,n=o.top+this.options.offset.top_y;
this.$dom.css({
left:t,
top:n
}).show();
}else this.$dom.show();
this.$dom.data(h,!0);
},
hide:function(){
this.$dom.hide(),this.$dom.data(h,!1);
},
enable:function(){
return this.options.disabled=!1,this.$container.removeClass(c),this;
},
disable:function(){
return this.options.disabled=!0,this.$container.addClass(c),this;
},
destroy:function(){
this.$dom.remove(),$(document).off("click",this.documentClickEvent);
},
changeContent:function(o){
this.$dom.find(".js_content").html(o);
}
},n.exports=l;
});define("common/wx/dropdownClassify.js",["biz_web/widget/dropdown.css","tpl/dropdownClassify.html.js"],function(t,e,a){
"use strict";
function n(t){
t=$.extend(!0,{},r,t);
var e=this;
e.opt=t,e.container=$(e.opt.container),e.selectedItems=[],e.opt.disabled?e.container.addClass("disabled"):e.container.removeClass("disabled"),
e.container.html(template.compile(o)(e.opt)),e.bt=e.container.find(".jsDropdownBt"),
e.dropdown=e.container.find(".jsDropdownList"),e.btLabel=e.bt.find(".jsBtLabel"),
e.bt.on("click",function(){
return e.opt.disabled?!1:void e.show();
}),$(document).on("click",function(t){
$(t.target).parents(".js_dropdownClassify").length||e.hide();
}),e.dropdown.on("click",".jsDropdownItem",function(){
var a=$(this);
if(a.hasClass("disabled"))return!1;
var n=a.data("value"),o=a.data("name"),r=a.data("index"),s=e.btLabel.attr("data-value");
if(!e.value||e.value&&e.value!==n){
var i="";
i="function"==typeof t.callback?t.callback(n,o,r,s)||o:o,e.btLabel.attr("data-value",n),
e.selected(n,i);
}
e.hide();
}),e.searchBtn=e.container.find(".js_search_btn"),e.searchInput=e.container.find(".js_search_input"),
e.searchClearBtn=e.container.find(".js_search_clear_btn"),e.searchBtn.on("click",function(){
e.search();
}),e.searchInput.bind("keypress",function(t){
e.searchClearBtnShow(),13==t.keyCode&&e.search();
}),e.searchInput.bind("keyup",function(){
e.searchClearBtnShow();
}),e.searchInput.blur(function(){
e.searchClearBtnShow(),e.search();
}),e.searchClearBtn.on("click",function(){
e.searchInput.val(""),e.searchClearBtn.hide(),e.search();
}),e.scrollArea=e.container.find(".js_scroll_area"),e.scrollArea.on("scroll",function(t){
t.currentTarget.scrollHeight-t.currentTarget.scrollTop<t.currentTarget.offsetHeight+20&&e.searchLoadMore();
});
}
t("biz_web/widget/dropdown.css");
var o=t("tpl/dropdownClassify.html.js"),r={
label:"请选择",
data:[],
callback:$.noop,
disabled:!1,
searchPlaceholder:"请输入",
dataEmptyWording:"暂无数据",
loadmoreTimer:null,
singleTags:!1
};
n.prototype={
show:function(){
this.dropdown.show(),this.container.addClass("open"),"function"==typeof this.opt.show&&this.opt.show(this.container);
},
hide:function(){
this.dropdown.hide(),this.container.removeClass("open");
},
selected:function(t,e){
var a=this;
return $.each(a.selectedItems,function(t,e){
e.removeClass("checked");
}),a.selectedItems=[],$.each(this.opt.data,function(n,o){
var r=a.dropdown.find(".jsDropdownGroup:eq("+n+")");
$.each(o.data,function(n,o){
t===o.value&&(a.value=o.value,a.name=o.name,a.btLabel.html(e||o.name),a.selectedItems.push(r.find(".jsDropdownItem:eq("+n+")").addClass("checked")));
});
}),this;
},
reset:function(){
return this.btLabel.html(this.opt.label),this.value=null,this.name=null,this;
},
destroy:function(){
return this.opt.disabled&&this.container.removeClass("disabled"),this.container.children().remove(),
this.container.off(),this;
},
enable:function(){
return this.opt.disabled=!1,this.container.removeClass("disabled"),this;
},
disable:function(){
return this.opt.disabled=!0,this.container.addClass("disabled"),this;
},
search:function(){
var t=this,e=t.searchInput.val();
"function"==typeof t.opt.searchHandle&&t.opt.searchHandle({
value:e,
offset:0
});
},
searchLoadMore:function(){
var t=this;
clearTimeout(t.opt.loadmoreTimer),t.opt.loadmoreTimer=setTimeout(function(){
var e=0;
t.opt.data&&t.opt.data[0].data&&t.opt.data[0].data.length&&(e=t.opt.data[0].data.length);
var a=t.searchInput.val();
"function"==typeof t.opt.searchHandle&&t.opt.searchHandle({
value:a,
offset:e
});
},1e3);
},
setLoadMoreStatus:function(t){
var e=this;
e.loadMoreWording=e.container.find(".js_loadmore_wording"),1==t?(e.loadMoreWording.text("加载更多"),
e.loadMoreWording.show()):2==t&&e.loadMoreWording.hide();
},
updateData:function(t){
var e=this;
if(e.opt.data=t,0==e.opt.data.length)return e.container.find(".js_data").hide(),
void e.container.find(".js_data_empty").show();
var a=$(o).find(".js_data").html();
e.dataContainer=e.container.find(".js_data"),e.dataContainer.html(template.compile(a)({
data:e.opt.data,
dataEmptyWording:e.opt.dataEmptyWording
})),e.dataContainer.show(),e.container.find(".js_data_empty").hide(),e.selected(e.value);
},
searchClearBtnShow:function(){
var t=this,e=t.searchInput.val();
e&&e.length>0?t.searchClearBtn.show():t.searchClearBtn.hide();
}
},a.exports=n;
});define("common/wx/Step.js",["widget/processor_bar.css","tpl/step.html.js"],function(e,t,s){
"use strict";
function n(e){
this.opts=$.extend(!0,{},i,e),this.init();
}
var r=wx.T,o=(e("widget/processor_bar.css"),e("tpl/step.html.js")),i={
selected:1
},p=function(){
var e=navigator.userAgent.toLowerCase(),t=/(msie) ([\w.]+)/.exec(e)||[],s=t[1]||"";
return"msie"==s;
};
n.prototype.init=function(){
var e,t,s=this.opts,i=s.names.length,a=parseInt(s.selected,10),c=[];
for(a=0>a?0:a>i?i:a,e=0;i>e;e++)t=n.getClass(e+1,a),c.push({
name:s.names[e],
cls:t
});
this.$dom=$(r(o,{
stepArr:c,
length:i
})).appendTo(s.container),p()&&this.$dom.addClass("ie");
},n.prototype.setStep=n.prototype.go=function(e){
var t=this.$dom.find("li.weui-desktop-step"),s=t.length;
return e=0>e?0:e>s?s:e,t.each(function(t,s){
s.className=t+1==e?"weui-desktop-step current ":"weui-desktop-step";
}),this;
},n.getClass=function(e,t){
var s;
return t-1>e?s="pprev":e===t-1?s="prev":e===t?s="current":e===t+1?s="next":e>t+1&&(s="nnext"),
s;
},s.exports=n;
});define("common/wx/inputCounter.js",[],function(t,n,e){
"use strict";
function o(t,n){
this.$input=$(t),this.opts=$.extend(!0,{},i,n),this._init();
}
var i={
minLength:0,
maxLength:20,
showCounter:!0,
useGBKLength:!1,
GBKBased:!1
};
o.prototype._init=function(){
var t=this;
t.$input&&t.$input.length>0?(t.$inputBox=t.$input.parent("textarea"==t.$input.prop("tagName").toLowerCase()?".frm_textarea_box":".frm_input_box"),
t.$inputBox&&0!=t.$inputBox.length||(t.$inputBox=t.$input.parent(".js_input_counter_container")),
t.count=t._getLen(t.getValue()),t.$counter=t.$inputBox.find(".frm_counter"),t.counterExist=!0,
0==t.$counter.length&&(t.$counter=t.$inputBox.find(".js_counter_em")),0==t.$counter.length&&(t.counterExist=!1,
t.$counter=$('<em class="frm_input_append frm_counter"></em>'),t.$inputBox.append(t.$counter)),
1==t.opts.showCounter?t.show():t.hide(),t.setCount(t.count),t.inputEvent=function(){
t.setCount(t._getLen(t.getValue()));
},t.$input.on("keydown keyup",t.inputEvent)):console.log("inputCounter Err: input does not exist.");
},o.prototype.getValue=function(){
var t="";
switch(this.$input.prop("tagName")){
case"INPUT":
case"TEXTAREA":
t=this.$input.val();
break;

default:
t=this.$input.text();
}
return t;
},o.prototype._getLen=function(t){
var n=0;
return t=t||"",n=this.opts.useGBKLength?t.replace(/[^\x00-\xff]/g,"**").length:t.length,
this.opts.GBKBased&&(n=Math.ceil(n/2)),n;
},o.prototype.getCount=function(){
return this.count||0;
},o.prototype.setCount=function(t){
this.count=t,this.$counter.html(this.count+"&#47;"+this.opts.maxLength),this.count>this.opts.maxLength?(this.overflowed=!0,
this.$inputBox.addClass("warn")):this.count>0&&this.count<this.opts.minLength?(this.overflowed=!0,
this.$inputBox.addClass("warn")):(this.overflowed=!1,this.$inputBox.removeClass("warn"));
},o.prototype.hasOverflowed=function(){
return this.overflowed;
},o.prototype.show=function(){
this.$inputBox.addClass("with_counter counter_in append count"),this.$counter.show();
},o.prototype.hide=function(){
this.$inputBox.removeClass("with_counter counter_in append count warn"),this.$counter.hide();
},o.prototype.hideWithAppend=function(){
this.$inputBox.removeClass("with_counter counter_in count warn"),this.$counter.hide();
},o.prototype.destroy=function(){
this.$input.off("keydown keyup",this.inputEvent),0==this.counterExist&&(this.hide(),
this.$counter.remove());
},o.prototype.updateMaxLength=function(t){
this.opts.maxLength=t,this.setCount(this._getLen(this.getValue()));
},e.exports=o;
});define("common/wx/mpEditor/common/eventbus.js",[],function(){
"use strict";
function n(n,e,t){
if(window.web2_eventBus){
var i=window.web2_eventBus;
if("function"==typeof t){
var o=n+"_callback";
i.$on(o,function(){
window.web2_eventBus.$off(o),t.apply(this,arguments);
});
}
i.$emit(n,e);
}
}
return{
fireEvent:n
};
});define("author/author_utils.js",["common/wx/Cgi.js","biz_web/lib/store.js"],function(t){
"use strict";
function r(t){
var r=[];
if(t.nickname)f.authorListByNickname&&f.authorListByNickname[t.nickname]&&r.push(f.authorListByNickname[t.nickname]);else if(t.idArray&&t.idArray.length>0)for(var e=0,i=t.idArray.length;i>e;e++){
var o=t.idArray[e];
f.authorListById[o]&&r.push(f.authorListById[o]);
}
return r;
}
function e(t){
if(t)for(var r=0,e=t.length;e>r;r++){
var i=t[r];
i.can_reward&&0==i.author_status&&(f.authorListById[i.writerid]=i,f.authorListByNickname[i.nickname]=i);
}
}
function i(t){
t=t||{};
var i="function"==typeof t.onError?t.onError:function(){},n="function"==typeof t.onSuccess?t.onSuccess:function(){},a=r(t);
return t.idArray&&a.length!=t.idArray&&(a=[]),a&&a.length>0?void n({
writerlist:a,
nickname:t.nickname
}):void u.get({
url:"/acct/writermgr?action=search",
data:{
author:t.nickname,
writerids:t.idArray?t.idArray.join("_"):""
}
},{
done:function(r){
if(r.base_resp&&0===r.base_resp.ret){
var a=r.pageinfo&&r.pageinfo.writerlist?r.pageinfo.writerlist:[];
"[object Object]"==Object.prototype.toString.call(a)?a=o([a]):"[object Array]"==Object.prototype.toString.call(a)&&(a=o(a)),
e(a),n({
writerlist:a,
nickname:t.nickname
});
}else i();
},
fail:function(){
i();
}
});
}
function o(t){
for(var r=0;r<t.length;r++)t[r].homepageqrcode=wx.url("/acct/writermgr?action=homepageqrcode&writerid="+t[r].writerid),
t[r].nickname_encode=encodeURIComponent(t[r].nickname);
return t;
}
function n(){
var t=s.get(f.cacheKey)||{};
return"[object Object]"!==Object.prototype.toString.call(t)&&(t={}),t;
}
function a(t){
var r=[],e=[],i={},o=function(t,r,e){
if(t)for(var o=0,n=t.length;n>o;o++){
var a=t[o];
a[r]&&!i[a[r]]&&(e.push(a),i[a[r]]=1);
}
},a=t.author||[],c=t.customerAuthor||[];
o(a,"writerid",r),o(c,"nickname",e);
var u=n(),h=u.author||[],l=u.customerAuthor||[];
o(h,"writerid",r),o(l,"nickname",e),r=r.splice(0,f.authorMax),e=e.splice(0,f.customerAuthorMax),
s.set(f.cacheKey,{
author:r,
customerAuthor:e
});
}
function c(t){
t=t||{};
var r="function"==typeof t.onError?t.onError:function(){},i="function"==typeof t.onSuccess?t.onSuccess:function(){};
u.get({
url:"/acct/writermgr?action=page"
},{
done:function(t){
if(t.base_resp&&0===t.base_resp.ret){
var n=t.pageinfo&&t.pageinfo.writerlist?t.pageinfo.writerlist:[];
"[object Object]"==Object.prototype.toString.call(n)?n=o([n]):"[object Array]"==Object.prototype.toString.call(n)&&(n=o(n)),
e(n),i({
writerlist:n,
totalCnt:t.pageinfo&&t.pageinfo.total_cnt?t.pageinfo.total_cnt:0
});
}else r();
},
fail:function(){
r();
}
});
}
var u=t("common/wx/Cgi.js"),s=t("biz_web/lib/store.js"),f={
cacheKey:"editoHitoryrAuthorList_"+wx.data.uin,
authorMax:4,
customerAuthorMax:5,
authorListByNickname:{},
authorListById:{}
};
return{
searchAuthorList:i,
getAuthorList:c,
getHistory:n,
setHistory:a
};
});define("tpl/media/reward_swtich_tips.html.js",[],function(){
return'{if type == 1}\n{else if type == 2}\n{else if type == 3}\n{else if type==5||type==6}\n无法开启赞赏，因为还没有赞赏账户授权给本公众号<br>\n如果要取得授权，请到<a data-type="2" class="js_show_author_qrcode_popover" href="javascript:;">赞赏账户小程序</a>-赞赏账户设置-可收款公众号中添加本公众号。 {if type==5}\n <br>\n 如果要创建赞赏账户，你可以发送<a target="_blank" href="{inviteAuthorLink}">赞赏账户邀请</a>。 {/if}\n{/if}\n';
});define("author/author_recent.js",["author/author_info.js","common/wx/Cgi.js","tpl/author/author_recent_list.html.js"],function(t){
"use strict";
function n(t){
var n=t.callback||function(){};
h.recentList.length>0&&n(h.recentList),c.get({
url:"/acct/writermgr?action=get_recent"
},{
done:function(t){
if(t.base_resp&&1*t.base_resp.ret===0&&t.authors&&t.authors.length>=0){
for(var i=[],e=0,r=t.authors.length;r>e;e++)i.push({
nickname:t.authors[e]
});
h.recentList=i,n(h.recentList);
}else n();
},
fail:function(){
n();
}
});
}
function i(){
r(),c.post({
url:"/acct/writermgr?action=del_recent"
},{
done:function(t){
t&&t.base_resp&&1*t.base_resp.ret===0&&(h.recentList=[],r());
}
});
}
function e(t){
t.$listContainer.off("click").on("click",function(t){
h.hideAuthorListId&&(clearTimeout(h.hideAuthorListId),h.hideAuthorListId=null),$(t.target).hasClass("js_clear_list")&&i();
}),t.$inputContainer.on("blur",function(){
h.hideAuthorListId&&(clearTimeout(h.hideAuthorListId),h.hideAuthorListId=null),h.searchListObj&&(h.hideAuthorListId=setTimeout(function(){
r();
},300));
}),t.$inputContainer.on("keyup click",function(){
h.getAuthorListId&&(clearTimeout(h.getAuthorListId),h.getAuthorListId=null);
var i=$(this),e=i.val()||"";
if(!e)return void n({
callback:function(n){
n&&0!==n.length&&t.$inputContainer&&t.$inputContainer.parent()&&t.$listContainer&&t.$listContainer.parent()&&!t.$inputContainer.val()&&o({
list:n,
$container:t.$listContainer,
$input:i
});
}
});
var s=u(e);
s.length>1||1===s.length&&s[0].nickname!==e?o({
highlineStr:e,
list:s,
$container:t.$listContainer,
$input:i
}):r();
});
}
function r(){
h.searchListObj&&(h.searchListObj=null,a.remove());
}
function o(t){
h.searchListObj=a.show({
tpl:l,
highlineStr:t.highlineStr,
info:t.list,
container:t.$container,
onItemClick:s({
$input:t.$input
})
});
}
function s(t){
return function(n,i){
var e=i[n];
e&&(t.$input.val(e.nickname),t.$input.trigger("keydown"),this.destroy(),h.searchListObj=null);
};
}
function u(t){
for(var n=[],i=0,e=h.recentList.length;e>i;i++){
var r=h.recentList[i];
r.nickname&&r.nickname.indexOf(t)>=0&&n.push(r);
}
return n;
}
var a=t("author/author_info.js"),c=t("common/wx/Cgi.js"),l=t("tpl/author/author_recent_list.html.js"),h={
recentList:[],
searchListObj:null
};
return{
getRecentList:n,
initList:e
};
});define("author/author_info_list.js",["author/author_info.js","author/author_popover.js","author/author_utils.js"],function(t){
"use strict";
function i(t){
t.$inputContainer.on("blur",function(){
t.$inputContainer.val()&&t.$inputContainer.trigger("click",{
frm:"blur"
});
}),t.$inputContainer.on("keyup click",function(i,n){
e(),c.getAuthorListId&&(clearTimeout(c.getAuthorListId),c.getAuthorListId=null),
c.authorLoadingId&&(clearTimeout(c.authorLoadingId),c.authorLoadingId=null),"click"!=i.type&&(o({
$highline:t.$highline,
highlineClass:t.highlineClass
}),"function"==typeof t.stateChange&&t.stateChange());
var s=$(this),u=s.val()||"";
if(!u)return void a(t);
(13==i.keyCode||n&&13==n.keyCode)&&(c.authorLoadingId=setTimeout(function(){
r({
listDomOpt:{
info:null,
container:t.$listContainer[0]
},
$author:s
});
},800));
var d=function(o){
c.authorLoadingId&&(clearTimeout(c.authorLoadingId),c.authorLoadingId=null);
var a=s.val()||"";
if(a&&o.nickname==a){
var u=o.writerlist;
u&&1==u.length&&!(1*u[0].author_status)&&1*u[0].can_reward&&"function"==typeof t.stateChange&&t.stateChange(u[0]),
u&&u.length>0&&(!n||n&&"blur"!=n.frm)||13==i.keyCode||n&&13==n.keyCode||(!u||0==u.length)&&n&&"blur"==n.frm?r({
listDomOpt:{
info:u,
container:t.$listContainer[0],
inviteAuthorLink:t.inviteAuthorLink,
onItemClick:h({
$highline:t.$highline,
highlineClass:t.highlineClass,
stateChange:t.stateChange
})
}
}):e(s);
}
};
c.getAuthorListId=setTimeout(function(){
l.searchAuthorList({
nickname:u,
onError:function(){
d({
nickname:u
});
},
onSuccess:function(t){
d(t);
}
});
},200);
}),u.init({
$container:t.$inputContainer.parent()
});
}
function e(){
c.searchListObj&&(c.searchListObj=null,s.remove());
}
function r(t){
c.searchListObj=s.show(t.listDomOpt),t.$author&&t.$author.length>0&&u.stopPopover({
$container:t.$author
});
}
function n(t){
t.$highline&&t.highlineClass&&t.$highline.addClass(t.highlineClass),t.$authorQrcode&&(t.$authorQrcode.addClass("js_show_author_qrcode_popover ").attr("data-writerid",t.data.writerid).attr("data-type","1").attr("data-desc",encodeURIComponent(t.data.author)),
u.resetPopover({
$container:t.$authorQrcode
})),t.$highline&&t.$authorQrcode&&t.$highline[0].contains(t.$authorQrcode[0])?u.init({
$container:t.$highline
}):t.$authorQrcode&&u.init({
$container:t.$authorQrcode
});
}
function o(t){
t.$highline&&t.highlineClass&&t.$highline.removeClass(t.highlineClass),t.$authorQrcode&&t.$authorQrcode.removeClass("js_show_author_qrcode_popover ").removeAttr("data-writerid").removeAttr("data-type","1").removeAttr("data-desc");
}
function a(t){
var i=l.getHistory().author,e=[],n=0,o=1;
i&&i.length>0&&o++;
var a=0,s=function(i,s){
if("[object Array]"===Object.prototype.toString.call(i))for(var u=0,l=i.length;l>u;u++)e.push(i[u]);else if("[object Object]"===Object.prototype.toString.call(i))for(var u=0;u<e.length;u++){
var c=e[u];
c.isHistory&&(i[c.writerid]?e[u]=i[c.writerid]:(e.splice(u,1),u--));
}
if(s>0&&(n=s),a==o&&t.$inputContainer&&0!=t.$inputContainer.length&&!t.$inputContainer.val()){
if(0==e.length)e=null;else{
for(var d={},u=0;u<e.length;u++){
var c=e[u];
d[c.writerid]?(e.splice(u,1),u--):d[c.writerid]=1;
}
e=e.splice(0,4);
}
r({
listDomOpt:{
showLoading:!1,
info:e,
inviteAuthorLink:t.inviteAuthorLink,
botTips:"可以搜索已经授权给你的作者（共%s个）".sprintf(n),
container:t.$listContainer[0],
onItemClick:h({
$highline:t.$highline,
highlineClass:t.highlineClass,
stateChange:t.stateChange
})
}
});
}
};
if(i&&i.length>0){
for(var u=[],c=0,d=i.length;d>c;c++)u.push(i[c].writerid),e.push({
isHistory:!0,
writerid:i[c].writerid
});
l.searchAuthorList({
idArray:u,
onError:function(){
a++,s();
},
onSuccess:function(t){
for(var i={},e=0,r=t.writerlist.length;r>e;e++){
var n=t.writerlist[e];
!n||1*n.author_status||(i[n.writerid]=n);
}
a++,s(i);
}
});
}
l.getAuthorList({
onError:function(){
a++,s();
},
onSuccess:function(t){
for(var i=[],e=0,r=t.writerlist.length;r>e;e++){
var n=t.writerlist[e];
!n||1*n.author_status||i.push(n);
}
a++,s(i,t.totalCnt);
}
});
}
function h(t){
return function(i,e){
c.hideSearchListId&&(clearTimeout(c.hideSearchListId),c.hideSearchListId=null);
var r=e[i];
!r||1*r.author_status||1*r.can_reward==0||(n({
data:r,
$highline:t.$highline,
highlineClass:t.highlineClass
}),"function"==typeof t.stateChange&&t.stateChange(r),this.destroy());
};
}
var s=t("author/author_info.js"),u=t("author/author_popover.js"),l=t("author/author_utils.js"),c={
authorLoadingId:null,
getAuthorListId:null,
hideSearchListId:null,
searchListObj:null
};
return{
initAuthorSearchList:i,
highlineAuthor:n,
resetHighlineAuthor:o,
removeAuthorListDom:e
};
});define("author/author_popover.js",["tpl/author/qrcode_popover.html.js","widget/weui-desktop/author/author_qrcode.css"],function(o){
"use strict";
function t(o){
var t=o.$container||$("body");
t.off("mouseover","."+n.eventClass,p),t.off("mouseout","."+n.eventClass,i),t.on("mouseover","."+n.eventClass,p),
t.on("mouseout","."+n.eventClass,i);
}
function e(o){
var t=o.$container.filter("."+n.eventClass).add(o.$container.find("."+n.eventClass));
t.attr(n.stopPopoverAttr,"1"),d(0);
}
function r(o){
var t=o.$container.filter("."+n.eventClass).add(o.$container.find("."+n.eventClass));
t.removeAttr(n.stopPopoverAttr);
}
var a=o("tpl/author/qrcode_popover.html.js");
o("widget/weui-desktop/author/author_qrcode.css");
var n={
canShow:!0,
hidePopoverId:null,
$authorPopover:null,
$curBindShowtarget:null,
eventClass:"js_show_author_qrcode_popover",
stopPopoverAttr:"data-authorpopoverstop"
},d=function(o){
n.hidePopoverId&&(clearTimeout(n.hidePopoverId),n.hidePopoverId=null),"undefined"==typeof o&&(o=300),
n.hidePopoverId=setTimeout(function(){
n.$authorPopover&&n.$authorPopover.hide(),n.$curBindShowtarget=null;
},o);
},i=function(o){
var t=$(o.target||o.srcElement);
n.$authorPopover&&!$.contains(n.$authorPopover,t)&&n.$curBindShowtarget&&!$.contains(n.$curBindShowtarget,t)&&d();
},p=function(){
if(n.canShow){
var o=$(this);
if("1"!=o.attr(n.stopPopoverAttr)){
n.$curBindShowtarget=o,n.hidePopoverId&&(clearTimeout(n.hidePopoverId),n.hidePopoverId=null);
var t=n.$curBindShowtarget.attr("data-type");
if("2"==t){
var e=decodeURIComponent(n.$curBindShowtarget.attr("data-desc")||""),r=decodeURIComponent(n.$curBindShowtarget.attr("data-bottips")||""),d=n.$curBindShowtarget.attr("data-writerid"),p=n.$curBindShowtarget.attr("data-src");
1==t?(r||(r="扫码查看赞赏账户"),p||(p="/acct/writermgr?action=homepageqrcode&writerid="+d)):2==t&&(e||(e="扫码进入赞赏账户小程序"),
r||(r=""),p||(p="https://res.wx.qq.com/op_res/a2Vp5jslVRea9g69UX4IEmW-K80_Hs_OVRZVSNPJB4HFhB6mnYgtEgqlDpoMyyDu")),
n.$authorPopover||(n.$authorPopover=$(wx.T(a,{})).appendTo($("body")),n.$authorPopover.hover(function(){
n.hidePopoverId&&(clearTimeout(n.hidePopoverId),n.hidePopoverId=null);
},i)),n.$authorPopover.find(".js_author_popover_desc").text(e),n.$authorPopover.find(".js_author_popover_botTips").text(r),
n.$authorPopover.find(".js_author_popover_qrcode").attr("src",wx.url(p)),n.$authorPopover.show();
var u=n.$curBindShowtarget[0].getBoundingClientRect(),s=$(window).height(),h=n.$authorPopover.height(),v=n.$authorPopover.width(),c=0;
c="input"==n.$curBindShowtarget[0].tagName.toLowerCase()?u.left-v/2+20:u.left-v/2+u.width/2,
u.bottom+h>s?n.$authorPopover.css({
top:u.top-h+$(window).scrollTop()-20,
left:c
}).addClass("pos_down_center"):n.$authorPopover.css({
top:u.bottom+$(window).scrollTop(),
left:c
}).removeClass("pos_down_center");
}
}
}
};
return{
init:t,
stopPopover:e,
resetPopover:r
};
});define("common/qq/emoji.js",["widget/emoji.css","biz_common/utils/emoji_data.js"],function(f){
f("widget/emoji.css");
var e='<span class="emoji emoji%s"></span>',a=f("biz_common/utils/emoji_data.js"),b='<img class="icon_emotion_single %s" src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif"></img>',c={
"☀":"2600",
"☁":"2601",
"☔":"2614",
"⛄":"26c4",
"⚡":"26a1",
"🌀":"1f300",
"🌁":"1f301",
"🌂":"1f302",
"🌃":"1f303",
"🌄":"1f304",
"🌅":"1f305",
"🌆":"1f306",
"🌇":"1f307",
"🌈":"1f308",
"❄":"2744",
"⛅":"26c5",
"🌉":"1f309",
"🌊":"1f30a",
"🌋":"1f30b",
"🌌":"1f30c",
"🌏":"1f30f",
"🌑":"1f311",
"🌔":"1f314",
"🌓":"1f313",
"🌙":"1f319",
"🌕":"1f315",
"🌛":"1f31b",
"🌟":"1f31f",
"🌠":"1f320",
"🕐":"1f550",
"🕑":"1f551",
"🕒":"1f552",
"🕓":"1f553",
"🕔":"1f554",
"🕕":"1f555",
"🕖":"1f556",
"🕗":"1f557",
"🕘":"1f558",
"🕙":"1f559",
"🕚":"1f55a",
"🕛":"1f55b",
"⌚":"231a",
"⌛":"231b",
"⏰":"23f0",
"⏳":"23f3",
"♈":"2648",
"♉":"2649",
"♊":"264a",
"♋":"264b",
"♌":"264c",
"♍":"264d",
"♎":"264e",
"♏":"264f",
"♐":"2650",
"♑":"2651",
"♒":"2652",
"♓":"2653",
"⛎":"26ce",
"🍀":"1f340",
"🌷":"1f337",
"🌱":"1f331",
"🍁":"1f341",
"🌸":"1f338",
"🌹":"1f339",
"🍂":"1f342",
"🍃":"1f343",
"🌺":"1f33a",
"🌻":"1f33b",
"🌴":"1f334",
"🌵":"1f335",
"🌾":"1f33e",
"🌽":"1f33d",
"🍄":"1f344",
"🌰":"1f330",
"🌼":"1f33c",
"🌿":"1f33f",
"🍒":"1f352",
"🍌":"1f34c",
"🍎":"1f34e",
"🍊":"1f34a",
"🍓":"1f353",
"🍉":"1f349",
"🍅":"1f345",
"🍆":"1f346",
"🍈":"1f348",
"🍍":"1f34d",
"🍇":"1f347",
"🍑":"1f351",
"🍏":"1f34f",
"👀":"1f440",
"👂":"1f442",
"👃":"1f443",
"👄":"1f444",
"👅":"1f445",
"💄":"1f484",
"💅":"1f485",
"💆":"1f486",
"💇":"1f487",
"💈":"1f488",
"👤":"1f464",
"👦":"1f466",
"👧":"1f467",
"👨":"1f468",
"👩":"1f469",
"👪":"1f46a",
"👫":"1f46b",
"👮":"1f46e",
"👯":"1f46f",
"👰":"1f470",
"👱":"1f471",
"👲":"1f472",
"👳":"1f473",
"👴":"1f474",
"👵":"1f475",
"👶":"1f476",
"👷":"1f477",
"👸":"1f478",
"👹":"1f479",
"👺":"1f47a",
"👻":"1f47b",
"👼":"1f47c",
"👽":"1f47d",
"👾":"1f47e",
"👿":"1f47f",
"💀":"1f480",
"💁":"1f481",
"💂":"1f482",
"💃":"1f483",
"🐌":"1f40c",
"🐍":"1f40d",
"🐎":"1f40e",
"🐔":"1f414",
"🐗":"1f417",
"🐫":"1f42b",
"🐘":"1f418",
"🐨":"1f428",
"🐒":"1f412",
"🐑":"1f411",
"🐙":"1f419",
"🐚":"1f41a",
"🐛":"1f41b",
"🐜":"1f41c",
"🐝":"1f41d",
"🐞":"1f41e",
"🐠":"1f420",
"🐡":"1f421",
"🐢":"1f422",
"🐤":"1f424",
"🐥":"1f425",
"🐦":"1f426",
"🐣":"1f423",
"🐧":"1f427",
"🐩":"1f429",
"🐟":"1f41f",
"🐬":"1f42c",
"🐭":"1f42d",
"🐯":"1f42f",
"🐱":"1f431",
"🐳":"1f433",
"🐴":"1f434",
"🐵":"1f435",
"🐶":"1f436",
"🐷":"1f437",
"🐻":"1f43b",
"🐹":"1f439",
"🐺":"1f43a",
"🐮":"1f42e",
"🐰":"1f430",
"🐸":"1f438",
"🐾":"1f43e",
"🐲":"1f432",
"🐼":"1f43c",
"🐽":"1f43d",
"😠":"1f620",
"😩":"1f629",
"😲":"1f632",
"😞":"1f61e",
"😵":"1f635",
"😰":"1f630",
"😒":"1f612",
"😍":"1f60d",
"😤":"1f624",
"😜":"1f61c",
"😝":"1f61d",
"😋":"1f60b",
"😘":"1f618",
"😚":"1f61a",
"😷":"1f637",
"😳":"1f633",
"😃":"1f603",
"😅":"1f605",
"😆":"1f606",
"😁":"1f601",
"😂":"1f602",
"😊":"1f60a",
"☺":"263a",
"😄":"1f604",
"😢":"1f622",
"😭":"1f62d",
"😨":"1f628",
"😣":"1f623",
"😡":"1f621",
"😌":"1f60c",
"😖":"1f616",
"😔":"1f614",
"😱":"1f631",
"😪":"1f62a",
"😏":"1f60f",
"😓":"1f613",
"😥":"1f625",
"😫":"1f62b",
"😉":"1f609",
"😺":"1f63a",
"😸":"1f638",
"😹":"1f639",
"😽":"1f63d",
"😻":"1f63b",
"😿":"1f63f",
"😾":"1f63e",
"😼":"1f63c",
"🙀":"1f640",
"🙅":"1f645",
"🙆":"1f646",
"🙇":"1f647",
"🙈":"1f648",
"🙊":"1f64a",
"🙉":"1f649",
"🙋":"1f64b",
"🙌":"1f64c",
"🙍":"1f64d",
"🙎":"1f64e",
"🙏":"1f64f",
"🏠":"1f3e0",
"🏡":"1f3e1",
"🏢":"1f3e2",
"🏣":"1f3e3",
"🏥":"1f3e5",
"🏦":"1f3e6",
"🏧":"1f3e7",
"🏨":"1f3e8",
"🏩":"1f3e9",
"🏪":"1f3ea",
"🏫":"1f3eb",
"⛪":"26ea",
"⛲":"26f2",
"🏬":"1f3ec",
"🏯":"1f3ef",
"🏰":"1f3f0",
"🏭":"1f3ed",
"⚓":"2693",
"🏮":"1f3ee",
"🗻":"1f5fb",
"🗼":"1f5fc",
"🗽":"1f5fd",
"🗾":"1f5fe",
"🗿":"1f5ff",
"👞":"1f45e",
"👟":"1f45f",
"👠":"1f460",
"👡":"1f461",
"👢":"1f462",
"👣":"1f463",
"👓":"1f453",
"👕":"1f455",
"👖":"1f456",
"👑":"1f451",
"👔":"1f454",
"👒":"1f452",
"👗":"1f457",
"👘":"1f458",
"👙":"1f459",
"👚":"1f45a",
"👛":"1f45b",
"👜":"1f45c",
"👝":"1f45d",
"💰":"1f4b0",
"💱":"1f4b1",
"💹":"1f4b9",
"💲":"1f4b2",
"💳":"1f4b3",
"💴":"1f4b4",
"💵":"1f4b5",
"💸":"1f4b8",
"🇨🇳":"1f1e81f1f3",
"🇩🇪":"1f1e91f1ea",
"🇪🇸":"1f1ea1f1f8",
"🇫🇷":"1f1eb1f1f7",
"🇬🇧":"1f1ec1f1e7",
"🇮🇹":"1f1ee1f1f9",
"🇯🇵":"1f1ef1f1f5",
"🇰🇷":"1f1f01f1f7",
"🇷🇺":"1f1f71f1fa",
"🇺🇸":"1f1fa1f1f8",
"🔥":"1f525",
"🔦":"1f526",
"🔧":"1f527",
"🔨":"1f528",
"🔩":"1f529",
"🔪":"1f52a",
"🔫":"1f52b",
"🔮":"1f52e",
"🔯":"1f52f",
"🔰":"1f530",
"🔱":"1f531",
"💉":"1f489",
"💊":"1f48a",
"🅰":"1f170",
"🅱":"1f171",
"🆎":"1f18e",
"🅾":"1f17e",
"🎀":"1f380",
"🎁":"1f381",
"🎂":"1f382",
"🎄":"1f384",
"🎅":"1f385",
"🎌":"1f38c",
"🎆":"1f386",
"🎈":"1f388",
"🎉":"1f389",
"🎍":"1f38d",
"🎎":"1f38e",
"🎓":"1f393",
"🎒":"1f392",
"🎏":"1f38f",
"🎇":"1f387",
"🎐":"1f390",
"🎃":"1f383",
"🎊":"1f38a",
"🎋":"1f38b",
"🎑":"1f391",
"📟":"1f4df",
"☎":"260e",
"📞":"1f4de",
"📱":"1f4f1",
"📲":"1f4f2",
"📝":"1f4dd",
"📠":"1f4e0",
"✉":"2709",
"📨":"1f4e8",
"📩":"1f4e9",
"📪":"1f4ea",
"📫":"1f4eb",
"📮":"1f4ee",
"📰":"1f4f0",
"📢":"1f4e2",
"📣":"1f4e3",
"📡":"1f4e1",
"📤":"1f4e4",
"📥":"1f4e5",
"📦":"1f4e6",
"📧":"1f4e7",
"🔠":"1f520",
"🔡":"1f521",
"🔢":"1f522",
"🔣":"1f523",
"🔤":"1f524",
"✒":"2712",
"💺":"1f4ba",
"💻":"1f4bb",
"✏":"270f",
"📎":"1f4ce",
"💼":"1f4bc",
"💽":"1f4bd",
"💾":"1f4be",
"💿":"1f4bf",
"📀":"1f4c0",
"✂":"2702",
"📍":"1f4cd",
"📃":"1f4c3",
"📄":"1f4c4",
"📅":"1f4c5",
"📁":"1f4c1",
"📂":"1f4c2",
"📓":"1f4d3",
"📖":"1f4d6",
"📔":"1f4d4",
"📕":"1f4d5",
"📗":"1f4d7",
"📘":"1f4d8",
"📙":"1f4d9",
"📚":"1f4da",
"📛":"1f4db",
"📜":"1f4dc",
"📋":"1f4cb",
"📆":"1f4c6",
"📊":"1f4ca",
"📈":"1f4c8",
"📉":"1f4c9",
"📇":"1f4c7",
"📌":"1f4cc",
"📒":"1f4d2",
"📏":"1f4cf",
"📐":"1f4d0",
"📑":"1f4d1",
"🎽":"1f3bd",
"⚾":"26be",
"⛳":"26f3",
"🎾":"1f3be",
"⚽":"26bd",
"🎿":"1f3bf",
"🏀":"1f3c0",
"🏁":"1f3c1",
"🏂":"1f3c2",
"🏃":"1f3c3",
"🏄":"1f3c4",
"🏆":"1f3c6",
"🏈":"1f3c8",
"🏊":"1f3ca",
"🚃":"1f683",
"🚇":"1f687",
"Ⓜ":"24c2",
"🚄":"1f684",
"🚅":"1f685",
"🚗":"1f697",
"🚙":"1f699",
"🚌":"1f68c",
"🚏":"1f68f",
"🚢":"1f6a2",
"✈":"2708",
"⛵":"26f5",
"🚉":"1f689",
"🚀":"1f680",
"🚤":"1f6a4",
"🚕":"1f695",
"🚚":"1f69a",
"🚒":"1f692",
"🚑":"1f691",
"🚓":"1f693",
"⛽":"26fd",
"🅿":"1f17f",
"🚥":"1f6a5",
"🚧":"1f6a7",
"🚨":"1f6a8",
"♨":"2668",
"⛺":"26fa",
"🎠":"1f3a0",
"🎡":"1f3a1",
"🎢":"1f3a2",
"🎣":"1f3a3",
"🎤":"1f3a4",
"🎥":"1f3a5",
"🎦":"1f3a6",
"🎧":"1f3a7",
"🎨":"1f3a8",
"🎩":"1f3a9",
"🎪":"1f3aa",
"🎫":"1f3ab",
"🎬":"1f3ac",
"🎭":"1f3ad",
"🎮":"1f3ae",
"🀄":"1f004",
"🎯":"1f3af",
"🎰":"1f3b0",
"🎱":"1f3b1",
"🎲":"1f3b2",
"🎳":"1f3b3",
"🎴":"1f3b4",
"🃏":"1f0cf",
"🎵":"1f3b5",
"🎶":"1f3b6",
"🎷":"1f3b7",
"🎸":"1f3b8",
"🎹":"1f3b9",
"🎺":"1f3ba",
"🎻":"1f3bb",
"🎼":"1f3bc",
"〽":"303d",
"📷":"1f4f7",
"📹":"1f4f9",
"📺":"1f4fa",
"📻":"1f4fb",
"📼":"1f4fc",
"💋":"1f48b",
"💌":"1f48c",
"💍":"1f48d",
"💎":"1f48e",
"💏":"1f48f",
"💐":"1f490",
"💑":"1f491",
"💒":"1f492",
"🔞":"1f51e",
"©":"a9",
"®":"ae",
"™":"2122",
"ℹ":"2139",
"#⃣":"2320e3",
"1⃣":"3120e3",
"2⃣":"3220e3",
"3⃣":"3320e3",
"4⃣":"3420e3",
"5⃣":"3520e3",
"6⃣":"3620e3",
"7⃣":"3720e3",
"8⃣":"3820e3",
"9⃣":"3920e3",
"0⃣":"3020e3",
"🔟":"1f51f",
"📶":"1f4f6",
"📳":"1f4f3",
"📴":"1f4f4",
"🍔":"1f354",
"🍙":"1f359",
"🍰":"1f370",
"🍜":"1f35c",
"🍞":"1f35e",
"🍳":"1f373",
"🍦":"1f366",
"🍟":"1f35f",
"🍡":"1f361",
"🍘":"1f358",
"🍚":"1f35a",
"🍝":"1f35d",
"🍛":"1f35b",
"🍢":"1f362",
"🍣":"1f363",
"🍱":"1f371",
"🍲":"1f372",
"🍧":"1f367",
"🍖":"1f356",
"🍥":"1f365",
"🍠":"1f360",
"🍕":"1f355",
"🍗":"1f357",
"🍨":"1f368",
"🍩":"1f369",
"🍪":"1f36a",
"🍫":"1f36b",
"🍬":"1f36c",
"🍭":"1f36d",
"🍮":"1f36e",
"🍯":"1f36f",
"🍤":"1f364",
"🍴":"1f374",
"☕":"2615",
"🍸":"1f378",
"🍺":"1f37a",
"🍵":"1f375",
"🍶":"1f376",
"🍷":"1f377",
"🍻":"1f37b",
"🍹":"1f379",
"↗":"2197",
"↘":"2198",
"↖":"2196",
"↙":"2199",
"⤴":"2934",
"⤵":"2935",
"↔":"2194",
"↕":"2195",
"⬆":"2b06",
"⬇":"2b07",
"➡":"27a1",
"⬅":"2b05",
"▶":"25b6",
"◀":"25c0",
"⏩":"23e9",
"⏪":"23ea",
"⏫":"23eb",
"⏬":"23ec",
"🔺":"1f53a",
"🔻":"1f53b",
"🔼":"1f53c",
"🔽":"1f53d",
"⭕":"2b55",
"❌":"274c",
"❎":"274e",
"❗":"2757",
"⁉":"2049",
"‼":"203c",
"❓":"2753",
"❔":"2754",
"❕":"2755",
"〰":"3030",
"➰":"27b0",
"➿":"27bf",
"❤":"2764",
"💓":"1f493",
"💔":"1f494",
"💕":"1f495",
"💖":"1f496",
"💗":"1f497",
"💘":"1f498",
"💙":"1f499",
"💚":"1f49a",
"💛":"1f49b",
"💜":"1f49c",
"💝":"1f49d",
"💞":"1f49e",
"💟":"1f49f",
"♥":"2665",
"♠":"2660",
"♦":"2666",
"♣":"2663",
"🚬":"1f6ac",
"🚭":"1f6ad",
"♿":"267f",
"🚩":"1f6a9",
"⚠":"26a0",
"⛔":"26d4",
"♻":"267b",
"🚲":"1f6b2",
"🚶":"1f6b6",
"🚹":"1f6b9",
"🚺":"1f6ba",
"🛀":"1f6c0",
"🚻":"1f6bb",
"🚽":"1f6bd",
"🚾":"1f6be",
"🚼":"1f6bc",
"🚪":"1f6aa",
"🚫":"1f6ab",
"✔":"2714",
"🆑":"1f191",
"🆒":"1f192",
"🆓":"1f193",
"🆔":"1f194",
"🆕":"1f195",
"🆖":"1f196",
"🆗":"1f197",
"🆘":"1f198",
"🆙":"1f199",
"🆚":"1f19a",
"🈁":"1f201",
"🈂":"1f202",
"🈲":"1f232",
"🈳":"1f233",
"🈴":"1f234",
"🈵":"1f235",
"🈶":"1f236",
"🈚":"1f21a",
"🈷":"1f237",
"🈸":"1f238",
"🈹":"1f239",
"🈯":"1f22f",
"🈺":"1f23a",
"㊙":"3299",
"㊗":"3297",
"🉐":"1f250",
"🉑":"1f251",
"➕":"2795",
"➖":"2796",
"✖":"2716",
"➗":"2797",
"💠":"1f4a0",
"💡":"1f4a1",
"💢":"1f4a2",
"💣":"1f4a3",
"💤":"1f4a4",
"💥":"1f4a5",
"💦":"1f4a6",
"💧":"1f4a7",
"💨":"1f4a8",
"💩":"1f4a9",
"💪":"1f4aa",
"💫":"1f4ab",
"💬":"1f4ac",
"✨":"2728",
"✴":"2734",
"✳":"2733",
"⚪":"26aa",
"⚫":"26ab",
"🔴":"1f534",
"🔵":"1f535",
"🔲":"1f532",
"🔳":"1f533",
"⭐":"2b50",
"⬜":"2b1c",
"⬛":"2b1b",
"▫":"25ab",
"▪":"25aa",
"◽":"25fd",
"◾":"25fe",
"◻":"25fb",
"◼":"25fc",
"🔶":"1f536",
"🔷":"1f537",
"🔸":"1f538",
"🔹":"1f539",
"❇":"2747",
"💮":"1f4ae",
"💯":"1f4af",
"↩":"21a9",
"↪":"21aa",
"🔃":"1f503",
"🔊":"1f50a",
"🔋":"1f50b",
"🔌":"1f50c",
"🔍":"1f50d",
"🔎":"1f50e",
"🔒":"1f512",
"🔓":"1f513",
"🔏":"1f50f",
"🔐":"1f510",
"🔑":"1f511",
"🔔":"1f514",
"☑":"2611",
"🔘":"1f518",
"🔖":"1f516",
"🔗":"1f517",
"🔙":"1f519",
"🔚":"1f51a",
"🔛":"1f51b",
"🔜":"1f51c",
"🔝":"1f51d",
" ":"2003",
" ":"2002",
" ":"2005",
"✅":"2705",
"✊":"270a",
"✋":"270b",
"✌":"270c",
"👊":"1f44a",
"👍":"1f44d",
"☝":"261d",
"👆":"1f446",
"👇":"1f447",
"👈":"1f448",
"👉":"1f449",
"👋":"1f44b",
"👏":"1f44f",
"👌":"1f44c",
"👎":"1f44e",
"👐":"1f450",
"":"2600",
"":"2601",
"":"2614",
"":"26c4",
"":"26a1",
"":"1f300",
"[霧]":"1f301",
"":"1f302",
"":"1f30c",
"":"1f304",
"":"1f305",
"":"1f306",
"":"1f307",
"":"1f308",
"[雪結晶]":"2744",
"":"26c5",
"":"1f30a",
"[火山]":"1f30b",
"[地球]":"1f30f",
"●":"1f311",
"":"1f31b",
"○":"1f315",
"":"1f31f",
"☆彡":"1f320",
"":"1f550",
"":"1f551",
"":"1f552",
"":"1f553",
"":"1f554",
"":"1f555",
"":"1f556",
"":"1f557",
"":"1f558",
"":"23f0",
"":"1f55a",
"":"1f55b",
"[腕時計]":"231a",
"[砂時計]":"23f3",
"":"2648",
"":"2649",
"":"264a",
"":"264b",
"":"264c",
"":"264d",
"":"264e",
"":"264f",
"":"2650",
"":"2651",
"":"2652",
"":"2653",
"":"26ce",
"":"1f33f",
"":"1f337",
"":"1f341",
"":"1f338",
"":"1f339",
"":"1f342",
"":"1f343",
"":"1f33a",
"":"1f33c",
"":"1f334",
"":"1f335",
"":"1f33e",
"[とうもろこし]":"1f33d",
"[キノコ]":"1f344",
"[栗]":"1f330",
"[さくらんぼ]":"1f352",
"[バナナ]":"1f34c",
"":"1f34f",
"":"1f34a",
"":"1f353",
"":"1f349",
"":"1f345",
"":"1f346",
"[メロン]":"1f348",
"[パイナップル]":"1f34d",
"[ブドウ]":"1f347",
"[モモ]":"1f351",
"":"1f440",
"":"1f442",
"":"1f443",
"":"1f444",
"":"1f61d",
"":"1f484",
"":"1f485",
"":"1f486",
"":"1f487",
"":"1f488",
"〓":"2005",
"":"1f466",
"":"1f467",
"":"1f468",
"":"1f469",
"[家族]":"1f46a",
"":"1f46b",
"":"1f46e",
"":"1f46f",
"[花嫁]":"1f470",
"":"1f471",
"":"1f472",
"":"1f473",
"":"1f474",
"":"1f475",
"":"1f476",
"":"1f477",
"":"1f478",
"[なまはげ]":"1f479",
"[天狗]":"1f47a",
"":"1f47b",
"":"1f47c",
"":"1f47d",
"":"1f47e",
"":"1f47f",
"":"1f480",
"":"1f481",
"":"1f482",
"":"1f483",
"[カタツムリ]":"1f40c",
"":"1f40d",
"":"1f40e",
"":"1f414",
"":"1f417",
"":"1f42b",
"":"1f418",
"":"1f428",
"":"1f412",
"":"1f411",
"":"1f419",
"":"1f41a",
"":"1f41b",
"[アリ]":"1f41c",
"[ミツバチ]":"1f41d",
"[てんとう虫]":"1f41e",
"":"1f420",
"":"1f3a3",
"[カメ]":"1f422",
"":"1f423",
"":"1f426",
"":"1f427",
"":"1f436",
"":"1f42c",
"":"1f42d",
"":"1f42f",
"":"1f431",
"":"1f433",
"":"1f434",
"":"1f435",
"":"1f43d",
"":"1f43b",
"":"1f439",
"":"1f43a",
"":"1f42e",
"":"1f430",
"":"1f438",
"":"1f463",
"[辰]":"1f432",
"[パンダ]":"1f43c",
"":"1f620",
"":"1f64d",
"":"1f632",
"":"1f61e",
"":"1f62b",
"":"1f630",
"":"1f612",
"":"1f63b",
"":"1f63c",
"":"1f61c",
"":"1f60a",
"":"1f63d",
"":"1f61a",
"":"1f637",
"":"1f633",
"":"1f63a",
"":"1f605",
"":"1f60c",
"":"1f639",
"":"263a",
"":"1f604",
"":"1f63f",
"":"1f62d",
"":"1f628",
"":"1f64e",
"":"1f4ab",
"":"1f631",
"":"1f62a",
"":"1f60f",
"":"1f613",
"":"1f625",
"":"1f609",
"":"1f645",
"":"1f646",
"":"1f647",
"(/_＼)":"1f648",
"(・×・)":"1f64a",
"|(・×・)|":"1f649",
"":"270b",
"":"1f64c",
"":"1f64f",
"":"1f3e1",
"":"1f3e2",
"":"1f3e3",
"":"1f3e5",
"":"1f3e6",
"":"1f3e7",
"":"1f3e8",
"":"1f3e9",
"":"1f3ea",
"":"1f3eb",
"":"26ea",
"":"26f2",
"":"1f3ec",
"":"1f3ef",
"":"1f3f0",
"":"1f3ed",
"":"1f6a2",
"":"1f376",
"":"1f5fb",
"":"1f5fc",
"":"1f5fd",
"[日本地図]":"1f5fe",
"[モアイ]":"1f5ff",
"":"1f45f",
"":"1f460",
"":"1f461",
"":"1f462",
"[メガネ]":"1f453",
"":"1f45a",
"[ジーンズ]":"1f456",
"":"1f451",
"":"1f454",
"":"1f452",
"":"1f457",
"":"1f458",
"":"1f459",
"[財布]":"1f45b",
"":"1f45c",
"[ふくろ]":"1f45d",
"":"1f4b5",
"":"1f4b1",
"":"1f4c8",
"[カード]":"1f4b3",
"￥":"1f4b4",
"[飛んでいくお金]":"1f4b8",
"":"1f1e81f1f3",
"":"1f1e91f1ea",
"":"1f1ea1f1f8",
"":"1f1eb1f1f7",
"":"1f1ec1f1e7",
"":"1f1ee1f1f9",
"":"1f1ef1f1f5",
"":"1f1f01f1f7",
"":"1f1f71f1fa",
"":"1f1fa1f1f8",
"":"1f525",
"[懐中電灯]":"1f526",
"[レンチ]":"1f527",
"":"1f528",
"[ネジ]":"1f529",
"[包丁]":"1f52a",
"":"1f52b",
"":"1f52f",
"":"1f530",
"":"1f531",
"":"1f489",
"":"1f48a",
"":"1f170",
"":"1f171",
"":"1f18e",
"":"1f17e",
"":"1f380",
"":"1f4e6",
"":"1f382",
"":"1f384",
"":"1f385",
"":"1f38c",
"":"1f386",
"":"1f388",
"":"1f389",
"":"1f38d",
"":"1f38e",
"":"1f393",
"":"1f392",
"":"1f38f",
"":"1f387",
"":"1f390",
"":"1f383",
"[オメデトウ]":"1f38a",
"[七夕]":"1f38b",
"":"1f391",
"[ポケベル]":"1f4df",
"":"1f4de",
"":"1f4f1",
"":"1f4f2",
"":"1f4d1",
"":"1f4e0",
"":"1f4e7",
"":"1f4eb",
"":"1f4ee",
"[新聞]":"1f4f0",
"":"1f4e2",
"":"1f4e3",
"":"1f4e1",
"[送信BOX]":"1f4e4",
"[受信BOX]":"1f4e5",
"[ABCD]":"1f520",
"[abcd]":"1f521",
"[1234]":"1f522",
"[記号]":"1f523",
"[ABC]":"1f524",
"[ペン]":"2712",
"":"1f4ba",
"":"1f4bb",
"[クリップ]":"1f4ce",
"":"1f4bc",
"":"1f4be",
"":"1f4bf",
"":"1f4c0",
"":"2702",
"[画びょう]":"1f4cc",
"[カレンダー]":"1f4c6",
"[フォルダ]":"1f4c2",
"":"1f4d2",
"[名札]":"1f4db",
"[スクロール]":"1f4dc",
"[グラフ]":"1f4c9",
"[定規]":"1f4cf",
"[三角定規]":"1f4d0",
"":"26be",
"":"26f3",
"":"1f3be",
"":"26bd",
"":"1f3bf",
"":"1f3c0",
"":"1f3c1",
"[スノボ]":"1f3c2",
"":"1f3c3",
"":"1f3c4",
"":"1f3c6",
"":"1f3c8",
"":"1f3ca",
"":"1f683",
"":"24c2",
"":"1f684",
"":"1f685",
"":"1f697",
"":"1f699",
"":"1f68c",
"":"1f68f",
"":"2708",
"":"26f5",
"":"1f689",
"":"1f680",
"":"1f6a4",
"":"1f695",
"":"1f69a",
"":"1f692",
"":"1f691",
"":"1f6a8",
"":"26fd",
"":"1f17f",
"":"1f6a5",
"":"26d4",
"":"2668",
"":"26fa",
"":"1f3a1",
"":"1f3a2",
"":"1f3a4",
"":"1f4f9",
"":"1f3a6",
"":"1f3a7",
"":"1f3a8",
"":"1f3ad",
"[イベント]":"1f3aa",
"":"1f3ab",
"":"1f3ac",
"[ゲーム]":"1f3ae",
"":"1f004",
"":"1f3af",
"":"1f3b0",
"":"1f3b1",
"[サイコロ]":"1f3b2",
"[ボーリング]":"1f3b3",
"[花札]":"1f3b4",
"[ジョーカー]":"1f0cf",
"":"1f3b5",
"":"1f3bc",
"":"1f3b7",
"":"1f3b8",
"[ピアノ]":"1f3b9",
"":"1f3ba",
"[バイオリン]":"1f3bb",
"":"303d",
"":"1f4f7",
"":"1f4fa",
"":"1f4fb",
"":"1f4fc",
"":"1f48b",
"":"1f48c",
"":"1f48d",
"":"1f48e",
"":"1f48f",
"":"1f490",
"":"1f491",
"":"1f492",
"":"1f51e",
"":"a9",
"":"ae",
"":"2122",
"[ｉ]":"2139",
"":"2320e3",
"":"3120e3",
"":"3220e3",
"":"3320e3",
"":"3420e3",
"":"3520e3",
"":"3620e3",
"":"3720e3",
"":"3820e3",
"":"3920e3",
"":"3020e3",
"[10]":"1f51f",
"":"1f4f6",
"":"1f4f3",
"":"1f4f4",
"":"1f354",
"":"1f359",
"":"1f370",
"":"1f35c",
"":"1f35e",
"":"1f373",
"":"1f366",
"":"1f35f",
"":"1f361",
"":"1f358",
"":"1f35a",
"":"1f35d",
"":"1f35b",
"":"1f362",
"":"1f363",
"":"1f371",
"":"1f372",
"":"1f367",
"[肉]":"1f356",
"[なると]":"1f365",
"[やきいも]":"1f360",
"[ピザ]":"1f355",
"[チキン]":"1f357",
"[アイスクリーム]":"1f368",
"[ドーナツ]":"1f369",
"[クッキー]":"1f36a",
"[チョコ]":"1f36b",
"[キャンディ]":"1f36d",
"[プリン]":"1f36e",
"[ハチミツ]":"1f36f",
"[エビフライ]":"1f364",
"":"1f374",
"":"2615",
"":"1f379",
"":"1f37a",
"":"1f375",
"":"1f37b",
"":"2934",
"":"2935",
"":"2196",
"":"2199",
"⇔":"2194",
"↑↓":"1f503",
"":"2b06",
"":"2b07",
"":"27a1",
"":"1f519",
"":"25b6",
"":"25c0",
"":"23e9",
"":"23ea",
"▲":"1f53c",
"▼":"1f53d",
"":"2b55",
"":"2716",
"":"2757",
"！？":"2049",
"！！":"203c",
"":"2753",
"":"2754",
"":"2755",
"～":"27b0",
"":"27bf",
"":"2764",
"":"1f49e",
"":"1f494",
"":"1f497",
"":"1f498",
"":"1f499",
"":"1f49a",
"":"1f49b",
"":"1f49c",
"":"1f49d",
"":"1f49f",
"":"2665",
"":"2660",
"":"2666",
"":"2663",
"":"1f6ac",
"":"1f6ad",
"":"267f",
"[旗]":"1f6a9",
"":"26a0",
"":"1f6b2",
"":"1f6b6",
"":"1f6b9",
"":"1f6ba",
"":"1f6c0",
"":"1f6bb",
"":"1f6bd",
"":"1f6be",
"":"1f6bc",
"[ドア]":"1f6aa",
"[禁止]":"1f6ab",
"[チェックマーク]":"2705",
"[CL]":"1f191",
"":"1f192",
"[FREE]":"1f193",
"":"1f194",
"":"1f195",
"[NG]":"1f196",
"":"1f197",
"[SOS]":"1f198",
"":"1f199",
"":"1f19a",
"":"1f201",
"":"1f202",
"[禁]":"1f232",
"":"1f233",
"[合]":"1f234",
"":"1f235",
"":"1f236",
"":"1f21a",
"":"1f237",
"":"1f238",
"":"1f239",
"":"1f22f",
"":"1f23a",
"":"3299",
"":"3297",
"":"1f250",
"[可]":"1f251",
"[＋]":"2795",
"[－]":"2796",
"[÷]":"2797",
"":"1f4a1",
"":"1f4a2",
"":"1f4a3",
"":"1f4a4",
"[ドンッ]":"1f4a5",
"":"1f4a7",
"":"1f4a8",
"":"1f4a9",
"":"1f4aa",
"[フキダシ]":"1f4ac",
"":"2747",
"":"2734",
"":"2733",
"":"1f534",
"":"25fc",
"":"1f539",
"":"2b50",
"[花丸]":"1f4ae",
"[100点]":"1f4af",
"←┘":"21a9",
"└→":"21aa",
"":"1f50a",
"[電池]":"1f50b",
"[コンセント]":"1f50c",
"":"1f50e",
"":"1f510",
"":"1f513",
"":"1f511",
"":"1f514",
"[ラジオボタン]":"1f518",
"[ブックマーク]":"1f516",
"[リンク]":"1f517",
"[end]":"1f51a",
"[ON]":"1f51b",
"[SOON]":"1f51c",
"":"1f51d",
"":"270a",
"":"270c",
"":"1f44a",
"":"1f44d",
"":"261d",
"":"1f446",
"":"1f447",
"":"1f448",
"":"1f449",
"":"1f44b",
"":"1f44f",
"":"1f44c",
"":"1f44e",
"":"1f450"
};
String.prototype.emoji=function(){
for(var f=this.toString(),d=0;d<a.length;d++){
for(;a[d].cn&&-1!=f.indexOf(a[d].cn);)f=f.replace(a[d].cn,b.sprintf(a[d].style));
for(;a[d].hk&&-1!=f.indexOf(a[d].hk);)f=f.replace(a[d].hk,b.sprintf(a[d].style));
for(;a[d].us&&-1!=f.indexOf(a[d].us);)f=f.replace(a[d].us,b.sprintf(a[d].style));
for(;a[d].code&&-1!=f.indexOf(a[d].code);)f=f.replace(a[d].code,b.sprintf(a[d].style));
for(;a[d].web_code&&-1!=f.indexOf(a[d].web_code);)f=f.replace(a[d].web_code,b.sprintf(a[d].style));
for(;a[d].emoji&&-1!=f.indexOf(a[d].emoji);)f=f.replace(a[d].emoji,b.sprintf(a[d].style));
}
for(var i in c)for(;-1!=f.indexOf(i);)f=f.replace(i,e.sprintf(c[i]));
return f;
};
});define("biz_common/utils/string/html.js",[],function(){
return String.prototype.html=function(t){
var e,n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],r=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"];
e=t?r:n;
for(var o=0,i=this;o<e.length;o+=2)i=i.replace(new RegExp(e[o],"g"),e[o+1]);
return i;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},String.prototype.htmlLite=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&gt;",">","&lt;","<","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncodeLite=function(){
return this.htmlLite(!0);
},String.prototype.htmlDecodeLite=function(){
return this.htmlLite(!1);
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
},
htmlEncodeLite:function(t){
return t.htmlEncodeLite();
},
htmlDecodeLite:function(t){
return t.htmlDecodeLite();
}
};
});define("biz_web/ui/jquery.scrollbar.js",["biz_web/widget/jquery.scrollbar.css"],function(l){
"use strict";
function e(l){
if(t.webkit&&!l)return{
height:0,
width:0
};
if(!t.data.outer){
var e={
border:"none",
"box-sizing":"content-box",
height:"200px",
margin:"0",
padding:"0",
width:"200px"
};
t.data.inner=$("<div>").css($.extend({},e)),t.data.outer=$("<div>").css($.extend({
left:"-1000px",
overflow:"scroll",
position:"absolute",
top:"-1000px"
},e)).append(t.data.inner).appendTo("body");
}
return t.data.outer.scrollLeft(1e3).scrollTop(1e3),{
height:Math.ceil(t.data.outer.offset().top-t.data.inner.offset().top||0),
width:Math.ceil(t.data.outer.offset().left-t.data.inner.offset().left||0)
};
}
function s(){
var l=e(!0);
return!(l.height||l.width);
}
function o(l){
var e=l.originalEvent;
return e.axis&&e.axis===e.HORIZONTAL_AXIS?!1:e.wheelDeltaX?!1:!0;
}
l("biz_web/widget/jquery.scrollbar.css");
var r=!1,t={
data:{
index:0,
name:"scrollbar"
},
macosx:/mac/i.test(navigator.platform),
mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
overlay:null,
scroll:null,
scrolls:[],
webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)
};
t.scrolls.add=function(l){
this.remove(l).push(l);
},t.scrolls.remove=function(l){
for(;$.inArray(l,this)>=0;)this.splice($.inArray(l,this),1);
return this;
};
var i={
autoScrollSize:!0,
autoUpdate:!0,
debug:!1,
disableBodyScroll:!1,
duration:200,
ignoreMobile:!1,
ignoreOverlay:!1,
scrollStep:30,
showArrows:!1,
stepScrolling:!0,
scrollx:null,
scrolly:null,
onDestroy:null,
onInit:null,
onScroll:null,
onUpdate:null
},n=function(l){
t.scroll||(t.overlay=s(),t.scroll=e(),a(),$(window).resize(function(){
var l=!1;
if(t.scroll&&(t.scroll.height||t.scroll.width)){
var s=e();
(s.height!==t.scroll.height||s.width!==t.scroll.width)&&(t.scroll=s,l=!0);
}
a(l);
})),this.container=l,this.namespace=".scrollbar_"+t.data.index++,this.options=$.extend({},i,window.jQueryScrollbarOptions||{}),
this.scrollTo=null,this.scrollx={},this.scrolly={},l.data(t.data.name,this),t.scrolls.add(this);
};
n.prototype={
destroy:function(){
if(this.wrapper){
this.container.removeData(t.data.name),t.scrolls.remove(this);
var l=this.container.scrollLeft(),e=this.container.scrollTop();
this.container.insertBefore(this.wrapper).css({
height:"",
margin:"",
"max-height":""
}).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(l).scrollTop(e),
this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace),
this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace),
this.wrapper.remove(),$(document).add("body").off(this.namespace),$.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container]);
}
},
init:function(l){
var e=this,s=this.container,r=this.containerWrapper||s,i=this.namespace,n=$.extend(this.options,l||{}),c={
x:this.scrollx,
y:this.scrolly
},a=this.wrapper,d={
scrollLeft:s.scrollLeft(),
scrollTop:s.scrollTop()
};
if(t.mobile&&n.ignoreMobile||t.overlay&&n.ignoreOverlay||t.macosx&&!t.webkit)return!1;
if(a)r.css({
height:"auto",
"margin-bottom":-1*t.scroll.height+"px",
"margin-right":-1*t.scroll.width+"px",
"max-height":""
});else{
if(this.wrapper=a=$("<div>").addClass("scroll-wrapper").addClass(s.attr("class")).css("position","absolute"==s.css("position")?"absolute":"relative").insertBefore(s).append(s),
s.is("textarea")&&(this.containerWrapper=r=$("<div>").insertBefore(s).append(s),
a.addClass("scroll-textarea")),r.addClass("scroll-content").css({
height:"auto",
"margin-bottom":-1*t.scroll.height+"px",
"margin-right":-1*t.scroll.width+"px",
"max-height":""
}),s.on("scroll"+i,function(){
$.isFunction(n.onScroll)&&n.onScroll.call(e,{
maxScroll:c.y.maxScrollOffset,
scroll:s.scrollTop(),
size:c.y.size,
visible:c.y.visible
},{
maxScroll:c.x.maxScrollOffset,
scroll:s.scrollLeft(),
size:c.x.size,
visible:c.x.visible
}),c.x.isVisible&&c.x.scroll.bar.css("left",s.scrollLeft()*c.x.kx+"px"),c.y.isVisible&&c.y.scroll.bar.css("top",s.scrollTop()*c.y.kx+"px");
}),a.on("scroll"+i,function(){
a.scrollTop(0).scrollLeft(0);
}),n.disableBodyScroll){
var h=function(l){
o(l)?c.y.isVisible&&c.y.mousewheel(l):c.x.isVisible&&c.x.mousewheel(l);
};
a.on("MozMousePixelScroll"+i,h),a.on("mousewheel"+i,h),t.mobile&&a.on("touchstart"+i,function(l){
var e=l.originalEvent.touches&&l.originalEvent.touches[0]||l,o={
pageX:e.pageX,
pageY:e.pageY
},r={
left:s.scrollLeft(),
top:s.scrollTop()
};
$(document).on("touchmove"+i,function(l){
var e=l.originalEvent.targetTouches&&l.originalEvent.targetTouches[0]||l;
s.scrollLeft(r.left+o.pageX-e.pageX),s.scrollTop(r.top+o.pageY-e.pageY),l.preventDefault();
}),$(document).on("touchend"+i,function(){
$(document).off(i);
});
});
}
$.isFunction(n.onInit)&&n.onInit.apply(this,[s]);
}
$.each(c,function(l,r){
var t=null,a=1,d="x"===l?"scrollLeft":"scrollTop",h=n.scrollStep,p=function(){
var l=s[d]();
s[d](l+h),1==a&&l+h>=u&&(l=s[d]()),-1==a&&u>=l+h&&(l=s[d]()),s[d]()==l&&t&&t();
},u=0;
r.scroll||(r.scroll=e._getScroll(n["scroll"+l]).addClass("scroll-"+l),n.showArrows&&r.scroll.addClass("scroll-element_arrows_visible"),
r.mousewheel=function(t){
if(!r.isVisible||"x"===l&&o(t))return!0;
if("y"===l&&!o(t))return c.x.mousewheel(t),!0;
var i=-1*t.originalEvent.wheelDelta||t.originalEvent.detail,n=r.size-r.visible-r.offset;
return(i>0&&n>u||0>i&&u>0)&&(u+=i,0>u&&(u=0),u>n&&(u=n),e.scrollTo=e.scrollTo||{},
e.scrollTo[d]=u,setTimeout(function(){
e.scrollTo&&(s.stop().animate(e.scrollTo,240,"linear",function(){
u=s[d]();
}),e.scrollTo=null);
},1)),t.preventDefault(),!1;
},r.scroll.on("MozMousePixelScroll"+i,r.mousewheel).on("mousewheel"+i,r.mousewheel).on("mouseenter"+i,function(){
u=s[d]();
}),r.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown"+i,function(o){
if(1!=o.which)return!0;
a=1;
var i={
eventOffset:o["x"===l?"pageX":"pageY"],
maxScrollValue:r.size-r.visible-r.offset,
scrollbarOffset:r.scroll.bar.offset()["x"===l?"left":"top"],
scrollbarSize:r.scroll.bar["x"===l?"outerWidth":"outerHeight"]()
},c=0,f=0;
return $(this).hasClass("scroll-arrow")?(a=$(this).hasClass("scroll-arrow_more")?1:-1,
h=n.scrollStep*a,u=a>0?i.maxScrollValue:0):(a=i.eventOffset>i.scrollbarOffset+i.scrollbarSize?1:i.eventOffset<i.scrollbarOffset?-1:0,
h=Math.round(.75*r.visible)*a,u=i.eventOffset-i.scrollbarOffset-(n.stepScrolling?1==a?i.scrollbarSize:0:Math.round(i.scrollbarSize/2)),
u=s[d]()+u/r.kx),e.scrollTo=e.scrollTo||{},e.scrollTo[d]=n.stepScrolling?s[d]()+h:u,
n.stepScrolling&&(t=function(){
u=s[d](),clearInterval(f),clearTimeout(c),c=0,f=0;
},c=setTimeout(function(){
f=setInterval(p,40);
},n.duration+100)),setTimeout(function(){
e.scrollTo&&(s.animate(e.scrollTo,n.duration),e.scrollTo=null);
},1),e._handleMouseDown(t,o);
}),r.scroll.bar.on("mousedown"+i,function(o){
if(1!=o.which)return!0;
var t=o["x"===l?"pageX":"pageY"],n=s[d]();
return r.scroll.addClass("scroll-draggable"),$(document).on("mousemove"+i,function(e){
var o=parseInt((e["x"===l?"pageX":"pageY"]-t)/r.kx,10);
s[d](n+o);
}),e._handleMouseDown(function(){
r.scroll.removeClass("scroll-draggable"),u=s[d]();
},o);
}));
}),$.each(c,function(l,e){
var s="scroll-scroll"+l+"_visible",o="x"==l?c.y:c.x;
e.scroll.removeClass(s),o.scroll.removeClass(s),r.removeClass(s);
}),$.each(c,function(l,e){
$.extend(e,"x"==l?{
offset:parseInt(s.css("left"),10)||0,
size:s.prop("scrollWidth"),
visible:a.width()
}:{
offset:parseInt(s.css("top"),10)||0,
size:s.prop("scrollHeight"),
visible:a.height()
});
}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),$.isFunction(n.onUpdate)&&n.onUpdate.apply(this,[s]),
$.each(c,function(l,e){
var o="x"===l?"left":"top",r="x"===l?"outerWidth":"outerHeight",t="x"===l?"width":"height",i=parseInt(s.css(o),10)||0,c=e.size,a=e.visible+i,d=e.scroll.size[r]()+(parseInt(e.scroll.size.css(o),10)||0);
n.autoScrollSize&&(e.scrollbarSize=parseInt(d*a/c,10),e.scroll.bar.css(t,e.scrollbarSize+"px")),
e.scrollbarSize=e.scroll.bar[r](),e.kx=(d-e.scrollbarSize)/(c-a)||1,e.maxScrollOffset=c-a;
}),s.scrollLeft(d.scrollLeft).scrollTop(d.scrollTop);
},
_getScroll:function(l){
var e={
advanced:['<div class="scroll-element">','<div class="scroll-element_corner"></div>','<div class="scroll-arrow scroll-arrow_less"></div>','<div class="scroll-arrow scroll-arrow_more"></div>','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_inner-wrapper">','<div class="scroll-element_inner scroll-element_track">','<div class="scroll-element_inner-bottom"></div>',"</div>","</div>",'<div class="scroll-bar">','<div class="scroll-bar_body">','<div class="scroll-bar_body-inner"></div>',"</div>",'<div class="scroll-bar_bottom"></div>','<div class="scroll-bar_center"></div>',"</div>","</div>","</div>"].join(""),
simple:['<div class="scroll-element">','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_track"></div>','<div class="scroll-bar"></div>',"</div>","</div>"].join("")
};
return e[l]&&(l=e[l]),l||(l=e.simple),l="string"==typeof l?$(l).appendTo(this.wrapper):$(l),
$.extend(l,{
bar:l.find(".scroll-bar"),
size:l.find(".scroll-element_size"),
track:l.find(".scroll-element_track")
}),l;
},
_handleMouseDown:function(l,e){
var s=this.namespace;
return $(document).on("blur"+s,function(){
$(document).add("body").off(s),l&&l();
}),$(document).on("dragstart"+s,function(l){
return l.preventDefault(),!1;
}),$(document).on("mouseup"+s,function(){
$(document).add("body").off(s),l&&l();
}),$("body").on("selectstart"+s,function(l){
return l.preventDefault(),!1;
}),e&&e.preventDefault(),!1;
},
_updateScroll:function(l,e){
var s=this.container,o=this.containerWrapper||s,r="scroll-scroll"+l+"_visible",i="x"===l?this.scrolly:this.scrollx,n=parseInt(this.container.css("x"===l?"left":"top"),10)||0,c=this.wrapper,a=e.size,d=e.visible+n;
e.isVisible=a-d>1,e.isVisible?(e.scroll.addClass(r),i.scroll.addClass(r),o.addClass(r)):(e.scroll.removeClass(r),
i.scroll.removeClass(r),o.removeClass(r)),"y"===l&&o.css(s.is("textarea")||d>a?{
height:d+t.scroll.height+"px",
"max-height":"none"
}:{
"max-height":d+t.scroll.height+"px"
}),(e.size!=s.prop("scrollWidth")||i.size!=s.prop("scrollHeight")||e.visible!=c.width()||i.visible!=c.height()||e.offset!=(parseInt(s.css("left"),10)||0)||i.offset!=(parseInt(s.css("top"),10)||0))&&($.extend(this.scrollx,{
offset:parseInt(s.css("left"),10)||0,
size:s.prop("scrollWidth"),
visible:c.width()
}),$.extend(this.scrolly,{
offset:parseInt(s.css("top"),10)||0,
size:this.container.prop("scrollHeight"),
visible:c.height()
}),this._updateScroll("x"===l?"y":"x",i));
}
};
var c=n;
$.fn.scrollbar=function(l,e){
return"string"!=typeof l&&(e=l,l="init"),"undefined"==typeof e&&(e=[]),$.isArray(e)||(e=[e]),
this.not("body, .scroll-wrapper").each(function(){
var s=$(this),o=s.data(t.data.name);
(o||"init"===l)&&(o||(o=new c(s)),o[l]&&o[l].apply(o,e));
}),this;
},$.fn.scrollbar.options=i;
var a=$.fn.scrollbar.updateScrollbars=function(){
var l=0,e=0;
return function(s){
var o,i,n,c,d,h,p;
for(o=0;o<t.scrolls.length;o++)c=t.scrolls[o],i=c.container,n=c.options,d=c.wrapper,
h=c.scrollx,p=c.scrolly,(s||n.autoUpdate&&d&&d.is(":visible")&&(i.prop("scrollWidth")!=h.size||i.prop("scrollHeight")!=p.size||d.width()!=h.visible||d.height()!=p.visible))&&(c.init(),
r&&(window.console&&console.log({
scrollHeight:i.prop("scrollHeight")+":"+c.scrolly.size,
scrollWidth:i.prop("scrollWidth")+":"+c.scrollx.size,
visibleHeight:d.height()+":"+c.scrolly.visible,
visibleWidth:d.width()+":"+c.scrollx.visible
},!0),e++));
r&&e>10?(window.console&&console.log("Scroll updates exceed 10"),a=function(){}):(clearTimeout(l),
l=setTimeout(a,300));
};
}();
});