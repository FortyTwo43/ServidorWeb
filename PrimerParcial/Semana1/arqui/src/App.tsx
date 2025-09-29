import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='menu-superior'>
        <p>Contactos</p>
        <p>Chats</p>
        <p>Arquitecto</p>

      </div>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App;
