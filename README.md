# 🐾 ConectaPet - Gamified Pet Training & Behavioral Analytics Platform

![Status](https://img.shields.io/badge/Status-Live%20Production-emerald?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20TypeScript%20%7C%20TailwindCSS-blue?style=for-the-badge)
![Data](https://img.shields.io/badge/Data%20Pipeline-Google%20Sheets%20%7C%20Looker%20Studio%20%7C%20Python-orange?style=for-the-badge)
![Compliance](https://img.shields.io/badge/LGPD-Privacy%20by%20Design-purple?style=for-the-badge)

> **Plataforma web gamificada para adestramento positivo e saúde comportamental pet com pipeline de dados integrado para Google Sheets, Looker Studio e Python.**

---

## 🚀 Aplicação em Produção
- 📱 **App Web / PWA:** [https://conectapet-jornada-anamnese-pet.ai.studio](https://conectapet-jornada-anamnese-pet.ai.studio)
- 📊 **Dataset Analítico:** Exportação nativa em CSV e sincronização em tempo real via Google Apps Script.

---

## 📌 Sobre o Projeto

O **ConectaPet** foi desenvolvido para resolver o alto índice de estresse, frustração e abandono em rotinas de adestramento tradicional de cães e gatos. Utilizando a metodologia científica de **reforço positivo** e **micro-doses diárias de treino (3 a 15 minutos)**, a plataforma combina:

1. **Jornada Gamificada & Tabuleiro:** Fases progressivas de aprendizagem com rolagem de dados e avanço por metas comportamentais.
2. **Consultoria Comportamental Autônoma:** Diagnósticos e protocolos práticos para desafios comuns (Ansiedade por Separação, Reatividade na Guia, Posse de Recursos e Sinais de Calma).
3. **Cronômetro Guiado com Marcador Sonoro (Clicker):** Temporizador interativo com áudio sintetizado em baixa latência (Web Audio API) para condicionamento operante preciso.
4. **Economia de Fichas (PETCOINS):** Recompensas virtuais acumuladas a cada treino concluído e resgatáveis em vouchers e petiscos.
5. **Data Engine Integrado:** Coleta contínua de métricas transacionais de anamnese, tempo de sessão, taxa de sucesso e engajamento do tutor.

---

## 🏗️ Arquitetura do Pipeline de Dados
# 🐾 ConectaPet - Gamified Pet Training & Behavioral Analytics Platform

![Status](https://img.shields.io/badge/Status-Live%20Production-emerald?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20TypeScript%20%7C%20TailwindCSS-blue?style=for-the-badge)
![Data](https://img.shields.io/badge/Data%20Pipeline-Google%20Sheets%20%7C%20Looker%20Studio%20%7C%20Python-orange?style=for-the-badge)
![Compliance](https://img.shields.io/badge/LGPD-Privacy%20by%20Design-purple?style=for-the-badge)

> **Plataforma web gamificada para adestramento positivo e saúde comportamental pet com pipeline de dados integrado para Google Sheets, Looker Studio e Python.**

---

## 🚀 Aplicação em Produção
- 📱 **App Web / PWA:** [https://conectapet-jornada-anamnese-pet.ai.studio](https://conectapet-jornada-anamnese-pet.ai.studio)
- 📊 **Dataset Analítico:** Exportação nativa em CSV e sincronização em tempo real via Google Apps Script.

---

## 📌 Sobre o Projeto

O **ConectaPet** foi desenvolvido para resolver o alto índice de estresse, frustração e abandono em rotinas de adestramento tradicional de cães e gatos. Utilizando a metodologia científica de **reforço positivo** e **micro-doses diárias de treino (3 a 15 minutos)**, a plataforma combina:

1. **Jornada Gamificada & Tabuleiro:** Fases progressivas de aprendizagem com rolagem de dados e avanço por metas comportamentais.
2. **Consultoria Comportamental Autônoma:** Diagnósticos e protocolos práticos para desafios comuns (Ansiedade por Separação, Reatividade na Guia, Posse de Recursos e Sinais de Calma).
3. **Cronômetro Guiado com Marcador Sonoro (Clicker):** Temporizador interativo com áudio sintetizado em baixa latência (Web Audio API) para condicionamento operante preciso.
4. **Economia de Fichas (PETCOINS):** Recompensas virtuais acumuladas a cada treino concluído e resgatáveis em vouchers e petiscos.
5. **Data Engine Integrado:** Coleta contínua de métricas transacionais de anamnese, tempo de sessão, taxa de sucesso e engajamento do tutor.

---

## 🏗️ Arquitetura do Pipeline de Dados
## 🏗️ Arquitetura do Pipeline de Dados

```mermaid
flowchart TD
    subgraph Coleta ["📱 1. Coleta & Eventos de Usuário"]
        A["🐶 Tutor & Pet no ConectaPet Web App"] -->|Preenche Anamnese| B["Formulário de Saúde & Comportamento"]
        A -->|Completa Treino| C["Cronômetro Interativo + Marcador Sonoro"]
        A -->|Ganha XP & Resgata| D["Economia de Fichas (PETCOINS)"]
    end

    subgraph Ingestao ["⚡ 2. Camada de Ingestão & Processamento"]
        B & C & D -->|Payload JSON / CSV| E["Google Apps Script Webhook / CSV Exporter"]
    end

    subgraph Armazenamento ["🗄️ 3. Data Lake / Data Warehouse"]
        E -->|Ingestão Estruturada| F[("Google Sheets - Database Central")]
        F --> F1["📊 Aba: Anamnese (Tabela Dimensão)"]
        F --> F2["📈 Aba: Historico_Treinos (Tabela Fato)"]
    end

    subgraph Analytics ["🎯 4. Consumo, BI & Data Science"]
        F1 & F2 -->|Conector Nativo| G["📊 Looker Studio / Power BI<br/>(Dashboards Executivos & KPIs)"]
        F1 & F2 -->|Data Dump CSV / API| H["🐍 Python (Pandas / Jupyter)<br/>(Estatística, Correlações & Clusters)"]
    end

    style A fill:#EEF2FF,stroke:#4F46E5,stroke-width:2px
    style E fill:#FEF3C7,stroke:#D97706,stroke-width:2px
    style F fill:#DCFCE7,stroke:#16A34A,stroke-width:2px
    style G fill:#E0F2FE,stroke:#0284C7,stroke-width:2px
    style H fill:#FCE7F3,stroke:#DB2777,stroke-width:2px
```
