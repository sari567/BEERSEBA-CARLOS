

/* https://regexr.com/3a2i5 */
const pattern_mail = /^(?=.{1,25}$)([\w\.]+)@([\w\.]+)\.(\w+)$/

/* Validación de campo (1º Nombre).
Permite incluir:
-Un nombre normal o compuesto.
-Caracteres alfabeticos ("Ñ, ñ y ü").
-Uso de prep, contrac. y art.
-Uso de Iniciales. */
const pattern_nombre = /^(?=.{1,25}$)[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\s+[-\sa-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)?$/


/* Validación de campo (1º Apellido).
Permite incluir:
-Un apellido normal o compuesto.
-Caracteres alfabeticos ("Ñ, ñ y ü").
-Uso de prep. "de ó De ó Del" delante, contrac. y art.
-Uso de Iniciales.
-Ver ejemplos. */
const pattern_apellido = /^(?=.{1,25}$)[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\s+[-\sa-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)?$/

/* 8 digitos*/
const pattern_dni = /\d{9,15}/

/* 10 digitos*/
const pattern_celular = /\d{9,15}/

/*La contraseña debe tener:
Al entre 8 y 16 caracteres, 
Al menos un dígito, al menos una minúscula, 
Al menos una mayúscula y 
Al menos un caracter no alfanumérico*/
const pattern_clave = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/


// Validate field against regex pattern and show/hide error message
function alerta_error(id, alerta, rege) {
    const element = document.getElementById(id)
    element.style.backgroundColor = 'white'
    
    const value = element.value
    const isValid = rege.test(value)
    const alert = document.getElementById(alerta)
    
    alert.className = (isValid || value.length === 0) ? 'anular' : 'aparecer'
}

// Event handlers for field validation
const validationEvents = {
    'id_mail': [pattern_mail, 'alerta_mail'],
    'id_nombre': [pattern_nombre, 'alerta_nombre'], 
    'id_apellido': [pattern_apellido, 'alerta_apellido'],
    'id_identity': [pattern_dni, 'alerta_identity'],
    'id_celular': [pattern_celular, 'alerta_celular'],
    'id_clave': [pattern_clave, 'alerta_clave']
}

// Form submission validation
function validar_todo(event) {
    // Validate select and checkbox
    const select = document.getElementById('id_seleccionar')
    if (select.value === '0') {
        document.getElementById('alerta_seleccionar').className = 'aparecer'
    }
    
    const checkbox = document.getElementById('id_box4')
    if (!checkbox.checked) {
        document.getElementById('alerta_box').className = 'aparecer'
    }

    // Validate required fields
    Object.keys(validationEvents).forEach(id => {
        const value = document.getElementById(id).value
        if (!value) {
            document.getElementById(validationEvents[id][1]).className = 'aparecer'
        }
    })

    // Check for any validation errors
    const errors = document.getElementsByClassName('aparecer')
    if (errors.length === 0) {
        alert('Registro recibido')
    } else {
        alert('Revisar las indicaciones resaltadas')
        event.preventDefault()
    }
}

// Clear error messages
function clearError(alertId) {
    document.getElementById(alertId).className = 'anular'
}


// Initialize form validation
function cargar_eventos_signup() {
    cargar_barra()
    cargar_dropdown() 
    cargar_logo()

    // Add blur event listeners for field validation
    Object.entries(validationEvents).forEach(([id, [pattern, alert]]) => {
        document.getElementById(id).addEventListener('blur', () => alerta_error(id, alert, pattern))
    })

    // Form submission handler
    document.getElementById('mysignup').addEventListener('submit', validar_todo)
    


    // Clear error handlers
    document.getElementById('id_box4').addEventListener('click', () => clearError('alerta_box'))
    document.getElementById('id_seleccionar').addEventListener('input', () => clearError('alerta_seleccionar'))
}
