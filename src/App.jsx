import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Oven from './components/Oven'
import FindUs from './components/FindUs'
import ItemModal from './components/ItemModal'
import CartDrawer from './components/CartDrawer'
import FloatingOrder from './components/FloatingOrder'
import MobileNav from './components/MobileNav'
import Tracker from './components/Tracker'
import { useCart } from './context/CartContext'
import { useLenis } from './hooks/useLenis'
import { PHOTOS, doorTime, totals } from './data/menu'

export default function App() {
  const lenis = useLenis()
  const cart = useCart()
  const [activeItem, setActiveItem] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [mode, setMode] = useState('delivery')
  const [order, setOrder] = useState(null)
  const [section, setSection] = useState('menu')

  // Freeze page scroll while any overlay is up.
  const locked = !!activeItem || cartOpen || !!order
  useEffect(() => {
    const html = document.documentElement
    if (locked) {
      lenis.current?.stop()
      html.style.overflow = 'hidden'
    } else {
      lenis.current?.start()
      html.style.overflow = ''
    }
    // Keep keyboard and screen readers inside the active overlay.
    document.querySelectorAll('main, header').forEach((el) => (el.inert = locked))
  }, [locked, lenis])

  // Warm the tracker's cinematic backgrounds as soon as an order is started.
  const hasItems = cart.count > 0
  useEffect(() => {
    if (!hasItems) return
    Object.values(PHOTOS).forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [hasItems])

  // Bottom-nav highlight: Find Us when that section owns the viewport.
  useEffect(() => {
    const el = document.getElementById('find')
    if (!el) return
    const io = new IntersectionObserver(([e]) => setSection(e.isIntersecting ? 'find' : 'menu'), { rootMargin: '-50% 0px -40% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const scrollTo = useCallback(
    (id, offset = -72) => {
      if (id === 'top') {
        lenis.current ? lenis.current.scrollTo(0, { duration: 1.4, force: true }) : window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const el = document.getElementById(id)
      if (!el) return
      if (lenis.current) lenis.current.scrollTo(el, { offset, duration: 1.4, force: true })
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
    },
    [lenis],
  )

  const closeItem = useCallback(() => setActiveItem(null), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const addFromModal = (item, opts, qty) => {
    cart.add(item, opts, qty)
    setActiveItem(null)
  }

  const quickAdd = (item) => cart.add(item, null, 1)

  const checkout = () => {
    const t = totals(cart.subtotal, mode)
    setCartOpen(false)
    setOrder({
      number: `FR-${Math.floor(1000 + Math.random() * 9000)}`,
      lines: cart.lines,
      mode,
      ...t,
      eta: doorTime(mode),
    })
  }

  const exitTracker = () => {
    setOrder(null)
    cart.clear()
    window.scrollTo(0, 0)
    lenis.current?.scrollTo(0, { immediate: true })
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header count={cart.count} onCart={() => setCartOpen(true)} onNav={(id) => scrollTo(id)} />

      <main className="pb-mobile-nav">
        <Hero mode={mode} onOrder={() => scrollTo('menu', -40)} onOpenItem={setActiveItem} />
        <Menu onOpen={setActiveItem} onQuickAdd={quickAdd} onNav={scrollTo} />
        <Oven />
        <FindUs />
      </main>

      <FloatingOrder
        show={cart.count > 0 && !cartOpen && !activeItem && !order}
        count={cart.count}
        subtotal={cart.subtotal}
        onClick={() => setCartOpen(true)}
      />

      <MobileNav
        active={cartOpen ? 'order' : section}
        count={cart.count}
        onMenu={() => {
          setCartOpen(false)
          scrollTo('menu', -40)
        }}
        onOrder={() => setCartOpen(true)}
        onFind={() => {
          setCartOpen(false)
          scrollTo('find', -40)
        }}
      />

      <AnimatePresence>{activeItem && <ItemModal key={activeItem.id} item={activeItem} onClose={closeItem} onAdd={addFromModal} />}</AnimatePresence>

      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        mode={mode}
        setMode={setMode}
        onCheckout={checkout}
        onBrowse={() => {
          setCartOpen(false)
          scrollTo('menu', -40)
        }}
      />

      <AnimatePresence>{order && <Tracker key={order.number} order={order} onExit={exitTracker} />}</AnimatePresence>
    </>
  )
}
