/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import InputMask from 'react-input-mask'

import { AuthContext } from '../../contexts/auth'

import './styles.css'

let imagem_projetocomvida = require('../../assets/comvida-pessoa.png')

const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [isOpenErrorMessage, setIsOpenErrorMessage] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    let confirmLogin = await login(cpf, password)
    if (confirmLogin) {
      navigate('/')
    } else {
      setIsOpenErrorMessage(true)
      setTimeout(() => {
        setIsOpenErrorMessage(false)
      }, 7000)
    }
  }

  return (
    <div id="login">
      <h1 className="title">Login do Sistema</h1>
      <h1 className="subtitle">Projeto ComVida</h1>
      <form className="form" onSubmit={handleSubmit}>
        <img src={imagem_projetocomvida} />
        <div className="field">
          <label htmlFor="email">CPF</label>
          <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="register">
          Ainda não é cadastrado?{' '}
          <Link to="/register" style={{ color: 'white' }}>
            Me cadastrar
          </Link>
        </div>
        <div className="actions">
          <button className="button-submit" type="submit">
            Entrar
          </button>
        </div>
      </form>
      {isOpenErrorMessage && (
        <>
          <div class="overlay" />
          <div class="modal">
            <main id="modal__main">
              <h1>Login invalido</h1>
              <p>Confira se você digitou o CPF e a senha certos</p>
            </main>
          </div>
        </>
      )}
    </div>
  )
}

export default LoginPage
