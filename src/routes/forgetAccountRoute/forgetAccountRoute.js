                                  //All Imports
import { Routes, Route } from "react-router-dom";

//User ForgetAccount
import ForgotPassword from "../../pages/userPages/userForgetAccountPage/userForgetAccount";


function forgetAccountRoute() {
  return (
    <>
        <Routes>
          <Route path="/ForgotPassword" element={<ForgotPassword/>}/>   
      </Routes>
      
    </>
  );
}

export default forgetAccountRoute;
