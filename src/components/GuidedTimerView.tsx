import React, { useState, useEffect, useRef } from 'react';
import { PetProfile, GamifiedTask, BoardStage, TrainingLog, GoogleSheetsConfig, TaskCategory, ClickerSoundType, TrainingRoutineMode } from '../types';
import { audioService } from '../services/audioService';
import { syncTrainingLogToSheets } from '../services/sheetsSync';
import { PetAvatarVisual } from './PetAvatarVisual';
import { TRAINING_ROUTINES } from '../data/rewardsAndAvatarsData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Radio, 
  Flame, 
  Dog, 
  Cat, 
  Clock, 
  Award,
  ChevronRight,
  Bone,
  Mic,
  Settings2,
  Zap,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GuidedTimerViewProps {
  pet: PetProfile;
  tarefaSelecionada?: GamifiedTask | BoardStage | null;
  sheetsConfig: GoogleSheetsConfig;
  onSaveLog: (log: TrainingLog, petiscosGanhos: number) => void;
  onNavigateToHistory: () => void;
  onOpenMarkerModal: () => void;
  onOpenRoutineModal: () => void;
  onOpenTreatStore: () => void;
}

type TimerPhase = 'idle' | 'prep' | 'active' | 'reward' | 'completed';

export const GuidedTimerView: React.FC<GuidedTimerViewProps> = ({
  pet,
  tarefaSelecionada,
  sheetsConfig,
  onSaveLog,
  onNavigateToHistory,
  onOpenMarkerModal,
  onOpenRoutineModal,
  onOpenTreatStore
}) => {
  const rotinaAtiva = pet.rotinaTreino || 'iniciante_5m';
  const routineInfo = TRAINING_ROUTINES.find(r => r.id === rotinaAtiva) || TRAINING_ROUTINES[1];

  // Configuração de tempo (em segundos)
  const [duracaoAtiva, setDuracaoAtiva] = useState<number>(
    tarefaSelecionada 
      ? tarefaSelecionada.duracaoMinutos * 60 
      : routineInfo.duracaoPadraoSegundos
  );

  const [fase, setFase] = useState<TimerPhase>('idle');
  const [tempoRestante, setTempoRestante] = useState<number>(duracaoAtiva);
  const [emExecucao, setEmExecucao] = useState<boolean>(false);
  const [nomeExercicio, setNomeExercicio] = useState<string>(
    tarefaSelecionada?.titulo || (pet.especie === 'Gato' ? 'Target & Reconhecimento do Nome' : 'Comando Senta & Fica com Marcador')
  );

  // Modal de conclusão
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [notaDesempenho, setNotaDesempenho] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [observacoes, setObservacoes] = useState<string>('');
  const [totalSegundosTreinados, setTotalSegundosTreinados] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  const somClicker = pet.somClicker || 'mecanico';
  const marcadorVerbal = pet.marcadorVerbal || 'Sim!';

  // Sync if selected task or routine changes
  useEffect(() => {
    if (tarefaSelecionada) {
      setNomeExercicio(tarefaSelecionada.titulo);
      const segs = Math.max(60, tarefaSelecionada.duracaoMinutos * 60);
      setDuracaoAtiva(segs);
      if (fase === 'idle') {
        setTempoRestante(segs);
      }
    } else {
      const defaultSecs = routineInfo.duracaoPadraoSegundos;
      setDuracaoAtiva(defaultSecs);
      if (fase === 'idle') {
        setTempoRestante(defaultSecs);
      }
    }
  }, [tarefaSelecionada, pet.rotinaTreino]);

  // Main countdown engine
  useEffect(() => {
    if (emExecucao && tempoRestante > 0) {
      timerRef.current = window.setInterval(() => {
        setTempoRestante((prev) => {
          if (prev <= 1) {
            handlePhaseAdvance();
            return 0;
          }
          if (prev <= 4) {
            audioService.playTimerBeep(false);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [emExecucao, tempoRestante, fase]);

  const handlePhaseAdvance = () => {
    if (fase === 'prep') {
      audioService.playTimerBeep(true);
      setFase('active');
      setTempoRestante(duracaoAtiva);
    } else if (fase === 'active') {
      audioService.playSuccessChime();
      setFase('reward');
      setTempoRestante(20); // 20s de comemoração
    } else if (fase === 'reward') {
      audioService.playSuccessChime();
      audioService.playCoinReward();
      setEmExecucao(false);
      setFase('completed');
      setTotalSegundosTreinados(duracaoAtiva + 10 + 20);
      setShowCompletionModal(true);
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const startTraining = () => {
    audioService.playTimerBeep(false);
    setFase('prep');
    setTempoRestante(10); // 10s de preparação
    setEmExecucao(true);
  };

  const togglePause = () => {
    setEmExecucao(!emExecucao);
  };

  const resetTimer = () => {
    setEmExecucao(false);
    setFase('idle');
    setTempoRestante(duracaoAtiva);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTriggerMarker = () => {
    audioService.playClicker(somClicker, marcadorVerbal);
  };

  const handleSaveSession = async () => {
    const xpGanho = Math.round((duracaoAtiva / 60) * 15) + (notaDesempenho * 5);
    const petiscosGanhos = Math.max(10, Math.round((duracaoAtiva / 60) * 8) + (notaDesempenho * 2));

    const log: TrainingLog = {
      id: 'log_' + Date.now(),
      petId: pet.id,
      petNome: pet.nome,
      especie: pet.especie,
      dataHora: new Date().toISOString(),
      categoria: tarefaSelecionada?.categoria || 'obediencia',
      nomeExercicio,
      duracaoSegundos: totalSegundosTreinados || duracaoAtiva,
      sucessoNota: notaDesempenho,
      observacoes: observacoes.trim(),
      xpGanho,
      petiscosGanhos
    };

    onSaveLog(log, petiscosGanhos);

    // Sync to Google Sheets if configured
    if (sheetsConfig.scriptUrl) {
      await syncTrainingLogToSheets(sheetsConfig.scriptUrl, log);
    }

    setShowCompletionModal(false);
    resetTimer();
  };

  // Cálculo da instrução e cor por fase
  let faseTitulo = 'Pronto para Iniciar';
  let faseDescricao = `Rotina: ${routineInfo.nome} • Sessão estruturada com reforço positivo.`;
  let bgGradiente = 'from-indigo-600 via-indigo-700 to-indigo-900';

  if (fase === 'prep') {
    faseTitulo = '🟡 Fase 1: Preparação & Foco';
    faseDescricao = `Tenha petiscos deliciosos e o marcador ("${marcadorVerbal}") prontos. Chame ${pet.nome}.`;
    bgGradiente = 'from-amber-500 via-amber-600 to-amber-700';
  } else if (fase === 'active') {
    faseTitulo = '🟢 Fase 2: Treino Ativo & Marcador';
    faseDescricao = pet.especie === 'Gato'
      ? `Faça repetições curtas de aproximação. Use o botão Marcador ("${marcadorVerbal}") no milissegundo do acerto!`
      : `Dê o comando 1 vez, espere o cão processar e clique/fale "${marcadorVerbal}" imediatamente no acerto!`;
    bgGradiente = 'from-emerald-600 via-teal-700 to-emerald-800';
  } else if (fase === 'reward') {
    faseTitulo = '⭐ Fase 3: Recompensa Dourada & Festa';
    faseDescricao = `Comemore com carinho sincero, entregue um petisco especial e libere ${pet.nome} ("Livre!").`;
    bgGradiente = 'from-purple-600 via-indigo-700 to-purple-800';
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Routine Mode & Marker Configuration Quick Bar */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          id="btn-ajustar-rotina"
          onClick={onOpenRoutineModal}
          className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 text-left transition-all shadow-xs flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                Rotina Ativa
              </span>
              <span className="text-xs font-bold text-slate-800 line-clamp-1">
                {routineInfo.nome}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        </button>

        <button
          type="button"
          id="btn-personalizar-marcador"
          onClick={onOpenMarkerModal}
          className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-left transition-all shadow-xs flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block">
                Marcador / Clicker
              </span>
              <span className="text-xs font-bold text-slate-800 line-clamp-1">
                "{marcadorVerbal}" ({somClicker})
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        </button>
      </div>

      {/* Timer Display Card */}
      <div className={`bg-gradient-to-br ${bgGradiente} rounded-3xl p-6 text-white shadow-xl transition-all duration-500 relative overflow-hidden`}>
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4 text-center">
          {/* Pet Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-bold backdrop-blur-xs">
            <PetAvatarVisual pet={pet} size="sm" showBadge={false} />
            <span>Treinando {pet.nome} ({routineInfo.tempoSugerido})</span>
          </div>

          {/* Title & Phase */}
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-white/80 block mb-1">
              {faseTitulo}
            </span>
            <h1 className="text-xl font-extrabold tracking-tight text-white line-clamp-1">
              {nomeExercicio}
            </h1>
            <p className="text-white/85 text-xs mt-1 max-w-sm mx-auto min-h-[32px] flex items-center justify-center leading-relaxed">
              {faseDescricao}
            </p>
          </div>

          {/* Big Clock Display */}
          <div className="py-2">
            <div className="text-6xl sm:text-7xl font-mono font-black tracking-tight drop-shadow-md">
              {formatTime(tempoRestante)}
            </div>
            {fase === 'idle' && (
              <span className="text-[11px] text-white/80">
                Sessão configurada para {Math.round(duracaoAtiva / 60)} min • Ganhe XP e PETCOINS Reais!
              </span>
            )}
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {fase === 'idle' ? (
              <button
                type="button"
                id="btn-iniciar-treino"
                onClick={startTraining}
                className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-white text-indigo-700 font-extrabold text-base shadow-lg hover:bg-slate-50 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-indigo-700" />
                <span>Iniciar Treino Guiado</span>
              </button>
            ) : (
              <div className="flex items-center justify-center gap-3 w-full max-w-xs">
                <button
                  type="button"
                  onClick={togglePause}
                  className="flex-1 py-3 px-4 rounded-2xl bg-white text-slate-800 font-bold text-sm shadow-md hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {emExecucao ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-slate-800" />
                      <span>Retomar</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetTimer}
                  title="Reiniciar cronômetro"
                  className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preset Times Quick Selection (when idle) */}
      {fase === 'idle' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Duração da Sessão</span>
            </div>
            <button
              type="button"
              onClick={onOpenRoutineModal}
              className="text-[11px] font-bold text-indigo-600 hover:underline"
            >
              Configurar Rotina Personalizada
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { segs: 90, label: '1.5 min', desc: 'Micro-Dose' },
              { segs: 300, label: '5 min', desc: 'Iniciante' },
              { segs: 600, label: '10 min', desc: 'Intermediário' },
              { segs: 900, label: '15 min', desc: 'Avançado' }
            ].map((p) => (
              <button
                key={p.segs}
                type="button"
                onClick={() => {
                  setDuracaoAtiva(p.segs);
                  setTempoRestante(p.segs);
                }}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  duracaoAtiva === p.segs
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-2 ring-indigo-600/20 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="block text-sm font-extrabold">{p.label}</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">{p.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Training Clicker & Whistle Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-indigo-600 animate-pulse" />
            <div>
              <h2 className="text-sm font-bold text-slate-800">Ferramentas de Treino Comportamental</h2>
              <p className="text-xs text-slate-500">Marcador de acerto instantâneo (Clicker & Voz)</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenMarkerModal}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200 cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Configurar Marcador</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Main Configured Clicker / Verbal Marker Button */}
          <button
            type="button"
            id="interactive-clicker-button"
            onClick={handleTriggerMarker}
            className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md shadow-emerald-200 active:scale-95 transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-emerald-200">
                Marcador no Milissegundo
              </span>
              <span className="text-base font-black">
                {somClicker === 'verbal' ? `🗣️ Dizer "${marcadorVerbal}"` : `🔊 Clicker (${somClicker})`}
              </span>
            </div>
            <span className="text-2xl">🔘</span>
          </button>

          {/* Whistle / Apito */}
          <button
            type="button"
            id="interactive-whistle-button"
            onClick={() => audioService.playWhistle()}
            className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-sm shadow-md shadow-indigo-200 active:scale-95 transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-indigo-200">Chamado & Recall</span>
              <span className="text-base font-black">🎺 Apito de Treinador</span>
            </div>
            <span className="text-2xl">🔔</span>
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Dica do Adestrador:</strong> Não precisa comprar um clicker físico se não quiser! Qualquer palavra curta dita com tom animado como <em>"{marcadorVerbal}"</em> ou <em>"Isso!"</em> ensina o cão exatamente da mesma forma.
          </p>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-5">
            <div className="text-center space-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 flex items-center justify-center mx-auto mb-2 text-2xl shadow-md">
                🦴
              </div>
              <h3 className="text-lg font-black text-slate-800">Treino Concluído com Sucesso!</h3>
              <p className="text-xs text-slate-500">
                Parabéns pelo tempo de qualidade dedicado a {pet.nome}.
              </p>
            </div>

            {/* Treat & XP Reward Pill */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪙</span>
                <div>
                  <span className="text-xs font-black text-amber-900 block">Recompensas Ganhas</span>
                  <span className="text-[11px] text-amber-800 font-semibold">
                    +{Math.max(10, Math.round((duracaoAtiva / 60) * 8) + (notaDesempenho * 2))} PETCOINS 🪙
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-black">
                +{Math.round((duracaoAtiva / 60) * 15) + (notaDesempenho * 5)} XP
              </span>
            </div>

            {/* Rating Stars */}
            <div className="space-y-1.5 text-center">
              <label className="block text-xs font-bold text-slate-700">
                Como foi o foco e desempenho de {pet.nome}?
              </label>
              <div className="flex items-center justify-center gap-2 pt-1">
                {([1, 2, 3, 4, 5] as const).map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNotaDesempenho(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${star <= notaDesempenho ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Observações da Sessão (Opcional)</label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Ex: Respondeu muito bem ao marcador verbal e fez 5 repetições limpas."
                rows={2}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            {/* Save Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                id="btn-salvar-treino-modal"
                onClick={handleSaveSession}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Salvar Evolução (+XP & PETCOINS)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCompletionModal(false);
                  resetTimer();
                }}
                className="w-full py-2.5 text-xs text-slate-500 font-medium hover:text-slate-800 text-center cursor-pointer"
              >
                Fechar sem registrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

