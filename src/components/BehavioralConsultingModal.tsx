import React, { useState } from 'react';
import { PetProfile, BehavioralProtocol, BehavioralProtocolStep } from '../types';
import { BEHAVIORAL_PROTOCOLS } from '../data/behavioralConsultingData';
import { 
  X, 
  Home, 
  Bone, 
  Compass, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Flame, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  Play
} from 'lucide-react';

interface BehavioralConsultingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: PetProfile;
  initialProtocolId?: 'ansiedade_separacao' | 'posse_recursos' | 'posse_ambiente';
  onLaunchTimerForBehavioralStage?: (protocoloId: string, etapa: BehavioralProtocolStep) => void;
}

export const BehavioralConsultingModal: React.FC<BehavioralConsultingModalProps> = ({
  isOpen,
  onClose,
  pet,
  initialProtocolId = 'ansiedade_separacao',
  onLaunchTimerForBehavioralStage
}) => {
  const [selectedProtocolId, setSelectedProtocolId] = useState<'ansiedade_separacao' | 'posse_recursos' | 'posse_ambiente'>(initialProtocolId);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const protocolo = BEHAVIORAL_PROTOCOLS.find(p => p.id === selectedProtocolId) || BEHAVIORAL_PROTOCOLS[0];
  const etapaAtual = protocolo.etapas[activeStepIndex] || protocolo.etapas[0];

  const getIconComponent = (icone: string) => {
    switch (icone) {
      case 'Home':
        return <Home className="w-5 h-5 text-amber-500" />;
      case 'Bone':
        return <Bone className="w-5 h-5 text-rose-500" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-indigo-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${protocolo.bgGradiente} p-5 sm:p-6 text-white relative`}>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/25 text-white font-extrabold text-[10px] tracking-wider uppercase backdrop-blur-xs">
              Metodologia de Consultoria Comportamental
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black leading-tight tracking-tight">
            {protocolo.titulo}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1 leading-relaxed max-w-xl">
            {protocolo.subtitulo}
          </p>

          {/* Quick Pet Summary */}
          <div className="mt-3 flex items-center gap-2 text-xs text-white/80 font-medium">
            <span>Paciente: <strong className="text-white font-bold">{pet.nome}</strong> ({pet.raca || pet.especie})</span>
            <span>•</span>
            <span>Previsão: {protocolo.tempoMedioEstimado}</span>
          </div>
        </div>

        {/* Protocol Selector Tabs */}
        <div className="bg-slate-100 p-2 grid grid-cols-3 gap-1.5 border-b border-slate-200 text-xs font-bold">
          {BEHAVIORAL_PROTOCOLS.map((p) => {
            const isSelected = p.id === selectedProtocolId;
            return (
              <button
                type="button"
                key={p.id}
                onClick={() => {
                  setSelectedProtocolId(p.id);
                  setActiveStepIndex(0);
                  setExpandedFaqIndex(null);
                }}
                className={`py-2 px-2 rounded-xl transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span className="text-[11px] leading-tight truncate w-full">{p.categoriaNome}</span>
              </button>
            );
          })}
        </div>

        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Regra de Ouro Banner */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-950 space-y-1.5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <h4 className="text-xs font-black uppercase tracking-wider text-rose-800">
                Regra de Ouro do Comportamentalista
              </h4>
            </div>
            <p className="text-xs text-rose-900 leading-relaxed font-medium">
              {protocolo.regraDeOuro}
            </p>
          </div>

          {/* Por que acontece (Fundamento Científico) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Por que este comportamento acontece?</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {protocolo.porQueAcontece}
            </p>
          </div>

          {/* Escada Gradativa de Fases (Interactive Step Progression) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Escada de Entrega Gradativa ({protocolo.etapas.length} Fases)</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold">
                Fase {activeStepIndex + 1} de {protocolo.etapas.length}
              </span>
            </div>

            {/* Step Pills Selector */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {protocolo.etapas.map((etapa, idx) => {
                const isCurrent = idx === activeStepIndex;
                return (
                  <button
                    type="button"
                    key={etapa.etapaNumero}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all border cursor-pointer ${
                      isCurrent
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>Fase {etapa.etapaNumero}</span>
                  </button>
                );
              })}
            </div>

            {/* Current Active Step Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/40 border border-indigo-200/80 space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-wider">
                    {etapaAtual.duracaoSugerida}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Progressão Segura</span>
                </div>
                <h4 className="text-sm font-black text-slate-900 mt-1.5">{etapaAtual.titulo}</h4>
                <p className="text-xs text-indigo-900/80 mt-0.5 font-medium">{etapaAtual.objetivo}</p>
              </div>

              {/* O que Fazer (Passo a Passo Gradual) */}
              <div className="space-y-2">
                <h5 className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>O que fazer passo a passo:</span>
                </h5>
                <ul className="space-y-1.5">
                  {etapaAtual.oQueFazer.map((item, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed bg-white/70 p-2 rounded-xl border border-emerald-100">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* O que NUNCA fazer */}
              {etapaAtual.oQueNUNCAFazer && etapaAtual.oQueNUNCAFazer.length > 0 && (
                <div className="space-y-1.5">
                  <h5 className="text-[11px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>O que NUNCA fazer nesta fase:</span>
                  </h5>
                  <ul className="space-y-1">
                    {etapaAtual.oQueNUNCAFazer.map((item, i) => (
                      <li key={i} className="text-xs text-rose-900 flex items-start gap-1.5 bg-rose-50/70 p-2 rounded-xl border border-rose-100">
                        <span className="text-rose-600 font-black">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Critério para Avançar para a Próxima Fase */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
                <span className="font-black block text-amber-900">
                  🎯 Critério para avançar para a Fase {etapaAtual.etapaNumero < protocolo.etapas.length ? etapaAtual.etapaNumero + 1 : 'Final'}:
                </span>
                <p className="text-amber-900/90 leading-relaxed font-medium">
                  {etapaAtual.criterioAvanco}
                </p>
              </div>

              {/* Sinais de Alerta (Quando retroceder) */}
              {etapaAtual.sinaisDeAlerta && etapaAtual.sinaisDeAlerta.length > 0 && (
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>Se observar: <em>{etapaAtual.sinaisDeAlerta.join(', ')}</em>, dê um passo atrás e treine com mais facilidade.</span>
                </div>
              )}

              {/* Micro-etapas (se houver) */}
              {etapaAtual.microEtapas && etapaAtual.microEtapas.length > 0 && (
                <div className="pt-2 border-t border-indigo-100 space-y-2">
                  <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block">
                    Micro-Etapas de Precisão:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {etapaAtual.microEtapas.map((m) => (
                      <div key={m.id} className="p-2.5 rounded-xl bg-white border border-indigo-200/60 space-y-1">
                        <div className="flex items-center justify-between">
                          <h6 className="text-xs font-bold text-indigo-950">{m.titulo}</h6>
                          <span className="text-[9px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold">
                            {m.repeticoesRecomendadas}x
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">{m.descricao}</p>
                        <span className="text-[10px] text-emerald-700 font-semibold block">✓ {m.criterioSucesso}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAQ do Consultor Comportamental */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Dúvidas Frequentes da Consultoria</span>
            </h4>
            <div className="space-y-2">
              {protocolo.faqDoTutor.map((faq, idx) => {
                const isExpanded = expandedFaqIndex === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                      className="w-full p-3 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>{faq.pergunta}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isExpanded && (
                      <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 leading-relaxed">
                        {faq.resposta}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer"
          >
            Fechar
          </button>

          <button
            type="button"
            onClick={() => {
              if (onLaunchTimerForBehavioralStage) {
                onLaunchTimerForBehavioralStage(protocolo.id, etapaAtual);
              }
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Iniciar Prática desta Fase no Timer</span>
          </button>
        </div>

      </div>
    </div>
  );
};
