const Tarea = require("./tarea");


class Tareas{

    _listado = {
        abc:'123'
    };

    //getters y setters

    get listadoArr (){
        //creo arreglo para guardar listados
        const listado = [];
        //busco las keys de las instancias de Tareas en _listado y las guardo en el arreglo 
        //listado
        //y devuelvo el arreglo con todas las tareas.
        Object.keys(this._listado).forEach( key =>{
            //console.log(key);
            const tarea  = this._listado[key];
            listado.push(tarea);
        } );

        return listado;

    } 

    constructor(){

        this._listado = {};
    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        
    }

    cargarTarea(tareas=[]) {
        
       
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        
        });
        
    }
    

    listadoCompleto(){

        this.listadoArr.forEach((tarea, i )=> {

            const idx =`${i +1}`.green;
            const { descripcion, completadoEn } = tarea;
            const estado = (completadoEn)
                ?'Completada'.green
                :'Pendiente'.red;
            console.log(`${ idx } ${descripcion} :: ${estado} `);


        });
        

    }

    listarCompletadas(completadas = true){

        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {

           
            const { descripcion, completadoEn } = tarea;
            const estado = (completadoEn)
                ?'Completada'.green
                :'Pendiente'.red;
            
            if( completadas ){

                if(completadoEn) {
                    contador  +=1
                    console.log(`${ contador.toString().green } ${descripcion} :: ${completadoEn.green} `);
                }
                
            }else {

                if(!completadoEn) {
                    contador  +=1
                    console.log(`${ contador.toString().green } ${descripcion} :: ${estado} `);     
                }
            }
            
        });

    }

    borrarTarea(id = ''){

        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas (ids = []) {
        
        
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea =>{

            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;  
            }

        })

    }
   

}


module.exports = Tareas;