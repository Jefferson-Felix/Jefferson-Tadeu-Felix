import { AnamneseData, PetProfile, TutorProfile, TrainingLog, AppState } from '../types';

export interface SyncResult {
  success: boolean;
  message: string;
  timestamp: string;
}

/**
 * Envia dados de Anamnese para a planilha via Google Apps Script Web App
 */
export async function syncAnamneseToSheets(
  scriptUrl: string,
  tutor: TutorProfile,
  pet: PetProfile,
  anamnese: AnamneseData
): Promise<SyncResult> {
  const timestamp = new Date().toISOString();

  if (!scriptUrl || !scriptUrl.startsWith('http')) {
    return {
      success: false,
      message: 'URL do script do Google Sheets inválida ou não configurada.',
      timestamp
    };
  }

  const payload = {
    action: 'SAVE_ANAMNESE',
    timestamp,
    tutor: {
      id: tutor.id,
      nome: tutor.nome,
      email: tutor.email,
      whatsapp: tutor.whatsapp || '',
      cidade: tutor.cidade || ''
    },
    pet: {
      id: pet.id,
      nome: pet.nome,
      especie: pet.especie,
      raca: pet.raca,
      sexo: pet.sexo,
      xp: pet.xp,
      nivel: pet.nivel,
      streakDias: pet.streakDias
    },
    anamnese: {
      ...anamnese,
      desafiosComportamentais: anamnese.desafiosComportamentais.join(', ')
    }
  };

  try {
    // Usando fetch com modo no-cors ou json se configurado adequadamente
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.type === 'opaque') {
      return {
        success: true,
        message: 'Dados enviados com sucesso para a Planilha do Google Sheets!',
        timestamp
      };
    } else {
      return {
        success: false,
        message: `Servidor retornou status: ${response.status}`,
        timestamp
      };
    }
  } catch (error) {
    // Modo no-cors fallback quando CORS restringe leitura do cabeçalho
    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
      return {
        success: true,
        message: 'Dados transmitidos para o Google Apps Script (modo seguro).',
        timestamp
      };
    } catch (e) {
      return {
        success: false,
        message: `Falha na conexão com Google Sheets: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        timestamp
      };
    }
  }
}

/**
 * Envia registro de treino/exercício para a planilha
 */
export async function syncTrainingLogToSheets(
  scriptUrl: string,
  log: TrainingLog
): Promise<SyncResult> {
  const timestamp = new Date().toISOString();

  if (!scriptUrl || !scriptUrl.startsWith('http')) {
    return {
      success: false,
      message: 'URL do Google Sheets não configurada.',
      timestamp
    };
  }

  const payload = {
    action: 'SAVE_TRAINING_LOG',
    timestamp,
    log
  };

  try {
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return {
      success: true,
      message: 'Treino registrado na planilha do Google Sheets com sucesso!',
      timestamp
    };
  } catch (err) {
    return {
      success: false,
      message: `Erro ao enviar registro: ${err instanceof Error ? err.message : 'Erro de rede'}`,
      timestamp
    };
  }
}

/**
 * Código pronto para o usuário colar no Google Apps Script da sua planilha no Google Drive
 */
export function getGoogleAppsScriptTemplate(): string {
  return `/**
 * ====================================================================
 * SCRIPT DE INTEGRAÇÃO GOOGLE SHEETS PARA CONECTAPET
 * ====================================================================
 * Como configurar:
 * 1. Abra uma nova Planilha no seu Google Drive (ex: "ConectaPet - Banco de Dados")
 * 2. Clique no menu: Extensões > Apps Script
 * 3. Apague qualquer código existente e Cole este código inteiro
 * 4. Clique em "Implantar" (Deploy) > "Nova Implantação" (New Deployment)
 * 5. Selecione o tipo "App da Web" (Web App)
 * 6. Na opção "Quem pode acessar" (Who has access), selecione: "Qualquer pessoa" (Anyone)
 * 7. Clique em "Implantar", autorize as permissões e copie a URL gerada (terminada em /exec)
 * 8. Cole a URL no ConectaPet no menu "Sincronização"
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.action === "SAVE_ANAMNESE") {
      var sheet = ss.getSheetByName("Anamnese") || ss.insertSheet("Anamnese");
      
      // Cabeçalhos se a aba estiver vazia
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          "Data/Hora Registro", "ID Tutor", "Nome Tutor", "Email", "WhatsApp", "Cidade",
          "ID Pet", "Nome Pet", "Espécie", "Raça", "Sexo", "Nível", "XP",
          "Data Nascimento", "Porte", "Peso (Kg)", "Castrado", "Energia", "Tempo Sozinho",
          "Alimentação", "Marca Ração", "Última Vacina", "Último Vermífugo", "Plano Saúde",
          "Restrições Saúde", "Desafios Comportamentais", "Local Necessidades"
        ]);
        sheet.getRange("A1:AA1").setFontWeight("bold").setBackground("#4F46E5").setFontColor("#FFFFFF");
      }
      
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.tutor.id, data.tutor.nome, data.tutor.email, data.tutor.whatsapp, data.tutor.cidade,
        data.pet.id, data.pet.nome, data.pet.especie, data.pet.raca, data.pet.sexo, data.pet.nivel, data.pet.xp,
        data.anamnese.dataNascimento, data.anamnese.porte, data.anamnese.pesoKg || "", data.anamnese.castrado ? "Sim" : "Não",
        data.anamnese.energia, data.anamnese.tempoSozinho, data.anamnese.alimentacao, data.anamnese.marcaAlimento,
        data.anamnese.dataVacina || "", data.anamnese.dataVermifugo || "", data.anamnese.planoSaude,
        data.anamnese.restricoes, data.anamnese.desafiosComportamentais, data.anamnese.localNecessidades
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Anamnese salva!" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.action === "SAVE_TRAINING_LOG") {
      var logSheet = ss.getSheetByName("Historico_Treinos") || ss.insertSheet("Historico_Treinos");
      
      if (logSheet.getLastRow() === 0) {
        logSheet.appendRow([
          "Data/Hora", "ID Pet", "Nome Pet", "Espécie", "Categoria", "Exercício",
          "Duração (segundos)", "Nota Desempenho (1-5)", "XP Ganho", "Observações"
        ]);
        logSheet.getRange("A1:J1").setFontWeight("bold").setBackground("#10B981").setFontColor("#FFFFFF");
      }
      
      var log = data.log;
      logSheet.appendRow([
        log.dataHora || new Date().toISOString(),
        log.petId, log.petNome, log.especie, log.categoria, log.nomeExercicio,
        log.duracaoSegundos, log.sucessoNota, log.xpGanho, log.observacoes || ""
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Treino salvo!" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "ignored" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "online", name: "ConectaPet API", version: "1.0.0" }))
    .setMimeType(ContentService.MimeType.JSON);
}`;
}

/**
 * Exporta dados completos como arquivo CSV para download imediato
 */
export function exportToCSV(appState: AppState) {
  exportAnamneseCSV(appState.pets);
}

/**
 * Exporta CSV específico da Anamnese (para Google Sheets / Looker / Power BI)
 */
export function exportAnamneseCSV(pets: PetProfile[]) {
  const headers = [
    'Pet_ID', 'Nome_Pet', 'Especie', 'Porte', 'Raca', 'Sexo', 'Castrado',
    'Peso_Kg', 'Nivel_Energia', 'Tempo_Sozinho', 'Tipo_Alimentacao', 'Marca_Alimento',
    'Plano_Saude', 'Restricoes_Saude', 'Desafios_Comportamentais', 'Local_Necessidades',
    'Nivel_App', 'XP_Acumulado', 'Streak_Dias'
  ];

  const rows = pets.map(pet => {
    const a = pet.anamnese;
    return [
      `"${pet.id}"`,
      `"${pet.nome}"`,
      `"${pet.especie}"`,
      `"${a?.porte || 'Médio'}"`,
      `"${pet.raca}"`,
      `"${pet.sexo}"`,
      `"${a?.castrado ? 'Sim' : 'Não'}"`,
      a?.pesoKg || 0,
      `"${a?.energia || 'Moderado'}"`,
      `"${a?.tempoSozinho || 'Medio'}"`,
      `"${a?.alimentacao || 'Ração Seca'}"`,
      `"${(a?.marcaAlimento || '').replace(/"/g, '""')}"`,
      `"${a?.planoSaude || 'Não'}"`,
      `"${a?.restricoes || 'Nenhuma'}"`,
      `"${(a?.desafiosComportamentais || []).join('; ').replace(/"/g, '""')}"`,
      `"${(a?.localNecessidades || '').replace(/"/g, '""')}"`,
      pet.nivel,
      pet.xp,
      pet.streakDias
    ].join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent([headers.join(','), ...rows].join('\n'));
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', `conectapet_anamnese_${pets.length}_pets_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exporta CSV de Histórico de Treinos (Fato_Treinos para Power BI / Looker)
 */
export function exportTreinosCSV(logs: TrainingLog[]) {
  const headers = [
    'Log_ID', 'Data_Hora', 'Pet_ID', 'Nome_Pet', 'Especie', 'Categoria_Exercicio',
    'Nome_Exercicio', 'Duracao_Segundos', 'Duracao_Minutos', 'Nota_Desempenho_1a5',
    'XP_Ganho', 'Petcoins_Ganhas', 'Observacoes_Comportamentais'
  ];

  const rows = logs.map(log => [
    `"${log.id}"`,
    `"${log.dataHora}"`,
    `"${log.petId}"`,
    `"${log.petNome}"`,
    `"${log.especie}"`,
    `"${log.categoria}"`,
    `"${log.nomeExercicio.replace(/"/g, '""')}"`,
    log.duracaoSegundos,
    Math.round((log.duracaoSegundos / 60) * 10) / 10,
    log.sucessoNota,
    log.xpGanho,
    log.petiscosGanhos || 0,
    `"${(log.observacoes || '').replace(/"/g, '""')}"`
  ].join(','));

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent([headers.join(','), ...rows].join('\n'));
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', `conectapet_treinos_${logs.length}_registros_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exporta backup JSON completo
 */
export function exportToJSON(appState: AppState) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `conectapet_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
