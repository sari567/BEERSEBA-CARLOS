
from flask import session,request  # For server-side sessions
from model import *
from werkzeug.utils import secure_filename
import os
from uuid import uuid4
from datetime import datetime # Permite usar un metodo que coloca la fecha 


##########################################################################
# + + I N I C I O + + Funtions for user  + + + + + + + + + + + + + + + + +
##########################################################################

def ingresoUsuarioValido(request):
    data = request.form 
    table = "USUARIOS"
    column = "Email"
    lista=search_table_by_data(table,column,data["mail"]) # Devuelve una lista con los datos del usuario
    # [(1, 'MARTHA', 'REYES', 'MARTHA24@GMAIL.COM', 'Canyon123**', 'CLIENTE', '5847640589', '536434365', 'DNI')]
    print(lista)
    account=lista[0]
    
    print(account)
    if account != None and account[4] == data["password"] and account[5] == 'CLIENTE': # Valida los datos del usuario con los del formulario
        cargarSesion(account) # Carga en la sesion todos los datos de usuario
        cargarCompras(account[0]) # Carga en la sesion todas las compras de usuario
        res = True
    else:      
        res = False
    return res 

def registrarUsuarioValido(request):
    data = request.form 
    table = "USUARIOS"
    column = "Email"
    lista=search_table_by_data(table,column,data["mail"]) # Devuelve una lista con los datos del usuario
    # [(1, 'MARTHA', 'REYES', 'MARTHA24@GMAIL.COM', 'Canyon123**', 'CLIENTE', '5847640589', '536434365', 'DNI')]
    
    if len(lista)==0:
        account=(data["nombre"],data["apellido"],data["mail"],data["clave"],"cliente",data["celular"],data["identity"],data["seleccionar"],None)
        register_user(account)

        lista=search_table_by_data(table,column,data["mail"])
        account=lista[0]
        #print(account)
        cargarSesion(account)
        cargarCompras(account[0])
        res = True
        
    else:
        res = False
    return res 

def cambiarDatosUsuario(request, path):

    data = request.form
    print(data)
    print(request.files)
    table = "USUARIOS"
    column = "Email"
    lista=search_table_by_data(table,column,data["mail"]) # Devuelve una lista con los datos del usuario
    account=lista[0]  #(1, 'MARTHA', 'REYES', 'MARTHA24@GMAIL.COM', 'Canyon123**', 'CLIENTE', '5847640589', '536434365', 'DNI')

    if account != None and account[4] == data["clave"]: # Valida la clave y el mail coincidan antes de actualizar.

        #newpath = upload1(request.files, path, account[9])

        account=(data["nombre"].upper(),data["apellido"].upper(),data["clave"],"cliente",data["celular"],data["identity"],data["seleccionar"].upper(), path, data["mail"].upper())
        print(account)
        modify_user(account)

        lista=search_table_by_data(table,column,data["mail"]) # Devuelve una lista con los datos del usuario ACTUALIZADO
        account=lista[0] #(1, 'MARTHA', 'REYES', 'MARTHA24@GMAIL.COM', 'Canyon123**', 'CLIENTE', '5847640589', '536434365', 'DNI')
        cargarSesion(account) # Carga en la sesion todos los datos de usuarios

        

        res = True
    else:       
        res = False
    return res

def validar_stock(request): 
    table = "Producto_Talle"
    column = "id_producto"
    data = request.form
    lista=search_table_by_data(table,column,data["id"])
    
    return lista
    
def encontrar_producto(id):
    table = "Producto"
    column = "Id"
    lista=search_table_by_data(table,column,id) 
    
    if len(lista) == 0:
        res = None
    else:
        account=lista[0]
        res = account
    return res

def cargar_detalle_producto(request):
    data = request.form
    table = "Compra_Detalle"
    column = "Id_compra"
    lista1=search_table_by_data(table,column,data['id'])
    lista1 = lista1[0]
    print(lista1)

    table = "Producto"
    column = "Id"
    lista2=search_table_by_data(table,column,lista1[2])
    lista2 = lista2[0]
    print(lista2)

    lista = (lista1,lista2)
    print(lista)
    return lista

def comprar_producto(request):
    #ImmutableMultiDict([('producto', '6'), ('id', '1'), ('color', 'amarillo'), ('talle', '10'), ('cantidad', '1')])
    data = request.form

    data1 = (data["producto"],data["talle"],data["color"])
    lista=search_stock_of_produt(data1)
    #(17, 6, '8', 15000.0, 194, 'ROJO'),
    cantidad = int(data["cantidad"])

    if not haySesion():
        result  = 1

    elif len(lista) == 0 or cantidad > lista[0][4]: 
        result = 2
    else:
        lista = lista[0]
        user_id = session["id"]

        data2 = (user_id, datetime.now(),"En proceso")
        idlastpurchase = register_purchase(data2)

        data3 = (idlastpurchase, lista[1], data["cantidad"], lista[3], data["talle"])
        register_purchase_detail(data3)

        operation = lista[4] - cantidad

        data4 = (str(operation), str(lista[0]))
        modify_stock(data4)

        cargarCompras(user_id)
        result = 3
    return result
        
def paginaNoEncontrada(name):
    ''' Info:
      Retorna una pagina generica indicando que la ruta 'name' no existe
    '''
    res='Pagina "{}" no encontrada<br>'.format(name)
    res+='<a href="{}">{}</a>'.format("/","Home")
    
    return res

def  pedirproductos():
    lista = request_products()
    return lista

def  detallePedido():
    lista = request_pedido()
    return lista

##########################################################################
# - - F I N - - Functions for user - - - - - - - - - - - - - - - - - - - -
########################################################################## 

##########################################################################
# + + I N I C I O + + Funtions for admin + + + + + + + + + + + + + + + + +
##########################################################################

def ingresoUsuarioValido1(request):
    data = request.form 
    table = "USUARIOS"
    column = "Email"
    lista=search_table_by_data(table,column,data["mail"]) # Devuelve una lista con los datos del usuario
    # [(1, 'MARTHA', 'REYES', 'MARTHA24@GMAIL.COM', 'Canyon123**', 'CLIENTE', '5847640589', '536434365', 'DNI')]
    account=lista[0]
    
    print(account)
    if account != None and account[4] == data["password"] and account[5] == 'ADMINISTRADOR': # Valida los datos del usuario con los del formulario
        cargarSesion(account) # Carga en la sesion todos los datos de usuario
        res = True
    else:      
        res = False
    return res 


##########################################################################
# - - F I N - - Functions for admin- - - - - - - - - - - - - - - - - - - -
##########################################################################


##########################################################################
# + + I N I C I O + + MANEJO DE  SESSION + + + + + + + + + + + + + + + + +
##########################################################################

def cargarCompras(id):
    table = "Compra"
    column = "Id_usuario"
    compras=search_table_by_data(table,column,id) # Devuelve una lista con las compras del usuario
    print(compras)
    session['compras'] = compras

def cargarSesion(listUsuario):
    session['id']         = listUsuario[0]
    session['nombre']     = listUsuario[1]
    session['apellido']   = listUsuario[2]
    session['mail']       = listUsuario[3]
    session['imagen']     = listUsuario[9]
    session['rol']        = listUsuario[5]
    session['celular']    = listUsuario[6]
    session['numerodni']  = listUsuario[7]
    session['tipodni']    = listUsuario[8]
    session["time"]       = datetime.now()
    #print("here")  
    #print(listUsuario[1])

def cerrarSesion():
    '''info:
        Borra el contenido del dict 'session'
    '''
    try:    
        session.clear()
    except:
        pass

def haySesion():  
    '''info:
        Determina si hay una sesion activa observando si en el dict
        session se encuentra la clave 'username'
        retorna True si hay sesión y False si no la hay.
    '''
    return session.get("id")!=None

##########################################################################
# - - F I N - - MANEJO DE  SESSION - - - - - - - - - - - - - - - - - - - -
########################################################################## 


##########################################################################
# + + I N I C I O + + MANEJO DE  SUBIDA DE ARCHIVOS  + + + + + + + + + + +
##########################################################################

def upload1(requestfile,pathfolder, picture):
    file = requestfile['fileToUpload']
    print(file)

    UPLOAD_EXTENSIONS = ['.jpg', '.png', '.gif','.JPG']

    filename = secure_filename(file.filename)               # Funcion para validar el nombre del archivo
    file_extension=os.path.splitext(filename)               # Funcion para obtener la extension
    filename_unique = uuid4().__str__() + str(file_extension[1]) # Crear un nombre aleatorio y le agrega la extension

  
    pathfile = os.path.join(pathfolder, filename_unique)          # Une la ruta con el nombre generado
    #/home/car/Project1/ucaweb/Beerseba-2.0/part2/static/upload/0ecc9fd0-d267-4970-97a9-86cf9d7ce207.png
    print(pathfile)
    file.save(pathfile)

    if picture!=None:
        path1 = "../static/upload/"+picture
        os.remove(path1)

    return filename_unique
    
# revisar funcion de clase
def upload_file (diResult) :
    UPLOAD_EXTENSIONS = ['.jpg', '.png', '.gif','.JPG']
    MAX_CONTENT_LENGTH = 3024 * 4032
    print(request.files)     
    if request.method == 'POST' :         
        for key in request.files.keys():  
            diResult[key]={} 
            diResult[key]['file_error']=False            
            
            f = request.files[key] 
            if f.filename!="":     
                #filename_secure = secure_filename(f.filename)
                file_extension=str(os.path.splitext(f.filename)[1])
                filename_unique = uuid4().__str__() + file_extension
                
                path_filename=os.path.join( config['upload_folder'] , filename_unique)
                print(path_filename)
                #path_filename=os.path.join( 'static/uploads' , filename_unique)
                #print(path_filename)

                # Validaciones
                if file_extension not in UPLOAD_EXTENSIONS:
                    diResult[key]['file_error']=True
                    diResult[key]['file_msg']='Error: No se admite subir archivos con extension '+file_extension
                if os.path.exists(path_filename):
                    diResult[key]['file_error']=True
                    diResult[key]['file_msg']='Error: el archivo ya existe.'
                    diResult[key]['file_name']=f.filename
                try:
                    if not diResult[key]['file_error']:
                        diResult[key]['file_error']=True
                        diResult[key]['file_msg']='Se ha producido un error.'

                        f.save(path_filename)   
                        diResult[key]['file_error']=False
                        diResult[key]['file_name_new']=filename_unique
                        diResult[key]['file_name']=f.filename
                        diResult[key]['file_msg']='OK. Archivo cargado exitosamente'
 
                except:
                        pass
            else:
                diResult[key]={} # viene vacio el input del file upload

    # si existe el archivo devuelve True
    # os.path.exists(os.path.join('G:\\directorio\\....\\uploads',"agua.png"))

    # borrar un archivo
    # os.remove(os.path.join('G:\\directorio\\.....\\uploads',"agua.png"))
            
##########################################################################
# - - F I N - - MANEJO DE  SUBIDA DE ARCHIVOS  - - - - - - - - - - - - - - 
##########################################################################