import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [input, setInput] = useState("");
  const [pokemonData, setPokemonData] = useState("");

  function handleChange(event) {
    setInput(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchPokemonData(input.toLowerCase());
    }
  };

  const fetchPokemonData = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
      });
  };

  const handleClick = () => {
    fetchPokemonData(input.toLowerCase());
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto p-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl items-center">
      <div className="flex gap-[15px]">
        <h1 className="text-2xl font-bold text-center flex-grow">
          What Pokemon are you looking for {user}?
        </h1>
      </div>
        <div className="flex items-center bg-gray-100 rounded-[10px] p-3 gap-2">
          <Search />
          <input
            className="bg-gray-100 rounded-[10px] focus:outline-none "
            type="text"
            placeholder="Search Pokemon"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button 
          className="bg-gray-100 rounded-[10px] p-3 hover:bg-gray-300 ml-2 w-24 m-5" // Ajustar el ancho del botón
          onClick={handleClick}
        >
          Search
        </button>

      <div className="flex flex-col items-center mt-4">
        {pokemonData ? (
          <>
            <h2 className="text-lg font-semibold">{pokemonData.name}</h2>
            <img
              src={pokemonData.sprites.other["official-artwork"].front_default}
              alt={pokemonData.name}
              className="w-32 h-32 md:w-48 md:h-48"
            />
          </>
        ) : (
          <p>No pokemon found</p>
        )}
      </div>
      <Link
        to="/pokedex-react-app/"
        className="flex justify-center items-center bg-gray-100 rounded-[10px] hover:bg-gray-300 ml-2 p-2 m-5"
      >
        Close session
      </Link>
    </div>
  );
};

export default Home;
