import type IServicio from "../domain/IServicio";
import { DtoCrearServicio } from "../dto/crearUsuario.dto";

const servicios: IServicio[] = [];


export class CRUDServicio {
    constructor(){
        console.log("Servicio Iniciado");
    }

    createServicio(nuevoServicio: DtoCrearServicio):void{
        const servicio = {
            id: servicios.length + 1,
            ...nuevoServicio
        }

        servicios.push(servicio);
        console.log("Servicio creado");
    }

    readServicio(): IServicio[]{
        return servicios;
    }

    updateServicio(id: number, nuevo_servicio: IServicio): Promise<IServicio>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                const idx_viejo_servicio = servicios.findIndex((servicio)=>servicio.id === id);
                if(idx_viejo_servicio===-1){
                    reject("Servicio no encontrado");
                }
                servicios.splice(idx_viejo_servicio, 1);
                servicios.push(nuevo_servicio);
                console.log("Servicio actualizado");
                return resolve(nuevo_servicio);
            }, 2000);

        });
        
        // const idx_viejo_servicio = servicios.findIndex((servicio)=>servicio.id === id);
        // if(idx_viejo_servicio===-1){
        //     console.log("Servicio no encontrado");
        //     return;
        // }
        // servicios.splice(idx_viejo_servicio, 1);
        // servicios.push(nuevo_servicio);
        // console.log("Servicio actualizado");
    }

    deleteServicio(id: number, callback: CallableFunction):void{
        let msg_error;
        let msg_solve;
        const idx_viejo_servicio = servicios.findIndex((servicio)=>servicio.id === id);
        if(idx_viejo_servicio===-1){
            console.log("Servicio no encontrado");
            msg_error = "Servicio no encontrado";
            callback(msg_error);
        }else{
            servicios.splice(idx_viejo_servicio, 1);
            msg_solve = "Servicio eliminado";
            callback(msg_solve);
        }
       
        console.log("Servicio eliminado");
    }

    consultarPorId(id: number): IServicio{
        const servicio = servicios.find((servicio)=> servicio.id === id);
        if(!servicio){
            throw new Error("No se encontró el servicio");
        }
        return servicio;
    }
}