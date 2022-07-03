import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { Container, RButton, Title } from './styles'

interface ButtonProps extends RectButtonProps {
  title: string
  onPress: () => void
}

export const SelectButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  ...rest
}) => {
  return (
    <RButton {...rest}>
      <Container onPress={onPress} activeOpacity={1}>
        <Title>{title}</Title>
      </Container>
    </RButton>
  )
}
