(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[42],{1e3:function(e,n,a){},1208:function(e,n,a){"use strict";a.r(n);var c=a(4),t=a(8),i=a(1),s=a.n(i),l=a(31),r=a(35),o=a(28),j=function(e){var n=Object(o.c)((function(e){return e.auth.group_name})),a=e.render,i=e.location;return Object(c.jsx)(l.c,Object(t.a)(Object(t.a)({},e),{},{render:n&&n.includes("superadmin")?a:function(){return Object(c.jsx)(l.b,{to:{pathname:"/404",state:{from:i}}})}}))},d=a(27),b=a(57),m=a(649),u=a(64),h=a(59),x=a(53),O=a(761),f=a(605),p=function(e){var n=Object(m.a)().t,a=e.location,t=Object(i.useState)(!1),s=Object(d.a)(t,2),r=s[0],j=s[1],p=Object(o.c)((function(e){return e.auth})),v="admin"===p.group_name,N=Object(l.h)(),k=Object(o.b)(),g=Object(i.useState)(!1),y=Object(d.a)(g,2),z=y[0],C=y[1],I=function(){return j(!1)},P="",w=a.pathname,J=a.search;return w.includes("users")&&(P=J.includes("type=nurse")?J.includes("status=1")?"pending":"nurse":J.includes("type=user")?"user":"admin"),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(f.b,{hideTitle:!0,centered:!0,btnWidth:120,isVisible:z,content:"Do you want to sign out?",leftButtonText:"No",rightButtonText:"Yes",leftButtonOnPress:function(){return C(!1)},rightButtonOnPress:function(){k(Object(u.g)()),N.push("/admin/sign-in"),Object(h.d)()}}),Object(c.jsx)("i",{className:"fas fa-bars size-1 cursor-pointer admin-toggle-button",onClick:function(){return j(!0)}}),Object(c.jsxs)(b.N,{size:"lg",overlaid:!0,show:r,onShowChange:I,children:[Object(c.jsxs)("div",{className:"admin-profile",onClick:I,children:[Object(c.jsx)(b.t,{onClick:function(){return N.push("/admin/profile")},className:"admin-avatar--img my-3 cursor-pointer",src:p.avatar||O.a,alt:"Avatar",width:"128",height:"128"}),Object(c.jsxs)("span",{className:"admin-display-name",children:[p.first_name," ",p.last_name]}),r&&Object(c.jsx)("i",{className:"fas fa-angle-left hb-close-sidebar"})]}),Object(c.jsx)(b.H,{variant:"pills",children:Object(c.jsxs)(b.O,{children:[Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(b.J,{className:"hb-navlink",onClick:I,to:"/admin/newsfeed",children:[Object(c.jsx)("i",{className:"fas fa-book hb-navlink-icon"}),"Newsfeed"]})}),Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none hb-navlink",children:Object(c.jsxs)(b.J,{className:"hb-navlink",onClick:function(){I(),N.push("/admin/mobility/videos")},children:[Object(c.jsx)("i",{className:"fab fa-youtube hb-navlink-icon"}),"Mobility"]})}),Object(c.jsxs)("div",{className:"ml-4",children:[Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(b.J,{className:"hb-navlink",onClick:I,to:"/admin/mobility/videos",children:[Object(c.jsx)("i",{className:"fas fa-angle-right hb-navlink-icon"}),"Video Management"]})}),Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(b.J,{className:"hb-navlink",onClick:I,to:"/admin/mobility/categories",children:[Object(c.jsx)("i",{className:"fas fa-angle-right hb-navlink-icon"}),"Category Management"]})}),Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(b.J,{className:"hb-navlink",onClick:I,to:"/admin/mobility/trainers",children:[Object(c.jsx)("i",{className:"fas fa-angle-right hb-navlink-icon"}),"Trainer Management"]})})]}),Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(b.J,{className:"hb-navlink",onClick:I,to:"/admin/communication",children:[Object(c.jsx)("i",{className:"fas fa-microphone hb-navlink-icon"}),"Communication"]})}),Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(b.J,{className:"hb-navlink",onClick:I,to:"/admin/consulting",children:[Object(c.jsx)("i",{className:"fas fa-phone-alt hb-navlink-icon"}),"Consulting"]})}),Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(x.a,{className:"nav-link hb-navlink",onClick:I,to:"/admin/users",children:[Object(c.jsx)("i",{className:"fa fa-users hb-navlink-icon"}),n("user-management")]})}),Object(c.jsxs)("div",{className:"ml-4",children:[Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(x.a,{className:"nav-link hb-navlink ".concat("admin"===P?"active":""),onClick:I,to:"/admin/users",children:[Object(c.jsx)("i",{className:"fas fa-angle-right hb-navlink-icon"}),"Admin"]})}),Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(x.a,{className:"nav-link hb-navlink ".concat("nurse"===P?"active":""),onClick:I,to:"/admin/users?type=nurse",children:[Object(c.jsx)("i",{className:"fas fa-angle-right hb-navlink-icon"}),"Nurse"]})}),Object(c.jsx)("div",{className:"ml-4",children:Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(x.a,{className:"nav-link hb-navlink ".concat("pending"===P?"active":""),onClick:I,to:"/admin/users?type=nurse&status=1",children:[Object(c.jsx)("i",{className:"fas fa-angle-right hb-navlink-icon"}),"Pending Approval"]})})}),Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(x.a,{className:"nav-link hb-navlink ".concat("user"===P?"active":""),onClick:I,to:"/admin/users?type=user",children:[Object(c.jsx)("i",{className:"fas fa-angle-right hb-navlink-icon"}),"Basic Member"]})})]}),!v&&Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(b.J,{className:"hb-navlink",onClick:I,to:"/admin/settings",children:[Object(c.jsx)("i",{className:"fa fa-cogs hb-navlink-icon"}),n("settings")]})}),Object(c.jsx)(b.I,{className:"px-3 d-compact-none c-d-minimized-none",children:Object(c.jsxs)(b.J,{className:"hb-navlink",onClick:function(){I(),C(!0)},children:[Object(c.jsx)("i",{className:"fas fa-sign-out-alt hb-navlink-icon"}),n("sign-out")]})})]})})]})]})},v=(a(1e3),s.a.lazy((function(){return a.e(79).then(a.bind(null,1197))}))),N=s.a.lazy((function(){return Promise.all([a.e(0),a.e(70)]).then(a.bind(null,1210))})),k=s.a.lazy((function(){return Promise.all([a.e(0),a.e(3),a.e(4),a.e(6),a.e(23)]).then(a.bind(null,1198))})),g=s.a.lazy((function(){return Promise.all([a.e(3),a.e(4),a.e(51)]).then(a.bind(null,1199))})),y=s.a.lazy((function(){return Promise.all([a.e(0),a.e(69)]).then(a.bind(null,1211))})),z=s.a.lazy((function(){return a.e(78).then(a.bind(null,1200))})),C=s.a.lazy((function(){return Promise.all([a.e(0),a.e(3),a.e(6),a.e(41)]).then(a.bind(null,1206))})),I=s.a.lazy((function(){return Promise.all([a.e(0),a.e(3),a.e(4),a.e(6),a.e(22)]).then(a.bind(null,1201))})),P=s.a.lazy((function(){return a.e(76).then(a.bind(null,1202))})),w=s.a.lazy((function(){return a.e(77).then(a.bind(null,1203))})),J=s.a.lazy((function(){return Promise.all([a.e(0),a.e(24)]).then(a.bind(null,1205))})),B=s.a.lazy((function(){return Promise.all([a.e(0),a.e(71)]).then(a.bind(null,1207))})),M=s.a.lazy((function(){return Promise.all([a.e(0),a.e(4),a.e(67),a.e(52)]).then(a.bind(null,1212))}));n.default=function(e){return Object(c.jsx)("div",{className:"hb-admin c-app c-default-layout",children:Object(c.jsxs)("div",{className:"c-wrapper",children:[Object(c.jsx)(p,{location:e.location}),Object(c.jsx)("div",{className:"c-body",children:Object(c.jsx)(i.Suspense,{fallback:r.d,children:Object(c.jsxs)(l.e,{children:[Object(c.jsx)(l.c,{path:"/admin/newsfeed",exact:!0,render:function(e){return Object(c.jsx)(v,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/newsfeed/:id",exact:!0,render:function(e){return Object(c.jsx)(N,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/mobility/videos",exact:!0,render:function(e){return Object(c.jsx)(k,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/mobility/videos/:id",exact:!0,render:function(e){return Object(c.jsx)(g,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/mobility/categories",exact:!0,render:function(e){return Object(c.jsx)(y,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/mobility/categories/:id",exact:!0,render:function(e){return Object(c.jsx)(z,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/mobility/trainers",exact:!0,render:function(e){return Object(c.jsx)(C,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/mobility/trainers/:id",exact:!0,render:function(e){return Object(c.jsx)(I,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/communication",exact:!0,render:function(e){return Object(c.jsx)(P,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/consulting",exact:!0,render:function(e){return Object(c.jsx)(w,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/users",exact:!0,render:function(e){return Object(c.jsx)(J,Object(t.a)({},e))}}),Object(c.jsx)(l.c,{path:"/admin/profile",exact:!0,render:function(e){return Object(c.jsx)(M,Object(t.a)({},e))}}),Object(c.jsx)(j,{path:"/admin/settings",exact:!0,render:function(e){return Object(c.jsx)(B,Object(t.a)({},e))}}),Object(c.jsx)(l.b,{from:"/",to:"/admin/users"})]})})})]})})}},761:function(e,n,a){"use strict";n.a=a.p+"static/media/logo.b8d913ad.png"}}]);
//# sourceMappingURL=42.6d6f8e0f.chunk.js.map