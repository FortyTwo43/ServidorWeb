import type ICliente from "./ICliente";
import type IMascota from "./IMascota";
import type IServicio from "./IServicio";

export default interface IReserva{
    id: number;
    fecha: string;
    cliente: ICliente;
    mascota: IMascota;
    servicio: IServicio;
}