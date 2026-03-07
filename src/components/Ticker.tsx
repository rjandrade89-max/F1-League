import { drivers, teams } from '../data';

export const Ticker = () => {
  const top10 = drivers.slice(0, 10);
  // Duplicate for infinite scroll effect
  const tickerItems = [...top10, ...top10];

  return (
    <div className="w-full bg-[#0a0a0a] border-b border-white/10 overflow-hidden flex items-center h-12 ticker-container relative z-40">
      <div className="flex animate-ticker whitespace-nowrap">
        {tickerItems.map((driver, idx) => {
          const team = teams.find(t => t.id === driver.teamId);
          return (
            <div key={`${driver.id}-${idx}`} className="flex items-center px-6 border-r border-white/10">
              <span className="font-display font-black italic text-white/30 mr-3 w-5 text-lg">{idx % 10 + 1}</span>
              <img 
                src={driver.image} 
                alt={driver.shortName} 
                className="w-7 h-7 rounded-full object-cover mr-3 border-2"
                style={{ borderColor: team?.color || '#fff' }}
                referrerPolicy="no-referrer"
              />
              <span className="font-bold tracking-wide mr-3 text-sm">{driver.shortName}</span>
              <span className="text-neon-cyan font-mono text-sm font-semibold">{driver.points} PTS</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
