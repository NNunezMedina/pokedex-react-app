import { useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import pokemonLogo from "../assets/pokemon_logo.png";
import { useAuth } from "../context/Auth-Context";
import Checksuccess from "../assets/Checksuccess.json";
import Lottie from "lottie-react";
import { loginUser } from "../services/api-fetch";

const Loginform = () => {

  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorLogin, setErrorLogin] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    
    if (loginData.email === "" || loginData.password === "") {
      setErrorLogin(true);
      return;
    }
    setErrorLogin(false);
  
    // Llama a loginUser y maneja la promesa
    loginUser(loginData.email, loginData.password)
      .then((data) => {
        if (data.token) {
          login({ email: loginData.email }, data.token);
          setSuccessMessage("Login successfully!");
          setLoginSuccess(true);
          setTimeout(() => {
            navigate("/pokedex-react-app/home");
          }, 2900);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setApiError("User doesn't exist. Please create an account");
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
    setErrorLogin(false);
    setApiError("");
  }

  if (loginSuccess) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-6 py-2 lg:px-8">
        <Lottie animationData={Checksuccess} loop={false} style={{ width: 150, height: 150 }} />
        <p className="text-green-600 text-2xl mt-4">{successMessage}</p>
      </div>
    );
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <h1 className="flex justify-center font-bold text-3xl text-center ">
          Welcome to your POKEDEX!
        </h1>
        <div className="flex justify-center">
          <img src={pokemonLogo} alt="PokemonLogo" className="m-4" />
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
        {errorLogin && (
          <p className="flex justify-center text-red-600">
            All fields are required
          </p>
        )}
        {apiError && (
          <p className="flex justify-center text-red-600 mt-2">{apiError}</p>
        )}
        <div className="flex justify-center m-2 items-center">
          Dont have an account?
          <Link
             to="/create-account"
            className=" p-[10px] font-bold text-violet-600"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
