from _mysql_db import *
from datetime import datetime


def search_table_by_data(table,column,data):
    sql = "SELECT * FROM {} WHERE {} = %s;".format(table,column)
    val = data
    return selectDB(sql=sql,val=val)

def register_user(data):
    sql = "INSERT INTO USUARIOS (Nombre,Apellido,Email,Pass,TipoUsuario,Celular,NumeroIdentidad,TipoIdentidad,Img) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s);"
    val = data
    return insertDB(sql=sql,val=val)

def modify_user(data):
    sql = "UPDATE USUARIOS SET Nombre=%s,Apellido=%s,Pass=%s,TipoUsuario=%s,Celular=%s,NumeroIdentidad=%s,TipoIdentidad=%s,Img=%s WHERE Email=%s;"
    val = data
    return updateDB(sql=sql,val=val)

def search_stock_of_produt(data):
    sql = "SELECT * FROM Producto_Talle WHERE id_producto=%s AND Talle=%s AND Color=%s;"
    val = data
    return selectDB(sql=sql,val=val)

def register_purchase(data):
    sql = "INSERT INTO Compra (Id_usuario, Fechahora, Estado) VALUES (%s,%s,%s);"
    val = data
    return insertDB(sql=sql,val=val)  

def register_purchase_detail(data):
    sql = "INSERT INTO Compra_Detalle (Id_compra, Id_producto, Cantidad, Precio, Talle) VALUES (%s,%s,%s,%s,%s);"
    val = data
    return insertDB(sql=sql,val=val)  

def modify_stock(data):
    sql = "UPDATE Producto_Talle SET Stock=%s WHERE Id=%s;"
    val = data
    return updateDB(sql=sql,val=val)

def request_products():
    sql = "SELECT * FROM Producto"
    return selectDB(sql=sql)


#prueba = ('CARLOS JULIAN', 'TUPAC YUPANQUI', 'Canyon123**', 'cliente', '9295701145', '483220077', 'DNI', '../static/pics/profile.png', 'CTUPAC_29@OUTLOOK.COM')
#modify_user(prueba)
#modify_stock(("193","17"))
#deleteDB(sql="DELETE FROM USUARIOS WHERE Email=%s;",val=("ctupac_29@gmail.com",))
#hola = ()
#print(request_products())
#print(search_table_by_data("USUARIOS","Email","ctupac_29@outlook.com"))
#print(search_table_by_data("USUARIOS","Email","ctupac_29@outlook.com"))
#print(search_stock_of_produt(("6","8","rojo")))
#print(search_user_by_mail("martha24@gmail.com"))

def request_pedido():
    sql = "SELECT compra.fechahora, usuarios.nombre, usuarios.apellido,compra_detalle.cantidad,producto.Nombre AS Producto,  producto_talle.talle,compra_detalle.precio,compra.estado FROM compra  INNER JOIN USUARIOS  ON usuarios.id = compra.id_usuario INNER JOIN Compra_Detalle ON compra.id = compra_detalle.id_compra INNER JOIN Producto_talle ON compra_detalle.Id_producto_talle = producto_talle.id INNER JOIN producto  ON producto.id = producto_talle.id_producto;"
    resultado = selectDB(sql=sql) 
    if not resultado:
        return []  # Devolver lista vacía si no hay resultados
    
    # Convertir la lista de tuplas en una lista de diccionarios para facilitar el acceso en la plantilla
    pedidos = []
    for row in resultado:
        pedidos.append({
            "fecha": row[0],
            "nombre": row[1],
            "apellido": row[2],
            "cantidad": row[3],
            "producto": row[4],
            "talle": row[5],
            "precio": row[6],
            "estado": row[7],
            "producto_id": row[8]
        })
    
    return pedidos
    return selectDB(sql=sql)