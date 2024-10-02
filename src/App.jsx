import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/Auth-Context";
import Authenticated from "./components/Authenticated";
import Unauthenticated from "./components/Unauthenticated";
import CreateAccountForm from "./components/CreateAccountForm";

function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );
}

const MainRoutes = () => {
  const { user } = useAuth();

  console.log("Current user:", user); // Para verificar el estado del usuario

  return (
    <Routes>
      <Route
        path="/pokedex-react-app/"
        element={
          user ? <Navigate to="/pokedex-react-app/home" replace /> : <Unauthenticated />
        }
      />
      <Route
        path="/pokedex-react-app/home/*"
        element={user ? <Authenticated user={user} /> : <Navigate to="/pokedex-react-app/" replace />}
      />
      <Route
        path="/pokedex-react-app/create-account/*" // Cambiar a "/*"
        element={
          user ? <Navigate to="/pokedex-react-app/home" replace /> : <Unauthenticated />
        }
      />
      <Route path="/pokedex-react-app/create-account" element={<CreateAccountForm />} />
    </Routes>
  );
};

export default App;