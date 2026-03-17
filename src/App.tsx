import { LoginForm } from './components/auth/LoginForm'
import { ProductTable } from './components/products/ProductTable'
import './App.css'

function App() {

  const isLogin = false

  return (
    <>
      { isLogin ? <LoginForm /> : <ProductTable /> }
    </>
  )
}

export default App
