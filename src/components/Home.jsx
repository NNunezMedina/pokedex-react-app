import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [input, setInput] = useState("");
  const [pokemonData, setPokemonData] = useState("");

  function handleChange(event) {
    setInput(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchPokemonData(input);
    }
  }

  const fetchPokemonData =(pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then((response) => response.json())
    .then((data) => {
      setPokemonData(data)
    })
  }



  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto p-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl items-center">
      <div className="flex gap-[15px]">
        <h1 className="text-2xl font-bold text-center">
          What Pokemon are you looking for {user}?
        </h1>
      </div>
      <div className="flex items-center mt-4 bg-gray-100 rounded-[10px] ml-2 p-3 gap-4 w-full">
        <Search />
        <input
          className=" bg-gray-100 rounded-[10px] focus:outline-none flex-grow"
          type="text"
          placeholder="Search Pokemon"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
        <div className="flex flex-col items-center mt-4">
          {pokemonData? 
          <>
          <h2 className="flex ">{pokemonData.name}</h2> 
          <img 
          src={pokemonData.sprites.other['official-artwork'].front_default} 
          alt={pokemonData.name} 
          />
          </>
          : <p>No pokemon found</p>
          }
        </div>
      <Link
        to="/pokedex-react-app/"
        className="flex justify-center items-center bg-gray-100 rounded-[10px]  hover:bg-gray-300 ml-2 p-2 m-5"
      >
        Close session
      </Link>
    </div>
  );
};

export default Home;
