const controller = {};

controller.addTransaccion = (req, res) => {
    //Validamos que exista la tarjeta
    req.getConnection((err, conn) => {
        //Obtenemos la data del formulario de transacciones
        const data = req.body;
        conn.query('SELECT nro_tarjeta, csc, expiracion, tipo, saldo FROM Tarjeta WHERE cc_cliente = ?', [data.cc], (err, validacion) => {
            if (err) {
                res.json(err);
            } else {
                var exito = false;
                // Realizamos la transacción
                // Calculamos la fecha de hoy
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                //Asignamos un id random
                let s4 = () => {
                    return Math.floor((1 + Math.random()) * 0x100000000)
                        .toString(16)
                        .substring(1);
                }

                //Datos que irán a la tabla de transacciones
                cc_cliente = data.cc;
                concepto = data.concepto;
                sede = data.sede;
                monto = data.monto;
                medio_de_pago = data.num_tarjeta;
                nro_cuotas = data.cuotas;
                fecha = date;
                id_transaccion = s4();

                //Datos para validaciones
                codigo_seguridad = data.codigo_seguridad;
                fecha_expiracion = data.fecha_expiracion;
                tipo_pago = data.medio_pago

                //Validamos que la tarjeta exista y que sus datos sean correctos
                for (let i = 0; i < validacion.length; i++) {
                    console.log("soy el csc: " + validacion[i].csc);
                    if (tipo_pago == 'credito') {
                        if (validacion[i].nro_tarjeta == medio_de_pago
                            && codigo_seguridad == validacion[i].csc
                            && validacion[i].tipo == tipo_pago
                            && monto < validacion[i].saldo) {
                            exito = true;
                            //Descontamos el monto que se va a pagar del saldo de la tareta de débito del cliente.
                            conn.query('UPDATE Tarjeta SET saldo = ? WHERE cc_cliente = ? AND nro_tarjeta = ?', [validacion[i].saldo - monto, data.cc, medio_de_pago], (err, transaccion) => {
                                console.log(transaccion);
                            });
                        }
                    } else {
                        if (validacion[i].nro_tarjeta == medio_de_pago
                            && validacion[i].tipo == tipo_pago
                            && monto < validacion[i].saldo) {
                            exito = true;
                            //Descontamos el monto que se va a pagar del saldo de la tareta de débito del cliente.
                            conn.query('UPDATE Tarjeta SET saldo = ? WHERE cc_cliente = ? AND nro_tarjeta = ?', [validacion[i].saldo - monto, data.cc, medio_de_pago], (err, transaccion) => {
                                console.log(transaccion);
                            });

                        }
                    }

                }

                //Verificamos que no se pueda colocar 0 en el número de tarjeta
                if (medio_de_pago == 0) {
                    exito = false;
                }

                //Revisamos el éxito de la transacción
                if (exito) {
                    //Realizamos el insert en la base de datos como una transacción exitosa
                    conn.query('INSERT INTO Historial_Transaccion VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [id_transaccion, cc_cliente, concepto, sede, monto, medio_de_pago, nro_cuotas, fecha, exito], (err, transaccion) => {
                        console.log(transaccion);
                        res.render('success_payment');
                    });
                } else {
                    //Realizamos el insert en la base de datos como una transacción fallida
                    conn.query('INSERT INTO Historial_Transaccion VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [id_transaccion, cc_cliente, concepto, sede, monto, medio_de_pago, nro_cuotas, fecha, exito], (err, transaccion) => {
                        console.log(transaccion);
                        res.render('fail_payment');
                    });
                }
            }
        });
    });
}

controller.login = (req, res) => {
    console.log(req.oidc.isAuthenticated());
    isAuthenticated = req.oidc.isAuthenticated();
    if (!isAuthenticated) {
        res.render('index');
    } else {
        req.getConnection((err, conn) => {
            user = req.oidc.user;
            console.log(user.email);
            //Obtenemos la data de la persona que ingresa a la plataforma
            conn.query('SELECT * FROM Cliente WHERE email = ?', [user.email], (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.render('customers', {
                        data: rows
                    });
                }
            });
        });
    }

}

controller.consultar = (req, res) => {
    req.getConnection((err, conn) => {
        user = req.oidc.user;
        console.log(user.cc);
        //Obtenemos la data de la persona que ingresa a la plataforma
        conn.query('SELECT entidad, tipo, saldo FROM Tarjeta, Cliente WHERE email = ? AND cc = cc_cliente', [user.email], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                console.log(rows);
                res.render('consulta_saldo',
                    { data: rows });
            }
        });
    });

}

module.exports = controller;