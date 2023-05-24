/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'

import { AuthContext } from '../../contexts/auth'

import './styles.css'

let imagem_projetocomvida = require('../../assets/comvida-pessoa.png')

const RegisterPage = () => {
  const { registerSearcher } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [institution, setInstitution] = useState('')
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [isOpenThankfulModal, setIsOpenThankfulModal] = useState(false)
  const [isOpenErrorMessage, setIsOpenErrorMessage] = useState(false)
  const navigate = useNavigate()

  const handleOnClick = async (event) => {
    event.preventDefault()
    const result = await registerSearcher(name, email, cpf, institution, role)
    if (result) {
      setIsOpenThankfulModal(true)
      setTimeout(() => {
        setIsOpenThankfulModal(false)
        navigate('/login')
      }, 7000)
    } else {
      setIsOpenErrorMessage(true)
      setTimeout(() => {
        setIsOpenErrorMessage(false)
      }, 7000)
    }
  }

  return (
    <div id="login">
      <h1 className="title">Bem vindo ao cadastro</h1>
      <h1 className="subtitle">Projeto Com Vida</h1>
      <form className="form">
        <img src={imagem_projetocomvida} />
        <div className="field">
          <label htmlFor="text">Nome</label>
          <input
            type="text"
            name="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="field"></div>
        <div className="field">
          <label htmlFor="text">CPF</label>
          <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="text">Instituição</label>
          <input
            type="text"
            name="institution"
            id="institution"
            value={institution}
            onChange={(event) => setInstitution(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="text">Função</label>
          <input
            type="text"
            name="role"
            id="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          />
        </div>
        <div className="actions">
          <button className="button-submit" onClick={handleOnClick}>
            Cadastrar
          </button>
        </div>
      </form>
      {isOpenThankfulModal && (
        <>
          <div className="overlay" />
          <div className="modal">
            <main className="modal__main">
              <h1>Obrigado!!</h1>
              <p>Cadastro feito com sucesso!!</p>
              <p>
                Em seu primeiro acesso, a senha é o seu CPF. Caso queira altera é só clicar na opção
                "Mudar Senha" no menu
              </p>
            </main>
          </div>
        </>
      )}
      {isOpenErrorMessage && (
        <>
          <div className="overlay" />
          <div className="modal">
            <main className="modal__main">
              <h1>Opa!!!</h1>
              <p>
                Cadastro não realizado com sucesso!! Verifique se preencheu todos os dados da forma
                correta
              </p>
            </main>
          </div>
        </>
      )}
    </div>
  )
}

export default RegisterPage
