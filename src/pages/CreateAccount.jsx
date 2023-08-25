import React from 'react'
import { useState,useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
const CreateAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setSelectedCountry] = useState("usa");
  const [langguage, setSelectedLanguage] = useState("English");
  const [confrim_password, setconfrim_password] = useState("");
  const savebtnhandler = async (e) => {
    e.preventDefault();
    console.log(name, email, password, country, langguage, confrim_password);
    let result = await fetch("http://128.199.221.11:5000/User/userRegister", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        country,
        langguage,
        confrim_password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (
      !name ||
      !email ||
      !password ||
      !country ||
      !langguage ||
      !confrim_password
    ) {
      console.log("Register Sucessfully");
      Swal.fire({
        position:"top-end",
        icon: "error",
        title: "Oops...",
        text: "Please enter your all required fields",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    } else {
      Swal.fire("Good job!", "Register Sucessfully!", "success");
      navigate("/");
    }
    result = await result.json();

    console.log("RESULT after Fecth", result);
  };
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
        <div className='col-md-6 left__sec_CreateAccount' >
            <div className='row left_padding'>
               <div className='logo'>
                    <img src='/Roche_figma.svg' width={'120px'} alt='Roche'/>
               </div>
               <div className='row'>
                    <h3 className='d-flex mb-2 create_Account_heading'>Create your Account</h3>
               </div>
               <div className='row'>
                <div className='form_body'>
                <form>
                    <div className="mb-3">
                        <label for="name" className="d-flex ms-3 mb-1">Name</label>
                        <input onChange={(e) => setName(e.target.value)} name='name' type="string" className="form-control inputs_background" id="user_name" placeholder='Input your name in here' />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="d-flex ms-3 mb-1">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} name='email' type="email" className="form-control inputs_background" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Input your email in here'/>
                    </div>
                    <div className='row'>
                         <div className='row'>
                             <div className='col-md-6'>
                                 <div className="dropdown">
                                    <select className="form-select inputs_background" aria-label="Default select example">
                                            <option selected>Select your country</option>
                                            <option value="1">USA</option>
                                            <option value="2">Canada</option>
                                            <option value="3">United Kindom</option>
                                     </select>
                                 </div>
                             </div>
                             <div className='col-md-6'>
                                 <div className="dropdown">
                                     <select className="form-select inputs_background">
                                            <option selected>Select your language</option>
                                            <option value="1">English</option>
                                            <option value="2">Spanish</option>
                                            <option value="3">Germen</option>
                                      </select>
                                </div>
                                </div>
                             </div>
                         </div>
                           <br/>
                      <div className="mb-3">
                         <label for="exampleInputPassword1" className="d-flex ms-3 form-label">Password</label>
                         <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="form-control inputs_background" id="exampleInputPassword1" placeholder='Input your password in here'/>
                    </div>       
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="d-flex ms-3 form-label">Confirm Password</label>
                        <input onChange={(e) => setconfrim_password(e.target.value)} name='confrim_password' type="password" className="form-control inputs_background" id="exampleInputPassword1" placeholder='Input your confirm password in here'/>
                    </div>
                   
                       <div className="mb-3 form-check ms-2">
                          <input type="checkbox" className="form-check-input me-3" id="exampleCheck1"/>
                          <label className="form-check-label d-flex terms_condition" for="exampleCheck1">I have read and agree to the Terms of Service</label>
                      </div>
                     
                       <br/>
                       <div className=''>
                         <button  onClick={savebtnhandler}
                        type="submit"
                        value="Submit" className='btn sign-btn_1 sign_btn  '>Sign up</button>
                       </div>
                       <div className='text-center mt-1'>
                         <p className='or'>Or</p>
                       </div>
                       <div className=''>
                         <button className='btn sign-btn_2 sign_btn sigup_color '>Sign up with google</button>
                       </div>
                       <NavLink to="/">
                       <div className='text-center mt-3'>
                         <p className='about_account'>Already have an account! <span className='for_color ms-1'> Sign in</span></p>
                       </div>
                       </NavLink>
                    </form>
                </div>
               </div>
            </div>
        </div>
    </div>
  </div>

  </>
  )
}

export default CreateAccount