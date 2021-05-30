(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[25],{1190:function(e,t,n){"use strict";n.r(t);var a=n(4),s=n(8),i=n(27),r=n(37),c=n.n(r),o=n(104),l=n(1),d=n(31),u=n(53),h=n(28),m=n(57),j=n(609),b=n(610),p=n(45),g=n(64),_=n(34),x=n(59),f=n(35),w=n(47),O=n.n(w),v=n(901),S=n.n(v),k=n(163),N=n(633),I=function(e){return b.b().shape({email:b.d().trim().min(3,"Das E-Mail Format ist nicht korrekt.").matches(_.c.validate.validateEmail(),"Das E-Mail Format ist nicht korrekt."),password:b.d().required("Ihr Passwort muss mindestens 8 Zeichen, eine Buchstabe und eine Zahl enthalten.").min(8,"Ihr Passwort muss mindestens 8 Zeichen, eine Buchstabe und eine Zahl enthalten.").matches(_.c.validate.validatePassword(),"Ihr Passwort muss mindestens 8 Zeichen, eine Buchstabe und eine Zahl enthalten.")})},C={email:"",password:""},P=function(){var e=Object(o.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!f.g.get("device_id")){e.next=3;break}return e.abrupt("return");case 3:return n=f.g.get("push_token"),e.next=6,O.a.post(_.c.rest.initialDevice(),{email_address:t,phone_number:"",push_token:n||"",subscribed:"",last_activate:"",first_session:"",device_name:"ReactJS",sessions:"",app_version:"",country:"",ip_address:"",sdk_version:"",lat:"",long:"",usage_duration:"",language_code:"",external_user_id:"",segments:"",tags:""}).then((function(e){"success"===e.data.message.status&&f.g.set("device_id",e.data.data.device_id)})).catch((function(e){console.log(e)}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.default=function(e){var t=Object(d.h)(),n=Object(h.b)(),r=function(e,t){return n(Object(p.d)(e,t))},c=Object(l.useState)({show:!1,id:0,content:"",title:"",email:""}),o=Object(i.a)(c,2),b=o[0],f=o[1],w=Object(l.useState)(!1),O=Object(i.a)(w,2),v=O[0],y=O[1],A=function(){y(!v)},B=function(){f(b.show=!1)};return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:"petrol",children:Object(a.jsx)(k.h,{show:b.show,handleClose:B,title:b.title,content:b.content,up:"Zur\xfcck zur Anmeldung",upCallback:B,down:22===b.id?"Weiter bearbeiten":"",downCallback:function(){return 22===b.id?(e=b.email,B(),void r({method:"get",api:_.c.rest.resendVerifyEmail(e),msg:_.c.messages.resendVerifyEmailFailure})):{};var e}})}),Object(a.jsx)(N.a,{className:"FormSignIn-container",children:Object(a.jsx)(j.a,{initialValues:C,validate:Object(x.q)(I),onSubmit:function(e){r({method:"post",api:_.c.rest.signInUser(),body:e,loading:!0,msg:_.c.messages.signInFailure},(function(a){var i=a.id,r=a.status,c=a.data;if(r!==p.c)"22"===i&&f({show:!0,id:22,content:"Ihre Mailadresse wurde noch nicht best\xe4tigt. Bitte best\xe4tigen Sie Ihre Mailadresse indem Sie auf den Aktivierungslink klicken.",title:"Login fehlgeschlagen",email:e.email}),"28"!==i&&"23"!==i||f({show:!0,id:28,content:"Ung\xfcltige Mailadresse oder Passwort. Bitte versuchen Sie es erneut.",title:"Login fehlgeschlagen"}),"26"===i&&f({show:!0,id:26,content:"Ihr Account wurde gesperrt. Bitte kontaktieren Sie unseren Kundenservice um den Account freizuschalten.",title:"Login fehlgeschlagen"});else{var o="/newsfeed";"21"===i?o="/init-profile":"nurse"===c.group_name&&(o="/consulting");var l=Object(s.a)(Object(s.a)({},c),{},{email:e.email});Object(x.m)(l),n(Object(g.f)(l)),P(e.email),t.push(o)}}))},children:function(e){var t=e.values,n=e.errors,s=e.touched,i=(e.status,e.dirty),r=e.handleChange,c=e.handleBlur,o=e.handleSubmit,l=(e.isSubmitting,e.isValid);e.handleReset,e.setTouched;return Object(a.jsxs)(m.q,{onSubmit:o,children:[Object(a.jsx)("h1",{className:"form-card-title",children:"Willkommen Wir haben Sie vermisst!"}),Object(a.jsxs)(m.r,{className:S.a.email,children:[Object(a.jsx)(m.u,{type:"text",placeholder:"E-Mail Adresse",autoComplete:"email",invalid:""!==t.email&&s.email&&!!n.email,name:"email",maxLength:50,value:t.email,onBlur:c,onChange:function(e){e.target.value.includes(" ")||r(e)},className:S.a.inputText}),Object(a.jsx)(m.A,{children:n.email||""})]}),Object(a.jsxs)(m.r,{className:S.a.inputPassword,children:[Object(a.jsx)(m.u,{type:v?"text":"password",placeholder:"Passwort",invalid:""!==t.password&&s.password&&!!n.password,autoComplete:"current-password",maxLength:16,value:t.password,onBlur:c,onChange:function(e){e.target.value.includes(" ")||r(e)},name:"password",className:S.a.inputTextPassword}),Object(a.jsx)("i",{className:"".concat(v?"hb-icon-eye-slash":"hb-icon-eye"," ").concat(S.a.iconPassword,"  "),onClick:A}),Object(a.jsx)(m.A,{children:n.password||""})]}),Object(a.jsxs)(m.r,{className:S.a.lastFormGroup,children:[Object(a.jsx)(m.L,{children:Object(a.jsx)(m.j,{xs:"12",className:S.a.forgotPassword,children:Object(a.jsx)(u.a,{to:{pathname:"/forgot-password",state:!0},children:"Passwort vergessen?"})})}),Object(a.jsx)(m.L,{children:Object(a.jsx)(m.j,{xs:"12",children:Object(a.jsx)(k.a,{color:"violet",children:"Login",disabled:!(l&&i),btnClassName:S.a.btnSubmit})})}),Object(a.jsx)(m.L,{children:Object(a.jsx)(m.j,{xs:"12",children:Object(a.jsxs)("div",{className:S.a.createAccount,children:[Object(a.jsx)("div",{children:"Noch keinen Account?"}),Object(a.jsx)(u.a,{to:{pathname:"/sign-up",state:!0},className:S.a.register_link,children:"Hier Registrieren"})]})})})]})]})}})})]})}},625:function(e,t,n){"use strict";var a=n(4),s=n(57),i=(n(1),n(35)),r=n(626),c=n.n(r);t.a=function(){return Object(a.jsx)(s.s,{className:c.a.header,children:i.f})}},626:function(e,t,n){e.exports={header:"Header_header__3Keph"}},633:function(e,t,n){"use strict";var a=n(4),s=n(57),i=(n(1),n(634)),r=n.n(i),c=n(625);t.a=function(e){var t=e.className,n=void 0===t?"":t,i=e.children;return Object(a.jsxs)("div",{className:"hb-user c-app c-default-layout flex-row align-items-center ".concat(r.a.wrapper," ").concat(n),children:[Object(a.jsx)(c.a,{}),Object(a.jsx)(s.k,{className:r.a.container,children:Object(a.jsx)(s.L,{className:"justify-content-center",children:Object(a.jsx)(s.j,{md:"4",lg:"4",xl:"4",className:r.a.cardContainer,children:Object(a.jsx)(s.e,{className:"p-1 ".concat(r.a.cardWrapper),children:Object(a.jsx)(s.f,{className:r.a.cardBody,children:i})})})})})]})}},634:function(e,t,n){e.exports={wrapper:"Container_wrapper__z5goK",cardContainer:"Container_cardContainer__3GnEz",cardWrapper:"Container_cardWrapper__17yG1",cardTitle:"Container_cardTitle__18hcX",cardBody:"Container_cardBody__1YCba"}},901:function(e,t,n){e.exports={inputText:"SignInUser_inputText__C1ONK",email:"SignInUser_email__1aAO4",inputPassword:"SignInUser_inputPassword__2mdRO",inputTextPassword:"SignInUser_inputTextPassword__33kNS",iconPassword:"SignInUser_iconPassword__15b61",forgotPassword:"SignInUser_forgotPassword__33AqB",btnSubmit:"SignInUser_btnSubmit__2jYaW",createAccount:"SignInUser_createAccount__27AnW",register_link:"SignInUser_register_link__3ujmB",header:"SignInUser_header__1wp3R",cardTitle:"SignInUser_cardTitle__25-RI",lastFormGroup:"SignInUser_lastFormGroup__1sScs"}}}]);
//# sourceMappingURL=25.e1717098.chunk.js.map