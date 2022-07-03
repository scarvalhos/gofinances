import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import { HighlightCard } from '../../components/HighLightCard'
import {
  TransactionCard,
  ITransactionCardProps,
} from '../../components/TransactionCard'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  TransactionsList,
  Title,
} from './styles'

export interface DataListTransactionsProps extends ITransactionCardProps {
  id: string
}

const dataKey = '@gofinances:transactions'

export function Dashboard() {
  const [data, setData] = useState<DataListTransactionsProps[]>([])

  const loadTransactions = async () => {
    // await AsyncStorage.removeItem(dataKey)
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    const transactionsFormatted: DataListTransactionsProps[] = transactions.map(
      (item: DataListTransactionsProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date))

        return {
          id: item.id,
          type: item.type,
          name: item.name,
          category: item.category,
          amount,
          date,
        }
      }
    )

    setData(transactionsFormatted)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, [])
  )

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/scarvalhos.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Samara</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 19 de Julho"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 19 de Julho"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 19 de Julho"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ marginBottom: 16 }} />}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => <TransactionCard data={item.item} />}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </Transactions>
    </Container>
  )
}
