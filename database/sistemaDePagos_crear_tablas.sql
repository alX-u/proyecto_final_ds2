create schema if not exists plataforma_pagos; 
use plataforma_pagos;

DROP TABLE IF EXISTS Historial_Transaccion;
DROP TABLE IF EXISTS Tarjeta;
DROP TABLE IF EXISTS Cliente;

CREATE TABLE Cliente (
	cc INT NOT NULL, 
    nombre_cliente VARCHAR(30) NOT NULL,
    email VARCHAR(30),
    PRIMARY KEY(cc)
);

CREATE TABLE Tarjeta (
	nro_tarjeta INT8 NOT NULL, 
    cc_cliente INT NOT NULL, 
    entidad VARCHAR(20),
    tipo VARCHAR(15),
    saldo float, 
    expiracion DATE, 
    csc INT, 
    PRIMARY KEY(nro_tarjeta),
    FOREIGN KEY(cc_cliente) REFERENCES Cliente (cc) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Historial_Transaccion (
	id_transaccion VARCHAR(10),
    cc_cliente INT,
    concepto VARCHAR(60) NOT NULL,
    sede VARCHAR(30) NOT NULL,
    monto INT NOT NULL, 
    medio_de_pago INT8 NOT NULL,
    nro_cuotas INT,
    fecha DATE NOT NULL,
    PRIMARY KEY(id_transaccion),
    exito BOOLEAN,
    FOREIGN KEY(cc_cliente) REFERENCES Cliente (cc) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(medio_de_pago) REFERENCES Tarjeta (nro_tarjeta) ON DELETE CASCADE ON UPDATE CASCADE
);
