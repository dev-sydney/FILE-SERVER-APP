import{r as t,u as o,j as e,L as r,U as c}from"./index-977f2f1c.js";import"./login-signup-style-4ed993c7.js";import{U as d}from"./uil-info-circle-1753c31d.js";const h=()=>{const s=t.useContext(o),[n,l]=t.useState({}),i=a=>{l({...n,[a.target.name]:a.target.value})};return t.useEffect(()=>{s.setNavBarVisibilty(!1)},[]),e.jsx("div",{className:"login-page auth-page",children:e.jsxs("form",{onSubmit:a=>{a.preventDefault(),s.loginUser(n)},style:{display:"flex",flexDirection:"column"},children:[e.jsx("h2",{children:"LOGIN!"}),(s==null?void 0:s.userAlert)&&e.jsxs("div",{className:"component-alert",children:[e.jsx(d,{size:"1.5em",style:{margin:"auto 0.5em"}}),e.jsx("b",{style:{margin:"auto 0"},children:s.userAlert})]}),e.jsxs("div",{className:"input-block",children:[e.jsx("input",{type:"email",name:"emailAddress",onChange:i,required:!0}),e.jsx("span",{className:"placeholder",children:"Email address:"})]}),e.jsxs("div",{className:"input-block",children:[e.jsx("input",{type:"password",name:"password",onChange:i,required:!0,pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,}",title:"Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"}),e.jsx("span",{className:"placeholder",children:"Password:"})]}),e.jsx("div",{style:{textAlign:"right"},children:e.jsx(r,{to:"/forgot-password",style:{marginRight:"0.7em"},children:"Forgot password?"})}),e.jsx("div",{style:{textAlign:"center",marginTop:"1em"},children:e.jsx("button",{className:"submit_btn login-submit auth-submit",children:s!=null&&s.isLoading?e.jsx("span",{children:e.jsx(c,{size:"1.5em",className:"spinner-icon"})}):"Login"})}),e.jsx("div",{style:{marginTop:"1em"},children:e.jsxs("p",{children:["Don't have an account?"," ",e.jsx(r,{to:"/signup",style:{fontWeight:1e3},children:"Sign up"})]})})]})})};export{h as default};
