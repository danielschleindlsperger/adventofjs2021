import { createContext, FunctionComponent } from 'preact'
import { useContext, useState } from 'preact/hooks'
import { useMenu } from './menu'

export const Cart = () => {
  const { cart } = useCart()
  const total = cartTotal(cart)
  if (cart.items.length === 0) return <div>Your cart is empty</div>
  return (
    <div>
      <CartList cart={cart} />
      <div>
        <div>Subtotal: {total.subTotal.toFixed(2)}</div>
        <div>Tax: {total.tax.toFixed(2)}</div>
        <div>Total: {total.total.toFixed(2)}</div>
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
  const total = (price * quantity).toFixed(2)
  const menuItem = menu.find((x) => x.id === id)
  if (!menuItem) return null

  const { name, image } = menuItem

  return (
    <li key={id}>
      <div>
        <div>
          <img src={image} />
          {quantity}
        </div>
        {name}
      </div>
      <div>
        {quantity === 0 ? <button onClick={() => removeItemFromCart(id)}>Remove</button> : null}
        <button onClick={() => decreaseItemQty(id)}>{'<'}</button>
        <span>{quantity}</span>
        <button onClick={() => increaseItemQty(id)}>{'>'}</button>- ${total}
      </div>
    </li>
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

const INITIAL_STATE_FOR_TESTING = [
  {
    id: '1',
    quantity: 2,
    price: 12.3,
  },
]

export const CartContextProvider: FunctionComponent = ({ children }) => {
  const [cart, setCart] = useState<CartState>({ items: INITIAL_STATE_FOR_TESTING })
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
