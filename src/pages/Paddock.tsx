import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { LogOut, Target, Weight, Car } from 'lucide-react';

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
            <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-full w-1/3"></div>
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
    </div>
  );
};
