import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const ProtectedRoute = ({ element: Element, ...rest }) => {

    const firebase = useFirebase();

    const isLoggedIn = firebase.isLoggedIn;

    return isLoggedIn ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
