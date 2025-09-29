import ArquitectoVerMas from "../components/arquitectoVerMas";
import Imagenes from "../components/imagenes";
import Comentarios from "../components/comentarios";

function vistaVerMas() {
  return (
    <div className="contenido">
      <ArquitectoVerMas arquitecto={ {id: 1, nombre: "LEO", descripcion: "Soy un arquitecto", puntuacion: 1 } }></ArquitectoVerMas>
      <Imagenes></Imagenes>
      <Comentarios></Comentarios>
    </div>
  );
}

export default vistaVerMas;
