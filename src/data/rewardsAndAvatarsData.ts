import { TreatRewardItem, AvatarBreedId, TrainingRoutineMode } from '../types';

export interface BreedOption {
  id: AvatarBreedId;
  nome: string;
  subtitulo: string;
  especie: 'Cão' | 'Gato';
  emoji: string;
  avatarIcon: string;
  porteSugerido: 'Pequeno' | 'Médio' | 'Grande' | 'Gigante';
  coresDisponiveis: string[];
  descricao: string;
  bgGradiente: string;
}

export const AVATAR_BREEDS: BreedOption[] = [
  {
    id: 'caramelo',
    nome: 'Vira-lata Caramelo',
    subtitulo: 'Patrimônio Afetivo Brasileiro',
    especie: 'Cão',
    emoji: '🐕',
    avatarIcon: 'dog',
    porteSugerido: 'Médio',
    coresDisponiveis: ['Caramelo Tradicional', 'Caramelo Dourado', 'Caramelo Escuro / Tostado'],
    descricao: 'Inteligência pura, alta adaptabilidade e amor incondicional. O rei dos lares brasileiros.',
    bgGradiente: 'from-amber-500 to-amber-700'
  },
  {
    id: 'fiapo_de_manga',
    nome: 'Fiapo de Manga',
    subtitulo: 'Terrier & Peludinho Despenteado',
    especie: 'Cão',
    emoji: '🐶',
    avatarIcon: 'dog',
    porteSugerido: 'Pequeno',
    coresDisponiveis: ['Loirinho Fiapento', 'Grisalho Despenteado', 'Preto & Bege Fiapo'],
    descricao: 'Aquele cãozinho charmoso, com pelinhos rebeldes para todo lado, super carismático e brincalhão.',
    bgGradiente: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'pequeno_peludo',
    nome: 'Cão Pequeno Peludo',
    subtitulo: 'Shih Tzu / Spitz / Maltês / Poodle',
    especie: 'Cão',
    emoji: '🐩',
    avatarIcon: 'dog',
    porteSugerido: 'Pequeno',
    coresDisponiveis: ['Branco Neve', 'Bicolor Marrom & Branco', 'Dourado / Laranja', 'Preto & Branco'],
    descricao: 'Pelagem longa, expressiva e fofa. Excelente cão de companhia para apartamentos.',
    bgGradiente: 'from-orange-400 to-amber-500'
  },
  {
    id: 'pequeno_pelocurto',
    nome: 'Cão Pequeno Pelo Curto',
    subtitulo: 'Pinscher / Pug / Dachshund / Chihuahua',
    especie: 'Cão',
    emoji: '🐕‍🦺',
    avatarIcon: 'dog',
    porteSugerido: 'Pequeno',
    coresDisponiveis: ['Preto & Castanho (Black & Tan)', 'Abricó / Creme', 'Preto Sólido', 'Chocolate'],
    descricao: 'Olhar sempre atento, ágil, esperto e pronto para qualquer comando.',
    bgGradiente: 'from-rose-500 to-red-700'
  },
  {
    id: 'golden_retriever',
    nome: 'Golden & Labrador Retriever',
    subtitulo: 'Dócil, Brincalhão & Guloso',
    especie: 'Cão',
    emoji: '🦮',
    avatarIcon: 'dog',
    porteSugerido: 'Grande',
    coresDisponiveis: ['Dourado Claro', 'Dourado Escuro', 'Amarelo Creme', 'Chocolate', 'Preto'],
    descricao: 'Focado no tutor, adora água e brinquedos, extremamente motivado por petiscos.',
    bgGradiente: 'from-yellow-400 to-amber-600'
  },
  {
    id: 'border_collie',
    nome: 'Border Collie',
    subtitulo: 'Gênio do Foco & Inteligência',
    especie: 'Cão',
    emoji: '🐕',
    avatarIcon: 'dog',
    porteSugerido: 'Médio',
    coresDisponiveis: ['Preto & Branco Clássico', 'Blue Merle', 'Tricolor', 'Marrom & Branco (Red)'],
    descricao: 'Capacidade cognitiva fora da curva, aprende comandos com pouquíssimas repetições.',
    bgGradiente: 'from-slate-700 to-slate-900'
  },
  {
    id: 'pastor_alemao',
    nome: 'Pastor Alemão',
    subtitulo: 'Nobre, Protetor & Leal',
    especie: 'Cão',
    emoji: '🐺',
    avatarIcon: 'dog',
    porteSugerido: 'Grande',
    coresDisponiveis: ['Capa Preta Tradicional', 'Sable / Cinzento', 'Preto Sólido'],
    descricao: 'Fidelidade absoluta, obediência sólida e instinto protetor equilibrado.',
    bgGradiente: 'from-stone-700 to-amber-950'
  },
  {
    id: 'malinois',
    nome: 'Pastor Belga Malinois',
    subtitulo: 'Alta Performance & Foco a Laser',
    especie: 'Cão',
    emoji: '🐕‍🦺',
    avatarIcon: 'dog',
    porteSugerido: 'Grande',
    coresDisponiveis: ['Fawn com Máscara Negra', 'Carvoeiro Escuro', 'Mogno Avermelhado'],
    descricao: 'O atleta de elite dos cães de trabalho. Muita energia, agilidade e impulso de presa controlado.',
    bgGradiente: 'from-amber-700 to-neutral-900'
  },
  {
    id: 'doberman',
    nome: 'Dobermann',
    subtitulo: 'Atlético, Elegante & Vigilante',
    especie: 'Cão',
    emoji: '🐕',
    avatarIcon: 'dog',
    porteSugerido: 'Grande',
    coresDisponiveis: ['Preto & Fogo (Black & Rust)', 'Marrom & Fogo (Red & Rust)', 'Azul / Cinza'],
    descricao: 'Postura imponente, velocidade incomparável e amor profundo à sua família.',
    bgGradiente: 'from-neutral-800 to-rose-950'
  },
  {
    id: 'pitbull',
    nome: 'Pitbull & American Bully',
    subtitulo: 'Musculoso, Carinhoso & Forte',
    especie: 'Cão',
    emoji: '🐶',
    avatarIcon: 'dog',
    porteSugerido: 'Médio',
    coresDisponiveis: ['Blue Nose (Cinza)', 'Red Nose (Castanho)', 'Branco Malhado', 'Preto'],
    descricao: 'Coração gigante e força física. Ama mordedores naturais e brincadeiras de cabo de guerra.',
    bgGradiente: 'from-indigo-700 to-slate-900'
  },
  {
    id: 'gato_rajado',
    nome: 'Gato Rajado (Tabby)',
    subtitulo: 'Felino Ágil & Curioso',
    especie: 'Gato',
    emoji: '🐱',
    avatarIcon: 'cat',
    porteSugerido: 'Pequeno',
    coresDisponiveis: ['Tigrado Cinza & Preto', 'Marrom Rajado Clássico', 'Prateado'],
    descricao: 'Instinto caçador aguçado, adora alvos móveis e sessões curtas com clicker.',
    bgGradiente: 'from-teal-600 to-slate-800'
  },
  {
    id: 'gato_laranja',
    nome: 'Gato Laranja',
    subtitulo: 'Carismático, Brincalhão & Guloso',
    especie: 'Gato',
    emoji: '🐈',
    avatarIcon: 'cat',
    porteSugerido: 'Pequeno',
    coresDisponiveis: ['Laranja Listrado', 'Creme Alaranjado Claro', 'Laranja & Branco'],
    descricao: 'Famoso pela personalidade divertida e carinhosa. Responde muito bem a sachê e petiscos úmidos.',
    bgGradiente: 'from-orange-500 to-amber-700'
  },
  {
    id: 'gato_siames',
    nome: 'Gato Siamês',
    subtitulo: 'Elegante, Vocal & Conectado',
    especie: 'Gato',
    emoji: '🐈',
    avatarIcon: 'cat',
    porteSugerido: 'Pequeno',
    coresDisponiveis: ['Seal Point (Creme & Marrom)', 'Blue Point (Creme & Cinza)', 'Chocolate Point'],
    descricao: 'Olhos azuis penetrantes e alta comunicação vocal com o tutor.',
    bgGradiente: 'from-indigo-800 to-slate-900'
  },
  {
    id: 'gato_preto',
    nome: 'Gato Preto Ébano',
    subtitulo: 'Misterioso, Doce & Afetuoso',
    especie: 'Gato',
    emoji: '🐈‍⬛',
    avatarIcon: 'cat',
    porteSugerido: 'Pequeno',
    coresDisponiveis: ['Preto Ébano Brilhante', 'Preto com Mecha Branca'],
    descricao: 'Pelagem brilhante e temperamento calmo, super companheiro de rotina.',
    bgGradiente: 'from-slate-900 to-zinc-950'
  }
];

export interface RoutineModeInfo {
  id: TrainingRoutineMode;
  nome: string;
  tempoSugerido: string;
  icone: string;
  badge: string;
  descricao: string;
  comoAplicar: string;
  duracaoPadraoSegundos: number;
}

export const TRAINING_ROUTINES: RoutineModeInfo[] = [
  {
    id: 'micro_doses',
    nome: 'Micro-Doses de Rotina',
    tempoSugerido: '1 a 2 min (várias vezes ao dia)',
    icone: 'Zap',
    badge: '⚡ Super Flexível',
    descricao: 'Ideal para tutores com rotina corrida. Treine aproveitando os micropontos do dia a dia.',
    comoAplicar: 'Faça 3 repetições antes de abrir a porta, 3 antes de colocar o prato de comida e 2 no sofá.',
    duracaoPadraoSegundos: 90
  },
  {
    id: 'iniciante_5m',
    nome: 'Modo Iniciante / Filhote',
    tempoSugerido: '5 min por dia',
    icone: 'Clock',
    badge: '🟢 Foco Curto',
    descricao: 'Perfeito para filhotes ou cães no início da aprendizagem de comandos básicos.',
    comoAplicar: 'Uma sessão rápida e divertida de 5 minutos diários mantendo o pet sempre querendo mais.',
    duracaoPadraoSegundos: 300
  },
  {
    id: 'intermediario_10m',
    nome: 'Modo Intermediário',
    tempoSugerido: '10 min por dia',
    icone: 'Activity',
    badge: '🟡 Consistente',
    descricao: 'Equilíbrio ideal para fixar comandos de autocontrole como Place, Fica e Passeio sem puxar.',
    comoAplicar: 'Pode ser feita em 1 bloco de 10 minutos ou dividida em 2 blocos de 5 minutos (manhã e noite).',
    duracaoPadraoSegundos: 600
  },
  {
    id: 'avancado_15m',
    nome: 'Modo Avançado / Atleta',
    tempoSugerido: '15 min por dia',
    icone: 'Flame',
    badge: '🟣 Alta Performance',
    descricao: 'Para cães de alta energia, truques complexos encadeados e treinos com distrações externas.',
    comoAplicar: 'Treinos estruturados com aquecimento, repetições de precisão e encerramento com festa.',
    duracaoPadraoSegundos: 900
  }
];

export const TREAT_REWARD_ITEMS: TreatRewardItem[] = [
  {
    id: 'treat_orelha_bovina',
    nome: 'Orelha Bovina Desidratada (100% Natural)',
    categoria: 'petiscos_naturais',
    descricao: 'Mastigável natural de longa duração, rico em cartilagem e colágeno. Alivia ansiedade e limpa dentes.',
    marcaParceira: 'Petiscaria Natural Brasil',
    precoEstimado: 'R$ 28,90 / pacote',
    custoPetiscos: 80,
    descontoValor: '15% OFF',
    codigoCupom: 'ADESTRA-ORELHA15',
    icone: '🥩',
    beneficioComportamental: 'Estimula a mastigação calmante e secreção de endorfinas que relaxam o cão.',
    linkParceiro: 'https://wa.me/?text=Gostaria%20de%20usar%20o%20cupom%20ADESTRA-ORELHA15'
  },
  {
    id: 'treat_tendao_bovino',
    nome: 'Tendão Bovino Desidratado Mastigável',
    categoria: 'mordedores_ossos',
    descricao: 'Fibra resistente e palatável. Ocupa o cão por 20 a 40 minutos em dias chuvosos.',
    marcaParceira: 'BioBite Petiscos Nobres',
    precoEstimado: 'R$ 34,00 / pacote',
    custoPetiscos: 100,
    descontoValor: '20% OFF',
    codigoCupom: 'TENDAO-NATURAL20',
    icone: '🍖',
    beneficioComportamental: 'Perfeito para direcionar a boca do cão para longe de móveis e sapatos.',
    linkParceiro: 'https://wa.me/?text=Gostaria%20de%20usar%20o%20cupom%20TENDAO-NATURAL20'
  },
  {
    id: 'treat_chifre_recheavel',
    nome: 'Chifre Bovino Recreativo Recheável',
    categoria: 'mordedores_ossos',
    descricao: 'Mordedor durável que não solta lascas perigosas. Pode ser recheado com pasta de amendoim ou frutas.',
    marcaParceira: 'Bark & Horns',
    precoEstimado: 'R$ 39,90 / unidade',
    custoPetiscos: 120,
    descontoValor: 'R$ 15,00 OFF',
    codigoCupom: 'CHIFRE-BARK15',
    icone: '🦴',
    beneficioComportamental: 'Enriquecimento cognitivo de alta resistência para cães com mandíbula forte.',
    linkParceiro: 'https://wa.me/?text=Gostaria%20de%20usar%20o%20cupom%20CHIFRE-BARK15'
  },
  {
    id: 'treat_traqueia_crocante',
    nome: 'Traqueia Bovina Crocante Desidratada',
    categoria: 'petiscos_naturais',
    descricao: 'Rica em glucosamina e condroitina, auxilia na saúde articular enquanto diverte.',
    marcaParceira: 'Snacks da Fazenda',
    precoEstimado: 'R$ 29,90 / pacote',
    custoPetiscos: 85,
    descontoValor: '15% OFF',
    codigoCupom: 'TRAQUEIA-FARM15',
    icone: '🥩',
    beneficioComportamental: 'Excelente recompensa pós-treino no comando Place.',
    linkParceiro: 'https://wa.me/?text=Gostaria%20de%20usar%20o%20cupom%20TRAQUEIA-FARM15'
  },
  {
    id: 'treat_bolinha_anti_mordida',
    nome: 'Bolinha de Borracha Natural Maciça (Anti-Furo)',
    categoria: 'brinquedos',
    descricao: 'Borracha atóxica de alta elasticidade. Quica de forma imprevisível e não machuca a boca.',
    marcaParceira: 'ToyPro Canine',
    precoEstimado: 'R$ 42,00 / unidade',
    custoPetiscos: 110,
    descontoValor: 'R$ 12,00 OFF',
    codigoCupom: 'BOLA-TOYPRO12',
    icone: '🎾',
    beneficioComportamental: 'Impulso de busca e retorno para treino de Recall (chamado) e soltura de brinquedo.',
    linkParceiro: 'https://wa.me/?text=Gostaria%20de%20usar%20o%20cupom%20BOLA-TOYPRO12'
  },
  {
    id: 'treat_tapete_lamber',
    nome: 'Tapete de Lamber Antiestresse (LickiMat Texturizado)',
    categoria: 'brinquedos',
    descricao: 'Base de silicone com ranhuras para espalhar sachê, iogurte ou patê. Reduz a frequência cardíaca.',
    marcaParceira: 'ZenPet Brasil',
    precoEstimado: 'R$ 38,00 / unidade',
    custoPetiscos: 95,
    descontoValor: '15% OFF',
    codigoCupom: 'ZEN-LICK15',
    icone: '🐾',
    beneficioComportamental: 'O ato de lamber libera hormônios calmantes e distrai durante banho ou tempestades.',
    linkParceiro: 'https://wa.me/?text=Gostaria%20de%20usar%20o%20cupom%20ZEN-LICK15'
  },
  {
    id: 'treat_guia_antipuxao',
    nome: 'Guia Longa de 5m & Peitoral Anti-Puxão em Y',
    categoria: 'acessorios',
    descricao: 'Fita reforçada com mosquetão giratório 360°. Dá liberdade segura e elimina puxões de guia.',
    marcaParceira: 'ConectaGear Pro',
    precoEstimado: 'R$ 98,00 / conjunto',
    custoPetiscos: 220,
    descontoValor: '25% OFF',
    codigoCupom: 'GUIA-CONECTA25',
    icone: '🦺',
    beneficioComportamental: 'Equipamento essencial para passeio estruturado sem estrangulamento ou desconforto.',
    linkParceiro: 'https://wa.me/?text=Gostaria%20de%20usar%20o%20cupom%20GUIA-CONECTA25'
  },
  {
    id: 'treat_consultoria_vip',
    nome: 'Consultoria / Avaliação Individual com Adestrador',
    categoria: 'consultoria',
    descricao: 'Sessão online ou presencial de 1h para diagnóstico de comportamento e plano sob medida.',
    marcaParceira: 'Especialistas ConectaPet',
    precoEstimado: 'R$ 180,00 / sessão',
    custoPetiscos: 350,
    descontoValor: 'R$ 50,00 OFF',
    codigoCupom: 'CONSULTA-VIP50',
    icone: '🎓',
    beneficioComportamental: 'Acompanhamento profissional para reatividade, ansiedade de separação e agressividade.',
    linkParceiro: 'https://wa.me/?text=Gostaria%20de%20usar%20o%20cupom%20CONSULTA-VIP50'
  }
];
