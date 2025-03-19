import React from "react";
import { Game } from "../../lib/types";

interface GameGridProps {
  games: Game[];
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative group overflow-hidden rounded-xl shadow-2xl border-4 border-transparent 
                      hover:border-[#FF007F] transition-all duration-300 transform hover:scale-105"
          >
            <img
              src={game.desktopThumbnail.url}
              alt={game.name}
              className="w-full h-80 object-cover transition-transform duration-500 transform 
                         group-hover:scale-110 group-hover:rotate-1"
            />

            <div
              className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <h3 className="text-[#FFD700] font-bold text-xl tracking-wide drop-shadow-lg">
                {game.name}
              </h3>
              <p className="text-[#FF5733] text-md mt-1 font-semibold">
                {game.provider}
              </p>

              <div
                className="absolute inset-0 border-4 border-[#39FF14] 
                              opacity-0 group-hover:opacity-100 animate-pulse"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
