export const fetchFavorites = async (token) => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await fetch(
        "https://poke-collection-api-production.up.railway.app/favorites",
        options
      );
  
      if (!response.ok) throw new Error("Failed to fetch favorites");
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw error;
    }
  };
  