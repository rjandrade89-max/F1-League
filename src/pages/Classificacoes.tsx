import { drivers, teams } from '../data';

export const Classificacoes = () => {
  // Calculate constructor points
  const constructors = teams.map(team => {
    const teamDrivers = drivers.filter(d => d.teamId === team.id);
    const totalPoints = teamDrivers.reduce((sum, d) => sum + d.points, 0);
    return { ...team, points: totalPoints };
  }).sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-display font-black italic uppercase mb-2">Classificações</h1>
        <p className="text-gray-400">Acompanha a tabela atualizada do campeonato.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Drivers Championship */}
        <section>
          <h2 className="text-2xl font-display font-black italic uppercase mb-6 flex items-center">
            <span className="w-2 h-6 bg-neon-cyan mr-3 rounded-sm"></span>
            Campeonato de Pilotos
          </h2>
          
          <div className="glass-panel rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-16 text-center">Pos</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Piloto</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Equipa</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => {
                  const team = teams.find(t => t.id === driver.teamId);
                  return (
                    <tr 
                      key={driver.id} 
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${driver.isHuman ? 'bg-neon-cyan/5' : ''}`}
                    >
                      <td className="p-4 text-center font-display font-bold italic text-gray-500">{index + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-8 rounded-full" style={{ backgroundColor: team?.color }} />
                          <div>
                            <div className="font-bold flex items-center gap-2">
                              {driver.name}
                              {driver.isHuman && <span className="w-2 h-2 rounded-full bg-neon-cyan" title="Humano" />}
                            </div>
                            <div className="text-xs text-gray-500 sm:hidden">{team?.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-400 hidden sm:table-cell">{team?.name}</td>
                      <td className="p-4 text-right font-mono font-bold text-lg">{driver.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Constructors Championship */}
        <section>
          <h2 className="text-2xl font-display font-black italic uppercase mb-6 flex items-center">
            <span className="w-2 h-6 bg-white mr-3 rounded-sm"></span>
            Campeonato de Construtores
          </h2>
          
          <div className="glass-panel rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-16 text-center">Pos</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Equipa</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {constructors.map((team, index) => (
                  <tr key={team.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-center font-display font-bold italic text-gray-500">{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-white p-1 flex items-center justify-center">
                          <img src={team.logo} alt={team.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{team.name}</div>
                          <div className="w-8 h-1 mt-1 rounded-full" style={{ backgroundColor: team.color }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-xl">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
