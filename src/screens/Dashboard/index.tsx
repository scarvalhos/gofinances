import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { View, ActivityIndicator } from 'react-native'
import { dateFormated, money } from '@utils/helpers'
import { useFocusEffect } from '@react-navigation/native'
import { HighlightCard } from '@components/HighLightCard'
import { useTheme } from 'styled-components'
import { useAuth } from '@hooks/useAuth'

import {
  TransactionCard,
  ITransactionCardProps,
} from '@components/TransactionCard'

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
  LoadContainer,
} from './styles'

export interface DataListTransactionsProps extends ITransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListTransactionsProps[]>(
    []
  )
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  )

  const theme = useTheme()
  const { signOut, user } = useAuth()

  const dataKey = `@gofinances:transactions_user:${user.id}`

  const getLastTransactionDate = (
    collection: DataListTransactionsProps[],
    type: 'positive' | 'negative'
  ) => {
    const collectionFilttered = collection.filter(
      (transaction) => transaction.type === type
    )
    if (collectionFilttered.length === 0) {
      return 0
    }

    return dateFormated(
      Math.max.apply(
        Math,
        collectionFilttered.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      ),
      'long',
      false
    )
  }

  const loadTransactions = async () => {
    // await AsyncStorage.removeItem(dataKey)
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: DataListTransactionsProps[] = transactions.map(
      (item: DataListTransactionsProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

        const amount = money(item.amount)

        const date = dateFormated(item.date, 'digit', true)

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

    setTransactions(transactionsFormatted)

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      'positive'
    )

    const lastTransactionExpansives = getLastTransactionDate(
      transactions,
      'negative'
    )

    const totalInterval =
      lastTransactionExpansives === 0
        ? 'Não há transações'
        : `01 à ${lastTransactionExpansives}`

    setHighlightData({
      entries: {
        amount: money(entriesTotal),
        lastTransaction:
          lastTransactionEntries === 0
            ? 'Não há transações'
            : `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: money(expensiveTotal),
        lastTransaction:
          lastTransactionExpansives === 0
            ? 'Não há transações'
            : `Última saída dia ${lastTransactionExpansives}`,
      },
      total: {
        amount: money(entriesTotal - expensiveTotal),
        lastTransaction: totalInterval,
      },
    })
    setIsLoading(false)
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
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.success} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.avatar }} />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => (
                <View style={{ marginBottom: 16 }} />
              )}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => <TransactionCard data={item.item} />}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
            />
          </Transactions>
        </>
      )}
    </Container>
  )
}
