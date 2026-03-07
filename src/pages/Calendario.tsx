import { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Flag, ChevronRight, X, Clock, Trophy } from 'lucide-react';
import { raceResults, drivers, teams, RaceWeekend, SessionResult } from '../data';

const races = [
  {
    id: 1,
    round: 1,
    name: 'Grande Prémio de Portugal',
    track: 'Autódromo Internacional do Algarve',
    date: '10 Março 2026',
    status: 'completed',
    winner: 'Bruno Queirós',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Algarve_International_Circuit.svg/1024px-Algarve_International_Circuit.svg.png'
  },
  {
    id: 2,
    round: 2,
    name: 'Grande Prémio de Espanha',
    track: 'Circuit de Barcelona-Catalunya',
    date: '24 Março 2026',
    status: 'completed',
    winner: 'Rafael Queirós',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Catalunya.svg/1024px-Catalunya.svg.png'
  },
  {
    id: 3,
    round: 3,
    name: 'Grande Prémio do Mónaco',
    track: 'Circuit de Monaco',
    date: '07 Abril 2026',
    status: 'upcoming',
    winner: null,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Monte_Carlo_Formula_1_circuit_map.svg/1024px-Monte_Carlo_Formula_1_circuit_map.svg.png'
  },
  {
    id: 4,
    round: 4,
    name: 'Grande Prémio do Canadá',
    track: 'Circuit Gilles Villeneuve',
    date: '21 Abril 2026',
    status: 'upcoming',
    winner: null,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Circuit_Gilles_Villeneuve.svg/1024px-Circuit_Gilles_Villeneuve.svg.png'
  },
  {
    id: 5,
    round: 5,
    name: 'Grande Prémio da Grã-Bretanha',
    track: 'Silverstone Circuit',
    date: '05 Maio 2026',
    status: 'upcoming',
    winner: null,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Silverstone_Circuit_2020.png/1024px-Silverstone_Circuit_2020.png'
  }
];

export const Calendario = () => {
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'practice' | 'qualifying' | 'race'>('race');

  const selectedRaceInfo = races.find(r => r.id === selectedRaceId);
  const selectedRaceData = raceResults.find(r => r.raceId === selectedRaceId);

  const renderSessionTable = (sessionData: SessionResult[], isRace: boolean = false) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider w-12 text-center">Pos</th>
              <th className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Piloto</th>
              <th className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Equipa</th>
              <th className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Melhor Volta</th>
              <th className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">{isRace ? 'Tempo/Gap' : 'Tempo'}</th>
              {!isRace && <th className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right hidden md:table-cell">Voltas</th>}
              {isRace && <th className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Pts</th>}
            </tr>
          </thead>
          <tbody>
            {sessionData.map((result) => {
              const driver = drivers.find(d => d.id === result.driverId);
              const team = teams.find(t => t.id === driver?.teamId);
              
              return (
                <tr key={result.driverId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-3 text-center font-display font-bold italic text-gray-500">{result.pos}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 rounded-full" style={{ backgroundColor: team?.color }} />
                      <div className="font-bold">{driver?.name}</div>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-400 hidden sm:table-cell">{team?.name}</td>
                  <td className="p-3 text-center font-mono text-sm text-purple-400">{result.fastestLap || '-'}</td>
                  <td className="p-3 text-right font-mono text-sm">
                    {result.status === 'DNF' ? (
                      <span className="text-red-500 font-bold">DNF</span>
                    ) : (
                      <span className={result.pos === 1 ? 'text-neon-cyan font-bold' : 'text-gray-300'}>
                        {result.time || result.gap}
                      </span>
                    )}
                  </td>
                  {!isRace && <td className="p-3 text-right font-mono text-sm text-gray-400 hidden md:table-cell">{result.laps}</td>}
                  {isRace && <td className="p-3 text-right font-mono font-bold text-neon-cyan">{result.points || 0}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div>
        <h1 className="text-4xl font-display font-black italic uppercase mb-2">Calendário</h1>
        <p className="text-gray-400">Acompanha as corridas da temporada e os resultados.</p>
      </div>

      <div className="space-y-6">
        {races.map((race) => (
          <div 
            key={race.id} 
            className={`glass-panel rounded-xl overflow-hidden flex flex-col md:flex-row group transition-all duration-300 ${
              race.status === 'upcoming' ? 'hover:border-neon-cyan/50' : 'opacity-80 hover:opacity-100'
            }`}
          >
            {/* Image Section */}
            <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden bg-white/5 flex items-center justify-center p-4">
              <img 
                src={race.image} 
                alt={race.name} 
                className="max-w-full max-h-full object-contain opacity-70 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                Ronda {race.round}
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-neon-cyan mb-2 text-sm font-bold uppercase tracking-wider">
                <CalendarIcon size={16} />
                {race.date}
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-black italic uppercase mb-2">{race.name}</h2>
              <div className="flex items-center gap-2 text-gray-400 mb-6">
                <MapPin size={16} />
                {race.track}
              </div>

              {/* Status / Action */}
              <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                {race.status === 'completed' ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Flag size={20} className="text-white" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase font-bold block">Vencedor</span>
                      <span className="font-bold text-white">{race.winner}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-neon-cyan font-bold uppercase tracking-wider text-sm">
                    <span className="relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
                    </span>
                    Próxima Corrida
                  </div>
                )}

                <button 
                  onClick={() => {
                    if (race.status === 'completed') {
                      setSelectedRaceId(race.id);
                      setActiveTab('race');
                    }
                  }}
                  className={`flex items-center gap-2 font-bold uppercase tracking-wider text-sm px-4 py-2 rounded-lg transition-colors ${
                  race.status === 'completed' 
                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer' 
                    : 'bg-neon-cyan/10 hover:bg-neon-cyan text-neon-cyan hover:text-black border border-neon-cyan/30 cursor-default'
                }`}>
                  {race.status === 'completed' ? 'Ver Resultados' : 'Detalhes'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Modal */}
      {selectedRaceId && selectedRaceInfo && selectedRaceData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedRaceId(null)} />
          <div className="glass-panel w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200 border border-white/20 shadow-2xl">
            
            {/* Modal Header */}
            <div className="relative h-48 shrink-0 bg-white/5 flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent z-10" />
              <img 
                src={selectedRaceInfo.image} 
                alt={selectedRaceInfo.name} 
                className="max-w-full max-h-full object-contain opacity-40"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedRaceId(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-30"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-6 left-6 z-20">
                <div className="text-neon-cyan text-xs font-bold uppercase tracking-wider mb-1">Ronda {selectedRaceInfo.round}</div>
                <h2 className="font-display font-black italic text-3xl md:text-4xl uppercase drop-shadow-lg">{selectedRaceInfo.name}</h2>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-[#121212] shrink-0">
              <button 
                onClick={() => setActiveTab('practice')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${activeTab === 'practice' ? 'text-neon-cyan border-b-2 border-neon-cyan bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Clock size={16} /> Treinos Livres
              </button>
              <button 
                onClick={() => setActiveTab('qualifying')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${activeTab === 'qualifying' ? 'text-neon-cyan border-b-2 border-neon-cyan bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Clock size={16} /> Qualificação
              </button>
              <button 
                onClick={() => setActiveTab('race')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${activeTab === 'race' ? 'text-neon-cyan border-b-2 border-neon-cyan bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Trophy size={16} /> Corrida
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 bg-[#121212] overflow-y-auto flex-1 custom-scrollbar">
              {activeTab === 'practice' && renderSessionTable(selectedRaceData.practice)}
              {activeTab === 'qualifying' && renderSessionTable(selectedRaceData.qualifying)}
              {activeTab === 'race' && renderSessionTable(selectedRaceData.race, true)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
