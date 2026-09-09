import React from 'react';
import { PetProfile, Badge } from '../types';
import { getPetLevelInfo, LEVEL_TIERS } from '../data/defaultTasks';
import { PetAvatarVisual } from './PetAvatarVisual';
import { 
  Award, 
  Flame, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Star, 
  PlayCircle, 
  CheckCheck, 
  Brain, 
  Share2,
  Dog,
  Cat,
  Bone,
  ShoppingBag,
  Gift,
  Ticket
} from 'lucide-react';

interface AchievementsViewProps {
  pet: PetProfile;
  badges: Badge[];
  onOpenTreatStore?: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  pet,
  badges,
  onOpenTreatStore
}) => {
  const levelInfo = getPetLevelInfo(pet.xp);
  const saldoPetiscos = pet.saldoPetiscos ?? Math.floor(pet.xp / 5);
  const cupons = pet.cuponsResgatados || [];

  const getBadgeIcon = (icone: string) => {
    switch (icone) {
      case 'Award': return <Award className="w-5 h-5 text-indigo-600" />;
      case 'PlayCircle': return <PlayCircle className="w-5 h-5 text-emerald-600" />;
      case 'CheckCheck': return <CheckCheck className="w-5 h-5 text-teal-600" />;
      case 'Brain': return <Brain className="w-5 h-5 text-purple-600" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />;
      case 'Star': return <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Gamification Level Overview Card */}
      <div className="bg-gradient-to-br from-indigo-800 via-indigo-700 to-indigo-900 rounded-3xl p-6 text-white shadow-lg space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PetAvatarVisual pet={pet} size="md" showBadge={false} />
            <div>
              <span className="text-xs text-indigo-200 font-semibold uppercase tracking-wider">Patente Atual</span>
              <h2 className="text-lg font-black">{levelInfo.titulo}</h2>
              <span className="text-[11px] text-indigo-300">{pet.nome} • {pet.raca || pet.especie}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-amber-300">Nv. {levelInfo.nivel}</span>
            <span className="block text-[11px] text-indigo-200">{pet.xp} XP</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-semibold text-indigo-200">
            <span>Progresso para o Nível {levelInfo.nivel + 1}</span>
            <span>{levelInfo.xpRestante} XP restantes</span>
          </div>
          <div className="w-full h-3 bg-black/25 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${levelInfo.progressoPercent}%` }}
            />
          </div>
        </div>

        {/* Streak & Treats Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs flex flex-col justify-center">
            <div className="flex items-center gap-1 text-amber-300 mb-0.5">
              <Flame className="w-4 h-4 fill-amber-300" />
              <span className="text-sm font-black">{pet.streakDias}d</span>
            </div>
            <span className="text-[10px] text-indigo-200">Ofensiva</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs flex flex-col justify-center">
            <div className="flex items-center gap-1 text-emerald-300 mb-0.5">
              <Award className="w-4 h-4" />
              <span className="text-sm font-black">
                {badges.filter(b => b.desbloqueada).length}/{badges.length}
              </span>
            </div>
            <span className="text-[10px] text-indigo-200">Medalhas</span>
          </div>

          <div 
            onClick={onOpenTreatStore}
            className="p-3 rounded-2xl bg-amber-400/20 border border-amber-300/30 backdrop-blur-xs flex flex-col justify-center cursor-pointer hover:bg-amber-400/30 transition-all"
          >
            <div className="flex items-center gap-1 text-amber-200 mb-0.5">
              <span className="text-sm">🪙</span>
              <span className="text-sm font-black">{saldoPetiscos}</span>
            </div>
            <span className="text-[10px] text-amber-300 font-bold uppercase">PETCOINS</span>
          </div>
        </div>
      </div>

      {/* Treat Store & Rewards Partnership Banner */}
      {onOpenTreatStore && (
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-3xl p-5 text-white shadow-md flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                Economia de Parcerias
              </span>
            </div>
            <h3 className="text-sm font-black">Loja de PETCOINS & Brinquedos</h3>
            <p className="text-xs text-amber-100 max-w-xs leading-relaxed">
              Troque suas {saldoPetiscos} PETCOINS acumuladas por descontos reais em mordedores, orelhas e brinquedos!
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenTreatStore}
            className="px-4 py-3 rounded-2xl bg-white text-amber-950 font-black text-xs shadow-md hover:bg-amber-50 active:scale-95 transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-amber-700" />
            <span>Ver Loja</span>
          </button>
        </div>
      )}

      {/* Redeemed Coupons (if any) */}
      {cupons.length > 0 && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Seus Cupons de Desconto Resgatados ({cupons.length})
            </h3>
          </div>

          <div className="space-y-2">
            {cupons.map(cupom => (
              <div key={cupom.id} className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">{cupom.itemNome}</h4>
                  <span className="text-[10px] text-emerald-700">Parceiro: {cupom.marcaParceira}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-black text-emerald-900 bg-white px-2 py-1 rounded-lg border border-emerald-300">
                    {cupom.codigoCupom}
                  </span>
                  <span className="block text-[9px] text-emerald-600 mt-0.5">{cupom.descontoValor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-800">Conquistas & Medalhas</h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {badges.filter(b => b.desbloqueada).length} desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                badge.desbloqueada
                  ? 'bg-gradient-to-br from-slate-50 to-white border-indigo-200/80 shadow-xs'
                  : 'bg-slate-50/50 border-slate-200/60 opacity-60'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                  badge.desbloqueada
                    ? 'bg-indigo-50 border border-indigo-100 shadow-xs'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {badge.desbloqueada ? getBadgeIcon(badge.icone) : <Lock className="w-4 h-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className={`text-sm font-bold truncate ${badge.desbloqueada ? 'text-slate-800' : 'text-slate-500'}`}>
                    {badge.titulo}
                  </h3>
                  {badge.desbloqueada && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                  {badge.descricao}
                </p>
                <span className="inline-block text-[10px] text-slate-400 mt-1 font-medium">
                  {badge.desbloqueada ? 'Desbloqueada ✓' : `Requisito: ${badge.criterio}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diploma Card */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200/80 text-amber-950 space-y-3">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-600 fill-amber-600" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-900">
            Certificado de Treinamento Positivo
          </h3>
        </div>
        <p className="text-xs text-amber-900/80 leading-relaxed">
          {pet.nome} é oficialmente reconhecido(a) como <strong>{levelInfo.titulo}</strong> no programa AdestraPet, com {pet.streakDias} {pet.streakDias === 1 ? 'dia' : 'dias'} de dedicação mútua e vínculo afetivo fortalecido.
        </p>
      </div>
    </div>
  );
};

