                                  //All Imports
import {  Routes, Route } from "react-router-dom";

//User Registration
import CreateAccont from '../../pages/userPages/userRegistrationPage/userRegistration';



function registrationRoute() {
  return (
    <>
        <Routes>
          <Route path="/CreateAccont" element={<CreateAccont/>}/>   
        </Routes>  
    </>
  );
}

export default registrationRoute;
