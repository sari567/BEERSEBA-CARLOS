-- Active: 1730730181407@@mysql-carlost.alwaysdata.net@3306@carlost_berseeva2


SHOW DATABASES;



SELECT  c.id,
        u.id,
        c.fechahora, 
        cd.cantidad, 
        p.Nombre AS Producto, 
        ptl.talle, 
        cd.precio,
        c.estado
FROM Compra c 
INNER JOIN USUARIOS u ON u.id = c.id_usuario 
INNER JOIN Compra_Detalle cd ON c.id = cd.id_compra
INNER JOIN Producto_Talle ptl ON cd.Id_Producto_talle = ptl.id
INNER JOIN Producto p ON p.id = ptl.id_Producto
WHERE u.id= 1;

SELECT * FROM `Compra_Detalle`;
SELECT * FROM `Compra`;

SELECT * FROM Producto_Talle WHERE id_producto=6;

SELECT * FROM USUARIOS;


SELECT * FROM `Tipo_Producto`;

DELETE FROM `Compra_Detalle` WHERE `Id`="4";

DELETE FROM `Compra` WHERE `Id`="12";

UPDATE Producto SET id_tipo_producto=2 WHERE Id=4;

SELECT p.Nombre, t.Id, t.Tipo 
FROM `Producto` p
INNER JOIN `Tipo_Producto` t ON p.id_tipo_producto = t.`Id`;

SELECT * FROM Producto_Talle WHERE id_producto=6 AND Talle="8" AND Color="azul";

SELECT * FROM `Compra`;

