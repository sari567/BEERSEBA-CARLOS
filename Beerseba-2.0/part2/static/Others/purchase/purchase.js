
function validacion(){
    alert("Gracias por su compra :D")
}

/*Eventos cargardos al iniciar el html */
function cargar_eventos_purchase(){
    cargar_barra()                                                             /* Ejecuta la funcion */
    cargar_dropdown()
    cargar_logo()

    dropdown_2()                                                                /* Ejecuta la funcion */
    window.addEventListener("resize",dropdown_2);                               /* Evento que sondea el width de la ventana */
}