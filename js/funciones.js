window.addEventListener("load",inicio);
let miSistema = new Sistema();
function inicio(){
    document.getElementById("button").addEventListener("click", donante);
    document.getElementById("button2").addEventListener("click", donacion); 
    document.getElementById("monto_decreciente").addEventListener("change",cargarTabla);
    document.getElementById("nombre_donante_creciente").addEventListener("change",cargarTabla);
    document.getElementById("Resaltado").addEventListener("click",cargarTabla);
    document.getElementById("demonto").addEventListener("change",cargarTabla);
    sinDatos();
}


function donante(){
    if(document.getElementById("formA").reportValidity()){
       let nombre = document.getElementById("Nombre").value;
       let direccion = document.getElementById("Dirección").value;
       let telefono = document.getElementById("Teléfono").value;
       
       //Llamo a una función para que compruebe si hay algun donante registrado con ese nombre
       //hayUnoRepetido recibe el valor true o false dependiendo de si hay uno repetido o no
       let hayUnoRepetido = miSistema.donanteRepetido(nombre); //Llama a la funcion donanteRepetido que se encuentra en miSistema y le pasa el valor donante

        if(!hayUnoRepetido){ //Si no hay ninguno repetido, queremos que haga el alta
            let miDonante = new Donante(nombre,direccion,telefono);
            miSistema.agregarDonante(miDonante); 
            cargarNombre(nombre);
            document.getElementById("formA").reset();
        }   
        else{
            alert("Error: Ingrese un donante con un nombre que no haya sido registrado.")}   
        }
}   

function cargarNombre(nombre){
    let combo = document.getElementById("selectDonante");
    let nodo = document.createElement("option");
    let nodoText = document.createTextNode(nombre);
    nodo.appendChild(nodoText);
    combo.appendChild(nodo);
}
function donacion(){
    if(document.getElementById("formB").reportValidity()){
        let donante = document.getElementById("selectDonante").value;
        let modo = document.getElementById("selectModo").value;
        let monto = document.getElementById("monto").value;
        let comentarios = document.getElementById("comentarios").value;
        document.getElementById("formB").reset();
        for (i=0;i<miSistema.arrayDonante.length;i++){
            if(miSistema.arrayDonante[i].nombre==donante){
                objetoDonante = miSistema.arrayDonante[i]};                  
            }
        let miDonacion = new Donacion(objetoDonante,modo,monto,comentarios);
        miSistema.agregarDonacion(miDonacion);
        cargarTabla();        
    }
    
} 
function cargarTabla(){
    let tabla = document.getElementById("idTabla");
    tabla.innerHTML="";

    if(miSistema.arrayDonacion.length>0){
        let ordenadoDecre = document.getElementById("monto_decreciente").checked;
        let ordenadoPorNombre = document.getElementById("nombre_donante_creciente").checked;
        let resaltado = document.getElementById("Resaltado").checked;
        let orden = [];
        
        if(ordenadoDecre){
            orden = miSistema.arrayordenadoPorMonto(ordenadoDecre);
        }
        else{
            orden = miSistema.arrayordenadoPorNombre(ordenadoPorNombre); //Orden que se iguala a la func
        }

        let fila1 =  tabla.insertRow();
        let celda1 = fila1.insertCell();
        let celda2 = fila1.insertCell();
        let celda3 = fila1.insertCell();
        let celda4 = fila1.insertCell();
        celda1.innerHTML = "Donante";
        celda2.innerHTML = "Modo";
        celda3.innerHTML = "Monto";
        celda4.innerHTML = "Comentarios"; 

    for(i=0;i<orden.length;i++){
        let valores = orden[i];
        let fila = tabla.insertRow();
    
        for(let k in valores){
            let celda = fila.insertCell();
            celda.innerHTML = valores[k]
            if(k=="monto"){ //Cuando estemos en la celda de monto, vamos a pintar su texto de color verde o rojo
                pintarMonto(i,celda);
            }
            
            if(resaltado){ //Si la casilla de "Resaltar filas" está activada, pintamos el fondo de cada celda
                pintarFondoCelda(i,celda);
            }

        } 
    }
    //Parte izquierda
    mostrartotalGeneral();//Actualiza el cartel de total general que hay a la izquierda
    mostrarDonacionMayor();//Actualiza el cartel de donación general que hay a la izquierda

    //Parte de estadísticuas
    mostrarTotalDonaciones(); //Muestra la cantidad total de donaciones
    mostrarPromedio(); //Muestra el promedio de los montos de las donaciones
    mostrarDonadorFrecuente(); //Muestra quién o quiénes fueron los donantes que más veces donaron
    drawChart();
}
else{
    sinDatos();
}

}
function sinDatos(){
    if(miSistema.arrayDonante.length==0){
        let tabla = document.getElementById("idTabla");
        let fila1 =  tabla.insertRow();
        let celda1 = fila1.insertCell();
        celda1.innerHTML = "NO HAY DATOS"
    }
} 

function pintarMonto(i, idCeldaAEditar){
    let montoCelda = miSistema.arrayDonacion[i].monto;
    if(montoCelda>=1000){
        idCeldaAEditar.style.color = "red";    
    }
    else{idCeldaAEditar.style.color = "green"}
   }

function pintarFondoCelda(i,celda){
    let montoBox = document.getElementById("demonto").value;
            let montoCelda = miSistema.arrayDonacion[i].monto; //El valor de "i" lo necesitamos para poder 
             if(montoBox==montoCelda){
                celda.style.backgroundColor = "yellow";
             }
    }

function mostrartotalGeneral(){
    let cajaTotal = document.getElementById("totalgeneral");
    let total = miSistema.totalGeneral();
    cajaTotal.innerHTML = "$" + total;
    
}

function mostrarDonacionMayor(){
    let cajaMontoDonacionMayor = document.getElementById("montoDonacionMayor");
    let montoDonacionMayor = miSistema.donacionMayor();
    cajaMontoDonacionMayor.innerHTML = "$" + montoDonacionMayor;
    
}

function mostrarTotalDonaciones(){
let cajaTotalDonacion = document.getElementById("cantidadTotalDonacion")
let totalDonacion = miSistema.cantidadTotalDonaciones();
cajaTotalDonacion.innerHTML= "Cantidad total de donaciones: " +totalDonacion;
}

function mostrarPromedio(){
    let cajaPromedio = document.getElementById("promedio");
    let totalPromedio = miSistema.promedio();
    cajaPromedio.innerHTML = "Promedio por donación: " + totalPromedio;
}

    function mostrarDonadorFrecuente(){
        
        let cajaDonadorFrecuente = document.getElementById("donanteMayor"); //Me guardo la referencia al <p> de donante frecuente
        let ulDonadoresFrecuentes = document.getElementById("listaMasVecesDono"); //Me guardo la referencia al ul con los donantes
        let donadorFrecuente = miSistema.mayorDonante();

        if(donadorFrecuente.length<=1){
            cajaDonadorFrecuente.innerHTML = "";
            ulDonadoresFrecuentes.innerHTML = "";

            cajaDonadorFrecuente.innerHTML = "Donante que mas veces donó: " + donadorFrecuente;
        }
        else{
            cajaDonadorFrecuente.innerHTML = "Los donantes que mas veces donaron son:";
            ulDonadoresFrecuentes.innerHTML = "";

            for(let stringConNombreDonante of donadorFrecuente){

                //Creo un elemento li con el nombre de un donante en cada iteración.
                let nodoLi = document.createElement("li");

                let nodoTexto = document.createTextNode(stringConNombreDonante);
            
                nodoLi.appendChild(nodoTexto);
            
                ulDonadoresFrecuentes.appendChild(nodoLi);

            }    
        }


    }