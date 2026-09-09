import React, { useState } from 'react';
import { PetProfile, TrainingLog, GoogleSheetsConfig, TutorProfile, AppState } from '../types';
import { 
  getGoogleAppsScriptTemplate, 
  exportToCSV, 
  exportAnamneseCSV,
  exportTreinosCSV,
  exportToJSON, 
  syncAnamneseToSheets, 
  syncTrainingLogToSheets 
} from '../services/sheetsSync';
import { MOCK_ANONYMOUS_PETS, MOCK_ANONYMOUS_TRAININGS } from '../data/mockDataset';
import { 
  Database, 
  CloudCheck, 
  CloudUpload, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  History, 
  Star, 
  Calendar, 
  Dog, 
  Cat, 
  Sparkles,
  HelpCircle,
  FileSpreadsheet,
  RefreshCw,
  FolderDown,
  Users
} from 'lucide-react';

interface HistoryAndSheetsViewProps {
  appState: AppState;
  onUpdateSheetsConfig: (config: GoogleSheetsConfig) => void;
}

export const HistoryAndSheetsView: React.FC<HistoryAndSheetsViewProps> = ({
  appState,
  onUpdateSheetsConfig
}) => {
  const { sheetsConfig, historicoTreinos, pets, tutor } = appState;

  const [urlInput, setUrlInput] = useState(sheetsConfig.scriptUrl || '');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [syncingAll, setSyncingAll] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);

  const scriptCode = getGoogleAppsScriptTemplate();

  const handleSaveConfig = () => {
    onUpdateSheetsConfig({
      ...sheetsConfig,
      scriptUrl: urlInput.trim()
    });
    setStatusMsg({
      tipo: 'success',
      texto: 'Configuração da URL salva com sucesso!'
    });
  };

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(scriptCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleSyncAll = async () => {
    if (!sheetsConfig.scriptUrl) {
      setStatusMsg({
        tipo: 'error',
        texto: 'Por favor, informe a URL do Google Apps Script antes de sincronizar.'
      });
      return;
    }

    setSyncingAll(true);
    setStatusMsg(null);

    let sucessos = 0;

    // Sincroniza Anamneses de todos os pets
    for (const pet of pets) {
      if (pet.anamnese) {
        const res = await syncAnamneseToSheets(sheetsConfig.scriptUrl, tutor, pet, pet.anamnese);
        if (res.success) sucessos++;
      }
    }

    // Sincroniza treinos recentes
    for (const log of historicoTreinos.slice(0, 10)) {
      const res = await syncTrainingLogToSheets(sheetsConfig.scriptUrl, log);
      if (res.success) sucessos++;
    }

    setSyncingAll(false);
    setStatusMsg({
      tipo: 'success',
      texto: `Sincronização concluída! ${sucessos} registros enviados para sua Planilha no Google Drive.`
    });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header card */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-semibold uppercase tracking-wider">
          <Database className="w-3.5 h-3.5 text-indigo-200" />
          <span>Banco de Dados & Planilhas</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Sincronização Google Sheets
        </h1>
        <p className="text-indigo-100 text-xs leading-relaxed max-w-lg">
          Seus dados de anamnese e histórico de treinos podem ser sincronizados automaticamente com uma planilha no seu Google Drive.
        </p>
      </div>

      {/* Status banner */}
      {statusMsg && (
        <div className={`p-4 rounded-2xl text-xs font-bold border ${
          statusMsg.tipo === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          {statusMsg.texto}
        </div>
      )}

      {/* Google Sheets Config Panel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-800">Conexão com Google Sheets</h2>
          </div>
          <button
            onClick={() => setShowScriptModal(true)}
            className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Como Configurar</span>
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            URL do Google Apps Script (Web App /exec)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
            <button
              onClick={handleSaveConfig}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
            >
              Salvar URL
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Cole aqui o link gerado após implantar o código Apps Script na sua planilha Google.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Card Especial de Dados Anonimizados para Portfólio / Análise */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-950">
                  Dataset de Mercado (15 Pets & 18 Treinos Anonimizados)
                </span>
              </div>
              <span className="text-[10px] font-extrabold bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                Pronto p/ Portfólio
              </span>
            </div>
            <p className="text-[11px] text-indigo-800/80 leading-relaxed">
              Base enriquecida e 100% anonimizada de acordo com as diretrizes da LGPD (Golden, Shih-tzu, Pastor, Vira-latas, Gatos, cães com ansiedade, reatividade, etc). Ideal para conectar no <strong>Looker Studio</strong>, <strong>Power BI</strong> e <strong>Python</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => exportAnamneseCSV(MOCK_ANONYMOUS_PETS)}
                className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar CSV: 15 Pets (Anamnese)</span>
              </button>

              <button
                onClick={() => exportTreinosCSV(MOCK_ANONYMOUS_TRAININGS)}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FolderDown className="w-3.5 h-3.5" />
                <span>Baixar CSV: 18 Treinos (Fato)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleSyncAll}
              disabled={syncingAll}
              className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncingAll ? 'animate-spin' : ''}`} />
              <span>{syncingAll ? 'Sincronizando...' : 'Sincronizar via Webhook'}</span>
            </button>

            <button
              onClick={() => exportAnamneseCSV(pets)}
              className="py-3 px-4 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Baixar Dados Cadastrados no App</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={() => exportToJSON(appState)}
            className="text-[11px] text-slate-500 hover:text-slate-800 underline font-medium"
          >
            Fazer Backup Completo do App (JSON)
          </button>
        </div>
      </div>

      {/* History of Training Logs */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-800">
              Histórico de Treinos & Evolução Diária ({historicoTreinos.length})
            </h2>
          </div>
        </div>

        {historicoTreinos.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
            Nenhum treino registrado ainda. Use o <strong>Treino Guiado</strong> para salvar sessões!
          </div>
        ) : (
          <div className="space-y-3">
            {historicoTreinos.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 bg-slate-50/50 space-y-2 text-xs transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    {log.especie === 'Gato' ? <Cat className="w-4 h-4 text-amber-600" /> : <Dog className="w-4 h-4 text-indigo-600" />}
                    <span>{log.nomeExercicio}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({log.petNome})</span>
                  </div>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    +{log.xpGanho} XP
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>
                    {new Date(log.dataHora).toLocaleDateString('pt-BR')} às {new Date(log.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} • {Math.round(log.duracaoSegundos / 60)} min
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: log.sucessoNota }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {log.observacoes && (
                  <p className="p-2 rounded-lg bg-white border border-slate-200/60 text-slate-600 italic text-[11px]">
                    &ldquo;{log.observacoes}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal / Card with Google Apps Script Code */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-800">
                  Código do Google Apps Script (doPost)
                </h3>
              </div>
              <button
                onClick={() => setShowScriptModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 text-xs text-slate-600 flex-1 pr-1">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-900 space-y-1">
                <strong>Passo a passo rápido:</strong>
                <ol className="list-decimal list-inside space-y-0.5 text-[11px]">
                  <li>Crie uma nova planilha no seu Google Drive (drive.google.com).</li>
                  <li>No menu superior, vá em <strong>Extensões &gt; Apps Script</strong>.</li>
                  <li>Cole o código abaixo e clique em <strong>Salvar (ícone do disquete)</strong>.</li>
                  <li>Clique em <strong>Implantar (Deploy) &gt; Nova Implantação</strong>.</li>
                  <li>Tipo: <strong>App da Web</strong> | Quem tem acesso: <strong>Qualquer pessoa (Anyone)</strong>.</li>
                  <li>Copie a URL gerada (terminada em <code>/exec</code>) e cole no campo acima!</li>
                </ol>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto max-h-64 leading-relaxed">
                  {scriptCode}
                </pre>
                <button
                  onClick={handleCopyScript}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copiado!' : 'Copiar Código'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowScriptModal(false)}
                className="py-2.5 px-5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Entendi, fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
