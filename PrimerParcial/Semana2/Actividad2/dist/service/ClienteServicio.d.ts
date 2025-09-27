import ICliente from "../domain/ICliente";
export declare class ServicioCliente {
    constructor();
    create(cliente: ICliente, callback: CallableFunction): void;
    update(id: string, datos: ICliente): Promise<ICliente>;
    read(): Promise<ICliente[]>;
    readById(id: string): Promise<ICliente>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=ClienteServicio.d.ts.map