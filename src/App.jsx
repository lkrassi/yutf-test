import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import { loadProducts } from './store/productsSlice'
import { loadUser } from './store/userSlice'
import './App.css'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProducts())
    dispatch(loadUser())
  }, [dispatch])

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <ProductList />
        <Cart />
      </div>
    </div>
  )
}
