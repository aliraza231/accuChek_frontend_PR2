import React from 'react';
import { useState,useEffect } from 'react';
import Swal from "sweetalert2";
import {API_Upload_Videos} from "../Configuration/Constant"
const TopHeader = () => {
  const [userImage, setUserImage] = useState("");
  const [getMember, setMember] = useState([]);
   const storedUserName = localStorage.getItem('userName');
   const storedUserId = localStorage.getItem('userId');
   const storedImg = localStorage.getItem('userImage');
  const currentDate = new Date();
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const day = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  let timeOfDay;
  if (hours >= 5 && hours < 12) {
    timeOfDay = "Morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "Night";
  } else {
    timeOfDay = "Afternoon";
  }
  console.log(userImage);

 
  
  const formattedDate = `Today ${month} ${day}, ${year} | ${hours}:${minutes} ${amOrPm}`;

  return (
    <div className='container-fluid top_header py-4'  style={{width:"80%",marginLeft:"20%"}}>
      <div className='row align-items-center'>
        <div className='col-md-6'>
          <div className='row'>
            <h6 className='member_welcome font_family_common'>Good {timeOfDay}, {storedUserName}</h6>
            <p className='date_time font_family_common'>{formattedDate}</p>
          </div>
        </div>
        <div className='col-md-6 d-flex justify-content-end'>
          <div className='row'>
            <div className='right_container d-flex align-items-baseline'id='doc_hid3'>
              <div className='serch position-relative'>
              <input type="text" className="search-hover" name="" placeholder="search here..." id="topBar_Serch" style={{padding:"15px"}}/>
              <span> <i class="fa-solid fa-magnifying-glass"></i> </span>
              </div>
              <div className='notification'>
                <img src='/notification-icon.svg' alt='' />
              </div>
              <div className='doctor'>
                {/* <img src='/doctor-bigImage.png' width="43px" alt='' /> */}
                {/* <img src={`http://localhost:5000/uploads/${storedImg}`} className='rounded-circle' width="50px" height='50px' alt=''  /> */}
                <img src={`${API_Upload_Videos}${storedImg}`} className='rounded-circle' width="50px" height='50px' alt=''  />
              </div>
              <div className='doc_name'>
                <p className='set_memberName'>{storedUserName}</p>
              </div>
              <div className='line p-1'>
                <img src='/Line.svg' alt=''></img>
              </div>
              <div className='rting_points'>
                <img src='/star-3.svg' width="30px" alt='' />
              </div>
              <div className='total_ponits'>
                <span> <p className='set_color_and_prop'>230</p></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
