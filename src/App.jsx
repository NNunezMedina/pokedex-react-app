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
        path="/pokedex-react-app/*"
        element={
          user ? (
            <Navigate to="/pokedex-react-app/home" replace />
          ) : (
            <Unauthenticated />
          )
        }
      />

      <Route
        path="/pokedex-react-app/home/*"
        element={
          user ? (
            <Authenticated user={user} />
          ) : (
            <Navigate to="/pokedex-react-app" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;

