import { Play, Upload } from 'lucide-react';

export const Home = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] rounded-2xl overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
        <img 
          src="https://i.ibb.co/LdzP50MP/Bqueiros-vencedor.png" 
          alt="Bruno Queirós Vencedor" 
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 object-top"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-black bg-neon-cyan rounded-sm uppercase">
            Destaque
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black italic uppercase leading-tight mb-4 text-white drop-shadow-lg">
            Vitória Épica de <br/>Bruno Queirós!
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            O piloto da Red Bull Racing conquistou o lugar mais alto do pódio numa corrida cheia de emoção e ultrapassagens no limite.
          </p>
        </div>
      </section>

      {/* Admin Actions */}
      <section className="flex justify-end">
        <label className="cursor-pointer glass-panel px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-neon-cyan hover:text-black transition-colors border border-neon-cyan/50 text-neon-cyan font-bold uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(0,243,255,0.2)]">
          <Upload size={20} />
          Fazer Upload de Resultados
          <input type="file" className="hidden" accept="image/*" onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              alert('Foto carregada! A IA irá processar os resultados em breve.');
            }
          }} />
        </label>
      </section>

      {/* News Grid */}
      <section>
        <h2 className="text-2xl font-display font-black italic uppercase mb-6 flex items-center">
          <span className="w-2 h-6 bg-neon-cyan mr-3 rounded-sm"></span>
          Últimas Notícias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 1, title: "Gonçalo Queirós focado no campeonato", type: "Entrevista", img: "https://i.ibb.co/SwKxmP14/Gqueiros-helmet.png" },
            { id: 2, title: "O terrível acidente de Bruno Queirós", type: "Vídeo", img: "https://i.ibb.co/TMWDbDDF/bqueiros-acidente.png" },
            { id: 3, title: "Gonçalo Santos mostra o seu novo capacete", type: "Social", img: "https://i.ibb.co/C3Gd2chL/Firefly-Gemini-Flash-converte-este-homem-numa-foto-de-piloto-de-formula-1-sem-fundo-a-segurar-no-cap.png" },
            { id: 4, title: "Bruno Queirós pronto para a próxima", type: "Artigo", img: "https://i.ibb.co/PsVLsq22/bqueiros-helmet.png" },
          ].map((news) => (
            <article key={news.id} className="glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-white/30 transition-colors">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={news.img} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 object-top"
                  referrerPolicy="no-referrer"
                />
                {news.type === 'Vídeo' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-neon-cyan group-hover:text-black transition-colors">
                      <Play className="w-5 h-5 ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2 block">{news.type}</span>
                <h3 className="font-display font-bold text-lg leading-tight group-hover:text-neon-cyan transition-colors">{news.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
