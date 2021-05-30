(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[29],{1195:function(e,t,n){"use strict";n.r(t);var r=n(4),o=n(8),s=n(27),a=n(1),i=n(57),c=n(71),u=n(609),l=n(610),d=n(28),p=n(64),f=n(35),b=n(31),j=n(649),h=n(59),m=n(45),g=n(34),O=function(e){return l.b().shape({password:l.d().min(8,"your-password-must-be-at-least").required("your-password-must-be-at-least").matches(g.c.validate.validatePassword(),"your-password-must-be-at-least"),passwordConfirmation:l.d().required("your-password-must-be-at-least").oneOf([l.c("password"),null],"passwords-must-match").matches(g.c.validate.validatePassword(),"your-password-must-be-at-least")})},x={password:"",passwordConfirmation:""};t.default=function(){var e=Object(j.a)().t,t=Object(b.h)(),n=Object(d.b)(),l=Object(a.useState)(!1),w=Object(s.a)(l,2),y=w[0],v=w[1],C=function(){v(!y)},k=f.g.get("email"),S=f.g.get("session");if(!k||!S)return Object(r.jsx)(b.b,{to:"/admin/sign-in"});return Object(r.jsx)("div",{className:"c-app c-default-layout flex-row align-items-center",children:Object(r.jsx)(i.k,{children:Object(r.jsx)(i.L,{className:"justify-content-center",children:Object(r.jsx)(i.j,{md:"6",children:Object(r.jsx)(i.h,{children:Object(r.jsx)(i.e,{className:"p-4",children:Object(r.jsx)(i.f,{children:Object(r.jsx)(u.a,{initialValues:x,validate:Object(h.q)(O),onSubmit:function(e){var r,s,a={email:k,new_password:e.passwordConfirmation,session:S};r={method:"post",api:g.c.rest.forceChangePassword(),body:a,loading:!0,msg:g.c.messages.forceChangePasswordFailure},s=function(e){var r=e.status,s=e.data;if(r===m.c){var i=Object(o.a)(Object(o.a)({},s),{},{email:a.email});Object(h.m)(i),n(Object(p.f)(i)),t.push(g.c.routes.managerUsers())}},n(Object(m.d)(r,s))},children:function(t){var n=t.values,o=t.errors,s=t.touched,a=(t.status,t.dirty),u=t.handleChange,l=t.handleBlur,d=t.handleSubmit,p=(t.isSubmitting,t.isValid);t.handleReset,t.setTouched;return Object(r.jsxs)(i.q,{onSubmit:d,children:[Object(r.jsx)("h1",{children:e("reset-password")}),Object(r.jsx)("p",{className:"text-muted",children:e("change-your-password")}),Object(r.jsx)(i.r,{children:Object(r.jsxs)(i.w,{className:"mb-3",children:[Object(r.jsx)(i.u,{type:y?"text":"password",placeholder:e("password"),invalid:""!==n.password&&s.password&&!!o.password,autoComplete:"current-password",maxLength:16,value:n.password,onBlur:l,onChange:function(e){e.target.value.includes(" ")||u(e)},name:"password"}),Object(r.jsx)(i.y,{style:{cursor:"pointer"},children:Object(r.jsx)(i.z,{onClick:C,children:Object(r.jsx)(c.a,{name:y?"cil-lock-locked":"cil-lock-unlocked"})})}),Object(r.jsx)(i.A,{children:e(o.password||"")})]})}),Object(r.jsx)(i.r,{children:Object(r.jsxs)(i.w,{className:"mb-3",children:[Object(r.jsx)(i.u,{type:y?"text":"password",placeholder:e("password-confirmation"),invalid:""!==n.passwordConfirmation&&s.passwordConfirmation&&!!o.passwordConfirmation,autoComplete:"current-password",maxLength:16,value:n.passwordConfirmation,onBlur:l,onChange:function(e){e.target.value.includes(" ")||u(e)},name:"passwordConfirmation"}),Object(r.jsx)(i.y,{style:{cursor:"pointer"},children:Object(r.jsx)(i.z,{onClick:C,children:Object(r.jsx)(c.a,{name:y?"cil-lock-locked":"cil-lock-unlocked"})})}),Object(r.jsx)(i.A,{children:e(o.passwordConfirmation||"")})]})}),Object(r.jsx)(i.r,{children:Object(r.jsx)(i.L,{children:Object(r.jsx)(i.j,{xs:"6",children:Object(r.jsx)(i.d,{color:"primary",className:"px-4",type:"submit",disabled:!(p&&a),children:e("update")})})})})]})}})})})})})})})})}},617:function(e,t,n){var r=n(618),o=n(619),s=n(620),a=n(622);e.exports=function(e,t){return r(e)||o(e,t)||s(e,t)||a()},e.exports.default=e.exports,e.exports.__esModule=!0},618:function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.default=e.exports,e.exports.__esModule=!0},619:function(e,t){e.exports=function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,s=void 0;try{for(var a,i=e[Symbol.iterator]();!(r=(a=i.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(c){o=!0,s=c}finally{try{r||null==i.return||i.return()}finally{if(o)throw s}}return n}},e.exports.default=e.exports,e.exports.__esModule=!0},620:function(e,t,n){var r=n(621);e.exports=function(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},621:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r},e.exports.default=e.exports,e.exports.__esModule=!0},622:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},649:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n(617),o=n.n(r),s=n(164),a=n.n(s),i=n(1),c=n(464);function u(){if(console&&console.warn){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];"string"===typeof n[0]&&(n[0]="react-i18next:: ".concat(n[0])),(e=console).warn.apply(e,n)}}var l={};function d(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];"string"===typeof t[0]&&l[t[0]]||("string"===typeof t[0]&&(l[t[0]]=new Date),u.apply(void 0,t))}function p(e,t,n){e.loadNamespaces(t,(function(){if(e.isInitialized)n();else{e.on("initialized",(function t(){setTimeout((function(){e.off("initialized",t)}),0),n()}))}}))}function f(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t.languages||!t.languages.length)return d("i18n.languages were undefined or empty",t.languages),!0;var r=t.languages[0],o=!!t.options&&t.options.fallbackLng,s=t.languages[t.languages.length-1];if("cimode"===r.toLowerCase())return!0;var a=function(e,n){var r=t.services.backendConnector.state["".concat(e,"|").concat(n)];return-1===r||2===r};return!(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!a(t.isLanguageChangingTo,e))&&(!!t.hasResourceBundle(r,e)||(!t.services.backendConnector.backend||!(!a(r,e)||o&&!a(s,e))))}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.i18n,r=Object(i.useContext)(c.a)||{},s=r.i18n,a=r.defaultNS,u=n||s||Object(c.d)();if(u&&!u.reportNamespaces&&(u.reportNamespaces=new c.b),!u){d("You will need to pass in an i18next instance by using initReactI18next");var l=function(e){return Array.isArray(e)?e[e.length-1]:e},b=[l,{},!1];return b.t=l,b.i18n={},b.ready=!1,b}u.options.react&&void 0!==u.options.react.wait&&d("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var h=j(j(j({},Object(c.c)()),u.options.react),t),m=h.useSuspense,g=e||a||u.options&&u.options.defaultNS;g="string"===typeof g?[g]:g||["translation"],u.reportNamespaces.addUsedNamespaces&&u.reportNamespaces.addUsedNamespaces(g);var O=(u.isInitialized||u.initializedStoreOnce)&&g.every((function(e){return f(e,u,h)}));function x(){return{t:u.getFixedT(null,"fallback"===h.nsMode?g:g[0])}}var w=Object(i.useState)(x()),y=o()(w,2),v=y[0],C=y[1],k=Object(i.useRef)(!0);Object(i.useEffect)((function(){var e=h.bindI18n,t=h.bindI18nStore;function n(){k.current&&C(x())}return k.current=!0,O||m||p(u,g,(function(){k.current&&C(x())})),e&&u&&u.on(e,n),t&&u&&u.store.on(t,n),function(){k.current=!1,e&&u&&e.split(" ").forEach((function(e){return u.off(e,n)})),t&&u&&t.split(" ").forEach((function(e){return u.store.off(e,n)}))}}),[g.join()]);var S=[v.t,u,O];if(S.t=v.t,S.i18n=u,S.ready=O,O)return S;if(!O&&!m)return S;throw new Promise((function(e){p(u,g,(function(){e()}))}))}}}]);
//# sourceMappingURL=29.ba258401.chunk.js.map