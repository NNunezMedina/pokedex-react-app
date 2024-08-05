import { useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import pokemonLogo from "../assets/pokemon_logo.png";

const Loginform = ({setUser}) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorLogin, setErrorLogin] = useState(false)
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if(loginData.email === "" || loginData.password === "") {
      setErrorLogin(true);
      return;
    }
    setErrorLogin(false);
    setUser([loginData.email]);
    navigate("/pokedex-react-app/home");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
    setErrorLogin("");
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <h1 className="flex justify-center font-bold text-3xl text-center ">Welcome to your POKEDEX!</h1>
        <div className="flex justify-center"> 
          <img src={pokemonLogo} alt="PokemonLogo" className="m-8" />
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
          label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
          />
          <Input
          label="Password"
            name="password"
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
          />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
            >
              Sign in
            </button>
          </div>
        </form>
        {errorLogin && <p className="flex justify-center text-red-600">All fields are required</p>}
        <div className="flex justify-center m-2 items-center">
            Dont have an account?
              <Link to="/pokedex-react-app/create-account" className=" p-[10px] font-bold text-violet-600">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
