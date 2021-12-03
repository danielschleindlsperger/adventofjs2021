import { Cart, CartContextProvider } from './cart'
import { Menu } from './menu'

export function App() {
  return (
    <CartContextProvider>
      <div style={{ marginTop: '4rem', display: 'flex' }}>
        <Menu />

        <section>
          <h1>Your Cart</h1>
          <Cart />
        </section>
      </div>
    </CartContextProvider>
  )
}
