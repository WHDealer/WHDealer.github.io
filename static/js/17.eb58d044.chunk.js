(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[17],{1192:function(e,t,n){"use strict";n.r(t);var r=n(4),o=n(27),a=n(1),s=n(57),i=n(31),c=n(609),l=n(610),u=n(34),d=n(45),f=n(649),p=n(28),b=n(59),h=n(903),g=n.n(h),m=n(633),_=n(163),j=function(e){return l.b().shape({email:l.d().min(3,"email-must-be-at-least-3-chara").matches(u.c.validate.validateEmail(),"email-format-is-incorrect").required("email-is-required")})},w={email:""};t.default=function(e){var t=Object(f.a)().t,n=Object(i.h)(),l=Object(p.b)(),h=Object(a.useState)({show:!1,id:0,content:"",title:"",email:""}),x=Object(o.a)(h,2),O=x[0],v=x[1];return Object(r.jsxs)("div",{className:"petrol",children:[Object(r.jsx)(_.h,{show:O.show,handleClose:function(){v(O.show=!O.show)},title:O.title,content:O.content,up:"Verstanden",upCallback:function(){return n.push("/sign-in")}}),Object(r.jsx)(m.a,{className:"FormAuth-container",children:Object(r.jsx)(c.a,{initialValues:w,validate:Object(b.q)(j),onSubmit:function(e){var t,n;t={method:"get",api:u.c.rest.forgotPasswordUser(e.email),loading:!0,msg:u.c.messages.forgotPasswordFailure},n=function(e){var t=e.status;e.id,t===d.c&&v({show:!0,title:"Information",content:"Wir haben eine Email an Sie gesendet. Folgen Sie den Anweisungen in der Nachricht um Ihr Passwort zur\xfcckzusetzen"}),t===d.b&&v({show:!0,id:31,content:"Ihre E-Mail Adresse kann nicht gefunden werden.",title:"Information"})},l(Object(d.d)(t,n))},children:function(e){var o=e.values,a=e.errors,i=e.touched,c=e.dirty,l=e.handleChange,u=e.handleBlur,d=e.handleSubmit,f=e.isValid;return Object(r.jsxs)(s.q,{onSubmit:d,children:[Object(r.jsxs)(_.d,{color:"petrol",onClick:function(){return n.push("/sign-in")},className:g.a.btnSignUp,children:[Object(r.jsx)("i",{className:"hb-icon-arrow-left ".concat(g.a.hbIcon)})," Zur\xfcck"]}),Object(r.jsx)("h1",{className:g.a.cardTitle,children:"Passwort"}),Object(r.jsx)("h1",{className:g.a.cardTitleBottom,children:"vergessen"}),Object(r.jsx)("p",{className:g.a.cardContent,children:"Geben Sie Ihre Emailadresse ein und wir senden Ihnen einen Link um Ihr Passwort zur\xfcckzusetzen."}),Object(r.jsxs)(s.r,{children:[Object(r.jsx)(s.u,{type:"text",placeholder:"Mailadresse",autoComplete:"email",invalid:""!==o.email&&i.email&&!!a.email,name:"email",maxLength:50,value:o.email,onChange:l,onBlur:u,className:g.a.inputText}),Object(r.jsx)(s.A,{children:t(a.email||"")})]}),Object(r.jsx)(s.r,{children:Object(r.jsx)(s.L,{children:Object(r.jsx)(s.j,{xs:"12",children:Object(r.jsx)(_.a,{color:"violet",children:"Passwort zur\xfccksetzen",disabled:!(f&&c),btnClassName:g.a.btnSubmit})})})})]})}})})]})}},617:function(e,t,n){var r=n(618),o=n(619),a=n(620),s=n(622);e.exports=function(e,t){return r(e)||o(e,t)||a(e,t)||s()},e.exports.default=e.exports,e.exports.__esModule=!0},618:function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.default=e.exports,e.exports.__esModule=!0},619:function(e,t){e.exports=function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var s,i=e[Symbol.iterator]();!(r=(s=i.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(c){o=!0,a=c}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}},e.exports.default=e.exports,e.exports.__esModule=!0},620:function(e,t,n){var r=n(621);e.exports=function(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},621:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r},e.exports.default=e.exports,e.exports.__esModule=!0},622:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},625:function(e,t,n){"use strict";var r=n(4),o=n(57),a=(n(1),n(35)),s=n(626),i=n.n(s);t.a=function(){return Object(r.jsx)(o.s,{className:i.a.header,children:a.f})}},626:function(e,t,n){e.exports={header:"Header_header__3Keph"}},633:function(e,t,n){"use strict";var r=n(4),o=n(57),a=(n(1),n(634)),s=n.n(a),i=n(625);t.a=function(e){var t=e.className,n=void 0===t?"":t,a=e.children;return Object(r.jsxs)("div",{className:"hb-user c-app c-default-layout flex-row align-items-center ".concat(s.a.wrapper," ").concat(n),children:[Object(r.jsx)(i.a,{}),Object(r.jsx)(o.k,{className:s.a.container,children:Object(r.jsx)(o.L,{className:"justify-content-center",children:Object(r.jsx)(o.j,{md:"4",lg:"4",xl:"4",className:s.a.cardContainer,children:Object(r.jsx)(o.e,{className:"p-1 ".concat(s.a.cardWrapper),children:Object(r.jsx)(o.f,{className:s.a.cardBody,children:a})})})})})]})}},634:function(e,t,n){e.exports={wrapper:"Container_wrapper__z5goK",cardContainer:"Container_cardContainer__3GnEz",cardWrapper:"Container_cardWrapper__17yG1",cardTitle:"Container_cardTitle__18hcX",cardBody:"Container_cardBody__1YCba"}},649:function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));var r=n(617),o=n.n(r),a=n(164),s=n.n(a),i=n(1),c=n(464);function l(){if(console&&console.warn){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];"string"===typeof n[0]&&(n[0]="react-i18next:: ".concat(n[0])),(e=console).warn.apply(e,n)}}var u={};function d(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];"string"===typeof t[0]&&u[t[0]]||("string"===typeof t[0]&&(u[t[0]]=new Date),l.apply(void 0,t))}function f(e,t,n){e.loadNamespaces(t,(function(){if(e.isInitialized)n();else{e.on("initialized",(function t(){setTimeout((function(){e.off("initialized",t)}),0),n()}))}}))}function p(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t.languages||!t.languages.length)return d("i18n.languages were undefined or empty",t.languages),!0;var r=t.languages[0],o=!!t.options&&t.options.fallbackLng,a=t.languages[t.languages.length-1];if("cimode"===r.toLowerCase())return!0;var s=function(e,n){var r=t.services.backendConnector.state["".concat(e,"|").concat(n)];return-1===r||2===r};return!(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!s(t.isLanguageChangingTo,e))&&(!!t.hasResourceBundle(r,e)||(!t.services.backendConnector.backend||!(!s(r,e)||o&&!s(a,e))))}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){s()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.i18n,r=Object(i.useContext)(c.a)||{},a=r.i18n,s=r.defaultNS,l=n||a||Object(c.d)();if(l&&!l.reportNamespaces&&(l.reportNamespaces=new c.b),!l){d("You will need to pass in an i18next instance by using initReactI18next");var u=function(e){return Array.isArray(e)?e[e.length-1]:e},b=[u,{},!1];return b.t=u,b.i18n={},b.ready=!1,b}l.options.react&&void 0!==l.options.react.wait&&d("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var g=h(h(h({},Object(c.c)()),l.options.react),t),m=g.useSuspense,_=e||s||l.options&&l.options.defaultNS;_="string"===typeof _?[_]:_||["translation"],l.reportNamespaces.addUsedNamespaces&&l.reportNamespaces.addUsedNamespaces(_);var j=(l.isInitialized||l.initializedStoreOnce)&&_.every((function(e){return p(e,l,g)}));function w(){return{t:l.getFixedT(null,"fallback"===g.nsMode?_:_[0])}}var x=Object(i.useState)(w()),O=o()(x,2),v=O[0],y=O[1],P=Object(i.useRef)(!0);Object(i.useEffect)((function(){var e=g.bindI18n,t=g.bindI18nStore;function n(){P.current&&y(w())}return P.current=!0,j||m||f(l,_,(function(){P.current&&y(w())})),e&&l&&l.on(e,n),t&&l&&l.store.on(t,n),function(){P.current=!1,e&&l&&e.split(" ").forEach((function(e){return l.off(e,n)})),t&&l&&t.split(" ").forEach((function(e){return l.store.off(e,n)}))}}),[_.join()]);var S=[v.t,l,j];if(S.t=v.t,S.i18n=l,S.ready=j,j)return S;if(!j&&!m)return S;throw new Promise((function(e){f(l,_,(function(){e()}))}))}},903:function(e,t,n){e.exports={inputText:"ForgotPassword_inputText__WLMP3",cardTitle:"ForgotPassword_cardTitle__2LAJg",cardTitleBottom:"ForgotPassword_cardTitleBottom__OZkeH",cardContent:"ForgotPassword_cardContent__2FAFl",inputPassword:"ForgotPassword_inputPassword__3cEd1",inputTextPassword:"ForgotPassword_inputTextPassword__WVTmr",iconPassword:"ForgotPassword_iconPassword__p-42_",email:"ForgotPassword_email__1fapw",forgotPassword:"ForgotPassword_forgotPassword__3ckC-",btnSubmit:"ForgotPassword_btnSubmit__1ayl4",createAccount:"ForgotPassword_createAccount__75cvw",register_link:"ForgotPassword_register_link__38ALX",header:"ForgotPassword_header__2EoMy",accept:"ForgotPassword_accept__oasTY",link:"ForgotPassword_link__KCeg1",btnSignUp:"ForgotPassword_btnSignUp__2ekLI",hbIcon:"ForgotPassword_hbIcon__34xm0",lbTermsOfService:"ForgotPassword_lbTermsOfService__3w4Re",formGroupActions:"ForgotPassword_formGroupActions__1SJSN"}}}]);
//# sourceMappingURL=17.eb58d044.chunk.js.map