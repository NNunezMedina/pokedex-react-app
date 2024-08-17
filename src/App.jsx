import { useState } from "react";
import Home from "./components/Home";
import Loginform from "./components/Loginform";
import { Route, Routes } from "react-router-dom";
import CreateAccountForm from "./components/CreateAccountForm";
import Pokedex from "./components/Pokedex";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/Auth-Context";

function App() {
  const [user, setUser] = useState([]);

  return (
    <AuthProvider>
      <Routes className="font-sans">
        <Route
          path="/pokedex-react-app/"
          element={<Loginform setUser={setUser} />}
        />
        <Route
          path="/pokedex-react-app/home"
          element={
            <PrivateRoute>
              <Home user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/pokedex-react-app/home/pokedex"
          element={
            <PrivateRoute>
              <Pokedex />
            </PrivateRoute>
          }
        />
        <Route
          path="/pokedex-react-app/create-account"
          element={<CreateAccountForm />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
