import React, { useContext } from 'react'
import { BrowserRouter as Routers, Route, Routes, Navigate } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage'
import UserInfo from '../pages/UserInfoQuest'
import PrivateRoutes from './PrivateRoutes'

import { AuthProvider } from '../contexts/auth'

const AppRoutes = () => {
  return (
    <Routers>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/user-info-questionary" element={<UserInfo />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Routers>
  )
}

export default AppRoutes
