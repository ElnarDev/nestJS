CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,  -- UNIQUE para evitar duplicados
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Note (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    Activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Note_Share (
    id SERIAL PRIMARY KEY,
    note_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    role INTEGER NOT NULL CHECK (role IN (1, 2, 3)),  -- Validar valores permitidos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (note_id) REFERENCES Note(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
    UNIQUE(note_id, usuario_id)  -- Un usuario puede estar asociado a una nota solo una vez, sin importar el rol
);

CREATE TABLE Recordatorio (
    id SERIAL PRIMARY KEY,
    note_id INTEGER NOT NULL,
    Activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (note_id) REFERENCES Note(id) ON DELETE CASCADE
)

CREATE TABLE Attachment (
    id SERIAL PRIMARY KEY,
    note_id INTEGER NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,      -- MIME type: 'image/png', 'application/pdf'
    file_size INTEGER,                    -- Tamaño en bytes
    file_data BYTEA NOT NULL,             -- El archivo binario
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (note_id) REFERENCES Note(id) ON DELETE CASCADE
);