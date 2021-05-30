(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[69],{1211:function(e,t,i){"use strict";i.r(t);var n=i(4),a=i(8),c=i(27),s=i(1),r=i(31),l=i(57),o=i(649),d=i(102),j=i.n(d),u=i(609),b=i(610),h=i(59),m=i(34),O=i(45),x=i(605),p=i(628),g=function(e){return b.b().shape({title:b.d().trim().required("Category name is required")})},f=function(e){var t=Object(o.a)().t,i=e.searchCategories,a=e.show,r=e.initialValues,d=e.callApi,j=Object(s.useRef)(null),b=Object(s.useState)(!1),f=Object(c.a)(b,2),y=f[0],w=f[1],v=function(){j.current.resetForm(),e.handleClose(),w(!1)};return Object(n.jsxs)(x.a,{centered:!0,show:a,onClose:v,closeOnBackdrop:!1,children:[Object(n.jsxs)(l.G,{children:["New Category",Object(n.jsx)("i",{className:"fa fa-close cursor-pointer",onClick:function(){j.current.dirty?w(!0):v()}})]}),Object(n.jsxs)(l.E,{className:"popup--update-user",children:[Object(n.jsxs)(x.a,{size:"sm",show:y,centered:!0,closeOnBackdrop:!1,children:[Object(n.jsx)(l.E,{style:{textAlign:"center"},children:"Are you sure you want to discard your changes?"}),Object(n.jsxs)(l.F,{style:{display:"flex",justifyContent:"space-around"},children:[Object(n.jsx)("button",{className:"btn btn-danger",style:{width:160},color:"danger",onClick:v,children:"Discard"}),Object(n.jsx)("button",{style:{width:160},className:"btn btn-primary",onClick:function(){return w(!1)},children:"Keep Editing"})]})]}),Object(n.jsx)(l.L,{className:"justify-content-center",children:Object(n.jsx)(l.j,{md:"12",children:Object(n.jsx)(l.h,{children:Object(n.jsx)(l.e,{className:"popup--update-user__card--wrapper",children:Object(n.jsx)(l.f,{children:Object(n.jsx)(u.a,{innerRef:j,enableReinitialize:!0,initialValues:r,validate:Object(h.q)(g),onSubmit:function(e){var t={title:e.title.trim(),description:e.description.trim()};d({method:"post",api:m.c.rest.adminCreateMobilityCategory(),body:t,loading:!0},(function(e){e.status===O.c&&i()})),v()},children:function(e){var i=e.values,a=e.errors,c=e.touched,s=(e.status,e.dirty),r=e.handleChange,o=e.handleBlur,d=e.handleSubmit,j=(e.isSubmitting,e.isValid);e.handleReset,e.setTouched;return Object(n.jsxs)(l.q,{onSubmit:d,children:[Object(n.jsx)(p.a,{label:"Title (*)",width:100,children:Object(n.jsxs)(l.r,{className:"m-0",children:[Object(n.jsx)(l.u,{type:"text",placeholder:"Title (*)",invalid:""!==i.title.trim()&&c.title&&!!a.title,maxLength:100,value:i.title,onBlur:o,onChange:r,name:"title"}),Object(n.jsx)(l.A,{children:a.title})]})}),Object(n.jsx)(p.a,{label:"Description",width:100,children:Object(n.jsx)(l.Q,{type:"text",placeholder:"Description",maxLength:1e3,value:i.description,onBlur:o,onChange:r,name:"description",rows:5})}),Object(n.jsx)(l.r,{className:"mb-0",children:Object(n.jsx)(l.L,{children:Object(n.jsxs)(l.j,{xs:"12",style:{textAlign:"right"},children:[Object(n.jsx)(l.d,{color:"secondary",className:"px-4 mr-4",onClick:v,children:t("cancel")}),Object(n.jsx)(l.d,{color:"primary",className:"px-4",type:"submit",disabled:!(j&&s),children:t("create")})]})})})]})}})})})})})})]})]})},y=i(611),w=i(28),v=i(35),C=["no",{key:"title",label:"Category name"},"description","created_date",{key:"total_video",label:"Number Of Videos"},"action"],N={title:"",description:""};t.default=function(e){var t=Object(o.a)().t,i=Object(w.b)(),d=function(e,t){return i(Object(O.d)(e,t))},u=Object(r.h)(),b=new URLSearchParams(e.location.search),h=Math.max(Number(b.get("page"))||1,1),p=Object(s.useState)({data:[],total:0,totalPages:0,loading:!0}),g=Object(c.a)(p,2),S=g[0],k=g[1],D=Object(s.useState)({show:!1,initialValues:N}),B=Object(c.a)(D,2),V=B[0],T=B[1],A=Object(s.useState)({show:!1,id:"",name:""}),_=Object(c.a)(A,2),M=_[0],P=_[1],q=Object(s.useState)({show:!1,id:"",name:""}),R=Object(c.a)(q,2),E=R[0],L=R[1],Y=Object(s.useState)(null),z=Object(c.a)(Y,2),F=z[0],G=z[1],J=Object(s.useState)(null),H=Object(c.a)(J,2),I=H[0],K=H[1],Q=Object(s.useState)(""),U=Object(c.a)(Q,2),W=U[0],X=U[1];Object(s.useEffect)((function(){$(h,W)}),[F,I]);var Z=Object(n.jsx)("div",{});S.loading||S.total||(Z=Object(n.jsx)("div",{children:t("no-items-found")}));var $=function(e,t){k(Object(a.a)(Object(a.a)({},S),{},{loading:!0})),d({method:"get",api:m.c.rest.adminGetMobilityCategories(e,t,F?F.getTime()/1e3:null,I?I.getTime()/1e3+86399:null)},(function(t){var i=t.status,n=t.data;i===O.c?(k({data:n.data.map((function(t,i){return Object(a.a)(Object(a.a)({},t),{},{no:i+1+10*(e-1)})})),total:n.total,totalPages:Math.ceil(n.total/10),loading:!1}),h!==e&&u.push("?page=".concat(e))):k((function(e){return Object(a.a)(Object(a.a)({},e),{},{loading:!1})}))}))};return Object(n.jsxs)("div",{style:{width:"90%",margin:"10px auto"},children:[Object(n.jsx)(f,{callApi:d,initialValues:V.initialValues,show:V.show,handleClose:function(){return T({show:!1,initialValues:N})},searchCategories:function(){return $(h,W)}}),Object(n.jsx)(x.b,{isVisible:M.show,title:"Delete Category",content:"Are you sure to delete the category ".concat(M.name),leftButtonText:"No",rightButtonText:"Yes",leftButtonOnPress:function(){return P({show:!1,id:"",name:""})},rightButtonOnPress:function(){L({show:!0,id:M.id,name:M.name}),P({show:!1,id:"",name:""})}}),Object(n.jsx)(x.d,{isVisible:E.show,title:"Delete Category",leftButtonText:"Cancel",rightButtonText:"Delete",content:'Please enter your password to delete category "'.concat(E.name,'"!'),callback:function(e){return function(e,t){P({show:!1,id:"",name:""}),k(Object(a.a)(Object(a.a)({},S),{},{loading:!0})),d({method:"post",api:m.c.rest.confirmPassword(),body:{password:t}},(function(t){t.status===O.c?d({method:"delete",api:m.c.rest.adminDeleteMobilityCategory(e)},(function(e){e.status===O.c?$(h,W):k((function(e){return Object(a.a)(Object(a.a)({},e),{},{loading:!1})}))})):k((function(e){return Object(a.a)(Object(a.a)({},e),{},{loading:!1})}))}))}(E.id,e)},handleClose:function(){return L({show:!1,id:"",name:""})}}),Object(n.jsxs)("div",{children:[Object(n.jsx)("h2",{children:"Category Management"}),Object(n.jsxs)("div",{className:"d-flex align-items-center mt-4",style:{marginBottom:"2.4rem"},children:[Object(n.jsx)(y.a,{className:"mr-5",searchName:W,setSearchName:X,searchEmpty:!0,callbackSearch:function(e){return $(1,e)}}),Object(n.jsx)("div",{children:"From date:"}),Object(n.jsx)("div",{children:Object(n.jsx)(x.e,{maxDate:I||new Date,date:F,setDate:G})}),Object(n.jsx)("div",{children:"To date:"}),Object(n.jsx)("div",{children:Object(n.jsx)(x.e,{minDate:F,date:I,setDate:K})}),Object(n.jsx)("div",{style:{textAlign:"right",flex:1},children:Object(n.jsx)(l.d,{color:"primary",onClick:function(){return T({show:!0,initialValues:{title:"",description:""}})},children:"Add new category"})})]})]}),Object(n.jsx)("div",{style:{minHeight:"65vh",textAlign:"center"},children:Object(n.jsx)(l.l,{items:S.data,fields:C,loading:S.loading,noItemsViewSlot:Z,hover:!0,striped:!0,scopedSlots:{title:function(e){return Object(n.jsx)("td",{className:"align-middle",children:e.title})},description:function(e){return Object(n.jsx)("td",{title:e.description.length>90?e.description:"",className:"align-middle",children:e.description.length>90?e.description.substring(0,87)+"...":e.description})},created_date:function(e){return Object(n.jsx)("td",{className:"align-middle",children:j()(1e3*e.created_date).format("DD/MM/YYYY")})},number_of_videos:function(e){return Object(n.jsx)("td",{className:"align-middle",children:e.total_video})},action:function(e){return Object(n.jsxs)("td",{className:"align-middle",children:[Object(n.jsx)(l.d,{color:"primary",variant:"outline",shape:"square",size:"sm",style:{marginRight:10},onClick:function(){return P({show:!0,id:e.id,name:e.title})},children:Object(n.jsx)("i",{className:"fas fa-trash-alt",children:" "})}),Object(n.jsx)(l.d,{color:"primary",variant:"outline",shape:"square",size:"sm",onClick:function(){return u.push("/admin/mobility/categories/".concat(e.id))},children:Object(n.jsx)("i",{className:"fas fa-pencil-alt",children:" "})})]})}}})}),Object(v.h)(S.totalPages,h,(function(e){h!==e&&(u.push("?page=".concat(e)),$(e,W))}),S.total)]})}},628:function(e,t,i){"use strict";var n=i(4);i(1);t.a=function(e){var t=e.className,i=e.label,a=e.children,c=e.width,s=e.centered,r=e.style;return c=c||110,Object(n.jsxs)("div",{className:"d-flex mb-3 ".concat(s?"align-items-center":""," ").concat(t||""),style:r,children:[Object(n.jsx)("div",{style:{minWidth:c,marginTop:6},children:i}),Object(n.jsx)("div",{style:{width:"calc(100% - ".concat(c,"px)")},children:a})]})}}}]);
//# sourceMappingURL=69.949d89bb.chunk.js.map