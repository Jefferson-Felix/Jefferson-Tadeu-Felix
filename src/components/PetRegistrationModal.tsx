import React, { useState } from 'react';
import { TutorProfile, PetProfile, PetSpecies } from '../types';
import { Dog, Cat, User, Heart, Calendar, Sparkles, X } from 'lucide-react';

interface PetRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (tutor: TutorProfile, pet: PetProfile, goToAnamnese: boolean) => void;
  currentTutor: TutorProfile;
  isFirstPet?: boolean;
}

export const PetRegistrationModal: React.FC<PetRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegister,
  currentTutor,
  isFirstPet = false
}) => {
  const [tutorNome, setTutorNome] = useState(currentTutor.nome || '');
  const [tutorEmail, setTutorEmail] = useState(currentTutor.email || '');
  const [tutorWhatsapp, setTutorWhatsapp] = useState(currentTutor.whatsapp || '');
  const [tutorCidade, setTutorCidade] = useState(currentTutor.cidade || '');

  const [petNome, setPetNome] = useState('');
  const [especie, setEspecie] = useState<PetSpecies>('Cão');
  const [raca, setRaca] = useState('');
  const [sexo, setSexo] = useState<'Macho' | 'Fêmea'>('Macho');
  const [dataNasc, setDataNasc] = useState('');
  const [erro, setErro] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petNome.trim()) {
      setErro('Por favor, informe o nome do pet.');
      return;
    }
    if (!tutorNome.trim()) {
      setErro('Por favor, informe o nome do tutor.');
      return;
    }

    const tutorAtualizado: TutorProfile = {
      id: currentTutor.id || 'tutor_' + Date.now(),
      nome: tutorNome.trim(),
      email: tutorEmail.trim() || 'tutor@conectapet.com',
      whatsapp: tutorWhatsapp.trim(),
      cidade: tutorCidade.trim()
    };

    const novoPet: PetProfile = {
      id: 'pet_' + Date.now(),
      nome: petNome.trim(),
      especie,
      raca: raca.trim() || (especie === 'Cão' ? 'SRD (Vira-lata)' : 'SRD (Gato Mestiço)'),
      avatarIcon: especie === 'Gato' ? 'cat' : 'dog',
      sexo,
      tutorId: tutorAtualizado.id,
      xp: 50, // XP inicial de cadastro
      nivel: 1,
      streakDias: 1,
      criadoEm: new Date().toISOString(),
      anamnese: dataNasc ? {
        especie,
        dataNascimento: dataNasc,
        porte: 'Médio',
        castrado: false,
        energia: 'Moderado',
        tempoSozinho: 'Pouco',
        alimentacao: 'Ração Seca',
        marcaAlimento: '',
        planoSaude: 'Não',
        restricoes: 'Nenhuma',
        desafiosComportamentais: [],
        localNecessidades: especie === 'Cão' ? 'Tapete Higiênico' : 'Caixa de Areia',
        brinquedosFavoritos: '',
        dataPreenchimento: new Date().toISOString()
      } : undefined
    };

    onRegister(tutorAtualizado, novoPet, true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-5 text-white relative">
          {!isFirstPet && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{isFirstPet ? 'Bem-vindo ao ConectaPet' : 'Novo Membro na Família'}</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">
            {isFirstPet ? 'Cadastro do Tutor & Pet' : 'Cadastrar Outro Pet'}
          </h2>
          <p className="text-indigo-100 text-xs mt-1">
            Configure seu perfil para iniciar a jornada personalizada multiespécies.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {erro && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {erro}
            </div>
          )}

          {/* Dados do Tutor */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>1. Dados do Tutor / Responsável</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Seu Nome *</label>
                <input
                  type="text"
                  required
                  value={tutorNome}
                  onChange={(e) => setTutorNome(e.target.value)}
                  placeholder="Ex: João da Silva"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">WhatsApp / Telefone</label>
                <input
                  type="tel"
                  value={tutorWhatsapp}
                  onChange={(e) => setTutorWhatsapp(e.target.value)}
                  placeholder="Ex: (11) 99999-8888"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <input
                type="email"
                value={tutorEmail}
                onChange={(e) => setTutorEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
              <Heart className="w-3.5 h-3.5 text-indigo-600" />
              <span>2. Dados do Pet</span>
            </div>

            {/* Seleção de Espécie (Cão vs Gato) */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Espécie *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEspecie('Cão')}
                  className={`flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-2xl border font-bold text-sm transition-all ${
                    especie === 'Cão'
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-2 ring-indigo-600/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Dog className="w-5 h-5 text-indigo-600" />
                  <span>Cão (Cachorro)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEspecie('Gato')}
                  className={`flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-2xl border font-bold text-sm transition-all ${
                    especie === 'Gato'
                      ? 'bg-amber-50 border-amber-600 text-amber-800 ring-2 ring-amber-600/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Cat className="w-5 h-5 text-amber-600" />
                  <span>Gato (Felino)</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Nome do Pet *</label>
              <input
                type="text"
                required
                value={petNome}
                onChange={(e) => setPetNome(e.target.value)}
                placeholder={especie === 'Cão' ? 'Ex: Thor, Mel, Bob' : 'Ex: Mingau, Luna, Oliver'}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Raça</label>
                <input
                  type="text"
                  value={raca}
                  onChange={(e) => setRaca(e.target.value)}
                  placeholder={especie === 'Cão' ? 'Ex: Golden, Poodle, SRD' : 'Ex: Siamês, Persa, SRD'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Sexo</label>
                <select
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value as 'Macho' | 'Fêmea')}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50"
                >
                  <option value="Macho">Macho ♂</option>
                  <option value="Fêmea">Fêmea ♀</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  Data de Nascimento (ou aproximada)
                </span>
              </label>
              <input
                type="date"
                value={dataNasc}
                onChange={(e) => setDataNasc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              id="btn-confirm-pet-register"
              className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Continuar para Anamnese & Jornada</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
