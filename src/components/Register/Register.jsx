import React, { useState } from "react";
import "./Register.scss";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Register() {

const navigate = useNavigate();
const [isLoading,setisLoading]=useState(false);

const initialRegisterValues = {
    email:"",
    firstname:"",
    lastname:"",
    password:""
}

const [formValues,setFormValues]=useState(initialRegisterValues);

const handleChange =(e)=>{
   setFormValues({...formValues,[e.target.name]:e.target.value})
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

const handleRegister = async(event)=>{
    //form Validation
    event.preventDefault();

    if((formValues.email.length==0)&&(formValues.firstname.length===0)&&(formValues.lastname.length===0)&&(formValues.password.length===0)){
        toastfunction("Fields cannot be empty")
    }else{
        if(!formValues.email){
            toastfunction("Email cannot be empty")
        }else if (!/\S+@\S+\.\S+/.test(formValues.email)){
            toastfunction("Invalid email format!")
        }else{
            if(!formValues.firstname.trim()){
                toastfunction("First name is required!")
            }else{
                if(!formValues.lastname.trim()){
                    toastfunction("Last name is required!")
                }else{
                    if(!formValues.password.trim()){
                        toastfunction("Password is required!")
                    }else if(formValues.password.trim().length<6){
                        toastfunction("Password must be at least 6 characters")
                    }else{
                        
                        try {
                            setisLoading(true);
                            const regResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`,formValues,{withCredentials:true});
                            if(regResponse.status===201){
                                setisLoading(false);
                                setFormValues(initialRegisterValues);
                                toast.success(`${regResponse.data.message}`, {
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
                        } catch (error) {
                            setisLoading(false);
                            setFormValues(initialRegisterValues);
                            toast.error(`${error.response.data.message}`, {
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
                    }
                }
            }
        }
    }

    
}

  return (
    <div className="register-wrapper">
      <Container className="register-container">
        <Form className="register-form">
          <FormGroup floating>
            <Input
              id="email"
              name="email"
              placeholder="email"
              type="email"
              autoComplete="off"
              value={formValues.email}
              onChange={handleChange}
          
           
            />
            <Label for="email">Email</Label>
          </FormGroup>


          <FormGroup floating>
            <Input
              id="firstname"
              name="firstname"
              placeholder="firstname"
              type="text"
              autoComplete="off"
              value={formValues.firstname}
              onChange={handleChange}
          
            />
            <Label for="firstname">First Name</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="lastname"
              name="lastname"
              placeholder="lastname"
              type="text"
              autoComplete="off"
              value={formValues.lastname}
              onChange={handleChange}
             
            />
            <Label for="lastname">Lastname</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="off"
              value={formValues.password}
              onChange={handleChange}
            />
            <Label for="password">Password</Label>
          </FormGroup>{" "}
          {isLoading ? (
            <Button className="register-button" disabled>
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                size="xl"
                style={{ color: "#121212" }}
              />
            </Button>
          ) : (
            <Button className="register-button" onClick={handleRegister}>
              Register
            </Button>
          )}
          <div className="loginitems">
            <h6>Already registered ?</h6>
            <h6 className="signin" onClick={()=>{navigate("/login")}}>Sign in</h6>
          </div>
          <hr />
          <h6>Or register with</h6>
          <div className="other-signin">
            <Button
              className="google-button"
              onClick={(e) => e.preventDefault()}
            >
              Google
            </Button>
            <Button
              className="github-button"
              onClick={(e) => e.preventDefault()}
            >
              Github
            </Button>
          </div>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Register;
