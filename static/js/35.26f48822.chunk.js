(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[35],{1053:function(e,t,n){},1054:function(e,t,n){e.exports={detailWrapperContainer:"MobilityDetail_detailWrapperContainer__3pS4z",videoWrapper:"MobilityDetail_videoWrapper__3N8GP",tags:"MobilityDetail_tags__ASK7K",listVideosWrapper:"MobilityDetail_listVideosWrapper__3IM6q",listVideos:"MobilityDetail_listVideos__QEinQ"}},1167:function(e,t,n){"use strict";n.r(t);var i=n(1),o=n(4),a=n(58),c=n(8),r=n(27),s=n(69),l=n.n(s),d=n(34),u=n(59),m=n(45),b=n(762),j=n(31),p=n(53),v=n(608),h=n(28),f=n(35),O=n(163),w=function(e){return Object(o.jsx)("div",{className:"d-flex align-items-center justify-content-center",style:{height:56,width:"100%",marginTop:16},children:f.e})},x=function(e){var t=Object(h.b)(),n=function(e,n){return t(Object(m.d)(e,n))},s=Object(i.useState)(!1),l=Object(r.a)(s,2),u=l[0],b=l[1],j=e.videoId,p=e.commentId,v=e.commentContent,x=e.setComments,g=e.setShowUpdateInput,y=Object(i.useState)(p?v:""),_=Object(r.a)(y,2),N=_[0],k=_[1],S=Object(h.c)((function(e){return e.auth})),C=S.avatar||f.a,E=Object(i.useRef)(null);Object(i.useEffect)((function(){var e;p&&(null===(e=E.current)||void 0===e||e.focus())}),[]);var R=function(){(null===N||void 0===N?void 0:N.trim())&&(b(!0),n({method:"post",api:d.c.rest.createComment(j),body:{comment:N}},(function(e){b(!1);var t=e.data;e.status===m.c&&(k(""),x((function(e){return{data:[{id:t.id,user_id:S.user_id,user_avatar:C,username:S.first_name+" "+S.last_name,content:N,liked_amount:0,is_liked:!1,replied_amount:0,created_date:(new Date).getTime()/1e3}].concat(Object(a.a)(e.data)),total:e.total+1}})))})))},T=function(){(null===N||void 0===N?void 0:N.trim())&&(null===b||void 0===b||b(!0),n({method:"put",api:d.c.rest.updateComment(j,p||""),body:{comment:N}},(function(e){null===b||void 0===b||b(!1),null===g||void 0===g||g(!1),e.status===m.c&&x((function(e){var t=Object(a.a)(e.data),n=t.findIndex((function(e){return e.id===p}));return t[n].content=N,Object(c.a)(Object(c.a)({},e),{},{data:t})}))})))};return u?Object(o.jsx)(w,{}):Object(o.jsxs)("div",{className:"hb-comment-input",children:[Object(o.jsx)("img",{className:"hb-avatar-img",alt:"avatar",src:C}),Object(o.jsxs)("div",{className:"input-wrapper",children:[Object(o.jsx)("input",{ref:E,placeholder:"Ihr Kommentar ...",value:N,onChange:function(e){return k(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&(p?T():R())},maxLength:500}),N&&Object(o.jsx)(O.c,{style:{position:"absolute",right:24},circle:{color:"#dddedf",size:24},icon:"cross",size:16,color:"var(--violet-80)",onClick:function(){return p?null===g||void 0===g?void 0:g(!1):k("")}})]}),Object(o.jsx)(O.c,{icon:"send",size:24,color:"var(--violet-80)",disabled:""===(null===N||void 0===N?void 0:N.trim()),onClick:p?T:R})]})},g=function(e){var t=Object(h.b)(),n=function(e,n){return t(Object(m.d)(e,n))},s=Object(i.useState)(!1),l=Object(r.a)(s,2),u=l[0],b=l[1],j=e.videoId,p=(e.small,e.commentId),v=e.replyId,x=e.replyContent,g=e.setReplies,y=e.setShowReplyInput,_=Object(i.useState)(x||""),N=Object(r.a)(_,2),k=N[0],S=N[1],C=Object(h.c)((function(e){return e.auth})),E=C.avatar||f.a,R=Object(i.useRef)(null);Object(i.useEffect)((function(){var e;return null===(e=R.current)||void 0===e?void 0:e.focus()}),[]);var T=function(){var e=null===k||void 0===k?void 0:k.trim();e&&e!==x&&(b(!0),n({method:"post",api:d.c.rest.createReply(j,p),body:{comment:k}},(function(e){y(!1);var t=e.data;e.status===m.c&&g((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:[{id:t.id,user_id:C.user_id,user_avatar:E,username:C.first_name+" "+C.last_name,content:k,liked_amount:0,is_liked:!1,created_date:(new Date).getTime()/1e3,is_new:!0}].concat(Object(a.a)(e.data))})}))})))},I=function(){(null===k||void 0===k?void 0:k.trim())&&(null===b||void 0===b||b(!0),n({method:"put",api:d.c.rest.updateReply(j,p,v||""),body:{comment:k}},(function(e){null===b||void 0===b||b(!1),y(!1),e.status===m.c&&g((function(e){var t=Object(a.a)(e.data),n=t.findIndex((function(e){return e.id===v}));return t[n].content=k,Object(c.a)(Object(c.a)({},e),{},{data:t})}))})))};return u?Object(o.jsx)(w,{}):Object(o.jsxs)("div",{className:"hb-comment-input hb-ml-40",children:[Object(o.jsx)("img",{className:"hb-avatar-img",alt:"avatar",src:E}),Object(o.jsxs)("div",{className:"input-wrapper",children:[Object(o.jsx)("input",{ref:R,placeholder:"Ihre Antwort ...",value:k,onChange:function(e){return S(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&(v?I():T())},maxLength:500}),Object(o.jsx)(O.c,{style:{position:"absolute",right:24},circle:{color:"#dddedf",size:24},icon:"cross",size:16,color:"var(--violet-80)",onClick:function(){return null===y||void 0===y?void 0:y(!1)}})]}),Object(o.jsx)(O.c,{icon:"send",size:24,color:"var(--violet-80)",disabled:""===(null===k||void 0===k?void 0:k.trim()),onClick:v?I:T})]})},y=function(e){var t=Object(h.b)(),n=function(e,n){return t(Object(m.d)(e,n))},s=Object(i.useState)(!1),l=Object(r.a)(s,2),b=l[0],j=l[1],p=Object(i.useState)(!1),v=Object(r.a)(p,2),x=v[0],y=v[1],_=Object(i.useState)(!1),N=Object(r.a)(_,2),k=(N[0],N[1],e.videoId),S=e.commentId,C=e.reply,E=e.setComments,R=e.setReplies,T=e.setPopupDelete,I=e.handleOpenPopup,P=Object(h.c)((function(e){return e.auth})),L=function(){j(!0);var e=C.id;n({method:"delete",api:d.c.rest.deleteReply(k,S,e)},(function(t){j(!1),t.status===m.c&&(R((function(t){var n=t.data.filter((function(t){return t.id!==e}));return Object(c.a)(Object(c.a)({},t),{},{data:n})})),C.is_new||E((function(e){var t=Object(c.a)({},e),n=t.data,i=n.findIndex((function(e){return e.id===S}));return n[i].replied_amount-=1,t})))}))};return b?Object(o.jsx)(w,{}):x?Object(o.jsx)(g,{videoId:k,commentId:S,replyId:C.id,replyContent:C.content,setReplies:R,setShowReplyInput:y}):Object(o.jsxs)("div",{className:"hb-comment hb-ml-40",style:{borderRadius:"0 16px 16px 0",borderLeft:"4px solid var(--violet-20)"},children:[C.user_id===P.user_id&&Object(o.jsx)("div",{className:"more-ver",onClick:function(e){return I(e,{edit:function(){return y(!0)},del:function(){return T({show:!0,isReply:!0,deleteComment:L})}})},children:Object(o.jsx)("i",{className:"hb-icon-more-ver"})}),Object(o.jsxs)("div",{className:"d-flex align-items-center",children:[Object(o.jsx)("img",{className:"hb-avatar-img",alt:"avatar",src:C.user_avatar||f.a}),Object(o.jsxs)("div",{className:"header",children:[Object(o.jsx)("div",{className:"username",children:C.username}),Object(o.jsx)("div",{className:"time",children:Object(u.o)(C.created_date,!0)})]})]}),Object(o.jsxs)("div",{className:"body",children:[Object(o.jsx)("div",{className:"content",children:C.content}),Object(o.jsx)("div",{className:"d-flex align-items-center justify-content-between",children:Object(o.jsxs)("div",{className:"d-flex align-items-center",children:[Object(o.jsx)(O.c,{size:25,icon:C.is_liked?"heart-s":"heart-r",color:"var(--violet-80)",onClick:function(){var e=C.is_liked,t=C.id;R((function(e){var n=Object(a.a)(e.data),i=n.findIndex((function(e){return e.id===t})),o=n[i],r=o.is_liked;return o.is_liked=!r,o.liked_amount+=r?-1:1,Object(c.a)(Object(c.a)({},e),{},{data:n})})),n({method:e?"put":"post",api:e?d.c.rest.unlikeReply(k,S,t):d.c.rest.likeReply(k,S,t)},(function(e){e.status;m.c}))}}),C.liked_amount>0&&Object(o.jsx)("span",{className:"ml-2 like-comment-amount",children:C.liked_amount})]})})]})]})},_=function(e){var t=Object(h.b)(),n=function(e,n){return t(Object(m.d)(e,n))},s=Object(i.useState)(!1),l=Object(r.a)(s,2),b=l[0],j=l[1],p=Object(i.useState)(!1),v=Object(r.a)(p,2),_=v[0],N=v[1],k=Object(i.useState)(!1),S=Object(r.a)(k,2),C=S[0],E=S[1],R=Object(i.useState)({data:[],loading:!1,loaded:!1,show:!1}),T=Object(r.a)(R,2),I=T[0],P=T[1],L=e.videoId,B=e.comment,A=e.setComments,z=e.setPopupDelete,D=e.handleOpenPopup,W=Object(h.c)((function(e){return e.auth})),q=(Object(i.useRef)(1),function(e){n({api:d.c.rest.getReplies(L,B.id,e),method:"get"},(function(e){var t=e.status,n=e.data;t===m.c?P((function(e){var t=e.data;return Object(c.a)(Object(c.a)({},e),{},{show:!0,loading:!1,loaded:!0,data:[].concat(Object(a.a)(t),Object(a.a)(n.replies.filter((function(e){return!Object(u.i)(t,e)}))))})})):P((function(e){return Object(c.a)(Object(c.a)({},e),{},{loading:!1})}))}))}),V=function(){j(!0);var e=B.id;n({method:"delete",api:d.c.rest.deleteComment(L,e)},(function(t){j(!1),t.status===m.c&&A((function(t){var n=t.data.filter((function(t){return t.id!==e}));return Object(c.a)(Object(c.a)({},t),{},{data:n,total:t.total-1})}))}))};return Object(o.jsxs)(o.Fragment,{children:[b?Object(o.jsx)(w,{}):_?Object(o.jsx)(x,{videoId:L,commentId:B.id,commentContent:B.content,setComments:A,setShowUpdateInput:N}):Object(o.jsxs)("div",{className:"hb-comment",children:[B.user_id===W.user_id&&Object(o.jsx)("div",{className:"more-ver",onClick:function(e){return D(e,{edit:function(){return N(!0)},del:function(){return z({show:!0,deleteComment:V})}})},children:Object(o.jsx)("i",{className:"hb-icon-more-ver"})}),Object(o.jsxs)("div",{className:"d-flex align-items-center",children:[Object(o.jsx)("img",{className:"hb-avatar-img",alt:"avatar",src:B.user_avatar||f.a}),Object(o.jsxs)("div",{className:"header",children:[Object(o.jsx)("div",{className:"username",children:B.username}),Object(o.jsx)("div",{className:"time",children:Object(u.o)(B.created_date,!0)})]})]}),Object(o.jsxs)("div",{className:"body",children:[Object(o.jsx)("div",{className:"content",children:B.content}),Object(o.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[Object(o.jsxs)("div",{className:"d-flex align-items-center",children:[Object(o.jsx)(O.c,{size:25,icon:B.is_liked?"heart-s":"heart-r",color:"var(--violet-80)",onClick:function(){var e=B.is_liked,t=B.id;A((function(e){var n=Object(a.a)(e.data),i=n.findIndex((function(e){return e.id===t})),o=n[i],r=o.is_liked;return o.is_liked=!r,o.liked_amount+=r?-1:1,Object(c.a)(Object(c.a)({},e),{},{data:n})})),n({method:e?"put":"post",api:e?d.c.rest.unlikeComment(L,t):d.c.rest.likeComment(L,t)},(function(e){e.status;m.c}))}}),B.liked_amount>0&&Object(o.jsx)("span",{className:"ml-2 like-comment-amount",children:B.liked_amount}),B.replied_amount>0&&Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(O.c,{style:{fontWeight:"bold",marginLeft:28},size:23,icon:I.show?"comment-s":"comment-r",color:"var(--violet-80)",onClick:function(){I.show?P(Object(c.a)(Object(c.a)({},I),{},{show:!1})):(P(Object(c.a)(Object(c.a)({},I),{},{loading:!0,show:!0})),I.loaded?P(Object(c.a)(Object(c.a)({},I),{},{show:!0})):q(1))}}),Object(o.jsx)("span",{className:"ml-2 like-comment-amount",children:B.replied_amount})]})]}),Object(o.jsx)("div",{className:"btn-reply",onClick:function(){return E(!0)},children:"Antworten"})]})]})]}),Object(o.jsxs)("div",{children:[C&&Object(o.jsx)(g,{videoId:L,commentId:B.id,replyContent:"",setReplies:P,setShowReplyInput:E}),I.data.filter((function(e){return e.is_new})).map((function(e){return Object(o.jsx)(y,{videoId:L,setPopupDelete:z,commentId:B.id,reply:e,setComments:A,setReplies:P,handleOpenPopup:D},e.id)})),B.replied_amount>0&&I.show&&I.data.filter((function(e){return!e.is_new})).map((function(e){return Object(o.jsx)(y,{videoId:L,setPopupDelete:z,commentId:B.id,reply:e,setComments:A,setReplies:P,handleOpenPopup:D},e.id)})),I.loading&&Object(o.jsx)(w,{})]})]})},N=function(e){var t=e.popupDelete,n=e.setPopupDelete,i=t.deleteComment,a=t.show,r=t.isReply,s=function(){n(Object(c.a)(Object(c.a)({},t),{},{show:!1}))};return Object(o.jsx)(O.h,{show:a,handleClose:s,title:r?"Antwort l\xf6schen":"Kommentar l\xf6schen",content:r?"Sind Sie sicher, dass Sie Ihren Antwort unwiederruflich l\xf6schen wollen?":"Sind Sie sicher, dass Sie Ihren Kommentar unwiederruflich l\xf6schen wollen?",up:"Jetzt l\xf6schen",down:"Abbrechen",upCallback:function(){null===i||void 0===i||i(),s()},downCallback:s})},k=n(607),S=function(e){var t=e.icon,n=e.label,i=e.callback;return Object(o.jsxs)("div",{className:"hb-workbook-item",onClick:i,children:[Object(o.jsxs)("div",{className:"d-flex align-items-center",style:{width:"calc(100% - 30px)"},children:[Object(o.jsx)("div",{className:"icon",children:Object(o.jsx)("i",{className:"hb-icon-".concat(t)})}),Object(o.jsx)("div",{className:"label",children:n})]}),Object(o.jsx)("div",{className:"arrow",children:Object(o.jsx)("i",{className:"hb-icon-arrow-right"})})]})},C=function(e){var t=e.data,n=Object(i.useState)(!1),a=Object(r.a)(n,2),c=(a[0],a[1],Object(i.useState)({show:!1,name:"",link:""})),s=Object(r.a)(c,2),l=s[0],d=s[1];Object(i.useRef)(null);return Object(o.jsxs)("div",{children:[Object(o.jsxs)(O.g,{size:"xl",style:{height:"90vh"},centered:!0,closeBtn:!0,show:l.show,onClose:function(){return d({show:!1,name:"",link:""})},closeOnBackdrop:!1,children:[Object(o.jsx)("div",{className:"hb-modal-body",children:l.name}),Object(o.jsx)("iframe",{title:l.name,width:"100%",height:"95%",src:l.link,style:{border:"none"}},l.link)]}),Object(o.jsx)("div",{className:"header",children:"Arbeitsunterlagen und Anleitungen"}),t.map((function(e){return Object(o.jsx)(S,{label:e.file_name,icon:"file-text",callback:function(){return d({show:!0,name:e.file_name,link:e.link})}},e.key)}))]})},E=n(669),R=n(683),T=(n(1053),function(e){var t=e.handleClose,n=Object(i.useState)([{id:"1",title:"Wie kann ich die Intensit\xe4t der \xdcbung steigern?",content:["Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo."],show:!0},{id:"2",title:"Wie kann ich die Intensit\xe4t der \xdcbung steigern?",content:["Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo."],show:!1},{id:"3",title:"Wie kann ich die Intensit\xe4t der \xdcbung steigern?",content:["Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo."],show:!1},{id:"4",title:"Wie kann ich die Intensit\xe4t der \xdcbung steigern?",content:["Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo."],show:!1}]),c=Object(r.a)(n,2),s=c[0],l=c[1];return Object(o.jsxs)("div",{className:"hb-wrapper",children:[Object(o.jsxs)("div",{className:"hb-mx-20",children:[Object(o.jsx)("div",{className:"hb-my-28",children:Object(o.jsxs)(O.d,{color:"nightblue",onClick:function(){t(),window.scrollTo(0,0)},children:[Object(o.jsx)("i",{className:"hb-icon-arrow-left hb-icon-md"})," Zur\xfcck"]})}),Object(o.jsx)("div",{className:"hb-title hb-qna-title",children:"H\xe4ufige Fragen zum Video"})]}),Object(o.jsx)("div",{className:"hb-mx-20 hb-qna-contentWrapper",children:Object(o.jsx)("div",{className:"hb-qna-card",children:s.map((function(e,t){return Object(o.jsxs)("div",{style:{marginTop:0===t?0:16},children:[Object(o.jsxs)("div",{className:"hb-qna-item-header",style:{borderRadius:e.show?"24px 24px 0 0":24},onClick:function(){return function(e){var t=Object(a.a)(s);t[e].show=!t[e].show,l(t)}(t)},children:[Object(o.jsxs)("span",{children:[e.title," "]}),Object(o.jsx)("i",{className:"hb-icon-angle-down",style:{transform:"rotate(".concat(e.show?-180:0,"deg)"),fontSize:8,height:9}})]}),e.show&&Object(o.jsx)("div",{className:"hb-qna-item-wrapper",children:e.content.map((function(e,t){return Object(o.jsx)("div",{className:"hb-qna-content",style:{marginTop:0===t?0:10},children:e},t)}))})]},e.id)}))})})]})}),I=n(1054),P=n.n(I);t.default=function(e){var t,n,s,w,g=Object(h.b)(),y=function(e,t){return g(Object(m.d)(e,t))},I=new URLSearchParams(null===e||void 0===e||null===(t=e.location)||void 0===t?void 0:t.search),L=Object(j.i)(),B=I.get("video"),A=Object(i.useState)(Math.max(Number(I.get("time"))||0,0)),z=Object(r.a)(A,2),D=z[0],W=z[1],q=Object(i.useState)(I.get("qna")||!1),V=Object(r.a)(q,2),H=V[0],F=V[1],M=I.get("autoplay"),U=Object(j.h)(),K=Object(i.useRef)(1),J=Object(i.useRef)(1),Q=Object(i.useState)(null),Z=Object(r.a)(Q,2),G=Z[0],X=Z[1],Y=Object(i.useState)({isLiked:!1,count:0}),$=Object(r.a)(Y,2),ee=($[0],$[1]),te=Object(i.useState)(!1),ne=Object(r.a)(te,2),ie=ne[0],oe=ne[1],ae=Object(i.useState)({data:[],loading:!0}),ce=Object(r.a)(ae,2),re=ce[0],se=ce[1],le=Object(i.useState)({data:[],loading:!0,total:0,full:!1}),de=Object(r.a)(le,2),ue=de[0],me=de[1],be=Object(i.useState)(null),je=Object(r.a)(be,2),pe=je[0],ve=je[1],he=Object(i.useState)({deleteComment:null,show:!1,isReply:!1}),fe=Object(r.a)(he,2),Oe=fe[0],we=fe[1],xe=Object(i.useState)({show:!1,top:0,left:0,width:0,items:[]}),ge=Object(r.a)(xe,2),ye=ge[0],_e=ge[1],Ne=function(e){y({method:"get",api:d.c.rest.getComments(B,e)},(function(e){var t=e.data;e.status===m.c?me((function(e){var n=e.data;return Object(c.a)(Object(c.a)({},e),{},{data:[].concat(Object(a.a)(n),Object(a.a)(t.comments.filter((function(e){return!Object(u.i)(n,e)})))),loading:!1,full:t.comments.length<10})})):me((function(e){return Object(c.a)(Object(c.a)({},e),{},{loading:!1})}))}))};function ke(e){var t=document.documentElement.clientWidth,n=t<=860?e.left-131:e.left+window.scrollX,i=e.top+window.scrollY-20;return{top:i=t<=860?i+50:i,left:n+30}}function Se(){var e=ye.targetEle,t=l.a.findDOMNode(e),n=null===t||void 0===t?void 0:t.getBoundingClientRect();if(n){var i=ke(n);_e(Object(c.a)(Object(c.a)({},ye),i))}}Object(i.useEffect)((function(){B?(G&&pe&&pe.reset(),window.scrollTo(0,0),me(Object(c.a)(Object(c.a)({},ue),{},{data:[],loading:!0})),function(e){y({method:"get",api:d.c.rest.getVideoById(e),loading:!G},(function(e){var t=e.data;e.status===m.c&&(X(t.video),ee({isLiked:t.video.is_liked,count:t.video.liked_amount}),oe(t.video.is_saved),me((function(e){return Object(c.a)(Object(c.a)({},e),{},{total:t.video.commented_amount})})))}))}(B),Ne(K.current),function(e,t){y({method:"get",api:d.c.rest.getRelatedVideos(e,10,t)},(function(e){var t=e.data;e.status===m.c&&se({data:t.videos,loading:!1})}))}(B,J.current),_e(Object(c.a)(Object(c.a)({},ye),{},{show:!1}))):U.push("/mobility")}),[B]),Object(i.useEffect)((function(){pe&&G.link_hls&&pe.src(G.link_hls)}),[G]),Object(i.useEffect)((function(){return window.addEventListener("resize",Se),function(){window.removeEventListener("resize",Se)}}),[ye]);var Ce=G?{setPlayer:ve,autoplay:"0"!==M,sources:[{src:null===G||void 0===G?void 0:G.link_hls,type:"application/x-mpegURL"}],poster:null===G||void 0===G?void 0:G.thumbnail,setRelatedVideos:se,startTime:D,showQuality:!0}:{},Ee=function(e,t){var n=ke(e.target.getBoundingClientRect());_e(Object(c.a)(Object(c.a)({targetEle:e.target,show:!0,width:141,items:[{id:"edit",label:"Bearbeiten",icon:"edit-2",handle:t.edit},{id:"del",label:"L\xf6schen",icon:"trash",handle:t.del}]},t),n))},Re=G?Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("div",{className:"hb-video mb-2",children:Object(o.jsx)(b.a,Object(c.a)({className:P.a.videoWrapper},Ce))}),Object(o.jsxs)("div",{className:"d-flex justify-content-between align-items-center hb-my-28",children:[Object(o.jsxs)("div",{className:"d-flex align-items-center",children:[Object(o.jsx)("div",{onClick:function(e){e.preventDefault(),G.trainer_id&&U.push("/mobility/trainer-detail/".concat(G.trainer_id))},style:{backgroundImage:'url("'.concat(G.trainer_avatar||f.b,'")'),cursor:G.trainer_id?"pointer":"default"},className:"hb-card-avatar"}),Object(o.jsxs)("div",{className:"hb-card-views-wrapper detail",children:[Object(o.jsx)("i",{className:"hb-icon-eye",style:{color:"var(--violet-80)",fontSize:22,marginRight:7}}),Object(o.jsx)("div",{children:null===G||void 0===G?void 0:G.viewed_amount})]})]}),Object(o.jsx)("div",{className:"hb-save",onClick:function(){oe((function(e){return!e})),y({method:ie?"put":"post",api:ie?d.c.rest.unsaveVideo(B):d.c.rest.saveVideo(B)},(function(e){e.status;m.c}))},children:Object(o.jsx)("i",{className:"".concat(ie?"hb-icon-heart-s":"hb-icon-heart-r")})})]}),Object(o.jsx)("div",{className:"hb-title-video",children:null===G||void 0===G?void 0:G.title}),Object(o.jsx)("div",{className:"d-flex ".concat(P.a.tags),children:null===G||void 0===G||null===(n=G.tag)||void 0===n||null===(s=n.split)||void 0===s?void 0:s.call(n,",").filter((function(e){return""!==e})).map((function(e,t){return Object(o.jsx)(p.a,{to:"/mobility/hashtag/".concat(e),className:"hb-card-keyword",children:"#".concat(e)},t)}))}),(null===G||void 0===G?void 0:G.description)&&Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("div",{className:"hb-video-description-title",children:"Beschreibung"}),Object(o.jsx)("div",{className:"hb-video-description-content",children:G.description})]}),Object(o.jsxs)("div",{className:"hb-card-video",children:[Object(o.jsxs)("div",{className:"header",children:[ue.total," Kommentar",ue.total>1&&"e"]}),Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(x,{videoId:G.id,setComments:me}),ue.data.map((function(e){return Object(o.jsx)(_,{handleOpenPopup:Ee,videoId:B,comment:e,setComments:me,setPopupDelete:we},e.id)}))]}),ue.loading&&Object(o.jsx)(v.a,{size:"large",render:f.e}),Object(o.jsx)(k.a,{onEnter:function(){ue.loading||ue.total<=ue.data.length||ue.full||(me(Object(c.a)(Object(c.a)({},ue),{},{loading:!0})),K.current+=1,Ne(K.current))}})]})]}):Object(o.jsx)("div",{className:"hb-video mb-2",children:Object(o.jsx)("div",{className:"video-wrapper ".concat(P.a.videoWrapper)})});return H?Object(o.jsx)(T,{handleClose:function(){F(!1),U.push(L.pathname+"?video=".concat(B,"&autoplay=").concat(M))}}):Object(o.jsxs)(R.a,{children:[Object(o.jsx)(O.f,Object(c.a)(Object(c.a)({},ye),{},{className:"userOptions",handleClose:function(){return _e(Object(c.a)(Object(c.a)({},ye),{},{show:!1}))}})),Object(o.jsxs)("div",{className:"hb-mx-20",children:[Object(o.jsx)("div",{className:"hb-my-28",children:Object(o.jsxs)(O.d,{onClick:function(){return U.goBack()},children:[Object(o.jsx)("i",{className:"hb-icon-arrow-left hb-icon-md"})," Zur\xfcck"]})}),Object(o.jsxs)("div",{className:"mobility-detail",children:[Object(o.jsx)(N,{popupDelete:Oe,setPopupDelete:we}),Object(o.jsxs)("div",{className:"row ".concat(P.a.detailWrapperContainer),children:[Object(o.jsx)("div",{className:"col-md-8",children:Re}),Object(o.jsxs)("div",{className:"col-md-4",children:[(null===G||void 0===G||null===(w=G.documents)||void 0===w?void 0:w.length)>0&&Object(o.jsx)("div",{className:"hb-card-video",children:Object(o.jsx)(C,{data:G.documents})}),Object(o.jsxs)("div",{className:"hb-card-video",children:[Object(o.jsx)("div",{className:"header",children:"H\xe4ufige Fragen zum Video"}),Object(o.jsx)(S,{label:"Fragen & Antworten",icon:"comment-2-question",callback:function(){var e=Math.floor(pe.currentTime());U.push(L.pathname+"?video=".concat(B,"&qna=true&time=").concat(e,"&autoplay=").concat(pe.paused()?"0":"1")),W(e),F(!0),window.scrollTo(0,0)}})]}),Object(o.jsxs)("div",{className:"hb-card-video ".concat(P.a.listVideosWrapper),children:[Object(o.jsx)("div",{className:"header",children:"Empfohlene Videos"}),Object(o.jsx)("div",{className:P.a.listVideos,children:re.data.map((function(e,t){return Object(i.createElement)(E.a,Object(c.a)(Object(c.a)({setVideos:se},e),{},{key:e.id,index:t,isRelated:!0}))}))})]})]})]})]})]})]})}},606:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i=!("undefined"===typeof window||!window.document||!window.document.createElement);var o=void 0;function a(){return void 0===o&&(o=function(){if(!i)return!1;if(!window.addEventListener||!window.removeEventListener||!Object.defineProperty)return!1;var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}}),n=function(){};window.addEventListener("testPassiveEventSupport",n,t),window.removeEventListener("testPassiveEventSupport",n,t)}catch(o){}return e}()),o}function c(e){e.handlers===e.nextHandlers&&(e.nextHandlers=e.handlers.slice())}function r(e){this.target=e,this.events={}}r.prototype.getEventHandlers=function(e,t){var n,i=String(e)+" "+String((n=t)?!0===n?100:(n.capture<<0)+(n.passive<<1)+(n.once<<2):0);return this.events[i]||(this.events[i]={handlers:[],handleEvent:void 0},this.events[i].nextHandlers=this.events[i].handlers),this.events[i]},r.prototype.handleEvent=function(e,t,n){var i=this.getEventHandlers(e,t);i.handlers=i.nextHandlers,i.handlers.forEach((function(e){e&&e(n)}))},r.prototype.add=function(e,t,n){var i=this,o=this.getEventHandlers(e,n);c(o),0===o.nextHandlers.length&&(o.handleEvent=this.handleEvent.bind(this,e,n),this.target.addEventListener(e,o.handleEvent,n)),o.nextHandlers.push(t);var a=!0;return function(){if(a){a=!1,c(o);var r=o.nextHandlers.indexOf(t);o.nextHandlers.splice(r,1),0===o.nextHandlers.length&&(i.target&&i.target.removeEventListener(e,o.handleEvent,n),o.handleEvent=void 0)}}};var s="__consolidated_events_handlers__";function l(e,t,n,i){e[s]||(e[s]=new r(e));var o=function(e){if(e)return a()?e:!!e.capture}(i);return e[s].add(t,n,o)}},607:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return g}));var i=n(606),o=(n(0),n(1)),a=n.n(o),c=n(103);function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e,t){return!t||"object"!==typeof t&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=s(e);if(t){var o=s(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return d(this,n)}}function m(e,t){var n,i=(n=e,!isNaN(parseFloat(n))&&isFinite(n)?parseFloat(n):"px"===n.slice(-2)?parseFloat(n.slice(0,-2)):void 0);if("number"===typeof i)return i;var o=function(e){if("%"===e.slice(-1))return parseFloat(e.slice(0,-1))/100}(e);return"number"===typeof o?o*t:void 0}var b="above",j="inside",p="below",v="invisible";function h(e){return"string"===typeof e.type}var f;var O=[];function w(e){O.push(e),f||(f=setTimeout((function(){var e;for(f=null;e=O.shift();)e()}),0));var t=!0;return function(){if(t){t=!1;var n=O.indexOf(e);-1!==n&&(O.splice(n,1),!O.length&&f&&(clearTimeout(f),f=null))}}}var x={debug:!1,scrollableAncestor:void 0,children:void 0,topOffset:"0px",bottomOffset:"0px",horizontal:!1,onEnter:function(){},onLeave:function(){},onPositionChange:function(){},fireOnRapidScroll:!0},g=function(t){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(f,t);var n,o,s,d=u(f);function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=d.call(this,e)).refElement=function(e){t._ref=e},t}return n=f,(o=[{key:"componentDidMount",value:function(){var e=this;f.getWindow()&&(this.cancelOnNextTick=w((function(){e.cancelOnNextTick=null;var t=e.props,n=t.children;t.debug,function(e,t){if(e&&!h(e)&&!t)throw new Error("<Waypoint> needs a DOM element to compute boundaries. The child you passed is neither a DOM element (e.g. <div>) nor does it use the innerRef prop.\n\nSee https://goo.gl/LrBNgw for more info.")}(n,e._ref),e._handleScroll=e._handleScroll.bind(e),e.scrollableAncestor=e._findScrollableAncestor(),e.scrollEventListenerUnsubscribe=Object(i.a)(e.scrollableAncestor,"scroll",e._handleScroll,{passive:!0}),e.resizeEventListenerUnsubscribe=Object(i.a)(window,"resize",e._handleScroll,{passive:!0}),e._handleScroll(null)})))}},{key:"componentDidUpdate",value:function(){var e=this;f.getWindow()&&this.scrollableAncestor&&(this.cancelOnNextTick||(this.cancelOnNextTick=w((function(){e.cancelOnNextTick=null,e._handleScroll(null)}))))}},{key:"componentWillUnmount",value:function(){f.getWindow()&&(this.scrollEventListenerUnsubscribe&&this.scrollEventListenerUnsubscribe(),this.resizeEventListenerUnsubscribe&&this.resizeEventListenerUnsubscribe(),this.cancelOnNextTick&&this.cancelOnNextTick())}},{key:"_findScrollableAncestor",value:function(){var t=this.props,n=t.horizontal,i=t.scrollableAncestor;if(i)return function(t){return"window"===t?e.window:t}(i);for(var o=this._ref;o.parentNode;){if((o=o.parentNode)===document.body)return window;var a=window.getComputedStyle(o),c=(n?a.getPropertyValue("overflow-x"):a.getPropertyValue("overflow-y"))||a.getPropertyValue("overflow");if("auto"===c||"scroll"===c||"overlay"===c)return o}return window}},{key:"_handleScroll",value:function(e){if(this._ref){var t=this._getBounds(),n=function(e){return e.viewportBottom-e.viewportTop===0?v:e.viewportTop<=e.waypointTop&&e.waypointTop<=e.viewportBottom||e.viewportTop<=e.waypointBottom&&e.waypointBottom<=e.viewportBottom||e.waypointTop<=e.viewportTop&&e.viewportBottom<=e.waypointBottom?j:e.viewportBottom<e.waypointTop?p:e.waypointTop<e.viewportTop?b:v}(t),i=this._previousPosition,o=this.props,a=(o.debug,o.onPositionChange),c=o.onEnter,r=o.onLeave,s=o.fireOnRapidScroll;if(this._previousPosition=n,i!==n){var l={currentPosition:n,previousPosition:i,event:e,waypointTop:t.waypointTop,waypointBottom:t.waypointBottom,viewportTop:t.viewportTop,viewportBottom:t.viewportBottom};a.call(this,l),n===j?c.call(this,l):i===j&&r.call(this,l),s&&(i===p&&n===b||i===b&&n===p)&&(c.call(this,{currentPosition:j,previousPosition:i,event:e,waypointTop:t.waypointTop,waypointBottom:t.waypointBottom,viewportTop:t.viewportTop,viewportBottom:t.viewportBottom}),r.call(this,{currentPosition:n,previousPosition:j,event:e,waypointTop:t.waypointTop,waypointBottom:t.waypointBottom,viewportTop:t.viewportTop,viewportBottom:t.viewportBottom}))}}}},{key:"_getBounds",value:function(){var e,t,n=this.props,i=n.horizontal,o=(n.debug,this._ref.getBoundingClientRect()),a=o.left,c=o.top,r=o.right,s=o.bottom,l=i?a:c,d=i?r:s;this.scrollableAncestor===window?(e=i?window.innerWidth:window.innerHeight,t=0):(e=i?this.scrollableAncestor.offsetWidth:this.scrollableAncestor.offsetHeight,t=i?this.scrollableAncestor.getBoundingClientRect().left:this.scrollableAncestor.getBoundingClientRect().top);var u=this.props,b=u.bottomOffset;return{waypointTop:l,waypointBottom:d,viewportTop:t+m(u.topOffset,e),viewportBottom:t+e-m(b,e)}}},{key:"render",value:function(){var e=this,t=this.props.children;return t?h(t)||Object(c.isForwardRef)(t)?a.a.cloneElement(t,{ref:function(n){e.refElement(n),t.ref&&("function"===typeof t.ref?t.ref(n):t.ref.current=n)}}):a.a.cloneElement(t,{innerRef:this.refElement}):a.a.createElement("span",{ref:this.refElement,style:{fontSize:0}})}}])&&r(n.prototype,o),s&&r(n,s),f}(a.a.PureComponent);g.above=b,g.below=p,g.inside=j,g.invisible=v,g.getWindow=function(){if("undefined"!==typeof window)return window},g.defaultProps=x,g.displayName="Waypoint"}).call(this,n(29))}}]);
//# sourceMappingURL=35.26f48822.chunk.js.map