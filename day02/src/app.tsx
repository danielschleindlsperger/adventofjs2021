import { FunctionComponent } from 'preact'
import { Cart, CartContextProvider } from './cart'
import { Menu } from './menu'

export function App() {
  return (
    <CartContextProvider>
      <div className="bg-indigo-50 w-full flex justify-center">
        <div className="mt-20 max-w-full grid grid-cols-2 gap-12" style={{ width: '50rem' }}>
          <Card title="To Go Menu">
            <Menu />
          </Card>
          <Card title="Your Cart">
            <Cart />
          </Card>
        </div>
      </div>
    </CartContextProvider>
  )
}

const Card: FunctionComponent<{ title: string }> = ({ title, children }) => {
  return (
    <section className="bg-white rounded-3xl px-8 py-12 filter drop-shadow-xl overflow-x-hidden overflow-y-auto">
      <h1 className="text-2xl font-bold text-black">{title}</h1>
      <div className="mt-8">{children}</div>
    </section>
  )
}
