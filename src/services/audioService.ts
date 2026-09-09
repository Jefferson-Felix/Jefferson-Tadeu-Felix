import { ClickerSoundType } from '../types';

class AudioService {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // Lazy init audio context on first user gesture
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  private getAudioContext(): AudioContext | null {
    if (!this.soundEnabled) return null;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Som de Clicker Personalizado ou Marcador Verbal
   */
  public playClicker(tipo: ClickerSoundType = 'mecanico', verbalWord: string = 'Sim!') {
    if (!this.soundEnabled) return;

    if (tipo === 'verbal') {
      this.speakMarkerWord(verbalWord);
      return;
    }

    if (tipo === 'apito') {
      this.playWhistle();
      return;
    }

    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      if (tipo === 'crisp') {
        // Clicker super agudo e nítido
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2600, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.03);

        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (tipo === 'suave') {
        // Tom suave (ideal para cães reativos a barulho alto ou gatos)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else {
        // 'mecanico' - Duplo micro-click mecânico de caixa
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(1400, now);
        osc1.frequency.exponentialRampToValueAtTime(300, now + 0.025);

        gain1.gain.setValueAtTime(0.7, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.025);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(1800, now + 0.045);
        osc2.frequency.exponentialRampToValueAtTime(450, now + 0.07);

        gain2.gain.setValueAtTime(0.5, now + 0.045);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.045);
        osc2.stop(now + 0.07);
      }
    } catch {
      // ignore
    }
  }

  /**
   * Marcador Verbal falado pelo navegador (Síntese de Voz / TTS nativo)
   */
  public speakMarkerWord(word: string = 'Sim!') {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.3; // Rápido e pontual como um marcador
        utterance.pitch = 1.2;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
      } else {
        this.playSuccessChime();
      }
    } catch {
      this.playSuccessChime();
    }
  }

  /**
   * Som de Sucesso / Conquista (acorde melódico ascendente)
   */
  public playSuccessChime() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.08;
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Beep para contagem do Timer
   */
  public playTimerBeep(isFinish: boolean = false) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = isFinish ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(isFinish ? 880 : 440, now);
      if (isFinish) {
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.3);
      }
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (isFinish ? 0.4 : 0.12));
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + (isFinish ? 0.4 : 0.12));
    } catch {
      // ignore
    }
  }

  /**
   * Apito suave de adestramento
   */
  public playWhistle() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(2800, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.3);
      
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // ignore
    }
  }

  /**
   * Som de rolagem e impacto de dado de tabuleiro
   */
  public playDiceRoll() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // 4 pequenos ruídos de ricocheteio
      [0, 0.06, 0.13, 0.22].forEach((offset, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + offset;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320 + idx * 70, t);
        osc.frequency.exponentialRampToValueAtTime(140, t + 0.04);
        
        gain.gain.setValueAtTime(0.4 - idx * 0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.04);
      });

      // Impacto final
      const oscFinal = ctx.createOscillator();
      const gainFinal = ctx.createGain();
      const tEnd = now + 0.3;
      oscFinal.type = 'sine';
      oscFinal.frequency.setValueAtTime(520, tEnd);
      oscFinal.frequency.exponentialRampToValueAtTime(260, tEnd + 0.12);
      gainFinal.gain.setValueAtTime(0.5, tEnd);
      gainFinal.gain.exponentialRampToValueAtTime(0.001, tEnd + 0.12);
      oscFinal.connect(gainFinal);
      gainFinal.connect(ctx.destination);
      oscFinal.start(tEnd);
      oscFinal.stop(tEnd + 0.12);
    } catch {
      // ignore
    }
  }

  /**
   * Som de coleta de recompensa / moedas XP
   */
  public playCoinReward() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [987.77, 1318.51]; // B5, E6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + i * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
      });
    } catch {
      // ignore
    }
  }
}

export const audioService = new AudioService();
