import { create } from "zustand";

export const useWorkflowStore = create((set) => ({
  currentWorkflow: null,
  generatedWorkflow: null,
  setCurrentWorkflow: (workflow) => set({ currentWorkflow: workflow }),
  setGeneratedWorkflow: (workflow) => set({ generatedWorkflow: workflow })
}));
