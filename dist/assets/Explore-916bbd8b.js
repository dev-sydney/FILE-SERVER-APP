import{r as s,u as N,j as e,f as A}from"./index-977f2f1c.js";import{C as F,U as P,F as _,a as b}from"./FilePreviewPane-7c53ff57.js";import{M as w}from"./ModalBackground-aef1eb82.js";import"./getFileIcon-122c4476.js";import"./SkeletonClientItem-23c31545.js";import"./uil-info-circle-1753c31d.js";const U=()=>{const[m,u]=s.useState("title"),[i,o]=s.useState(null),[p,x]=s.useState(""),[f,c]=s.useState(!1),[a,l]=s.useState([]),[j,n]=s.useState(!1),[v,d]=s.useState(!1),[g,h]=s.useState(null),S=s.useContext(N);s.useEffect(()=>{S.setNavBarVisibilty(!0)},[]);const y=t=>{clearTimeout(p);const C=setTimeout(()=>{t.target.value!==""?fetch(`/api/v1/files/search/?fields=title,file_description,file_id,file_type,file_name&searchField=${m}`,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({searchVal:t.target.value})}).then(r=>r.json()).then(r=>o(r.searchResults)):o([])},800);x(C)};return e.jsxs("div",{className:"explore-page",children:[f&&e.jsx(w,{modalChild:e.jsx(F,{setIsModalActive:c,fileNames:a.join(","),setFileNames:l,setIsCheckBoxActive:n})}),e.jsxs("div",{className:"feed_container",children:[e.jsxs("span",{style:{display:"flex",margin:"0 auto",padding:"1em"},children:[e.jsxs("form",{className:"search-form",children:[e.jsx("span",{children:e.jsx(A,{color:"#9A9A9A",size:"1.5em",style:{margin:"auto 0"}})}),e.jsx("input",{type:"text",name:"searchVal",onChange:y})]}),e.jsx("span",{children:e.jsxs("select",{onChange:t=>{u(t.target.value)},children:[e.jsx("option",{children:"Search by"}),e.jsx("option",{value:"title",children:"Title"}),e.jsx("option",{value:"file_description",children:"Description"})]})})]}),e.jsx("span",{style:{minHeight:"2em"},children:a.length>0&&e.jsxs("span",{className:"share_cancel",children:[e.jsxs("button",{onClick:()=>{c(!0)},className:"share_btn",children:[e.jsx(P,{size:"1em",color:"white"}),e.jsx("span",{style:{marginLeft:"0.4em"},children:"Share"})]}),e.jsx("button",{onClick:()=>{l([]),n(!1)},className:"cancel-share-btn",children:e.jsx("span",{children:"Cancel"})})]})}),i&&(i.length>0?i.map(t=>e.jsx(_,{file:t,fileNames:a,isCheckBoxActive:j,setFileNames:l,setIsCheckBoxActive:n,setIsPreviewPaneActive:d,setSelectedPreviewFile:h},t.file_id)):"No results found :(")]}),e.jsx(b,{isPreviewPaneActive:v,setIsPreviewPaneActive:d,file:g,setSelectedPreviewFile:h})]})};export{U as default};
