import React, { useState } from 'react';
import { BoardStage, StageProgress, PetProfile, TrainingModuleInfo } from '../types';
import { audioService } from '../services/audioService';
import { 
  X, 
  Sparkles, 
  Timer, 
  Award, 
  Star, 
  CheckCircle2, 
  Lock, 
  Play, 
  ShieldAlert, 
  Dog, 
  Cat, 
  Flame,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  ListChecks,
  Check,
  Circle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StageDetailModalProps {
  stage: BoardStage;
  moduleInfo: TrainingModuleInfo;
  stageProgress?: StageProgress;
  pet: PetProfile;
  isUnlocked: boolean;
  isLockedBySubscription: boolean;
  onClose: () => void;
  onCompleteStage: (stageId: string, stars: 1 | 2 | 3, xp: number) => void;
  onLaunchTimer: (stage: BoardStage) => void;
  onOpenStoreModal: () => void;
}

export const StageDetailModal: React.FC<StageDetailModalProps> = ({
  stage,
  moduleInfo,
  stageProgress,
  pet,
  isUnlocked,
  isLockedBySubscription,
  onClose,
  onCompleteStage,
  onLaunchTimer,
  onOpenStoreModal
}) => {
  const [selectedStars, setSelectedStars] = useState<1 | 2 | 3>(
    (stageProgress?.estrelas as 1 | 2 | 3) || 3
  );

  // Estado local para micro-etapas concluídas nesta sessão ou já salvas
  const [completedMicroSteps, setCompletedMicroSteps] = useState<string[]>(
    stageProgress?.microEtapasConcluidas || []
  );

  const toggleMicroStep = (stepId: string) => {
    if (completedMicroSteps.includes(stepId)) {
      setCompletedMicroSteps(prev => prev.filter(id => id !== stepId));
    } else {
      audioService.playSuccessChime();
      setCompletedMicroSteps(prev => [...prev, stepId]);
    }
  };

  const handleComplete = () => {
    audioService.playSuccessChime();
    audioService.playCoinReward();
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
    onCompleteStage(stage.id, selectedStars, stage.xpRecompensa);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with module gradient */}
        <div className={`bg-gradient-to-r ${moduleInfo.bgGradiente} p-5 text-white relative`}>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-xs">
              {stage.subtitulo}
            </span>
            {stage.tipoFase === 'boss' && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                👑 Fase Boss
              </span>
            )}
            {stage.tipoFase === 'desafio' && (
              <span className="px-2 py-0.5 rounded-full bg-purple-400 text-purple-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                ⚡ Desafio
              </span>
            )}
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-white pr-8">
            {stage.titulo}
          </h2>

          <div className="flex items-center gap-3 mt-3 text-xs text-white/90 flex-wrap">
            <span className="flex items-center gap-1 font-bold bg-white/15 px-2.5 py-1 rounded-xl">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              +{stage.xpRecompensa} XP
            </span>
            <span className="flex items-center gap-1 font-medium bg-white/15 px-2.5 py-1 rounded-xl">
              <Timer className="w-3.5 h-3.5" />
              {stage.duracaoMinutos} min recomendados
            </span>
            {stageProgress?.concluida && (
              <span className="flex items-center gap-1 font-bold text-emerald-300 ml-auto">
                <CheckCircle2 className="w-4 h-4" />
                Concluída ✓
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-600 flex-1">
          {/* Subscription Lock Notice */}
          {isLockedBySubscription && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Módulo Bloqueado por Assinatura / Contratação</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                A 1ª fase deste módulo é disponibilizada gratuitamente para teste! Para continuar avançando nesta jornada e desbloquear todas as micro-etapas e fases avançadas de <strong>{moduleInfo.nome}</strong>, ative sua assinatura modular por {moduleInfo.precoExibicao}.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenStoreModal();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Desbloquear Assinatura ({moduleInfo.precoExibicao})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Regular Level Lock Notice */}
          {!isUnlocked && !isLockedBySubscription && (
            <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-xs font-medium">
                Conclua as fases e micro-etapas anteriores da trilha para desbloquear esta missão!
              </span>
            </div>
          )}

          {/* Por que ensinar & Como usar na rotina (Explicação Sucinta do Adestrador) */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Por que ensinar & Como usar no dia a dia</span>
            </div>
            <p className="text-xs text-indigo-900 leading-relaxed font-medium">
              {stage.motivoEUtilidade || stage.descricao}
            </p>
          </div>

          {/* Micro-etapas / Exercícios Progressivos de Alta Precisão */}
          {stage.microEtapas && stage.microEtapas.length > 0 && (
            <div className="space-y-2.5 bg-slate-50/90 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ListChecks className="w-4 h-4 text-emerald-600" />
                  <span>Micro-Fases de Precisão ({completedMicroSteps.length}/{stage.microEtapas.length} dominadas):</span>
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  Critério do Adestrador
                </span>
              </div>

              <div className="space-y-2">
                {stage.microEtapas.map((micro) => {
                  const isDone = completedMicroSteps.includes(micro.id);
                  return (
                    <div
                      key={micro.id}
                      onClick={() => isUnlocked && toggleMicroStep(micro.id)}
                      className={`p-3 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                      } ${isUnlocked ? 'cursor-pointer' : 'opacity-70'}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            isDone
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-slate-100 border-slate-300 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900">
                              Etapa {micro.ordem}: {micro.titulo}
                            </span>
                            <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                              {micro.repeticoesRecomendadas}x repetições
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {micro.descricao}
                          </p>
                          <div className="text-[10px] text-emerald-800 font-medium bg-emerald-100/50 px-2 py-1 rounded-md mt-1">
                            🎯 <strong>Critério de Sucesso:</strong> {micro.criterioSucesso}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step by Step Geral */}
          <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Instruções Gerais de Execução:</span>
            </span>
            <ol className="space-y-2">
              {stage.passoAPasso.map((passo, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700">{passo}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Golden Tip */}
          {stage.dicaEspecial && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-950 font-bold mb-0.5">Dica de Ouro do Adestrador:</strong>
                <span className="text-amber-900/90 leading-relaxed">{stage.dicaEspecial}</span>
              </div>
            </div>
          )}

          {/* Performance Stars Selector */}
          {isUnlocked && (
            <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-center space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Avaliação da Qualidade de Execução de {pet.nome}:
              </span>
              <div className="flex items-center justify-center gap-3">
                {([1, 2, 3] as const).map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedStars(star)}
                    className="p-1 text-amber-400 hover:scale-115 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${star <= selectedStars ? 'fill-amber-400 text-amber-400 drop-shadow-xs' : 'text-slate-300'}`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-indigo-700 font-semibold block">
                {selectedStars === 3 ? '⭐⭐⭐ Execução Perfeita & Foco Total' : selectedStars === 2 ? '⭐⭐ Bom Desempenho em Aprendizado' : '⭐ Primeiro Contato'}
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2.5">
          {isUnlocked ? (
            <>
              <button
                type="button"
                id="btn-iniciar-treino-modal"
                onClick={() => {
                  onClose();
                  onLaunchTimer(stage);
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Treinar com Cronômetro</span>
              </button>

              <button
                type="button"
                id="btn-concluir-fase-tabuleiro"
                onClick={handleComplete}
                className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Marcar Concluída</span>
              </button>
            </>
          ) : isLockedBySubscription ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenStoreModal();
              }}
              className="w-full py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Desbloquear Assinatura Completa ({moduleInfo.precoExibicao})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-2xl bg-slate-800 text-white font-bold text-xs"
            >
              Fase Bloqueada — Conclua as Fases Anteriores
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
