import { FunctionComponent } from 'preact'
import { itemIsInCart, useCart } from './cart'
import { Price } from './price'

type MenuEntry = {
  id: string
  name: string
  price: number
  image: string
}

export type Menu = MenuEntry[]

export const useMenu = () => menu

export const Menu = () => {
  return (
    <ul className="flex flex-col gap-8">
      {menu.map((menuItem, idx) => (
        <MenuListEntry {...menuItem} index={idx} />
      ))}
    </ul>
  )
}

const MenuListEntry = ({ id, name, image, price, index }: MenuEntry & { index: number }) => {
  const { cart, addItemToCart } = useCart()
  const isAlreadyInCart = itemIsInCart(id, cart)
  const colors = [
    'bg-blue-100',
    'bg-red-100',
    'bg-gray-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-indigo-100',
    'bg-pink-100',
  ]
  const color = colors[index % colors.length]
  return (
    <li key={id} className={cx(color, 'flex rounded-l-2xl -mr-8')}>
      <img src={image} className="h-40 block flex-grow-0 -ml-6 -mt-6" />
      <div className="flex flex-col justify-between gap-2 px-2 py-4 pb-0">
        <h2 className="text-black">{name}</h2>
        <Price price={price} />
        <div className="transform translate-y-1/2">
          {isAlreadyInCart ? (
            <Button>In Cart</Button>
          ) : (
            <Button primary onClick={() => addItemToCart(id, price)}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  )
}

const Button: FunctionComponent<{ primary?: boolean; onClick?: () => void; disabled?: boolean }> =
  ({ primary = false, children, ...props }) => {
    return (
      <button
        className={cx(
          'rounded-full px-6 py-1 text-white font-bold',
          primary ? 'bg-indigo-600' : 'bg-black',
        )}
        {...props}
      >
        {children}
      </button>
    )
  }

// Read: "classnames"
function cx(...names: Array<string | null | undefined | boolean>): string {
  return names.filter((x) => typeof x === 'string' && x).join(' ')
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
