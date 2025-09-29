import type { Arquitecto } from '../interfaces/arquitecto';
import { useNavigate } from 'react-router-dom';

function ArquitectoCard({ arquitecto }: { arquitecto: Arquitecto }) {
  const navigate = useNavigate();
  return (
    <div className="arquitecto">
      <p><strong>Nombre:</strong> {arquitecto.nombre}</p>
      <p><strong>Descripcion:</strong> {arquitecto.descripcion}</p>
      <p><strong>Puntuación:</strong> {arquitecto.puntuacion}</p>
      <div className='acciones'>
          <button onClick={ ()=> navigate(`/ver-mas`)} >Ver más</button>
      </div>
    </div>
  );
}

export default ArquitectoCard;
