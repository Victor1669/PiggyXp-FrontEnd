import { useCallback, useRef } from "react";
import { Video } from "expo-av";

export function useVideo() {
  const videoRef = useRef<Video | null>(null);

  const play = useCallback(async () => {
    try {
      await videoRef.current?.playAsync();
    } catch {
      // sem suporte a vídeo (emulador, foco negado, etc.)
    }
  }, []);

  const pause = useCallback(async () => {
    try {
      await videoRef.current?.pauseAsync();
    } catch {
      // vídeo não carregado
    }
  }, []);

  const stop = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.stopAsync();
      await videoRef.current.setPositionAsync(0);
    } catch {
      // vídeo já foi descarregado
    }
  }, []);

  const seekTo = useCallback(async (positionMs: number) => {
    try {
      await videoRef.current?.setPositionAsync(positionMs);
    } catch {
      // vídeo não carregado
    }
  }, []);

  return { videoRef, play, pause, stop, seekTo };
}
