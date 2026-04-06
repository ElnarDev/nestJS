# API Routes — Note Sharing

**Base URL:** `http://localhost:3000/api/v2`

---

## Roles disponibles

| Valor | Nombre        |
|-------|---------------|
| `1`   | ADMINISTRADOR |
| `2`   | EDITOR        |
| `3`   | VISUALIZADOR  |

> Al crear una note, el usuario creador recibe automáticamente el rol **ADMINISTRADOR (1)**.

---

## Flujo completo: crear una note compartida con dos roles

### Paso 1 — Crear los usuarios

**`POST /api/v2/usuario`**

Crear el usuario propietario (quien creará la note):

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

### Paso 2 — Crear la note

**`POST /api/v2/note`**

El campo `usuarioId` indica quién es el propietario. Se asigna automáticamente el rol **ADMINISTRADOR**.

```json
{
  "title": "Mi primera note compartida",
  "content": "Contenido de la note",
  "usuarioId": 1
}
```

Respuesta esperada:

```json
{
  "id": 1,
  "title": "Mi primera note compartida",
  "content": "Contenido de la note",
  "activo": true,
  "created_at": "2026-03-25T00:00:00.000Z"
}
```

> Internamente se crea en `note_share`: `{ note_id: 1, usuario_id: 1, role: 1 }`

---

### Paso 3 — Compartir la note con otro usuario

**`POST /api/v2/note-share`**

Asignar rol **EDITOR (2)** al usuario 2 sobre la note 1:

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

> Si el usuario ya tiene un rol en esa note, el endpoint actualiza el rol existente (no duplica).

---

### Paso 4 — Verificar la note con todos sus usuarios y roles

**`GET /api/v2/note/detail`**

Respuesta esperada:

```json
[
  {
    "note_id": 1,
    "note_title": "Mi primera note compartida",
    "usuarios": [
      { "usuario_id": 1, "usuario_name": "Carlos Lopez",  "role": "ADMINISTRADOR" },
      { "usuario_id": 2, "usuario_name": "Maria Garcia",  "role": "EDITOR" }
    ]
  }
]
```

---

## Referencia completa de rutas

### Usuarios (`/usuario`)

| Método   | Ruta               | Descripción               | Body requerido                          |
|----------|--------------------|---------------------------|-----------------------------------------|
| `POST`   | `/usuario`         | Crear / actualizar usuario | `name`, `email`, `password`             |
| `GET`    | `/usuario`         | Listar todos los usuarios  | —                                       |
| `GET`    | `/usuario/:id`     | Obtener usuario por ID     | —                                       |
| `DELETE` | `/usuario/:id`     | Eliminar usuario           | —                                       |

---

### Notes (`/note`)

| Método   | Ruta                         | Descripción                                      | Body requerido                   |
|----------|------------------------------|--------------------------------------------------|----------------------------------|
| `POST`   | `/note`                      | Crear note (asigna ADMINISTRADOR automáticamente) | `title`, `content`, `usuarioId` |
| `GET`    | `/note`                      | Listar todas las notes                            | —                                |
| `GET`    | `/note/detail`               | Notes con usuarios y roles en texto               | —                                |
| `GET`    | `/note/usuario/:usuarioId`   | Notes accesibles por un usuario                   | —                                |
| `GET`    | `/note/:id`                  | Obtener note por ID                               | —                                |
| `DELETE` | `/note/:id`                  | Eliminar note (y sus shares en cascada)           | —                                |

---

### Compartir notes (`/note-share`)

| Método   | Ruta                              | Descripción                              | Body requerido                       |
|----------|-----------------------------------|------------------------------------------|--------------------------------------|
| `POST`   | `/note-share`                     | Asignar o actualizar rol en una note     | `note_id`, `usuario_id`, `role`      |
| `GET`    | `/note-share`                     | Listar todos los shares                  | —                                    |
| `GET`    | `/note-share/note/:noteId`        | Shares de una note específica            | —                                    |
| `GET`    | `/note-share/usuario/:usuarioId`  | Shares de un usuario específico          | —                                    |
| `DELETE` | `/note-share/:id`                 | Eliminar un share por ID                 | —                                    |

---

## Restricciones de la BD

- Un usuario solo puede tener **un rol por note** (`UNIQUE note_id + usuario_id`)
- Borrar una note elimina automáticamente todos sus shares (`ON DELETE CASCADE`)
- Borrar un usuario elimina automáticamente sus shares (`ON DELETE CASCADE`)
- El campo `role` acepta solo los valores `1`, `2` o `3`

---

### Recordatorios (`/recordatorio`)

| Método   | Ruta                              | Descripción                            | Body requerido          |
|----------|-----------------------------------|----------------------------------------|-------------------------|
| `POST`   | `/recordatorio`                   | Crear recordatorio vinculado a una note | `note_id`, `activo?`   |
| `GET`    | `/recordatorio`                   | Listar todos los recordatorios          | —                       |
| `GET`    | `/recordatorio/note/:noteId`      | Recordatorios de una note específica    | —                       |
| `GET`    | `/recordatorio/:id`               | Obtener recordatorio por ID             | —                       |
| `DELETE` | `/recordatorio/:id`               | Eliminar recordatorio                   | —                       |

**Body `POST /recordatorio`:**
```json
{
  "note_id": 1,
  "activo": true
}
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "note_id": 1,
  "activo": true,
  "created_at": "2026-03-29T00:00:00.000Z",
  "updated_at": "2026-03-29T00:00:00.000Z"
}
```

---

### Attachments (`/attachment`)

> Todos los endpoints usan método **POST**.  
> El campo `file_data` debe enviarse en **Base64**.

| Método | Ruta                       | Descripción                        | Body requerido                                            |
|--------|----------------------------|------------------------------------|-----------------------------------------------------------|
| `POST` | `/attachment/getall`       | Listar todos los archivos           | —                                                         |
| `POST` | `/attachment/getbyid/:id`  | Obtener un archivo específico       | —                                                         |
| `POST` | `/attachment/save`         | Crear archivo vinculado a una note  | `note_id`, `file_name`, `file_type`, `file_data`, `file_size?` |
| `POST` | `/attachment/delete/:id`   | Eliminar un archivo                 | —                                                         |

**Body `POST /attachment/save`:**
```json
{
  "note_id": 1,
  "file_name": "documento.pdf",
  "file_type": "application/pdf",
  "file_size": 20480,
  "file_data": "JVBERi0xLjQKJ..."
}
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "note_id": 1,
  "file_name": "documento.pdf",
  "file_type": "application/pdf",
  "file_size": 20480,
  "created_at": "2026-03-29T00:00:00.000Z",
  "updated_at": "2026-03-29T00:00:00.000Z"
}
```

> `file_data` no se retorna en `getall` ni en `save` para evitar respuestas pesadas. Solo se incluye en `getbyid`.
