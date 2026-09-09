import React, { useState } from 'react';
import { TrainingRoutineMode } from '../types';
import { TRAINING_ROUTINES, RoutineModeInfo } from '../data/rewardsAndAvatarsData';
import { audioService } from '../services/audioService';
import { 
  X, 
  Clock, 
  Zap, 
  Activity, 
  Flame, 
  Check, 
  Sparkles, 
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';

interface RoutineSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  rotinaAtual: TrainingRoutineMode;
  petNome: string;
  onSelectRoutine: (routine: TrainingRoutineMode) => void;
}

export const RoutineSelectorModal: React.FC<RoutineSelectorModalProps> = ({
  isOpen,
  onClose,
  rotinaAtual,
  petNome,
  onSelectRoutine
}) => {
  const [selectedRoutine, setSelectedRoutine] = useState<TrainingRoutineMode>(rotinaAtual || 'iniciante_5m');

  if (!isOpen) return null;

  const handleSave = () => {
    audioService.playSuccessChime();
    onSelectRoutine(selectedRoutine);
    onClose();
  };

  const getRoutineIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-purple-500" />;
      default: return <Clock className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-slate-900 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-400/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Ritmo & Frequência</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Rotina de Treino de {petNome}
          </h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-md leading-relaxed">
            Adapte a duração e o formato das sessões à disponibilidade do seu dia e ao nível de foco do cão.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600 flex-1">
          <div className="space-y-3">
            {TRAINING_ROUTINES.map((routine) => {
              const isSelected = selectedRoutine === routine.id;

              return (
                <div
                  key={routine.id}
                  onClick={() => {
                    audioService.playClicker();
                    setSelectedRoutine(routine.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {getRoutineIcon(routine.icone)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-sm text-slate-900">
                            {routine.nome}
                          </h3>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {routine.tempoSugerido}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-snug">
                          {routine.descricao}
                        </p>
                        <div className="pt-1.5 text-[11px] text-emerald-900 bg-emerald-100/50 p-2 rounded-xl border border-emerald-200/60 font-medium">
                          <strong>💡 Como aplicar:</strong> {routine.comoAplicar}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            id="btn-salvar-rotina-treino"
            onClick={handleSave}
            className="py-2.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Confirmar Rotina</span>
          </button>
        </div>
      </div>
    </div>
  );
};
