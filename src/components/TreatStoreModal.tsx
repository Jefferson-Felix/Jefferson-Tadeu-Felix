import React, { useState } from 'react';
import { PetProfile, TreatRewardItem, RedeemedCoupon } from '../types';
import { TREAT_REWARD_ITEMS } from '../data/rewardsAndAvatarsData';
import { audioService } from '../services/audioService';
import { 
  X, 
  ShoppingBag, 
  Sparkles, 
  Tag, 
  Check, 
  Copy, 
  ExternalLink, 
  Award, 
  Bone, 
  Ticket, 
  Store, 
  Handshake,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TreatStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: PetProfile;
  cuponsResgatados: RedeemedCoupon[];
  onRedeemCoupon: (item: TreatRewardItem) => boolean;
}

export const TreatStoreModal: React.FC<TreatStoreModalProps> = ({
  isOpen,
  onClose,
  pet,
  cuponsResgatados,
  onRedeemCoupon
}) => {
  const [activeTab, setActiveTab] = useState<'catalogo' | 'meus_cupons' | 'parcerias'>('catalogo');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todos');
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  if (!isOpen) return null;

  const saldoPetiscos = pet.saldoPetiscos ?? Math.floor(pet.xp / 5);

  const handleRedeem = (item: TreatRewardItem) => {
    if (saldoPetiscos < item.custoPetiscos) {
      setFeedbackMsg({
        tipo: 'erro',
        texto: `Você precisa de mais ${item.custoPetiscos - saldoPetiscos} PETCOINS para resgatar este cupom.`
      });
      setTimeout(() => setFeedbackMsg(null), 4000);
      return;
    }

    const success = onRedeemCoupon(item);
    if (success) {
      audioService.playCoinReward();
      audioService.playSuccessChime();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
      setFeedbackMsg({
        tipo: 'sucesso',
        texto: `🎉 Cupom ${item.codigoCupom} resgatado com sucesso para ${pet.nome}!`
      });
      setActiveTab('meus_cupons');
      setTimeout(() => setFeedbackMsg(null), 5000);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    audioService.playClicker();
    setCopiedCouponId(id);
    setTimeout(() => setCopiedCouponId(null), 2500);
  };

  const filteredItems = TREAT_REWARD_ITEMS.filter(
    item => selectedCategoria === 'todos' || item.categoria === selectedCategoria
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Treat Balance */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-700 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-amber-100 text-xs font-black uppercase tracking-wider mb-2 backdrop-blur-xs">
                <span className="text-amber-200 text-sm">🪙</span>
                <span>Economia Pet & Recompensas Reais</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Loja de PETCOINS & Parcerias
              </h2>
              <p className="text-xs text-amber-100 mt-1 max-w-md">
                Troque suas PETCOINS acumuladas nos treinos por descontos reais em mordedores naturais e brinquedos.
              </p>
            </div>

            {/* Treat Balance Badge */}
            <div className="p-3.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20 text-right shrink-0">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200 block">
                Saldo de {pet.nome}
              </span>
              <div className="flex items-center justify-end gap-1.5 text-2xl font-black text-amber-300">
                <span>🪙</span>
                <span>{saldoPetiscos}</span>
              </div>
              <span className="text-[10px] text-white/80 font-bold">PETCOINS</span>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-100 bg-slate-50/80 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('catalogo')}
            className={`py-2 px-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'catalogo'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Catálogo de Produtos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('meus_cupons')}
            className={`py-2 px-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'meus_cupons'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Meus Cupons ({cuponsResgatados.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('parcerias')}
            className={`py-2 px-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'parcerias'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Handshake className="w-3.5 h-3.5" />
            <span>Parcerias & Revenda</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className={`mx-6 mt-3 p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
            feedbackMsg.tipo === 'sucesso'
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-rose-100 text-rose-900 border border-rose-300'
          }`}>
            {feedbackMsg.tipo === 'sucesso' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{feedbackMsg.texto}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 flex-1">
          {/* TAB 1: Catálogo de Produtos */}
          {activeTab === 'catalogo' && (
            <div className="space-y-4">
              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: 'todos', label: 'Todos os Itens' },
                  { id: 'petiscos_naturais', label: 'Petiscos Desidratados' },
                  { id: 'mordedores_ossos', label: 'Mordedores & Chifres' },
                  { id: 'brinquedos', label: 'Brinquedos Ocupacionais' },
                  { id: 'acessorios', label: 'Guias & Equipamentos' },
                  { id: 'consultoria', label: 'Aulas com Adestrador' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoria(cat.id)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategoria === cat.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredItems.map((item) => {
                  const canAfford = saldoPetiscos >= item.custoPetiscos;
                  const alreadyRedeemed = cuponsResgatados.some(c => c.itemId === item.id);

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-amber-300 shadow-xs flex flex-col justify-between transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{item.icone}</span>
                            <div>
                              <span className="text-[10px] font-extrabold uppercase text-amber-700 block">
                                {item.marcaParceira}
                              </span>
                              <h3 className="font-extrabold text-xs text-slate-900 leading-tight">
                                {item.nome}
                              </h3>
                            </div>
                          </div>

                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[10px] whitespace-nowrap">
                            {item.descontoValor}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 leading-snug">
                          {item.descricao}
                        </p>

                        <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-100 text-[11px] text-amber-900 leading-tight">
                          <strong>Benefício do treino:</strong> {item.beneficioComportamental}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="text-[11px] font-bold text-slate-500">
                          <span>Preço médio: {item.precoEstimado}</span>
                        </div>

                        <button
                          type="button"
                          id={`btn-resgatar-${item.id}`}
                          onClick={() => handleRedeem(item)}
                          disabled={!canAfford}
                          className={`py-2 px-3 rounded-xl font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                            canAfford
                              ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          <span>🪙 {item.custoPetiscos} PETCOINS</span>
                          <span>•</span>
                          <span>Resgatar Cupom</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Meus Cupons Resgatados */}
          {activeTab === 'meus_cupons' && (
            <div className="space-y-4">
              {cuponsResgatados.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-2">
                  <Ticket className="w-8 h-8 text-slate-400 mx-auto" />
                  <h3 className="font-extrabold text-sm text-slate-700">Nenhum cupom resgatado ainda</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Complete as fases do tabuleiro e sessões de treino para acumular PETCOINS e trocar por cupons de desconto reais!
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('catalogo')}
                    className="mt-2 py-2 px-4 rounded-xl bg-amber-600 text-white font-bold text-xs"
                  >
                    Ver Catálogo de Produtos
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cuponsResgatados.map((cupom) => (
                    <div
                      key={cupom.id}
                      className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-950 font-black text-[10px]">
                            {cupom.descontoValor}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Resgatado em {cupom.dataResgate} por {cupom.petNome}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-900">
                          {cupom.itemNome}
                        </h4>
                        <span className="text-xs text-amber-900 font-semibold block">
                          Parceiro: {cupom.marcaParceira}
                        </span>
                      </div>

                      {/* Coupon Code Action Box */}
                      <div className="flex items-center gap-2">
                        <div className="py-2 px-3 rounded-xl bg-white border border-amber-300 font-mono font-black text-xs text-amber-900 tracking-wider">
                          {cupom.codigoCupom}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyCode(cupom.codigoCupom, cupom.id)}
                          className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedCouponId === cupom.id ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCouponId === cupom.id ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Estratégia de Parcerias B2B / Revenda */}
          {activeTab === 'parcerias' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-indigo-900 text-white space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-amber-300" />
                  <h3 className="font-black text-sm text-white">
                    Como Monetizar com Parcerias & Revenda de Produtos Pet
                  </h3>
                </div>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  Como adestrador, sua autoridade comportamental é a maior força de recomendação. Ao conectar as conquistas dos tutores com descontos em produtos naturais, você cria um canal direto de monetização:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
                    <span className="font-bold text-amber-300 block">1. Revenda Própria</span>
                    <p className="text-[11px] text-indigo-100">
                      Monte kits de orelhas desidratadas, cascos e guias longas e entregue aos clientes com a margem do adestrador.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
                    <span className="font-bold text-amber-300 block">2. Comissão com Pet Shops Locais</span>
                    <p className="text-[11px] text-indigo-100">
                      Feche convênios com lojas da sua cidade: cada tutor que apresentar o cupom do app gera 10% a 20% de comissão para você.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            💡 Dica: cada fase concluída no tabuleiro rende PETCOINS 🪙!
          </span>

          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-800 text-white font-bold text-xs cursor-pointer hover:bg-slate-900 transition-colors"
          >
            Fechar Loja
          </button>
        </div>
      </div>
    </div>
  );
};
