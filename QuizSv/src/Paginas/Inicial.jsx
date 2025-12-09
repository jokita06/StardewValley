import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export function Inicial() {
    const navigate = useNavigate();

  return (
    <main className="inicial" aria-label="Página inicial">
      <img 
        src={logo} 
        className="logo" 
        alt="Logo Stardew Valley" 
        aria-describedby="app-description"
      />
     
      {/* Botão para entrar na aplicação principal */}
      <button 
        onClick={() => navigate('/dsgo')} 
        className='btn-stardew'
        aria-label="Entrar no aplicativo Stardew Valley"
      >
        Entrar
      </button>
    </main>
  );
}