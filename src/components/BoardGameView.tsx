import React, { useState } from 'react';
import { 
  PetProfile, 
  ModuleId, 
  BoardStage, 
  StageProgress, 
  TrainingModuleInfo,
  GamifiedTask
} from '../types';
import { TRAINING_MODULES, BOARD_STAGES } from '../data/boardData';
import { getPetLevelInfo } from '../data/defaultTasks';
import { audioService } from '../services/audioService';
import { StageDetailModal } from './StageDetailModal';
import { ModuleStoreModal } from './ModuleStoreModal';
import { PetAvatarVisual } from './PetAvatarVisual';
import { 
  Flame, 
  Star, 
  Award, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Play, 
  Dices, 
  ShoppingBag, 
  ChevronRight, 
  Dog, 
  Cat, 
  Crown, 
  Zap, 
  ShieldCheck, 
  Eye, 
  HeartHandshake, 
  Cookie, 
  Puzzle, 
  Activity, 
  Compass, 
  Bone,
  Check,
  Gift,
  Home,
  Clock,
  ShieldAlert,
  Utensils
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BoardGameViewProps {
  pet: PetProfile;
  progressoFases: Record<string, StageProgress>;
  modulosContratados: Record<ModuleId, boolean>;
  onCompleteStage: (stageId: string, stars: 1 | 2 | 3, xp: number) => void;
  onLaunchTimerForStage: (stage: BoardStage) => void;
  onToggleModuleStatus: (moduleId: ModuleId) => void;
  onUnlockAllModules: () => void;
  onNavigateToAnamnese: () => void;
  onOpenTreatStore?: () => void;
  onOpenBehavioralProtocol?: (protocolId: 'ansiedade_separacao' | 'posse_recursos' | 'posse_ambiente') => void;
}

export const BoardGameView: React.FC<BoardGameViewProps> = ({
  pet,
  progressoFases,
  modulosContratados,
  onCompleteStage,
  onLaunchTimerForStage,
  onToggleModuleStatus,
  onUnlockAllModules,
  onNavigateToAnamnese,
  onOpenTreatStore
}) => {
  const [moduloAtivoId, setModuloAtivoId] = useState<ModuleId>('obediencia');
  const [selectedStage, setSelectedStage] = useState<BoardStage | null>(null);
  const [showStoreModal, setShowStoreModal] = useState<boolean>(false);

  // Dice roll state
  const [isRollingDice, setIsRollingDice] = useState<boolean>(false);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [diceBonusMsg, setDiceBonusMsg] = useState<string | null>(null);

  const levelInfo = getPetLevelInfo(pet.xp);
  const moduloAtivo = TRAINING_MODULES.find(m => m.id === moduloAtivoId) || TRAINING_MODULES[0];
  const isModuloContratado = Boolean(modulosContratados[moduloAtivoId]);
  const saldoPetiscos = pet.saldoPetiscos ?? Math.floor(pet.xp / 5);

  // Fases do módulo atual filtradas por espécie do pet
  const fasesModulo = BOARD_STAGES.filter(
    s => s.moduloId === moduloAtivoId && (s.especieAlvo === 'Todos' || s.especieAlvo === pet.especie)
  );

  // Calcula estrelas e progresso
  const totalFases = fasesModulo.length;
  const fasesConcluidas = fasesModulo.filter(s => progressoFases[s.id]?.concluida).length;
  const totalEstrelasModulo = fasesModulo.reduce((acc, s) => acc + (progressoFases[s.id]?.estrelas || 0), 0);
  const pctConclusao = totalFases > 0 ? Math.round((fasesConcluidas / totalFases) * 100) : 0;

  // Determina a primeira fase não concluída (onde o Peão do Pet deve ficar)
  const primeiraFaseNaoConcluida = fasesModulo.find(s => !progressoFases[s.id]?.concluida) || fasesModulo[fasesModulo.length - 1];

  // Rolagem de Dado Diário com XP
  const handleRollDice = () => {
    if (isRollingDice) return;
    setIsRollingDice(true);
    audioService.playDiceRoll();

    // Animação de rotação rápida
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      const bonusXp = roll * 10;
      const bonusPetiscos = roll * 3;
      setDiceResult(roll);
      setIsRollingDice(false);
      audioService.playCoinReward();

      setDiceBonusMsg(`🎲 O dado rolou ${roll}! ${pet.nome} ganhou +${bonusXp} XP e +${bonusPetiscos} PETCOINS 🪙!`);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.4 }
        });
      } catch {
        // ignore
      }

      setTimeout(() => {
        setDiceBonusMsg(null);
      }, 5000);
    }, 600);
  };

  const getStageIcon = (iconeName: string) => {
    switch (iconeName) {
      case 'Eye': return <Eye className="w-5 h-5 text-indigo-600" />;
      case 'Bone': return <Bone className="w-5 h-5 text-rose-600" />;
      case 'Home': return <Home className="w-5 h-5 text-amber-600" />;
      case 'Clock': return <Clock className="w-5 h-5 text-amber-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-emerald-600" />;
      case 'Gift': return <Gift className="w-5 h-5 text-amber-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Compass': return <Compass className="w-5 h-5 text-blue-500" />;
      case 'Award': return <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />;
      case 'Cookie': return <Cookie className="w-5 h-5 text-amber-600" />;
      case 'Puzzle': return <Puzzle className="w-5 h-5 text-purple-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-purple-600" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Board Game Hero & Dice Card */}
      <div className={`bg-gradient-to-br ${moduloAtivo.bgGradiente} rounded-3xl p-6 text-white shadow-xl relative overflow-hidden transition-all duration-500`}>
        {/* Glow backdrop circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-black/15 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Top Row: Pet Pawn Status & Store Button */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              {/* Pet Pawn Avatar */}
              <div className="relative">
                <PetAvatarVisual pet={pet} size="md" showBadge={false} />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] flex items-center justify-center shadow-xs border border-white">
                  {levelInfo.nivel}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-white/80 font-bold uppercase tracking-wider">
                    Peão de {pet.nome}
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-400/30 text-amber-300 text-[10px] font-black">
                    {levelInfo.titulo}
                  </span>
                </div>
                <h1 className="text-lg font-black tracking-tight text-white">
                  Jornada de Adestramento
                </h1>
              </div>
            </div>

            {/* Actions: PETCOINS Store & Modules */}
            <div className="flex items-center gap-1.5">
              {onOpenTreatStore && (
                <button
                  type="button"
                  id="btn-abrir-loja-petiscos-hero"
                  onClick={onOpenTreatStore}
                  className="px-3 py-2 rounded-2xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 font-extrabold text-xs backdrop-blur-xs border border-amber-300/40 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title="Trocar PETCOINS por Descontos Reais"
                >
                  <span>🪙</span>
                  <span>{saldoPetiscos}</span>
                  <span className="hidden sm:inline text-[10px] text-amber-300 font-black">PETCOINS</span>
                </button>
              )}

              <button
                type="button"
                id="btn-abrir-loja-modulos"
                onClick={() => setShowStoreModal(true)}
                className="px-3 py-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs backdrop-blur-xs border border-white/30 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                <span>Módulos</span>
              </button>
            </div>
          </div>

          {/* Dice Roller & Daily Lucky Roll */}
          <div className="p-3.5 rounded-2xl bg-black/20 backdrop-blur-xs border border-white/15 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Dado da Sorte Diário
              </span>
              <p className="text-xs text-white/80">
                {diceResult ? `Última jogada: face ${diceResult} (+${diceResult * 10} XP)` : 'Jogue o dado para ganhar XP e PETCOINS 🪙 bônus hoje!'}
              </p>
            </div>

            <button
              type="button"
              id="btn-rolar-dado"
              onClick={handleRollDice}
              disabled={isRollingDice}
              className={`py-2 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                isRollingDice ? 'animate-bounce' : ''
              }`}
            >
              <Dices className={`w-4 h-4 ${isRollingDice ? 'animate-spin' : ''}`} />
              <span>{isRollingDice ? 'Rolando...' : 'Jogar Dado'}</span>
            </button>
          </div>

          {/* Dice Bonus Notification */}
          {diceBonusMsg && (
            <div className="p-2.5 rounded-xl bg-amber-400 text-amber-950 font-extrabold text-xs text-center animate-in zoom-in-95 duration-150 shadow-md">
              {diceBonusMsg}
            </div>
          )}

          {/* Current Module Progress Overview */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs font-semibold text-white/90">
              <span>{moduloAtivo.nome}: {fasesConcluidas} de {totalFases} Fases</span>
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {totalEstrelasModulo} Estrelas
              </span>
            </div>
            <div className="w-full h-3 bg-black/25 rounded-full overflow-hidden p-0.5 backdrop-blur-xs">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${pctConclusao}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Module Selector Tabs (4 Categorias Contratáveis) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Trilhas & Módulos de Tabuleiro
          </span>
          <button
            type="button"
            onClick={() => setShowStoreModal(true)}
            className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            <span>Gerenciar Assinatura</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TRAINING_MODULES.map((mod) => {
            const isSelected = moduloAtivoId === mod.id;
            const isContratado = Boolean(modulosContratados[mod.id]);
            const fasesDoMod = BOARD_STAGES.filter(s => s.moduloId === mod.id && (s.especieAlvo === 'Todos' || s.especieAlvo === pet.especie));
            const concluidasDoMod = fasesDoMod.filter(s => progressoFases[s.id]?.concluida).length;

            return (
              <button
                key={mod.id}
                type="button"
                id={`tab-module-${mod.id}`}
                onClick={() => {
                  audioService.playClicker();
                  setModuloAtivoId(mod.id);
                }}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-600/20'
                    : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300 text-slate-600 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                      isContratado
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isContratado ? 'Contratado ✓' : 'Demo 1ª Fase'}
                    </span>
                  </div>

                  <h3 className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                    {mod.nome}
                  </h3>
                </div>

                <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                  <span>{concluidasDoMod}/{fasesDoMod.length} Fases</span>
                  {concluidasDoMod === fasesDoMod.length && fasesDoMod.length > 0 && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sinuous Board Game Path View */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block">
              Trilha de Conquistas
            </span>
            <h2 className="text-base font-black text-slate-800">
              {moduloAtivo.nome}
            </h2>
          </div>

          {!isModuloContratado && (
            <button
              type="button"
              onClick={() => setShowStoreModal(true)}
              className="py-1.5 px-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold hover:bg-amber-100 transition-colors flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-amber-600" />
              <span>Desbloquear Trilha ({moduloAtivo.precoExibicao})</span>
            </button>
          )}
        </div>

        {/* Board Trail / Nodes Path */}
        <div className="relative py-4 max-w-sm mx-auto">
          {/* Animated Sinuous Connecting Track */}
          <div className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-3 border-l-4 border-dashed border-indigo-200/80 pointer-events-none z-0" />

          {/* Stage Nodes Sequence */}
          <div className="space-y-8 relative z-10">
            {fasesModulo.map((stage, idx) => {
              const progress = progressoFases[stage.id];
              const isConcluida = Boolean(progress?.concluida);
              const estrelas = progress?.estrelas || 0;

              // Verifica se a fase está desbloqueada:
              // 1. Fase 1 é sempre aberta (Demo)
              // 2. Se o módulo for contratado, desbloqueia em sequência
              // 3. Se não for contratado, fases > 1 ficam com trava de assinatura
              const isLockedBySubscription = !isModuloContratado && stage.ordem > moduloAtivo.faseGratisAte;
              const isPreviousCompleted = idx === 0 || Boolean(progressoFases[fasesModulo[idx - 1]?.id]?.concluida);
              const isUnlocked = !isLockedBySubscription && isPreviousCompleted;

              const isPetCurrentNode = primeiraFaseNaoConcluida?.id === stage.id;

              // Posicionamento alternado no tabuleiro (esquerda, centro, direita)
              const positionClass = idx % 2 === 0 ? 'items-start sm:pl-4' : 'items-end sm:pr-4';

              return (
                <div key={stage.id} className={`flex flex-col ${positionClass}`}>
                  <div className="relative inline-flex flex-col items-center">
                    {/* Pet Pawn Floating Marker */}
                    {isPetCurrentNode && (
                      <div className="absolute -top-11 z-30 animate-bounce flex flex-col items-center pointer-events-none">
                        <div className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] shadow-lg flex items-center gap-1 border border-white">
                          <span>{pet.nome} está aqui!</span>
                        </div>
                        <div className="w-2 h-2 bg-indigo-600 rotate-45 -mt-1" />
                      </div>
                    )}

                    {/* Circular Board Node Button */}
                    <button
                      type="button"
                      id={`node-stage-${stage.id}`}
                      onClick={() => {
                        audioService.playClicker();
                        setSelectedStage(stage);
                      }}
                      className={`w-18 h-18 rounded-3xl border-4 transition-all duration-300 flex flex-col items-center justify-center p-1.5 shadow-md relative cursor-pointer active:scale-95 ${
                        isConcluida
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-white text-white shadow-emerald-200'
                          : isUnlocked
                          ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 border-amber-300 text-white shadow-indigo-200 ring-4 ring-indigo-500/20 animate-pulse'
                          : isLockedBySubscription
                          ? 'bg-slate-100 border-amber-200 text-amber-700 opacity-90'
                          : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      {/* Node Center Icon / Badge */}
                      {isConcluida ? (
                        <CheckCircle2 className="w-7 h-7 text-white drop-shadow-xs" />
                      ) : isLockedBySubscription ? (
                        <div className="flex flex-col items-center">
                          <Lock className="w-5 h-5 text-amber-600" />
                          <span className="text-[9px] font-black text-amber-700 uppercase mt-0.5">Avulso</span>
                        </div>
                      ) : !isUnlocked ? (
                        <Lock className="w-6 h-6 text-slate-400" />
                      ) : stage.tipoFase === 'boss' ? (
                        <Crown className="w-7 h-7 text-amber-300 fill-amber-300 animate-spin" />
                      ) : (
                        <span className="text-xl font-black">{stage.ordem}</span>
                      )}

                      {/* Stars indicator if completed */}
                      {isConcluida && (
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-2.5 h-2.5 ${i < estrelas ? 'fill-amber-300 text-amber-300' : 'text-emerald-200'}`}
                            />
                          ))}
                        </div>
                      )}
                    </button>

                    {/* Stage Label Card Attached to Node */}
                    <div
                      onClick={() => {
                        audioService.playClicker();
                        setSelectedStage(stage);
                      }}
                      className={`mt-2 p-2.5 rounded-2xl border text-center max-w-[160px] cursor-pointer shadow-xs transition-all ${
                        isConcluida
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                          : isUnlocked
                          ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                          Fase {stage.ordem}
                        </span>
                        {stage.tipoFase === 'boss' && (
                          <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-1 rounded-sm">
                            BOSS
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold line-clamp-1">
                        {stage.titulo}
                      </h4>
                      <span className="text-[10px] font-semibold text-amber-600 block mt-0.5">
                        +{stage.xpRecompensa} XP
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stage Detail & Action Modal */}
      {selectedStage && (
        <StageDetailModal
          stage={selectedStage}
          moduleInfo={moduloAtivo}
          stageProgress={progressoFases[selectedStage.id]}
          pet={pet}
          isUnlocked={
            (isModuloContratado || selectedStage.ordem <= moduloAtivo.faseGratisAte) &&
            (selectedStage.ordem === 1 || Boolean(progressoFases[fasesModulo[selectedStage.ordem - 2]?.id]?.concluida))
          }
          isLockedBySubscription={!isModuloContratado && selectedStage.ordem > moduloAtivo.faseGratisAte}
          onClose={() => setSelectedStage(null)}
          onCompleteStage={onCompleteStage}
          onLaunchTimer={onLaunchTimerForStage}
          onOpenStoreModal={() => setShowStoreModal(true)}
        />
      )}

      {/* Module Store / Subscription Manager Modal */}
      <ModuleStoreModal
        isOpen={showStoreModal}
        onClose={() => setShowStoreModal(false)}
        modulosContratados={modulosContratados}
        onToggleModuleStatus={onToggleModuleStatus}
        onUnlockAllModules={onUnlockAllModules}
        pet={pet}
      />
    </div>
  );
};
