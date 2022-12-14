import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { auth } from '../config/firebase'

interface IPrivateRoute {
    children: JSX.Element
}
const PrivateRoute = ({ children }: IPrivateRoute) => {
    const [user] = useAuthState(auth)

    if (!user) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }

    // authorized so return child components
    return children;
}

export default PrivateRoute