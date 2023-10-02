import React, { useState } from 'react';
import axios from 'axios';
import './otpPage.module.css';

const Otp = () => {
  const [otpInput, setOTPInput] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the entered OTP to the backend for verification
      const response = await axios.post('/verify-otp', { otp: otpInput });

      if (response.status === 200 && response.data.isVerified) {
        setIsOTPVerified(true);
        setVerificationError(""); // Clear any previous error messages
      } else {
        setVerificationError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setVerificationError("Failed to verify OTP. Please try again later.");
    }
  };

  return (
    <div className='container-fluid forgot_page'>
      {/* ... (your HTML structure) */}
      <form onSubmit={handleOTPSubmit}>
        <div className='row for_got_email_input'>
          <label htmlFor="otpInput" className="d-flex  mb-1 sigin_Lables">OTP</label>
          <input
            id="otpInput"
            onChange={(e) => setOTPInput(e.target.value)}
            value={otpInput}
            className='p-2 form-control inputs_background sigin_Fields'
            type='text'
            placeholder='Input your OTP here'
          />
        </div>
        <div className='d-flex justify-content-center'>
          <button className="sign_btn btn reset p-2 mt-3 text-white" type="submit">
            Verify Account
          </button>
        </div>
      </form>
      {verificationError && (
        <div className="text-center text-danger mt-3">{verificationError}</div>
      )}
      {isOTPVerified && (
        <div className="text-center text-success mt-3">Account verified successfully.</div>
      )}
    </div>
  );
};

export default Otp;
