import { useState } from 'react';
import { Trophy, Users, Car, Home as HomeIcon, Menu, X, Calendar } from 'lucide-react';
import { Ticker } from './components/Ticker';
import { Home } from './pages/Home';
import { Pilotos } from './pages/Pilotos';
import { Equipas } from './pages/Equipas';
import { Classificacoes } from './pages/Classificacoes';
import { Calendario } from './pages/Calendario';

type Page = 'home' | 'pilotos' | 'equipas' | 'classificacoes' | 'calendario';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'pilotos', label: 'Pilotos', icon: Users },
    { id: 'equipas', label: 'Equipas', icon: Car },
    { id: 'calendario', label: 'Calendário', icon: Calendar },
    { id: 'classificacoes', label: 'Classificações', icon: Trophy },
  ] as const;

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'pilotos': return <Pilotos />;
      case 'equipas': return <Equipas />;
      case 'calendario': return <Calendario />;
      case 'classificacoes': return <Classificacoes />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-[#121212]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-10 h-10 rounded-lg bg-neon-cyan flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <Car className="text-black" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black italic text-xl leading-none tracking-wider uppercase">Sim Racing</span>
                <span className="text-neon-cyan text-xs font-bold tracking-widest uppercase">League AMS2</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center gap-2 font-bold uppercase tracking-wider text-sm transition-colors ${
                      isActive ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-neon-cyan' : ''} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#121212] absolute w-full">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-4 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors ${
                      isActive ? 'bg-white/10 text-neon-cyan' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-neon-cyan' : ''} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Ticker */}
      <Ticker />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
            &copy; 2026 Sim Racing League AMS2. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
