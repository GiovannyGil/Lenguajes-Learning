Create DATABASE VIDEOSDB

use VIDEOSDB

create table usuarios(
	ID_Usuario int primary key,
	Nombre varchar(20) not null,
	Correo varchar(20) not null,
	Pais varchar(20),
	ClavePASS varchar(20) not null,
	Activo BIT DEFAULT 1  -- TRUE para activo, FALSE para inactivo
)

create table autores(
	ID_Autor int primary key,
	ID_USUARIO int,
	Foreign key (ID_USUARIO) References usuarios(ID_Usuario)
)

create table colaboradores(
	ID_Colaborador int primary key,
	ID_USUARIO int,
	Foreign key (ID_USUARIO) References usuarios(ID_Usuario)
)

create table videos(
	ID_Video int primary key,
	Titulo varchar(20) not null,
	Descripcion varchar(100),
	Fecha_Publicacion date,
	ID_AUTOR int,
	ID_COLABORADOR int,
	Foreign key (ID_AUTOR) References autores(ID_Autor),
	Foreign key (ID_COLABORADOR) References colaboradores(ID_Colaborador)
)


create table comentarios(
	ID_Comentario int primary key,
	ID_USUARIO int,
	ID_VIDEO int,
	Comentario varchar(100) not null,
	Puntuacion int check (Puntuacion Between 1 and 5),
	Fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
	Foreign key (ID_USUARIO) References usuarios(ID_Usuario),
	Foreign key (ID_VIDEO) References videos(ID_Video)
)

create table reviews(
	ID_Review int primary key,
	ID_USUARIO int,
	ID_VIDEO int,
	Comentario varchar(100) not null,
	Puntuacion int check (Puntuacion Between 1 and 5),
	Fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
	Foreign key (ID_USUARIO) References usuarios(ID_Usuario),
	Foreign key (ID_VIDEO) References videos(ID_Video)
)

