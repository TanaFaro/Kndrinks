// Sistema de gestión de datos unificado con persistencia en localStorage
// Esta es la solución definitiva para que los datos persistan siempre

export interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  image: string
  description: string
  type: 'product'
}

export interface ComboProduct {
  name: string
  quantity: number
  price: number
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

class DataManager {
  private static instance: DataManager
  private products: Product[] = []
  private ofertas: Oferta[] = []
  private initialized = false

  private constructor() {
    this.initializeData()
  }

  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager()
    }
    return DataManager.instance
  }

  private initializeData() {
    if (this.initialized) return

    try {
      // Solo usar localStorage en el cliente
      if (typeof window !== 'undefined') {
        console.log('🔍 Inicializando dataManager en cliente...')
        
        // Cargar productos desde localStorage
        const savedProducts = localStorage.getItem('kndrinks_products')
        if (savedProducts) {
          this.products = JSON.parse(savedProducts)
          console.log('📦 Datos cargados desde localStorage:', this.products.length, 'productos')
        } else {
          // Si no hay datos, cargar productos base
          this.loadBaseProducts()
        }

        // Cargar ofertas desde localStorage
        const savedOfertas = localStorage.getItem('kndrinks_ofertas')
        console.log('🔍 savedOfertas en localStorage:', savedOfertas)
        
        if (savedOfertas) {
          this.ofertas = JSON.parse(savedOfertas)
          console.log('🎁 Ofertas cargadas desde localStorage:', this.ofertas.length, 'ofertas', this.ofertas)
        } else {
          // Si no hay ofertas, cargar ofertas base
          console.log('⚠️ No hay ofertas en localStorage, cargando base...')
          this.loadBaseOfertas()
        }
      } else {
        // En el servidor, solo cargar datos base
        console.log('🔍 Inicializando dataManager en servidor...')
        this.loadBaseProducts()
        this.loadBaseOfertas()
      }

      this.initialized = true
    } catch (error) {
      console.error('❌ Error inicializando datos:', error)
      this.loadBaseProducts()
      this.loadBaseOfertas()
      this.initialized = true
    }
  }

  private loadBaseProducts() {
    this.products = [
      {
        id: 1,
        name: "Fernet BRANCA",
        price: 13500,
        category: "Aperitivos",
        stock: 6,
        image: "/images/fernet750.jfif",
        description: "Fernet italiano de alta calidad",
        type: 'product'
      },
      {
        id: 2,
        name: "Skyy saborizado",
        price: 9500,
        category: "Licores",
        stock: 12,
        image: "/images/skyy.png",
        description: "Vodka premium americano",
        type: 'product'
      },
      {
        id: 3,
        name: "Smirnoff Saborizado",
        price: 8000,
        category: "Licores",
        stock: 12,
        image: "/images/Smirnoffsolo.jpeg",
        description: "Vodka ruso premium",
        type: 'product'
      },
      {
        id: 4,
        name: "Gancia",
        price: 8000,
        category: "Aperitivos",
        stock: 6,
        image: "/images/Gancia.jfif",
        description: "Aperitivo italiano clásico",
        type: 'product'
      }
    ]
    this.saveProducts()
    console.log('🔄 Productos base cargados:', this.products.length)
  }

  private loadBaseOfertas() {
    // Iniciar con ofertas vacías - el administrador las cargará
    this.ofertas = []
    this.saveOfertas()
    console.log('🔄 Ofertas base inicializadas (vacías) - esperando carga del administrador')
  }

  private saveProducts() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('kndrinks_products', JSON.stringify(this.products))
        console.log('💾 Productos guardados en localStorage')
      }
    } catch (error) {
      console.error('❌ Error guardando productos:', error)
    }
  }

  private saveOfertas() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('kndrinks_ofertas', JSON.stringify(this.ofertas))
        console.log('💾 Ofertas guardadas en localStorage')
        
        // También sincronizar con el servidor
        this.syncWithServer('ofertas', this.ofertas)
      }
    } catch (error) {
      console.error('❌ Error guardando ofertas:', error)
    }
  }

  private async syncWithServer(type: 'products' | 'ofertas', data: any[]) {
    try {
      if (typeof window !== 'undefined') {
        const endpoint = type === 'products' ? '/api/products' : '/api/offers'
        
        // Enviar datos al servidor para sincronización
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            action: 'sync',
            data: data 
          })
        })
        console.log(`🔄 ${type} sincronizados con servidor`)
      }
    } catch (error) {
      console.error(`❌ Error sincronizando ${type}:`, error)
    }
  }

  // Métodos públicos para productos
  public getProducts(): Product[] {
    this.initializeData()
    return [...this.products]
  }

  public addProduct(product: Omit<Product, 'id'>): Product {
    this.initializeData()
    const newProduct: Product = {
      ...product,
      id: Date.now() + Math.floor(Math.random() * 1000)
    }
    this.products.push(newProduct)
    this.saveProducts()
    console.log('✅ Producto agregado:', newProduct.name)
    return newProduct
  }

  public updateProduct(id: number, updates: Partial<Product>): Product | null {
    this.initializeData()
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) return null
    
    this.products[index] = { ...this.products[index], ...updates }
    this.saveProducts()
    console.log('🔄 Producto actualizado:', this.products[index].name)
    return this.products[index]
  }

  public deleteProduct(id: number): boolean {
    this.initializeData()
    const initialLength = this.products.length
    this.products = this.products.filter(p => p.id !== id)
    if (this.products.length < initialLength) {
      this.saveProducts()
      console.log('🗑️ Producto eliminado:', id)
      return true
    }
    return false
  }

  // Métodos públicos para ofertas
  public getOfertas(): Oferta[] {
    this.initializeData()
    console.log('🔍 dataManager.getOfertas() - ofertas actuales:', this.ofertas.length, this.ofertas)
    return [...this.ofertas]
  }

  public addOferta(oferta: Omit<Oferta, 'id'>): Oferta {
    this.initializeData()
    const newOferta: Oferta = {
      ...oferta,
      id: Date.now() + Math.floor(Math.random() * 1000)
    }
    this.ofertas.push(newOferta)
    this.saveOfertas()
    console.log('✅ Oferta agregada:', newOferta.title)
    return newOferta
  }

  public updateOferta(id: number, updates: Partial<Oferta>): Oferta | null {
    this.initializeData()
    const index = this.ofertas.findIndex(o => o.id === id)
    if (index === -1) return null
    
    this.ofertas[index] = { ...this.ofertas[index], ...updates }
    this.saveOfertas()
    console.log('🔄 Oferta actualizada:', this.ofertas[index].title)
    return this.ofertas[index]
  }

  public deleteOferta(id: number): boolean {
    this.initializeData()
    const initialLength = this.ofertas.length
    this.ofertas = this.ofertas.filter(o => o.id !== id)
    if (this.ofertas.length < initialLength) {
      this.saveOfertas()
      console.log('🗑️ Oferta eliminada:', id)
      return true
    }
    return false
  }

  // Método para resetear datos (útil para testing)
  public resetData() {
    localStorage.removeItem('kndrinks_products')
    localStorage.removeItem('kndrinks_ofertas')
    this.products = []
    this.ofertas = []
    this.initialized = false
    this.initializeData()
    console.log('🔄 Datos reseteados')
  }
}

// Exportar instancia singleton
export const dataManager = DataManager.getInstance()
