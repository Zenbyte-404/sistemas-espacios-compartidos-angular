-- Crear base de datos
CREATE DATABASE IF NOT EXISTS reservas_espacios CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE reservas_espacios;

-- Roles de usuarios
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Usuarios del sistema
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo_electronico VARCHAR(200) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Espacios o salas
CREATE TABLE espacios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    ubicacion VARCHAR(255),
    capacidad INT NOT NULL DEFAULT 1,
    descripcion TEXT,
    estado ENUM('disponible','no_disponible','mantenimiento') DEFAULT 'disponible',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FULLTEXT INDEX idx_nombre_descripcion (nombre, descripcion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Reservas de espacios
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    espacio_id INT NOT NULL,
    fecha_hora_inicio DATETIME NOT NULL,
    fecha_hora_fin DATETIME NOT NULL,
    motivo VARCHAR(255),
    estado ENUM('pendiente','confirmada','cancelada','rechazada') DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (espacio_id) REFERENCES espacios(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_espacio_fecha (espacio_id, fecha_hora_inicio, fecha_hora_fin),
    
    -- Constraint para validar que la fecha de fin sea posterior a la de inicio
    CONSTRAINT chk_fecha_reserva CHECK (fecha_hora_fin > fecha_hora_inicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Servicios o comodidades de los espacios (amenities)
CREATE TABLE comodidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Relación many-to-many entre espacios y comodidades
CREATE TABLE espacio_comodidades (
    espacio_id INT NOT NULL,
    comodidad_id INT NOT NULL,
    PRIMARY KEY (espacio_id, comodidad_id),
    FOREIGN KEY (espacio_id) REFERENCES espacios(id) ON DELETE CASCADE,
    FOREIGN KEY (comodidad_id) REFERENCES comodidades(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar datos iniciales para roles
INSERT INTO roles (nombre, descripcion) VALUES
('administrador', 'Usuario con permisos completos del sistema'),
('usuario_regular', 'Usuario con permisos básicos para hacer reservas'),
('moderador', 'Usuario con permisos para gestionar reservas y espacios');

-- Insertar comodidades básicas
INSERT INTO comodidades (nombre, descripcion) VALUES
('Proyector', 'Equipo de proyección para presentaciones'),
('WiFi', 'Conexión a internet inalámbrica'),
('Aire Acondicionado', 'Sistema de climatización'),
('Pizarra', 'Pizarra para escritura'),
('Mesa de Conferencia', 'Mesa grande para reuniones'),
('Sillas Ergonómicas', 'Asientos cómodos para trabajo prolongado'),
('Sistema de Audio', 'Equipo de sonido y micrófono');