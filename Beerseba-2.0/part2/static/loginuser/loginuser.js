
function prueba1(event) {                        /*Parametro necesario para asociarlo al metodo */


    /*
    Variables defined with const cannot be Redeclared
    Variables defined with const cannot be Reassigned
    Variables defined with const have Block Scope
    */

    const email = document.getElementById("email")
    const pass = document.getElementById("password")
    const pEmail = document.getElementById("warning-mail")
    const pPass = document.getElementById("warning-password")

    const ExpRegEmail = /^(?=.{1,25}$)([\w\.]+)@([\w\.]+)\.(\w+)$/                       /*expresion regular para el email*/
    const expRegPass = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/         /*Expresion regular para que la contraseña contenga la primera letra mayuscula y al menos un numero*/


    /* Metodo que previene de enviar el form */

    let warningA = ""
    let warningB = ""

    let entrar = false                      /*inicializa la variable en falso */
    /*metodo test, true si es correcto, false si es incorrecto */
    if (!ExpRegEmail.test(email.value)) {                 /*Niega la el resultado del regex */
        warningA += 'El Email no es valido <br>';       /*Concatena el string */
        entrar = true                                   /*Cambia el valor de la variable */
    }

    if (!expRegPass.test(pass.value)) {                  /*Niega la el resultado del regex */
        warningB += 'La contraseña no es válida <br> Primera letra mayuscula y debe contener al menos un número'
        entrar = true                                   /*Cambia el valor de la variable */
    }

    if (entrar) {
        event.preventDefault()
        pEmail.innerHTML = warningA                     /*Agrega el string a la etiqueta con el id declarado*/
        pPass.innerHTML = warningB                      /*Agrega el string a la etiqueta con el id declarado*/

    }


}


function cargar_eventos_loginuser() {
    cargar_barra()                                                             /* Ejecuta la funcion */
    cargar_dropdown()
    cargar_logo()
    
    dropdown_2()
    window.addEventListener("resize", dropdown_2)  

    document.getElementById("mylogin").addEventListener("submit", prueba1)        /* Evento que espera el submit para ejecutar funcion */
}


