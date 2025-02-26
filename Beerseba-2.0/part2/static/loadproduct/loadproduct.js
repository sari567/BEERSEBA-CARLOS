document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Previene el envío hasta que se validen los campos.

    // Validación de Nombre del Producto
    const nombreProducto = document.getElementById("nom01");
    if (nombreProducto.value === "") {
        alert("El nombre del producto es obligatorio.");
        nombreProducto.focus();
        return;
    }

    // Validación de Descripción
    const descripcion = document.getElementById("desc01");
    if (descripcion.value === "") {
        alert("La descripción es obligatoria.");
        descripcion.focus();
        return;
    }

    // Validación de Categoría
    const categoriaSeleccionada = document.querySelector('input[name="opcion"]:checked');
    if (!categoriaSeleccionada) {
        alert("Debe seleccionar una categoría.");
        return;
    }

    // Validación de Talles
    const tallesSeleccionados = document.querySelectorAll('.checkbox:checked');
    if (tallesSeleccionados.length === 0) {
        alert("Debe seleccionar al menos un talle.");
        return;
    }

    // Validación de Imagen
    const archivoImagen = document.getElementById("arch01");
    if (archivoImagen.value === "") {
        alert("Debe seleccionar una imagen.");
        archivoImagen.focus();
        return;
    }

    // Validación de Colores
    const coloresSeleccionados = document.querySelectorAll('.checkbox-color:checked');
    if (coloresSeleccionados.length === 0) {
        alert("Debe seleccionar al menos un color.");
        return;
    }

    // Si todas las validaciones pasan
    alert("Formulario enviado con éxito.");
    this.submit();
});
