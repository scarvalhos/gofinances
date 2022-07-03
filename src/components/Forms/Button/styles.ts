import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'

export const RButton = styled(RectButton)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: 5px;
`

export const Container = styled(TouchableOpacity)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 18px;
`

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
`
