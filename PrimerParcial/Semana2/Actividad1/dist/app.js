"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const servicio_1 = require("./service/servicio");
console.log("Hallo Welt");
const servicio1 = new servicio_1.CRUDServicio();
const servicioNuevo = {
    nombre: "Corte de pelo",
    precio: 15000,
    descripcion: "Corte de pelo para perros de raza pequeña"
};
servicio1.createServicio(servicioNuevo);
console.log(servicio1.readServicio());
const servicioActualizado = {
    id: 1,
    nombre: "Corte de pelo",
    precio: 1500,
    descripcion: "Corte de pelo para perros de raza pequeña"
};
servicio1.updateServicio(1, servicioActualizado);
console.log(servicio1.readServicio());
console.log(servicio1.consultarPorId(1));
servicio1.deleteServicio(1);
console.log(servicio1.readServicio());
//# sourceMappingURL=app.js.map