IF DB_ID(N'gestion_ambulancias') IS NOT NULL
BEGIN
    ALTER DATABASE gestion_ambulancias SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE gestion_ambulancias;
END;
GO

CREATE DATABASE gestion_ambulancias;
GO

USE gestion_ambulancias;
GO

CREATE TABLE roles (
    id_rol INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE estados (
    id_estado INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(MAX)
);

CREATE TABLE estados_ambulancia (
    id_estado INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(MAX)
);

CREATE TABLE tiposambulacia (
    id_tipo INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(MAX)
);

CREATE TABLE tipos_centros (
    id_tipo INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE tipo_incidente (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(MAX)
);

CREATE TABLE prioridad (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nivel VARCHAR(50),
    tiempo_respuesta_max INT
);

CREATE TABLE estado (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(MAX)
);

CREATE TABLE centros_salud (
    id_centro INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    tipo_centro_id INT,
    CONSTRAINT fk_centro_tipo FOREIGN KEY (tipo_centro_id) REFERENCES tipos_centros(id_tipo)
);

CREATE TABLE usuario (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    rol_id INT,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES roles(id_rol)
);

CREATE TABLE ambulancias (
    id_ambulancia INT IDENTITY(1,1) PRIMARY KEY,
    placa VARCHAR(20) UNIQUE NOT NULL,
    tipo_id INT,
    estado_id INT,
    centro_salud_id INT,
    CONSTRAINT fk_amb_tipo FOREIGN KEY (tipo_id) REFERENCES tiposambulacia(id_tipo),
    CONSTRAINT fk_amb_estado FOREIGN KEY (estado_id) REFERENCES estados_ambulancia(id_estado),
    CONSTRAINT fk_amb_centro FOREIGN KEY (centro_salud_id) REFERENCES centros_salud(id_centro)
);

CREATE TABLE datos_conductor (
    id_conductor INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT,
    licencia VARCHAR(50),
    categoria_licencia VARCHAR(10),
    fecha_vencimiento DATE,
    centro_salud_id INT,
    estado VARCHAR(50),
    CONSTRAINT fk_cond_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_cond_centro FOREIGN KEY (centro_salud_id) REFERENCES centros_salud(id_centro)
);

CREATE TABLE turnos (
    id_turno INT IDENTITY(1,1) PRIMARY KEY,
    conductor_id INT,
    ambulancia_id INT,
    centro_salud_id INT,
    fecha DATE,
    hora_inicio TIME,
    hora_fin TIME,
    estado_turno VARCHAR(50),
    CONSTRAINT fk_turno_conductor FOREIGN KEY (conductor_id) REFERENCES datos_conductor(id_conductor),
    CONSTRAINT fk_turno_ambulancia FOREIGN KEY (ambulancia_id) REFERENCES ambulancias(id_ambulancia),
    CONSTRAINT fk_turno_centro FOREIGN KEY (centro_salud_id) REFERENCES centros_salud(id_centro)
);

CREATE TABLE solicitud (
    id_solicitud INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT,
    estado_id INT,
    centro_salud_destino_id INT,
    ambulancia_id INT,
    conductor_id INT,
    ruta_id INT,
    fecha_hora DATETIME2,
    ubicacion_origen VARCHAR(255),
    CONSTRAINT fk_sol_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_sol_estado FOREIGN KEY (estado_id) REFERENCES estado(id),
    CONSTRAINT fk_sol_centro FOREIGN KEY (centro_salud_destino_id) REFERENCES centros_salud(id_centro),
    CONSTRAINT fk_sol_ambulancia FOREIGN KEY (ambulancia_id) REFERENCES ambulancias(id_ambulancia),
    CONSTRAINT fk_sol_conductor FOREIGN KEY (conductor_id) REFERENCES datos_conductor(id_conductor)
);

CREATE TABLE Incidente (
    id INT IDENTITY(1,1) PRIMARY KEY,
    solicitud_id INT,
    tipo_id INT,
    prioridad_id INT,
    descripcion VARCHAR(MAX),
    fecha_hora DATETIME2,
    ubicacion VARCHAR(255),
    estado_incidente VARCHAR(50),
    CONSTRAINT fk_inc_solicitud FOREIGN KEY (solicitud_id) REFERENCES solicitud(id_solicitud),
    CONSTRAINT fk_inc_tipo FOREIGN KEY (tipo_id) REFERENCES tipo_incidente(id),
    CONSTRAINT fk_inc_prioridad FOREIGN KEY (prioridad_id) REFERENCES prioridad(id)
);

CREATE TABLE Rutas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    incidente_id INT,
    ambulancia_id INT,
    conductor_id INT,
    centro_salud_destino_id INT,
    origen VARCHAR(255),
    destino VARCHAR(255),
    distancia_km DECIMAL(8,2),
    tiempo_estimado INT,
    tiempo_real INT,
    fecha_hora_inicio DATETIME2,
    fecha_hora_fin DATETIME2,
    CONSTRAINT fk_ruta_incidente FOREIGN KEY (incidente_id) REFERENCES Incidente(id),
    CONSTRAINT fk_ruta_ambulancia FOREIGN KEY (ambulancia_id) REFERENCES ambulancias(id_ambulancia),
    CONSTRAINT fk_ruta_conductor FOREIGN KEY (conductor_id) REFERENCES datos_conductor(id_conductor),
    CONSTRAINT fk_ruta_centro FOREIGN KEY (centro_salud_destino_id) REFERENCES centros_salud(id_centro)
);

ALTER TABLE solicitud
ADD CONSTRAINT fk_solicitud_ruta
FOREIGN KEY (ruta_id) REFERENCES Rutas(id);

CREATE TABLE usuario_incidente (
    usuario_id INT,
    incidente_id INT,
    PRIMARY KEY (usuario_id, incidente_id),
    CONSTRAINT fk_ui_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_ui_incidente FOREIGN KEY (incidente_id) REFERENCES Incidente(id)
);
GO
