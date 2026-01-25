import React from 'react';
import useAuth from '../Hooks/UseAuth';
import { Navigate, useLocation, useNavigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user , loading} = useAuth();
    const location = useLocation();
    console.log(location);


    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(!user){
       return <Navigate state={{from: location.pathname}} to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;