//Hecho por Neysser Delgado
import ICliente from "../domain/ICliente";

const clientes: ICliente[] = [];

export class ServicioCliente{
    constructor(){
        console.log("Servicio de Cliente creado");
    }

    // create con Callbacks
    create(cliente: ICliente, callback: CallableFunction): void{
        // validación de datos
        // Verificar si el cliente ya existe
        const clienteExiste = clientes.find((c)=>c.id_cliente === cliente.id_cliente);
        if(clienteExiste){
            return callback(new Error("Ya existe un cliente con ese id"), null); // si sale man
        }

        setTimeout(()=>{ // simulacion de latencia de red
            try{
                clientes.push(cliente);
                callback(null, cliente); // si sale bien
            }catch(error){
                callback(new Error("Error al incertar cliente"), null) // si sale mal
            }
        }, 1500);
    }

    // update con promise
    update(id: string, datos: ICliente): Promise<ICliente>{
        return new Promise((resolve, reject)=>{
            // simulacion de latencia
            setTimeout(()=>{
                // Validar que si exista ese cliente 
                const clienteIndex = clientes.findIndex((c)=>c.id_cliente===id);
                if(clienteIndex===-1){
                    return reject(new Error("Cliente no encontrado"));
                }
                
                clientes[clienteIndex] = datos;
                resolve(datos);
                }, 1500);
        });
    }

    // read con Async/Await
    async read(): Promise<ICliente[]>{
        try{
            // esto es para simular una operación de asincronia
            await new Promise(resolve => setTimeout(resolve, 1500));
            return clientes;
        }catch(error){
            throw error;
        }
    }

    async readById(id: string): Promise<ICliente>{
        try{
            await new Promise(resolve => setTimeout(resolve, 1500));
            const cliente = clientes.find((c)=>c.id_cliente===id);
            if(!cliente){
                console.log(cliente);
                throw new Error("Usuario no encontrado");
            }
            return cliente;
        }catch(error){
            throw error;
        }
    }


    // delete con Async/Await
    async delete(id: string): Promise<boolean>{
        try{
            // simular latencia
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const clienteIndex = clientes.findIndex((c)=>c.id_cliente === id);
            if(clienteIndex === -1){
                console.error("Cliente no fue encontrado");
                return false; // esto es para en caso de no encontrar el cliente
            }

            clientes.splice(clienteIndex, 1); // esto es una eliminacion fisica
            console.log("Cliente eliminado");
            return true; // true para cuando si encuentra y elimina
        }catch(error){
            console.error("Error al eliminar cliente: ", (error as Error).message);
            return false; // en caso de salir mal
        }
    }

}