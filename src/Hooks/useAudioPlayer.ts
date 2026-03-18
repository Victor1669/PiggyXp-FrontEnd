import { useEffect, useRef, useState, useCallback } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";

export type AudioStatus = {
  isLoaded: boolean;
  isPlaying: boolean;
  isBuffering: boolean;
  isLooping: boolean;
  positionMs: number;
  durationMs: number | null;
  volume: number;
  rate: number;
  didJustFinish: boolean;
};

export type UseAudioPlayerReturn = {
  status: AudioStatus;
  load: (uri: string) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  togglePlayPause: () => Promise<void>;
  seekTo: (positionMs: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  setRate: (rate: number, shouldCorrectPitch?: boolean) => Promise<void>;
  setIsLooping: (loop: boolean) => Promise<void>;
  replay: () => Promise<void>;
  unload: () => Promise<void>;
};

// ─────────────────────────────────────────────
// Default status
// ─────────────────────────────────────────────

const DEFAULT_STATUS: AudioStatus = {
  isLoaded: false,
  isPlaying: false,
  isBuffering: false,
  isLooping: false,
  positionMs: 0,
  durationMs: null,
  volume: 1,
  rate: 1,
  didJustFinish: false,
};

export function useAudio(): UseAudioPlayerReturn {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [status, setStatus] = useState<AudioStatus>(DEFAULT_STATUS);

  // Configura o modo de áudio ao montar
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
    });

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const handleStatusUpdate = useCallback((playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      setStatus((prev) => ({ ...prev, isLoaded: false }));
      return;
    }

    setStatus({
      isLoaded: true,
      isPlaying: playbackStatus.isPlaying,
      isBuffering: playbackStatus.isBuffering,
      isLooping: playbackStatus.isLooping,
      positionMs: playbackStatus.positionMillis,
      durationMs: playbackStatus.durationMillis ?? null,
      volume: playbackStatus.volume,
      rate: playbackStatus.rate,
      didJustFinish: playbackStatus.didJustFinish,
    });
  }, []);

  const load = useCallback(
    async (uri: string) => {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        handleStatusUpdate,
      );

      soundRef.current = sound;
    },
    [handleStatusUpdate],
  );

  const play = useCallback(async () => {
    await soundRef.current?.playAsync();
  }, []);

  const pause = useCallback(async () => {
    await soundRef.current?.pauseAsync();
  }, []);

  const stop = useCallback(async () => {
    await soundRef.current?.stopAsync();
    await soundRef.current?.setPositionAsync(0);
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (!soundRef.current) return;
    status.isPlaying ? await pause() : await play();
  }, [status.isPlaying, play, pause]);

  const seekTo = useCallback(async (positionMs: number) => {
    await soundRef.current?.setPositionAsync(positionMs);
  }, []);

  const setVolume = useCallback(async (volume: number) => {
    const clamped = Math.min(1, Math.max(0, volume));
    await soundRef.current?.setVolumeAsync(clamped);
  }, []);

  const setRate = useCallback(
    async (rate: number, shouldCorrectPitch = true) => {
      await soundRef.current?.setRateAsync(rate, shouldCorrectPitch);
    },
    [],
  );

  const setIsLooping = useCallback(async (loop: boolean) => {
    await soundRef.current?.setIsLoopingAsync(loop);
  }, []);

  const replay = useCallback(async () => {
    await soundRef.current?.replayAsync();
  }, []);

  const unload = useCallback(async () => {
    await soundRef.current?.unloadAsync();
    soundRef.current = null;
    setStatus(DEFAULT_STATUS);
  }, []);

  return {
    status,
    load,
    play,
    pause,
    stop,
    togglePlayPause,
    seekTo,
    setVolume,
    setRate,
    setIsLooping,
    replay,
    unload,
  };
}
