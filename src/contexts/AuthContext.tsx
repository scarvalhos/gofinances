import { createContext, ReactNode, useEffect, useState } from 'react'
import * as AppleAuthentication from 'expo-apple-authentication'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextData {
  user: User
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  signOut: () => Promise<void>
}

interface AuthorizationResponse {
  params: {
    access_token: string
  }
  type: string
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User)
  const [isLoading, setIsLoading] = useState(true)

  const storageKey = '@gofinances:user'

  const signInWithGoogle = async () => {
    try {
      const CLIENT_ID = process.env.CLIENT_ID
      const REDIRECT_URI = process.env.REDIRECT_URI
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        )

        const userInfo = await response.json()

        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          avatar: userInfo.picture,
        }

        setUser(userLogged)

        await AsyncStorage.setItem(storageKey, JSON.stringify(userLogged))
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      if (credential) {
        const name = credential.fullName?.givenName!
        const userLogged = {
          id: credential.user,
          name,
          email: credential.email!,
          avatar: `https://ui-avatars.com/api/?name=${name}&length=1`,
        }

        setUser(userLogged)

        await AsyncStorage.setItem(storageKey, JSON.stringify(userLogged))
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const signOut = async () => {
    setUser({} as User)
    await AsyncStorage.removeItem(storageKey)
  }

  useEffect(() => {
    const loadUserStorageData = async () => {
      const data = await AsyncStorage.getItem(storageKey)

      if (data) {
        const userLogged = JSON.parse(data) as User
        setUser(userLogged)
      }

      setIsLoading(false)
    }

    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signInWithGoogle, signInWithApple, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
