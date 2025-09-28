
// RAiz proyecto
import { servicioValoracion } from "./service/ValoracionServicio"
import IValoracion from "./domain/IValoracion";
import ICliente from "./domain/ICliente";
import { ServicioCliente } from "./service/ClienteServicio";
import { ClienteRepository } from "./Repository/ClienteRepository";


// Hecho por Leo Holguin
const CRUDValoracion = new servicioValoracion();

const nueva: IValoracion = {
    id_valoracion: "1",
    id_cliente: "C001",
    id_usuario: "U123",
    calificacion: 5,
    comentario: "Excelente servicio",
    fecha: new Date()
};

// CREATE con callback
CRUDValoracion.createValoracion(nueva, (err: any, data: IValoracion) => {
    if (err) {
        console.error("Error al crear:", err);
    } else {
        console.log("Creado con éxito:", data);
    }
});

// READ con async/await
(async () => {
    const todas = await CRUDValoracion.readValoraciones();
    console.log("Todas las valoraciones:", todas);

    const una = await CRUDValoracion.readValoracionById("1");
    console.log("Valoración buscada:", una);
})();

// UPDATE con Promise
CRUDValoracion.updateValoracion("1", { ...nueva, comentario: "Muy bueno" })
    .then((actualizado) => console.log("Actualizado:", actualizado))
    .catch((err) => console.error("Error al actualizar:", err));

// DELETE con async/await
(async () => {
    try {
        const msg = await CRUDValoracion.deleteValoracion("1");
        console.log(msg);
    } catch (err) {
        console.error(err);
    }
})();


// Hecho por Neysser Delgado
import { registroClientes } from "./Repository/registrosClientes";

const repoCliente = new ClienteRepository();
const servicioCliente = new ServicioCliente(repoCliente);

const nuevo_cliente: ICliente = {
    id_cliente: "C0011",
    usuario: {
        id_usuario: "U0011",
        nombre: "Ricardo Varela",
        email: "ricardo.varela@gmail.com",
        rol: "cliente",
        estado: "activo",
        password: "contrasenasegura",
        fechaRegistro: new Date(),
    }
};

// Create con callbacks
servicioCliente.create(nuevo_cliente, (error: any, cliente: ICliente)=>{
    if(error){
        console.error("Error: ", error.message);
    }else{
        console.log("Cliente insertado: ", cliente);
    }
});


// Update con promise y encadenamiento con .then() y. catch()
servicioCliente.update("C0001",{
    id_cliente: "C0001",
    usuario: {
        id_usuario: "U0001",
        nombre: "Pedro Garcia", // se cambia el nombre
        email: "juan123@gmail.com",
        rol: "cliente",
        estado: "activo",
        password: "contrasenasegura",
        fechaRegistro: new Date(),
    }})
.then((clienteActualizado)=>{console.log("Cliente Actualizado: ", clienteActualizado)})
.catch((error)=>{console.error("Error: ", error)})


// Read individual con async/await
async function leerClienteIndividual(id: string) {
    try{
        const cliente = await servicioCliente.readById(id);
        console.log("Cliente obtenido: ", cliente);
    }catch(error){ 
        console.error(error);
    }
}

leerClienteIndividual("C0001");

// Read con async/await
async function leerClientes(){
    try{
        const clientes = await servicioCliente.read();
        console.log("Clientes obtenidos: ", clientes);
    }catch(error){
        console.error("Error: ", error);
    }
}

leerClientes();

// Delete con async/await
async function eliminarCliente(id: string) {
    const eliminado: boolean = await servicioCliente.delete(id);
    if(eliminado){
        console.log("Cliente fue eliminado");
    }else{
        console.error("Error: Cliente no fue eliminado");
    }
}

eliminarCliente("C0001");
