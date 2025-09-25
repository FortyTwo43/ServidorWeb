import type { Arquitecto } from '../interfaces/arquitecto';

function ArquitectoVerMas({ arquitecto }: { arquitecto: Arquitecto }) {
  return (
    <div className="arquitecto-ver-mas">
      <p><strong>Nombre:</strong> {arquitecto.nombre}</p>
      <p><strong>Descripcion:</strong> {arquitecto.descripcion}</p>
      <p><strong>Puntuación:</strong> {arquitecto.puntuacion}</p>
    </div>
  );
}

export default ArquitectoVerMas;