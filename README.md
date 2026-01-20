# EcoMuniGestion-Api

## Descripción del proyecto
Este proyecto es el backend del proyecto de titulación EcoMuniGestion el cual permite conectar el frontend con la base de datos. Proporciona endpoints para gestionar reportes de problemas ambientales y de infraestructura a nivel municipal.

---

## Estructura del proyecto 

```text
ecomunigestion-api/
├─ package.json
├─ README.md
├─ STRUCTURE.md
├─ src/
│  ├─ app.js
│  ├─ server.js
│  ├─ config/
│  │  └─ database.js
│  ├─ controllers/
│  │  └─ reporte.controller.js
│  ├─ models/
│  │  └─ reporte.model.js
│  ├─ routes/
│  │  └─ reporte.routes.js
│  └─ services/
│     └─ reporte.service.js
```

---

## Descripción rápida 🔧

- **`package.json`** — Dependencias y scripts del proyecto.
- **`README.md`** — Documentación del proyecto.
- **`STRUCTURE.md`** — Estructura completa del proyecto.
- **`src/`** — Código fuente:
  - **`app.js`** — Configuración de la app (middlewares, rutas).
  - **`server.js`** — Punto de entrada / arranque del servidor.
  - **`config/database.js`** — Configuración de la base de datos MySQL.
  - **`controllers/`** — Lógica de controladores (gestión de reportes).
  - **`models/`** — Modelos y consultas a la BD.
  - **`routes/`** — Definición de rutas de la API.
  - **`services/`** — Lógica de negocio y validaciones.

---

## Instalación y configuración

### Requisitos
- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd ecomunigestion-api
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Crear archivo `.env`** en la raíz del proyecto
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña
   DB_NAME=ecomunigestion
   PORT=3000
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

---

## Endpoints de la API

### Base URL
```
http://localhost:3000/api/reportes
```

---

### 1️⃣ Crear un nuevo reporte

**Endpoint:** `POST /crear`

**Descripción:** Crear un nuevo reporte de problema ambiental o de infraestructura.

**Body (JSON):**
```json
{
  "titulo": "Pothole en calle principal",
  "descripcion": "Hay un hoyo grande en la avenida central",
  "email": "usuario@example.com",
  "categoria": "infraestructura",
  "ubicacion": "Calle principal, km 5",
  "latitude": "-33.5678",
  "longitude": "-70.1234",
  "archivos": []
}
```

**Response (201 Created):**
```json
{
  "id_reporte": 1,
  "estado": "pendiente",
  "fecha_creacion": "2026-01-19T10:30:00Z",
  "message": "Reporte creado exitosamente"
}
```

---

### 2️⃣ Listar todos los reportes

**Endpoint:** `GET /`

**Descripción:** Obtiene la lista completa de todos los reportes registrados en el sistema.

**Response (200 OK):**
```json
[
  {
    "id_reporte": 1,
    "titulo": "Pothole en calle principal",
    "descripcion": "Hay un hoyo grande...",
    "email": "usuario@example.com",
    "categoria": "infraestructura",
    "estado": "pendiente",
    "fecha_creacion": "2026-01-19T10:30:00Z"
  },
  {
    "id_reporte": 2,
    "titulo": "Contaminación de aire",
    "descripcion": "Altas emisiones...",
    "email": "otro@example.com",
    "categoria": "ambiental",
    "estado": "en_proceso",
    "fecha_creacion": "2026-01-18T15:45:00Z"
  }
]
```

---

### 3️⃣ Listar reportes por usuario

**Endpoint:** `GET /usuario/:email`

**Descripción:** Obtiene todos los reportes creados por un usuario específico (filtrado por email).

**Parámetro:**
- `email` (string): Email del usuario

**Ejemplo:**
```
GET /usuario/usuario@example.com
```

**Response (200 OK):**
```json
[
  {
    "id_reporte": 1,
    "titulo": "Pothole en calle principal",
    "descripcion": "Hay un hoyo grande...",
    "email": "usuario@example.com",
    "categoria": "infraestructura",
    "estado": "pendiente",
    "fecha_creacion": "2026-01-19T10:30:00Z"
  }
]
```

---

### 4️⃣ Obtener detalle de un reporte

**Endpoint:** `GET /:id_reporte`

**Descripción:** Obtiene la información completa de un reporte específico.

**Parámetro:**
- `id_reporte` (integer): ID del reporte

**Ejemplo:**
```
GET /1
```

**Response (200 OK):**
```json
{
  "id_reporte": 1,
  "titulo": "Pothole en calle principal",
  "descripcion": "Hay un hoyo grande en la avenida central",
  "email": "usuario@example.com",
  "categoria": "infraestructura",
  "ubicacion": "Calle principal, km 5",
  "latitude": "-33.5678",
  "longitude": "-70.1234",
  "estado": "pendiente",
  "fecha_creacion": "2026-01-19T10:30:00Z",
  "observaciones": []
}
```

---

### 5️⃣ Cambiar estado de un reporte

**Endpoint:** `PUT /:id_reporte/estado`

**Descripción:** Cambia el estado de un reporte (ej: pendiente → en_proceso → resuelto).

**Parámetros:**
- `id_reporte` (integer): ID del reporte

**Body (JSON):**
```json
{
  "id_estado": 2,
  "id_usuario_funcionario": 5
}
```

**Estados posibles:**
- `1` = Pendiente
- `2` = En Proceso
- `3` = Resuelto
- `4` = Rechazado

**Response (200 OK):**
```json
{
  "id_reporte": 1,
  "estado_anterior": "pendiente",
  "estado_nuevo": "en_proceso",
  "funcionario": "Juan Pérez",
  "fecha_actualizacion": "2026-01-19T11:00:00Z",
  "message": "Estado actualizado exitosamente"
}
```

---

### 6️⃣ Agregar observación a un reporte

**Endpoint:** `POST /:id_reporte/observaciones`

**Descripción:** Agrega una observación o comentario a un reporte (realizado por un funcionario).

**Parámetros:**
- `id_reporte` (integer): ID del reporte

**Body (JSON):**
```json
{
  "observacion": "Se envió cuadrilla de reparación",
  "id_usuario_funcionario": 5
}
```

**Response (201 Created):**
```json
{
  "id_observacion": 15,
  "id_reporte": 1,
  "observacion": "Se envió cuadrilla de reparación",
  "funcionario": "Juan Pérez",
  "fecha_observacion": "2026-01-19T11:15:00Z",
  "message": "Observación agregada exitosamente"
}
```

---

## Códigos de respuesta HTTP

| Código | Significado |
|--------|-------------|
| `200` | OK - Solicitud exitosa |
| `201` | Created - Recurso creado exitosamente |
| `400` | Bad Request - Error en los datos enviados |
| `404` | Not Found - Recurso no encontrado |
| `500` | Internal Server Error - Error en el servidor |

---

## Ejemplo de uso con cURL

### Crear un reporte
```bash
curl -X POST http://localhost:3000/api/reportes/crear \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Árbol caído",
    "descripcion": "Árbol obstruye la calle",
    "email": "usuario@example.com",
    "categoria": "ambiental",
    "ubicacion": "Parque Central",
    "latitude": "-33.5678",
    "longitude": "-70.1234"
  }'
```

### Listar todos los reportes
```bash
curl http://localhost:3000/api/reportes/
```

### Obtener reporte por ID
```bash
curl http://localhost:3000/api/reportes/1
```

### Cambiar estado
```bash
curl -X PUT http://localhost:3000/api/reportes/1/estado \
  -H "Content-Type: application/json" \
  -d '{
    "id_estado": 2,
    "id_usuario_funcionario": 5
  }'
```

---

## Dependencias

- **express** - Framework web para Node.js
- **mysql2** - Cliente MySQL para Node.js
- **cors** - Middleware para habilitar CORS
- **dotenv** - Carga variables de entorno desde archivo .env

---

## Scripts disponibles

```bash
npm run dev    # Inicia el servidor en modo desarrollo con nodemon
npm test       # Ejecutar pruebas (no configurado aún)
```

---

## Notas importantes

- Asegúrate de configurar correctamente las variables de entorno en el archivo `.env`
- La API utiliza CORS para permitir solicitudes desde el frontend
- Todos los endpoints de modificación requieren autenticación del funcionario
- Los reportes se almacenan en MySQL con timestamps automáticos

---

## Autor
Proyecto de titulación - EcoMuniGestion 2025
