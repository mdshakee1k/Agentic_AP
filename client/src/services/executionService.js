import { api } from "./api";

export const executionService = {
  list: () => api.get("/executions").then((res) => res.data),
  get: (id) => api.get(`/executions/${id}`).then((res) => res.data),
  timeline: (id) => api.get(`/executions/${id}/timeline`).then((res) => res.data),
  pause: (id) => api.post(`/executions/${id}/pause`).then((res) => res.data),
  resume: (id) => api.post(`/executions/${id}/resume`).then((res) => res.data),
  cancel: (id) => api.post(`/executions/${id}/cancel`).then((res) => res.data)
};
