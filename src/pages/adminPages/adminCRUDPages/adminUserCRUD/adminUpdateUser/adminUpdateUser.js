import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import Joi from "joi-browser";
import { useParams } from 'react-router-dom';
import {API_Get_SingleUser,API_UpdateUser} from "./../../../../../constants/contant";
const UpdateMember = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setSelectedCountry] = useState("USA");
  const [langguage, setSelectedLanguage] = useState("English");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfrimPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    let result = await fetch(
       `${API_Get_SingleUser}${params.id}`
    );
    result = await result.json();
    setName(result.name);
    setEmail(result.email);
    setPassword(result.password);
    setSelectedCountry(result.country);
    setSelectedLanguage(result.langguage);
    setConfrimPassword(result.confirm_password);
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

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  const updatingData = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    for (const field in user) {
      const error = validateProperty(field, user[field]);
      if (error) {
        validationErrors[field] = error;
      }
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        let result = await fetch(
          (`${API_UpdateUser}${params.id}`),
          {
            method: "PUT",
            body: JSON.stringify({
              name,
              email,
              password,
              country,
              langguage,
              confirm_password
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        result = await result.json();
        if (result) {
          console.log("Updated Success");
          Swal.fire("Success", "Member updated successfully!", "success");
        }
      } catch (error) {
        console.error("Error updating member", error);
        Swal.fire("Error", "Failed to update member", "error");
      }
    }
  };

  const user = {
    name,
    email,
    password,
    country,
    langguage,
    confirm_password,
  };

  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(10).max(100).required(),
    password: Joi.string().min(8).max(100).required(),
    country: Joi.string().min(1).max(100).required(),
    langguage: Joi.string().min(3).max(100).required(),
    confirm_password: Joi.string().min(8).max(100).required(),
  };

  return (
    <div className="c" id="admin_user">
      <div className="row">
        <div className="col-md-6" id="div_center">
          <div className="row left_padding">
            <div className="row text-center mt-3">
              <h3 className="d-flex fw-bold mb-2 justify-content-center">
                Update Member
              </h3>
            </div>
            <div className="row">
              <div className="form_body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="d-flex ms-3 mb-1">
                      Name
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      onBlur={handleSave}
                      name="name"
                      type="text"
                      className="form-control inputs_background"
                      id="user_name"
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
                        className="form-control inputs_background"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        // value={user.email}
                        value={email}
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
                               value={user.country}
                              //value={country}
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
                              name="langguage"
                               value={user.langguage}
                              //value={langguage}
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
                         disabled 
                         // onChange={CHangeFunction}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handleSave}
                        name="password"
                        type="password"
                        className="form-control inputs_background"
                        id="exampleInputPassword1"
                          value={user.password}
                        //value={password}
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
                        disabled 
                         // onChange={CHangeFunction}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleSave}
                        name="confirm_password"
                        type="password"
                        className="form-control inputs_background"
                        id="exampleInputPassword2"
                          value={user.confirm_password}
                        //value={confrim_password}
                      />
                      {errors.confrim_password && (
                        <div className="alert alert-danger">
                          {errors.confirm_password}
                        </div>
                      )}
                    </div>
                    <br />
                    
                   <div className="">
                    <button
                      className="btn sign-btn_1 sign_btn"
                      onClick={updatingData}
                      type="submit"
                    >
                      Update Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMember;
