// Simple Web Audio API wrapper to avoid external assets
let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playSound = (type: 'click' | 'correct' | 'wrong' | 'summary') => {
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click') {
      // Short high pitch click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } 
    else if (type === 'correct') {
      // Major chord
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.value = freq;
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        
        const startTime = now + (i * 0.05);
        gain2.gain.setValueAtTime(0, startTime);
        gain2.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
        
        osc2.start(startTime);
        osc2.stop(startTime + 0.5);
      });
    } 
    else if (type === 'wrong') {
      // Low discordant sound
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(150, now);
      osc2.frequency.linearRampToValueAtTime(100, now + 0.4);
      
      gain2.gain.setValueAtTime(0.3, now);
      gain2.gain.linearRampToValueAtTime(0.01, now + 0.4);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.4);
    }
    else if (type === 'summary') {
      // Fanfare-ish
      [440, 554, 659, 880].forEach((freq, i) => {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'square';
          osc2.frequency.value = freq;
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          
          const start = now + (i * 0.1);
          gain2.gain.setValueAtTime(0, start);
          gain2.gain.linearRampToValueAtTime(0.1, start + 0.1);
          gain2.gain.linearRampToValueAtTime(0, start + 0.4);
          
          osc2.start(start);
          osc2.stop(start + 0.4);
      });
    }

  } catch (e) {
    console.error("Audio playback failed", e);
  }
};
