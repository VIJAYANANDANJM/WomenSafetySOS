let audioContext = null;
let oscillator = null;
let gainNode = null;
let isPlaying = false;
let intervalId = null;

export function startSiren() {
  if (isPlaying) return;
  
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0.8;
    
    isPlaying = true;
    let freq = 800;
    let rising = true;
    
    function playTone() {
      if (!isPlaying) return;
      
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
      }
      
      oscillator = audioContext.createOscillator();
      oscillator.type = 'sawtooth';
      oscillator.frequency.value = freq;
      oscillator.connect(gainNode);
      oscillator.start();
      
      if (rising) {
        freq += 40;
        if (freq >= 1400) rising = false;
      } else {
        freq -= 40;
        if (freq <= 800) rising = true;
      }
    }
    
    playTone();
    intervalId = setInterval(playTone, 80);
    
  } catch (e) {
    console.error('Failed to start siren:', e);
  }
}

export function stopSiren() {
  isPlaying = false;
  
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  
  if (oscillator) {
    try {
      oscillator.stop();
      oscillator.disconnect();
    } catch (e) { /* ignore */ }
    oscillator = null;
  }
  
  if (gainNode) {
    gainNode.disconnect();
    gainNode = null;
  }
  
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}

export function isSirenPlaying() {
  return isPlaying;
}
