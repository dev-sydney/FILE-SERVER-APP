import{R as m,P as n,r as o,a as p,u as h,j as e}from"./index-2e30dd7d.js";const c=a=>{const{color:r,size:s,...l}=a;return m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:r,...l},m.createElement("path",{d:"M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4H9V7a3,3,0,0,1,5.12-2.13,3.08,3.08,0,0,1,.78,1.38,1,1,0,1,0,1.94-.5,5.09,5.09,0,0,0-1.31-2.29A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9Zm1,10a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"}))};c.propTypes={color:n.string,size:n.oneOfType([n.string,n.number])};c.defaultProps={color:"currentColor",size:"24"};const g=c,f=()=>{const a=o.useContext(p),r=o.useContext(h),[s,l]=o.useState("");o.useEffect(()=>{r.setNavBarVisibilty(!1)},[]);const u=i=>{l(i.target.value)},d=i=>{i.preventDefault(),fetch("/api/v1/users/forgot-password",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({email_address:s})}).then(t=>t.json()).then(t=>{if(t.status==="success")a.setAlert(t.message,"Well done!");else throw new Error(t.message)}).catch(t=>a.setAlert(t.message,"Uh oh, something went wrong!"))};return e.jsx("div",{className:"auth-page",children:e.jsxs("form",{className:"auth__form",onSubmit:d,children:[e.jsx("div",{style:{textAlign:"center"},children:e.jsx(g,{color:"#121927",size:"2em"})}),e.jsx("h2",{style:{margin:"0.7em 0"},children:"Trouble logging in?"}),e.jsx("p",{style:{margin:"0.7em 0"},children:"Enter your email and we'll send you a link to get back into your account."}),e.jsxs("div",{className:"input-block",children:[e.jsx("input",{className:"form__input",type:"email",required:!0,name:"emailAddress",value:s,onChange:u}),e.jsx("span",{className:"placeholder",children:"Email:"})]}),e.jsx("input",{className:"auth-submit submit_btn",type:"submit",value:"DONE"})]})})};export{f as default};