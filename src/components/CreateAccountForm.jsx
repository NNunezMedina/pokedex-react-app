import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useState } from "react";
import pokemonLogo from "../assets/pokemon_logo.png";
import Checksuccess from "../assets/Checksuccess.json";
import Lottie from "lottie-react";
import { createUser } from "../services/api-fetch";

const CreateAccountForm = () => {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errorCreateUser, setErrorCreateUser] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (
      newUser.first_name === "" ||
      newUser.last_name === "" ||
      newUser.email === "" ||
      newUser.password === ""
    ) {
      setErrorCreateUser(true);
      return;
    }
    setErrorCreateUser(false);
    setIsSubmitting(true);

    createUser(newUser) 
      .then((data) => {
        if (data.token) {
          setSuccessMessage("User created successfully!");
          setShowSuccess(true);
          setTimeout(() => {
            navigate("/pokedex-react-app/");
          }, 2900);
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
        setErrorCreateUser(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }


  function handleChange(event) {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
    setErrorCreateUser("");

    if (name === "password") {
      if (value.length < 6) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  }

  if (showSuccess) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-6 py-2 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <Lottie animationData={Checksuccess} loop={false} />
          <p className="text-green-600 text-2xl mt-4">{successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <h1 className="flex justify-center font-bold text-3xl text-center mb-4 ">
          Create new user
        </h1>
        <div className="flex justify-center">
          <img src={pokemonLogo} alt="PokemonLogo" className="m-4" />
        </div>
        <h2 className="flex justify-center text-center mb-4">
          Register to see al the Pokemons that are waiting for you!
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="first_name"
            type="text"
            placeholder="First Name"
            value={newUser.first_name}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={newUser.last_name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={newUser.password}
            onChange={handleChange}
          />
          {passwordError && (
            <p className="flex justify-center text-red-600">
              Password has to be min 6 characters long
            </p>
          )}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
        {errorCreateUser && (
          <p className="flex justify-center text-red-600">
            All fields are required
          </p>
        )}
      </div>
      <div className="flex justify-center m-2 items-center">
        Already have an account?
        <Link
          className="p-[10px] font-bold text-violet-600"
          to="/pokedex-react-app/"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default CreateAccountForm;
