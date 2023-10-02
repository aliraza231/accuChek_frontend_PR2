                                  //All Imports
import {  Routes, Route } from "react-router-dom";
import { isAuthenticated } from "../../services/authService/auth";
import { Navigate } from "react-router-dom";

                                  //Admin Imports
//Admin Signin
import SigninAdmin from  "../../pages/adminPages/adminSiginPage/adminSignin";
//Products CRUD
import AddProduct from "../../pages/adminPages/adminCRUDPages/adminProductsCRUD/adminAddProduct/adminAddProduct";
import GetProducts from "../../pages/adminPages/adminCRUDPages/adminProductsCRUD/adminGetProducts/adminGetProducts";
import UpdateProduct from "../../pages/adminPages/adminCRUDPages/adminProductsCRUD/adminUpdateProduct/adminUpdateProduct";
//Courses CRUD
import AddCource from "../../pages/adminPages/adminCRUDPages/adminCoursesCRUD/adminAddCourse/adminAddCourse";
import GetCources from "../../pages/adminPages/adminCRUDPages/adminCoursesCRUD/adminGetCourses/adminGetCourses";
//User CRUD
import AddUser from "../../pages/adminPages/adminCRUDPages/adminUserCRUD/adminAddUser/adminAddUser";
import GetMembers from "../../pages/adminPages/adminCRUDPages/adminUserCRUD/adminGetUsers/adminGetUsers";
import UpdateMember from "../../pages/adminPages/adminCRUDPages/adminUserCRUD/adminUpdateUser/adminUpdateUser";

                                  //Component Imports
import Layout from  '../../layouts/adminLayout/adminLayout';



function adminRoutes() {
  return (
    <>
        <Routes>
          <Route path="/admin" element={<SigninAdmin />} />   
          {/* <Route path="/Admin/Dashboard" element={<Layout />} > */}
        </Routes> 
        <Routes> 
          <Route path="/Admin/Dashboard" element={isAuthenticated() ? <Layout /> : <Navigate to="/Admin" />} >
          <Route path="/Admin/Dashboard/AddUser" element={<AddUser />} />
          <Route path="/Admin/Dashboard/GetMembers" element={<GetMembers />} />
          <Route path="/Admin/Dashboard/UpdateMember/:id" element={<UpdateMember />} />
            {/* Products */}
          <Route path="/Admin/Dashboard/AddProduct" element={<AddProduct />} />
          <Route path="/Admin/Dashboard/GetProducrs" element={<GetProducts />} />
          <Route path="/Admin/Dashboard/UpdateProduct/:id" element={<UpdateProduct />} />
            {/* Cource */}
          <Route path="/Admin/Dashboard/AddCource" element={<AddCource />} />
          <Route path="/Admin/Dashboard/GetCources" element={<GetCources />} />
          </Route>
        </Routes>   
    </>
  );
}

export default adminRoutes;
