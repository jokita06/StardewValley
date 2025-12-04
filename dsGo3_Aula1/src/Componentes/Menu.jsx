import bau from '../assets/Bau.png';
import { Link, useLocation } from 'react-router-dom'

export function Menu() {
  const location = useLocation();
  
  return (
    <div className='menu'>
      <ul>
        <Link to='missao' className={location.pathname === '/missao' ? 'active' : ''}>
          <li>
            <figure className='container-action'>
              <div className="container-icon">
                <img src={bau} className='icon-action' alt="Missões" />
              </div>
              <figcaption className='action-title'>Missões</figcaption>
            </figure>
          </li>
        </Link>
        
        <Link to='inventario' className={location.pathname === '/inventario' ? 'active' : ''}>
          <li>
            <figure className='container-action'>
              <div className="container-icon">
                <img src={bau} className='icon-action' alt="Camera" />
              </div>
              <figcaption className='action-title'>Invetário</figcaption>
            </figure>
          </li>
        </Link>
        <Link to='camera' className={location.pathname === '/camera' ? 'active' : ''}>
          <li>
            <figure className='container-action'>
              <div className="container-icon">
                <img src={bau} className='icon-action' alt="Camera" />
              </div>
              <figcaption className='action-title'>Camera</figcaption>
            </figure>
          </li>
        </Link>
      </ul>
    </div>
  )
}