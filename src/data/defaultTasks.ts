import { GamifiedTask, Badge, LifeStage, PetSpecies } from '../types';

export function calculateLifeStage(dataNascimento: string): { meses: number; anos: number; estagio: LifeStage; textoIdade: string } {
  if (!dataNascimento) {
    return { meses: 24, anos: 2, estagio: 'ADULTO', textoIdade: 'Adulto' };
  }

  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  
  let meses = (hoje.getFullYear() - nascimento.getFullYear()) * 12 + (hoje.getMonth() - nascimento.getMonth());
  if (hoje.getDate() < nascimento.getDate()) {
    meses--;
  }

  if (meses < 0) meses = 0;
  const anos = Math.floor(meses / 12);
  const mesesRestantes = meses % 12;

  let estagio: LifeStage = 'ADULTO';
  if (meses < 12) {
    estagio = 'FILHOTE';
  } else if (anos >= 8) {
    estagio = 'SENIOR';
  }

  let textoIdade = '';
  if (anos === 0) {
    textoIdade = `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
  } else if (mesesRestantes === 0) {
    textoIdade = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  } else {
    textoIdade = `${anos}a ${mesesRestantes}m`;
  }

  return { meses, anos, estagio, textoIdade };
}

export const INITIAL_TASKS: GamifiedTask[] = [
  // --- OBEDIÊNCIA BÁSICA (CÃES) ---
  {
    id: 'dog_senta',
    titulo: 'Comando "Senta" com Isca (Lure)',
    descricao: 'Ensine o pet a sentar conduzindo o petisco acima do focinho até o bumbum tocar o chão.',
    passoAPasso: [
      'Segure um petisco saboroso próximo ao focinho do cão.',
      'Mova a mão lentamente para cima e para trás da cabeça dele.',
      'Assim que as patas traseiras tocarem o chão, diga "Senta!" e entregue a recompensa.',
      'Repita 5 a 10 vezes em sessões curtas de 2 minutos.'
    ],
    categoria: 'obediencia',
    especieAlvo: 'Cão',
    pontosXp: 35,
    duracaoMinutos: 3,
    icone: 'Bone',
    concluidaHoje: false,
    dicaEspecial: 'Nunca force as costas ou o quadril do pet para baixo. O movimento deve ser natural.'
  },
  {
    id: 'dog_fica',
    titulo: 'Treino de Autocontrole "Fica"',
    descricao: 'Construa a paciência do cão dando 1 passo para trás e recompensando a permanência.',
    passoAPasso: [
      'Peça para o cão sentar.',
      'Abra a palma da mão na frente dele e diga com calma "Fica".',
      'Dê apenas 1 passo para trás, conte 2 segundos e retorne.',
      'Recompense com petisco e carinho verbal antes dele se levantar.'
    ],
    categoria: 'obediencia',
    especieAlvo: 'Cão',
    pontosXp: 40,
    duracaoMinutos: 3,
    icone: 'ShieldCheck',
    concluidaHoje: false,
    dicaEspecial: 'Aumente a distância e o tempo gradativamente, nunca de uma vez.'
  },
  {
    id: 'dog_chamado',
    titulo: 'Recall Positivo: O Chamado Infalível',
    descricao: 'Treine o pet para associar o nome dele e o "Vem" com a melhor coisa do mundo.',
    passoAPasso: [
      'Em local seguro e sem distrações, chame pelo nome com voz alegre: "Vem!"',
      'Abra os braços ou agache para ficar convidativo.',
      'Quando o pet chegar, comemore com festa e um petisco de alto valor.',
      'Repita em momentos aleatórios do dia.'
    ],
    categoria: 'obediencia',
    especieAlvo: 'Cão',
    pontosXp: 45,
    duracaoMinutos: 4,
    icone: 'Zap',
    concluidaHoje: false,
    dicaEspecial: 'Nunca chame o pet pelo nome para dar bronca ou fazer algo que ele não goste.'
  },

  // --- OBEDIÊNCIA & TREINO (GATOS) ---
  {
    id: 'cat_target',
    titulo: 'Target com a Ponta do Dedo / Varinha',
    descricao: 'Ensine o gato a tocar o focinho na ponta do dedo para direcionamento voluntário.',
    passoAPasso: [
      'Aproxime a ponta do dedo indicador a 5cm do focinho do gato.',
      'Quando ele esticar para cheirar e tocar, diga "Isso!" ou faça um click.',
      'Imediatamente ofereça um petisco úmido (sachê / pasta churu).',
      'Faça de 3 a 5 repetições leves.'
    ],
    categoria: 'obediencia',
    especieAlvo: 'Gato',
    pontosXp: 40,
    duracaoMinutos: 2,
    icone: 'Sparkles',
    concluidaHoje: false,
    dicaEspecial: 'Gatos respondem muito melhor a sessões ultra-curtas de 1 a 2 minutos.'
  },
  {
    id: 'cat_caixa_transporte',
    titulo: 'Dessensibilização da Caixa de Transporte',
    descricao: 'Transforme a caixa de transporte em um refúgio seguro e relaxante.',
    passoAPasso: [
      'Deixe a caixa de transporte aberta na sala como uma caminha normal.',
      'Coloque uma manta com o cheiro da mãe/tutor dentro.',
      'Coloque petiscos ou sachê dentro da caixa diariamente sem fechar a porta.',
      'Faça com que ele entre por vontade própria para comer.'
    ],
    categoria: 'obediencia',
    especieAlvo: 'Gato',
    pontosXp: 50,
    duracaoMinutos: 3,
    icone: 'Home',
    concluidaHoje: false,
    dicaEspecial: 'Não feche a porta nos primeiros dias. Construa confiança primeiro!'
  },
  {
    id: 'cat_reconhecer_nome',
    titulo: 'Condicionamento Positivo do Nome',
    descricao: 'Faça o gato olhar e responder prontamente ao ouvir o próprio nome.',
    passoAPasso: [
      'Espere o gato estar calmo e próximo.',
      'Diga o nome dele com tom doce e carinhoso.',
      'Assim que ele virar as orelhas ou olhar nos seus olhos, dê um petisco saboroso.',
      'Repita 4 vezes ao dia.'
    ],
    categoria: 'obediencia',
    especieAlvo: 'Gato',
    pontosXp: 35,
    duracaoMinutos: 2,
    icone: 'Heart',
    concluidaHoje: false
  },

  // --- EDUCAÇÃO SANITÁRIA (CÃES) ---
  {
    id: 'dog_sanitaria_rotina',
    titulo: 'Rotina Estratégica do Tapete Higiênico',
    descricao: 'Aproveite os 3 momentos-chave: acordar, 15min após comer e após brincadeiras intensas.',
    passoAPasso: [
      'Assim que o pet acordar ou após 15min da refeição, leve-o com calma até o tapete.',
      'Fique quieto como uma árvore para não distrair o cão com brincadeiras.',
      'Quando ele fizer o xixi/cocô no local correto, faça festa e dê um petisco nos primeiros 3 segundos.',
      'Limpe acidentes fora do lugar sempre com limpador enzimático (nunca amônia).'
    ],
    categoria: 'sanitaria',
    especieAlvo: 'Cão',
    pontosXp: 45,
    duracaoMinutos: 5,
    icone: 'CheckCircle2',
    concluidaHoje: false,
    dicaEspecial: 'Regra de ouro: o pet só entende a recompensa se ela vier em até 3 segundos do término do xixi.'
  },
  {
    id: 'dog_sanitaria_inspecao',
    titulo: 'Checklist do Banheiro Canino',
    descricao: 'Verifique se o tapete está limpo e longe da comida e da caminha do pet.',
    passoAPasso: [
      'Confira se o tapete higiênico está a pelo menos 2 metros dos potes de ração e água.',
      'Troque a folha se já houver muitas marcas antigas.',
      'Adicione um atrativo sanitário ou gota do próprio xixi se for filhote em aprendizado.'
    ],
    categoria: 'sanitaria',
    especieAlvo: 'Cão',
    pontosXp: 25,
    duracaoMinutos: 2,
    icone: 'Sparkles',
    concluidaHoje: false
  },

  // --- EDUCAÇÃO SANITÁRIA (GATOS) ---
  {
    id: 'cat_sanitaria_areia',
    titulo: 'Protocolo de Ouro da Caixa de Areia',
    descricao: 'Regra N+1 (1 caixa a mais que o número de gatos) e higienização sem odores.',
    passoAPasso: [
      'Peneire a caixa de areia removendo torrões de urina e fezes.',
      'Mantenha camada de 5 a 7cm de areia fina para permitir que o gato enterre bem.',
      'Certifique-se de que a caixa está em local silencioso e com rota de fuga livre.',
      'Nunca use produtos com cheiro forte ou cloro na higienização da caixa.'
    ],
    categoria: 'sanitaria',
    especieAlvo: 'Gato',
    pontosXp: 30,
    duracaoMinutos: 3,
    icone: 'CheckCircle2',
    concluidaHoje: false,
    dicaEspecial: 'Gatos têm olfato 14 vezes mais aguçado que o humano; areias perfumadas podem causar rejeição.'
  },

  // --- ENRIQUECIMENTO AMBIENTAL (CÃES E GATOS) ---
  {
    id: 'enriq_alimentar_kong',
    titulo: 'Enriquecimento Alimentar: Brinquedo Recheável / Tapete de Lamber',
    descricao: 'Reduz ansiedade de separação e estimula o comportamento natural de forrageio.',
    passoAPasso: [
      'Coloque ração úmida, patê ou pasta de amendoim 100% pura (sem xilitol) no brinquedo ou tapete.',
      'Para cães mais experientes ou dias quentes, congele por 2 horas antes de servir.',
      'Entregue ao pet momentos antes de você sair de casa ou para acalmá-lo.',
      'Observe como o ato de lamber libera endorfinas e gera relaxamento.'
    ],
    categoria: 'enriquecimento',
    especieAlvo: 'Todos',
    pontosXp: 40,
    duracaoMinutos: 5,
    icone: 'Cookie',
    concluidaHoje: false,
    dicaEspecial: 'Lamber por 15 minutos cansa a mente do pet mais do que 30 minutos de caminhada rápida!'
  },
  {
    id: 'enriq_sensorial_olfato',
    titulo: 'Enriquecimento Sensorial & Olfativo',
    descricao: 'Trabalho de faro para cães ou Catnip / Silvervine para gatos.',
    passoAPasso: [
      'Para Cães: Espalhe 5 pedacinhos de petisco escondidos em toalhas enroladas ou pela sala.',
      'Para Gatos: Salpique erva do gato (Catnip) em um arranhador de papelão ou brinquedo.',
      'Diga "Procura!" e deixe o pet farejar e explorar livremente no tempo dele.',
      'Não ajude de imediato: estimule a autonomia investigativa.'
    ],
    categoria: 'enriquecimento',
    especieAlvo: 'Todos',
    pontosXp: 35,
    duracaoMinutos: 4,
    icone: 'Compass',
    concluidaHoje: false
  },
  {
    id: 'enriq_cognitivo_caixa',
    titulo: 'Enriquecimento Cognitivo: Caixa Interativa',
    descricao: 'Desenvolva a resolução de problemas através de quebra-cabeças DIY.',
    passoAPasso: [
      'Pegue uma caixa de papelão limpa e sem fitas adesivas.',
      'Coloque rolos de papel higiênico vazios em pé dentro dela.',
      'Distribua grãos de ração dentro dos rolinhos ou amassados em bolas de papel.',
      'Deixe o pet descobrir como tirar o alimento com a pata ou focinho.'
    ],
    categoria: 'enriquecimento',
    especieAlvo: 'Todos',
    pontosXp: 45,
    duracaoMinutos: 5,
    icone: 'Puzzle',
    concluidaHoje: false
  },
  {
    id: 'enriq_fisico_vertical',
    titulo: 'Gatificação & Enriquecimento Físico',
    descricao: 'Rotas de fuga e exploração vertical para gatos, ou circuitos suaves para cães.',
    passoAPasso: [
      'Para Gatos: Limpe o topo de um móvel ou instale prateleira/arranhador alto para visualização.',
      'Para Cães: Crie um circuito leve com almofadas no chão para treino de propriocepção e equilíbrio.',
      'Incentive o pet a subir com petiscos e comandos suaves.'
    ],
    categoria: 'enriquecimento',
    especieAlvo: 'Todos',
    pontosXp: 35,
    duracaoMinutos: 5,
    icone: 'Activity',
    concluidaHoje: false
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge_bem_vindo',
    titulo: 'Boas-Vindas Pet',
    descricao: 'Concluiu o cadastro e a primeira anamnese do pet.',
    icone: 'Award',
    desbloqueada: true,
    dataDesbloqueio: new Date().toISOString(),
    criterio: 'Completar a Anamnese',
    categoria: 'iniciante'
  },
  {
    id: 'badge_primeiro_treino',
    titulo: 'Primeira Pata no Chão',
    descricao: 'Completou a primeira sessão de treino guiado com cronômetro.',
    icone: 'PlayCircle',
    desbloqueada: false,
    criterio: 'Finalizar 1 Treino no Timer',
    categoria: 'obediencia'
  },
  {
    id: 'badge_mestre_sanitario',
    titulo: 'Higiene Nota 10',
    descricao: 'Executou 3 missões de educação sanitária com sucesso.',
    icone: 'CheckCheck',
    desbloqueada: false,
    criterio: '3 Missões Sanitárias',
    categoria: 'sanitaria'
  },
  {
    id: 'badge_rei_enriquecimento',
    titulo: 'Mente Brilhante',
    descricao: 'Completou 5 atividades de enriquecimento ambiental.',
    icone: 'Brain',
    desbloqueada: false,
    criterio: '5 Atividades de Enriquecimento',
    categoria: 'enriquecimento'
  },
  {
    id: 'badge_streak_3',
    titulo: 'Tutor Consistente',
    descricao: 'Alcançou 3 dias consecutivos de jornada gamificada!',
    icone: 'Flame',
    desbloqueada: false,
    criterio: 'Streak de 3 Dias',
    categoria: 'dedicacao'
  },
  {
    id: 'badge_nivel_3',
    titulo: 'Super Pet Formado',
    descricao: 'Alcançou o Nível 3 com mais de 300 XP acumulados.',
    icone: 'Star',
    desbloqueada: false,
    criterio: 'Alcançar Nível 3 (300 XP)',
    categoria: 'dedicacao'
  }
];

export const LEVEL_TIERS = [
  { nivel: 1, minXp: 0, titulo: 'Patinha Aprendiz', cor: 'bg-blue-500' },
  { nivel: 2, minXp: 150, titulo: 'Pet Focado', cor: 'bg-emerald-500' },
  { nivel: 3, minXp: 350, titulo: 'Mestre da Disciplina', cor: 'bg-indigo-500' },
  { nivel: 4, minXp: 650, titulo: 'Super Pet Exemplar', cor: 'bg-amber-500' },
  { nivel: 5, minXp: 1000, titulo: 'Guardião Zen Supremo', cor: 'bg-purple-600' }
];

export function getPetLevelInfo(xp: number) {
  let currentTier = LEVEL_TIERS[0];
  let nextTier = LEVEL_TIERS[1];

  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_TIERS[i].minXp) {
      currentTier = LEVEL_TIERS[i];
      nextTier = LEVEL_TIERS[i + 1] || { nivel: 6, minXp: currentTier.minXp * 1.5, titulo: 'Lenda Pet', cor: 'bg-rose-500' };
      break;
    }
  }

  const xpInLevel = xp - currentTier.minXp;
  const xpNeededForNext = nextTier.minXp - currentTier.minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((xpInLevel / xpNeededForNext) * 100)));

  return {
    nivel: currentTier.nivel,
    titulo: currentTier.titulo,
    cor: currentTier.cor,
    xpAtual: xp,
    xpProximoNivel: nextTier.minXp,
    xpRestante: Math.max(0, nextTier.minXp - xp),
    progressoPercent: progressPercent
  };
}
