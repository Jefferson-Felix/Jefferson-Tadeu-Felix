import React from 'react';
import { 
  X, 
  Sparkles, 
  Compass, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Gamepad2, 
  Play, 
  Layers, 
  Heart,
  Dog,
  Cat,
  Zap,
  BookOpen
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  petNome: string;
  petEspecie: string;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  petNome,
  petEspecie
}) => {
  if (!isOpen) return null;

  const handleStart = () => {
    audioService.playSuccessChime();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-900 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-bold uppercase tracking-wider backdrop-blur-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Método ConectaPet & Adestramento</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Boas-vindas ao ConectaPet! 🐾
          </h2>

          <p className="text-indigo-100 text-xs mt-2 leading-relaxed">
            Desenvolvido por adestradores profissionais com base científica em <strong>Reforço Positivo puro</strong> e ocupação cognitiva para você e <strong>{petNome}</strong>.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-600 flex-1">
          {/* Card: O que é a Trilha de Tabuleiro */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-indigo-900">
              <Gamepad2 className="w-4 h-4 text-indigo-600" />
              <span>O Tabuleiro de Fases Gamificado</span>
            </div>
            <p className="text-xs text-indigo-900/90 leading-relaxed font-medium">
              Transformamos a educação animal em uma jornada de fases interativas. Cada nó do mapa contém exercícios estruturados, dicas de ouro e critérios claros de sucesso.
            </p>
          </div>

          {/* Destaques do Método */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              O que você vai dominar neste aplicativo:
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Obediência de Rotina Real</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    Foco no olhar, caminhar ao lado sem puxar a guia, comando Place (caminha/canil) e respeito a portas abertas.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Micro-Fases & Critérios de Precisão</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    Exercícios fragmentados passo a passo para que o pet nunca erre e construa uma memória muscular sólida.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Módulos Especializados & Assinaturas</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    Jornadas focadas em Higiene Sanitária, Enriquecimento Mental dos 4 Eixos e Leitura de Sinais de Calma.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dica do Adestrador */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-950 font-bold mb-0.5">Regra de Ouro do Treino:</strong>
              <span className="text-amber-900/90 leading-relaxed">
                Treine de 3 a 5 minutos por dia. Treinos curtos e divertidos geram mais conexão e resultados duradouros do que horas cansativas!
              </span>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            id="btn-comecar-jornada-welcome"
            onClick={handleStart}
            className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Começar Aventura com {petNome}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
