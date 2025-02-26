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
