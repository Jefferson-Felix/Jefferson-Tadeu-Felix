import React from 'react';
import { PetProfile, GoogleSheetsConfig } from '../types';
import { getPetLevelInfo } from '../data/defaultTasks';
import { PetAvatarVisual } from './PetAvatarVisual';
import { 
  Dog, 
  Cat, 
  Flame, 
  Sparkles, 
  Plus, 
  Volume2, 
  VolumeX, 
  CloudCheck, 
  CloudOff,
  ChevronDown,
  Info,
  Bone,
  ShoppingBag,
  Palette
} from 'lucide-react';

interface NavbarProps {
  pets: PetProfile[];
  petAtivo: PetProfile | null;
  onSelectPet: (petId: string) => void;
  onOpenNewPetModal: () => void;
  onOpenWelcome: () => void;
  onOpenTreatStore: () => void;
  onOpenAvatarSelector: () => void;
  sheetsConfig: GoogleSheetsConfig;
  somAtivado: boolean;
  onToggleSom: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  pets,
  petAtivo,
  onSelectPet,
  onOpenNewPetModal,
  onOpenWelcome,
  onOpenTreatStore,
  onOpenAvatarSelector,
  sheetsConfig,
  somAtivado,
  onToggleSom
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const levelInfo = petAtivo ? getPetLevelInfo(petAtivo.xp) : null;
  const saldoPetiscos = petAtivo ? (petAtivo.saldoPetiscos ?? Math.floor(petAtivo.xp / 5)) : 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand & Pet Selector */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              id="pet-selector-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-slate-100 hover:bg-slate-200/80 transition-all border border-slate-200 cursor-pointer"
            >
              {petAtivo ? (
                <PetAvatarVisual pet={petAtivo} size="sm" showBadge={false} />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  🐾
                </div>
              )}

              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800 text-sm tracking-tight leading-tight">
                    {petAtivo?.nome || 'AdestraPet'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-[11px] text-slate-500 font-medium line-clamp-1">
                  {petAtivo ? `Nv. ${levelInfo?.nivel} • ${petAtivo.raca || petAtivo.especie}` : 'Selecione o Pet'}
                </div>
              </div>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Seus Pets ({pets.length})
                </div>
                {pets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPet(p.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      p.id === petAtivo?.id ? 'bg-indigo-50/60 font-semibold text-indigo-600' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <PetAvatarVisual pet={p} size="sm" showBadge={false} />
                      <div className="text-left">
                        <span className="text-sm font-bold block">{p.nome}</span>
                        <span className="text-[10px] text-slate-400">{p.raca || p.especie}</span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      Nv. {p.nivel}
                    </span>
                  </button>
                ))}
                
                <div className="my-1 border-t border-slate-100"></div>

                {petAtivo && (
                  <button
                    id="btn-customizar-avatar-nav"
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenAvatarSelector();
                    }}
                    className="w-full px-3 py-2 text-xs text-indigo-600 font-bold hover:bg-indigo-50 flex items-center gap-2"
                  >
                    <Palette className="w-4 h-4" />
                    Trocar Avatar / Raça de {petAtivo.nome}
                  </button>
                )}

                <button
                  id="btn-add-pet-dropdown"
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenNewPetModal();
                  }}
                  className="w-full px-3 py-2 text-xs text-slate-700 font-bold hover:bg-slate-50 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-indigo-600" />
                  Cadastrar Novo Pet
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Treat / Petcoins Balance Button (Opens Treat Store) */}
          {petAtivo && (
            <button
              id="btn-nav-petiscos"
              onClick={onOpenTreatStore}
              title="Ver Loja de PETCOINS & Descontos Reais"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-300/80 text-amber-900 text-xs font-black shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <span className="text-sm">🪙</span>
              <span>{saldoPetiscos}</span>
              <span className="hidden sm:inline text-[10px] text-amber-800 font-extrabold uppercase">PETCOINS</span>
            </button>
          )}

          {/* Streak pill */}
          {petAtivo && (
            <div 
              title="Dias seguidos de jornada" 
              className="hidden xs:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{petAtivo.streakDias}d</span>
            </div>
          )}

          {/* Welcome Guide button */}
          <button
            id="btn-open-welcome-guide"
            onClick={onOpenWelcome}
            title="Apresentação & Guia do Método de Adestramento"
            className="w-9 h-9 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition-colors cursor-pointer border border-indigo-100"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Audio toggle */}
          <button
            id="toggle-sound-btn"
            onClick={onToggleSom}
            title={somAtivado ? 'Sons de treino ativados' : 'Sons desativados'}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            {somAtivado ? <Volume2 className="w-4 h-4 text-indigo-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
