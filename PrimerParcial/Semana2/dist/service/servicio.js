"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDServicio = void 0;
const servicios = [];
class CRUDServicio {
    constructor() {
        console.log("Servicio Iniciado");
    }
    createServicio(nuevoServicio) {
        const servicio = {
            id: servicios.length + 1,
            ...nuevoServicio
        };
        servicios.push(servicio);
        console.log("Servicio creado");
    }
    readServicio() {
        return servicios;
    }
    updateServicio(id, nuevo_servicio) {
        const idx_viejo_servicio = servicios.findIndex((servicio) => servicio.id === id);
        if (idx_viejo_servicio === -1) {
            console.log("Servicio no encontrado");
            return;
        }
        servicios.splice(idx_viejo_servicio, 1);
        servicios.push(nuevo_servicio);
        console.log("Servicio actualizado");
    }
    deleteServicio(id) {
        const idx_viejo_servicio = servicios.findIndex((servicio) => servicio.id === id);
        if (idx_viejo_servicio === -1) {
            console.log("Servicio no encontrado");
            return;
        }
        servicios.splice(idx_viejo_servicio, 1);
        console.log("Servicio eliminado");
    }
    consultarPorId(id) {
        const servicio = servicios.find((servicio) => servicio.id === id);
        if (!servicio) {
            throw new Error("No se encontró el servicio");
        }
        return servicio;
    }
}
exports.CRUDServicio = CRUDServicio;
//# sourceMappingURL=servicio.js.map