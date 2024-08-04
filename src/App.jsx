import { useState } from "react";
import Home from "./components/Home";
import Loginform from "./components/Loginform";
import { Route, Routes } from "react-router-dom";
import CreateAccountForm from "./components/CreateAccountForm";

function App() {

  const [user, setUser] = useState([]);

  return (
    <Routes className="font-sans">
      <Route
      path="/pokedex-react-app/"
      element={
        user.length <= 0 ? <Loginform setUser={setUser} /> : <Home user={user}/>
      }
      />
      <Route
      path="/pokedex-react-app/create-account"
      element={<CreateAccountForm/>}
      />
    </Routes>
  );
}

export default App;
