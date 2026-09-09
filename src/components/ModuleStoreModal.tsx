import React, { useState } from 'react';
import { TrainingModuleInfo, ModuleId, PetProfile } from '../types';
import { TRAINING_MODULES } from '../data/boardData';
import { audioService } from '../services/audioService';
import { 
  X, 
  Sparkles, 
  Check, 
  Lock, 
  Unlock, 
  ShoppingBag, 
  ShieldCheck, 
  Star, 
  Award, 
  ChevronRight, 
  MessageCircle,
  Zap,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ModuleStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  modulosContratados: Record<ModuleId, boolean>;
  onToggleModuleStatus: (moduleId: ModuleId) => void;
  onUnlockAllModules: () => void;
  pet: PetProfile;
}

export const ModuleStoreModal: React.FC<ModuleStoreModalProps> = ({
  isOpen,
  onClose,
  modulosContratados,
  onToggleModuleStatus,
  onUnlockAllModules,
  pet
}) => {
  const [activeTab, setActiveTab] = useState<'modulos' | 'combo'>('modulos');
  const [codigoCupom, setCodigoCupom] = useState<string>('');
  const [cupomAplicado, setCupomAplicado] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalContratados = Object.values(modulosContratados).filter(Boolean).length;
  const isFullVip = totalContratados === TRAINING_MODULES.length;

  const handleToggle = (id: ModuleId) => {
    audioService.playCoinReward();
    onToggleModuleStatus(id);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleUnlockAll = () => {
    audioService.playSuccessChime();
    audioService.playCoinReward();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
    onUnlockAllModules();
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (codigoCupom.trim().toUpperCase() === 'CONECTAPET' || codigoCupom.trim().toUpperCase() === 'VIP' || codigoCupom.trim().toUpperCase() === 'FREE') {
      setCupomAplicado(true);
      handleUnlockAll();
    } else {
      alert('Cupom de teste: Digite "CONECTAPET" ou "VIP" para desbloquear tudo gratuitamente!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-2 border border-amber-400/30">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Loja de Módulos & Trilhas Avulsas</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Personalize a Jornada de {pet.nome}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-md">
            Cada módulo pode ser contratado de forma individual ou em pacote completo, permitindo focar exatamente na necessidade do seu pet.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 flex-1">
          {/* VIP Combo Card Promo */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white shadow-lg relative overflow-hidden space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center font-bold">
                  👑
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 block">
                    Passaporte VIP Completo
                  </span>
                  <h3 className="text-lg font-black leading-tight">Combo 4 Módulos do ConectaPet</h3>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs line-through text-amber-200">R$ 134,60</span>
                <div className="text-xl font-black text-white">R$ 79,90</div>
              </div>
            </div>

            <p className="text-xs text-white/90 leading-relaxed">
              Acesso vitalício aos 4 módulos: <strong>Obediência</strong>, <strong>Enriquecimento Ambiental</strong>, <strong>Educação Sanitária</strong> e <strong>Sinais de Calma</strong> com todas as fases e atualizações inclusas.
            </p>

            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                id="btn-desbloquear-combo-vip"
                onClick={handleUnlockAll}
                className="flex-1 py-3 px-4 rounded-2xl bg-white text-slate-900 font-black text-xs shadow-md hover:bg-slate-100 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>{isFullVip ? 'Todos os Módulos Ativos ✓' : 'Ativar Acesso Total (VIP)'}</span>
              </button>
            </div>
          </div>

          {/* Module List Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Módulos Individuais Disponíveis ({TRAINING_MODULES.length})
              </span>
              <span className="text-[11px] font-semibold text-indigo-600">
                {totalContratados} / {TRAINING_MODULES.length} Contratados
              </span>
            </div>

            <div className="space-y-3">
              {TRAINING_MODULES.map((mod) => {
                const isContratado = Boolean(modulosContratados[mod.id]);

                return (
                  <div
                    key={mod.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isContratado
                        ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
                        : 'border-slate-200/90 bg-white shadow-xs hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${mod.cor}`}>
                            {mod.nome}
                          </span>
                          <span className="text-xs font-black text-slate-800">
                            {mod.precoExibicao}
                          </span>
                          {isContratado && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Contratado
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 font-medium mt-1">
                          {mod.descricao}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {mod.beneficios.slice(0, 2).map((ben, i) => (
                            <span key={i} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              ✓ {ben}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Toggle / Hire Button */}
                      <div className="shrink-0 flex flex-col items-end gap-1.5">
                        <button
                          type="button"
                          id={`btn-contratar-${mod.id}`}
                          onClick={() => handleToggle(mod.id)}
                          className={`py-2 px-3.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                            isContratado
                              ? 'bg-emerald-600 hover:bg-rose-600 text-white group'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          {isContratado ? (
                            <>
                              <Unlock className="w-3.5 h-3.5" />
                              <span className="group-hover:hidden">Ativo</span>
                              <span className="hidden group-hover:inline">Desativar</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>Contratar</span>
                            </>
                          )}
                        </button>
                        <span className="text-[10px] text-slate-400">
                          {isContratado ? 'Trilha liberada' : '1ª Fase grátis'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cupom / Simulação de Ativação */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-600" />
              <span>Possui Cupom de Adestrador ou Demonstração?</span>
            </span>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={codigoCupom}
                onChange={(e) => setCodigoCupom(e.target.value)}
                placeholder="Ex: CONECTAPET ou VIP"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs uppercase bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
              >
                Aplicar
              </button>
            </form>
            {cupomAplicado && (
              <p className="text-[11px] text-emerald-700 font-bold">
                ✓ Cupom aplicado! Todas as trilhas foram liberadas para você.
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Dúvidas? Fale com seu especialista comportamental.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
