import React from 'react'
import { NavLink } from 'react-router-dom'

const ForgotPassword = () => {
  return (
   <>
     <div className='container-fluid forgot_page'>
     <div className='row'>
        <div className='col-md-6 ms-0'>
          <div className='company_name' id='set_marginAccuChek'>
            <h3 className='brand_name'>ACCU-CHEK <span>®</span> </h3>
          </div>
        </div>
        <div className='col-md-6 mt-5 d-flex justify-content-end'>
          <img  src='/Group 20.svg' alt=''/>
        </div>
    </div>
    <div className='row justify-content-center'>
        <div className='col-md-6 forgoot_root'>
        <h6 className='text-center forgoot_root_h6 '>ACCU-CHEK ACADEMY</h6>
           <div >
                <h6 className='text-center forgot_box '>Forgot Password</h6>
                <p className='text-center fotgot_instruction'>Enter the email address you used when you joined and we’ll send you instructions to reset your password.
                <br></br>
                <br></br>
                 For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.</p>
                <div className='row for_got_email_input'>
                    <label for="exampleInputEmail1" className="d-flex  mb-1 sigin_Lables">Email</label>
                    <input className='p-2 form-control inputs_background sigin_Fields' type='text' placeholder='Input your email in here'/>
                </div>
                <div className='d-flex justify-content-center ' >
                <button className=" sign_btn btn reset p-2 mt-3 text-white">Reset</button>
                </div>
                <NavLink to="/">
                <div className='d-flex justify-content-center ' >
                <button className=" sign_btn btn reset p-2 mt-3 text-white">Home</button>
                </div>
                </NavLink>
           </div>
        </div>
    </div>
     </div>
   </>
  )
}

export default ForgotPassword