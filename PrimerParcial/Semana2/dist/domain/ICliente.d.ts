import type IMascota from "./IMascota";
import type IReserva from "./IReserva";
export default interface ICliente {
    id: number;
    nombre: string;
    identificacion: string;
    mascotas: IMascota[];
    reservas: IReserva[];
}
//# sourceMappingURL=ICliente.d.ts.map