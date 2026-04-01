import { useCallback, useEffect, useRef } from "react";
import { Audio } from "expo-av";

export function useAudio() {
  const soundRef = useRef<Audio.Sound | null>(null);

  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    staysActiveInBackground: false,
  });

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const load = useCallback(async (source: string | number) => {
    try {
      await soundRef.current?.unloadAsync();
      const { sound } = await Audio.Sound.createAsync(
        typeof source === "number" ? source : { uri: source },
      );
      soundRef.current = sound;
    } catch {
      soundRef.current = null;
    }
  }, []);

  const play = useCallback(async () => {
    try {
      await soundRef.current?.playAsync();
    } catch {
      // sem suporte a áudio (emulador, foco de áudio negado, etc.)
    }
  }, []);

  const stop = useCallback(async () => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.stopAsync();
      await soundRef.current.setPositionAsync(0);
    } catch {
      // som já foi descarregado
    }
  }, []);

  return { load, play, stop };
}
