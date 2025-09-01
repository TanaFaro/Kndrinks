import { createWithEqualityFn } from 'zustand/traditional'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category: string
  stock: number
}

interface CartStore {
  items: CartItem[]
  total: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (id: string) => number
}

export const useCartStore = createWithEqualityFn<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          
          if (existingItem) {
            // Si el item ya existe, aumentar cantidad
            const newQuantity = Math.min(existingItem.quantity + 1, item.stock)
            const updatedItems = state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: newQuantity } : i
            )
            
            return {
              items: updatedItems,
              total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            }
          } else {
            // Si es un item nuevo, agregarlo
            const newItem = { ...item, quantity: 1 }
            const newItems = [...state.items, newItem]
            
            return {
              items: newItems,
              total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            }
          }
        })
      },
      
      removeItem: (id: string) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id)
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          }
        })
      },
      
      updateQuantity: (id: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((item) => item.id !== id)
            return {
              items: newItems,
              total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            }
          }
          
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.min(quantity, item.stock) } : item
          )
          
          return {
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          }
        })
      },
      
      clearCart: () => {
        set({ items: [], total: 0 })
      },
      
      getItemQuantity: (id: string) => {
        const item = get().items.find((i) => i.id === id)
        return item ? item.quantity : 0
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)



