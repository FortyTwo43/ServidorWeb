import { CRUDServicio } from "./service/servicio";
import { DtoCrearServicio } from "./dto/crearUsuario.dto";
import IServicio from "./domain/IServicio";

console.log("Hallo Welt");

const servicio1 = new CRUDServicio();

const servicioNuevo: DtoCrearServicio = {
    nombre: "Corte de pelo",
    precio: 15000,
    descripcion: "Corte de pelo para perros de raza pequeña"
}
servicio1.createServicio(servicioNuevo);
console.log(servicio1.readServicio());

const servicioActualizado: IServicio = {
    id: 1,
    nombre: "Corte de pelo",
    precio: 1500,
    descripcion: "Corte de pelo para perros de raza pequeña"
}

function manejar_error(error?:string, resolve?: string){
    if(error){
        console.log(error);
    }
    console.log(resolve);
}

const pintar = async()=>{
    const rest = await servicio1.updateServicio(1, servicioActualizado);
    console.log(rest);
}

pintar();

// servicio1.updateServicio(1, servicioActualizado);
console.log(servicio1.readServicio());

console.log(servicio1.consultarPorId(1));

servicio1.deleteServicio(1, manejar_error);
console.log(servicio1.readServicio());