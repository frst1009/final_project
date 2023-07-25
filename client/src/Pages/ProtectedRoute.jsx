import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { loggedIn } = useContext(AuthContext)

  return (
    <>
      {loggedIn ? children : <Navigate to={'/login'} />}
    </>
  )
}

export default ProtectedRoute