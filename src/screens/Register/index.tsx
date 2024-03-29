import React, { useCallback, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import * as Yup from 'yup'

import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Modal, Keyboard, Alert } from 'react-native'
import { TransactionTypeButton } from '@components/Forms/TransactionTypeButton'
import { CategorySelectButton } from '@components/Forms/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputForm } from '@components/Forms/InputForm'
import { useForm } from 'react-hook-form'
import { Button } from '@components/Forms/Button'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'
import { useAuth } from '@hooks/useAuth'

interface FormData {
  name: string
  amount: string
}

type NavigationProps = {
  navigate: (screen: string) => void
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
})

export const Register = () => {
  const { user } = useAuth()
  const dataKey = `@gofinances:transactions_user:${user.id}`

  const navigation = useNavigation<NavigationProps>()

  const [transactionType, setTransactionType] = useState<string | undefined>()
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema) })

  const handleTransactionTypeSelect = (type: 'positive' | 'negative') => {
    setTransactionType(type)
  }

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true)
  }

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false)
  }

  const handleRegister = useCallback(
    async (form: FormData) => {
      if (!transactionType) return Alert.alert('Selecione o tipo da transação')

      if (category.key === 'category')
        return Alert.alert('Selecione a categoria')

      const newTransaction = {
        id: String(uuid.v4()),
        name: form.name,
        amount: form.amount,
        type: transactionType,
        category: category.key,
        date: new Date(),
      }

      try {
        const data = await AsyncStorage.getItem(dataKey)
        const currentData = data ? JSON.parse(data) : []

        const dataFormatted = [...currentData, newTransaction]

        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

        reset()
        setTransactionType('')
        setCategory({ key: 'category', name: 'Categoria' })

        navigation.navigate('Listagem')
      } catch (error) {
        console.log(error)
        Alert.alert('Não foi possível cadastrar essa transação')
      }
    },
    [transactionType, category]
  )

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{ flex: 1 }}
      containerStyle={{ flex: 1 }}
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              placeholder="Nome"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              placeholder="Preço"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                isActive={transactionType === 'positive'}
                onPress={() => handleTransactionTypeSelect('positive')}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                isActive={transactionType === 'negative'}
                onPress={() => handleTransactionTypeSelect('negative')}
              />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button
            title="Enviar"
            activeOpacity={0.8}
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
