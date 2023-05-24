import React, { useContext } from 'react'
import { BrowserRouter as Routers, Route, Routes, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'

import { AuthProvider, AuthContext } from './contexts/auth'

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext)

    // if (loading) {
    //   return <div className="loading">Carregando...</div>
    // }

    if (!authenticated) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <Routers>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route
            exact
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Routers>
  )
}

export default AppRoutes
