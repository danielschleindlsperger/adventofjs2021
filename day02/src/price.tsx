import { FunctionComponent } from 'preact'

export const Price: FunctionComponent<{ price: number; highlight?: boolean; small?: boolean }> = ({
  price,
  small = false,
  highlight = false,
}) => {
  const color = highlight ? 'text-indigo-600' : 'text-black'
  const fontSize = small ? 'text-m' : 'text-2xl'
  return <span className={`font-bold ${fontSize} ${color}`}>${price.toFixed(2)}</span>
}
