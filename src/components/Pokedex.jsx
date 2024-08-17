import { useState } from "react";
import { fetchPokemonData } from "../services/fetchPokemonData";
import { Search } from "lucide-react";

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState("");
  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const { status, data: pokemon, error } = state;

  function handleChange(event) {
    setPokemonData(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setState({ status: "pending", data: null, error: null });
      fetchPokemonData(pokemonData)
        .then((data) => {
          setState({ status: "success", data, error: null });
        })
        .catch(() => {
          setState({
            status: "error",
            data: null,
            error: "The pokemon doesn't exist! Try again with other Pokemon",
          });
        });
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="flex items-center bg-gray-100 rounded-[10px] p-3 gap-2 w-full max-w-md">
          <Search />
          <input
            className="bg-gray-100 rounded-[10px] focus:outline-none sm:text-sm sm:leading-6 "
            type="text"
            placeholder="Search Pokemon"
            value={pokemonData}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        {status === "idle" && "Ready to search!"}
        {status === "pending" && "Loading..."}
        {status === "success" && (
          <>
            <h2 className="text-lg font-semibold">{pokemon.name}</h2>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-32 h-32 md:w-48 md:h-48"
            />
          </>
        )}
      </div>
      <div className="flex justify-center m-2 items-center">
        {status === "error" && <p className="text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default Pokedex;
