import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import TopHeader from './TopHeader';
const MemberLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); 
    localStorage.clear();
    window.location.reload(true);
  };
  const [activeButton, setActiveButton] = useState('overview');

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId === activeButton ? null : buttonId);
};

  return (
    <>
      <Outlet />
      <div className="root_div">
        <div className="row">
          <div className="">
            <h3 className="brand_name text-center mt-5 mb-5">
              ACCU-CHEK <span>®</span>
            </h3>
          </div>
        </div>
        {/* Member Routes start here */}
        <div className="row for_bac_radious">
        <div className={`col-md-6 set_width  ${activeButton === 'overview' ? 'active' : ''}`}>
                
                    <ul>
                        <li className="side_list">
                        <div className="dropdown">
                                <span className='padding-2'>
                                   <img src='/desktop-icon.svg' alt=''/>
                                </span>
                                <NavLink to="/user/MemberHome">
                                <button
                                    className={`btn for_side_bar_prop ${activeButton === 'overview' ? 'active' : ''}`}
                                    onClick={() => handleButtonClick('overview')}>
                                    OverView
                                </button>
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row for_bac_radious">
            <div className={`col-md-6 set_width  ${activeButton === 'Cources' ? 'active' : ''}`}>
                    <ul>
                        <li className="side_list">
                            <div className={`dropdown ${activeButton === 'Cources' ? 'active' : ''}`}>
                                <span className='padding-2'>
                                    <img src='/book_Black.svg' alt='' />
                                </span>
                                <NavLink to="/user/MemberCourses">
                                <button
                                  className={`btn for_side_bar_prop ${activeButton === 'Cources' ? 'active' : ''}`}
                                  onClick={() => handleButtonClick('Cources')}>
                                  Course
                              </button>
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row for_bac_radious">
            <div className={`col-md-6 set_width  ${activeButton === 'Complete Cources' ? 'active' : ''}`}>
                    <ul>
                        <li className="side_list">
                            <div className={`dropdown ${activeButton === 'Complete Cources' ? 'active' : ''}`}>
                                <span className='padding-2'>
                                   <img src='/c_b.svg' alt='' />
                                </span>
                                <NavLink to="/user/MemberCompleteCourses">
                                <button
                                  className={`btn for_side_bar_prop ${activeButton === 'Complete Cources' ? 'active' : ''}`}
                                  onClick={() => handleButtonClick('Complete Cources')}>
                                  Complete Course

                              </button>
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        <div className="row for_bac_radious">
        <div className={`col-md-6 set_width  ${activeButton === 'Support & Comunity' ? 'active' : ''}`}>
            <ul>
              <li className="side_list">
              <div className={`dropdown ${activeButton === 'Support & Comunity' ? 'active' : ''}`}>
                  <span className='padding-2'>
                 <img src='/Chat_Black.svg' alt='' />
                  </span>
                  <NavLink to='/user/MemberSupportCommunity'>
                  <button
                    className={`btn for_side_bar_prop ${activeButton === 'Support & Comunity' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('Support & Comunity')}>
                    Support & Comunity
                    </button>
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row for_bac_radious">
        <div className={`col-md-6 set_width  ${activeButton === 'Shop' ? 'active' : ''}`}>
            <ul>
              <li className="side_list">
              <div className={`dropdown ${activeButton === 'Shop' ? 'active' : ''}`}>
                  <span className='padding-2'>
                    <img src='/Shop_Black.svg' alt='' />
                  </span>
                  <NavLink to="/user/Shop">
                  <button
                    className={`btn for_side_bar_prop ${activeButton === 'Shop' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('Shop')}>
                     Shop
                    </button>
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 ">
          <NavLink to="/"><button onClick={handleLogout} className="btn text-white sign_btn w-100 fw-bold"> <span><i class="fa-solid fa-lock"></i></span> Logout</button></NavLink>
          </div>
        </div>
      </div>
      <TopHeader/>
  
       
    </>
  );
}

export default MemberLayout