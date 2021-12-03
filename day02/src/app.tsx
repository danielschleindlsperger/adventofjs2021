import { FunctionComponent } from 'preact'
import { Cart, CartContextProvider } from './cart'
import { Menu } from './menu'

export function App() {
  return (
    <CartContextProvider>
      <div className="bg-indigo-50 w-full min-h-0 flex flex-col items-start">
        <div
          className="mx-auto py-20 flex-1 self-stretch max-w-full grid grid-cols-2 gap-12"
          style={{ width: '50rem' }}
        >
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
