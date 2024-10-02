
const EvolutionSection = ({ toggle, evolutionChain, evolutionImages }) => {
  return (
    <>
      {toggle === 3 && (
        <div className="flex-col items-center justify-center mb-4 w-full">
          {evolutionChain.length === 1 && (
            <div className="flex flex-col items-center">
              <img
                src={evolutionImages[evolutionChain[0]]}
                alt={evolutionChain[0]}
                className="max-w-[8rem] max-h-[8rem]"
              />
              <span className="text-sm font-medium text-center">{evolutionChain[0]}</span>
            </div>
          )}

          {evolutionChain.length === 2 && (
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <img
                  src={evolutionImages[evolutionChain[0]]}
                  alt={evolutionChain[0]}
                  className="max-w-[8rem] max-h-[8rem]"
                />
                <span className="text-sm font-medium text-center">{evolutionChain[0]}</span>
              </div>
              <span className="text-3xl font-bold mx-4">→</span>
              <div className="flex flex-col items-center">
                <img
                  src={evolutionImages[evolutionChain[1]]}
                  alt={evolutionChain[1]}
                  className="max-w-[8rem] max-h-[8rem]"
                />
                <span className="text-sm font-medium text-center">{evolutionChain[1]}</span>
              </div>
            </div>
          )}

          {evolutionChain.length === 3 && (
            <>
              <div className="flex items-center justify-center mb-4">
                <div className="flex flex-col items-center">
                  <img
                    src={evolutionImages[evolutionChain[0]]}
                    alt={evolutionChain[0]}
                    className="max-w-[8rem] max-h-[8rem]"
                  />
                  <span className="text-sm font-medium text-center">{evolutionChain[0]}</span>
                </div>
                <span className="text-3xl font-bold mx-4">→</span>
                <div className="flex flex-col items-center">
                  <img
                    src={evolutionImages[evolutionChain[1]]}
                    alt={evolutionChain[1]}
                    className="max-w-[8rem] max-h-[8rem]"
                  />
                  <span className="text-sm font-medium text-center">{evolutionChain[1]}</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={evolutionImages[evolutionChain[2]]}
                  alt={evolutionChain[2]}
                  className="max-w-[8rem] max-h-[8rem]"
                />
                <span className="text-sm font-medium text-center">{evolutionChain[2]}</span>
              </div>
            </>
          )}

          {evolutionChain.length === 4 && (
            <>
              <div className="flex items-center justify-center mb-4">
                <div className="flex flex-col items-center">
                  <img
                    src={evolutionImages[evolutionChain[0]]}
                    alt={evolutionChain[0]}
                    className="max-w-[8rem] max-h-[8rem]"
                  />
                  <span className="text-sm font-medium text-center">{evolutionChain[0]}</span>
                </div>
                <span className="text-3xl font-bold mx-4">→</span>
                <div className="flex flex-col items-center">
                  <img
                    src={evolutionImages[evolutionChain[1]]}
                    alt={evolutionChain[1]}
                    className="max-w-[8rem] max-h-[8rem]"
                  />
                  <span className="text-sm font-medium text-center">{evolutionChain[1]}</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <img
                    src={evolutionImages[evolutionChain[2]]}
                    alt={evolutionChain[2]}
                    className="max-w-[8rem] max-h-[8rem]"
                  />
                  <span className="text-sm font-medium text-center">{evolutionChain[2]}</span>
                </div>
                <span className="text-3xl font-bold mx-4">→</span>
                <div className="flex flex-col items-center">
                  <img
                    src={evolutionImages[evolutionChain[3]]}
                    alt={evolutionChain[3]}
                    className="max-w-[8rem] max-h-[8rem]"
                  />
                  <span className="text-sm font-medium text-center">{evolutionChain[3]}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default EvolutionSection;
