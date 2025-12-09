import { Outlet } from 'react-router-dom';
import { Menu } from '../Componentes/Menu';

export function DSGo() {
  return (
    <div className="corpo" aria-label="Aplicativo Stardew Valley">
      {/* Conteúdo principa */}
      <main role="main">
        <Outlet />
      </main>

      {/* Navegação principal */}
      <nav aria-label="Menu principal">
        <Menu />
      </nav>
    </div>
  );
}
