import React, { useState } from 'react'

import GoogleIcon from '@assets/google.svg'
import AppleIcon from '@assets/apple.svg'
import LogoIcon from '@assets/logo.svg'

import { ActivityIndicator, Alert, Platform } from 'react-native'
import { SignInSocialButton } from '@components/SignInSocialButton'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAuth } from 'src/hooks/useAuth'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
  FooterWrapper,
  LoadContainer,
} from './styles'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle, signInWithApple } = useAuth()

  const theme = useTheme()

  const handleSignInWithGoogle = async () => {
    setIsLoading(true)
    try {
      return await signInWithGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google')
      setIsLoading(false)
    }
  }

  const handleSignInWithApple = async () => {
    setIsLoading(true)
    try {
      return await signInWithApple()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Apple')
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoIcon width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SigninTitle>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SigninTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            svg={GoogleIcon}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              svg={AppleIcon}
              title="Entrar com Apple"
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>
        {isLoading && (
          <LoadContainer>
            <ActivityIndicator color={theme.colors.success} size="large" />
          </LoadContainer>
        )}
      </Footer>
    </Container>
  )
}
