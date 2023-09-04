

import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import Joi from "joi-browser";
import { useParams } from 'react-router-dom';
import { API_UpdateProduct,API_Get_SingleProduct } from '../../Configuration/Constant';
const UpdateProduct = () => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    let result = await fetch(
      `${API_Get_SingleProduct}${params.id}`
    );
    result = await result.json();
    setTitle(result.title);
    setId(result.id);
    setDescription(result.description);
    setPoints(result.points);
  };

  const updatingData = async () => {
    try {
      let result = await fetch(
        `${API_UpdateProduct}${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title,
            id,
            description,
            points
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      if (result) {
        console.log("Product updated successfully");
        Swal.fire("Success", "Product updated successfully!", "success");
      }
    } catch (error) {
      console.error("Error updating product", error);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateProperty(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  const schema = {
    title: Joi.string().min(3).max(50).required(),
    id: Joi.number().min(0).max(9999).required(),
    description: Joi.string().min(5).max(500).required(),
    points: Joi.number().min(0).max(9999).required(),
  };

  const savebtnhandler = async () => {
    const validationErrors = {};
    for (const field in product) {
      const error = validateProperty(field, product[field]);
      if (error) {
        validationErrors[field] = error;
      }
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      updatingData();
    }
  };

  const product = {
    title,
    id,
    description,
    points,
  };

  return (
    <div className="c" id="admin_user">
      <div className="row">
        <div className="col-md-6" id="div_center">
          <div className="row left_padding">
            <div className="row text-center mt-3">
              <h3 className="d-flex fw-bold mb-2 justify-content-center">
                Update Product
              </h3>
            </div>
            <div className="row">
              <div className="form_body">
                <form onSubmit={savebtnhandler}>
                  <div className="mb-3">
                    <label htmlFor="name" className="d-flex ms-3 mb-1">
                      Title
                    </label>
                    <input
                      onBlur={handleBlur}
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      name="title"
                      type="text"
                      className="form-control inputs_background"
                      id="user_name"
                    />
                    {errors.title && (
                      <div className="alert alert-danger">{errors.title}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="d-flex ms-3 mb-1">
                      SKU Number
                    </label>
                    <input
                      onBlur={handleBlur}
                      onChange={(e) => setId(e.target.value)}
                      value={id}
                      name="id"
                      type="number"
                      className="form-control inputs_background"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    {errors.id && (
                      <div className="alert alert-danger">{errors.id}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="d-flex ms-3 form-label">
                      Description
                    </label>
                    <input
                      onBlur={handleBlur}
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      name="description"
                      type="text"
                      className="form-control inputs_background"
                      id="exampleInputPassword1"
                    />
                    {errors.description && (
                      <div className="alert alert-danger">{errors.description}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="d-flex ms-3 form-label">
                      Points
                    </label>
                    <input
                      onBlur={handleBlur}
                      onChange={(e) => setPoints(e.target.value)}
                      value={points}
                      name="points"
                      type="number"
                      className="form-control inputs_background"
                      id="points"
                    />
                    {errors.points && (
                      <div className="alert alert-danger">{errors.points}</div>
                    )}
                  </div>
                  <br />
                  <div className="">
                    <button
                      onClick={savebtnhandler}
                      className="btn sign-btn_1 sign_btn"
                      type="button"
                    >
                      Update Product
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
}

export default UpdateProduct;
