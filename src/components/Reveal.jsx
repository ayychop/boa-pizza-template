import { motion } from 'framer-motion'
import { useRevealOnce } from '../hooks/useRevealOnce'

const ease = [0.16, 1, 0.3, 1]

export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const [ref, shown] = useRevealOnce()
  const Tag = motion[as]
  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      animate={shown ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Tag>
  )
}
