                                  //All Imports
import {  Routes, Route } from "react-router-dom";
import { isAuthenticated } from  "../../services/authService/auth";
import { Navigate } from "react-router-dom";

                                  //User Imports
//User Sigin
import Signin from "../../pages/userPages/userSigninPage/userSignin";
//User Main Pages
import MemberHome from "../../pages/userPages/UserMainPages/userHomePage/userHome";
import MemberCourses from "../../pages/userPages/UserMainPages/userCoursesPage/userCourses";
import MemberCompleteCourses from "../../pages/userPages/UserMainPages/userCompleteCoursesPage/userCompleteCourses";
import MemberSupportCommunity from "../../pages/userPages/UserMainPages/userFeedBackPage/userFeedBack";
import Shop from "../../pages/userPages/UserMainPages/userShopPage/userShop";
import MemberVideo from '../../pages/userPages/UserMainPages/userVideoPage/userVideo';
                                  //Component Imports
import MemberLayout from "../../layouts/userLayout/userLayout";


function userRoutes() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Signin />}/>         
        </Routes>

        <Routes>
            <Route path="/user" element={isAuthenticated() ? <MemberLayout /> : <Navigate to="/" />} >
            <Route path="/user/Shop" element={<Shop/>} />
            <Route path="/user/MemberHome" element={<MemberHome/>} />
            <Route path="/user/MemberCourses" element={<MemberCourses/>} />
            <Route path="/user/MemberCompleteCourses" element={<MemberCompleteCourses/>} />
            <Route path="/user/MemberVideo/:id" element={<MemberVideo/>} />
            <Route path="/user/MemberSupportCommunity" element={<MemberSupportCommunity/>} />
            </Route>
          </Routes>
    </>
  );
}

export default userRoutes;
