
const BaseStatsSection = ({ stats }) => {
  const getAbbreviatedStatName = (name) => {
    const statMap = {
      "special-attack": "Sp. Att",
      "special-defense": "Sp. Def",
    };
    return statMap[name] || capitalizeFirstLetter(name);
  };

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <ul className="mb-2">
      {stats.map((stat, index) => (
        <li key={index} className="text-sm font-medium mb-2 flex items-center">
          <span className="text-gray-400 flex-1 mb-1">
            {getAbbreviatedStatName(stat.stat.name)}:
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 ml-4">{stat.base_stat}</span>
            <div className="relative w-[200px] h-[3px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-green-500"
                style={{
                  width: `${Math.min(stat.base_stat, 100)}%`,
                }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BaseStatsSection;
