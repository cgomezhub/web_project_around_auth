import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  const location = useLocation();

  if (!isLoggedIn) {
    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    // Puedes pasar la ubicación actual al estado de la navegación para redirigir al usuario de vuelta a esta página después de iniciar sesión
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  // Si el usuario está autenticado, renderizar los children
  return children;
}

export default ProtectedRoute;
