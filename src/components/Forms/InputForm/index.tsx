import React from 'react'
import { TextInputProps } from 'react-native'
import {
  Control,
  Controller,
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form'
import { Input } from '../Input'
import { Container, Error } from './styles'

interface InputFormProps extends TextInputProps {
  control: Control
  name: string
  error: Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>>
}

export const InputForm: React.FC<InputFormProps> = ({
  control,
  name,
  error,
  ...rest
}) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  )
}
