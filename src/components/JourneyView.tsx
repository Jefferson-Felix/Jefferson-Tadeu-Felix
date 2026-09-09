import React, { useState } from 'react';
import { GamifiedTask, PetProfile, TaskCategory } from '../types';
import { getPetLevelInfo } from '../data/defaultTasks';
import { audioService } from '../services/audioService';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Timer, 
  Flame, 
  Bone, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Cookie, 
  Compass, 
  Puzzle, 
  Activity, 
  Award,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface JourneyViewProps {
  pet: PetProfile;
  tarefas: GamifiedTask[];
  onToggleTask: (taskId: string) => void;
  onOpenTimerForTask: (task: GamifiedTask) => void;
  onNavigateToAnamnese: () => void;
}

const CATEGORY_MAP: Record<TaskCategory, { label: string; icon: string; color: string }> = {
  obediencia: { label: 'Obediência Básica', icon: 'Bone', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  sanitaria: { label: 'Educação Sanitária', icon: 'Sparkles', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  enriquecimento: { label: 'Enriquecimento Ambiental', icon: 'Puzzle', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  sinais_calma: { label: 'Sinais de Calma', icon: 'HeartHandshake', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  saude: { label: 'Saúde & Cuidados', icon: 'Heart', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  ansiedade_separacao: { label: 'Ansiedade por Separação', icon: 'Home', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  posse_recursos: { label: 'Posse por Recursos', icon: 'Bone', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  posse_ambiente: { label: 'Posse por Ambiente', icon: 'Compass', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
};

export const JourneyView: React.FC<JourneyViewProps> = ({
  pet,
  tarefas,
  onToggleTask,
  onOpenTimerForTask,
  onNavigateToAnamnese
}) => {
  const [categoriaFiltro, setCategoriaFiltro] = useState<'todas' | TaskCategory>('todas');
  const [tarefaExpandidaId, setTarefaExpandidaId] = useState<string | null>(null);

  // Filtra tarefas compatíveis com a espécie do pet (Cão ou Gato ou Todos)
  const tarefasFiltradas = tarefas.filter((t) => {
    const especieMatch = t.especieAlvo === 'Todos' || t.especieAlvo === pet.especie;
    const categoriaMatch = categoriaFiltro === 'todas' || t.categoria === categoriaFiltro;
    return especieMatch && categoriaMatch;
  });

  const tarefasConcluidas = tarefasFiltradas.filter((t) => t.concluidaHoje).length;
  const totalTarefas = tarefasFiltradas.length;
  const progressoPct = totalTarefas > 0 ? Math.round((tarefasConcluidas / totalTarefas) * 100) : 0;

  const levelInfo = getPetLevelInfo(pet.xp);

  const handleTaskClick = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const task = tarefas.find(t => t.id === taskId);
    if (task && !task.concluidaHoje) {
      audioService.playSuccessChime();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {
        // ignore
      }
    }
    onToggleTask(taskId);
  };

  const getIconComponent = (icone: string) => {
    switch (icone) {
      case 'Bone': return <Bone className="w-4 h-4 text-indigo-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-indigo-600" />;
      case 'Zap': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Heart': return <Heart className="w-4 h-4 text-rose-500" />;
      case 'Cookie': return <Cookie className="w-4 h-4 text-amber-600" />;
      case 'Compass': return <Compass className="w-4 h-4 text-blue-500" />;
      case 'Puzzle': return <Puzzle className="w-4 h-4 text-purple-600" />;
      case 'Activity': return <Activity className="w-4 h-4 text-emerald-600" />;
      default: return <Sparkles className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Card do Pet & Nível */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                {pet.especie} • {pet.raca}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-extrabold">
                <Flame className="w-3.5 h-3.5 fill-amber-950" />
                {pet.streakDias} dias
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs text-indigo-200 font-medium">Nível {levelInfo.nivel}</span>
              <p className="text-sm font-bold">{levelInfo.titulo}</p>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Jornada de {pet.nome}
            </h1>
            <p className="text-indigo-100 text-xs mt-1">
              Missões diárias com reforço positivo, obediência e enriquecimento mental.
            </p>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-semibold text-indigo-100">
              <span>{pet.xp} XP Acumulado</span>
              <span>Próximo Nível: {levelInfo.xpProximoNivel} XP</span>
            </div>
            <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden p-0.5 backdrop-blur-xs">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${levelInfo.progressoPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Card of Today's Missions */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Evolução do Dia</h2>
              <p className="text-xs text-slate-500">
                {tarefasConcluidas} de {totalTarefas} atividades realizadas
              </p>
            </div>
          </div>
          <span className="text-lg font-black text-emerald-600">{progressoPct}%</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressoPct}%` }}
          />
        </div>

        {progressoPct === 100 && totalTarefas > 0 && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Incrível! Todas as missões do dia foram concluídas com sucesso! 🎉</span>
          </div>
        )}
      </div>

      {/* Filter Chips */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          <Filter className="w-3 h-3" />
          <span>Categorias da Jornada</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setCategoriaFiltro('todas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              categoriaFiltro === 'todas'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Todas ({tarefas.filter(t => t.especieAlvo === 'Todos' || t.especieAlvo === pet.especie).length})
          </button>

          {(['obediencia', 'sanitaria', 'enriquecimento'] as TaskCategory[]).map((cat) => {
            const count = tarefas.filter(
              t => (t.especieAlvo === 'Todos' || t.especieAlvo === pet.especie) && t.categoria === cat
            ).length;
            const isSelected = categoriaFiltro === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {CATEGORY_MAP[cat].label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tarefasFiltradas.map((tarefa) => {
          const isExpandida = tarefaExpandidaId === tarefa.id;
          const catInfo = CATEGORY_MAP[tarefa.categoria];

          return (
            <div
              key={tarefa.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                tarefa.concluidaHoje
                  ? 'border-emerald-200/80 bg-emerald-50/20'
                  : 'border-slate-200/90 shadow-xs hover:border-indigo-200'
              }`}
            >
              {/* Main Card Row */}
              <div
                onClick={() => setTarefaExpandidaId(isExpandida ? null : tarefa.id)}
                className="p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
              >
                {/* Checkbox button */}
                <button
                  type="button"
                  id={`task-check-${tarefa.id}`}
                  onClick={(e) => handleTaskClick(tarefa.id, e)}
                  className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {tarefa.concluidaHoje ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-6 h-6 hover:text-slate-600" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${catInfo.color}`}>
                      {catInfo.label}
                    </span>
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      +{tarefa.pontosXp} XP
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-0.5">
                      <Timer className="w-3 h-3 text-slate-400" />
                      {tarefa.duracaoMinutos} min
                    </span>
                  </div>

                  <h3 className={`text-sm font-bold ${tarefa.concluidaHoje ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {tarefa.titulo}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    {tarefa.descricao}
                  </p>
                </div>

                {/* Expand Chevron */}
                <div className="shrink-0 text-slate-400 mt-1">
                  {isExpandida ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded Step-by-Step & Actions */}
              {isExpandida && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/60 space-y-3 text-xs">
                  {/* Step by Step */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-700 block">Passo a Passo Guiado:</span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-600">
                      {tarefa.passoAPasso.map((passo, idx) => (
                        <li key={idx} className="leading-relaxed">
                          <span className="text-slate-700 font-medium">{passo}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Golden Tip */}
                  {tarefa.dicaEspecial && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium flex gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Dica de Ouro:</strong> {tarefa.dicaEspecial}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      id={`btn-open-timer-${tarefa.id}`}
                      onClick={() => onOpenTimerForTask(tarefa)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Timer className="w-3.5 h-3.5" />
                      <span>Iniciar no Treino Guiado</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleTaskClick(tarefa.id, e)}
                      className={`py-2.5 px-4 rounded-xl border font-bold text-xs transition-all ${
                        tarefa.concluidaHoje
                          ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {tarefa.concluidaHoje ? 'Concluída ✓' : 'Marcar Feita'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tarefasFiltradas.length === 0 && (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
            <p className="text-sm font-medium">Nenhuma tarefa encontrada nesta categoria para {pet.especie}.</p>
          </div>
        )}
      </div>

      {/* Bottom CTA to Anamnese if incomplete */}
      {!pet.anamnese?.dataNascimento && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center justify-between gap-3 text-xs">
          <div>
            <strong className="block font-bold">Anamnese Pendente:</strong>
            Preencha a anamnese para receber missões adaptadas ao porte e saúde de {pet.nome}.
          </div>
          <button
            onClick={onNavigateToAnamnese}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold whitespace-nowrap"
          >
            Preencher
          </button>
        </div>
      )}
    </div>
  );
};
