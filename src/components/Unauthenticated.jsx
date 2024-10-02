import { Route, Routes } from "react-router-dom";
import CreateAccountForm from "./CreateAccountForm";
import Loginform from "./Loginform";

const Unauthenticated = () => {
  
    return (
      <Routes>
        <Route path="/" element={<Loginform />} />
        <Route path="/create-account" element={<CreateAccountForm />} /> 
      </Routes>
    );
  };
  
  export default Unauthenticated;
