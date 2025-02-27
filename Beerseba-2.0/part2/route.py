from controller import *
from flask import Flask, request, url_for, redirect, render_template
from uuid import uuid4
import os
from datetime import timedelta  # For session duration
from pathlib import Path  # Better than os for path handling, pending to review
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

def register_routes(app):

    ################################################################################################################
    ################################# Packet HTML GET ########################################################
    ################################################################################################################
    @app.route("/")
    def homepage():
        return render_template('user/homepage.html')
    
    @app.route("/loginuser")
    def loginuser():
        return render_template("user/loginuser.html")
    
    @app.route("/signup")   
    def signup():
        return render_template("user/signup.html")
    
    @app.route("/editprofile")
    def editprofile():
        return render_template("user/editprofile.html")
    
    @app.route("/helpandsupport")
    def helpsupport():
        return render_template("user/helpandsupport.html")
    
    @app.route("/purchase")
    def purchase():
        return render_template("user/purchase.html")
    
    @app.route("/whoweare")
    def whoweare():
        return render_template("user/whoweare.html")
    
    @app.route("/onlyproducts")
    def onlyproducts():
        return render_template("user/onlyproducts.html")

    
    @app.route("/mypurchases")
    def mypurchases():
        return render_template("user/mypurchases.html")
    
    @app.route('/favorites')
    def favorites():
        if 'id' not in session:
            return redirect('login')
        
        id_usuario = session['id']
        favoritos = obtener_favoritos(id_usuario)

        return render_template('user/favorites.html', favoritos=favoritos)


    @app.route('/toggle_favorito', methods=['POST'])
    def toggle_favorito():
        """Agrega o elimina un producto de favoritos"""
        if 'id' not in session:
            return redirect('login')

        id_usuario = session['id']
        id_producto = request.form.get('id_producto')

        # Verificamos si el producto ya está en favoritos
        sql = "SELECT * FROM favoritos WHERE id_usuario = %s AND id_producto = %s"
        fav_existente = selectDB(sql=sql, val=(id_usuario, id_producto))

        
        if fav_existente:
            eliminar_favorito(id_usuario, id_producto)
        else:
            agregar_favorito(id_usuario, id_producto)

        return redirect(request.referrer)
    ################################################

    @app.route("/login")
    def login():
        return render_template("admin/login.html")
    
    @app.route("/admin")
    def admin():
        return render_template("admin/admin.html")
    
    @app.route("/editor")
    def editor():
        return render_template("admin/editor.html")
    
    @app.route("/newproduct")
    def newproduct():
        return render_template("admin/newproduct.html")
    
    @app.route("/pendingorder")
    def pendingorder():
        return render_template("admin/pendingorder.html")
    
    @app.route("/bannereditor")
    def bannereditor():
        return render_template("admin/bannereditor.html")
    
    @app.route("/loadproduct")
    def loadproduct():
        param = pedirproductos()
        return render_template("ayax/loadproduct.html",param=param)
    
    
    
    @app.route('/productos/<idpro>') 
    def productos(idpro):          
        param = encontrar_producto(idpro) # (5, 'Blusa Estampada', 1, '../static/pics/estampada.JPG')
        if param != None: 
            return render_template("user/detail.html", param = param)
        else: 
            return "Producto no encontrado"     

    @app.route("/logout")
    def logout():
        cerrarSesion()  
        return redirect("/") 
    
    @app.route("/logout1")
    def logout1():
        cerrarSesion()  
        return redirect("login") 
    
    ################################################################################################################
    ################################# http packet POST and GET#######################################################
    ################################################################################################################

    # URL for log in a user 
    @app.route("/receivedatalogin", methods=["POST", "GET"])
    # ImmutableMultiDict([('mail', 'MARTHA24@GMAIL.COM'), ('password', 'Canyon123**')])
    def receivedatalogin():    
        if ingresoUsuarioValido(request):
            return redirect("/")
        else:
            param = "Usuario o contraseña incorrecta."
            return render_template("user/loginuser.html",param=param)
    
    # URL for register a new user
    @app.route("/receivedatasignup", methods=["POST", "GET"])
    # ImmutableMultiDict([('mail', 'ctupac_29@gmail.com'), ('nombre', 'Carlos Julian'), ('apellido', 'Tupac Yupanqui'), ('seleccionar', 'DNI'), ('identity', '76576576575'), ('celular', '654654645'), ('clave', 'Papelito1*'), ('box4', 'ok')])
    def receivedatasignup():      
        if registrarUsuarioValido(request):
            return redirect("/")
        else:
            param = "El Email ya ha sido registrado."
            return render_template("user/signup.html",param=param)

    # URL for modify data from table USUARIOS by email, including upload a photo
    @app.route("/receivedataeditprofile", methods=["POST", "GET"])
    # ImmutableMultiDict([('imgUser', ''), ('nombre', 'MARTHA'), ('apellido', 'REYES'), ('celular', '5847640589'), ('mail', 'MARTHA24@GMAIL.COM'), ('seleccionar', 'DNI'), ('identity', '536434370'), ('clave', 'Canyon123**')])
    def receivedataeditprofile():     
        if cambiarDatosUsuario(request, app.config['UPLOAD_FOLDER']):
            param = "Cambio realizado con exito."
        else:
            param = "Contraseña incorrecta."
        return render_template("user/editprofile.html",param=param)
    
    # URL for ask details about each purchase by id
    @app.route("/receibemypurchases", methods=["POST", "GET"])
    # ImmutableMultiDict([('id', '1')])
    def mypurchases1():
        param = cargar_detalle_producto(request)
        return render_template("ayax/purchase1.html", param =param)
    
    # url for ask stock for each product
    @app.route('/stockproducto', methods=["POST", "GET"]) 
    #ImmutableMultiDict([('id', '6')])
    def stockproducto(): 
            param = validar_stock(request)
            if len(param) > 0:
                return render_template("ayax/stock.html", param = param)
            else:
                return "No hay stock"

    # URL for validate if you're logged and buy the product
    @app.route("/receivedatamypurchases", methods=["POST", "GET"])
    #ImmutableMultiDict([('producto', '6'), ('id', '1'), ('color', 'amarillo'), ('talle', '10'), ('cantidad', '1')])
    def receivedatamypurchases():
        result = comprar_producto(request)
        # not logged in
        if result == 1:
            return redirect("/loginuser")
        # not stock
        elif result == 2:
            return "Verificar el stock del producto"
        # sucessfully purchase
        else:           
            return redirect("/mypurchases")
        

    # URL for log in a user 
    @app.route("/receivedatalogin1", methods=["POST", "GET"])
    # ImmutableMultiDict([('mail', 'MARTHA24@GMAIL.COM'), ('password', 'Canyon123**')])
    def receivedatalogin1():    
        if ingresoUsuarioValido1(request):
            return redirect("admin")
        else:
            param = "Usuario o contraseña incorrecta."
            return render_template("admin/login",param=param)
    
    #URL for the rest of possibly URLs
    @app.route('/<name>',methods = ['POST', 'GET'])
    def noEncontrada(name):
        return paginaNoEncontrada(name)
    


