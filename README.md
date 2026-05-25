# Proyecto Final - Backend I (CoderHouse)

API RESTful de e-commerce desarrollada como entrega final del curso Backend I. El sistema permite la gestión integral de productos y carritos de compras, implementando sincronización de inventario en tiempo real.

## Funcionalidades Implementadas

- **Gestión de Productos:** Operaciones CRUD completas. El endpoint de lectura incluye soporte para paginación, filtros por categoría/disponibilidad y ordenamiento por precio.
- **Gestión de Carritos:** Creación de carritos, adición de ítems con validación de stock, actualización de cantidades y vaciado total. Las consultas utilizan `populate` para resolver las referencias a productos.
- **Sincronización en Tiempo Real:** Implementación de WebSockets para actualizar el stock disponible en la vista del cliente tras cada operación de compra o modificación del catálogo.
- **Vistas Dinámicas:** Renderizado del lado del servidor mediante Handlebars para la visualización del catálogo, detalle de producto y gestión del carrito.

## Stack Tecnológico

- Entorno de ejecución: Node.js
- Framework web: Express.js
- Base de datos y ODM: MongoDB Atlas y Mongoose
- Tiempo real: Socket.io
- Motor de plantillas: Express-Handlebars

_Nota Técnica:_ La aplicación principal opera sobre MongoDB para garantizar escalabilidad. Para cumplir con el requisito de persistencia dual de la consigna, se implementó una capa de persistencia secundaria basada en FileSystem (`src/dao/fs/`).

## Arquitectura

El proyecto sigue un patrón de diseño basado en capas (Separation of Concerns):

- `src/config`: Inicialización de la base de datos y gestión de variables de entorno.
- `src/controllers`: Lógica de orquestación y validación de peticiones HTTP.
- `src/dao`: Data Access Object. Centraliza la interacción con MongoDB y FileSystem.
- `src/routes`: Definición modular de endpoints API y rutas de vistas.
- `src/utils`: Herramientas auxiliares y helpers para el motor de plantillas.
- `src/views`: Plantillas de renderizado HTML.

## Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` en la raíz del proyecto basado en las variables requeridas:
   ```env
   PORT=8080
   MONGO_URL="[URI_DE_MONGODB]"
   ```
4. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
5. Acceder a la aplicación mediante: `http://localhost:8080/products`
