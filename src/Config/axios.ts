import axios from "axios";

import { env } from "Config/env";

export const api = axios.create({
  baseURL: env.backEndUrl,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});
