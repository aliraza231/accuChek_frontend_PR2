import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Loader from '../../components/Loader'
import { API_Get_Courses, API_Admin_Delete_Course,API_Upload_Videos } from '../../Configuration/Constant';
import Swal from "sweetalert2";
// import {getCourcesApi} from "../../Configuration/Const"
const GetCources = () => {
// Fet All Cources from Database
const [getProducts, setProducts] = useState([]);
const [count, setCount] = useState([]);
const [isloading, setLoading] = useState(true)
useEffect(() => {
  getData();
}, []);

const getData = async () => {
  let response = await fetch(API_Get_Courses) ;
  let result = await response.json();
  if(result<0){
    result.send("<h1>No Data!</h1>")
  }
  console.log("Result from API Members list", result);
  setProducts(result);
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
      await fetch(`${API_Admin_Delete_Course}${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Course deleted successfully");
            // Call getData to fetch updated product list
            getData();
          } else {
            console.error("Error deleting Course");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      
      Swal.fire(
        'Deleted!',
        'Your Course has been deleted.',
        'success'
      )
    }
  });
};
let count2 = getProducts.length;

  const [videoCompleted, setvideoCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null)
  const [endTime,setEndTime] = useState(null)
  
  const handleVideoEnded = () => {
    setvideoCompleted(true);
    setEndTime(new Date());
  };

  const handleTime = ({playedSeconds}) => {
      if(startTime == null){
        setStartTime(new Date());
      }
  }


  return (
   <>
{isloading?(
      <Loader />
    ):( 
      <div className='c' id='admin_user'>
      {/* Heading */}
        <h1 className='text-center'>All Courses</h1>
        <div className='container'>
          <div className='row mb-3'>
          <div class="row height d-flex justify-content-center align-items-center">
              <div class="col-md-8">
                <div class="search">
                  <i class="fa fa-search"></i>
                  <input type="text" class="form-control" placeholder="Serch Vedios" id='set_serch_height'/>
                  <button class="btn">Search</button>
                </div>
              </div>
              </div>
          </div>
          {/* For Vedios Count and dispaly */}
          <div className='row mb-2'>
            <div>
              <h6 className='p-3'>Vedios: {count2}</h6>
            </div>
          </div>
          {/* Display vedios asa list */}
          {getProducts.map((Cource)=>{
            return(
              <div className="row mb-3 for_row_background">
              <div className='col-md-4'>
                  <div className="vedio_ThumNail">
                    <ReactPlayer url={`${API_Upload_Videos}${Cource.image}`} controls={true} onProgress={handleTime}   onEnded={handleVideoEnded} />
                    {console.log(`Time taken: ${endTime && startTime ? (endTime - startTime) / 1000 + " seconds" : "N/A"}`)}

                  </div>
              </div>
              
              <div className='col-md-3'>
                <div className="cource_details">
                    <h6>{Cource.name}</h6>
                    <p>{Cource.discription}</p>
                    <p> <i className='fa fa-clock'></i> {Cource.duration}</p>
                </div>
              </div>
              <div className='col-md-4 cource_ponits'>
                <h6> <i class="fa-solid fa-award"></i> {Cource.points} </h6>
              </div>
              <div className='col-md-1'>
              <div className='w-100 align-self-end'>
                <button
                onClick={() => {
                      handleDelete(Cource._id);
                      console.log(Cource._id);
                    }} 
                className='btn btn-danger '> <i className='fa-solid fa-trash'></i> </button>
              </div>
              </div>
          </div>
            )
          })}
        </div>
      </div>
      )}

     
   </>
  )
}

export default GetCources