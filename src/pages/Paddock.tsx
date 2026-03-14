import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { LogOut, Target, Weight, Car } from 'lucide-react';
import { upgrades, Upgrade } from '../data';

interface PilotoData {
  nome?: string;
  creditos?: number;
  pesoCarro?: number;
  missaoAtual?: string;
}

export const Paddock = () => {
  const [user, setUser] = useState<User | null>(null);
  const [pilotoData, setPilotoData] = useState<PilotoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [buyingUpgrade, setBuyingUpgrade] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'pilotos', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPilotoData(docSnap.data() as PilotoData);
          } else {
            setPilotoData({
              nome: "Piloto sem perfil",
              missaoAtual: "Contacta a direção de prova para criar o teu perfil."
            });
          }
        } catch (err) {
          console.error("Erro ao buscar dados do Firestore:", err);
          setPilotoData({
            missaoAtual: "Erro de telemetria ao carregar dados. Verifica a configuração da base de dados."
          });
        }
      } else {
        setPilotoData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error("Erro de Login:", err.code);
      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError("Credenciais inválidas. Verifica o email e a password.");
          break;
        case 'auth/too-many-requests':
          setError("Muitas tentativas falhadas. A tua conta foi bloqueada temporariamente.");
          break;
        default:
          setError("Erro de telemetria. Verifica a configuração do Firebase.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Erro ao terminar sessão:", err);
    }
  };

  const handleBuyUpgrade = async (upgrade: Upgrade) => {
    if (!user || !pilotoData || pilotoData.creditos === undefined || pilotoData.pesoCarro === undefined) return;
    
    if (pilotoData.creditos < upgrade.price) {
      alert("Créditos insuficientes para esta peça.");
      return;
    }

    if (pilotoData.pesoCarro <= 0) {
      alert("O teu carro já está no peso mínimo permitido pelo regulamento (0kg de Ballast).");
      return;
    }

    const confirmPurchase = window.confirm(`Confirmas a compra de "${upgrade.name}" por ${upgrade.price.toLocaleString()} CR?\nIsto irá reduzir o teu peso em ${upgrade.weightReduction}kg na próxima corrida.`);
    
    if (!confirmPurchase) return;

    setBuyingUpgrade(upgrade.id);

    try {
      const newCredits = pilotoData.creditos - upgrade.price;
      // Ensure weight doesn't go below 0
      const newWeight = Math.max(0, pilotoData.pesoCarro - upgrade.weightReduction);

      const docRef = doc(db, 'pilotos', user.uid);
      await updateDoc(docRef, {
        creditos: newCredits,
        pesoCarro: newWeight
      });

      // Update local state immediately for better UX
      setPilotoData({
        ...pilotoData,
        creditos: newCredits,
        pesoCarro: newWeight
      });

      alert(`Compra efetuada com sucesso! O teu novo peso extra é de ${newWeight}kg.`);
    } catch (err) {
      console.error("Erro ao comprar upgrade:", err);
      alert("Erro de comunicação com a garagem. Tenta novamente.");
    } finally {
      setBuyingUpgrade(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md glass-panel rounded-2xl p-8 shadow-[0_0_20px_rgba(0,243,255,0.2)] animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-black italic text-white tracking-widest uppercase mb-1">Kel Racers</h1>
            <p className="text-neon-cyan font-bold tracking-widest text-xs uppercase">Acesso ao Paddock</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email do Piloto</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all placeholder-gray-600"
                placeholder="piloto@kelracers.pt"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password / Telemetria</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all placeholder-gray-600"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-neon-cyan text-black font-display font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? 'A Autenticar...' : 'Ligar Motores'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t-2 border-t-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.2)]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-blue-600 p-1">
            <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center">
              <span className="font-display font-bold text-xl text-white">KR</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bem-vindo de volta,</p>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              {pilotoData?.nome || "A Carregar..."}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Saldo Atual</p>
            <div className="font-display text-3xl font-black text-neon-green" style={{ textShadow: '0 0 10px rgba(0, 255, 102, 0.7)' }}>
              <span>{pilotoData?.creditos !== undefined ? pilotoData.creditos.toLocaleString() : '--'}</span> <span className="text-lg text-white/50">CR</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-3 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/50 rounded-xl transition-all"
            title="Terminar Sessão"
          >
            <LogOut size={24} />
          </button>
        </div>
      </header>

      {/* Grid de Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Cartão: Performance (Ballast) */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h3 className="font-display text-lg font-bold uppercase tracking-widest text-white">Performance</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Restrição de Peso (Ballast)</p>
            </div>
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <Weight className="text-gray-400" size={20} />
            </div>
          </div>
          <div className="relative z-10 flex items-baseline gap-2">
            <span className="font-display text-5xl font-black text-white">
              {pilotoData?.pesoCarro !== undefined ? `+${pilotoData.pesoCarro}` : '--'}
            </span>
            <span className="text-xl font-bold text-red-400 uppercase">KG</span>
          </div>
          <div className="mt-4 w-full bg-black/50 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-full" style={{ width: `${(Math.min(40, pilotoData?.pesoCarro || 0) / 40) * 100}%` }}></div>
          </div>
        </div>

        {/* Cartão: Caixa de Entrada (Missões) */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h3 className="font-display text-lg font-bold uppercase tracking-widest text-white">Caixa de Entrada</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Objetivo do Patrocinador</p>
            </div>
            <div className="p-2 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
              <Target className="text-neon-cyan" size={20} />
            </div>
          </div>
          <div className="relative z-10 bg-black/40 border border-white/5 rounded-xl p-4">
            <p className="text-gray-300 text-sm leading-relaxed italic">
              {pilotoData?.missaoAtual || "Nenhuma missão atribuída de momento. Foca-te na vitória."}
            </p>
          </div>
        </div>

      </div>

      {/* Loja de Engenharia */}
      <div className="glass-panel rounded-2xl p-6 mt-6">
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
          <Car className="text-neon-cyan" size={24} />
          <h3 className="font-display text-xl font-bold uppercase tracking-widest text-white">Loja de Engenharia</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upgrades.map((upgrade) => (
            <div key={upgrade.id} className="bg-black/40 border border-white/5 rounded-xl p-5 hover:border-neon-cyan/50 transition-colors group flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider pr-4">{upgrade.name}</h4>
                <span className="text-neon-green font-mono font-bold text-sm shrink-0">{upgrade.price.toLocaleString()} CR</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-grow">{upgrade.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-1 text-neon-cyan">
                  <Weight size={14} />
                  <span className="font-bold text-sm">-{upgrade.weightReduction} KG</span>
                </div>
                <button 
                  onClick={() => handleBuyUpgrade(upgrade)}
                  className="px-4 py-2 bg-white/5 hover:bg-neon-cyan hover:text-black text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={(pilotoData?.creditos || 0) < upgrade.price || (pilotoData?.pesoCarro || 0) <= 0 || buyingUpgrade === upgrade.id}
                >
                  {buyingUpgrade === upgrade.id ? 'A Instalar...' : 'Comprar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
