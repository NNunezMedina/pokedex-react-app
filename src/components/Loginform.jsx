import { useState } from "react";
import Input from "./Input";

const Loginform = ({setUser}) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorLogin, setErrorLogin] = useState(false)

  function handleSubmit(event) {
    event.preventDefault();
    if(loginData.email === "" || loginData.password === "") {
      setErrorLogin(true);
      return;
    }
    setErrorLogin(false);
    setUser([loginData.email]);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="flex justify-center">Welcome to your pokedex!</h1>
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
              Login
            </button>
          </div>
        </form>
        {errorLogin && <p className="flex justify-center text-red-600">All fields are required</p>}
      </div>
    </div>
  );
};

export default Loginform;
