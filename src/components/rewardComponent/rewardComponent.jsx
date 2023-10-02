import React from 'react';
import './rewardComponent.module.css';

const Mockup = () => {
  return (
    <>
        <div className='container  'style={{width:'30%',height:"40%"}}>
     
        <div className='row justify-content-center'>
        <div className='col-md-6 forgoot_root'>
        <h6 className='text-center forgoot_root_h6 '>CONGRATULATIONS</h6>
           <div >
                <h6 className='text-center forgot_box '>You’ve recieved a Reward</h6>
                
               <img src='' alt='' />
                <div className='d-flex justify-content-center ' >
                <button className=" sign_btn btn reset p-2 mt-3 text-white">CLAIM</button>
                </div>
           </div>
        </div>
    </div>
     </div>
    </>
  )
}

export default Mockup