
function cargar_eventos_whoweare(){
    cargar_barra()                                                             /* Ejecuta la funcion */
    cargar_dropdown()
    cargar_logo()
    dropdown_2()     

    window.addEventListener("resize",dropdown_2);    
}