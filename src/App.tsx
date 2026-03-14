import { useState, useEffect } from 'react';
import { Trophy, Users, Car, Home as HomeIcon, Menu, X, Calendar } from 'lucide-react';
import { Ticker } from './components/Ticker';
import { Home } from './pages/Home';
import { Pilotos } from './pages/Pilotos';
import { Equipas } from './pages/Equipas';
import { Classificacoes } from './pages/Classificacoes';
import { Calendario } from './pages/Calendario';
import { Paddock } from './pages/Paddock';
import { getGroupRP, getCurrentTierInfo, tiers, drivers } from './data';
import { TierPopup } from './components/TierPopup';
import { ShieldAlert } from 'lucide-react';

type Page = 'home' | 'pilotos' | 'equipas' | 'classificacoes' | 'calendario' | 'paddock';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopupForTier, setShowPopupForTier] = useState<number | null>(null);

  const groupRP = getGroupRP(drivers);
  const { current: currentTier, next: nextTier } = getCurrentTierInfo(groupRP);

  useEffect(() => {
    // Check if we need to show a popup
    const savedTier = parseInt(localStorage.getItem('highestTierUnlocked') || '1', 10);
    if (currentTier.level > savedTier) {
      setShowPopupForTier(currentTier.level);
      localStorage.setItem('highestTierUnlocked', currentTier.level.toString());
    }
  }, [currentTier.level]);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'pilotos', label: 'Pilotos', icon: Users },
    { id: 'equipas', label: 'Equipas', icon: Car },
    { id: 'calendario', label: 'Calendário', icon: Calendar },
    { id: 'classificacoes', label: 'Classificações', icon: Trophy },
    { id: 'paddock', label: 'Paddock', icon: ShieldAlert },
  ] as const;

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'pilotos': return <Pilotos />;
      case 'equipas': return <Equipas />;
      case 'calendario': return <Calendario />;
      case 'classificacoes': return <Classificacoes />;
      case 'paddock': return <Paddock />;
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
                <span className="font-display font-black italic text-xl leading-none tracking-wider uppercase">Kel Racers</span>
                <span className="text-neon-cyan text-xs font-bold tracking-widest uppercase">AMS2 "Pro" Racers</span>
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

            {/* Tier Progress Bar */}
            <div className="hidden xl:flex items-center gap-4 pl-8 border-l border-white/10">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Group RP</span>
                <span className="text-neon-cyan font-mono font-bold text-sm">{groupRP.toLocaleString()}</span>
              </div>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.8)]"
                  style={{ width: nextTier ? `${Math.min(100, ((groupRP - currentTier.rpRequired) / (nextTier.rpRequired - currentTier.rpRequired)) * 100)}%` : '100%' }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tier {currentTier.level}</span>
                <span className="text-white font-bold text-xs truncate max-w-[120px]">{currentTier.name}</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="xl:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-white/10 bg-[#121212] absolute w-full shadow-2xl">
            {/* Mobile Tier Progress Bar */}
            <div className="px-4 py-4 border-b border-white/5 bg-white/5">
              <div className="flex justify-between items-end mb-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Group RP</span>
                  <span className="text-neon-cyan font-mono font-bold text-sm">{groupRP.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tier {currentTier.level}</span>
                  <span className="text-white font-bold text-xs">{currentTier.name}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.8)]"
                  style={{ width: nextTier ? `${Math.min(100, ((groupRP - currentTier.rpRequired) / (nextTier.rpRequired - currentTier.rpRequired)) * 100)}%` : '100%' }}
                />
              </div>
            </div>

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
            &copy; 2026 Kel Racers. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Tier Popup */}
      {showPopupForTier && (
        <TierPopup 
          tier={tiers.find(t => t.level === showPopupForTier)!} 
          onClose={() => setShowPopupForTier(null)} 
        />
      )}
    </div>
  );
}
