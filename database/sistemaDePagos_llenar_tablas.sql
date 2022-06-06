use plataforma_pagos; 

# Datos de Prueba

INSERT INTO Cliente VALUES (1003265128, 'Manuel Forero', 'foreromanuel@gmail.com');
INSERT INTO Cliente VALUES (1002415689, 'David Bocampo', 'bocampo@gmail.com');
INSERT INTO Cliente VALUES (1001123485, 'Marta Jaimes', 'martaja@gmail.com');
INSERT INTO Cliente VALUES (1003248789, 'Tristan Ortega', 'ortristan@gmail.com');
INSERT INTO Cliente VALUES (1003405270, 'Alejandro Vertel', 'vertel@uninorte.edu.co');
INSERT INTO Tarjeta (nro_tarjeta, cc_cliente, entidad, tipo, saldo, expiracion, csc) VALUES (8888989865651235, 1003265128, 'Western Bank', 'credito', 2000000, '2022-03-31', 589);
INSERT INTO Tarjeta (nro_tarjeta, cc_cliente, entidad, tipo, saldo, expiracion, csc) VALUES (4567891234567894, 1003265128, 'Western Bank', 'debito', 878484, null, null);
INSERT INTO Tarjeta (nro_tarjeta, cc_cliente, entidad, tipo, saldo, expiracion, csc) VALUES (1234567891234567, 1003405270, 'Eastern Bank', 'credito', 2000000, '2022-03-31', 123);
INSERT INTO Tarjeta (nro_tarjeta, cc_cliente, entidad, tipo, saldo, expiracion, csc) VALUES (9876543219876543, 1003405270, 'Western Bank', 'debito', 878484, null, null);


select * from Tarjeta; 

select * from Cliente; 

select * from Historial_Transaccion; 