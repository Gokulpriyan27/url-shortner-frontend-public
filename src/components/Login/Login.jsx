import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss"
import axios from "axios"
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label
  } from "reactstrap";

let initialLoginValues = {
  email:"",
  password:"",
}
function Login() {

const navigate = useNavigate();
const [isLoading, setisLoading] = useState(false);
const [loginFormValues,setloginFormValues] = useState(initialLoginValues);

const loginChange = (e)=>{
  setloginFormValues({...loginFormValues,[e.target.name]:e.target.value})
}

const toastfunction = (error)=>{
  toast.error(`${error}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
}

const toastSuccess = (message)=>{
  toast.success(`${message}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}

const loginSubmit = async()=>{
  if((loginFormValues.email.length===0)&&(loginFormValues.password.length===0)){
    toastfunction("All fields are mandatory!")
  }else{
    if(!loginFormValues.email){
      toastfunction("Email cannot be empty")
    }else if(!/\S+@\S+\.\S+/.test(loginFormValues.email)){
      toastfunction("Invalid email format!")
    }else{
      if(!loginFormValues.password.trim()){
        toastfunction("Password is required!")
      }else{
        setisLoading(true)
        try {
          const loginResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,loginFormValues,{withCredentials:true});
          if(loginResponse.status===201){
            setisLoading(false)
            toastSuccess(loginResponse.data.message)
            setloginFormValues(initialLoginValues)
            navigate(`/short-url/${loginResponse.data.data}`) 
          }
        } catch (error) {
          setisLoading(false)
          toastfunction(error.response.data.message)
          setloginFormValues(initialLoginValues)
        }
      }
    }
  }
 
}


  return (
    <div className="login-wrapper">
    <Container className="login-container">
      <Form className="login-form">
        <FormGroup floating>
          <Input
            id="email"
            name="email"
            placeholder="email"
            type="email"
            autoComplete="off"
            value={loginFormValues.email}
            onChange={loginChange}
          />
          <Label for="email">Email</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            autoComplete="off"
            value={loginFormValues.password}
            onChange={loginChange}
          />
          <Label for="password">Password</Label>
        </FormGroup>{" "}
        <Link className="link-tag">Forget Password</Link>

        {
          isLoading ? 
          (<Button className="login-button spinner" disabled>
         <FontAwesomeIcon icon={faSpinner} spin size="xl" style={{color: "#121212"}} />
        </Button>): 
        (<Button className="login-button normal" onClick={loginSubmit}>
          <span>Log in</span>
        </Button>)
        }
      </Form>
      <hr />
      <div className="registeritems">
        <h6>Not registered ?</h6>
        <h6 className="signup" onClick={()=>{navigate("/register")}}>
          Sign up
        </h6>
      </div>
      <div className="instruction-note">
      <p style={{color:"yellow",marginTop:"2vh",textAlign:"justify",fontSize:"15px"}}>Please note : Currently this application is optimized for laptops and larger screens only. Updates will be available soon for other devices</p>
      </div>
    </Container>
    
    <ToastContainer />
  </div>
  )
}

export default Login