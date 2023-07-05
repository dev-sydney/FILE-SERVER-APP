import{R as d,P as l,r as c,a as v,j as e,U,e as g}from"./index-977f2f1c.js";import{U as b,a as z,g as A}from"./getFileIcon-122c4476.js";import{U as T,M as C}from"./ModalBackground-aef1eb82.js";import{U as M}from"./uil-info-circle-1753c31d.js";const x=r=>{const{color:a,size:s,...t}=r;return d.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:a,...t},d.createElement("path",{d:"M17.71,11.29l-5-5a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-5,5a1,1,0,0,0,1.42,1.42L11,9.41V17a1,1,0,0,0,2,0V9.41l3.29,3.3a1,1,0,0,0,1.42,0A1,1,0,0,0,17.71,11.29Z"}))};x.propTypes={color:l.string,size:l.oneOfType([l.string,l.number])};x.defaultProps={color:"currentColor",size:"24"};const S=x,u=r=>{const{color:a,size:s,...t}=r;return d.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:a,...t},d.createElement("path",{d:"M15,11H13V7a1,1,0,0,0-2,0v5a1,1,0,0,0,1,1h3a1,1,0,0,0,0-2ZM12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"}))};u.propTypes={color:l.string,size:l.oneOfType([l.string,l.number])};u.defaultProps={color:"currentColor",size:"24"};const N=u,j=r=>{const{color:a,size:s,...t}=r;return d.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:a,...t},d.createElement("path",{d:"M12.71,11.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-2,2a1,1,0,0,0,1.42,1.42l.29-.3V17a1,1,0,0,0,2,0V14.41l.29.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.1,0A1.1,1.1,0,0,0,13.06,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3Z"}))};j.propTypes={color:l.string,size:l.oneOfType([l.string,l.number])};j.defaultProps={color:"currentColor",size:"24"};const P=j,y=({user_id:r,isModalActive:a})=>{const s=c.useContext(v),[t,h]=c.useState(null),[p,m]=c.useState(null);c.useEffect(()=>{m(!0),fetch(`/api/v1/files/businesses/${r}`).then(n=>n.json()).then(n=>{if(n.status==="success")h(n.businessFiles),m(!1);else throw new Error(n.message)}).catch(n=>{s.setAlert(n.message,"Error")})},[a]);const o={margin:"auto 0"},i={margin:"auto 0.5em"};return e.jsx("div",{children:p?e.jsx(U,{size:"2.5em",color:"#121927",className:"spinner-icon",style:{margin:"0 auto"}}):(t==null?void 0:t.length)===0?e.jsx("p",{children:"No files uploaded for this user yet"}):e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:e.jsxs("span",{style:{display:"flex"},children:[e.jsx("span",{style:i,children:"File name"}),e.jsx("span",{style:o,children:e.jsx(S,{color:"#121927",size:"1.5em"})})]})}),e.jsx("th",{children:e.jsxs("span",{style:{display:"flex"},children:[e.jsx("span",{style:i,children:"Uploaded on"}),e.jsx("span",{style:o,children:e.jsx(N,{color:"#121927",size:"1.5em"})})]})}),e.jsx("th",{children:e.jsxs("span",{style:{display:"flex"},children:[e.jsx("span",{style:i,children:"Shares"}),e.jsx("span",{style:o,children:e.jsx(b,{color:"#121927",size:"1.5em"})})]})}),e.jsx("th",{children:e.jsxs("span",{style:{display:"flex"},children:[e.jsx("span",{style:i,children:"Downloads"}),e.jsx("span",{style:o,children:e.jsx(z,{color:"#121927",size:"1.5em"})})]})})]})}),e.jsx("tbody",{children:t==null?void 0:t.map((n,f)=>e.jsxs("tr",{children:[e.jsx("td",{children:f+1}),e.jsx("td",{children:e.jsxs("span",{className:"file-name-icon",children:[A(n),e.jsx("p",{style:{margin:"auto 0.5em"},children:n.title})]})}),e.jsx("td",{style:{textAlign:"left"},children:new Date(n.created_at).toDateString()}),e.jsx("td",{children:n.times_shared}),e.jsx("td",{children:n.no_downloads?n.no_downloads:"none"})]},f))})]})})};y.propTypes={user_id:l.string,isModalActive:l.bool};const w=({setIsModalActive:r})=>{const{user_id:a}=g();let s=c.useRef(new FormData);const[t,h]=c.useState(null),p=o=>{o.target.name==="file"?s.current.set(o.target.name,o.target.files[0]):s.current.set(o.target.name,o.target.value)},m=o=>{o.preventDefault(),s.current.set("user_id",a),fetch("/api/v1/files/",{method:"POST",body:s.current}).then(i=>i.json()).then(i=>{if(i.status==="success")h(i.message),setTimeout(()=>{r(!1)},1e3);else throw new Error(i.message)}).catch(i=>{h(i.message)})};return e.jsxs("div",{className:"upload-file-modal",children:[e.jsx("div",{style:{textAlign:"right"},children:e.jsx(T,{size:"2em",className:"close-modal-btn",onClick:()=>{r(!1)}})}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:t&&e.jsxs("div",{className:"component-alert",children:[e.jsx(M,{size:"1.5em",style:{margin:"auto 0.5em"}}),e.jsx("b",{style:{margin:"auto 0"},children:t})]})}),e.jsxs("span",{children:[e.jsx("h2",{style:{color:"#121927"},children:"Upload a new file!"}),e.jsx("p",{style:{margin:"0.5em 0"},children:"Please enter the fill out the form below to get started."})]}),e.jsxs("form",{encType:"multipart/form-data",onSubmit:m,children:[e.jsxs("div",{className:"input-block",children:[e.jsx("input",{type:"text",name:"title",onChange:p,required:!0}),e.jsx("span",{className:"placeholder",children:"Title of file:"})]}),e.jsx("div",{className:"input-block",children:e.jsx("textarea",{name:"file_description",id:"",cols:"30",rows:"10",placeholder:"A short description of the file",onChange:p,required:!0})}),e.jsxs("div",{className:"input-block",children:[e.jsx("input",{type:"file",name:"file",id:"",onChange:p,className:"file-input",accept:"image/*,video/*,audio/*,.pdf"}),e.jsx("span",{className:"placeholder",children:"File:"})]}),e.jsx("input",{type:"submit",value:"UPLOAD",className:"submit_btn"})]})]})};w.propTypes={setIsModalActive:l.func};const F=()=>{const{user_id:r}=g(),[a,s]=c.useState(!1),t={fontSize:".8em",padding:"0.5em 1em",borderRadius:"5px",textTransform:"uppercase",textDecoration:"none",display:"flex",cursor:"pointer",background:"#121927",color:"white",outline:"none",border:"none"};return e.jsxs("div",{className:"users-files-page",children:[a&&e.jsx(C,{modalChild:e.jsx(w,{setIsModalActive:s})}),e.jsx("h2",{style:{textAlign:"left"},children:"User files"}),e.jsx("span",{style:{display:"flex",justifyContent:"flex-end",margin:"1em 0.5em"},children:e.jsxs("button",{style:t,onClick:()=>{s(!a)},children:[e.jsx("span",{style:{margin:"auto 0"},children:"Upload"}),e.jsx("span",{children:e.jsx(P,{size:"1.5em"})})]})}),r&&e.jsx(y,{user_id:r,isModalActive:a})]})};export{F as default};
