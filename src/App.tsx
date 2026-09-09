import React, { useState, useEffect } from 'react';
import { 
  AppState, 
  PetProfile, 
  TutorProfile, 
  GamifiedTask, 
  BoardStage, 
  ModuleId, 
  StageProgress, 
  TrainingLog, 
  AnamneseData, 
  GoogleSheetsConfig, 
  Badge,
  PetAvatarConfig,
  ClickerSoundType,
  TrainingRoutineMode,
  RedeemedCoupon
} from './types';
import { INITIAL_TASKS, INITIAL_BADGES, getPetLevelInfo } from './data/defaultTasks';
import { Navbar } from './components/Navbar';
import { BottomNav, TabType } from './components/BottomNav';
import { PetRegistrationModal } from './components/PetRegistrationModal';
import { BoardGameView } from './components/BoardGameView';
import { GuidedTimerView } from './components/GuidedTimerView';
import { AnamneseView } from './components/AnamneseView';
import { AchievementsView } from './components/AchievementsView';
import { HistoryAndSheetsView } from './components/HistoryAndSheetsView';
import { WelcomeModal } from './components/WelcomeModal';
import { PetAvatarSelectorModal } from './components/PetAvatarSelectorModal';
import { ClickerMarkerModal } from './components/ClickerMarkerModal';
import { RoutineSelectorModal } from './components/RoutineSelectorModal';
import { TreatStoreModal } from './components/TreatStoreModal';
import { BehavioralConsultingModal } from './components/BehavioralConsultingModal';
import { BehavioralProtocolStep } from './types';
import { audioService } from './services/audioService';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEY = 'adestrapet_app_state_v3';

const DEFAULT_STATE: AppState = {
  tutor: {
    id: 'tutor_demo',
    nome: 'Tutor(a)',
    email: 'tutor@adestrapet.com',
    whatsapp: '',
    cidade: ''
  },
  pets: [
    {
      id: 'pet_dog_default',
      nome: 'Thor',
      especie: 'Cão',
      raca: 'Golden Retriever',
      avatarIcon: 'dog',
      sexo: 'Macho',
      tutorId: 'tutor_demo',
      xp: 220,
      nivel: 2,
      streakDias: 3,
      saldoPetiscos: 65,
      somClicker: 'mecanico',
      marcadorVerbal: 'Sim!',
      rotinaTreino: 'iniciante_5m',
      avatarConfig: {
        breedId: 'golden_retriever',
        porte: 'Grande',
        corPelagem: 'Dourado Brilhante'
      },
      cuponsResgatados: [],
      criadoEm: new Date().toISOString(),
      anamnese: {
        especie: 'Cão',
        dataNascimento: '2024-03-15',
        porte: 'Grande',
        pesoKg: 28,
        castrado: true,
        energia: 'Alto',
        tempoSozinho: 'Medio',
        alimentacao: 'Ração Seca',
        marcaAlimento: 'Premier Formula Raças Grandes',
        dataVacina: '2025-01-10',
        dataVermifugo: '2025-01-15',
        planoSaude: 'Sim',
        restricoes: 'Nenhuma',
        desafiosComportamentais: ['Puxar muito na guia no passeio', 'Pular nas visitas para pedir atenção'],
        localNecessidades: 'Grama no passeio e tapete lavável',
        brinquedosFavoritos: 'Bolinha de borracha e mordedor de nylon',
        dataPreenchimento: new Date().toISOString()
      }
    }
  ],
  petAtivoId: 'pet_dog_default',
  tarefasDiarias: INITIAL_TASKS,
  historicoTreinos: [
    {
      id: 'log_seed_1',
      petId: 'pet_dog_default',
      petNome: 'Thor',
      especie: 'Cão',
      dataHora: new Date(Date.now() - 86400000).toISOString(),
      categoria: 'obediencia',
      nomeExercicio: 'Comando "Senta" com Marcador Verbal',
      duracaoSegundos: 120,
      sucessoNota: 5,
      observacoes: 'Excelente foco e resposta imediata ao marcador.',
      xpGanho: 35,
      petiscosGanhos: 20
    }
  ],
  badges: INITIAL_BADGES,
  sheetsConfig: {
    scriptUrl: '',
    nomePlanilha: 'AdestraPet - Banco de Dados de Treinamento',
    autoSync: true,
    statusSincronizacao: 'idle'
  },
  somAtivado: true,
  modulosContratados: {
    obediencia: true,
    enriquecimento: false,
    sanitaria: false,
    sinais_calma: false,
    ansiedade_separacao: false,
    posse_recursos: false,
    posse_ambiente: false
  },
  progressoFases: {
    stage_ob_1: {
      concluida: true,
      estrelas: 3,
      vezesTreinada: 2,
      ultimoTreino: new Date(Date.now() - 86400000).toISOString()
    }
  }
};

export default function App() {
  const [appState, setAppState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATE,
          ...parsed,
          modulosContratados: parsed.modulosContratados || DEFAULT_STATE.modulosContratados,
          progressoFases: parsed.progressoFases || DEFAULT_STATE.progressoFases,
          tarefasDiarias: parsed.tarefasDiarias || INITIAL_TASKS,
          badges: parsed.badges || INITIAL_BADGES
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_STATE;
  });

  const [tabAtiva, setTabAtiva] = useState<TabType>('tabuleiro');
  const [tarefaTimerSelecionada, setTarefaTimerSelecionada] = useState<GamifiedTask | BoardStage | null>(null);
  
  // Modals state
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);
  const [showMarkerModal, setShowMarkerModal] = useState<boolean>(false);
  const [showRoutineModal, setShowRoutineModal] = useState<boolean>(false);
  const [showTreatStoreModal, setShowTreatStoreModal] = useState<boolean>(false);
  const [showBehavioralModal, setShowBehavioralModal] = useState<boolean>(false);
  const [activeBehavioralProtocolId, setActiveBehavioralProtocolId] = useState<'ansiedade_separacao' | 'posse_recursos' | 'posse_ambiente'>('ansiedade_separacao');

  // Sincroniza áudio com o serviço
  useEffect(() => {
    audioService.setSoundEnabled(appState.somAtivado);
  }, [appState.somAtivado]);

  // Salva no LocalStorage sempre que o estado muda
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch {
      // ignore
    }
  }, [appState]);

  // Pet ativo atual
  const petAtivo = appState.pets.find((p) => p.id === appState.petAtivoId) || appState.pets[0] || null;

  // Verificação automática de badges desbloqueáveis
  const checkAndUnlockBadges = (updatedPets: PetProfile[], logs: TrainingLog[]) => {
    const currentPet = updatedPets.find(p => p.id === appState.petAtivoId);
    if (!currentPet) return appState.badges;

    return appState.badges.map((b) => {
      if (b.desbloqueada) return b;
      let shouldUnlock = false;

      if (b.id === 'badge_primeiro_treino' && logs.length >= 1) {
        shouldUnlock = true;
      } else if (b.id === 'badge_mestre_sanitario' && logs.filter(l => l.categoria === 'sanitaria').length >= 3) {
        shouldUnlock = true;
      } else if (b.id === 'badge_rei_enriquecimento' && logs.filter(l => l.categoria === 'enriquecimento').length >= 5) {
        shouldUnlock = true;
      } else if (b.id === 'badge_streak_3' && currentPet.streakDias >= 3) {
        shouldUnlock = true;
      } else if (b.id === 'badge_nivel_3' && currentPet.xp >= 300) {
        shouldUnlock = true;
      }

      if (shouldUnlock) {
        audioService.playSuccessChime();
        return {
          ...b,
          desbloqueada: true,
          dataDesbloqueio: new Date().toISOString()
        };
      }
      return b;
    });
  };

  // Concluir fase do Tabuleiro
  const handleCompleteBoardStage = (stageId: string, stars: 1 | 2 | 3, xpRecompensa: number) => {
    if (!petAtivo) return;

    const progressoAtual = appState.progressoFases || {};
    const faseAnterior = progressoAtual[stageId];
    const vezesTreinada = (faseAnterior?.vezesTreinada || 0) + 1;
    const petiscosGanhos = stars * 8;

    const novoProgresso: Record<string, StageProgress> = {
      ...progressoAtual,
      [stageId]: {
        concluida: true,
        estrelas: stars,
        vezesTreinada,
        ultimoTreino: new Date().toISOString()
      }
    };

    const petsAtualizados = appState.pets.map((p) => {
      if (p.id === petAtivo.id) {
        const novoXp = p.xp + xpRecompensa;
        const levelInfo = getPetLevelInfo(novoXp);
        const novoSaldo = (p.saldoPetiscos ?? Math.floor(p.xp / 5)) + petiscosGanhos;
        return {
          ...p,
          xp: novoXp,
          nivel: levelInfo.nivel,
          saldoPetiscos: novoSaldo,
          streakDias: p.streakDias + (faseAnterior?.concluida ? 0 : 1)
        };
      }
      return p;
    });

    const updatedBadges = checkAndUnlockBadges(petsAtualizados, appState.historicoTreinos);

    setAppState((prev) => ({
      ...prev,
      progressoFases: novoProgresso,
      pets: petsAtualizados,
      badges: updatedBadges
    }));
  };

  // Abrir o cronômetro para uma fase do tabuleiro
  const handleLaunchTimerForStage = (stage: BoardStage) => {
    setTarefaTimerSelecionada(stage);
    setTabAtiva('treino');
  };

  // Alternar contratação de módulo
  const handleToggleModuleStatus = (moduleId: ModuleId) => {
    setAppState((prev) => {
      const atuais = prev.modulosContratados || {
        obediencia: true,
        enriquecimento: false,
        sanitaria: false,
        sinais_calma: false
      };
      return {
        ...prev,
        modulosContratados: {
          ...atuais,
          [moduleId]: !atuais[moduleId]
        }
      };
    });
  };

  // Desbloquear todos os módulos (Combo VIP)
  const handleUnlockAllModules = () => {
    setAppState((prev) => ({
      ...prev,
      modulosContratados: {
        obediencia: true,
        enriquecimento: true,
        sanitaria: true,
        sinais_calma: true,
        ansiedade_separacao: true,
        posse_recursos: true,
        posse_ambiente: true
      }
    }));
  };

  // Abrir Protocolo de Consultoria Comportamental Autônoma
  const handleOpenBehavioralProtocol = (protocolId: 'ansiedade_separacao' | 'posse_recursos' | 'posse_ambiente') => {
    setActiveBehavioralProtocolId(protocolId);
    setShowBehavioralModal(true);
  };

  // Iniciar timer guiado para uma micro-etapa de consultoria comportamental
  const handleLaunchTimerForBehavioralStage = (protocoloId: string, etapa: BehavioralProtocolStep) => {
    const customStage: BoardStage = {
      id: `stage_behav_${protocoloId}_${etapa.etapaNumero}`,
      moduloId: protocoloId as ModuleId,
      ordem: etapa.etapaNumero,
      titulo: etapa.titulo,
      subtitulo: etapa.duracaoSugerida,
      descricao: etapa.objetivo,
      motivoEUtilidade: etapa.criterioAvanco,
      passoAPasso: etapa.oQueFazer,
      microEtapas: etapa.microEtapas,
      xpRecompensa: 60,
      duracaoMinutos: 5,
      especieAlvo: 'Cão',
      icone: protocoloId === 'ansiedade_separacao' ? 'Home' : protocoloId === 'posse_recursos' ? 'Bone' : 'Compass',
      tipoFase: 'comum'
    };
    setTarefaTimerSelecionada(customStage);
    setShowBehavioralModal(false);
    setTabAtiva('treino');
  };

  // Salvar sessão de treino do timer
  const handleSaveTrainingLog = (log: TrainingLog, petiscosGanhos: number) => {
    const novosLogs = [log, ...appState.historicoTreinos];

    const petsAtualizados = appState.pets.map((p) => {
      if (p.id === log.petId) {
        const novoXp = p.xp + log.xpGanho;
        const levelInfo = getPetLevelInfo(novoXp);
        const novoSaldo = (p.saldoPetiscos ?? Math.floor(p.xp / 5)) + petiscosGanhos;
        return {
          ...p,
          xp: novoXp,
          nivel: levelInfo.nivel,
          saldoPetiscos: novoSaldo,
          ultimoTreinoData: new Date().toISOString()
        };
      }
      return p;
    });

    const updatedBadges = checkAndUnlockBadges(petsAtualizados, novosLogs);

    setAppState((prev) => ({
      ...prev,
      historicoTreinos: novosLogs,
      pets: petsAtualizados,
      badges: updatedBadges
    }));
  };

  // Salvar Anamnese
  const handleSaveAnamnese = (anamnese: AnamneseData) => {
    if (!petAtivo) return;

    const petsAtualizados = appState.pets.map((p) => {
      if (p.id === petAtivo.id) {
        return {
          ...p,
          especie: anamnese.especie,
          anamnese
        };
      }
      return p;
    });

    setAppState((prev) => ({
      ...prev,
      pets: petsAtualizados
    }));
  };

  // Salvar Customização de Avatar
  const handleSaveAvatar = (avatarConfig: PetAvatarConfig, racaNome: string) => {
    if (!petAtivo) return;

    const petsAtualizados = appState.pets.map((p) => {
      if (p.id === petAtivo.id) {
        return {
          ...p,
          raca: racaNome,
          avatarConfig
        };
      }
      return p;
    });

    setAppState((prev) => ({
      ...prev,
      pets: petsAtualizados
    }));
  };

  // Salvar Configuração de Marcador / Clicker
  const handleSaveMarkerConfig = (som: ClickerSoundType, palavra: string) => {
    if (!petAtivo) return;

    const petsAtualizados = appState.pets.map((p) => {
      if (p.id === petAtivo.id) {
        return {
          ...p,
          somClicker: som,
          marcadorVerbal: palavra
        };
      }
      return p;
    });

    setAppState((prev) => ({
      ...prev,
      pets: petsAtualizados
    }));
  };

  // Salvar Rotina de Treino
  const handleSaveRoutineMode = (rotina: TrainingRoutineMode) => {
    if (!petAtivo) return;

    const petsAtualizados = appState.pets.map((p) => {
      if (p.id === petAtivo.id) {
        return {
          ...p,
          rotinaTreino: rotina
        };
      }
      return p;
    });

    setAppState((prev) => ({
      ...prev,
      pets: petsAtualizados
    }));
  };

  // Resgatar Item da Loja de Petiscos
  const handleRedeemTreatItem = (cupom: RedeemedCoupon, custoPetiscos: number) => {
    if (!petAtivo) return;

    const petsAtualizados = appState.pets.map((p) => {
      if (p.id === petAtivo.id) {
        const saldoAtual = p.saldoPetiscos ?? Math.floor(p.xp / 5);
        const novoSaldo = Math.max(0, saldoAtual - custoPetiscos);
        const cuponsAtuais = p.cuponsResgatados || [];
        return {
          ...p,
          saldoPetiscos: novoSaldo,
          cuponsResgatados: [cupom, ...cuponsAtuais]
        };
      }
      return p;
    });

    setAppState((prev) => ({
      ...prev,
      pets: petsAtualizados
    }));
  };

  // Registrar novo pet / tutor
  const handleRegister = (tutor: TutorProfile, novoPet: PetProfile, goToAnamnese: boolean) => {
    const petsAtualizados = [...appState.pets, novoPet];

    setAppState((prev) => ({
      ...prev,
      tutor,
      pets: petsAtualizados,
      petAtivoId: novoPet.id
    }));

    setShowRegisterModal(false);

    if (goToAnamnese) {
      setTabAtiva('anamnese');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        pets={appState.pets}
        petAtivo={petAtivo}
        onSelectPet={(id) => setAppState((prev) => ({ ...prev, petAtivoId: id }))}
        onOpenNewPetModal={() => setShowRegisterModal(true)}
        onOpenWelcome={() => setShowWelcomeModal(true)}
        onOpenTreatStore={() => setShowTreatStoreModal(true)}
        onOpenAvatarSelector={() => setShowAvatarModal(true)}
        sheetsConfig={appState.sheetsConfig}
        somAtivado={appState.somAtivado}
        onToggleSom={() => setAppState((prev) => ({ ...prev, somAtivado: !prev.somAtivado }))}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-xl mx-auto px-4 pt-5">
        <AnimatePresence mode="wait">
          {tabAtiva === 'tabuleiro' && petAtivo && (
            <motion.div
              key="tabuleiro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <BoardGameView
                pet={petAtivo}
                progressoFases={appState.progressoFases || {}}
                modulosContratados={appState.modulosContratados || { obediencia: true, enriquecimento: false, sanitaria: false, sinais_calma: false }}
                onCompleteStage={handleCompleteBoardStage}
                onLaunchTimerForStage={handleLaunchTimerForStage}
                onToggleModuleStatus={handleToggleModuleStatus}
                onUnlockAllModules={handleUnlockAllModules}
                onNavigateToAnamnese={() => setTabAtiva('anamnese')}
                onOpenTreatStore={() => setShowTreatStoreModal(true)}
                onOpenBehavioralProtocol={handleOpenBehavioralProtocol}
              />
            </motion.div>
          )}

          {tabAtiva === 'treino' && petAtivo && (
            <motion.div
              key="treino"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <GuidedTimerView
                pet={petAtivo}
                tarefaSelecionada={tarefaTimerSelecionada}
                sheetsConfig={appState.sheetsConfig}
                onSaveLog={handleSaveTrainingLog}
                onNavigateToHistory={() => setTabAtiva('historico')}
                onOpenMarkerModal={() => setShowMarkerModal(true)}
                onOpenRoutineModal={() => setShowRoutineModal(true)}
                onOpenTreatStore={() => setShowTreatStoreModal(true)}
              />
            </motion.div>
          )}

          {tabAtiva === 'anamnese' && petAtivo && (
            <motion.div
              key="anamnese"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <AnamneseView
                pet={petAtivo}
                tutor={appState.tutor}
                sheetsConfig={appState.sheetsConfig}
                onSaveAnamnese={handleSaveAnamnese}
                onNavigateToJourney={() => setTabAtiva('tabuleiro')}
                onOpenBehavioralProtocol={handleOpenBehavioralProtocol}
              />
            </motion.div>
          )}

          {tabAtiva === 'conquistas' && petAtivo && (
            <motion.div
              key="conquistas"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <AchievementsView
                pet={petAtivo}
                badges={appState.badges}
                onOpenTreatStore={() => setShowTreatStoreModal(true)}
              />
            </motion.div>
          )}

          {tabAtiva === 'historico' && (
            <motion.div
              key="historico"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <HistoryAndSheetsView
                appState={appState}
                onUpdateSheetsConfig={(cfg) => setAppState((prev) => ({ ...prev, sheetsConfig: cfg }))}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        tabAtiva={tabAtiva}
        onSelectTab={(tab) => setTabAtiva(tab)}
        temAnamnese={Boolean(petAtivo?.anamnese?.dataNascimento)}
      />

      {/* Pet / Tutor Registration Modal */}
      <PetRegistrationModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
        currentTutor={appState.tutor}
        isFirstPet={appState.pets.length === 0}
      />

      {/* Welcome & Method Presentation Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        petNome={petAtivo?.nome || 'seu Pet'}
        petEspecie={petAtivo?.especie || 'Cão'}
      />

      {/* Pet Avatar Customizer Modal */}
      {petAtivo && (
        <PetAvatarSelectorModal
          isOpen={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          pet={petAtivo}
          onSaveAvatar={handleSaveAvatar}
        />
      )}

      {/* Clicker & Verbal Marker Modal */}
      {petAtivo && (
        <ClickerMarkerModal
          isOpen={showMarkerModal}
          onClose={() => setShowMarkerModal(false)}
          pet={petAtivo}
          onSaveConfig={handleSaveMarkerConfig}
        />
      )}

      {/* Routine Selector Modal */}
      {petAtivo && (
        <RoutineSelectorModal
          isOpen={showRoutineModal}
          onClose={() => setShowRoutineModal(false)}
          pet={petAtivo}
          onSelectRoutine={handleSaveRoutineMode}
        />
      )}

      {/* Treat Store / Rewards Modal */}
      {petAtivo && (
        <TreatStoreModal
          isOpen={showTreatStoreModal}
          onClose={() => setShowTreatStoreModal(false)}
          pet={petAtivo}
          onRedeemItem={handleRedeemTreatItem}
        />
      )}

      {/* Behavioral Consulting Protocols Modal */}
      {petAtivo && (
        <BehavioralConsultingModal
          isOpen={showBehavioralModal}
          onClose={() => setShowBehavioralModal(false)}
          pet={petAtivo}
          initialProtocolId={activeBehavioralProtocolId}
          onLaunchTimerForBehavioralStage={handleLaunchTimerForBehavioralStage}
        />
      )}
    </div>
  );
}


