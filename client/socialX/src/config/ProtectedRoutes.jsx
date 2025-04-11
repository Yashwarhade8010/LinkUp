import React from 'react'
import useUserStore from '../stores/userStore'

import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const isAuthenticated = useUserStore((state)=>state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to={"/signin"}/>
}

export default ProtectedRoutes
