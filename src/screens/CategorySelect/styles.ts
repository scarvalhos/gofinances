import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import Feather from '@expo/vector-icons/Feather'
import { TouchableOpacity } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

interface CategoryProps {
  isActive: boolean
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(90)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`

export const Category = styled(TouchableOpacity)<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;
  transition: 0.1s;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.successLight : theme.colors.background};
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`

export const Separator = styled.View`
  height: 1.5px;
  width: 100%;
  background-color: #dddddd;
`

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`

export const RButton = styled(RectButton)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: 5px;
`

export const RButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 18px;
`
