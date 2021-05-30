(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[21],{606:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var o=!("undefined"===typeof window||!window.document||!window.document.createElement);var r=void 0;function i(){return void 0===r&&(r=function(){if(!o)return!1;if(!window.addEventListener||!window.removeEventListener||!Object.defineProperty)return!1;var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}}),n=function(){};window.addEventListener("testPassiveEventSupport",n,t),window.removeEventListener("testPassiveEventSupport",n,t)}catch(r){}return e}()),r}function a(e){e.handlers===e.nextHandlers&&(e.nextHandlers=e.handlers.slice())}function s(e){this.target=e,this.events={}}s.prototype.getEventHandlers=function(e,t){var n,o=String(e)+" "+String((n=t)?!0===n?100:(n.capture<<0)+(n.passive<<1)+(n.once<<2):0);return this.events[o]||(this.events[o]={handlers:[],handleEvent:void 0},this.events[o].nextHandlers=this.events[o].handlers),this.events[o]},s.prototype.handleEvent=function(e,t,n){var o=this.getEventHandlers(e,t);o.handlers=o.nextHandlers,o.handlers.forEach((function(e){e&&e(n)}))},s.prototype.add=function(e,t,n){var o=this,r=this.getEventHandlers(e,n);a(r),0===r.nextHandlers.length&&(r.handleEvent=this.handleEvent.bind(this,e,n),this.target.addEventListener(e,r.handleEvent,n)),r.nextHandlers.push(t);var i=!0;return function(){if(i){i=!1,a(r);var s=r.nextHandlers.indexOf(t);r.nextHandlers.splice(s,1),0===r.nextHandlers.length&&(o.target&&o.target.removeEventListener(e,r.handleEvent,n),r.handleEvent=void 0)}}};var c="__consolidated_events_handlers__";function u(e,t,n,o){e[c]||(e[c]=new s(e));var r=function(e){if(e)return i()?e:!!e.capture}(o);return e[c].add(t,n,r)}},607:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return x}));var o=n(606),r=(n(0),n(1)),i=n.n(r),a=n(103);function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e,t){return!t||"object"!==typeof t&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=c(e);if(t){var r=c(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return l(this,n)}}function p(e,t){var n,o=(n=e,!isNaN(parseFloat(n))&&isFinite(n)?parseFloat(n):"px"===n.slice(-2)?parseFloat(n.slice(0,-2)):void 0);if("number"===typeof o)return o;var r=function(e){if("%"===e.slice(-1))return parseFloat(e.slice(0,-1))/100}(e);return"number"===typeof r?r*t:void 0}var d="above",v="inside",h="below",w="invisible";function y(e){return"string"===typeof e.type}var b;var g=[];function m(e){g.push(e),b||(b=setTimeout((function(){var e;for(b=null;e=g.shift();)e()}),0));var t=!0;return function(){if(t){t=!1;var n=g.indexOf(e);-1!==n&&(g.splice(n,1),!g.length&&b&&(clearTimeout(b),b=null))}}}var O={debug:!1,scrollableAncestor:void 0,children:void 0,topOffset:"0px",bottomOffset:"0px",horizontal:!1,onEnter:function(){},onLeave:function(){},onPositionChange:function(){},fireOnRapidScroll:!0},x=function(t){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(b,t);var n,r,c,l=f(b);function b(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,b),(t=l.call(this,e)).refElement=function(e){t._ref=e},t}return n=b,(r=[{key:"componentDidMount",value:function(){var e=this;b.getWindow()&&(this.cancelOnNextTick=m((function(){e.cancelOnNextTick=null;var t=e.props,n=t.children;t.debug,function(e,t){if(e&&!y(e)&&!t)throw new Error("<Waypoint> needs a DOM element to compute boundaries. The child you passed is neither a DOM element (e.g. <div>) nor does it use the innerRef prop.\n\nSee https://goo.gl/LrBNgw for more info.")}(n,e._ref),e._handleScroll=e._handleScroll.bind(e),e.scrollableAncestor=e._findScrollableAncestor(),e.scrollEventListenerUnsubscribe=Object(o.a)(e.scrollableAncestor,"scroll",e._handleScroll,{passive:!0}),e.resizeEventListenerUnsubscribe=Object(o.a)(window,"resize",e._handleScroll,{passive:!0}),e._handleScroll(null)})))}},{key:"componentDidUpdate",value:function(){var e=this;b.getWindow()&&this.scrollableAncestor&&(this.cancelOnNextTick||(this.cancelOnNextTick=m((function(){e.cancelOnNextTick=null,e._handleScroll(null)}))))}},{key:"componentWillUnmount",value:function(){b.getWindow()&&(this.scrollEventListenerUnsubscribe&&this.scrollEventListenerUnsubscribe(),this.resizeEventListenerUnsubscribe&&this.resizeEventListenerUnsubscribe(),this.cancelOnNextTick&&this.cancelOnNextTick())}},{key:"_findScrollableAncestor",value:function(){var t=this.props,n=t.horizontal,o=t.scrollableAncestor;if(o)return function(t){return"window"===t?e.window:t}(o);for(var r=this._ref;r.parentNode;){if((r=r.parentNode)===document.body)return window;var i=window.getComputedStyle(r),a=(n?i.getPropertyValue("overflow-x"):i.getPropertyValue("overflow-y"))||i.getPropertyValue("overflow");if("auto"===a||"scroll"===a||"overlay"===a)return r}return window}},{key:"_handleScroll",value:function(e){if(this._ref){var t=this._getBounds(),n=function(e){return e.viewportBottom-e.viewportTop===0?w:e.viewportTop<=e.waypointTop&&e.waypointTop<=e.viewportBottom||e.viewportTop<=e.waypointBottom&&e.waypointBottom<=e.viewportBottom||e.waypointTop<=e.viewportTop&&e.viewportBottom<=e.waypointBottom?v:e.viewportBottom<e.waypointTop?h:e.waypointTop<e.viewportTop?d:w}(t),o=this._previousPosition,r=this.props,i=(r.debug,r.onPositionChange),a=r.onEnter,s=r.onLeave,c=r.fireOnRapidScroll;if(this._previousPosition=n,o!==n){var u={currentPosition:n,previousPosition:o,event:e,waypointTop:t.waypointTop,waypointBottom:t.waypointBottom,viewportTop:t.viewportTop,viewportBottom:t.viewportBottom};i.call(this,u),n===v?a.call(this,u):o===v&&s.call(this,u),c&&(o===h&&n===d||o===d&&n===h)&&(a.call(this,{currentPosition:v,previousPosition:o,event:e,waypointTop:t.waypointTop,waypointBottom:t.waypointBottom,viewportTop:t.viewportTop,viewportBottom:t.viewportBottom}),s.call(this,{currentPosition:n,previousPosition:v,event:e,waypointTop:t.waypointTop,waypointBottom:t.waypointBottom,viewportTop:t.viewportTop,viewportBottom:t.viewportBottom}))}}}},{key:"_getBounds",value:function(){var e,t,n=this.props,o=n.horizontal,r=(n.debug,this._ref.getBoundingClientRect()),i=r.left,a=r.top,s=r.right,c=r.bottom,u=o?i:a,l=o?s:c;this.scrollableAncestor===window?(e=o?window.innerWidth:window.innerHeight,t=0):(e=o?this.scrollableAncestor.offsetWidth:this.scrollableAncestor.offsetHeight,t=o?this.scrollableAncestor.getBoundingClientRect().left:this.scrollableAncestor.getBoundingClientRect().top);var f=this.props,d=f.bottomOffset;return{waypointTop:u,waypointBottom:l,viewportTop:t+p(f.topOffset,e),viewportBottom:t+e-p(d,e)}}},{key:"render",value:function(){var e=this,t=this.props.children;return t?y(t)||Object(a.isForwardRef)(t)?i.a.cloneElement(t,{ref:function(n){e.refElement(n),t.ref&&("function"===typeof t.ref?t.ref(n):t.ref.current=n)}}):i.a.cloneElement(t,{innerRef:this.refElement}):i.a.createElement("span",{ref:this.refElement,style:{fontSize:0}})}}])&&s(n.prototype,r),c&&s(n,c),b}(i.a.PureComponent);x.above=d,x.below=h,x.inside=v,x.invisible=w,x.getWindow=function(){if("undefined"!==typeof window)return window},x.defaultProps=O,x.displayName="Waypoint"}).call(this,n(29))},617:function(e,t,n){var o=n(618),r=n(619),i=n(620),a=n(622);e.exports=function(e,t){return o(e)||r(e,t)||i(e,t)||a()},e.exports.default=e.exports,e.exports.__esModule=!0},618:function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.default=e.exports,e.exports.__esModule=!0},619:function(e,t){e.exports=function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(o=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(c){r=!0,i=c}finally{try{o||null==s.return||s.return()}finally{if(r)throw i}}return n}},e.exports.default=e.exports,e.exports.__esModule=!0},620:function(e,t,n){var o=n(621);e.exports=function(e,t){if(e){if("string"===typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},621:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o},e.exports.default=e.exports,e.exports.__esModule=!0},622:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},624:function(e,t,n){"use strict";function o(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}n.d(t,"a",(function(){return o}))},649:function(e,t,n){"use strict";n.d(t,"a",(function(){return w}));var o=n(617),r=n.n(o),i=n(164),a=n.n(i),s=n(1),c=n(464);function u(){if(console&&console.warn){for(var e,t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];"string"===typeof n[0]&&(n[0]="react-i18next:: ".concat(n[0])),(e=console).warn.apply(e,n)}}var l={};function f(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];"string"===typeof t[0]&&l[t[0]]||("string"===typeof t[0]&&(l[t[0]]=new Date),u.apply(void 0,t))}function p(e,t,n){e.loadNamespaces(t,(function(){if(e.isInitialized)n();else{e.on("initialized",(function t(){setTimeout((function(){e.off("initialized",t)}),0),n()}))}}))}function d(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t.languages||!t.languages.length)return f("i18n.languages were undefined or empty",t.languages),!0;var o=t.languages[0],r=!!t.options&&t.options.fallbackLng,i=t.languages[t.languages.length-1];if("cimode"===o.toLowerCase())return!0;var a=function(e,n){var o=t.services.backendConnector.state["".concat(e,"|").concat(n)];return-1===o||2===o};return!(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!a(t.isLanguageChangingTo,e))&&(!!t.hasResourceBundle(o,e)||(!t.services.backendConnector.backend||!(!a(o,e)||r&&!a(i,e))))}function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function w(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.i18n,o=Object(s.useContext)(c.a)||{},i=o.i18n,a=o.defaultNS,u=n||i||Object(c.d)();if(u&&!u.reportNamespaces&&(u.reportNamespaces=new c.b),!u){f("You will need to pass in an i18next instance by using initReactI18next");var l=function(e){return Array.isArray(e)?e[e.length-1]:e},v=[l,{},!1];return v.t=l,v.i18n={},v.ready=!1,v}u.options.react&&void 0!==u.options.react.wait&&f("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var w=h(h(h({},Object(c.c)()),u.options.react),t),y=w.useSuspense,b=e||a||u.options&&u.options.defaultNS;b="string"===typeof b?[b]:b||["translation"],u.reportNamespaces.addUsedNamespaces&&u.reportNamespaces.addUsedNamespaces(b);var g=(u.isInitialized||u.initializedStoreOnce)&&b.every((function(e){return d(e,u,w)}));function m(){return{t:u.getFixedT(null,"fallback"===w.nsMode?b:b[0])}}var O=Object(s.useState)(m()),x=r()(O,2),E=x[0],_=x[1],T=Object(s.useRef)(!0);Object(s.useEffect)((function(){var e=w.bindI18n,t=w.bindI18nStore;function n(){T.current&&_(m())}return T.current=!0,g||y||p(u,b,(function(){T.current&&_(m())})),e&&u&&u.on(e,n),t&&u&&u.store.on(t,n),function(){T.current=!1,e&&u&&e.split(" ").forEach((function(e){return u.off(e,n)})),t&&u&&t.split(" ").forEach((function(e){return u.store.off(e,n)}))}}),[b.join()]);var j=[E.t,u,g];if(j.t=E.t,j.i18n=u,j.ready=g,g)return j;if(!g&&!y)return j;throw new Promise((function(e){p(u,b,(function(){e()}))}))}}}]);
//# sourceMappingURL=21.4b2066a6.chunk.js.map