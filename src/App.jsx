import { useState } from "react";
import Home from "./components/Home";
import Loginform from "./components/Loginform";

function App() {

  const [user, setUser] = useState([]);

  return (
    <div className="font-sans">
    {
      user.length <= 0 ? <Loginform setUser={setUser} /> : <Home user={user}/>
    }
      
    </div>
  );
}

export default App;
