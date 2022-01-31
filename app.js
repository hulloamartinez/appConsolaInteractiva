require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
     inquirerMenu, 
     pausa,
     leerInput,
     listadoTareasBorrar,
     confirmar,
     mostrarListadoChecklist
     } = require('./helpers/inquirer');

const Tareas = require('./Models/tareas');


const main  = async() =>{

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTarea(tareasDB);
    }
   
    do {

      opt = await inquirerMenu();  
      
      switch (opt) {
          case '1': //crear una tarea
              const desc = await leerInput('Descripcion:');
              tareas.crearTarea(desc);
          break;
          case '2'://listar todas
              tareas.listadoCompleto();
          break; 
          case '3'://listar las completadas
            tareas.listarCompletadas(true);      
          break;      
          case '4'://listar las incompletas
            tareas.listarCompletadas(false);
          break; 
          case '5':// dejar completas o incompletas
              const ids = await mostrarListadoChecklist (tareas.listadoArr);
              tareas.toggleCompletadas(ids);
               
          break;  
          case '6': //borrrar
               const  id = await listadoTareasBorrar(tareas.listadoArr);
              
               if(id!=='0'){
                    const oka = await confirmar('Estas seguro????')
                    if(oka){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    }
                }
          break;      
      
          default:
              break;
      }

      guardarDB(tareas.listadoArr);   

      await pausa();

    } while (opt !=='0');
    


}

main();