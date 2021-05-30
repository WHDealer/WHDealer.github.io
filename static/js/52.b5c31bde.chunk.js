(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[52],{1212:function(e,n,r){"use strict";r.r(n);var t,a,i,l=r(642),s=r(37),o=r.n(s),c=r(104),m=r(4),d=r(8),u=r(27),F=r(1),b=r(57),j=r(71),O=r(28),h=r(64),g=r(31),p=r(59),f=r(45),A=r(34),w=r(631),v=r(643),B=r(613),E=r(761),C=r(609),x=(r(658),r(610)),D=x.b().shape({password:null===(t=x.d())||void 0===t?void 0:t.required("Your password must be at least 8 characters").matches(A.c.validate.validatePassword(),"Your password must be at least 8 characters long with one letter, and a number"),newPassword:null===(a=x.d())||void 0===a?void 0:a.required("Please Enter new password").matches(A.c.validate.validatePassword(),"Your password must be at least 8 characters long with one letter, and a number"),confirmNewPassword:null===(i=x.d())||void 0===i?void 0:i.required("Please Enter confirm password").oneOf([x.c("newPassword"),null],"Confirm password does not match with New Password").matches(A.c.validate.validatePassword(),"Your password must be at least 8 characters long with one letter, and a number")}),y=function(e){var n=Object(O.b)(),r=Object(F.useState)(!1),t=Object(u.a)(r,2),a=t[0],i=t[1],l=Object(g.h)(),s=Object(F.useState)(!1),o=(Object(u.a)(s,1)[0],Object(F.useState)({password:!1,newPassword:!1,confirmNewPassword:!1})),c=Object(u.a)(o,2),h=c[0],v=c[1],B=Object(F.useRef)(null),E=function(){var n,r,t;null===e||void 0===e||null===(n=e.handleClose)||void 0===n||n.call(e),null===B||void 0===B||null===(r=B.current)||void 0===r||null===(t=r.resetForm)||void 0===t||t.call(r)};return Object(m.jsx)("div",{className:"flex-row align-items-center",children:Object(m.jsxs)(b.D,{size:"lg",centered:!0,show:e.show,onClose:E,onClosed:E,closeOnBackdrop:!1,children:[Object(m.jsx)(b.G,{closeButton:!0,children:"Change password"}),Object(m.jsx)(b.E,{children:Object(m.jsx)(b.L,{className:"justify-content-center",children:Object(m.jsx)(b.j,{md:"12",children:Object(m.jsx)(b.h,{children:Object(m.jsx)(b.e,{children:Object(m.jsx)(b.f,{children:Object(m.jsx)(C.a,{innerRef:B,enableReinitialize:!0,initialValues:{password:"",newPassword:"",confirmNewPassword:""},onSubmit:function(e){var r,t,a={old_password:null===e||void 0===e?void 0:e.password,new_password:null===e||void 0===e?void 0:e.newPassword};i(!0),r={method:"put",api:A.c.rest.changeAdminPassword(),body:a},t=function(e){i(!1),e.status===f.c&&(E(),Object(p.d)(),l.push("/admin/sign-in"))},n(Object(f.d)(r,t))},validationSchema:D,children:function(e){var n=e.values,r=e.errors,t=e.touched,i=(e.status,e.dirty),l=e.handleChange,s=e.handleBlur,o=e.handleSubmit,c=(e.isSubmitting,e.isValid);e.handleReset,e.setTouched,e.setFieldValue,e.setFieldTouched;return Object(m.jsxs)(b.q,{onSubmit:o,children:[Object(m.jsxs)(b.r,{children:[Object(m.jsx)(b.B,{children:"Old Password"}),Object(m.jsxs)(b.w,{children:[Object(m.jsx)(b.u,{name:"password",autoFocus:!0,type:(null===h||void 0===h?void 0:h.password)?"text":"password",value:n.password,onChange:function(e){e.target.value.includes(" ")||l(e)},invalid:t.password&&!!r.password,maxLength:16,onBlur:s}),Object(m.jsx)(b.y,{onClick:function(){v(Object(d.a)(Object(d.a)({},h),{},{password:!h.password}))},style:{cursor:"pointer"},children:Object(m.jsx)(b.z,{children:Object(m.jsx)(j.a,{name:h.password?"cil-lock-locked":"cil-lock-unlocked"})})}),Object(m.jsx)(b.A,{children:r.password})]})]}),Object(m.jsxs)(b.r,{children:[Object(m.jsx)(b.B,{children:"New Password"}),Object(m.jsxs)(b.w,{children:[Object(m.jsx)(b.u,{name:"newPassword",autoFocus:!0,type:(null===h||void 0===h?void 0:h.newPassword)?"text":"password",value:n.newPassword,onChange:function(e){e.target.value.includes(" ")||l(e)},invalid:t.newPassword&&!!r.newPassword,maxLength:16,onBlur:s}),Object(m.jsx)(b.y,{onClick:function(){v(Object(d.a)(Object(d.a)({},h),{},{newPassword:!h.newPassword}))},style:{cursor:"pointer"},children:Object(m.jsx)(b.z,{children:Object(m.jsx)(j.a,{name:h.newPassword?"cil-lock-locked":"cil-lock-unlocked"})})})]}),(null===r||void 0===r?void 0:r.newPassword)&&t.newPassword&&Object(m.jsx)(w.b,{children:null===r||void 0===r?void 0:r.newPassword})]}),Object(m.jsxs)(b.r,{children:[Object(m.jsx)(b.B,{children:"Confirm Password"}),Object(m.jsxs)(b.w,{children:[Object(m.jsx)(b.u,{name:"confirmNewPassword",autoFocus:!0,type:(null===h||void 0===h?void 0:h.confirmNewPassword)?"text":"password",value:n.confirmNewPassword,onChange:function(e){e.target.value.includes(" ")||l(e)},invalid:t.confirmNewPassword&&!!r.confirmNewPassword,maxLength:16,onBlur:s}),Object(m.jsx)(b.y,{onClick:function(){v(Object(d.a)(Object(d.a)({},h),{},{confirmNewPassword:!h.confirmNewPassword}))},style:{cursor:"pointer"},children:Object(m.jsx)(b.z,{children:Object(m.jsx)(j.a,{name:h.confirmNewPassword?"cil-lock-locked":"cil-lock-unlocked"})})})]}),(null===r||void 0===r?void 0:r.confirmNewPassword)&&t.confirmNewPassword&&Object(m.jsx)(w.b,{children:null===r||void 0===r?void 0:r.confirmNewPassword})]}),Object(m.jsx)("div",{style:{display:"flex",justifyContent:"flex-end"},children:Object(m.jsx)(b.d,{disabled:!(c&&i&&!a),color:"primary",className:"px-4",style:{width:100},type:"submit",children:a?Object(m.jsx)(b.P,{size:"sm",color:"light"}):"Update"})})]})}})})})})})})})]})})},P=r(1166),L=r(47),k=r.n(L);function G(){var e=Object(l.a)(["\n  color: ",";\n  font-size: 12px;\n  margin-top: ","px;\n"]);return G=function(){return e},e}function N(){var e=Object(l.a)(["\n  padding-left: 20%;\n  padding-right: 20%;\n  margin-top: ","px;\n"]);return N=function(){return e},e}function R(){var e=Object(l.a)(["\n  margin-left: ","px;\n"]);return R=function(){return e},e}function T(){var e=Object(l.a)(["\n  width: 100px;\n"]);return T=function(){return e},e}function S(){var e=Object(l.a)(["\n  margin-top: ","px;\n"]);return S=function(){return e},e}function z(){var e=Object(l.a)(["\n  display: flex;\n  justify-content: flex-end;\n  margin-top: ","px;\n"]);return z=function(){return e},e}function Y(){var e=Object(l.a)(["\n  text-align: center;\n  font-size: 18px;\n  font-weight: bold;\n  margin-top: ","px;\n  margin-bottom: 0px;\n"]);return Y=function(){return e},e}n.default=function(){var e=Object(O.c)((function(e){return e.auth})),n=Object(O.b)(),r=function(e,r){return n(Object(f.d)(e,r))},t=Object(F.useState)((null===e||void 0===e?void 0:e.first_name)||""),a=Object(u.a)(t,2),i=a[0],l=a[1],s=Object(F.useState)((null===e||void 0===e?void 0:e.last_name)||""),v=Object(u.a)(s,2),C=v[0],x=v[1],D=Object(F.useState)((null===e||void 0===e?void 0:e.avatar)||""),L=Object(u.a)(D,2),G=L[0],N=L[1],R=Object(F.useState)(!1),T=Object(u.a)(R,2),S=T[0],z=T[1],Y=Object(F.useState)(!1),J=Object(u.a)(Y,2),W=J[0],$=J[1],K=Object(F.useState)(!1),Q=Object(u.a)(K,2),X=Q[0],Z=Q[1],ee=Object(F.useState)(!1),ne=Object(u.a)(ee,2),re=ne[0],te=(ne[1],Object(F.useRef)(null)),ae=Object(F.useRef)(null),ie=Object(F.useState)(!1),le=Object(u.a)(ie,2),se=le[0],oe=le[1],ce=Object(F.useState)(!1),me=Object(u.a)(ce,2),de=me[0],ue=me[1],Fe=Object(F.useState)(!1),be=Object(u.a)(Fe,2),je=be[0],Oe=be[1],he=Object(F.useState)({errorFirstNameMsg:"",errorLastNameMsg:""}),ge=Object(u.a)(he,2),pe=ge[0],fe=ge[1];Object(F.useEffect)((function(){return(re.show||de||je)&&(window.onbeforeunload=function(){return!0}),function(){window.onbeforeunload=null}}),[re.show,de,je]);var Ae=function(t){var a={first_name:"firstName"===t?i:null===e||void 0===e?void 0:e.first_name,last_name:"lastName"===t?C:null===e||void 0===e?void 0:e.last_name};z(!0),"firstName"===t?$(!0):Z(!0),r({method:"put",api:A.c.rest.updateProfileAdmin(),body:a},(function(r){z(!1),Z(!1),$(!1);var a=r.status;if("firstName"===t?$(!1):Z(!1),console.log(r),a===f.c)if("firstName"===t){ue(!1),n(Object(h.h)({first_name:i}));var l=Object(d.a)(Object(d.a)({},e),{},{first_name:i});Object(p.m)(l)}else{Oe(!1),n(Object(h.h)({last_name:C}));var s=Object(d.a)(Object(d.a)({},e),{},{last_name:C});Object(p.m)(s)}}))},we=function(r,t,a){(new FileReader).readAsDataURL(a),(new Headers).append("x-amz-acl","public-read");var i=k.a.create();delete i.defaults.baseURL,delete i.defaults.headers.common.Authorization,i({method:"put",url:r,headers:{"x-amz-acl":"public-read","Content-Type":null===a||void 0===a?void 0:a.type},data:a}).then((function(r){console.log(JSON.stringify(r)),n(Object(h.h)({avatar:t}));var a=Object(d.a)(Object(d.a)({},e),{},{avatar:t});Object(p.m)(a)})).catch((function(e){console.log(e)}))},ve=Object(F.useRef)(null);return Object(m.jsxs)(w.a,{children:[Object(m.jsx)(y,{show:se,handleClose:function(){oe(!1)}}),Object(m.jsxs)("div",{className:"admin-profile",children:[Object(m.jsxs)("div",{style:{position:"relative"},children:[Object(m.jsx)(b.t,{src:G||E.a,alt:"Avatar",style:{borderWidth:5,borderColor:B.a.dim,borderStyle:"solid",borderRadius:100},width:"128",height:"128"}),Object(m.jsx)(b.d,{onClick:function(){var e;null===(e=ve.current)||void 0===e||e.click()},style:{position:"absolute",bottom:0,right:0,backgroundColor:B.a.gray3,borderRadius:20},children:Object(m.jsx)(j.a,{name:"cil-camera",width:"20px",height:"20px"})}),Object(m.jsx)("input",{className:"avatar-user--input",type:"file",id:"myFile",name:"filename",ref:ve,style:{display:"none"},accept:"image/x-png,image/gif,image/jpeg",onChange:function(e){var n,t;!function(e){var n=e[0],t=null===n||void 0===n?void 0:n.name;r({method:"get",api:A.c.rest.getUploadLink(t)},(function(e){var r,t;e.status===f.c&&we(null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.link,null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.avatar,n)}))}(null===e||void 0===e||null===(n=e.target)||void 0===n?void 0:n.files);var a=(null===e||void 0===e||null===(t=e.target)||void 0===t?void 0:t.files)[0];N(URL.createObjectURL(a))}})]}),Object(m.jsxs)(_,{children:[e.first_name," ",e.last_name]}),Object(m.jsx)(b.d,{color:"info",onClick:function(){oe(!0)},style:{marginTop:B.c[3]},children:"Change password"})]}),Object(m.jsxs)(q,{children:[Object(m.jsx)(M,{children:"Personal profile"}),de&&Object(m.jsx)(g.a,{when:!0,message:"Changes you made may not be saved."}),Object(m.jsxs)(b.r,{children:[Object(m.jsx)(b.B,{children:"First name"}),Object(m.jsxs)(b.w,{children:[Object(m.jsx)(b.u,{disabled:!de,maxLength:50,onChange:function(e){var n;!e.target.value.includes(" ")&&A.c.validate.valueTypingExpressionsName(e)&&(n=e.target.value,l(n),Object(P.isEmpty)(n)?fe(Object(d.a)(Object(d.a)({},pe),{},{errorFirstNameMsg:"Please Enter First Name"})):Object(P.isEmpty)(n)||n.match(/^[a-z\xdf\xfc\xdc\xf6\xd6\xe4\xc4_][-\w\xdf\xfc\xdc\xf6\xd6\xe4\xc4 ]*$/i)?fe(Object(d.a)(Object(d.a)({},pe),{},{errorFirstNameMsg:""})):fe(Object(d.a)(Object(d.a)({},pe),{},{errorFirstNameMsg:"First Name InValid"})))},innerRef:te,value:i,invalid:" "===i.trim()}),Object(m.jsx)(b.y,{style:{cursor:"pointer"},children:Object(m.jsx)(b.z,{onClick:Object(c.a)(o.a.mark((function e(){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ue(!0);case 2:return e.next=4,null===te||void 0===te||null===(n=te.current)||void 0===n||null===(r=n.focus)||void 0===r?void 0:r.call(n);case 4:case"end":return e.stop()}}),e)}))),children:Object(m.jsx)(j.a,{name:"cil-pencil"})})})]}),(null===pe||void 0===pe?void 0:pe.errorFirstNameMsg)&&Object(m.jsx)(H,{children:null===pe||void 0===pe?void 0:pe.errorFirstNameMsg}),de&&Object(m.jsxs)(I,{children:[Object(m.jsx)(U,{disabled:S,onClick:function(){ue(!1),fe(Object(d.a)(Object(d.a)({},pe),{},{errorFirstNameMsg:""})),l(null===e||void 0===e?void 0:e.first_name)},children:"Cancel"}),Object(m.jsx)(V,{disabled:!i&&!W,onClick:function(){return Ae("firstName")},color:"info",children:W?Object(m.jsx)(b.P,{size:"sm",color:"light"}):"Save"})]})]}),je&&Object(m.jsx)(g.a,{when:!0,message:"Changes you made may not be saved."}),Object(m.jsxs)(b.r,{children:[Object(m.jsx)(b.B,{children:"Last name"}),Object(m.jsxs)(b.w,{children:[Object(m.jsx)(b.u,{disabled:!je,maxLength:50,innerRef:ae,onChange:function(e){var n;!e.target.value.includes(" ")&&A.c.validate.valueTypingExpressionsName(e)&&(n=e.target.value,x(n),Object(P.isEmpty)(n)?fe(Object(d.a)(Object(d.a)({},pe),{},{errorLastNameMsg:"Please Enter Last Name"})):Object(P.isEmpty)(n)||n.match(/^[a-z\xdf\xfc\xdc\xf6\xd6\xe4\xc4_][-\w\xdf\xfc\xdc\xf6\xd6\xe4\xc4 ]*$/i)?fe(Object(d.a)(Object(d.a)({},pe),{},{errorLastNameMsg:""})):fe(Object(d.a)(Object(d.a)({},pe),{},{errorLastNameMsg:"Last Name InValid"})))},value:C}),Object(m.jsx)(b.y,{style:{cursor:"pointer"},children:Object(m.jsx)(b.z,{onClick:Object(c.a)(o.a.mark((function e(){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Oe(!0);case 2:return e.next=4,null===ae||void 0===ae||null===(n=ae.current)||void 0===n||null===(r=n.focus)||void 0===r?void 0:r.call(n);case 4:case"end":return e.stop()}}),e)}))),children:Object(m.jsx)(j.a,{name:"cil-pencil"})})})]}),(null===pe||void 0===pe?void 0:pe.errorLastNameMsg)&&Object(m.jsx)(H,{children:null===pe||void 0===pe?void 0:pe.errorLastNameMsg}),je&&Object(m.jsxs)(I,{children:[Object(m.jsx)(U,{disabled:S,onClick:function(){Oe(!1),fe(Object(d.a)(Object(d.a)({},pe),{},{errorLastNameMsg:""})),x(null===e||void 0===e?void 0:e.last_name)},children:"Cancel"}),Object(m.jsx)(V,{disabled:!C&&!X,onClick:function(){return Ae("lastName")},color:"info",children:X?Object(m.jsx)(b.P,{size:"sm",color:"light"}):"Save"})]})]}),Object(m.jsxs)(b.r,{children:[Object(m.jsx)(b.B,{children:"Email"}),Object(m.jsx)(b.u,{value:(null===e||void 0===e?void 0:e.email)||"",disabled:!0})]})]})]})};var _=v.a.p(Y(),B.c[3]),I=v.a.div(z(),B.c[4]),M=v.a.h1(S(),B.c[3]),U=Object(v.a)(b.d)(T()),V=Object(v.a)(U)(R(),B.c[4]),q=v.a.div(N(),B.c[3]),H=v.a.p(G(),B.a.error,B.c[2])},613:function(e,n,r){"use strict";r.d(n,"a",(function(){return a})),r.d(n,"b",(function(){return i})),r.d(n,"c",(function(){return l}));var t={black:"#1d1d1d",white:"#ffffff",offWhite:"#e6e6e6",orange:"#FBA928",orangeDarker:"#EB9918",lightGrey:"#939AA4",lighterGrey:"#CDD4DA",red:"#ED3833",gray:"#687187",lightBlue:"#C5CEE0",mLightBgDarkPrimaryText:"#DE000000",mLightBgDarkSecondaryText:"#8A000000",mLightBgDarkDisabledText:"#61000000",mLightBgDarkHintText:"#61000000",mDarkBgLightPrimaryText:"#FFFFFFFF",mDarkBgLightSecondaryText:"#B3FFFFFF",mDarkBgLightDisabledText:"#80FFFFFF",mDarkBgLightHintText:"#80FFFFFF",mRed50:"#FFEBEE",mRed100:"#FFCDD2",mRed200:"#EF9A9A",mRed300:"#E57373",mRed400:"#EF5350",mRed500:"#F44336",mRed600:"#E53935",mRed700:"#D32F2F",mRed800:"#C62828",mRed900:"#B71C1C",mRedA100:"#FF8A80",mRedA200:"#FF5252",mRedA400:"#FF1744",mRedA700:"#D50000",mDeepPurple50:"#EDE7F6",mDeepPurple100:"#D1C4E9",mDeepPurple200:"#B39DDB",mDeepPurple300:"#9575CD",mDeepPurple400:"#7E57C2",mDeepPurple500:"#673AB7",mDeepPurple600:"#5E35B1",mDeepPurple700:"#512DA8",mDeepPurple800:"#4527A0",mDeepPurple900:"#311B92",mDeepPurpleA100:"#B388FF",mDeepPurpleA200:"#7C4DFF",mDeepPurpleA400:"#651FFF",mDeepPurpleA700:"#6200EA",mLightBlue50:"#E1F5FE",mLightBlue100:"#B3E5FC",mLightBlue200:"#81D4FA",mLightBlue300:"#4FC3F7",mLightBlue400:"#29B6F6",mLightBlue500:"#03A9F4",mLightBlue600:"#039BE5",mLightBlue700:"#0288D1",mLightBlue800:"#0277BD",mLightBlue900:"#01579B",mLightBlueA100:"#80D8FF",mLightBlueA200:"#40C4FF",mLightBlueA400:"#00B0FF",mLightBlueA700:"#0091EA",mGreen50:"#E8F5E9",mGreen100:"#C8E6C9",mGreen200:"#A5D6A7",mGreen300:"#81C784",mGreen400:"#66BB6A",mGreen500:"#4CAF50",mGreen600:"#43A047",mGreen700:"#388E3C",mGreen800:"#2E7D32",mGreen900:"#1B5E20",mGreenA100:"#B9F6CA",mGreenA200:"#69F0AE",mGreenA400:"#00E676",mGreenA700:"#00C853",mYellow50:"#FFFDE7",mYellow100:"#FFF9C4",mYellow200:"#FFF59D",mYellow300:"#FFF176",mYellow400:"#FFEE58",mYellow500:"#FFEB3B",mYellow600:"#FDD835",mYellow700:"#FBC02D",mYellow800:"#F9A825",mYellow900:"#F57F17",mYellowA100:"#FFFF8D",mYellowA200:"#FFFF00",mYellowA400:"#FFEA00",mYellowA700:"#FFD600",mDeepOrange50:"#FBE9E7",mDeepOrange100:"#FFCCBC",mDeepOrange200:"#FFAB91",mDeepOrange300:"#FF8A65",mDeepOrange400:"#FF7043",mDeepOrange500:"#FF5722",mDeepOrange600:"#F4511E",mDeepOrange700:"#E64A19",mDeepOrange800:"#D84315",mDeepOrange900:"#BF360C",mDeepOrangeA100:"#FF9E80",mDeepOrangeA200:"#FF6E40",mDeepOrangeA400:"#FF3D00",mDeepOrangeA700:"#DD2C00",mBlueGrey50:"#ECEFF1",mBlueGrey100:"#CFD8DC",mBlueGrey200:"#B0BEC5",mBlueGrey300:"#90A4AE",mBlueGrey400:"#78909C",mBlueGrey500:"#607D8B",mBlueGrey600:"#546E7A",mBlueGrey700:"#455A64",mBlueGrey800:"#37474F",mBlueGrey900:"#263238",mPink50:"#FCE4EC",mPink100:"#F8BBD0",mPink200:"#F48FB1",mPink300:"#F06292",mPink400:"#EC407A",mPink500:"#E91E63",mPink600:"#D81B60",mPink700:"#C2185B",mPink800:"#AD1457",mPink900:"#880E4F",mPinkA100:"#FF80AB",mPinkA200:"#FF4081",mPinkA400:"#F50057",mPinkA700:"#C51162",mIndigo50:"#E8EAF6",mIndigo100:"#C5CAE9",mIndigo200:"#9FA8DA",mIndigo300:"#7986CB",mIndigo400:"#5C6BC0",mIndigo500:"#3F51B5",mIndigo600:"#3949AB",mIndigo700:"#303F9F",mIndigo800:"#283593",mIndigo900:"#1A237E",mIndigoA100:"#8C9EFF",mIndigoA200:"#536DFE",mIndigoA400:"#3D5AFE",mIndigoA700:"#304FFE",mCyan50:"#E0F7FA",mCyan100:"#B2EBF2",mCyan200:"#80DEEA",mCyan300:"#4DD0E1",mCyan400:"#26C6DA",mCyan500:"#00BCD4",mCyan600:"#00ACC1",mCyan700:"#0097A7",mCyan800:"#00838F",mCyan900:"#006064",mCyanA100:"#84FFFF",mCyanA200:"#18FFFF",mCyanA400:"#00E5FF",mCyanA700:"#00B8D4",mLightGreen50:"#F1F8E9",mLightGreen100:"#DCEDC8",mLightGreen200:"#C5E1A5",mLightGreen300:"#AED581",mLightGreen400:"#9CCC65",mLightGreen500:"#8BC34A",mLightGreen600:"#7CB342",mLightGreen700:"#689F38",mLightGreen800:"#558B2F",mLightGreen900:"#33691E",mLightGreenA100:"#CCFF90",mLightGreenA200:"#B2FF59",mLightGreenA400:"#76FF03",mLightGreenA700:"#64DD17",mAmber50:"#FFF8E1",mAmber100:"#FFECB3",mAmber200:"#FFE082",mAmber300:"#FFD54F",mAmber400:"#FFCA28",mAmber500:"#FFC107",mAmber600:"#FFB300",mAmber700:"#FFA000",mAmber800:"#FF8F00",mAmber900:"#FF6F00",mAmberA100:"#FFE57F",mAmberA200:"#FFD740",mAmberA400:"#FFC400",mAmberA700:"#FFAB00",mBrown50:"#EFEBE9",mBrown100:"#D7CCC8",mBrown200:"#BCAAA4",mBrown300:"#A1887F",mBrown400:"#8D6E63",mBrown500:"#795548",mBrown600:"#6D4C41",mBrown700:"#5D4037",mBrown800:"#4E342E",mBrown900:"#3E2723",mPurple50:"#F3E5F5",mPurple100:"#E1BEE7",mPurple200:"#CE93D8",mPurple300:"#BA68C8",mPurple400:"#AB47BC",mPurple500:"#9C27B0",mPurple600:"#8E24AA",mPurple700:"#7B1FA2",mPurple800:"#6A1B9A",mPurple900:"#4A148C",mPurpleA100:"#EA80FC",mPurpleA200:"#E040FB",mPurpleA400:"#D500F9",mPurpleA700:"#AA00FF",mBlue50:"#E3F2FD",mBlue100:"#BBDEFB",mBlue200:"#90CAF9",mBlue300:"#64B5F6",mBlue400:"#42A5F5",mBlue500:"#2196F3",mBlue600:"#1E88E5",mBlue700:"#1976D2",mBlue800:"#1565C0",mBlue900:"#0D47A1",mBlueA100:"#82B1FF",mBlueA200:"#448AFF",mBlueA400:"#2979FF",mBlueA700:"#2962FF",mTeal50:"#E0F2F1",mTeal100:"#B2DFDB",mTeal200:"#80CBC4",mTeal300:"#4DB6AC",mTeal400:"#26A69A",mTeal500:"#009688",mTeal600:"#00897B",mTeal700:"#00796B",mTeal800:"#00695C",mTeal900:"#004D40",mTealA100:"#A7FFEB",mTealA200:"#64FFDA",mTealA400:"#1DE9B6",mTealA700:"#00BFA5",mLime50:"#F9FBE7",mLime100:"#F0F4C3",mLime200:"#E6EE9C",mLime300:"#DCE775",mLime400:"#D4E157",mLime500:"#CDDC39",mLime600:"#C0CA33",mLime700:"#AFB42B",mLime800:"#9E9D24",mLime900:"#827717",mLimeA100:"#F4FF81",mLimeA200:"#EEFF41",mLimeA400:"#C6FF00",mLimeA700:"#AEEA00",mOrange50:"#FFF3E0",mOrange100:"#FFE0B2",mOrange200:"#FFCC80",mOrange300:"#FFB74D",mOrange400:"#FFA726",mOrange500:"#FF9800",mOrange600:"#FB8C00",mOrange700:"#F57C00",mOrange800:"#EF6C00",mOrange900:"#E65100",mOrangeA100:"#FFD180",mOrangeA200:"#FFAB40",mOrangeA400:"#FF9100",mOrangeA700:"#FF6D00",mGrey50:"#FAFAFA",mGrey100:"#F5F5F5",mGrey200:"#EEEEEE",mGrey300:"#E0E0E0",mGrey400:"#BDBDBD",mGrey500:"#9E9E9E",mGrey600:"#757575",mGrey700:"#616161",mGrey800:"#424242",mGrey900:"#212121"},a={background:"#ffffff",backgroundGray:"#F1F2F3",transparentBackground:"#00000055",border:"#EDF1F7",primary:"#ed3833",primaryLighter:"#EE4953",secondary:"#f3a805",line:t.offWhite,text:"#22242a",dim:"#cdcdd7",error:"#ef4b5f",success:"#27ae60",shadow:"#2f3542",storybookDarkBg:t.black,storybookTextColor:t.black,white:"#ffffff",gray70:"#222B45",gray650:"#687187",gray60:"#8F9BB3",gray50:"#C5CEE0",gray3:"#cdcdd7",gray4:"#8d92a3",blue:"#3785D9",gray2:"#f1f3f8",gray1:"#F7F9FC",gray5:"#798195",gray6:"#E4E9F2",darkBlue:"#2E3A59",palette:t,transparent:"rgba(0, 0, 0, 0)",link:"#1890ff",scrim:"rgba(0, 0, 0, 0.6)",purple:"#722ed1",pink:"#eb2f96",yellow:"#fadb14",lime:"#a0d911",teal:"#13c2c2",indigo:"#2f54eb"},i={textSize:{h1:32,h2:28,h3:24,h4:20,h5:16,h6:12,large:20,title:18,normal:16,subTitle:14,small:12}},l=[0,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100]},631:function(e,n,r){"use strict";r.d(n,"a",(function(){return o})),r.d(n,"b",(function(){return c}));var t=r(642),a=r(643),i=r(613);function l(){var e=Object(t.a)(["\n  font-size: ","px;\n  color: ",";\n  margin-top: ","px;\n"]);return l=function(){return e},e}function s(){var e=Object(t.a)(["\n  width: 90%;\n  margin: 10px auto;\n"]);return s=function(){return e},e}var o=a.a.div(s()),c=a.a.p(l(),i.b.textSize.small,i.a.error,i.c[1])}}]);
//# sourceMappingURL=52.b5c31bde.chunk.js.map