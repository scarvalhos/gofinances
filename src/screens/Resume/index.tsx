import React, { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { addMonths, subMonths, format } from 'date-fns'
import { ITransactionCardProps } from '@components/TransactionCard'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { HistoryCard } from '@components/HistoryCard'
import { categories } from '@utils/categories'
import { VictoryPie } from 'victory-native'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'
import { money } from '@utils/helpers'
import { ptBR } from 'date-fns/locale'

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from './styles'
import { useAuth } from '@hooks/useAuth'

interface CategoryData {
  key: string
  name: string
  total: string
  totalNumber: number
  color: string
  percent: string
}

export function Resume() {
  const [isLoading, setiIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme()
  const { user } = useAuth()

  const dataKey = `@gofinances:transactions_user:${user.id}`

  const handleDateChange = async (action: 'next' | 'prev') => {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  const loadData = async () => {
    setiIsLoading(true)
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expansives = responseFormatted.filter(
      (expansive: ITransactionCardProps) =>
        expansive.type === 'negative' &&
        new Date(expansive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expansive.date).getFullYear() === selectedDate.getFullYear()
    )

    const expansivesTotal = expansives.reduce(
      (acc: number, expensive: ITransactionCardProps) => {
        return acc + Number(expensive.amount)
      },
      0
    )

    const totalByCategory: CategoryData[] = []

    categories.forEach((category) => {
      let categorySum = 0

      expansives.forEach((expansive: ITransactionCardProps) => {
        if (expansive.category === category.key) {
          categorySum += Number(expansive.amount)
        }
      })

      if (categorySum > 0) {
        const percent = `${((categorySum / expansivesTotal) * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: money(categorySum),
          totalNumber: categorySum,
          color: category.color,
          percent,
        })
      }
    })
    setTotalByCategories(totalByCategory)
    setiIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [selectedDate])
  )

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.success} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: useBottomTabBarHeight(),
            paddingHorizontal: 24,
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>{format(selectedDate, 'MMM, yyyy', { locale: ptBR })}</Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x="percent"
              y="totalNumber"
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(16),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={60}
            />
          </ChartContainer>
          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  )
}
