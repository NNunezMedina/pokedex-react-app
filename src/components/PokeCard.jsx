import { Heart } from "lucide-react";
import pokebolablanca from "../assets/pokebolasinfondo.png";

const PokeCard = ({ pokemon }) => {
    if (!pokemon) return null;

    const capitalizeFirstLetter = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const formattedId = pokemon.id.toString().padStart(3, '0');
  
    return (
      <div className="flex-row mt-2 px-6 py-2 ">
          <div className="flex justify-between items-center">
          <h2 className=" text-lg font-semibold text-white ml-1">{capitalizeFirstLetter(pokemon.name)}</h2>
          <p className="text-white font-semibold">
            #{formattedId}
          </p>
          </div>
            <div className="flex justify-between items-center">
            {pokemon.types.map((typeInfo, index) => (
              <span
                key={index}
                className="text-white bg-gray-100 bg-opacity-50 px-2 py-1 rounded-[15px] text-sm"
              >
                {capitalizeFirstLetter(typeInfo.type.name)}
              </span>
            ))}
            <Heart className="text-white text-opacity-90"/>
            </div>
  
        <div>

            
        </div>
        <div className="relative flex">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-48 h-48 md:w-40 md:h-40 mt-5 z-10" 
          />
          <img
            src={pokebolablanca}
            alt="Icon"
            className="absolute left-20 h-50 w-50 z-0 top-20 " 
          />
        </div>
      </div>
    );
};

export default PokeCard;
