const PokeCard = ({ pokemon }) => {
    if (!pokemon) return null;
  
    return (
      <div 
        className="flex min-h-full flex-col items-center justify-center px-6 py-2 lg:px-8"
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
