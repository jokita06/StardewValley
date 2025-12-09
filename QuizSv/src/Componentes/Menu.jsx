import bau from '../assets/Bau.png';
import { Link, useLocation } from 'react-router-dom'

export function Menu() {
  const location = useLocation();
  
  return (
    <nav 
      className='menu'
      aria-label="Menu de navegação principal"
    >
      <ul role="menubar">
        <Link 
          to='missao' 
          className={location.pathname === '/missao' ? 'active' : ''}
          role="menuitem"
          aria-current={location.pathname === '/missao' ? 'page' : undefined}
        >
          <li>
            <figure className='container-action'>
              <div className="container-icon">
                <img 
                  src={bau} 
                  className='icon-action' 
                  alt="" 
                  aria-hidden="true"
                />
              </div>
              <figcaption className='action-title' aria-label='Página de Missões'>Missões</figcaption>
            </figure>
          </li>
        </Link>
        
        <Link 
          to='inventario' 
          className={location.pathname === '/inventario' ? 'active' : ''}
          role="menuitem"
          aria-current={location.pathname === '/inventario' ? 'page' : undefined}
        >
          <li>
            <figure className='container-action'>
              <div className="container-icon">
                <img 
                  src={bau} 
                  className='icon-action' 
                  alt="" 
                  aria-hidden="true"
                />
              </div>
              <figcaption className='action-title' aria-label='Página de Inventário'>Inventário</figcaption>
            </figure>
          </li>
        </Link>
        <Link 
          to='galeria' 
          className={location.pathname === '/galeria' ? 'active' : ''}
          role="menuitem"
          aria-current={location.pathname === '/galeria' ? 'page' : undefined}
        >
          <li>
            <figure className='container-action'>
              <div className="container-icon">
                <img 
                  src={bau} 
                  className='icon-action' 
                  alt="" 
                  aria-hidden="true"
                />
              </div>
              <figcaption className='action-title' aria-label='>Página da Câmera e Galeria'>Camera</figcaption>
            </figure>
          </li>
        </Link>
        <Link 
          to='geolocalizacao' 
          className={location.pathname === '/geolocalizacao' ? 'active' : ''}
          role="menuitem"
          aria-current={location.pathname === '/geolocalizacao' ? 'page' : undefined}
        >
          <li>
            <figure className='container-action'>
              <div className="container-icon">
                <img 
                  src={bau} 
                  className='icon-action' 
                  alt="" 
                  aria-hidden="true"
                />
              </div>
              <figcaption className='action-title' aria-label='Página de Geolocalização'>Geolocalização</figcaption>
            </figure>
          </li>
        </Link>
      </ul>
    </nav>
  )
}