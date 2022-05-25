if (self.CavalryLogger) { CavalryLogger.start_js_script(document.currentScript); }/*FB_PKG_DELIM*/

__d("MobileBigPipeStratcomProxy",["PageletEventConstsJS","PageletEventsHelper","Stratcom"],(function(a,b,c,d,e,f,g){"use strict";function a(){d("PageletEventsHelper").init(),d("PageletEventsHelper").subscribeToPageletEvents(h)}function h(a,b,d,e){b===c("PageletEventConstsJS").DISPLAY_END&&c("Stratcom").invoke("m:schedulable:loaded",null,{name:a,lid:e})}g.init=a;g._onPageletEvent=h}),98);
__d("MCoreDeferred",["MPageControllerImpl","MPageFetcherImpl"],(function(a,b,c,d,e,f){b("MPageControllerImpl"),b("MPageFetcherImpl")}),null);
__d("MFullPageLoadState",["NavigationMetrics","Stratcom"],(function(a,b,c,d,e,f,g){"use strict";var h="pre-tti",i=c("NavigationMetrics").addRetroactiveListener(c("NavigationMetrics").Events.EVENT_OCCURRED,a);c("Stratcom").listen("m:page:loading",null,function(){h==="pre-tti"?h="interrupted-pre-tti":h==="post-tti"?h="interrupted-post-tti":h==="post-dd"&&(h="interrupted-post-dd"),i&&i.remove(),i=null,c("Stratcom").removeCurrentListener()});function a(a,b){if(a!==c("NavigationMetrics").getFullPageLoadLid())return;b.event==="tti"&&h==="pre-tti"?h="post-tti":b.event==="all_pagelets_displayed"&&(h==="pre-tti"||h==="post-tti")?h="post-dd":b.event==="e2e"&&h!=="post-e2e"&&(h="post-e2e",i&&i.remove(),i=null)}function b(){return h}g.get=b}),98);
__d("MAsyncNavigationTrackerTypedLogger",["Banzai","GeneratedLoggerUtils"],(function(a,b,c,d,e,f){"use strict";a=function(){function a(){this.$1={}}var c=a.prototype;c.log=function(a){b("GeneratedLoggerUtils").log("logger:MAsyncNavigationTrackerLoggerConfig",this.$1,b("Banzai").BASIC,a)};c.logVital=function(a){b("GeneratedLoggerUtils").log("logger:MAsyncNavigationTrackerLoggerConfig",this.$1,b("Banzai").VITAL,a)};c.logImmediately=function(a){b("GeneratedLoggerUtils").log("logger:MAsyncNavigationTrackerLoggerConfig",this.$1,{signal:!0},a)};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setEventName=function(a){this.$1.event_name=a;return this};c.setEventSpecificDetails=function(a){this.$1.event_specific_details=b("GeneratedLoggerUtils").serializeMap(a);return this};c.setNavigationID=function(a){this.$1.navigation_id=a;return this};c.setPath=function(a){this.$1.path=a;return this};c.setSessionID=function(a){this.$1.session_id=a;return this};c.setSourcePath=function(a){this.$1.source_path=a;return this};c.setSourceTopView=function(a){this.$1.source_top_view=a;return this};c.setTimeSinceNavStart=function(a){this.$1.time_since_nav_start=a;return this};c.setTimeSinceSessionStart=function(a){this.$1.time_since_session_start=a;return this};return a}();c={event_name:!0,event_specific_details:!0,navigation_id:!0,path:!0,session_id:!0,source_path:!0,source_top_view:!0,time_since_nav_start:!0,time_since_session_start:!0};f["default"]=a}),66);
__d("MPageNavigationTracking",["EventListener","JavelinHistory","MAsyncNavigationTrackerTypedLogger","MFullPageLoadState","Stratcom","URI","performanceAbsoluteNow","performanceNavigationStart","uuid"],(function(a,b,c,d,e,f,g){"use strict";var h=c("uuid")(),i=0,j=null;function a(){c("Stratcom").listen("m:page:load-start",null,l),c("Stratcom").listen("m:page:render:complete",null,p),c("Stratcom").listen("m:history:change",null,m),c("Stratcom").listen("m:page:error",null,o),c("Stratcom").listen(["go","gouri"],null,s),c("EventListener").listen(window,"blur",q),c("EventListener").listen(window,"beforeunload",r)}function k(){j=null}function l(a){a=a.getData();var b=a.targetPath,e=a.previousPath,f=a.previousTopView,g=a.prefetchState;g=g===void 0?null:g;var h=a.cacheType;h=h===void 0?null:h;a=a.isFromHistory;a=a===void 0?!1:a;b=u(b);e=u(e);f=f;if(b==null)return;n(b,a);var k=++i;j={id:k,path:b,sourcePath:e,sourceTopView:f,startTimeAbsolute:c("performanceAbsoluteNow")(),prefetchState:g,cacheType:h,navigationType:a?"history":null};t("page_load_start",!1,{fullPageLoadState:d("MFullPageLoadState").get()})}function m(a){var b=u(a.getData().path);if(j&&j.path!==b){a=a.getData().trigger===c("JavelinHistory").TRIGGERS.POPSTATE;n(b,a)}}function n(a,b){if(!j)return;t("page_load_abandoned",!1,{abandonedToPath:a,isFromBackPress:b.toString()});k()}function o(a){if(!j)return;a=a.getData();t("page_load_failed",!1,{errorCode:(a==null?"":a).toString()});k()}function p(a){a=a.getData();a=a.path;a=u(a);if(a==null||j==null||j.path!=a)return;t("page_render_complete");k()}function q(){if(!j)return;t("browser_moved_to_background",!0);k()}function r(){t("session_unload",!0)}function s(a){a=a.getData();a=a.uri;t("session_navigate_away",!0,{uri:a});k()}function t(a,b,d){b===void 0&&(b=!1);if(j==null)return;d=d||{};d.cacheType=j.cacheType;d.navigationType=j.navigationType;d.prefetchState=j.prefetchState;var e=c("performanceAbsoluteNow")();a=new(c("MAsyncNavigationTrackerTypedLogger"))().setSessionID(h).setNavigationID(j.id.toString()).setPath(j.path).setSourcePath(j.sourcePath).setSourceTopView(j.sourceTopView).setEventName(a).setTimeSinceNavStart(e-j.startTimeAbsolute).setEventSpecificDetails(d).setTimeSinceSessionStart(e-c("performanceNavigationStart")());b?a.logImmediately():a.log()}function u(a){return!a?null:new(c("URI"))(a).getQualifiedURI().toString()}g.init=a}),98);
__d("onSyncTTI",["Arbiter","BigPipe","Stratcom"],(function(a,b,c,d,e,f,g){"use strict";function a(){c("Arbiter").subscribeOnce(c("BigPipe").Events.tti,function(){c("Stratcom").invoke("m:root:render")})}g.run=a}),98);
__d("AddressBar",["MViewport","ge","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){a=0;function g(){a=0;if(b("MViewport").getScrollTop()<60){var c=h()*-1;b("MViewport").scrollToHeader(c)}}function h(){var a=b("ge")("header-notices");return a?a.offsetHeight:0}function c(){navigator.userAgent.indexOf("iPad")===-1&&window.addEventListener("load",function a(){window.removeEventListener("load",a,!1),g()},!1)}f.setupLoadListener=c}),null);
__d("ViewportDimensions",["Bootloader","MViewport","isInIframe"],(function(a,b,c,d,e,f,g){"use strict";var h={_initialized:!1,_innerWidth:0,_innerHeight:0,_outerWidth:0,_outerHeight:0,_wasCookieSet:!1,init:function(){!h._initialized&&!c("isInIframe")()&&!d("MViewport").isLandscape()&&(h._initialized=!0,h._innerWidth=window.innerWidth,h._innerHeight=window.innerHeight,h._outerWidth=window.outerWidth,h._outerHeight=window.outerHeight)},setCookie:function(a){if(h._wasCookieSet){a&&a();return}c("Bootloader").loadModules(["Cookie"],function(b){if(!h._initialized)return;h._wasCookieSet||(h._wasCookieSet=!0,b.set("vpd",[h.getScreenDimension(h._innerHeight,h._outerHeight,screen.height,.87),h.getScreenDimension(h._innerWidth,h._outerWidth,screen.width,1),window.devicePixelRatio].join("x")));a&&a()},"ViewportDimensions")},getScreenDimension:function(a,b,c,d){var e=0;b===0?e=a:a===0?e=b:e=Math.min(a,b);a=Math.max(1,window.devicePixelRatio);return Math.floor(a*(e===0?Math.floor(c*d):e))}};a=h;g["default"]=a}),98);
__d("MViewportTracking",["invariant","DOM","DataAttributeUtils","FBJSON","MHome","MPopoverVisiblityTracker","MViewport","NavigationMetrics","Stratcom","Style","Vector","Visibility","VisibilityTrackingHelper","gkx","onAfterTTI","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f,g,h){"use strict";var i=97,j=200,k=new Map();a=function(){function a(){var a=this;this.$2=[];this.debugConsole=!1;this.activeStories={};this.cachedViewportHeight=0;this.discardVPVDIntervalThreshold=9e4;this.vpvdMinDuration=250;this.isLoose=!1;this.isTimeTrackingEnabled=!1;this.latestTimeTrackingTimestamp=0;this.maxScrollPosition=0;this.minSizeToBeVisible=0;this.readStoryIDs={};this.relaxedMinSize=!1;this.trackingHooks=!1;this.vpvdDebug=!1;this.vpvDebug=!1;this.enableAdsAllocationIntegrityLogging=!1;this.queueLogAction=function(){a.isLoose?a.$3||(a.$3=c("setTimeoutAcrossTransitions")(function(){a.maxScrollPosition=Math.max(a.maxScrollPosition,d("MViewport").getScrollTop()),a.startVpvTracking(),a.$3=null},100)):(window.clearTimeout(a.$1),a.$1=c("setTimeoutAcrossTransitions")(function(){a.startVpvTracking()},a.getTimeout()))}}var b=a.prototype;b.getDataFromConfig=function(a){h(0,2199)};b.getStoryID=function(a){h(0,2200)};b.getDataToLog=function(a){h(0,2201)};b.sendDataToLog=function(a){h(0,2202)};b.getTimeout=function(){h(0,2203)};b.getAllStories=function(){h(0,2204)};b.init=function(b){var e=this;this.isLoose=!!b.is_loose;this.relaxedMinSize=!!b.relaxed_min_size;this.vpvDebug=!!b.vpv_debug;this.isTimeTrackingEnabled=c("gkx")("985697");this.vpvdMinDuration=b.vpvd_min_duration||250;var f=a.shouldRunTrackingAfterTTI();d("MPopoverVisiblityTracker").init();f||(this.cachedViewportHeight=d("MViewport").getHeight());this.getDataFromConfig(b);this.maxScrollPosition=0;this.readStoryIDs=this.getCachedReadStoryIDs()||{};this.$2=[c("Stratcom").listen("m:page:unload",null,this.onUnload.bind(this)),c("Stratcom").listen("m:viewport:update-complete",null,function(){e.cachedViewportHeight=d("MViewport").getHeight()})];b.triggerOverride?this.$2=this.$2.concat(b.triggerOverride.map(function(a){var b=a[0];a=a[1];return c("Stratcom").listen(b,a,e.queueLogAction.bind(e))})):this.$2.push(c("Stratcom").listen("scroll",null,this.queueLogAction.bind(this)));this.isTimeTrackingEnabled&&(this.$2.push(c("Visibility").addListener(c("Visibility").VISIBLE,function(){return e.startVpvTracking()})),this.$2.push(c("Visibility").addListener(c("Visibility").HIDDEN,function(){return e.stopVpvTracking()})));this.$2.push(c("Stratcom").listen("m:newsfeed:popup-visible",null,function(){e.stopVpvTracking()}),c("Stratcom").listen("m:newsfeed:popup-hidden",null,function(){e.startVpvTracking()}));f?c("onAfterTTI")(function(){e.startVpvTracking()},!1):(this.startVpvTracking(),c("NavigationMetrics").addRetroactiveListener(c("NavigationMetrics").Events.EVENT_OCCURRED,function(a,b){a=b.event;a==="tti"&&(e.startVpvTracking(),c("NavigationMetrics").removeCurrentListener())}))};b.getFBFeedLocation=function(){return-1};b.unitTestOnlyGetListeners=function(){return[].concat(this.$2)};b.getCachedReadStoryIDs=function(){return null};b.getMinSizeToBeVisible=function(a){if(!this.relaxedMinSize)return j;a="getBoundingClientRect"in a?a.getBoundingClientRect().height:c("Vector").getDim(a).y;return Math.min(j,a*.5)};b.startVpvTracking=function(){this.isTimeTrackingEnabled?this.startRecordingTimeTrackingData():this.fireEvent()};b.stopVpvTracking=function(){this.isTimeTrackingEnabled?this.stopRecordingTimeTrackingData():this.fireEvent()};b.fireEvent=function(){if(d("VisibilityTrackingHelper").isSnippetFlyoutVisible())return;var a=this.getAllStoriesInView();for(var b=0;b<a.length;b++){var e=a[b],f=this.getStoryID(e);if(!f||f in this.readStoryIDs)continue;this.readStoryIDs[f]=!0;this.sendDataToLog(this.getDataToLog(e));if(this.vpvDebug){f=d("DOM").scry(e,"div")[0];f&&c("Style").set(f,"background-color","#fffbe2")}this.markStoryRead(e);this.fireStoryVisibleHandlers(e)}};b.fireStoryVisibleHandlers=function(a){(k.get(a)||[]).forEach(function(a){return a()}),k["delete"](a)};b.markStoryRead=function(a){};b.getTimetrackingDataToLog=function(b){var e=d("DOM").scry(b.story,"*","data-is-cta").map(function(a){a=c("DataAttributeUtils").getDataFt(a);a=a&&JSON.parse(a);return a&&a.cta_types}).filter(function(a){return!!a});this.cachedViewportHeight===0&&a.shouldRunTrackingAfterTTI()&&(this.cachedViewportHeight=d("MViewport").getHeight());return{evt:i,fbfeed_location:this.getFBFeedLocation(),story_height:b.story_height,viewport_height:this.cachedViewportHeight,vpvd_start_timestamp:b.evp_ts/1e3,vpvd_time_delta:Math.round(b.vpvd||0),cta_types:e}};b.recordTimeStoryWasInView=function(a){if(this.isTimeTrackingEnabled&&a.vpvd>=this.vpvdMinDuration){var b=this.getTimetrackingDataToLog(a);if(typeof b!=="string"){a=c("DataAttributeUtils").getDataFt(a.story);a&&(b=babelHelpers["extends"]({},b,d("FBJSON").parse(a,f.id)))}this.sendTimetrackingDataToLog(b)}};b.startRecordingTimeTrackingData=function(){this.$4(!1)};b.stopRecordingTimeTrackingData=function(){this.$4(!0)};b.$4=function(a){this.activeStories||(this.activeStories={});var b=Date.now();this.latestTimeTrackingTimestamp||(this.latestTimeTrackingTimestamp=b);var c=this.getAllStoriesInViewVpvd();this.updateVPVDurations(b);if(this.debugConsole){var d=Object.values(this.activeStories);d.length&&(console.table&&console.table(d))}d=this.updateActiveStories(c,b);this.debugConsole&&(d.length&&(console.table&&console.table(d)));this.recordVPVDurations(c,a);this.latestTimeTrackingTimestamp=a?0:b};b.updateVPVDurations=function(a){var b=a-this.latestTimeTrackingTimestamp;if(b>this.discardVPVDIntervalThreshold)return;b=a-this.latestTimeTrackingTimestamp;for(var a in this.activeStories)Object.prototype.hasOwnProperty.call(this.activeStories,a)&&(this.activeStories[a].vpvd+=b)};b.isVisible=function(a,b){for(var c=0;c<b.length;c++)if(this.getStoryID(b[c])===a)return!0;return!1};b.recordVPVDurations=function(a,b){this.recordVPVDurationsInternal(a,b)};b.recordVPVDurationsInternal=function(a,b){for(var c in this.activeStories)Object.prototype.hasOwnProperty.call(this.activeStories,c)&&((b||!this.isVisible(c,a))&&(this.recordTimeStoryWasInView(this.activeStories[c]),delete this.activeStories[c]))};b.updateActiveStories=function(a,b){var c=[];for(var d=0;d<a.length;d++){var e=this.getStoryID(a[d]);if(!e)break;e in this.activeStories||(this.activeStories[e]={evp_ts:b,story:a[d],vpvd:0,story_height:a[d].offsetHeight},c.push(this.activeStories[e]));this.activeStories[e].ts=b}return c};b.getAllStoriesInView=function(a){a===void 0&&(a=!1);return this.getAllStoriesInViewInternal(a,this.isLoose)};b.getAllStoriesInViewVpvd=function(){return this.getAllStoriesInViewInternal(!1,!1)};b.getAllStoriesInViewInternal=function(a,b){a===void 0&&(a=!1);b===void 0&&(b=!0);var c=[],e=this.getAllStories(),f=d("MViewport").getScrollTop(),g=d("MViewport").getHeight(),h=g+this.maxScrollPosition-f;for(var i=0;i<e.length;i++){var j=e[i],k=this.getStoryBounds(f,j),l=k.top;k=k.bottom;if(!l&&!k)continue;var m=this.getMinSizeToBeVisible(j);if(!b&&l>g-m)break;m=!b&&l<=g-m&&k>=m||b&&l<h;a&&(k<0||l>g)&&(m=!1);m&&c.push(j)}return c};b.getStoryBounds=function(a,b){if("getBoundingClientRect"in b){var d=b.getBoundingClientRect();return{bottom:d.bottom,top:d.top}}else{d=c("Vector").getPos(b).y-a;return{top:d,bottom:d+c("Vector").getDim(b).y}}};b.cleanup=function(){this.$2.forEach(function(a){return a.remove()}),this.$2=[],k.clear()};b.onUnload=function(){this.stopVpvTracking(),this.cleanup()};b.sendTimetrackingDataToLog=function(a){this.sendDataToLog(a)};a.shouldRunTrackingAfterTTI=function(){return d("MHome").isHome(location.href)&&c("gkx")("676812")};a.addStoryVisibleHandler=function(a,b){k.set(a,[].concat(k.get(a)||[],[b]));return{remove:function(){k.set(a,(k.get(a)||[]).filter(function(a){return a!==b}))}}};return a}();g["default"]=a}),98);
__d("WebCommentVpvDurationFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getFalcoLogPolicy_DO_NOT_USE")("1842512");c=b("FalcoLoggerInternal").create("web_comment_vpv_duration",a);e.exports=c}),null);
__d("MCommentViewportTracking",["DOM","DataStore","FBJSON","MParent","MViewportTracking","Stratcom","StratcomManager","WebCommentVpvDurationFalcoEvent","compactArray","gkx","onAfterTTI"],(function(a,b,c,d,e,f,g){"use strict";var h=null,i={m_group_stories_container:"group",m_newsfeed_stream:"",m_news_feed_stream:"",m_story_permalink_view:"",structured_composer_async_container:"user",root:""};a=function(a){babelHelpers.inheritsLoose(b,a);function b(){return a.apply(this,arguments)||this}b.loadedReplies=function(){c("Stratcom").invoke("m:commentViewportTracking:loadedReplies")};b.loadedComments=function(){h&&h.isTimeTrackingEnabled&&h.startRecordingTimeTrackingData()};b.singleton=function(a){if(!h){a={triggerOverride:[["scroll",null],["m:commentViewportTracking:loadedReplies",null],["m:feed-ufi-flyout:comments-displayed",null],["m:ufi:live-comments:render",null],["m:ufi:live-comments:new-comment",null],["m:feed-ufi-flyout:reset",null],["m:page:render:complete",null]]};d("StratcomManager").enableDispatch(document,"scroll");h=new b();h.init(a);h.debugConsole;h.isTimeTrackingEnabled&&(c("MViewportTracking").shouldRunTrackingAfterTTI()?c("onAfterTTI")(function(){h instanceof b&&h.startRecordingTimeTrackingData()},!1):h.startRecordingTimeTrackingData());c("Stratcom").listen("m:page:unload",null,function(){h=null,c("Stratcom").removeCurrentListener()})}};b.registerFlyout=function(a,b){var c;h&&(h.debugConsole,h.streamRoot=a);i=babelHelpers["extends"]((c={},c[a.id]=b||"",c),i)};var e=b.prototype;e.getDataFromConfig=function(){this.debugConsole=c("gkx")("676811"),this.isTimeTrackingEnabled=!0,this.idle_timeout=5e3,this.min_duration_to_log=100,this.min_visible_size=200,this.relaxedMinSize=!0};e.__getRootNode=function(){this.streamRoot||(this.streamRoot=c("compactArray")(Object.keys(i).map(function(a){return document.getElementById(a)}))[0]||null);return this.streamRoot};e.__getStaticTemplateRootNode=function(){this.staticElementRoot||(this.staticElementRoot=document.getElementById("static_templates"));return this.staticElementRoot};e.getAllStories=function(){var a=this.__getRootNode();if(!a)return[];a=d("DOM").scry(this.__getRootNode(),"div","comment-body");return this.__getStaticTemplateRootNode()?a.concat(d("DOM").scry(this.__getStaticTemplateRootNode(),"div","comment-body")):a};e.getTimeout=function(){return this.min_duration_to_log};e.getDataToLog=function(a){return{}};e.getStoryID=function(a){var b=a.getAttribute("data-commentid");return!b?String(d("DataStore").get(a,"token"))||null:b};e.getContainerModule=function(){var a=this.__getRootNode();return!a||!(a.id in i)?"other":i[a.id]};e.getTimetrackingDataToLog=function(a){var b=a.story,c;try{var e=d("MParent").bySigil(a.story,"story-div")||d("MParent").bySigil(a.story,"m-feed-single-story");e&&(c=d("FBJSON").parse(e.getAttribute("data-ft"),f.id))}catch(a){}return{comment_id:this.getStoryID(b),duration_ms:Math.round(a.vpvd),container_module:this.getContainerModule(),mf_story_key:c?c.mf_story_key||c.top_level_post_id:null}};e.sendDataToLog=function(a){a.comment_id&&(this.debugConsole,c("WebCommentVpvDurationFalcoEvent").log(function(){return{json_data:JSON.stringify(a)}}))};return b}(c("MViewportTracking"));g["default"]=a}),98);
__d("MemoryUtils",[],(function(a,b,c,d,e,f){"use strict";function g(){return window.performance&&window.performance.memory}function a(){return window.performance&&typeof window.performance.measureMemory==="function"}function b(){if(g()){typeof window.gc==="function"&&window.gc();var a=window.performance.memory;return{usedJSHeapSize:a.usedJSHeapSize}}return{usedJSHeapSize:null}}f.isMemoryAPISupported=g;f.isMeasureMemoryOriginTrialSupported=a;f.getCurrentMemory=b}),66);
__d("MemoryLoggerBase",["CurrentUser","MemoryLoggerConfigWebSitevarConfig","MemoryUtils","ODS","URI","gkx","ifRequired","performanceNow","regeneratorRuntime","requireDeferred","requireWeak","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f,g){var h=c("requireDeferred")("LogWebMemoryUsageFalcoEvent").__setRef("MemoryLoggerBase"),i;c("requireWeak")("AdsAccountStore",function(a){i=a});var j=c("CurrentUser").getAppID(),k=c("MemoryLoggerConfigWebSitevarConfig").measurement_interval_minutes*60*1e3,l=10*1e3,m,n=-1,o=-1,p=null,q=-1,r=null,s=-1;function t(){r||c("ifRequired")("InteractionTracingMetrics",function(a){r=a.getInteractionStat()})}function u(){r||t();return r?r.interactionCount:0}var v=c("gkx")("5525")?function(){s<0&&c("ifRequired")("AdsAccountInsightsStore",function(a){a=a.getLastThirtyDaysSpend().getValue();a!=null&&(s=a)});return s}:function(){return-1},w=c("gkx")("5525")?function(){var a;return(a=(a=i)==null?void 0:a.getSelectedAccountID())!=null?a:"0"}:function(){return"0"};function x(){return Math.max(l,-Math.log(Math.random())*k)}function y(){var a=x();c("setTimeoutAcrossTransitions")(function(){return b("regeneratorRuntime").async(function(a){while(1)switch(a.prev=a.next){case 0:a.next=2;return b("regeneratorRuntime").awrap(A());case 2:y();case 3:case"end":return a.stop()}},null,this)},a)}function z(a){a=new(c("URI"))(a);var b=a.getQueryData();b=b.ref;a.setFragment("").setQueryData({ref:b});return a.toString()}function A(){var a,e,f,g,i,k,l,r,s,t,x,y,A,B,C;return b("regeneratorRuntime").async(function(D){while(1)switch(D.prev=D.next){case 0:a=z(document.URL);e=d("MemoryUtils").getCurrentMemory();f=e.usedJSHeapSize;g=null;if(!d("MemoryUtils").isMeasureMemoryOriginTrialSupported()){D.next=9;break}D.next=7;return b("regeneratorRuntime").awrap(window.performance.measureMemory());case 7:i=D.sent,g=i.bytes;case 9:k=null;l=null;if(typeof URL._fbRegisteredObjectURL==="function"){r=URL._fbRegisteredObjectURL();k=r.length;l=0;for(s=0;s<r.length;s++)t=r[s],t.type==="Blob"&&(l+=t.size)}x=c("performanceNow")();y=Math.round(x/(1e3*60));A=u();B=v();C=w();h.onReady(function(b){b.log(function(){return{app_id:j,accurate_js_heap_size:g!=null?String(g):null,previous_uri:p,unrevoked_url_count:k!=null?String(k):null,unrevoked_memory_blob:l!=null?String(l):null,current_uri:a,minute:String(y),previous_used_js_heap_size:String(q),used_js_heap_size:String(f),navigation_count:String(n),news_feed_count:String(o),ad_spend_30:String(B),interaction_count:String(A),script_path:m,ad_account_id:String(C)}})});case 18:case"end":return D.stop()}},null,this)}a={init:function(a){m=a.scriptPath;if(k<=0)return;if(d("MemoryUtils").isMemoryAPISupported()){a=d("MemoryUtils").isMeasureMemoryOriginTrialSupported()?"experimental":"hit";d("ODS").bumpEntityKey(2966,"browser_memory_logger",a);y()}else d("ODS").bumpEntityKey(2966,"browser_memory_logger","miss")},setNavigationCount:function(a){n=a},setNewsFeedCount:function(a){o=a},setPreviousUri:function(a){p=z(a)},setPreviousUsedJSHeapSize:function(a){q=a},setScriptPath:function(a){m=a},getCurrentUsedJSHeapSize:function(){var a=d("MemoryUtils").getCurrentMemory();return(a=a.usedJSHeapSize)!=null?a:-1}};e=a;g["default"]=e}),98);
__d("MemoryLogger",["MemoryLoggerBase","NavigationMetrics","ScriptPath"],(function(a,b,c,d,e,f,g){var h=!1,i=0;a={init:function(a){var b=this;if(h)return;h=!0;c("MemoryLoggerBase").init({scriptPath:d("ScriptPath").getScriptPath()});d("ScriptPath").subscribe(function(){c("MemoryLoggerBase").setScriptPath(d("ScriptPath").getScriptPath())});c("NavigationMetrics").addListener(c("NavigationMetrics").Events.NAVIGATION_DONE,function(a,c){b.incrementNavigationCount(i)})},setPreviousUri:function(a){c("MemoryLoggerBase").setPreviousUri(a)},incrementNavigationCount:function(){c("MemoryLoggerBase").setNavigationCount(++i)}};b=a;g["default"]=b}),98);
__d("MLogging",["MLogState","MemoryLogger","Stratcom","gkx"],(function(a,b,c,d,e,f,g){var h=!1,i=document.URL;a=function(a){c("MLogState").setRefid(a.refid),!h&&c("gkx")("148")&&(c("MemoryLogger")==null?void 0:c("MemoryLogger").init({}),c("Stratcom").listen("history:change",null,function(){c("MemoryLogger").setPreviousUri(i),i=document.URL,c("MemoryLogger").incrementNavigationCount()}),h=!0)};g.main=a}),34);
__d("MPageLoadClientMetricsCallbacks",["MHistory","NavigationMetrics","Run","Stratcom","SubscriptionsHandler"],(function(a,b,c,d,e,f,g){"use strict";var h=new(c("SubscriptionsHandler"))();function i(){h.release()}function j(b,d,e){return c("NavigationMetrics").addRetroactiveListener(c("NavigationMetrics").Events.EVENT_OCCURRED,function(f,g){if(f!==b)c("NavigationMetrics").removeCurrentListener();else if(g.event===d){f=a.MPageLoadClientMetrics.currentTimeToNavStartDelta(g.timestamp);a.MPageLoadClientMetrics.logEvent(e,f);c("NavigationMetrics").removeCurrentListener()}})}function b(b){if(!a.MPageLoadClientMetrics||!a.MPageLoadClientMetrics.isEnabled())return;a.MPageLoadClientMetrics.setDisableCallback(i);h.addSubscriptions(j(b.lid,"tti","tti"),j(b.lid,"e2e","e2e"),c("Stratcom").listen("m:page:load-start",null,function(b){if(b.getData().isFromHistory)return;a.MPageLoadClientMetrics.logEvent("navigation",a.MPageLoadClientMetrics.getMSFromNavStart(),a.MPageLoadClientMetrics.origin+b.getData().targetPath)}),c("Stratcom").listen("m:history:change",null,function(){var b=c("MHistory").getState();b=b?"soft="+b:c("MHistory").getPath();a.MPageLoadClientMetrics.logEvent("navigation",a.MPageLoadClientMetrics.getMSFromNavStart(),b)}));d("Run").onUnload(function(){a.MPageLoadClientMetrics.disable()})}g.init=b}),98);
__d("MPageTitle",[],(function(a,b,c,d,e,f){function a(a){document.title=a}f.setTitle=a}),66);
__d("MTimeSpentDebug",["GeneratedLoggerUtils","ScriptPath"],(function(a,b,c,d,e,f,g){var h="logger:MDebugTimeSpentLoggerConfig",i={signal:!0,retry:!0},j=0;function a(a){if(a>=j&&a-j<1e3)return;var b={activity_time_ms:a,last_activity_time_ms:j,script_path:d("ScriptPath").getTopViewEndpoint()};d("GeneratedLoggerUtils").log(h,b,i);j=Math.floor(a/1e3)*1e3}g.report=a}),98);
__d("TimeSpentArray",["Banzai","TimeSlice","clearTimeout","pageID","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f,g){var h=2,i=h*32,j,k,l,m,n,o,p,q,r,s,t={},u;function v(){return{timeoutDelayMap:t,nextDelay:u,timeoutInSeconds:m}}function w(){if(j){var a=Date.now();a>o&&(q=Math.min(i,Math.ceil(a/1e3-n)));a=B();a&&j(a,u)}A()}function x(){y(),l=c("setTimeoutAcrossTransitions")(c("TimeSlice").guard(w,"TimeSpentArray Timeout",{propagationType:c("TimeSlice").PropagationType.ORPHAN}),m*1e3)}function y(){l&&(c("clearTimeout")(l),l=null)}function z(a){n=a;o=n*1e3;p=[1];for(var a=1;a<h;a++)p.push(0);q=1;r+=1;s+=1;a=s.toString()+"_delay";u=t[a];u===void 0&&(u=t.delay);a=s.toString()+"_timeout";a=t[a];a===void 0&&(a=t.timeout);a=Math.min(a,i);m=a||i;x()}function A(){y(),p=null}function B(){return!p?null:{tos_id:c("pageID"),start_time:n,tos_array:p.slice(0),tos_len:q,tos_seq:s,tos_cum:r}}function C(a){if(a>=o&&a-o<1e3)return;k&&k(a);D(Math.floor(a/1e3))}function D(a){var b=a-n;(b<0||b>=i)&&w();!p?z(a):(p[b>>5]|=1<<(b&31),q=b+1,r+=1,o=a*1e3)}function a(a,b,d,e){r=0,s=-1,j=a,k=e,typeof b==="object"&&b!==null?t=b:t={},z(Math.floor((d===void 0||d===null||d===0?Date.now():d)/1e3)),c("Banzai").subscribe(c("Banzai").SHUTDOWN,w)}function b(a){C(a)}function d(){return B()}function e(){w()}function f(){A()}function E(){return v()}g.init=a;g.update=b;g.get=d;g.ship=e;g.reset=f;g.testState=E}),98);
__d("WebImmediateActiveSecondsFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getFalcoLogPolicy_DO_NOT_USE")("1843988");c=b("FalcoLoggerInternal").create("web_immediate_active_seconds",a);e.exports=c}),null);
__d("TimeSpentImmediateActiveSecondsLoggerBlue",["ImmediateActiveSecondsConfig","ScriptPath","WebImmediateActiveSecondsFalcoEvent"],(function(a,b,c,d,e,f,g){var h=0;function i(a){if(c("ImmediateActiveSecondsConfig").sampling_rate<=0)return!1;a=Math.floor(a/1e3)%c("ImmediateActiveSecondsConfig").sampling_rate;return a===c("ImmediateActiveSecondsConfig").ias_bucket}function a(a){if(a>=h&&a-h<1e3)return;i(a)&&c("WebImmediateActiveSecondsFalcoEvent").logImmediately(function(){return{activity_time_ms:a,last_activity_time_ms:h,script_path:c("ScriptPath").getTopViewEndpoint()}});h=Math.floor(a/1e3)*1e3}f.exports={maybeReportActiveSecond:a}}),34);
__d("TimeSpentImmediateActiveSecondsLogger",["TimeSpentImmediateActiveSecondsLoggerBlue"],(function(a,b,c,d,e,f,g){"use strict";g["default"]=d("TimeSpentImmediateActiveSecondsLoggerBlue")}),98);
__d("WebTimeSpentBitArrayFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getFalcoLogPolicy_DO_NOT_USE")("1829320");c=b("FalcoLoggerInternal").create("web_time_spent_bit_array",a);e.exports=c}),null);
__d("MTimeSpentBitArrayLogger",["MTimeSpentDebug","ODS","Stratcom","TimeSpentArray","TimeSpentImmediateActiveSecondsLogger","Visibility","WebTimeSpentBitArrayFalcoEvent","isInIframe"],(function(a,b,c,d,e,f,g){function h(){d("TimeSpentArray").ship()}function i(){var a=Date.now();d("TimeSpentArray").update(a);c("TimeSpentImmediateActiveSecondsLogger").maybeReportActiveSecond(a);m&&d("MTimeSpentDebug").report(a)}function j(a){a._m="1",c("WebTimeSpentBitArrayFalcoEvent").logImmediately(function(){return{start_time:a.start_time,tos_array:a.tos_array,tos_cum:a.tos_cum,tos_id:a.tos_id,tos_len:a.tos_len,tos_seq:a.tos_seq,_m:"1"}})}function k(){return["gesturestart","mousedown","touchstart","scroll","keydown"]}function l(){var a=k();c("Stratcom").listen(a,null,i);a="onpagehide"in window?["pagehide","blur"]:["blur"];c("Stratcom").listen(a,null,h);c("Visibility").addListener("hidden",h)}var m=!1;function a(a,b){if(c("isInIframe")())return;m=!!b;b=Date.now();d("TimeSpentArray").init(j,null,b);l();c("TimeSpentImmediateActiveSecondsLogger").maybeReportActiveSecond(b);m&&d("MTimeSpentDebug").report(b);d("ODS").bumpEntityKey(223,"ms.time_spent.qa."+a,"time_spent.bits.js_initialized")}g.getMonitoredEvents=k;g.init=a}),98);
__d("MLinkLoggedOut",["DOM","JavelinHistory","MHistory","URI"],(function(a,b,c,d,e,f,g){var h=!1;function a(a){if(h)return;h=!0;var b=new(c("URI"))(c("MHistory").getPath()),d=b.getQueryData();d[a.impression_param_name]&&c("JavelinHistory").replace(b.removeQueryData(a.impression_param_name).toString());c("DOM").listen(document.documentElement,"click",null,function(b){b=b.getNode("tag:a");b=(b==null?void 0:b.getAttribute("href"))||null;var d=new(c("URI"))(b);d=d.getProtocol();if(b!==null&&(d===""||d==="http"||d==="https")&&b.indexOf("#")!==0){d=new(c("URI"))(c("MHistory").getPath());d=d.addQueryData(a.impression_param_name,a.impression_id);c("JavelinHistory").replace(d.toString())}return})}g.setupListener=a}),98);
__d("MUFICommentViewportTracking",["MLegacyDataStore","MUFIConfig","MViewportTracking","MarauderLogger"],(function(a,b,c,d,e,f,g){"use strict";a=function(a){babelHelpers.inheritsLoose(b,a);function b(){return a.apply(this,arguments)||this}var e=b.prototype;e.getDataFromConfig=function(a){this.vpvLoggingEnabled=a.vpvLoggingEnabled};e.getStoryID=function(a){return d("MLegacyDataStore").get(a).token};e.getDataToLog=function(a){return this.getStoryID(a)};e.sendDataToLog=function(a){this.vpvLoggingEnabled&&d("MarauderLogger").log("comment_vpv",void 0,null,"comment",a)};e.getTimeout=function(){return c("MUFIConfig").vpvLoggingTimeout};return b}(c("MViewportTracking"));g["default"]=a}),98);
__d("CommentsTimeSpentTypedLogger",["Banzai","GeneratedLoggerUtils"],(function(a,b,c,d,e,f){"use strict";a=function(){function a(){this.$1={}}var c=a.prototype;c.log=function(a){b("GeneratedLoggerUtils").log("logger:CommentsTimeSpentLoggerConfig",this.$1,b("Banzai").BASIC,a)};c.logVital=function(a){b("GeneratedLoggerUtils").log("logger:CommentsTimeSpentLoggerConfig",this.$1,b("Banzai").VITAL,a)};c.logImmediately=function(a){b("GeneratedLoggerUtils").log("logger:CommentsTimeSpentLoggerConfig",this.$1,{signal:!0},a)};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setEndTime=function(a){this.$1.end_time=a;return this};c.setOrderingMode=function(a){this.$1.ordering_mode=a;return this};c.setPostFbid=function(a){this.$1.post_fbid=a;return this};c.setStartTime=function(a){this.$1.start_time=a;return this};c.setTimeSpentID=function(a){this.$1.time_spent_id=a;return this};c.setViewerHasInteracted=function(a){this.$1.viewer_has_interacted=a;return this};return a}();c={end_time:!0,ordering_mode:!0,post_fbid:!0,start_time:!0,time_spent_id:!0,viewer_has_interacted:!0};f["default"]=a}),66);
__d("MUFIStaticCommentViewportTracking",["CommentsTimeSpentTypedLogger","MUFICommentViewportTracking","Stratcom","pageID"],(function(a,b,c,d,e,f,g){"use strict";var h={},i=null;a=function(a){babelHelpers.inheritsLoose(b,a);b.trackStatically=function(a,d,e,f,g){var j=g+"_"+f,k=h[j];k||(k=new b(),h[j]=k,k.init({is_loose:!1,relaxed_min_size:!0,vpv_debug:!1,triggerOverride:[["scroll",null],["touchmove","ufi-overlay"]],vpvLoggingEnabled:d,timeTrackingEnabled:e,orderingMode:f,targetFBID:g}));i||(i=c("Stratcom").listen("m:page:unload",null,b.resetAll));k.addComments(a);k.fireEvent()};b.resetAll=function(){i&&i.remove(),i=null,h={}};function b(){var b;b=a.call(this)||this;b.resetTimeSpentInterval();b.comments=[];return b}var d=b.prototype;d.addComments=function(a){this.comments.push.apply(this.comments,a)};d.getDataFromConfig=function(b){a.prototype.getDataFromConfig.call(this,b),this.orderingMode=b.orderingMode,this.targetFBID=b.targetFBID};d.getAllStories=function(){return this.comments};d.recordVPVDurations=function(a,b){this.recordVPVDurationsInternal(a,b),(b||!a.length)&&(this.timeSpentIntervalStart<this.timeSpentIntervalEnd&&new(c("CommentsTimeSpentTypedLogger"))().setOrderingMode(this.orderingMode).setPostFbid(this.targetFBID).setStartTime(this.timeSpentIntervalStart).setEndTime(this.timeSpentIntervalEnd).setTimeSpentID(c("pageID")).log(),this.resetTimeSpentInterval())};d.sendTimetrackingDataToLog=function(a){var b=Math.round(a.vpvd_start_timestamp);b<this.timeSpentIntervalStart&&(this.timeSpentIntervalStart=b);b=b+Math.round(a.vpvd_time_delta/1e3);b>this.timeSpentIntervalEnd&&(this.timeSpentIntervalEnd=b)};d.resetTimeSpentInterval=function(){this.timeSpentIntervalStart=Number.MAX_VALUE,this.timeSpentIntervalEnd=0};return b}(c("MUFICommentViewportTracking"));g["default"]=a}),98);
__d("MLiteInit",["Kite","WebLite"],(function(a,b,c,d,e,f,g){function a(){d("WebLite").init(),d("Kite").init()}g.init=a}),98);
__d("XOcelotComposerAsyncLoaderController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/composer/ocelot/async_loader/",{publisher:{type:"Enum",required:!0,enumType:1},target_id:{type:"FBID"}})}),null);
__d("WebBlueTimeSpentNavigationFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getFalcoLogPolicy_DO_NOT_USE")("1829319");c=b("FalcoLoggerInternal").create("web_blue_time_spent_navigation",a);e.exports=c}),null);
__d("ScriptPathLogger",["Banzai","LogHistory","ScriptPath","URI","WebBlueTimeSpentNavigationFalcoEvent","WebSession","isInIframe"],(function(a,b,c,d,e,f,g){"use strict";f="script_path_change";var h={scriptPath:null,categoryToken:null,extraData:{}},i=!1,j="imp_id";function k(a){var b=c("URI").getNextURI?c("URI").getNextURI():new(c("URI"))(window.location.href),d=b.getQueryData();b=b.getPath();b.endsWith("/")&&(b=b.substr(0,b.length-1));d.comment_id&&(a.extra_data=babelHelpers["extends"]({},a.extra_data,{graphql_comment_id:d.comment_id}));var e=l(b,d);if(e){a.content_id=e;return}e=m(b);if(e!==""){a.dest_topic_feed=e;return}if(n(b)){e=d.queue_id;e&&(a.dest_srt_queue_id=e);b=d.job_in_review;b&&(a.dest_srt_reviewing_job_id=b);return}}function l(a,b){if(b.story_fbid)return b.story_fbid;if(b.fbid)return b.fbid;if(b.view==="permalink"&&b.id)return b.id;b=/\/(posts|videos|notes|groups\/.*\/permalink)\//;var c=/^[0-9]+$/;if(b.test(a)){b=a.split("/");a=b[b.length-1];if(c.test(a))return a}return""}function m(a){if(!a||a.search("/feed/topics/")==-1)return"";a=a.split("/");return a[a.length-1]}function n(a){return!!a&&a.search("/intern/review/")!==-1}function o(a,b,e,f){d("WebSession").extend();if(!i||c("isInIframe")())return;var g={source_path:a.scriptPath,source_token:a.categoryToken,dest_path:b.scriptPath,dest_token:b.categoryToken,impression_id:b.extraData?b.extraData.imp_id:null,cause:e,sid_raw:d("WebSession").getId()};e=e==="unload";e||k(g);if(f!=null){var h=f.snowlift_content_id;!e&&h!=null&&(g.content_id=h,delete f.snowlift_content_id);g.extra_data=babelHelpers["extends"]({},g.extra_data,f)}a.scriptPath===null&&(g.referrer=document.referrer);e=d("ScriptPath").getClickPointInfo();e&&(g.click_point_info=e);if(a.extraData)for(var h in a.extraData)h!=j&&(g["source_"+h]=a.extraData[h]);if(b.extraData)for(var f in b.extraData)f!=j&&(g["dest_"+f]=b.extraData[f]);a.topViewEndpoint&&(g.source_endpoint=a.topViewEndpoint);b.topViewEndpoint&&(g.dest_endpoint=b.topViewEndpoint);a.restored&&(g.source_restored=!0);c("WebBlueTimeSpentNavigationFalcoEvent").logImmediately(function(){return{json_data:JSON.stringify(g)}});d("ScriptPath").setClickPointInfo(null)}function p(){o(d("ScriptPath").getSourcePageInfo()||h,d("ScriptPath").getPageInfo()||h,"load")}function q(a,b,c){o(a,b,"transition",c)}function a(){o(d("ScriptPath").getPageInfo()||h,h,"unload"),d("ScriptPath").shutdown()}var r=d("ScriptPath").subscribe(function(a){if(i){var b=a.source,c=a.dest,d=a.cause;a=a.extraData;d?o(b||h,c||h,d,a):b?q(b,c||h,a):p()}});c("Banzai").subscribe(c("Banzai").SHUTDOWN,a);function b(){i=!0,d("ScriptPath").getPageInfo()&&p()}function e(){i=!1,r.remove()}g.BANZAI_LOGGING_ROUTE=f;g.startLogging=b;g.stopLogging=e}),98);