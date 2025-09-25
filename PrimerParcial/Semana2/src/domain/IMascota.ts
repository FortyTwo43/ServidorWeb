import type ICliente from "./ICliente";

export default interface IMascota {
    id: number;
    nombre: string;
    edad: number;
    raza: string;
    cliente: ICliente
}