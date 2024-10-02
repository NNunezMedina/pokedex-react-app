const MovesSection = ({ moveDetails }) => {
    const capitalizeFirstLetter = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };
  
    return (
      <ul className="mb-2">
        {moveDetails.map((move, index) => (
          <li key={index} className="text-sm font-medium mb-2 flex items-center">
            <span className="text-gray-400 flex-1 mb-1">
              {capitalizeFirstLetter(move.name)}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-gray-600 ml-4">{move.accuracy || "N/A"}</span>
              <div className="relative w-[150px] h-[3px] bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500"
                  style={{
                    width: `${move.accuracy || 0}%`,
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default MovesSection;