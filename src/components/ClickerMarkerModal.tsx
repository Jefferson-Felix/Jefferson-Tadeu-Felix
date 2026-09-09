import React, { useState } from 'react';
import { ClickerSoundType } from '../types';
import { audioService } from '../services/audioService';
import { 
  X, 
  Volume2, 
  Sparkles, 
  Play, 
  Check, 
  BookOpen, 
  Lightbulb, 
  Mic, 
  Radio, 
  HelpCircle,
  Award
} from 'lucide-react';

interface ClickerMarkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  somAtual: ClickerSoundType;
  marcadorVerbalAtual: string;
  onSavePreferences: (som: ClickerSoundType, palavra: string) => void;
}

export const ClickerMarkerModal: React.FC<ClickerMarkerModalProps> = ({
  isOpen,
  onClose,
  somAtual,
  marcadorVerbalAtual,
  onSavePreferences
}) => {
  const [selectedSound, setSelectedSound] = useState<ClickerSoundType>(somAtual || 'mecanico');
  const [verbalWord, setVerbalWord] = useState<string>(marcadorVerbalAtual || 'Sim!');
  const [customWordInput, setCustomWordInput] = useState<string>('');

  if (!isOpen) return null;

  const soundOptions: { id: ClickerSoundType; titulo: string; desc: string; icon: string }[] = [
    {
      id: 'mecanico',
      titulo: 'Clicker Mecânico Duplo (Clássico)',
      desc: 'O estalo metálico "clic-clac" de caixa de treino. Super nítido e inequívoco.',
      icon: '🔘'
    },
    {
      id: 'crisp',
      titulo: 'Clicker Crisp / Agudo',
      desc: 'Som de alta frequência ultra-rápido. Excelente para cães com foco disperso.',
      icon: '⚡'
    },
    {
      id: 'suave',
      titulo: 'Tom Suave / Baixo Impacto',
      desc: 'Mais suave e sem estalo estridente. Ideal para filhotes sensíveis ou gatos.',
      icon: '🎵'
    },
    {
      id: 'apito',
      titulo: 'Apito de Treino Harmônico',
      desc: 'Frequência de apito de treinador. Ótimo para treinos à distância.',
      icon: '📣'
    },
    {
      id: 'verbal',
      titulo: 'Marcador Verbal Falado (Voz)',
      desc: 'O app pronuncia sua palavra de marcador com síntese de voz imediata.',
      icon: '🗣️'
    }
  ];

  const suggestedWords = ['Sim!', 'Muito bem!', 'Isso!', 'Yes!', 'Boa!', 'Click!'];

  const handleTestSound = (type: ClickerSoundType, word: string) => {
    audioService.playClicker(type, word);
  };

  const handleSave = () => {
    audioService.playSuccessChime();
    onSavePreferences(selectedSound, verbalWord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-800 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider mb-2 backdrop-blur-xs">
            <Radio className="w-3.5 h-3.5" />
            <span>Ciência do Comportamento</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Clicker & Marcador Verbal
          </h2>
          <p className="text-xs text-amber-100 mt-1 max-w-md leading-relaxed">
            Aprenda a congelar o comportamento exato no milissegundo em que o cão acerta, acelerando o aprendizado em até 4 vezes.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-600 flex-1">
          {/* Pedagogical Trainer Guide Card */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/80 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Instrução do Adestrador: O que é o Marcador?</span>
            </div>
            <p className="text-amber-950/85 leading-relaxed">
              O marcador (seja o barulho do <strong>Clicker</strong> ou uma <strong>palavra ponte</strong> como <em>"Sim!"</em>) funciona como o botão de uma câmera fotográfica: ele avisa ao cão <em>"Foi EXATAMENTE esse instante que te garantiu o petisco!"</em>.
            </p>
            <div className="bg-white/90 p-3 rounded-xl border border-amber-200 text-amber-900 space-y-1">
              <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-700">Como Carregar o Marcador (Passo a Passo):</span>
              <ol className="list-decimal pl-4 space-y-0.5 text-[11px]">
                <li>Diga a palavra marcadora (ex: <strong>"Sim!"</strong>) ou aperte o clicker;</li>
                <li>Imediatamente em até 1 segundo, entregue um <strong>petisco de alto valor</strong>;</li>
                <li>Repita de 10 a 15 vezes sem pedir nenhum comando antes;</li>
                <li>Quando os olhos do cão brilharem ao ouvir o som, o marcador está carregado!</li>
              </ol>
            </div>
          </div>

          {/* Sound Type Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Escolha o Tipo de Som do Marcador
            </label>

            <div className="space-y-2">
              {soundOptions.map((sound) => {
                const isSelected = selectedSound === sound.id;

                return (
                  <div
                    key={sound.id}
                    onClick={() => setSelectedSound(sound.id)}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                        : 'bg-white border-slate-200/90 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl shrink-0">{sound.icon}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-xs text-slate-900">
                            {sound.titulo}
                          </h4>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {sound.desc}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestSound(sound.id, verbalWord);
                      }}
                      className="py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 shrink-0 transition-colors"
                      title="Ouvir som"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Testar</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verbal Marker Word Customization */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-amber-600" />
                <span>2. Palavra Marcadora Verbal (Caso não use clicker físico)</span>
              </label>
            </div>

            <p className="text-slate-500 text-[11px]">
              Tutores podem usar qualquer palavra curta, alegre e consistente no lugar de um aparelho de clicker.
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestedWords.map((word) => {
                const isWordSelected = verbalWord === word;

                return (
                  <button
                    key={word}
                    type="button"
                    onClick={() => {
                      setVerbalWord(word);
                      audioService.speakMarkerWord(word);
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isWordSelected
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    "{word}"
                  </button>
                );
              })}
            </div>

            {/* Custom word input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customWordInput}
                onChange={(e) => setCustomWordInput(e.target.value)}
                placeholder="Ou digite outra palavra (ex: 'Perfeito!')"
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => {
                  if (customWordInput.trim()) {
                    const clean = customWordInput.trim();
                    setVerbalWord(clean);
                    audioService.speakMarkerWord(clean);
                    setCustomWordInput('');
                  }
                }}
                disabled={!customWordInput.trim()}
                className="py-2 px-3 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs disabled:opacity-40 hover:bg-amber-200 transition-colors"
              >
                Definir
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Fechar
          </button>

          <button
            type="button"
            id="btn-salvar-preferencias-clicker"
            onClick={handleSave}
            className="py-2.5 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-200 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Salvar Marcador ("{verbalWord}")</span>
          </button>
        </div>
      </div>
    </div>
  );
};
