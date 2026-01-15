# EcoMuniGestion-Api

## Descripción del proyecto
Este proyecto es el backend del proyecto de titulo EcoMuniGestion el cual permite conectar el frontend con la base de datos

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
- **`STRUCTURE.md`** — Este archivo: estructura y descripción del proyecto.
- **`src/`** — Código fuente:
  - **`app.js`** — Configuración de la app (middlewares, rutas).
  - **`server.js`** — Punto de entrada / arranque del servidor.
  - **`config/database.js`** — Configuración de la base de datos.
  - **`controllers/`** — Lógica de controladores (ej. `reporte.controller.js`).
  - **`models/`** — Modelos / esquemas (ej. `reporte.model.js`).
  - **`routes/`** — Definición de rutas (ej. `reporte.routes.js`).
  - **`services/`** — Servicios / lógica de negocio (ej. `reporte.service.js`).

---