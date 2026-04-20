# EFORM - Plataforma de Uniformes SENA

Una plataforma digital moderna para la adquisición de uniformes del SENA, diseñada con las mejores prácticas de desarrollo web.

## 🚀 Características

### ✨ Funcionalidades Principales
- **Catálogo de Productos**: Navegación intuitiva de uniformes SENA
- **Carrito de Compras**: Gestión completa con localStorage
- **Filtros Dinámicos**: Filtrado por categorías de productos
- **Diseño Responsive**: Adaptado para todos los dispositivos
- **Notificaciones**: Sistema de alertas moderno
- **Animaciones Suaves**: Transiciones y microinteracciones

### 🎨 Diseño y UX
- **Interfaz Moderna**: Diseño limpio y profesional
- **Accesibilidad**: Cumple con estándares WCAG
- **SEO Optimizado**: Meta tags y estructura semántica
- **Performance**: Optimizado para velocidad
- **Tipografía**: Google Fonts (Inter)

### 🛠️ Tecnologías
- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Grid, Flexbox
- **JavaScript ES6+**: Clases, async/await, módulos
- **LocalStorage**: Persistencia de datos
- **Responsive Design**: Mobile-first

## 📁 Estructura del Proyecto

```
E-FORM/
├── index.html              # Página principal
├── pages/                  # Páginas internas
│   ├── carrito.html       # Carrito de compras
│   ├── catalogo.html      # Catálogo completo
│   ├── contacto.html      # Contacto
│   ├── inicio.html        # Login/Registro
│   └── nosotros.html      # Sobre nosotros
├── css/                    # Hojas de estilo
│   ├── style.css          # Estilos principales
│   ├── catalogo.css       # Estilos catálogo
│   ├── contacto.css       # Estilos contacto
│   └── nosotros.css       # Estilos nosotros
├── js/                     # JavaScript
│   └── script.js          # Lógica principal
├── assets/                 # Recursos
│   └── images/            # Imágenes
└── README.md               # Documentación
```

## 🎯 Mejoras Implementadas

### HTML5 Semántico
- ✅ Estructura con `<main>`, `<section>`, `<article>`
- ✅ Roles ARIA y etiquetas descriptivas
- ✅ Meta tags para SEO y redes sociales
- ✅ Enlaces canónicos y optimización

### CSS Moderno
- ✅ Variables CSS para consistencia
- ✅ Sistema de diseño con colores y espaciado
- ✅ Animaciones y transiciones suaves
- ✅ Diseño responsive (mobile-first)
- ✅ Estados de hover y focus

### JavaScript ES6+
- ✅ Clase EFormApp para organización
- ✅ Sistema de notificaciones
- ✅ Manejo de errores robusto
- ✅ Animaciones con Intersection Observer
- ✅ Filtros dinámicos de productos

### Accesibilidad
- ✅ Etiquetas ARIA completas
- ✅ Navegación por teclado
- ✅ Contraste de colores adecuado
- ✅ Respeta preferencias de movimiento

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone <repository-url>
   cd E-FORM
   ```

2. **Abrir en navegador**:
   - Simplemente abre `index.html` en tu navegador preferido
   - No requiere servidor web para desarrollo básico

3. **Para desarrollo**:
   ```bash
   # Usar un servidor local para mejor experiencia
   python -m http.server 8000
   # o
   npx serve .
   ```

## 📱 Características Técnicas

### Performance
- ⚡ Optimización de imágenes con lazy loading
- ⚡ CSS y JavaScript minificados (producción)
- ⚡ Fuentes preconectadas a Google Fonts
- ⚡ Animaciones optimizadas con CSS transforms

### Seguridad
- 🔒 Validación de datos en localStorage
- 🔒 Sanitización de entradas de usuario
- 🔒 HTTPS recomendado para producción

### SEO
- 📈 Meta tags Open Graph
- 📈 Estructura semántica HTML5
- 📈 URLs amigables
- 📈 Imágenes con alt text descriptivo

## 🎨 Personalización

### Colores
Modifica las variables CSS en `css/style.css`:
```css
:root {
  --primary-color: #0044cc;
  --accent-color: #ff6b35;
  /* ... */
}
```

### Tipografía
Cambia la fuente en el mismo archivo:
```css
:root {
  --font-family: 'TuFuente', sans-serif;
}
```

## 🔄 Funcionalidades del Carrito

### Gestión de Productos
- Agregar productos con animación
- Eliminar productos individuales
- Vaciar carrito completo
- Persistencia con localStorage

### Notificaciones
- Alertas no intrusivas
- Diferentes tipos (success, info, error)
- Auto-eliminación después de 3 segundos
- Accesibles con screen readers

## 📊 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🚀 Próximos Pasos

### Funcionalidades Futuras
- [ ] Sistema de autenticación real
- [ ] Pasarela de pago integrada
- [ ] Panel de administración
- [ ] API REST para productos
- [ ] PWA con Service Worker
- [ ] Testing automatizado

### Mejoras Técnicas
- [ ] Bundle con Webpack/Vite
- [ ] TypeScript para tipado
- [ ] Testing con Jest/Cypress
- [ ] CI/CD con GitHub Actions
- [ ] Deploy automático

## 📄 Licencia

Proyecto educativo para el SENA. Todos los derechos reservados.

## 👥 Contribuidores

- Nelson Diaz - Desarrollo Frontend
- SENA - Institución educativa

---

**EFORM** - Modernizando la experiencia de compra de uniformes SENA 🎓
