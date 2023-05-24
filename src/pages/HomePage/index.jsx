import React from 'react'

import Header from '../../components/header'
import TableInfo from '../../components/table-info'

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <TableInfo />
    </div>
  )
}

export default HomePage
