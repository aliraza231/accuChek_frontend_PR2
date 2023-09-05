import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from '../../components/Loader'
// import { getProductsApi } from "../../Configuration/Const";
import {API_Get_Users,API_Admin_Delete_User,API_Upload_Videos} from '../../Configuration/Constant'
const GetMembers = () => {
  const [getMember, setMember] = useState([]);
  const [isloading, setLoading] = useState(true)

  useEffect(() => {
   getData();
    
  }, []);

  const getData = async () => {
    let result = await fetch(API_Get_Users);
    result = await result.json(); 
    if(result<0){
      result.send("<h1>No Data!</h1>")
    }
    console.log("Result from API Members list", result);
    setMember(result);
    console.log(result._id);
    setLoading(false)
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Delete the product
        // await fetch(`http://localhost:5000/User/dellMember/${id}`, {
          await fetch(`${API_Admin_Delete_User}${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              console.log("Resource deleted successfully");
              // Call getData to fetch updated product list
              getData();
            } else {
              console.error("Error deleting resource");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        
        Swal.fire(
          'Deleted!',
          'Member deleted.',
          'success'
        )
      }
    });
  };
  return (
    <>
     {isloading?(
      <Loader />
    ):( 
      <div className="c mt-3" id="admin_user">
        <div className="row">
          {getMember.map((member) => {
            return (
              <div className="col-md-3">
                <div className="member_card ms-2 text-center mb-5" style={{height:"300px"}}>
                {/* <img className="card-img-top"  src={`http://localhost:5000/uploads/${member.image}`} width='100px' height='130px' alt="Card image cap" /> */}
                <img className="card-img-top"  src={`${API_Upload_Videos}${member.image}`} width='100px' height='130px' alt="Card image cap" />
                
                
                  <h6>{member.name}</h6>
                  <p>{member.email}</p>
                  <h6>{member.country}</h6>
                  <h6>{member.language}</h6>
                  <div
                    className="btn-group mb-4"
                    role="group"
                    aria-label="Basic example"
                  >
                    <NavLink to={`/Admin/Dashboard/UpdateMember/${member._id}`}>
                    <button type="button" className="btn btn-warning">
                    <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    </NavLink>
                    <button 
                    onClick={() => {
                      handleDelete(member._id);
                      console.log(member._id);
                    }}
                    type="button" className="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        
        </div>
      </div>
      
      )}

      
    </>
  );
};

export default GetMembers;
