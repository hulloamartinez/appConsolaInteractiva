const { resolve } = require('path');
require ('colors');


const mostrarMenu = ()=> {

    return new Promise(resolve =>{

        console.clear();

        console.log('========================'.green);
        console.log('SELECCIONE UNA OPCION'.green);
        console.log('========================'.green);

        console.log(`${ '1.'.green }. Crear Tarea`);
        console.log(`${ '2.'.green }. Listar Tareas`);
        console.log(`${ '3.'.green }. Listar Tareas completadas`);
        console.log(`${ '4.'.green }. Listar Tareas endientes`);
        console.log(`${ '5.'.green }. Completar Tarea(s)`);
        console.log(`${ '6.'.green }. Borrar Tarea`);
        console.log(`${ '0.'.green }. Salir \n`);

        //interfaz poara recibir e enviar informacion

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('Seleccione una opción: ', (opt =>{
            //console.log({ opt });
            readLine.close();
            resolve(opt);
        }));


    });

    
}

const pausa = () =>{

    return new Promise(resolve =>{
        const readLine = require('readline').createInterface({

            input: process.stdin,
            output: process.stdout
    
        });
    
        readLine.question(`\n presione ${'Enter'.green } Para continuar`, (opt =>{
            
            readLine.close();
            resolve();
        }));
    

    })
    
}



module.exports = {
    mostrarMenu,
    pausa
}