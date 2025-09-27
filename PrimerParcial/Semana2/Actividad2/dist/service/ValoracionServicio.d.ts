import type IValoracion from "../domain/IValoracion";
export declare class servicioValoracion {
    constructor();
    createValoracion(nuevaValoracion: IValoracion, callback: CallableFunction): void;
    readValoraciones(): Promise<IValoracion[]>;
    readValoracionById(id: string): Promise<IValoracion | null>;
    updateValoracion(id: string, nuevaValoracion: IValoracion): Promise<IValoracion>;
    deleteValoracion(id: string): Promise<string>;
}
//# sourceMappingURL=ValoracionServicio.d.ts.map