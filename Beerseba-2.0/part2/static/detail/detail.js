
function validarCompra(event){
    var color = document.forms["form.detalles"]["color"].value;
    var talle = document.forms["form.detalles"]["talle"].value;
    
    if ((color == null || color == "") || (talle == null || talle == "")) {
        alert("Falta completar campos");
        event.preventDefault()
    }

    }

    
//document.querySelector('.btn-fav').onclick=function(){
//        const favoriteRegular = document.getElementById('favorite-regular');
//        const addedFavorite = document.getElementById('added-favorite');
//        favoriteRegular.classList.toggle('active');
//        addedFavorite.classList.toggle('active');
//}

function cargar_eventos_detail(){
    cargar_barra()                                                             /* Ejecuta la funcion */
    cargar_dropdown()
    cargar_logo()
    dropdown_2()                                                                /* Ejecuta la funcion */
    window.addEventListener("resize",dropdown_2);                               /* Evento que sondea el width de la ventana */
    document.getElementById("mypurchase").addEventListener("submit", validarCompra)
}


