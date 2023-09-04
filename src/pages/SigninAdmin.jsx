import React, { useState } from 'react';
import Joi from "joi-browser";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal  from 'sweetalert2';
import { API_Admin_SignIn } from '../Configuration/Constant';

const ForgotPassword = () => {
const [passwordType, setPasswordType] = useState('password');
const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [errors, setErrors] = useState({});
  const schema = {
    email: Joi.string().email().min(5).max(100).required(),
    password: Joi.string().min(8).max(100).required(),
  };

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  const handleSave = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    setErrors(errorData);
  };
  const savebtnhandler = async (e) => {
    e.preventDefault();
    console.log(email, password);
    
    let result = await fetch("http://localhost:5000/Admin/adminSigin", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await result.json(); 
  
    if (result.status === 400 || !data) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Invalid Cranditionals",
      });
    } else {
      Swal.fire({
        title: "Welcome!",
        text: "Login Successfully!",
        icon: "success",
        showCancelButton: false, // No need for a cancel button
        confirmButtonText: 'OK',
        allowOutsideClick: false, // Disable clicking outside of the dialog
        allowEscapeKey: false, // Disable pressing the Escape key to close the dialog
        preConfirm: () => {
          // Handle any additional actions you want when the "OK" button is clicked
          // For example, you can navigate to the link here using JavaScript if needed
          window.location.href = "/Admin/Dashboard/AddUser";
        },
      });
      const token = data.token; 
  
      // Store the token in local storage
      localStorage.setItem('jwtToken', token);
  
      // Redirect to the protected admin dashboard 
      // navigate('/Admin/Dashboard/AddUser');
      // window.alert("Successful");
    } 
  };
  
    const togglePasswordVisibility = () => {
        setPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
    }

    return (
      
        <div className='container-fluid forgot_page'>
                <div className='row'>
                    <div className='company_name'>
                        <h3 className='brand_name'>ACCU-CHECK <span>®</span> </h3>
                    </div>
                </div>
                <br /><br />
                <div className='row row-md-6 justify-content-center'>
                    <h3 className='text-center'>ACCU-CHEK ACADEMY <span>®</span></h3>
                    <div className='col col-md-6  forgoot_root' id='admin_container_height'>
                        <div className='forgot_box admin_sigin_Page'>
                            <h3 className='text-center text-decoration-underline'>Admin Login</h3>
                            <br/>
                            <div className='row'>
                                <label>Admin Email</label>
                                <input
                                 onBlur={handleSave}   
                                onChange={(e)=>setEmail(e.target.value)} className='p-2' name="email" type='email'  placeholder='Input Your Email Here' style={{ textAlign: "left", textIndent: '03%' }} />
                                {errors.email && (
                        <div className="alert alert-danger">{errors.email}</div>
                        )}   
                            </div>
                            <br></br>
                            <div className='row'>
                                <label>Admin Password</label>
                                  <input 
                                   onBlur={handleSave}   
                                  type={passwordType} name='password' id='password' onChange={(e)=>setPassword(e.target.value)} className='p-2' placeholder='Input Your Password Here' style={{ textAlign: "left", textIndent: '03%', width:"100%" }} />
                                  {errors.password && (
                                  <div className="alert alert-danger">{errors.password}</div>
                                  )}   
                                   <div className='row hide_eye'>
                                   <i className={` d-flex  justify-content-end fa ${passwordType === 'password' ? 'fa-eye' : 'fa-eye-slash'}`} id="togglePassword" onClick={togglePasswordVisibility}></i>
                                   </div>
                            </div>
                            <br/>
                            <div className='d-flex justify-content-center ' >
                                <button className="sign_btn btn reset p-2 mt-3" onClick={savebtnhandler}>Sign in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ForgotPassword;
