import { api } from "./api";

export const integrationService = {
  list: () => api.get("/integrations").then((res) => res.data),
  status: () => api.get("/integrations/status").then((res) => res.data),
  upsert: (payload) => api.post("/integrations", payload).then((res) => res.data),
  oauthStartUrl: (provider) => `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/integrations/oauth/${provider}/start`
};
