# API Routes — Note Sharing

**Base URL:** `http://localhost:3000/api/v2`

---

## Roles disponibles

| Valor | Nombre        |
|-------|---------------|
| `1`   | ADMINISTRADOR |
| `2`   | EDITOR        |
| `3`   | VISUALIZADOR  |

> Al crear una nota, el usuario creador recibe automáticamente el rol **ADMINISTRADOR (1)**.

---

## Flujo completo: crear una nota compartida con dos roles

### Paso 1 — Crear los usuarios

**`POST /api/v2/person`**

Crear el usuario propietario (quien creará la nota):

```json
{
  "name": "Carlos Lopez",
  "email": "carlos@email.com",
  "password": "secret123"
}
```

Crear el segundo usuario (quien recibirá acceso compartido):

```json
{
  "name": "Maria Garcia",
  "email": "maria@email.com",
  "password": "secret456"
}
```

Respuesta esperada:

```json
{
  "id": 1,
  "name": "Carlos Lopez",
  "email": "carlos@email.com"
}
```

---

### Paso 2 — Crear la nota

**`POST /api/v2/nota`**

El campo `personId` indica quién es el propietario. Se asigna automáticamente el rol **ADMINISTRADOR**.

```json
{
  "title": "Mi primera nota compartida",
  "content": "Contenido de la nota",
  "personId": 1
}
```

Respuesta esperada:

```json
{
  "id": 1,
  "title": "Mi primera nota compartida",
  "content": "Contenido de la nota",
  "activo": true,
  "created_at": "2026-03-25T00:00:00.000Z"
}
```

> Internamente se crea en `note_share`: `{ note_id: 1, usuario_id: 1, role: 1 }`

---

### Paso 3 — Compartir la nota con otro usuario

**`POST /api/v2/note-share`**

Asignar rol **EDITOR (2)** al usuario 2 sobre la nota 1:

```json
{
  "note_id": 1,
  "usuario_id": 2,
  "role": 2
}
```

Para asignar rol **VISUALIZADOR (3)** a un tercer usuario:

```json
{
  "note_id": 1,
  "usuario_id": 3,
  "role": 3
}
```

> Si el usuario ya tiene un rol en esa nota, el endpoint actualiza el rol existente (no duplica).

---

### Paso 4 — Verificar la nota con todos sus usuarios y roles

**`GET /api/v2/nota/detail`**

Respuesta esperada:

```json
[
  {
    "nota_id": 1,
    "nota_title": "Mi primera nota compartida",
    "usuarios": [
      { "person_id": 1, "person_name": "Carlos Lopez",  "role": "ADMINISTRADOR" },
      { "person_id": 2, "person_name": "Maria Garcia",  "role": "EDITOR" }
    ]
  }
]
```

---

## Referencia completa de rutas

### Usuarios (`/person`)

| Método   | Ruta               | Descripción               | Body requerido                          |
|----------|--------------------|---------------------------|-----------------------------------------|
| `POST`   | `/person`          | Crear / actualizar usuario | `name`, `email`, `password`             |
| `GET`    | `/person`          | Listar todos los usuarios  | —                                       |
| `GET`    | `/person/:id`      | Obtener usuario por ID     | —                                       |
| `DELETE` | `/person/:id`      | Eliminar usuario           | —                                       |

---

### Notas (`/nota`)

| Método   | Ruta                     | Descripción                                      | Body requerido                  |
|----------|--------------------------|--------------------------------------------------|---------------------------------|
| `POST`   | `/nota`                  | Crear nota (asigna ADMINISTRADOR automáticamente) | `title`, `content`, `personId` |
| `GET`    | `/nota`                  | Listar todas las notas                            | —                               |
| `GET`    | `/nota/detail`           | Notas con usuarios y roles en texto               | —                               |
| `GET`    | `/nota/person/:personId` | Notas accesibles por un usuario                   | —                               |
| `GET`    | `/nota/:id`              | Obtener nota por ID                               | —                               |
| `DELETE` | `/nota/:id`              | Eliminar nota (y sus shares en cascada)           | —                               |

---

### Compartir notas (`/note-share`)

| Método   | Ruta                         | Descripción                              | Body requerido                       |
|----------|------------------------------|------------------------------------------|--------------------------------------|
| `POST`   | `/note-share`                | Asignar o actualizar rol en una nota     | `note_id`, `usuario_id`, `role`      |
| `GET`    | `/note-share`                | Listar todos los shares                  | —                                    |
| `GET`    | `/note-share/nota/:notaId`   | Shares de una nota específica            | —                                    |
| `GET`    | `/note-share/person/:personId` | Shares de un usuario específico        | —                                    |
| `DELETE` | `/note-share/:id`            | Eliminar un share por ID                 | —                                    |

---

## Restricciones de la BD

- Un usuario solo puede tener **un rol por nota** (`UNIQUE note_id + usuario_id`)
- Borrar una nota elimina automáticamente todos sus shares (`ON DELETE CASCADE`)
- Borrar un usuario elimina automáticamente sus shares (`ON DELETE CASCADE`)
- El campo `role` acepta solo los valores `1`, `2` o `3`
