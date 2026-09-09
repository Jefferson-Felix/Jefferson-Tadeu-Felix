import { BehavioralProtocol, BoardStage, TrainingModuleInfo } from '../types';

export const BEHAVIORAL_PROTOCOLS: BehavioralProtocol[] = [
  // =========================================================================
  // 1. ANSIEDADE POR SEPARAÇÃO (Independência & Ausência Sub-Limiar)
  // =========================================================================
  {
    id: 'ansiedade_separacao',
    titulo: 'Protocolo de Independência & Ansiedade por Separação',
    subtitulo: 'Treino de ausência sub-limiar, dessensibilização de gatilhos e autonomia calma',
    categoriaNome: 'Ansiedade por Separação',
    icone: 'Home',
    cor: 'text-amber-700 bg-amber-50 border-amber-200',
    bgGradiente: 'from-amber-600 via-orange-600 to-amber-800',
    regraDeOuro: 'NUNCA deixe o cão entrar em crise de pânico. O cão só aprende a ficar sozinho enquanto permanece ABAIXO do seu limiar de estresse. Se ele chorar, latir em pânico ou salivar, você foi rápido demais.',
    porQueAcontece: 'Cães são animais sociais de matilha. Ficar sozinho não é um comportamento natural biológico. Quando o vínculo é de hiperapego ou quando o cão não desenvolveu a certeza de que o tutor SEMPRE volta, a partida do tutor é interpretada pelo cérebro do cão como abandono e perigo de morte iminente.',
    tempoMedioEstimado: '3 a 6 semanas de treino diário consistente',
    etapas: [
      {
        etapaNumero: 1,
        titulo: 'Fase 1: Dessensibilização de Gatilhos de Saída (Chaves, Bolsa, Sapatos)',
        duracaoSugerida: 'Dias 1 a 5 (5x ao dia em momentos aleatórios)',
        objetivo: 'Quebrar o gatilho de ansiedade antecipatória associado aos rituais de saída.',
        oQueFazer: [
          'Pegue a chave do carro, balance o chaveiro e sente-se no sofá para mexer no celular por 3 minutos. Depois guarde a chave sem sair.',
          'Calce o sapato de sair, vá até a cozinha pegar um copo de água e tire os sapatos.',
          'Coloque a bolsa ou mochila nas costas e vá assistir TV normalmente.',
          'Toque na maçaneta da porta principal, gire-a sem abrir e volte para o cômodo.',
          'Repita esses micro-gatilhos de 5 a 10 vezes ao dia em momentos completamente aleatórios.'
        ],
        oQueNUNCAFazer: [
          'NÃO faça despedidas dramáticas ("Fica com Deus, a mamãe já volta!") — isso avisa ao cão que algo grave vai acontecer.',
          'NÃO olhe nos olhos do cão com expressão de pena ao pegar as coisas.'
        ],
        criterioAvanco: 'O cão não se levanta mais em alerta ao ouvir o barulho das chaves ou ao ver você calçar os sapatos.',
        sinaisDeAlerta: [
          'Pupilas dilatadas',
          'Respiração ofegante ao ver a bolsa',
          'Seguir você colado no calcanhar em desespero'
        ],
        microEtapas: [
          {
            id: 'as_1_1',
            ordem: 1,
            titulo: 'Gatilho do Chaveiro Neutro',
            descricao: 'Pegue o chaveiro, faça barulho e guarde sem se mover em direção à porta.',
            criterioSucesso: 'Cão permanece deitado ou não reage com taquicardia.',
            repeticoesRecomendadas: 5
          },
          {
            id: 'as_1_2',
            ordem: 2,
            titulo: 'Calçar Sapatos Sem Saída',
            descricao: 'Calce os sapatos e sente-se para ler ou trabalhar por 5 minutos.',
            criterioSucesso: 'Cão ignora os sapatos de passeio/trabalho.',
            repeticoesRecomendadas: 4
          },
          {
            id: 'as_1_3',
            ordem: 3,
            titulo: 'Toque na Maçaneta e Retorno',
            descricao: 'Vá até a porta, toque na maçaneta e volte sem abrir a porta.',
            criterioSucesso: 'Cão não pula nem corre desesperado para a porta.',
            repeticoesRecomendadas: 5
          }
        ]
      },
      {
        etapaNumero: 2,
        titulo: 'Fase 2: O Protocolo das Micro-Ausências Sub-Limiares (1s a 30s)',
        duracaoSugerida: 'Dias 6 a 12 (Sessões de 3 a 5 minutos diários)',
        objetivo: 'Construir a certeza neurológica de que a porta fecha e você reaparece imediatamente sem dor.',
        oQueFazer: [
          'Abra a porta, coloque um pé do lado de fora, feche e volte imediatamente (1 segundo). Não fale nada com o cão.',
          'Feche a porta com você do lado de fora por 3 segundos. Entre normalmente com postura neutra.',
          'Evolua gradualmente: 5s -> 10s -> 15s -> 30s com intervalos de descanso de 1 minuto entre repetições.',
          'Ao retornar, ignore o cão até que ele esteja com as 4 patas no chão e respiração calma.',
          'Utilize uma câmera ou celular conectado para monitorar o cão em tempo real.'
        ],
        oQueNUNCAFazer: [
          'NÃO ultrapasse o tempo suportado pelo cão. Se ele chorar aos 15 segundos, seu treino deve ser de 10 segundos!',
          'NÃO faça festa efusiva ao entrar. O retorno deve ser tão banal quanto entrar na cozinha.'
        ],
        criterioAvanco: 'O cão tolera 30 segundos sozinho do outro lado da porta fechada sem latir, raspar ou uivar.',
        sinaisDeAlerta: [
          'Raspar a porta com as unhas',
          'Latidos agudos ou uivos contínuos',
          'Salivação no chão da porta'
        ],
        microEtapas: [
          {
            id: 'as_2_1',
            ordem: 1,
            titulo: 'Micro-Saída de 3 Segundos',
            descricao: 'Feche a porta com você fora por 3 segundos exatos e reentre neutro.',
            criterioSucesso: 'Cão não late nem encosta em pânico na porta.',
            repeticoesRecomendadas: 5
          },
          {
            id: 'as_2_2',
            ordem: 2,
            titulo: 'Micro-Saída de 10 Segundos',
            descricao: 'Saída de 10 segundos com retorno calmo.',
            criterioSucesso: 'Cão permanece esperando sem andar de um lado para o outro.',
            repeticoesRecomendadas: 4
          },
          {
            id: 'as_2_3',
            ordem: 3,
            titulo: 'Micro-Saída de 30 Segundos',
            descricao: 'Ausência de meio minuto com monitoramento de câmera.',
            criterioSucesso: 'Cão se afasta da porta ou deita no chão.',
            repeticoesRecomendadas: 3
          }
        ]
      },
      {
        etapaNumero: 3,
        titulo: 'Fase 3: Ocupação Autônoma & Enriquecimento Pré-Saída',
        duracaoSugerida: 'Dias 13 a 20',
        objetivo: 'Associar o momento da solidão com prazer dopaminérgico de alta concentração (lamber e roer).',
        oQueFazer: [
          'Prepare um Kong ou tapete de lamber congelado (com patê, sachê, iogurte natural ou ração úmida congelada). Lamber libera endorfinas que diminuem os batimentos cardíacos.',
          'Entregue o enriquecimento congelado 5 minutos ANTES de você sair.',
          'Enquanto o cão está entretido e focado lambendo, saia de fininho sem se despedir.',
          'Inicie com saídas de 2 a 5 minutos e retorne enquanto ele ainda está terminando o enriquecimento.',
          'Ao entrar, recolha o que sobrou suavemente sem brigar ou deixe ele finalizar com calma.'
        ],
        oQueNUNCAFazer: [
          'NÃO dê brinquedos que o cão possa engolir ou engasgar sozinho.',
          'NÃO use o Kong APENAS quando for sair; dê também enquanto você está em casa para não virar um prenúncio de solidão.'
        ],
        criterioAvanco: 'O cão aceita o enriquecimento e continua focado em lamber mesmo quando ouve a porta bater.',
        sinaisDeAlerta: [
          'Cão rejeita o alimento mais gostoso do mundo assim que você pega a chave (rejeição alimentar por estresse agudo).'
        ],
        microEtapas: [
          {
            id: 'as_3_1',
            ordem: 1,
            titulo: 'Enriquecimento com Tutor Presente',
            descricao: 'Ofereça o Kong congelado com você sentado no mesmo cômodo.',
            criterioSucesso: 'Cão lambe relaxado por mais de 10 minutos.',
            repeticoesRecomendadas: 3
          },
          {
            id: 'as_3_2',
            ordem: 2,
            titulo: 'Saída de 2 Minutos com Lamber',
            descricao: 'Saia silenciosamente enquanto o cão lambe o tapete de enriquecimento.',
            criterioSucesso: 'Cão nem levanta a cabeça para conferir a porta.',
            repeticoesRecomendadas: 3
          },
          {
            id: 'as_3_3',
            ordem: 3,
            titulo: 'Saída de 5 Minutos com Lamber',
            descricao: 'Ausência de 5 minutos com enriquecimento de longa duração.',
            criterioSucesso: 'Retorno com o cão ainda ocupado e relaxado.',
            repeticoesRecomendadas: 3
          }
        ]
      },
      {
        etapaNumero: 4,
        titulo: 'Fase 4: Expansão de Tempo Seguro (5 min a 30 min)',
        duracaoSugerida: 'Dias 21 a 30',
        objetivo: 'Expandir o tempo de autonomia mantendo o cão em estado de repouso ou sono.',
        oQueFazer: [
          'Antes da saída, faça uma caminhada olfativa relaxante de 20 minutos (farejar consome muita energia mental).',
          'Deixe uma peça de roupa usada com o seu cheiro na caminha do pet.',
          'Deixe ruído branco ou música clássica suave tocando (pesquisas comprovam redução de frequência cardíaca).',
          'Alterne os tempos: nunca faça apenas aumentos! Faça: 10 min -> 3 min -> 15 min -> 5 min -> 20 min -> 30 min (isso impede o cão de prever uma escala de dificuldade crescente).'
        ],
        oQueNUNCAFazer: [
          'NÃO puna o cão se ele tiver destruído algo ou feito xixi durante a ausência! Cães não associam punição com atos passados; punir na volta só aumenta o pavor do seu retorno.'
        ],
        criterioAvanco: 'O cão dorme ou descansa confortavelmente durante 30 minutos contínuos de ausência real.',
        sinaisDeAlerta: [
          'Andar em círculos pela casa (pacing)',
          'Automutilação (lamber as patas até ferir)'
        ]
      },
      {
        etapaNumero: 5,
        titulo: 'Fase 5: Autonomia Plena & Rotina Real (1h a 4h)',
        duracaoSugerida: 'Dias 31 em diante',
        objetivo: 'Consolidação da rotina de trabalho/saídas normais da família com tranquilidade.',
        oQueFazer: [
          'Estabeleça a rotina previsível de saída.',
          'Mantenha o enriquecimento e a regra do retorno neutro nos primeiros 3 minutos de chegada.',
          'Monitore por câmera 1 vez por semana para garantir que o comportamento segue estável.'
        ],
        oQueNUNCAFazer: [
          'NÃO deixe o cão isolado por mais de 6-8 horas sem passeio sanitário e água fresca.'
        ],
        criterioAvanco: 'Cão passa de 2 a 4 horas sozinho tranquilamente sem nenhum episódio de sofrimento.',
        sinaisDeAlerta: ['Regressão temporária após viagens longas ou mudanças de casa (normal, basta retomar a Fase 2 por 3 dias).']
      }
    ],
    faqDoTutor: [
      {
        pergunta: 'Meu cão chora quando fecho a porta do banheiro, isso é ansiedade de separação?',
        resposta: 'Sim, é um sinal clássico de hiperapego e falta de tolerância a barreiras físicas. Comece treinando colocar um portãozinho entre os cômodos enquanto você está visível, recompensando a calma dele.'
      },
      {
        pergunta: 'Devo comprar outro cachorro para fazer companhia?',
        resposta: 'Não recomendado antes de tratar o primeiro! Na maioria das vezes, o cão ansioso não aprende com o outro e, pior, pode ensinar o novo cão a latir e se desesperar também.'
      },
      {
        pergunta: 'Se eu punir quando ele rasgar o sofá ele vai aprender?',
        resposta: 'Absolutamente NÃO. A destruição na ansiedade de separação é uma descarga motora involuntária de pânico (como roer unhas no ser humano). Punir gera mais ansiedade e agrava o quadro drasticamente.'
      }
    ]
  },

  // =========================================================================
  // 2. POSSE POR RECURSOS (Comida, Ossos, Brinquedos & Proteção)
  // =========================================================================
  {
    id: 'posse_recursos',
    titulo: 'Protocolo de Prevenção e Correção de Posse por Recursos',
    subtitulo: 'Treino de troca vantajosa (Trade-Up), contra-condicionamento no prato e segurança alimentar',
    categoriaNome: 'Posse por Recursos',
    icone: 'Bone',
    cor: 'text-rose-700 bg-rose-50 border-rose-200',
    bgGradiente: 'from-rose-600 via-red-600 to-rose-900',
    regraDeOuro: 'NUNCA tire nada da boca do seu cão à força e NUNCA agrida ou brigue com ele por rosnar. O rosnado é um aviso de comunicação honesto. Se você punir o rosnado, o cão passa a morder direto sem avisar. Sempre TROQUE por algo melhor!',
    porQueAcontece: 'Na natureza, perder comida ou um osso significa risco de inanição e morte. Quando o tutor enfia a mão no prato ou rouba brinquedos, o cão aprende que o ser humano é um "ladrão perigoso". A agressão defensiva é a única ferramenta que o cão tem para defender o que é dele.',
    tempoMedioEstimado: '2 a 4 semanas com protocolo de confiança',
    etapas: [
      {
        etapaNumero: 1,
        titulo: 'Fase 1: A Regra de Ouro: Proibido Roubar & Leitura dos Sinais de Posse',
        duracaoSugerida: 'Dias 1 a 4',
        objetivo: 'Interromper o ciclo de confronto humano-cão e estabelecer segurança mútua.',
        oQueFazer: [
          'Aprenda os sinais precoces de posse: corpo rígido como estátua, olho de baleia (olho arregalado mostrando a esclerótica branca), cobrir o objeto com o queixo ou pata, mastigar muito rápido.',
          'Se o cão pegou algo perigoso (ex: embalagem com veneno/remédio), NUNCA corra atrás dele gritando (ele vai engolir mais rápido). Jogue 5 pedaços de queijo/carne a 2 metros de distância dele para fazê-lo largar e se afastar espontaneamente.',
          'Dê espaço sagrado durante a refeição. Ninguém deve incomodar ou fazer carinho invasivo na cabeça do cão enquanto ele come.'
        ],
        oQueNUNCAFazer: [
          'NUNCA mexa na ração dele com a mão para "mostrar quem manda" (isso é um mito prejudicial que CRIA posse por recursos).',
          'NUNCA bata no focinho ou force a boca para abrir.'
        ],
        criterioAvanco: 'Toda a família parou completamente de confrontar o cão e sabe respeitar os sinais de distância.',
        sinaisDeAlerta: ['Rosnado gutural ao passar perto', 'Corpo imóvel travado sobre o objeto']
      },
      {
        etapaNumero: 2,
        titulo: 'Fase 2: Contra-Condicionamento Clássico na Hora do Prato',
        duracaoSugerida: 'Dias 5 a 10 (Durante todas as refeições)',
        objetivo: 'Fazer o cão associar a aproximação humana com a chegada de algo 10x mais saboroso.',
        oQueFazer: [
          'Coloque a comida normal do cão no prato.',
          'Enquanto ele come, caminhe calmamente lateralmente (sem olhar fixo) a uma distância segura de 2 a 3 metros.',
          'Arremesse um pedaço de frango desfiado, queijo ou petisco nobre DENTRO ou ao lado do prato dele.',
          'Diga uma palavra alegre ("Olha o bônus!") e afaste-se imediatamente.',
          'Repita 2 a 3 vezes por refeição. O cão deve pensar: "Oba! O humano se aproximou, significa que vai chover petisco incrível no meu prato!".'
        ],
        oQueNUNCAFazer: [
          'NÃO tente tocar no prato nos primeiros dias.',
          'NÃO fique em pé curvado em cima do cão em postura ameaçadora.'
        ],
        criterioAvanco: 'Quando você se aproxima do prato, o cão levanta a cabeça com a cauda abanando esperando o petisco bônus em vez de rosnar ou travar.',
        sinaisDeAlerta: ['Comer em velocidade desesperada ao ouvir passos'],
        microEtapas: [
          {
            id: 'pr_2_1',
            ordem: 1,
            titulo: 'Arremesso a 3 Metros',
            descricao: 'Passe a 3 metros do cão comendo e arremesse o petisco nobre sem parar.',
            criterioSucesso: 'Cão olha com curiosidade amigável.',
            repeticoesRecomendadas: 4
          },
          {
            id: 'pr_2_2',
            ordem: 2,
            titulo: 'Arremesso a 1 Metro',
            descricao: 'Aproxime-se a 1 metro, jogue o bônus no prato e dê 2 passos para trás.',
            criterioSucesso: 'Cão aceita a aproximação com postura corporal relaxada.',
            repeticoesRecomendadas: 4
          }
        ]
      },
      {
        etapaNumero: 3,
        titulo: 'Fase 3: O Jogo da Troca Vantajosa ("Trade-Up") com Brinquedos',
        duracaoSugerida: 'Dias 11 a 18',
        objetivo: 'Ensinar o cão que abrir mão de um objeto gera uma recompensa MAIOR e o objeto é DEVOLVIDO.',
        oQueFazer: [
          'Inicie com um brinquedo de BAIXO valor (ex: uma bolinha velha ou bichinho de pelúcia comum).',
          'Quando o cão estiver com o brinquedo na boca, pegue um pedaço de carne/frango e coloque na frente do nariz dele (a 3 cm).',
          'O cão vai soltar o brinquedo para comer a carne. No instante em que ele soltar, marque: "Isso! / Solta!" e dê a carne.',
          'A REGRA MÁGICA: Assim que ele engolir a carne, PEGUE O BRINQUEDO E DEVOLVA PARA ELE!',
          'Isso quebra a lógica do roubo: o cão aprende que soltar não significa perder o objeto, e sim ganhar comida E continuar brincando.'
        ],
        oQueNUNCAFazer: [
          'NÃO esconda o brinquedo nas costas após a troca nos primeiros 10 dias.',
          'NÃO use objetos de valor altíssimo (como ossos de verdade) antes de dominar brinquedos comuns.'
        ],
        criterioAvanco: 'O cão solta o brinquedo imediatamente ao ver o petisco na sua mão sem hesitar.',
        sinaisDeAlerta: ['Tentar fugir para baixo da cama com o brinquedo'],
        microEtapas: [
          {
            id: 'pr_3_1',
            ordem: 1,
            titulo: 'Troca com Brinquedo Neutro',
            descricao: 'Ofereça petisco de alto valor na troca de uma pelúcia e devolva a pelúcia.',
            criterioSucesso: 'Soltura espontânea em menos de 2 segundos.',
            repeticoesRecomendadas: 5
          },
          {
            id: 'pr_3_2',
            ordem: 2,
            titulo: 'Comando Verbal "Larga / Solta"',
            descricao: 'Diga "Larga", espere 1 segundo e apresente a recompensa.',
            criterioSucesso: 'Cão solta ao ouvir a palavra antes de ver a comida.',
            repeticoesRecomendadas: 5
          }
        ]
      },
      {
        etapaNumero: 4,
        titulo: 'Fase 4: Troca Segura com Itens de Alto Valor (Ossos e Mordedores Naturais)',
        duracaoSugerida: 'Dias 19 a 28',
        objetivo: 'Aplicar a troca vantajosa em recursos biológicos de alta disputa com 100% de segurança.',
        oQueFazer: [
          'Entregue um mordedor natural (ex: orelha bovina ou casco).',
          'Segure uma ponta do mordedor enquanto o cão rói a outra ponta, premiando com carinho calmo e pedaços de frango.',
          'Para fazer a troca final, aproxime uma tigela com 3 pedaços de carne nobre, diga "Larga", pegue o mordedor e deixe o cão se deliciar na tigela.',
          'Guarde o mordedor e faça uma sessão de carinho ou brincadeira.'
        ],
        oQueNUNCAFazer: [
          'NÃO tente arrancar o osso puxando com força de cabo de guerra se o cão estiver com a mandíbula travada.'
        ],
        sinaisDeAlerta: [
          'Corpo enrijecido',
          'Olhar de baleia (branco dos olhos visível)',
          'Mastigação acelerada para engolir rápido'
        ],
        criterioAvanco: 'O cão aceita a troca de qualquer osso ou mordedor sem tensão muscular ou rosnados.'
      }
    ],
    faqDoTutor: [
      {
        pergunta: 'Meu cão rosnou quando cheguei perto do prato. Devo puni-lo para ele saber que sou o líder?',
        resposta: 'NÃO! A teoria da dominância em cães já foi desmentida pela ciência comportamental moderna. Rosnar significa: "Estou com medo de você roubar minha comida". Se você brigar ou bater, você confirma o medo dele. Aproxime-se jogando petiscos ainda melhores para construir confiança.'
      },
      {
        pergunta: 'Ele só faz posse quando acha restos de comida na rua, o que fazer?',
        resposta: 'Trabalhe o comando "Deixa" preventivamente em casa antes do passeio. Na rua, tenha sempre petiscos irresistíveis na bolsinha para trocar caso ele capture algo indesejado.'
      }
    ]
  },

  // =========================================================================
  // 3. POSSE POR AMBIENTE & ESPAÇOS (Sofá, Cama, Portas e Corredores)
  // =========================================================================
  {
    id: 'posse_ambiente',
    titulo: 'Protocolo de Posse por Espaço, Sofá, Cama & Limite de Ambientes',
    subtitulo: 'Comando de referência (Place), dessensibilização de locais de descanso e controle de passagem',
    categoriaNome: 'Posse por Ambiente',
    icone: 'Compass',
    cor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    bgGradiente: 'from-indigo-600 via-indigo-700 to-indigo-900',
    regraDeOuro: 'NUNCA empurre fisicamente ou puxe o cão pela coleira para tirá-lo do sofá ou da cama se ele estiver em guarda. Convide-o a sair com uma recompensa valiosa na caminha dele. O espaço deve ser gerido com convite positivo, não com confronto de força.',
    porQueAcontece: 'Locais elevados e acolchoados (sofás, camas) proporcionam conforto térmico e visão panorâmica privilegiada da casa. Cães inseguros ou territoriais sentem a necessidade de defender esse "posto de observação" contra quem se aproxima, especialmente quando estão descansando e são acordados de surpresa.',
    tempoMedioEstimado: '2 a 3 semanas de gerenciamento e treino',
    etapas: [
      {
        etapaNumero: 1,
        titulo: 'Fase 1: Gerenciamento de Acesso & Desmistificação do Sofá',
        duracaoSugerida: 'Dias 1 a 5',
        objetivo: 'Interromper conflitos diários enquanto o cão aprende o comando de referência.',
        oQueFazer: [
          'Se o cão tem histórico de rosnar no sofá ou na cama, restrinja temporariamente o acesso livre com um cobertor virado, banquetas ou portas fechadas quando você não estiver supervisionando.',
          'Deixe uma guia de treinamento leve (sem alça) no peitoral do cão dentro de casa para você poder guiá-lo sem precisar encostar na nuca ou no dorso em momentos de tensão.',
          'Disponibilize uma caminha ortopédica ultra-confortável perto do sofá para que o cão tenha uma alternativa tão boa quanto o móvel.'
        ],
        oQueNUNCAFazer: [
          'NÃO acorde o cão com toques bruscos quando ele estiver deitado em locais altos.',
          'NÃO tente empurrar o cão com as pernas ou braços.'
        ],
        criterioAvanco: 'Ambiente controlado sem novos episódios de rosnados por 5 dias consecutivos.',
        sinaisDeAlerta: ['Rigidez ao sentar no sofá ao lado do cão']
      },
      {
        etapaNumero: 2,
        titulo: 'Fase 2: O Comando "Desce" com Convite Vantajoso',
        duracaoSugerida: 'Dias 6 a 12',
        objetivo: 'Ensinar o cão a desocupar o móvel prontamente com uma palavra alegre.',
        oQueFazer: [
          'Quando o cão estiver no sofá, fique a 1 metro de distância, estenda a mão com um petisco delicioso em direção ao chão e diga com voz animada: "Desce!".',
          'Assim que as 4 patas tocarem o chão, marque com "Isso!" e entregue o petisco no chão.',
          'Em seguida, guie o cão com outro petisco até a caminha dele ("Vai pro seu lugar") e entregue um mordedor para ele ficar feliz no chão.',
          'Sofá e cama passam a ser um privilégio condicional mediante convite explícito do tutor ("Sobe"), e nunca uma posse inegociável.'
        ],
        oQueNUNCAFazer: [
          'NÃO grite irritado "SAI DAÍ AGORA!". Mantenha o tom de convite cooperativo.',
          'NÃO permita que o cão suba de volta imediatamente após ganhar o petisco sem permissão.'
        ],
        criterioAvanco: 'Cão desce do sofá com apenas o comando verbal "Desce" em 100% das vezes.',
        sinaisDeAlerta: ['Rosnar ou mostrar os dentes quando o tutor pede para descer'],
        microEtapas: [
          {
            id: 'pa_2_1',
            ordem: 1,
            titulo: 'Isca no Chão ("Desce")',
            descricao: 'Coloque o petisco a 30 cm do sofá e diga "Desce" no salto.',
            criterioSucesso: 'Cão desce voluntariamente sem tocar nele.',
            repeticoesRecomendadas: 5
          },
          {
            id: 'pa_2_2',
            ordem: 2,
            titulo: 'Desce + Vai pra Caminha',
            descricao: 'Conduza do sofá diretamente para a caminha própria dele com super recompensa.',
            criterioSucesso: 'Cão deita na caminha satisfeito.',
            repeticoesRecomendadas: 4
          }
        ]
      },
      {
        etapaNumero: 3,
        titulo: 'Fase 3: O Comando de Referência / "Place" para Corredores e Portas',
        duracaoSugerida: 'Dias 13 a 20',
        objetivo: 'Resolver a guarda de corredores, portas e passagens estreitas.',
        oQueFazer: [
          'Ensine o cão a ir para um tapete de referência ("Place") sempre que houver movimentação de pessoas na casa ou barulho de campainha.',
          'Em corredores estreitos, nunca passe por cima do cão se ele estiver deitado em guarda. Chame-o alegremente para o outro cômodo com um brinquedo.',
          'Recompense com frequência quando o cão estiver deitado calmo na sua própria caminha enquanto a família transita livremente pela casa.'
        ],
        oQueNUNCAFazer: [
          'NÃO chute ou passe raspando no cão para forçá-lo a sair do corredor.'
        ],
        criterioAvanco: 'Cão vai para o "Place" ao menor sinal de movimentação ou campainha e permanece relaxado.',
        sinaisDeAlerta: ['Bloquear a passagem rosnando ao ver alguém se aproximar']
      }
    ],
    faqDoTutor: [
      {
        pergunta: 'Meu cão nunca mais vai poder subir no sofá?',
        resposta: 'Pode sim! Mas o sofá deve ser liberado sob convite ("Sobe!") e ele deve descer alegremente quando solicitado ("Desce!"). Durante o tratamento inicial, recomendamos uma pausa temporária de 1 a 2 semanas para reconfigurar o valor do espaço.'
      },
      {
        pergunta: 'Se eu passar perto da caminha dele devo falar com ele?',
        resposta: 'Passe jogando um petisco perto dele para que ele saiba que a sua presença perto do refúgio dele é sempre um evento positivo e não uma invasão.'
      }
    ]
  }
];

// Módulos especializados para o Tabuleiro
export const BEHAVIORAL_MODULES: TrainingModuleInfo[] = [
  {
    id: 'ansiedade_separacao',
    nome: 'Ansiedade por Separação & Independência',
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
    nome: 'Posse por Recursos (Comida, Ossos & Brinquedos)',
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
    nome: 'Posse por Espaço, Sofá, Cama & Portas',
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
  }
];

// Fases de Tabuleiro para os módulos comportamentais
export const BEHAVIORAL_BOARD_STAGES: BoardStage[] = [
  // ANSIEDADE POR SEPARAÇÃO
  {
    id: 'stage_as_1',
    moduloId: 'ansiedade_separacao',
    ordem: 1,
    titulo: 'Dessensibilização de Chaves, Sapatos e Bolsas',
    subtitulo: 'Fase 1: Quebrando a Ansiedade Antecipatória',
    descricao: 'Ensine o cão a ignorar os rituais de saída pegando chaves e calçando sapatos sem sair de casa.',
    motivoEUtilidade: 'Cães com ansiedade de separação entram em taquicardia muito antes de você sair pela porta. Dessensibilizar esses gatilhos quebra o ciclo de pânico na raiz.',
    passoAPasso: [
      'Pegue o chaveiro e sente-se no sofá por 3 minutos mexendo no celular.',
      'Calce os sapatos de sair e vá para a cozinha tomar um copo d\'água.',
      'Toque na maçaneta da porta principal sem abrir e retorne para o cômodo.',
      'Repita de 5 a 8 vezes ao dia em momentos neutros.'
    ],
    microEtapas: [
      {
        id: 'as_1_micro_1',
        ordem: 1,
        titulo: 'Chaveiro Neutro',
        descricao: 'Faça barulho com a chave e guarde sem se dirigir à porta.',
        criterioSucesso: 'Cão não levanta nem fica em alerta.',
        repeticoesRecomendadas: 5
      },
      {
        id: 'as_1_micro_2',
        ordem: 2,
        titulo: 'Sapatos e Caminhada Interna',
        descricao: 'Calce os sapatos de sair e permaneça em casa.',
        criterioSucesso: 'Cão ignora os sapatos de passeio.',
        repeticoesRecomendadas: 4
      },
      {
        id: 'as_1_micro_3',
        ordem: 3,
        titulo: 'Giro de Maçaneta',
        descricao: 'Gire a maçaneta sem abrir e volte com postura calma.',
        criterioSucesso: 'Cão não corre desesperado para a porta.',
        repeticoesRecomendadas: 5
      }
    ],
    dicaEspecial: 'Evite despedidas emotivas ("Fica com Deus, volto logo!"). Isso só avisa ao cão que algo ruim vai acontecer.',
    xpRecompensa: 50,
    duracaoMinutos: 3,
    especieAlvo: 'Cão',
    icone: 'Home',
    tipoFase: 'comum'
  },
  {
    id: 'stage_as_2',
    moduloId: 'ansiedade_separacao',
    ordem: 2,
    titulo: 'Micro-Saídas Sub-Limiares (1s a 30s)',
    subtitulo: 'Fase 2: A Certeza do Retorno Imediato',
    descricao: 'Treine ausências curtas de 1 segundo a 30 segundos, sempre abaixo do limiar de choro do cão.',
    motivoEUtilidade: 'O cão precisa aprender que uma porta fechada não é uma sentença de abandono eterno. Pequenas vitórias constroem resiliência emocional.',
    passoAPasso: [
      'Passe para o lado de fora da porta por 3 segundos e reentre neutro.',
      'Avance para 10s e depois 30s com intervalos de 1 minuto de descanso.',
      'Ao entrar, ignore o cão até que ele esteja com as 4 patas no chão.',
      'Monitore por câmera para garantir que o treino foi sem choro.'
    ],
    microEtapas: [
      {
        id: 'as_2_micro_1',
        ordem: 1,
        titulo: 'Saída de 3 Segundos',
        descricao: 'Saia e volte em 3 segundos sem falar nada.',
        criterioSucesso: 'Cão não raspa a porta nem late.',
        repeticoesRecomendadas: 5
      },
      {
        id: 'as_2_micro_2',
        ordem: 2,
        titulo: 'Saída de 15 Segundos',
        descricao: 'Ausência de 15 segundos com retorno tranquilo.',
        criterioSucesso: 'Cão aguarda sentado ou deitado.',
        repeticoesRecomendadas: 4
      },
      {
        id: 'as_2_micro_3',
        ordem: 3,
        titulo: 'Saída de 30 Segundos',
        descricao: 'Meio minuto fora com postura neutra ao entrar.',
        criterioSucesso: 'Cão afasta-se da porta sem aflição.',
        repeticoesRecomendadas: 3
      }
    ],
    dicaEspecial: 'Se o cão chorar aos 20 segundos, volte o treino para 10 segundos. Nunca treine com o cão em pânico.',
    xpRecompensa: 60,
    duracaoMinutos: 5,
    especieAlvo: 'Cão',
    icone: 'Clock',
    tipoFase: 'desafio'
  },
  {
    id: 'stage_as_3',
    moduloId: 'ansiedade_separacao',
    ordem: 3,
    titulo: 'Enriquecimento Pré-Saída & Ocupação Autônoma',
    subtitulo: 'Fase 3: Dopamina e Lamber Calmante',
    descricao: 'Entregue um Kong ou tapete de lamber congelado 5 minutos antes de sair para associar a solidão com prazer dopaminérgico.',
    motivoEUtilidade: 'O ato mecânico de lamber e roer libera endorfinas e reduz os batimentos cardíacos, ocupando a mente do cão nos primeiros minutos críticos de partida.',
    passoAPasso: [
      'Prepare um brinquedo recheado com sachê/ração úmida e congele por 4 horas.',
      'Entregue o brinquedo no chão 5 minutos antes da saída.',
      'Saia silenciosamente enquanto o cão está lambendo.',
      'Retorne após 5 a 10 minutos enquanto ele ainda está focado.'
    ],
    dicaEspecial: 'Dê o Kong congelado também quando estiver em casa para não virar um sinal de que você vai embora.',
    xpRecompensa: 75,
    duracaoMinutos: 10,
    especieAlvo: 'Cão',
    icone: 'Sparkles',
    tipoFase: 'recompensa'
  },

  // POSSE POR RECURSOS
  {
    id: 'stage_pr_1',
    moduloId: 'posse_recursos',
    ordem: 1,
    titulo: 'A Regra de Ouro: Nunca Roubar do Cão & Leitura de Sinais',
    subtitulo: 'Fase 1: Parar o Confronto e Entender o Rosnado',
    descricao: 'Aprenda a ler a rigidez corporal e respeitar o aviso do rosnado sem punição física ou gritos.',
    motivoEUtilidade: 'Punir o rosnado ensina o cão a morder sem avisar. Parar de roubar coisas da boca restaura a confiança do cão no ser humano.',
    passoAPasso: [
      'Identifique sinais precoces: corpo rígido, olho de baleia, queixo sobre o objeto.',
      'Se o cão pegou algo perigoso, jogue pedaços de carne a 2 metros de distância em vez de correr atrás dele.',
      'Estabeleça espaço sagrado durante as refeições sem toques invasivos na cabeça.'
    ],
    dicaEspecial: 'Nunca enfie a mão no prato de comida do cão para "mostrar dominância". Isso cria posse por recursos.',
    xpRecompensa: 50,
    duracaoMinutos: 3,
    especieAlvo: 'Cão',
    icone: 'ShieldAlert',
    tipoFase: 'comum'
  },
  {
    id: 'stage_pr_2',
    moduloId: 'posse_recursos',
    ordem: 2,
    titulo: 'Contra-Condicionamento no Prato de Ração',
    subtitulo: 'Fase 2: "Humano Chegando = Chove Frango!"',
    descricao: 'Aproxime-se a 2 metros do cão comendo e arremesse um petisco nobre dentro do prato, recuando imediatamente.',
    motivoEUtilidade: 'Transforma o medo do cão de perder o prato na certeza de que a aproximação humana traz comida ainda melhor.',
    passoAPasso: [
      'Coloque a ração habitual no prato do cão.',
      'Caminhe lateralmente a 2 metros de distância dele.',
      'Arremesse um pedaço de frango/queijo dentro do prato e diga "Olha o bônus!".',
      'Afaste-se imediatamente. Repita 2 a 3 vezes por refeição.'
    ],
    microEtapas: [
      {
        id: 'pr_2_micro_1',
        ordem: 1,
        titulo: 'Arremesso a 3 Metros',
        descricao: 'Passe a 3 metros e arremesse o bônus nobre.',
        criterioSucesso: 'Cão olha amigável e come o petisco.',
        repeticoesRecomendadas: 4
      },
      {
        id: 'pr_2_micro_2',
        ordem: 2,
        titulo: 'Aproximação a 1 Metro',
        descricao: 'Chegue a 1 metro, jogue o petisco no prato e dê 2 passos para trás.',
        criterioSucesso: 'Corpo relaxado e cauda solta.',
        repeticoesRecomendadas: 4
      }
    ],
    dicaEspecial: 'Não tente tirar o prato nos primeiros dias; o objetivo é puramente gerar associação positiva.',
    xpRecompensa: 65,
    duracaoMinutos: 5,
    especieAlvo: 'Cão',
    icone: 'Utensils',
    tipoFase: 'desafio'
  },
  {
    id: 'stage_pr_3',
    moduloId: 'posse_recursos',
    ordem: 3,
    titulo: 'O Jogo da Troca Vantajosa (Trade-Up) & Devolução',
    subtitulo: 'Fase 3: Trocar por Melhor e Receber o Brinquedo de Volta',
    descricao: 'Ensine o comando "Larga/Solta" oferecendo carne na troca de um brinquedo e devolvendo o brinquedo em seguida.',
    motivoEUtilidade: 'Quando o cão aprende que soltar um objeto faz ele ganhar comida E receber o brinquedo de volta, a necessidade de defender desaparece.',
    passoAPasso: [
      'Inicie com um brinquedo de baixo valor.',
      'Apresente carne na frente do nariz do cão; no instante em que soltar o brinquedo, marque "Isso!" e entregue a carne.',
      'Assim que engolir, DEVOLVA O BRINQUEDO para ele!',
      'Evolua para brinquedos de maior valor aos poucos.'
    ],
    dicaEspecial: 'Devolver o objeto após a troca é o segredo para o cão nunca mais fugir ou rosnar.',
    xpRecompensa: 80,
    duracaoMinutos: 5,
    especieAlvo: 'Cão',
    icone: 'Gift',
    tipoFase: 'boss'
  },

  // POSSE POR AMBIENTE
  {
    id: 'stage_pa_1',
    moduloId: 'posse_ambiente',
    ordem: 1,
    titulo: 'O Comando "Desce" com Convite Vantajoso',
    subtitulo: 'Fase 1: Desocupar o Sofá/Cama sem Confronto',
    descricao: 'Ensine o cão a descer do sofá com petiscos no chão e guia de treinamento leve, sem empurrões.',
    motivoEUtilidade: 'Empurrar um cão territorial gera reflexo de oposição e mordidas. O convite com reforço no chão ensina cooperação voluntária.',
    passoAPasso: [
      'Com o cão no sofá, estenda a mão com petisco em direção ao chão e diga "Desce!".',
      'No toque das 4 patas no chão, marque "Isso!" e entregue a recompensa no chão.',
      'Em seguida, guie o cão com outro petisco até a caminha dele e entregue um mordedor.',
      'Nunca empurre ou puxe pela coleira bruscamente.'
    ],
    microEtapas: [
      {
        id: 'pa_1_micro_1',
        ordem: 1,
        titulo: 'Isca no Solo ("Desce")',
        descricao: 'Coloque o petisco a 30 cm do sofá chamando com voz alegre.',
        criterioSucesso: 'Cão salta voluntariamente para o chão.',
        repeticoesRecomendadas: 5
      },
      {
        id: 'pa_1_micro_2',
        ordem: 2,
        titulo: 'Desce e Vai pra Caminha',
        descricao: 'Conduza do sofá diretamente para a caminha própria dele.',
        criterioSucesso: 'Cão deita na caminha satisfeito.',
        repeticoesRecomendadas: 4
      }
    ],
    dicaEspecial: 'Sofá e cama devem ser privilégios mediante convite explícito ("Sobe"), e nunca direitos inegociáveis.',
    xpRecompensa: 50,
    duracaoMinutos: 3,
    especieAlvo: 'Cão',
    icone: 'Compass',
    tipoFase: 'comum'
  },
  {
    id: 'stage_pa_2',
    moduloId: 'posse_ambiente',
    ordem: 2,
    titulo: 'Comando de Referência ("Place") para Corredores e Portas',
    subtitulo: 'Fase 2: O Refúgio Seguro da Caminha',
    descricao: 'Ensine o cão a ir para a caminha ao ouvir movimentação de pessoas ou campainha, desobstruindo passagens.',
    motivoEUtilidade: 'Evita a guarda de corredores estreitos e a reatividade em portas de entrada de apartamentos e casas.',
    passoAPasso: [
      'Posicione uma caminha confortável fora da linha de passagem direta.',
      'Guie o cão com petisco até a caminha e marque "Place / Caminha!".',
      'Recompense a permanência deitado enquanto pessoas caminham pelo cômodo.',
      'Libere com a palavra "Livre!".'
    ],
    dicaEspecial: 'Recompense com frequência o cão deitado relaxado no tapete dele sem ninguém ter pedido.',
    xpRecompensa: 70,
    duracaoMinutos: 5,
    especieAlvo: 'Cão',
    icone: 'Award',
    tipoFase: 'desafio'
  }
];
