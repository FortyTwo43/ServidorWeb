import { Routes, Route } from 'react-router-dom';
import ArquitectoList from '../components/arquitectoList';
import VistaVerMas from '../views/vistaVerMas';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ArquitectoList />} />
      <Route path="/ver-mas" element={<VistaVerMas />} />
    </Routes>
  );
}