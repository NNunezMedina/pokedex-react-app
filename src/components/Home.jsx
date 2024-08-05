import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import pokemonTitle from "../assets/pokemonTitle.png"

const Home = ({ user }) => {
  const [input, setInput] = useState("");
  const [pokemonData, setPokemonData] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    setInput(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchPokemonData(input.toLowerCase());
    }
  };

  const fetchPokemonData = (pokemonName) => {
    setError("");
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      .then((response) => {
        if (!response.ok) 
          if(response.status == 404) {
            setError("Page nout found")
          } else {
            setError(`Pokemon not found: ${pokemonName}`);
            return;
          }
        return response.json()
      })
      .then((data) => {
        setPokemonData(data);
      })
      .catch(() => {
        setPokemonData("");
        setError("Page not found");
      });
  };


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-2xl font-bold text-center">
          What Pokemon are you looking for {user}?
        </h1>
        <div className="flex justify-center">
        <img src={pokemonTitle} alt="Pokemon title" className="m-8" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex items-center bg-gray-100 rounded-[10px] p-3 gap-2 w-full max-w-md">
          <Search />
          <input
            className="bg-gray-100 rounded-[10px] focus:outline-none sm:text-sm sm:leading-6 "
            type="text"
            placeholder="Search Pokemon"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
      {error && <p className="text-red-600">{error}</p>}
      {pokemonData ? (
          <>
            <h2 className="text-lg font-semibold">{pokemonData.name}</h2>
            <img
              src={pokemonData.sprites.other["official-artwork"].front_default}
              alt={pokemonData.name}
              className="w-32 h-32 md:w-48 md:h-48"
            />
          </>
        ) : !error && <p></p>}
      </div>
      <div className="flex justify-center m-2 items-center">
      <Link
        to="/pokedex-react-app/"
        className=" p-[10px] font-bold text-violet-600"
      >
        Close session
      </Link>

      </div>
    </div>
  );
};

export default Home;
