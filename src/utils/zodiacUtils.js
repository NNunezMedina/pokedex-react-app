export const getZodiacSign = (day, month) => {
    const zodiacSigns = [
      { sign: 'Capricorn', startDate: [12, 22], endDate: [1, 19] },
      { sign: 'Aquarius', startDate: [1, 20], endDate: [2, 18] },
      { sign: 'Pisces', startDate: [2, 19], endDate: [3, 20] },
      { sign: 'Aries', startDate: [3, 21], endDate: [4, 19] },
      { sign: 'Taurus', startDate: [4, 20], endDate: [5, 20] },
      { sign: 'Gemini', startDate: [5, 21], endDate: [6, 20] },
      { sign: 'Cancer', startDate: [6, 21], endDate: [7, 22] },
      { sign: 'Leo', startDate: [7, 23], endDate: [8, 22] },
      { sign: 'Virgo', startDate: [8, 23], endDate: [9, 22] },
      { sign: 'Libra', startDate: [9, 23], endDate: [10, 22] },
      { sign: 'Scorpio', startDate: [10, 23], endDate: [11, 21] },
      { sign: 'Sagittarius', startDate: [11, 22], endDate: [12, 21] },
    ];
  
    for (const { sign, startDate, endDate } of zodiacSigns) {
      if (
        (month === startDate[0] && day >= startDate[1]) ||
        (month === endDate[0] && day <= endDate[1]) ||
        (month > startDate[0] && month < endDate[0])
      ) {
        return sign;
      }
    }
    
    return 'Capricorn'; 
  };

  export const getPokemonByZodiacSign = (sign) => {
    const totalPokemons = 150; // Total de Pokémon
    const pokemonsPerSign = Math.floor(totalPokemons / 12); // Pokémon por signo
  
    const zodiacRanges = {
      Capricorn: [1, pokemonsPerSign],
      Aquarius: [pokemonsPerSign + 1, pokemonsPerSign * 2],
      Pisces: [pokemonsPerSign * 2 + 1, pokemonsPerSign * 3],
      Aries: [pokemonsPerSign * 3 + 1, pokemonsPerSign * 4],
      Taurus: [pokemonsPerSign * 4 + 1, pokemonsPerSign * 5],
      Gemini: [pokemonsPerSign * 5 + 1, pokemonsPerSign * 6],
      Cancer: [pokemonsPerSign * 6 + 1, pokemonsPerSign * 7],
      Leo: [pokemonsPerSign * 7 + 1, pokemonsPerSign * 8],
      Virgo: [pokemonsPerSign * 8 + 1, pokemonsPerSign * 9],
      Libra: [pokemonsPerSign * 9 + 1, pokemonsPerSign * 10],
      Scorpio: [pokemonsPerSign * 10 + 1, pokemonsPerSign * 11],
      Sagittarius: [pokemonsPerSign * 11 + 1, totalPokemons],
    };
  
    const range = zodiacRanges[sign];
    const randomPokemonId = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    return randomPokemonId; // Devuelve el ID del Pokémon
  };