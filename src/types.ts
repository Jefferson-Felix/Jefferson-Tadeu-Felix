export type PetSpecies = 'Cão' | 'Gato';

export type LifeStage = 'FILHOTE' | 'ADULTO' | 'SENIOR';

export type EnergyLevel = 'Muito Baixo' | 'Moderado' | 'Alto';

export type AloneTime = 'Pouco' | 'Medio' | 'Muito';

export type FoodType = 'Ração Seca' | 'Ração Úmida' | 'Alimentação Natural' | 'Mista';

export type HealthRestriction = 'Nenhuma' | 'Coluna/Articular' | 'Cardíaco' | 'Alergia/Dermatite' | 'Sobrepeso' | 'Outro';

export type TaskCategory = 
  | 'obediencia' 
  | 'sanitaria' 
  | 'enriquecimento' 
  | 'sinais_calma' 
  | 'saude'
  | 'ansiedade_separacao'
  | 'posse_recursos'
  | 'posse_ambiente';

export type ModuleId = 
  | 'obediencia' 
  | 'enriquecimento' 
  | 'sanitaria' 
  | 'sinais_calma'
  | 'ansiedade_separacao'
  | 'posse_recursos'
  | 'posse_ambiente';

export type TrainingRoutineMode = 'micro_doses' | 'iniciante_5m' | 'intermediario_10m' | 'avancado_15m';

export type ClickerSoundType = 'mecanico' | 'crisp' | 'suave' | 'apito' | 'verbal';

export type AvatarBreedId = 
  | 'caramelo' 
  | 'fiapo_de_manga' 
  | 'pequeno_peludo' 
  | 'pequeno_pelocurto' 
  | 'golden_retriever' 
  | 'border_collie' 
  | 'pastor_alemao' 
  | 'malinois' 
  | 'doberman'
  | 'pitbull'
  | 'gato_rajado'
  | 'gato_siames'
  | 'gato_laranja'
  | 'gato_preto';

export interface PetAvatarConfig {
  breedId: AvatarBreedId;
  corPelagem: string; // Ex: 'Caramelo Tradicional', 'Preto & Branco', 'Dourado', etc.
  porte: 'Pequeno' | 'Médio' | 'Grande' | 'Gigante';
}

export interface TreatRewardItem {
  id: string;
  nome: string;
  categoria: 'petiscos_naturais' | 'mordedores_ossos' | 'brinquedos' | 'acessorios' | 'consultoria';
  descricao: string;
  marcaParceira: string;
  precoEstimado: string;
  custoPetiscos: number; // Petiscos necessários para resgatar
  descontoValor: string; // Ex: "15% OFF" ou "R$ 15,00 OFF"
  codigoCupom: string;
  icone: string;
  beneficioComportamental: string;
  linkParceiro?: string;
}

export interface RedeemedCoupon {
  id: string;
  itemId: string;
  itemNome: string;
  codigoCupom: string;
  descontoValor: string;
  dataResgate: string;
  petNome: string;
  marcaParceira: string;
}

export interface BoardMicroStep {
  id: string;
  ordem: number;
  titulo: string;
  descricao: string;
  criterioSucesso: string;
  repeticoesRecomendadas: number;
}

export interface BoardStage {
  id: string;
  moduloId: ModuleId;
  ordem: number; // 1, 2, 3, 4, 5, 6...
  titulo: string;
  subtitulo: string;
  descricao: string;
  motivoEUtilidade: string; // Explicação clara de por que ensinar e como usar no dia a dia
  passoAPasso: string[];
  microEtapas?: BoardMicroStep[]; // Micro-fases de progressão milimétrica
  dicaEspecial?: string;
  xpRecompensa: number;
  duracaoMinutos: number;
  especieAlvo: 'Todos' | PetSpecies;
  icone: string;
  tipoFase: 'comum' | 'desafio' | 'boss' | 'recompensa';
}

export interface TrainingModuleInfo {
  id: ModuleId;
  nome: string;
  subtitulo: string;
  descricao: string;
  icone: string;
  cor: string;
  bgGradiente: string;
  precoExibicao: string;
  beneficios: string[];
  faseGratisAte: number;
}

export interface StageProgress {
  concluida: boolean;
  estrelas: 0 | 1 | 2 | 3;
  vezesTreinada: number;
  ultimoTreino?: string;
  microEtapasConcluidas?: string[]; // IDs das micro-fases concluídas
}

export interface TutorProfile {
  id: string;
  nome: string;
  email: string;
  whatsapp?: string;
  cidade?: string;
}

export interface AnamneseData {
  especie: PetSpecies;
  dataNascimento: string; // YYYY-MM-DD
  porte: 'Pequeno' | 'Médio' | 'Grande' | 'Gigante';
  pesoKg?: number;
  castrado: boolean;
  energia: EnergyLevel;
  tempoSozinho: AloneTime;
  alimentacao: FoodType;
  marcaAlimento: string;
  dataVacina?: string;
  dataVermifugo?: string;
  planoSaude: 'Sim' | 'Não' | 'Já possui';
  restricoes: HealthRestriction;
  desafiosComportamentais: string[];
  localNecessidades: string; // ex: tapete higiênico, grama, caixa de areia fechada
  brinquedosFavoritos: string;
  dataPreenchimento: string;
}

export interface PetProfile {
  id: string;
  nome: string;
  especie: PetSpecies;
  raca: string;
  avatarIcon: string;
  avatarConfig?: PetAvatarConfig;
  rotinaTreino?: TrainingRoutineMode;
  saldoPetiscos?: number; // Moeda de petiscos de alto valor acumulada
  somClicker?: ClickerSoundType;
  marcadorVerbal?: string;
  cuponsResgatados?: RedeemedCoupon[];
  sexo: 'Macho' | 'Fêmea';
  tutorId: string;
  anamnese?: AnamneseData;
  xp: number;
  nivel: number;
  streakDias: number;
  ultimoTreinoData?: string;
  criadoEm: string;
}

export interface GamifiedTask {
  id: string;
  titulo: string;
  descricao: string;
  passoAPasso: string[];
  categoria: TaskCategory;
  especieAlvo: 'Todos' | PetSpecies;
  estagioAlvo?: LifeStage | 'Todos';
  pontosXp: number;
  duracaoMinutos: number;
  icone: string;
  concluidaHoje: boolean;
  dicaEspecial?: string;
}

export interface TrainingLog {
  id: string;
  petId: string;
  petNome: string;
  especie: PetSpecies;
  dataHora: string;
  categoria: TaskCategory;
  nomeExercicio: string;
  duracaoSegundos: number;
  sucessoNota: 1 | 2 | 3 | 4 | 5;
  observacoes: string;
  xpGanho: number;
  petiscosGanhos?: number;
}

export interface Badge {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  desbloqueada: boolean;
  dataDesbloqueio?: string;
  criterio: string;
  categoria: 'iniciante' | 'obediencia' | 'sanitaria' | 'enriquecimento' | 'dedicacao';
}

export interface GoogleSheetsConfig {
  scriptUrl: string;
  nomePlanilha: string;
  autoSync: boolean;
  ultimaSincronizacao?: string;
  statusSincronizacao: 'idle' | 'syncing' | 'success' | 'error';
  mensagemErro?: string;
}

export interface BehavioralProtocolStep {
  etapaNumero: number;
  titulo: string;
  duracaoSugerida: string;
  objetivo: string;
  oQueFazer: string[];
  oQueNUNCAFazer: string[];
  criterioAvanco: string;
  sinaisDeAlerta: string[];
  microEtapas?: BoardMicroStep[];
}

export interface BehavioralProtocol {
  id: 'ansiedade_separacao' | 'posse_recursos' | 'posse_ambiente';
  titulo: string;
  subtitulo: string;
  categoriaNome: string;
  icone: string;
  cor: string;
  bgGradiente: string;
  regraDeOuro: string;
  porQueAcontece: string;
  tempoMedioEstimado: string;
  etapas: BehavioralProtocolStep[];
  faqDoTutor: { pergunta: string; resposta: string }[];
}

export interface AppState {
  tutor: TutorProfile;
  pets: PetProfile[];
  petAtivoId: string;
  tarefasDiarias: GamifiedTask[];
  historicoTreinos: TrainingLog[];
  badges: Badge[];
  sheetsConfig: GoogleSheetsConfig;
  somAtivado: boolean;
  rotinaGlobal?: TrainingRoutineMode;
  cuponsResgatados?: RedeemedCoupon[];
  progressoFases?: Record<string, StageProgress>;
  modulosContratados?: Record<ModuleId, boolean>;
  ultimoDadoBonus?: { data: string; valor: number; xp: number };
}
