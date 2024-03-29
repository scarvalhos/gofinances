import React from 'react'
import { categories } from '@utils/categories'
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles'

export interface ITransactionCardProps {
  id: string
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

export interface Props {
  data: ITransactionCardProps
}

export const TransactionCard: React.FC<Props> = ({ data }) => {
  const [category] = categories.filter((item) => item.key === data.category)

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
