import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Container, Icon, Title } from './styles'

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  type: 'up' | 'down'
  title: 'Income' | 'Outcome'
  isActive: boolean
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

export const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  type,
  title,
  isActive,
  ...rest
}) => {
  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  )
}
