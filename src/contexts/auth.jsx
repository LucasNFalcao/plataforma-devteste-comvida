import React, { useState, createContext } from 'react'
import { api } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [finishedTutors, setFinishedTutors] = useState(false)
  const [finishedChildren, setFinishedChildren] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tutors, setTutors] = useState([])
  const [exams, setExams] = useState([])
  const [childrenTeen, setChildrenTeen] = useState([])
  const [quantityTutors, setQuantityTutors] = useState(0)
  const [quantityChildren, setQuantityChildren] = useState(0)
  const [results, setResults] = useState([])
  const [isOpenQuestionaryModal, setIsOpenQuestionaryModal] = useState(false)
  const [isChangePassword, setIsChangePassword] = useState(false)

  const login = async (cpf, password) => {
    const response = await api.post('/v2/users/login/', { cpf, password })
    if (response?.status === 200) {
      setLoading(true)
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      await getQuantityTutors(response.data?.token)
      await getQuantityChildren(response.data?.token)
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

  const getQuantityTutors = async (token) => {
    const response = await api.get('/v2/tutors/', {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { page: 1 },
    })

    if (response?.data.count % 10 === 0) {
      setQuantityTutors(response?.data.count / 10)
    } else {
      setQuantityTutors(Math.floor(response?.data.count / 10) + 1)
    }
  }

  const getTutorsFromApi = async (page) => {
    const response = await api.get('/v2/tutors/', {
      headers: {
        Authorization: `Token ${user?.token}`,
      },
      params: { page: page },
    })
    return response?.data.results
  }

  // const changePassword = async ({password, newPassword}) => {
  //   console.log('response')
  //   const response = await api.post('/v2/users/change_password/', {
  //     headers: {
  //       Authorization: `Token ${user?.token}`,
  //     },
  //     body: { password, confirm_password: newPassword },
  //   })
  //   return response
  // }

  const setTutorsFiltered = async () => {
    const listOfTutors = []
    let tutorsFromResponse = null
    let count = 1
    while (count <= quantityTutors) {
      tutorsFromResponse = await getTutorsFromApi(count)
      listOfTutors.push(...tutorsFromResponse)
      count += 1
    }

    const filteredTutors = []
    filteredTutors.push({ tutor: listOfTutors[0], children: [{ name: 'Familia' }] })
    count = 1

    while (count < listOfTutors.length) {
      if (
        !verifyIfContains(filteredTutors, listOfTutors[count]) &&
        listOfTutors[count].user !== null
      ) {
        filteredTutors.push({ tutor: listOfTutors[count], children: [{ name: 'Familia' }] })
      }
      count += 1
    }

    setTutors(filteredTutors)
    setFinishedTutors(true)
  }

  const verifyIfContains = (array, value) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i]?.tutor?.user === value.user) {
        return true
      }
    }
    return false
  }

  const verifyIfContainsSameChild = (array, value) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === value.id) {
        return true
      }
    }
    return false
  }

  const getQuantityChildren = async (token) => {
    const response = await api.get('/v2/children/', {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { page: 1 },
    })

    if (response?.data.count % 10 === 0) {
      setQuantityChildren(response?.data.count / 10)
    } else {
      setQuantityChildren(Math.floor(response?.data.count / 10) + 1)
    }
  }

  const getChildrenFromApi = async (page) => {
    const response = await api.get('/v2/children/', {
      headers: {
        Authorization: `Token ${user?.token}`,
      },
      params: { page: page },
    })

    return response?.data.results
  }

  const setChildrenTeenFiltered = async () => {
    const listOfChildren = []
    let childrenFromResponse = null
    let count = 1
    while (count <= quantityChildren) {
      childrenFromResponse = await getChildrenFromApi(count)
      listOfChildren.push(...childrenFromResponse)
      count += 1
    }

    const filteredChildren = []
    filteredChildren.push(listOfChildren[0])
    count = 1

    while (count < listOfChildren.length) {
      if (
        !verifyIfContainsSameChild(filteredChildren, listOfChildren[count]) &&
        listOfChildren[count].user !== null
      ) {
        filteredChildren.push(listOfChildren[count])
      }
      count += 1
    }

    setChildrenTeen(filteredChildren)
    setFinishedChildren(true)
  }

  const getResults = async (userId) => {
    try {
      const response = await api.get(`/v2/results/`, {
        headers: {
          Authorization: `Token ${user?.token}`,
        },
        params: { user: userId },
      })
      // console.log('response', response)
      let catchTheValue = response.data
      // console.log('catchTheValue', catchTheValue)
      const finalResults = catchTheValue?.filter((item) => item.exam !== null)
      // console.log('finalResults', finalResults)
      return finalResults
    } catch (error) {}
  }

  const getQuestionario = async (idQuest) => {
    const response = await api.get(`/v2/results/${idQuest}`, {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    })
    return response?.data
  }

  const getExams = async () => {
    const listExams = []
    if (user) {
      const response = await api.get('/v2/exams/', {
        headers: {
          Authorization: `Token ${user?.token}`,
        },
      })
      response.data.map((question) => listExams.push(question))
      setExams(listExams)
    }
  }

  const logout = () => {
    console.log('logout')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        getExams,
        tutors,
        childrenTeen,
        finishedChildren,
        finishedTutors,
        quantityChildren,
        quantityTutors,
        getQuestionario,
        getResults,
        setFinishedChildren,
        setFinishedTutors,
        setLoading,
        setTutorsFiltered,
        setChildrenTeenFiltered,
        login,
        logout,
        registerSearcher,
        isOpenQuestionaryModal,
        setIsOpenQuestionaryModal,
        exams,
        results,
        isChangePassword,
        setIsChangePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
