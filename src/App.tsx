import 'react-native-gesture-handler'
import React from 'react'
import * as SplashScreen from 'expo-splash-screen'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './contexts/AuthContext'
import { StatusBar } from 'expo-status-bar'
import { Routes } from './routes'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import theme from './config/styles/theme'

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { useAuth } from '@hooks/useAuth'

export default function App() {
  SplashScreen.preventAutoHideAsync()
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  const { isLoading } = useAuth()

  if (!fontsLoaded || isLoading) {
    return null
  }

  SplashScreen.hideAsync()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

