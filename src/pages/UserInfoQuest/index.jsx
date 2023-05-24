import React from 'react'

import Header from '../../components/header'

import './styles.css'

const UserInfo = () => {
  const person  = JSON.parse(localStorage.getItem('person'))
  const questionaries = JSON.parse(localStorage.getItem('questionaries'))
  setTimeout(() => {
    localStorage.removeItem('person')
    localStorage.removeItem('questionaries')
  }, 2000)
  console.log('Person =========>', person)
  console.log('Questionaries ==========>', questionaries)

  return questionaries?.length !== 0 && (
    <>
      <Header />
      <div className="containerUserInfo">
        <h1 className="nameOfPerson">
          Nome:
          {person?.nameChild === 'Familia'
            ? ` ${person?.nameChild} de ${person?.nameTutor}`
            : ` ${person?.nameChild}`}
        </h1>
        {questionaries?.map((questionary) => {
          return (
            <div class="containerQuestionaries">
              <table>
                <thead>
                  <tr className="cabecalho">
                    <td colSpan="2">
                      <h2 className="titleOfQuestionary">{questionary.exam.description}: </h2>
                    </td>
                  </tr>
                  <tr>
                    <td key={'question'} class="cabecalho">
                      Pergunta
                    </td>
                    <td key={'answer'} class="cabecalho">
                      Resposta
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {questionary.result_answers?.map((quest) => {
                    return (
                      <tr>
                        <td className="cellOfTable">{quest.question?.title}</td>
                        <td className="cellOfTable">{quest.answer?.title || quest.answer}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default UserInfo
