import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProducts, selectProductsLoading } from '../store/productsSlice'
import ProductCard from './ProductCard'

export default function ProductList() {
  const products = useSelector(selectProducts)
  const loading = useSelector(selectProductsLoading)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'price') return a.price - b.price
        return 0
      })
  }, [products, searchTerm, selectedCategory, sortBy])

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>
  }

  return (
    <div className="product-list">
      <div className="filters">
        <div className="search">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="filter-controls">
          {showFilters && (
            <>
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
                <option value="all">Все категории</option>
                <option value="phones">Телефоны</option>
                <option value="laptops">Ноутбуки</option>
                <option value="tablets">Планшеты</option>
              </select>

              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="name">По названию</option>
                <option value="price">По цене</option>
              </select>
            </>
          )}

          <button onClick={() => setShowFilters((open) => !open)}>
            {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>
        </div>
      </div>

      <div className="products">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
