(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[59],{1004:function(e,c,t){"use strict";t.r(c);var s=t(8),n=t(4),a=t(27),i=t(1),r=t(34),l=t(45),b=t(31),h=t(28),o=t(163),j=t(118),d=(t(654),t(683)),u=t(59);c.default=function(){var e=Object(h.b)(),c=Object(b.h)(),t=Object(i.useState)(""),f=Object(a.a)(t,2),O=f[0],m=f[1],g=Object(i.useState)([]),x=Object(a.a)(g,2),p=x[0],v=x[1],N=Object(i.useRef)(null),y=Object(h.c)((function(e){return e.newsfeed})).your_topics,S={innerRef:N,clearBtn:!0,searchName:O,setSearchName:m,callbackSearch:function(c){var t,s;t={method:"get",api:r.c.rest.getNewsfeedSearch(c)},s=function(e){var c=e.data;e.status===l.c&&O.trim()&&v(c.categories.filter((function(e){return!Object(u.i)(y,e)})))},e(Object(l.d)(t,s))},callbackEmpty:function(){return v([])}};return Object(i.useEffect)((function(){N.current.focus()}),[]),Object(n.jsx)(d.a,{children:Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{className:"hb-mx-20",children:Object(n.jsx)("div",{className:"d-flex justify-content-end hb-my-28",children:Object(n.jsxs)(o.d,{onClick:function(){return c.push("/newsfeed/select-category")},children:[Object(n.jsx)("i",{className:"hb-icon-cross hb-icon-lg"})," Schlie\xdfen"]})})}),Object(n.jsx)("div",{className:"hb-card",children:Object(n.jsxs)("div",{className:"hb-margin-30",style:{marginBottom:12},children:[Object(n.jsx)(o.k,Object(s.a)(Object(s.a)({},S),{},{placeholder:"Suchbegriff"})),Object(n.jsx)("div",{className:"hb-select-category-title",children:"Suchergebnisse"}),Object(n.jsx)("div",{className:"hb-select-category-search-suggestion",children:Object(n.jsx)("div",{className:"hb-scroll",style:{maxHeight:320,marginRight:-10,paddingRight:5},children:0===p.length?Object(n.jsx)("div",{className:"search-group-item disabled",children:"-"}):p.map((function(t,s){return Object(n.jsxs)("div",{className:"search-group-item",style:s===p.length-1?{border:"none"}:{},onClick:function(){return function(t){e(Object(j.f)(t)),c.push("/newsfeed/select-category")}(t)},children:[Object(n.jsx)("i",{className:"hb-icon-zoom-in hb-select-category-icon-search"}),t.name]},t.id)}))})})]})})]})})}},654:function(e,c,t){}}]);
//# sourceMappingURL=59.82e6c302.chunk.js.map