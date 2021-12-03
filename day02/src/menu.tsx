import { itemIsInCart, useCart } from './cart'

type MenuEntry = {
  id: string
  name: string
  price: number
  image: string
}

export type Menu = MenuEntry[]

export const useMenu = () => menu

export const Menu = () => {
  const { cart, addItemToCart } = useCart()
  return (
    <section>
      <h1>To Go Menu</h1>
      <ul>
        {menu.map((menuItem) => (
          <li key={menuItem.id}>
            <img src={menuItem.image} />
            <div>
              <span>{menuItem.name}</span>
              <span>${menuItem.price}</span>
              {itemIsInCart(menuItem.id, cart) ? (
                <button>In Cart</button>
              ) : (
                <button onClick={() => addItemToCart(menuItem.id, menuItem.price)}>
                  Add to Cart
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

const menu: Menu = [
  {
    id: '1',
    name: 'French Fries with Ketchup',
    price: 2.23,
    image: '/images/plate__french-fries.png',
  },
  {
    id: '2',
    name: 'Salmon and Vegetables',
    price: 5.12,
    image: '/images/plate__salmon-vegetables.png',
  },

  {
    id: '3',
    name: 'Spaghetti with Meat Sauce',
    price: 7.82,
    image: '/images/plate__spaghetti-meat-sauce.png',
  },

  {
    id: '4',
    name: 'Bacon and Eggs',
    price: 4.5,
    image: '/images/plate__bacon-eggs.png',
  },
  {
    id: '5',
    name: 'Fishsticks and Fries',
    price: 4.3,
    image: '/images/plate__fish-sticks-fries.png',
  },
  {
    id: '6',
    name: 'Chicken Salad',
    price: 6.9,
    image: '/images/plate__chicken-salad.png',
  },
  {
    id: '7',
    name: 'Ravioli',
    price: 2.99,
    image: '/images/plate__ravioli.png',
  },
  {
    id: '8',
    name: 'Tortellini',
    price: 4.5,
    image: '/images/plate__tortellini.png',
  },
]
