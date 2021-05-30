(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[7],{606:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var o=!("undefined"===typeof window||!window.document||!window.document.createElement);var i=void 0;function r(){return void 0===i&&(i=function(){if(!o)return!1;if(!window.addEventListener||!window.removeEventListener||!Object.defineProperty)return!1;var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}}),n=function(){};window.addEventListener("testPassiveEventSupport",n,t),window.removeEventListener("testPassiveEventSupport",n,t)}catch(i){}return e}()),i}function s(e){e.handlers===e.nextHandlers&&(e.nextHandlers=e.handlers.slice())}function c(e){this.target=e,this.events={}}c.prototype.getEventHandlers=function(e,t){var n,o=String(e)+" "+String((n=t)?!0===n?100:(n.capture<<0)+(n.passive<<1)+(n.once<<2):0);return this.events[o]||(this.events[o]={handlers:[],handleEvent:void 0},this.events[o].nextHandlers=this.events[o].handlers),this.events[o]},c.prototype.handleEvent=function(e,t,n){var o=this.getEventHandlers(e,t);o.handlers=o.nextHandlers,o.handlers.forEach((function(e){e&&e(n)}))},c.prototype.add=function(e,t,n){var o=this,i=this.getEventHandlers(e,n);s(i),0===i.nextHandlers.length&&(i.handleEvent=this.handleEvent.bind(this,e,n),this.target.addEventListener(e,i.handleEvent,n)),i.nextHandlers.push(t);var r=!0;return function(){if(r){r=!1,s(i);var c=i.nextHandlers.indexOf(t);i.nextHandlers.splice(c,1),0===i.nextHandlers.length&&(o.target&&o.target.removeEventListener(e,i.handleEvent,n),i.handleEvent=void 0)}}};var a="__consolidated_events_handlers__";function l(e,t,n,o){e[a]||(e[a]=new c(e));var i=function(e){if(e)return r()?e:!!e.capture}(o);return e[a].add(t,n,i)}},607:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return O}));var o=n(606),i=(n(0),n(1)),r=n.n(i),s=n(103);function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t){return!t||"object"!==typeof t&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=a(e);if(t){var i=a(this).constructor;n=Reflect.construct(o,arguments,i)}else n=o.apply(this,arguments);return u(this,n)}}function f(e,t){var n,o=(n=e,!isNaN(parseFloat(n))&&isFinite(n)?parseFloat(n):"px"===n.slice(-2)?parseFloat(n.slice(0,-2)):void 0);if("number"===typeof o)return o;var i=function(e){if("%"===e.slice(-1))return parseFloat(e.slice(0,-1))/100}(e);return"number"===typeof i?i*t:void 0}var d="above",v="inside",h="below",w="invisible";function b(e){return"string"===typeof e.type}var y;var m=[];function g(e){m.push(e),y||(y=setTimeout((function(){var e;for(y=null;e=m.shift();)e()}),0));var t=!0;return function(){if(t){t=!1;var n=m.indexOf(e);-1!==n&&(m.splice(n,1),!m.length&&y&&(clearTimeout(y),y=null))}}}var j={debug:!1,scrollableAncestor:void 0,children:void 0,topOffset:"0px",bottomOffset:"0px",horizontal:!1,onEnter:function(){},onLeave:function(){},onPositionChange:function(){},fireOnRapidScroll:!0},O=function(t){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(y,t);var n,i,a,u=p(y);function y(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,y),(t=u.call(this,e)).refElement=function(e){t._ref=e},t}return n=y,(i=[{key:"componentDidMount",value:function(){var e=this;y.getWindow()&&(this.cancelOnNextTick=g((function(){e.cancelOnNextTick=null;var t=e.props,n=t.children;t.debug,function(e,t){if(e&&!b(e)&&!t)throw new Error("<Waypoint> needs a DOM element to compute boundaries. The child you passed is neither a DOM element (e.g. <div>) nor does it use the innerRef prop.\n\nSee https://goo.gl/LrBNgw for more info.")}(n,e._ref),e._handleScroll=e._handleScroll.bind(e),e.scrollableAncestor=e._findScrollableAncestor(),e.scrollEventListenerUnsubscribe=Object(o.a)(e.scrollableAncestor,"scroll",e._handleScroll,{passive:!0}),e.resizeEventListenerUnsubscribe=Object(o.a)(window,"resize",e._handleScroll,{passive:!0}),e._handleScroll(null)})))}},{key:"componentDidUpdate",value:function(){var e=this;y.getWindow()&&this.scrollableAncestor&&(this.cancelOnNextTick||(this.cancelOnNextTick=g((function(){e.cancelOnNextTick=null,e._handleScroll(null)}))))}},{key:"componentWillUnmount",value:function(){y.getWindow()&&(this.scrollEventListenerUnsubscribe&&this.scrollEventListenerUnsubscribe(),this.resizeEventListenerUnsubscribe&&this.resizeEventListenerUnsubscribe(),this.cancelOnNextTick&&this.cancelOnNextTick())}},{key:"_findScrollableAncestor",value:function(){var t=this.props,n=t.horizontal,o=t.scrollableAncestor;if(o)return function(t){return"window"===t?e.window:t}(o);for(var i=this._ref;i.parentNode;){if((i=i.parentNode)===document.body)return window;var r=window.getComputedStyle(i),s=(n?r.getPropertyValue("overflow-x"):r.getPropertyValue("overflow-y"))||r.getPropertyValue("overflow");if("auto"===s||"scroll"===s||"overlay"===s)return i}return window}},{key:"_handleScroll",value:function(e){if(this._ref){var t=this._getBounds(),n=function(e){return e.viewportBottom-e.viewportTop===0?w:e.viewportTop<=e.waypointTop&&e.waypointTop<=e.viewportBottom||e.viewportTop<=e.waypointBottom&&e.waypointBottom<=e.viewportBottom||e.waypointTop<=e.viewportTop&&e.viewportBottom<=e.waypointBottom?v:e.viewportBottom<e.waypointTop?h:e.waypointTop<e.viewportTop?d:w}(t),o=this._previousPosition,i=this.props,r=(i.debug,i.onPositionChange),s=i.onEnter,c=i.onLeave,a=i.fireOnRapidScroll;if(this._previousPosition=n,o!==n){var l={currentPosition:n,previousPosition:o,event:e,waypointTop:t.waypointTop,waypointBottom:t.waypointBottom,viewportTop:t.viewportTop,viewportBottom:t.viewportBottom};r.call(this,l),n===v?s.call(this,l):o===v&&c.call(this,l),a&&(o===h&&n===d||o===d&&n===h)&&(s.call(this,{currentPosition:v,previousPosition:o,event:e,waypointTop:t.waypointTop,waypointBottom:t.waypointBottom,viewportTop:t.viewportTop,viewportBottom:t.viewportBottom}),c.call(this,{currentPosition:n,previousPosition:v,event:e,waypointTop:t.waypointTop,waypointBottom:t.waypointBottom,viewportTop:t.viewportTop,viewportBottom:t.viewportBottom}))}}}},{key:"_getBounds",value:function(){var e,t,n=this.props,o=n.horizontal,i=(n.debug,this._ref.getBoundingClientRect()),r=i.left,s=i.top,c=i.right,a=i.bottom,l=o?r:s,u=o?c:a;this.scrollableAncestor===window?(e=o?window.innerWidth:window.innerHeight,t=0):(e=o?this.scrollableAncestor.offsetWidth:this.scrollableAncestor.offsetHeight,t=o?this.scrollableAncestor.getBoundingClientRect().left:this.scrollableAncestor.getBoundingClientRect().top);var p=this.props,d=p.bottomOffset;return{waypointTop:l,waypointBottom:u,viewportTop:t+f(p.topOffset,e),viewportBottom:t+e-f(d,e)}}},{key:"render",value:function(){var e=this,t=this.props.children;return t?b(t)||Object(s.isForwardRef)(t)?r.a.cloneElement(t,{ref:function(n){e.refElement(n),t.ref&&("function"===typeof t.ref?t.ref(n):t.ref.current=n)}}):r.a.cloneElement(t,{innerRef:this.refElement}):r.a.createElement("span",{ref:this.refElement,style:{fontSize:0}})}}])&&c(n.prototype,i),a&&c(n,a),y}(r.a.PureComponent);O.above=d,O.below=h,O.inside=v,O.invisible=w,O.getWindow=function(){if("undefined"!==typeof window)return window},O.defaultProps=j,O.displayName="Waypoint"}).call(this,n(29))},704:function(e,t,n){"use strict";var o=n(4),i=n(27),r=n(1),s=n(57),c=n(31);t.a=function(e){var t=e.first_name,n=e.last_name,a=e.img,l=e.id,u=e.changeStatus,p=e.status,f=e.handleOpen,d=e.search,v=e.setPopUpCancel,h=e.setPopupRequestCancel,w=Object(c.h)(),b=Object(r.useState)(""),y=Object(i.a)(b,2),m=y[0],g=y[1];return Object(o.jsx)("div",{children:Object(o.jsxs)("div",{className:"friend-request-main-page-body--wrapper",style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:7,border:"1px solid ",padding:8},children:[Object(o.jsxs)("div",{className:"friend-request-main-page-body--information",style:{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"},onClick:function(){return w.push("/consulting/information/".concat(l))},children:[Object(o.jsx)(s.t,{src:a||"https://i.stack.imgur.com/l60Hf.png",alt:"Avatar",width:80,height:80,style:{borderRadius:10}}),Object(o.jsxs)("h4",{style:{marginLeft:20},children:[t," ",n]})]}),Object(o.jsx)("div",{className:"friend-request-main-page-body--config",children:function(e,t){return"friend"===e?!1===t?Object(o.jsx)("div",{onClick:function(e){return f(e,{id:l})},children:Object(o.jsx)("i",{className:"fas fa-ellipsis-h"})}):Object(o.jsxs)("div",{children:[Object(o.jsx)(s.d,{color:"primary",variant:"outline",onClick:function(){v({show:!0})},children:"Unfriend"}),Object(o.jsxs)(s.d,{color:"primary",variant:"outline",onClick:function(){console.log("123")},children:[Object(o.jsx)("i",{className:"fas fa-phone"})," Call"]})]}):"confirm"===e?""!==m?Object(o.jsx)("div",{children:m}):Object(o.jsxs)("div",{style:{width:150,display:"flex",justifyContent:"space-between"},children:[Object(o.jsx)(s.d,{id:"btn_delete",color:"primary",variant:"outline",onClick:function(){u(l,"cancel"),g("Request removed")},children:"Delete"}),Object(o.jsx)(s.d,{id:"btn_confirm",color:"primary",variant:"outline",onClick:function(){u(l,"confirm"),g("Request accepted")},children:"Confirm"})]}):"cancel"===e?Object(o.jsx)(s.d,{color:"primary",variant:"outline",onClick:function(){return h({show:!0})},children:"Cancel request"}):Object(o.jsx)(s.d,{color:"primary",variant:"outline",onClick:function(){return u(l,null)},children:"Add friend"})}(p,d)})]})})}}}]);
//# sourceMappingURL=7.26a16b0e.chunk.js.map