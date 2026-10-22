import { createContext, useContext, useMemo, useReducer } from 'react'
import { describeOptions, unitPrice } from '../data/menu'

const CartContext = createContext(null)

const lineKey = (item, opts) =>
  item.kind === 'pizza' ? `${item.id}|${opts.size}|${opts.crust}|${[...opts.addons].sort().join(',')}` : item.id

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { item, opts, qty } = action
      const key = lineKey(item, opts)
      const existing = state.find((l) => l.key === key)
      if (existing) return state.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
      return [
        ...state,
        {
          key,
          itemId: item.id,
          name: item.name,
          img: item.img,
          look: item.look,
          unit: unitPrice(item, opts),
          summary: describeOptions(item, opts),
          qty,
        },
      ]
    }
    case 'inc':
      return state.map((l) => (l.key === action.key ? { ...l, qty: l.qty + 1 } : l))
    case 'dec':
      return state.flatMap((l) => (l.key !== action.key ? [l] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []))
    case 'remove':
      return state.filter((l) => l.key !== action.key)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, [])

  const value = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((n, l) => n + l.qty * l.unit, 0)
    return {
      lines,
      count,
      subtotal,
      add: (item, opts, qty = 1) => dispatch({ type: 'add', item, opts, qty }),
      inc: (key) => dispatch({ type: 'inc', key }),
      dec: (key) => dispatch({ type: 'dec', key }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [lines])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
