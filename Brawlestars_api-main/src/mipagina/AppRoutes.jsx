import { Route, Routes } from "react-router-dom";
import PageHome from "./home/pageHome";
import PageContact from "./contact/pageContact";
import PageAbout from "./about/pageAbout";
import HomePage from "../pages/HomePage";   
import NotFound from "./NotFound";
import Dashboard from "./dash/Dashboard";
import DetalleBrawler from "../pages/DetalleBrawler";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<PageHome />} />

      {/* Ruta para la lista de brawlers (Personajes) */}
      <Route path="/personajes" element={<HomePage />} />

      {/* Otras rutas estáticas */}
      <Route path="/about" element={<PageAbout />} />
      <Route path="/contact" element={<PageContact />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<NotFound />} />

      {/* Rutas anidadas para la sección de brawlers (Personajes) */}
      <Route path="/personajes">
        {/* Ruta principal de brawlers */}
        <Route index element={<HomePage />} />
        {/* Ruta dinámica para mostrar el detalle de un brawler */}
        <Route path=":id" element={<DetalleBrawler />} />
      </Route>
    </Routes>
  );
}