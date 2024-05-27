import { formatCurrency } from "../helpers"
type Props = {
  label?: string
  amount: number
}

const AmountDisplay = ({label, amount}: Props) => {
  return (
    <p className="text-3xl text-blue-600 font-bold">
      {label && `${label}: `}
      <span className="font-bold text-black">{formatCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay