// NotFound.jsx
import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
    return (
        <div className="not-found-container">
            <h2 className="not-found-title">404 - Página no encontrada</h2>
            <p className="not-found-message">Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/" className="not-found-link">Volver a la página de inicio</Link>
        </div>
    )
}
