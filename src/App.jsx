import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/Auth-Context";
import Authenticated from "./components/Authenticated";
import Unauthenticated from "./components/Unauthenticated";


function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );
}

const MainRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/*" // Maneja la ruta principal
        element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <Unauthenticated />
          )
        }
      />
      <Route
        path="/home/*" // Rutas para usuarios autenticados
        element={
          user ? (
            <Authenticated user={user} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;


