import { X, Trophy, ChevronRight } from 'lucide-react';
import { Tier } from '../data';

interface TierPopupProps {
  tier: Tier;
  onClose: () => void;
}

export const TierPopup = ({ tier, onClose }: TierPopupProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="glass-panel w-full max-w-2xl flex flex-col rounded-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-500 border border-neon-cyan/50 shadow-[0_0_50px_rgba(0,243,255,0.2)]">
        <div className="bg-gradient-to-r from-neon-cyan/20 to-transparent p-8 border-b border-neon-cyan/20">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-neon-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                <Trophy className="text-black w-8 h-8" />
              </div>
              <div>
                <span className="text-neon-cyan font-bold tracking-widest uppercase text-sm">Novo Tier Desbloqueado</span>
                <h2 className="text-3xl font-display font-black italic uppercase text-white">{tier.name}</h2>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="p-8 bg-[#121212]">
          <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">{tier.popupTitle}</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {tier.popupMessage}
          </p>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Novos Carros Disponíveis:</h4>
            <ul className="space-y-2">
              {tier.cars.map(car => (
                <li key={car} className="flex items-center gap-2 text-neon-cyan font-mono">
                  <ChevronRight size={16} /> {car}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onClose} className="mt-8 w-full py-4 bg-neon-cyan text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors">
            Aceitar o Desafio
          </button>
        </div>
      </div>
    </div>
  );
};
