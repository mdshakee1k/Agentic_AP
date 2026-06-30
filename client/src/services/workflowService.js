import { api } from "./api";

export const workflowService = {
  dashboard: () => api.get("/workflows/dashboard").then((res) => res.data),
  list: () => api.get("/workflows").then((res) => res.data),
  create: (payload) => api.post("/workflows", payload).then((res) => res.data),
  generate: (prompt) => api.post("/workflows/generate", { prompt }).then((res) => res.data),
  get: (id) => api.get(`/workflows/${id}`).then((res) => res.data),
  update: (id, payload) => api.put(`/workflows/${id}`, payload).then((res) => res.data),
  execute: (id, input = {}) => api.post(`/workflows/${id}/execute`, { input }).then((res) => res.data),
  duplicate: (id) => api.post(`/workflows/${id}/duplicate`).then((res) => res.data)
};
