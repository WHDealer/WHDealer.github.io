(this["webpackJsonphb-frontend"]=this["webpackJsonphb-frontend"]||[]).push([[41],{1163:function(e,t,n){},1206:function(e,t,n){"use strict";n.r(t);var i,a=n(4),r=n(8),l=n(27),c=n(1),s=n(31),o=n(57),d=n(649),m=n(58),u=n(609),A=n(610),h=n(59),b=n(34),j=n(45),g=n(605),F=n(28),p=n(80),f=n(628),O=n(672),v=n.n(O),C=n(47),B=n.n(C),x=n(35),y=n(647),D=n.n(y),E=n(613),w=n(709),k=(n(1163),n(648)),P=n.n(k),G=n(166),L=n.n(G),N=n(68),_=function(e){return A.b().shape({first_name:A.d().trim().required("Trainer First Name is required"),last_name:A.d().trim().required("Trainer Last Name is required"),intro_video:A.d().trim().required("Intro Video is required")})},I=function(e){var t,n=Object(d.a)().t,s=e.type,A=e.show,O=e.initialValues,C=e.searchTrainers,y=e.callApi,k=e.trainers,G=e.uploadingVideos,I=e.setUploadingVideos,T=Object(c.useState)(""),S=Object(l.a)(T,2),M=S[0],R=S[1],Q=Object(c.useState)({trainerId:"",link:"",localLink:""}),z=Object(l.a)(Q,2),U=z[0],V=z[1],K=Object(c.useState)(""),Y=Object(l.a)(K,2),H=Y[0],q=Y[1],J=Object(F.b)(),X=Object(c.useRef)(null);Object(c.useEffect)((function(){var e=L.a.on(b.c.socketEvent.processedTrainerIntro,(function(e){var t,n,i,a,r,l=null===e||void 0===e||null===(t=e.data)||void 0===t||null===(n=t.trainer_id)||void 0===n||null===(i=n.split("/"))||void 0===i?void 0:i[0];-1!==k.findIndex((function(e){return e.id===l}))&&C(),l!==U.trainerId&&l!==O.id||null===X||void 0===X||null===(a=X.current)||void 0===a||null===(r=a.setFieldValue)||void 0===r||r.call(a,"intro_video_status","Posted"),J(Object(N.c)("Intro video has been successfully processed","success",5e3))}));return function(){L.a.rm(e)}}),[U.trainerId,O.id]);var W=function(e,t,n){(new Headers).append("x-amz-acl","public-read"),I((function(e){return[].concat(Object(m.a)(e),[{id:n,progress:0}])}));var a=B.a.create();delete a.defaults.baseURL,delete a.defaults.headers.common.Authorization,i=B.a.CancelToken.source(),a({method:"put",url:e,headers:{"x-amz-acl":"public-read","Content-Type":null===t||void 0===t?void 0:t.type},data:t,onUploadProgress:function(e){I((function(t){var i=Object(m.a)(t),a=i.findIndex((function(e){return e.id===n}));return a>-1?(i[a].progress=Math.round(100*e.loaded/e.total),i):i}))},cancelToken:i.token}).then((function(e){var t;$(n),I((function(e){return e.filter((function(e){return e.id!==n}))})),null===(t=X.current)||void 0===t||t.setFieldValue("intro_video_status","Processing")})).catch((function(e){console.log(e)}))},Z=function(e){var t=JSON.parse(x.g.get("videosUploading"))||[];t.push(e),x.g.set("videosUploading",JSON.stringify(t))},$=function(e){var t=x.g.get("videosUploading"),n=JSON.parse(t).filter((function(t){return t!==e}));x.g.set("videosUploading",JSON.stringify(n))},ee=Object(c.useState)(!1),te=Object(l.a)(ee,2),ne=te[0],ie=te[1],ae=function(){var t,n;V({trainerId:"",link:"",localLink:""}),X.current.setFieldValue("intro_video",null),X.current.setFieldValue("intro_video_status",null),null===(t=i)||void 0===t||null===(n=t.cancel)||void 0===n||n.call(t,"Upload cancelled"),I((function(e){return e.filter((function(e){return e.id!==U.trainerId}))})),X.current.resetForm(),e.handleClose(),ie(!1)},re=function(){X.current.dirty||M!==O.avatar?ie(!0):ae()};Object(c.useEffect)((function(){var e;A&&(R(O.avatar),null===X||void 0===X||null===(e=X.current)||void 0===e||e.resetForm())}),[A]);var le=function(e){var t=new FileReader,n=e.target.files[0];if(n){var i="",a="";t.onload=function(){R(t.result),J(Object(p.c)()),y({method:"get",api:"/api/v1/upload/image-trainer-avatar?file_name=".concat(n.name)},(function(e){if(e.status===j.c){var t,r,l;i=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.link,a=null===e||void 0===e||null===(r=e.data)||void 0===r||null===(l=r.file_path)||void 0===l?void 0:l.link;var c=new Headers;c.append("x-amz-acl","public-read"),fetch(i,{method:"PUT",headers:c,body:n,redirect:"follow"}).then((function(e){return e.text()})).then((function(){J(Object(p.d)()),R(a)})).catch((function(e){return console.log("error",e)}))}else J(Object(p.d)())}))},t.readAsDataURL(n)}},ce=Object(c.useRef)(null),se=null===(t=G.filter((function(e){return e.id===U.trainerId})))||void 0===t?void 0:t[0];return Object(a.jsxs)(g.a,{size:"lg",centered:!0,show:A,onClose:ae,closeOnBackdrop:!1,children:[Object(a.jsxs)(o.G,{children:["create"===s?"Create New Trainer":"Edit Trainer Information",Object(a.jsx)("i",{className:"fa fa-close cursor-pointer",onClick:re})]}),Object(a.jsxs)(o.E,{className:"popup--update-user",children:[Object(a.jsxs)(g.a,{size:"sm",show:ne,centered:!0,closeOnBackdrop:!1,children:[Object(a.jsx)(o.E,{style:{textAlign:"center"},children:"Are you sure you want to discard your changes?"}),Object(a.jsxs)(o.F,{style:{display:"flex",justifyContent:"space-around"},children:[Object(a.jsx)("button",{className:"btn btn-danger",style:{width:160},color:"danger",onClick:ae,children:"Discard"}),Object(a.jsx)("button",{style:{width:160},className:"btn btn-primary",onClick:function(){return ie(!1)},children:"Keep Editing"})]})]}),Object(a.jsx)(o.L,{className:"justify-content-center",children:Object(a.jsx)(o.j,{md:"12",children:Object(a.jsx)(o.h,{children:Object(a.jsx)(o.e,{className:"popup--update-user__card--wrapper",children:Object(a.jsx)(o.f,{children:Object(a.jsx)(u.a,{innerRef:X,enableReinitialize:!0,initialValues:O,validate:Object(h.q)(_),onSubmit:function(e){var t={id:U.trainerId,avatar:M,first_name:e.first_name.trim(),last_name:e.last_name.trim(),description:e.description.trim(),intro_video:e.intro_video,intro_video_status:"Posted"};y({method:"create"===s?"post":"put",api:b.c.rest.adminMobilityTrainer(O.id),body:t,loading:!0},(function(e){e.status===j.c&&C()})),ae()},children:function(e){var t=e.values,l=e.errors,c=e.touched,d=e.dirty,m=e.handleChange,u=e.handleBlur,g=e.handleSubmit,F=e.isValid,p=e.setFieldValue,C=e.setFieldTouched;return Object(a.jsxs)(o.q,{onSubmit:g,children:[Object(a.jsxs)("div",{className:"d-flex",children:[Object(a.jsx)(f.a,{label:"Avatar (*)",centered:!0,children:Object(a.jsxs)("div",{style:{position:"relative",margin:"12px 80px 16px 60px",width:128,height:128},children:[Object(a.jsx)("img",{src:M||"https://i.imgur.com/b08hxPY.png",alt:"avatar",style:{borderRadius:100,objectFit:"cover",width:"100%",height:"100%"}}),Object(a.jsx)("div",{onClick:function(){var e;return null===(e=ce.current)||void 0===e?void 0:e.click()},style:{position:"absolute",bottom:0,right:0,backgroundColor:"#ddd",width:40,height:40,borderRadius:20,cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(a.jsx)("i",{className:"fas fa-camera"})}),Object(a.jsx)("input",{className:"avatar-user--input",type:"file",id:"myFile",name:"filename",ref:ce,style:{display:"none"},accept:"image/x-png,image/gif,image/jpeg",onChange:le})]})}),Object(a.jsxs)("div",{style:{height:240,display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(null===t||void 0===t?void 0:t.intro_video)?Object(a.jsxs)("div",{className:"admin-drag-container",style:{backgroundColor:E.a.gray3},children:[A&&Object(a.jsx)(v.a,{url:U.localLink||(null===t||void 0===t?void 0:t.intro_video),width:"100%",height:"100%",controls:!0}),(null===t||void 0===t?void 0:t.intro_video)&&Object(a.jsx)("i",{onClick:function(){var e,t;null===(e=i)||void 0===e||null===(t=e.cancel)||void 0===t||t.call(e,"Upload cancelled"),p("intro_video",null),p("intro_video_status",null),I((function(e){return e.filter((function(e){return e.id!==U.trainerId}))}))},style:{position:"absolute",top:10,right:10,cursor:"pointer"},className:"fas fa-times-circle fa-2x"})]}):Object(a.jsx)(w.a,{accept:".mp4,.wmv,.flv,.mov,.avi",maxFiles:1,maxSize:5e9,onDropRejected:function(e){q(e[0].errors[0].message||"")},onDropAccepted:function(e){var t,n,i=e[0];!function(e){var t=e[0],n=null===t||void 0===t?void 0:t.name.split("."),i="video."+n[n.length-1];y({method:"get",loading:!0,api:"/api/v1/upload/trainer?file_name=".concat(i).concat("update"===s?"&trainer_id=".concat(O.id):"")},(function(e){var n,i=e.status,a=e.data;i===j.c&&(V((function(e){return Object(r.a)(Object(r.a)({},e),{},{trainerId:a.trainer_id,link:a.link})})),W(a.link,t,a.trainer_id),Z(a.trainer_id),null===X||void 0===X||null===(n=X.current)||void 0===n||n.setFieldValue("intro_video","https://d3rp9m7rwb80du.cloudfront.net/videos/trainer/".concat(a.trainer_id,"/video/video_hls/video.m3u8")))}))}(e),p("title",(null===i||void 0===i||null===(t=i.name)||void 0===t?void 0:t.substr(0,null===i||void 0===i||null===(n=i.name)||void 0===n?void 0:n.lastIndexOf(".")))||""),setTimeout((function(){C("title")})),p("intro_video_status","Uploading"),q(""),V((function(e){return Object(r.a)(Object(r.a)({},e),{},{localLink:URL.createObjectURL(i)})}))},children:function(e){var t=e.getRootProps,n=e.getInputProps;return Object(a.jsxs)("div",Object(r.a)(Object(r.a)({className:"admin-drag-container",style:{cursor:"pointer"}},t()),{},{children:[Object(a.jsx)("input",Object(r.a)({},n())),Object(a.jsx)("img",{src:"data:image/png;base64,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",style:{width:32,height:32,margin:"50px 0 12px",opacity:.5}}),Object(a.jsx)("div",{style:{fontWeight:"bold",color:"black",opacity:.5},children:"Upload Intro Video"}),H&&Object(a.jsxs)("div",{className:"admin-file-error-container",children:[Object(a.jsx)("i",{style:{color:E.a.error},className:"fas fa-exclamation-triangle"}),Object(a.jsx)("div",{className:"admin-file-error-msg-text",children:H})]})]}))}}),Object(a.jsxs)("div",{className:"d-flex justify-content-center",style:{position:"relative",height:20,width:300},children:[!!se&&Object(a.jsx)("div",{style:{position:"absolute",top:15,borderRadius:100,overflow:"hidden",width:"100%"},children:Object(a.jsx)(D.a,{completed:null===se||void 0===se?void 0:se.progress,height:"15px",baseBgColor:E.a.palette.lightBlue,bgColor:E.a.blue,transitionDuration:"0.5s",transitionTimingFunction:"linear"})}),"Processing"===(null===t||void 0===t?void 0:t.intro_video_status)&&Object(a.jsx)("div",{style:{position:"absolute",top:-20},children:Object(a.jsx)(P.a,{type:"bubbles",color:"var(--primary)",width:80})}),"Posted"===(null===t||void 0===t?void 0:t.intro_video_status)&&U.localLink&&Object(a.jsx)("div",{style:{position:"absolute",top:6,fontSize:15},children:Object(a.jsx)("div",{children:"Video is processed"})})]})]})]}),Object(a.jsx)(f.a,{label:"First Name (*)",children:Object(a.jsxs)(o.r,{className:"m-0",children:[Object(a.jsx)(o.u,{type:"text",placeholder:n("first-name"),invalid:""!==t.first_name.trim()&&c.first_name&&!!l.first_name,autoComplete:"first_name",maxLength:50,value:Object(h.c)(t.first_name),onBlur:u,onChange:function(e){b.c.validate.valueTypingExpressionsName(e)&&m(e)},name:"first_name"}),Object(a.jsx)(o.A,{children:n(l.first_name||"")})]})}),Object(a.jsx)(f.a,{label:"Last Name (*)",children:Object(a.jsxs)(o.r,{className:"m-0",children:[Object(a.jsx)(o.u,{type:"text",placeholder:n("last-name"),invalid:""!==t.last_name.trim()&&c.last_name&&!!l.last_name,autoComplete:"last_name",maxLength:50,value:Object(h.c)(t.last_name),onBlur:u,onChange:function(e){b.c.validate.valueTypingExpressionsName(e)&&m(e)},name:"last_name"}),Object(a.jsx)(o.A,{children:n(l.last_name||"")})]})}),Object(a.jsx)(f.a,{label:"Description",children:Object(a.jsx)(o.r,{className:"m-0",children:Object(a.jsx)(o.Q,{type:"text",placeholder:"Description",maxLength:1e3,value:t.description,onBlur:u,onChange:m,name:"description",rows:5})})}),Object(a.jsx)(o.r,{className:"mb-0",children:Object(a.jsx)(o.L,{children:Object(a.jsxs)(o.j,{xs:"12",style:{textAlign:"right"},children:[Object(a.jsx)(o.d,{color:"secondary",className:"px-4 mr-4",onClick:re,children:n("cancel")}),Object(a.jsx)(o.d,{color:"primary",className:"px-4",type:"submit",disabled:!M||!F||!d&&M===O.avatar,children:"create"===s?"Create":"Save"})]})})})]})}})})})})})})]})]})},T=n(611),S=n(607),M=function(e){var t=e.show,n=e.handleClose,i=e.callApi,s=e.id,d=e.trainerName,u=Object(c.useState)({data:[],loading:!0,full:!1,page:0,total:0}),A=Object(l.a)(u,2),h=A[0],b=A[1],F=function(e){i({method:"get",api:"/api/v1/admin/trainers/".concat(s,"/followers?page_size=").concat(12,"&page=").concat(e)},(function(t){var n=t.data;t.status===j.c&&b((function(t){return{data:2===e?n.followers:[].concat(Object(m.a)(t.data),Object(m.a)(n.followers)),full:n.followers.length<12,loading:!1,page:e,total:n.total}}))}))};return Object(c.useEffect)((function(){t&&(b(Object(r.a)(Object(r.a)({},h),{},{data:[],loading:!0})),F(1))}),[t]),Object(a.jsxs)(o.D,{size:"lg",centered:!0,show:t,onClose:n,closeOnBackdrop:!1,children:[Object(a.jsxs)(o.G,{closeButton:!0,children:["Followers Of ",d]}),Object(a.jsx)(o.E,{children:Object(a.jsxs)("div",{style:{overflowY:"auto",maxHeight:"80vh",overflowX:"hidden"},children:[!h.loading&&0===h.data.length&&Object(a.jsx)("div",{className:"hb-no-items",children:"Keine artikel"}),h.data.length>0&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"hb-card-header px-3",style:{marginBottom:24,fontSize:17},children:[h.total," Follower",h.total>1?"s":""]}),Object(a.jsx)("div",{className:"row",children:h.data.map((function(e){return Object(a.jsxs)("div",{className:"col-md-6 d-flex align-items-center pb-4",children:[Object(a.jsx)("div",{className:"px-3",children:Object(a.jsx)("img",{src:e.avatar||x.a,style:{width:60,height:60,borderRadius:"50%"}})}),Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{style:{fontSize:16},children:e.first_name+" "+e.last_name}),Object(a.jsx)("div",{children:e.email})]})]},e.id)}))})]}),h.loading&&Object(a.jsx)(g.f,{size:"lg",render:x.e}),Object(a.jsx)(S.a,{onEnter:function(){h.loading||h.full||(b(Object(r.a)(Object(r.a)({},h),{},{loading:!0})),F(h.page+1))}}),Object(a.jsx)("div",{style:{height:20}})]})})]})},R=n(102),Q=n.n(R),z=[{key:"no",_style:{width:"4%"}},{key:"avatar",_classes:"th-pl-30",_style:{width:"8%"}},{key:"first_name",_style:{width:"10%"}},{key:"last_name",_style:{width:"10%"}},{key:"intro_video_status",_style:{width:"10%"}},{key:"description",_style:{width:"16%"}},{key:"created_date",_style:{width:"8%"}},{key:"views",_style:{width:"4%"}},{key:"video_number",label:"Videos",_style:{width:"4%"}},{key:"follow_number",label:"Followers",_style:{width:"4%"}},{key:"action",_style:{width:"6%"}}],U={id:"",avatar:"",first_name:"",last_name:"",description:""};t.default=function(e){var t,n=Object(d.a)().t,i=Object(F.b)(),m=function(e,t){return i(Object(j.d)(e,t))},u=Object(s.h)(),A=new URLSearchParams(null===(t=e.location)||void 0===t?void 0:t.search),h=Math.max(Number(A.get("page"))||1,1),p=JSON.parse(x.g.get("videosUploading"))||[],f=Object(c.useState)({data:[],total:0,totalPages:0,loading:!0}),O=Object(l.a)(f,2),v=O[0],C=O[1],B=Object(c.useState)({show:!1,initialValues:U,type:"create"}),y=Object(l.a)(B,2),w=y[0],k=y[1],G=Object(c.useState)({show:!1,id:"",name:""}),L=Object(l.a)(G,2),N=L[0],_=L[1],S=Object(c.useState)({show:!1,id:"",trainerName:""}),R=Object(l.a)(S,2),V=R[0],K=R[1],Y=Object(c.useState)([]),H=Object(l.a)(Y,2),q=H[0],J=H[1],X=Object(c.useState)(""),W=Object(l.a)(X,2),Z=W[0],$=W[1];Object(c.useEffect)((function(){return(w.show||0!==q.length)&&(window.onbeforeunload=function(){return!0}),function(){window.onbeforeunload=null}}),[q,w.show]);Object(c.useEffect)((function(){te(h,Z)}),[]);var ee=Object(a.jsx)("div",{});v.loading||v.total||(ee=Object(a.jsx)("div",{children:n("no-items-found")}));var te=function(e,t){C(Object(r.a)(Object(r.a)({},v),{},{loading:!0})),m({method:"get",api:b.c.rest.adminGetMobilityTrainers(e,t)},(function(t){var n=t.status,i=t.data;n===j.c?(C({data:i.trainers.map((function(t,n){return Object(r.a)(Object(r.a)({},t),{},{no:n+1+10*(e-1)})})),total:i.total,totalPages:Math.ceil(i.total/10),loading:!1}),h!==e&&u.push("?page=".concat(e))):C((function(e){return Object(r.a)(Object(r.a)({},e),{},{loading:!1})}))}))};return Object(a.jsxs)("div",{style:{width:"90%",margin:"10px auto"},children:[q.length>0&&Object(a.jsx)(s.a,{when:!0,message:"Changes you made may not be saved."}),Object(a.jsx)(I,{trainers:v.data,uploadingVideos:q,setUploadingVideos:J,type:w.type,callApi:m,initialValues:w.initialValues,show:w.show,handleClose:function(){return k(Object(r.a)(Object(r.a)({},w),{},{show:!1}))},searchTrainers:function(){return te(h,Z)}}),Object(a.jsx)(M,Object(r.a)(Object(r.a)({},V),{},{callApi:m,handleClose:function(){return K(Object(r.a)(Object(r.a)({},V),{},{show:!1}))}})),Object(a.jsx)(g.b,{isVisible:N.show,title:"Delete Trainer",content:'Are you sure to delete the trainer "'.concat(N.name,'"?'),leftButtonText:"Cancel",rightButtonText:"Delete",leftButtonOnPress:function(){return _({show:!1,id:"",name:""})},rightButtonOnPress:function(){return e=N.id,_({show:!1,id:"",name:""}),C(Object(r.a)(Object(r.a)({},v),{},{loading:!0})),void m({method:"delete",api:b.c.rest.adminMobilityTrainer(e)},(function(e){e.status===j.c?te(h,Z):C((function(e){return Object(r.a)(Object(r.a)({},e),{},{loading:!1})}))}));var e}}),Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Trainer Management"}),Object(a.jsxs)("div",{className:"d-flex align-items-center mt-4",style:{marginBottom:"2.4rem"},children:[Object(a.jsx)(T.a,{className:"mr-5",searchName:Z,setSearchName:$,searchEmpty:!0,callbackSearch:function(e){return te(1,e)}}),Object(a.jsx)("div",{style:{textAlign:"right",flex:1},children:Object(a.jsx)(o.d,{color:"primary",onClick:function(){return k({show:!0,type:"create",initialValues:U})},children:"Create new trainer"})})]})]}),Object(a.jsx)("div",{style:{minHeight:"65vh"},children:Object(a.jsx)(o.l,{items:v.data,fields:z,loading:v.loading,noItemsViewSlot:ee,hover:!0,striped:!0,scopedSlots:{no:function(e){return Object(a.jsx)("td",{className:"align-middle",children:e.no})},avatar:function(e){return Object(a.jsx)("td",{className:"align-middle",children:Object(a.jsx)("img",{src:e.avatar,style:{width:80,height:80,borderRadius:"50%",margin:"0 auto",objectFit:"cover"}})})},first_name:function(e){return Object(a.jsx)("td",{title:e.first_name.length>90?e.first_name:"",className:"align-middle",children:e.first_name.length>90?e.first_name.substring(0,87)+"...":e.first_name})},last_name:function(e){return Object(a.jsx)("td",{title:e.last_name.length>90?e.last_name:"",className:"align-middle",children:e.last_name.length>90?e.last_name.substring(0,87)+"...":e.last_name})},intro_video_status:function(e){var t=p.findIndex((function(t){return t===e.id}))>-1&&-1===q.findIndex((function(t){return t.id===e.id}))?"Upload Failed":e.intro_video_status,n=q.findIndex((function(t){return t.id===e.id})),i=null;return n>-1?i=Object(a.jsx)("div",{style:{borderRadius:100,overflow:"hidden"},children:Object(a.jsx)(D.a,{labelColor:"var(--primary)",isLabelVisible:!1,completed:q[n].progress,height:"10px",baseBgColor:E.a.palette.lightBlue,bgColor:E.a.blue,transitionDuration:"0.5s",transitionTimingFunction:"linear"})}):"Processing"===e.status&&(i=Object(a.jsx)("div",{className:"d-flex",style:{height:20,marginLeft:10},children:Object(a.jsx)(P.a,{type:"bubbles",color:"var(--primary)",width:40})})),Object(a.jsxs)("td",{className:"align-middle",children:[t,i]})},description:function(e){return Object(a.jsx)("td",{title:e.description.length>90?e.description:"",className:"align-middle",children:e.description.length>90?e.description.substring(0,87)+"...":e.description})},created_date:function(e){return Object(a.jsx)("td",{className:"align-middle",children:e.created_date?Q()(1e3*e.created_date).format("DD/MM/YYYY"):"-"})},views:function(e){return Object(a.jsx)("td",{className:"align-middle",children:e.views})},video_number:function(e){var t=e.video_number>0?Object(a.jsx)("div",{className:"link",onClick:function(){return u.push("/admin/mobility/trainers/".concat(e.id))},children:e.video_number}):Object(a.jsx)("div",{children:e.video_number});return Object(a.jsx)("td",{className:"align-middle",children:t})},follow_number:function(e){var t=e.follow_number>0?Object(a.jsx)("div",{className:"link",onClick:function(){return K(Object(r.a)(Object(r.a)({},V),{},{show:!0,id:e.id,trainerName:e.first_name+" "+e.last_name}))},children:e.follow_number}):Object(a.jsx)("div",{children:e.follow_number});return Object(a.jsx)("td",{className:"align-middle",children:t})},action:function(e){return Object(a.jsxs)("td",{className:"align-middle",children:[Object(a.jsx)(o.d,{color:"primary",variant:"outline",shape:"square",size:"sm",style:{marginRight:10},onClick:function(){return k({show:!0,type:"update",initialValues:e})},children:Object(a.jsx)("i",{className:"fas fa-pencil-alt",children:" "})}),Object(a.jsx)(o.d,{color:"primary",variant:"outline",shape:"square",size:"sm",onClick:function(){return _({show:!0,id:e.id,name:e.first_name+" "+e.last_name})},children:Object(a.jsx)("i",{className:"fas fa-trash-alt",children:" "})})]})}}})}),Object(x.h)(v.totalPages,h,(function(e){h!==e&&(u.push("?page=".concat(e)),te(e,Z))}),v.total)]})}},613:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return l}));var i={black:"#1d1d1d",white:"#ffffff",offWhite:"#e6e6e6",orange:"#FBA928",orangeDarker:"#EB9918",lightGrey:"#939AA4",lighterGrey:"#CDD4DA",red:"#ED3833",gray:"#687187",lightBlue:"#C5CEE0",mLightBgDarkPrimaryText:"#DE000000",mLightBgDarkSecondaryText:"#8A000000",mLightBgDarkDisabledText:"#61000000",mLightBgDarkHintText:"#61000000",mDarkBgLightPrimaryText:"#FFFFFFFF",mDarkBgLightSecondaryText:"#B3FFFFFF",mDarkBgLightDisabledText:"#80FFFFFF",mDarkBgLightHintText:"#80FFFFFF",mRed50:"#FFEBEE",mRed100:"#FFCDD2",mRed200:"#EF9A9A",mRed300:"#E57373",mRed400:"#EF5350",mRed500:"#F44336",mRed600:"#E53935",mRed700:"#D32F2F",mRed800:"#C62828",mRed900:"#B71C1C",mRedA100:"#FF8A80",mRedA200:"#FF5252",mRedA400:"#FF1744",mRedA700:"#D50000",mDeepPurple50:"#EDE7F6",mDeepPurple100:"#D1C4E9",mDeepPurple200:"#B39DDB",mDeepPurple300:"#9575CD",mDeepPurple400:"#7E57C2",mDeepPurple500:"#673AB7",mDeepPurple600:"#5E35B1",mDeepPurple700:"#512DA8",mDeepPurple800:"#4527A0",mDeepPurple900:"#311B92",mDeepPurpleA100:"#B388FF",mDeepPurpleA200:"#7C4DFF",mDeepPurpleA400:"#651FFF",mDeepPurpleA700:"#6200EA",mLightBlue50:"#E1F5FE",mLightBlue100:"#B3E5FC",mLightBlue200:"#81D4FA",mLightBlue300:"#4FC3F7",mLightBlue400:"#29B6F6",mLightBlue500:"#03A9F4",mLightBlue600:"#039BE5",mLightBlue700:"#0288D1",mLightBlue800:"#0277BD",mLightBlue900:"#01579B",mLightBlueA100:"#80D8FF",mLightBlueA200:"#40C4FF",mLightBlueA400:"#00B0FF",mLightBlueA700:"#0091EA",mGreen50:"#E8F5E9",mGreen100:"#C8E6C9",mGreen200:"#A5D6A7",mGreen300:"#81C784",mGreen400:"#66BB6A",mGreen500:"#4CAF50",mGreen600:"#43A047",mGreen700:"#388E3C",mGreen800:"#2E7D32",mGreen900:"#1B5E20",mGreenA100:"#B9F6CA",mGreenA200:"#69F0AE",mGreenA400:"#00E676",mGreenA700:"#00C853",mYellow50:"#FFFDE7",mYellow100:"#FFF9C4",mYellow200:"#FFF59D",mYellow300:"#FFF176",mYellow400:"#FFEE58",mYellow500:"#FFEB3B",mYellow600:"#FDD835",mYellow700:"#FBC02D",mYellow800:"#F9A825",mYellow900:"#F57F17",mYellowA100:"#FFFF8D",mYellowA200:"#FFFF00",mYellowA400:"#FFEA00",mYellowA700:"#FFD600",mDeepOrange50:"#FBE9E7",mDeepOrange100:"#FFCCBC",mDeepOrange200:"#FFAB91",mDeepOrange300:"#FF8A65",mDeepOrange400:"#FF7043",mDeepOrange500:"#FF5722",mDeepOrange600:"#F4511E",mDeepOrange700:"#E64A19",mDeepOrange800:"#D84315",mDeepOrange900:"#BF360C",mDeepOrangeA100:"#FF9E80",mDeepOrangeA200:"#FF6E40",mDeepOrangeA400:"#FF3D00",mDeepOrangeA700:"#DD2C00",mBlueGrey50:"#ECEFF1",mBlueGrey100:"#CFD8DC",mBlueGrey200:"#B0BEC5",mBlueGrey300:"#90A4AE",mBlueGrey400:"#78909C",mBlueGrey500:"#607D8B",mBlueGrey600:"#546E7A",mBlueGrey700:"#455A64",mBlueGrey800:"#37474F",mBlueGrey900:"#263238",mPink50:"#FCE4EC",mPink100:"#F8BBD0",mPink200:"#F48FB1",mPink300:"#F06292",mPink400:"#EC407A",mPink500:"#E91E63",mPink600:"#D81B60",mPink700:"#C2185B",mPink800:"#AD1457",mPink900:"#880E4F",mPinkA100:"#FF80AB",mPinkA200:"#FF4081",mPinkA400:"#F50057",mPinkA700:"#C51162",mIndigo50:"#E8EAF6",mIndigo100:"#C5CAE9",mIndigo200:"#9FA8DA",mIndigo300:"#7986CB",mIndigo400:"#5C6BC0",mIndigo500:"#3F51B5",mIndigo600:"#3949AB",mIndigo700:"#303F9F",mIndigo800:"#283593",mIndigo900:"#1A237E",mIndigoA100:"#8C9EFF",mIndigoA200:"#536DFE",mIndigoA400:"#3D5AFE",mIndigoA700:"#304FFE",mCyan50:"#E0F7FA",mCyan100:"#B2EBF2",mCyan200:"#80DEEA",mCyan300:"#4DD0E1",mCyan400:"#26C6DA",mCyan500:"#00BCD4",mCyan600:"#00ACC1",mCyan700:"#0097A7",mCyan800:"#00838F",mCyan900:"#006064",mCyanA100:"#84FFFF",mCyanA200:"#18FFFF",mCyanA400:"#00E5FF",mCyanA700:"#00B8D4",mLightGreen50:"#F1F8E9",mLightGreen100:"#DCEDC8",mLightGreen200:"#C5E1A5",mLightGreen300:"#AED581",mLightGreen400:"#9CCC65",mLightGreen500:"#8BC34A",mLightGreen600:"#7CB342",mLightGreen700:"#689F38",mLightGreen800:"#558B2F",mLightGreen900:"#33691E",mLightGreenA100:"#CCFF90",mLightGreenA200:"#B2FF59",mLightGreenA400:"#76FF03",mLightGreenA700:"#64DD17",mAmber50:"#FFF8E1",mAmber100:"#FFECB3",mAmber200:"#FFE082",mAmber300:"#FFD54F",mAmber400:"#FFCA28",mAmber500:"#FFC107",mAmber600:"#FFB300",mAmber700:"#FFA000",mAmber800:"#FF8F00",mAmber900:"#FF6F00",mAmberA100:"#FFE57F",mAmberA200:"#FFD740",mAmberA400:"#FFC400",mAmberA700:"#FFAB00",mBrown50:"#EFEBE9",mBrown100:"#D7CCC8",mBrown200:"#BCAAA4",mBrown300:"#A1887F",mBrown400:"#8D6E63",mBrown500:"#795548",mBrown600:"#6D4C41",mBrown700:"#5D4037",mBrown800:"#4E342E",mBrown900:"#3E2723",mPurple50:"#F3E5F5",mPurple100:"#E1BEE7",mPurple200:"#CE93D8",mPurple300:"#BA68C8",mPurple400:"#AB47BC",mPurple500:"#9C27B0",mPurple600:"#8E24AA",mPurple700:"#7B1FA2",mPurple800:"#6A1B9A",mPurple900:"#4A148C",mPurpleA100:"#EA80FC",mPurpleA200:"#E040FB",mPurpleA400:"#D500F9",mPurpleA700:"#AA00FF",mBlue50:"#E3F2FD",mBlue100:"#BBDEFB",mBlue200:"#90CAF9",mBlue300:"#64B5F6",mBlue400:"#42A5F5",mBlue500:"#2196F3",mBlue600:"#1E88E5",mBlue700:"#1976D2",mBlue800:"#1565C0",mBlue900:"#0D47A1",mBlueA100:"#82B1FF",mBlueA200:"#448AFF",mBlueA400:"#2979FF",mBlueA700:"#2962FF",mTeal50:"#E0F2F1",mTeal100:"#B2DFDB",mTeal200:"#80CBC4",mTeal300:"#4DB6AC",mTeal400:"#26A69A",mTeal500:"#009688",mTeal600:"#00897B",mTeal700:"#00796B",mTeal800:"#00695C",mTeal900:"#004D40",mTealA100:"#A7FFEB",mTealA200:"#64FFDA",mTealA400:"#1DE9B6",mTealA700:"#00BFA5",mLime50:"#F9FBE7",mLime100:"#F0F4C3",mLime200:"#E6EE9C",mLime300:"#DCE775",mLime400:"#D4E157",mLime500:"#CDDC39",mLime600:"#C0CA33",mLime700:"#AFB42B",mLime800:"#9E9D24",mLime900:"#827717",mLimeA100:"#F4FF81",mLimeA200:"#EEFF41",mLimeA400:"#C6FF00",mLimeA700:"#AEEA00",mOrange50:"#FFF3E0",mOrange100:"#FFE0B2",mOrange200:"#FFCC80",mOrange300:"#FFB74D",mOrange400:"#FFA726",mOrange500:"#FF9800",mOrange600:"#FB8C00",mOrange700:"#F57C00",mOrange800:"#EF6C00",mOrange900:"#E65100",mOrangeA100:"#FFD180",mOrangeA200:"#FFAB40",mOrangeA400:"#FF9100",mOrangeA700:"#FF6D00",mGrey50:"#FAFAFA",mGrey100:"#F5F5F5",mGrey200:"#EEEEEE",mGrey300:"#E0E0E0",mGrey400:"#BDBDBD",mGrey500:"#9E9E9E",mGrey600:"#757575",mGrey700:"#616161",mGrey800:"#424242",mGrey900:"#212121"},a={background:"#ffffff",backgroundGray:"#F1F2F3",transparentBackground:"#00000055",border:"#EDF1F7",primary:"#ed3833",primaryLighter:"#EE4953",secondary:"#f3a805",line:i.offWhite,text:"#22242a",dim:"#cdcdd7",error:"#ef4b5f",success:"#27ae60",shadow:"#2f3542",storybookDarkBg:i.black,storybookTextColor:i.black,white:"#ffffff",gray70:"#222B45",gray650:"#687187",gray60:"#8F9BB3",gray50:"#C5CEE0",gray3:"#cdcdd7",gray4:"#8d92a3",blue:"#3785D9",gray2:"#f1f3f8",gray1:"#F7F9FC",gray5:"#798195",gray6:"#E4E9F2",darkBlue:"#2E3A59",palette:i,transparent:"rgba(0, 0, 0, 0)",link:"#1890ff",scrim:"rgba(0, 0, 0, 0.6)",purple:"#722ed1",pink:"#eb2f96",yellow:"#fadb14",lime:"#a0d911",teal:"#13c2c2",indigo:"#2f54eb"},r={textSize:{h1:32,h2:28,h3:24,h4:20,h5:16,h6:12,large:20,title:18,normal:16,subTitle:14,small:12}},l=[0,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100]},628:function(e,t,n){"use strict";var i=n(4);n(1);t.a=function(e){var t=e.className,n=e.label,a=e.children,r=e.width,l=e.centered,c=e.style;return r=r||110,Object(i.jsxs)("div",{className:"d-flex mb-3 ".concat(l?"align-items-center":""," ").concat(t||""),style:c,children:[Object(i.jsx)("div",{style:{minWidth:r,marginTop:6},children:n}),Object(i.jsx)("div",{style:{width:"calc(100% - ".concat(r,"px)")},children:a})]})}}}]);
//# sourceMappingURL=41.4f0694a6.chunk.js.map