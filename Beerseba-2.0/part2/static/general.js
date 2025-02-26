/*Evento cargado desde el HTML*/
function openNav() {    
    document.getElementById("nav1").style.width = "250px";                      /*Modifica el contenedor del desplegable1*/
    document.getElementById("nav1").style.height = "100%";                      /*Modifica el contenedor del desplegable1*/
    document.getElementById("mySidebar").style.display ="grid";                 /*Muestra y ocupa un nuevo espacio del desplegable1*/
    document.getElementById("barra-desplegable").style.visibility = "hidden";   /*Oculta y mantiene el espacio cuando se despliega boton ☰*/
}

/*Evento cargado desde el HTML*/
function closeNav() {
    document.getElementById("nav1").style.width = "0";                          /*Modifica el contenedor del desplegable1*/
    document.getElementById("nav1").style.height = "0";                         /*Modifica el contenedor del desplegable1*/
    document.getElementById("mySidebar").style.display = "none";                /*Oculta y no mantiene el espacio el desplegable1*/
    document.getElementById("barra-desplegable").style.visibility = "visible";  /*Muestra y no ocupa un nuevo espacio cuando se despliega boton ☰*/
}


/* Funcion para cambiar de lugar el desplegable2 del conetender nav-bar al pegar_1 */
function dropdown_2(){
    const winwidth = window.innerWidth;                                           /* Ejecuta la funcion */
    const navmove = document.getElementById("nav-adicional")                      /* Id de la etiqueta que se movera*/
    const space1 = document.getElementById("pegar_1")                             /* Id contenedor izquierda del logo*/
    const space2 = document.getElementById("nav-bar")                             /* Id contenedor derecha de logo*/
    if(600 > winwidth){
        console.log("es menor que 600")                     /*log para probar el evento*//*log*/
        if(null != navmove){
            space1.appendChild(navmove)
            document.getElementById("nav-adicional").style.display ="grid";         /*alineados uno debajo de otro*/
        }                                            /*mueve al espacio 2*/
    }
    else if(600 <= winwidth){
        console.log("es mayor que 600")   
        if(null != navmove){
            space2.appendChild(navmove)
            document.getElementById("nav-adicional").style.display ="flex";         ///alineados uno al lado del otro
        }
    }
}   

/*************************** Load tags ************************************/ 

function crearelemento({tag=null,id=null,cla=null,eve=null,inn=null,ref=null}){
    if (tag!=null){
        element = document.createElement(tag)
    }
    if (id!=null){
        element.setAttribute("id",id)
    }
    if (cla!=null){
        element.setAttribute("class",cla)
    }
    if (eve!=null){
        element.setAttribute("onclick",eve)
    }
    if (ref!=null){
        element.setAttribute("href",ref)
    }
    if (inn!=null){
        element.innerHTML = inn
    }
    return element
}

function cargar_barra(){
    divbarra = crearelemento({tag:"div",cla:"barra-superior"})
    div = crearelemento({tag:"div",cla:"contacto"})
    span = crearelemento({tag:"span",inn:"+54 9 11 2338-4312"}) ///
    div.appendChild(span)
    span = crearelemento({tag:"span",inn:"beersebaonline@gmail.com"})
    div.appendChild(span)
    divbarra.appendChild(div)
    div = crearelemento({tag:"div",cla:"mayorista",inn:"VENTA MAYORISTA TALLES ESPECIALES"})
    divbarra.appendChild(div)
 
    document.getElementById("java1").appendChild(divbarra) 
}

function cargar_dropdown(){
    navdropdown = crearelemento({tag:"nav",id:"nav1",cla:"navbar"})

    button = crearelemento({tag:"button",id:"barra-desplegable",cla:"openbtn",eve:"openNav()",inn:"☰"})
    navdropdown.appendChild(button)

    div = crearelemento({tag:"div",id:"mySidebar",cla:"sidebar"})
    a = crearelemento({tag:"a",id:"sidebar-a",eve:"closeNav()",inn:"x"})
    div.appendChild(a)
    p = crearelemento({tag:"p",id:"pegar_1"})
    div.appendChild(p)
    a = crearelemento({tag:"a",cla:"sidebar-a",ref:"/",inn:"INICIO"})
    div.appendChild(a)
    a = crearelemento({tag:"a",cla:"sidebar-a",ref:"/onlyproducts",inn:"PRODUCTOS"})
    div.appendChild(a)
    a = crearelemento({tag:"a",cla:"sidebar-a",ref:"/whoweare",inn:"QUIENES SOMOS"})
    div.appendChild(a)
    navdropdown.appendChild(div)
    
    document.getElementById("java1").appendChild(navdropdown) 

}

function cargar_logo(){
    logo = crearelemento({tag:"div",id:"nav-bar",cla:"logo1"})
    div = crearelemento({tag:"div",cla:"logo"})
    a = crearelemento({tag:"a",ref:"/"})
    img = crearelemento({tag:"img"})
    img.setAttribute("src","../static/pics/image-removebg-preview.png")
    img.setAttribute("alt","Beerseba Logo")
    a.appendChild(img)
    div.appendChild(a)
    logo.appendChild(div)

    document.getElementById("java1").appendChild(logo)
}

function cargar_producto(){
    queryAjax("/loadproduct","idproductos","GET")
}





/** 
 * 
 * Los objetos XMLHttpRequest (XHR) se utilizan para interactuar con los servidores. 
 * Puede recuperar datos de una URL sin tener que actualizar la página completa. 
 * Esto permite que una página web actualice solo una parte de una página sin 
 * interrumpir lo que está haciendo el usuario.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestUpload/
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestUpload/loadstart_event
 * https://developer.mozilla.org/es/docs/Web/Guide/AJAX/Getting_Started
 * 
 * 
*/
// ======= + + + + + + + + + + + + + + + + + + + + + =========
// ======= + + + + + INICIO: FUNCIONES AJAX + + + + + =========
// ======= + + + + + + + + + + + + + + + + + + + + + =========


function queryAjax(url, idDest,method="POST",dataSend=null) {
    /**Realiza una una petición request al servidor 'url'. NO envía datos 
     * al servidor 'xhr.send(null)', sólo hace la petición a la url y 
     * almacena la respuesta dentro del nodo cuyo id sea 'idDest'
     * 
     * url:    es la dirección donde se obtiene los datos (es el servidor)
     * idDest: es el id de un elemento html de la página. Es donde se escribirán 
     *         los datos recibido de la url.
     * method: es el metodo del request. Es la forma en que se trasnmite los datos
     *         en el protocolo htttp. Puede ser POST o GET. Por default es POST.
     * 
     * dataSend: son los datos que se envian al servidor en la petición. Por lo general 
     *           le asignamos 'FormData' donde enviaremos un estructura clave-valor.
     *           Si dataSend=null entonces en la paticion no estamos enviando datos 
     *           hacia el servidor.
     *    
     */

    const xhr = new XMLHttpRequest();                          // Creo el objeto AJAX     
    if(xhr) {
        xhr.timeout = 20000;                                    // setear el tiempo de timeout.
        xhr.open(method, url, true);                           // Abre la connección AJAX. false = sincro , true = asincro
        document.body.style.cursor = 'wait';                   // Setea la espera: Poner el cursor del mouse en espera
                                                               // otra opocion sería setear una imagen de espera en el div   

        xhr.onload = () => {
            // Evento load  se activa cuando una solicitud XMLHttpRequest 
            // se completa exitosamente.
            document.body.style.cursor = 'default';        // Resetea la espera: Poner el cursor del mouse en normal
            textHTML = xhr.responseText;                   // RECUPERA la respuesta que viene del servidor en formato html
            setDataIntoNode(idDest,textHTML);  
            //console.log("Terminado con exito");
        };

        xhr.ontimeout = () => {
            // Evento timeout se activa cuando la solicitud finaliza debido a que 
            // expira el tiempo preestablecido.
            // document.body.style.cursor = 'default'; 
            console.log("Terminado por expiración de tiempo");
        };

        xhr.onloadend = () => {
            // El evento 'loadend' se activa cuando se completa una solicitud, ya sea con éxito 
            // (después de 'load') o sin éxito  (por un 'timeout', un 'abort', o un 'error')
            document.body.style.cursor = 'default';  
                     
        };  
        xhr.send(dataSend); // Envio de solicitud 'request' al sevidor
    }
    else{
        console.log('No se pudo instanciar el objeto AJAX!'); // Falló la conección
    }
}


/* =========- - - - - - FIN: FUNCIONES AJAX - - - - - - =======*/

/* ============+ + + + INICIO: FUNCIONES AUXILIARES + + +======
// ============================================================
// ==== Funciones Auxiliares que NO SON AJAX pero las utilizamos
// ==== para cumplir los objetivos
// ============================================================*/


function queryAjaxForm(url, idDest,idForm,input,method="POST"){
    /**Realiza una una petición request al servidor 'url'. 
     * Utiliza la función 'queryAjax' para enviar la petición.
     * ENVIA datos de un formulario al servidor; es decir envia pares 
     * name : value del formulario cuyo id es 'idForm'. 
     * 
     * url:    es la dirección donde se obtiene los datos (el servidor)
     * idDest: es el id de un elemento html donde se escribirán los datos recibido de la url
     * idForm: es el id del formulario del cual se enviarán lo pares claves / valor.
     * method: es el metodo del request, puede ser POST o GET. Por defaul es POST
     * 
     * https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
     * */
    
    //var formData =getDataForm(idForm);                           
    var formData = new FormData(); // esta forma reemplaza a la función getDataForm
    formData.append(idForm, input)
    queryAjax(url, idDest,method,formData);

                                            /** formData manual ..
                                             *  Se puede armar los datos name:value de un formulario desde el código
                                             *  JS sin necedidad que exista el form en el html y así enviar los pares name:value
                                             *  Ej:
                                             *    var formData = new FormData();
                                             *    formData.append('nombre', 'Mariano'); // simula ser el name y el valor del input
                                             *    formData.append('apellido', 'Garcia'); // simula ser el name y el valor del input                                          
                                             *  */ 

}

function getDataForm(idForm){
    /**Retorna un objeto FormData() con los name y value de los elementos
     * del formulario cuyo id de formuario es 'idForm' pasado por parámetros.
     * 
     * Preparado para los siguientes type: text, password, checkbox, radio, file y select
     *   
     * https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
     * */
    var formData = new FormData();    
    /** Tratamiento para los input, incluye los tipos
     *  tipos: text, password, checkbox, radio, file 
     */    
    data=document.forms[idForm].getElementsByTagName("input");                // Obtener los input
    for (let i=0; i<data.length;i++) {                                        // recorrer los elementos del formulario
        if (data[i].name!=undefined && data[i].value!=undefined)
            if (data[i].type=='text' || data[i].type=='password'){
                formData.append(data[i].name, data[i].value);                 //  agrega a formData el par name/value
            }
            else if ((data[i].type=='checkbox' || data[i].type=='radio') && data[i].checked){
                formData.append(data[i].name, data[i].value);                 //  agrega a formData el par name/value
            }
            else if (data[i].type=='file'){
                formData.append(data[i].name, data[i].files[0]);              //  agrega a formData el par name/value
            }
    }
    /** Tratamiento para los select 
     *  incluye tanto para una selección simple como para selección múltiple.
     */
    data=document.forms[idForm].getElementsByTagName("select");               // Obtener los select
    for (let i=0; i<data.length;i++) {                                        // recorrer los elementos del formulario
        if(data[i]!=undefined && data[i].type=='select-one' ){                //   Para selección simple
            nombre=data[i].name;                                              //     obtiene el name
            valor=data[i].options[data[i].selectedIndex].value;               //     obtiene el value
            formData.append(nombre, valor);                                   //     agrega a formData el par name/value
        }
        if(data[i]!=undefined && data[i].type=='select-multiple'){            //   Para selección multiple
            nombre=data[i].name;                                              //     obtiene el name
            for(let j=0;j<data[i].selectedOptions.length;j++){                //     recorrer los elementos seleccionados
                formData.append(nombre, data[i].selectedOptions[j].value);    //       agrega a formData el par name/value
            }
        }
    }
//console.log([...formData]); // Visualizar en consola el 'formData' convertido a array

return formData;                                                              // retorna el objeto formData
}

function setDataIntoNode(idDest,textHTML){
    /**
     * Realiza la carga de un html 'textHTML' en el nodo cuyo id es 'idDest'
     * 
     * 'textHTML' es un texto en formato html 
     * 'idDes' es un id de un tag html dentro del documento y es donde se cargará
     *         el contenido de 'textHTML'
     * 
     * Comentario: Esta función se desarrolló debido a que hay distintos tratamientos
     *              para asignar contenido html a un nodo.
     * 
     * Conclusión: Lo mejor (en la medida que se pueda) designar un 'idDest' de un tag 'div' 
     *             para colocar la información 'textHTML'. Esto es mejor porque div 
     *             tiene la propiedad innerHTML.
     *              
     */

    let oElement; // objeto
    let sNameTag; // string
    let elementsReadOnlyInnerHTML;                                 // array donde se almacen los tipos de nodos que no tienen innerHTML
    elementsReadOnlyInnerHTML = ["INPUT","COL", "COLGROUP", "FRAMESET", "HEAD", "HTML",                                  
                                 "STYLE", "TABLE", "TBODY","TFOOT", "THEAD", "TITLE","TR"
                                ];
    
    if(document.getElementById(idDest)) {                          // Si existe el 'idDest'
        oElement = document.getElementById(idDest);                // Obtener el nodo del 'idDest'
        sNameTag = oElement.tagName.toUpperCase();                 // Pasar a mayuscula el nombre del tag, para luego hacer búsqueda en array
        //console.log("***"+sNameTag);
        if(elementsReadOnlyInnerHTML.indexOf(sNameTag) == -1) {    // ¿No está en el array de lo tag que no tienen innerHTML?
            oElement.innerHTML = textHTML;                         // Asignar el contenido en el nodo de 'idDest' en la ropiedad innerHTML
        }
        else if(sNameTag == 'INPUT') {                                  
            oElement.value = textHTML;                             // Asignar el contenido en la propiedad value
        }
        else {
            setAnyInnerHTML(oElement, textHTML); 
            //console.log('El elemento destino, cuyo id="'+idDest+'", no posee propiedad "innerHTML" ni "value"!');
        }                    
    }
    else {
        console.log('El elemento destino, cuyo id="'+idDest+'", no existe!');
    }    
}

function setAnyInnerHTML(oElement, html) {
    /** agrega el contenido 'html' en undiv hijo de elemento 'oElement' pasado por parámetro*/
    var temp = oElement.ownerDocument.createElement('div');
    //temp.innerHTML = '<table><tbody id="'+tbody.id+'">' + html + '</tbody></table>';
    temp.innerHTML =   html ;
    oElement.parentNode.replaceChild(temp.firstChild.firstChild, oElement);
}
/* ============- - - -  INICIO: FUNCIONES AUXILIARES - - - ====== */





/*
// NO USADO, FORMA CON NAVEGADORES ANTIGUOS
function conectAjax() {
    // Retorna el objeto xhr que es una instancia de XMLHttpRequest()
    //  xhr se utilizará para enviar peticiones http al servidor
    
	var xhr = false;        		                  //	CREA variable del OBJETO "AJAX".  
    if (window.XMLHttpRequest) {                      // -> Mozilla, Safari, ...
		xhr = new XMLHttpRequest();                   // OBJETO "AJAX" Mozilla, Safari, ...
    } else if (window.ActiveXObject) {                // -> IE
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); //OBJETO "AJAX"  IE
    }
    return xhr;                                       // RETORNA el objeto AJAX
}
*/