import { useState } from "react";
import { fetchPokemonData } from "../services/fetchPokemonData";
import { MoveLeft, Search } from "lucide-react";
import pokebolablanca from "../assets/pokebolasinfondo.png";
import { Link } from "react-router-dom";
import typeColors from "../services/colorPokeCard";
import PokeCard from "./PokeCard";

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState("");
  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const { status, data: pokemon, error } = state;
  const [backgroundColor, setBackgroundColor] = useState("transparent");

  function handleChange(event) {
    setPokemonData(event.target.value.toLowerCase());
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setState({ status: "pending", data: null, error: null });
      fetchPokemonData(pokemonData)
        .then((data) => {
          setState({ status: "success", data, error: null });
          const mainType = data.types[0].type.name;
          const color = typeColors[mainType] || "transparent";
          setBackgroundColor(color);
        })
        .catch(() => {
          setState({
            status: "error",
            data: null,
            error: "The pokemon doesn't exist! Try again with other Pokemon",
          });
          setBackgroundColor("transparent");
        });
    }
  };
  return (
    <div
      className="flex min-h-full flex-col items-center justify-center px-6 py-2 lg:px-8"
      style={{ backgroundColor: backgroundColor }}
    >
      <img
        src={pokebolablanca}
        alt="Icon"
        className="absolute top-[200px] right-[320px] h-[200px] w-[200px] z-0"
      />
      <div className="flex justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm gap-2 items-center">
        <Link to="/pokedex-react-app/home">
          <MoveLeft className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
        </Link>
        <div className="flex items-center bg-gray-100 bg-opacity-70 rounded-[10px] p-3 gap-2 w-2/3">
          <Search className="h-5 w-5" />
          <input
            className="bg-gray-100 rounded-[10px] focus:outline-none text-sm space-y-6 bg-opacity-5"
            type="text"
            placeholder="Search Pokemon"
            value={pokemonData}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {status === "success" && <PokeCard pokemon={pokemon} />}
      <div className="flex flex-col items-center mt-4 relative">
        {status === "idle" && "Ready to search!"}
        {status === "pending" && "Loading..."}
      </div>
      <div className="flex justify-center m-2 items-center relative">
        {status === "error" && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Pokedex;
