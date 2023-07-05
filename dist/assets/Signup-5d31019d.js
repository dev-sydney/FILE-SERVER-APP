import{r as t,u as l,j as e,U as c,L as d}from"./index-977f2f1c.js";import"./login-signup-style-4ed993c7.js";const u=()=>{const s=t.useContext(l),[r,i]=t.useState({});t.useEffect(()=>{s.setNavBarVisibilty(!1)},[]);const a=n=>{i({...r,[n.target.name]:n.target.value})};return e.jsxs("div",{className:"signup-page auth-page",children:[s==null?void 0:s.signUpSuccessMessage,e.jsxs("form",{onSubmit:n=>{n.preventDefault(),s.registerUser(r)},children:[e.jsx("h2",{children:"SIGN UP"}),e.jsxs("div",{className:"input-block",children:[e.jsx("input",{required:!0,type:"text",name:"email_address",onChange:a}),e.jsx("span",{className:"placeholder",children:"Email address:"})]}),e.jsxs("div",{className:"input-block",children:[e.jsx("input",{required:!0,type:"text",name:"user_name",onChange:a}),e.jsx("span",{className:"placeholder",children:"Business name:"})]}),e.jsxs("div",{className:"input-block",children:[e.jsx("input",{required:!0,type:"password",name:"user_password",onChange:a,pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,}",title:"Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"}),e.jsx("span",{className:"placeholder",children:"Password:"})]}),e.jsxs("div",{className:"input-block",children:[e.jsx("input",{required:!0,type:"password",name:"password_confirm",onChange:a,pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,}",title:"Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"}),e.jsx("span",{className:"placeholder",children:"Confirm password:"})]}),e.jsx("div",{style:{textAlign:"center",marginTop:"1em"},children:e.jsx("button",{className:"submit_btn signup-submit",children:s!=null&&s.isLoading?e.jsx("span",{children:e.jsx(c,{size:"1.5em",className:"spinner-icon"})}):"Register"})}),e.jsx("div",{style:{marginTop:"1em"},children:e.jsxs("p",{children:["Already have an account?"," ",e.jsx(d,{to:"/login",style:{fontWeight:900},children:"Sign in"})]})})]})]})};export{u as default};
