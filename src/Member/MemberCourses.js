import React, { useRef } from 'react';
import  { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import ReactPlayer from 'react-player'
import Swal from 'sweetalert2';
const MemberCourses = () => {
const [getFalseStaus_cources, setFalseStausCources] = useState([]);
const [isloading, setLoading] = useState(true);
const [getProducts, setProducts] = useState([]);
  
    useEffect(() => {
      getData();
      getFalseStausCources()
    }, []);
  
    const getData = async () => {
      let result = await fetch("http://128.199.221.11:5000/Admin/getCources");
      
      result = await result.json();
      if(result<0){
        result.send("<h1>No Data!</h1>")
      }
      console.log("Result from API Members list", result);
      setProducts(result);
      console.log(result._id);
      setLoading(false);
    };
     const getFalseStausCources = async () => {
       let result = await fetch("http://128.199.221.11:5000/Admin/getCources");
       result = await result.json();
       console.log(result)
       console.log("hamzano stratus found")
       if(result<0){
         result.send("<h1>No Data!</h1>")
       }
      console.log("Result from API Members list", result);
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
    const handleEnded = (index,VideoPoints)=>{
      Swal.fire({
        html: `
          <div class='container' style='; height:' id='for_swal_back'>
            <div class='row justify-content-center'>
              <div class='col-md-6 forgoot_root' id="for_cliams">
                <h6 class='text-center forgoot_root_h6'>CONGRATULATIONS</h6>
                <div>
                  <h6 class='text-center forgot_box'>You’ve received a Reward</h6>
                  <div>
                  <img src='/Star 5.svg' height='200px' alt='' />
                  <span> <img src='/FullStar.png' height='50pxpx' alt=''/> </span>
                  <p>${VideoPoints}</p>
                 <div >
                 
                 
                 </div>
                  </div>
                  <div class='d-flex justify-content-center'>
                  
                    <button class='sign_btn btn reset p-2 mt-3 text-white'>CLAIM</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
        showConfirmButton: false, // Hides the default "OK" button
        width: '40%',
        padding: '10px',
        background: 'rgba(255,255,255,0.9)',
      });
    }
  
  return (
    <>
     {isloading?(
      <Loader />
    ):( 
         <div className='position-absolute' style={{marginLeft:'20%',width:"80%", marginTop:"07%"}}>
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


                <div className='row mt-4 ms-2'>
                    <div className='col-2 text-primary' >
                        <p>Medical(4)</p>
                    </div>
                    <div className='col font-weight-normal'>
                        <p>Products(2)</p>
                    </div>
                    <div className='row'><hr></hr></div>
                </div>
                {getProducts.map((product,index) => {
                return (
            <div className='row ms-0 mb-5' key={product._id}>
            <div className='col-md-3 video_Thumbnail' style={{ height: '10%' }}>
                {/* Video Player */}
                <ReactPlayer
                ref={playerRefs.current[index]}
                url={`http://128.199.221.11:5000/uploads/${product.image}`}
                controls={true}
                onProgress={({ playedSeconds }) => handleTime(index, playedSeconds)}
                onDuration={(videoDuration) => handleDuration(index, videoDuration)}
                onEnded={()=>handleEnded(index,product.points)}
              />
            </div>
            <div className='col mt-2'>
                <div className='row'>
                  <p>{product.name}</p>
                  <p>{product.discription}</p>
                  <div className='d-flex justify-content-between ps-0'>
                  <i className='fa-regular fa-clock ms-4'> &nbsp; {product.duration}</i>
                  <img src='/FullStar.png' className='ms-5'  width='30px' height='30px' alt=''/>{product.points}
                  </div>
                </div>
            </div>
            <div className='col-md-3'>
            </div>
            <div className='col-md-3 mt-3'>
                <button
                className='btn member_cources_button ms-5 text-light'
                  onClick={({ playedSeconds }) => handleTime(index, playedSeconds)}
               >
                Continue
              </button>
                <div key={product._id}>
                <p>Progress</p>
                {/* Progress Bar */}
                <div className='progress'>
                    <div
                        className='progress-bar'
                        role='progressbar'
                        style={{
                            width: `${progress[index] || 0}%`,
                          }}
                        aria-valuenow={progress[index]}
                        aria-valuemin='0'
                        aria-valuemax='100'
                    >
                       {progress[index] !== undefined
                            ? `${progress[index].toFixed(2)}% Complete`
                            : '0.00% Complete'}
                    </div>
                </div>
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
                                url={`http://128.199.221.11:5000/uploads/${falseStaus.image}`}
                                controls={true}
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
export default MemberCourses;