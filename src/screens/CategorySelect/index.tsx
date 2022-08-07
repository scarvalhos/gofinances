import React from 'react'
import { FlatList } from 'react-native'
import { SelectButton } from '@components/Forms/SelectButton'
import { categories } from '@utils/categories'
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles'

interface Category {
  key: string
  name: string
}

interface CategorySelectProps {
  category: Category
  setCategory: (category: Category) => void
  closeSelectCategory: () => void
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  const handleCategorySelect = (item: Category) => {
    setCategory(item)
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        style={{ flex: 1, width: '100%' }}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
            activeOpacity={1}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <SelectButton
          title="Selecionar"
          onPress={closeSelectCategory}
          activeOpacity={0.8}
        />
      </Footer>
    </Container>
  )
}
