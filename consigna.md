# Consigna final - API de e-commerce

A lo largo de la cursada trabajaste sobre la construcción progresiva de una aplicación, incorporando desde lógica de programación hasta persistencia de datos y comunicación en tiempo real.

En esta evaluación, debes llevar ese proyecto a una versión más robusta y profesional, aplicando buenas prácticas de desarrollo backend.

## Objetivo

Integrar los principales conceptos trabajados durante el curso en una aplicación backend funcional y organizada.

### Conceptos clave

- Desarrollo de servidores con Node.js y Express
- Organización de rutas mediante Express Router
- Manejo de asincronía con `async/await`
- Persistencia de datos con FileSystem y MongoDB (Mongoose)
- Modelado de datos y relaciones
- Implementación de CRUD completo
- Uso de WebSockets para actualización en tiempo real
- Optimización de consultas mediante filtros, paginación y ordenamiento

## Contexto

Desarrollar una API de e-commerce que permita gestionar:

- Productos
- Carritos de compra

El backend debe encargarse de:

- Exponer endpoints para consumir datos
- Gestionar lógica de negocio
- Persistir información en base de datos
- Mantener sincronización con el frontend

A lo largo del curso fuimos construyendo esta aplicación por partes. Ahora se debe consolidar, mejorar y completar.

## Requisitos prácticos

A partir del proyecto desarrollado durante la cursada, entrega una versión final que cumpla estos requisitos.

### 1. Servidor

- Implementar servidor con Node.js y Express
- Ejecutar en el puerto `8080`
- Organizar rutas en:
  - `/api/products`
  - `/api/carts`

### 2. Gestión de productos

#### GET `/api/products`

Debe permitir:

- `limit` (cantidad de resultados)
- `page` (paginación)
- `query` (filtro por categoría o disponibilidad)
- `sort` (orden ascendente o descendente por precio)

Valores por defecto:

- `limit = 10`
- `page = 1`

Formato de respuesta esperado:

```json
{
  "status": "success",
  "payload": [],
  "totalPages": 0,
  "prevPage": null,
  "nextPage": null,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevLink": null,
  "nextLink": null
}
```

#### GET `/api/products/:pid`

- Obtener un producto por su ID

#### POST `/api/products`

- Crear producto con los campos:
  - `title`
  - `description`
  - `code`
  - `price`
  - `status`
  - `stock`
  - `category`
  - `thumbnails`
- El ID debe generarse automáticamente

#### PUT `/api/products/:pid`

- Actualizar producto existente
- No se debe modificar el ID

#### DELETE `/api/products/:pid`

- Eliminar producto

### 3. Gestión de carritos

#### POST `/api/carts`

- Crear carrito con ID autogenerado

#### GET `/api/carts/:cid`

- Listar productos del carrito
- Utilizar `populate` para traer información completa de los productos

#### POST `/api/carts/:cid/products/:pid`

- Agregar producto al carrito
- Si ya existe, incrementar la cantidad

#### DELETE `/api/carts/:cid/products/:pid`

- Eliminar producto del carrito

#### PUT `/api/carts/:cid`

- Actualizar todos los productos del carrito

#### PUT `/api/carts/:cid/products/:pid`

- Actualizar únicamente la cantidad de un producto

#### DELETE `/api/carts/:cid`

- Vaciar el carrito completo

### 4. Persistencia

- Implementar MongoDB con Mongoose
- Base de datos: `ecommerce`
- Colecciones:
  - `products`
  - `carts`
- Mantener la estructura del proyecto con:
  - carpeta `dao`
  - carpeta `models`
- No eliminar la implementación previa con FileSystem

### 5. Vistas y tiempo real

#### Rutas de vistas

- `/products`
  - Listado de productos con paginación
- `/products/:pid`
  - Vista de detalle del producto
  - Opción para agregar al carrito
- `/carts/:cid`
  - Visualización de un carrito específico

#### WebSockets

- Implementar actualización en tiempo real de productos
- Los cambios deben reflejarse automáticamente en la vista

## Requisitos técnicos

- Uso de `Express Router`
- Uso de middleware
- Manejo de asincronía con `async/await`
- Uso de Mongoose
- Código modular y organizado
- Manejo básico de errores

## Entregable

El proyecto debe estar desarrollado y funcionando, pero la entrega se realizará en formato de presentación para facilitar la evaluación.

### Debes entregar

- Un Google Slides (URL pública) que documente el desarrollo completo del proyecto.

### La presentación debe incluir

1. Definición del proyecto:
   - Nombre
   - Problema que resuelve
   - Público objetivo
   - Funcionalidades principales
2. Evidencia del desarrollo técnico (obligatorio):
   - Capturas del código (archivos clave, estructura de carpetas, endpoints, lógica implementada)
   - Fragmentos relevantes del código explicados
3. Estructura del proyecto:
   - Organización del backend (rutas, controllers, models, etc.)
   - Explicación de la arquitectura utilizada
4. Implementación de funcionalidades:
   - Evidencia del funcionamiento de los endpoints (capturas de Postman/Thunder Client o similar)
   - Ejemplos de requests y responses
5. Persistencia de datos:
   - Capturas y explicación del uso de base de datos (MongoDB / FileSystem)
6. Funcionalidades clave:
   - Evidencia del CRUD completo
   - Gestión de productos y carritos
   - Casos relevantes del sistema
7. Tiempo real (si aplica):
   - Implementación de WebSockets
   - Evidencia de funcionamiento
8. Evidencia de funcionamiento (obligatorio):
   - Capturas, GIF o video mostrando el uso completo del sistema
9. Repositorio (referencia):
   - Link a GitHub con el proyecto completo
   - (No será evaluado directamente por la herramienta automática, pero debe existir como respaldo del desarrollo)
10. Cierre del proyecto:

- Dificultades encontradas
- Soluciones implementadas
- Mejoras futuras

## Condiciones importantes

- La aplicación debe estar desarrollada y funcional, aunque no se evalúe directamente el repositorio.
- El Slides debe permitir validar el desarrollo técnico a través de evidencia concreta.
- No se evaluarán entregas únicamente teóricas o sin capturas del funcionamiento real.

## Tipo de entrega

- Formato: Google Slides
- Entrega: URL pública
- El contenido debe ser claro, ordenado y suficiente para validar el desarrollo
