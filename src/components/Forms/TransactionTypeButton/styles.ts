import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { RFValue } from 'react-native-responsive-fontsize'

interface Props {
  type: 'up' | 'down'
}

interface ContainerProps {
  type: 'up' | 'down'
  isActive: boolean
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({ isActive }) => (isActive ? 0 : '1.5px')};
  border-style: solid;
  border-color: #dddddd;
  border-radius: 5px;
  padding: 16px;
  transition: 0.2s;

  ${({ isActive, type }) =>
    isActive &&
    type === 'up' &&
    css`
      background-color: ${({ theme }) => theme.colors.successLight};
    `}
  ${({ isActive, type }) =>
    isActive &&
    type === 'down' &&
    css`
      background-color: ${({ theme }) => theme.colors.attentionLight};
    `}
`

export const Icon = styled(Feather)<Props>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`
