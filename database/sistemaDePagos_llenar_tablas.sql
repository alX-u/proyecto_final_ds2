use plataforma_pagos; 

# Datos de Prueba

INSERT INTO Cliente VALUES (1003265128, 'Manuel Forero', 'foreromanuel@gmail.com');
INSERT INTO Cliente VALUES (1002415689, 'David Bocampo', 'bocampo@gmail.com');
INSERT INTO Cliente VALUES (1001123485, 'Marta Jaimes', 'martaja@gmail.com');
INSERT INTO Cliente VALUES (1003248789, 'Tristan Ortega', 'ortristan@gmail.com');

INSERT INTO Tarjeta (nro_tarjeta, cc_cliente, entidad, tipo, saldo, expiracion, csc) VALUES (8888989865651235, 1003265128, 'Western Bank', 'Crédito', null, '2022-03-31', 589);
INSERT INTO Tarjeta (nro_tarjeta, cc_cliente, entidad, tipo, saldo, expiracion, csc) VALUES (1231231515, 1003265128, 'Western Bank', 'Débito', 878484, '2022-07-31', null);

select * from Tarjeta; 

select * from Cliente; 