import { Calendar as CalendarIcon, MapPin, Flag, ChevronRight } from 'lucide-react';

const races = [
  {
    id: 1,
    round: 1,
    name: 'Grande Prémio de Portugal',
    track: 'Autódromo Internacional do Algarve',
    date: '10 Março 2026',
    status: 'completed',
    winner: 'Bruno Queirós',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    round: 2,
    name: 'Grande Prémio de Espanha',
    track: 'Circuit de Barcelona-Catalunya',
    date: '24 Março 2026',
    status: 'completed',
    winner: 'Gonçalo Queirós',
    image: 'https://images.unsplash.com/photo-1517026575980-3e1e2daf4ce7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    round: 3,
    name: 'Grande Prémio do Mónaco',
    track: 'Circuit de Monaco',
    date: '07 Abril 2026',
    status: 'upcoming',
    winner: null,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    round: 4,
    name: 'Grande Prémio do Canadá',
    track: 'Circuit Gilles Villeneuve',
    date: '21 Abril 2026',
    status: 'upcoming',
    winner: null,
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    round: 5,
    name: 'Grande Prémio da Grã-Bretanha',
    track: 'Silverstone Circuit',
    date: '05 Maio 2026',
    status: 'upcoming',
    winner: null,
    image: 'https://images.unsplash.com/photo-1532983330958-4b32afceeaeb?q=80&w=800&auto=format&fit=crop'
  }
];

export const Calendario = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
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
            <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden">
              <img 
                src={race.image} 
                alt={race.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#121212] to-transparent" />
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

                <button className={`flex items-center gap-2 font-bold uppercase tracking-wider text-sm px-4 py-2 rounded-lg transition-colors ${
                  race.status === 'completed' 
                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                    : 'bg-neon-cyan/10 hover:bg-neon-cyan text-neon-cyan hover:text-black border border-neon-cyan/30'
                }`}>
                  {race.status === 'completed' ? 'Ver Resultados' : 'Detalhes'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
