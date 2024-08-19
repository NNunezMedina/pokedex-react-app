import { useState } from "react";
import { fetchPokemonData } from "../services/fetchPokemonData";
import { MoveLeft, Search } from "lucide-react";
// import pokebolaploma from "../assets/pokebolasinfondo.png";
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
    <div  className="flex flex-col justify-center items-center relative min-h-full"  style={{ backgroundColor: backgroundColor }}>
      <div className="flex justify-center items-center mt-10 gap-10 sm:w-full sm:max-w-sm">
        <Link
        to="/pokedex-react-app/home"
        >
          <MoveLeft />
        </Link>
        <div className="flex items-center bg-gray-100 rounded-[10px] p-3 gap-2 w-w-1/2">
          <Search />
          <input
            className="bg-gray-100 rounded-[10px] focus:outline-none sm:text-sm sm:leading-6"
            type="text"
            placeholder="Search Pokemon"
            value={pokemonData}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* <img
          src={pokebolaploma}
          alt="imagenpokebola"
          className="absolute h-[100px] w-[100px] right-0 mr-[700px]"
        /> */}
      </div>
      {status === "success" && (
        <PokeCard pokemon={pokemon} />
      )}

      <div 
      className="flex flex-col items-center mt-4 relative">
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
