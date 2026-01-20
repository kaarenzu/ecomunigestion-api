# EcoMuniGestion-Api

## Descripción del proyecto
Este proyecto es el backend del proyecto de titulación EcoMuniGestion el cual permite conectar el frontend con la base de datos. Proporciona endpoints para gestionar reportes de problemas ambientales y de infraestructura, gestión de usuarios y análisis de dashboards a nivel municipal.

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
│  │  ├─ reporte.controller.js
│  │  ├─ usuario.controller.js
│  │  └─ dashboard.controller.js
│  ├─ models/
│  │  └─ reporte.model.js
│  ├─ routes/
│  │  ├─ reporte.routes.js
│  │  ├─ usuario.routes.js
│  │  └─ dashboard.routes.js
│  └─ services/
│     ├─ reporte.service.js
│     ├─ usuario.service.js
│     └─ dashboard.service.js
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
  - **`controllers/`** — Lógica de controladores (3 módulos: reportes, usuarios, dashboard).
  - **`models/`** — Modelos y consultas a la BD.
  - **`routes/`** — Definición de rutas de la API (3 módulos).
  - **`services/`** — Lógica de negocio y validaciones (3 módulos).

---

## 🗄️ Configuración de Base de Datos

### Requisitos previos
- MySQL 5.7 o superior instalado
- Acceso como usuario `root` en MySQL

### Paso 1: Crear la base de datos

Conéctate a MySQL con usuario root y ejecuta:

```sql
CREATE DATABASE ecomunigestion
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;
```

**Explicación:**
- `CHARACTER SET utf8mb4` — Soporte completo para caracteres especiales y emojis
- `COLLATE utf8mb4_general_ci` — Collation general, sin distinción de mayúsculas/minúsculas

---

### Paso 2: Crear usuario de proyecto

```sql
CREATE USER 'eco_user'@'localhost'
IDENTIFIED BY 'EcoMuni2025!';
```

**Detalles del usuario:**
- **Usuario:** `eco_user`
- **Host:** `localhost` — Solo acceso local (mayor seguridad)
- **Contraseña:** `EcoMuni2025!` — Contraseña académica clara y segura

---

### Paso 3: Otorgar permisos específicos

```sql
GRANT ALL PRIVILEGES
ON ecomunigestion.*
TO 'eco_user'@'localhost';
```

**Permisos otorgados:**
- Crear tablas
- Insertar datos
- Consultar datos
- Actualizar registros
- Eliminar registros
- **Restricción:** Solo dentro de la BD `ecomunigestion`, no puede tocar otras bases de datos

---

### Paso 4: Aplicar cambios

```sql
FLUSH PRIVILEGES;
```

Este comando recarga los permisos en MySQL para que entren en vigor inmediatamente.

---

### Paso 5: Configurar conexión en MySQL Workbench

1. **Abrir MySQL Workbench**
2. **Crear nueva conexión:**
   - **Connection Name:** `EcoMuniGestion DB`
   - **Hostname:** `localhost`
   - **Port:** `3306` (por defecto)
   - **Username:** `eco_user`
   - **Password:** Almacenar en Vault (contraseña: `EcoMuni2025!`)

3. **Guardar y probar la conexión**

---

### Paso 6: Configurar variables de entorno (.env)

Crea un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_USER=eco_user
DB_PASSWORD=EcoMuni2025!
DB_NAME=ecomunigestion
DB_PORT=3306
PORT=3000
NODE_ENV=development
```

---

## Instalación y configuración de la API

### Requisitos
- Node.js (v14 o superior)
- MySQL (v5.7 o superior, base de datos ya creada)
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

3. **Crear archivo `.env`** en la raíz del proyecto (ver paso 6 arriba)

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   La API estará disponible en: `http://localhost:3000`

---

## 📡 Endpoints de la API

### Base URL
```
http://localhost:3000/api
```

---

## 📋 Módulo: REPORTES

**Base:** `/api/reportes`

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
GET /reportes/usuario/usuario@example.com
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
GET /reportes/1
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

## 👤 Módulo: USUARIOS

**Base:** `/api/usuarios`

### 7️⃣ Registrar nuevo usuario

**Endpoint:** `POST /registro`

**Descripción:** Registra un nuevo usuario en el sistema con su rol asignado.

**Body (JSON):**
```json
{
  "email": "juan@municipalidad.cl",
  "rol": "funcionario"
}
```

**Roles disponibles:**
- `ciudadano` — Usuario ciudadano que reporta problemas
- `funcionario` — Funcionario municipal que gestiona reportes
- `admin` — Administrador del sistema

**Response (201 Created):**
```json
{
  "id_usuario": 5,
  "email": "juan@municipalidad.cl",
  "rol": "funcionario",
  "fecha_registro": "2026-01-19T10:45:00Z",
  "message": "Usuario registrado exitosamente"
}
```

---

### 8️⃣ Obtener rol de usuario

**Endpoint:** `GET /rol/:email`

**Descripción:** Obtiene el rol asignado a un usuario específico.

**Parámetro:**
- `email` (string): Email del usuario

**Ejemplo:**
```
GET /usuarios/rol/juan@municipalidad.cl
```

**Response (200 OK):**
```json
{
  "rol": "funcionario"
}
```

---

## 📊 Módulo: DASHBOARD

**Base:** `/api/dashboard`

### 9️⃣ Obtener KPIs

**Endpoint:** `GET /kpis`

**Descripción:** Obtiene indicadores clave de desempeño (KPIs) del sistema.

**Response (200 OK):**
```json
{
  "total_reportes": 145,
  "reportes_pendientes": 23,
  "reportes_en_proceso": 67,
  "reportes_resueltos": 55,
  "porcentaje_resolucion": 37.93,
  "tiempo_promedio_resolucion_dias": 5.2
}
```

---

### 🔟 Obtener reportes por sector

**Endpoint:** `GET /reportes-por-sector`

**Descripción:** Agrupa y cuenta los reportes por sector geográfico o categoría.

**Response (200 OK):**
```json
[
  {
    "sector": "Centro histórico",
    "cantidad_reportes": 45,
    "porcentaje": 31.03
  },
  {
    "sector": "Sector norte",
    "cantidad_reportes": 32,
    "porcentaje": 22.07
  },
  {
    "sector": "Sector sur",
    "cantidad_reportes": 28,
    "porcentaje": 19.31
  },
  {
    "sector": "Sector oriente",
    "cantidad_reportes": 40,
    "porcentaje": 27.59
  }
]
```

---

### 1️⃣1️⃣ Obtener zonas críticas

**Endpoint:** `GET /zonas-criticas`

**Descripción:** Identifica y obtiene las zonas con mayor concentración de problemas reportados.

**Response (200 OK):**
```json
[
  {
    "zona": "Parque Central",
    "cantidad_reportes": 18,
    "categoria_predominante": "ambiental",
    "latitude": "-33.4372",
    "longitude": "-70.6688",
    "nivel_critico": "Alto"
  },
  {
    "zona": "Avenida Principal",
    "cantidad_reportes": 15,
    "categoria_predominante": "infraestructura",
    "latitude": "-33.4385",
    "longitude": "-70.6705",
    "nivel_critico": "Alto"
  },
  {
    "zona": "Calle Secundaria",
    "cantidad_reportes": 12,
    "categoria_predominante": "ambiental",
    "latitude": "-33.4395",
    "longitude": "-70.6720",
    "nivel_critico": "Medio"
  }
]
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

### Registrar usuario
```bash
curl -X POST http://localhost:3000/api/usuarios/registro \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@municipalidad.cl",
    "rol": "funcionario"
  }'
```

### Obtener KPIs del dashboard
```bash
curl http://localhost:3000/api/dashboard/kpis
```

### Obtener zonas críticas
```bash
curl http://localhost:3000/api/dashboard/zonas-criticas
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

## Notas importantes para el profesor

✅ **Seguridad:**
- Contraseña de `eco_user` clara y comprensible: `EcoMuni2025!`
- Usuario con permisos limitados solo a la BD `ecomunigestion`
- No puede acceder a otras bases de datos del servidor
- Almacenar contraseña en Vault de MySQL Workbench

✅ **Variables de entorno:**
- Asegúrate de configurar correctamente el archivo `.env` con los datos de conexión
- No compartir `.env` en repositorios públicos

✅ **Base de datos:**
- La API utiliza MySQL con charset UTF-8MB4 para soporte completo de caracteres
- Todos los timestamps se almacenan automáticamente
- Los reportes se relacionan con usuarios por email

✅ **API:**
- La API utiliza CORS para permitir solicitudes desde el frontend
- Endpoints organizados en 3 módulos: reportes, usuarios, dashboard
- Errores con mensajes descriptivos para facilitar debugging

---

## Autor
Proyecto de titulación - EcoMuniGestion 2026
Karen Zúñiga Cortés
