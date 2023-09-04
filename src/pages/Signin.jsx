import React from 'react'
import { useState } from 'react';
import Joi from "joi-browser";
import {Link,NavLink, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Swal from "sweetalert2";
import { API_User_SignIn } from '../Configuration/Constant';
const Signin = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState('password');
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
  
    try {
      let result = await fetch("http://localhost:5000/User/userSigin", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await result.json(); // Await for the Promise to resolve
  
      if (result.status === 400 || !data) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "Invalid Credentials",
        });

        // If database is not connected or response not gernate from server
      } else if(result.status === 500 || !data){
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "Internal Server Error",
        });
      }
      else if(result.status === 404 || !data){
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "Tray again after some time",
        });
      }
      else {
        Swal.fire({
          title: "Welcome!",
          text: "Login Successfully!",
          icon: "success",
          showCancelButton: false, 
          confirmButtonText: 'OK',
          allowOutsideClick: false, 
          allowEscapeKey: false,
          preConfirm: () => {
            window.location.href = "/user/MemberHome";
          },
        });
        // Store the token in local storage
        const token = data.token;
        localStorage.setItem('jwtToken', token);
  
        // Decode the token
        const decodedToken = jwt_decode(token);
  
        console.log(decodedToken); // Check the decoded payload
  
        // Use the decoded token as needed
        const userImage = decodedToken.userImage;
        const userName = decodedToken.userName;
        // const userImage = decodedToken.userImage;
        const userId = decodedToken.userId;
        // const userImage = decodedToken.userImage;
        localStorage.setItem('userName', userName);
        // localStorage.setItem('userId', userId);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userImage', userImage);
        // navigate('/user/MemberHome');
        navigate('/user/MemberHome', {
          state: {
            userName: decodedToken.userName,
            userId: decodedToken.userId,
            userImage: decodedToken.userImage
          }
        });

        console.log('Decoded userImage:', userImage); // Add this line
        localStorage.setItem('userImage', userImage);
        console.log(userImage);
  localStorage.setItem('userName', userName);
  localStorage.setItem('userId', userId);
  localStorage.setItem('userImage',userImage);

  
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const myFun=()=>{
    const toggle = document.querySelector("#togglePassword");
    const password = document.querySelector('#password');
    toggle.addEventListener("click", function(){
      const type = password.getAttribute('type') === "password" ? 'text':'password';
      password.setAttribute("type", type);
      this.classList.toggle('fa-eye-slash');
    });
  }
  const togglePasswordVisibility = () => {
    setPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
}
 
  
  
  return (
       <>
       <div className='container-fluid' >
        <div className='row'>
            <div className='col-md-6 right_half_section signin_page'>
               <div className='row'>
                    <div className='company_name'>
                      <h3 className='brand_name '>ACCU-CHEK <span>®</span> </h3>
                    </div>
               </div>
               <div className='row'>
                    <span className='empty-height'></span>
               </div>
               <div className='row'>
                    <div className='company_title for_center text-center'>
                        <h3 className='sigin_virtual_heading ms-5 '>YOUR VIRTUAL TRAINER</h3>
                    </div> 
               </div>
               <div className='row '>
                      <div className='company_details for_center accucheck_details_siginPage'>
                          <p className='para_graph'>Accu-Chek Academy is your online The Accu-Chek Academy is the online source for training, learning,
                           and answers you might be seeking. Everything in one place. The Accu-Chek Academy provides you and your 
                           healthcare professionals with everything you need for your initial training, and helps you to deepen 
                           your knowledge with easy, intuitive, and entertaining eLearning modules. You can even keep track of your
                            progress and get awards if you are doing well! 
                         </p>
                    </div>
                </div>
            </div>
            {/* Left Half Form Section */}
            <div className='col-md-6 signin_page'> 
                <div className='row left_padding'>
                   <div className='logo'>
                        <img src='Roche_figma.svg' width={'120px'} alt='Roche'/>
                   </div>
                   <div className='row'>
                        <p className='Signinto'>Sign in to</p>
                        <h3 className='d-flex mb-2 company_logo_color accuCheck_sigin_Title'> ACCU-CHEK ACADEMY</h3>
                   </div>
                   <div className='row'>
                    <div className='form_body'>
                    <form method='POST'>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="d-flex ms-3 mb-1 sigin_Lables">Email</label>
                           <input 
                        onBlur={handleSave}  
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} name='email' type="email" className="form-control inputs_background sigin_Fields"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Input your email in here"/>
                         {errors.email && (
                        <div className="alert alert-danger">{errors.email}</div>
                        )}     
                        </div>
                        <div className="mb-3">
                         <label for="exampleInputPassword1" className="d-flex ms-3 form-label sigin_Lables">Password</label>
                         <input 
                        onBlur={handleSave}  
                        name='password'
                         type={passwordType} id='password' 
                         onChange={(e)=>setPassword(e.target.value)}  className="form-control inputs_background sigin_Fields" placeholder='Input Your Password Here' style={{ textAlign: "left", textIndent: '03%', width:"100%" }} />
                         <div  className='row hide_eye me-0 mb-2'>
                             <i className={` d-flex  justify-content-end fa ${passwordType === 'password' ? 'fa-eye' : 'fa-eye-slash'}`} id="togglePassword" onClick={togglePasswordVisibility}></i>
                             {errors.password && (
                        <div className="alert alert-danger">{errors.password}</div>
                        )}
                         </div>
                    </div>
                        <NavLink to="/ForgotPassword">
                        <div className='mb-2 d-flex justify-content-end mb-4'>
                           <a href='/ForgotPassword' className='forGot_Password mb-5 mt-1' >Forgot passwod?</a>
                        </div>
                        </NavLink>
                           <div className=''>
                             <button  onClick={savebtnhandler}
                            type="submit"
                            value="Submit"
                             className='btn sign-btn_1 sign_btn '>Sign in</button>
                           </div>
                           <div className='text-center mt-1'>
                             <p className='or'>Or</p>
                           </div>
                           <div className=''>
                             <button className='btn sign-btn_2 sign_btn sigup_color'>Sign up with google</button>
                           </div>
                        </form>
                        <NavLink to="/CreateAccont ">
                        <div className='text-center mt-5'>
                             <p className='about_account'>Doesn’t have an account? <span className='for_color ms-1'>  Sign up now</span></p>
                           </div>
                        </NavLink>
                    </div>
                   </div>
                </div>
            </div>
        </div> 
      </div>
       </>
      )
}


export default Signin
  