from route import register_routes
from flask import Flask
from flask_session import Session
from datetime import timedelta


def create_app():

    app = Flask(__name__)
    register_routes(app)
    app.config["SECRET_KEY"] = "some random string"
    app.config["SESSION_TYPE"] = "filesystem"
    app.config["SESSION_PERMANENT"] = False
    app.config['UPLOAD_FOLDER'] = "/home/car/Project1/ucaweb/Beerseba-2.0/part2/static/upload"
    

    #app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30)
    #app.config["SESSION_USE_SIGNER"] = True
    #app.config["SESSION_COOKIE_SECURE"] = True
    #app.config["SESSION_COOKIE_HTTPONLY"] = True
    #app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    Session(app)
    return app
    

if __name__ == "__main__":
    app = create_app()
    app.run("0.0.0.0", 5000, debug=True)


""" Pendiente de funcion comprar cuando no esta logueado 
    Pendiente funcion olvidar contraseña
    Redireccion de login a la antigua compra 
    helpandsupport isn't working
    favoritos isn't working agregar una nueva tabla
    No funciona el boton Buscar
    Ocultar los links
"""