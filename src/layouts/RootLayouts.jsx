import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const RootLayouts = () => {
    return (
        <div>
              <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayouts;