import type IServicio from "../domain/IServicio";
import { DtoCrearServicio } from "../dto/crearUsuario.dto";
export declare class CRUDServicio {
    constructor();
    createServicio(nuevoServicio: DtoCrearServicio): void;
    readServicio(): IServicio[];
    updateServicio(id: number, nuevo_servicio: IServicio): void;
    deleteServicio(id: number): void;
    consultarPorId(id: number): IServicio;
}
//# sourceMappingURL=servicio.d.ts.map