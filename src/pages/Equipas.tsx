import { useState } from 'react';
import { teams, drivers } from '../data';
import { ChevronRight, X } from 'lucide-react';

export const Equipas = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const activeTeam = selectedTeam ? teams.find(t => t.id === selectedTeam) : null;
  const teamDrivers = activeTeam ? drivers.filter(d => d.teamId === activeTeam.id) : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div>
        <h1 className="text-4xl font-display font-black italic uppercase mb-2">Equipas Oficiais</h1>
        <p className="text-gray-400">As garagens que competem pelo campeonato de construtores.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div 
            key={team.id}
            onClick={() => setSelectedTeam(team.id)}
            className="glass-panel rounded-xl overflow-hidden cursor-pointer group hover:border-white/30 transition-all duration-300"
          >
            <div className="h-32 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10" />
              <img 
                src={team.carImage} 
                alt={team.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center">
                  <img src={team.logo} alt="logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <h3 className="font-display font-black italic text-2xl uppercase">{team.name}</h3>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center border-t border-white/5">
              <div className="flex gap-2">
                {drivers.filter(d => d.teamId === team.id).map(d => (
                  <div key={d.id} className="w-8 h-8 rounded-full overflow-hidden border border-white/20" title={d.name}>
                    <img src={d.image} alt={d.shortName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold flex items-center text-gray-400 group-hover:text-white transition-colors">
                Ver Detalhes <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="h-1 w-full" style={{ backgroundColor: team.color }} />
          </div>
        ))}
      </div>

      {/* Team Modal */}
      {activeTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTeam(null)} />
          <div className="glass-panel w-full max-w-4xl rounded-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200 border border-white/20 shadow-2xl">
            <button 
              onClick={() => setSelectedTeam(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-30"
            >
              <X size={20} />
            </button>
            
            <div className="relative h-64 md:h-80 w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent z-10" />
              <img 
                src={activeTeam.carImage} 
                alt={activeTeam.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 z-20 flex items-end gap-6">
                <div className="w-24 h-24 rounded-xl bg-white p-3 flex items-center justify-center shadow-lg">
                  <img src={activeTeam.logo} alt="logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 className="font-display font-black italic text-4xl md:text-6xl uppercase drop-shadow-lg">{activeTeam.name}</h2>
                  <div className="h-2 w-32 mt-2 rounded-full" style={{ backgroundColor: activeTeam.color }} />
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#121212]">
              <h3 className="text-xl font-display font-bold italic uppercase mb-6 text-gray-400">Alinhamento de Pilotos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamDrivers.map(driver => (
                  <div key={driver.id} className={`flex items-center gap-6 p-4 rounded-xl border ${driver.isHuman ? 'border-neon-cyan bg-neon-cyan/5' : 'border-white/10 bg-white/5'}`}>
                    <img src={driver.image} alt={driver.name} className="w-20 h-20 rounded-full object-cover border-2 border-white/20" referrerPolicy="no-referrer" />
                    <div>
                      {driver.isHuman && <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-wider mb-1 block">Piloto Humano</span>}
                      <h4 className="font-display font-bold italic text-2xl uppercase">{driver.name}</h4>
                      <p className="font-mono text-gray-400">{driver.points} Pontos no Campeonato</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
