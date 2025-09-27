// hecho por Leo Holguin
import type IValoracion from "../domain/IValoracion";


const valoraciones: IValoracion[] = [];

export class servicioValoracion {
    constructor() {
        console.log("CRUD de Valoraciones Iniciado");
    }

    // CREATE con Callback
    createValoracion(nuevaValoracion: IValoracion, callback: CallableFunction): void {
        try {
            valoraciones.push(nuevaValoracion);
            console.log("Valoración creada");
            callback(null, nuevaValoracion); // success
        } catch (error) {
            callback(error, null); // error
        }
    }

    // READ con async/await
    async readValoraciones(): Promise<IValoracion[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Valoraciones consultadas");
                resolve(valoraciones);
            }, 1000);
        });
    }

    async readValoracionById(id: string): Promise<IValoracion | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const valoracion = valoraciones.find(v => v.id_valoracion === id);
                if (!valoracion) {
                    console.log("Valoración no encontrada");
                    return resolve(null);
                }
                console.log("Valoración encontrada");
                resolve(valoracion);
            }, 1000);
        });
    }

    // UPDATE con Promise
    updateValoracion(id: string, nuevaValoracion: IValoracion): Promise<IValoracion> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = valoraciones.findIndex(v => v.id_valoracion === id);
                if (index === -1) {
                    return reject("Valoración no encontrada");
                }
                valoraciones[index] = nuevaValoracion;
                console.log("Valoración actualizada");
                resolve(nuevaValoracion);
            }, 1000);
        });
    }

    // DELETE con async/await
    async deleteValoracion(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = valoraciones.findIndex(v => v.id_valoracion === id);
                if (index === -1) {
                    console.log("Valoración no encontrada");
                    return reject("Valoración no encontrada");
                }
                valoraciones.splice(index, 1);
                console.log("Valoración eliminada");
                resolve("Valoración eliminada con éxito");
            }, 1500);
        });
    }
}

