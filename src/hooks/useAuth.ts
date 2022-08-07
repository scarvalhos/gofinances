import { useContext } from 'react'
import { AuthContext } from 'src/contexts/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
