import React, { useState, createContext } from 'react'
import { api } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [tutors, setTutors] = useState([])
  // const [children_teenagers, setChildren_Teenagers] = useState([])


  const [results, setResults] = useState([])

  const login = async (cpf, password) => {
    const response = await api.post('/v2/users/login/', { cpf, password })

    if (response?.status === 200) {
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      console.log("This is the awnser",response.data)
      return true
    }
    return false
  }

  const registerSearcher = async (name, email, cpf, institution, role) => {
    const response = await api.post('v2/researchers/', { name, email, cpf, institution, role })
    const data = response?.data
    if (data?.name === name && data?.email === email) {
      return true
    }
    return false
  }

  // const getTutors = async () => {
  //   const response = await api.get('/v2/tutors/', {
  //     headers: {
  //       Authorization: `Token ${user.token}`,
  //     },
  //     params: { page: 7 },
  //   })
  //   // console.log('These are tutors', response)
  //   setTutors(response)
  // }

  // const getChildren = async () => {
  //   const response = await api.get('/v2/children/', {
  //     headers: {
  //       Authorization: `Token ${user.token}`,
  //     },
  //     params: { page: 3 },
  //   })
  //   // console.log('These are children', response)
  //   setChildren_Teenagers(response)
  // }

  const getResults = async () => {
    if (user) {
      const valuesResults = []
      for (let interator = 0; interator <= 800; interator++) {
        try {
          const response = await api.get(`/v2/results/`, {
            headers: {
              Authorization: `Token ${user.token}`,
            },
            params: { user: interator },
          })
          let catchTheValue = response.data
          console.log(`This is catchValues de numero ${interator}`)
          console.log('Value: ', catchTheValue)
          console.log(' ')
          if (catchTheValue.length) {
            valuesResults.push(catchTheValue)
          }
        } catch (error) {}
      }

      const finalResults = valuesResults.map(value => { return value.filter(item => item.exam !== null) })
      console.log('This is the results')
      console.log(valuesResults)
      setResults(finalResults)
      setLoading(false)
    }

  }

  const getQuestionario = async (idQuest) => {
    const response = await api.get(`/v2/results/${idQuest}`, {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    })
    console.log(`The questionario:`)
    console.log(response.data)
    return response?.data?.result_answers
  }

  const getExams = async () => {
    const response = await api.get('/v2/exams/', {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    })
    console.log('These are exams', response)
    // setTutors(response)
  }

  const logout = () => {
    console.log('logout')
    localStorage.removeItem('user')
    setUser(null)
  }
  getExams()

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout, registerSearcher, getResults, results, getQuestionario }}
    >
      {children}
    </AuthContext.Provider>
  )
}
