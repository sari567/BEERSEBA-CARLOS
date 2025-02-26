
SHOW DATABASES;
USE beerseba;

SHOW TABLES;

SHOW CREATE TABLE USUARIOS;

SELECT * FROM USUARIOS;

INSERT INTO USUARIOS (id, nombre, apellido, email, pass, tipo_usuario, tipo_doc, num_doc, celular)
    VALUE (NULL, 'SOFIA', 'PRINCESS', 'PRINCESSSOF@gmail.com', '123456', 'cliente', 'Pasaporte', 12, 1198200200);

UPDATE USUARIOS SET pass=67889 WHERE id=1;


SELECT * FROM Tipo_Producto;
INSERT INTO Tipo_Producto (id, tipo)
    VALUE (NULL, 'Vestido'),
    (NULL, 'Pantalon'),
    (NULL, 'Remera'),
    (NULL, 'Short'),
    (NULL, 'Blazer');

SELECT * FROM Producto;

INSERT INTO Producto (id, nombre, id_tipo_producto, img)
    VALUE (NULL, 'Vestido de Lino', '1', 'url'), --id = 1
    (NULL, 'Vestido de Fibrana', '1', 'url'), --id = 4
    (NULL, 'Vestido de Morley', '1', 'url'), --id = 5
    (NULL, 'Pantalon de Bengalina', '2', 'url'), --id = 6
    (NULL, 'Blazer de Crep', '5', 'url'); --id = 7

SELECT * FROM Producto_Talle;
INSERT INTO Producto_Talle (id, id_producto, Talle, precio, stock, descripción)
    VALUE (NULL, 7, '7', 18000.00, 50, 'pantalon de bengalinaaaa 10/10 perfeecto para salir') ;

----------------------------------


--ACTUALIZACIÓN DE STOCK
UPDATE producto_talle SET stock = stock-1 WHERE id = 26;

------------------------------------
    
--CONSULTA DEL STOCK DE LOS PRODUCTOS

SELECT  tp.tipo,
    p.nombre,
    ptalle.talle,
    ptalle.stock, 
    ptalle.descripción
FROM producto p 
INNER JOIN tipo_producto tp ON tp.id = p.id_tipo_producto
INNER JOIN producto_talle ptalle ON ptalle.id_producto = p.id;


-------------------------------------

SELECT * FROM Compra;
INSERT INTO Compra(id, id_usuario, Fechahora, Estado)
    VALUE (NULL, 1, '2024-10-16', 'En proceso'),
        (NULL, 2, '2024-8-16', 'Entregado'),
        (NULL, 3, '2024-10-16', ''),
        (NULL, 4, '2024-10-20', 'En proceso');


----------------------------------

--ACTUALIZACION ESTADO DE COMPRA
UPDATE Compra SET Estado='Entregado' WHERE id=4;
UPDATE Compra SET Estado='En Proceso' WHERE id=3;

----------------------------------



SELECT * FROM Compra_Detalle;


INSERT INTO Compra_Detalle (id, id_compra, id_producto_talle, cantidad, precio)   }
                    VALUE (NULL, 4, 23, 1, 15000);



SELECT * FROM USUARIOS;


----------------------------------

--SUPER CONSULTA, QUE USUARIO COMPRO QUE PRODUCTO.

--indicamos que columna queremos de la tabla
SELECT c.fechahora, 
        u.nombre, 
        u.apellido, 
        cd.cantidad, 
        p.Nombre AS Producto, 
        ptl.talle, 
        cd.precio,
        c.estado
FROM compra c 
INNER JOIN USUARIOS u ON u.id = c.id_usuario 
INNER JOIN Compra_Detalle cd ON c.id = cd.id_compra
INNER JOIN Producto_talle ptl ON cd.Id_producto_talle = ptl.id
INNER JOIN producto p ON p.id = ptl.id_producto;
--le otrogamos un alias a la tabla para agilizar el proceso. Por ejemplo, en la linea 84 el alias es 'c' y refiere a compra.--
                                                            --de ahora en más, para referirmos a la tabla 'compra' se usara 'c'--


----------------------------------


