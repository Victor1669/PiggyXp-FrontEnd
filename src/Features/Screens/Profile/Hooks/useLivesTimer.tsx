import { useEffect, useState } from "react";

import { useAuth } from "Features/Auth/Contexts/useAuth";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { calcLivesTimer } from "../Helpers/calcLivesTimer";

export function useLivesTimer() {
  const updateUserInfo = useUpdateUserInfo();

  const {
    user: { reset_lives_at },
  } = useAuth();

  const [timer, setTimer] = useState<string | null>(() =>
    calcLivesTimer(reset_lives_at),
  );

  useEffect(() => {
    const timerLives = setInterval(() => {
      const timerDate = calcLivesTimer(reset_lives_at);
      setTimer(timerDate);
    }, 1000);

    return () => clearInterval(timerLives);
  }, [reset_lives_at]);

  useEffect(() => {
    if (!timer) {
      updateUserInfo();
    }
  }, [timer]);

  return { timer };
}
