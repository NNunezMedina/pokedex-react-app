import { useState } from "react";
import Home from "./components/Home";
import Loginform from "./components/Loginform";

function App() {

  const [user, setUser] = useState([]);

  return (
    <>
    {
      user.length <= 0 ? <Loginform setUser={setUser} /> : <Home user={user}/>
    }
      
    </>
  );
}

export default App;
