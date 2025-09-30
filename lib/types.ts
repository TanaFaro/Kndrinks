export interface ComboProduct {
    name: string
    quantity: number
    price: number
  }
  
  export interface Product {
    id: number
    name: string
    price: number
    category: string
    stock: number
    image: string
    description: string
  }
  
  export interface Oferta {
    id: number
    title: string
    description: string
    comboProducts: ComboProduct[]
    finalPrice: number
    image: string
    category: string
    active: boolean
    featured?: boolean
    priority?: number
  }