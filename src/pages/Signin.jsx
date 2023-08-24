import React from 'react'
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const savebtnhandler = async (e) => {
    e.preventDefault();
    console.log( email, password);
    let result = await fetch("http://128.199.221.11:5000/User/userSigin", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data =result.json();
    if(result.status=== 400 || !data){
      Swal.fire({
            position:"center",
            icon: "error",
            title: "Oops...",
            text: "Invalid Cranditionals",
          });
    }else{
      Swal.fire("Welcome!", "Login Sucessfully!", "success");
      const token = data.token; 
      // Store the token in local storage
      localStorage.setItem('jwtToken', token);
      navigate('/user/MemberHome')
      // window.alert("Successfull")
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
                    <h3 className='fw-bold sigin_virtual_heading text-center'>Your Virtual Trainer</h3>
                </div> 
           </div>
           <div className='row mt-5'>
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
                    <img src='./roche_logo1.png' width={'120px'} alt='Roche'/>
               </div>
               <div className='row'>
                    <p className='Signinto'>Sign in to</p>
                    <h3 className='d-flex mb-2 company_logo_color accuCheck_sigin_Title'>ACCU-CHEK ACADEMY</h3>
               </div>
               <div className='row'>
                <div className='form_body'>
                <form method='POST'>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="d-flex ms-3 mb-1 sigin_Lables">Email address</label>
                        <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} name='email' type="email" className="form-control inputs_background sigin_Fields"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Input your email in here"/>
                    </div>
                   
                      <div className="mb-3">
                         <label for="exampleInputPassword1" className="d-flex ms-3 form-label sigin_Lables">Password</label>
                         <input 
                         value={password}
                         onChange={(e) => setPassword(e.target.value)} name="password" id="password" type="text" className="form-control inputs_background sigin_Fields fa-eye-slash " placeholder="Input your password in here" />
                        <span className='eye_password'> <i className="fa fa-eye" id="togglePassword" onClick={myFun}></i></span>
                    </div>
                    {/* <br/> */}
                    <NavLink to="/ForgotPassword">
                    <div className='mb-2 d-flex justify-content-end'>
                       <a href='/ForgotPassword' className='forGot_Password' >Forgot Password?</a>
                    </div>
                    </NavLink>
                       <div className=''>
                         <button  onClick={savebtnhandler}
                        type="submit"
                        value="Submit" className='btn sign-btn_1 sign_btn '>Sigin</button>
                       </div>
                    </form>
                    <NavLink to="/CreateAccont">
                    <div className='mb-2 d-flex justify-content-end'>
                       <a href='/CreateAccont' className='forGot_Password' >Create Account</a>
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
  