
class Sistema {
    constructor(){
        this.arrayDonante = [];
        this.arrayDonacion = [];
    }
         agregarDonante(miDonante) {
         this.arrayDonante.push(miDonante);
    }

        agregarDonacion(miDonacion){
            this.arrayDonacion.push(miDonacion);
        }
        darArray(){                  
            return this.arrayDonacion; //Devuelve el array...
        }

        arrayordenadoPorMonto(ordenadoDecre){
            if(ordenadoDecre){
                this.darArray().sort(function (seg,prim){
                    return prim.monto-seg.monto;});
            }
            return this.darArray();
            }   
            
      
        
        arrayordenadoPorNombre(ordenadoPorNombre){//Nos faltaba el return de la linea 31, por eso no andaba ya que no retornaba nada, y por lo tanto a la variable orden no le llegaba ningun dato, por eso UNDEFINED
            if(ordenadoPorNombre){
                                                                          
                this.darArray().sort((a, b) => a.donante.nombre.localeCompare(b.donante.nombre));
                return this.darArray();
            }
        }
        donanteRepetido(nombreDonante){
            let estaRepetido = false;
            
            for(let i=0;i<this.arrayDonante.length;i++){
                if(nombreDonante == this.arrayDonante[i].nombre){
                    estaRepetido = true;
                }      
            }
            return estaRepetido;
        }  
        
        
        totalGeneral(){
            let total = 0;
            for(i=0;i<miSistema.arrayDonacion.length;i++){
                let monto = parseInt(miSistema.arrayDonacion[i].monto);
                total = total + monto;
            }
            return total;
        }

        
        donacionMayor(){
            let max = 0;
             for(i=0;i<miSistema.arrayDonacion.length;i++){
             let monto = miSistema.arrayDonacion[i].monto;
                 if(monto>max){
                     max = monto;
                 }           
             }
         return max;
        }

         cantidadTotalDonaciones(){
            let totalDonacion = miSistema.arrayDonacion.length;
            return totalDonacion; 
        }

        promedio(){
        let suma = 0;
        let cant = 0;
        let promedio = 0;
        for(let objeto of miSistema.arrayDonacion){
            suma = suma + parseInt(objeto.monto);
            cant++;
        }
        if (cant>0){
            promedio = Math.floor(suma / cant); //Math.floor redondea hacia abajo
        }
        return promedio;
        }
        mayorDonante(){

            let listaDonadoresMasFrecuentes = [];
            let valoresDonaciones=[];
            
            for(let donanteRecorrido of miSistema.arrayDonante){
                 let contador = 0;
                for(let i=0;i<miSistema.arrayDonacion.length;i++){
                    
                    if(donanteRecorrido.nombre == miSistema.arrayDonacion[i].donante.nombre){ 
                        //Si el nombre que estamos recorriendo en el array donantes coincide con el de una donación, incrementamos un contador
                        
                        contador++;
                    }
                }
          
                //Al terminar de contar cuantas veces donó el donador que estoy recorriendo... entonces me guardó la "info" de la "cantidad de veces" en un array
                valoresDonaciones.push(contador);
            }
            
            let max = 0;
            for(let i=0;i<valoresDonaciones.length;i++){
                    if(valoresDonaciones[i]>max){
                        max = valoresDonaciones[i];
                    }
            }
            //Ahora tengo el valor del máximo
            for(let i=0;i<valoresDonaciones.length;i++){
                if(valoresDonaciones[i] == max){
                    listaDonadoresMasFrecuentes.push(miSistema.arrayDonante[i].nombre); //Agrego el donante o los donantes que coinciden con la máxima cantidad de veces que se donó
                }
            }
            
            return listaDonadoresMasFrecuentes;
        }
        
        
        modosIngresados(){
            
            //Efectivo
            //Transferencia
            //Canje
            //Mercaderia
            //Cheque
            //Otros
            
            let contadores = [0,0,0,0,0,0];

            
            for(let objetos of this.arrayDonacion){
                if(objetos.modo == "Efectivo"){
                    contadores[0] = contadores[0] + 1;
                }
                if(objetos.modo == "Transferencia"){
                    contadores[1] = contadores[1] + 1;
                }
                if(objetos.modo == "Canje"){
                    contadores[2] = contadores[2] + 1;
                }
                if(objetos.modo == "Mercaderia"){
                    contadores[3] = contadores[3] + 1;
                }
                if(objetos.modo == "Cheque"){
                    contadores[4] = contadores[4] + 1;
                }
                if(objetos.modo == "Otros"){
                    contadores[5] = contadores[5] + 1;
                }

            }
            return contadores;
           }     
}
class Donante {
    constructor(miNombre,miDireccion,miTelefono){
    this.nombre = miNombre;
    this.direccion = miDireccion;
    this.telefono = miTelefono;   
}
    toString(){
        return  this.nombre+ " (" + this.direccion +" ," +this.telefono+")";
    }
}

class Donacion {
    constructor(miDonante,miModo,miMonto,miComentarios){
        this.donante = miDonante;
        this.modo = miModo;
        this.monto= miMonto;
        this.comentarios = miComentarios;
    }
}