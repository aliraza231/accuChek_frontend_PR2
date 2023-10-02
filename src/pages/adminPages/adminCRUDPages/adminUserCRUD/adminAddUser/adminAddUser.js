import React, { useState } from "react";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {API_User_Rregistration} from '../../../../../constants/contant';
import adminAddUserValidationSchema from "../../../../../services/validationService/adminJoiValidation/adminAddUserValidation/adminAddUserValidation";
import axios from "axios";
const SideBar = () => {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setSelectedCountry] = useState("usa");
  const [language, setSelectedLanguage] = useState("English");
  const [confirm_password, setConfrimPassword] = useState("");
  let [image, setImage] = useState(null);
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const [user, setUser] = useState({
    name: setName,
    email: setEmail,
    password: setPassword,
    country: setSelectedCountry,
    language: setSelectedLanguage,
    confirm_password: setConfrimPassword,
  });
  const [errors, setErrors] = useState({});

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const subSchema = { [name]: adminAddUserValidationSchema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  const handleSave = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    setErrors(errorData);
  };
 
  const savebtnhandler = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("password", password);
    formData.append("language", language);
    formData.append("confirm_password", confirm_password);
    formData.append("image", image);

    try {
      console.log("IN If Condointment")
      // send a POST request to the server to add the product
      // let response = await axios.post("http://localhost:5000/User/userRegister", formData);
      let response = await axios.post(API_User_Rregistration, formData);
      console.log(response.data); 
      if(response.status=== 201){
        Swal.fire("success!", "Member add Sucessfuly!", "success");
        setAddedSuccessfully(true);
        resetFormData();
      
      navigate('/Admin/Dashboard/GetMembers')
      // window.alert("Successfull")
    }else{
      Swal.fire({
        position:"center",
        icon: "error",
        title: "Oops...",
        text: "Cource added Failed",
      });
    } 

    } catch (error) {
      console.log(error);
    }
  };
  const resetFormData = () => {
    setName("");
    setEmail("");
    setSelectedCountry("");
    setSelectedLanguage("");
    setPassword("");
    setConfrimPassword("");
    setImage("");
    setErrors({});
  };

  const CHangeFunction = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };


  let handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <>
      <div className="c" id="admin_user">
        <div className="row">
          <div className="col-md-6" id="div_center">
            <div className="row left_padding">
              <div className="row text-center mt-3">
                <h3 className="d-flex fw-bold mb-2 justify-content-center">
                  Add User
                </h3>
              </div>
              <div className="row">
                <div className="form_body">
                  <form onSubmit={savebtnhandler} encType="multipart/form-data">
                    <div className="mb-3">
                      <label htmlFor="name" className="d-flex ms-3 mb-1">
                        Name
                      </label>
                      <input
                        // onChange={CHangeFunction}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleSave}
                        name="name"
                        value={name}
                        type="text"
                        className="form-control inputs_background"
                        id="user_name"
                        // value={user.name}
                       
                      />
                      {errors.name && (
                        <div className="alert alert-danger">{errors.name}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="d-flex ms-3 mb-1"
                      >
                        Email address
                      </label>
                      <input
                        // onChange={CHangeFunction}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleSave}
                        name="email"
                        type="email"
                        value={email}
                        className="form-control inputs_background"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        // value={user.email}
                      />
                      {errors.email && (
                        <div className="alert alert-danger">{errors.email}</div>
                      )}
                    </div>
                    <div className="row">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="dropdown">
                            <select
                              className="form-select inputs_background"
                              aria-label="Default select example"
                              // onChange={CHangeFunction}
                              onChange={(e) => setSelectedCountry(e.target.value)}
                              onBlur={handleSave}
                              name="country"
                              value={country}
                              // value={user.country}
                            >
                              <option value="usa">USA</option>
                              <option value="canada">Canada</option>
                              <option value="uk">United Kingdom</option>
                            </select>
                            {errors.country && (
                              <div className="alert alert-danger">
                                {errors.country}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="dropdown">
                            <select
                              className="form-select inputs_background"
                              // onChange={CHangeFunction}
                              onChange={(e) => setSelectedLanguage(e.target.value)}
                              onBlur={handleSave}
                              name="language"
                              value={language}
                              // value={user.language}
                            >
                              <option value="english">English</option>
                              <option value="spanish">Spanish</option>
                              <option value="german">German</option>
                            </select>
                            {errors.langguage && (
                              <div className="alert alert-danger">
                                {errors.langguage}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="d-flex ms-3 form-label"
                      >
                        Password
                      </label>
                      <input
                        // onChange={CHangeFunction}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handleSave}
                        name="password"
                        value={password}
                        type="password"
                        className="form-control inputs_background"
                        id="exampleInputPassword1"
                        // value={user.password}
                      />
                      {errors.password && (
                        <div className="alert alert-danger">{errors.password}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="d-flex ms-3 form-label"
                      >
                        Confirm Password
                      </label>
                      <input
                        // onChange={CHangeFunction}
                        onChange={(e) => setConfrimPassword(e.target.value)}
                        onBlur={handleSave}
                        name="confirm_password"
                        value={confirm_password}
                        type="password"
                        className="form-control inputs_background"
                        id="exampleInputPassword1"
                        // value={user.confirm_password}
                      />
                      {errors.confrim_password && (
                        <div className="alert alert-danger">
                          {errors.confirm_password}
                        </div>
                      )}
                    </div>
                    <label
                        htmlFor="exampleInputPassword1"
                        className="d-flex ms-3 form-label"
                      >
                        Image
                      </label>
                    <input
                        // onChange={(e) => setImage(e.target.value)}
                        // onBlur={handleBlur}
                        onChange={handleImageChange}
                        name="image"
                        type="file"
                        
                        className="form-control inputs_background mb-4"
                        id="exampleInputPassword1"
                      />
                    <div className="">
                      <button
                        className="btn sign-btn_1 sign_btn"
                        // onClick={savebtnhandler}
                        type="submit"
                      >
                        Create User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;


