import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import TopHeader from './TopHeader';
const MemberLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); 
    localStorage.clear();
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
                                    <img src='/Book.svg' alt='' />
                                </span>
                                <NavLink to="/user/MemberCourses">
                                <button
                                  className={`btn for_side_bar_prop ${activeButton === 'Cources' ? 'active' : ''}`}
                                  onClick={() => handleButtonClick('Cources')}>
                                  Cources
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
                                   <img src='/complete_cource.svg' alt='' />
                                </span>
                                <NavLink to="/user/MemberCompleteCourses">
                                <button
                                  className={`btn for_side_bar_prop ${activeButton === 'Complete Cources' ? 'active' : ''}`}
                                  onClick={() => handleButtonClick('Complete Cources')}>
                                  Complete Cources
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
                  <svg className='svg' width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M29.2961 8.47773H26.5493V20.8599H8.69522V23.6115C8.69522 24.3682 9.31325 24.9873 10.0686 24.9873H25.1759L30.6695 30.4905V9.85353C30.6695 9.09684 30.0514 8.47773 29.2961 8.47773ZM23.8025 16.7325V4.35034C23.8025 3.59366 23.1845 2.97455 22.4291 2.97455H4.57505C3.81969 2.97455 3.20166 3.59366 3.20166 4.35034V23.6115L8.69522 18.1083H22.4291C23.1845 18.1083 23.8025 17.4892 23.8025 16.7325Z" fill="white"/>
                  </svg>
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
                    <img src='/Shop2.svg' alt='' />
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
          <NavLink to="/"><button onClick={handleLogout} className="btn btn-info w-100 fw-bold">Logout</button></NavLink>
          </div>
        </div>
      </div>
      <TopHeader/>
  
       
    </>
  );
}

export default MemberLayout