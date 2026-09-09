# Documentação da Versão 1.0 (Beta) — AdestraPet / ConectaPet

**Data da Versão:** Setembro de 2026  
**Status do Projeto:** Versão Beta de Testes Fechados com Tutores  
**Link de Prévia para Tutores (Shared Preview):** `https://ais-pre-z2lyahgspm2nqz5d62cmtm-47397970923.us-east5.run.app`  
**Responsável Técnico / Criador:** Jefferson Tadeu

---

## 1. Visão Geral do Produto

O **AdestraPet** é uma plataforma web e aplicativo de **adestramento positivo gamificado** desenhado para aproximar tutores e seus cães/gatos através de uma metodologia passo a passo, sem punições e estruturada como um **jogo de tabuleiro interativo**.

O aplicativo resolve os principais problemas de engajamento do tutor no adestramento tradicional:
1. **Falta de tempo**: Sessões curtas guiadas por cronômetro (3 a 15 minutos).
2. **Falta de clareza**: Cada fase possui critérios objetivos de avanço e micro-etapas.
3. **Comportamentos complexos**: Consultorias autônomas para problemas graves (ansiedade por separação e posse de recursos/espaço).
4. **Desmotivação**: Sistema de pontuação (XP), patentes, ranking, dado da sorte diário e **loja de petiscos com cupons de desconto reais** em parceiros.

---

## 2. Arquitetura Funcional & Módulos Implementados

### 🎲 A. Tabuleiro Interativo de Fases (Gamificação Central)
- **Visual de Peão Customizado:** O avatar do próprio pet caminha pelas casas do tabuleiro.
- **Tipos de Fases:**
  - *Comum:* Treinos fundamentais de base.
  - *Desafio:* Micro-etapas com maior exigência de repetição e foco.
  - *Recompensa:* Ganho dobrado de XP e petiscos.
  - *Chefe (Boss):* Fase de consolidação e prova com distração para desbloqueio do próximo módulo.
- **Dado da Sorte Diário:** Roleta/dado com bônus diário de XP e Petiscos para incentivar o retorno diário do tutor ao app.
- **Detalhamento da Fase:** Modal com explicação científica (*Por que fazer?*), passo a passo detalhado, checklist de micro-etapas com repetições e botão para iniciar direto no cronômetro.

---

### 🧠 B. Consultoria Comportamental Autônoma (Metodologia Gradativa)
Protocolos estruturados para o tutor corrigir comportamentos complexos em casa sem confronto:

1. **Ansiedade por Separação (Ausência Sub-Limiar):**
   - *Fase 1:* Dessensibilização de gatilhos (chaves, bolsas, sapatos).
   - *Fase 2:* Micro-ausências (1s, 5s, 15s até 30s) abaixo do limiar de pânico.
   - *Fase 3:* Ocupação autônoma dopaminérgica (brinquedos recheáveis e lamber calmante).
   - *Fase 4:* Expansão de tempo e saídas reais (5 min a 4h).
2. **Posse por Recursos (Alimentação, Ossos e Brinquedos):**
   - *Regra de Ouro:* Proibição do roubo e da punição ao rosnado.
   - *Contra-condicionamento no prato:* O humano que se aproxima joga petiscos nobres.
   - *O Jogo da Troca Vantajosa (Trade-Up):* O cão solta o objeto, ganha comida de alto valor e recebe o brinquedo de volta.
3. **Posse por Ambiente (Guarda de Sofá, Cama e Portas):**
   - Comando "Desce" com reforço no solo.
   - Comando de Referência (*Place*) na caminha zen para desobstrução de corredores.

---

### ⏱️ C. Treino Guiado & Marcadores (Clicker & Verbal)
- **Cronômetro com Modos de Rotina:**
  - *Micro-Doses (3 min)* — Para filhotes e dias corridos.
  - *Iniciante (5 min)* — A dose diária recomendada.
  - *Focado (10 min)* — Sequências combinadas.
  - *Avançado (15 min)* — Sessões de alta distração.
- **Simulador de Clicker e Marcador Verbal Integrado:**
  - Sintetizador de áudio para clicker mecânico, beep de frequência e estalo de boca.
  - Marcadores verbais personalizáveis (*"Sim!"*, *"Muito bem!"*, *"Yes!"*).
  - Áudios de recompensa e contagem regressiva motivacional.
- **Avaliação Pós-Treino:** Registro de nota (estrelas), anotações de foco e envio automático de dados.

---

### 📋 D. Anamnese Inteligente & Integração com Google Sheets
- Formulário comportamental completo: espécie, idade, rotina de passeios, alimentação, desafios comportamentais e histórico de saúde/coluna.
- **Diagnóstico Comportamental Automático:** Identifica problemas selecionados pelo tutor e indica o protocolo ideal.
- **Sincronização com Google Sheets:** Envio automático das respostas da anamnese e do histórico de treinos via Google Apps Script (Web App).

---

### 🐕 E. Customização de Avatares & Raças
- Biblioteca de raças para cães e gatos (*Caramelo, Fiapo de Manga, Spitz, Pinscher, Poodle, Golden, Border Collie, Pastor Alemão, Malinois, Dobermann, Pit Bull, Gato Siamês, Rajado, etc.*).
- Personalização de porte (*Pequeno, Médio, Grande, Gigante*) e tonalidades de pelagem.

---

### 🪙 F. Economia de PETCOINS & Loja de Recompensas Reais
- Conversão do progresso em saldo de **PETCOINS (🪙)**.
- Vitrine de parceiros com itens de enriquecimento e mastigação (*Orelhas desidratadas, mordedores de casco, brinquedos tipo Kong, guias longas*).
- Geração de **códigos de cupons de desconto reais** resgatáveis com PETCOINS no app.

---

## 3. Guia de Teste Beta para Tutores (Passo a Passo)

### O que enviar para os tutores no WhatsApp / E-mail:

```text
Olá! 🐶🐱 
Você foi selecionado(a) com exclusividade para testar em primeira mão a versão Beta do nosso aplicativo de treino e comportamento pet!

📱 Link de Acesso Direto (abra no celular):
https://ais-pre-z2lyahgspm2nqz5d62cmtm-47397970923.us-east5.run.app

O que você pode fazer no app:
1. Cadastrar o seu pet e escolher a raça/porte dele.
2. Responder a Anamnese Comportamental para receber o diagnóstico imediato.
3. Jogar o "Dado da Sorte" e treinar as primeiras fases do Tabuleiro de Adestramento.
4. Experimentar o Treino de 5 Minutos com o Clicker / Marcador no celular.
5. Explorar os protocolos de Ansiedade por Separação e Posse se o seu pet tiver esses desafios!
6. Acumular petiscos e ver os cupons da nossa Loja de Recompensas.

Por favor, faça um treino rápido hoje com o seu pet e me conte:
- O que você mais gostou?
- Teve alguma parte difícil de entender ou travamento?

Seu feedback vai nos ajudar a deixar o app incrível! 🚀
```

---

## 4. Roteiro de Validação com os Tutores Beta

Recomendamos monitorar os seguintes pontos durante os testes:

| Área de Teste | O que observar no comportamento do tutor |
| :--- | :--- |
| **Onboarding & Cadastro** | O tutor consegue cadastrar o pet e entender a dinâmica do avatar sem dúvidas? |
| **Anamnese** | O tempo de preenchimento é fluido? O diagnóstico gerado faz sentido para a queixa dele? |
| **Prática com o Timer** | O tutor usou o clicker ou marcador sonoro durante a sessão de treino de 5 minutos? |
| **Engajamento no Tabuleiro** | Ele completou ao menos 2 fases e jogou o dado no dia seguinte? |
| **Consultoria Comportamental** | A leitura das regras de ouro e micro-etapas foi clara e fácil de aplicar na rotina? |

---

## 5. Próximos Passos (Roadmap Pós-Beta)

1. Coleta das métricas de retenção e dúvidas frequentes dos tutores.
2. Implementação de notificações de lembrete diário de treino (PWA).
3. Integração com links diretos das lojas parceiras no resgate de cupons.
4. Painel do Adestrador para acompanhamento remoto de alunos.
