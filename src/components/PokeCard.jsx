const PokeCard = ({ pokemon }) => {
    if (!pokemon) return null;
  
    return (
      <div 
        className="flex flex-col items-center mt-4 p-4 rounded-lg sm:w-full sm:max-w-sm"
      >
        <h2 className="text-lg font-semibold text-white mb-10">{pokemon.name}</h2>
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-32 h-32 md:w-48 md:h-48"
        />
      </div>
    );
  };
  
  export default PokeCard;
