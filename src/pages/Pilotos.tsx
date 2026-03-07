import { drivers, teams } from '../data';
import { User } from 'lucide-react';

export const Pilotos = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-display font-black italic uppercase mb-2">Grelha de Partida</h1>
          <p className="text-gray-400">Conhece os 21 pilotos que disputam o campeonato.</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-3 h-3 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.8)]"></span>
            Humano
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-3 h-3 rounded-full bg-gray-600"></span>
            AI
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {drivers.map((driver) => {
          const team = teams.find(t => t.id === driver.teamId);
          
          return (
            <div 
              key={driver.id} 
              className={`relative glass-panel rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 ${
                driver.isHuman ? 'neon-border' : 'hover:border-white/30'
              }`}
            >
              {/* Team Color Header */}
              <div className="h-2 w-full" style={{ backgroundColor: team?.color || '#fff' }} />
              
              {/* Human Badge */}
              {driver.isHuman && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-neon-cyan text-neon-cyan text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider z-10 flex items-center gap-1">
                  <User size={12} />
                  Humano
                </div>
              )}

              <div className="p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${driver.isHuman ? 'border-neon-cyan' : 'border-white/10'}`}>
                    <img 
                      src={driver.image} 
                      alt={driver.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div 
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-[#121212] flex items-center justify-center bg-white"
                  >
                    <img src={team?.logo} alt={team?.name} className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
                  </div>
                </div>

                <h3 className="font-display font-black italic text-xl uppercase leading-tight mb-1">{driver.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{team?.name}</p>
                
                <div className="w-full bg-black/30 rounded-lg p-3 flex justify-between items-center border border-white/5">
                  <span className="text-xs text-gray-500 uppercase font-bold">Pontos</span>
                  <span className="font-mono font-bold text-lg text-white">{driver.points}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
