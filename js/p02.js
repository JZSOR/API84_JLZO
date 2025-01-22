const btnBuscar = document.getElementById('buscar');
const btnLimpiar = document.getElementById('limpiar');
const mensaje = document.getElementById('mensaje');
const tabla = document.getElementById('table');
const tbody = document.getElementById('tbody');

btnBuscar.addEventListener('click', buscar);
btnLimpiar.addEventListener('click', limpiar);

function buscar(){
    limpiar();
    const Id = document.getElementById("idjson").value;

    if(!Id){
        mensaje.innerHTML = "No capturaste ninguna ID";
        return;
    }
    
    const http = new XMLHttpRequest;
    const url = "https://jsonplaceholder.typicode.com/users";
    http.open('GET', url, true);
    http.send();

    http.onreadystatechange = function(){
    // Validar la respuesta.
        if (this.readyState == 4 && this.status == 200){
            
            const datos = JSON.parse(this.responseText);
            const datosid = datos.filter(item => item.id == parseInt(Id));
                
            if (datosid.length > 0) {
                datosid.forEach(item => {

                const fila = document.createElement('tr');
                
                const col1 = document.createElement('td');
                col1.textContent = item.id;
                fila.appendChild(col1);

                const col2 = document.createElement('td');
                col2.textContent = item.name;
                fila.appendChild(col2);

                const col3 = document.createElement('td');
                col3.textContent = item.username;
                fila.appendChild(col3);

                const col4 = document.createElement('td');
                col4.textContent = item.email;
                fila.appendChild(col4);

                const col5 = document.createElement('td');
                col5.textContent = item.phone;
                fila.appendChild(col5);

                const col6 = document.createElement('td');
                col6.textContent = item.website;
                fila.appendChild(col6);

                const col7 = document.createElement('td');
                col7.textContent = `${item.company.name}, ${item.company.catchPhrase}, ${item.company.bs}`;
                fila.appendChild(col7);

                const col8 = document.createElement('td');
                col8.textContent = `${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}, ${item.address.geo.lat}, ${item.address.geo.lng}`;
                fila.appendChild(col8);

                tbody.appendChild(fila);
                        
            })
            
            mensaje.innerHTML = "Datos cargados correctamente. ";
            
            } else {
                mensaje.innerHTML = "ID incorrecto o no encontrado. "
            }
        } else if (this.readyState == 4) {
            mensaje.innerHTML = "Ocurrio un error al realizar la busqueda."
        }
    }
}


function limpiar(){

    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    
}