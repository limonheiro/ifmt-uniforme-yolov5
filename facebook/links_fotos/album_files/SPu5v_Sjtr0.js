if (self.CavalryLogger) { CavalryLogger.start_js_script(document.currentScript); }/*FB_PKG_DELIM*/

__d("MVideoHomeSearchForm",["cx","DOM","Stratcom","SubscriptionsHandler","URI","ge","getActiveElement","goURI"],(function(a,b,c,d,e,f,g,h){"use strict";var i="watch-search-form-root-sigil";a=function(){function a(a){var b=this;this.$9=function(){b.$8()};this.$11=function(){b.$8()};this.$10=function(){b.$8()};this.$12=function(){b.$3.value="",b.$8()};this.$13=function(a){a.prevent();a=b.$3.value;if(a==="")return;b.$3.blur();a=c("URI").getRequestURI();a.setPath("/watch/search/");a.addQueryData("q",b.$3.value);c("goURI")(a)};this.$1=new(c("SubscriptionsHandler"))();this.$2=c("ge")(i);this.$3=d("DOM").find(this.$2,"input","search-small-box");this.$4=d("DOM").find(this.$2,"form","search-typeahead-form");this.$5=this.$2.getElementsByClassName("_5-ly")[0];this.$6=d("DOM").find(this.$2,"button","search-submit-button");this.setQuery((a=a.initialQuery)!=null?a:"");this.$7();this.$8()}var b=a.prototype;b.destroy=function(){this.$1.release()};b.setQuery=function(a){this.$3.value=a};b.$7=function(){this.$1.addSubscriptions(d("DOM").listen(this.$3,"focus",null,this.$9),d("DOM").listen(this.$3,"blur",null,this.$10),d("DOM").listen(this.$3,"input",null,this.$11),d("DOM").listen(this.$5,"mousedown",null,this.$12),d("DOM").listen(this.$5,"touchstart",null,this.$12),d("DOM").listen(this.$4,"submit",null,this.$13))};b.$8=function(){this.$3.value?d("DOM").show(this.$6):d("DOM").hide(this.$6);var a=c("getActiveElement")()===this.$3;a&&this.$3.value?d("DOM").show(this.$5):d("DOM").hide(this.$5)};a.initialize=function(b){var d=new a(b);c("Stratcom").listen("m:page:unload",null,function(){d.destroy(),c("Stratcom").removeCurrentListener()})};return a}();g["default"]=a}),98);
__d("MLoggedOutVideoHomeSearchOverlay",["DOM","MOverlay","MVideoHomeSearchForm","Stratcom","ge"],(function(a,b,c,d,e,f,g){"use strict";var h=["/watch?","/watch/","/videos/","/videos/?"],i=["/watch","/videos"],j="search_jewel_container_sigil",k="watch-search-icon-container",l="watch-search-overlay-content",m="watch-search-icon",n="watch-search-overlay-back",o="watch-search-form-page-header",p="search-small-box";a=function(){function a(a){var b=this;this.searchOverlay=a.searchOverlay;this.searchOverlayConfig=this.searchOverlay.config;this.initialQuery=a.initialQuery;a=this.searchOverlay.getContentRoot();this.searchOverlayContent=c("DOM").find(a,"div",l);this.existingSearchFormInPageHeader=c("ge")(o);this.watchSearchEntrypoint=c("ge")(k,null,"div");this.nonWatchSearchEntrypoint=c("ge")(j,null,"div");this.existingSearchFormInPageHeader!=null?this.searchInput=c("DOM").find(this.existingSearchFormInPageHeader,"input",p):this.searchInput=c("DOM").find(this.searchOverlayContent,"input",p);this.searchFormInitalized=!1;this.$1();this.$2();c("Stratcom").listen("m:page:beforeloading",null,function(){b.$2()})}var b=a.prototype;b.$1=function(){var a=this;c("Stratcom").listen("click",m,function(b){b.prevent(),a.existingSearchFormInPageHeader==null?(a.searchOverlay.isDestroyed()===!0&&(a.searchOverlay=new(c("MOverlay"))(a.searchOverlayConfig,a.searchOverlayContent),a.searchFormInitalized=!1,a.existingSearchFormInPageHeader=c("ge")(o),a.existingSearchFormInPageHeader!=null?a.searchInput=c("DOM").find(a.existingSearchFormInPageHeader,"input",p):a.searchInput=c("DOM").find(a.searchOverlayContent,"input",p)),a.searchOverlay.show()):a.searchInput.focus()});c("Stratcom").listen("Layer:show",null,function(){a.searchFormInitalized!==!0&&(c("MVideoHomeSearchForm").initialize({initialQuery:a.initialQuery}),a.searchFormInitalized=!0);var b=a.searchInput;window.setTimeout(function(){b.focus()},1)});c("Stratcom").listen("click",[l,n],function(b){b.prevent(),a.searchOverlay.hide()})};b.$2=function(){var a=window.location.href,b=h.some(function(b){return a.includes(b)})||i.some(function(b){return a.endsWith(b)});b?(this.watchSearchEntrypoint.style.display="block",this.nonWatchSearchEntrypoint.style.display="none"):(this.watchSearchEntrypoint.style.display="none",this.nonWatchSearchEntrypoint.style.display="block")};return a}();g["default"]=a}),98);
__d("PagesTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";a=function(){function a(){this.$1={}}var c=a.prototype;c.log=function(a){b("GeneratedLoggerUtils").log("logger:PagesLoggerConfig",this.$1,b("Banzai").BASIC,a)};c.logVital=function(a){b("GeneratedLoggerUtils").log("logger:PagesLoggerConfig",this.$1,b("Banzai").VITAL,a)};c.logImmediately=function(a){b("GeneratedLoggerUtils").log("logger:PagesLoggerConfig",this.$1,{signal:!0},a)};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setConnectionClass=function(a){this.$1.connection_class=a;return this};c.setEvent=function(a){this.$1.event=a;return this};c.setEventLocation=function(a){this.$1.event_location=a;return this};c.setEventTarget=function(a){this.$1.event_target=a;return this};c.setLogSource=function(a){this.$1.log_source=a;return this};c.setNavAttributionIDV2Key=function(a){this.$1.nav_attribution_id_v2_key=a;return this};c.setPageID=function(a){this.$1.page_id=a;return this};c.setRawClientTime=function(a){this.$1.raw_client_time=a;return this};c.setSessionid=function(a){this.$1.sessionid=a;return this};c.setTags=function(a){this.$1.tags=b("GeneratedLoggerUtils").serializeVector(a);return this};c.updateExtraData=function(a){a=b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));b("GeneratedLoggerUtils").checkExtraDataFieldNames(a,g);this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.addToExtraData=function(a,b){var c={};c[a]=b;return this.updateExtraData(c)};return a}();var g={connection_class:!0,event:!0,event_location:!0,event_target:!0,log_source:!0,nav_attribution_id_v2_key:!0,page_id:!0,raw_client_time:!0,sessionid:!0,tags:!0};f["default"]=a}),66);
__d("PagesLoggerEventEnum",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({CLICK:"click",CREATE:"create",DELETE:"delete",DRAG:"drag",HOVER:"hover",IMPRESSION:"impression",RECEIVE_REQUEST:"receive_request",RECEIVE_RESPONSE:"receive_response",SAVE:"save",SCROLL:"scroll",SEND_REQUEST:"send_request",SEND_RESPONSE:"send_response",UNSAVE:"unsave",UPDATE:"update"})}),null);
__d("PagesLogger",["PagesLoggerEventEnum","PagesTypedLogger"],(function(a,b,c,d,e,f){var g="extra_data_",h={log:function(a,c,d,e,f,h){e===void 0&&(e=null);f===void 0&&(f=[]);var i={},j=h||{};Object.keys(j||{}).forEach(function(a){var b=j[a];(b instanceof Array||b instanceof Object)&&(b=JSON.stringify(b));i[g+a]=b});new(b("PagesTypedLogger"))().setPageID(a).setEvent(c).setEventTarget(d).setEventLocation(e).setLogSource("pages_logger").setTags(f).updateExtraData(i).log()},registerLogOnClick:function(a,c,d,e,f,g){e===void 0&&(e=null),f===void 0&&(f=[]),g===void 0&&(g={}),a.addEventListener("click",function(){h.log(c,b("PagesLoggerEventEnum").CLICK,d,e,f,g)})}};e.exports=h}),null);
__d("PlatformWindowDialogCloser",[],(function(a,b,c,d,e,f){"use strict";function a(){window.close()}f.close=a}),66);
__d("QPAction",["$","DOM","ServerRedirect"],(function(a,b,c,d,e,f){a=function(a,c){window.close()||(c?g(a):b("ServerRedirect").redirectPageTo(a))};var g=function(a){window.location.replace(a)};c=function(a){b("DOM").replace(b("$")(a),"")};f.closeWindow=a;f.forceRedirect=g;f.closeDesktopWindow=c}),null);
__d("ScheduledApplyEach",["JSScheduler"],(function(a,b,c,d,e,f,g){"use strict";function a(a,b,c){return a.map(function(a){d("JSScheduler").deferUserBlockingRunAtCurrentPri_DO_NOT_USE(function(){b.apply(c,a)})})}g["default"]=a}),98);
__d("CheckpointStepIconSwitcher",["CSS"],(function(a,b,c,d,e,f){var g=null,h=null;function i(a){g!=null&&(h!=null&&b("CSS").hide(g[h]),b("CSS").show(g[a])),h=a}e.exports={init:function(a){g=a.icons;var b=h;h=a.selected;b!=null&&i(b)},show:function(a){i(a)}}}),null);
/**
 * License: https://www.facebook.com/legal/license/V9vdYColc4k/
 */
__d("react-dom-0.0.0",["ReactDOM"],(function(a,b,c,d,e,f){"use strict";function a(a){return a&&typeof a==="object"&&"default"in a?a["default"]:a}var g=a(b("ReactDOM"));d={};var h={exports:d};function i(){h.exports=g}var j=!1;function k(){j||(j=!0,i());return h.exports}function c(a){switch(a){case void 0:return k()}}e.exports=c}),null);
__d("react-dom",["react-dom-0.0.0"],(function(a,b,c,d,e,f){e.exports=b("react-dom-0.0.0")()}),null);
__d("debounce",["clearTimeout","debounceCore","setTimeout"],(function(a,b,c,d,e,f,g){function a(a,b,d,e,f){b===void 0&&(b=100);var g=function(a,b,d){return c("setTimeout")(a,b,d,!e)};return c("debounceCore")(a,b,d,g,c("clearTimeout"),f)}g["default"]=a}),98);
__d("getByPath",[],(function(a,b,c,d,e,f){"use strict";function a(a,b,c){a=a;for(var d=0;d<b.length;d++){var e=b[d];if(a&&typeof a!=="string"&&typeof a!=="number"&&e in a)a=a[e];else return c}return a}f["default"]=a}),66);
__d("VideoHomeClickLogger",["VideoHomeEvents","VideoHomeTypedLogger"],(function(a,b,c,d,e,f,g){"use strict";function h(a){var b=a.target,d=a.id,e=a.clickPoint,f=a.playerOrigin;f=f===void 0?"video_home":f;a=a.eventTargetInfo;a=a===void 0?null:a;new(c("VideoHomeTypedLogger"))().setEvent(c("VideoHomeEvents").CLICK).setEventTarget(b).setEventTargetID(d).setClickPoint(e).setPlayerOrigin(f).setEventTargetInfo(a).log()}function a(a,b){a.addEventListener("click",function(){h(b)})}g.logClick=h;g.init=a}),98);