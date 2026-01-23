import React from 'react';
import { Outlet } from 'react-router';
import authimg from '../assets/authImage.png';
import EdificeLogo from '../Pages/Shared/EdificeLogo/EdificeLogo';

const AuthLayout = () => {
    return (
      <div className="p-12 bg-base-200 ">
      <div>
        <EdificeLogo></EdificeLogo>
      </div>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className='flex-1'>
        <img
      src={authimg}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    </div>
    <div className='flex-1'>
     <Outlet></Outlet>
    </div>
  </div>
</div>
    );
};

export default AuthLayout;