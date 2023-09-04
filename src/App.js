import GetProducrs from "./Admin/products/GetProducrs";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Admin related imports
import Layout from "./components/Layout";
import AddUser from "./Admin/members/AddUser1";
import AddProduct from "./Admin/products/AddProduct";
import AddCource from "./Admin/cources/AddCource";
import GetCources from "./Admin/cources/GetCources";
import GetMembers from "./Admin/members/GetMembers";


// Update routes
import UpdateProduct from "./Admin/products/UpdateProduct";
import UpdateMember from "./Admin/members/UpdateMember";
// wnd update routes

// User FroentEnd Pages
import CreateAccont from './pages/CreateAccount'
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import MemberLayout from "./components/MemberLayout";
import TopHeader from "./components/TopHeader";
// import 
import Shop from "./Member/Shop";
import MemberHome from "./Member/MemberHome";
import MemberCourses from "./Member/MemberCourses";
import MemberCompleteCourses from "./Member/MemberCompleteCourses";
import MemberSupportCommunity from "./Member/MemberSupportCommunity";
import SigninAdmin from "./pages/SigninAdmin";
// 
import { isAuthenticated } from "./pages/auth";
import { Navigate } from "react-router-dom";

import MemberVideo from './Member/MemberVideo'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />}/>
          <Route path="/CreateAccont" element={<CreateAccont/>}/>
          <Route path="/ForgotPassword" element={<ForgotPassword/>}/>   
          <Route path="admin" element={<SigninAdmin />} />   
        </Routes>  
            {/* User Hamza */}
         <Routes>
          {/* <Route path="/Admin/Dashboard" element={<Layout />} > */}
          <Route path="/Admin/Dashboard" element={isAuthenticated() ? <Layout /> : <Navigate to="/Admin" />} >
          <Route path="/Admin/Dashboard/AddUser" element={<AddUser />} />
          <Route path="/Admin/Dashboard/GetMembers" element={<GetMembers />} />
          <Route path="/Admin/Dashboard/UpdateMember/:id" element={<UpdateMember />} />
            {/* Products */}
          <Route path="/Admin/Dashboard/AddProduct" element={<AddProduct />} />
          <Route path="/Admin/Dashboard/GetProducrs" element={<GetProducrs />} />
          <Route path="/Admin/Dashboard/UpdateProduct/:id" element={<UpdateProduct />} />
            {/* Cource */}
          <Route path="/Admin/Dashboard/AddCource" element={<AddCource />} />
          <Route path="/Admin/Dashboard/GetCources" element={<GetCources />} />
          
          {/* Accounts */}  
          </Route>
        </Routes>
       
        <Routes>
            {/* <Route path="/user" element={<MemberLayout />}> */}
            <Route path="/user" element={isAuthenticated() ? <MemberLayout /> : <Navigate to="/" />} >
            <Route path="/user/Shop" element={<Shop/>} />
            <Route path="/user/MemberHome" element={<MemberHome/>} />
            <Route path="/user/MemberCourses" element={<MemberCourses/>} />
            <Route path="/user/MemberCompleteCourses" element={<MemberCompleteCourses/>} />
            <Route path="/user/MemberVideo/:id" element={<MemberVideo/>} />
            <Route path="/user/MemberSupportCommunity" element={<MemberSupportCommunity/>} />
            </Route>
          </Routes>
      </BrowserRouter>     






    </>
  );
}

export default App;
