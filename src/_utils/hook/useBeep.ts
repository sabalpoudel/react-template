import { useCallback } from "react";

/** 🎵 Define Sound Wave Types */
type TBeepType = "sine" | "square" | "sawtooth" | "triangle";

/** 🎚 Configuration Options for Beep */
export type BeepConfig = {
  type?: TBeepType; // Sound type (default: SINE)
  frequency?: number; // Frequency in Hz (default: 440)
  duration?: number; // Duration in ms (default: 200)
  volume?: number; // Volume (0 to 1) (default: 0.5)
};

/** 🔊 Custom Hook to Play Beep */
const useBeep = () => {
  const playBeep = useCallback(
    ({
      type = "sine",
      volume = 0.2,
      duration = 200,
      frequency = 440,
    }: BeepConfig) => {
      const audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // Apply configurations
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Play sound
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioCtx.close(); // Cleanup
      }, duration);
    },
    []
  );

  return playBeep;
};

export default useBeep;
