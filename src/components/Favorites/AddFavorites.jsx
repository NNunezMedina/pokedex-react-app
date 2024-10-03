const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  
  export const addFavorite = async (pokemon, userToken) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        pokemon_name: capitalizeFirstLetter(pokemon.name),
        pokemon_id: pokemon.id,
        pokemon_type: pokemon.types[0].type.name,
        pokemon_avatar_url:
          pokemon.sprites.other["official-artwork"].front_default,
      }),
    };
  
    const response = await fetch(
      "https://poke-collection-api-production.up.railway.app/favorites",
      options
    );
  
    if (!response.ok) throw new Error("Failed to add to favorites");
  
    return response;
  };