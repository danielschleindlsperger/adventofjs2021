import { createContext, FunctionComponent } from 'preact'
import { useContext, useState } from 'preact/hooks'
import { useMenu } from './menu'
import { Price } from './price'

export const Cart = () => {
  const { cart } = useCart()
  const total = cartTotal(cart)
  if (cart.items.length === 0) return <div>Your cart is empty</div>
  return (
    <div>
      <CartList cart={cart} />
      <div className=" py-4 flex justify-end border-t-4 border-indigo-200">
        {/* TODO: maybe a grid layout might be better after all... */}
        <table className="text-right">
          <tr>
            <td className="pr-4">Subtotal: </td>
            <td>
              <Price price={total.subTotal} />
            </td>
          </tr>
          <tr>
            <td className="pr-4">Tax: </td>
            <td>
              <Price price={total.tax} />
            </td>
          </tr>
          <tr>
            <td className="pr-4">Total: </td>
            <td>
              <Price price={total.total} highlight />
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

const CartList = ({ cart }: { cart: CartState }) => {
  return (
    <ul>
      {cart.items.map((cartItem) => (
        <CartListItem {...cartItem} />
      ))}
    </ul>
  )
}

const CartListItem = ({ id, price, quantity }: CartItem) => {
  const menu = useMenu()
  const { decreaseItemQty, increaseItemQty, removeItemFromCart } = useCart()
  const total = price * quantity
  const menuItem = menu.find((x) => x.id === id)
  if (!menuItem) return null

  const { name, image } = menuItem

  return (
    <li key={id} className="flex gap-4 py-8 border-b border-indigo-200 last:border-b-0">
      <div className="self-start relative">
        <img src={image} className="w-20" />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="rounded-full bg-black text-white w-8 h-8 font-bold flex justify-center items-center">
            {quantity}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h2>{name}</h2>
          <Price price={price} small />
        </div>
        <div className="mt-2 flex gap-4 items-center">
          <ChevronButton direction="left" onClick={() => decreaseItemQty(id)} />
          <span className="font-bold">{quantity}</span>
          <ChevronButton direction="right" onClick={() => increaseItemQty(id)} />
          <Price price={total} />
        </div>

        {quantity === 0 ? (
          <button className="self-end" onClick={() => removeItemFromCart(id)}>
            Remove
          </button>
        ) : null}
      </div>
    </li>
  )
}

const ChevronButton: FunctionComponent<{ onClick?: () => void; direction: 'left' | 'right' }> = ({
  direction,
  onClick,
}) => {
  return (
    <button onClick={onClick} className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold">
      {direction === 'left' ? '<' : '>'}
    </button>
  )
}

// Only require the id and price to be set in the cart
// The id can be used to resolve all other menu item properties, while the price needs to be fixed
// since that's what we promised the user when they added it to the cart.
type CartItem = { id: string; price: number; quantity: number }
type CartState = {
  items: CartItem[]
}

const CartContext = createContext<{ cart: CartState; setCart: (cartState: CartState) => void }>({
  cart: { items: [] },
  setCart: () => {},
})
CartContext.displayName = 'CartContext'

export const CartContextProvider: FunctionComponent = ({ children }) => {
  const [cart, setCart] = useState<CartState>({ items: [] })
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext)

  const addItemToCart = (id: string, price: number) => {
    setCart({ ...cart, items: cart.items.concat({ id, price, quantity: 1 }) })
  }
  const removeItemFromCart = (id: string) => {
    const newCartItems = cart.items.filter((cartItem) => cartItem.id !== id)
    setCart({ ...cart, items: newCartItems })
  }

  const increaseItemQty = (id: string) => {
    const newCartItems = cart.items.map((cartItem) =>
      cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
    )
    setCart({ ...cart, items: newCartItems })
  }
  const decreaseItemQty = (id: string) => {
    const newCartItems = cart.items.map((cartItem) =>
      cartItem.id === id ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) } : cartItem,
    )
    setCart({ ...cart, items: newCartItems })
  }

  return { cart, addItemToCart, removeItemFromCart, increaseItemQty, decreaseItemQty }
}

const TAX_RATE = 0.0975

const cartTotal = (cart: CartState) => {
  const subTotal = cart.items.reduce((st, item) => st + item.quantity * item.price, 0)
  const tax = subTotal * TAX_RATE
  const total = subTotal + tax
  return { subTotal, tax, total }
}

export const itemIsInCart = (itemId: string, cart: CartState): boolean =>
  !!cart.items.find((cartItem) => cartItem.id === itemId)
