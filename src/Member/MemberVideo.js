import React, { useRef } from 'react';
import  { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import ReactPlayer from 'react-player'
import Swal from 'sweetalert2';
import {Api_Get_Single_Video,API_Get_UnCompletedCourseVideo,API_Upload_Videos,myAllRounderApi} from "../Configuration/Constant"
import { useParams } from 'react-router-dom';
const MemberVideo = () => {
  const [getSingleCourse, setSingleCourse] = useState([""]);
const [getFalseStaus_cources, setFalseStausCources] = useState([]);
const [isloading, setLoading] = useState(true);
const [getProducts, setProducts] = useState([]);
const [points,setPoints] = useState('');
const storedPoints = localStorage.getItem('userPoints');
const storedUserId = localStorage.getItem('userId');

const params = useParams();

// const [getSingleCourse, setSingleCourse] = useState("");
const [errors, setErrors] = useState({});

useEffect(() => {
  getCourseData();
  getFalseStausCources()
}, []);


const getCourseData = async () => {
  // let result = await fetch(`http://localhost:5000/Admin/getSingleCourse/${params.id}`);
  let result = await fetch(`${Api_Get_Single_Video}${params.id}`);
  result = await result.json();
  if(result<0){
        result.send("<h1>No Data!</h1>")
      }
  setSingleCourse(result)
  setLoading(false);
  
};

const updatingData = async (VideoPoints) => {
  try {
    // Add VideoPoints to the points state
    let num1 = parseInt(storedPoints, 10); // Convert storedPoints to an integer
    console.log(num1);
    
    let num2 = parseFloat(VideoPoints); // Convert VideoPoints to a floating-point number
    console.log(num2);
    
    let sumofPoints = num1 + num2; // Perform numeric addition
    console.log(sumofPoints);

    const result = await fetch(
      `http://128.199.221.11:5000/User/userInfo/${storedUserId}`, // Use the user's ID here
      {
        method: "PUT",
        body: JSON.stringify({
          points: sumofPoints, // Update points with VideoPoints
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 200) {
      console.log("User points updated successfully");
      Swal.fire("Success", "successfully Claimed!", "success");
    } else {
      console.error("Failed to update user points");
      Swal.fire("Error", "Failed to update points", "error");
    }
  } catch (error) {
    console.error("Error while Claim", error);
    Swal.fire("Error", "Failed to update points", "error");
  }
};


const getFalseStausCources = async () => {
  let result = await fetch(API_Get_UnCompletedCourseVideo);
  result = await result.json();
  console.log(result)
  console.log("hamzano stratus found")
  if(result<0){
    result.send("<h1>No Data!</h1>")
  }
 console.log("Result from API Course list", result);
  setFalseStausCources(result);
  console.log(result._id);
  setLoading(false)
};




    const [progress, setProgress] = useState(Array(getProducts.length).fill(0));
    const [duration, setDuration] = useState(Array(getProducts.length).fill(0));
    const playerRefs = useRef(getProducts.map(() => React.createRef()));
   
  
    const handleTime = (index, playedSeconds) => {
      const calculatedProgress = (playedSeconds / duration[index]) * 100;
  
      setProgress((prevProgress) => {
        const newProgress = [...prevProgress];
        newProgress[index] = calculatedProgress;
        return newProgress;
      });
    };

    const handleDuration = (index, videoDuration) => {
      setDuration((prevDurations) => {
        const newDurations = [...prevDurations];
        newDurations[index] = videoDuration;
        return newDurations;
      });
    };
    const handleEnded = async (index, VideoPoints) => {
      Swal.fire({
        html: `
          <div class='container' style='; height:' id='for_swal_back'>
            <div class='row justify-content-center'>
              <div class='col-md-6 forgoot_root' id="for_cliams">
                <h6 class='text-center forgoot_root_h6'>CONGRATULATIONS</h6>
                <div>
                  <h6 class='text-center forgot_box'>You’ve received a Reward</h6>
                  <div>
                  <img src='/Star 5.svg' height='200px' alt='' 
                 <div >
                 <div class='d-flex justify-content-center position-relative'style='top:-8pc'>
                  <span> <img src='/FullStar.png' height='50pxpx' alt=''/> </span>
                  <p class='align-self-end'>${VideoPoints}</p>
                  </div>
                 
                 </div>
                  </div>
                  <div class='d-flex justify-content-center'>
                    <button class='sign_btn cliam_btn btn reset p-2 mt-3 text-white'>CLAIM</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
        didOpen: () => {
          const claimButton = document.querySelector(".cliam_btn");
          console.log("CLAIM button selected:", claimButton); // Debugging
          claimButton.addEventListener("click", async () => {
            console.log("CLAIM button clicked"); // Debugging
            // Call the updatingData function to update user points
            await updatingData(VideoPoints);
    
            // Close the Swal modal
            Swal.close();
          });
        },
        showConfirmButton: false, // Hides the default "OK" button
        width: '40%',
        padding: '10px',
        background: 'rgba(255,255,255,0.9)',
      });
    };
    
  return (
    <>
     {isloading?(
      <Loader />
    ):( 
         <div className='position-absolute p-3' style={{marginLeft:'20%',width:"80%", marginTop:"07%",}}>
            {/* First Container */}
            <div className="container border mt-5 rounded bg-light">
                <div className='row ms-1'>
                    <div className='col justify-content-start mt-3'>
                        <h3>Courses</h3>
                    </div>
                    <div className='col-sm-3 justify-content-end'>
                        <input className='justify-content-end mt-4 ms-5' type='Date' placeholder='Date' id='cources_serch'></input>
                    </div>
                </div>

                {getSingleCourse.map((product,index) => {
                return (
            <div className='row ms-0 mb-5' key={product._id}>
            <div className='row justify-content-center mt-3 ms-3' style={{width:'98%',height:"20%" , borderRadius:'10px'}}>
              <div className='col-md-3 video_Thumbnail ' style={{ width:'98%',height: '20%', borderRadius:'10px' }} >
                   
                  <ReactPlayer 
                  id='full_page_player'
                  ref={playerRefs.current[index]}
                  url={`${API_Upload_Videos}${product.image}`}
                  controls={true}
                  onProgress={({ playedSeconds }) => handleTime(index, playedSeconds)}
                  onDuration={(videoDuration) => handleDuration(index, videoDuration)}
                  onEnded={()=>handleEnded(index,product.points)}
                />
              </div>
            </div>
            <div className='row'>
            <div className='col-md-9 mt-2'>
                <div className='row ms-4'>
                  <h3 className='fw-bold'>{product.name}</h3>
                  <p>{product.discription}</p>
                  <div className='col justify-content-end me-4' style={{display:'flex',marginTop:'-83px'}}>
                  <i className='fa-regular fa-clock ms-4'> &nbsp; {product.duration}</i>
                  <img src='/FullStar.png' className='ms-5'  width='30px' height='30px' alt=''/>{product.points}
                  </div>
                </div>
            </div>
            </div>
            
              <div className='row mt-2'>
                  
                  <div key={product._id} className='col-md-3'>
                  <p className='ms-2'>Progress</p>
                  {/* Progress Bar */}
                  <div className='progress ms-2' style={{width:'30pc'}}>
                      <div
                          className='progress-bar'
                          role='progressbar'
                          style={{
                              width: `${progress[index] || 0}%`,
                            }}
                      >
                      </div>
                      
                  </div>
                  
              </div>
              <div className='col mt-4 d-flex justify-content-end align-items-end'>
                    {progress[index] !== undefined
                              ? `${progress[index].toFixed(2)}%`
                              : '0.00% Complete'}
                  </div>
        </div>
            </div>
    );
})}
</div>
            <br/>         
            {/* Second Container */}
            <div className='container border mt-5 rounded bg-light'>
                <div className='row ms-1'>
                    <div className='col justify-content-start mt-3'>
                        <h3>Recommended Courses</h3>
                    </div>
                    <div className='col-sm-3 mt-3'>
                        <a href='' className=' ms-5 text-dark'>See all <i className='fa fa-greater-than'></i> </a>
                    </div>
                </div>
                <br/>

                <div className='row ms-0'>
                {getFalseStaus_cources.map((falseStaus)=>{
                    return(
                        <div  className='col-md-2 col-sm-2 border bg-white rounded p-0 m-2' style={{ width:"23%"}}>
                        <div className='row auto_height'>
                            {/* <img height="80%" src='/Recommended-Course-1.png' className='rounded' width="100%"></img> */}
                            <ReactPlayer
                                url={`${API_Upload_Videos}${falseStaus.image}`}
                                controls={true}
                                light={'/Recommended-Course-4.png'}
                />
                        </div>
                        <div className='row'>
                            <p className='fs-6 mt-2 ms-1 fw-normal'> {falseStaus.name}</p>
                        </div>
                        <div className='row'>   
                            <i className='fa-regular fa-clock ms-3'> &nbsp; {falseStaus.duration}</i>
                        </div>
                        <div className='row mt-2'> 
                            <div className='col-md-2 m-0 p-0 me-2' style={{display:"flex",justifyContent:"right", height:"03%",width:"20%"}}>
                                <img  src='/Award-star.png' style={{height:"03%",width:"60%"}}></img>
                            </div>
                            <div className='col-md-2 m-0 p-0' style={{height:"03%",width:"20%"}}>
                                <span>{falseStaus.points}</span>
                            </div>
                        </div>
                        <br/>
                        <div className='row'>
                            <div class="col-md-12" style={{display:"flex",justifyContent:"right"}}>
                                <button width="60%" type="button" class="btn me-2 mb-2" style={{width:"60%",backgroundColor:"#8EB927"}}>Start</button>
                            </div>
                        </div>
                    </div>
                    )
                })}
                  
                </div>
            </div>
        </div>
        )}
    </>
  )
}
export default MemberVideo;