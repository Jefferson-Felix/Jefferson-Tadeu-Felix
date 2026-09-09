import React, { useState } from 'react';
import { PetProfile, PetAvatarConfig, AvatarBreedId } from '../types';
import { AVATAR_BREEDS, BreedOption } from '../data/rewardsAndAvatarsData';
import { audioService } from '../services/audioService';
import { 
  X, 
  Sparkles, 
  Check, 
  Dog, 
  Cat, 
  Palette, 
  Maximize2, 
  Award,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PetAvatarSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: PetProfile;
  onSaveAvatar: (avatarConfig: PetAvatarConfig) => void;
}

export const PetAvatarSelectorModal: React.FC<PetAvatarSelectorModalProps> = ({
  isOpen,
  onClose,
  pet,
  onSaveAvatar
}) => {
  const currentConfig = pet.avatarConfig || {
    breedId: (pet.especie === 'Gato' ? 'gato_laranja' : 'caramelo') as AvatarBreedId,
    corPelagem: pet.especie === 'Gato' ? 'Laranja Listrado' : 'Caramelo Tradicional',
    porte: (pet.anamnese?.porte || 'Médio') as 'Pequeno' | 'Médio' | 'Grande' | 'Gigante'
  };

  const [selectedBreedId, setSelectedBreedId] = useState<AvatarBreedId>(currentConfig.breedId);
  const [selectedCor, setSelectedCor] = useState<string>(currentConfig.corPelagem);
  const [selectedPorte, setSelectedPorte] = useState<'Pequeno' | 'Médio' | 'Grande' | 'Gigante'>(currentConfig.porte);
  const [especieFiltro, setEspecieFiltro] = useState<'Todos' | 'Cão' | 'Gato'>(pet.especie);

  if (!isOpen) return null;

  const currentBreed = AVATAR_BREEDS.find(b => b.id === selectedBreedId) || AVATAR_BREEDS[0];

  const handleSelectBreed = (breed: BreedOption) => {
    audioService.playClicker();
    setSelectedBreedId(breed.id);
    setSelectedCor(breed.coresDisponiveis[0] || 'Padrão');
    setSelectedPorte(breed.porteSugerido);
  };

  const handleSave = () => {
    audioService.playSuccessChime();
    audioService.playCoinReward();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
    onSaveAvatar({
      breedId: selectedBreedId,
      corPelagem: selectedCor,
      porte: selectedPorte
    });
    onClose();
  };

  const filteredBreeds = AVATAR_BREEDS.filter(
    b => especieFiltro === 'Todos' || b.especie === especieFiltro
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-2 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalização do Peão de Treino</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Avatar & Raça de {pet.nome}
          </h2>
          <p className="text-xs text-indigo-200 mt-1 max-w-md">
            Escolha a representação visual do seu cão ou gato, com variação de pelagem e porte.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 flex-1">
          {/* Active Avatar Preview Card */}
          <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 flex items-center gap-4">
            <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${currentBreed.bgGradiente} text-white text-3xl flex items-center justify-center shadow-lg border-2 border-white shrink-0`}>
              <span>{currentBreed.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                Visual Selecionado
              </span>
              <h3 className="text-sm font-black text-slate-800 truncate">
                {currentBreed.nome}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1">
                Pelagem: <strong>{selectedCor}</strong> • Porte: <strong>{selectedPorte}</strong>
              </p>
            </div>
          </div>

          {/* Species Filter Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEspecieFiltro('Todos')}
              className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                especieFiltro === 'Todos' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos os Avatares
            </button>
            <button
              type="button"
              onClick={() => setEspecieFiltro('Cão')}
              className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                especieFiltro === 'Cão' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Dog className="w-3.5 h-3.5" />
              <span>Cães</span>
            </button>
            <button
              type="button"
              onClick={() => setEspecieFiltro('Gato')}
              className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                especieFiltro === 'Gato' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Cat className="w-3.5 h-3.5" />
              <span>Gatos</span>
            </button>
          </div>

          {/* Breed Grid */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Selecione a Raça / Arquétipo do Pet ({filteredBreeds.length})
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredBreeds.map((breed) => {
                const isSelected = selectedBreedId === breed.id;

                return (
                  <button
                    key={breed.id}
                    type="button"
                    onClick={() => handleSelectBreed(breed)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-600 shadow-sm ring-2 ring-indigo-600/20'
                        : 'bg-white border-slate-200/90 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${breed.bgGradiente} text-white text-2xl flex items-center justify-center shrink-0 shadow-xs`}>
                      <span>{breed.emoji}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-xs text-slate-800 truncate">
                          {breed.nome}
                        </h4>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {breed.subtitulo}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coat Color Variation Selection */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-indigo-600" />
              <span>2. Variação de Pelagem / Cor ({currentBreed.coresDisponiveis.length} opções)</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {currentBreed.coresDisponiveis.map((cor) => {
                const isCorSelected = selectedCor === cor;

                return (
                  <button
                    key={cor}
                    type="button"
                    onClick={() => {
                      audioService.playClicker();
                      setSelectedCor(cor);
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isCorSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cor}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Porte / Size Selection */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>3. Porte do Pet</span>
            </label>

            <div className="grid grid-cols-4 gap-2">
              {(['Pequeno', 'Médio', 'Grande', 'Gigante'] as const).map((porte) => {
                const isPorteSelected = selectedPorte === porte;

                return (
                  <button
                    key={porte}
                    type="button"
                    onClick={() => {
                      audioService.playClicker();
                      setSelectedPorte(porte);
                    }}
                    className={`py-2 px-2 text-center rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isPorteSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {porte}
                  </button>
                );
              })}
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
            Cancelar
          </button>

          <button
            type="button"
            id="btn-salvar-avatar-pet"
            onClick={handleSave}
            className="py-2.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-200 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Salvar Avatar de {pet.nome}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
