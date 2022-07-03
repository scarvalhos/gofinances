import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Container, Category, Icon } from './styles'

interface CategorySelectProps extends TouchableOpacityProps {
  title: string
}

export const CategorySelectButton: React.FC<CategorySelectProps> = ({
  title,
  ...rest
}) => {
  return (
    <Container {...rest} activeOpacity={0.7}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}
