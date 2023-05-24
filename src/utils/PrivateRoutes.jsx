import React from "react"
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes = () => {
  let currentUser = JSON.parse(localStorage.getItem('user'))

  return (
    currentUser?.token ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes
