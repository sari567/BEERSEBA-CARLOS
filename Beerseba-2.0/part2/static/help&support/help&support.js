
function valdacion_helpandsupport() {

    const email = document.getElementById("box-email");
    const pEmail = document.getElementById("warning-mail");

    const nombre = document.getElementById("box-name");
    const pName = document.getElementById("warning-name");

    const number = document.getElementById("box-number");
    const pNumber = document.getElementById("warning-number");

    const texto = document.getElementById("text-box"); // Cambiado de "box-texto"

    const pTexto = document.getElementById("warning-texto");
    const form = document.getElementById("contacto");

    form.addEventListener("submit", validacion) 

    function validacion(e){

        e.preventDefault(); // Evitar el envío inicial del form

        // Limpiar mensajes previos
        pEmail.innerHTML = "";
        pName.innerHTML = "";
        pNumber.innerHTML = "";
        pTexto.innerHTML = "";

        let warningA = "";
        let warningB = "";
        let warningC = "";
        let warningD = "";

        let ExpRegEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        let ExpRegNombre = /^[a-zA-Z\s]+$/; // Nueva expresión regular para validar nombres sin números
        let RegNum = /^[0-9]*$/;

        let entrar = false;

        // Validar email
        if (!ExpRegEmail.test(email.value)) {
            warningA += 'El Email no es válido <br>';
            entrar = true;
        }

        // Validar nombre (al menos 6 caracteres y sin números)
        if (nombre.value.length < 6 || !ExpRegNombre.test(nombre.value)) {
            warningB += 'Ingrese un Nombre válido <br>';
            entrar = true;
        }

        // Validar número (solo números y longitud mínima)
        if (!RegNum.test(number.value) || number.value.length < 8) {
            warningC += 'Ingrese un número de contacto válido (mínimo 8 dígitos) <br>';
            entrar = true;
        }

        // Validar el texto (más de 5 caracteres)
        if (texto.value.length < 5) {
            warningD += 'Por favor ingrese un texto <br>';
            entrar = true;
        }

        // Mostrar los warnings si hay errores
        if (entrar) {
            pEmail.innerHTML = warningA;
            pName.innerHTML = warningB;
            pNumber.innerHTML = warningC;
            pTexto.innerHTML = warningD;
        } else {
            form.submit(); // Enviar el formulario si no hay errores
        }

        
    }
}

function cargar_eventos_helpandsupport(){
    cargar_barra()                                                             /* Ejecuta la funcion */
    cargar_dropdown()
    cargar_logo()
    dropdown_2()     

    window.addEventListener("resize",dropdown_2);                               /* Evento que sondea el width de la ventana */

}