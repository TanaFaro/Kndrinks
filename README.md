# 🍷 KNDrinks - Tienda Online de Bebidas Premium

Una aplicación web completa y moderna para tienda de bebidas con control de stock, sistema de pedidos, pagos y gestión integral del negocio.

## ✨ Características Principales

### 🛍️ **E-commerce Completo**
- **Recepción de pedidos en WhatsApp** - Integración directa con WhatsApp
- **Pedidos, categorías y productos ilimitados** - Gestión completa del catálogo
- **Centro de pedidos** - Panel de administración de pedidos
- **Impresión de pedidos** - Generación de tickets y facturas
- **Perfil del comercio 100% personalizable** - Branding completo

### 📱 **Catálogo Digital**
- **Opciones extras en productos** - Variantes, tamaños, sabores
- **Imágenes por producto** - Galería de imágenes de alta calidad
- **Control de stock en tiempo real** - Gestión automática de inventario
- **Cupones de descuento** - Sistema de promociones y ofertas
- **Precios en Pesos Argentinos** - Moneda local configurada

### 🎨 **Personalización y UX**
- **Carga de catálogo en Español** - Idioma nativo configurado
- **Configuración de horarios de atención** - Gestión de disponibilidad
- **Código QR de acceso** - Acceso rápido a la tienda
- **Diseño responsive** - Optimizado para todos los dispositivos
- **Animaciones fluidas** - Experiencia de usuario premium

### 📊 **Analytics y Reportes**
- **Estadísticas y reportes de ventas** - Métricas del negocio
- **Integración con Google Analytics** - Seguimiento de visitantes
- **Pixel de Facebook e Instagram** - Marketing digital
- **Estadísticas avanzadas** - KPIs y métricas de rendimiento

### 💳 **Pagos y Logística**
- **Integración con Link de Pago** - Mercado Pago, Pagos Online, Ualá
- **Configuración de precio de envío por zona** - Tarifas personalizadas
- **Geolocalización de clientes** - Google Maps integrado
- **Integraciones con servicios de logística** - Delivery y paquetería

### 🔧 **Gestión y Administración**
- **Carga y actualización masiva** - Importación de productos
- **Gestión de usuarios** - Roles y permisos
- **Configuración de sucursales** - Múltiples ubicaciones
- **Dominio propio** - Personalización completa de URL

## 🚀 Tecnologías Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **UI Components**: Lucide React Icons
- **Notifications**: React Hot Toast
- **Database**: Prisma ORM (configurable)
- **Authentication**: NextAuth.js
- **Payments**: Stripe (configurable)
- **Deployment**: Vercel, Netlify, o cualquier hosting

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/kndrinks.git
cd kndrinks
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno
Crear archivo `.env.local`:
```env
# Base de datos
DATABASE_URL="postgresql://usuario:password@localhost:5432/kndrinks"

# Autenticación
NEXTAUTH_SECRET="tu-secreto-seguro"
NEXTAUTH_URL="http://localhost:3000"

# Pagos (Stripe)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# WhatsApp
WHATSAPP_NUMBER="5491112345678"

# Google Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Facebook Pixel
NEXT_PUBLIC_FB_PIXEL_ID="XXXXXXXXXX"
```

### 4. Ejecutar en desarrollo
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estructura del Proyecto

```
kndrinks/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/             # Componentes reutilizables
│   ├── Header.tsx         # Navegación principal
│   ├── Hero.tsx           # Sección hero
│   ├── CategoryGrid.tsx   # Grid de categorías
│   ├── FeaturedProducts.tsx # Productos destacados
│   ├── SpecialOffers.tsx  # Ofertas especiales
│   ├── Testimonials.tsx   # Testimonios de clientes
│   ├── Newsletter.tsx     # Suscripción a newsletter
│   ├── Footer.tsx         # Pie de página
│   ├── WhatsAppButton.tsx # Botón flotante de WhatsApp
│   ├── CartDrawer.tsx     # Carrito de compras
│   └── SearchModal.tsx    # Modal de búsqueda
├── store/                  # Estado global (Zustand)
│   └── cartStore.ts       # Store del carrito
├── public/                 # Archivos estáticos
├── package.json            # Dependencias y scripts
├── tailwind.config.js      # Configuración de Tailwind
├── next.config.js          # Configuración de Next.js
└── tsconfig.json           # Configuración de TypeScript
```

## 🎯 Funcionalidades Clave

### 🛒 **Sistema de Carrito**
- Agregar/remover productos
- Modificar cantidades
- Cálculo automático de totales
- Persistencia en localStorage
- Control de stock en tiempo real

### 🔍 **Búsqueda y Filtros**
- Búsqueda por nombre y categoría
- Filtros por categorías
- Resultados en tiempo real
- Modal de búsqueda optimizado

### 📱 **Integración WhatsApp**
- Botón flotante inteligente
- Chat directo con el negocio
- Múltiples opciones de contacto
- Mensajes predefinidos

### 💰 **Sistema de Precios**
- Precios en Pesos Argentinos
- Cálculo automático de descuentos
- Envío gratis en compras superiores a $50.000
- Múltiples métodos de pago

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Subir carpeta .next a Netlify
```

### Hosting Tradicional
```bash
npm run build
npm run start
```

## 🔧 Configuración Avanzada

### Personalización de Colores
Editar `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Tus colores personalizados
      }
    }
  }
}
```

### Configuración de Base de Datos
```bash
npx prisma generate
npx prisma db push
```

### Configuración de Analytics
```javascript
// En _app.tsx o layout.tsx
import { GoogleAnalytics } from 'nextjs-google-analytics'

export default function RootLayout({ children }) {
  return (
    <html>
      <GoogleAnalytics trackPageViews />
      <body>{children}</body>
    </html>
  )
}
```

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1280px+)

## 🌟 Características de Rendimiento

- **Lazy Loading** de imágenes y componentes
- **Code Splitting** automático con Next.js
- **Optimización de fuentes** con Google Fonts
- **Animaciones optimizadas** con Framer Motion
- **SEO optimizado** con metadatos dinámicos

## 🔒 Seguridad

- **HTTPS** obligatorio en producción
- **Validación de formularios** en cliente y servidor
- **Sanitización de datos** de entrada
- **Protección CSRF** integrada
- **Rate limiting** configurable

## 📞 Soporte

- **Documentación**: [Wiki del proyecto]
- **Issues**: [GitHub Issues]
- **Discord**: [Servidor de la comunidad]
- **Email**: soporte@kndrinks.com

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🙏 Agradecimientos

- **Next.js** por el framework increíble
- **Tailwind CSS** por el sistema de diseño
- **Framer Motion** por las animaciones fluidas
- **Lucide** por los iconos hermosos
- **Zustand** por el state management simple

---

**KNDrinks** - Tu tienda de bebidas premium en la web 🍷✨

*Desarrollado con ❤️ para el mercado argentino*
