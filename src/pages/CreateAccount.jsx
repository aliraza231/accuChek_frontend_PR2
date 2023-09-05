import React from 'react'
import { useState,useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from "joi-browser";
import Swal from "sweetalert2";
import {API_User_Rregistration} from "../Configuration/Constant"
const CreateAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setSelectedCountry] = useState("usa");
  const [language, setSelectedLanguage] = useState("English");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfrim_password] = useState("");
  let [image, setImage] = useState(null);

  // joi implementation
  const [errors, setErrors] = useState({});
  const schema = {
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(30).required(),
    country: Joi.string().min(3).max(20).required(),
    language: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
    confirm_password: Joi.string().min(3).max(20).required(),
  };

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateProperty(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  // joi end
  // otp
  const [otp, setOTP] = useState("");

  const requestOTPData = {
    email,
  };

  

  // otpend
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);


  const savebtnhandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !country || !language || !password || !confirm_password || !image) {
      Swal.fire({
        icon: 'error',
        title: 'Please fill out all required fields',
      });
      return;
    }

    if (password !== confirm_password) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
      });
      return;
    }


    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("language", language);
    formData.append("password", password);
    formData.append("confirm_password", confirm_password);
    formData.append("image", image);

    try {

      //  let otp = await axios.post("http://localhost:5000/User/userRegister", formData);
      console.log("IN If Condointment")
      // send a POST request to the server to add the product
      // let response = await axios.post("http://localhost:5000/User/userRegister", formData);
        let response = await axios.post(API_User_Rregistration, formData);
      console.log(response.data); 
  
       if(response.status=== 201){
        Swal.fire("success!", "Register  Sucessfuly!", "success");
        setAddedSuccessfully(true);
        // resetFormData();
      
      navigate('/')
      // window.alert("Successfull")
    }else if(response.status=== 500 ){
      Swal.fire({
        position:"center",
        icon: "Internal Server Error",
        title: "Oops...",
        text: "Register Failed",
      });
    }
    else{
      Swal.fire({
        position:"center",
        icon: "error",
        title: "Oops...",
        text: "Register Failed",
      });
    } 

    } catch (error) {
      console.log(error);
    }
    
  };
  let handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
                        <input onBlur={handleBlur} onChange={(e) => setName(e.target.value)} name='name' type="string" className="form-control inputs_background" id="user_name" placeholder='Input your name in here' />
                        {errors.name && (
                      <div className="alert alert-danger  ">{errors.name}</div>
                    )}
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="d-flex ms-3 mb-1">Email</label>
                        <input onBlur={handleBlur} onChange={(e) => setEmail(e.target.value)} name='email' type="email" className="form-control inputs_background" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Input your email in here'/>
                        {errors.email && (
                      <div className="alert alert-danger  ">{errors.email}</div>
                    )}
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
                         <label  for="exampleInputPassword1" className="d-flex ms-3 form-label">Password</label>
                         <input onBlur={handleBlur} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="form-control inputs_background" id="exampleInputPassword1" placeholder='Input your password in here'/>
                         {errors.password && (
                      <div className="alert alert-danger  ">{errors.password}</div>
                    )}
                    </div>       
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="d-flex ms-3 form-label">Confirm Password</label>
                        <input onBlur={handleBlur} onChange={(e) => setconfrim_password(e.target.value)} name='confirm_password' type="password" className="form-control inputs_background" id="exampleInputPassword1" placeholder='Input your confirm password in here'/>
                        {errors.confirm_password && (
                      <div className="alert alert-danger  ">{errors.confirm_password}</div>
                    )}
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="d-flex ms-3 form-label">Image</label>
                        <input
                        // onChange={(e) => setImage(e.target.value)}
                        // onBlur={handleBlur}
                        onChange={handleImageChange}
                        name="image"
                        type="file"
                        className="form-control inputs_background"
                        id="exampleInputPassword1"
                      />
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

                       {/* otp */}
                       {/* <div className="mb-3">
                        <label for="otp" className="d-flex ms-3 form-label">OTP</label>
                        <input onChange={(e) => setOTP(e.target.value)} name="otp" type="text" className="form-control inputs_background" id="otp" placeholder='Enter OTP received in email'/>
                      </div> */}
                       {/*  */}
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