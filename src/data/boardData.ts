import { BoardStage, TrainingModuleInfo, ModuleId } from '../types';
import { BEHAVIORAL_MODULES, BEHAVIORAL_BOARD_STAGES } from './behavioralConsultingData';

export const TRAINING_MODULES: TrainingModuleInfo[] = [
  {
    id: 'obediencia',
    nome: 'Jornada de Obediência Essencial',
    subtitulo: 'Fases progressivas com micro-etapas de alta precisão',
    descricao: 'Da conexão pelo olhar ao passeio relaxado sem puxar a guia, limite de portas abertas e comando de referência (Place).',
    icone: 'Compass',
    cor: 'text-indigo-600 border-indigo-200 bg-indigo-50',
    bgGradiente: 'from-indigo-600 via-indigo-700 to-indigo-900',
    precoExibicao: 'R$ 39,90/mês',
    beneficios: [
      '8 Fases estruturadas com micro-etapas milimétricas',
      'Caminhar ao lado sem puxar & Autocontrole em portas',
      'Comando de Referência / Place (Caminha/Canil)',
      'Recall com alta velocidade & Prova do Guardião Zen'
    ],
    faseGratisAte: 1
  },
  {
    id: 'ansiedade_separacao',
    nome: 'Consultoria: Ansiedade por Separação',
    subtitulo: 'Protocolo de dessensibilização e ausências sub-limiares',
    descricao: 'Ensine seu cão a ficar sozinho com paz, segurança e relaxamento total, sem latidos de pânico ou destruição.',
    icone: 'Home',
    cor: 'text-amber-800 border-amber-300 bg-amber-50',
    bgGradiente: 'from-amber-600 via-orange-600 to-amber-900',
    precoExibicao: 'R$ 49,90/mês',
    beneficios: [
      'Dessensibilização de chaves, sapatos e bolsas',
      'Protocolo das micro-ausências de 1s a 30 min',
      'Rotinas de enriquecimento calmante pré-saída',
      'Eliminação do pânico e da dependência'
    ],
    faseGratisAte: 1
  },
  {
    id: 'posse_recursos',
    nome: 'Consultoria: Posse por Recursos (Comida & Ossos)',
    subtitulo: 'Protocolo Trade-Up de troca vantajosa sem confronto',
    descricao: 'Elimine rosnados e agressividade na hora do prato, ossos e brinquedos com contra-condicionamento clássico.',
    icone: 'Bone',
    cor: 'text-rose-800 border-rose-300 bg-rose-50',
    bgGradiente: 'from-rose-600 via-red-600 to-rose-950',
    precoExibicao: 'R$ 49,90/mês',
    beneficios: [
      'A Regra de Ouro: Nunca roubar do cão',
      'Contra-condicionamento no prato de ração',
      'O Jogo da Troca Vantajosa (Trade-Up)',
      'Manuseio seguro de ossos e mordedores'
    ],
    faseGratisAte: 1
  },
  {
    id: 'posse_ambiente',
    nome: 'Consultoria: Posse por Espaço, Sofá & Cama',
    subtitulo: 'Comando de referência (Place) e desocupação positiva',
    descricao: 'Acabe com a guarda de sofás, camas, corredores e limites de portas com convites vantajosos e respeito mútuo.',
    icone: 'Compass',
    cor: 'text-indigo-800 border-indigo-300 bg-indigo-50',
    bgGradiente: 'from-indigo-600 via-indigo-700 to-indigo-950',
    precoExibicao: 'R$ 44,90/mês',
    beneficios: [
      'Comando "Desce" com convite e recompensa no chão',
      'Comando de Referência / "Place" no tapete zen',
      'Gerenciamento de corredores e portas de entrada',
      'Harmonia de espaços para toda a família'
    ],
    faseGratisAte: 1
  },
  {
    id: 'enriquecimento',
    nome: 'Enriquecimento Ambiental & Ocupação Mental',
    subtitulo: 'Pontuação de fases mentais e gasto saudável de energia',
    descricao: 'Reduza a ansiedade, estresse e destruição de móveis com os 4 eixos do enriquecimento cognitivo.',
    icone: 'Puzzle',
    cor: 'text-amber-700 border-amber-200 bg-amber-50',
    bgGradiente: 'from-amber-600 via-orange-600 to-amber-800',
    precoExibicao: 'R$ 29,90/mês',
    beneficios: [
      'Eixos Alimentar, Sensorial, Cognitivo e Físico',
      'Receitas de recheios congelados calmantes',
      'Brinquedos inteligentes DIY de baixo custo',
      'Atividades anti-tédio e ansiedade de separação'
    ],
    faseGratisAte: 1
  },
  {
    id: 'sanitaria',
    nome: 'Educação Sanitária Definitiva',
    subtitulo: 'Protocolo de higiene, rotina e acerto 100% no banheiro',
    descricao: 'Passo a passo com micro-etapas para eliminar xixi fora do lugar em cães e rejeição de caixas em felinos.',
    icone: 'CheckCircle2',
    cor: 'text-emerald-700 border-emerald-200 bg-emerald-50',
    bgGradiente: 'from-emerald-600 via-teal-700 to-emerald-900',
    precoExibicao: 'R$ 34,90/mês',
    beneficios: [
      'A Regra de Ouro dos 3 Minutos Biológicos',
      'Palavra-gatilho de banheiro ("Xixi Já")',
      'Protocolo N+1 para caixas de areia de felinos',
      'Como limpar sem deixar rastro olfativo de urina'
    ],
    faseGratisAte: 1
  },
  {
    id: 'sinais_calma',
    nome: 'Sinais de Calma & Linguagem Corporal',
    subtitulo: 'Decodificador da comunicação corporal canina e felina',
    descricao: 'Aprenda a ler o estresse antes da mordida ou do arranhão e construa segurança total na convivência.',
    icone: 'HeartHandshake',
    cor: 'text-purple-700 border-purple-200 bg-purple-50',
    bgGradiente: 'from-purple-600 via-violet-700 to-indigo-900',
    precoExibicao: 'R$ 29,90/mês',
    beneficios: [
      'Identificação de lambedura de focinho e bocejos de tensão',
      'O significado do Olho de Baleia (Whale Eye)',
      'Diferença entre abanar de cauda feliz vs em alerta tenso',
      'Postura de arco (Play Bow) e relaxamento mútuo'
    ],
    faseGratisAte: 1
  }
];

export const BOARD_STAGES: BoardStage[] = [
  // =========================================================================
  // MÓDULO 1: OBEDIÊNCIA BÁSICA & COMANDOS DE ROTINA
  // =========================================================================
  {
    id: 'stage_ob_1',
    moduloId: 'obediencia',
    ordem: 1,
    titulo: 'Foco & Contato Visual Espontâneo',
    subtitulo: 'Fase 1: A Conexão do Olhar',
    descricao: 'Ensine o pet a olhar nos seus olhos quando chamado ou diante de uma distração, criando a âncora de atenção.',
    motivoEUtilidade: 'O contato visual é a chave mestra do adestramento. Quando o pet olha nos olhos do tutor, ele desliga o piloto automático de distração e fica receptivo para receber orientações. Na rotina, evita que o pet ignore comandos na rua ou reaja por impulso.',
    passoAPasso: [
      'Segure um petisco de alto valor entre o polegar e o indicador na altura do peito.',
      'Aguarde o cão olhar diretamente nos seus olhos (sem você forçar ou tocar nele).',
      'No milissegundo do contato visual, marque com a palavra de acerto ("Muito bem!" ou Click).',
      'Entregue a recompensa imediatamente na boca do pet. Repita em sessões curtas de 2 minutos.'
    ],
    microEtapas: [
      {
        id: 'ob_1_micro_1',
        ordem: 1,
        titulo: 'Isca Olho no Olho',
        descricao: 'Leve o petisco do focinho até o meio dos seus olhos para guiar a linha de visão.',
        criterioSucesso: 'Pet acompanha a mão e olha nos olhos 5 vezes seguidas sem hesitar.',
        repeticoesRecomendadas: 5
      },
      {
        id: 'ob_1_micro_2',
        ordem: 2,
        titulo: 'Mãos Abertas nas Laterais',
        descricao: 'Abra os braços com petisco em uma mão. O pet tentará olhar a mão, mas premie SOMENTE quando ele desviar da mão e olhar no seu rosto.',
        criterioSucesso: 'Pet ignora a comida aberta na mão e busca o olhar do tutor em até 2 segundos.',
        repeticoesRecomendadas: 5
      },
      {
        id: 'ob_1_micro_3',
        ordem: 3,
        titulo: 'Foco com Nome em Ambiente Neutro',
        descricao: 'Diga o nome do pet uma única vez em tom neutro/amigável e recompense o contato visual instantâneo.',
        criterioSucesso: 'Acerto imediato em 4 de 5 tentativas.',
        repeticoesRecomendadas: 5
      }
    ],
    dicaEspecial: 'Nunca repita o nome do pet como um papagaio ("Rex! Rex! Rex!"). Diga uma vez só para valorizar a palavra!',
    xpRecompensa: 40,
    duracaoMinutos: 2,
    especieAlvo: 'Todos',
    icone: 'Eye',
    tipoFase: 'comum'
  },
  {
    id: 'stage_ob_2',
    moduloId: 'obediencia',
    ordem: 2,
    titulo: 'Comando "Senta" & Autocontrole Pré-Refeição',
    subtitulo: 'Fase 2: Condução Suave & Calma',
    descricao: 'Aprenda a conduzir o movimento da cabeça para que a anca desça naturalmente, sem empurrar o pet.',
    motivoEUtilidade: 'O senta ensina freio inibitório e paciência. Na rotina diária, é utilizado antes de colocar o prato de ração no chão, antes de colocar a guia de passeio e antes de abrir o portão, evitando euforia descontrolada.',
    passoAPasso: [
      'Posicione o petisco rente ao nariz do cão.',
      'Mova a mão suavemente para trás sobre o topo da cabeça dele.',
      'Ao levantar o focinho para acompanhar, a anca do pet toca o solo espontaneamente.',
      'Marque o acerto ("Sim!") no instante do toque do bumbum no chão e entregue a recompensa.'
    ],
    microEtapas: [
      {
        id: 'ob_2_micro_1',
        ordem: 1,
        titulo: 'Isca Mecânica Perfeita',
        descricao: 'Conduza a cabeça em arco suave sem elevar a mão alto demais (para evitar pulos).',
        criterioSucesso: 'Pet senta com fluidez 5 vezes sem pular nas suas pernas.',
        repeticoesRecomendadas: 5
      },
      {
        id: 'ob_2_micro_2',
        ordem: 2,
        titulo: 'Inserção do Comando Verbal "Senta"',
        descricao: 'Fale a palavra "Senta" 1 segundo ANTES de fazer o gesto com a mão.',
        criterioSucesso: 'O pet antecipa o movimento ao ouvir a palavra antes do gesto.',
        repeticoesRecomendadas: 6
      },
      {
        id: 'ob_2_micro_3',
        ordem: 3,
        titulo: 'Senta da Tigela de Ração',
        descricao: 'Segure a tigela de comida; desça a tigela apenas se o pet permanecer sentado e calmo.',
        criterioSucesso: 'Tigela encosta no chão com o pet sentado esperando a liberação ("OK!").',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'Nunca empurre o bumbum do cão para baixo. Cães possuem reflexo de oposição e farão força contrária!',
    xpRecompensa: 50,
    duracaoMinutos: 3,
    especieAlvo: 'Todos',
    icone: 'Bone',
    tipoFase: 'comum'
  },
  {
    id: 'stage_ob_3',
    moduloId: 'obediencia',
    ordem: 3,
    titulo: 'Comando de Referência: "Place" (Caminha/Canil/Alvo)',
    subtitulo: 'Fase 3: O Ponto Seguro da Casa',
    descricao: 'Ensine o pet a ir para um tapete, caminha ou caixa de transporte sob comando e permanecer relaxado.',
    motivoEUtilidade: 'O comando "Place" (ou "Caminha/Lugar") é um dos mais úteis do adestramento moderno. Serve para quando a campainha toca, quando chega entrega de delivery, na hora das refeições da família ou na limpeza da casa, canalizando o pet para um local seguro e tranquilo.',
    passoAPasso: [
      'Escolha um tapete com textura demarcada ou a caminha dele como alvo.',
      'Aponte para o local e jogue um petisco sobre o tapete dizendo "Place!" ou "Caminha!".',
      'Quando as 4 patas estiverem em cima, marque com "Muito bem!" e entregue mais 2 petiscos.',
      'Diga a palavra de liberação "Livre!" e convide-o a sair do tapete.'
    ],
    microEtapas: [
      {
        id: 'ob_3_micro_1',
        ordem: 1,
        titulo: 'Magnetismo do Alvo',
        descricao: 'Jogue petiscos na caminha para que o pet associe o tapete a um imã de coisas prazerosas.',
        criterioSucesso: 'Pet corre em direção à caminha assim que o tutor aponta o dedo.',
        repeticoesRecomendadas: 6
      },
      {
        id: 'ob_3_micro_2',
        ordem: 2,
        titulo: 'Permanência de 15 Segundos no Place',
        descricao: 'Alimente o pet em cima da caminha a cada 3 segundos, mantendo-o acomodado.',
        criterioSucesso: 'Pet permanece calmo no tapete por 15 segundos sem sair sozinho.',
        repeticoesRecomendadas: 4
      },
      {
        id: 'ob_3_micro_3',
        ordem: 3,
        titulo: 'Place com Pequeno Distanciamento',
        descricao: 'Peça "Place", dê 2 passos para longe da caminha e volte para premiar.',
        criterioSucesso: 'Pet aguarda seu retorno sem levantar do tapete.',
        repeticoesRecomendadas: 5
      }
    ],
    dicaEspecial: 'A caminha deve ser um santuário de descanso. Nunca use o comando Place como castigo!',
    xpRecompensa: 65,
    duracaoMinutos: 4,
    especieAlvo: 'Todos',
    icone: 'ShieldCheck',
    tipoFase: 'comum'
  },
  {
    id: 'stage_ob_4',
    moduloId: 'obediencia',
    ordem: 4,
    titulo: 'Respeito a Portas & Portões Abertos',
    subtitulo: 'Fase 4: O Freio Invisível de Segurança',
    descricao: 'Ensine o pet a esperar permissão antes de cruzar qualquer porta de casa, elevador ou portão da rua.',
    motivoEUtilidade: 'Evita fugas acidentais, atropelamentos e disparadas quando a porta do carro ou de casa é aberta. O pet entende que porta aberta não significa autorização imediata para sair, salvando vidas na rotina real.',
    passoAPasso: [
      'Posicione-se em frente a uma porta fechada com o cão na coleira (por segurança).',
      'Comece a abrir a porta devagar (10 cm). Se o cão tentar passar a cabeça, feche suavemente a porta.',
      'Quando a porta abrir e o cão recuar ou sentar espontaneamente, marque "Muito bem!".',
      'Abra toda a porta e diga a palavra de liberação ("OK, Vamos!") convidando-o a cruzar.'
    ],
    microEtapas: [
      {
        id: 'ob_4_micro_1',
        ordem: 1,
        titulo: 'A Porta é o Sinal de Parada',
        descricao: 'Abra a fresta de 15cm da porta. Feche no primeiro avanço e abra quando ele parar.',
        criterioSucesso: 'Pet não empurra o focinho na fresta por 3 vezes seguidas.',
        repeticoesRecomendadas: 5
      },
      {
        id: 'ob_4_micro_2',
        ordem: 2,
        titulo: 'Porta 100% Aberta com Foco no Tutor',
        descricao: 'Abra a porta inteira. O pet deve olhar para o seu rosto antes de dar qualquer passo à frente.',
        criterioSucesso: 'Pet aguarda 5 segundos com a porta escancarada até ouvir a palavra de liberação.',
        repeticoesRecomendadas: 4
      },
      {
        id: 'ob_4_micro_3',
        ordem: 3,
        titulo: 'Teste de Porta Externa / Elevador',
        descricao: 'Aplique o protocolo na porta principal de entrada com estímulo visual leve.',
        criterioSucesso: 'Pet só atravessa o batente após o comando verbal de liberação do tutor.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'Nunca bata a porta com força contra o focinho ou as patas. O movimento deve ser calmo e firme como uma barreira.',
    xpRecompensa: 70,
    duracaoMinutos: 4,
    especieAlvo: 'Todos',
    icone: 'ShieldAlert',
    tipoFase: 'desafio'
  },
  {
    id: 'stage_ob_5',
    moduloId: 'obediencia',
    ordem: 5,
    titulo: 'Comando "Deita" & Relaxamento Ativo',
    subtitulo: 'Fase 5: Postura de Serenidade',
    descricao: 'Conduza a postura deitada a partir da posição sentada, consolidando relaxamento corporal.',
    motivoEUtilidade: 'O deita baixa a frequência cardíaca e a excitação do pet. Na rotina, é perfeito para idas a restaurantes pet friendly, viagens de carro ou momentos em que a família quer assistir TV com o pet quieto ao lado.',
    passoAPasso: [
      'Com o pet sentado, coloque o petisco encostado no nariz.',
      'Desça a mão reta em direção ao chão entre as patas dianteiras (formando um ângulo de L).',
      'Puxe a mão 3 cm para a frente rente ao chão até que os cotovelos toquem o piso.',
      'Assim que os cotovelos tocarem o chão, marque com entusiasmo e libere o petisco.'
    ],
    microEtapas: [
      {
        id: 'ob_5_micro_1',
        ordem: 1,
        titulo: 'Condução em L com Isca Rasteira',
        descricao: 'Desça a mão sem tirar o petisco do alcance do faro para que ele não levante o bumbum.',
        criterioSucesso: 'Cotovelos no chão em 5 repetições guiadas.',
        repeticoesRecomendadas: 5
      },
      {
        id: 'ob_5_micro_2',
        ordem: 2,
        titulo: 'Túnel com as Pernas (Se o pet levantar a anca)',
        descricao: 'Sente-se no chão com joelhos dobrados e passe a isca por baixo da perna forçando o abaixamento.',
        criterioSucesso: 'Pet rasteja sob as pernas com o corpo 100% no chão.',
        repeticoesRecomendadas: 4
      },
      {
        id: 'ob_5_micro_3',
        ordem: 3,
        titulo: 'Deita com Gesto Visual de Cima',
        descricao: 'Em pé, aponte a mão com a palma para baixo indicando o chão.',
        criterioSucesso: 'Pet deita a partir do gesto visual em menos de 3 segundos.',
        repeticoesRecomendadas: 5
      }
    ],
    dicaEspecial: 'Se o piso for frio ou escorregadio, treine sobre um tapete para dar conforto articular ao pet.',
    xpRecompensa: 65,
    duracaoMinutos: 4,
    especieAlvo: 'Todos',
    icone: 'Sparkles',
    tipoFase: 'comum'
  },
  {
    id: 'stage_ob_6',
    moduloId: 'obediencia',
    ordem: 6,
    titulo: 'Passeio Perfeito: Caminhar ao Lado Sem Puxar a Guia',
    subtitulo: 'Fase 6: O Andar Fluido em Harmonia',
    descricao: 'Aprenda a técnica da "Árvore" e a condução ao lado para eliminar puxões na guia de uma vez por todas.',
    motivoEUtilidade: 'Passear sem puxar a guia transforma o passeio de um pesadelo estressante para um momento de lazer terapêutico mútuo. Protege a traqueia e coluna do pet e os ombros do tutor.',
    passoAPasso: [
      'Coloque a guia no peitoral e posicione o pet do seu lado esquerdo ou direito (escolha um lado padrão).',
      'Dê 3 passos com a guia folgada (em formato de sorriso/U). Recompense na altura da sua coxa.',
      'Técnica da Árvore: Se o cão esticar a guia, pare imediatamente como uma árvore de raízes fincadas.',
      'Quando ele afrouxar a tensão e olhar para trás, elogie e continue a caminhada premiando a posição ao lado.'
    ],
    microEtapas: [
      {
        id: 'ob_6_micro_1',
        ordem: 1,
        titulo: 'Posicionamento do Lado & Zona de Recompensa',
        descricao: 'Treine dentro de casa na sala. Entregue o petisco exatamente colado na costura lateral da sua calça.',
        criterioSucesso: 'Pet caminha 10 passos rente à sua perna sem se afastar.',
        repeticoesRecomendadas: 5
      },
      {
        id: 'ob_6_micro_2',
        ordem: 2,
        titulo: 'A Regra da Árvore (Freio Instantâneo)',
        descricao: 'Nunca puxe a guia para trás; apenas congele. Dê passos somente quando a guia estiver bamba.',
        criterioSucesso: 'Pet desiste da tração e recua a guia em menos de 2 segundos.',
        repeticoesRecomendadas: 6
      },
      {
        id: 'ob_6_micro_3',
        ordem: 3,
        titulo: 'Mudanças de Direção (Meia-Volta 180°)',
        descricao: 'Caminhe e mude de sentido repentinamente. O cão aprenderá a prestar atenção nas suas pernas.',
        criterioSucesso: 'Pet acompanha 3 mudanças de direção mantendo a guia folgada.',
        repeticoesRecomendadas: 4
      }
    ],
    dicaEspecial: 'Puxar a guia de volta ativa o reflexo de oposição ("tração de trenó"). Parar imóvel é a resposta correta!',
    xpRecompensa: 95,
    duracaoMinutos: 5,
    especieAlvo: 'Cão',
    icone: 'Compass',
    tipoFase: 'comum'
  },
  {
    id: 'stage_ob_7',
    moduloId: 'obediencia',
    ordem: 7,
    titulo: 'Recall de Ouro: O "Vem" Emergencial com Distrações',
    subtitulo: 'Fase 7: O Salva-Vidas Supremo',
    descricao: 'Construa um chamado infalível e magnético onde o cão larga o que estiver fazendo para vir correndo até você.',
    motivoEUtilidade: 'O chamado é a ferramenta número 1 de segurança. Se o portão abrir sem querer ou se o pet correr atrás de outro animal na praça, um recall sólido traz o pet de volta antes de qualquer risco fatal.',
    passoAPasso: [
      'Fique a 5 metros de distância, agache-se e abra os braços com um sorriso no rosto.',
      'Diga uma única vez com tom entusiasmado: "[Nome do Pet], VEM!".',
      'Quando ele correr na sua direção, segure suavemente o peitoral/coleira com uma mão antes de entregar a comida.',
      'Entregue uma "festa de petiscos" (3 pedacinhos seguidos de algo muito saboroso como queijo branco).'
    ],
    microEtapas: [
      {
        id: 'ob_7_micro_1',
        ordem: 1,
        titulo: 'Recall Ping-Pong entre Duas Pessoas',
        descricao: 'Duas pessoas chamam o pet alternadamente comemorando com festa a cada chegada.',
        criterioSucesso: 'Pet corre alegremente entre as duas pessoas por 6 rodadas seguidas.',
        repeticoesRecomendadas: 6
      },
      {
        id: 'ob_7_micro_2',
        ordem: 2,
        titulo: 'Segurar a Coleira Antes de Premiar',
        descricao: 'Treine tocar e segurar a coleira antes da comida, evitando que o cão pegue a recompensa e fuja.',
        criterioSucesso: 'Pet aceita o toque na coleira calmo e feliz em 5 tentativas.',
        repeticoesRecomendadas: 5
      },
      {
        id: 'ob_7_micro_3',
        ordem: 3,
        titulo: 'Recall com Brinquedo de Distração no Meio',
        descricao: 'Coloque um brinquedo no chão e chame o pet; ele deve ignorar o objeto e vir direto até você.',
        criterioSucesso: 'Pet passa reto pela distração e ancora nas suas mãos.',
        repeticoesRecomendadas: 4
      }
    ],
    dicaEspecial: 'NUNCA chame com a palavra "Vem" para dar bronca, cortar unhas ou dar remédio. O "Vem" deve significar pura alegria!',
    xpRecompensa: 90,
    duracaoMinutos: 5,
    especieAlvo: 'Todos',
    icone: 'Zap',
    tipoFase: 'desafio'
  },
  {
    id: 'stage_ob_8',
    moduloId: 'obediencia',
    ordem: 8,
    titulo: 'Prova de Ouro: O Guardião Zen com Visita Real',
    subtitulo: 'Fase Final (BOSS): O Mestre do Autocontrole',
    descricao: 'Combine foco, senta, fica e place com a campainha tocando ou uma visita simulada entrando na casa!',
    motivoEUtilidade: 'O teste definitivo de harmonia doméstica: receber convidados, entregas e amigos com o pet educado, no seu cantinho seguro e sem pular em ninguém.',
    passoAPasso: [
      'Peça para alguém tocar a campainha ou bater na porta 2 vezes.',
      'Direcione o pet imediatamente para o Place com o comando "Lugar!".',
      'Entregue um brinquedo recheado ou mordedor seguro para ele roer na caminha.',
      'Abra a porta para a visita enquanto o pet permanece na caminha roendo feliz.'
    ],
    microEtapas: [
      {
        id: 'ob_8_micro_1',
        ordem: 1,
        titulo: 'Campainha com Place Imediato',
        descricao: 'Toque o som de campainha no celular e recompense a ida voluntária para a caminha.',
        criterioSucesso: 'Som de campainha vira gatilho para o pet deitar no Place.',
        repeticoesRecomendadas: 4
      },
      {
        id: 'ob_8_micro_2',
        ordem: 2,
        titulo: 'Visita Entrando e Ignorando o Pet',
        descricao: 'A visita entra, não olha e não fala com o pet nos primeiros 2 minutos até ele relaxar.',
        criterioSucesso: 'Pet permanece nas 4 patas no chão ou na caminha sem pular na pessoa.',
        repeticoesRecomendadas: 3
      },
      {
        id: 'ob_8_micro_3',
        ordem: 3,
        titulo: 'Cumprimento Calmo com as 4 Patas no Chão',
        descricao: 'Libere o pet para cumprimentar apenas quando ele estiver com o corpo descontraído.',
        criterioSucesso: 'Pet recebe carinho no peito mantendo as 4 patas no solo.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'Parabéns! Seu pet conquistou o Grau Mestre de Obediência e Harmonia Domiciliar!',
    xpRecompensa: 160,
    duracaoMinutos: 6,
    especieAlvo: 'Todos',
    icone: 'Award',
    tipoFase: 'boss'
  },

  // =========================================================================
  // MÓDULO 2: ENRIQUECIMENTO AMBIENTAL & OCUPAÇÃO MENTAL
  // =========================================================================
  {
    id: 'stage_ea_1',
    moduloId: 'enriquecimento',
    ordem: 1,
    titulo: 'Eixo Alimentar: O Kong & Lick Mat Congelado',
    subtitulo: 'Fase 1: O Poder Relaxante da Lambedura',
    descricao: 'Lamber continuamente libera endorfinas no cérebro do cão e do gato, reduzindo o estresse e o cortisol.',
    motivoEUtilidade: 'Reduz latidos por tédio, acalma o pet quando os tutores saem de casa (previne ansiedade de separação) e proporciona bem-estar biológico.',
    passoAPasso: [
      'Espalhe patê natural, iogurte sem açúcar ou pasta de amendoim 100% no tapete ou brinquedo.',
      'Para iniciantes, sirva em temperatura ambiente. Para experientes, congele por 2 horas.',
      'Entregue ao pet 10 minutos antes de você sair de casa ou durante momentos de tempestade/fogos.',
      'Monitore os primeiros minutos para garantir que ele esteja apenas lambendo com calma.'
    ],
    microEtapas: [
      {
        id: 'ea_1_micro_1',
        ordem: 1,
        titulo: 'Tapete Fácil em Temperatura Ambiente',
        descricao: 'Alimento pastoso fácil de remover para gerar sucesso e engajamento imediato.',
        criterioSucesso: 'Pet lambe por 5 minutos focado sem frustração.',
        repeticoesRecomendadas: 3
      },
      {
        id: 'ea_1_micro_2',
        ordem: 2,
        titulo: 'Brinquedo Recheável Semi-Congelado',
        descricao: 'Congelamento de 1 hora para aumentar o tempo de entretenimento para 15 minutos.',
        criterioSucesso: 'Pet esvazia o brinquedo usando a língua com autonomia.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: '15 minutos lambendo equivale a 30 minutos de caminhada em termos de gasto de energia mental!',
    xpRecompensa: 50,
    duracaoMinutos: 5,
    especieAlvo: 'Todos',
    icone: 'Cookie',
    tipoFase: 'comum'
  },
  {
    id: 'stage_ea_2',
    moduloId: 'enriquecimento',
    ordem: 2,
    titulo: 'Eixo Sensorial: O Super Faro & Jardim Aromático',
    subtitulo: 'Fase 2: Caça ao Tesouro Olfativa',
    descricao: 'Ative a potência do faro canino com caça a petiscos ou o estímulo sensorial da erva-do-gato/Silvervine para felinos.',
    motivoEUtilidade: 'O olfato é o sentido primário dos cães. Exercitar o faro promove cansaço mental positivo e resgata os comportamentos naturais da espécie.',
    passoAPasso: [
      'Cães: Esconda pedacinhos de petisco em toalhas enroladas ou atrás dos pés dos sofás da sala.',
      'Gatos: Salpique erva-de-gato em caixas de papelão ou arranhadores de sisal.',
      'Diga a palavra de busca "Procura!" e deixe o pet farejar em silêncio.',
      'Não aponte onde está: deixe o cérebro dele resolver o enigma olfativo sozinho!'
    ],
    microEtapas: [
      {
        id: 'ea_2_micro_1',
        ordem: 1,
        titulo: 'Toalha Enrolada com Petiscos',
        descricao: 'Polvilhe petiscos em uma toalha e enrole como um rocambole no chão.',
        criterioSucesso: 'Pet usa o focinho para desenrolar a toalha e achar todos os pedaços.',
        repeticoesRecomendadas: 3
      },
      {
        id: 'ea_2_micro_2',
        ordem: 2,
        titulo: 'Caça ao Tesouro em 2 Ambientes',
        descricao: 'Esconda petiscos na sala e no corredor com diferentes alturas (até a altura do peito).',
        criterioSucesso: 'Pet varre os cômodos pelo faro e encontra 6 de 6 alvos.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'O cão tem mais de 200 milhões de receptores olfativos. Farejar é o "Instagram" do mundo pet!',
    xpRecompensa: 60,
    duracaoMinutos: 4,
    especieAlvo: 'Todos',
    icone: 'Sparkles',
    tipoFase: 'comum'
  },
  {
    id: 'stage_ea_3',
    moduloId: 'enriquecimento',
    ordem: 3,
    titulo: 'Eixo Cognitivo: Quebra-Cabeça da Forma de Muffin DIY',
    subtitulo: 'Fase 3: O Desafio dos Gênios',
    descricao: 'Estimule o raciocínio lógico do pet criando um quebra-cabeça caseiro de baixo custo.',
    motivoEUtilidade: 'Desenvolve resiliência, tolerância à frustração e previne o envelhecimento cognitivo em pets adultos e idosos.',
    passoAPasso: [
      'Pegue uma forma de cupcake/muffin ou uma caixa rasa de ovos.',
      'Coloque petiscos nos buracos e tampe cada cavidade com uma bolinha de tênis ou copo de papel.',
      'Apresente o tabuleiro no chão e observe o pet usar a pata ou o focinho para remover as tampas.',
      'Ajude apenas se ele demonstrar frustração na primeira tentativa.'
    ],
    microEtapas: [
      {
        id: 'ea_3_micro_1',
        ordem: 1,
        titulo: 'Forma Semi-Tampada (Fácil)',
        descricao: 'Cubra apenas metade do buraco para facilitar a primeira vitória do pet.',
        criterioSucesso: 'Pet empurra as bolinhas e consome a recompensa.',
        repeticoesRecomendadas: 3
      },
      {
        id: 'ea_3_micro_2',
        ordem: 2,
        titulo: 'Caixa Surpresa com Papel Amassado',
        descricao: 'Encha uma caixa de papelão com rolinhos de papel higiênico e petiscos escondidos.',
        criterioSucesso: 'Pet forrageia com calma por mais de 5 minutos.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'Nunca faça o enigma difícil demais logo de início para evitar que o pet desista ou tente destruir o objeto.',
    xpRecompensa: 75,
    duracaoMinutos: 5,
    especieAlvo: 'Todos',
    icone: 'Puzzle',
    tipoFase: 'desafio'
  },
  {
    id: 'stage_ea_4',
    moduloId: 'enriquecimento',
    ordem: 4,
    titulo: 'Eixo Físico: Circuito de Propriocepção & Gatificação',
    subtitulo: 'Fase 4: Consciência Corporal & Equilíbrio',
    descricao: 'Treino de equilíbrio em superfícies variadas e exploração do espaço tridimensional da casa.',
    motivoEUtilidade: 'Fortalece músculos estabilizadores, reduz risco de lesões em saltos e dá segurança psicológica a animais tímidos ou inseguros.',
    passoAPasso: [
      'Cães: Crie uma rota com almofadas firmes no chão para ele pisar com cuidado.',
      'Gatos: Libere prateleiras e crie rotas de subida para o topo de móveis seguros (gatificação vertical).',
      'Conduza o pet devagar com um petisco mantendo movimentos lentos e controlados.',
      'Finalize com massagem suave nos ombros e peito.'
    ],
    microEtapas: [
      {
        id: 'ea_4_micro_1',
        ordem: 1,
        titulo: 'Passada Lenta sobre Almofadas',
        descricao: 'Guie o pet para que ele coloque pata por pata sobre as texturas sem correr.',
        criterioSucesso: 'Pet atravessa o mini circuito 4 vezes com equilíbrio total.',
        repeticoesRecomendadas: 4
      }
    ],
    dicaEspecial: 'Pets com restrições articulares devem caminhar apenas em superfícies planas antiderrapantes.',
    xpRecompensa: 70,
    duracaoMinutos: 5,
    especieAlvo: 'Todos',
    icone: 'Activity',
    tipoFase: 'comum'
  },
  {
    id: 'stage_ea_5',
    moduloId: 'enriquecimento',
    ordem: 5,
    titulo: 'Combo Master: Banquete dos 5 Sentidos',
    subtitulo: 'Fase Final (BOSS): O Spa Mental Completo',
    descricao: 'Uma sessão integrada de música relaxante (binaural), aroma calmante e forrageio inteligente.',
    motivoEUtilidade: 'A rotina de relaxamento suprema pós-passeio ou em dias chuvosos onde o gasto de energia precisa ser 100% interno.',
    passoAPasso: [
      'Coloque música clássica ou som binaural para pets em volume baixo.',
      'Disponibilize o quebra-cabeça cognitivo junto com o tapete de lamber.',
      'Deixe o pet explorar por 15 minutos sem interferência humana.',
      'Observe como o pet relaxa e dorme profundamente após o exercício.'
    ],
    microEtapas: [
      {
        id: 'ea_5_micro_1',
        ordem: 1,
        titulo: 'Sessão Integrada de 15 Minutos',
        descricao: 'Execute a sequência completa e registre o nível de calma no histórico.',
        criterioSucesso: 'Pet apresenta sinais de bocejo de relaxamento e deita espontaneamente.',
        repeticoesRecomendadas: 1
      }
    ],
    dicaEspecial: 'Parabéns! Você dominou a ciência do enriquecimento ambiental para um pet calmo e feliz.',
    xpRecompensa: 130,
    duracaoMinutos: 6,
    especieAlvo: 'Todos',
    icone: 'Award',
    tipoFase: 'boss'
  },

  // =========================================================================
  // MÓDULO 3: EDUCAÇÃO SANITÁRIA DEFINITIVA
  // =========================================================================
  {
    id: 'stage_san_1',
    moduloId: 'sanitaria',
    ordem: 1,
    titulo: 'O Local de Ouro & Limpeza Enzimática Sem Rastro',
    subtitulo: 'Fase 1: Preparando o Banheiro Perfeito',
    descricao: 'Ajuste a distância dos comedouros e elimine marcas olfativas residuais que atraem o pet ao erro.',
    motivoEUtilidade: 'Evita a principal causa de erros: cães nunca fazem necessidades perto de onde comem ou dormem, e urinam onde ainda sentem cheiro de urina antiga.',
    passoAPasso: [
      'Garanta que o tapete ou caixa de areia esteja a pelo menos 3 metros de distância dos potes de água/comida.',
      'Limpe acidentes antigos usando APENAS produto enzimático ou vinagre de álcool diluído.',
      'NUNCA use produtos com amônia ou cândida (água sanitária), pois o cheiro de amônia estimula a micção no local!',
      'Fixe as bordas do tapete higiênico com fita adesiva para evitar que dobre nas patas.'
    ],
    microEtapas: [
      {
        id: 'san_1_micro_1',
        ordem: 1,
        titulo: 'Mapeamento do Banheiro e Distâncias',
        descricao: 'Verifique se a área sanitária é ventilada e afastada da caminha e dos potes.',
        criterioSucesso: 'Banheiro posicionado com mais de 3m de distância dos alimentos.',
        repeticoesRecomendadas: 1
      },
      {
        id: 'san_1_micro_2',
        ordem: 2,
        titulo: 'Eliminação de Produtos com Amônia',
        descricao: 'Substitua desinfetantes comuns por limpadores enzimáticos nos pisos da casa.',
        criterioSucesso: 'Piso higienizado sem resíduos de amônia.',
        repeticoesRecomendadas: 1
      }
    ],
    dicaEspecial: 'O cão tem memória olfativa mil vezes mais potente que a humana. Se houver 1 molécula de urina, ele repetirá o local.',
    xpRecompensa: 45,
    duracaoMinutos: 3,
    especieAlvo: 'Todos',
    icone: 'CheckCircle2',
    tipoFase: 'comum'
  },
  {
    id: 'stage_san_2',
    moduloId: 'sanitaria',
    ordem: 2,
    titulo: 'A Regra de Ouro dos 3 Minutos Biológicos',
    subtitulo: 'Fase 2: O Timing Perfeito das Necessidades',
    descricao: 'Antecipe as necessidades nos 3 momentos fisiológicos obrigatórios do pet para gerar acertos consecutivos.',
    motivoEUtilidade: 'O sistema digestivo dos pets funciona como um relógio biológico. Acertar o timing evita 90% dos acidentes dentro de casa.',
    passoAPasso: [
      'Momentos Biológicos: 1) Imediatamente ao acordar; 2) 15 a 20min após comer; 3) Logo após brincadeiras ativas.',
      'Leve o cão com calma até o tapete higiênico nesses horários e fique parado como um poste.',
      'Espere em silêncio por 3 minutos sem ficar conversando ou fazendo festa antes da hora.',
      'No segundo em que o fluxo de xixi terminar, faça uma festa comemorativa e entregue 2 petiscos!'
    ],
    microEtapas: [
      {
        id: 'san_2_micro_1',
        ordem: 1,
        titulo: 'O Primeiro Xixi da Manhã no Alvo',
        descricao: 'Ao acordar, leve o pet diretamente ao tapete antes de liberar o resto da casa.',
        criterioSucesso: 'Pet acerta o xixi matinal no tapete e recebe recompensa de ouro.',
        repeticoesRecomendadas: 3
      },
      {
        id: 'san_2_micro_2',
        ordem: 2,
        titulo: 'O Pós-Refeição de 20 Minutos',
        descricao: 'Cronometre 20 minutos após a ração e direcione o pet ao banheiro com calma.',
        criterioSucesso: 'Evacuação ou micção correta no tapete com supervisão atenta.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'Se ele não fizer em 5 minutos, mantenha-o por perto sob supervisão e repita a ida ao tapete em 15 minutos.',
    xpRecompensa: 60,
    duracaoMinutos: 4,
    especieAlvo: 'Todos',
    icone: 'Sparkles',
    tipoFase: 'comum'
  },
  {
    id: 'stage_san_3',
    moduloId: 'sanitaria',
    ordem: 3,
    titulo: 'Palavra-Gatilho: O Comando "Xixi Já"',
    subtitulo: 'Fase 3: Banheiro Sob Comando',
    descricao: 'Associe uma palavra específica ao ato de urinar para facilitar passeios rápidos, viagens e dias chuvosos.',
    motivoEUtilidade: 'Muito útil em viagens de carro, paradas em postos de combustível ou antes de dormir, permitindo que o pet faça as necessidades sob demanda.',
    passoAPasso: [
      'Assim que o cão começar a agachar ou erguer a pata para urinar, sussurre: "Xixi Já".',
      'Assim que o fluxo terminar, diga "Muito bem!" e entregue um petisco saboroso.',
      'Repita por 7 dias seguidos sempre no exato momento da ação.',
      'Com o tempo, ao chegar no local e falar "Xixi Já", o pet entenderá a deixa imediatamente.'
    ],
    microEtapas: [
      {
        id: 'san_3_micro_1',
        ordem: 1,
        titulo: 'Associação Verbal Durante o Fluxo',
        descricao: 'Diga a palavra exatamente durante o ato (nunca antes de ele começar a sentir vontade).',
        criterioSucesso: '7 associações perfeitas consecutivas.',
        repeticoesRecomendadas: 7
      },
      {
        id: 'san_3_micro_2',
        ordem: 2,
        titulo: 'Teste do Comando no Tapete',
        descricao: 'Leve ao tapete nos horários biológicos e dê o comando suavemente.',
        criterioSucesso: 'Pet inicia a micção em até 60 segundos após o comando.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'Fale com voz calma e suave para não assustar o pet enquanto ele está relaxando a bexiga.',
    xpRecompensa: 75,
    duracaoMinutos: 4,
    especieAlvo: 'Cão',
    icone: 'Zap',
    tipoFase: 'desafio'
  },
  {
    id: 'stage_san_4',
    moduloId: 'sanitaria',
    ordem: 4,
    titulo: 'Protocolo Felino: A Regra N+1 & Substrato Perfeito',
    subtitulo: 'Fase 4: A Caixa de Areia dos Sonhos',
    descricao: 'Elimine a rejeição de caixa em felinos através da proporção de caixas, profundidade e granulometria da areia.',
    motivoEUtilidade: 'Evita problemas no trato urinário e micção inadequada em sofás e camas causada por aversão à caixa de areia.',
    passoAPasso: [
      'Regra N+1: Número de caixas = Número de gatos na casa + 1 (exemplo: 1 gato = 2 caixas).',
      'Use areia fina, de preferência sem perfume artificial (gatos possuem olfato sensível).',
      'Mantenha uma camada generosa de 5 a 7cm de areia para permitir o hábito natural de cavar e cobrir.',
      'Limpe as fezes e torrões pelo menos 2 vezes ao dia.'
    ],
    microEtapas: [
      {
        id: 'san_4_micro_1',
        ordem: 1,
        titulo: 'Instalação da Caixa Adicional N+1',
        descricao: 'Coloque uma segunda caixa em um ponto silencioso e de fácil rota de fuga.',
        criterioSucesso: 'Gato utiliza ambas as caixas alternadamente.',
        repeticoesRecomendadas: 1
      }
    ],
    dicaEspecial: 'Caixas fechadas retêm odores fortes que podem afastar felinos. Prefira caixas amplas e abertas.',
    xpRecompensa: 70,
    duracaoMinutos: 3,
    especieAlvo: 'Gato',
    icone: 'CheckCircle2',
    tipoFase: 'comum'
  },
  {
    id: 'stage_san_5',
    moduloId: 'sanitaria',
    ordem: 5,
    titulo: 'Certificação Casa Limpa 100%',
    subtitulo: 'Fase Final (BOSS): Autonomia e Liberdade',
    descricao: '3 dias consecutivos sem nenhum acidente fora do lugar com ampliação do espaço livre da casa.',
    motivoEUtilidade: 'O selo de aprovação higiênica que permite ao tutor dar acesso total aos cômodos da casa com tranquilidade.',
    passoAPasso: [
      'Libere um novo cômodo da casa sob sua supervisão amigável.',
      'Observe se o pet volta espontaneamente ao banheiro quando sente vontade.',
      'Mantenha as recompensas ativas mesmo quando o hábito já estiver consolidado.',
      'Celebre com um carinho sincero e registre sua medalha de ouro sanitária!'
    ],
    microEtapas: [
      {
        id: 'san_5_micro_1',
        ordem: 1,
        titulo: 'Registro de 3 Dias Limpos Seguidos',
        descricao: 'Acompanhe a rotina sanitária no app por 72 horas.',
        criterioSucesso: 'Zero acidentes fora do local demarcado.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'Parabéns! Sua casa está limpa e seu pet conquistou autonomia total com reforço positivo!',
    xpRecompensa: 140,
    duracaoMinutos: 5,
    especieAlvo: 'Todos',
    icone: 'Award',
    tipoFase: 'boss'
  },

  // =========================================================================
  // MÓDULO 4: SINAIS DE CALMA & LINGUAGEM CORPORAL
  // =========================================================================
  {
    id: 'stage_sc_1',
    moduloId: 'sinais_calma',
    ordem: 1,
    titulo: 'Micro-Sinais: Lamber o Focinho & Bocejo de Tensão',
    subtitulo: 'Fase 1: O Primeiro Alerta de Desconforto',
    descricao: 'Identifique os sinais sutis que o pet emite para dizer "por favor, diminua o ritmo da interação".',
    motivoEUtilidade: 'Evita mordidas e estresse. Respeitar os micro-sinais faz com que o animal confie plenamente no tutor e nunca precise rosnar para ser ouvido.',
    passoAPasso: [
      'Observe o pet durante momentos de carinho intenso, abraços ou aproximação de visitas.',
      'Repare na pontinha da língua saindo rapidamente para lamber o próprio focinho (Lip Lick).',
      'Observe se ele dá um bocejo longo mesmo estando acordado e ativo.',
      'Se notar esses sinais, dê 2 passos para trás e dê espaço ao pet imediatamente.'
    ],
    microEtapas: [
      {
        id: 'sc_1_micro_1',
        ordem: 1,
        titulo: 'Detecção do Lip Lick (Lambida Rápida)',
        descricao: 'Identifique o movimento da língua em situações de aproximação.',
        criterioSucesso: 'Tutor recua o espaço ao menor sinal de lambedura de focinho.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'Bocejo fora da hora de dormir é o equivalente animal a uma pessoa roer as unhas por ansiedade!',
    xpRecompensa: 50,
    duracaoMinutos: 3,
    especieAlvo: 'Todos',
    icone: 'Eye',
    tipoFase: 'comum'
  },
  {
    id: 'stage_sc_2',
    moduloId: 'sinais_calma',
    ordem: 2,
    titulo: 'Desvio de Olhar & O Virar de Cabeça (Head Turn)',
    subtitulo: 'Fase 2: A Linguagem da Pacificação',
    descricao: 'Como cães e gatos desarmam tensões virando a cabeça de lado para evitar confronto direto.',
    motivoEUtilidade: 'Essencial para a comunicação do tutor: aproximar-se olhando de lado e em curva é cortês e seguro para qualquer animal.',
    passoAPasso: [
      'Quando você estiver com o celular ou câmera perto do rosto do pet, observe se ele desvia o olhar.',
      'Virar a cabeça para o lado é uma mensagem explícita de "sou pacífico, não quero confusão".',
      'Exercício do Tutor: Ao se aproximar do pet, evite olhar fixamente de frente nos olhos dele.',
      'Aproxime-se fazendo uma curva suave e olhando ligeiramente de lado.'
    ],
    microEtapas: [
      {
        id: 'sc_2_micro_1',
        ordem: 1,
        titulo: 'Aproximação em Curva Cortês',
        descricao: 'Pratique caminhar em arco suave ao se aproximar do pet deitado.',
        criterioSucesso: 'Pet permanece relaxado com a respiração solta.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'Olhar fixo de frente no reino animal é interpretado como desafio ou ameaça iminente.',
    xpRecompensa: 60,
    duracaoMinutos: 3,
    especieAlvo: 'Todos',
    icone: 'HeartHandshake',
    tipoFase: 'comum'
  },
  {
    id: 'stage_sc_3',
    moduloId: 'sinais_calma',
    ordem: 3,
    titulo: 'O "Olho de Baleia" (Whale Eye) & Rigidez Muscular',
    subtitulo: 'Fase 3: O Semáforo Amarelo-Vermelho',
    descricao: 'Aprenda a reconhecer quando o branco dos olhos fica visível indicando medo ou posse de recurso.',
    motivoEUtilidade: 'Prevenção direta de acidentes e proteção de recursos (quando o cão protege osso, ração ou sofá).',
    passoAPasso: [
      'O Olho de Baleia ocorre quando a parte branca do olho fica evidente em formato de meia-lua.',
      'Geralmente vem acompanhado de corpo duro, boca fechada e cabeça parada sobre o osso/brinquedo.',
      'NUNCA tente tirar o objeto à força nesse momento; isso provoca mordidas defensivas.',
      'Faça uma troca inteligente: jogue um petisco saboroso a 2 metros de distância para ele se afastar espontaneamente.'
    ],
    microEtapas: [
      {
        id: 'sc_3_micro_1',
        ordem: 1,
        titulo: 'Protocolo de Troca Sem Conflito',
        descricao: 'Jogue comida longe para trocar um objeto sem disputa física.',
        criterioSucesso: 'Pet larga o objeto voluntariamente para buscar a comida.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'A rigidez muscular é o sinal anterior ao rosnado. Respeite o espaço e desescalone a tensão.',
    xpRecompensa: 75,
    duracaoMinutos: 4,
    especieAlvo: 'Todos',
    icone: 'ShieldAlert',
    tipoFase: 'desafio'
  },
  {
    id: 'stage_sc_4',
    moduloId: 'sinais_calma',
    ordem: 4,
    titulo: 'A Postura de Arco (Play Bow) & Convite à Brincadeira',
    subtitulo: 'Fase 4: A Alegria em Forma de Corpo',
    descricao: 'Peito no chão, anca para cima com rabo relaxado: o código universal da diversão amigável.',
    motivoEUtilidade: 'Ajuda o tutor a diferenciar brincadeira saudável de brigas reais entre animais na praça ou em casa.',
    passoAPasso: [
      'Identifique a postura: patas dianteiras abaixadas, traseira erguida e olhar solto e piscando.',
      'Cão relaxado: corpo com movimentos sinuosos em curva (formato de S), boca entreaberta.',
      'Responda à brincadeira se agachando e dando 2 passos rápidos para trás.',
      'Faça uma sessão de 3 minutos de cabo-de-guerra ou bolinha com regras claras de soltura.'
    ],
    microEtapas: [
      {
        id: 'sc_4_micro_1',
        ordem: 1,
        titulo: 'Brincadeira com Regra de Parada',
        descricao: 'Brinque por 1 minuto, pare imóvel e peça para o pet sentar antes de recomeçar.',
        criterioSucesso: 'Pet alterna entre excitação e calma com facilidade.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'No Play Bow tudo o que acontece a seguir é consentido e amigável.',
    xpRecompensa: 70,
    duracaoMinutos: 3,
    especieAlvo: 'Todos',
    icone: 'Sparkles',
    tipoFase: 'comum'
  },
  {
    id: 'stage_sc_5',
    moduloId: 'sinais_calma',
    ordem: 5,
    titulo: 'O Decodificador Supremo da Linguagem Pet',
    subtitulo: 'Fase Final (BOSS): O Mestre da Empatia',
    descricao: 'Teste sua leitura comportamental em tempo real em 3 cenários práticos da rotina.',
    motivoEUtilidade: 'Garante que o tutor se torne a pessoa mais compreensiva, segura e amorosa para o animal.',
    passoAPasso: [
      'Cenário 1: O pet come um osso e alguém passa perto. Qual a postura da orelha e cauda?',
      'Cenário 2: Encontro com outro cão no passeio: a aproximação foi reta (tensa) ou em arco (cortês)?',
      'Cenário 3: Hora do carinho: o pet pediu mais encostando a cabeça ou virou o corpo de lado?',
      'Parabéns! Você se tornou a pessoa mais segura e confiável do mundo para o seu animal.'
    ],
    microEtapas: [
      {
        id: 'sc_5_micro_1',
        ordem: 1,
        titulo: 'Avaliação dos 3 Cenários Práticos',
        descricao: 'Analise a linguagem corporal em 3 situações do dia e anote no diário.',
        criterioSucesso: 'Tutor identifica com precisão o estado emocional do pet.',
        repeticoesRecomendadas: 1
      }
    ],
    dicaEspecial: 'Comunicação respeitosa evita acidentes e constrói uma parceria para a vida toda.',
    xpRecompensa: 160,
    duracaoMinutos: 5,
    especieAlvo: 'Todos',
    icone: 'Award',
    tipoFase: 'boss'
  },
  ...BEHAVIORAL_BOARD_STAGES
];
