import { useState } from 'react';
import { getPokemonByZodiacSign, getZodiacSign } from '../../utils/zodiacUtils';
import Lottie from 'lottie-react';
import Confetti from "../../assets/Confetti.json";
import LoadingSpinner from "../../assets/LoadingSpinner.json";

const ZodiacGame = () => {
  const [date, setDate] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [_year, month, day] = date.split('-').map(Number);

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      setError('Fecha no válida');
      return;
    }

    setLoading(true);
    const sign = getZodiacSign(day, month);
    const pokemonId = getPokemonByZodiacSign(sign);
    const pokemonData = await getPokemonData(pokemonId);
    
    setPokemon(pokemonData);
    setError('');
    setLoading(false);
  };

  const getPokemonData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Discover your pokemon from your zodiac sign!</h1>
      <form 
      onSubmit={handleSubmit}>
        <input
        className="bg-gray-900 rounded-[10px] focus:outline-none text-sm space-y-6 bg-opacity-5 w-64 h-12 px-4 cursor-pointer"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" className='flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6'>Discover!</button>
      </form>
      {error && <p>{error}</p>}
      {loading && <Lottie
                animationData={LoadingSpinner}
                loop
                style={{ height: 150, width: 150 }}
              />} 
      {pokemon && !loading && (
        <div className="flex flex-col items-center relative w-60 h-60 mx-auto mt-2">
          <Lottie
          animationData={Confetti} 
          loop={false} 
          className="w-full h-full absolute inset-0 z-10" />
          <h2 className="text-xl font-bold text-center mb-2 mt-4">
            <span className="text-black">Your Pokemon is: </span> 
            <span className="text-violet-600 uppercase">{pokemon.name}</span>
          </h2>
          <img 
            src={pokemon.sprites.other["official-artwork"].front_default} 
            alt={pokemon.name} 
            className="relative z-0 w-full h-full mx-auto" 
          />
        </div>
      )}
    </div>
  );
};

export default ZodiacGame;