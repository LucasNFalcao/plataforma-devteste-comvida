/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react'

import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

import './styles.css'

let logo_projetocomvida = require('../../assets/logo-comvida.png')

const Header = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleClickHomePage = () => {
    navigate('/')
  }

  return (
    <div id="container-header">
      <button className="logo-title" onClick={handleClickHomePage}>
        <img width={50} height={50} className="logo-photo" src={logo_projetocomvida} />
        Home Page
      </button>
      <div>
        <button className="header-button" onClick={handleLogout}>
          Minhas Consultas
        </button>
        <button className="header-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
