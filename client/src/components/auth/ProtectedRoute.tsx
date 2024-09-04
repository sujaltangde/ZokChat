import React, { ReactNode } from 'react';
// import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { RootState } from '../../redux/store';

type ProtectedRouteProps = {
    children: ReactNode;
    isAuthenticated: boolean;
    redirect?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated, redirect="/login" }) => {
    // const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    const location = useLocation();

    if(isAuthenticated) return <Navigate to={redirect} state={{ from: location }} replace />

    return children ? children : <Outlet/>
};

export default ProtectedRoute;
