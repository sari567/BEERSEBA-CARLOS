
function loadDoc(id) {
    const xhttp = new XMLHttpRequest();
    
    xhttp.onload = function() {
      document.getElementById('demo'+id).innerHTML = this.responseText; 
      }
    xhttp.open("POST", "receibemypurchases", true);
    var formData = new FormData()
    formData.append('id', id)                      
    xhttp.send(formData);
  }


// Initialize form validation
function cargar_eventos_mypurchase() {
    cargar_barra()
    cargar_dropdown() 
    cargar_logo()

    dropdown_2()
    window.addEventListener("resize",dropdown_2);  
    
}