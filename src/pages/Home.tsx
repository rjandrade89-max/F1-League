import { useState } from 'react';
import { Play, Upload, X, TrendingUp } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  type: string;
  img: string;
  content: string;
  date: string;
}

const heroNews: NewsItem = {
  id: 0,
  title: "Vitória Épica de Bruno Queirós!",
  type: "Destaque",
  img: "https://i.ibb.co/LdzP50MP/Bqueiros-vencedor.png",
  content: "O piloto da Scuderia Ferrari conquistou o lugar mais alto do pódio numa corrida cheia de emoção e ultrapassagens no limite. Numa demonstração de pura habilidade, Bruno Queirós conseguiu segurar a pressão dos adversários nas últimas voltas, garantindo pontos cruciais para a equipa italiana no campeonato de construtores.",
  date: "Hoje"
};

const newsGrid: NewsItem[] = [
  { id: 1, title: "António Queirós confiante para a época", type: "Entrevista", img: "https://i.ibb.co/rG2F04QK/aqueirosentrevista.png", content: "Em entrevista exclusiva, o piloto da Aston Martin revelou que a equipa encontrou um bom setup para as próximas corridas. 'Estamos confiantes, o carro está a responder bem e o objetivo é lutar pelos pódios', afirmou António.", date: "Ontem" },
  { id: 2, title: "O terrível acidente de Bruno Queirós", type: "Vídeo", img: "https://i.ibb.co/TMWDbDDF/bqueiros-acidente.png", content: "Reveja o momento de tensão na curva 4, onde Bruno Queirós perdeu o controlo do seu monolugar. Felizmente, o piloto saiu ileso, mas o carro sofreu danos significativos.", date: "Há 2 dias" },
  { id: 3, title: "Gonçalo Garcez mostra o seu novo capacete", type: "Social", img: "https://i.ibb.co/C3Gd2chL/Firefly-Gemini-Flash-converte-este-homem-numa-foto-de-piloto-de-formula-1-sem-fundo-a-segurar-no-cap.png", content: "O piloto da Red Bull Racing partilhou nas redes sociais o design do seu novo capacete para esta temporada, com cores vibrantes e um design agressivo que promete dar nas vistas.", date: "Há 3 dias" },
  { id: 4, title: "Bernardo Carvalho estreia-se pela McLaren", type: "Artigo", img: "https://i.ibb.co/kVM3FQzh/Firefly-Gemini-Flash-converte-este-homem-numa-foto-de-piloto-de-formula-1-com-fundo-branco-sem-moldu.png", content: "A mais recente contratação da McLaren, Bernardo Carvalho, já veste as cores da equipa britânica. O piloto mostrou-se entusiasmado com o novo desafio e espera trazer bons resultados já na próxima corrida.", date: "Há 4 dias" },
];

const favorites = [
  { name: 'Bernardo Carvalho', prob: 45, color: '#FF8700' },
  { name: 'Rafael Queirós', prob: 25, color: '#00D2BE' },
  { name: 'António Queirós', prob: 12, color: '#006F62' },
  { name: 'Bruno Queirós', prob: 10, color: '#DC0000' },
  { name: 'Gonçalo Garcez', prob: 8, color: '#0600EF' },
];

export const Home = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* Hero Section */}
      <section 
        className="relative w-full h-[60vh] min-h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
        onClick={() => setSelectedNews(heroNews)}
      >
        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
        <img 
          src={heroNews.img} 
          alt="Bruno Queirós Vencedor" 
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 object-[center_35%]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-black bg-neon-cyan rounded-sm uppercase">
            {heroNews.type}
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black italic uppercase leading-tight mb-4 text-white drop-shadow-lg">
            Vitória Épica de <br/>Bruno Queirós!
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg line-clamp-2">
            {heroNews.content}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* News Grid */}
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-display font-black italic uppercase mb-6 flex items-center">
            <span className="w-2 h-6 bg-neon-cyan mr-3 rounded-sm"></span>
            Últimas Notícias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsGrid.map((news) => (
              <article 
                key={news.id} 
                onClick={() => setSelectedNews(news)}
                className="glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-white/30 transition-colors flex flex-col"
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img 
                    src={news.img} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 object-[center_20%]"
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
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2 block">{news.type}</span>
                  <h3 className="font-display font-bold text-lg leading-tight group-hover:text-neon-cyan transition-colors mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mt-auto">{news.content}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Favorites Sidebar */}
        <section className="lg:col-span-1">
          <h2 className="text-2xl font-display font-black italic uppercase mb-6 flex items-center">
            <span className="w-2 h-6 bg-white mr-3 rounded-sm"></span>
            Favoritos ao Título
          </h2>
          <div className="glass-panel rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <TrendingUp size={20} className="text-neon-cyan" />
              <span className="text-sm font-bold uppercase tracking-wider">Probabilidade de Vitória</span>
            </div>
            
            {favorites.map((fav, idx) => (
              <div key={fav.name} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-sm">{idx + 1}. {fav.name}</span>
                  <span className="font-mono font-bold text-neon-cyan">{fav.prob}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${fav.prob}%`, backgroundColor: fav.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedNews(null)} />
          <div className="glass-panel w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200 border border-white/20 shadow-2xl">
            
            <div className="relative h-64 md:h-80 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10" />
              <img 
                src={selectedNews.img} 
                alt={selectedNews.title} 
                className="w-full h-full object-cover object-[center_30%]"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-30"
              >
                <X size={20} />
              </button>
              {selectedNews.type === 'Vídeo' && (
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                    <Play className="w-8 h-8 ml-2" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-[#121212] overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 text-xs font-bold tracking-wider text-black bg-neon-cyan rounded-sm uppercase">
                  {selectedNews.type}
                </span>
                <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                  {selectedNews.date}
                </span>
              </div>
              <h2 className="font-display font-black italic text-3xl md:text-4xl uppercase mb-6 leading-tight">
                {selectedNews.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedNews.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
