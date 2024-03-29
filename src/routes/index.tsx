import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useAuth } from '@hooks/useAuth'

export const Routes = () => {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
