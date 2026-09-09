import React, { useState } from 'react';
import { PetProfile, TutorProfile, AnamneseData, GoogleSheetsConfig, PetSpecies, EnergyLevel, AloneTime, FoodType, HealthRestriction } from '../types';
import { calculateLifeStage } from '../data/defaultTasks';
import { syncAnamneseToSheets } from '../services/sheetsSync';
import { 
  ClipboardCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HeartPulse, 
  Brain, 
  Utensils, 
  ShieldAlert, 
  Dog, 
  Cat, 
  Calendar,
  CloudUpload,
  ArrowRight,
  Home,
  Bone,
  Compass,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnamneseViewProps {
  pet: PetProfile;
  tutor: TutorProfile;
  sheetsConfig: GoogleSheetsConfig;
  onSaveAnamnese: (anamnese: AnamneseData) => void;
  onNavigateToJourney: () => void;
  onOpenBehavioralProtocol?: (protocolId: 'ansiedade_separacao' | 'posse_recursos' | 'posse_ambiente') => void;
}

const DESAFIOS_COMUNS_CAO = [
  'Ansiedade por separação / Latir e uivar ao ficar sozinho',
  'Posse por recursos (proteção de comida, ossos e brinquedos)',
  'Posse por ambiente (rosnar no sofá, cama ou passagens)',
  'Xixi / Cocô fora do lugar',
  'Puxar muito na guia no passeio',
  'Pular nas visitas para pedir atenção',
  'Roer móveis e chinelos (destruição)',
  'Reatividade com outros cães ou pessoas',
  'Medo de fogos e trovões'
];

const DESAFIOS_COMUNS_GATO = [
  'Fazer necessidades fora da caixa de areia',
  'Arranhar sofás, cortinas e móveis',
  'Miados excessivos durante a noite',
  'Agressividade ao receber carinho (overstimulation)',
  'Medo e estresse ao ver a caixa de transporte',
  'Conflito com outros pets da casa',
  'Beber pouca água / Rejeitar sachê'
];

export const AnamneseView: React.FC<AnamneseViewProps> = ({
  pet,
  tutor,
  sheetsConfig,
  onSaveAnamnese,
  onNavigateToJourney,
  onOpenBehavioralProtocol
}) => {
  const anamneseExistente = pet.anamnese;

  const [especie, setEspecie] = useState<PetSpecies>(anamneseExistente?.especie || pet.especie || 'Cão');
  const [dataNascimento, setDataNascimento] = useState(anamneseExistente?.dataNascimento || '');
  const [porte, setPorte] = useState<'Pequeno' | 'Médio' | 'Grande' | 'Gigante'>(anamneseExistente?.porte || 'Médio');
  const [pesoKg, setPesoKg] = useState<number | undefined>(anamneseExistente?.pesoKg);
  const [castrado, setCastrado] = useState<boolean>(anamneseExistente?.castrado ?? true);
  const [energia, setEnergia] = useState<EnergyLevel>(anamneseExistente?.energia || 'Moderado');
  const [tempoSozinho, setTempoSozinho] = useState<AloneTime>(anamneseExistente?.tempoSozinho || 'Pouco');
  const [alimentacao, setAlimentacao] = useState<FoodType>(anamneseExistente?.alimentacao || 'Ração Seca');
  const [marcaAlimento, setMarcaAlimento] = useState(anamneseExistente?.marcaAlimento || '');
  const [dataVacina, setDataVacina] = useState(anamneseExistente?.dataVacina || '');
  const [dataVermifugo, setDataVermifugo] = useState(anamneseExistente?.dataVermifugo || '');
  const [planoSaude, setPlanoSaude] = useState<'Sim' | 'Não' | 'Já possui'>(anamneseExistente?.planoSaude || 'Não');
  const [restricoes, setRestricoes] = useState<HealthRestriction>(anamneseExistente?.restricoes || 'Nenhuma');
  const [desafiosComportamentais, setDesafiosComportamentais] = useState<string[]>(anamneseExistente?.desafiosComportamentais || []);
  const [localNecessidades, setLocalNecessidades] = useState(anamneseExistente?.localNecessidades || (especie === 'Cão' ? 'Tapete higiênico lavável/descartável' : 'Caixa de areia plástica'));
  const [brinquedosFavoritos, setBrinquedosFavoritos] = useState(anamneseExistente?.brinquedosFavoritos || '');

  const [salvando, setSalvando] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);

  const idadeCalculada = calculateLifeStage(dataNascimento);

  const toggleDesafio = (desafio: string) => {
    if (desafiosComportamentais.includes(desafio)) {
      setDesafiosComportamentais(desafiosComportamentais.filter(d => d !== desafio));
    } else {
      setDesafiosComportamentais([...desafiosComportamentais, desafio]);
    }
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataNascimento) {
      setFeedbackMsg({ tipo: 'error', texto: 'Por favor, informe a data de nascimento aproximada do pet.' });
      return;
    }

    setSalvando(true);
    setFeedbackMsg(null);

    const anamneseFinal: AnamneseData = {
      especie,
      dataNascimento,
      porte,
      pesoKg,
      castrado,
      energia,
      tempoSozinho,
      alimentacao,
      marcaAlimento,
      dataVacina,
      dataVermifugo,
      planoSaude,
      restricoes,
      desafiosComportamentais,
      localNecessidades,
      brinquedosFavoritos,
      dataPreenchimento: new Date().toISOString()
    };

    onSaveAnamnese(anamneseFinal);

    // Tentativa de sincronização com Google Sheets se houver URL configurada
    if (sheetsConfig.scriptUrl) {
      const syncRes = await syncAnamneseToSheets(sheetsConfig.scriptUrl, tutor, pet, anamneseFinal);
      if (syncRes.success) {
        setFeedbackMsg({ tipo: 'success', texto: 'Anamnese salva e sincronizada na Planilha Google com sucesso!' });
      } else {
        setFeedbackMsg({ tipo: 'success', texto: 'Anamnese salva localmente! (Aviso do Sheets: ' + syncRes.message + ')' });
      }
    } else {
      setFeedbackMsg({ tipo: 'success', texto: 'Anamnese e perfil inteligente atualizados com sucesso!' });
    }

    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }

    setSalvando(false);
  };

  const listaDesafios = especie === 'Gato' ? DESAFIOS_COMUNS_GATO : DESAFIOS_COMUNS_CAO;

  return (
    <div className="space-y-6 pb-20">
      {/* Header card */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-2">
            <ClipboardCheck className="w-3.5 h-3.5 text-indigo-200" />
            <span>Anamnese Comportamental & Clínica</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Perfil de {pet.nome}
          </h1>
          <p className="text-indigo-100 text-sm mt-1 max-w-lg">
            Personalizamos a trilha de obediência, educação sanitária e enriquecimento com base nas características únicas do seu pet.
          </p>

          {dataNascimento && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-white/20 text-xs font-bold backdrop-blur-xs">
                {idadeCalculada.textoIdade} ({idadeCalculada.estagio === 'FILHOTE' ? '🐾 Filhote' : idadeCalculada.estagio === 'SENIOR' ? '👑 Sênior / Idoso' : '⚡ Adulto'})
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/20 text-xs font-bold backdrop-blur-xs">
                Porte {porte}
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/20 text-xs font-bold backdrop-blur-xs">
                Energia {energia}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Feedback banner */}
      {feedbackMsg && (
        <div className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-medium border ${
          feedbackMsg.tipo === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {feedbackMsg.tipo === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-rose-600" />}
            <span>{feedbackMsg.texto}</span>
          </div>
          {feedbackMsg.tipo === 'success' && (
            <button
              onClick={onNavigateToJourney}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
            >
              <span>Ir para Missões</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Hub de Consultoria Comportamental Autônoma */}
      {especie === 'Cão' && (
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-4 border border-indigo-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-indigo-500/30 text-amber-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-black tracking-tight text-white">
                  Consultoria Comportamental Autônoma
                </h3>
                <p className="text-[11px] text-indigo-200">
                  Metodologia gradativa com protocolos passo a passo para o tutor aplicar em casa
                </p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Sem Punição
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {/* 1. Ansiedade por Separação */}
            <button
              type="button"
              onClick={() => onOpenBehavioralProtocol?.('ansiedade_separacao')}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-left group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] bg-amber-400/20 text-amber-200 px-1.5 py-0.5 rounded font-bold">
                    Sub-Limiar
                  </span>
                </div>
                <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition-colors">
                  Ansiedade de Separação
                </h4>
                <p className="text-[10px] text-white/70 mt-1 leading-snug">
                  Micro-ausências de 1s a 30 min, quebra de gatilhos de chaves/bolsa e calma.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-amber-300 font-bold">
                <span>Ver Protocolo Gradual</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* 2. Posse por Recursos */}
            <button
              type="button"
              onClick={() => onOpenBehavioralProtocol?.('posse_recursos')}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-left group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
                    <Bone className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] bg-rose-400/20 text-rose-200 px-1.5 py-0.5 rounded font-bold">
                    Trade-Up
                  </span>
                </div>
                <h4 className="text-xs font-black text-white group-hover:text-rose-300 transition-colors">
                  Posse por Recursos
                </h4>
                <p className="text-[10px] text-white/70 mt-1 leading-snug">
                  Proteção de comida e ossos: troca vantajosa e contra-condicionamento no prato.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-rose-300 font-bold">
                <span>Ver Protocolo Gradual</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* 3. Posse por Ambiente */}
            <button
              type="button"
              onClick={() => onOpenBehavioralProtocol?.('posse_ambiente')}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-left group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] bg-indigo-400/20 text-indigo-200 px-1.5 py-0.5 rounded font-bold">
                    Place & Desce
                  </span>
                </div>
                <h4 className="text-xs font-black text-white group-hover:text-indigo-300 transition-colors">
                  Posse por Ambiente
                </h4>
                <p className="text-[10px] text-white/70 mt-1 leading-snug">
                  Guarda de sofás, camas e corredores: comando "Desce" e refúgio na caminha.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-indigo-300 font-bold">
                <span>Ver Protocolo Gradual</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Diagnóstico Inteligente em tempo real */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-800">
            Diagnóstico Comportamental & Recomendações
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Alertas Dinâmicos de Consultoria */}
          {desafiosComportamentais.some(d => d.toLowerCase().includes('ansiedade') || d.toLowerCase().includes('sozinho')) && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col justify-between gap-2">
              <div className="flex gap-2.5">
                <Home className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-amber-900">Plano para Ansiedade de Separação Ativado:</strong>
                  Inicie com a Fase 1 de dessensibilização das chaves e sapatos. Nunca deixe o cão atingir o ponto de pânico.
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenBehavioralProtocol?.('ansiedade_separacao')}
                className="text-[11px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 py-1.5 px-2.5 rounded-xl self-start flex items-center gap-1 transition-colors"
              >
                <span>Abrir Protocolo de Ausência Sub-Limiar</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {desafiosComportamentais.some(d => d.toLowerCase().includes('posse por recursos') || d.toLowerCase().includes('comida') || d.toLowerCase().includes('ossos')) && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex flex-col justify-between gap-2">
              <div className="flex gap-2.5">
                <Bone className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-rose-900">Plano para Posse por Recursos Ativado:</strong>
                  NUNCA tente tirar comida à força ou punir o rosnado. Pratique o protocolo de contra-condicionamento no prato.
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenBehavioralProtocol?.('posse_recursos')}
                className="text-[11px] font-bold text-rose-800 bg-rose-100 hover:bg-rose-200 py-1.5 px-2.5 rounded-xl self-start flex items-center gap-1 transition-colors"
              >
                <span>Abrir Protocolo Trade-Up de Troca</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {desafiosComportamentais.some(d => d.toLowerCase().includes('posse por ambiente') || d.toLowerCase().includes('sofá') || d.toLowerCase().includes('cama')) && (
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 flex flex-col justify-between gap-2">
              <div className="flex gap-2.5">
                <Compass className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-indigo-900">Plano de Posse por Espaço Ativado:</strong>
                  Ensine o comando "Desce" com recompensa no chão e estruture o refúgio seguro na caminha própria.
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenBehavioralProtocol?.('posse_ambiente')}
                className="text-[11px] font-bold text-indigo-800 bg-indigo-100 hover:bg-indigo-200 py-1.5 px-2.5 rounded-xl self-start flex items-center gap-1 transition-colors"
              >
                <span>Abrir Protocolo de Posse por Espaço</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Alerta de Saúde / Articular */}
          {restricoes === 'Coluna/Articular' ? (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Cuidado Articular / Coluna:</strong>
                Substitua saltos de sofás por rampas antiderrapantes. Priorize enriquecimento cognitivo (quebra-cabeças) e olfativo no chão.
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 flex gap-2.5">
              <HeartPulse className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Saúde Física:</strong>
                Mantenha a rotina de exercícios adaptada ao nível de energia {energia.toLowerCase()}.
              </div>
            </div>
          )}

          {/* Dica de Tempo Sozinho */}
          {tempoSozinho === 'Muito' ? (
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Prevenção de Ansiedade:</strong>
                Como o pet passa &gt;6h sozinho, ofereça brinquedos recheáveis congelados (Kong/tapete de lamber) 10 min antes de sair.
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 flex gap-2.5">
              <Utensils className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Nutrição & Recompensa:</strong>
                Utilize parte da porção diária de {alimentacao.toLowerCase()} para os treinos de obediência positiva.
              </div>
            </div>
          )}

          {/* Dica Felina vs Canina */}
          {especie === 'Gato' ? (
            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 flex gap-2.5 md:col-span-2">
              <Cat className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Etologia Felina:</strong>
                Gatos precisam de verticalização (prateleiras/arranhadores) e sessões de treino super curtas (1 a 2 minutos com reforço líquido como Churu/sachê).
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex gap-2.5 md:col-span-2">
              <Dog className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Regra dos 3 Segundos no Banheiro:</strong>
                Elogie e recompense o cão no exato momento em que ele terminar de usar o tapete higiênico. Nunca dê broncas em acidentes passados.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Formulário Completo de Anamnese */}
      <form onSubmit={handleSalvar} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Questionário Clínico & Comportamental
        </h3>

        {/* 1. Espécie */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">1. Espécie do Pet *</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setEspecie('Cão')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border font-bold text-sm transition-all ${
                especie === 'Cão'
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-2 ring-indigo-600/20'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Dog className="w-4 h-4" />
              <span>Cão</span>
            </button>
            <button
              type="button"
              onClick={() => setEspecie('Gato')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border font-bold text-sm transition-all ${
                especie === 'Gato'
                  ? 'bg-amber-50 border-amber-600 text-amber-800 ring-2 ring-amber-600/20'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Cat className="w-4 h-4" />
              <span>Gato</span>
            </button>
          </div>
        </div>

        {/* 2. Data de Nascimento & Porte */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                2. Data de Nascimento *
              </span>
            </label>
            <input
              type="date"
              required
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
            {dataNascimento && (
              <p className="text-[11px] text-indigo-600 font-semibold mt-1">
                Idade: {idadeCalculada.textoIdade} • Estágio: {idadeCalculada.estagio}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">3. Porte Aproximado *</label>
            <select
              value={porte}
              onChange={(e) => setPorte(e.target.value as 'Pequeno' | 'Médio' | 'Grande' | 'Gigante')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            >
              <option value="Pequeno">Pequeno (Até 10kg)</option>
              <option value="Médio">Médio (11 a 25kg)</option>
              <option value="Grande">Grande (26 a 45kg)</option>
              <option value="Gigante">Gigante (Acima de 45kg)</option>
            </select>
          </div>
        </div>

        {/* Peso e Castração */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Peso Atual (kg)</label>
            <input
              type="number"
              step="0.1"
              value={pesoKg || ''}
              onChange={(e) => setPesoKg(e.target.value ? parseFloat(e.target.value) : undefined)}
              placeholder="Ex: 8.5"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Castrado(a)?</label>
            <select
              value={castrado ? 'Sim' : 'Não'}
              onChange={(e) => setCastrado(e.target.value === 'Sim')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            >
              <option value="Sim">Sim, castrado(a)</option>
              <option value="Não">Não castrado(a)</option>
            </select>
          </div>
        </div>

        {/* 4. Energia e 5. Tempo Sozinho */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">4. Nível de Atividade / Energia *</label>
            <select
              value={energia}
              onChange={(e) => setEnergia(e.target.value as EnergyLevel)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            >
              <option value="Muito Baixo">Muito Baixo (Dorme a maior parte do dia)</option>
              <option value="Moderado">Moderado (Brinca às vezes, passeios calmos)</option>
              <option value="Alto">Alto / Hiperativo (Precisa gastar muita energia)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">5. Tempo que passa sozinho por dia *</label>
            <select
              value={tempoSozinho}
              onChange={(e) => setTempoSozinho(e.target.value as AloneTime)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            >
              <option value="Pouco">Pouco (Menos de 2 horas)</option>
              <option value="Medio">Médio (De 2 a 6 horas)</option>
              <option value="Muito">Muito (Mais de 6 horas)</option>
            </select>
          </div>
        </div>

        {/* 6. Alimentação e 7. Marca */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">6. Tipo de Alimentação *</label>
            <select
              value={alimentacao}
              onChange={(e) => setAlimentacao(e.target.value as FoodType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            >
              <option value="Ração Seca">Ração Seca</option>
              <option value="Ração Úmida">Ração Úmida / Sachê / Patê</option>
              <option value="Alimentação Natural">Alimentação Natural (Cozida/Crua)</option>
              <option value="Mista">Mista (Ração + Sachê / AN)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">7. Marca da Ração / Alimento</label>
            <input
              type="text"
              value={marcaAlimento}
              onChange={(e) => setMarcaAlimento(e.target.value)}
              placeholder="Ex: Premier, Royal Canin, Guabi, etc."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* 8. Vacinação e 9. Vermifugação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">8. Data da Última Vacinação</label>
            <input
              type="date"
              value={dataVacina}
              onChange={(e) => setDataVacina(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">9. Data do Último Vermífugo / Antipulgas</label>
            <input
              type="date"
              value={dataVermifugo}
              onChange={(e) => setDataVermifugo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* 10. Plano de Saúde e 11. Restrições Médicas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">10. Interesse em Plano de Saúde Pet?</label>
            <select
              value={planoSaude}
              onChange={(e) => setPlanoSaude(e.target.value as 'Sim' | 'Não' | 'Já possui')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            >
              <option value="Sim">Sim, tenho interesse em proteger meu pet</option>
              <option value="Já possui">Já possuo plano de saúde</option>
              <option value="Não">Não tenho interesse no momento</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">11. Restrição Médica / Coluna / Articular *</label>
            <select
              value={restricoes}
              onChange={(e) => setRestricoes(e.target.value as HealthRestriction)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            >
              <option value="Nenhuma">Nenhuma restrição física</option>
              <option value="Coluna/Articular">Problemas de Coluna / Displasia / Articulações</option>
              <option value="Cardíaco">Cardiopatia / Restrição a esforço intenso</option>
              <option value="Alergia/Dermatite">Alergias / Dermatite atópica</option>
              <option value="Sobrepeso">Sobrepeso / Obesidade</option>
              <option value="Outro">Outra condição médica</option>
            </select>
          </div>
        </div>

        {/* 12. Desafios Comportamentais (Checkboxes interativos) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            12. Desafios Comportamentais que você deseja resolver:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {listaDesafios.map((desafio) => {
              const selecionado = desafiosComportamentais.includes(desafio);
              return (
                <button
                  type="button"
                  key={desafio}
                  onClick={() => toggleDesafio(desafio)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    selecionado
                      ? 'bg-indigo-50/80 border-indigo-600 text-indigo-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{desafio}</span>
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ml-2 ${
                    selecionado ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                  }`}>
                    {selecionado && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 13. Local de Necessidades & Brinquedos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Local atual do banheiro / necessidades</label>
            <input
              type="text"
              value={localNecessidades}
              onChange={(e) => setLocalNecessidades(e.target.value)}
              placeholder={especie === 'Cão' ? 'Ex: Tapete higiênico na lavanderia, quintal' : 'Ex: 2 caixas de areia na área de serviço'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Brinquedos / Estímulos favoritos</label>
            <input
              type="text"
              value={brinquedosFavoritos}
              onChange={(e) => setBrinquedosFavoritos(e.target.value)}
              placeholder={especie === 'Cão' ? 'Ex: Bolinha, mordedor de corda, garrafa pet' : 'Ex: Varinha de penas, laser, bolinha de papel'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* Botão de Salvar & Avançar */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={salvando}
            id="btn-salvar-anamnese"
            className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {salvando ? (
              <span>Salvando e Sincronizando...</span>
            ) : (
              <>
                <CloudUpload className="w-4 h-4" />
                <span>Salvar Anamnese & Ativar Jornada</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
