


/*Eventos cargardos al iniciar el html */
function cargar_eventos_homepage(){
    cargar_barra()                                                             /* Ejecuta la funcion */
    cargar_dropdown()
    cargar_logo()
    dropdown_2()     

    window.addEventListener("resize",dropdown_2);                               /* Evento que sondea el width de la ventana */

    cargar_producto()
}




